# MySQL 阶段四：SQL 优化 · 练习题

> **建议用时**：60-70 分钟
> **总分**：100 分 + 附加题 20 分
> **及格线**：70 分（面试准备建议达到 85 分+）

> **建议**：基础部分达到 85 分以上再进入下一阶段。如果某些题目做错，回到 [MySQL 优化篇](./MySQL-optimization.md) 对应章节复习。

---

## 一、选择题（每题 5 分，共 25 分）

### 题目 1
**EXPLAIN 输出中，以下哪个 type 值表示查询效率最高？**

A. ALL
B. index
C. ref
D. range

<details>
<summary>📋 答案与解析</summary>

**答案：C. ref**

type 从优到差的排序：system > const > eq_ref > **ref** > range > index > ALL。

- A（ALL）：全表扫描，效率最差
- B（index）：全索引扫描，比 ALL 好但仍扫描全部
- C（ref）：通过非唯一索引精确匹配，效率较高
- D（range）：索引范围扫描，效率不如 ref

</details>

---

### 题目 2
**以下哪条 SQL 会导致索引失效？**

A. `SELECT * FROM user WHERE id = 100`
B. `SELECT * FROM user WHERE name LIKE 'Tom%'`
C. `SELECT * FROM user WHERE YEAR(create_time) = 2024`
D. `SELECT * FROM user WHERE age BETWEEN 20 AND 30`

<details>
<summary>📋 答案与解析</summary>

**答案：C. `SELECT * FROM user WHERE YEAR(create_time) = 2024`**

对索引列使用函数会导致索引失效。`YEAR(create_time)` 在 create_time 列上使用了函数，破坏了 B+ 树的有序性。

- A：主键等值查询，走 const
- B：右模糊，可以走索引
- D：范围查询，可以走 range

优化方案：改为 `WHERE create_time >= '2024-01-01' AND create_time < '2025-01-01'`。

</details>

---

### 题目 3
**关于联合索引 `idx_abc(a, b, c)`，以下哪个查询能用上索引的全部三个字段？**

A. `WHERE a = 1 AND c = 3 AND b > 2`
B. `WHERE a = 1 AND b > 2 AND c = 3`
C. `WHERE b = 2 AND c = 3`
D. `WHERE a > 1 AND b = 2 AND c = 3`

<details>
<summary>📋 答案与解析</summary>

**答案：A. `WHERE a = 1 AND c = 3 AND b > 2`**

MySQL 优化器会自动调整 WHERE 条件的顺序，使其匹配索引的最左前缀。实际执行时等价于 `WHERE a = 1 AND b > 2 AND c = 3`，三个字段都能用上。

- B：`b > 2` 是范围查询，会中断 c 字段的索引使用，只有 a 和 b 能用上
- C：缺少最左列 a，索引无法使用（最左匹配原则）
- D：`a > 1` 是范围查询，b 和 c 都无法使用索引

</details>

---

### 题目 4
**关于深分页优化，以下说法错误的是？**

A. `LIMIT 1000000, 10` 需要扫描 1000010 行数据
B. 游标分页支持跳页查询
C. 延迟关联通过子查询走覆盖索引减少回表
D. 游标分页的性能不受页码影响

<details>
<summary>📋 答案与解析</summary>

**答案：B. 游标分页支持跳页查询**

游标分页使用 `WHERE id > last_id ORDER BY id LIMIT n`，只能从上一页的最后一条记录继续查，**不支持跳页**。

- A 正确：LIMIT offset, size 会扫描 offset + size 行
- C 正确：延迟关联先通过子查询走覆盖索引获取 id，再回表取数据
- D 正确：无论翻到第几页，游标分页只需扫描 LIMIT n 行

</details>

---

### 题目 5
**关于 InnoDB 中 COUNT 的说法，正确的是？**

A. COUNT(*) 比 COUNT(1) 性能差
B. InnoDB 的 COUNT(*) 会从表元数据直接读取行数
C. COUNT(列) 会统计包含 NULL 的行
D. InnoDB 的 COUNT(*) 需要遍历索引统计行数

<details>
<summary>📋 答案与解析</summary>

**答案：D. InnoDB 的 COUNT(*) 需要遍历索引统计行数**

由于 MVCC 机制，不同事务在同一时刻看到的行数可能不同，InnoDB 必须遍历索引才能得到当前事务视角下的准确行数。

- A 错误：COUNT(*) 和 COUNT(1) 性能完全相同
- B 错误：MyISAM 才是从元数据直接读取，InnoDB 不是
- C 错误：COUNT(列) 不统计 NULL 值的行

</details>

---

## 二、填空题（每空 2 分，共 20 分）

### 题目 6
EXPLAIN 输出中，**______** 字段表示实际使用的索引，**______** 字段表示预估扫描的行数，**______** 字段中出现 Using filesort 表示需要额外排序。

<details>
<summary>📋 答案与解析</summary>

**答案：key、rows、Extra**

- **key**：显示实际使用的索引名，NULL 表示未走索引
- **rows**：MySQL 优化器预估需要扫描的行数
- **Extra**：Using filesort 表示无法通过索引完成排序，需要额外排序操作

</details>

---

### 题目 7
LIMIT 深分页的性能问题在于 `LIMIT offset, size` 会扫描 **______** 行数据，然后丢掉前 **______** 行。常用的优化方案有游标分页、**______** 和 BETWEEN ... AND。

<details>
<summary>📋 答案与解析</summary>

**答案：offset + size、offset、延迟关联**

深分页的核心问题是扫描了大量无效数据。延迟关联通过子查询先走覆盖索引获取 id，再回表取数据，将回表次数从 offset + size 降到 size。

</details>

---

### 题目 8
InnoDB 中 COUNT(*) 不像 MyISAM 那样直接从元数据获取行数，是因为 **______** 机制下不同事务看到的行数可能不同。InnoDB 会自动选择 **______** 的索引来遍历统计。

<details>
<summary>📋 答案与解析</summary>

**答案：MVCC（多版本并发控制）、最小（最小二级索引）**

MVCC 使得每个事务可能看到不同的数据版本，因此不能使用全局计数器。InnoDB 会选择占用空间最小的二级索引来遍历，减少 I/O 开销。

</details>

---

### 题目 9
JOIN 优化的两个核心原则是：**______** 的 JOIN 字段必须有索引，以及 **______** 驱动大表。

<details>
<summary>📋 答案与解析</summary>

**答案：被驱动表、小表**

被驱动表的 JOIN 字段有索引时，每次查找是 O(log N)；小表驱动大表可以减少外层循环次数。

</details>

---

### 题目 10
对索引列使用函数会导致索引失效，是因为函数操作破坏了 B+ 树的 **______** 性。隐式转换中，MySQL 会将 **______** 类型转换为数值类型再做比较。

<details>
<summary>📋 答案与解析</summary>

**答案：有序、字符串**

B+ 树按列的原始值排序，函数改变了值后无法利用有序性。隐式转换时 MySQL 将字符串列转为数值，等价于对列使用 CAST 函数，索引失效。

</details>

---

## 三、简答题（每题 10 分，共 30 分）

### 题目 11
**请解释 EXPLAIN 中 key_len 字段的作用，以及如何通过 key_len 判断联合索引使用了几个字段。举例说明。**

<details>
<summary>📋 答案与解析</summary>

**参考答案**：

key_len 表示索引使用的字节数，通过它可以判断联合索引实际使用了前几个字段。

**计算方法**：
- INT → 4 字节
- BIGINT → 8 字节
- VARCHAR(N) utf8mb4 → N × 4 + 2 字节
- 允许 NULL 的字段额外 +1 字节

**举例**：联合索引 idx_abc(a INT NOT NULL, b VARCHAR(20) NOT NULL, c INT NOT NULL)

- `WHERE a = 1`：key_len = 4（只用 a）
- `WHERE a = 1 AND b = 'test'`：key_len = 4 + 82 = 86（用 a 和 b）
- `WHERE a = 1 AND b = 'test' AND c = 3`：key_len = 4 + 82 + 4 = 90（三个字段都用）

如果 `WHERE a = 1 AND b > 'test' AND c = 3`，key_len 只有 86，说明 c 字段因为 b 的范围查询而中断，没有走索引。

</details>

---

### 题目 12
**请说明深分页优化方案（游标分页、延迟关联）的原理、优缺点及适用场景。**

<details>
<summary>📋 答案与解析</summary>

**参考答案**：

**1. 游标分页**
- 原理：`WHERE id > last_id ORDER BY id LIMIT n`，记录上一页最后一条的 id
- 优点：性能恒定，无论翻到第几页都只扫描 n 行
- 缺点：不支持跳页，只能上/下一页
- 适用场景：App 下拉刷新、无限滚动

**2. 延迟关联**
- 原理：先通过子查询走覆盖索引拿到目标行的 id，再回表取数据
- `SELECT * FROM t WHERE id IN (SELECT id FROM t ORDER BY col LIMIT offset, n)`
- 优点：支持跳页，回表次数从 offset+n 降到 n
- 缺点：子查询仍需扫描 offset+n 行索引
- 适用场景：需要支持跳页的后台管理系统

</details>

---

### 题目 13
**MySQL JOIN 的本质是什么？请解释 Nested Loop Join 的执行流程，以及 "小表驱动大表" 为什么能提高性能。**

<details>
<summary>📋 答案与解析</summary>

**参考答案**：

MySQL JOIN 的本质是 **Nested Loop Join（嵌套循环连接）**。

**执行流程**：
1. 从驱动表中取一行数据
2. 在被驱动表中通过 JOIN 条件匹配这行数据
3. 匹配成功则加入结果集
4. 重复步骤 1-3 直到驱动表遍历完

**小表驱动大表的优势**：

假设小表 S 有 m 行，大表 L 有 n 行，被驱动表 JOIN 字段有索引。

- 小表驱动大表：外层循环 m 次，每次在被驱动表走索引查找 O(log n)，总复杂度 O(m × log n)
- 大表驱动小表：外层循环 n 次，总复杂度 O(n × log m)

当 m << n 时，O(m × log n) < O(n × log m)，所以小表驱动大表更优。

另外，如果 join_buffer 有限，小表的结果集更容易完全放入 join_buffer，减少分段扫描次数。

</details>

---

## 四、场景题（每题 12.5 分，共 25 分）

### 题目 14
**线上系统发现一条 SQL 执行很慢，请给出完整的排查和优化步骤。**

```sql
-- 慢 SQL
SELECT * FROM orders
WHERE user_id = 1001
  AND create_time > '2024-01-01'
  AND status IN (1, 2, 3)
ORDER BY create_time DESC
LIMIT 20;
```

**请回答**：
1. 如何定位和分析这条 SQL？
2. 可能的优化方案有哪些？
3. 如何验证优化效果？

<details>
<summary>📋 答案与解析</summary>

**参考答案**：

**Step 1：EXPLAIN 分析**

```sql
EXPLAIN SELECT * FROM orders
WHERE user_id = 1001
  AND create_time > '2024-01-01'
  AND status IN (1, 2, 3)
ORDER BY create_time DESC
LIMIT 20;
```

重点关注：
- type：如果是 ALL，说明没有合适的索引
- key：看走了哪个索引
- rows：预估扫描行数
- Extra：是否有 Using filesort

**Step 2：可能的优化方案**

**方案一：添加联合索引**

```sql
-- 联合索引：等值条件在前，范围条件在后，排序字段紧跟范围条件
ALTER TABLE orders ADD INDEX idx_user_time(user_id, create_time);
```

这样 user_id 等值过滤 + create_time 范围查询 + ORDER BY create_time 都能走索引，避免 filesort。

**方案二：覆盖索引**

如果业务只需要部分字段：

```sql
-- 只查需要的列，而非 SELECT *
SELECT id, user_id, create_time, status
FROM orders
WHERE user_id = 1001
  AND create_time > '2024-01-01'
  AND status IN (1, 2, 3)
ORDER BY create_time DESC
LIMIT 20;
```

**方案三：调整索引顺序**

如果 status 的区分度高，可以考虑：

```sql
ALTER TABLE orders ADD INDEX idx_user_status_time(user_id, status, create_time);
```

**Step 3：验证优化效果**

```sql
-- 优化前后对比 EXPLAIN
-- 关注 type、key、rows、Extra 的变化

-- 查看实际执行时间
-- 开启 profiling
SET profiling = 1;
-- 执行 SQL
-- 查看 profile
SHOW PROFILES;
```

验证指标：
- type 从 ALL 变为 ref/range
- rows 显著减少
- Extra 中的 Using filesort 消失

</details>

---

### 题目 15
**某电商系统有一个订单表（千万级数据），需要实现分页查询功能。请根据以下需求给出最优的 SQL 优化方案。**

**需求**：
1. C 端用户查看"我的订单"，支持按时间倒序分页
2. 后台管理系统查看所有订单，支持跳页和条件筛选

**表结构**：

```sql
CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    status TINYINT NOT NULL,
    create_time DATETIME NOT NULL,
    amount DECIMAL(10, 2),
    -- 其他字段省略
    INDEX idx_user_time(user_id, create_time),
    INDEX idx_status_time(status, create_time)
);
```

**请回答**：
1. C 端用户查询的优化方案及对应 SQL
2. 后台管理系统的优化方案及对应 SQL
3. 两者的设计取舍

<details>
<summary>📋 答案与解析</summary>

**参考答案**：

**1. C 端用户查询：游标分页**

C 端用户只看自己的订单，数据量有限（通常不超过几千条），且 App 场景不支持跳页。

```sql
-- 第一页
SELECT id, status, create_time, amount
FROM orders
WHERE user_id = ?
ORDER BY create_time DESC
LIMIT 20;

-- 后续页（游标分页，假设上一页最后一条的 create_time = '2024-06-01 10:00:00', id = 12345）
SELECT id, status, create_time, amount
FROM orders
WHERE user_id = ?
  AND (create_time < '2024-06-01 10:00:00'
       OR (create_time = '2024-06-01 10:00:00' AND id < 12345))
ORDER BY create_time DESC, id DESC
LIMIT 20;
```

**索引**：走 idx_user_time(user_id, create_time)，type = ref，性能恒定。

**注意**：游标条件需要加上 `id < 12345` 处理 create_time 相同的情况，确保分页不丢失数据。

**2. 后台管理系统：延迟关联**

后台需要支持跳页和多条件筛选，不能用游标分页。

```sql
-- 延迟关联：子查询走覆盖索引拿 id，再回表
SELECT o.* FROM orders o
INNER JOIN (
    SELECT id FROM orders
    WHERE status = ?
      AND create_time BETWEEN ? AND ?
    ORDER BY create_time DESC
    LIMIT 100000, 20
) tmp ON o.id = tmp.id;
```

子查询中 `SELECT id FROM orders` 走覆盖索引 idx_status_time(status, create_time)，不需要回表。拿到 20 个 id 后再回主键索引查完整数据。

**3. 设计取舍**

| 维度 | C 端游标分页 | 后台延迟关联 |
|------|------------|------------|
| 性能 | O(1) 恒定 | O(offset) 随页码增长 |
| 跳页 | 不支持 | 支持 |
| 复杂度 | 低 | 中 |
| 数据量 | 单用户数据量小 | 全量数据 |

**核心取舍**：C 端牺牲跳页能力换取恒定性能；后台牺牲部分性能换取完整的分页功能。

</details>

---

## 五、附加题（每题 10 分，共 20 分）

### 附加题 1
**某查询的 EXPLAIN 结果如下，请分析执行计划并给出优化建议。**

```
+----+-------------+-------+------+---------------+------+---------+------+--------+-----------------------------+
| id | select_type | table | type | possible_keys | key  | key_len | ref  | rows   | Extra                       |
+----+-------------+-------+------+---------------+------+---------+------+--------+-----------------------------+
|  1 | SIMPLE      | t     | ALL  | idx_name      | NULL | NULL    | NULL | 987654 | Using where; Using filesort |
+----+-------------+-------+------+---------------+------+---------+------+--------+-----------------------------+
```

对应 SQL：

```sql
SELECT * FROM t WHERE name LIKE '%Tom' ORDER BY age LIMIT 10;
```

<details>
<summary>📋 答案与解析</summary>

**分析**：

1. **type = ALL**：全表扫描，扫描了 987654 行
2. **key = NULL**：possible_keys 有 idx_name 但实际未使用
3. **Extra = Using where; Using filesort**：需要在 Server 层过滤 + 额外排序

**索引失效原因**：
- `LIKE '%Tom'` 是左模糊，导致 idx_name 索引失效
- ORDER BY age 无法走索引（因为 WHERE 条件已经全表扫描）

**优化方案**：

**方案一：改写为右模糊（如果业务允许）**

```sql
SELECT * FROM t WHERE name LIKE 'Tom%' ORDER BY age LIMIT 10;
-- 走 idx_name 索引，但 ORDER BY age 仍需 filesort
```

**方案二：添加联合索引**

```sql
ALTER TABLE t ADD INDEX idx_name_age(name, age);
SELECT * FROM t WHERE name LIKE 'Tom%' ORDER BY age LIMIT 10;
-- 走覆盖索引 + 避免 filesort
```

**方案三：使用全文索引或 ES（左模糊无法优化时）**

```sql
ALTER TABLE t ADD FULLTEXT INDEX ft_name(name);
SELECT * FROM t WHERE MATCH(name) AGAINST('Tom') ORDER BY age LIMIT 10;
```

</details>

---

### 附加题 2
**请解释 MySQL 优化器在什么情况下会"放弃索引选择全表扫描"，以及如何判断这是否合理？**

<details>
<summary>📋 答案与解析</summary>

**参考答案**：

**优化器放弃索引的场景**：

1. **数据分布倾斜**：索引选择性差，全表扫描成本更低
   - 例：status 列只有 0 和 1 两个值，90% 的行 status = 1
   - `WHERE status = 1` 走索引需要回表 90% 的数据，不如直接全表扫描

2. **回表成本过高**：二级索引查到的数据需要大量回表操作
   - 非覆盖索引查询需要回主键索引取数据
   - 如果匹配行数多，回表的随机 I/O 成本可能超过顺序扫描

3. **索引统计信息不准确**：优化器基于统计信息做成本估算
   - 统计信息过时可能导致错误判断

**判断是否合理**：

```sql
-- 1. 查看索引选择性
SELECT COUNT(DISTINCT status) / COUNT(*) FROM t;
-- 选择性越接近 1 越好，低于 0.1 说明索引意义不大

-- 2. 查看数据分布
SELECT status, COUNT(*) FROM t GROUP BY status;

-- 3. 强制使用索引对比
SELECT * FROM t FORCE INDEX(idx_status) WHERE status = 1;
SELECT * FROM t IGNORE INDEX(idx_status) WHERE status = 1;
-- 对比实际执行时间

-- 4. 更新统计信息
ANALYZE TABLE t;
```

**核心结论**：优化器放弃索引未必是错误决策。当索引选择性差（如性别、状态列），全表扫描的顺序 I/O 反而比索引的随机 I/O + 大量回表更高效。判断标准是用 FORCE INDEX 和 IGNORE INDEX 做对比测试。

</details>

---

## 📊 评分标准

| 题型 | 分值 | 及格（70 分） | 优秀（85 分+） |
|------|------|-------------|--------------|
| 选择题 5 题 | 25 分 | 15 分+（对 3 题） | 20 分+（对 4 题） |
| 填空题 5 题 | 20 分 | 12 分+ | 16 分+ |
| 简答题 3 题 | 30 分 | 18 分+ | 24 分+ |
| 场景题 2 题 | 25 分 | 15 分+ | 20 分+ |
| 附加题 2 题 | 20 分 | - | 额外加分 |
| **合计** | **120 分** | **70 分** | **85 分+** |

> **建议**：基础部分达到 85 分以上再进入下一阶段。如果某些题目做错，回到 [MySQL 优化篇](./MySQL-optimization.md) 对应章节复习。
