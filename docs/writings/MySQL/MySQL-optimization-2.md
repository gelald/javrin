---
title: MySQL 优化
icon: article
order: 5
category:

- 干货
- 数据库

tag:

- MySQL
- 优化

---

# MySQL优化

> 这一节我们来看 MySQL 优化。一谈到 MySQL 优化，我们往往第一时间就想到了加索引，加索引确实是优化的其中一个手段，但是也要加「对」索引，更重要的是还有其他有效但少有提及的做法。
>
> 快速的查询，不光光是体验的友好，更是技术的彰显。

## 索引

显而易见地，在数据量不是很大的情况下，用索引往往可以提升查询的效率，而大多慢查询也和索引不合理产生。

### 组合索引

有些时候我们会尽可能地去建一些组合索引，能有效提升查询的效率，我们希望出现这两种情况：

索引下推：如果查询条件包含在了组合索引中，比如存在组合索引（a,b)，查询到满足 a 的记录后会直接在索引内部判断 b 是否满足，减少回表次数。

覆盖索引：如果查询的列恰好包含在组合索引中，就无需回表。

### 索引失效

加索引可以提高查询效率，但是往往会出现加了索引查询还是慢的情况。原因多半还是索引失效（未命中索引），是否使用上索引可以通过 `explain` 关键字进行分析。

索引失效原因可以看这篇文章：[为什么加了索引，查询还是慢？](MySQL索引失效场景.md)

## select \* 惹的祸

很多时候为了图方便，就直接使用 `select *` 一次性查出表中所有的列，无论是否用上。

实际上在真正的业务场景下，需要的可能只是其中某几列，查了很多数据，实际上白白浪费了宝贵的内存和 CPU 资源，查询出来的数据 进行 IO 传输时也会**消耗更多时间**，这就是慢的原因！

此外，使用 `select *` 也就无法达到覆盖索引的条件，会造成**大量回表操作**，导致性能很低！

> 所以在开发的时候需要严格遵循需要什么列就查什么列的规则。

## union 和 union all

在 MySQL 中，`union` 和 `union all` 都可以实现取并集的功能，只不过两者有一些小区别

- 对重复结果的处理：`union` 会进行去重操作，而 `union all` 只是简单地合并两个结果集
- 对结果排序的处理：`union` 会根据字段进行排序，而 `union all` 只是简单地合并两个结果集

从以上来看，`union` 显然不是简单地完成并集的工作，还包含了筛选和排序，换言之效率要比 `union all` 要低。

> 所以除非是特殊的场景，不允许有重复值，那么尽量使用 `union all` 进行合并结果集。

## 分页优化

t 表中包含 100w 条数据，现在按每页 20 条数据分页查询 serllerid 为 100 的第 10w 页数据，索引是 serllerid。

普通做法：`limit M, N`

```mysql
select * from t where serllerid = 100 limit 100000, 20;

!-- 20 rows in set(90 sec)
```

可以看到时间成本巨大，在普通的 `limit M, N` 翻页写法，往往在越往后翻页的过程中速度越慢，原因是MySQL会读取表中的前 M+N 条数据，M 越大，性能越差。



优化做法：先查询翻页中需要的 N 条数据的主键，再根据 id 回表查询所需要的N条数据。查询 N 条数据的主键在索引中完成的，所以速度更快。

```mysql
select * from t t1, (select id from t where serllerid = 100 limit 100000, 20) t2 where t1.id = t2.id;
!-- 20 rows in set(4.25 sec)
```

可以看到由于走了索引后再回表，速度大大提升。



## 不要过于频繁执行 count(\*)

在 MySQL 中 count(\*) 负责统计表中记录总数，count(\*) 的性能和存储引擎息息相关

MySQL 中最常用的两个存储引擎：MyISAM、Innodb

- MyISAM：由于 MyISAM 会把总行数记录到磁盘中，所以当使用 count(\*) 获取总数时，只需要从磁盘中返回这个数值即可，没有额外的计算，效率相对较高，无论表中数据量有多大。
- Innodb：因为 Innodb 支持事务，有 MVCC 的存在，在同一时间不同的事务中，使用 count(\*) 获取到的数值可能是不确定的。在 Innodb 中使用 count(\*) 时，需要从存储引擎中一行一行地读取出数据，然后累加起来，效率相对较低，特别当表中的数据量很大时。

可以使用缓存 + 适当的过期时间来完成总数的缓存；或者是使用多线程来完成总数的查询的工作。



既然说到 count(\*)，就不能不说一下 count 家族的其他成员，比如：count(1)、count(主键)、count(普通索引列)、count(未加索引列)。

那么它们有什么区别呢？

- count(*) ：它会获取所有行的数据，不做任何处理，行数加1。
- count(1)：它会获取所有行的数据，每行固定值1，也是行数加1。
- count(主键)：它需要从所有行的数据中解析出主键字段，其中主键肯定都不为NULL，行数加1。
- count(普通索引列)：它需要从所有行的数据中解析出普通索引列，然后判断是否为NULL，如果不是NULL，则行数+1。
- count(未加索引列)：它会全表扫描获取所有数据，解析中未加索引列，然后判断是否为NULL，如果不是NULL，则行数+1。

由此，最后count的性能从高到低是：

> count(*) ≈ count(1) > count(主键) > count(普通索引列) > count(未加索引列)

在统计总数时尽量使用 count(\*) 和 count(1)



## 建立索引规则



![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20221102112736.png)



![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20221102144957.png)