---
title: RocketMQ 操作落地 (rocketmq-client 方式）
icon: article
category:

- 干货
- 消息队列

tag:

- 基础
- RocketMQ

---

# RocketMQ 操作落地 (rocketmq-client 方式）
>本文使用 rocketmq-client 的集成方式展示 RocketMQ 的常见用法
>
>源码地址：[rocketmq-learning](https://github.com/gelald/rocketmq-learning)

## RocketMQ 普通消息发送

### 普通消息同步发送

生产者向 RocketMQ 发送一条消息，RocketMQ 返回生产者其发送结果，可用于判断是否发送成功。

代码实现：

>以下是核心代码片段，详情可以查看 GitHub 上的源码：[rocketmq-learning](https://github.com/gelald/rocketmq-learning)，如果觉得对你有帮助，希望可以给我个小星星鼓励鼓励噢~

- 生产者定义

```java
@Bean
public DefaultMQProducer defaultMQProducer() throws MQClientException {
    // 创建消息生产者
    DefaultMQProducer defaultMQProducer = new DefaultMQProducer();
    // 设置生产者 NameServer 地址，用于寻找 Broker
    defaultMQProducer.setNamesrvAddr(rocketMQProducerProperties.getNameServerAddr());
    // 设置生产者组
    defaultMQProducer.setProducerGroup((RocketMQConstant.PRODUCER_GROUP_PREFIX + "client"));
    // 启动生产者组
    defaultMQProducer.start();
    // 把创建的生产者放到一个集合，当程序结束时统一销毁
    mqProducers.add(defaultMQProducer);
    return defaultMQProducer;
}
```

- 生产者发送消息

```java
@ApiOperation("同步发送普通消息")
@GetMapping("/sync-ordinary")
public SendResult sendOrdinaryMessageSynchronously() throws MQBrokerException, RemotingException, InterruptedException, MQClientException {
    Message message = new Message((RocketMQConstant.TOPIC_PREFIX + "client"), "sync", "send ordinary message synchronously".getBytes(StandardCharsets.UTF_8));
    SendResult sendResult = this.defaultMQProducer.send(message);
    log.info("消息发送状态：{}", sendResult);
    return sendResult;
}
```

- 消费者定义

```java
@Bean
public DefaultMQPushConsumer defaultMQPushConsumer(MessageListenerConcurrently defaultListener) throws MQClientException {
    // 创建消息消费者
    DefaultMQPushConsumer defaultMQPushConsumer = new DefaultMQPushConsumer();
    // 设置消费者 NameServer 地址，用于寻找 Broker
    defaultMQPushConsumer.setNamesrvAddr(rocketMQConsumerProperties.getNameServerAddr());
    // 设置消费者组
    defaultMQPushConsumer.setConsumerGroup((RocketMQConstant.CONSUMER_GROUP_PREFIX + "client"));
    // 设置消费者组订阅的 Topic 等信息
    defaultMQPushConsumer.subscribe((RocketMQConstant.TOPIC_PREFIX + "client"), "*");
    // 设置消费者消息监听器
    defaultMQPushConsumer.setMessageListener(defaultListener);
    // 启动消费者
    defaultMQPushConsumer.start();
    // 把创建的消费者放到一个集合中，当程序结束时统一销毁
    mqConsumers.add(defaultMQPushConsumer);
    return defaultMQPushConsumer;
}
```

- 消费者监听消息

```java
@Slf4j
@Component
public class DefaultListener implements MessageListenerConcurrently {
    @Override
    public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> messageExtList, ConsumeConcurrentlyContext context) {
        if (CollectionUtils.isEmpty(messageExtList)) {
            log.info("本次消息为空");
            return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
        }
        for (MessageExt messageExt : messageExtList) {
            String topic = messageExt.getTopic();
            String tags = messageExt.getTags();
            String body = new String(messageExt.getBody(), StandardCharsets.UTF_8);
            log.info("消息 topic: {}, tags: {}, 消息内容：{}", topic, tags, body);
            if (messageExt.getDelayTimeLevel() != 0) {
                log.info("本次消息延时等级：{}, 延时时长为：{}", messageExt.getDelayTimeLevel(), messageExt.getProperty("delayTime"));
            }
            try {
                // 线程休眠模拟消费者业务执行
                TimeUnit.MILLISECONDS.sleep(1500);
            } catch (InterruptedException e) {
                log.info("消费者业务逻辑发生异常", e);
                log.info("本次消息将放入重试队列");
                return ConsumeConcurrentlyStatus.RECONSUME_LATER;
            }
        }
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }
}
```

### 普通消息异步发送

如果发送的消息太大或者业务对等待发送结果的时间较为敏感，可以采用异步发送的方式，RocketMQ 将会在成功接收到消息后或接收异常时回调生产者的接口，通知生产者本次消息的发送状态。

代码实现：

> 和普通消息同步发送的区别在于发送时调用的方法，其他代码都一致。
```java
@ApiOperation("异步发送普通消息")
@GetMapping("/async-ordinary")
public String sendOrdinaryMessageAsynchronously() throws RemotingException, InterruptedException, MQClientException {
    Message message = new Message((RocketMQConstant.TOPIC_PREFIX + "client"), "async", "send ordinary message asynchronously".getBytes(StandardCharsets.UTF_8));
    this.defaultMQProducer.send(message, new SendCallback() {
        @Override
        public void onSuccess(SendResult sendResult) {
            log.info("消息发送成功：{}", sendResult.toString());
        }

        @Override
        public void onException(Throwable e) {
            log.info("消息发送失败，原因：", e);
        }
    });
    return "send complete";
}
```

### 普通消息单向发送

如果生产者对本次发送的消息的到达状态不关心，如日志采集，那么可以采用单向发送的方式，把消息发送后就完成本次操作，性能较高。

代码实现：

> 和普通消息同步发送的区别在于发送时调用的方法，其他代码都一致。
```java
@ApiOperation("发送单向普通消息")
@GetMapping("/one-way")
public String sendOneWayMessage() throws RemotingException, InterruptedException, MQClientException {
    Message message = new Message((RocketMQConstant.TOPIC_PREFIX + "client"), "one-way", "send one-way message".getBytes(StandardCharsets.UTF_8));
    this.defaultMQProducer.sendOneway(message);
    return "send complete";
}
```

## RocketMQ 消息消费模式

### 集群消费模式

如果一个消费者组内有多个消费者，它们订阅同一个 Topic 的消息，当队列中有消息到来时，RocketMQ 会「雨露均沾」地分发这些消息给各个消费者，**消费者均摊这些消息**，这些消息只会被投放到具体一个消费者实例，消息只会被消费一次。

默认的模式，消费进度存储在 Broker 中，可靠性更高。

代码实现：

- 定义两个集群模式的消费者

```java
/**
 * 集群消费的消费者 1
 */
@Bean
public DefaultMQPushConsumer clusteringMQPushConsumerOne(MessageListenerConcurrently clusteringListenerOne) throws MQClientException {
    DefaultMQPushConsumer defaultMQPushConsumer = new DefaultMQPushConsumer();
    defaultMQPushConsumer.setNamesrvAddr(rocketMQConsumerProperties.getNameServerAddr());
    defaultMQPushConsumer.setInstanceName("clustering-consumer-one");
    defaultMQPushConsumer.setConsumerGroup((RocketMQConstant.CONSUMER_GROUP_PREFIX + "client-clustering"));
    // 设置消费模式，默认是集群消费模式
    defaultMQPushConsumer.setMessageModel(MessageModel.CLUSTERING);
    defaultMQPushConsumer.subscribe((RocketMQConstant.TOPIC_PREFIX + "client-clustering"), "*");
    defaultMQPushConsumer.setMessageListener(clusteringListenerOne);
    defaultMQPushConsumer.start();
    mqConsumers.add(defaultMQPushConsumer);
    return defaultMQPushConsumer;
}

/**
 * 集群消费的消费者 2
 */
@Bean
public DefaultMQPushConsumer clusteringMQPushConsumerTwo(MessageListenerConcurrently clusteringListenerTwo) throws MQClientException {
    DefaultMQPushConsumer defaultMQPushConsumer = new DefaultMQPushConsumer();
    defaultMQPushConsumer.setNamesrvAddr(this.rocketMQConsumerProperties.getNameServerAddr());
    defaultMQPushConsumer.setInstanceName("clustering-consumer-two");
    defaultMQPushConsumer.setConsumerGroup((RocketMQConstant.CONSUMER_GROUP_PREFIX + "client-clustering"));
    // 设置消费模式，默认是集群消费模式
    defaultMQPushConsumer.setMessageModel(MessageModel.CLUSTERING);
    defaultMQPushConsumer.subscribe((RocketMQConstant.TOPIC_PREFIX + "client-clustering"), "*");
    defaultMQPushConsumer.setMessageListener(clusteringListenerTwo);
    defaultMQPushConsumer.start();
    mqConsumers.add(defaultMQPushConsumer);
    return defaultMQPushConsumer;
}
```

- 消费结果
  
![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220824173402.png)

可以看到两个消费者是共同平分了这些消息的。

### 广播消费模式

如果一个消费者组内有多个消费者，它们订阅同一个 Topic 的消息，当队列中有消息到来时，这些消息都会被**投放到每一个消费者实例上**。

这种消费模式下，消费进度不会保存到 Broker 中，而是持久化到消费者实例中，因为消息被复制成多分给多个消费者进行消费了，消费进度只和消费者实例相关。

消息重复消费的风险会变大，不支持顺序消费，无法重置消费位点，当消费者客户端重启，会丢失重启时间段内传到 RocketMQ 的消息，**一般情况不推荐使用**。

代码实现：

- 定义两个广播模式的消费者，和集群模式的定义唯一的区别就是消费模式的区别。

```java
/**
 * 广播消费的消费者 1
 */
@Bean
public DefaultMQPushConsumer broadcastMQPushConsumerOne(MessageListenerConcurrently broadcastListenerOne) throws MQClientException {
    DefaultMQPushConsumer defaultMQPushConsumer = new DefaultMQPushConsumer();
    defaultMQPushConsumer.setNamesrvAddr(this.rocketMQConsumerProperties.getNameServerAddr());
    defaultMQPushConsumer.setInstanceName("broadcast-consumer-one");
    defaultMQPushConsumer.setConsumerGroup((RocketMQConstant.CONSUMER_GROUP_PREFIX + "client-broadcast"));
    // 设置消费模式，默认是集群消费模式
    defaultMQPushConsumer.setMessageModel(MessageModel.BROADCASTING);
    defaultMQPushConsumer.subscribe((RocketMQConstant.TOPIC_PREFIX + "client-broadcast"), "*");
    defaultMQPushConsumer.setMessageListener(broadcastListenerOne);
    defaultMQPushConsumer.start();
    mqConsumers.add(defaultMQPushConsumer);
    return defaultMQPushConsumer;
}

/**
 * 广播消费的消费者 2
 */
@Bean
public DefaultMQPushConsumer broadcastMQPushConsumerTwo(MessageListenerConcurrently broadcastListenerTwo) throws MQClientException {
    DefaultMQPushConsumer defaultMQPushConsumer = new DefaultMQPushConsumer();
    defaultMQPushConsumer.setNamesrvAddr(this.rocketMQConsumerProperties.getNameServerAddr());
    defaultMQPushConsumer.setInstanceName("broadcast-consumer-two");
    defaultMQPushConsumer.setConsumerGroup((RocketMQConstant.CONSUMER_GROUP_PREFIX + "client-broadcast"));
    // 设置消费模式，默认是集群消费模式
    defaultMQPushConsumer.setMessageModel(MessageModel.BROADCASTING);
    defaultMQPushConsumer.subscribe((RocketMQConstant.TOPIC_PREFIX + "client-broadcast"), "*");
    defaultMQPushConsumer.setMessageListener(broadcastListenerTwo);
    defaultMQPushConsumer.start();
    mqConsumers.add(defaultMQPushConsumer);
    return defaultMQPushConsumer;
}
```

- 消费结果
  
![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220824173813.png)

可以看到尽管消息消费的顺序不尽相同，但是两个消费者都消费了每一个消息。

## RocketMQ 顺序消息

生产者按照顺序把消息发送到 RocketMQ，然后 RocketMQ 按照投递消息的顺序把消息投递给消费者消费。

### 顺序消费消息

一般消费者消费消息时会实现 `MessageListenerConcurrently` 接口，消费者可以并发地消费消息，提高消费效率。

但是当消费者需要按顺序消费消息则需要实现 `MessageListenerOrderly` 接口。并且当消息消费异常时，返回的状态是 `SUSPEND_CURRENT_QUEUE_A_MOMENT` 代表等待一会之后再消费，不能放到重试队列，因为会导致顺序性被破坏。

代码实现，以全局有序消费者为例：

```java
@Slf4j
@Component
public class GlobalOrderListener implements MessageListenerOrderly {
    private final Lock lock = new ReentrantLock();
    // 随机消费失败 3 次演示顺序消息遇到消费不到的消息的处理方式
    private int times = 0;
    // 记录上一次消费失败消息的 number 属性值，下一次消费时不再失败
    private int lastNumber = -1;

    @Override
    public ConsumeOrderlyStatus consumeMessage(List<MessageExt> messageExtList, ConsumeOrderlyContext context) {
        // 能保证每次只有一条消息
        MessageExt messageExt = messageExtList.get(0);
        String body = new String(messageExt.getBody(), StandardCharsets.UTF_8);
        if (times < 3) {
            int number = Integer.parseInt(messageExt.getProperty("number"));
            // 如果是 3 的倍数且失败次数还没达到，那么手动让本次消息消费失败
            if (lastNumber != number && number % 3 == 0) {
                log.info("GlobalOrderListener 消费消息失败，稍后再消费");
                try {
                    lock.lock();
                    times++;
                    lastNumber = number;
                } finally {
                    lock.unlock();
                }
                return ConsumeOrderlyStatus.SUSPEND_CURRENT_QUEUE_A_MOMENT;
            } else {
                log.info("GlobalOrderListener 成功消费消息：{}", body);
                return ConsumeOrderlyStatus.SUCCESS;
            }
        } else {
            log.info("GlobalOrderListener 成功消费消息：{}", body);
            return ConsumeOrderlyStatus.SUCCESS;
        }
    }

}
```

### 生产全局顺序消息

只创建一个 Queue，生产者把所有消息都发送到这个 Queue 上，此时所有消息都只能按照先进先出的特点消费。

这种方式导致整个业务变得不灵活，而且效率也不高，**不推荐使用**。

代码实现：

- 生产者定义

```java
@Bean
public DefaultMQProducer globalMQProducer() throws MQClientException {
    DefaultMQProducer defaultMQProducer = new DefaultMQProducer();
    defaultMQProducer.setNamesrvAddr(rocketMQProducerProperties.getNameServerAddr());
    defaultMQProducer.setProducerGroup((RocketMQConstant.PRODUCER_GROUP_PREFIX + "client-global-order"));
    // 全局有序消息，生产者只定义一个队列
    defaultMQProducer.setDefaultTopicQueueNums(1);
    defaultMQProducer.start();
    mqProducers.add(defaultMQProducer);
    return defaultMQProducer;
}
```

- 发送消息

```java
@ApiOperation("测试全局有序消息")
@GetMapping("/global-order")
public String sendGlobalOrderMessage() throws RemotingException, InterruptedException, MQClientException, MQBrokerException {
    for (int i = 1; i <= 20; i++) {
        String messageBody = "测试全局有序第" + i + "条消息";
        Message message = new Message((RocketMQConstant.TOPIC_PREFIX + "client-global-order"), messageBody.getBytes(StandardCharsets.UTF_8));
        message.putUserProperty("number", String.valueOf(i));
        this.globalMQProducer.send(message);
    }
    return "send complete";
}
```

- 消费结果

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220824175553.png)

### 生产局部顺序消息

对消息指定发送到一个具体的 Queue，这些消息在局部上是有序的，正如购买手机、衣服时，两种商品都需要经过下订单、扣库存、付款的流程，商品的这些流程是有顺序要求的，但是两种商品之间的流程是没有关联的，所以可以处理成局部有序的。

推荐使用这种方式，分区有序的消费方式不会降低太多消费性能。

代码实现：

- 生产者定义

```java
@Bean
public DefaultMQProducer partitionedMQProducer() throws MQClientException {
    DefaultMQProducer defaultMQProducer = new DefaultMQProducer();
    defaultMQProducer.setNamesrvAddr(rocketMQProducerProperties.getNameServerAddr());
    defaultMQProducer.setProducerGroup((RocketMQConstant.PRODUCER_GROUP_PREFIX + "client-partitioned-order"));
    // 由于消费者方定义了两个消费者来演示此功能，因此定义两个队列来对应两个消费者
    defaultMQProducer.setDefaultTopicQueueNums(2);
    defaultMQProducer.start();
    mqProducers.add(defaultMQProducer);
    return defaultMQProducer;
}
```

- 发送消息，在发送消息时，多加两个参数：
  - 第一个参数类型是MessageQueueSelector的匿名内部类，用于定义消息队列选择算法，计算这个消息将被投递到哪一个消息队列上。
  - 第二参数是选择算法中使用到的，比如我这里的实现就是分别用1-10和2进行模运算（因为一开始只定义了两个队列），计算的结果就是队列的序号。

```java
@ApiOperation("测试分区有序消息")
@GetMapping("/partitioned-order")
public String sendPartitionedOrderMessage() throws RemotingException, InterruptedException, MQClientException, MQBrokerException {
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) {
            String messageBody = "手机订单创建-" + i;
            Message message = new Message((RocketMQConstant.TOPIC_PREFIX + "client-partitioned-order"), "phone-order", messageBody.getBytes(StandardCharsets.UTF_8));
            message.putUserProperty("number", String.valueOf(i));
            this.partitionedMQProducer.send(message, (messageQueueList, msg, arg) -> {
                Integer id = (Integer) arg;
                //使用取模算法确定id存放到哪个队列
                //index就是要存放的队列的索引
                int index = id % 2;
                return messageQueueList.get(index);
            }, i);

            messageBody = "手机订单支付-" + i;
            message = new Message((RocketMQConstant.TOPIC_PREFIX + "client-partitioned-order"), "phone-pay", messageBody.getBytes(StandardCharsets.UTF_8));
            message.putUserProperty("number", String.valueOf(i));
            this.partitionedMQProducer.send(message, (messageQueueList, msg, arg) -> {
                Integer id = (Integer) arg;
                int index = id % 2;
                return messageQueueList.get(index);
            }, i);

            messageBody = "手机订单发货-" + i;
            message = new Message((RocketMQConstant.TOPIC_PREFIX + "client-partitioned-order"), "phone-deliver", messageBody.getBytes(StandardCharsets.UTF_8));
            message.putUserProperty("number", String.valueOf(i));
            this.partitionedMQProducer.send(message, (messageQueueList, msg, arg) -> {
                Integer id = (Integer) arg;
                int index = id % 2;
                return messageQueueList.get(index);
            }, i);
        } else {
            String messageBody = "衣服订单创建-" + i;
            Message message = new Message((RocketMQConstant.TOPIC_PREFIX + "client-partitioned-order"), "clothes-order", messageBody.getBytes(StandardCharsets.UTF_8));
            message.putUserProperty("number", String.valueOf(i));
            this.partitionedMQProducer.send(message, (messageQueueList, msg, arg) -> {
                Integer id = (Integer) arg;
                int index = id % 2;
                return messageQueueList.get(index);
            }, i);

            messageBody = "衣服订单支付-" + i;
            message = new Message((RocketMQConstant.TOPIC_PREFIX + "client-partitioned-order"), "clothes-pay", messageBody.getBytes(StandardCharsets.UTF_8));
            message.putUserProperty("number", String.valueOf(i));
            this.partitionedMQProducer.send(message, (messageQueueList, msg, arg) -> {
                Integer id = (Integer) arg;
                int index = id % 2;
                return messageQueueList.get(index);
            }, i);

            messageBody = "衣服订单发货-" + i;
            message = new Message((RocketMQConstant.TOPIC_PREFIX + "client-partitioned-order"), "clothes-deliver", messageBody.getBytes(StandardCharsets.UTF_8));
            message.putUserProperty("number", String.valueOf(i));
            this.partitionedMQProducer.send(message, (messageQueueList, msg, arg) -> {
                Integer id = (Integer) arg;
                int index = id % 2;
                return messageQueueList.get(index);
            }, i);
        }
    }
    return "send complete";
}
```

## RocketMQ 延时消息

生产者把消息发送给 RocketMQ 时，不希望 RocketMQ 立马把消息投递到消费者，而是延迟一定的时间，再投递，这种消息就是延时消息。

社区版的 RocketMQ 目前是支持了 18 个固定的延时间隔。
延时等级定义在 RocketMQ 服务端的 MessageStoreConfig 类中的如下变量中。

`private String messageDelayLevel = "1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h";`

### 使用场景

电商交易系统的订单超时未支付，自动取消订单。下订单时锁定库存，如果 30 分钟后这个消息投递给了下游的消费服务，消费者服务会去检查这个订单的状态，如果支付成功，则忽略不处理；如果订单依然是未支付，那么取消订单，释放库存等。

代码实现：

> 生产者、消费者定义和发送普通消息一致，只是调用的方法有区别

- 发送消息

```java
@ApiOperation("发送延时消息")
@GetMapping("/delay-message")
public String sendDelayMessage() throws RemotingException, InterruptedException, MQClientException, MQBrokerException {
    Message message = new Message((RocketMQConstant.TOPIC_PREFIX + "client"), "delay", "send third delay level message".getBytes(StandardCharsets.UTF_8));
    message.setDelayTimeLevel(3);
    message.putUserProperty("delayTime", "10秒");
    this.defaultMQProducer.send(message);
    return "send complete";
}
```

- 消费结果，当消费者进入一个稳定消费的状态后，可以看到当生产者发送消息后隔10秒左右消费者才有消息消费的日志出现

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220824225155.png)

## RocketMQ 批量消息

当有大批量的消息需要发送时，生产者还是一条一条地发，会出现系统瓶颈，可以把这些消息放到一个集合里面，一次性发送一个集合所有消息。

但是批量消息也有限制，一次发送的组装后的消息不能超过 4MB，所以需要按数量打包，比如每 100 条打包成一份就先把这 100 条消息批量发送了。

代码实现：

> 生产者、消费者定义和发送普通消息一致，只是调用的方法有区别

- 发送消息，每3条消息组成一批消息发送

```java
@ApiOperation("批量发送消息")
@GetMapping("/batch-message")
public String sendBatchMessage() throws MQBrokerException, RemotingException, InterruptedException, MQClientException {
    List<Message> messages = new ArrayList<>(3);
    for (int i = 1; i <= 20; i++) {
        String messageBody = "测试批量发送消息第" + i + "条消息";
        Message message = new Message((RocketMQConstant.TOPIC_PREFIX + "client"), "batch", messageBody.getBytes(StandardCharsets.UTF_8));
        messages.add(message);
        // 3条为一批消息
        if (messages.size() == 3) {
            log.info("生产者发送消息");
            this.defaultMQProducer.send(messages);
            // 发送完消息需要清空集合
            messages.clear();
        }
    }
    if (!CollectionUtils.isEmpty(messages)) {
        // 如果遍历结束后集合还有内容，那么也需要把剩下的消息发送
        log.info("生产者发送消息");
        this.defaultMQProducer.send(messages);
    }
    return "send complete";
}
```

## RocketMQ 过滤消息

RocketMQ 过滤消息是指消费者通过一定的方式筛选自己需要的消息，过滤消息有 Tag 过滤和 SQL 过滤两种方式。

### Tag 过滤

生产者发送消息时传入 Tag，消费者订阅消息时，指定订阅某些 Tag。这种方式使用起来比较容易，效率高，适用于简单过滤的场景。比如只订阅手机类型、衣服类型的订单消息。

代码实现：

- 消费者定义，监听器逻辑和普通消息的监听器大同小异，不罗列出来了

```java
/**
 * 使用Tag过滤的消费者
 */
@Bean
public DefaultMQPushConsumer tagFilterConsumer(MessageListenerConcurrently tagListenerOne) throws MQClientException {
    DefaultMQPushConsumer defaultMQPushConsumer = new DefaultMQPushConsumer();
    defaultMQPushConsumer.setNamesrvAddr(rocketMQConsumerProperties.getNameServerAddr());
    defaultMQPushConsumer.setConsumerGroup((RocketMQConstant.CONSUMER_GROUP_PREFIX + "client-tag-filter"));
    defaultMQPushConsumer.subscribe((RocketMQConstant.TOPIC_PREFIX + "client-tag-filter"),
            MessageSelector.byTag("phone || shoes"));
    defaultMQPushConsumer.setMessageListener(tagListenerOne);
    defaultMQPushConsumer.start();
    mqConsumers.add(defaultMQPushConsumer);
    return defaultMQPushConsumer;
}
```

- 发送消息
  
```java
@ApiOperation("测试tag过滤消息")
@GetMapping("/tag-filter-message")
public String tagFilterMessage() throws MQBrokerException, RemotingException, InterruptedException, MQClientException {
    // 消费者方设置如下
    // 消费者1只接受tag为phone或shoes的消息
    // 消费者2只接受tag为phone或clothes，并且price位于[10,20]区间的消息
    Message message1 = new Message((RocketMQConstant.TOPIC_PREFIX + "client-tag-filter"), "phone", "手机订单消息:17元".getBytes(StandardCharsets.UTF_8));
    message1.putUserProperty("price", "17");
    this.defaultMQProducer.send(message1);
    log.info("生产者发送消息: {}", message1);
    Message message2 = new Message((RocketMQConstant.TOPIC_PREFIX + "client-tag-filter"), "phone", "手机订单消息:26元".getBytes(StandardCharsets.UTF_8));
    message2.putUserProperty("price", "26");
    this.defaultMQProducer.send(message2);
    log.info("生产者发送消息: {}", message2);
    Message message3 = new Message((RocketMQConstant.TOPIC_PREFIX + "client-tag-filter"), "clothes", "衣服订单消息:19元".getBytes(StandardCharsets.UTF_8));
    message3.putUserProperty("price", "19");
    this.defaultMQProducer.send(message3);
    log.info("生产者发送消息: {}", message3);
    Message message4 = new Message((RocketMQConstant.TOPIC_PREFIX + "client-tag-filter"), "shoes", "鞋子订单消息:null".getBytes(StandardCharsets.UTF_8));
    this.defaultMQProducer.send(message4);
    log.info("生产者发送消息: {}", message4);
    return "send complete";
}
```

- 消费结果，最终只有tag为phone和clothes的消息能被消费者消费

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220824232433.png)

### SQL 过滤

SQL 过滤是指使用一些类似 SQL 语句的语法进行过滤 ，如 is null、between 等关键词。生产者在发送消息时，给消息自定义某些属性；消费者订阅消息时使用 SQL 语句来对这些属性进行过滤，这种方式实现起来有难度，但是灵活。

但是要使用这个SQL过滤的特性，有一个前提就是：Broker需要开启属性过滤。要开启这个功能，需要在 `broker.conf` 文件中加入 `enablePropertyFilter=true`。否则消费者启动时会提示：

```
Caused by: org.apache.rocketmq.client.exception.MQClientException: CODE: 1  DESC: The broker does not support consumer to filter message by SQL92
For more information, please visit the url, http://rocketmq.apache.org/docs/faq/
	at org.apache.rocketmq.client.impl.MQClientAPIImpl.checkClientInBroker(MQClientAPIImpl.java:2242) ~[rocketmq-client-4.8.0.jar:4.8.0]
	at org.apache.rocketmq.client.impl.factory.MQClientInstance.checkClientInBroker(MQClientInstance.java:449) ~[rocketmq-client-4.8.0.jar:4.8.0]
	at org.apache.rocketmq.client.impl.consumer.DefaultMQPushConsumerImpl.start(DefaultMQPushConsumerImpl.java:648) ~[rocketmq-client-4.8.0.jar:4.8.0]
    ...
```

- 消费者定义

```java
@Bean
public DefaultMQPushConsumer sqlFilterConsumer(MessageListenerConcurrently defaultListener) throws MQClientException {
    DefaultMQPushConsumer defaultMQPushConsumer = new DefaultMQPushConsumer();
    defaultMQPushConsumer.setNamesrvAddr(rocketMQConsumerProperties.getNameServerAddr());
    defaultMQPushConsumer.setConsumerGroup((RocketMQConstant.CONSUMER_GROUP_PREFIX + "client-sql-filter"));
    defaultMQPushConsumer.subscribe((RocketMQConstant.TOPIC_PREFIX + "client-sql-filter"),
            MessageSelector.bySql("price is not null and price between 10 and 30"));
    defaultMQPushConsumer.setMessageListener(defaultListener);
    defaultMQPushConsumer.start();
    mqConsumers.add(defaultMQPushConsumer);
    return defaultMQPushConsumer;
}
```

- 发送消息

```java
@ApiOperation("测试sql过滤消息")
@GetMapping("/sql-filter-message")
public String sqlFilterMessage() throws MQBrokerException, RemotingException, InterruptedException, MQClientException {
    // 消费者方设置如下
    // 只有price在[10-30]区间才能接收并消费
    Message message1 = new Message((RocketMQConstant.TOPIC_PREFIX + "client-sql-filter"), "phone", "手机订单消息:18元".getBytes(StandardCharsets.UTF_8));
    message1.putUserProperty("price", "18");
    this.defaultMQProducer.send(message1);
    log.info("生产者发送消息: {}", message1);
    Message message2 = new Message((RocketMQConstant.TOPIC_PREFIX + "client-sql-filter"), "clothes", "衣服订单消息:7元".getBytes(StandardCharsets.UTF_8));
    message2.putUserProperty("price", "7");
    this.defaultMQProducer.send(message2);
    log.info("生产者发送消息: {}", message2);
    Message message3 = new Message((RocketMQConstant.TOPIC_PREFIX + "client-sql-filter"), "clothes", "衣服订单消息:20元".getBytes(StandardCharsets.UTF_8));
    message3.putUserProperty("price", "20");
    this.defaultMQProducer.send(message3);
    log.info("生产者发送消息: {}", message3);
    return "send complete";
}
```

- 消费结果



## RocketMQ 事务消息

基于可以发送事务消息这一特性，RocketMQ 成为了分布式事务的解决方案之一，RocketMQ 的事务消息适用于所有对数据最终一致性有强需求的场景。

RocketMQ 事务消息有两大核心点：两阶段提交、事务补偿机制。

### 两阶段提交

Broker 只有收到第二阶段的消息，消费者才能拉取消息进行消费。

### 事务补偿机制

当 Broker 收到状态为 `UNKNOWN` 的消息时，或者由于网络波动、生产者宕机导致长时间没有收到第二阶段提交，Broker 会调用生产者的接口查询本地事务执行情况。