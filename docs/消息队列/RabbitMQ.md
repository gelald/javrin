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



- 使用 `@Payload` 和 `@Headers` 注解可以消息中的 `body` 与 `headers` 信息

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



## RabbitMQ面试题

