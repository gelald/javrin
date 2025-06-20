---
title: MySQL 事务解析
icon: file-lines
category:

- 数据库
- 文章

tag:

- MySQL
- 事务
- 锁

---


# MySQL 事务解析

> 事务：一个包含多个操作的最小工作单元，这些操作要么同时成功，要么同时失败。本篇介绍事务，由于 MyISAM 存储引擎不支持事务，所以本篇默认存储引擎为 InnoDB。



## 事务 ACID 特性

- Atomicity：原子性，一个事务内的多个操作要么全部成功，要么全部失败

- Isolation：隔离性，数据库系统提供的隔离机制保证事务在不受外部并发操作影响的独立环境下运行

- Duration：持久性，只要这个事务提交成功，那么这个事务对数据的操作是永久性生效的

- Consistency：一致性，逻辑一致性，数据库总时从一个一致状态变到另一个一致状态（事务对数据修改前后的**数据总体保证一致**，银行转账的例子）




## MySQL 如何保证原子性

原子性要保证多个操作同时成功或同时失败，同时失败时需要把数据还原到执行前的状态，这个操作由回滚机制来保证。

回滚机制：在发生异常的情况下，把所有已经更改过的数据还原到之前的状态，事务的回滚机制由 undo log 来保证实现。




## undo log

undo log 记录事务中的增删改操作，又称回滚日志，顾名思义它其中一个作用就是实现了回滚机制，undo log 按照操作类型可以大致分为两大类：insert undo log、update undo log。在了解 undo log 前先了解一些 InnoDB 存储引擎下记录的额外信息



### 记录的隐藏字段

- trx_id：当前事务标识，事务开启时会申请一个事务标识，这个标识会严格递增，并向数据行插入最近操作它的一个事务标识
- roll_pointer：指向当前记录回滚时的 undo log，然后每一个 undo log 也会记录前一个版本的 undo log 地址，形成一个历史版本链，是 MySQL 事务回滚机制的实现手段，保证了事务的原子性

### 记录的头信息

- delete_mask：类似逻辑删除，标记这一行数据是被删除的，由于 MVCC 的存在，不能直接把一行数据删除掉



### insert undo log

insert 操作产生的 undo log，**insert 操作在事务提交前只对当前事务可见，因此 insert undo log 在该事务提交后就删除**。

#### insert 操作

insert 操作产生的 undo log 格式大致如下：

<img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230215094744.png" style="zoom: 50%;" />

- next record：下一个 undo log 地址
- undo type：对应的日志类型，这里是 insert 操作的日志类型，所以是 trx_undo_insert_rec
- undo no：undo log 日志编号，每一个新的事务，这个编号都会 +1
- table id：表的标识
- prev record：上一个 undo log 地址
- primary key field：记录主键对应字段的长度和内容，如果主键由多个字段组成，那么这里会有多组 length 和 value



当发生 insert 操作后，向表中插入数据，并且向 undo log 中插入一个 TRX_UNDO_INSERT_REC 类型的 undo log，同时插入的这条新纪录中的 roll_pointer 会指向这个 undo log。undo log 中只会记录这行数据的主键信息，因为当发生回滚需要逆向操作时只需要通过主键定位到数据行然后删除对应的数据。

<img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230216000301.png" style="zoom:50%;" />




### update undo log

update、delete 操作产生的 undo log，**update / delete 需要维护多版本信息，它是实现 MVCC 乐观锁的机制，事务提交后不一定会立刻删除**。

#### delete 操作

delete 操作产生的 undo log 格式大致如下：

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230215221542.png)

- trx_id：记录了产生这个历史版本事务 id，用作后续 MVCC 中的版本可见性判断
- roll_pointer：指向的是该记录的上一个版本的位置，沿着 roll_pointer 可以找到一个 Record 的所有历史版本
- index field：记录所有索引列的位置、长度、内容信息
- undo type：delete undo log 的 undo type 是 trx_undo_del_mark_rec



当发生 delete 操作时，由于 MVCC 需要保留记录的多个历史版本，这条记录的历史版本有可能正在使用，因此这条记录不能被直接删除，只能先修改 delete_mask 为已删除的状态；当事务提交后，会有后台线程把这条记录在适当的时间删除。

如果这条记录是同一个事务内新增的，那么 delete undo log 的roll_pointer 会指向这个 insert undo log，形成一个链表。

<img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230216000454.png" style="zoom:50%;" />



#### update 操作

update 操作产生的 undo log 格式大致如下：

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230215222745.png)

- update field：记录被修改的字段的位置、长度、被修改前的值，用于回滚恢复，因为要回滚每一个被修改的字段



其中 update 操作还可以分成两类：

- 更新主键字段

  如果 update 操作更新主键字段，那么总体分两步走：

  - 在事务提交前，不会直接把旧记录删除，因为 MVCC 机制的存在，有可能其他的事务将要访问到这条记录，**所以是修改这条记录的 delete_mask**，标记为已被删除（相当于做一个逻辑删除），本次操作生成一份 delete undo log
  - 根据 update 语句上的各项更新值，**创建一条新的记录插入到表中**，本次操作生成一份 insert undo log

  

- 更新其他字段

  如果 update 操作更新其他字段，也可以细分为两个情况

  - 更新的列所占用的存储空间没有发生变化，那么可以直接在原来的记录上修改。这种 update undo log 的 undo type 是 trx_undo_upd_exist_rec

  - 更新的列所占用的存储空间发生了变化，那么需要先在聚簇索引树上删除旧记录，然后根据更新后的值创建一条新的记录插入到聚簇索引树中

    > 注意，这里的删除，就不是像前面那样直接修改 delete_mask， 而是由用户线程同步执行真正的删除，因为这里有锁的保护，不存在并发问题。



## MySQL 如何保证持久性

持久性主要由 Redo Log 来保证的。

由于数据修改操作会优先写入到 Buffer Pool 中，由后台线程异步地把数据写入到磁盘中去。为了避免因为服务器宕机，而后台线程还没把数据写入到磁盘中而带来的数据丢失的风险，修改操作在写入 Buffer Pool 的同**时也会把数据操作记录写入到 Log Buffer 中**，在事务提交后，就把 Log Buffer 中的数据写入到磁盘的 Redo Log 中。

一旦数据库崩溃并且事务已提交但数据未同步到数据库时，**可以使用 Redo Log 来进行崩溃恢复**。这样事务一旦提交，事务对数据的操作都是能追溯到的，因此保证了事务的持久性。



## MySQL 如何保证隔离性

> 隔离性主要解决多个事务同时进行时发生竞争的问题



### 事务隔离性问题

- 脏读：一个事务中**读取到其他事务未提交的数据**，导致前后两次查询得到的数据结果不一致
- 不可重复读：由于其他事务提交了修改数据造成了一个事务前后两次查询**同一条记录时得到的结果不一致**，**侧重数据被修改**
- 幻读：由于其他事务提交了插入或删除数据造成一个事务前后两次**区间范围查询的结果的条数不一致**，**侧重数据新增或删除**



### 事务隔离级别

针对以上问题，事务提供了隔离标准来避免

| 隔离级别                        | 脏读   | 不可重复读 | 幻读             |
| ------------------------------- | ------ | ---------- | ---------------- |
| Read Uncommitted（读未提交）    | 可能   | 可能       | 可能             |
| Read Committed（读已提交）      | 不可能 | 可能       | 可能             |
| **Repeatable Read**（可重复读） | 不可能 | 不可能     | InnoDB下可以避免 |
| Serializable（串行化）          | 不可能 | 不可能     | 不可能           |

从上到下，事务的隔离级别逐渐升高，但是效率逐渐降低，所以事务的隔离级别就是一个性能与安全权衡的结果

**InnoDB 默认的事务隔离级别是 Repeatable Read**



查看事务隔离级别：

```mysql
SELECT @@TRANSACTION_ISOLATION;
```

设置事务隔离级别：

```mysql
SET [ SESSION | GLOBAL ] TRANSACTION ISOLATION LEVEL {READ UNCOMMITTED | READ COMMITTED | REPEATABLE READ | SERIALIZABLE };
```



### MySQL 不同的事务隔离级别实现方式

这个问题其实回归到解决并发情况下资源竞争的问题，针对复杂的并发问题，MySQL 是采用 MVCC 和 LBCC 协同工作的手段来解决的



### MVCC

MVCC (Multi Version Concurrency Control 多版本的并发控制) 的核心点：

- 一个事务只能看到当前事务第一次查询前已提交的修改和本次事务的修改
- 一个事务不能看到当前事务第一次查询后创建的事务和未提交的事务

MVCC 的实现依赖于 undo log 的版本链和 ReadView，**通过维护一行记录的多个版本，在不加锁的情况下避免并发读写时的冲突**



#### ReadView

为了判断版本链中哪一个版本对当前事务是可见的，MySQL 提出了 ReadView 对象：

- m_ids：生成 ReadView 时，**当前系统中活跃的事务 id 数组**
- min_trx_id：生成 ReadView 时，当前系统中活跃的最小的事务 id
- max_trx_id：**生成 ReadView 时，当前系统应该为下一个事务分配的事务 id**
- creator_trx_id：生成该 ReadView 的事务 id（当前事务 id ）



判断版本链中版本是否可见的逻辑

> 我们前面提到一行记录中有几个隐藏字段，其中 trx_id 是最近操作过这个记录的事务 id，另外每一个记录都会保留它的多个历史版本

1. 如果被访问的版本中的 **trx_id = creator_trx_id** ，那么说明这个版本是当前事务修改过的，那么这个版本是可以被当前事务访问的
2. 如果被访问的版本中的 **trx_id < min_trx_id**，那么说明操作这个版本的事务在生成 ReadView 前已经提交了，那么这个版本是可以被当前事务访问的
3. 如果被访问的版本中的 **trx_id >= max_trx_id**，那么说明操作这个版本的事务在生成 ReadView 后才开启，那么这个版本是不可以被当前事务访问的，需要在历史版本链上往前寻找可以被访问的版本
4. 如果被访问的版本中的 **trx_id >= min_trx_id 并且 trx_id < max_trx_id，那么要判断这个版本的 trx_id 是否在 m_ids 数组中**：
   1. 如果这个 trx_id 目前还存在于 m_ids 数组中，那么说明目前操作这个版本的事务还是一个未提交的状态，那么这个版本是不可以被当前事务访问的，需要在历史版本链上往前寻找可以被访问的版本
   2. 如果这个 trx_id 不在 m_ids 数组中，那么说明操作这个版本的事务已经提交事务了，那么这个版本是可以被当前事务访问的



#### 如何支持 Read Committed 和 Repeatable Read 这两种事务隔离级别？

- Read Committed：

  在事务开启后，在每次读取数据前都生成一个 ReadView。**所以在本事务没提交前，能够读取到其他事务已经提交的修改，包括对数据的修改、还有新增删除数据。**

- Repeatable Read：在事务开启后，只在第一个查询前生成一个 ReadView，在后面的查询都重复用这一个 ReadView。**所以在本事务开启后，其他事务的提交，都无法读取到，因为这些记录版本的 trx_id 都会大于 max_trx_id，也就没有不可重复读和幻读的问题。**



### LBCC

除了 MVCC 外，MySQL 还提供了 LBCC (Lock Based Concurrency Control 基于锁的并发控制) 的核心点就是**加锁**。通过加锁来解决读写冲突问题，基于锁的机制就使得数据库无法支持并发事务的读写操作，这种方案在一定程度上影响了操作数据的效率。



#### 加锁方式

- MyISAM 只支持表锁

  ```mysql
  lock table xxx write;
  lock table xxx read;
  unlock table;
  ```

  

- InnoDB：既支持表锁，也支持行锁。锁粒度越小，并发性能越高。

  ```mysql
  select xxx from xxx lock in share mode; -- 共享锁
  select xxx from xxx for update; -- 锁住整个表，如果使用到索引就只锁当前记录
  
  insert、update、delete -- 这些MySQL会自动帮我们
  ```

  

#### InnoDB 中的锁

- 共享锁

  当一个事务给数据加上共享锁后，自己事务和其他事务都不能对锁定的数据进行修改，但是其他事务可以读取到被锁定的数据，并且其他事务也能继续给这些数据加共享锁，当事务提交时，共享锁自动释放

  ```mysql
  select * from xxxtable where xxx lock in share mode;
  ```

  

- 排他锁

  当一个事务给数据加上排他锁后，其他事务就不能再给这些数据加共享锁、排他锁，只有获取了排他锁的事务才可以对数据进行读写，直到这个事务提交释放排他锁

  ```mysql
  -- insert、delete、update语句自动加上排他锁
  
  -- select语句可以手动加上排他锁
  select * from xxxtable where xxx for update;
  ```

  

- 意向锁

  意向锁是一种特殊的锁，由存储引擎维护，用户无法操作，分为意向共享锁和意向排他锁

  当事务准备给数据行加共享锁 / 排他锁时，加锁前必须先取得该表的意向共享锁 / 意向排他锁

  意向锁的意义：**意向锁就像是一个标志，如果一个事务试图对这个表上加共享锁或排他锁，必须先确认没有其他事务已经锁定这个表内任意一行数据，意向锁的存在使得加锁前不需要进行全表扫描，效率更高**



#### 锁的内容

锁的内容是索引，**InnoDB** 中的**行锁**的实现依赖于**索引**，一旦某个加锁操作没有使用到索引，那么该锁就会退化为**表锁**，因为如果没有使用索引来加锁，那么 InnoDB 会做全表扫描把这张表的聚簇索引全部锁住，造成了锁表的现象

如果通过二级索引来加锁，因为二级索引上保存的主键值，锁住二级索引后，也会把主键索引锁住



#### 锁算法

根据锁住的内容/区间不同，InnoDB 有三种锁的算法

- 记录锁

  使用**聚簇索引或者唯一索引**做等值查询，精准匹配到的某一条记录时会使用记录锁

  ```mysql
  select * from user where id = 4 for update;
  ```

  

  锁定了 id = 4 这个索引，意味着 id = 4 这行记录不能被操作

  <img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230218185352.png" style="zoom:50%;" />

  

- 间隙锁

  **间隙锁是 InnoDB 在 Repeatable Read 事务隔离级别下用于解决当前读的幻读问题的手段**

  范围查询时，定位到一段范围内的索引记录时会使用间隙锁

  ```mysql
  select * from emp where empid > 40 for update;
  ```

  

  假设这个表中有 50 条数据，上面这条 SQL 语句锁定了一个开区间：(40, +∞) ，虽然这个区间内的记录 (empid = 41 ~ 50) 都会被锁定，但是间隙锁锁定的不仅仅是一个区间中的每一条记录，而是整个区间，如果这时一个事务想要插入一条 empid = 51 的数据，也是无法插入的

  <img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230218193343.png" style="zoom:50%;" />

  

- 临键锁

  临键锁相当于记录锁 + 间隙锁，因为它同时锁定索引记录和索引范围区间，**它是 MySQL 中的默认锁算法**

  每个数据行的**非唯一索引**上都有一把临键锁，当某个事务持有该临键锁时，会锁住一段左开右闭区间的数据。唯一索引包括主键索引列上不存在临键锁，如果对主键索引进行范围查询，那么会给这个范围内每一个符合条件的行加行锁。

  假设现在有一张表，存储引擎是 InnoDB，隔离级别是 Repeatable Read，id 是主键，age 是普通索引

  | id   | age  | name |
  | ---- | ---- | ---- |
  | 5    | 13   | 张三 |
  | 18   | 20   | 李四 |
  | 46   | 28   | 王五 |

  

  那么在 age 列上潜在的临键锁

  - (-∞, 13]
  - (13, 20]
  - (20, 28]
  - (28, +∞)

  

  在事务 1 中执行：

  ```mysql
  -- 根据非唯一索引列锁住某条记录
  select * from user where age = 13 for update;
  -- 或者根据非唯一索引列update某条记录
  update user set name = '小明' where age = 13;
  ```

  以上无论哪一句执行后，在事务 2 中执行这条语句都会被阻塞

  ```mysql
  insert into user values(7, 15, '小张');
  ```

  因为事务 1 在操作 age = 13 这条记录时，取得了 (13, 20] 这个区间的临键锁，其他事务操作这个区间内的数据会被阻塞



#### 死锁问题

只要加锁，就要面临死锁问题，出现条件：

- 存在两个或两个以上的事务
- 锁资源只能被同一个事务持有
- 每个事务都持有锁并且申请新的锁
- 事务之间因为持有锁和申请锁导致彼此循环等待



MySQL 可以自动检测死锁，一旦检测到死锁，就会结束当前出现死锁的事务

同时，事务竞争锁时默认等待时间是 50 秒，超过这个时间还没竞争成功就放弃竞争



应用层面避免死锁的方式：

- 操作多张表时，尽量以相同的顺序来操作（避免形成环形等待）
- 尽量避免大事务，大事务往往占用的锁资源更多，更容易出现死锁



### 快照读与当前读

- 当前读

  加共享锁、排他锁的语句都是当前读，读取的是记录的最新版本，加锁是保证不被其他事务修改当前记录，当前读是基于临键锁来实现的

- 快照读

  不加锁的 select 操作就是快照读，快照读的前提是隔离级别不是串行化，因为在串行化隔离级别下快照读会退化为当前读，快照读是基于 MVCC 来实现的



### InnoDB RR 隔离级别下如何解决幻读问题

数据查询可以分为快照读与当前读，在 Repeatable Read 隔离级别下 InnoDB 解决幻读问题也分这两种情况

- 快照读

  不加锁的 select 操作就是快照读，读取到的数据可能不是最新版本

  当我们在读取数据的时候是【快照读】的情况下是通过 【MVCC】 来解决【幻读】问题的，因为在事务开启后第一次查询前会生成一个 ReadView，可以帮助我们判断这行记录当前版本是否可以被访问，如果不可以被访问就去 undo log 历史版本链查找可以访问的版本

- 当前读

  加共享锁、排他锁的 SQL 语句都是当前读，读取到的数据是记录的最新版本

  当我们在读取数据的时候是【当前读】的情况下是通过【临键锁】来解决【幻读】问题的，因为在事务开启后，访问这条数据会拿到这个数据对应非唯一索引列上的临键锁，锁住一个区间范围，其他事务无法对这个范围区间进行插入、删除数据



## MySQL 如何保证一致性

数据库通过原子性（A）、隔离性（I）、持久性（D）来保证一致性（C）。其中一致性是目的，原子性、隔离性、持久性是手段。因此数据库必须实现AID三大特性才有可能实现一致性。


## 总结

首先简单了解了 MySQL 的事务的 ACID 四大特性，知道了原子性、持久性、隔离性都是实现一致性的手段，然后进一步学习了 MySQL 如何分别实现这三种事务特性。

了解到 undo log 的作用，主要在事务回滚方面和提供 MVCC 历史版本链方面提供帮助，是实现原子性、隔离性的重要手段。

其次在持久性方面，redo log 的崩溃恢复功能也给持久性提供了保障，保障了事务一旦提交，对数据的修改就是持久的。

最后隔离性方面学习到事务隔离性问题与事务隔离级别，通过无锁的方式 MVCC 和有锁的方式 LBCC 共同作用下实现各事务隔离级别。
