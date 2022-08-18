# 分布式锁

> 在 Java 并发编程中，我们会通过**锁**来避免由于竞争而造成的**数据不一致的问题**，如 `synchronized` 、`Lock`
>
> 但是在分布式集群工作的开发场景下，多线程会分布在不同机器上，这使得原本单机部署单体架构的并发控制锁策略失效！
>
> 为了实现跨 JVM 的互斥机制来控制资源共享的功能，需要使用分布式锁

## 概念

锁，解决的是多线程情况下的数据一致性的问题

分布式锁，解决的是分布式集群下的数据一致性的问题，它是控制分布式系统**同步访问共享资源**的一种方式



## 分布式锁注意事项

在**实现**分布式锁的过程中需要注意的：

- 锁的可重入性(递归调用不应该被阻塞、避免死锁)
- 锁的超时(避免死锁、死循环等意外情况)
- 锁的阻塞(保证原子性等)
- 锁的特性支持(阻塞锁、可重入锁、公平锁、联锁、信号量、读写锁)

在**使用**分布式锁时需要注意：

- 分布式锁的开销(分布式锁一般能不用就不用，有些场景可以用乐观锁代替)
- 加锁的粒度(控制加锁的粒度，可以优化系统的性能)
- 加锁的方式



## 分布式锁解决方案

### 基于数据库

基于数据库的分布式锁比较容易理解，但是操作数据库会有一定的性能问题

#### 基于数据库表

- 原理

  创建一张锁表，并且给某个字段添加唯一性约束。当需要锁住资源时，就增加一条记录；当需要释放锁的时候，就删除这条记录；唯一性约束可以保证多个请求同时提交到数据库时**有且只有一条记录会被插入成功**，那么操作成功的那个线程也就获得了锁，可以执行业务

- 不足

  无失效时间、不阻塞、不可重入

#### 基于数据库排他锁

- 原理

  如果使用的是 InnoDB 存储引擎，在查询语句（通过唯一索引进行查询）后面加 `for update` ，当前线程就成功获取了这个表的排他锁，只有这个线程可以任意读取修改数据，其他线程只能读取无法修改

- 不足

  不可重入、无法保证一定使用行锁（如果没有使用唯一索引，将会把整个表锁住）、排他锁长时间不提交导致占用数据库连接影响正常业务

### 基于缓存

相比于数据库的实现方式，缓存的实现方式在性能方面表现得更好一点。**通过超时时间来控制锁的失效时间**

#### 基于 redis 的 setnx 方法 + Lua 脚本

- 获取锁：使用 setnx 进行原子性操作
- 释放锁：检查 key 是否存在，且 key 对应的值是否和指定的值一样，一样才能释放锁

#### 基于 RedLock 算法

- 集群模式下的 Redis 分布式锁，基于 N 个完全独立的 Redis 节点

### 基于 ZooKeeper

- 获取锁：在 ZooKeeper 中指定的目录下创建一个临时有序节点；如果这个节点不是这个目录下序号最小的节点，那么需要等待前一个节点删除
- 释放锁：把这个临时节点删除，因为临时节点的生命周期是和会话的生命周期一致的，所以当服务宕机时，锁也会自动释放，避免产生死锁问题
- 不足：ZooKeeper 中创建和删除节点只能通过 Leader 服务器来执行，然后 Leader 服务器还需要把数据同步到所有的 Follower 服务器上，这样频繁的网络通信，性能不如缓存

在正常情况下，ZooKeeper 实现的分布式锁，客户端可以持有锁**任意长的时间**，这可以确保它做完所有需要的资源访问操作之后再释放锁。这避免了基于 Redis 的锁对于有效时间(lock validity time)到底设置多长的两难问题。