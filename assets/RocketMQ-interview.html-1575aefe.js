import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as r,c as a,e as o}from"./app-859571d0.js";const i={},c=o('<h1 id="rocketmq-面试题" tabindex="-1"><a class="header-anchor" href="#rocketmq-面试题" aria-hidden="true">#</a> RocketMQ 面试题</h1><h2 id="为什么使用消息队列" tabindex="-1"><a class="header-anchor" href="#为什么使用消息队列" aria-hidden="true">#</a> 为什么使用消息队列</h2><p>使用消息队列主要有三个作用</p><ul><li><p>解耦</p><p>例如电商系统中客户完成下单，此时订单系统完成自己的业务后可能还需要调用其他服务，如库存服务修改库存等，在引入消息队列前，可能这两个系统是耦合的，引入消息队列后，订单服务只需要把订单下单的消息放入消息队列中，下游的所有服务就根据消息去调用自己的业务即可，使得一个业务上的各服务互相解耦</p></li><li><p>异步</p><p>当订单完成支付后，后续还有一系列的操作，比如扣除库存、发送消息等，显然这个操作链路太长了，会导致响应时间变长，引入消息队列后，订单服务只需要把消息放到消息队列中即可响应，其他操作可以异步去做，使得响应时间缩短</p></li><li><p>削峰</p><p>业务往往存在高峰、低谷，当处于业务高峰时，可能我们的服务器、MySQL 等各自的承受能力都不一样，如果全都照单全收，有可能大量请求导致宕机，引入消息队列后，我们可以把请求都放到消息队列中，只放出能处理的流量，这样就能扛住短时间的大流量</p></li></ul><h2 id="消息队列有哪些模型" tabindex="-1"><a class="header-anchor" href="#消息队列有哪些模型" aria-hidden="true">#</a> 消息队列有哪些模型</h2><p>消息队列一共有两种模型：队列模型和发布/订阅模型</p><ul><li><p>队列模式</p><p>生产者往某个队列中发送消息，一个队列可以存储多个生产者的消息，一个队列也可以对应多个消费者，但是这些消费者是竞争关系，每条消息只能被一个消费者消费</p></li><li><p>发布/订阅模型</p><p>和队列模式最大的不同是，如果一个消息的主题被多个消费者同时订阅了，那么这些消费者都能收到这些消息的副本，不再是多个消费者竞争一个消息</p></li></ul><p>RocketMQ 通过使用给一个 Topic 配置多个队列，并且每个队列维护每个消费者组的消费位置，实现了发布/订阅模型</p><h2 id="消费者有哪些消费模式" tabindex="-1"><a class="header-anchor" href="#消费者有哪些消费模式" aria-hidden="true">#</a> 消费者有哪些消费模式</h2><p>消费者一共有两种消费模式：集群消费和广播消费</p><ul><li>集群消费：一个消费者组共同消费同一个主题的多个消息，但是一个具体的消息只会被一个消费者组内的一个消费者消费</li><li>广播消费：同一个主题的多个消息会被一个消费者组内所有的每一个消费者消费</li></ul><h2 id="为什么选择-rocketmq" tabindex="-1"><a class="header-anchor" href="#为什么选择-rocketmq" aria-hidden="true">#</a> 为什么选择 RocketMQ</h2><p>RocketMQ 经历了多次双十一洪峰的考验，事实证明是值得信赖的，他具有低延时、可靠性、支持事务等特点，非常适合我们的业务</p><h2 id="rocketmq-的基本架构" tabindex="-1"><a class="header-anchor" href="#rocketmq-的基本架构" aria-hidden="true">#</a> RocketMQ 的基本架构</h2><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220617221818.png" alt=""></p><p>RocketMQ 的基本架构由四部分组成：</p><ul><li>NameServer ：可以理解为是一个注册中心，支持 Broker 的动态注册与发现，提供给 Producer / Consumer 查找 Broker 信息，从而进行消息的发送/消费</li><li>Broker ：主要负责消息的存储、投递和查询以及服务高可用保证，RocketMQ 中的核心组件</li><li>Producer ：消息生产者</li><li>Customer ：消息消费者，支持 push、pull 两种模式对消息进行消费，同时也支持集群方式和广播方式的消费</li></ul><h2 id="rocketmq-中-broker、topic、队列之间的关系" tabindex="-1"><a class="header-anchor" href="#rocketmq-中-broker、topic、队列之间的关系" aria-hidden="true">#</a> RocketMQ 中 Broker、Topic、队列之间的关系</h2><p>Broker 和 Topic 是多对多关系，因为一个 Broker 上可以有多个 Topic，而一个 Topic 可以分片在多个 Broker 上，因为如果某一个 Topic 的消息量很大，这样做可以减轻一个 Broker 的压力</p><p>Topic 和 Queue 是一对多关系，因为可以提高并发能力</p><p>三者关系如下图</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220622230810.png" alt=""></p><h2 id="rocketmq-怎么保证顺序消费消息" tabindex="-1"><a class="header-anchor" href="#rocketmq-怎么保证顺序消费消息" aria-hidden="true">#</a> RocketMQ 怎么保证顺序消费消息</h2><p>RocketMQ 中保证顺序消费消息有两种：分区有序、全局有序</p><ul><li><p>分区有序</p><p>消费者通过同一个消费队列收到的消息是有顺序的，不同消息队列收到的消息则可能是无顺序的</p><p>生产者发送消息时会轮询同一个 Topic 下的所有队列来发送消息达到负载均衡的目的，如果此时有三个消息：下单、付款、发货消息，按照默认的轮训策略，它们会发送到不同的队列中，那最终三个消息的消费顺序是无法保证的</p><p>解决方案：对来自同一个订单的消息使用 Hash 取模的方式来保证同一个订单的相关消息都使用同一个队列</p></li><li><p>全局有序</p><p>全局有序是保证消息的传递只使用一个队列，这样能保证顺序，但是会导致并发能力大幅下降，一般不推荐使用</p></li></ul><h2 id="rocketmq-怎么实现分布式事务" tabindex="-1"><a class="header-anchor" href="#rocketmq-怎么实现分布式事务" aria-hidden="true">#</a> RocketMQ 怎么实现分布式事务</h2><p>事务是指一组包含多个步骤的业务操作，这些操作要么同时成功，要么同时失败。我们可以在同一个系统很轻松地实现事务，在分布式环境中，实现事务需要其他额外的手段，比如 2PC、TCC、事务消息。而RocketMQ 中的事务消息及事务回查机制可以很好地帮助我们实现分布式事务</p><p>RocketMQ 实现分布式事务流程</p><ol><li>生产者先向 Broker 发送一条 Half 消息，这条消息除了暂时无法被消费者消费外，和普通消息差异不大</li><li>Broker 会针对这个 Half 消息对生产者进行响应，生产者收到响应后会执行 <code>executeLocalTransaction</code> 方法执行本地事务</li><li>如果生产者执行本地事务成功，那么会对一开始的 Half 消息进行二次确认，发送 Commit 请求，Broker 收到 Commit 请求后，这条消息就会被消费者消费</li><li>如果生产者执行本地事务失败，也会对 Half 消息进行二次确认，不过发送的是 Rollback 请求，Broker 收到 Rollback 请求后，这条 Half 消息就会被删除</li><li>如果生产者提交本地事务的状态为 Unknown 或者由于一些原因如生产者宕机、网络波动等，导致二次确认的消息无法发到 Broker 中，Broker 也有对应的事务回查机制，回调 <code>checkLocalTransaction</code> 方法回查本地事务在生产者中的执行情况，再决定这个消息的状态</li></ol><h2 id="rocketmq-怎么实现延时消息" tabindex="-1"><a class="header-anchor" href="#rocketmq-怎么实现延时消息" aria-hidden="true">#</a> RocketMQ 怎么实现延时消息</h2><h2 id="rocketmq-怎么保证消息可靠性-不丢失" tabindex="-1"><a class="header-anchor" href="#rocketmq-怎么保证消息可靠性-不丢失" aria-hidden="true">#</a> RocketMQ 怎么保证消息可靠性/不丢失</h2><h2 id="rocketmq-怎么处理消息重复" tabindex="-1"><a class="header-anchor" href="#rocketmq-怎么处理消息重复" aria-hidden="true">#</a> RocketMQ 怎么处理消息重复</h2><h2 id="rocketmq-怎么处理消息堆积" tabindex="-1"><a class="header-anchor" href="#rocketmq-怎么处理消息堆积" aria-hidden="true">#</a> RocketMQ 怎么处理消息堆积</h2><h2 id="rocketmq-怎么保证高可用" tabindex="-1"><a class="header-anchor" href="#rocketmq-怎么保证高可用" aria-hidden="true">#</a> RocketMQ 怎么保证高可用</h2><ul><li>Broker 集群：Broker 集群是一个主从结构的集群，由于消息分布在各个 Broker 上，一旦某个 Broker 宕机，则该 Broker 上的消息读写都会受到影响。所以 RocketMQ 提供了 master/slave 的结构，salve 定时从 master 同步数据（同步刷盘或者异步刷盘），如果 master 宕机，则 slave 提供消费服务，但是不能写入消息。生产者从 NameServer 中获取 Broker 的路由信息后，通过轮询向 Topic 下的所有队列中发送消息达到负载均衡的目的</li><li>NameServer 集群：实际上 NameServer 的集群是一个伪集群，它们之间不会进行数据同步，是所有 Broker 和所有 NameServer 保持长连接，每隔一定时间就会向所有 NameServer 发送心跳包，包括自己的 Topic 配置</li><li>Producer 集群：没有什么特别，集群部署为了提高可用性</li><li>Consumer 集群：主要的目的是为了水平扩展消费者组，增加消费者组中消费者的数量，当 Topic 对应的队列的数量大于消费者的数量，这种方式可以有助于提高消费速度</li></ul>',35),t=[c];function l(h,d){return r(),a("div",null,t)}const k=e(i,[["render",l],["__file","RocketMQ-interview.html.vue"]]);export{k as default};