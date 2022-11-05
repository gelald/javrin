---
title: MySQL 分页查询优化
icon: article
order: 4
category:

- 干货
- 数据库

tag:

- MySQL
- 优化
- 分页查询

---

# MySQL 分页查询

> 在业务中，分页查询还是较为常用的，特别是数据量大时，分页查询能有效提高执行效率，也能降低网络传输的资源消耗

## 业务引入

现在有一张订单表，结构大致是这样

```sql
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_name` varchar(255) NOT NULL COMMENT ' 用户名',
  `create_time` datetime DEFAULT NULL COMMENT '发生时间',
  `price` decimal(10,2) DEFAULT NULL COMMENT '价格',
  PRIMARY KEY (`id`),
  KEY `idx_user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

其中 `id` 是主键，在 `user_name` 字段上建了一个普通索引，并且模拟了 20000 条数据

现在需要进行分页查询，每页 10 条

查询第 1 页的 SQL 语句

```sql
select * from `order` order by id limit 0, 10;
```

查询第 1000 页的 SQL 语句

```sql
select * from `order` order by id limit 9990, 10
```



## 分页查询原理

简单回顾 MySQL 执行查询语句的流程

当客户端连接到 MySQL 服务端后，经过一系列的分析优化，最终由服务层的执行器调用存储引擎的数据读取的接口并返回数据

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220617143115.png)

其中决定 SQL 语句如何执行的地方在优化器，优化器会选择开销最小的执行计划最终提交给存储引擎来执行



### 查看执行计划

执行计划的查看可以通过 `explain` 命令来完成

比如对查询第 1 页的 SQL 语句查看执行计划

```shell
mysql> explain select * from `order` order by id limit 0, 10 \G;
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: order
   partitions: NULL
         type: index
possible_keys: NULL
          key: PRIMARY
      key_len: 4
          ref: NULL
         rows: 10
     filtered: 100.00
        Extra: NULL
1 row in set, 1 warning (0.01 sec)
```

查看执行计划中 `key` 这一项，显示的是 `PRIMARY` ，也就是走的主键索引

使用主键索引：从 B+ 树上查询具体的叶子节点并**获取叶子节点上的完整行数据信息**



## 分页查询隐藏的问题

查看完执行计划后，发现这个查询是相当高效的，因为使用了主键索引，所以可以直接执行

```sql
select * from `order` order by id limit 0, 10;

select * from `order` order by id limit 9990, 10;
```

这两条 SQL 语句执行出来的结果也和我们的需求一致，似乎已经没什么问题的

**但是，SQL 语句执行的过程真的和我们想象的一样吗？**

**实际上，`limit` 子句是服务层返回给客户端之前才去执行的**，而执行器在调用 innodb 存储引擎的查询接口时，存储引擎是**返回了第 1 条到 (offset + size) 条完整行数据的**

如果查询第 1 页的数据，那么是返回第 1 条到第 10 条的数据给服务层，咋一看没问题

如果查询第 1000 页的数据，那么是返回第 1 条到第 10000 条的数据给服务层，**服务层再把第 9991 条之前的数据逐一抛弃，最终留下 10 条返回给客户端**



显然当 offset 不为 0 时，服务层会从存储引擎层中获取许多无用的数据，而获取、抛弃这个过程也是需要耗时的

如果不是用主键索引来排序，使用普通索引来排序，时间的差距可能会更大

```shell
mysql> explain select * from `order` order by user_name limit 0, 10 \G;
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: order
   partitions: NULL
         type: index
possible_keys: NULL
          key: idx_user_name
      key_len: 1022
          ref: NULL
         rows: 10
     filtered: 100.00
        Extra: NULL
1 row in set, 1 warning (0.00 sec)
```

查询第 1 页时，执行计划还能显示使用索引

```shell
mysql> explain select * from `order` order by user_name limit 9990, 10 \G;
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: order
   partitions: NULL
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 20400
     filtered: 100.00
        Extra: Using filesort
1 row in set, 1 warning (0.00 sec)
```

查询第 1000 页时，执行计划却显示了需要做全表扫描了（ `type` = `ALL` ），并进行 `filesort`

> 简单分析一下为什么做全表扫描
>
> 执行查询第 1000 页的语句时，服务层应该会得出两个执行计划
>
> 1. 全表扫描
> 2. 使用普通索引进行查询，并且每一条记录都要进行回表操作
>
> 兴许是优化器权衡后认为做全表扫描的开销比使用普通索引后逐一回表的开销更小，于是选择了全表扫描，无论他的执行时间是否更长



## 分页查询优化

如果这时候需求就是需要使用普通索引来排序并分页查询，进行全表扫描的执行计划一定是需要被优化的

```sql
select * from `order` order by user_name limit 9990, 10;
```



### B+ 树结构

在开始进行优化前，我们需要先简单回顾一下 MySQL 中 innodb 存储引擎的存储结构，从数据结构中寻找可以优化的地方

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220617155356.png)

普通索引：叶子节点存放索引内容和主键值

主键索引：叶子节点存放主键值和整行内容

回表：从普通索引中查询到数据对应的主键，再从主键索引中查询到完整的数据内容

> 题外话：在开发中尽量少用 select * ，因为需要回表，尽量建立联合索引，并让查询的字段命中这些联合索引，因为叶子节点上就有我们所需要的值，不需要回表，这个也称为索引覆盖



### 拆分子查询

我们可以把这个使用普通索引的查询拆分成两个子查询

```sql
select * from `order` t1, (select id from `order` order by user_name limit 9990, 10) t2 where t1.id = t2.id;
```

思路：

1. 无论怎么样，都是要向服务层返回多余的前 9990 条数据的，就让返回的数据字段尽可能少，便利普通索引树，只返回主键 id
2. 再把这 10 个 id 去订单表中查询对应的数据，此时用的是主键索引，只需要进行 10 次回表，将匹配到的 10 条数据返回

这样就从一开始的全表扫描改进成使用**普通索引+主键索引**的方式了，省去了前 9990 条数据的回表操作，从而提升了查询效率



### 深度分页

当 offset 变得很大，达到了百万、千万级别，那这个问题就非常棘手了。目前无论是 MySQL 还是 Elasticsearch 都没有很好的解决方案，只有一些减缓的手段

这是应该要反思一下这个需求为什么会出现

实际上分页查询不会一下子翻到几百万页后，所以这个需求是不合理的需求，应该修改需求使其更接近真实用户的行为

假如可以做成不支持跳页，只支持上一页或下一页的跳转，这样可以做分批获取数据的方式，也称“瀑布流”，这种方式速度是稳定的

```java
// 假设是用主键自增的方式
Integer startId = 0;
List<Object> data;
while(condition) {
    // 获取数据
    // select * from `order` where id > startId order by id limit 100;
    data = getList(startId);
    // 数据取完了已经，遍历结束
    if (list.isEmpty()) {
        break;
    }
    // 处理数据
    handle(data);
    // 更新startId
    startId = getMaxId(data);
}
```

这样每次都是稳定地往下取 100 条数据，直至查询停止



## 导出数据时分页查询

在分页查询时尽量不要做连接查询，会降低性能。应该处理成两份查询，第一份查询是查询外键对应的数据，另一份查询是主体的分页查询，在分页查询中只查询其本身。

然后在程序中把主体于外键对应的冗余字段做拼接，在外面一次性查出来放到 Map 里面(推荐使用@MapKey注解)，然后在遍历主体集合的时候根据外键从 Map 中获取对应的数据。一个宗旨：**少发查询 SQL , 才能更快的查询出来**。  

```java
// 把公司数据查询出来放到一个Map集合中，key为公司主键，value为公司数据
Map<Integer, Company> companyMap = this.companyService.getMap(companyQueryWrapper);

// 分页循环开始
	IPage<Employee> page = new Page<>(当前页码, 20);
	// 分页查询员工数据
	IPage<Employee> pageResult = this.page(page, employeeQueryWrapper);
	// 把公司数据设置到员工数据中
	pageResult.getRecords().stream().forEach(employee -> employee.setCompany(companyMap.get(employee.getCompanyId())));
// 分页循环结束
```

