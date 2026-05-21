# Redis 阶段五：缓存实战与应用场景 — 练习题

> 参考: [Redis 缓存实战与应用场景](./Redis-cache-practice.md)

> **总分**：100 分 + 附加题 20 分
> **及格线**：70 分 | **优秀线**：85 分
> **建议**：达到 85 分+后即完成 Redis 全部五个阶段

---

## 一、选择题（每题 3 分，共 30 分）

### 1. 关于缓存穿透，以下说法正确的是？

A. 缓存穿透是指热点 Key 过期导致大量请求打到数据库
B. 缓存穿透是指大量 Key 同时过期导致数据库压力剧增
C. 缓存穿透是指请求的数据在缓存和数据库中都不存在
D. 布隆过滤器可以完全避免缓存穿透

<details>
<summary>答案</summary>

**C**。缓存穿透的定义是请求的数据在缓存和数据库中都不存在，每次请求都会穿透缓存直接打到数据库。A 是缓存击穿，B 是缓存雪崩。D 错在布隆过滤器有误判率，可能误报存在但不会漏报，且本身不能完全避免穿透（还需要配合缓存空对象等方案）。
</details>

---

### 2. 以下哪种方案最适合解决缓存击穿问题？

A. 给所有 Key 的 TTL 加随机值
B. 使用互斥锁保证同一时刻只有一个线程重建缓存
C. 使用布隆过滤器拦截不存在的 Key
D. 部署 Redis 哨兵

<details>
<summary>答案</summary>

**B**。缓存击穿是热点 Key 过期导致的，互斥锁可以保证只有一个线程去查数据库重建缓存，其他线程等待或重试，避免大量请求同时打到数据库。A 是解决雪崩的方案。C 是解决穿透的方案。D 是解决 Redis 高可用的方案。
</details>

---

### 3. Cache Aside 模式下，写操作的正确顺序是？

A. 先删除缓存，再更新数据库
B. 先更新数据库，再删除缓存
C. 先更新缓存，再更新数据库
D. 同时更新缓存和数据库

<details>
<summary>答案</summary>

**B**。Cache Aside 模式推荐先更新数据库再删除缓存。先删缓存后更新数据库时，并发读写可能导致旧值被重新加载到缓存中。先更新数据库再删除缓存，不一致窗口极小（需要读操作慢于一次写操作才会发生），是业界标准做法。
</details>

---

### 4. 使用 Redis 实现分布式锁时，为什么解锁要用 Lua 脚本？

A. Lua 脚本执行速度更快
B. 保证"判断值是否匹配 + 删除"两个操作的原子性
C. Redis 只支持通过 Lua 脚本删除 key
D. Lua 脚本可以自动重试

<details>
<summary>答案</summary>

**B**。解锁需要两步操作：先判断 key 的值是否是自己设置的（防止误删别人的锁），再执行删除。如果用两次独立的 Redis 调用，两个操作之间可能被其他请求插入，导致判断通过后锁已被别人获取。Lua 脚本在 Redis 中是原子执行的，保证了判断和删除的原子性。
</details>

---

### 5. Redisson 的看门狗（Watchdog）机制的作用是什么？

A. 监控 Redis 节点的健康状态
B. 当业务执行时间超过锁过期时间时，自动续期
C. 在锁竞争时提供公平排队
D. 防止 Redis 宕机导致锁信息丢失

<details>
<summary>答案</summary>

**B**。看门狗的作用是在业务执行时间超过锁的过期时间时，自动为锁续期，防止锁提前过期导致其他线程获取锁而产生并发问题。默认每 10 秒（lockWatchdogTimeout/3）检查一次，如果锁仍被持有则重置过期时间为 30 秒。A 是哨兵的作用，C 是公平锁的作用，D 是高可用架构的作用。
</details>

---

### 6. 以下哪种情况会启动 Redisson 的看门狗续期机制？

A. `lock.lock(10, TimeUnit.SECONDS)` — 指定过期时间
B. `lock.lock()` — 不指定过期时间
C. `lock.tryLock(5, 10, TimeUnit.SECONDS)` — 指定等待和过期时间
D. 任何时候加锁都会启动看门狗

<details>
<summary>答案</summary>

**B**。只有使用 `lock()` 无参方法（不指定 leaseTime）时才会启动看门狗。显式指定了 leaseTime（A 和 C）时，Redisson 认为调用者对过期时间有明确预期，不启动自动续期，锁到期后一定会释放。
</details>

---

### 7. 关于 Redis 大 Key，以下说法错误的是？

A. 大 Key 可能导致集群内存倾斜
B. 删除大 Key 应该使用 `DEL` 命令快速释放
C. Redis 4.0+ 可以使用 `UNLINK` 异步删除大 Key
D. 操作大 Key 可能阻塞 Redis 主线程

<details>
<summary>答案</summary>

**B**。`DEL` 命令是同步删除，对于大 Key（如包含百万元素的 Hash），删除操作会阻塞主线程较长时间。应该使用 `UNLINK` 命令（Redis 4.0+），它将删除操作放入后台线程异步执行，不阻塞主线程。
</details>

---

### 8. Redis Pipeline 的主要作用是？

A. 保证多个命令的原子性
B. 减少网络 RTT，提升批量操作性能
C. 实现分布式事务
D. 自动重试失败的命令

<details>
<summary>答案</summary>

**B**。Pipeline 将多个命令打包发送，服务端依次执行后一次性返回结果，将 N 次 RTT 减少为 1 次。A 是事务（MULTI/EXEC）的作用。C 也是事务的作用。D Pipeline 不提供重试机制。
</details>

---

### 9. 令牌桶限流算法的特点是？

A. 恒定速率处理请求，不允许任何突发
B. 允许一定程度的突发流量
C. 在固定时间窗口内限制请求数
D. 完全不限流

<details>
<summary>答案</summary>

**B**。令牌桶算法以固定速率生成令牌，桶中有积累的令牌时可以处理突发流量（突发量不超过桶容量）。A 是漏桶的特点。C 是固定窗口计数器的特点。令牌桶的关键优势是在限流的同时允许合理的突发。
</details>

---

### 10. 关于延迟双删策略，以下说法正确的是？

A. 延迟时间应该越长越好，确保一定一致
B. 延迟时间应该大于一次读操作的耗时
C. 延迟双删可以保证强一致性
D. 延迟双删的顺序是：删缓存 → 更新DB → 延迟删缓存

<details>
<summary>答案</summary>

**D 和 B 都正确，但 D 更完整**。延迟双删的完整流程是：先删缓存 → 更新数据库 → 延迟再删一次缓存。延迟时间应大于一次读操作的总耗时（读 DB + 写缓存），通常 200-500ms，太长会影响性能。延迟双删只能降低不一致窗口，不能保证强一致性。
</details>

---

## 二、填空题（每空 2 分，共 20 分）

### 1. 缓存穿透的两种核心解决方案是 ____ 和 ____。

<details>
<summary>答案</summary>

**布隆过滤器**；**缓存空对象**（或空值缓存）
</details>

---

### 2. 缓存雪崩中，防止大量 Key 同时过期的最简单方案是在 TTL 上加 ____。

<details>
<summary>答案</summary>

**随机值**（如 TTL + random(0, 60)）
</details>

---

### 3. Redisson 使用 ____ 数据结构存储分布式锁的可重入计数，看门狗默认续期间隔为 lockWatchdogTimeout/3，即 ____ 秒。

<details>
<summary>答案</summary>

**Hash**（key 为锁名，field 为 clientId:threadId，value 为重入次数）；**10 秒**（默认 lockWatchdogTimeout 为 30 秒，30/3=10）
</details>

---

### 4. Redis 分布式锁的解锁 Lua 脚本中，必须先 ____ 再 ____，防止误删别人的锁。

<details>
<summary>答案</summary>

**判断值是否匹配**（`get`）；**删除 key**（`del`）
</details>

---

### 5. Redis 4.0+ 使用 ____ 命令替代 `DEL` 来异步删除大 Key。

<details>
<summary>答案</summary>

**UNLINK**
</details>

---

### 6. Redis 实现排行榜通常使用 ____ 数据结构，____ 命令用于增加分数。

<details>
<summary>答案</summary>

**Zset**（有序集合）；**ZINCRBY**
</details>

---

### 7. Cache Aside 模式的读流程是：先查 ____ → 未命中 → 查 ____ → 写入缓存 → 返回。

<details>
<summary>答案</summary>

**缓存**；**数据库**
</details>

---

## 三、简答题（每题 10 分，共 30 分）

### 1. 缓存穿透、缓存击穿、缓存雪崩分别是什么？各有什么解决方案？（10 分）

<details>
<summary>答案</summary>

**缓存穿透**（3 分）：
- **定义**：请求的数据在缓存和数据库中都不存在，每次请求穿透缓存直接打到数据库
- **方案**：布隆过滤器前置拦截 + 缓存空对象（短 TTL）

**缓存击穿**（3 分）：
- **定义**：热点 Key 在某时刻过期失效，大量并发请求同时打到数据库
- **方案**：互斥锁（强一致场景）或逻辑过期（高可用场景）

**缓存雪崩**（4 分）：
- **定义**：大量 Key 同时过期或 Redis 宕机，导致请求全部打到数据库
- **方案**：TTL 加随机值 + 多级缓存 + Redis 高可用（哨兵/Cluster）+ 熔断降级

**一句话区分**：穿透是"数据不存在"，击穿是"热点过期"，雪崩是"大面积过期/宕机"。
</details>

---

### 2. Redisson 分布式锁的加锁原理是什么？看门狗是怎么工作的？（10 分）

<details>
<summary>答案</summary>

**加锁原理**（6 分）：

Redisson 使用 Lua 脚本（保证原子性）进行加锁：
1. 用 **Hash 数据结构**存储锁：key 为锁名，field 为 `clientId:threadId`，value 为重入计数
2. 如果锁不存在（`exists == 0`），则 `hset` 并设置过期时间
3. 如果锁存在且 field 匹配（可重入），则 `hincrby` 计数 +1 并续期
4. 如果锁被别人持有，返回剩余 TTL，订阅 Pub/Sub 频道等待通知后重试

**看门狗工作原理**（4 分）：

1. 调用 `lock()` 不指定 leaseTime 时自动启动
2. 后台定时任务每隔 `lockWatchdogTimeout/3`（默认 10 秒）执行一次
3. 检查锁是否仍被当前线程持有，如果是则重置过期时间为 `lockWatchdogTimeout`（默认 30 秒）
4. 客户端宕机 → 看门狗停止续期 → 锁自动过期释放（防死锁）

**注意**：指定了 leaseTime 时不会启动看门狗。
</details>

---

### 3. 先更新数据库再删除缓存，在什么极端情况下会导致数据不一致？如何进一步降低不一致窗口？（10 分）

<details>
<summary>答案</summary>

**极端不一致场景**（6 分）：

```
线程A（读）: 查缓存 miss → 查 DB 得到旧值
线程B（写）: 更新 DB 新值 → 删除缓存
线程A（续）: 将旧值写入缓存
→ 结果：缓存中是旧值，DB 中是新值，不一致
```

发生条件：线程 A 读 DB 的耗时 > 线程 B 执行"更新 DB + 删除缓存"的耗时。这个条件概率很低，但理论上存在。

**降低不一致窗口的方案**（4 分）：

1. **延迟双删**：更新 DB 后先删除缓存，延迟 200-500ms 后再删除一次。延迟时间应大于一次读操作的耗时，确保可能写入旧值的线程已经完成
2. **消息队列重试**：删除缓存失败时发到 MQ 异步重试，保证最终删除成功
3. **Canal 监听 Binlog**：通过 Canal 监听 MySQL Binlog，异步删除缓存，彻底解耦

**最推荐**：Canal + MQ 的方案，对业务零侵入且可靠性最高。
</details>

---

## 四、场景题（共 20 分）

### 某电商系统的商品详情页 QPS 约 5 万，使用 Redis 作为缓存。请设计一个完整的缓存方案，需要考虑：缓存穿透、击穿、雪崩的防护，以及缓存与数据库的双写一致性。（20 分）

<details>
<summary>答案</summary>

**整体架构设计**（5 分）：

```
客户端 → CDN → 本地缓存(Caffeine) → Redis → MySQL
                ↑ 读取                ↑ 读取
              5分钟TTL            30分钟TTL(随机)
```

**读流程**（5 分）：

```java
// 1. 本地缓存（兜底，Redis 宕机时仍可用）
String value = caffeineCache.get(key);
if (value != null) return value;

// 2. Redis 缓存
value = redis.get(key);
if (value != null) {
    caffeineCache.put(key, value);
    return value;
}

// 3. 布隆过滤器（防穿透）
if (!bloomFilter.mightContain(key)) {
    return null;  // 拦截不存在的商品ID
}

// 4. 查数据库
value = db.query(key);
if (value == null) {
    redis.setex(key, 60, "");  // 缓存空对象，60秒TTL
} else {
    // TTL 加随机值防雪崩: 30分钟 + 0~60秒
    int ttl = 1800 + ThreadLocalRandom.current().nextInt(60);
    redis.setex(key, ttl, value);
    caffeineCache.put(key, value);
}
return value;
```

**写流程（双写一致性）**（5 分）：

```java
// 方案: 先更新DB + 延迟双删
public void updateProduct(Product product) {
    String key = "product:" + product.getId();

    // 1. 先删缓存
    redis.del(key);
    caffeineCache.invalidate(key);

    // 2. 更新数据库
    db.update(product);

    // 3. 延迟双删（200ms后再次删除，防止并发读入旧值）
    executor.schedule(() -> {
        redis.del(key);
    }, 200, TimeUnit.MILLISECONDS);

    // 4. 发送消息到MQ异步更新Canal（最终兜底）
    mq.send("cache-invalidate", key);
}
```

**各问题的防护方案总结**（5 分）：

| 问题 | 防护方案 |
|------|---------|
| 穿透 | 布隆过滤器 + 缓存空对象 |
| 击穿 | 互斥锁（商品详情更新不频繁，可用互斥锁保证一致性） |
| 雪崩 | TTL 随机化 + 本地缓存兜底 + Redis 哨兵高可用 |
| 一致性 | 先更新DB后删缓存 + 延迟双删 + Canal 监听 Binlog |
</details>

---

## 五、附加题（20 分）

### 在分布式锁的场景中，Redisson 的看门狗机制和 RedLock 算法分别解决了什么问题？RedLock 为什么在业界存在争议？如果是你，在实际项目中会如何选择？

<details>
<summary>答案</summary>

**看门狗机制解决的问题**（6 分）：

看门狗解决的是**锁持有者业务执行时间超过锁过期时间**的问题：
- 如果没有看门狗，业务执行到一半锁自动过期，其他线程可以获取锁，导致两个线程同时持有锁
- 看门狗通过定期续期（默认每 10 秒续期到 30 秒）保证业务执行期间锁不会过期
- 客户端宕机时看门狗自动停止，锁会正常过期释放，不会死锁

**RedLock 算法解决的问题**（6 分）：

RedLock 解决的是**Redis 单节点/主从切换导致的锁安全问题**：
- 单节点故障：主节点加锁后宕机，锁信息丢失，从节点升主后其他客户端可以加锁
- 主从切换：客户端 A 在主节点加锁，主节点宕机前未同步到从节点，从节点升主后客户端 B 可以加同一把锁

RedLock 方案：向 N 个（通常 5 个）独立的 Redis 节点同时请求加锁，超过半数（N/2+1）加锁成功才算整体加锁成功。

**RedLock 的争议**（4 分）：

Martin Kleppmann 在 2016 年发文质疑 RedLock 的安全性：
1. **GC 停顿问题**：客户端加锁后发生长时间 GC 停顿，锁过期后被其他客户端获取，GC 恢复后两个客户端同时持锁
2. **时钟跳跃问题**：依赖系统时钟的过期时间不可靠，NTP 时间同步可能导致锁提前过期
3. **分布式系统理论**：RedLock 试图用异步复制系统实现强一致性锁，但 CAP 定理决定了这不可能完美

Antirez（Redis 作者）反驳了这些观点，认为实际场景中 GC 停顿和时钟跳跃是可控的。

**实际项目选择**（4 分）：

1. **大多数场景**：单节点 Redis + Redisson（看门狗 + 可重入）已经足够。Redisson 本身的可靠性在绝大多数业务场景下是满足需求的
2. **需要更高安全保证**：Redis Cluster + Redisson。Cluster 至少 3 主 3 从，主从切换时锁丢失的概率已经很低
3. **极端安全场景**（如金融交易）：考虑使用 etcd 或 ZooKeeper 实现分布式锁，因为它们使用 Raft 协议，天然保证强一致性
4. **不推荐 RedLock**：实现复杂、争议大、性能开销高（N 倍网络开销），性价比不高
</details>

---

## 评分参考

| 题型 | 分值 | 知识点覆盖 |
|------|------|-----------|
| 选择题 | 30 分 | 穿透/击穿/雪崩定义、Cache Aside、Lua 原子性、看门狗、大Key、Pipeline、令牌桶、延迟双删 |
| 填空题 | 20 分 | 布隆过滤器、TTL随机值、Hash结构、10秒续期、UNLINK、Zset/ZINCRBY |
| 简答题 | 30 分 | 三大问题区分与方案、Redisson原理+看门狗、双写不一致场景+延迟双删 |
| 场景题 | 20 分 | 完整缓存方案设计（读流程+写流程+多问题防护） |
| 附加题 | 20 分 | 看门狗 vs RedLock、RedLock 争议、实际选型建议 |

**高频错题对应知识点**：穿透vs击穿vs雪崩的定义区分（选择题 1-3）、看门狗启动条件（选择题 6）、先更新DB后删缓存的一致性问题（选择题 3、简答题 3）

> 如果某些题目做错，回到 [Redis 缓存实战与应用场景](./Redis-cache-practice.md) 对应章节复习。