# MySQL 阶段一：存储引擎与 Buffer Pool · 练习题

> **建议用时**：40-50 分钟
> **总分**：100 分 + 附加题 20 分
> **及格线**：70 分（面试准备建议达到 85 分+）

---

## 一、基础选择题（每题 5 分，共 25 分）

### 题目 1
**以下哪个不是 InnoDB 支持的特性？**

A. 行级锁
B. 事务
C. 全文索引（MySQL 5.6+）
D. 表级锁作为主要锁机制

<details>
<summary>📋 答案与解析</summary>

**答案：D. 表级锁作为主要锁机制**

InnoDB 的主要锁机制是**行级锁**，而非表级锁。InnoDB 也支持表级锁（如 `LOCK TABLES`），但这不是它的主要锁机制。MyISAM 才是使用表级锁作为主要锁机制。InnoDB 从 MySQL 5.6 起支持全文索引。

</details>

---

### 题目 2
**InnoDB 页的默认大小是多少？**

A. 4KB
B. 8KB
C. 16KB
D. 32KB

<details>
<summary>📋 答案与解析</summary>

**答案：C. 16KB**

InnoDB 默认页大小为 16KB。可通过 `innodb_page_size` 在实例初始化时配置为 4KB、8KB、16KB、32KB 或 64KB，一旦实例初始化后不可更改。

</details>

---

### 题目 3
**关于 Buffer Pool 的 LRU 算法，以下说法正确的是？**

A. 新页从 LRU 链表头部插入
B. 新页从 LRU 链表尾部插入
C. 新页从 LRU 链表的 3/8 处（Midpoint）插入
D. Buffer Pool 使用严格的传统 LRU 算法

<details>
<summary>📋 答案与解析</summary>

**答案：C. 新页从 LRU 链表的 3/8 处（Midpoint）插入**

InnoDB 使用改进的 LRU 算法，新页插入到 LRU 链表的 Midpoint（约 3/8 处），而非头部。这是为了防止全表扫描或预读操作将大量冷数据加载到缓存中，挤走真正有用的热点数据。

</details>

---

### 题目 4
**以下哪种场景下 Change Buffer 最有效？**

A. 唯一索引的高频更新
B. 非唯一二级索引、写多读少
C. 主键索引的高频插入
D. 任何类型的索引都适用

<details>
<summary>📋 答案与解析</summary>

**答案：B. 非唯一二级索引、写多读少**

Change Buffer 只对**非唯一二级索引**有效。唯一索引需要先检查唯一性，必须先读取索引页，无法延迟。主键索引是有序的，通常是顺序 I/O，不需要 Change Buffer 优化。写多读少的场景下 Change Buffer 效果最好，因为修改操作可以累积起来批量合并。

</details>

---

### 题目 5
**关于 Buffer Pool 的读请求流程，以下说法正确的是？**

A. 查询数据时如果 Buffer Pool 未命中，会直接从磁盘返回给客户端
B. Buffer Pool 命中后，会将对应页移动到 New 区头部
C. 从磁盘读入的页会直接插入到 New 热数据区
D. Buffer Pool 只缓存数据页，不缓存索引页

<details>
<summary>📋 答案与解析</summary>

**答案：B. Buffer Pool 命中后，会将对应页移动到 New 区头部**

Buffer Pool 命中时直接返回内存数据，同时将该页移动到 New 区头部。未命中时先从磁盘读取页并插入 Old 区头部，再返回数据。从磁盘读入的页不会直接进入 New 区，而是插入 Midpoint（Old 头部）。Buffer Pool 不仅缓存数据页，还缓存索引页、自适应哈希索引等。

</details>

---

## 二、填空题（每空 5 分，共 25 分）

### 题目 6
MySQL 采用 __________ 存储引擎架构，MySQL 5.5 之后的默认存储引擎是 __________。

<details>
<summary>📋 答案与解析</summary>

**答案**：可插拔、InnoDB

MySQL 采用可插拔存储引擎架构，不同的表可以使用不同的存储引擎。MySQL 5.5 起 InnoDB 成为默认存储引擎，替代了之前的 MyISAM。

</details>

---

### 题目 7
InnoDB 的存储层次从大到小依次是：表空间 → __________ → 区（1MB）→ __________（16KB）→ 行。

<details>
<summary>📋 答案与解析</summary>

**答案**：段、页

InnoDB 存储层次：表空间（Tablespace）→ 段（Segment）→ 区（Extent，1MB）→ 页（Page，16KB）→ 行（Row）。页是 InnoDB 磁盘与内存交互的最小单位。

</details>

---

### 题目 8
Buffer Pool 的 LRU 链表被 Midpoint 分为两部分：New Sublist（热数据区，占约 __________）和 Old Sublist（冷数据区，占约 __________）。

<details>
<summary>📋 答案与解析</summary>

**答案**：5/8、3/8

默认 `innodb_old_blocks_pct = 37`，即 Old Sublist 占 37%（约 3/8），New Sublist 占 63%（约 5/8）。

</details>

---

### 题目 9
InnoDB 页结构中，用于加速页内查找的数据结构是 __________，它通过 __________ 查找快速定位记录。

<details>
<summary>📋 答案与解析</summary>

**答案**：Page Directory、二分

Page Directory 是一个槽位数组，每个槽指向页内一组记录的最后一条。查找时先通过二分查找定位到组，再在组内通过单链表顺序遍历找到目标记录。

</details>

---

### 题目 10
InnoDB 独立表空间的数据和索引存储在 __________ 文件中，MyISAM 的数据存储在 __________ 文件中，索引存储在 __________ 文件中。

<details>
<summary>📋 答案与解析</summary>

**答案**：.ibd、.MYD、.MYI

InnoDB 在 `innodb_file_per_table = ON` 时，每张表的数据和索引存储在独立的 .ibd 文件中。MyISAM 使用 .MYD（MYData）存储数据，.MYI（MYIndex）存储索引。

</details>

---

## 三、判断题（每题 5 分，共 25 分）

### 题目 11
Buffer Pool 中的脏页会由 Redo Log 保证持久性，因此即使 MySQL 异常宕机也不会丢失任何数据。

<details>
<summary>📋 答案与解析</summary>

**答案：错误**

Redo Log（WAL 机制）保证的是已提交事务的持久性，通过 Redo Log 可以恢复已提交但未刷盘的脏页。但如果事务尚未提交，对应的数据修改不会通过 Redo Log 恢复（会通过 Undo Log 回滚）。此外，Redo Log 本身也有一套刷盘策略，如果 Redo Log 还没来得及刷盘就发生宕机，也可能丢失部分数据。

</details>

---

### 题目 12
Buffer Pool 中被修改过的页会立即刷回磁盘。

<details>
<summary>📋 答案与解析</summary>

**答案：错误**

Buffer Pool 中被修改的页（脏页）不会立即刷盘，而是由后台线程异步刷新。触发刷盘的条件包括：Checkpoint、Buffer Pool 空间不足、后台线程定时刷新等。这种策略利用了 WAL（Write-Ahead Logging）机制，通过 Redo Log 保证持久性。

</details>

---

### 题目 13
Change Buffer 只对非唯一二级索引生效，对唯一索引和主键索引不生效。

<details>
<summary>📋 答案与解析</summary>

**答案：正确**

唯一索引需要检查唯一性约束，必须先读取索引页才能判断是否冲突，无法延迟操作，因此 Change Buffer 对唯一索引无效。主键索引通常是有序的，属于顺序 I/O，也不需要 Change Buffer 优化。

</details>

---

### 题目 14
InnoDB 的 `innodb_page_size` 参数可以在运行时动态修改。

<details>
<summary>📋 答案与解析</summary>

**答案：错误**

`innodb_page_size` 只能在 MySQL 实例初始化时指定（即第一次启动时通过配置文件或命令行参数），一旦实例创建完成，页大小就固定了，无法动态修改。

</details>

---

### 题目 15
InnoDB 页中的 User Records 是按主键值排序存储的，记录之间通过单链表连接。

<details>
<summary>📋 答案与解析</summary>

**答案：正确**

InnoDB 页中的 User Records 按主键值从小到大排序，每条记录包含 `next_record` 指针指向下一条记录，形成单链表。新增记录时通过链表定位插入位置，保持有序性。

</details>

---

## 四、综合分析题（每题 25 分，共 25 分）

### 题目 16
**场景分析**：你们系统中有一张订单表，写入量很大且查询较少。数据库同事建议关闭 Change Buffer 来提升性能。请你分析：

1. 这个建议是否正确？为什么？
2. Change Buffer 在什么场景下效果好，什么场景下效果差？
3. 如果这张表有一个唯一索引字段（order_no），Change Buffer 对这个索引是否生效？

<details>
<summary>📋 答案与解析</summary>

**1. 建议是否正确：**

不建议关闭 Change Buffer。订单表写入量大、查询少，正是 Change Buffer 发挥最大作用的场景。Change Buffer 可以将二级索引的修改缓存起来，减少随机 I/O，等后续查询时再批量合并。

**2. Change Buffer 适用场景：**

- **写多读少**：Change Buffer 累积大量修改，批量 Merge 效率高 ✅
- **读多写少**：读操作频繁触发 Merge，增加了额外 I/O，反而可能降低性能 ❌

**3. 唯一索引字段（order_no）：**

不生效。唯一索引需要先读取索引页检查唯一性约束，必须将数据页读入内存，Change Buffer 的延迟读取策略无法使用。因此即使 `innodb_change_buffering = all`，唯一索引的修改也不会走 Change Buffer。

</details>

---

## 附加题（每题 10 分，共 20 分）

### 题目 17
**Buffer Pool 的 Midpoint Insertion 策略中，`innodb_old_blocks_time` 参数的作用是什么？如果不设置这个参数会有什么问题？

<details>
<summary>📋 答案与解析</summary>

**答案**：

`innodb_old_blocks_time` 默认值为 1000ms（1 秒）。它的作用是：当 Old 区的页面被访问时，**只有在该页面在 Old 区停留时间超过此阈值后**，才会被提升到 New 区。

**不设置（设为 0）的问题**：

如果没有这个时间窗口，预读操作读入的大量页面如果紧接着被访问（比如全表扫描连续扫描），就会立即被提升到 New 区，仍然会挤走热点数据。设置 1 秒的等待期，让真正的热点数据（被反复访问的数据）才有资格进入 New 区，而全表扫描的"一次性"数据虽然被访问了，但在等待期内不会被提升，最终在 Old 区自然淘汰。

</details>

---

### 题目 18
**InnoDB 的 Flush 链表和 LRU 链表有什么区别？它们各自的作用是什么？如果一个数据页同时存在于两个链表中，在淘汰时应该如何处理？**

<details>
<summary>📋 答案与解析</summary>

**答案**：

**两个链表的区别与作用：**

- **LRU 链表**：管理 Buffer Pool 中所有缓存页的访问顺序，用于决定哪些页面应该被淘汰（冷热数据分离）
- **Flush 链表**：仅记录被修改过的页面（脏页），用于决定哪些脏页需要刷盘

**两者的关系：**
- 一个脏页会同时存在于 LRU 链表和 Flush 链表中
- LRU 链表负责"淘汰策略"，Flush 链表负责"刷脏策略"

**淘汰时的处理：**

当需要淘汰一个页面时，优先从 LRU 链表 Old 区的 Tail 端选择。如果选中的页面是干净页，直接释放空间；如果是脏页，需要先将脏页刷盘（同步或异步），然后再释放空间。后台刷脏线程会持续扫描 Flush 链表，提前将脏页刷盘，减少淘汰时的同步刷脏开销。

</details>

---

## 📊 得分统计

| 题型 | 题号 | 分值 | 得分 |
|------|------|------|------|
| 基础选择题 | 1-5 | 25 分 | |
| 填空题 | 6-10 | 25 分 | |
| 判断题 | 11-15 | 25 分 | |
| 综合分析题 | 16 | 25 分 | |
| **基础部分合计** | | **100 分** | |
| 附加题 | 17-18 | 20 分 | |

---

> **建议**：基础部分达到 85 分以上再进入下一阶段。如果某些题目做错，回到 `mysql-01-storage-engine.md` 对应章节复习。
