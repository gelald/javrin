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
- **Channel**：消息通道，在客户端的连接里可以建立多个Channel，每个Channel代表一个会话任务。在保持的TCP长连接中，创建和释放虚拟的连接



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

它会把消息的相同副本**投放到所有**和`fanout`交换机绑定的队列上

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210914102759.png)

### direct

只有路由键**完全匹配**，消息才会投放到响应的队列上

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210914102828.png)

### topic

提供路由键的**模糊匹配**功能，如果同时多个队列匹配了这个消息，则会投送消息的相同副本到队列上

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210914102850.png)

### header

工作模式和`topic`交换机类似，但是是**匹配AMQP消息的header**而非路由键，并且**性能较差**，一般不用

### 交换机类型选择场景

- **通用的消息**，所有业务系统都关注的，使用`fanout`交换机
- 一个系统特殊地关注另一个系统（**业务主题是明确的**），使用`direct`交换机
- 不同的业务系统关注不同的业务主题、基于不同的系统环境（某些消息只希望在开发/生产环境中收到），使用`topic`交换机



## SpringBoot整合RabbitMQ

- 配置类：创建交换机、创建队列、创建绑定关系（制定绑定键）
- 消费者：监听类（监听消息队列），最好一个消费者监听一个队列，因为要区分数据
- 生产者：调用template发送消息（Exchange）
- 服务器信息配置



## RabbitMQ面试题

