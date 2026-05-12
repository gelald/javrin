# MySQL 阶段三：事务与锁 · 面试指南

> **面试岗位**：Java 后端开发（中高级）
> **准备时长**：1 天（阶段三学习完成后）
> **重点级别**：⭐⭐⭐⭐⭐（面试最高频模块，必考）

> 如果某些知识不太清楚，回到 [MySQL 事务与锁](./MySQL-transaction-lock.md) 对应章节复习。

---

## 📋 目录

1. [高频面试题 Top10](#一、高频面试题-top10)
2. [面试话术模板](#二、面试话术模板)
3. [追问与连环问](#三、追问与连环问)
4. [易错点避坑指南](#四、易错点避坑指南)
5. [源码路径速查](#五、源码路径速查)

---

## 一、高频面试题 Top10

### Q1: MySQL 事务的 ACID 分别是怎么实现的？⭐⭐⭐⭐⭐

**参考答案**：

| 特性 | 实现机制 | 原理 |
|------|---------|------|
| 原子性 | **Undo Log** | 记录数据修改前的值，回滚时用 Undo Log 恢复 |
| 持久性 | **Redo Log** | WAL 机制，先写日志再写磁盘，崩溃时用 Redo Log 恢复 |
| 隔离性 | **MVCC + 锁** | 快照读走 MVCC（不加锁），当前走走锁机制 |
| 一致性 | **前三者的共同结果** | 是目标而非实现手段 |

**加分回答**：
> 一致性不是一个独立的实现机制，它是原子性、隔离性、持久性共同保证的最终效果。同时还需要应用层的约束（如唯一索引、外键、CHECK 约束）来配合。

---

### Q2: MVCC 是怎么实现的？ReadView 的可见性规则是什么？⭐⭐⭐⭐⭐

**参考答案**：

MVCC 通过三个组件实现：

**1. 隐藏字段**：每行记录有 `DB_TRX_ID`（最后修改的事务 ID）和 `DB_ROLL_PTR`（回滚指针）

**2. Undo Log 版本链**：每次修改的旧版本通过 `roll_ptr` 串成链表

**3. ReadView**：执行快照读时创建，包含四个关键字段：
- `m_ids`：创建时所有活跃事务 ID
- `min_trx_id`：活跃事务最小 ID
- `max_trx_id`：下一个待分配的事务 ID
- `creator_trx_id`：创建者的事务 ID

**可见性判断**（按顺序检查）：
1. `trx_id == creator` → 可见（自己改的）
2. `trx_id < min_trx_id` → 可见（已提交）
3. `trx_id >= max_trx_id` → 不可见（ReadView 之后的事务）
4. `trx_id in m_ids` → 不可见（未提交）
5. 不在 `m_ids` 中 → 可见（已提交）

---

### Q3: RC 和 RR 隔离级别有什么区别？底层实现有什么不同？⭐⭐⭐⭐⭐

**参考答案**：

| 维度 | RC（读已提交） | RR（可重复读） |
|------|---------------|---------------|
| 脏读 | 避免 | 避免 |
| 不可重复读 | 允许 | 避免 |
| 幻读 | 允许 | 大部分避免 |
| ReadView 创建时机 | **每次 SELECT 创建新的** | **第一次 SELECT 创建，后续复用** |
| Gap Lock | 不使用 | 使用 |
| MySQL 默认 | 否 | **是** |

**底层实现差异**：
- RC 每次 SELECT 创建新 ReadView → 能看到其他事务最新提交的数据
- RR 复用第一次的 ReadView → 始终看到事务开始时的快照

**面试加分点**：RR 级别通过 Next-Key Lock 在当前读场景下也能避免幻读。但先快照读后当前读的混合场景可能出现幻读。

---

### Q4: InnoDB 有哪些锁？Next-Key Lock 是什么？⭐⭐⭐⭐⭐

**参考答案**：

**锁分类**：

| 锁类型 | 粒度 | 说明 |
|--------|------|------|
| 共享锁（S）/ 排他锁（X） | 行/表 | S 与 S 兼容，X 与任何锁互斥 |
| Record Lock | 行 | 锁住索引上的单条记录 |
| Gap Lock | 间隙 | 锁住记录之间的间隙，防止 INSERT |
| Next-Key Lock | 行+间隙 | **Record Lock + Gap Lock**，左开右闭区间 |
| 意向锁（IS/IX） | 表 | 快速判断表中是否有行锁 |
| 插入意向锁 | 间隙 | INSERT 时在间隙中加的轻量锁 |
| 自增锁 | 表 | AUTO_INCREMENT 列的自增保护 |

**Next-Key Lock** 是 InnoDB 在 RR 级别下行锁的默认加锁方式。锁住的范围是 `(前一个索引值, 当前索引值]`。

**加锁规则**：
1. 基本单位是 Next-Key Lock
2. 等值查询命中唯一索引 → 退化为 Record Lock
3. 等值查询最后一个不满足条件的值 → 退化为 Gap Lock

---

### Q5: 怎么分析一个 SQL 加了什么锁？⭐⭐⭐⭐

**参考答案**：

分析加锁情况的思路：

**步骤 1**：确认隔离级别（RR 还是 RC）
**步骤 2**：确认 WHERE 条件是否命中索引
**步骤 3**：根据索引类型（主键/唯一/普通/无索引）和查询类型（等值/范围）判断

**快速判断表**（RR 级别，命中索引）：

| 场景 | 加锁范围 |
|------|---------|
| 唯一索引等值命中 | Record Lock（只锁该行） |
| 唯一索引等值未命中 | Gap Lock（间隙） |
| 普通索引等值命中 | Next-Key Lock + Gap Lock（两边） |
| 范围查询 | Next-Key Lock（逐个区间加锁） |
| 无索引 | 全部 Next-Key Lock（等效锁表） |

**验证方法**：
```sql
-- MySQL 8.0
SELECT * FROM performance_schema.data_locks;
SELECT * FROM performance_schema.data_lock_waits;
```

---

### Q6: 什么是死锁？如何预防和处理？⭐⭐⭐⭐

**参考答案**：

**死锁**：两个或多个事务互相等待对方持有的锁，导致都无法继续。

**InnoDB 处理机制**：
- 通过**等待图（Wait-For Graph）** 自动检测死锁
- 自动回滚代价最小（修改数据量最少）的事务

**预防策略**（按优先级）：

1. **固定加锁顺序**：所有事务按同一顺序（如 id 升序）获取锁
2. **缩短事务**：将非 DB 操作移出事务，减少锁持有时间
3. **确保走索引**：避免行锁升级为表锁
4. **降低隔离级别**：业务允许时用 RC 替代 RR，减少 Gap Lock
5. **设置锁超时**：`innodb_lock_wait_timeout`（默认 50s）

---

### Q7: Redo Log 和 Binlog 有什么区别？两阶段提交是什么？⭐⭐⭐⭐⭐

**参考答案**：

| 维度 | Redo Log | Binlog |
|------|----------|--------|
| 层级 | InnoDB 引擎层 | MySQL Server 层 |
| 内容 | 物理日志（页修改） | 逻辑日志（SQL/行变更） |
| 写入方式 | 循环写，固定大小 | 追加写，文件写满换新 |
| 用途 | 崩溃恢复 | 主从复制、数据备份 |

**两阶段提交**：保证 Redo Log 和 Binlog 的一致性。

```
Redo Log prepare → 写入 Binlog → Redo Log commit
```

崩溃恢复时，对 prepare 状态的 Redo Log 去 Binlog 中查找对应 XID：
- 找到 → 提交（Binlog 已有，必须提交保持主从一致）
- 找不到 → 回滚（Binlog 没有不能提交）

---

### Q8: InnoDB 的 RR 级别能不能完全避免幻读？⭐⭐⭐⭐

**参考答案**：

**核心结论**：InnoDB 的 RR 级别通过 MVCC + Next-Key Lock 在**绝大多数场景**下避免了幻读，但并非 100%。

**避免幻读的机制**：
- **快照读**：MVCC 保证始终读到事务开始时的快照，不会看到新插入的行
- **当前读**：Next-Key Lock 锁住范围，阻止其他事务在范围内插入新行

**例外场景**（可能幻读）：
```sql
-- 事务 A
SELECT * FROM t WHERE id = 5;           -- 快照读：不存在
-- 事务 B: INSERT id=5, COMMIT
UPDATE t SET name='x' WHERE id = 5;     -- 当前读：修改成功
SELECT * FROM t WHERE id = 5;           -- 快照读：现在能看到了
```

先快照读后当前读这种混合场景下，当前读更新了版本链上的数据，后续快照读就能看到了。

---

### Q9: 为什么 UPDATE 一定要走索引？不走索引会怎样？⭐⭐⭐⭐

**参考答案**：

不走索引的后果：

1. **全表扫描加锁**：InnoDB 对扫描到的每一行加 Next-Key Lock，等效于**锁表**
2. **性能断崖式下降**：所有对该表的并发写操作都被阻塞
3. **死锁概率飙升**：锁范围越大，交叉等待的概率越高

**验证方法**：
```sql
EXPLAIN UPDATE t SET name='x' WHERE status = 1;
-- 确保 type 列不是 ALL（全表扫描）
```

> **面试话术**：InnoDB 的行锁是加在索引上的，不是加在数据行上。WHERE 条件没有命中索引时，必须扫描全表，对每一行加锁，等效于表锁。这是线上并发问题的常见根因。

---

### Q10: `innodb_flush_log_at_trx_commit` 和 `sync_binlog` 两个参数怎么设置？⭐⭐⭐

**参考答案**：

| 参数 | 值 | 安全性 | 性能 | 建议 |
|------|---|--------|------|------|
| `innodb_flush_log_at_trx_commit` | 0 | 低（可能丢 1s 数据） | 高 | |
| | **1** | **最高（不丢数据）** | 中 | **主库** |
| | 2 | 中（OS 崩溃丢） | 高 | 从库 |
| `sync_binlog` | 0 | 低 | 高 | |
| | **1** | **最高** | 中 | **主库** |
| | N（N>1） | 中 | 高 | 从库 |

**生产建议**：
- **主库**：`innodb_flush_log_at_trx_commit=1` + `sync_binlog=1`（双 1 配置，最安全）
- **从库**：可以设为 2 / 100，牺牲安全性换取性能
- **非核心业务**：可以适当降低安全级别提升性能

---

## 二、面试话术模板

### 2.1 事务与 ACID

> MySQL 事务的 ACID 中，原子性通过 Undo Log 实现，持久性通过 Redo Log 实现，隔离性通过 MVCC 和锁机制实现。一致性是前三者的共同结果，不是独立的实现机制。MVCC 解决了快照读的并发问题，锁机制解决了当前读的并发问题。

### 2.2 MVCC 原理

> MVCC 的实现依赖三个组件：隐藏字段（trx_id 和 roll_ptr）、Undo Log 版本链、ReadView。快照读时创建 ReadView，通过版本链回溯找到对当前事务可见的版本。RC 和 RR 的区别就在于 ReadView 的创建时机：RC 每次 SELECT 创建新的，RR 复用第一次的。

### 2.3 锁机制

> InnoDB 在 RR 级别下的默认加锁单位是 Next-Key Lock，等于 Record Lock 加 Gap Lock。加锁有退化规则：唯一索引等值命中退化为 Record Lock，等值查询最后一个不满足条件的值退化为 Gap Lock。意向锁是表级锁，用于快速判断表中是否有行锁，不需要手动获取。

### 2.4 日志系统

> InnoDB 使用 WAL 机制，先写 Redo Log 再刷数据页。Redo Log 保证持久性（崩溃恢复），Undo Log 保证原子性（回滚）并支持 MVCC。Redo Log 和 Binlog 通过两阶段提交保证一致性：prepare → Binlog → commit，崩溃时根据 Binlog 中是否存在对应 XID 来决定提交还是回滚。

---

## 三、追问与连环问

### 追问链 1：事务隔离级别

```
面试官：MySQL 有哪些事务隔离级别？
你：四种，读未提交、读已提交、可重复读、串行化。MySQL 默认 RR。

面试官：RR 和 RC 的底层区别？
你：ReadView 创建时机不同。RC 每次 SELECT 创建，RR 复用第一次的。

面试官：RR 能完全避免幻读吗？
你：大多数场景可以，通过 MVCC 解决快照读的幻读，Next-Key Lock 解决当前读的幻读。
    但先快照读后当前读的混合场景可能出现幻读。

面试官：那你生产环境用 RC 还是 RR？
你：很多互联网公司选择 RC。原因是 RC 不加 Gap Lock，并发性能更好，
    而且死锁概率更低。幻读问题可以在业务层处理。
```

### 追问链 2：MVCC 深入

```
面试官：MVCC 的 ReadView 中 m_ids 是什么？
你：创建 ReadView 时所有活跃（未提交）事务的 ID 列表。

面试官：如果版本链中没有可见的版本怎么办？
你：说明这行数据对当前事务完全不可见，查询结果中不包含该行。

面试官：Undo Log 什么时候清理？
你：当所有活跃事务都不再需要某个 undo log 版本时，由 purge 线程清理。
    长事务会导致 Undo Log 无法清理而膨胀。

面试官：那你怎么监控长事务？
你：查询 information_schema.innodb_trx，设置事务超时时间，
    应用层用 @Transactional(timeout) 限制。
```

### 追问链 3：锁与死锁

```
面试官：说一下 InnoDB 的锁类型？
你：行级锁有 Record Lock、Gap Lock、Next-Key Lock、插入意向锁。
    表级锁有意向锁（IS/IX）、自增锁。Next-Key Lock 是默认加锁单位。

面试官：什么时候行锁会变成表锁？
你：UPDATE/DELETE 的 WHERE 条件没有命中索引时，走全表扫描，
    每行都加 Next-Key Lock，等效于锁表。

面试官：线上频繁死锁怎么办？
你：先看死锁日志确认涉及的 SQL 和锁，然后排查：
    1. 更新顺序是否一致
    2. 是否走了索引
    3. 事务是否过长
    解决方案：固定更新顺序、缩短事务、确保走索引。

面试官：有没有遇到过实际的死锁案例？
你：（结合实际经验回答，或使用阶段三练习题场景题的案例）
```

---

## 四、易错点避坑指南

### 易错点 1：误认为 RR 级别完全避免幻读

| 错误认知 | 正确理解 |
|---------|---------|
| RR 级别绝对不会出现幻读 | 大多数场景避免，但混合快照读+当前读可能出现 |
| MVCC 单独解决所有幻读 | 快照读走 MVCC，当前走走 Next-Key Lock，两者配合 |

### 易错点 2：混淆 Undo Log 和 Redo Log 的作用

| 错误认知 | 正确理解 |
|---------|---------|
| Undo Log 保证持久性 | Undo Log 保证**原子性**（回滚）和 MVCC |
| Redo Log 保证原子性 | Redo Log 保证**持久性**（崩溃恢复） |

**记忆技巧**：
- **Un**do → **回滚**（Undo = 撤销 = 回滚 = 原子性）
- **Re**do → **重做**（Redo = 重做 = 恢复 = 持久性）

### 易错点 3：混淆脏读、不可重复读、幻读

| 错误认知 | 正确理解 |
|---------|---------|
| 三者是同一个问题的不同程度 | 三者本质不同：脏读读未提交，不可重复读同值变了，幻读行数变了 |
| 幻读只是多了行 | 幻读包括"少了行"（另一个事务删除了行） |

**区分关键**：
- 脏读：读到别人**还没提交**的数据
- 不可重复读：两次读**同一行**，值不同
- 幻读：两次**范围查询**，行数不同

### 易错点 4：以为意向锁和行锁冲突

| 错误认知 | 正确理解 |
|---------|---------|
| 意向锁阻塞行级操作 | 意向锁只与**表级 S/X 锁**冲突，不与行锁冲突 |
| 意向锁需要手动加 | InnoDB 自动加，开发者不需要关心 |

### 易错点 5：以为 Redo Log 是无限追加写的

| 错误认知 | 正确理解 |
|---------|---------|
| Redo Log 文件越来越大 | Redo Log 是**固定大小的循环写**，write pos 追上 checkpoint 时需先刷脏页 |

---

## 五、源码路径速查

> InnoDB 源码基于 MySQL 8.0，位于 `storage/innobase/` 目录下。

| 知识点 | 源码路径 | 核心函数/类 |
|--------|---------|------------|
| 事务开始/提交 | `trx/trx0trx.cc` | `trx_start_low()`, `trx_commit()` |
| MVCC ReadView | `read/read0read.cc` | `ReadView::create()`, `ReadView::changes_visible()` |
| Undo Log 版本链 | `trx/trx0undo.cc` | `trx_undo_report_row_operation()` |
| 行锁加锁 | `lock/lock0lock.cc` | `lock_rec_lock()`, `lock_clust_rec_read_check()` |
| Next-Key Lock | `lock/lock0lock.cc` | `lock_rec_enqueue_waiting()` |
| 死锁检测 | `lock/lock0deadlock.cc` | `deadlock_check()` |
| Redo Log 写入 | `log/log0log.cc` | `log_write_up_to()`, `log_checkpoint()` |
| 两阶段提交 | `trx/trx0trx.cc` | `trx_commit_in_memory()` |
| Purge 清理 | `trx/trx0purge.cc` | `trx_purge()` |

**关键源码片段**：

**ReadView 可见性判断**（`read/read0read.cc`）：
```cpp
// 简化逻辑
bool changes_visible(trx_id_t id, const table_name_t &name) const {
    if (id < m_up_limit_id)      // trx_id < min_trx_id → 可见
        return true;
    if (id >= m_low_limit_id)     // trx_id >= max_trx_id → 不可见
        return false;
    if (id == m_creator_trx_id)   // 自己改的 → 可见
        return true;
    // 在 m_ids 中 → 不可见（未提交）
    // 不在 m_ids 中 → 可见（已提交）
    return !is_in_trx_ids(id);
}
```

---

## 📌 阶段三面试准备检查清单

- [ ] 能清晰说出 ACID 各自的实现机制
- [ ] 能完整描述 MVCC 三组件（隐藏字段、版本链、ReadView）
- [ ] 能讲清 RC 和 RR 的 ReadView 差异
- [ ] 能列举 InnoDB 各种锁类型及适用场景
- [ ] 能分析给定 SQL 的加锁范围
- [ ] 能描述死锁场景和预防策略
- [ ] 能讲清 Redo Log vs Undo Log vs Binlog 的区别
- [ ] 能描述两阶段提交流程和崩溃恢复逻辑
- [ ] 能回答"RR 能否完全避免幻读"
- [ ] 知道 `innodb_flush_log_at_trx_commit` 的三种值

> 如果某些知识不太清楚，回到 [MySQL 事务与锁](./MySQL-transaction-lock.md) 对应章节复习。