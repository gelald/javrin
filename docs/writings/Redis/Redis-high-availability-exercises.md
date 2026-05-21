# Redis 阶段四：高可用架构 — 练习题

> 参考: [Redis 高可用架构](./Redis-high-availability.md)

> **总分**：100 分 + 附加题 20 分
> **及格线**：70 分 | **优秀线**：85 分
> **建议**：达到 85 分+后再进入阶段五

---

## 一、选择题（每题 3 分，共 30 分）

### 1. Redis 从节点首次连接主节点时，发送的 PSYNC 命令参数是？

A. `PSYNC master_id 0`
B. `PSYNC ? -1`
C. `PSYNC run_id offset`
D. `PSYNC -1 ?`

<details>
<summary>答案</summary>

**B**。首次连接时，从节点不知道主节点的 replication ID 和自己的 offset，所以发送 `PSYNC ? -1`（replid=? offset=-1），告诉主节点需要全量复制。A 和 C 是增量复制时的格式。D 参数顺序和含义都不对。
</details>

---

### 2. 关于 repl_backlog（复制积压缓冲区），以下说法错误的是？

A. repl_backlog 是一个固定大小的环形缓冲区
B. 默认大小为 1MB
C. 增量复制时，主节点根据从节点上报的 offset 从 repl_backlog 中找到对应位置开始发送
D. 如果从节点的 offset 已被 repl_backlog 覆盖，仍然可以增量复制

<details>
<summary>答案</summary>

**D**。如果从节点请求的 offset 已经被 repl_backlog 的环形覆盖（新的数据把旧的覆盖了），主节点无法找到对应的起始位置，就必须回退到全量复制。这是增量复制退化为全量复制的常见原因之一。
</details>

---

### 3. 哨兵判定主节点"主观下线"（SDOWN）的条件是？

A. quorum 个哨兵都 PING 不到主节点
B. 单个哨兵在 `down-after-milliseconds` 时间内未收到主节点有效响应
C. 主节点返回 PONG 但状态异常
D. 从节点的复制连接断开

<details>
<summary>答案</summary>

**B**。SDOWN 是单个哨兵的主观判断：当某个哨兵在配置的 `down-after-milliseconds` 时间内没有收到主节点的有效 PING 响应，就认为主节点主观下线。A 描述的是 ODOWN（客观下线）的条件。C 和 D 都不是 SDOWN 的判定条件。
</details>

---

### 4. 关于哨兵的 quorum 和 majority，以下理解正确的是？

A. quorum 是执行故障转移所需的最少哨兵数量
B. majority 是判断客观下线所需的最少哨兵数量
C. quorum 用于判断客观下线，majority 用于授权故障转移
D. quorum 和 majority 是同一个概念

<details>
<summary>答案</summary>

**C**。quorum 是判断 ODOWN（客观下线）所需的最少哨兵数，majority（超过半数哨兵）是授权执行故障转移所需的最少哨兵数。这是两个不同的阈值：quorum 判断"是不是该切"，majority 判断"有没有资格切"。A 和 B 刚好搞反了。
</details>

---

### 5. 哨兵故障转移选主时，以下哪个规则优先级最高？

A. 复制偏移量（offset）最大的从节点
B. run_id 字典序最小的从节点
C. `replica-priority` 值最小的从节点
D. 与主节点网络延迟最低的从节点

<details>
<summary>答案</summary>

**C**。选主优先级：`replica-priority` > replication offset > run_id。首先排除 priority=0（永不选为主），然后选 priority 值最小的。如果 priority 相同，选 offset 最大的（数据最新）。如果还相同，选 run_id 字典序最小的。网络延迟不是选主考虑因素。
</details>

---

### 6. Redis Cluster 将数据划分为多少个 Hash Slot？

A. 1024
B. 4096
C. 16384
D. 65536

<details>
<summary>答案</summary>

**C**。Redis Cluster 使用 16384 个 Hash Slot。这个数字是在 Gossip 消息大小（2 字节 bitmap = 2KB）、节点规模（最多约 1000 个主节点）和取模效率之间的最佳平衡。65536 槽会使 Gossip 消息中的 bitmap 增大到 8KB，开销太大。
</details>

---

### 7. 客户端向 Cluster 中节点 A 发送请求，节点 A 返回 `-MOVED 1234 192.168.1.101:6380`，以下说法正确的是？

A. slot 1234 正在迁移，客户端应先发 ASKING 再发命令
B. slot 1234 已迁移到 192.168.1.101:6380，客户端应更新本地缓存
C. 节点 A 临时不可用，客户端应重试
D. 客户端应关闭连接重新建立

<details>
<summary>答案</summary>

**B**。MOVED 表示该 slot 的归属已永久变更到目标节点，客户端应更新本地路由缓存，后续直接请求目标节点。ASK 才是临时重定向（迁移中）。C 和 D 都不是正确的处理方式。
</details>

---

### 8. 关于 Redis Cluster 的 Gossip 协议，以下说法错误的是？

A. Gossip 是去中心化的通信协议，不需要中心节点
B. PING 消息用于节点间的心跳检测
C. Gossip 保证消息在有限轮次内到达所有节点（最终一致性）
D. Redis Cluster 使用 Gossip 实现了强一致性

<details>
<summary>答案</summary>

**D**。Gossip 协议只能保证**最终一致性**，不是强一致性。消息通过多轮随机传播逐步到达所有节点，存在短暂的中间状态不一致。Redis Cluster 设计上就选择了 AP（可用性 + 分区容错）而非 CP（一致性 + 分区容错）。
</details>

---

### 9. 以下哪种场景必须使用 Redis Cluster 而不能用哨兵方案？

A. 主节点宕机需要自动恢复
B. 数据量 50GB，单机内存只有 16GB
C. 需要读写分离提升读 QPS
D. 需要数据持久化

<details>
<summary>答案</summary>

**B**。Redis Cluster 解决的核心问题是**数据分片** — 将数据分布在多台机器上，突破单机内存限制。哨兵方案下所有数据仍在一台主节点上，无法突破单机容量。A、C 用哨兵就能解决，D 是 Redis 本身的功能。
</details>

---

### 10. 全量复制期间，从节点的状态是？

A. 正常响应所有读请求
B. 能响应读请求但不能响应写请求
C. 清空旧数据并加载 RDB，期间不能响应请求
D. 继续提供旧数据，加载完 RDB 后原子切换

<details>
<summary>答案</summary>

**C**。全量复制期间，从节点需要先清空旧数据（如果有的话），然后加载接收到的 RDB 文件。在加载 RDB 的过程中，从节点是**阻塞状态**，无法响应任何请求。这是全量复制的一个代价：复制期间该从节点不可用。
</details>

---

## 二、填空题（每空 2 分，共 20 分）

### 1. Redis 从节点首次连接主节点时发送 `PSYNC ____` 命令请求全量复制。

<details>
<summary>答案</summary>

`? -1`（replid 为 `?`，offset 为 `-1`）
</details>

---

### 2. repl_backlog 的默认大小是 ____ 字节，建议计算公式为 `主节点每秒写入量 × ____`。

<details>
<summary>答案</summary>

**1MB**（1048576 字节）；**断线重连最大容忍时间**（如 60 秒）
</details>

---

### 3. 哨兵判定主观下线的时间配置项是 `sentinel ____`，默认值为 ____ 毫秒。

<details>
<summary>答案</summary>

`down-after-milliseconds`；`30000`（30 秒）
</details>

---

### 4. 哨兵故障转移选主规则的优先级排序为：`____` > `replication offset` > `____`。

<details>
<summary>答案</summary>

`replica-priority`（从节点优先级）；`run_id`
</details>

---

### 5. Redis Cluster 使用 `____` 算法对 key 进行分片，对 `____` 取模得到槽编号。

<details>
<summary>答案</summary>

`CRC16`；`16384`
</details>

---

### 6. Cluster 客户端收到 `MOVED` 重定向时应 ____ 本地路由缓存，收到 `ASK` 重定向时 ____ 本地缓存。

<details>
<summary>答案</summary>

**更新**（MOVED 表示永久变更）；**不更新**（ASK 是临时重定向，槽可能还没完全迁完）
</details>

---

### 7. 如果部署了 5 个哨兵节点，执行故障转移需要至少 ____ 个哨兵授权（即 majority）。

<details>
<summary>答案</summary>

**3**（majority = floor(5/2) + 1 = 3）
</details>

---

## 三、简答题（每题 10 分，共 30 分）

### 1. PSYNC 全量复制和增量复制的判断条件是什么？repl_backlog 的作用是什么？（10 分）

<details>
<summary>答案</summary>

**判断条件**（5 分）：

从节点发送 `PSYNC <replid> <offset>`，主节点收到后判断：
1. **replid 不匹配** → 全量复制（首次连接或主节点变更）
2. **replid 匹配但 offset 不在 repl_backlog 范围内** → 全量复制（积压缓冲区不够）
3. **replid 匹配且 offset 在 repl_backlog 范围内** → 增量复制

**repl_backlog 的作用**（5 分）：

repl_backlog 是主节点维护的**环形缓冲区**，记录最近一段时间的写命令。作用：
1. **支持增量复制**：当从节点断线重连时，主节点可以从 repl_backlog 中找到断点位置（offset），只发送 offset 之后的数据
2. **避免全量复制**：只要断线时间不太长、写入量不太大，就可以用增量复制代替全量复制，大幅降低开销
3. **大小配置**：默认 1MB，建议根据 `主节点每秒写入量 × 最大容忍断线时间` 计算
</details>

---

### 2. 哨兵故障转移的选主规则是什么？为什么 replica-priority 优先级最高？（10 分）

<details>
<summary>答案</summary>

**选主规则**（6 分）：

按以下优先级顺序筛选从节点：
1. **replica-priority 最小**：排除 priority=0 的节点（永不选为主），在剩余节点中选 priority 值最小的
2. **replication offset 最大**：priority 相同时，选复制偏移量最大的（数据最新、最完整）
3. **run_id 字典序最小**：以上都相同时，选 run_id 字典序最小的（确定性选择，避免每次选举结果不同）

**为什么 priority 优先级最高**（4 分）：

replica-priority 优先级最高是因为它是**运维人员主动配置的策略意图**，代表了业务层面的偏好：
- 可以将配置更高的机器设为更低的 priority（优先选为 主）
- 可以将专门用于离线分析或报表的从节点设为 priority=0（永不选为主）
- 这是一种**人工干预机制**，让运维人员能控制故障转移的结果，避免选出不合适的节点（如磁盘性能差、网络带宽小的节点）
</details>

---

### 3. Redis Cluster 客户端遇到 MOVED 和 ASK 重定向分别是什么场景？各自的处理流程是什么？（10 分）

<details>
<summary>答案</summary>

**MOVED 重定向**（5 分）：

- **场景**：槽已永久迁移到新节点。客户端请求的 key 所属 slot 不在当前节点的负责范围内
- **处理流程**：客户端收到 `-MOVED <slot> <ip>:<port>` 后，**更新本地路由缓存**（slot → node 映射），后续请求直接发到目标节点
- **特点**：一次性，更新缓存后不会再出现

**ASK 重定向**（5 分）：

- **场景**：槽正在迁移中（部分 key 在源节点，部分在目标节点）。源节点发现请求的 key 已经迁移走了
- **处理流程**：
  1. 客户端收到 `-ASK <slot> <ip>:<port>`
  2. 客户端先向目标节点发送 `ASKING` 命令
  3. 然后再发送实际的请求命令
  4. **不更新本地路由缓存**
- **特点**：可能多次出现，因为槽还没完全迁完

**核心区别**：MOVED 是永久性的（更新缓存），ASK 是临时性的（不更新缓存）
</details>

---

## 四、场景题（共 20 分）

### 某公司 Redis 集群为 3 主 3 从架构（Master-A/B/C + Slave-a/b/c），数据量约 50GB，QPS 约 10 万。某天 Master-A 突然宕机，请分别描述以下两种模式的恢复过程，并对比差异。

<details>
<summary>答案</summary>

**哨兵模式下的恢复过程**（10 分）：

假设部署了 3 个哨兵（S1/S2/S3），quorum=2：

1. **下线检测**：
   - 3 个哨兵各自 PING Master-A，30 秒内无响应
   - 3 个哨兵分别标记 Master-A 为 SDOWN
   - 达到 quorum=2，Master-A 被标记为 ODOWN

2. **Leader 选举**：
   - 3 个哨兵中率先发起投票的获得 majority（2 票），成为 Leader

3. **选主**：
   - Leader 从 Slave-a/b/c 中选出新主（假设选出 Slave-a）
   - 选主规则：priority > offset > run_id

4. **故障转移**：
   - Leader 对 Slave-a 执行 `SLAVEOF NO ONE`，晋升为新 Master
   - Leader 通知 Slave-b 和 Slave-c 复制新 Master
   - 广播新 Master 地址，客户端通过哨兵获取新地址

5. **特点**：
   - **数据不丢失**（Slave-a 保存完整数据）
   - **恢复期间短暂不可写**（选举 + 切换时间）
   - **容量不变**（仍然是单主节点，50GB 全量数据）

**Cluster 模式下的恢复过程**（10 分）：

Master-A 负责 0-5460 号槽，Slave-a 是其从节点：

1. **下线检测**：
   - 其他节点通过 Gossip 协议发现 Master-A 不可达
   - 多数节点确认 Master-A 下线

2. **故障转移（PFAIL → FAIL）**：
   - Master-A 被标记为 PFAIL（Possibly Fail）
   - 多数 Master 节点确认后，标记为 FAIL
   - Slave-a 发起选举（类似哨兵的 Raft 简化版），获得多数 Master 投票后晋升

3. **晋升 + 槽接管**：
   - Slave-a 执行 `SLAVEOF NO ONE`，成为新 Master
   - 新 Master 接管 Master-A 原来负责的 0-5460 号槽
   - 其他节点通过 Gossip 更新槽映射

4. **客户端重定向**：
   - 客户端请求 0-5460 槽的 key 时，收到 MOVED 重定向到新 Master
   - Smart Client 更新本地路由缓存

5. **特点**：
   - **数据不丢失**（Slave-a 有完整数据）
   - **恢复较快**（不需要外部哨兵，节点自身完成）
   - **容量不变**（Cluster 本身就是分片的，单节点容量约 16GB）

**两种模式对比**：

| 维度 | 哨兵模式 | Cluster 模式 |
|------|---------|-------------|
| 检测机制 | 哨兵定时 PING | Gossip 协议 |
| 选举组件 | 外部哨兵 | 集群节点自身 |
| 故障恢复速度 | 较慢（多轮通信） | 较快（节点间直连） |
| 客户端感知 | 通过哨兵获取地址 | MOVED 重定向 |
| 部署复杂度 | 中（需额外部署哨兵） | 高（节点自身处理） |
| 数据量限制 | 单机内存 | 多机汇总 |
</details>

---

## 五、附加题（20 分）

### 如果哨兵集群中 majority 无法达到（如部署了 5 个哨兵，当前只有 2 个存活），会发生什么？这说明了分布式系统的什么原则？如果此时主节点真的宕机了，为什么不能直接 failover？

<details>
<summary>答案</summary>

**会发生什么**（6 分）：

1. 2 个存活的哨兵各自检测到主节点不可达，标记为 SDOWN
2. 但需要 quorum 个哨兵确认 ODOWN。如果 quorum=2，则 2 个存活哨兵足够确认 ODOWN
3. 确认 ODOWN 后，进入 Leader 选举阶段。但 Leader 需要 majority（3 票）才能当选，只有 2 个哨仙，**无法选出 Leader**
4. **故障转移不会执行** — 即使所有存活哨兵都认为主节点宕机了，也无法执行 failover

**说明了什么原则**（6 分）：

这体现了分布式系统中的**少数派安全原则**（Minority Safety），属于 CAP 定理中 CP 的体现：

1. **防止脑裂（Split Brain）**：如果 5 个哨兵中有 2 个在网络分区的一侧，3 个在另一侧，只有拥有 majority 的一侧才能执行 failover。这样保证了全局最多只有一个 Leader 执行故障转移
2. **多数派原则**：任何影响集群状态的决策都必须得到多数节点的同意。这意味着即使发生网络分区，最多只有一个分区能做出决策
3. **安全优先于可用性**：宁可不做故障转移（牺牲可用性），也不冒脑裂风险（保障安全性）

**为什么不能直接 failover**（8 分）：

1. **脑裂风险**：如果有 2 个哨兵认为主节点宕机并选出新主，但同时另外 3 个哨兵和原主节点所在的分区中，原主节点仍然存活并接收写请求。这样就会有两个主节点同时接收写，导致**数据不一致**
2. **两个主节点的数据分歧**：原主节点继续接收了新的写请求，新主节点是从节点晋升的，两边数据已经分叉，无法自动合并
3. **客户端混乱**：客户端可能一部分连接到原主，一部分连接到新主，读到不同的数据
4. **多数派授权是安全保证**：只有 majority 才能执行 failover，确保了在任何网络分区下，最多只有一个分区能做出决策。这是一个硬性安全约束，不可绕过
5. **配置 epoch 机制**：每个成功的 failover 都会递增 configuration epoch，旧的 failover 决策会被新 epoch 覆盖。但前提是要有 majority 授权才能产生有效的新 epoch

**结论**：在分布式系统中，**安全永远优先于可用性**。无法达成多数派共识时，宁可让系统处于不可用状态（主节点宕机、无故障转移），也不能冒脑裂导致数据不一致的风险。
</details>

---

## 评分参考

| 题型 | 分值 | 知识点覆盖 |
|------|------|-----------|
| 选择题 | 30 分 | PSYNC、repl_backlog、SDOWN/ODOWN、quorum vs majority、选主规则、Hash Slot、MOVED/ASK、Gossip、方案对比、全量复制状态 |
| 填空题 | 20 分 | 关键术语和数字（PSYNC ? -1、1MB、down-after-milliseconds、30000、replica-priority、run_id、CRC16、16384、MOVED 更新、ASK 不更新、majority=3） |
| 简答题 | 30 分 | PSYNC 判断条件 + repl_backlog 作用、选主规则 + priority 设计原因、MOVED vs ASK |
| 场景题 | 20 分 | 哨兵故障转移完整流程、Cluster 故障转移流程、两种模式对比 |
| 附加题 | 20 分 | majority 无法达成的影响、分布式少数派安全原则、脑裂防护 |

**高频错题对应知识点**：quorum vs majority 的区别（选择题 4）、MOVED vs ASK 的缓存行为差异（选择题 7）、全量复制期间从节点状态（选择题 10）

> 如果某些题目做错，回到 [Redis 高可用架构](./Redis-high-availability.md) 对应章节复习。
