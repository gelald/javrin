# Redis 阶段四：高可用架构 — 面试指南

> 参考: [Redis 高可用架构](./Redis-high-availability.md)

> **面试热度**：🔥🔥🔥🔥🔥（架构设计必考，几乎每场后端面试都会涉及）
> **核心原则**：不只是背流程，要能说出"为什么这样设计"和"生产环境怎么选"

---

## 高频面试题 Top 10

### 1. Redis 主从复制是怎么做的？全量复制和增量复制的区别？（⭐ 最高频）

**标准回答（三段式）：**

**第一段 — 整体流程**：

Redis 主从复制通过 PSYNC 命令实现。从节点连接主节点后发送 `PSYNC <replid> <offset>`，主节点根据 replid 和 offset 判断走全量还是增量复制。

**第二段 — 全量复制**：

首次连接时 replid 未知（发送 `PSYNC ? -1`），主节点执行 BGSAVE 生成 RDB 快照，发送给从节点，同时将期间的写命令记录到 repl_backlog。从节点加载 RDB 后，再重放 repl_backlog 中的增量命令，最终与主节点同步。

**第三段 — 增量复制**：

断线重连时，如果 replid 匹配且 offset 仍在 repl_backlog 范围内，主节点直接从 repl_backlog 中 offset 位置开始发送增量数据，避免全量复制的开销。

**补充细节**：全量复制期间从节点是阻塞的（加载 RDB 中），对读请求不可用。所以生产环境要合理配置 repl_backlog 大小（`写入速率 × 最大断线时间`），避免频繁全量复制。

---

### 2. 什么是 repl_backlog？为什么需要它？（⭐ 高频）

**标准回答**：

repl_backlog 是主节点维护的一个**固定大小的环形缓冲区**，记录了最近一段时间的写命令。

**作用**：支持从节点的**增量复制**。当从节点断线重连时，上报自己的 offset，主节点检查 offset 是否在 repl_backlog 范围内，如果是就只发送 offset 之后的数据。

**为什么需要**：如果没有 repl_backlog，任何断线重连都会触发全量复制（fork + RDB + 传输 + 加载），代价非常大。repl_backlog 让短时间内的断线可以增量恢复。

**关键配置**：
```
repl-backlog-size 10mb   # 默认 1MB，建议按 "每秒写入量 × 最大容忍断线时间" 计算
```

---

### 3. Redis 哨兵了解吗？Sentinel 的工作流程？（⭐ 最高频）

**标准回答（四步流程）**：

哨兵是 Redis 的高可用组件，核心工作流程分为四步：

1. **监控**：哨兵每 1 秒 PING 所有主从节点，检测存活状态
2. **下线检测**：单个哨兵超时未响应标记为 SDOWN（主观下线），quorum 个哨兵确认后标记为 ODOWN（客观下线）
3. **Leader 选举**：通过 Raft 简化版选举一个哨兵作为 Leader 来执行故障转移
4. **故障转移**：Leader 从从节点中选出新主（priority > offset > run_id），执行 `SLAVEOF NO ONE` 晋升，然后将其他从节点重新指向新主

**配置要点**：
```
sentinel monitor mymaster 127.0.0.1 6379 2     # quorum=2
sentinel down-after-milliseconds mymaster 30000  # SDOWN 判定 30s
sentinel failover-timeout mymaster 180000        # 故障转移超时 180s
```

**部署建议**：至少 3 个哨兵（容忍 1 个故障），推荐 5 个（容忍 2 个故障），部署在不同物理机上。

---

### 4. 哨兵是怎么选出 Leader 的？（⭐ 高频）

**标准回答**：

哨兵 Leader 选举基于 **Raft 协议的简化版**：

1. ODOWN 确认后，每个哨兵都可以发起选举
2. 发起者向其他哨兵发送 `SENTINEL is-master-down-by-addr` 请求投票
3. 每个哨兵在**一轮选举中只能投一票**，先到先得
4. 获得 **majority（超过半数）** 投票的哨兵当选 Leader
5. 如果一轮没有选出，等待下一轮

**与 Raft 的区别**：Redis Sentinel 的选举比 Raft 简单得多，没有日志复制、没有任期递增的严格约束，本质是一个一次性的投票选举，选完即止。

---

### 5. 哨兵故障转移的选主规则是什么？（⭐ 必考）

**标准回答**：

三个优先级，依次筛选：

| 优先级 | 规则 | 说明 |
|--------|------|------|
| 1 | `replica-priority` 最小 | 值越小优先级越高，priority=0 永不选为主 |
| 2 | `replication offset` 最大 | 数据最新最完整 |
| 3 | `run_id` 字典序最小 | 确定性选择 |

**为什么 priority 最高**：priority 是运维人员主动配置的策略意图。可以将性能更好的机器设为更低的 priority（优先选为主），将专门用于报表的从节点设为 priority=0（不参与选主）。这是一种人工干预机制。

---

### 6. Redis Cluster 的数据分布原理？（⭐ 最高频）

**标准回答（三段式）**：

**第一段 — Hash Slot**：

Redis Cluster 将所有数据划分为 **16384 个 Hash Slot**，每个 Master 负责一部分槽。分片算法是 `CRC16(key) % 16384`。

**第二段 — 为什么是 16384**：

Gossip 消息中用 2 字节 bitmap（2048 字节）表示节点的槽映射关系。如果用 65536 个槽，bitmap 需要 8KB，消息开销太大。16384 个槽对于最多约 1000 个主节点的集群规模完全够用。

**第三段 — Hash Tag**：

如果多个 key 需要操作（如事务、批量操作），可以用 `{tag}` 确保 hash 到同一个 slot：
```
SET {user:1001}.name "Tom"
SET {user:1001}.age "25"
# 都用 "user:1001" 计算 slot，保证在同一节点
```

---

### 7. MOVED 和 ASK 重定向有什么区别？（⭐ 高频）

**标准回答（对比表格 + 一句话总结）**：

| 维度 | MOVED | ASK |
|------|-------|-----|
| 场景 | 槽已永久迁移 | 槽正在迁移中 |
| 客户端行为 | **更新**本地路由缓存 | **不更新**缓存 |
| 重试方式 | 直接请求目标节点 | 先 ASKING 再发命令 |
| 出现频率 | 一次性（更新后不再出现） | 可能多次出现 |

**一句话总结**：MOVED 告诉你"这个槽不归我管了，以后去找它"，ASK 告诉你"这个 key 我这儿没了，临时去那边找一下，别更新缓存因为我还没搬完"。

---

### 8. 集群和哨兵有什么区别？怎么选？（⭐ 最高频场景题）

**标准回答（对比 + 选择建议）**：

| 维度 | 哨兵 | Cluster |
|------|------|---------|
| 数据分布 | 单机存储全部 | 多机分片存储 |
| 容量上限 | 单机内存 | 多机汇总 |
| 写 QPS | 单主 | 多主并行 |
| 多 key 操作 | 无限制 | 需在同一 slot |
| 运维复杂度 | 中 | 高 |

**选择建议**：
- **数据量 < 单机内存（~10-20GB）** → 哨兵方案，运维简单、功能完整
- **数据量 > 单机内存** 或 **写 QPS 需要水平扩展** → Cluster
- **没有容量瓶颈就不要上 Cluster**，Cluster 带来的限制（多 key 必须同 slot、事务受限、Lua 脚本受限等）在没有必要时是纯粹的复杂度负担

---

### 9. Gossip 协议了解吗？Redis Cluster 是怎么通信的？（⭐ 中高频）

**标准回答**：

Redis Cluster 使用去中心化的 **Gossip 协议**进行节点间通信。每个节点定期与其他节点交换状态信息。

**三种消息类型**：

| 消息 | 作用 | 频率 |
|------|------|------|
| MEET | 新节点加入集群 | 手动触发 |
| PING | 心跳检测 + 状态交换 | 每 1 秒 |
| PONG | 响应 PING + 广播自身状态 | 收到时 |

每个节点每秒随机选择几个节点发送 PING，消息体携带自己的状态（IP/端口、负责的槽、节点状态）和其他已知节点的摘要。通过多轮传播，集群状态最终收敛到一致。

**为什么不用强一致性协议**：Gossip 开销小、延迟低、对网络分区容错性好。Redis Cluster 追求 AP（可用性 + 分区容错），不需要 CP（一致性 + 分区容错）的代价。

---

### 10. 生产环境 Redis 高可用怎么设计？（⭐ 场景设计题）

**标准回答（按数据量分层）**：

**小规模（< 10GB，读 QPS < 5 万）**：
```
1 主 2 从 + 3 哨兵
├── Master（读写）
├── Slave-1（读）
├── Slave-2（读 + 备份）
└── Sentinel × 3（不同物理机）
```

**中规模（10-50GB，写 QPS < 5 万）**：
```
1 主 2 从 + 3 哨兵
├── 单机 32-64GB 内存
├── 开启 AOF + 混合持久化
└── 监控 fork 耗时和内存使用
```

**大规模（> 50GB，或写 QPS > 5 万）**：
```
Redis Cluster 6 主 6 从
├── 每主约 10-20GB 数据
├── 开启混合持久化
├── Smart Client（JedisCluster/Lettuce）
└── 监控槽分布均匀度、节点健康
```

**通用建议**：
- 所有方案都配从节点（至少 1 从）
- 生产环境至少 3 哨兵或 6 节点 Cluster
- 开启持久化（AOF everysec + 混合持久化）
- 监控指标：内存使用率、复制延迟、QPS、慢查询

---

## 易错点总结

### 1. quorum 和 majority 搞混

- **quorum**：判断客观下线（ODOWN）需要多少个哨兵同意
- **majority**：执行故障转移需要超过半数哨兵授权
- 两个是不同的阈值，quorum <= majority

### 2. repl_backlog 大小不够导致频繁全量复制

repl_backlog 默认只有 1MB，写入量大时很快被覆盖。从节点断线重连发现 offset 已被覆盖，只能全量复制。生产环境必须根据写入速率计算合理大小。

### 3. Cluster 客户端收到 MOVED 后不更新本地缓存

有些客户端实现不完善，收到 MOVED 后不更新路由表，导致每次请求都重定向，性能严重下降。应使用 JedisCluster 或 Lettuce 等 Smart Client。

### 4. 哨兵误判（网络分区导致脑裂）

网络分区可能导致部分哨兵认为主节点下线，但实际上主节点仍存活。设置合理的 `down-after-milliseconds` 和 `failover-timeout` 可以降低误判概率。更重要的是理解：majority 机制保证了即使误判，也只有一个分区能执行 failover。

### 5. Cluster 模式下批量操作受限

`MGET`、`MSET`、事务（`MULTI`）、Lua 脚本中的所有 key 必须在**同一个 slot** 上，否则会报错。解决办法是使用 Hash Tag `{tag}` 确保相关 key 在同一 slot。

### 6. 全量复制期间从节点不可用

全量复制时从节点需要清空数据并加载 RDB，期间无法响应任何请求（包括读）。如果业务对读可用性要求高，可以配置多个从节点，错开复制时间。

### 7. Cluster 的 Key 分布不均

如果 key 的 hash 分布不均匀，某些节点的槽可能承载了大部分数据，导致倾斜。可以通过 `redis-cli --cluster info` 查看槽分布，用 `--cluster rebalance` 重新平衡。

---

## 源码路径速查

| 模块 | 文件 | 核心函数 | 说明 |
|------|------|---------|------|
| PSYNC 判断 | `replication.c` | `masterTryPartialResynchronization()` | 判断全量/增量复制 |
| 全量复制 | `replication.c` | `startBgsaveForReplication()` | fork + RDB |
| repl_backlog | `replication.c` | `replicationFeedSlaves()` | 写命令追加到积压缓冲区 |
| 心跳 | `replication.c` | `replicationCron()` | 主从心跳定时器 |
| SDOWN | `sentinel.c` | `sentinelCheckSubjectivelyDown()` | 主观下线检测 |
| ODOWN | `sentinel.c` | `sentinelCheckObjectivelyDown()` | 客观下线判定 |
| Leader 选举 | `sentinel.c` | `sentinelAskForLeader()` | 发起投票 |
| 投票 | `sentinel.c` | `sentinelVoteForLeader()` | 响应投票 |
| 故障转移 | `sentinel.c` | `sentinelFailoverStateMachine()` | 状态机驱动 |
| 选主 | `sentinel.c` | `sentinelSelectSlave()` | priority > offset > run_id |
| Hash Slot | `cluster.c` | `keyHashSlot()` | CRC16(key) % 16384 |
| Gossip | `cluster.c` | `clusterSendPing()` | 节点间通信 |
| MOVED/ASK | `cluster.c` | `clusterRedirectClient()` | 重定向响应 |
| 槽迁移 | `cluster.c` | `migrateCommand()` | MIGRATE 实现 |

---

## 经典面试话术模板

### 模板一："Redis 高可用方案怎么选？"（完整回答）

> 我们项目中 Redis 的选型主要看数据量：
>
> - **10GB 以内**，用**哨兵方案**。1 主 2 从 + 3 哨兵，运维简单、读写分离、自动故障转移，能满足绝大多数业务需求。
> - **超过单机内存**，才上 **Cluster**。Cluster 通过 Hash Slot 做数据分片，突破了单机容量限制，也支持多主并行写入。但代价是多 key 操作必须在同一 slot、事务受限、运维更复杂。
>
> 核心原则是**没有容量瓶颈就不要上 Cluster**，复杂度不值得。Cluster 解决的核心问题是水平扩展，不是高可用 — 哨兵已经解决了高可用问题。

### 模板二："主从复制流程"（30 秒简版）

> 从节点连上主节点后发 `PSYNC ? -1` 请求全量同步。主节点 BGSAVE 生成 RDB，发给从节点。发送期间的写命令记到 repl_backlog 里。从节点加载完 RDB 后，重放 repl_backlog 里的增量命令，追上主节点。之后就是增量复制：主节点每次执行写命令，都通过 repl_backlog 同步给从节点。断线重连时，从节点上报 offset，如果在 repl_backlog 范围内就增量恢复，否则重新全量复制。

### 模板三："哨兵故障转移"（分步回答）

> 哨兵故障转移分四步：
>
> 1. **检测**：哨兵每秒 PING 主节点，超时标记 SDOWN，quorum 个哨兵确认 ODOWN
> 2. **选举 Leader**：Raft 简化版，majority 授权的哨兵成为 Leader
> 3. **选主**：priority > offset > run_id，选出最优从节点
> 4. **执行转移**：SLAVEOF NO ONE 晋升新主，其他从节点重新指向新主，广播新地址
>
> 关键点：quorum 判断"该不该切"，majority 判断"有没有资格切"，两个概念别搞混。

---

**下一步**：完成练习题（目标 85 分+）。如果某些知识不太清楚，回到 [Redis 高可用架构](./Redis-high-availability.md) 对应章节复习。
