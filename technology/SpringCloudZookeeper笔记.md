微服务是分布式的架构

分布式：一个整体的应用分布在不同的网络的节点上或不同的计算机上，每一个节点需要远程通信

重点：服务之间的通信

基于Http协议的简单远程调用，RestTemplate

```java
public class HelloController {
  
  @Bean
  public RestTemplate restTemplate(RestTemplateBuilder restTemplateBuilder) {
    return restTemplateBuilder.build();
  }
  
  @Autowired
  private RestTemplate restTemplate;
  
  @GetMapping("/hello")
  public Object hello() {
    return this.restTemplate.getForObject("url", String.class);//url、返回值类型
  }
}
```

这里的url暂时是写死的，如果服务做了集群这种做法就不恰当了，因为需要替换ip，所以需要使用到服务注册和发现的知识



服务注册中心

1. 服务地址的统一管理问题

   管理服务提供者的所有url地址；当每一个服务启动时，把url注册到第三方组件上

   **消费者无需注册**

2. 动态感知（服务器上线（扩容）、下线（宕机））

   途径：心跳HeartBeat，定时发送数据量很小的socket数据包，在某一个心跳超时时间内没有发送心跳数据包，可以认为服务已下线
   
3. 通知客户端

   1. schedule pull 客户端定时轮询，服务注册中心看看服务提供者是否正常。条件：**定时拉取的任务**，缺陷：任务之间有间隔时间，**需要考察合适的间隔时间**，时间过长，数据有可能出现错误；时间过短，需要消耗客户端的线程资源去轮询。
   2. push 服务注册中心主动推送服务提供者的状态改变。条件：和客户端（服务消费者）建立连接，这个连接需要一直处于激活的状态，这里就涉及到**会话的维护**，缺陷：**如果说服务注册中心要和大量的服务消费者会话维持，需要维护大量的会话管理，对注册中心的性能有一定的消耗**
   3. **long pull 客户端长轮询（Nacos的实现）**，客户端发起请求后，在一段时间之内，如果服务端没有数据变化，那么服务端会先挂起这个请求，知道服务端发生变化后再推送数据。结合了客户端的pull和服务端的push
   4. Zookeeper的做法：客户端需要告诉服务注册中心，订阅某个服务的变化通知，服务端推送客户端

Zookeeper存储结构

![image-20200623162709638](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg2axfnzi5j317k0jetca.jpg)

spring-cloud-product下面的是商品服务的集群；同一个服务名，但是有多个节点

持久化节点：节点创建之后，需要手动删除

临时节点：节点创建之后，和当前创建的会话的生命周期保持一致，会话关闭，节点删除。使用临时节点是因为，服务宕机后，zookeeper要去删除掉这个节点，随之通知服务消费者



关注其他组件

功能是一致的，所以需要重点关注特性