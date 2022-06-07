# RocketMQ

> 本篇文章基于 RocketMQ 4.9.0 版本

## RocketMQ简介

RocketMQ 是一个分布式的消息中间件，孵化于阿里巴巴，后贡献给了 Apache 基金会，其高性能、高实时、分布式是其最显著的特点

## 核心组件

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220607203843.png)

- `nameserver` ：可以理解为是一个注册中心，支持 `broker` 的动态注册与发现，提供给 `producer` / `consumer` 查找 `broker` 信息，从而进行消息的发送/消费
- `broker` ：主要负责消息的存储、投递以及服务高可用的保证，有以下子模块
  - Remoting Module：这是 `broker` 的入口模块，负责处理所有来自客户端的请求
  - Client Manager：负责管理所有的生产者消费者客户端，并维护消费者和 Topic 的订阅信息
  - Store Service：提供把消息存储到物理磁盘和查询消息的功能
  - HA Service：高可用服务，提供 master 节点和 slave 节点之间的关系

- `producer` ：消息生产者，通过 `nameserver` 获取 `broker` 的地址并发送消息
- `customer` ：消息消费者，支持 push、pull 两种模式对消息进行消费，同时也支持集群方式和广播形式的消费，

## 相关概念

- Topic：是生产者在发送消息和消费者在拉取消息的类别，一个Topic可能有0个，1个或多个生产者向它发送消息；相反，一个生产者可以发送不同类型Topic的消息。类似的，消费者组可以订阅一个或多个主题，只要该组的实例保持其订阅一致即可。**可以理解为第一级消息类型，类比于书的标题**

  ```java
  //在Producer中使用Topic
  Message msg = new Message("TopicTest" /* Topic */,
                      "TagA",
                      ("Hello RocketMQ " + i).getBytes(RemotingHelper.DEFAULT_CHARSET));
  
  //在Consumer中订阅Topic
  consumer.subscribe("TopicTest", "*");
  ```

- Tag：子主题，来自同一业务模块的具有不同目的的消息可以具有相同的主题和不同的标记。标签有助于保持代码的清晰和连贯，同时标签也方便RocketMQ提供的查询功能。**可以理解为第二级消息类型，类比于书的目录，方便检索使用消息**

  ```java
  //在Producer中使用Tag
  Message msg = new Message("TopicTest",
                      "TagA" /* Tag */,
                      ("Hello RocketMQ " + i).getBytes(RemotingHelper.DEFAULT_CHARSET));
  
  //在Consumer中订阅Tag
  consumer.subscribe("TopicTest", "TagA||TagB");// * 代表订阅Topic下的所有消息
  ```

- GroupName

  - 代表具有相同角色的生产者组合或消费者组合，称为生产者组或消费者组。作用是在集群HA的情况下，一个生产者down之后，本地事务回滚后，可以继续联系该组下的另外一个生产者实例，不至于导致业务走不下去。**在消费者组中，可以实现消息消费的负载均衡和消息容错目标**。
  - 有了GroupName，在集群下，动态扩展容量很方便。只需要在新加的机器中，**配置相同的GroupName。启动后，就立即能加入到所在的群组中，参与消息生产或消费。**

  ```java
  DefaultMQProducer producer = new DefaultMQProducer("group_name_1"); //使用GroupName来初始化Producer
  DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("group_name_1"); //使用GroupName来初始化Consumer
  ```

## 消息发送

### 发送同步消息

- 这种可靠性同步地发送方式使用的比较广泛，比如：重要的消息通知，短信通知

- 消息可靠，有是否成功的应答

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



### 发送异步消息

- 用在对响应时间敏感的业务场景，即发送端不能容忍长时间地等待Broker的响应
- 消息可靠，有是否成功的应答

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



### 单向发送消息

- 用在不特别关心发送结果的场景，例如日志发送
- 消息不可靠，发送的方法没有结果

```java
// 传入组名实例化消息生产者Producer
DefaultMQProducer producer = new DefaultMQProducer("please_rename_unique_group_name");
// 设置NameServer的地址
producer.setNamesrvAddr("namesrvAddr");
// 启动Producer实例
producer.start();
// 创建消息，并指定Topic，Tag和消息体
Message msg = new Message("TopicTest" /* Topic */,
                          "TagA" /* Tag */,
                   ("Hello RocketMQ " + i).getBytes(RemotingHelper.DEFAULT_CHARSET) /* Message body */);
// 发送单向消息，没有任何返回结果
producer.sendOneway(msg);
// 如果不再发送消息，关闭Producer实例。
producer.shutdown();
```



## 消费方式

### push方式

- 由消息中间件（MQ消息服务器代理）主动地将消息推送给消费者；采用Push方式，可以尽可能实时地将消息发送给消费者进行消费。

- **缺点**：在消费者的处理消息的能力较弱的时候(比如，消费者端的业务系统处理一条消息的流程比较复杂，其中的调用链路比较多导致消费时间比较久。概括起来地说就是**“慢消费问题”**)，而MQ不断地向消费者Push消息，消费者端的缓冲区可能会溢出，导致异常

```java
// 传入组名实例化消费者
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("please_rename_unique_group_name");
// 设置NameServer的地址
consumer.setNamesrvAddr("namesrvAddr");
/**
 * 设置Consumer第一次启动是从队列头部开始消费还是队列尾部开始消费<br>
 * 如果非第一次启动，那么按照上次消费的位置继续消费
 */
consumer.setConsumeFromWhere(ConsumeFromWhere.CONSUME_FROM_FIRST_OFFSET);
// 订阅一个或者多个Topic，以及Tag来过滤需要消费的消息
// *代表所有Tag，订阅多个Tag使用||来分割
consumer.subscribe("TopicTest", "*"/*"TagA || TagC || TagD"*/);
// 注册回调实现类来处理从broker拉取回来的消息
consumer.registerMessageListener(new MessageListenerConcurrently() {
  @Override
  public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
    // 消费消息的逻辑
    // ConsumeConcurrentlyStatus.CONSUME_SUCCESS：标记该消息已经被成功消费
    // ConsumeConcurrentlyStatus.RECONSUME_LATER：标记该消息暂时无法消费成功，等待再消费
    return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
  }
});
// 启动消费者实例
consumer.start();
```



### pull方式(4.8.0版本已过时)

由消费者主动向消息中间件（MQ消息服务器代理）拉取消息；采用Pull方式，**如何设置Pull消息的频率需要重点去考虑**，举个例子来说，可能1分钟内连续来了1000条消息，然后2小时内没有新消息产生（概括起来说就是**“消息延迟与忙等待”**）。

**缺点**：如果每次Pull的时间间隔比较久，会增加消息的延迟，即消息到达消费者的时间加长，MQ中消息的堆积量变大；若每次Pull的时间间隔较短，但是在一段时间内MQ中并没有任何消息可以消费，那么会产生很多无效的Pull请求的RPC开销，影响MQ整体的网络性能

## 顺序消息

## 延时消息

## 批量消息

## 过滤消息

## 消息事务

事务消息不支持延时消息和批量消息

事务性消息可能不止一次被检查或消费。

