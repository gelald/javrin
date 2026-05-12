# MySQL 阶段三：事务与锁 · 练习题

> **建议用时**：60-70 分钟
> **总分**：100 分 + 附加题 20 分
> **及格线**：70 分（面试准备建议达到 85 分+）

> **建议**：基础部分达到 85 分以上再进入下一阶段。如果某些题目做错，回到 [MySQL 事务与锁](./MySQL-transaction-lock.md) 对应章节复习。

---

## 一、基础选择题（每题 5 分，共 25 分）

### 题目 1
**关于 ACID 特性及其实现机制，以下说法正确的是？**

A. 持久性通过 Undo Log 实现
B. 原子性通过 Redo Log 实现
C. 隔离性通过 MVCC 和锁机制共同实现
D. 一致性由单一日志机制保证

<details>
<summary>📋 答案与解析</summary>

**答案：C. 隔离性通过 MVCC 和锁机制共同实现**

- A 错误：持久性通过 **Redo Log** 实现，Undo Log 实现原子性
- B 错误：原子性通过 **Undo Log** 实现
- C 正确：隔离性通过 MVCC（快照读）和锁机制（当前读）共同保证
- D 错误：一致性是原子性、隔离性、持久性三者共同保证的结果，不是单一机制

</details>

---

### 题目 2
**关于 MVCC 中的 ReadView，以下说法错误的是？**

A. RC 隔离级别下每次 SELECT 都会创建新的 ReadView
B. RR 隔离级别下只在第一次 SELECT 时创建 ReadView
C. ReadView 的 m_ids 包含所有已提交事务的 ID
D. 如果 trx_id < min_trx_id，则该版本对当前事务可见

<details>
<summary>📋 答案与解析</summary>

**答案：C. ReadView 的 m_ids 包含所有已提交事务的 ID**

- m_ids 包含的是创建 ReadView 时所有**活跃（未提交）**事务的 ID 列表，不是已提交的
- 已提交的事务不在 m_ids 中
- A、B 正确描述了 RC 和 RR 的区别
- D 正确：trx_id 小于活跃事务的最小 ID，说明在创建 ReadView 之前就已提交，所以可见

</details>

---

### 题目 3
**假设有索引值 5、10、15、20，在 RR 级别下执行 `SELECT * FROM t WHERE c = 10 FOR UPDATE`（c 为普通索引），以下关于加锁范围说法正确的是？**

A. 只锁住 c=10 这条记录
B. 锁住 (5, 10] 的 Next-Key Lock
C. 锁住 (5, 10] 的 Next-Key Lock 和 (10, 15) 的 Gap Lock
D. 锁住整个表

<details>
<summary>📋 答案与解析</summary>

**答案：C. 锁住 (5, 10] 的 Next-Key Lock 和 (10, 15) 的 Gap Lock**

普通索引等值查询时：

1. 向右遍历到第一个不满足条件的值 15，Next-Key Lock (10, 15] 退化为 Gap Lock (10, 15)
2. 左侧加上 Next-Key Lock (5, 10]
3. 同时在主键索引上锁住 c=10 对应的行（Record Lock）

- A 缺少了间隙锁的范围
- B 缺少了右侧的 Gap Lock
- D 过于极端（有索引不会锁表）

</details>

---

### 题目 4
**关于 InnoDB 的意向锁，以下说法正确的是？**

A. 意向锁与行级锁互斥
B. 意向锁需要手动通过 SQL 语句获取
C. 意向锁的作用是快速判断表中是否存在行级锁
D. IS 锁和 IX 锁互斥

<details>
<summary>📋 答案与解析</summary>

**答案：C. 意向锁的作用是快速判断表中是否存在行级锁**

- A 错误：意向锁之间兼容，意向锁与行锁也兼容，只与表级 S/X 锁冲突
- B 错误：意向锁是 InnoDB 在加行锁前**自动**添加的表级锁，不需要手动获取
- C 正确：意向锁的设计目的是在加表锁时快速判断是否有行锁，无需逐行检查
- D 错误：IS 和 IX 互相兼容

</details>

---

### 题目 5
**关于 Redo Log 的 `innodb_flush_log_at_trx_commit` 参数，以下说法正确的是？**

A. 设置为 0 时，每次事务提交都会 fsync 到磁盘
B. 设置为 1 时，是安全性最高的配置，不会丢失数据
C. 设置为 2 时，MySQL 崩溃不会丢数据，OS 崩溃才会丢
D. B 和 C 都正确

<details>
<summary>📋 答案与解析</summary>

**答案：B. 设置为 1 时，是安全性最高的配置，不会丢失数据**

- A 错误：设置为 0 时，每秒刷盘一次，不是每次提交都 fsync
- B 正确：设置为 1 时，每次事务提交都调用 fsync 将 Redo Log 写入磁盘，是最安全的配置
- C 的描述不完整：设置为 2 时每次提交写入 OS cache，MySQL 崩溃不丢数据，但 OS 崩溃或断电可能丢数据

</details>

---

## 二、填空题（每空 3 分，共 15 分）

### 题目 6
InnoDB 为每行记录添加两个隐藏字段，______ 记录最近修改该行的事务 ID，______ 是回滚指针，指向 Undo Log 中的上一个版本。

<details>
<summary>📋 答案与解析</summary>

**答案：DB_TRX_ID；DB_ROLL_PTR**

- `DB_TRX_ID`（6 字节）：记录最后一次修改（INSERT/UPDATE）该行的事务 ID
- `DB_ROLL_PTR`（7 字节）：回滚指针，指向 Undo Log 中该行的上一版本，构成版本链

</details>

---

### 题目 7
InnoDB 在 RR 级别下，行锁的默认加锁单位是 ______ Lock，它等于 Record Lock 加上 ______ Lock。

<details>
<summary>📋 答案与解析</summary>

**答案：Next-Key；Gap**

Next-Key Lock 是 InnoDB 在 RR 级别下的默认加锁方式，它锁住的是一个左开右闭区间 (前一个索引值, 当前索引值]，等于 Record Lock（锁住当前记录）+ Gap Lock（锁住记录前面的间隙）。

</details>

---

### 题目 8
MySQL 保证 Redo Log 和 Binlog 一致性的机制叫 ______ 提交。

<details>
<summary>📋 答案与解析</summary>

**答案：两阶段**

两阶段提交流程：Redo Log 写入并标记为 prepare → Binlog 写入 → Redo Log 标记为 commit。任何一步失败都能通过恢复机制保证两者一致。

</details>

---

### 题目 9
`UPDATE t SET name = 'x' WHERE status = 1` 如果 status 列没有索引，InnoDB 会对______加 Next-Key Lock，等效于锁______。

<details>
<summary>📋 答案与解析</summary>

**答案：每一行（所有记录）；表**

当 UPDATE/DELETE 的 WHERE 条件没有命中索引时，InnoDB 走全表扫描，对每一行记录都加 Next-Key Lock，等效于锁住整张表。这就是为什么 UPDATE 必须确保走索引。

</details>

---

### 题目 10
Redo Log 采用______写的方式记录日志，这是它比直接写数据文件更快的核心原因。

<details>
<summary>📋 答案与解析</summary>

**答案：顺序（或循环顺序）**

Redo Log 是顺序追加写入文件末尾（循环写），不需要寻道定位。而数据文件是随机写，需要找到对应页的位置再修改。顺序写的性能远高于随机写。

</details>

---

## 三、简答题（每题 10 分，共 30 分）

### 题目 11
**请详细说明 RC 和 RR 隔离级别下 MVCC 的 ReadView 创建时机有什么不同？这导致了什么行为差异？**

<details>
<summary>📋 答案与解析</summary>

**RC（读已提交）**：每次执行 SELECT 都会创建一个新的 ReadView。

**RR（可重复读）**：只在事务中第一次执行 SELECT 时创建 ReadView，后续所有 SELECT 复用同一个 ReadView。

**行为差异**：

- RC 下，每次 SELECT 创建新 ReadView，能感知到其他事务在两次 SELECT 之间提交的修改，因此允许**不可重复读**现象
- RR 下，ReadView 在整个事务中保持不变，即使其他事务已经提交了修改，当前事务仍然看到的是第一次 SELECT 时的快照，因此保证了**可重复读**

**举例**：
```
时间  | 事务 A（RR）                     | 事务 B
t1   | SELECT balance FROM t WHERE id=1  |
     | → 看到 100                       |
t2   |                                  | UPDATE t SET balance=200 WHERE id=1
     |                                  | COMMIT
t3   | SELECT balance FROM t WHERE id=1  |
     | → 仍然看到 100（RR）或看到 200（RC）
```

</details>

---

### 题目 12
**请解释 Next-Key Lock 的加锁规则，并结合等值查询命中唯一索引的场景说明退化情况。**

<details>
<summary>📋 答案与解析</summary>

**Next-Key Lock 加锁规则**：

1. **基本单位**：InnoDB 的加锁基本单位是 Next-Key Lock（左开右闭区间）
2. **访问对象**：查找过程中访问到的对象才会加锁
3. **优化 1**：等值查询中，唯一索引命中记录时，Next-Key Lock **退化为 Record Lock**
4. **优化 2**：等值查询中，向右遍历到第一个不满足条件的值时，Next-Key Lock **退化为 Gap Lock**

**唯一索引等值命中的场景**：

```sql
-- 假设 id 是主键（唯一索引），已有值 5, 10, 15, 20
SELECT * FROM t WHERE id = 10 FOR UPDATE;
```

按照规则：
1. 首先加 Next-Key Lock (5, 10]
2. 命中记录后，根据**优化 1**，退化为 Record Lock，只锁住 id=10 这一行
3. 不会锁住任何间隙

所以最终只加了 id=10 的 Record Lock，其他事务可以自由插入 id=6,7,8,9 等值。

</details>

---

### 题目 13
**请描述一个完整的死锁场景（包含 SQL 和时间线），并说明 InnoDB 如何检测和处理这个死锁。**

<details>
<summary>📋 答案与解析</summary>

**死锁场景**：

| 时间 | 事务 A | 事务 B |
|------|--------|--------|
| t1 | `BEGIN;` | |
| t2 | `UPDATE t SET name='a' WHERE id=1;` ✅ 获取 id=1 的 X 锁 | |
| t3 | | `BEGIN;` |
| t4 | | `UPDATE t SET name='b' WHERE id=2;` ✅ 获取 id=2 的 X 锁 |
| t5 | `UPDATE t SET name='c' WHERE id=2;` ⏳ 等待 id=2 的 X 锁 | |
| t6 | | `UPDATE t SET name='d' WHERE id=1;` ⏳ 等待 id=1 的 X 锁 → **死锁** |

**检测机制**：InnoDB 通过**等待图（Wait-For Graph）** 检测死锁。每个事务是节点，等待关系是边。如果图中出现环，说明存在死锁。本例中：A 等待 B（id=2），B 等待 A（id=1），形成环。

**处理方式**：InnoDB 自动选择一个**代价最小**的事务（通常是修改数据量最少的那个）进行回滚，释放其持有的所有锁，让另一个事务可以继续执行。

**预防策略**：固定更新顺序（都先更新 id=1 再更新 id=2）、缩短事务长度、确保 SQL 走索引。

</details>

---

## 四、场景题（每题 15 分，共 30 分）

### 题目 14
**线上系统出现频繁死锁告警，以下是死锁日志关键信息（简化）：**

```
Transaction 1:持有锁: id=5 (X Lock)
等待锁: id=8 (X Lock, 等待事务2释放)

Transaction 2:
持有锁: id=8 (X Lock)
等待锁: id=5 (X Lock, 等待事务1释放)
```

**请回答以下问题**：

1. 这属于什么类型的死锁？画出等待关系图
2. 分析可能的原因（给出至少 3 种）
3. 给出具体的解决方案

<details>
<summary>📋 答案与解析</summary>

**1. 死锁类型**：经典的**交叉更新死锁**。

等待关系图：
```
T1(id=5) ──等待──→ T2(id=8)
    ↑                    │
    └─────等待───────────┘
形成环 → 死锁
```

**2. 可能原因**：

- **原因一：更新顺序不一致**。业务代码中不同路径更新同一批记录时，没有按固定顺序（如按 id 升序）。路径 A 先更新 id=5 再更新 id=8，路径 B 先更新 id=8 再更新 id=5
- **原因二：事务过长**。事务中包含了耗时操作（RPC 调用、复杂查询），增大了锁持有的时间窗口
- **原因三：缺少索引导致锁升级**。如果 WHERE 条件没有走索引，行锁退化为表锁，更容易产生死锁

**3. 解决方案**：

- **方案一（推荐）：固定更新顺序**。所有业务代码按 id 升序更新，例如先更新 id=5 再更新 id=8
```java
// 修改前
accountMapper.updateBalance(fromId, -amount);
accountMapper.updateBalance(toId, +amount);

// 修改后：确保 fromId < toId
long first = Math.min(fromId, toId);
long second = Math.max(fromId, toId);
accountMapper.updateBalance(first, first == fromId ? -amount : +amount);
accountMapper.updateBalance(second, second == fromId ? -amount : +amount);
```
- **方案二：缩短事务**。将事务中的非数据库操作（如发送消息、调用接口）移到事务外
- **方案三：添加索引**。用 `EXPLAIN` 确认更新 SQL 走了索引，避免锁升级

</details>

---

### 题目 15
**你负责一个电商订单系统，有以下业务场景：**

```
用户下单时需要：
1. 检查商品库存是否充足（SELECT stock FROM goods WHERE id=100）
2. 扣减库存（UPDATE goods SET stock = stock - 1 WHERE id=100）
3. 创建订单（INSERT INTO orders ...）
```

**问题**：在并发下，100 个用户同时购买同一商品，可能出现什么问题？请分别用以下方式解决：

1. 使用悲观锁（FOR UPDATE）的方式
2. 使用乐观锁（版本号）的方式
3. 分析两种方案在高并发下的性能差异

<details>
<summary>📋 答案与解析</summary>

**并发问题**：如果不加任何控制，多个事务同时读取 stock=10，都判断充足，都执行 stock-1，最终 stock 可能变成负数（**超卖问题**）。

**1. 悲观锁方案**：

```sql
BEGIN;
-- 先加锁再查询（当前读）
SELECT stock FROM goods WHERE id = 100 FOR UPDATE;
-- 应用层判断 stock > 0
UPDATE goods SET stock = stock - 1 WHERE id = 100;
INSERT INTO orders (...);
COMMIT;
```

原理：`FOR UPDATE` 对 id=100 加 X 锁（Record Lock），其他事务必须等待，串行执行。

**2. 乐观锁方案**：

```sql
-- 方式一：利用 WHERE 条件原子性（推荐）
UPDATE goods SET stock = stock - 1
WHERE id = 100 AND stock > 0;
-- 检查 affected rows：如果为 0 说明库存不足
```

```sql
-- 方式二：版本号方式
-- 表结构添加 version 字段
UPDATE goods SET stock = stock - 1, version = version + 1
WHERE id = 100 AND stock > 0 AND version = #{version};
-- 检查 affected rows：如果为 0 说明并发冲突，需要重试
```

**3. 性能差异分析**：

| 维度 | 悲观锁 | 乐观锁 |
|------|--------|--------|
| 并发模型 | 串行等待 | 并发执行，冲突重试 |
| 适用场景 | 写多读少，冲突频繁 | 读多写少，冲突较少 |
| 性能瓶颈 | 锁等待时间长，TPS 受限 | 高冲突时重试开销大 |
| 实现复杂度 | 简单（数据库原生支持） | 中等（需处理重试逻辑） |
| 死锁风险 | 有 | 无 |

**电商场景建议**：对于库存扣减这种热点数据，推荐使用**乐观锁 + Redis 预扣减**的方案。先在 Redis 中原子扣减库存（利用 `DECR` 命令的原子性），成功的请求再异步落库。

</details>

---

## 五、附加题（每题 10 分，共 20 分）

### 附加题 1
**请画出 InnoDB 两阶段提交的完整流程图，并解释如果 MySQL 在写入 Binlog 之后、Redo Log commit 之前崩溃，恢复时会怎样处理？**

<details>
<summary>📋 答案与解析</summary>

**两阶段提交流程**：

```
SQL 执行
  ↓
① 修改 Buffer Pool 中的数据页
  ↓
② 写入 Redo Log（状态: prepare）  ← 阶段一
  ↓
③ 写入 Binlog
  ↓
④ Redo Log 改为 commit 状态       ← 阶段二
  ↓
⑤ 返回客户端成功
```

**崩溃恢复逻辑**：

- 如果在步骤 ② 之后、步骤 ③ 之前崩溃：Redo Log 中有 prepare 记录但没有对应的 Binlog → **回滚事务**（因为 Binlog 没有，从库不会同步这个操作，主库也不能提交）
- 如果在步骤 ③ 之后、步骤 ④ 之前崩溃（即题目场景）：Redo Log 有 prepare 记录，且 Binlog 中有完整记录 → **提交事务**（因为 Binlog 已经写入，从库会同步，主库也必须提交以保持一致）

这个判断依据是：崩溃恢复时扫描最后一个 checkpoint 之后的 Redo Log，对处于 prepare 状态的事务，去 Binlog 中查找对应的 XID，找到了就提交，找不到就回滚。

</details>

---

### 附加题 2
**线上发现一个长事务运行了 3 小时未提交，请分析它可能带来的影响（至少列出 4 种），并给出监控和处理的最佳实践。**

<details>
<summary>📋 答案与解析</summary>

**长事务的影响**：

1. **Undo Log 膨胀**：长事务的 ReadView 需要引用旧的 Undo Log 版本，导致 purge 线程无法清理这些版本，Undo 表空间持续膨胀
2. **锁持有时间过长**：长事务持有的行锁/表锁阻塞其他事务，导致大量锁等待甚至超时
3. **Buffer Pool 污染**：长事务可能扫描大量数据页，将热点数据挤出 Buffer Pool
4. **主从延迟**：长事务涉及的 Binlog 在事务提交后才发送给从库，大事务可能导致从库延迟
5. **连接池耗尽**：长事务占用数据库连接不释放，高并发时可能导致连接池耗尽

**监控和处理最佳实践**：

```sql
-- 1. 查看长事务
SELECT trx_id, trx_state, trx_started,
       TIMESTAMPDIFF(SECOND, trx_started, NOW()) AS duration_sec,
       trx_query
FROM information_schema.innodb_trx
WHERE TIMESTAMPDIFF(SECOND, trx_started, NOW()) > 60
ORDER BY duration_sec DESC;

-- 2. 查看锁等待
SELECT * FROM performance_schema.data_lock_waits;

-- 3. 如果必须 kill
KILL <trx_mysql_thread_id>;
```

**预防措施**：
- 设置 `innodb_lock_wait_timeout`（默认 50s）合理值
- 应用层使用 `@Transactional(timeout = 30)` 限制事务超时
- 将非数据库操作（RPC、文件操作）移到事务外
- 监控告警：事务超过 N 秒自动告警

</details>

---

## 📊 分数统计

| 题型 | 题号 | 分值 | 得分 |
|------|------|------|------|
| 基础选择题 | 1-5 | 25 分 | |
| 填空题 | 6-10 | 15 分 | |
| 简答题 | 11-13 | 30 分 | |
| 场景题 | 14-15 | 30 分 | |
| **合计** | | **100 分** | |
| 附加题 | 附加 1-2 | 20 分 | |
| **总分** | | **120 分** | |

---

> **建议**：基础部分达到 85 分以上再进入下一阶段。如果某些题目做错，回到 [MySQL 事务与锁](./MySQL-transaction-lock.md) 对应章节复习。