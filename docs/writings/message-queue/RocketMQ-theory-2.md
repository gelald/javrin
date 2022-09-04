---
title: RocketMQ 原理分析（下）
icon: article
category:

- 干货
- 消息队列

tag:

- 原理
- RocketMQ

---

# RocketMQ 原理分析（下）

## Broker 消息刷盘怎么实现的

Broker 记录数据时会在其与磁盘之间增加一个缓存区，写入时先把数据写入到缓存，等到要刷盘的时候就一次性把缓存中的数据写入到磁盘文件中，但是无法避免在 Broker 宕机时丢失还没来得及持久化的数据。

消息刷盘是指消息到达 Broker 后，写入到 CommitLog 的过程。RocketMQ 提供了两种刷盘策略

- 同步刷盘：当消息到达 Broker 后，只有把消息写入到 CommitLog 日志文件中，才给生产者返回发送成功的响应。
- 异步刷盘：当消息到达 Broker 后，就给生产者返回数据发送成功了，并启动一个异步线程去把消息写入到 CommitLog 中。

## Broker 如何存储消息

RocketMQ 主要的存储文件包括 CommitLog、ConsumeQueue、IndexFile 文件

### CommitLog

CommitLog 文件存储消息内容及消息总长度，其中消息总长度固定 4 个字节。

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220903164152.png)

单个文件大小默认 1G，文件名为起始偏移量，长度为 20 位，左边补零。消息**顺序**写入日志文件，当文件满了，自动写入下一个文件。顺序写可以极大提升写入效率。
>1G=1073741824Byte，第一个文件文件名是`00000000000000000000`，那么第二个文件文件名就是`00000000001073741824`，因为第一个文件最多存储 1G 的内容，所以第二个文件的起始偏移量就是 1073741824，以此类推。

### ConsumeQueue

ConsumeQueue 文件存储了`CommitLog 文件中的偏移量`、`消息长度`、`消息 Tag 的 hashcode 值`。可以看到 ConsumeQueue 文件不存储消息的内容，它的定位是**基于 Topic 的 CommitLog 索引文件**！

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220903170125.png)

>为什么 Message Tag HashCode 的值是 8 个字节，Java 中`hashCode`方法不是返回 int 类型 (4个字节) 的值吗？
>
>因为在延时消息中，消息第一次投递时是投递到一个系统 Topic `SCHEDULE_TOPIC_XXXX` 下的队列，等待 `ScheduleMessageService` 服务进行二次投递，所以 Message Tag HashCode 记录了投递时间的时间戳，Java 时间戳的数据超出 int 数据类型的数据范围 (-2^32 ~ 2^32 -1)，所以这个值需要设计成 8 个字节。

ConsumeQueue 每一个存储单元固定是 20 个字节，一个文件能存储 30W 个单元，支持随机访问，一个文件的大小约 5M。

一个 MessageQueue 对应一个 ConsumeQueue 文件，主要的作用是记录当前 MessageQueue 被哪些消费者组消费到了 CommitLog 中哪一条消息。引入 ConsumeQueue 的目的主要是提高消息消费的性能。因为 RocketMQ 消费消息是围绕 Topic 来进行的，如果要遍历 CommitLog 文件并根据 Topic 检索消息的效率是非常低的。

ConsumeQueue 的构建机制是当消息到达 Broker 上的 CommitLog 文件后，由专门的线程产生消息转发任务，从而构建 ConsumeQueue 文件数据以及下文会提到的 IndexFile 文件数据。
>为什么我们在考虑Broker宕机时只考虑CommitLog记录丢失，而不考虑ConsumeQueue记录丢失呢？
>
>因为RocketMQ做了一致性保证，CommitLog中记录了消息的所有信息，包括消息内容、元数据(Topic、Tag等信息)，那么即使ConsumeQueue丢失，也可以从CommitLog中完全地恢复出来。

### IndexFile

IndexFile和消息的流转过程关系不大，主要是提供一种可以通过key或时间区间来的高校查询消息方法，提高检索消息的速度。

IndexFile的底层存储设计为在文件系统中实现HashMap结构，所以它的结构是Hash槽与Hash冲突的链表结构，但是具体落地时会把每个slot槽挂载的index索引单元都存放到indexes区中。

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220904145130.png)
>IndexFile 文件结构

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220904145646.png)
>一个 Index 索引单元结构

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220904145524.png)
>slot与index的逻辑关系图

#### 通过key查找消息

1. 通过传入的查询时间来确定查询哪一个IndexFile，因为IndexFile使用时间戳来命名，存储够2000W个索引单元就自动创建新的索引文件。
2. 计算key的hash值位于50W个hash slot中哪一个位置(key的hash % 50W)。
3. 每一个hash slot都有一个indexNo，指向链表中最后(最新)的一个索引单元。
4. 遍历索引项链表返回查询时间范围内的结果集。
5. 取其中的PhyOffset去CommitLog查询具体的消息。

## RocketMQ 如何对文件进行读写

### 零拷贝技术

## RocketMQ集群部署同步消息方式

### 异步刷盘和异步复制的区别

## RocketMQ 高可用机制

### 集群部署模式
- 多 master 模式：可以创建跨越多个 Broker 的 topic，如果一个 topic 有 8 个队列，那么两个 master 节点上会各有 4 个队列，当其中一个节点宕机时，这个 topic 还有 4 个队列可以使用，确保消息的生产和消费还是正常的。
- 多 master 多 slave 模式：当其中一个 master 节点宕机时，部分还没来得及消费的消息可以从 slave 节点中把还没来得及消费的节点消费掉，确保消息不会丢失。
  - 同步复制：当消息发送到其中一个 master 节点时，只有消息复制到 slave 节点上，才会给生产者发送消息发送成功的结果，这个复制过程是同步阻塞的。
  - 异步复制：当消息发送到其中一个 master 节点时，master 节点就会给生产者返回发送确认，并且会启动一个异步线程把消息复制到 slave 节点上。

### 刷盘
- 同步刷盘：当生产者把消息发送到 Broker 时，Broker 需要把消息持久化到磁盘中才能给生产者返回发送成功的结果。这种做法可靠性高，效率低。
- 异步刷盘：当生产者把消息发送到 Broker 时，Broker 会返回发送确认给生产者并且启动一个异步线程把消息持久化到磁盘中。这种做法牺牲了可靠性，但是效率高。

### 一般做法

如果要高可用和发送效率同时兼得，一般采取多 master 多 slave 同步复制+异步刷盘的模式。

因为把消息同步复制到从节点上的时间比把消息持久化到磁盘中的时间要短，可以确保消息发送的高并发，同时消息也不会丢失，因为一旦 master 节点宕机了，那么还是能在 slave 节点中找到。
刷盘需要把数据写入到磁盘中，速度是比较慢的，所以这个过程需要使用异步线程，否则生产者发送消息会变得缓慢。



## RocketMQ 如何保证高可用

## RocketMQ 如何保证负载均衡

## RocketMQ 消费者如何拉取消息


> 参考链接
>
> - [RocketMQ消息存储](https://blog.csdn.net/qq_21040559/article/details/122775049)
>
> - [RocketMQ（六）—IndexFile详解](https://blog.csdn.net/eclipse9527/article/details/122131297)