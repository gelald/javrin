## RabbitMQ的本质

消息队列可以把不同通信协议的软件集成在一起，解决了通信问题。

工作：存储、转发消息



使用消息队列的原因：

- 异步

  ```
  传统的点对点通信方式中，请求方发送请求后，在接收方响应结果之前需要一直处于等待状态。这是一个同步阻塞的过程。缺点：处理的数据量大时请求方需要一直处于等待状态
  ```

- 解耦

  ```
  不需要配置下游消费系统的IP地址和端口，只需要配置MQ服务器的地址；这样上游系统和下游系统的强依赖关系就被解除了。因为可以自己生产消息，自己消费消息，所以可以实现内部模块的解耦和各个系统之间的解耦
  ```

  ![image-20200624155924931](https://gitee.com/ngyb/pic/raw/master/007S8ZIlgy1gg3fqvimd9j317o0ls7cg.jpg)解耦前，串行状态

  ![image-20200624160008794](https://gitee.com/ngyb/pic/raw/master/007S8ZIlgy1gg3frlu6c5j31ci0f8dnq.jpg)

  解耦后，并行状态

- 削峰（限流）

  ```
  常见的电商系统中，会存在流量的瞬间的峰值，后台的并发能力是有限的
  ```

  

消息队列的一个特点：发布（publish）-订阅（subscribe）。可以实现广播的特性（一对多的通信）



RabbitMQ工作模型：如何收发消息？

通信规范：

JDBC（Java Database Connectivity）：在J2EE的规范中用同一种操作方法去操作所有的数据库（不同的数据库厂商必须实现相同的接口）

JMS（Java Message Service）：用一种规范去操作所有Message Queue，最终没有实现，原因：不能实现真正的跨平台、跨语言、跨协议

AMQP（Advance Message Queue Protocol）：高级的消息队列协议

RabbitMQ就是实现了AMQP的规范



## RabbitMQ的工作模型

![image-20200624170325192](https://gitee.com/ngyb/pic/raw/master/007S8ZIlgy1gg3hlfyhhxj31sa0jsauz.jpg)

- RabbitMQ服务器：Broker，工作：存储消息、转发消息
- 生产者：Producer，工作：生产消息
- 消费者：Consumer，工作：消费消息
- 与MQ建立连接：在保持的TCP长连接中，创建和释放虚拟的连接——Channel（信道）
- 生产者的消息会发到broker中的Queue（队列）中去
- 消费者通过监听的机制获取事件
- Exchange交换机，**实现消息灵活的路由**，是RabbitMQ中一个独特的设计
  - 消息会携带一个特殊的标识，到达交换机后，交换机只能把消息分配到跟它**绑定**的队列。如果一个队列要从交换机拿到消息，那么需要和交换机绑定起来
  - 交换机的本质：地址清单。保存了哪些队列和它保存的关系
  - 根据标识去查找所有绑定的队列，哪一些是符合规则的，就把消息路由到队列中
- 为了解决硬件资源利用率的问题，引入了VHost虚拟机，这样就可以在一个主机上面创建多个VHost虚拟主机



## 交换机种类

- direct 直连。绑定时需要制定binding key，路由消息的时候匹配路由键和绑定键

  ![image-20200624221113063](https://gitee.com/ngyb/pic/raw/master/007S8ZIlgy1gg3qhpqmanj31ic0nwawk.jpg)

- topic 主题。**绑定键可以使用通配符**，*：1个单词，#：0个或多个单词。单词：由"."隔开的字符串。**如果一个消息同时符合多个主题，那么匹配的队列都会收到这个相同的消息的副本**

  ![image-20200624222454887](https://gitee.com/ngyb/pic/raw/master/007S8ZIlgy1gg3qvyhleij31la0o24j9.jpg)

- fanout 广播。不需要使用任何绑定键， 任何发送的消息到达交换机，把消息的相同副本分发给所有跟它绑定的队列

  ![image-20200624222926702](https://gitee.com/ngyb/pic/raw/master/007S8ZIlgy1gg3r0nqo8xj31ne0jqql5.jpg)

- 使用场景

  - 一个系统特殊地关注另一个系统（业务主题是明确的），使用直连交换机
  - 不同的业务系统关注不同的业务主题、基于不同的系统环境（某些消息只希望在开发/生产环境中收到），使用主题交换机
  - 通用的消息，所有业务系统都关注的，使用广播交换机



## SpringBoot整合RabbitMQ

- 配置类：创建交换机、创建队列、创建绑定关系（制定绑定键）
- 消费者：监听类（监听消息队列），最好一个消费者监听一个队列，因为要区分数据
- 生产者：调用template发送消息（Exchange）
- 服务器信息配置

