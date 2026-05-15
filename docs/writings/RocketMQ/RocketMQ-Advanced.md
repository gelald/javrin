---
title: RocketMQ 进阶
icon: article
category:

- 干货
- 消息队列

tag:

- 进阶
- RocketMQ

---

# RocketMQ 进阶

> 本篇为 RocketMQ 笔记的进阶补充，覆盖面试高频题精炼回答、生产级实践、DLedger 自动主从切换、RocketMQ 5.x 新特性，以及完整项目场景串联。
>
> 基础篇：[RocketMQ 入门](./RocketMQ-start.md) | 原理篇：[原理分析-1](./RocketMQ-theory-1.md) [原理分析-2](./RocketMQ-theory-2.md) | 实战篇：[rocketmq-client](./RocketMQ-operation-client.md) [rocketmq-starter](./RocketMQ-operation-starter.md) | 面试篇：[RocketMQ 面试题](./RocketMQ-interview.md)

## 面试题精炼回答

> 以下四道题是面试最高频的 RocketMQ 问题，回答思路均为：**先说结论，再分点展开，最后总结**。每题控制在 2 分钟口述时间内。

### RocketMQ 怎么保证消息可靠性 / 不丢失

消息在 RocketMQ 中流转分为三个阶段：**发送阶段、存储阶段、消费阶段**，需要分别在三个阶段保证可靠性。

- **发送阶段**：使用同步发送 + 重试机制。`producer.send()` 默认重试 2 次（共 3 次），同时可以设置 `sendMsgTimeout`（默认 3000ms）避免超时误判。对于关键消息，可以捕获异常后写入本地存储做二次补偿。
- **存储阶段**：Broker 端使用同步刷盘（`flushDiskType=SYNC_FLUSH`）确保消息写入磁盘后再返回 ACK。集群部署时配合同步复制（`brokerRole=SYNC_MASTER`），确保 master 宕机后 slave 上有完整数据。
- **消费阶段**：消费端采用手动确认机制，业务处理成功后才返回 `CONSUME_SUCCESS`；消费失败返回 `RECONSUME_LATER`，Broker 会重新投递。如果多次重试失败，消息进入死信队列，由人工或定时任务介入处理。

> **一句话总结**：发送端同步发送 + 重试，Broker 端同步刷盘 + 同步复制，消费端手动确认 + 死信兜底，三阶段合力保证消息不丢。

### RocketMQ 怎么处理消息重复

RocketMQ 的设计原则是**保证消息不丢失，但不保证不重复**。消息重复的根本原因是网络波动导致的重试，需要在**业务端自行保证幂等**。常用方案：

- **业务幂等**：消费逻辑本身设计成多次执行结果一致，比如更新操作使用 `UPDATE SET status = 'PAID' WHERE order_id = ? AND status = 'UNPAID'`，利用数据库乐观锁天然幂等。
- **去重表**：生产者发送时为每条消息设置唯一业务 ID（如订单号），消费端建立消费记录表，对业务 ID 做唯一约束。消费前先查去重表，已存在则跳过。

```java
// 利用数据库唯一约束实现幂等
try {
    // 插入消费记录，order_id 为唯一索引
    consumeRecordMapper.insert(new ConsumeRecord(orderId, "CONSUMED"));
    // 插入成功，执行业务逻辑
    processOrder(orderId);
} catch (DuplicateKeyException e) {
    // 唯一约束冲突，说明已经消费过，直接跳过
    log.info("消息已消费，跳过。orderId: {}", orderId);
}
```

> **一句话总结**：RocketMQ 不保证不重复，业务端通过数据库唯一约束或乐观锁保证幂等。

### RocketMQ 怎么处理消息堆积

消息堆积的核心原因是**消费速度跟不上生产速度**，处理思路是**先止损再治理**。

- **紧急止损**：先定位堆积原因。如果是消费者异常（如下游 DB 慢查询），先修复消费者；如果是流量突增，评估是否需要临时扩容。
- **情况一：Queue 数量 > 消费者数量** → 直接**扩容消费者**，让消费者数量与 Queue 数量一致，充分利用 Queue 的并行能力。

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220909153107.png)

- **情况二：Queue 数量 ≤ 消费者数量，堆积仍然严重** → 需要**Queue 扩容 + 消息迁移**。具体做法：新建一个临时 Topic（配置更多 Queue），修改现有消费者逻辑，将堆积的消息转发到临时 Topic，再用对应数量的消费者并行消费。

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220909155342.png)

- **事后治理**：增加消费者线程数（`consumeThreadMax`）、开启批量消费（`consumeMessageBatchMaxSize`）、优化消费逻辑减少 IO。

> **一句话总结**：先止损，Queue 多就扩消费者，Queue 不够就迁移到更多 Queue 的临时 Topic 再并行消费。

### RocketMQ 怎么实现延时消息

延时消息是指消息发送到 Broker 后，不立即投递给消费者，而是延迟一段时间后再投递。

**实现原理**：

1. Broker 收到延时消息后，将 Topic 临时替换为系统 Topic `SCHEDULE_TOPIC_XXXX`，该 Topic 有 18 个队列，每个队列对应一个延时等级（`queueId = delayTimeLevel - 1`）。同时将原始 Topic 和队列信息保存到消息属性中。
2. `ScheduleMessageService` 启动 18 个定时任务（每个等级一个），定时消费 `SCHEDULE_TOPIC_XXXX` 中对应队列的消息。
3. 到达投递时间后，将消息的 Topic 还原为原始 Topic，重新写入 CommitLog。
4. 消息正常投递到目标队列，消费者消费。

**延时等级**：

```bash
messageDelayLevel = "1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h"
```

```java
// 使用延时等级发送延时消息（第 3 级 = 10s）
Message message = new Message("order-timeout-topic", "订单超时检查".getBytes(StandardCharsets.UTF_8));
message.setDelayTimeLevel(16); // 第 16 级 = 30 分钟
producer.send(message);
```

> **局限性**：社区版 RocketMQ 4.x 只支持固定延时等级，不支持任意时间延时。RocketMQ 5.x 已支持任意时间延时。
>
> **一句话总结**：Broker 把延时消息暂存到系统 Topic，按延时等级分队列，定时任务到时间后还原 Topic 并重新投递。

## 生产级实践

### 消息轨迹

消息轨迹是排查线上问题的关键能力，可以追踪一条消息从生产、存储到消费的完整链路。

**开启方式**（Broker 端配置）：

```properties
# 开启消息轨迹
traceTopicEnable=true
msgTraceTopicName=RMQ_SYS_TRACE_TOPIC
```

**开启方式**（客户端）：

```java
// 生产者开启轨迹
DefaultMQProducer producer = new DefaultMQProducer("producer-group", true);

// 消费者开启轨迹
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("consumer-group", true);
```

一条消息轨迹包含以下信息：

| 阶段 | 记录内容 |
|------|---------|
| 生产端 | 生产时间、发送结果、发送耗时 |
| 存储端 | 存储时间、CommitLog 偏移量、Broker 地址 |
| 消费端 | 拉取时间、消费时间、消费结果、重试次数 |

> 生产环境**强烈建议开启消息轨迹**，排查消息丢失、消费延迟等问题时可以快速定位是哪个环节出了问题。开启后对性能影响很小（约 2%~5%），但收益远大于代价。

### 监控告警

#### RocketMQ Dashboard

RocketMQ 提供了官方的管控台 [rocketmq-dashboard](https://github.com/apache/rocketmq-dashboard)，可以可视化管理集群。

核心功能：

- **集群概览**：查看 Broker 状态、Topic 列表、消费者组列表
- **消息查询**：按 Topic / Key / 时间范围查询消息，配合消息轨迹可以看到完整链路
- **消费进度**：查看每个消费者组的消费延迟（Diff），及时发现堆积
- **消息重发 / 重置消费位点**：运维操作

#### 关键监控指标

| 指标 | 含义 | 告警建议 |
|------|------|---------|
| 消费延迟（Diff） | 每个队列中未消费的消息数量 | Diff > 10000 触发告警 |
| 发送 TPS | 每秒消息发送量 | 突然下跌可能说明 Producer 异常 |
| 消费 TPS | 每秒消息消费量 | 持续低于发送 TPS 说明消费能力不足 |
| Broker 磁盘使用率 | 磁盘空间占比 | > 75% 开始告警（默认阈值） |
| 发送失败率 | 发送失败数 / 总发送数 | > 1% 触发告警 |
| 消费者在线数 | 消费者组中存活的消费者数量 | 少于预期数量时告警 |

### 性能调优

性能调优需要从 Producer、Consumer、Broker 三个维度综合考虑。

#### Producer 调优

| 参数 | 默认值 | 建议值 | 说明 |
|------|--------|--------|------|
| `maxMessageSize` | 4MB | 按需调整 | 单条消息最大大小 |
| `retryTimesWhenSendFailed` | 2 | 2~3 | 同步发送失败重试次数 |
| `retryTimesWhenSendAsyncFailed` | 2 | 2~3 | 异步发送失败重试次数 |
| `sendMsgTimeout` | 3000ms | 3000~5000ms | 发送超时时间，网络不稳定可适当调大 |
| `compressMsgBodyOverHowmuch` | 4096 | 4096 | 消息体超过此值自动压缩 |
| `defaultTopicQueueNums` | 4 | 按并发需求调整 | 自动创建 Topic 时的默认队列数 |

> **发送方式选择**：日志类场景用单向发送（Oneway），普通业务用同步发送，对响应时间敏感用异步发送。不要所有场景都用同步发送。

#### Consumer 调优

| 参数 | 默认值 | 建议值 | 说明 |
|------|--------|--------|------|
| `consumeThreadMin` | 20 | 按业务调整 | 消费线程池最小线程数 |
| `consumeThreadMax` | 20 | 按业务调整 | 消费线程池最大线程数 |
| `pullBatchSize` | 32 | 32~128 | 每次拉取消息的最大数量 |
| `consumeMessageBatchMaxSize` | 1 | 1~16 | 每次消费消息的最大数量（批量消费） |
| `pullInterval` | 0 | 0 | 拉取间隔，流控场景可调大 |
| `consumeTimeout` | 15min | 15min | 消费超时时间 |

> **消费线程调优经验**：如果消费逻辑是 IO 密集型（如写 DB、调用 RPC），可以调大 `consumeThreadMax` 到 50~100；如果是 CPU 密集型，保持默认即可，避免线程切换开销。

#### Broker 调优

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `flushDiskType` | ASYNC_FLUSH | 可靠性优先用 SYNC_FLUSH，性能优先用 ASYNC_FLUSH |
| `brokerRole` | ASYNC_MASTER | 可靠性优先用 SYNC_MASTER |
| `sendMessageThreadPoolNums` | 128 | Broker 处理发送请求的线程池大小 |
| `pullMessageThreadPoolNums` | 128 | Broker 处理拉取请求的线程池大小 |
| `mapedFileSizeCommitLog` | 1G | CommitLog 单文件大小，不建议修改 |
| `osPageCacheBusyTimeOutMills` | 1000ms | page cache 忙碌超时时间 |

> **生产环境推荐组合**：多 master 多 slave + 同步复制（`SYNC_MASTER`）+ 异步刷盘（`ASYNC_FLUSH`）。同步复制保证数据不丢，异步刷盘保证吞吐量。因为网络复制的耗时远小于磁盘刷盘，这个组合在可靠性和性能之间取得了较好的平衡。

## DLedger 自动主从切换

### 为什么需要自动主从切换

在 RocketMQ 4.x 的 master/slave 架构中，**master 宕机后无法自动切换**：

- slave 可以继续提供消费服务，但**不能写入消息**
- 需要**人工介入**将 slave 提升为 master，期间写入服务中断
- 如果是凌晨或节假日，恢复时间不可控

### DLedger 是什么

DLedger 是 RocketMQ 4.5 引入的组件，基于 **Raft 协议**实现自动选主：

- 多个 Broker 组成一个 Raft Group
- 自动选举 Leader（对应 master）和 Follower（对应 slave）
- Leader 宕机后，Follower 在秒级内自动选出新 Leader
- 数据复制基于 Raft 协议，保证多数节点写入成功即视为提交

```
Raft Group (3 节点)
┌──────────┐     ┌──────────┐     ┌──────────┐
│  Leader   │────▶│Follower 1│     │Follower 2│
│ (Master)  │     │ (Slave)  │     │ (Slave)  │
└──────────┘     └──────────┘     └──────────┘
     │                ▲                 ▲
     └─── Raft Log Replication ─────────┘
```

### DLedger 集群部署要点

```properties
# broker.conf (DLedger 模式)
enableDLegerGroup=true
dLegerGroup=group-a
dLegerPeers=n0@broker-a:10911;n1@broker-b:10911;n2@broker-c:10911
dLegerSelfId=n0
```

| 配置项 | 说明 |
|--------|------|
| `enableDLegerGroup` | 开启 DLedger 模式 |
| `dLegerGroup` | Raft Group 名称，同组节点一致 |
| `dLegerPeers` | 组内所有节点的地址列表 |
| `dLegerSelfId` | 当前节点在组内的 ID |

> **DLedger 的代价**：写入需要多数节点确认，相比异步复制会**增加约 20%~30% 的写入延迟**。建议对写入延迟敏感度不高的核心业务使用。

## RocketMQ 5.x 新特性

> RocketMQ 5.x 是一次架构层面的重大升级，目标是**简化客户端、统一 API、支持多语言**。

### 5.x 架构变化

```
RocketMQ 4.x                          RocketMQ 5.x
┌────────────┐                        ┌────────────┐
│  Producer   │                        │  Producer   │
└─────┬──────┘                        └─────┬──────┘
      │ Remoting (TCP)                      │ gRPC (HTTP/2)
      ▼                                     ▼
┌────────────┐                        ┌────────────┐
│   Broker   │                        │   Proxy    │ ← 新增
└─────┬──────┘                        └─────┬──────┘
      │                                     │ Remoting (TCP)
      │                                     ▼
┌────────────┐                        ┌────────────┐
│ NameServer │                        │   Broker   │
└────────────┘                        └─────┬──────┘
                                            │
                                            ▼
                                      ┌────────────┐
                                      │ NameServer │
                                      └────────────┘
```

### 核心变化

#### 1. Proxy 模式

5.x 引入了 **Proxy** 层，作为客户端和 Broker 之间的代理：

- **Local 模式**：Proxy 和 Broker 部署在同一进程，适合小规模部署
- **Cluster 模式**：Proxy 独立部署，无状态，可以水平扩展，适合大规模集群

Proxy 的好处：

- 客户端不再直连 Broker，由 Proxy 做路由和负载均衡
- 支持多语言 SDK（通过 gRPC 协议），不再局限于 Java 和 C++
- Proxy 可以做协议转换，同时支持 gRPC（5.x）和 Remoting（4.x）客户端

#### 2. SimpleConsumer & Pop 消费模式

5.x 新增了 `SimpleConsumer`，配合 **Pop 消费模式**：

```java
// 5.x 新的消费者 API
ClientServiceProvider provider = ClientServiceProvider.loadService();
SimpleConsumer consumer = provider.newSimpleConsumerBuilder()
    .setClientConfiguration(new ClientConfiguration())
    .setConsumerGroup("consumer-group")
    .setSubscriptionExpressions(Collections.singletonMap(
        "topic-order", new FilterExpression(TagFilterExpression.SUB_ALL)
    ))
    .awaitStart();

// Pop 模式拉取消息
List<MessageView> messages = consumer.receive(10, Duration.ofSeconds(30));
for (MessageView message : messages) {
    try {
        process(message);
        consumer.ack(message);
    } catch (Exception e) {
        consumer.nack(message);
    }
}
```

Pop 模式 vs Pull 模式：

| 对比项 | Pull 模式（4.x） | Pop 模式（5.x） |
|--------|-----------------|----------------|
| 负载均衡 | 客户端 Rebalance | Broker 端分配 |
| Queue 绑定 | 一个 Queue 绑定一个消费者 | 一个 Queue 可被多个消费者 Pop |
| 消费者变更影响 | 需要重新 Rebalance，期间消费暂停 | 无需 Rebalance，平滑切换 |
| 适用场景 | 推送型、实时性要求高 | 弹性伸缩、Serverless 场景 |

> Pop 模式的核心优势：消费者上下线不需要 Rebalance，非常适合云原生弹性伸缩场景。

#### 3. 任意时间延时消息

5.x 支持任意时间延时，不再局限于 18 个固定等级：

```java
// 5.x 任意时间延时
Message message = provider.newMessageBuilder()
    .setTopic("order-timeout-topic")
    .setBody("订单超时检查".getBytes())
    .setDeliveryTimestamp(Instant.now().plus(Duration.ofMinutes(30)))
    .build();
```

### 4.x 与 5.x 兼容性

| 特性 | 4.x 客户端 → 5.x Broker | 5.x 客户端 → 4.x Broker |
|------|-------------------------|-------------------------|
| 基础收发 | ✅ 完全兼容 | ✅ 完全兼容 |
| 事务消息 | ✅ | ✅ |
| 延时消息 | ✅ 固定等级 | ❌ 需要 5.x Broker |
| SimpleConsumer | ❌ | ❌ 需要 5.x Proxy |
| Pop 模式 | ❌ | ❌ 需要 5.x Broker |

> **升级建议**：可以先升级 Broker 到 5.x（5.x Broker 兼容 4.x 客户端），客户端按需逐步迁移到 5.x 新 API。

## 项目实战场景串联

> 以下用一个**电商订单超时自动取消**场景，串联 RocketMQ 的核心知识点，面试时可以用这个场景把 RocketMQ 讲透。

### 场景描述

用户下单后 30 分钟未支付，系统自动取消订单并释放库存。

### 整体架构

```
┌──────────┐    ①下单     ┌──────────┐  ②发送延时消息  ┌──────────┐
│  用户端   │───────────▶│ 订单服务  │──────────────▶│ RocketMQ │
└──────────┘             └──────────┘                └─────┬────┘
                              │                           │
                         ③创建订单                     ④30分钟后投递
                          (DB)                            │
                              │                           ▼
                              │                    ┌──────────┐
                              │                    │ 库存服务  │
                              │                    └─────┬────┘
                              │                          │
                              │                     ⑤检查订单状态
                              │                          │
                              │                     ┌────┴─────┐
                              │                  已支付      未支付
                              │                  不处理     ⑥取消订单
                              │                           + 释放库存
                              ▼
                     消费端幂等（订单号唯一约束）
```

### 技术方案设计

#### 1. Topic 设计

```
Topic: ORDER_TIMEOUT_CHECK
Tag:   TIMEOUT_CHECK
Key:   orderId（用于去重 + 消息轨迹查询）
```

> Topic 粒度：按业务域划分，一个业务域一个 Topic。Tag 用于消息过滤。Key 设置为业务唯一 ID。

#### 2. 发送延时消息

```java
@Service
@Slf4j
public class OrderService {

    private final RocketMQTemplate rocketMQTemplate;

    /**
     * 用户下单后发送延时消息
     */
    @Transactional
    public void createOrder(OrderDTO orderDTO) {
        // 1. 创建订单（本地事务）
        Order order = new Order();
        order.setOrderId(IdWorker.getIdStr());
        order.setStatus(OrderStatus.UNPAID.getCode());
        order.setCreateTime(LocalDateTime.now());
        orderMapper.insert(order);

        // 2. 发送延时消息（第 16 级 = 30 分钟）
        String messageBody = JSON.toJSONString(order);
        Message<String> message = MessageBuilder.withPayload(messageBody)
                .setHeader(RocketMQHeaders.KEYS, order.getOrderId())
                .build();
        // timeout=3000ms, delayLevel=16(30分钟)
        SendResult sendResult = rocketMQTemplate.syncSend(
                "ORDER_TIMEOUT_CHECK:TIMEOUT_CHECK", message, 3000, 16);
        log.info("发送延时消息成功，orderId={}, sendResult={}", order.getOrderId(), sendResult);

        // 3. 扣减库存（通过普通消息异步处理，解耦库存服务）
        rocketMQTemplate.syncSend("STOCK_DEDUCT_TOPIC", message);
    }

    @Autowired
    public void setRocketMQTemplate(RocketMQTemplate rocketMQTemplate) {
        this.rocketMQTemplate = rocketMQTemplate;
    }
}
```

> **为什么用延时消息而不是定时任务扫表**：定时任务扫表在高并发下会有性能问题（扫描大量未支付订单），且扫描间隔不精确。延时消息由 Broker 精确投递，无需额外扫描开销。

#### 3. 消费延时消息

```java
@Slf4j
@Component
@RocketMQMessageListener(
        consumerGroup = "order-timeout-check-consumer",
        topic = "ORDER_TIMEOUT_CHECK",
        selectorExpression = "TIMEOUT_CHECK"
)
public class OrderTimeoutCheckConsumer implements RocketMQListener<MessageExt> {

    private final OrderMapper orderMapper;
    private final StockService stockService;

    @Override
    public void onMessage(MessageExt messageExt) {
        String body = new String(messageExt.getBody(), StandardCharsets.UTF_8);
        Order order = JSON.parseObject(body, Order.class);
        String orderId = order.getOrderId();
        log.info("收到订单超时检查消息，orderId={}", orderId);

        // 幂等：利用数据库乐观锁，只有 UNPAID 状态才能取消
        int updated = orderMapper.updateStatus(
                orderId, OrderStatus.UNPAID.getCode(), OrderStatus.CANCELLED.getCode());
        if (updated > 0) {
            // 状态更新成功，说明订单确实未支付，释放库存
            log.info("订单超时未支付，取消订单。orderId={}", orderId);
            stockService.releaseStock(order.getProductId(), order.getQuantity());
        } else {
            // 状态更新失败，说明订单已支付或已取消，忽略
            log.info("订单已处理，跳过。orderId={}", orderId);
        }
    }

    @Autowired
    public void setOrderMapper(OrderMapper orderMapper) {
        this.orderMapper = orderMapper;
    }

    @Autowired
    public void setStockService(StockService stockService) {
        this.stockService = stockService;
    }
}
```

> SQL：`UPDATE order SET status = 'CANCELLED' WHERE order_id = ? AND status = 'UNPAID'`，利用数据库乐观锁天然幂等。

#### 4. 消费失败处理

消费失败时 RocketMQ 会自动重试（默认 16 次），如果仍然失败进入死信队列：

```java
// 死信队列消费者（兜底处理）
@Slf4j
@Component
@RocketMQMessageListener(
        consumerGroup = "order-timeout-check-consumer",
        topic = "%DLQ%order-timeout-check-consumer"
)
public class OrderTimeoutDLQConsumer implements RocketMQListener<MessageExt> {
    @Override
    public void onMessage(MessageExt messageExt) {
        String body = new String(messageExt.getBody(), StandardCharsets.UTF_8);
        log.error("订单超时检查消息进入死信队列，需要人工介入。body={}", body);
        // 告警通知（如发送邮件/钉钉消息给运维）
        // 或写入异常表，由定时任务后续处理
    }
}
```

#### 5. 监控配置

```yaml
# 告警规则示例（配合 Prometheus + Grafana）
groups:
  - name: rocketmq-alert
    rules:
      - alert: OrderTimeoutCheckConsumerLag
        expr: rocketmq_consumer_lag{consumerGroup="order-timeout-check-consumer"} > 100
        for: 5m
        annotations:
          summary: "订单超时检查消费堆积超过 100 条"
```

### 面试如何串讲这个场景

> "我在项目中使用 RocketMQ 实现了订单超时自动取消功能。用户下单后，订单服务发送一条 30 分钟的延时消息到 RocketMQ，30 分钟后库存服务消费这条消息，检查订单状态，如果未支付则取消订单并释放库存。消息的 Key 设置为订单号，消费端通过数据库乐观锁（`WHERE status = 'UNPAID'`）保证幂等。消费失败的消息会重试 16 次，最终进入死信队列由人工处理。生产环境我们开启了消息轨迹，方便排查问题，同时配置了消费堆积告警。"

这个回答串联了：**延时消息、消息 Key、幂等方案、重试机制、死信队列、消息轨迹、监控告警**七个知识点。

## 参考资料

- [RocketMQ 官方文档](https://rocketmq.apache.org/docs/)
- [RocketMQ DLedger 模式](https://rocketmq.apache.org/docs/deployment/01Deploy/)
- [RocketMQ 5.x 新特性](https://rocketmq.apache.org/rocketmq/rocketmq-messages/)
- [rocketmq-dashboard](https://github.com/apache/rocketmq-dashboard)
