# RabbitMQ

## RabbitMQ简述

**RabbitMQ** 是一个开源的 **AMQP** 实现，服务器端用 **Erlang** 语言编写，支持多种客户端，用于在分布式系统中**存储**、**转发**消息，在易用性、扩展性、高可用性等方面表现不俗

### AMQP

> Advanced Message Queuing Protocol：高级消息队列协议，是应用层协议的一个开放标准，为面向消息的中间件设计



### 使用消息队列的意义

- 异步

  > 传统的点对点通信方式中，请求方发送请求后，在接收方响应结果之前需要一直处于等待状态。这是一个同步阻塞的过程。缺点：处理的数据量大时请求方需要一直处于等待状态

  用户在网站上注册，然后系统发送邮件和短信告知用户成功注册，对比三种做法

  - 串行执行：依次执行，用户注册后，没必要等待注册成功邮件和短信
  - 并行执行：并行依旧没有解决串行的弊端，系统依旧需要等待发送成功才能返回
  - 异步执行：用户注册成功后把信息异步发送到MQ上，然后短信、邮件系统消费注册成功的消息并发送对应的内容

  ![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210914103835.png)

- 解耦

  > 不需要配置下游消费系统的IP地址和端口，只需要配置MQ服务器的地址；这样上游系统和下游系统的强依赖关系就被解除了。因为可以自己生产消息，自己消费消息，所以可以实现内部模块的解耦和各个系统之间的解耦

  - 解耦前，串行状态

  ![image-20200624155924931](https://gitee.com/ngwingbun/picgo-image/raw/master/images/007S8ZIlgy1gg3fqvimd9j317o0ls7cg.jpg)

  - 解耦后，并行状态

  ![image-20200624160008794](https://gitee.com/ngwingbun/picgo-image/raw/master/images/007S8ZIlgy1gg3frlu6c5j31ci0f8dnq.jpg)

- 削峰（限流）

  > 常见的电商系统中，会存在流量的瞬间的峰值，后台的并发能力是有限的



### 使用消息队列的不足

- 系统的可用性降低

  > 因为引入了第三方的依赖，需要考虑第三方依赖的稳定性，有可能因为第三方依赖的不可用导致系统的不可用

- 系统复杂度增加

  > 比原有耦合的架构需要考虑的内容更多了，如何保证消息不被重复消费，如何保证消息传输的可靠性等



## RabbitMQ的工作模型

![image-20200624170325192](https://gitee.com/ngwingbun/picgo-image/raw/master/images/007S8ZIlgy1gg3hlfyhhxj31sa0jsauz.jpg)

- **Broker** ：RabbitMQ服务器，主要完成消息的**存储和转发**
- **VHost**：可以理解为虚拟Broker，内部均含有独立的 Queue、Exchange 和 Binding 等，但最重要的是，拥有独立的权限系统，可以做到 VHost 范围的用户控制（**不同的应用跑在不同VHost中**），可以**解决硬件资源利用率的问题**
- **Exchange**：消息交换机，负责指定消息路由到队列上。RabbitMQ中实现消息灵活路由的核心设计
  - 交换机本质：地址清单，保存了哪些队列和他的绑定关系
  - 根据标识去查找所有绑定的队列，符合规则的就把消息路由到队列上
- **Queue**：消息队列载体，每个消息会被投入到一个或多个队列中
- **Binding**：负责把Exchange交换机和Queue队列**按照路由规则**绑定起来
- **Routing Key**：路由关键字，Exchange交换机根据路由规则把这个关键字进行消息路由。由Exchange、Queue、Routing Key三者唯一决定一个消息的线路
- **Producer**：消息生产者
- **Consumer**：消息消费者，消费者通过监听的机制获取事件
- **Channel**：消息通道，在客户端的长连接里可以建立多个Channel，每个Channel代表一个会话任务。在保持的TCP长连接中，创建和释放**虚拟的连接**



## RabbitMQ的工作模式

### 简单模式

简单模式（simple）：简单的发送与接受，没有特别的处理。单生产单消费，**没有交换机**

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20181113170451647.png)

不足：**耦合度过高**，生产者一一对应消费者，难以扩展成多个消费者消费消息的模式

### 工作模式

工作模式（work）：一个生产者，多个消费者。单生产多消费，**没有交换机**

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20181113170522132.png)

- 轮询分发：消费者`autoAck=true`，MQ会“雨露均沾”地分发消息到每一个消费者上，消费者从消息队列获取消息后，服务端就认为该消息已经成功消费。第一次先发到C1，下一次就发到C2上
- 公平分发：消费者`autoAck=false`，消费者消费完毕后告知MQ，MQ再把消息发送给它，**实现了按消费者性能消费**。C1先处理完而C2还没处理完接收到的消息，那么C1就优先接收下一条消息

### 发布订阅模式

发布订阅模式（publish subscribe）：不处理路由键，需要把队列绑定到**扇形交换机`FanoutExchange`**上，消息就会被发送到队列中。任何发送的消息到达交换机后，交换机都会把**消息的相同副本**分发给所有跟它绑定的队列

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20181113170540476.png)

### 路由模式

路由模式（routing）：每一个消息队列都指定一个**路由键`Routing Key`**，需要把队列绑定到**直连交换机`DirectExchange`**上，只有和路由键**完全匹配**的消息才会被送到对应的消息队列上

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20181113170555287.png)

不足：**路由key必须要明确**，无法实现规则性模糊匹配

### 主题模式

主题模式（topic）：和路由模式类似，但是消息队列上指定的是一个**具有模糊匹配的路由键**，需要把队列绑定到**主题交换机`TopicExchange`**上，只要被路由键**模糊匹配**上的消息就会被送到对应的消息队列上。如果一个消息同时**符合多个主题**，那么匹配的队列都会收到这个**相同的消息的副本**

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20181113170631174.png)

- `*`表示匹配1个词
- `#`表示匹配1个或多个词
- `.`用于词的分隔。如：`*.jvm`能匹配`spring.jvm`



## RabbitMQ的交换机

### fanout

扇形交换机，它会把消息的相同副本**投放到所有**和`fanout`交换机绑定的队列上，如果消息发送到没有队列绑定的交换器时，消息将丢失，因为**交换器没有存储消息的能力，消息只能存储在队列中。**应用场景：比如一个商城系统需要在管理员上传商品新的图片时，前台系统必须更新图片，日志系统必须记录相应的日志，那么就可以将两个队列绑定到图片上传交换器上，一个用于前台系统更新图片，另一个用于日志系统记录日志。

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210914102759.png)

### direct

直连交换机，只有路由键**完全匹配**，消息才会投放到响应的队列上

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210914102828.png)

### topic

主题交换机，提供路由键的**模糊匹配**功能，如果同时多个队列匹配了这个消息，则会投送消息的相同副本到队列上

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210914102850.png)

### header

头部交换机，工作模式和`topic`交换机类似，但是是**匹配AMQP消息的header**而非路由键，并且**性能较差**，一般不用

### 交换机类型选择场景

- **通用的消息**，所有业务系统都关注的，使用`fanout`交换机
- 一个系统特殊地关注另一个系统（**业务主题是明确的**），使用`direct`交换机
- 不同的业务系统关注不同的业务主题、基于不同的系统环境（某些消息只希望在开发/生产环境中收到），使用`topic`交换机



## 死信队列和延迟队列

### 死信队列

#### 概念

死信 `Dead Letter` 是 `RabbitMQ` 中的一种消息机制，当消费消息时队列里的消息出现以下情况那么该消息将成为死信

- 消息被否定确认，使用`channel.basicNack` 或 `channel.basicReject`  ，并且此时 `default-requeue-rejected`(由于监听器抛出异常而拒绝的消息是否被重新放回队列) 属性被设置为`false`
- 消息在队列的存活时间超过设置的TTL时间
- 消息队列的消息数量已经超过最大队列长度（可以使用`x-max-length`来限制消息总数，也可以使用`x-max-length-bytes`来限制消息体总字节数）

如果配置了死信队列信息，那么死信将会被丢进死信队列中，如果没有配置，则该消息将会被丢弃。死信队列 并不是什么特殊的队列，只不过是绑定在死信交换机上的队列，而死信交换机只不过是用来接受死信的普通交换机，所以可以是任意类型

#### 适用场景

> 在较为重要的业务队列中，确保未被正确消费的消息不被丢弃，在系统因为参数解析、数据校验、网络拨打等导致异常后通过配置死信队列，可以让未正确处理的消息暂存到另一个队列中，待后续排查清楚问题后，编写相应的处理代码来处理死信消息。

#### 生命周期

> 1. 业务消息被投入业务队列
> 2. 消费者消费业务队列的消息，由于处理过程中发生异常，于是进行了nack或者reject操作
> 3. 被nack或reject的消息由RabbitMQ投递到死信交换机中
> 4. 死信交换机将消息投入相应的死信队列
> 5. 死信队列的消费者消费死信消息

#### 总结

死信消息是 `RabbitMQ` 为我们做的**一层保证**，其实也可以不使用死信队列，而是在消息消费异常时，将消息主动投递到另一个交换机中。明白死信队列运行机制后就知道这些 `Exchange` 和 `Queue` 想怎样配合就能怎么配合。比如从死信队列拉取消息，然后发送邮件、短信来**通知开发人员关注**。或者将消息重新投递到一个队列然后设置过期时间，来**进行延时消费**。



### TTL

TTL(Time To Live) 是 `RabbitMQ` 中一个 **消息** 或 **队列** 的属性，如果一条消息设置了 TTL属性或者进入了有 TTL属性的队列，那么这条消息如果在TTL设置的时间内没有被消费，则会成为死信。如果同时配置了队列的TTL和消息的TTL，那么**较小的那个值将会被使用**。

- 队列设置TTL，一旦消息过期就会被队列丢弃

  ```java
  Map<String, Object> args = new HashMap<String, Object>();
  args.put("x-message-ttl", 6000); // ms
  channel.queueDeclare(queueName, durable, exclusive, autoDelete, args);
  ```

  

- 消息设置TTL，消息过期是在即将投递到消费者之前判定的，如果当前队列有严重的Msg 积压情况，则已过期的 Msg 也许还能存活较长时间

  ```java
  AMQP.BasicProperties.Builder builder = new AMQP.BasicProperties.Builder();
  builder.expiration("6000");
  AMQP.BasicProperties properties = builder.build();
  channel.basicPublish(exchangeName, routingKey, mandatory, properties, "msg body".getBytes());
  ```

  

### 延迟队列

#### 概念

延时队列中的元素则是希望被在指定时间得到取出和处理，所以延时队列中的元素是都是带时间属性的，通常来说是需要被处理的消息或者任务

#### 适用场景

> 1. 订单在 15 分钟之内未支付则自动取消。
> 2. 账单在一周内未支付，则自动结算。
> 3. 用户注册成功后，如果三天内没有登陆则进行短信提醒。
> 4. 用户发起退款，如果三天内没有得到处理则通知相关运营人员。
> 5. 预定会议后，需要在预定的时间点前十分钟通知各个与会人员参加会议。

#### 原理

延迟队列 = 死信队列 + TTL

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20211022173310.png)

延迟队列也可以使用 Java 的 DelayQueue、Quartz；Redis 的 zset实现



## RabbitMQ中的推拉模式

在RabbitMQ 中有推模式跟拉模式，平时开发多为**推模式**

#### 推模式

MQ主动将消息推给消费者

- `channel.basicConsume(queneName,consumer)`方法将信道设置成**投递模式**，直到取消队列的订阅为止，当消息到达RabbitMQ时，RabbitMQ会自动地、不断地投递消息给匹配的消费者，而不需要消费端手动来拉取
- 推模式将消息提前推送给消费者，消费者必须设置一个**缓冲区**缓存这些消息。优点是消费者总是有一堆在内存中待处理的消息，所以当真正去消费消息时效率很高。缺点就是缓冲区可能会溢出
- 推模式下消息到达MQ后，会立刻被投递到消费者，所以实时性很好

#### 拉模式

消费者主动从MQ拉取消息

- `channel.basicGet()`方法将消费者的消费方式改为获取单条消息而不是持续订阅
- 拉模式下消费者在需要的时候才去拉取消息，这段网络开销会明显增加消息延迟，降低系统吞吐量；同时实时性较差



## SpringBoot中使用RabbitMQ

### 手动实现

- 生产者

  1. 获取连接
  2. 获取信道
  3. 声明交换机，如果是没有交换机的工作模式则声明队列
  4. 发送消息
  5. 关闭信道
  6. 关闭连接

  ```java
  final Connection connection = ConnectionUtil.getConnection();
  final Channel channel = connection.createChannel();
  
  channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.DIRECT);
  
  //发布消息3种routingKey的消息
  String message1 = "hello info";
  channel.basicPublish(EXCHANGE_NAME, "info", null, message1.getBytes());
  System.out.println("路由模式发布info消息：" + message1);
  
  String message2 = "hello warning";
  channel.basicPublish(EXCHANGE_NAME, "warning", null, message2.getBytes());
  System.out.println("路由模式发布warning消息：" + message2);
  
  String message3 = "hello error";
  channel.basicPublish(EXCHANGE_NAME, "error", null, message3.getBytes());
  System.out.println("路由模式发布error消息：" + message3);
  
  channel.close();
  connection.close();
  ```

  

- 消费者

  1. 获取连接
  2. 获取信道
  3. 声明队列
  4. 声明交换机（如果有交换机）
  5. 队列与交换机绑定（如果有交换机）
  6. 消费消息
  7. 关闭信道
  8. 关闭连接

  ```java
  final Connection connection = ConnectionUtil.getConnection();
  final Channel channel = connection.createChannel();
  
  channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.DIRECT);
  channel.queueDeclare(QUEUE_NAME, true, false, false, null);
  channel.queueBind(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);
  
  // 按性能消费
  channel.basicQos(1);
  
  Consumer consumer = new DefaultConsumer(channel) {
      @Override
      public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
          String message = new String(body, StandardCharsets.UTF_8);
          System.out.println("路由模式 消费者2 消费消息: " + message);
          //手动返回结果
          channel.basicAck(envelope.getDeliveryTag(), false);
      }
  };
  
  channel.basicConsume(QUEUE_NAME, false, consumer);
  ```

  

### SpringBoot整合RabbitMQ

- 配置文件，声明rabbitmq地址、端口等rabbitmq服务器信息

  ```yaml
  spring:
    rabbitmq:
      host: 192.168.1.119
      port: 5672
      username: guest
      password: Joy-youth@2020.com
      virtual-host: /
  ```

  

- 配置类：创建队列、创建交换机（如果有交换机参与工作）、创建绑定关系并绑定路由键（如果有交换机和路由键参与工作）

  ```java
  @Configuration
  public class RabbitMQConfiguration {
      /**
       * 工作模式下使用的队列
       *
       * @return 队列 {@link Queue}
       */
      @Bean
      public Queue workQueue() {
          return new Queue(RabbitConstant.WORK_QUEUE);
      }
      
      
      /**
       * 发布订阅模式下使用的交换机
       *
       * @return 扇形交换机 {@link FanoutExchange}
       */
      @Bean
      public FanoutExchange publishSubscribeExchange() {
          return new FanoutExchange(RabbitConstant.PUBLISH_SUBSCRIBE_EXCHANGE);
      }
      /**
       * 发布订阅模式下使用的队列1
       *
       * @return 队列 {@link Queue}
       */
      @Bean
      public Queue publishSubscribeQueue1() {
          return new Queue(RabbitConstant.PUBLISH_SUBSCRIBE_QUEUE1);
      }
      /**
       * 发布订阅模式下队列1与交换机绑定,不需要指定路由键
       *
       * @return 绑定 {@link Binding}
       */
      @Bean
      public Binding publishSubscribeQueue1Binding() {
          return BindingBuilder.bind(publishSubscribeQueue1()).to(publishSubscribeExchange());
      }
      
      
      /**
       * 主题模式下使用的交换机
       *
       * @return 交换机 {@link TopicExchange}
       */
      @Bean
      public TopicExchange topicExchange() {
          return new TopicExchange(RabbitMQConstant.TOPIC_EXCHANGE);
      }
      /**
       * 主题模式下使用的队列1
       *
       * @return 队列 {@link Queue}
       */
      @Bean
      public Queue topicQueue1() {
          return new Queue(RabbitMQConstant.TOPIC_QUEUE1);
      }
      /**
       * 主题模式下队列1与交换机绑定,指定路由键
       *
       * @return 绑定 {@link Binding}
       */
      @Bean
      public Binding topicQueue1Binding() {
          return BindingBuilder.bind(topicQueue1()).to(topicExchange()).with(RabbitMQConstant.TOPIC_KEY1);
      }
  }
  ```

  

- 生产者：调用`RabbitTemplate`发送消息到**交换机**（因为交换机已和队列绑定），如果是简单模式和工作模式则发送到**队列**上

  ```java
  @RestController
  public class ProducerController {
      private final RabbitTemplate rabbitTemplate;
  
      public ProducerController(RabbitTemplate rabbitTemplate) {
          this.rabbitTemplate = rabbitTemplate;
      }
      
      @GetMapping("/work")
      public void produceMessage() {
          this.rabbitTemplate.convertAndSend(RabbitConstant.WORK_QUEUE, "测试work模型");
      }
      
      @GetMapping("/fanout")
      public void produceMessage() {
          this.rabbitTemplate.convertAndSend(RabbitConstant.PUBLISH_SUBSCRIBE_EXCHANGE, "", "测试fanout模型");
      }
  
      @GetMapping("/topic")
      public void produceMessage() {
          this.rabbitTemplate.convertAndSend(RabbitConstant.TOPIC_EXCHANGE, "log.critical", "消息1 log.critical");
          this.rabbitTemplate.convertAndSend(RabbitConstant.TOPIC_EXCHANGE, "alert.critical", "消息2 alert.critical");
      }
  
  }
  ```

  

- 消费者：监听类（监听消息队列），推荐一个消费者监听一个队列

  ```java
  @Slf4j
  @Component
  public class TopicListener {
      @RabbitListener(queues = RabbitConstant.TOPIC_QUEUE1)
      public void consumeMessage1(Object msg, Channel channel, Message message) {
          log.info("消费者1接收到的消息:{}", message);
      }
  
      @RabbitListener(queues = RabbitConstant.TOPIC_QUEUE2)
      public void consumeMessage2(Object msg, Channel channel, Message message) {
          log.info("消费者2接收到的消息:{}", message);
      }
  }
  ```



## 生产者生产消息

### 消息发送确认机制

确认消息是否成功发送

> confirm机制：消息的确认，是指生产者投递消息后，如果 `Broker` 收到消息，则会给生产者一个应答。生产者进行接收应答，用来确定这条消息是否正常的发送到 `Broker` ，这种方式也是消息的**可靠性投递的核心保障**

> return机制：消息路由的确认，是指生产者投递消息到 `Broker` 后，需要由交换机进行消息的路由（如果有交换机参与工作），如果指定的路由键无法路由到指定队列上，那么会返回生产者一个**路由失败**的消息，但是需要设置`Mandatory`模式



- 配置文件

  ```yaml
  # 生产者发送消息确认
  #   确认消息已发送到交换机.
  #   none:禁用(默认)
  #   correlated:发送成功后触发回调方法
  #   simple:发布消息成功后使用rabbitTemplate手动调用waitForConfirms或waitForConfirmsOrDie方法等待broker节点返回发送结果，
  #       根据返回结果来判定下一步的逻辑，要注意的点是waitForConfirmsOrDie方法如果返回false则会关闭channel，则接下来无法发送消息到broker
  publisher-confirm-type: correlated
  ```

  

- 配置类

  ```java
  @Slf4j
  @Configuration
  public class RabbitMQProducerConfiguration {
  
      @Bean
      public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
          RabbitTemplate rabbitTemplate = new RabbitTemplate();
          rabbitTemplate.setConnectionFactory(connectionFactory);
          //设置开启Mandatory,才能触发ReturnsCallback回调函数
          rabbitTemplate.setMandatory(true);
          //只要消息成功发到rabbitmq的server,无论是否到达交换机、队列中,都触发这个方法
          rabbitTemplate.setConfirmCallback((correlationData, ack, cause) -> {
              if (log.isDebugEnabled()) {
                  if (!ack) {
                      assert correlationData != null;
                      log.debug("[x] ConfirmCallback [失败数据]: {}", correlationData.getReturned());
                      log.debug("[x] ConfirmCallback [失败原因]: {}", cause);
                  }
              }
          });
          //消息发送到交换机,但是没有找到队列,就触发这个方法
          rabbitTemplate.setReturnsCallback(returnedMessage -> {
              if (log.isDebugEnabled()) {
                  log.debug("[x] ReturnCallback [消息]: {}", returnedMessage.getMessage());
                  log.debug("[x] ReturnCallback [回应码]: {}", returnedMessage.getReplyCode());
                  log.debug("[x] ReturnCallback [回应信息]: {}", returnedMessage.getReplyText());
                  log.debug("[x] ReturnCallback [交换机]: {}", returnedMessage.getExchange());
                  log.debug("[x] ReturnCallback [路由键]: {}", returnedMessage.getRoutingKey());
              }
          });
          return rabbitTemplate;
      }
  }
  ```

  

## 消费者接收数据

### 消费者接收数据方式

- 使用 `@RabbitListener` 注解标记方法，当监听到 `debug` 队列中有消息时则会进行接收并处理

  ```java
  @RabbitListener(queues = "debug")
  public void processMessage1(Message bytes) {
      System.out.println(new String(bytes));
  }
  ```

  

- 通过 `@RabbitListener` 的 `bindings` 属性声明 `Binding` ，当监听到 `consumer_queue` 队列中有消息则进行接受并处理

  ```java
  @RabbitListener(bindings = @QueueBinding(
          exchange = @Exchange(value = "topic.exchange",durable = "true",type = "topic"),
          value = @Queue(value = "consumer_queue",durable = "true"),
          key = "key.#"
  ))
  public void processMessage1(Message message) {
      System.out.println(message);
  }
  ```



-  `@RabbitListener` 可以与 `@RabbitHandler` 一起使用。将 `@RabbitListener` 标注在类上面，当有收到消息的时候，就交给 `@RabbitHandler` 标注的方法处理，具体使用哪个方法处理，根据 `MessageConverter` 转换后的参数类型

  ```java
  @Component
  @RabbitListener(queues = "consumer_queue")
  public class Receiver {
      @RabbitHandler
      public void processMessage1(String message) {
          System.out.println(message);
      }
  
      @RabbitHandler
      public void processMessage2(byte[] message) {
          System.out.println(new String(message));
      }
  }
  ```



- 使用 `@Payload` 和 `@Headers` 注解可以接收消息中的 `body` 与 `headers` 信息

  ```java
  @RabbitListener(queues = "debug")
  public void processMessage1(@Payload String body, @Headers Map<String,Object> headers) {
      System.out.println("body："+body);
      System.out.println("Headers："+headers);
  }
  ```



### Message内容对象序列化与反序列化

- 涉及网络传输的应用序列化不可避免，发送端以某种规则将消息转成 `byte[]` 进行发送，接收端则以约定的规则进行 `byte[]` 的解析

- `RabbitMQ` 的序列化是指 `Message` 的 `body` 属性（真正需要传输的内容），**`RabbitMQ` 抽象出一个 `MessageConvert` 接口处理消息的序列化**，默认的实现是 `SimpleMessageConverter` ，当调用了 `convertAndSend` 方法时会使用 `MessageConvert` 进行消息的序列化

- **`SimpleMessageConverter` 对于要发送消息的 `body` 为 `byte[]` 时不进行处理，如果是 `String` 则转成 `byte[]` ，如果是 Java 对象，则使用 jdk 序列化将消息转成 `byte[]` ，转出来的结果较大，含class类名，类相应方法等信息，因此性能较差**



#### 使用JSON序列化与反序列化

`RabbitMQ` 提供了 `Jackson2JsonMessageConverter` 来支持消息内容 JSON 序列化与反序列化

- 生产者

  ```java
  //发送对象类型的消息时会转换成json字符串
  rabbitTemplate.setMessageConverter(new Jackson2JsonMessageConverter());
  ```

- 消费者，**被序列化对象应提供一个无参的构造函数，否则会抛出异常**

  ```java
  @Configuration
  public class RabbitMQConfig {
      @Bean
      public RabbitListenerContainerFactory<?> rabbitListenerContainerFactory(ConnectionFactory connectionFactory){
          SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
          factory.setConnectionFactory(connectionFactory);
          //消费消息时可以使用对象类型的参数来接收消息
          factory.setMessageConverter(new Jackson2JsonMessageConverter());
          return factory;
      }
  }
  ```



### 消息接收确认机制

- 自动确认**（默认）**，`AcknowledgeMode.NONE`。

  RabbitMQ成功将消息发出（即将消息成功写入TCP Socket）中立即认为本次投递已经被正确处理，不管消费者端是否成功处理本次投递。
  所以这种情况如果消费端消费逻辑抛出异常，也就是**消费端没有处理成功这条消息**，**那么就相当于丢失了消息**。
  一般这种情况需要使用try catch捕捉异常后，打印日志用于追踪数据，以防这条消息丢失，这样找出对应数据再做后续处理。

- 根据情况确认

- 手动确认，`Acknowledge.MANUAL`。

  消费者收到消息后，手动调用`basic.ack`/`basic.nack`/`basic.reject`后，`RabbitMQ`收到这些消息后才认为投递成功

  - `basic.ack`：用于肯定确认

    `channel.basicAck(long deliveryTag, boolean multiple)`：消费当前消息

    `deliverTag`参数表示当前消息数据的唯一Id

    `multiple`参数表示是否针对多条消息，如果是`false`那么代表消费单条消息；如果是`true`那么针对当前通道的消息的`deliverTag`小于当前这条消息的，都消费

  - `basic.nack`：用于否定确认

    `channel.basicNack(long deliveryTag, boolean multiple, boolean requeue)`：拒绝消费当前消息

    `deliverTag`参数表示当前消息数据的唯一Id

    `multiple`参数表示是否针对多条消息，如果是`false`那么代表拒绝单条消息；如果是`true`那么针对当前通道的消息的`deliverTag`小于当前这条消息的，都拒绝消费

  - `basic.reject`：用于否定确认，但是限制一次只能拒绝单条消息

    `channel.basicReject(long deliveryTag, boolean requeue)`：拒绝消费当前消息

    如果`requeue`参数设置为`true`，那么将数据重新放入队列中，下次还会继续消费。一般会在出现异常的时候，catch异常拒绝消费再选择是否重新入列，但是**需要谨慎使用，否则会出现消费-入列-消费-入列的循环，导致消息堆积**

    如果`requeue`参数设置为`false`，那么会通知`RabbitMQ`这条消息不需要了，把这个消息丢弃



设置手动监听类的时候，前面使用`RabbitListener`的消息监听类需要注释掉，**以免造成多个同类型监听器监听同一个队列**

配置手动确认消息监听类的时候可以指定多个队列，然后可以在监听类中根据队列做判断

- 配置类

  ```java
  @Slf4j
  @Configuration
  public class RabbitConsumerConfiguration {
      private final ManualAckListener manualAckListener;
  
      public RabbitConsumerConfiguration(ManualAckListener manualAckListener) {
          this.manualAckListener = manualAckListener;
      }
  
      @Bean
      public SimpleMessageListenerContainer simpleMessageListenerContainer(ConnectionFactory connectionFactory) {
          SimpleMessageListenerContainer container = new SimpleMessageListenerContainer(connectionFactory);
          container.setConcurrentConsumers(1);
          container.setMaxConcurrentConsumers(1);
          //RabbitMQ默认是自动确认，这里改为手动确认消息
          container.setAcknowledgeMode(AcknowledgeMode.MANUAL);
          //设置队列
          container.setQueueNames(
                  RabbitConstant.PUBLISH_SUBSCRIBE_MANUAL_QUEUE,
                  RabbitConstant.ROUTING_MANUAL_QUEUE
          );
          //手动确认消息监听类
          container.setMessageListener(manualAckListener);
          return container;
      }
  }
  ```

- 消息监听类

  ```java
  @Slf4j
  @Component
  public class ManualAckListener implements ChannelAwareMessageListener {
      @Override
      public void onMessage(Message message, Channel channel) throws IOException {
          //消息的id
          long deliveryTag = message.getMessageProperties().getDeliveryTag();
          log.info("消息的id: {}", deliveryTag);
          try {
              //消息来自的队列
              final String consumerQueue = message.getMessageProperties().getConsumerQueue();
              log.info("消费的主题消息来自: {}", consumerQueue);
              if (RabbitConstant.PUBLISH_SUBSCRIBE_MANUAL_QUEUE.equals(consumerQueue)) {
                  log.info("执行FanoutQueue中的消息的业务处理流程");
              }
              if (RabbitConstant.ROUTING_MANUAL_QUEUE.equals(consumerQueue)) {
                  log.info("执行DirectQueue中的消息的业务处理流程");
              }
              channel.basicAck(deliveryTag, false);
          } catch (Exception e) {
              e.printStackTrace();
              channel.basicReject(deliveryTag, true);
          }
  
      }
  }
  ```

  

## RabbitMQ面试题

### 消息是怎么路由的

生产者生产消息后消息带有 routing Key，消费者队列根据routing Key 被绑定到交换器上，消息到达交换器根据交换器规则匹配，常见的交换机如下：`fanout`扇形交换机，如果交换机收到消息，就会把消息的副本广播到所有绑定的队列上；`direct`直连交换机，如果路由键完全匹配，消息就会被投递到相应的队列上；`topic`主题交换机，如果消息符合多个队列的路由键通配符，那么会把这个消息的副本投递到所有符合的队列上

### RabbitMQ消息基于什么传输

**信道**是生产者消费者和RabbitMQ通信的渠道。以发布订阅模式来说，生产者`publish`消息到队列和消费者`subscribe`队列都是通过信道来完成的。信道是建立在TCP连接上的**虚拟连接**，RabbitMQ通过一个TCP连接来建立多个信道来达到多个线程处理的目的，这个TCP连接被多个线程共享，信道有唯一的ID来保证信道私有性，对应唯一的线程使用。用信道而不用 TCP 的原因是由于 **TCP 连接的创建和销毁开销较大**，且并发数受系统资源限制，会造成性能瓶颈

### 如何保证RabbitMQ消息不丢失

可能发生消息丢失的地方：生产者丢失消息、队列丢失消息、消费者丢失消息

- 生产者丢失消息

RabbitMQ提供**`transaction`和`confirm`机制**来确保生产者不丢失消息

`transaction` 机制：发送消息前，开启事务`channel.txSelect()`，然后发送消息，如果发送过程中出现什么异常，事务就会回滚`channel.txRollback()`，如果发送成功则提交事务`channel.txCommit()`。注意：事务卡顿会导致后面无法发送，官方说加入事务机制MQ**会降速250倍**。

`confirm` 机制：生产者确认发送消息，一旦信道进入 `confirm` 模式，所有在该信道上发布的消息都将会被指派一个从1开始的唯一的ID，一旦消息被投递到所有匹配的队列之后，**`RabbitMQ` 就会发送一个包含消息的唯一ID 的 `Ack` 消息给生产者，这就使得生产者知道消息已经正确到达目的队列了。**如果 `RabbitMQ` 没能处理该消息，则会发送一个 `Nack` (not acknowledged) 消息给生产者，这时生产者可以进行重试操作。

- 队列丢失消息

处理队列丢失数据的情况，一般是**开启持久化**的配置

1. 队列持久化：`durable=true`

2. 消息持久化：`deliveryMode=2`

这个持久化可以搭配生产者 `confirm` 机制使用，可以在消息持久化磁盘后，再给生产者发送一个 `Ack` 的信号

此外，持久化是一个权衡问题，持久化可能导致系统QPS下降，所以一般仅对关键消息进行持久化处理，且保证持久化不会成为系统瓶颈

- 消费者丢失消息

处理消费者丢失数据的情况，一般使用**手动确认收到消息**的方式

自动确认的情况：当消费者收到消息后，处理消息前，会**自动回复 `RabbitMQ` 已收到消息**，这时如果处理消息失败，就会丢失这个消息

手动确认的情况：只有当消费者成功消费消息后，才**手动回复**确认收到的消息。消费者跟消息队列的连接不中断，`RabbitMQ` 给了消费者足够长的时间来处理消息，保证数据的最终一致性。

注意点：

1. 消费者接收到消息却没有确认消息，连接也未断开，则 `RabbitMQ` 认为该消费者繁忙，将不会给该消费者分发更多的消息
2. 如果消费者接收到消息，在确认之前断开了连接或取消订阅，`RabbitMQ` 会认为消息没有被分发，然后重新分发给下一个订阅的消费者，**这时可能存在消息重复消费的隐患，需要去重**

### 如何保证RabbitMQ消息不重复

消息重复的情况有：生产者重复发送消息、消费者重复消费消息

一般的解决方法是**通过幂等性来保证重复消费的消息不对结果产生影响**

1. 消息生成时对每个生产的消息生成一个唯一的业务id，作为去重和幂等的依据，避免重复的消息进入队列
2. 消息消费时要求消息体中必须有一个唯一的业务id（如支付id、订单id等），作为去重的依据，避免同一条消息被重复消费

### 如何保证消息顺序执行

- 乱序情况
  - 一个队列多个消费者消费，每个消费者执行时间是不固定的，无法保证先读到消息的消费者一定先完成操作
  - 一个队列一个消费者消费，但是如果消费者内部进行了多线程消费，也会导致消息消费乱序
- 解决方式
  - 一个队列多个消费者消费的情况：拆分成多个队列，让一个队列对应一个消费者，将多个有顺序要求的消息发送到同一个队列中，来保证消息顺序执行
  - 一个队列一个消费者消费的情况：在消费者内部根据消息体中的Id映射到不同的**内存队列**，然后用内存队列分发到底层不同的**工作单元**去处理

### RabbitMQ的集群

RabbitMQ不是基于分布式的方式，而是基于主从方式做高可用性

- 单机模式

- 普通集群模式

  在N台机器上启动N个RabbitMQ实例。创建的queue只会放在一个RabbitMQ实例上，但每一个RabbitMQ实例都同步queue的元数据。消费时如果连接到了另一个RabbitMQ实例，那么这个实例就会从queue所在的实例上拉取数据过来。让集群中多个节点来服务某个queue的读写操作来提高吞吐量

- 镜像集群模式

  在N台机器上启动N个RabbitMQ实例。创建的queue无论是元数据还是里面的消息都会存在于每一个RabbitMQ的实例上，写消息到 queue 的时候都会自动把消息同步到多个实例的 queue 上。当有节点宕机了，其他节点还保留这个queue的完整数据，任何消费者都可以到其他节点上消费数据；但是每个节点都同步queue的元数据和消息，会导致网络带宽的压力和消耗加重



