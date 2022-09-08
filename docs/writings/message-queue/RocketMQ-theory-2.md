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
>本篇原理分析主要讲解消息存储与读取方面

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

>为什么 Message Tag HashCode 的值是 8 个字节，Java 中`hashCode`方法不是返回 int 类型 (4 个字节） 的值吗？
>
>因为在延时消息中，消息第一次投递时是投递到一个系统 Topic `SCHEDULE_TOPIC_XXXX` 下的队列，等待 `ScheduleMessageService` 服务进行二次投递，所以 Message Tag HashCode 记录了投递时间的时间戳，Java 时间戳的数据超出 int 数据类型的数据范围 (-2^32 ~ 2^32 -1)，所以这个值需要设计成 8 个字节。

ConsumeQueue 每一个存储单元固定是 20 个字节，一个文件能存储 30W 个单元，支持随机访问，一个文件的大小约 5M。

一个 MessageQueue 对应一个 ConsumeQueue 文件，主要的作用是记录当前 MessageQueue 被哪些消费者组消费到了 CommitLog 中哪一条消息。引入 ConsumeQueue 的目的主要是提高消息消费的性能。因为 RocketMQ 消费消息是围绕 Topic 来进行的，如果要遍历 CommitLog 文件并根据 Topic 检索消息的效率是非常低的。

ConsumeQueue 的构建机制是当消息到达 Broker 上的 CommitLog 文件后，由专门的线程产生消息转发任务，从而构建 ConsumeQueue 文件数据以及下文会提到的 IndexFile 文件数据。
>为什么我们在考虑 Broker 宕机时只考虑 CommitLog 记录丢失，而不考虑 ConsumeQueue 记录丢失呢？
>
>因为 RocketMQ 做了一致性保证，CommitLog 中记录了消息的所有信息，包括消息内容、元数据 (Topic、Tag 等信息），那么即使 ConsumeQueue 丢失，也可以从 CommitLog 中完全地恢复出来。

### IndexFile

IndexFile 和消息的流转过程关系不大，主要是提供一种可以通过 key 或时间区间来的高效查询消息方法，提高检索消息的速度。

IndexFile 的底层存储设计为在文件系统中实现 HashMap 结构，所以它的结构是 Hash 槽与 Hash 冲突的链表结构，但是具体落地时会把每个 slot 槽挂载的 index 索引单元都存放到 indexes 区中。

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220904145130.png)
>IndexFile 文件结构

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220904145646.png)
>一个 Index 索引单元结构

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220904145524.png)
>slot 与 index 的逻辑关系图

#### 通过 key 查找消息

1. 通过传入的查询时间来确定查询哪一个 IndexFile，因为 IndexFile 使用时间戳来命名，存储够 2000W 个索引单元就自动创建新的索引文件。
2. 计算 key 的 hash 值位于 50W 个 hash slot 中哪一个位置 (key 的 hash % 50W)。
3. 每一个 hash slot 都有一个 indexNo，指向链表中最后（最新）的一个索引单元。
4. 遍历索引项链表返回查询时间范围内的结果集。
5. 取其中的 PhyOffset 去 CommitLog 查询具体的消息。

## RocketMQ 如何对文件进行读写

### ConsumeQueue 文件

ConsumeQueue 文件主要存储的是索引信息，数据量不大，并且是顺序读写，利用操作系统中的 `page cache` 机制的预读取作用下，读取 ConsumeQueue 文件的速度几乎接近直接读取内存数据，所以即使发生消息堆积，也不会影响 ConsumeQueue 文件的读取性能。

### page cache

`page cache` 是操作系统对文件的缓存，主要的目的是加速文件的读写。对于文件读取，操作系统会把文件内容读取到内存中，如果没能成功命中 `page cache` ，那么操作系统从磁盘上读取文件时，会顺序地对其他相邻块地数据文件进行预读取。对于文件写入，操作系统会先把修改写入到缓存中，而后通过异步的方式由 pdflush 内核线程将缓存内的数据刷盘到磁盘上。

### CommitLog 文件

CommitLog 文件存储消息，数据量大，虽然写入是顺序写不耗费太多性能，但是读取消息内容时会产生很多随机访问，随机读非常影响性能。

### 零拷贝

另外，RocketMQ 主要通过 MappedByteBuffer 对文件进行读写操作。其中，利用了 NIO 中的 FileChannel 模型将磁盘上的物理文件直接映射到用户态的内存地址中，将对文件的操作转化为直接对内存地址进行操作，从而极大地提高了文件的读写效率（正因为需要使用内存映射机制，故 RocketMQ 的文件存储都使用定长结构来存储，方便一次将整个文件映射至内存）。

## RocketMQ 消费者如何拉取消息

消费者会对 Broker 发起一个长轮询，如果对应的 Message Queue 没有数据，Broker 不会立即返回，而是把 PullRequest hold 住，等待有消息的时候或者长轮询的阻塞时间到了，就再重新处理该 Message Queue 上所有的 PullRequest。

```java
//PullMessageProcessor#processRequest
//如果没有拉取到数据
case ResponseCode.PULL_NOT_FOUND:
  //broker 和 消费者都允许请求挂起
  if (brokerAllowSuspend && hasSuspendFlag) {
      long pollingTimeMills = suspendTimeoutMillisLong;
      if (!this.brokerController.getBrokerConfig().isLongPollingEnable()) {
          pollingTimeMills = this.brokerController.getBrokerConfig().getShortPollingTimeMills();
      }

      String topic = requestHeader.getTopic();
      long offset = requestHeader.getQueueOffset();
      int queueId = requestHeader.getQueueId();
      //把原来的 request 封装成一个 PullRequest
      PullRequest pullRequest = new PullRequest(request, channel, pollingTimeMills,
          this.brokerController.getMessageStore().now(), offset, subscriptionData, messageFilter);
      //把 PullRequest 挂起
      this.brokerController.getPullRequestHoldService().suspendPullRequest(topic, queueId, pullRequest);
      response = null;
      break;
  }
```

其中 PullRequestHoldService 会有一个线程不停检查 Message Queue 中是否有消息以及请求是否超时：

```java
@Override
public void run() {
    log.info("{} service started", this.getServiceName());
    while (!this.isStopped()) {
        try {
            if (this.brokerController.getBrokerConfig().isLongPollingEnable()) {
                this.waitForRunning(5 * 1000);
            } else {
                this.waitForRunning(this.brokerController.getBrokerConfig().getShortPollingTimeMills());
            }

            long beginLockTimestamp = this.systemClock.now();
            //检查挂起的请求
            this.checkHoldRequest();
            long costTime = this.systemClock.now() - beginLockTimestamp;
            if (costTime > 5 * 1000) {
                log.info("[NOTIFYME] check hold request cost {} ms.", costTime);
            }
        } catch (Throwable e) {
            log.warn(this.getServiceName() + " service has exception. ", e);
        }
    }

    log.info("{} service end", this.getServiceName());
}

protected void checkHoldRequest() {
  for (String key : this.pullRequestTable.keySet()) {
      String[] kArray = key.split(TOPIC_QUEUEID_SEPARATOR);
      if (2 == kArray.length) {
          String topic = kArray[0];
          int queueId = Integer.parseInt(kArray[1]);
          final long offset = this.brokerController.getMessageStore().getMaxOffsetInQueue(topic, queueId);
          try {
              this.notifyMessageArriving(topic, queueId, offset);
          } catch (Throwable e) {
              log.error("check hold request failed. topic={}, queueId={}", topic, queueId, e);
          }
      }
  }
}
```

## RocketMQ 如何保证负载均衡

RocketMQ 负载均衡都在客户端完成，具体可以分为生产者和消费者

### 生产者的负载均衡

生产者的负载均衡主要体现在发送消息时进行队列选择的过程。

- 发送消息

生产者客户端发送消息最终会调用 `DefaultMQProducerImpl#sendDefaultImpl` 方法，其中发送时会进行队列选择：

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220907160241.png)

- 退避策略

其中在 `MQFaultStrategy` 的 `selectOneMessageQueue(final TopicPublishInfo tpInfo, final String lastBrokerName)` 方法中涉及到一个参数 `sendLatencyFaultEnable`，这个参数主要的用途是如果之前有发送失败的，需要做一定的策略来退避，降低发送失败的风险。比如上次请求的延迟超过 500ms，那就 3000ms 内不使用。如果这个设置关闭了，那么直接使用索引递增取模的方式来确定使用的队列。**`latencyFaultTolerance` 机制是实现消息发送高可用的核心关键所在**。

```java
public MessageQueue selectOneMessageQueue(final TopicPublishInfo tpInfo, final String lastBrokerName) {
    //规避策略是否打开
    if (this.sendLatencyFaultEnable) {
        try {
            int index = tpInfo.getSendWhichQueue().incrementAndGet();
            for (int i = 0; i < tpInfo.getMessageQueueList().size(); i++) {
                int pos = Math.abs(index++) % tpInfo.getMessageQueueList().size();
                if (pos < 0)
                    pos = 0;
                MessageQueue mq = tpInfo.getMessageQueueList().get(pos);
                //检查这个队列是否需要退避/不使用
                if (latencyFaultTolerance.isAvailable(mq.getBrokerName()))
                    return mq;
            }

            //如果所有队列不不满足使用方式，还有最后的方案
            final String notBestBroker = latencyFaultTolerance.pickOneAtLeast();
            int writeQueueNums = tpInfo.getQueueIdByBroker(notBestBroker);
            if (writeQueueNums > 0) {
                final MessageQueue mq = tpInfo.selectOneMessageQueue();
                if (notBestBroker != null) {
                    mq.setBrokerName(notBestBroker);
                    mq.setQueueId(tpInfo.getSendWhichQueue().incrementAndGet() % writeQueueNums);
                }
                return mq;
            } else {
                latencyFaultTolerance.remove(notBestBroker);
            }
        } catch (Exception e) {
            log.error("Error occurred when selecting message queue", e);
        }

        return tpInfo.selectOneMessageQueue();
    }
    //规避策略关闭则直接使用索引递增取模的方式
    return tpInfo.selectOneMessageQueue(lastBrokerName);
}
```

- 选择队列

在 `TopicPublishInfo` 中使用索引递增取模方式来确定使用的队列：

```java
public MessageQueue selectOneMessageQueue() {
    //索引递增，如果原本的值是 null 值，那么会随机选择一个值
    int index = this.sendWhichQueue.incrementAndGet();
    //模运算
    int pos = Math.abs(index) % this.messageQueueList.size();
    if (pos < 0)
        pos = 0;
    return this.messageQueueList.get(pos);
}
```

### 消费者负载均衡

消费者负载均衡主要体现在从消息队列中获取消息。因为一个 Topic 下可以绑定多个 Message Queue，这些 Message Queue 会分配给一个消费者组来消费。（消费者消费模式有有 Push 模式和 Pull 模式，其实都是基于 Pull 模式来从服务器拉取消息）

- 发送心跳包

消费者端发送心跳包为 Broker 提供元数据信息，以便后续做消费者端的负载均衡。

`ClientManageProcessor` 接收到心跳包后会注册客户端：
```java
public RemotingCommand heartBeat(ChannelHandlerContext ctx, RemotingCommand request) {
    RemotingCommand response = RemotingCommand.createResponseCommand(null);
    HeartbeatData heartbeatData = HeartbeatData.decode(request.getBody(), HeartbeatData.class);
    ClientChannelInfo clientChannelInfo = new ClientChannelInfo(
        ctx.channel(),
        heartbeatData.getClientID(),
        request.getLanguage(),
        request.getVersion()
    );

    for (ConsumerData data : heartbeatData.getConsumerDataSet()) {
        ...
        //注册消费者
        boolean changed = this.brokerController.getConsumerManager().registerConsumer(
            data.getGroupName(),
            clientChannelInfo,
            data.getConsumeType(),
            data.getMessageModel(),
            data.getConsumeFromWhere(),
            data.getSubscriptionDataSet(),
            isNotifyConsumerIdsChangedEnable
        );
        ...
    }

    for (ProducerData data : heartbeatData.getProducerDataSet()) {
        //注册生产者
        this.brokerController.getProducerManager().registerProducer(data.getGroupName(),
            clientChannelInfo);
    }
    return response;
}
```

- 注册消费者客户端

`ConsumerManager` 收到注册请求时，一方面会把消费者客户端维护到 `consumerTable` 中，另一方面会把封装后的客户端网络通道信息维护到 `channelInfoTable` 中：
```java
public boolean registerConsumer(final String group, final ClientChannelInfo clientChannelInfo,
    ConsumeType consumeType, MessageModel messageModel, ConsumeFromWhere consumeFromWhere,
    final Set<SubscriptionData> subList, boolean isNotifyConsumerIdsChangedEnable) {

    //如果本次请求注册的客户端之前没有保存过的话就保存起来，如果保存过只更新网络通道信息
    ConsumerGroupInfo consumerGroupInfo = this.consumerTable.get(group);
    if (null == consumerGroupInfo) {
        ConsumerGroupInfo tmp = new ConsumerGroupInfo(group, consumeType, messageModel, consumeFromWhere);
        ConsumerGroupInfo prev = this.consumerTable.putIfAbsent(group, tmp);
        consumerGroupInfo = prev != null ? prev : tmp;
    }

    //更新网络通道信息
    boolean r1 = consumerGroupInfo.updateChannel(clientChannelInfo, consumeType, messageModel, consumeFromWhere);
```

- 负载均衡入口

负载均衡服务 `RebalanceService` 线程启动时会让所有的消费者都调用负载均衡逻辑。

```java
//RebalanceService
@Override
public void run() {
    log.info(this.getServiceName() + " service started");

    while (!this.isStopped()) {
        this.waitForRunning(waitInterval);
        //负载均衡
        this.mqClientFactory.doRebalance();
    }

    log.info(this.getServiceName() + " service end");
}
```

无论是哪一种类型(Push、Pull)的消费者，最终都会调用负载均衡核心类 `RebalanceService` 的 `rebalanceByTopic()` 方法，这个方法中对广播模式和集群模式分类处理了，广播模式下每一条消息都会发到每一个消费者实例上，我们主要看集群模式下的负载均衡实现。

```java
//RebalanceService#rebalanceByTopic核心逻辑
private void rebalanceByTopic(final String topic, final boolean isOrder) {
    switch (messageModel) {
        case CLUSTERING: {
            //根据Topic获取与这个Topic绑定的消息队列
            Set<MessageQueue> mqSet = this.topicSubscribeInfoTable.get(topic);
            //根据Topic和消费者组获取所有的消费者Id
            List<String> cidAll = this.mQClientFactory.findConsumerIdList(topic, consumerGroup);
            
            if (mqSet != null && cidAll != null) {
                List<MessageQueue> mqAll = new ArrayList<MessageQueue>();
                mqAll.addAll(mqSet);
                //对所有的消息队列和消费者实例进行排序，保证一个consumerGroup中的所有consumer看到的视图保持一致，确保一个MessageQueue不会被多个消费者分配
                Collections.sort(mqAll);
                Collections.sort(cidAll);
                //消费者消息分配负载均衡策略，默认是使用AllocateMessageQueueAveragely平均分配算法
                AllocateMessageQueueStrategy strategy = this.allocateMessageQueueStrategy;

                List<MessageQueue> allocateResult = null;
                try {
                    //根据这个策略来获取将要使用的消息队列
                    allocateResult = strategy.allocate(
                        this.consumerGroup,
                        this.mQClientFactory.getClientId(),
                        mqAll,
                        cidAll);
                } catch (Throwable e) {
                    log.error("AllocateMessageQueueStrategy.allocate Exception. allocateMessageQueueStrategyName={}", strategy.getName(),
                        e);
                    return;
                }

                //对比新分配的MessageQueue及consumer当前的负载集合，看看是否有MessageQueue的变化，并依据变化做出不同的处理
                boolean changed = this.updateProcessQueueTableInRebalance(topic, allocateResultSet, isOrder);
  
            }
            break;
        }
    }
}
```

分配队列 6 种策略：
- `AllocateMessageQueueAveragely` ：平均分配策略，将所有 Message Queue 平均地分配每一个消费者实例。这是默认的分配策略。
  - 如果消费者实例数量和消息队列数量进行除法运算可以除尽，那么各个消费者实例互相平分这些消息队列。
  - 如果不能除尽，假设余数是n，那么前n个消费者实例就平分这n个消息队列。
  - 如果消费者实例数量大于消息队列数量，那么位于消费者实例前面的消费者来平分这些消息队列，靠后的消费者实例不进行消费。
  ```java
    public List<MessageQueue> allocate(String consumerGroup, String currentCID, List<MessageQueue> mqAll, List<String> cidAll) {
        List<MessageQueue> result = new ArrayList<MessageQueue>();
        //查询自己在消费者实例集合中的索引
        int index = cidAll.indexOf(currentCID);
        //模运算的意义在于判断两个集合的长度是否能除尽
        int mod = mqAll.size() % cidAll.size();
        // 如果消息队列的数量小于消费者实例的个数，那么就一个消费者分配一个队列，直到分配完所有消息队列
        // 如果mod为0的话 那么所有消费者实例完全平均分配所有的消息队列
        // 如果mod不为0，那么当前消费者所处的位置小于mod，那就要多负载一个队列，大于mod就消费是平均数
        int averageSize =
            mqAll.size() <= cidAll.size() ? 1 : (mod > 0 && index < mod ? mqAll.size() / cidAll.size()
                + 1 : mqAll.size() / cidAll.size());
    }
  ```
- `AllocateMessageQueueAveragelyCircle` ：环形平均分配策略
  - 比如有7个消息队列，3个消费者实例，那么1号消费者分配到的消息队列是1、4、7；2号消费者分配到的队列是2、5；3号消费者分配到的队列是3、6。
- `AllocateMachineRoomNearby` ：就近机房分配
- `AllocateMessageQueueByMachineRoom` ：指定机房分配
- `AllocateMessageQueueByConfig` ：配置化分配
- `AllocateMessageQueueConsistentHash` ：一致性hash分配

```java
private boolean updateProcessQueueTableInRebalance(final String topic, final Set<MessageQueue> mqSet, final boolean isOrder) {
    boolean changed = false;
    //this.processQueueTable ：消费者当前的负载集合
    //mqSet ：新分配的负载集合
    Iterator<Entry<MessageQueue, ProcessQueue>> it = this.processQueueTable.entrySet().iterator();
    //遍历当前负载的MessageQueue集合
    while (it.hasNext()) {
        Entry<MessageQueue, ProcessQueue> next = it.next();
        MessageQueue mq = next.getKey();
        ProcessQueue pq = next.getValue();

        if (mq.getTopic().equals(topic)) {
            if (!mqSet.contains(mq)) {
                //MessageQueue不在新分配的队列集合中，说明这一次负载均衡后这个消息队列被分配给其他消费者实例了
                //需要暂停消费者在这个消息队列上面的消费，具体的做法是设置dropper为true，意为剔除
                //并调用removeUnnecessaryMessageQueue保存消费进度并根据返回结果判断是否要从processQueueTable中删除
                pq.setDropped(true);
                if (this.removeUnnecessaryMessageQueue(mq, pq)) {
                    it.remove();
                    changed = true;
                    log.info("doRebalance, {}, remove unnecessary mq, {}", consumerGroup, mq);
                }
            }
        }
    }

    List<PullRequest> pullRequestList = new ArrayList<PullRequest>();
    //遍历新分配的MessageQueue集合mqSet
    for (MessageQueue mq : mqSet) {
        //如果processQueueTable中不包含这个消息队列则说明该消息队列是本次新分配的
        if (!this.processQueueTable.containsKey(mq)) {
            //删除内存中该消息队列的消费进度
            this.removeDirtyOffset(mq);
            ProcessQueue pq = new ProcessQueue();
            //从磁盘中读取这个消息队列的消费进度
            long nextOffset = this.computePullFromWhere(mq);
            if (nextOffset >= 0) {
                //把新分配的消息队列放到自己的processQueueTable中
                ProcessQueue pre = this.processQueueTable.putIfAbsent(mq, pq);
                if (pre != null) {
                    log.info("doRebalance, {}, mq already exists, {}", consumerGroup, mq);
                } else {
                    //构建PullRequest
                    log.info("doRebalance, {}, add a new mq, {}", consumerGroup, mq);
                    PullRequest pullRequest = new PullRequest();
                    pullRequest.setConsumerGroup(consumerGroup);
                    //并且把消费进度加入到PullRequest中，计算从哪里开始拉取消息
                    pullRequest.setNextOffset(nextOffset);
                    pullRequest.setMessageQueue(mq);
                    pullRequest.setProcessQueue(pq);
                    pullRequestList.add(pullRequest);
                    changed = true;
                }
            }
        }
    }
    //调度这个PullRequest，具体做法是
    //把这个PullRequest放到PullMessageService中的pullRequestQueue并唤醒PullMessageService线程
    //PullMessageService会将PullRequest发送到Broker，Broker根据请求信息封装好消息数据并将其发送给具体的消费者实例
    this.dispatchPullRequest(pullRequestList);

    return changed;
}

```

消息消费队列在同一消费组不同消费者之间的负载均衡，其核心设计理念是：

- 一个消息消费队列在同一时间只允许被同一消费组内的一个消费者消费
- 一个消息消费者能同时消费多个消息队列

## RocketMQ 集群部署同步消息方式

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


> 参考链接
>
> - [RocketMQ 消息存储](https://blog.csdn.net/qq_21040559/article/details/122775049)
>
> - [RocketMQ（六）—IndexFile 详解](https://blog.csdn.net/eclipse9527/article/details/122131297)
>
> - [RocketMQ源码分析之RebalanceService](https://blog.csdn.net/qq_25145759/article/details/111929810)