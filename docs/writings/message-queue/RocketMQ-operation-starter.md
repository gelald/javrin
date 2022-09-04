---
title: RocketMQ 操作落地 (rocketmq-starter 方式)
icon: article
category:

- 干货
- coding
- 消息队列

tag:

- 基础
- RocketMQ

---

# RocketMQ 操作落地 (rocketmq-starter 方式)
>本文使用 rocketmq-spring-boot-starter 的集成方式展示 RocketMQ 的常见用法
>
>rocketmq-spring-boot-starter 和 rocketmq-client 方式相比，框架的集成度很高，使用起来非常方便。
>
>源码地址：[rocketmq-learning](https://github.com/gelald/rocketmq-learning)

## RocketMQ 普通消息发送

### 普通消息同步发送

生产者向 RocketMQ 发送一条消息，RocketMQ 返回生产者其发送结果，可用于判断是否发送成功。

#### 使用场景

对消息可靠程度要求比较高、需要有是否发送成功的应答的场景。比如：重要的消息通知、通信通知等。

#### 代码实现

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
            log.info("消息发送状态：{}", sendResult);
        }

        @Override
        public void onException(Throwable e) {
            log.info("消息发送失败，原因：", e);
        }
    });
    log.info("生产者发送消息：{}", message);
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
    log.info("生产者发送消息：{}", message);
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
// 集群模式消费者 1
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
        log.info("ClusteringConsumerOne 接收到消息，消息内容：{}", message);
    }

    @Override
    public void prepareStart(DefaultMQPushConsumer consumer) {
        consumer.setInstanceName("clustering-consumer-one");
    }
}

// 集群模式消费者 2
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
        log.info("ClusteringConsumerTwo 接收到消息，消息内容：{}", message);
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
        log.info("BroadcastConsumerOne 接收到消息，消息内容：{}", message);
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
        log.info("BroadcastConsumerTwo 接收到消息，消息内容：{}", message);
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

使用 rocketmq-spring-boot-starter 时想要设置消费者顺序消费很简单，`RocketMQMessageListener` 注解中 `consumeMode`方法是用于指定消费模式的

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
        log.info("GlobalConsumer 接收到消息，消息内容：{}", message);
    }
}
```

### 生产全局顺序消息

只创建一个 Queue，生产者把所有消息都发送到这个 Queue 上，此时所有消息都只能按照先进先出的特点消费。而且一个Queue只能由一个消费者来订阅，所以也只能有一个消费者来消费消息，此时消息中间件的存在意义很低。

这种方式导致整个业务变得不灵活，而且效率也不高，**不推荐使用**。

代码实现：

- 发送消息

在发送消息时，传入一个参数作为选择队列的 hashKey，就可以实现指定一个队列的目的
```java
@ApiOperation("测试全局有序消息")
@GetMapping("/global-order")
public String sendGlobalOrderMessage() {
    for (int i = 0; i < 10; i++) {
        String messageBody = "测试全局有序消息第" + (i + 1) + "条消息";
        Message<String> message = MessageBuilder.withPayload(messageBody).build();
        log.info("生产者发送消息：{}", message);
        // 传入 hashKey 来指定具体的一个队列
        this.rocketMQTemplate.syncSendOrderly((RocketMQConstant.TOPIC_PREFIX + "starter-global-order"), message, "123");
    }
    return "sent message";
}
```
- 消费结果

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220826214723.png)

从消费结果可以看到消费者方接收到的消息顺序和生产者发送时的消息顺是一致的。

### 生产局部顺序消息

对消息指定发送到一个具体的 Queue，这些消息在局部上是有序的，正如购买手机、衣服时，两种商品都需要经过下订单、扣库存、付款的流程，商品的这些流程是有顺序要求的，但是两种商品之间的流程是没有关联的，所以可以处理成局部有序的。

**推荐使用这种方式**，分区有序的消费方式不会降低太多消费性能。

代码实现：

- 发送消息，使用两个不同的 hashKey，就能保证本次消息的投递是投递到两个不同的队列中的。

```java
@ApiOperation("测试分区有序消息")
@GetMapping("/partitioned-order")
public String sendPartitionedOrderMessage() {
    Message<String> message1 = MessageBuilder.withPayload("订单 1 创建").build();
    log.info("生产者发送消息：{}", message1);
    this.rocketMQTemplate.syncSendOrderly((RocketMQConstant.TOPIC_PREFIX + "starter-partitioned-order"), message1, "111");
    Message<String> message2 = MessageBuilder.withPayload("订单 2 创建").build();
    log.info("生产者发送消息：{}", message2);
    this.rocketMQTemplate.syncSendOrderly((RocketMQConstant.TOPIC_PREFIX + "starter-partitioned-order"), message2, "222");
    Message<String> message3 = MessageBuilder.withPayload("订单 1 支付").build();
    log.info("生产者发送消息：{}", message3);
    this.rocketMQTemplate.syncSendOrderly((RocketMQConstant.TOPIC_PREFIX + "starter-partitioned-order"), message3, "111");
    Message<String> message4 = MessageBuilder.withPayload("订单 2 支付").build();
    log.info("生产者发送消息：{}", message4);
    this.rocketMQTemplate.syncSendOrderly((RocketMQConstant.TOPIC_PREFIX + "starter-partitioned-order"), message4, "222");
    Message<String> message5 = MessageBuilder.withPayload("订单 1 发货").build();
    log.info("生产者发送消息：{}", message5);
    this.rocketMQTemplate.syncSendOrderly((RocketMQConstant.TOPIC_PREFIX + "starter-partitioned-order"), message5, "111");
    Message<String> message6 = MessageBuilder.withPayload("订单 2 发货").build();
    log.info("生产者发送消息：{}", message6);
    this.rocketMQTemplate.syncSendOrderly((RocketMQConstant.TOPIC_PREFIX + "starter-partitioned-order"), message6, "222");
    return "sent message";
}
```

- 消费结果

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220826221431.png)

从消费结果可以看到两份订单的消息是有序地进行消费的。

## RocketMQ 延时消息

生产者把消息发送给 RocketMQ 时，不希望 RocketMQ 立马把消息投递到消费者，而是延迟一定的时间，再投递，这种消息就是延时消息。

社区版的 RocketMQ 目前是支持了 18 个固定的延时间隔。
延时等级定义在 RocketMQ 服务端的 MessageStoreConfig 类中的如下变量中。

`private String messageDelayLevel = "1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h";`

### 使用场景

电商交易系统的订单超时未支付，自动取消订单。下订单时锁定库存，如果 30 分钟后这个消息投递给了下游的消费服务，消费者服务会去检查这个订单的状态，如果支付成功，则忽略不处理；如果订单依然是未支付，那么取消订单，释放库存等。

代码实现：

- 发送消息，在发送时传入延时等级即可实现延时消息。

```java
@ApiOperation("发送延时消息")
@GetMapping("/delay")
public SendResult sendDelayMessage() {
    Message<String> message = MessageBuilder.withPayload("send delay message").build();
    log.info("生产者发送消息：{}", message);
    SendResult sendResult = this.rocketMQTemplate.syncSend((RocketMQConstant.TOPIC_PREFIX + "starter:delay"), message, 3000, 2);
    log.info("消息发送状态：{}", sendResult);
    return sendResult;
}
```

## RocketMQ 批量消息

当有大批量的消息需要发送时，生产者还是一条一条地发，会出现系统瓶颈，可以把这些消息放到一个集合里面，一次性发送一个集合所有消息。

但是批量消息也有大小上的限制，一次发送的组装后的消息不能超过消息最大限制（默认是 4MB)，所以组装消息时需要注意，当超出限制时需要把消息列表分割后再发送。

代码实现：

- 定义消息分割器

```java
public class MessagesSplitter implements Iterator<List<Message<String>>> {
    private final int MAX_SIZE = 1024 * 1024 * 4;
    private final int LOG_SIZE = 20;
    private final List<Message<String>> messages;
    private int currentIndex = 0;

    public MessagesSplitter(List<Message<String>> messages) {
        this.messages = messages;
    }

    @Override
    public boolean hasNext() {
        return currentIndex < messages.size();
    }

    @Override
    public List<Message<String>> next() {
        int startIndex = getStartIndex();
        int nextIndex = startIndex;
        int totalSize = 0;
        while (nextIndex < messages.size()) {
            Message<String> message = messages.get(nextIndex);
            // 计算当前消息的长度
            int singleMessageSize = calcMessageTotalSize(message);
            // 只要消息还没超出长度限制就一直往后累计直到达到消息长度限制
            if (singleMessageSize + totalSize > MAX_SIZE) {
                break;
            } else {
                totalSize += singleMessageSize;
            }
            nextIndex++;
        }
        // 提取子集合
        List<Message<String>> subList = messages.subList(startIndex, nextIndex);
        currentIndex = nextIndex;
        return subList;
    }

    // 计算一个消息的尺寸
    private int calcMessageTotalSize(Message<String> message) {
        int size = message.getPayload().length();
        MessageHeaders headers = message.getHeaders();
        for (Map.Entry<String, Object> entry : headers.entrySet()) {
            Object value = entry.getValue();
            // 演示 简单处理
            if (value instanceof String) {
                size += entry.getKey().length();
                size += ((String) value).length();
            }
        }
        size += LOG_SIZE;
        return size;
    }

    // 获取下一个应该取的索引
    private int getStartIndex() {
        // 先获取当前集合第一个消息的长度
        Message<String> currentMessage = messages.get(currentIndex);
        int currentMessageSize = calcMessageTotalSize(currentMessage);
        while (currentMessageSize > MAX_SIZE) {
            // 如果这个消息的长度本就大于消息长度限制
            // 那么就取下一个消息，直到消息长度小于长度限制
            currentIndex += 1;
            currentMessage = messages.get(currentIndex);
            currentMessageSize = calcMessageTotalSize(currentMessage);
        }
        return currentIndex;
    }
}
```

- 消息发送

```java
@ApiOperation("批量发送消息")
@GetMapping("/batch")
public String sendMessageInBatch() {
    List<Message<String>> messages = new ArrayList<>();
    for (int i = 1; i <= 10; i++) {
        String messageBody = "批量发送消息第" + i + "条";
        Message<String> message = MessageBuilder.withPayload(messageBody).build();
        messages.add(message);
        log.info("生产者发送消息：{}", message);
    }

    // 可能这个消息集合超出限制，需要将其分裂成若干个满足要求的小消息
    MessagesSplitter messagesSplitter = new MessagesSplitter(messages);
    while (messagesSplitter.hasNext()) {
        List<Message<String>> subMessageList = messagesSplitter.next();
        SendResult sendResult = this.rocketMQTemplate.syncSend((RocketMQConstant.TOPIC_PREFIX + "starter:batch"), subMessageList);
        log.info("消息发送状态：{}", sendResult);

    }
    return "sent message";
}
```

## RocketMQ 过滤消息

RocketMQ 过滤消息是指消费者通过一定的方式筛选自己需要的消息，过滤消息有 Tag 过滤和 SQL 过滤两种方式。

### Tag 过滤

生产者发送消息时传入 Tag，消费者订阅消息时，指定订阅某些 Tag。这种方式使用起来比较容易，效率高，适用于简单过滤的场景。比如只订阅手机类型、衣服类型的订单消息。

代码实现：

- 发送消息，为不同消息带上不同的 tag，用于消费者方过滤

```java
@ApiOperation("测试 tag 过滤消息")
@GetMapping("/tag-filter-message")
public String tagFilterMessage() {
    // 消费者方设置如下
    // 消费者只接受 tag 为 phone 或 clothes 的消息
    Message<String> message1 = MessageBuilder.withPayload("订单 1").build();
    log.info("生产者发送消息：{}", message1);
    this.rocketMQTemplate.sendOneWay((RocketMQConstant.TOPIC_PREFIX + "starter-tag-filter:phone"), message1);
    Message<String> message2 = MessageBuilder.withPayload("订单 2").build();
    log.info("生产者发送消息：{}", message2);
    this.rocketMQTemplate.sendOneWay((RocketMQConstant.TOPIC_PREFIX + "starter-tag-filter:shoes"), message2);
    Message<String> message3 = MessageBuilder.withPayload("订单 3").build();
    log.info("生产者发送消息：{}", message3);
    this.rocketMQTemplate.sendOneWay((RocketMQConstant.TOPIC_PREFIX + "starter-tag-filter:clothes"), message3);
    return "sent message";
}
```

- 消费者过滤消息，使用 `@RocketMQMessageListener` 注解中的 `selectorExpression` 方法来输入过滤的表达式，多个 tag 之间使用`||`来连接

```java
@Slf4j
@Component
@RocketMQMessageListener(
        consumerGroup = (RocketMQConstant.CONSUMER_GROUP_PREFIX + "starter-tag-filter"),
        topic = (RocketMQConstant.TOPIC_PREFIX + "starter-tag-filter"),
        selectorType = SelectorType.TAG,
        selectorExpression = "phone || clothes"
)
public class TagFilterConsumer implements RocketMQListener<MessageExt> {
    @Override
    public void onMessage(MessageExt messageExt) {
        String topic = messageExt.getTopic();
        String tags = messageExt.getTags();
        String body = new String(messageExt.getBody(), StandardCharsets.UTF_8);
        log.info("TagFilterConsumer 接收消息，topic: {}, tags: {}, 消息内容：{}", topic, tags, body);
    }
}
```

- 消费结果

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220827004316.png)

### SQL 过滤

SQL 过滤是指使用一些类似 SQL 语句的语法进行过滤 ，如 is null、between 等关键词。生产者在发送消息时，给消息自定义某些属性；消费者订阅消息时使用 SQL 语句来对这些属性进行过滤，这种方式实现起来有难度，但是灵活。

但是要使用这个 SQL 过滤的特性，有一个前提就是：Broker 需要开启属性过滤。要开启这个功能，需要在 `broker.conf` 文件中加入 `enablePropertyFilter=true`。否则消费者启动时会提示：

```
Caused by: org.apache.rocketmq.client.exception.MQClientException: CODE: 1  DESC: The broker does not support consumer to filter message by SQL92
For more information, please visit the url, http://rocketmq.apache.org/docs/faq/
	at org.apache.rocketmq.client.impl.MQClientAPIImpl.checkClientInBroker(MQClientAPIImpl.java:2242) ~[rocketmq-client-4.8.0.jar:4.8.0]
	at org.apache.rocketmq.client.impl.factory.MQClientInstance.checkClientInBroker(MQClientInstance.java:449) ~[rocketmq-client-4.8.0.jar:4.8.0]
	at org.apache.rocketmq.client.impl.consumer.DefaultMQPushConsumerImpl.start(DefaultMQPushConsumerImpl.java:648) ~[rocketmq-client-4.8.0.jar:4.8.0]
    ...
```

代码实现：

- 发送消息

```java
@ApiOperation("测试 sql 过滤消息")
@GetMapping("/sql-filter-message")
public String sqlFilterMessage() {
    // 消费者方设置如下
    // 消费者只接受 tag 为 phone 而且 price 在 [400-500] 区间的消息
    Message<String> message1 = MessageBuilder.withPayload("订单 1").setHeader("price", 600).build();
    log.info("生产者发送消息：{}", message1);
    this.rocketMQTemplate.sendOneWay((RocketMQConstant.TOPIC_PREFIX + "starter-sql-filter:phone"), message1);
    Message<String> message2 = MessageBuilder.withPayload("订单 2").setHeader("price", 420).build();
    log.info("生产者发送消息：{}", message2);
    this.rocketMQTemplate.sendOneWay((RocketMQConstant.TOPIC_PREFIX + "starter-sql-filter:phone"), message2);
    Message<String> message3 = MessageBuilder.withPayload("订单 3").setHeader("price", 480).build();
    log.info("生产者发送消息：{}", message3);
    this.rocketMQTemplate.sendOneWay((RocketMQConstant.TOPIC_PREFIX + "starter-sql-filter"), message3);
    Message<String> message4 = MessageBuilder.withPayload("订单 4").setHeader("price", 500).build();
    log.info("生产者发送消息：{}", message4);
    this.rocketMQTemplate.sendOneWay((RocketMQConstant.TOPIC_PREFIX + "starter-sql-filter:phone"), message4);
    return "sent message";
}
```

- 消费者过滤消息，`selectorType` 方法指定为`SelectorType.SQL92`，然后`selectorExpression`中使用一些 SQL 语句中的关键字，如 `is not null`、`and` 等等

```java
@Slf4j
@Component
@RocketMQMessageListener(
        consumerGroup = (RocketMQConstant.CONSUMER_GROUP_PREFIX + "starter-sql-filter"),
        topic = (RocketMQConstant.TOPIC_PREFIX + "starter-sql-filter"),
        selectorType = SelectorType.SQL92,
        selectorExpression = "(TAGS is not null and TAGS = 'phone') and (price between 400 and 500)"
)
public class SQLFilterConsumer implements RocketMQListener<MessageExt> {
    @Override
    public void onMessage(MessageExt messageExt) {
        String topic = messageExt.getTopic();
        String tags = messageExt.getTags();
        String body = new String(messageExt.getBody(), StandardCharsets.UTF_8);
        log.info("TagFilterConsumer 接收消息，topic: {}, tags: {}, 消息内容：{}", topic, tags, body);
    }
}
```

- 消费结果

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220827005236.png)

最终只有 tag 不为空且 price 位于 [400,500] 区间的消息能被消费

## RocketMQ 事务消息

基于可以发送事务消息这一特性，RocketMQ 成为了分布式事务的解决方案之一，RocketMQ 的事务消息适用于所有对数据最终一致性有强需求的场景。

RocketMQ 事务消息有两大核心点：两阶段提交、事务补偿机制。

### 两阶段提交

第一阶段的提交 Half 消息是对消费者不可见的，Broker 只有收到第二阶段的消息，消费者才能拉取消息进行消费。

### 事务补偿机制

当 Broker 收到状态为 `UNKNOWN` 的消息时，或者由于网络波动、生产者宕机导致长时间没有收到第二阶段提交，Broker 会调用生产者的接口查询本地事务执行情况。

代码实现：

> 消费者大同小异，重点展示生产者方代码

- 生产者定义本地事务监听器，用于执行生产者本地事务以及提供给 RocketMQ 的事务回查

```java
@Slf4j
@RocketMQTransactionListener
public class LocalTransactionListener implements RocketMQLocalTransactionListener {
    @Override
    public RocketMQLocalTransactionState executeLocalTransaction(Message msg, Object arg) {
        log.info("接收到 RocketMQ 的 Half 消息的响应，现在执行本地事务。..");
        int number = (Integer) arg;
        try {
            // 使用除法方便演示事务异常
            Integer result = 100 / number;
            log.info("事务执行结果：{}", result);
            // 线程睡眠 500 毫秒模拟本地事务执行
            TimeUnit.MILLISECONDS.sleep(500);
            log.info("本地事务执行成功，给 RocketMQ 发送 ACK 响应");
            return RocketMQLocalTransactionState.COMMIT;
        } catch (Exception e) {
            log.info("本地事务执行发生异常，需要回滚事务");
            return RocketMQLocalTransactionState.ROLLBACK;
        }
    }

    @Override
    public RocketMQLocalTransactionState checkLocalTransaction(Message msg) {
        log.info("由于 RocketMQ 长时间无法收到消息的状态或本地执行事务状态为 UNKNOW，现在执行补偿事务/回查本地事务。..");
        return RocketMQLocalTransactionState.COMMIT;
    }
}
```

- 发送消息，本地事务中 arg 参数通过发送方法传入

```java
@ApiOperation("发送事务消息")
@GetMapping("/transaction/{number}")
public TransactionSendResult sendTransactionMessage(@PathVariable Integer number) {
    log.info("接收到事务请求，准备执行生产者本地事务。..");
    Message<String> message = MessageBuilder.withPayload("通知消费者执行本地事务的事务消息").build();
    TransactionSendResult transactionSendResult = this.rocketMQTemplate.sendMessageInTransaction((RocketMQConstant.TOPIC_PREFIX + "starter-transaction"), message, number);
    log.info("生产者发送状态：{}", transactionSendResult.getSendStatus().toString());
    log.info("本地事务执行结果：{}", transactionSendResult.getLocalTransactionState().toString());
    return transactionSendResult;
}
```

- 生产者本地事务执行成功

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220827005829.png)

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220827005908.png)

生产者事务执行成功后，会发送 ACK 到 RocketMQ 通知本次事务成功提交了，然后消费者能收到消息进行消费。

- 生产者本地事务执行失败

number 参数传入 0 让事务执行过程中发生除 0 异常。

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220827005957.png)

生产者回滚事务后，消费者无法收到此消息。

## 总结

这篇文章使用 spring-boot 集成 rocketmq-spring-boot-starter 的方式演示了 RocketMQ 大部分的使用场景，希望能给有需要的你有帮助。

不得不说这种方式比直接集成 rocketmq-client 要方便，许多重复性的内容被框架大大优化，比如：生产者的定义、消费者及消息监听器的定义等。但是集成度高同样也会提高学习成本，要想用好这个框架，还需要继续深入学习研究。

如果本文有错漏的地方，欢迎提出指正。

本文使用的代码 GitHub 地址：[rocketmq-learning](https://github.com/gelald/rocketmq-learning)，如果觉得我写得还不错，希望能给我点上一个 star🌟，感谢。