# 消息队列基本概念

## 为什么使用消息队列

- 解耦
  - 传统：系统间直接耦合，每接入一个系统，都需要修改代码
  
    ![img](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1ggzlaeqd1qj30fl0a7wf7.jpg)
  
  - 中间件：将消息写入消息队列，需要消息的系统自己从消息队列中订阅，从而系统A不需要做任何修改
  
    ![img](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1ggzlang3m1j30dl0a7t9a.jpg)
  
- 异步
  - 传统：一些非必要的业务逻辑以同步的方式运行，比较耗费时间
  
    ![img](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1ggzlcld8bfj30i408bwev.jpg)
  
  - 中间件：将消息写入消息队列，非必要的业务逻辑以异步的方式运行，加快响应速度
  
    ![img](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1ggzlcs8ebdj30hp09fwf3.jpg)
  
- 削峰
  - 传统：并发量大的时候，所有的请求直接怼到数据库，造成数据库连接异常
  
    ![img](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1ggzldnsbj9j30e90dwaao.jpg)
  
  - 中间件：系统A慢慢的按照数据库能处理的并发量，从消息队列中慢慢拉取消息。在生产中，这个短暂的高峰期积压是允许的
  
    ![img](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1ggzldxkusnj30if0dwgme.jpg)

## 使用了消息队列会有什么缺点

- 从系统的可用性来看：加入了消息队列，就需要维护好消息队列服务，否则消息队列服务宕机，整个系统也就瘫痪
- 从系统的复杂度来看：需要考虑一致性问题、如何保证消息不被重复消费，如何保证保证消息可靠传输等一系列问题，因此，需要考虑的东西更多，系统复杂性增大。
- 但还是要用

## 如何保证消息队列是高可用的

- 不要使用单机模式的消息队列
- 了解各消息队列的集群模式

## 什么情况下的异步操作需要使用消息队列而不是多线程

- 消息队列和多线程两者并不冲突，多线程可以作为队列的生产者和消费者。在使用外部的消息队列时，可以提高应用的稳定性，当程序宕机后，已经写入外部消息队列的数据依旧是保存的
- 用线程的话，会占用主服务器资源；消息队列的话，可以放到其他机器上运行，让主服务器更纯粹地处理请求。如果用户不急着知道结果的操作，可以用消息队列，否则再考虑多线程
- 消息队列是在架构层面解决问题；多线程是在编程语言层面解决问题。消息队列解耦更充分，架构更合理


# 组件篇

## ActiveMQ

## RabbitMQ

## RocketMQ

## Kafka

