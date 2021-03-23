### 核心组件

- nameserver：无状态的注册中心，功能用来保存broker的相关的元信息并提供给producer在发送消息过程中和提供给consumer消费消息过程中查找broker信息
- broker：消息存储中心，用来存储消息并通过nameserver对外提供服务
- producer：消息生产者，通过nameserver获取broker的地址并发送消息
- customer：消息消费者，通过nameserver获取broker的地址并消费消息

### 相关概念

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

### 消费方式

#### push方式

由消息中间件（MQ消息服务器代理）主动地将消息推送给消费者；采用Push方式，可以尽可能实时地将消息发送给消费者进行消费。

**缺点**：在消费者的处理消息的能力较弱的时候(比如，消费者端的业务系统处理一条消息的流程比较复杂，其中的调用链路比较多导致消费时间比较久。概括起来地说就是**“慢消费问题”**)，而MQ不断地向消费者Push消息，消费者端的缓冲区可能会溢出，导致异常

#### pull方式

由消费者主动向消息中间件（MQ消息服务器代理）拉取消息；采用Pull方式，**如何设置Pull消息的频率需要重点去考虑**，举个例子来说，可能1分钟内连续来了1000条消息，然后2小时内没有新消息产生（概括起来说就是**“消息延迟与忙等待”**）。

**缺点**：如果每次Pull的时间间隔比较久，会增加消息的延迟，即消息到达消费者的时间加长，MQ中消息的堆积量变大；若每次Pull的时间间隔较短，但是在一段时间内MQ中并没有任何消息可以消费，那么会产生很多无效的Pull请求的RPC开销，影响MQ整体的网络性能