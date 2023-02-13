---
title: MySQL 索引学习
icon: article
order: 2
category:

- 干货
- 数据库

tag:

- 索引
- MySQL

---

# MySQL 索引

> MySQL 的索引是一种帮助 MySQL 高效获取数据的结构。由于磁盘 IO 比较耗时，所以 MySQL 通过建立索引来减少磁盘 IO 的次数进而提升查询数据的效率。**通过索引缩小获取数据的范围，减少数据筛选的过程的时间消耗**。



## 索引结构探索

选择一种适合 MySQL 的索引结构，如何选择结构使得查询用最少的磁盘 IO 次数，获得目标数据。顺序查询在数据量大的时候显然是不合适的，需要寻找其他合适的结构。

> [Data Structure Visualization (usfca.edu)](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html) 这个链接可以进行各种数据结构的可视化



### 哈希表

优势：哈希表可以快速查询，查询效率高

劣势：当出现大量重复键时，存在哈希冲突；数据排序、模糊查询难以实现



### 二叉查找树

优势：可以使用二分查找提高效率

劣势：在极端情况下会退化成单向链表，查询效率低

**二叉查找树不适合作为索引的结构**



### 平衡二叉查找树（AVL Tree）

优势：规定了左子树和右子树的高度差值不能大于 1，差值超出 1 时树会进行自平衡，避免了出现退化成单向链表的情况

劣势：由于结点的度太少，导致数据量非常大的时候，树深度会变得很深，深度越深，磁盘 IO 次数越多，效率越低

**平衡二叉查找树也不适合作为索引的结构**



### 多路平衡查找树（B Tree）

前两个结构的核心问题点就是树的深度，树的深度和磁盘 IO 次数息息相关

B Tree 最大的特点是一个节点的度数 = 一个节点的关键字数 + 1，关键字数越多，度越多，树深度越小，IO 次数越少

B Tree 结构图（假设最大度数为 3 ）：

<img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230112154202.png" style="zoom:50%;" />



#### B Tree 工作原理

B Tree 一个节点存储多个关键字，是通过分裂、合并这两种方式来保证树的平衡性的

- 分裂：当一个节点的关键字数量等于最大度数时，节点需要分裂来保证平衡

  <img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230112155002.png" style="zoom:50%;" />

- 合并：当一个节点发生分裂而产生一个父级节点，且原父级节点已有关键字，那么这两个节点可以根据不超过最大度数的规则来合并称为一个父级节点

  <img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230112155705.png" style="zoom:50%;" />

#### B Tree 在 MySQL 中的实现

B Tree 中的节点，在 MySQL 中代表的是 Page 数据页

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230113214705.png)

优势：B Tree 解决了 AVL Tree 只有两个度的问题，B Tree 的节点可以有很多的度，能有效解决数据量大的时候树深度过深导致磁盘 IO 次数过多的问题。

劣势：B Tree 在数据插入与删除的时候，会破坏 B Tree 自身的平衡，不得不使用合并与分裂来保证平衡，由于 B Tree 节点不仅存储索引也存储数据区，所以导致合并、分裂结点的操作效率不高，在节点数量较多的情况下性能影响大；并且所有节点都存储数据，会导致数据查询的时间不稳定。



### 加强版多路平衡查找树（B+ Tree）

MySQL 中 InnoDB 没有直接使用 B Tree，而是对 B Tree 做了强化，使用了一种 B+ Tree 的结构来存储索引

B+ Tree 的结构图：

<img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230113214156.png" style="zoom:50%;" />

#### B+ Tree 的工作原理

为了保证树的平衡性，B+ Tree 也像 B Tree 一样采用了分裂、合并的操作来保证自身平衡

此外每一个叶子结点都有一个指向相邻叶子结点的指针，形成一个有序链表



#### B+ Tree 在 MySQL 中的实现

B+ Tree 中的节点，在 MySQL 中代表的是 Page 数据页，所以 B+ Tree 中一个节点的大小是 16 KB，非叶子结点存储索引数据和下一个结点的地址，因此B+ Tree 的深度和度数由索引数据大小来决定

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230112161207.png)

B+ Tree 特点：

1. B+ Tree 节点的关键字和度数的关系是 1 : 1
2. B+ Tree 节点的数据检索规则变成了左闭右开的规则
3. B+ Tree 只有叶子结点存储数据，其他节点都只存储关键字索引
4. B+ Tree 的叶子结点都会有指向上一个和下一个叶子结点的指针，形成一个有序双向链表，方便做区间查询



### B+ Tree 和 B Tree 区别

1. 存储内容：B Tree 所有节点都存储索引和数据，B+ Tree 只有叶子结点才存储数据，非叶子结点只存储索引关键字
2. 搜索规则：B Tree 的子树区间时不包含关键字的，B+ Tree 是左闭右开区间。是因为 B+ Tree 中的非叶子结点不存储数据，数据都在叶子结点中
3. B+ 树的叶子结点是顺序排列的，使得全表扫描时的效率会更高



### 为什么 MySQL 选择 B+ Tree 作为索引的存储结构

**最根本的考虑一定是性能**

1. 扫表能力更强，对 B+ Tree 进行全表扫描时，只需要扫描存储数据的叶子结点，不需要遍历整棵树的结点
2. 排序能力更强，因为 B+ Tree 上的叶子结点有指向上一个和下一个叶子结点的指针，数据形成一个有序链表
3. 查询效率更稳定，因为 B+ Tree 只有叶子结点存储了数据，所以磁盘 IO 次数是稳定的；而 B Tree 每一个节点都存储数据，查询的 IO 次数会不稳定
4. 度数更多，B+ Tree 的结点不需要存储数据，只需要存储索引和指针，一次加载的关键字数量更多了，所以度数更多



## 存储引擎的索引实现

### MyISAM

在使用 MyISAM 存储引擎的表会分别有三个文件：`.sid`（表结构）、`.MYI`（索引）、`.MYD`（数据）

一个索引对应一棵 B+ Tree，所有的 B+ Tree 都存储在 MYI 文件这里，在 MYI 文件中找到索引值对应数据的磁盘地址后再从 MYD 文件中找到完整的数据

**在 MyISAM 存储引擎中，主键索引和普通索引在结构上没有区别，叶子结点统一存储的是数据的磁盘地址，只是主键索引要求关键字是唯一的**

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230116145439.png)



### InnoDB

在使用 InnoDB 存储引擎的表只有一个文件：`.idb`（存储索引和数据）

InnoDB 把索引划分成两大类：聚簇索引、非聚簇索引

- 聚簇索引：聚簇索引中索引键值的逻辑顺序和表数据行的物理顺序是一致的。聚簇索引中非叶子结点存储的是索引关键字，叶子结点存储的是数据。InnoDB 中索引和数据都存储在一个文件中，是因为数据是通过聚簇索引来组织表的，InnoDB 中的主键索引就是聚簇索引。
- 非聚簇索引：除了聚簇索引外，其他所有索引都是非聚簇索引。非聚簇索引中的非叶子结点存储的是索引，叶子结点存储的是对应数据行的主键，因此通过非聚簇索引查询数据时需要进行回表，涉及到两次查找。

InnoDB 主键索引和普通索引的结构，以及查询数据的检索路线：

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230116154959.png)





## MySQL 索引分类

- NORMAL（普通索引）：就是我们平常在字段上面建的普通索引
- UNIQUE（唯一索引）：在普通索引的基础上要求字段不允许有重复值，但可以有多个 NULL 值
- FULLTEXT（全文索引）：适合比较大量的数据字段，比如存储一些文章类或长文本类的数据，可以基于全文中某些关键字进行索引查询
- SPATIAL（空间索引）：空间索引是对空间数据类型的字段建立的索引，常见有地理坐标数据等，研究较少



## 索引规则

当一条 SQL 语句执行得比较慢的时候，需要去看执行计划分析原因。如果是全表扫描或者没有使用索引，那么就说明没有建立索引或者没有正确使用索引甚至是这个 SQL 语句破坏了索引的使用规则 。



### 索引的数量

一个表应该尽可能精简索引的数量，索引不能创建太多，因为一个索引对应一棵 B+ Tree，浪费空间，插入删除数据时可能涉及 B+ Tree 的分裂合并操作，导致更新索引树效率低。



### 索引的稳定性

频繁更新的字段不适合做索引，因为索引数据频繁地更新会伴随着 B+ Tree 上的索引的分裂和合并、重新排序，这个调整的过程是需要耗费性能的。如果这一行数据插入后，索引对应的字段一直不会被修改，这种情况是最好的。



### 索引的离散度

如果重复值太多（区分度太低），MySQL 会认为使用索引再回表的开销还不如直接全表扫描的开销大，反而会增加 IO 次数，往往会选择全表扫描这种方式。比如性别这种数据就不适合加索引，区分度非常低。

数据重复率越小越好，如果这一列数据都是唯一的，那么这一列加索引是最好的。**但是随机值不适合做索引**，比如 UUID 和身份证，随机值意味着无序，因为 B+ Tree 的索引是有序组织的，所以无序的数据插入删除也就意味着需要频繁分裂合并。



### 联合索引最左匹配

联合索引在 B+ Tree 中会按照从左到右的顺序建立关键字，所以在B+ Tree 中匹配时，优先匹配左边的索引，在左边索引相同的情况下才匹配右边的索引关键字，不能跳过左边索引而去匹配右边索引。比如一个包含 3 个字段的索引（c1，c2，c3），查询时可以用（c1）、（c1，c2）、（c1，c2，c3）这三种索引组合。



## 索引失效场景

- 索引列使用函数（replace、concat）、表达式（+-*/）。
- 索引列发生隐式转换。比如一个索引列是 varchar 类型，但是在查询时 SQL 语句中传入了 int 类型的条件，这种做法存在类型转化，会导致全表扫描。
- 模糊查询时使用 like % 前缀，和 B+ Tree 索引结构有关系，索引关键字都是从左往右排布的，当前缀未知的时候，就无法定位索引关键字，因此查询时只能进行全表扫描。
- 索引列使用 not like，和 like % 前缀一样，按照最左匹配原则，无法定位索引关键字



## 索引进阶使用

### 索引覆盖

使用普通索引查找数据的流程是先在普通索引树上查找到数据的主键，再去主键索引树上查找对应的数据，这其中有一次回表的过程。

索引覆盖的概念是：如果需要查询的字段列只包含联合索引列中的字段，那么在普通索引树上查找到具体的索引数据后，因为结点上包含了联合索引中的多个索引数据，从这个结点上取出所需字段数据即可，无需回表。索引覆盖往往和联合索引一起使用，因为单一索引没有索引覆盖的意义。

例如，有一个联合索引 `index(f1, f2, f3)` ，此时使用这个 SQL 语句：`select f1, f2, f3 from table1 where f1 = 'a'` ，那么只需要执行一次 B+ Tree 的树查找，不需要再次回表。

如果使用了索引覆盖，那么在执行计划中，`Extra` 列中会显示 `Using index` 。



### 索引条件下推

索引条件下推（Index Condition Push）的概念是：MySQL Server 层把与索引相关的条件下推给存储引擎层，由存储引擎层做进一步的数据筛选。核心的目标是：**尽可能地使用索引条件来减少回表操作，进而减少 IO 操作**。



#### 没开启索引条件下推前

- 存储引擎根据索引条件定位对应索引记录及其主键值
- 根据主键值去主键索引树上定位并读取完整的数据行
- 把数据行交给 Server 层检测是否满足 where 条件

执行计划中，`Extra` 列中会显示 `Using where` 



#### 开启索引条件下推后

- 存储引擎根据索引条件定位对应对应索引记录
- 判断 where 语句中其他条件能否用索引记录中的列来做检查，条件不满足，则处理下一行索引记录
- 条件满足，使用索引中的主键值去主键索引树上定位并读取完整的数据行
- 把数据行交给 Server 层，Server 层检测这些数据能否满足 where 条件的其余部分

执行计划中，`Extra` 列中会显示 `Using index condition` 



#### 相关参数

- 查看状态

  ```mysql
  select @@optimizer_switch;
  
  -- 结果
  index_merge=on,index_merge_union=on,index_merge_sort_union=on,index_merge_intersection=on,engine_condition_pushdown=on,index_condition_pushdown=on,mrr=on,mrr_cost_based=on,block_nested_loop=on,batched_key_access=off,materialization=on,semijoin=on,loosescan=on,firstmatch=on,duplicateweedout=on,subquery_materialization_cost_based=on,use_index_extensions=on,condition_fanout_filter=on,derived_merge=on,use_invisible_indexes=off,skip_scan=on,hash_join=on,subquery_to_derived=off,prefer_ordering_index=on
  ```

  

- 切换开关

  ```mysql
  set optimizer_switch="index_condition_pushdown=off";
  set optimizer_switch="index_condition_pushdown=on";
  ```

  

#### 使用场景

建表语句

```mysql
CREATE TABLE `t_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户名',
  `full_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '全名',
  `age` int(11) DEFAULT '18' COMMENT '年龄',
  `updated_date` date DEFAULT NULL COMMENT '更新日期',
  PRIMARY KEY (`id`),
  KEY `combined_key` (`user_name`,`full_name`,`age`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

可以看到创建了一个包含 3 列字段（user_name、full_name、age）的组合索引。



- 使用组合索引中，第一列进行了模糊查询

  ```mysql
  EXPLAIN SELECT * FROM `t_user` WHERE user_name like 'Shannon%' AND full_name = 'xiao ming' And age = 20;
  ```

  因为索引匹配规则是从左到右匹配，当使用 user_name 进行模糊查询时会导致即使正确使用组合索引，存储引擎最终也只能用上其中的 user_name 这一个字段来做筛选，后面两个字段需要交给 Server 层自行筛选

  

  使用 `EXPLAIN` 来查看执行计划，可以看到 `Extra` 列是 `Using Index Condition`

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230213160931.png)

  

  如果把索引条件下推关闭的话，可以看到 `Extra` 列是 `Using Where` 

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230213161118.png)

  

- 使用了组合索引中的第一列和第三列

  ```mysql
  EXPLAIN SELECT * FROM `t_user` WHERE user_name = 'Shannon Henry' AND age = 20;
  ```

  根据最左索引匹配规则，使用组合索引时必须严格按照组合索引中字段的顺序来使用，这么使用会导致存储引擎层只能使用 user_name 这个条件做筛选

  

  使用 `EXPLAIN` 来查看执行计划，可以看到 `Extra` 列是 `Using Index Condition`

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230213161256.png)

  

  如果把索引条件下推关闭的话，可以看到 `Extra` 列是 `Using Where`

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230213161335.png)



从两个例子中我们可以看到，虽然使用索引的方式导致组合索引不奏效，但是开启索引条件下推后存储引擎还是能把索引条件用上，减少进行回表的次数，从而达到减少 IO 次数的目的。

参考链接：[五分钟搞懂MySQL索引下推](https://fighter3.blog.csdn.net/article/details/120199122)


