# RocketMQ

> 本篇文章基于 RocketMQ 4.9.0 版本

## RocketMQ简介

RocketMQ 是一个分布式的消息中间件，孵化于阿里巴巴，后贡献给了 Apache 基金会，其高性能、高实时、分布式是其最显著的特点

## 核心组件

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220617221818.png)

- `nameserver` ：可以理解为是一个注册中心，支持 `broker` 的动态注册与发现，提供给 `producer` / `consumer` 查找 `broker` 信息，从而进行消息的发送/消费
- `broker` ：主要负责消息的存储、投递以及服务高可用的保证，有以下子模块
  - Remoting Module：这是 `broker` 的入口模块，负责处理所有来自客户端的请求
  - Client Manager：负责管理所有的生产者消费者客户端，并维护消费者和 Topic 的订阅信息
  - Store Service：提供把消息存储到物理磁盘和查询消息的功能
  - HA Service：高可用服务，提供 master 节点和 slave 节点之间的关系

- `producer` ：消息生产者，通过 `nameserver` 获取 `broker` 的地址并发送消息
- `customer` ：消息消费者，支持 push、pull 两种模式对消息进行消费，同时也支持集群方式和广播形式的消费

## 相关概念

- Topic：是生产者在发送消息和消费者在拉取消息的类别，**可以理解为第一级消息类型，类比于书的标题**

  ```java
  // 在Producer中发送消息时使用Topic
  Message msg = new Message("TopicTest", ("Hello RocketMQ " + i).getBytes(StandardCharsets.UTF_8));
  
  // 在Consumer中订阅Topic
  consumer.subscribe("TopicTest", "*");
  ```
  
- Tag：子主题，用于同一业务模块的具有不同目的的消息，也方便RocketMQ提供的查询功能。**可以理解为第二级消息类型，类比于书的目录，方便检索使用消息**

  ```java
  // 在Producer中使用Tag
  Message msg = new Message("TopicTest", "TagA", ("Hello RocketMQ " + i).getBytes(StandardCharsets.UTF_8));
  
  // 在Consumer中订阅Tag，如果订阅的Tag是*，那就代表订阅Topic下的所有消息
  consumer.subscribe("TopicTest", "TagA||TagB");
  ```
  
- GroupName

  - 具有相同角色的生产者组合或消费者组合，称为生产者组或消费者组。作用是在集群的情况下，一个生产者宕机之后，本地事务回滚后，可以继续联系该组下的另外一个生产者实例，不至于导致业务走不下去。在消费者组中，可以实现消息消费的负载均衡和消息容错目标。
  - 有了GroupName，在集群下，动态扩展容量很方便。只需要在新加的机器中，配置相同的GroupName，启动后，就立即能加入到所在的群组中，参与消息生产或消费。
  - **一个生产者组内的生产者可以发送不同 Topic 的消息，但是一般会发送相同 Topic 类型的消息**。
  - **一个消费者组中的消费者必须订阅完全相同的 Topic，但是一个 Topic 类型的消息可以被多个消费者组同时消费**。
  
  ```java
  // 使用GroupName来初始化Producer
  DefaultMQProducer producer = new DefaultMQProducer("group_name_1");
  
  // 使用GroupName来初始化Consumer
  DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("group_name_1");
  ```

- Queue：存储消息的物理实体，一个 Topic 的 Queue 也被称为一个 Topic 中消息的分区（Partition）

  **一个 Queue 中的消息不允许同一个消费者组中的多个消费者同时消费**



## 同步消息

### 场景

- 这种可靠性同步地发送方式使用的比较广泛，比如：重要的消息通知，短信通知
- 消息可靠，有是否成功的应答

### 实现

```java
// 传入组名实例化消息生产者Producer
DefaultMQProducer producer = new DefaultMQProducer("please_rename_unique_group_name");
// 设置NameServer的地址
producer.setNamesrvAddr("namesrvAddr");
// 启动Producer实例
producer.start();
// 创建消息，并指定Topic，Tag和消息体
Message msg = new Message("TopicTest" /* Topic */,
                          "TagA" 			/* Tag */,
                 ("Hello RocketMQ " + i).getBytes(RemotingHelper.DEFAULT_CHARSET) /* Message body */);
// 发送消息到一个Broker,返回SendResult来判断是否成功送达
SendResult sendResult = producer.send(msg);
// 如果不再发送消息，关闭Producer实例。
producer.shutdown();
```



## 异步消息

### 场景

- 用在对响应时间敏感的业务场景，即发送端不能容忍长时间地等待 Broker 的响应
- 消息可靠，有是否成功的应答

### 实现

```java
// 传入组名实例化消息生产者Producer
DefaultMQProducer producer = new DefaultMQProducer("please_rename_unique_group_name");
// 设置NameServer的地址
producer.setNamesrvAddr("namesrvAddr");
// 启动Producer实例
producer.start();
// 创建消息，并指定Topic，Tag和消息体
Message msg = new Message("TopicTest",
                    			"TagA",
                    			"OrderID188",
                          "Hello world".getBytes(RemotingHelper.DEFAULT_CHARSET));
// SendCallback接收异步返回结果的回调
producer.send(msg, new SendCallback() {
  @Override
  public void onSuccess(SendResult sendResult) {
    //发送成功的回调,返回SendResult对象来判断是否发送成功了
  }
  @Override
  public void onException(Throwable e) {
    //发送过程中有异常的回调,返回异常信息
  }
});
// 如果不再发送消息，关闭Producer实例。
producer.shutdown();
```



## 单向发送消息

### 场景

- 用在不特别关心发送结果的场景，例如日志发送
- 消息不可靠，发送的方法没有结果

### 实现

rocketmq-client 方式

- 生产者

  ```java
  public class OnewayProducer {
      public static void main(String[] args) throws MQClientException, RemotingException, InterruptedException {
          DefaultMQProducer producer = new DefaultMQProducer();
          producer.setNamesrvAddr("localhost:9876");
          producer.setProducerGroup("oneway-producer");
          producer.start();
          Message message = new Message("oneway-topic", "单向发送的消息".getBytes(StandardCharsets.UTF_8));
          producer.sendOneway(message);
          System.out.println("消息发送成功");
          producer.shutdown();
      }
  }
  ```



- 消费者

  ```java
  public class OnewayConsumer {
      public static void main(String[] args) throws MQClientException {
          DefaultMQPushConsumer consumer = new DefaultMQPushConsumer();
          consumer.setNamesrvAddr("localhost:9876");
          consumer.setConsumerGroup("oneway-consumer");
          // 设置消费者第一次启动是从队列头部开始还是队列尾部开始消费
          // 如果不是第一次启动，那么按照上次消费的位置继续消费
          consumer.setConsumeFromWhere(ConsumeFromWhere.CONSUME_FROM_FIRST_OFFSET);
          // 设置消费者订阅的Topic和Tag
          consumer.subscribe("oneway-topic", "*");
          consumer.setMessageListener((MessageListenerConcurrently) (messageExtList, context) -> {
              if (CollectionUtils.isEmpty(messageExtList)) {
                  System.out.println("MQ 接收的消息为空");
                  return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
              }
              for (MessageExt messageExt : messageExtList) {
                  String topic = messageExt.getTopic();
                  String tags = messageExt.getTags();
                  String body = new String(messageExt.getBody(), StandardCharsets.UTF_8);
                  System.out.println("MQ消息topic=" + topic + ", tags=" + tags + ", 消息内容=" + body);
                  try {
                      TimeUnit.MILLISECONDS.sleep(1500);
                  } catch (InterruptedException e) {
                      e.printStackTrace();
                  }
              }
              return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
          });
          consumer.start();
      }
  }
  ```



rocketmq-spring-boot-starter 方式

- 生产者

  ```java
  @Slf4j
  @Component
  public class RocketMQProducer {
      private RocketMQTemplate rocketMQTemplate;
  
      public void sendOnewayMessage(String destination, String messageBody) {
          Message<String> message = MessageBuilder.withPayload(messageBody).build();
          this.rocketMQTemplate.sendOneWay(destination, message);
          log.info("单向消息发送成功: {}", messageBody);
      }
      
      @Autowired
      public void setRocketMQTemplate(RocketMQTemplate rocketMQTemplate) {
          this.rocketMQTemplate = rocketMQTemplate;
      }
  }
  ```



- 消费者

  ```java
  @Slf4j
  @Component
  @RocketMQMessageListener(
          consumerGroup = "rocketmq-boot-oneway-consumer",
          topic = "test-oneway-rocketmq"
  )
  public class RocketMQOnewayConsumer implements RocketMQListener<MessageExt> {
      @Override
      public void onMessage(MessageExt messageExt) {
          byte[] body = messageExt.getBody();
          String content = new String(body, StandardCharsets.UTF_8);
          log.info("接受到消息:{}", content);
      }
  }
  ```

  



## 事务消息

### 场景

RocketMQ 的事务消息适用于所有对数据最终一致性有强需求的场景

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220620112829.png)

### 原理

以支付订单后奖励积分为例，此时生产者是订单系统，消费者是积分系统，当积分系统收到订单系统传来订单支付成功，那么就给用户提供积分的奖励

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220620110500.png)

1. 订单系统会发送一条 half 消息到 RocketMQ 中，这个 half 消息其实是一个代表订单成功支付的消息，只不过目前这个状态积分系统是无法感知这个消息的存在的
2. 如果发送 half 消息后没有收到 MQ 的响应，那么可以认定 MQ 此时有问题，那么就在订单系统中「回滚」这笔订单，例如订单关闭或者发起退款
3. 如果收到 MQ 的响应，那么订单系统就可以进行自己的业务，比如更新订单状态
4. 如果在处理自己系统的业务时，本地事务发生异常了，那么就发送一个 `rollback` 请求到 MQ 中，让 MQ 删除之前发送的 half 消息；如果业务逻辑成功执行、本地事务成功提交，那么就发送一个 `commit` 请求到 MQ 中，MQ 收到 `commit` 请求后，之前的 half 消息也就对积分系统可见了；如果业务逻辑的事务状态为 `unknown` ，那么 MQ 就会发起回查，回查生产者本地事务的状态

5. 假设由于网络波动、生产者重启导致事务消息的二次确认丢失，MQ 也有补偿措施，它会去扫描自己处于 half 状态的消息，如果这个 MQ 一直没有接收到对这个 half 消息执行 `rollback`  或 `commit` 的命令，会回调一个接口，询问这个订单是什么状态 ，此时订单系统就可以查询这个订单的状态，如果是成功了，那么就发送一个 `commit` 请求；否者发送 `rollback` 请求·



RocketMQ 实现事务消息的两大核心，是达到分布式事务最终一致性的关键

- **两阶段提交**、半消息（Half 消息）：Broker 只有收到第二阶段的消息，消费者才能拉取
- **事务补偿机制**：当 Broker 收到状态为 `Unknown` 的消息时，或者由于网络波动、生产者宕机导致长时间没有收到第二阶段提交，会触发事务回查机制



### 实现

rocketmq-client 方式

- 生产者

  ```java
  public class Producer {
   
      public static void main(String[] args) throws MQClientException, UnsupportedEncodingException {
  		// 设置生产者组、NameServer地址等基本信息
          TransactionMQProducer producer = new TransactionMQProducer("transaction-producer");
          producer.setNamesrvAddr("localhost:9876");
   		// 设置MQ事务监听器
          producer.setTransactionListener(new TransactionListener() {
              @Override
              public LocalTransactionState executeLocalTransaction(Message message, Object o) {
                  System.out.println("接收到 MQ 的 half 消息响应，执行本地事务");
                  return LocalTransactionState.UNKNOW;
              }
   
              @Override
              public LocalTransactionState checkLocalTransaction(MessageExt messageExt) {
                  System.out.println("MQ 长时间无法收到消息的状态，执行补偿事务");
                  return LocalTransactionState.ROLLBACK_MESSAGE;
              }
          });
   		// 生产者启动
          producer.start();
   		// 消息发送
          Message msg = new Message("transaction-topic", "tag1",
                          ("Hello RocketMQ transaction").getBytes(RemotingHelper.DEFAULT_CHARSET));
          SendResult sendResult = producer.sendMessageInTransaction(msg, null);
          System.out.println("发送成功" + sendResult);
      }
  }
  ```

  

- 消费者

  ```java
  public class Consumer {
   
      public static void main(String[] args) throws MQClientException {
  		// 设置消费者组、NameServer地址等基本信息
          DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("transaction-consumer");
          consumer.setNamesrvAddr("localhost:9876");
   		// 设置消费者订阅的 Topic、Tag 信息
          consumer.subscribe("transaction-topic", "*");
   		// 设置消息监听器（并发监听）
          consumer.setMessageListener(new MessageListenerConcurrently() {
              @Override
              public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> list, ConsumeConcurrentlyContext consumeConcurrentlyContext) {
                  for (MessageExt messageExt : list) {
                      System.out.println(messageExt);
                  }
                  return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
              }
          });
   		// 消费者启动
          consumer.start();
      }
  }
  ```

  

rocketmq-spring-boot-starter 方式

- 生产者

  ```java
  // 设置生产者
  @Slf4j
  @Component
  public class TransactionProduce {
      private RocketMQTemplate rocketMQTemplate;
      
      public void sendTransactionalMessage(String destination, String messageBody) {
          Message<String> message = MessageBuilder.withPayload(messageBody).build();
          TransactionSendResult transactionSendResult = this.rocketMQTemplate.sendMessageInTransaction(destination, message, null);
          // 发送状态
          String sendStatus = transactionSendResult.getSendStatus().name();
          // 本地事务执行状态
          String localTxState = transactionSendResult.getLocalTransactionState().name();
          log.info("send tx message payload:{}, sendStatus:{}, localTXState:{}", messageBody, sendStatus, localTxState);
      }
  
          @Autowired
      public void setRocketMQTemplate(RocketMQTemplate rocketMQTemplate) {
          this.rocketMQTemplate = rocketMQTemplate;
      }
  }
  ```
  
  

  ```java
  // 设置事务消息监听器
  @Slf4j
  @RocketMQTransactionListener
  public class CustomTransactionListener implements RocketMQLocalTransactionListener {
  
      @Override
      public RocketMQLocalTransactionState executeLocalTransaction(Message message, Object o) {
          log.info("开始执行本地事务");
          try {
              TimeUnit.SECONDS.sleep(1);
              int i = 1 / 0;
              log.info("执行本地事务成功");
              return RocketMQLocalTransactionState.COMMIT;
          } catch (Exception e) {
              log.error("执行本地事务发生异常");
              return RocketMQLocalTransactionState.UNKNOWN;
          }
      }
  
      @Override
      public RocketMQLocalTransactionState checkLocalTransaction(Message message) {
          log.info("开始回查本地事务");
          try {
              log.info("回查本地事务，本地事务成功");
              TimeUnit.SECONDS.sleep(1);
              return RocketMQLocalTransactionState.COMMIT;
          } catch (Exception e) {
              log.error("回查本地事务，本地事务不成功");
              return RocketMQLocalTransactionState.ROLLBACK;
          }
      }
  }
  ```
  
  
  
  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220618174639.png)
  
- 消费者

  ```java
  @Slf4j
  @Component
  @RocketMQMessageListener(
          consumerGroup = "rocketmq-boot-transactional-consumer",
          topic = "test-tx-rocketmq")
  public class RocketMQTransactionalConsumer implements RocketMQListener<MessageExt> {
      @Override
      public void onMessage(MessageExt messageExt) {
          byte[] body = messageExt.getBody();
          String content = new String(body, StandardCharsets.UTF_8);
          log.info("接受到消息: {}", content);
      }
  }
  ```
  
  

## 顺序消息

### 场景

如果业务对消息的发送和消费的顺序有比较高的需求，那么在发送消息时就需要进行一些特定的处理，达到顺序发送-顺序消费的目的

### 原理

因为消息发送时，一个 topic 会经由多个队列发送给消费者，消费时会存在以下两个问题

- 如何保证一个队列只被一个消费者客户端消费（因为一个消费者组可能会有多个消费者）
- 如何保证一个消费者客户端只有一个线程能进行消费（因为如果有多个线程消费，顺序的保证就比较难保障）

解决这两个问题的方案

- 发送时锁定一个队列来发送（生产者默认用 4 个队列来传输消息），那么消费者订阅这个 Topic 的消息时，这些消息只能从某一个特定的队列被拉取
- 设置消费线程为 1；或者实现 `MessageListenerOrderly` 接口来实现消费的逻辑



RocketMQ 保证消息有序分为两种

- 全局有序消息：一个 Topic 下的消息都要保证顺序。需要保证只使用一个队列存放消息，一个消费者从这一个队列拉取消息并使用一个线程进行消费，这样就能保证全局有序
- 局部有序消息：保证一个队列中的消息有序消费，比如：保证同一个订单的生成、付款、发货。需要保证把同一个订单的消息放入同一个队列中，一个消费者从这一个队列拉取消息并使用一个线程进行消费



如果使用实现 `MessageListenerOrderly` 接口来实现消费的逻辑，需要注意 `consumeMessage` 方法的返回值 `ConsumeOrderlyStatus` 的值只能是 `SUCCESS` 和 `SUSPEND_CURRENT_QUEUE_A_MOMENT` ，其中 `SUSPEND_CURRENT_QUEUE_A_MOMENT` 表示消费失败，等待一下再继续消费，不会跳过这条消息，否则就破坏了消息的顺序了



### 实现

rocketmq-client 方式

- 生产者

  这是全局有序的实现方式

  ```java
  public class OrderProducer {
      public static void main(String[] args) throws MQClientException, MQBrokerException, RemotingException, InterruptedException {
          DefaultMQProducer producer = new DefaultMQProducer();
          producer.setNamesrvAddr("localhost:9876");
          producer.setProducerGroup("order-producer");
          producer.setVipChannelEnabled(false);
          producer.setDefaultTopicQueueNums(1);
          producer.start();
          for (int i = 0; i < 4; i++) {
              String body = "订单创建" + i;
              Message message = new Message("order-topic", body.getBytes(StandardCharsets.UTF_8));
              message.setKeys("key-" + i);
              SendResult sendResult = producer.send(message);
              System.out.println(sendResult);
  
              body = "订单支付" + i;
              message = new Message("order-topic", body.getBytes(StandardCharsets.UTF_8));
              message.setKeys("key-" + i);
              sendResult = producer.send(message);
              System.out.println(sendResult);
  
              body = "订单发货" + i;
              message = new Message("order-topic", body.getBytes(StandardCharsets.UTF_8));
              message.setKeys("key-" + i);
              sendResult = producer.send(message);
              System.out.println(sendResult);
          }
          producer.shutdown();
      }
  }
  ```

  如果想实现分区有序，则发送消息时需要做以下修改，使用一定的算法确定使用的队列

  ```java
  sendResult = producer.send(message, new MessageQueueSelector() {
      @Override
      public MessageQueue select(List<MessageQueue> messageQueueList, Message msg, Object arg) {
          Long id = (Long) arg;
          //使用取模算法确定id存放到哪个队列
          int index = (int) (id % messageQueueList.size());
          //index就是要存放的队列的索引
          return messageQueueList.get(index);
      }
  }, i);
  ```

  

- 消费者

  ```java
  public class OrderConsumer {
      public static void main(String[] args) {
          DefaultMQPushConsumer consumer = new DefaultMQPushConsumer();
          try {
              consumer.setNamesrvAddr("localhost:9876");
              consumer.setConsumerGroup("order-consumer");
              // 设置消费者第一次启动是从队列头部开始还是队列尾部开始消费
              // 如果不是第一次启动，那么按照上次消费的位置继续消费
              consumer.setConsumeFromWhere(ConsumeFromWhere.CONSUME_FROM_FIRST_OFFSET);
              // 设置消费者订阅的Topic和Tag
              consumer.subscribe("order-topic", "*");
              consumer.setMessageListener((MessageListenerOrderly) (messageExtList, context) -> {
                  if (CollectionUtils.isEmpty(messageExtList)) {
                      System.out.println("MQ 接收的消息为空");
                      return ConsumeOrderlyStatus.SUCCESS;
                  }
                  for (MessageExt messageExt : messageExtList) {
                      String topic = messageExt.getTopic();
                      String keys = messageExt.getKeys();
                      String body = new String(messageExt.getBody(), StandardCharsets.UTF_8);
                      System.out.println("MQ消息topic=" + topic + ", keys=" + keys + ", 消息内容=" + body);
                  }
                  return ConsumeOrderlyStatus.SUCCESS;
              });
              consumer.start();
          } catch (MQClientException e) {
              throw new RuntimeException(e);
          }
      }
  }
  ```



rocketmq-spring-boot-starter 方式

- 生产者

  ```java
  @Slf4j
  @Component
  public class RocketMQProducer {
      private RocketMQTemplate rocketMQTemplate;
      
      public void sendOrderMessage() {
          for (int i = 0; i < 5; i++) {
              Message<String> message = MessageBuilder.withPayload("订单创建" + i).build();
              // 同步顺序消息
              SendResult sendResult = this.rocketMQTemplate.syncSendOrderly("test-orderly-rocketmq", message, String.valueOf(i));
              log.info("发送顺序消息成功:{}", sendResult);
  
              message = MessageBuilder.withPayload("订单支付" + i).build();
              // 同步顺序消息
              sendResult = this.rocketMQTemplate.syncSendOrderly("test-orderly-rocketmq", message, String.valueOf(i));
              log.info("发送顺序消息成功:{}", sendResult);
  
              message = MessageBuilder.withPayload("订单发货" + i).build();
              // 同步顺序消息
              sendResult = this.rocketMQTemplate.syncSendOrderly("test-orderly-rocketmq", message, String.valueOf(i));
              log.info("发送顺序消息成功:{}", sendResult);
          }
      }
  
      @Autowired
      public void setRocketMQTemplate(RocketMQTemplate rocketMQTemplate) {
          this.rocketMQTemplate = rocketMQTemplate;
      }
  }
  ```



- 消费者

  ```java
  @Slf4j
  @Component
  @RocketMQMessageListener(
          consumerGroup = "rocketmq-boot-order-consumer",
          topic = "test-orderly-rocketmq",
      	// 标识为顺序消费
          consumeMode = ConsumeMode.ORDERLY)
  public class RocketMQOrderConsumer implements RocketMQListener<MessageExt> {
      @Override
      public void onMessage(MessageExt messageExt) {
          byte[] body = messageExt.getBody();
          String content = new String(body, StandardCharsets.UTF_8);
          log.info("接受到消息: {}", content);
      }
  }
  ```

  
