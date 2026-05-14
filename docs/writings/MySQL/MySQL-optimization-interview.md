# MySQL 阶段四：SQL 优化 · 面试指南

> **面试岗位**：Java 后端开发（中高级）
> **准备时长**：1 天（阶段四学习完成后）
> **重点级别**：⭐⭐⭐⭐⭐（面试高频 + 工作必备）

> 如果某些知识不太清楚，回到 [MySQL 优化篇](./MySQL-optimization.md) 对应章节复习。

---

## 📋 目录

1. [高频面试题 Top10](#一高频面试题-top10)
2. [面试话术模板](#二面试话术模板)
3. [追问与连环问](#三追问与连环问)
4. [易错点避坑指南](#四易错点避坑指南)
5. [源码路径速查](#五源码路径速查)

---

## 一、高频面试题 Top10

### Q1: EXPLAIN 的 type 字段有哪些值？分别代表什么含义？⭐⭐⭐⭐⭐

**参考答案**：

type 表示访问类型，从好到差排序：

| type | 含义 | 典型场景 |
|------|------|---------|
| system | 表中只有一行 | const 的特例 |
| const | 主键/唯一索引等值匹配 | `WHERE id = 1` |
| eq_ref | JOIN 中被驱动表走主键/唯一索引 | `JOIN t2 ON t1.id = t2.id` |
| ref | 非唯一索引等值匹配 | `WHERE name = 'Tom'` |
| range | 索引范围扫描 | `WHERE age > 20` |
| index | 全索引扫描 | `SELECT 主键 FROM t` |
| ALL | 全表扫描 | 无索引条件 |

**面试要点**：至少要达到 **range** 级别，最好 **ref** 级别。出现 ALL 就需要优化。

---

### Q2: 哪些情况下索引会失效？⭐⭐⭐⭐⭐

**参考答案**：

**六大经典失效场景**：

1. **函数操作**：`WHERE YEAR(create_time) = 2024` → 改范围查询
2. **隐式转换**：`WHERE varchar_col = 123` → 传字符串 `'123'`
3. **左模糊**：`LIKE '%Tom'` → 全文索引/ES/反转字符串
4. **OR 无索引列**：`WHERE a=1 OR b=2`（b 无索引） → 给 b 加索引
5. **范围中断**：联合索引中范围字段后的列无法走索引 → 范围字段放最后
6. **NOT IN/!=**：`WHERE status != 0` → 改用 IN 正向查询

**核心原理**：索引失效的根本原因是**破坏了 B+ 树的有序性**（函数、隐式转换、左模糊），或**优化器评估全表扫描成本更低**（NOT IN、OR、数据倾斜）。

**强调**：判断是否失效的唯一标准是 EXPLAIN，不要死记硬背。

---

### Q3: 深分页怎么优化？LIMIT 1000000, 10 有什么问题？⭐⭐⭐⭐⭐

**参考答案**：

**问题**：`LIMIT 1000000, 10` 会扫描 1000010 行，然后丢掉前 1000000 行，浪费大量 I/O。

**两种优化方案**：

| 方案 | SQL 模式 | 优点 | 缺点 |
|------|---------|------|------|
| 游标分页 | `WHERE id > last_id ORDER BY id LIMIT n` | 性能恒定 | 不支持跳页 |
| 延迟关联 | `WHERE id IN (SELECT id FROM t ORDER BY ... LIMIT offset, n)` | 支持跳页 | 子查询仍扫描索引 |

**推荐**：C 端用游标分页，后台用延迟关联。

---

### Q4: MySQL JOIN 的原理是什么？怎么优化？⭐⭐⭐⭐⭐

**参考答案**：

MySQL 使用 **Nested Loop Join**：从驱动表取一行，在被驱动表中通过 JOIN 条件匹配，循环直到驱动表遍历完。

**优化两原则**：
1. **被驱动表的 JOIN 字段必须有索引**：将每次查找从 O(N) 降到 O(log N)
2. **小表驱动大表**：减少外层循环次数

"小表"不是指物理行数，而是**经过 WHERE 过滤后的结果集大小**。

如果被驱动表 JOIN 字段没有索引，MySQL 会使用 Block Nested Loop Join（将驱动表数据加载到 join_buffer，再与被驱动表做匹配），性能很差。MySQL 8.0.18+ 引入了 hash join 优化无索引场景。

---

### Q5: EXPLAIN 的 Extra 字段中 Using filesort 和 Using temporary 分别是什么意思？怎么优化？⭐⭐⭐⭐

**参考答案**：

| Extra | 含义 | 触发场景 | 优化方案 |
|-------|------|---------|---------|
| Using filesort | 无法通过索引完成排序，需要额外排序操作 | ORDER BY 的字段没有索引 | 给 ORDER BY 字段加索引或调整联合索引顺序 |
| Using temporary | 使用临时表存储中间结果 | GROUP BY / DISTINCT / UNION | 给 GROUP BY 字段加索引；用 UNION ALL 替代 UNION |

**Using filesort 优化**：

```sql
-- ❌ Using filesort
SELECT * FROM t WHERE a = 1 ORDER BY b;
-- 索引 idx_a(a) 只能过滤 a，ORDER BY b 需要额外排序

-- ✅ 添加联合索引
ALTER TABLE t ADD INDEX idx_ab(a, b);
-- WHERE a = 1 走索引前缀，ORDER BY b 走索引后半部分
```

---

### Q6: COUNT(\*) 和 COUNT(列) 有什么区别？InnoDB 中 COUNT(\*) 为什么慢？⭐⭐⭐⭐

**参考答案**：

- `COUNT(*)` / `COUNT(1)`：统计总行数，包括 NULL
- `COUNT(列)`：统计该列非 NULL 的行数

**InnoDB COUNT(\*) 慢的原因**：由于 MVCC，不同事务同一时刻看到的行数不同，InnoDB 不能缓存行数，必须遍历索引统计。InnoDB 会自动选择最小的二级索引遍历。

---

### Q7: 怎么分析和优化一条慢 SQL？请描述完整流程。⭐⭐⭐⭐⭐

**参考答案**：

```
1. 定位 → 慢查询日志 / performance_schema / 上报监控
2. 分析 → EXPLAIN 查看 type / key / rows / Extra
3. 优化：
   a. type = ALL → 加索引
   b. Using filesort → 优化 ORDER BY 的索引
   c. Using temporary → 优化 GROUP BY / 用 UNION ALL
   d. rows 过大 → 改写 SQL（避免索引失效、深分页优化）
4. 验证 → EXPLAIN 对比 + profiling 对比执行时间
```

---

### Q8: 什么是覆盖索引？什么是索引下推（ICP）？⭐⭐⭐⭐

**参考答案**：

**覆盖索引**：查询所需的所有字段都在索引中，不需要回表。

```sql
-- 联合索引 idx_name_age(name, age)
SELECT name, age FROM t WHERE name = 'Tom';  -- 覆盖索引，Extra = Using index
SELECT * FROM t WHERE name = 'Tom';           -- 需要回表
```

**索引下推（Index Condition Pushdown, ICP）**：MySQL 5.6+ 优化，在存储引擎层就根据索引条件过滤，减少回表次数。

```sql
-- 联合索引 idx_name_age(name, age)
-- 无 ICP：存储引擎找到所有 name LIKE 'Tom%' 的记录 → 全部回表 → Server 层过滤 age > 20
-- 有 ICP：存储引擎在索引中就判断 age > 20 → 只回表满足条件的记录
SELECT * FROM t WHERE name LIKE 'Tom%' AND age > 20;
-- Extra = Using index condition
```

---

### Q9: 如何判断一个索引是否值得创建？⭐⭐⭐⭐

**参考答案**：

**索引创建原则**：

1. **选择性**：`COUNT(DISTINCT col) / COUNT(*)` 越接近 1 越好
   - 性别列选择性约 0.5，不适合单独建索引
   - 手机号选择性约 1.0，适合建索引

2. **区分度**：字段值越分散，索引效果越好

3. **使用频率**：频繁出现在 WHERE / ORDER BY / GROUP BY / JOIN 中的字段

4. **维护成本**：索引越多，INSERT / UPDATE / DELETE 越慢（需要维护 B+ 树）

**判断方法**：

```sql
-- 查看索引选择性
SELECT COUNT(DISTINCT status) / COUNT(*) FROM orders;

-- 查看索引使用情况
SELECT * FROM sys.schema_unused_indexes
WHERE object_schema = 'your_db';
```

---

## 二、面试话术模板

### 话术一：通用 SQL 优化方法论

> SQL 优化的核心思想是**减少扫描量**。我的优化步骤是：先用 EXPLAIN 分析执行计划，重点关注 type、key、rows 和 Extra。如果 type 是 ALL，优先考虑加索引；如果 Extra 有 Using filesort，优化 ORDER BY 的索引；如果 rows 过大，检查是否有索引失效的情况。优化后一定再用 EXPLAIN 验证。

### 话术二：索引失效场景

> 索引失效的核心原因是破坏了 B+ 树的有序性。常见的有六种：函数操作、隐式转换、左模糊、OR 连接无索引列、联合索引范围中断、NOT IN。但我要强调一点，**判断索引是否失效的唯一标准是 EXPLAIN**，不要死记硬背。有时候优化器评估全表扫描成本更低，会主动放弃索引，这其实是合理的。

### 话术三：深分页优化

> 深分页的根本原因是 LIMIT offset, size 会扫描 offset + size 行再丢掉前 offset 行。我推荐的方案是游标分页，`WHERE id > last_id ORDER BY id LIMIT n`，性能恒定。如果业务需要支持跳页，就用延迟关联——先子查询走覆盖索引拿到 id，再回表取数据，把回表次数从 offset + size 降到 size。

### 话术四：JOIN 优化

> JOIN 优化的核心是两条：一是被驱动表的 JOIN 字段必须有索引，将每次查找从 O(N) 降到 O(log N)；二是小表驱动大表减少外层循环次数。MySQL 8.0.18 引入了 hash join，对无索引场景的 JOIN 有显著优化。

---

## 三、追问与连环问

### 连环问一：SQL 优化

**Q: 你平时怎么优化 SQL？**
→ 先 EXPLAIN 分析，根据 type/rows/Extra 定位问题。

**Q: 如果 EXPLAIN 显示 type = ALL 怎么办？**
→ 考虑加索引。优先加在 WHERE、ORDER BY、GROUP BY、JOIN 涉及的字段上。

**Q: 加了索引还是 ALL 怎么办？**
→ 检查是否有索引失效：函数、隐式转换、左模糊等。用 FORCE INDEX 强制走索引对比。

**Q: FORCE INDEX 走了但还是比全表扫描慢？**
→ 可能是数据倾斜，索引选择性差。这时优化器的选择是正确的，应该考虑其他优化方式（如改写 SQL、分区、数据归档）。

---

### 连环问二：索引设计

**Q: 怎么设计一个好的索引？**
→ 看选择性、区分度和使用频率。

**Q: 联合索引的字段顺序怎么定？**
→ 等值条件在前，范围条件在后，排序字段紧跟范围条件。遵循最左匹配原则。

**Q: 如果有多个等值条件，先放哪个？**
→ 选择性高的放前面。这样过滤效果最好，后续字段的扫描范围最小。

---

### 连环问三：深分页

**Q: LIMIT 深分页有什么问题？**
→ 扫描 offset + size 行，丢掉前 offset 行，浪费 I/O。

**Q: 游标分页怎么实现？**
→ 记录上一页最后一条的 id，`WHERE id > last_id ORDER BY id LIMIT n`。

**Q: 游标分页有什么限制？**
→ 不支持跳页。另外如果排序字段不是主键，需要处理排序值相同的情况。

**Q: 跳页场景怎么优化？**
→ 延迟关联。先子查询走覆盖索引拿 id，再回表。把回表次数从 offset + size 降到 size。

---

## 四、易错点避坑指南

### 易错点 1：以为 NOT IN 一定不走索引

**错误认知**：NOT IN / != 永远不走索引。

**正确理解**：是否走索引取决于**数据分布**。如果 NOT IN 过滤了大部分数据（返回少量行），优化器可能仍然选择索引。关键是看 EXPLAIN 的实际结果。

---

### 易错点 2：以为 COUNT(*) 和 COUNT(1) 有性能差异

**错误认知**：COUNT(1) 比 COUNT(*) 快。

**正确理解**：两者完全等价，MySQL 官方文档明确说明。COUNT(*) 是 SQL 标准写法，推荐使用。

---

### 易错点 3：混淆"小表"的定义

**错误认知**：小表驱动大表中的"小表"是指表的总行数。

**正确理解**："小表"是指**经过 WHERE 过滤后的结果集大小**。一个千万行的大表如果 WHERE 条件过滤后只剩 100 行，它就是"小表"。

---

### 易错点 4：以为所有索引失效都要避免

**错误认知**：只要有索引失效就一定要修复。

**正确理解**：有时候优化器放弃索引是正确的选择。比如选择性很低的字段（性别），全表扫描的顺序 I/O 可能比索引的随机 I/O + 回表更快。判断标准是对比 FORCE INDEX 和不加 FORCE INDEX 的实际执行时间。

---

### 易错点 5：忽略 key_len 的计算

**错误认知**：只看 key 字段判断索引是否生效。

**正确理解**：key 只显示使用了哪个索引，但不知道用了几个字段。必须结合 key_len 来判断联合索引实际使用了几个字段。

---

## 五、源码路径速查

| 功能 | 路径/模块 | 说明 |
|------|----------|------|
| EXPLAIN 实现 | `sql/sql_explain.cc` | 执行计划生成逻辑 |
| 查询优化器 | `sql/sql_optimizer.cc` | 成本计算与执行计划选择 |
| 范围优化器 | `sql/opt_range.cc` | 范围扫描的索引选择 |
| JOIN 优化 | `sql/sql_join_buffer.cc` | BNL/BNLH Join Buffer 实现 |
| ICP 实现 | `handler/handler.cc` | 索引下推 `idx_cond_push` |
| 子查询优化 | `sql/sql_optimizer.cc` | Semi-Join 改写逻辑 |
| 慢查询日志 | `sql/sql_log.cc` | 慢查询记录逻辑 |
| Filesort | `sql/filesort.cc` | 排序实现 |
| 临时表 | `sql/temp_table_param.h` | 临时表参数 |
| Hash Join (8.0+) | `sql/hash_join*.cc/h` | MySQL 8.0.18 新增 |

---

## 📌 面试核心 Checklist

面试前确认以下每个点都能流畅回答：

- [ ] EXPLAIN 的 type 字段从好到差的排序
- [ ] 六大索引失效场景及原理
- [ ] 深分页三种优化方案的适用场景
- [ ] JOIN 优化的两个核心原则
- [ ] COUNT(*) 和 COUNT(列) 的区别
- [ ] InnoDB COUNT(*) 慢的原因
- [ ] 覆盖索引和索引下推的区别
- [ ] Using filesort 和 Using temporary 的优化
- [ ] 一条慢 SQL 的完整排查优化流程
- [ ] 子查询和 JOIN 的选择

> 如果某些知识不太清楚，回到 [MySQL 优化篇](./MySQL-optimization.md) 对应章节复习。