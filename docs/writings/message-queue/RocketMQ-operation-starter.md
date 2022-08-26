---
title: RocketMQ 操作落地 (rocketmq-starter 方式）
icon: article
category:

- 干货
- coding
- 消息队列

tag:

- 基础
- RocketMQ

---

# RocketMQ 操作落地 (rocketmq-starter 方式）
>本文使用 rocketmq-spring-boot-starter 的集成方式展示 RocketMQ 的常见用法
>
>rocketmq-spring-boot-starter 和 rocketmq-client 方式相比，框架的集成度很高，使用起来非常方便。
>
>源码地址：[rocketmq-learning](https://github.com/gelald/rocketmq-learning)

## RocketMQ 普通消息发送

### 普通消息同步发送

生产者向 RocketMQ 发送一条消息，RocketMQ 返回生产者其发送结果，可用于判断是否发送成功。

代码实现：

>以下是核心代码片段，详情可以查看 GitHub 上的源码：[rocketmq-learning](https://github.com/gelald/rocketmq-learning)，如果觉得对你有帮助，希望可以给我个小星星鼓励鼓励噢~

- 生产者发送消息，生产者无需再手动定义，可以使用框架提供的 `RocketMQTemplate` 来完成消息的发送

```java
@ApiOperation("同步发送普通消息")
@GetMapping("/sync-ordinary")
public SendResult sendMessageSynchronously() {
    Message<String> message = MessageBuilder.withPayload("send ordinary message synchronously").build();
    log.info("生产者发送消息：{}", message);
    SendResult sendResult = this.rocketMQTemplate.syncSend((RocketMQConstant.TOPIC_PREFIX + "starter:sync"), message);
    log.info("消息发送状态：{}", sendResult);
    return sendResult;
}
```

- 消费者消费消息，消费者和消息监听器的定义大大简化了，只需要加上 `@RocketMQMessageListener` 注解，另外实现 `RocketMQListener<T>` 接口 (T 是消息类型的泛型）即可

```java
@Slf4j
@Component
@RocketMQMessageListener(
        consumerGroup = (RocketMQConstant.CONSUMER_GROUP_PREFIX + "starter"),
        topic = (RocketMQConstant.TOPIC_PREFIX + "starter")
)
public class DefaultConsumer implements RocketMQListener<MessageExt> {
    @Override
    public void onMessage(MessageExt messageExt) {
        String topic = messageExt.getTopic();
        String tags = messageExt.getTags();
        String body = new String(messageExt.getBody(), StandardCharsets.UTF_8);
        log.info("DefaultConsumer 接收消息，topic: {}, tags: {}, 消息内容：{}", topic, tags, body);
    }
}
```

### 普通消息异步发送

如果发送的消息太大或者业务对等待发送结果的时间较为敏感，可以采用异步发送的方式，RocketMQ 将会在成功接收到消息后或接收异常时回调生产者的接口，通知生产者本次消息的发送状态。

代码实现：

- 生产者发送消息

```java
@ApiOperation("异步发送普通消息")
@GetMapping("/async-ordinary")
public String sendMessageAsynchronously() {
    Message<String> message = MessageBuilder.withPayload("send ordinary message asynchronously").build();
    this.rocketMQTemplate.asyncSend((RocketMQConstant.TOPIC_PREFIX + "starter:async"), message, new SendCallback() {
        @Override
        public void onSuccess(SendResult sendResult) {
            log.info("消息发送状态: {}", sendResult);
        }

        @Override
        public void onException(Throwable e) {
            log.info("消息发送失败，原因: ", e);
        }
    });
    log.info("生产者发送消息: {}", message);
    return "sent message";
}
```

### 普通消息单向发送

如果生产者对本次发送的消息的到达状态不关心，如日志采集，那么可以采用单向发送的方式，把消息发送后就完成本次操作，性能较高。

代码实现：

- 生产者发送消息

```java
@ApiOperation("发送单向普通消息")
@GetMapping("/one-way")
public String sendOneWayMessage() {
    Message<String> message = MessageBuilder.withPayload("send one-way message").build();
    log.info("生产者发送消息: {}", message);
    this.rocketMQTemplate.sendOneWay((RocketMQConstant.TOPIC_PREFIX + "starter:one-way"), message);
    return "sent message";
}
```

## RocketMQ 消息消费模式

### 集群消费模式

如果一个消费者组内有多个消费者，它们订阅同一个 Topic 的消息，当队列中有消息到来时，RocketMQ 会「雨露均沾」地分发这些消息给各个消费者，**消费者均摊这些消息**，这些消息只会被投放到具体一个消费者实例，消息只会被消费一次。

默认的模式，消费进度存储在 Broker 中，可靠性更高。

代码实现：

- 定义两个集群模式的消费者，设置消费模式可以通过 `@RocketMQMessageListener` 注解中的 `messageModel` 方法设置。

```java
// 集群模式消费者1
@Slf4j
@Component
@RocketMQMessageListener(
        consumerGroup = (RocketMQConstant.CONSUMER_GROUP_PREFIX + "starter-clustering"),
        topic = (RocketMQConstant.TOPIC_PREFIX + "starter-clustering"),
        // 设置消费模式为集群消费
        messageModel = MessageModel.CLUSTERING
)
public class ClusteringConsumerOne implements RocketMQListener<String>, RocketMQPushConsumerLifecycleListener {
    @Override
    public void onMessage(String message) {
        log.info("ClusteringConsumerOne接收到消息, 消息内容: {}", message);
    }

    @Override
    public void prepareStart(DefaultMQPushConsumer consumer) {
        consumer.setInstanceName("clustering-consumer-one");
    }
}

// 集群模式消费者2
@Slf4j
@Component
@RocketMQMessageListener(
        consumerGroup = (RocketMQConstant.CONSUMER_GROUP_PREFIX + "starter-clustering"),
        topic = (RocketMQConstant.TOPIC_PREFIX + "starter-clustering"),
        // 设置消费模式为集群消费
        messageModel = MessageModel.CLUSTERING
)
public class ClusteringConsumerTwo implements RocketMQListener<String>, RocketMQPushConsumerLifecycleListener {
    @Override
    public void onMessage(String message) {
        log.info("ClusteringConsumerTwo接收到消息, 消息内容: {}", message);
    }

    @Override
    public void prepareStart(DefaultMQPushConsumer consumer) {
        consumer.setInstanceName("clustering-consumer-two");
    }
}
```

由于需要同一个消费者组定义多个消费者，RocketMQ 不能自动区分这些消费者，所以消费者需要实现 `RocketMQPushConsumerLifecycleListener` 接口，来为消费者设置用于区分的名字。

- 消费结果

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220826155314.png)

从消费结果可以看到两个消费者共同平了这些消息。

### 广播消费模式

如果一个消费者组内有多个消费者，它们订阅同一个 Topic 的消息，当队列中有消息到来时，这些消息都会被**投放到每一个消费者实例上**。

这种消费模式下，消费进度不会保存到 Broker 中，而是持久化到消费者实例中，因为消息被复制成多分给多个消费者进行消费了，消费进度只和消费者实例相关。

消息重复消费的风险会变大，不支持顺序消费，无法重置消费位点，当消费者客户端重启，会丢失重启时间段内传到 RocketMQ 的消息，**一般情况不推荐使用**。

代码实现：

- 定义两个广播模式的消费者，和集群模式的定义唯一的区别就是消费模式的区别。

```java
/**
 * 广播消费消费者 1
 */
@Slf4j
@Component
@RocketMQMessageListener(
        consumerGroup = (RocketMQConstant.CONSUMER_GROUP_PREFIX + "starter-broadcast"),
        topic = (RocketMQConstant.TOPIC_PREFIX + "starter-broadcast"),
        // 设置消费模式为广播消费
        messageModel = MessageModel.BROADCASTING
)
public class BroadcastConsumerOne implements RocketMQListener<String>, RocketMQPushConsumerLifecycleListener {
    @Override
    public void onMessage(String message) {
        log.info("BroadcastConsumerOne接收到消息, 消息内容: {}", message);
    }

    @Override
    public void prepareStart(DefaultMQPushConsumer consumer) {
        consumer.setInstanceName("broadcast-consumer-one");
    }
}

/**
 * 广播消费消费者 2
 */
@Slf4j
@Component
@RocketMQMessageListener(
        consumerGroup = (RocketMQConstant.CONSUMER_GROUP_PREFIX + "starter-broadcast"),
        topic = (RocketMQConstant.TOPIC_PREFIX + "starter-broadcast"),
        // 设置消费模式为广播消费
        messageModel = MessageModel.BROADCASTING
)
public class BroadcastConsumerTwo implements RocketMQListener<String>, RocketMQPushConsumerLifecycleListener {
    @Override
    public void onMessage(String message) {
        log.info("BroadcastConsumerTwo接收到消息, 消息内容: {}", message);
    }

    @Override
    public void prepareStart(DefaultMQPushConsumer consumer) {
        consumer.setInstanceName("broadcast-consumer-two");
    }
}
```

- 消费结果

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220826163008.png)

从消费结果看，两个消费者都消费了相同数量的消息。

## RocketMQ 顺序消息

生产者按照顺序把消息发送到 RocketMQ，然后 RocketMQ 按照投递消息的顺序把消息投递给消费者消费。

### 顺序消费消息

使用rocketmq-spring-boot-starter 时想要设置消费者顺序消费很简单，`RocketMQMessageListener` 注解中 `consumeMode`方法是用于指定消费模式的

代码实现，以全局有序消费者为例：

```java
@Slf4j
@Component
@RocketMQMessageListener(
        consumerGroup = (RocketMQConstant.CONSUMER_GROUP_PREFIX + "starter-global-order"),
        topic = (RocketMQConstant.TOPIC_PREFIX + "starter-global-order"),
        consumeMode = ConsumeMode.ORDERLY
)
public class GlobalConsumer implements RocketMQListener<String> {
    @Override
    public void onMessage(String message) {
        log.info("GlobalConsumer接收到消息, 消息内容: {}", message);
    }
}
```

### 生产全局顺序消息

只创建一个 Queue，生产者把所有消息都发送到这个 Queue 上，此时所有消息都只能按照先进先出的特点消费。

这种方式导致整个业务变得不灵活，而且效率也不高，**不推荐使用**。

代码实现：

- 发送消息

在发送消息时，传入一个参数作为选择队列的hashKey，就可以实现指定一个队列的目的
```java
@ApiOperation("测试全局有序消息")
@GetMapping("/global-order")
public String sendGlobalOrderMessage() {
    for (int i = 0; i < 10; i++) {
        String messageBody = "测试全局有序消息第" + (i + 1) + "条消息";
        Message<String> message = MessageBuilder.withPayload(messageBody).build();
        log.info("生产者发送消息: {}", message);
        // 传入hashKey来指定具体的一个队列
        this.rocketMQTemplate.sendOneWayOrderly((RocketMQConstant.TOPIC_PREFIX + "starter-global-order"), message, "123");
    }
    return "sent message";
}
```
- 消费结果

### 生产局部顺序消息

对消息指定发送到一个具体的 Queue，这些消息在局部上是有序的，正如购买手机、衣服时，两种商品都需要经过下订单、扣库存、付款的流程，商品的这些流程是有顺序要求的，但是两种商品之间的流程是没有关联的，所以可以处理成局部有序的。

**推荐使用这种方式**，分区有序的消费方式不会降低太多消费性能。

代码实现：

- 发送消息

如果消费者方定义了两个队列

## RocketMQ 延时消息

生产者把消息发送给 RocketMQ 时，不希望 RocketMQ 立马把消息投递到消费者，而是延迟一定的时间，再投递，这种消息就是延时消息。

社区版的 RocketMQ 目前是支持了 18 个固定的延时间隔。
延时等级定义在 RocketMQ 服务端的 MessageStoreConfig 类中的如下变量中。

`private String messageDelayLevel = "1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h";`

### 使用场景

电商交易系统的订单超时未支付，自动取消订单。下订单时锁定库存，如果 30 分钟后这个消息投递给了下游的消费服务，消费者服务会去检查这个订单的状态，如果支付成功，则忽略不处理；如果订单依然是未支付，那么取消订单，释放库存等。

## RocketMQ 批量消息

当有大批量的消息需要发送时，生产者还是一条一条地发，会出现系统瓶颈，可以把这些消息放到一个集合里面，一次性发送一个集合所有消息。

但是批量消息也有限制，一次发送的组装后的消息不能超过 4MB，所以需要按数量打包，比如每 100 条打包成一份就先把这 100 条消息批量发送了。

## RocketMQ 过滤消息

RocketMQ 过滤消息是指消费者通过一定的方式筛选自己需要的消息，过滤消息有 Tag 过滤和 SQL 过滤两种方式。

### Tag 过滤

生产者发送消息时传入 Tag，消费者订阅消息时，指定订阅某些 Tag。这种方式使用起来比较容易，效率高，适用于简单过滤的场景。比如只订阅手机类型、衣服类型的订单消息。

### SQL 过滤

SQL 过滤是指使用一些类似 SQL 语句的语法进行过滤 ，如 is null、between 等关键词。生产者在发送消息时，给消息自定义某些属性；消费者订阅消息时使用 SQL 语句来对这些属性进行过滤，这种方式实现起来有难度，但是灵活。

## RocketMQ 事务消息

基于可以发送事务消息这一特性，RocketMQ 成为了分布式事务的解决方案之一，RocketMQ 的事务消息适用于所有对数据最终一致性有强需求的场景。

RocketMQ 事务消息有两大核心点：两阶段提交、事务补偿机制。

### 两阶段提交

Broker 只有收到第二阶段的消息，消费者才能拉取消息进行消费。

### 事务补偿机制

当 Broker 收到状态为 `UNKNOWN` 的消息时，或者由于网络波动、生产者宕机导致长时间没有收到第二阶段提交，Broker 会调用生产者的接口查询本地事务执行情况。