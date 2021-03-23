# 基础知识

概念：redis是一款高效的**NoSQL**(Not Only SQL)系列的**非关系型**数据库

关系型数据库和非关系型数据库的区别：

- 关系型数据库：
  1. 数据之间有关联关系（外键）
  2. 数据存储在硬盘上（查询速度相对慢）
- 非关系型数据库
  1. 数据之间没有关联关系。key-value形式
  2. 数据存储在内存中（查询速度相对快）
- 一般会将数据存储到关系型数据库中，在nosql数据库中备份存储关系型数据库中的数据

## 数据类型

- redis存储的是key，value形式，其中key都是字符串，value有5种不同的数据结构
- 字符串类型 string
  - 存储：`set key value`。如果key同名，则覆盖
  - 获取：`get key`。如果key不存在，返回`(nil)`
  - 删除：`del key`
- 哈希类型 hash（Map格式）
  - 存储一个键值对：`hset key field value`
  - 获取指定field对应的值：`hget key field`。如果key不存在，返回`(nil)`
  - 获取所有的field和value：`hgetall key`。如果key不存在，返回`(empty list or set)`
  - 删除：`hdel key field`
- 列表类型 list（LinkedList格式）可以添加一个元素到列表的头部或尾部
  - 将元素添加到列表左边：`lpush key value`
  - 将元素添加到列表右边：`rpush key value`
  - 范围获取：`lrange key start end`
  - 获取所有：`lrange key 0 -1`
  - 删除列表最左边的元素，并将元素返回：`lpop key`
  - 删除列表最右边的元素，并将元素返回：`rpop key`
- 集合类型 set（不允许重复）（HashSet格式）
  - 存储：`sadd key value`。存储成功返回1，存储失败（重复）返回0
  - 获取set集合中所有元素：`smembers key`
  - 删除：`srem key value`
- 有序集合类型 sortedset（不允许重复且自动排序）
  - 存储数据及其对应的分数：`zdd key score value` 排序是按分数从小到大排
  - 覆盖元素分数：`zdd key score value`，返回0
  - 获取范围元素：`zrange key start end`
  - 获取所有元素：`zrange key 0 -1`
  - 获取时携带分数：`zrange key 0 -1 withscores`
  - 删除：`zrem key value`

![](https://gitee.com/ngyb/pic/raw/master/007S8ZIlgy1gfsrojipmnj312q0tq4ha.jpg)

## 通用命令

- 查询所有键：`keys *` 后面使用正则表达式，*代表所有
- 查询键对应的value的类型：`type key`
- 删除指定的key，value：`del key`

## 持久化

redis是一个内存数据库，当redis服务器重启，数据会丢失，可以将redis内存中的数据持久化保存到硬盘文件中。

redis持久化机制：

1. RDB：默认方式。**在一定的时间间隔内，检测key的变化情况，然后持久化数据**。这种方式对性能的影响比较低。

   ```bash
   # 默认的配置：
   
   # after 900 sec (15 min) if at least 1 key changed
   # 900秒后如果有1个key被改变了 就持久化一次
   save 900 1
   # after 300 sec (5 min) if at least 10 keys changed
   # 300秒后如果有10个key被改变了 就持久化一次
   save 300 10
   # after 60 sec if at least 10000 keys changed
   # 60秒后如果有10000个key被改变了 就持久化一次
   save 60 10000
   
   
   # 修改配置文件后servet的启动方式：
   ./redis-server.sh redis.conf
   ```

   

2. AOF：日志记录方式，**可以记录每一条命令的操作。可以每一次命令操作后，进行持久化**。对性能影响较大。

   ```bash
   # 默认的配置
   # AOF默认关闭
   appendonly no
   # 需要改成yes才开启AOF
   
   # appendfsync always 每一次操作都进行持久化
   appendfsync everysec # 每隔一秒进行持久化（默认）
   # appendfsync no		 不进行持久化
   ```

## 应用场景

- 缓存（数据查询、短连接、新闻内容、商品内容等等）
- 聊天室在线好友列表
- 任务队列（秒杀、抢购）
- 数据过期处理
- 分布式集群架构中的session分离

# 高阶

## 缓存和数据库写入的先后顺序

### 旁路缓存策略(Cache Aside Pattern)

使用方式：

- 读：**先读缓存，缓存没有的话，再去读数据库，然后取出来放入缓存中，同时返回响应**

![](https://gitee.com/ngyb/pic/raw/master/20210317231719.png)

- 写：**先更新数据库，后删除缓存**

---

#### 为什么不在更新完数据库后，采取更新缓存的方案，而是将其删除？

- 频繁更新浪费资源。假如一个字段在一段时间内频繁进行更新，如果不删除缓存，那么要频繁去更新缓存，但是这个资源很可能只用了几次，所以造成了浪费
- 缓存数据计算复杂。假如缓存的数据是需要许多步骤(读取多张表)来计算出来，计算成本比较高，那么每修改一次，为了更新缓存还要再查询多张表来算一次
- 两种情况同时具备

在这种情况下，读请求过来的时候，发现 Redis 中没有数据，就会去数据库里读取，然后写入缓存中。

这也是一种懒加载方式，**只有缓存被需要的时候才会去计算**。这样可以避免大量计算及频繁更新。

---

#### 隐患：数据库更新成功，但缓存删除失败

![](https://gitee.com/ngyb/pic/raw/master/20210317232454.png)

![](https://gitee.com/ngyb/pic/raw/master/20210317232442.png)

![](https://gitee.com/ngyb/pic/raw/master/20210317232506.png)

1. 刚开始时数据库和缓存中的数据是一致的
2. 在写请求过来后，数据库更新成功，而缓存删除失败。这就导致数据库中的数据是最新的，但缓存中却依然存着旧数据。
3. 如果这时读请求过来，就会直接读取缓存中的旧数据返回了。



### 双写一致方案

- 先确保删除缓存，后更新数据库（**适用于并发量不高的业务场景**）

#### 假如更新数据库失败

![](https://gitee.com/ngyb/pic/raw/master/20210317232949.png)

![](https://gitee.com/ngyb/pic/raw/master/20210317232957.png)

![](https://gitee.com/ngyb/pic/raw/master/20210317233006.png)

如果你的项目并发量很低的话，那这么用没毛病，很少情况下才会出现数据不一致的问题。

#### 隐患：同时有一个读请求和写请求

写请求先删除Redis中的数据，然后去数据库进行更新操作。

读请求判断Redis中有没有数据，没有数据时去请求数据库，拿到数据后写入缓存中。

**但是写请求此时并没有更新成功，或者执行了一个事务还没有成功。**

**这样的话，读请求拿到未修改的旧数据写入缓存。过了一会儿，写请求将数据库更新成功了，那么此时缓存与库中的数据就不一致了。**

![](https://gitee.com/ngyb/pic/raw/master/20210318234534.png)

- 缓存延时双删策略

**写请求过来先把 Redis缓存删掉，等数据库更新成功后，异步等待一段时间再次把缓存删掉。**

第二次删除redis缓存是保证更新数据库成功后redis缓存能在下一次数据查询中正确设置数据

这种方案读取速度快，但是会出现短时间的脏数据。

![](https://gitee.com/ngyb/pic/raw/master/20210318234740.png)



