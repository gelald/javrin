# MySQL 阶段二：索引原理 · 练习题

> **建议用时**：50-60 分钟
> **总分**：100 分 + 附加题 20 分
> **及格线**：70 分（面试准备建议达到 85 分+）

---

## 一、基础选择题（每题 5 分，共 25 分）

### 题目 1
**关于 B+ 树和 B 树的区别，以下说法错误的是？**

A. B+ 树的非叶子节点只存储索引键值，不存储数据
B. B+ 树的叶子节点通过双向链表连接，支持高效范围查询
C. B 树的非叶子节点既存储索引键值也存储数据指针
D. B+ 树的查询性能不如 B 树稳定，因为必须走到叶子节点

<details>
<summary>📋 答案与解析</summary>

**答案：D. B+ 树的查询性能不如 B 树稳定**

B+ 树的查询性能**更稳定**。所有查询都必须走到叶子节点，时间复杂度稳定在 O(log N)。B 树可能在非叶子节点就命中数据，不同查询路径长度不一致，性能不够稳定。其他选项均正确：B+ 树非叶子节点只存索引（让树更矮胖），叶子节点有链表连接（范围查询高效）。

</details>

---

### 题目 2
**InnoDB 中，以下关于聚簇索引和二级索引的说法正确的是？**

A. 一张表可以有多个聚簇索引
B. 二级索引的叶子节点存储完整行数据
C. 聚簇索引的叶子节点存储的是（索引列值 + 主键值）
D. 通过二级索引查询时可能需要回表到聚簇索引获取完整数据

<details>
<summary>📋 答案与解析</summary>

**答案：D. 通过二级索引查询时可能需要回表到聚簇索引获取完整数据**

A 错误：一张表只能有一个聚簇索引（主键索引）。B 错误：二级索引叶子节点存储的是（索引列值，主键值），不是完整行数据。C 错误：这是二级索引的特点；聚簇索引叶子节点存储的是**完整行数据**。D 正确：当 SELECT 的列不在二级索引中时，需要用主键值回聚簇索引查找完整行数据。

</details>

---

### 题目 3
**假设有联合索引 `idx(a, b, c)`，以下哪个查询能最充分地利用该索引？**

A. `WHERE b = 1 AND c = 2`
B. `WHERE a = 1 AND c = 3`
C. `WHERE a = 1 AND b > 2 AND c = 3`
D. `WHERE a = 1 AND b = 2 AND c = 3`

<details>
<summary>📋 答案与解析</summary>

**答案：D. WHERE a = 1 AND b = 2 AND c = 3**

根据最左匹配原则：
- A：跳过了 a 列，完全不能用索引 ❌
- B：a 能用索引，c 跳过了 b 不能用索引 ⚠️（部分命中）
- C：a 和 b 能用索引，但 b 是范围查询导致后续 c 的索引失效 ⚠️
- D：a、b、c 全部等值匹配，充分利用联合索引 ✅

</details>

---

### 题目 4
**以下哪种场景下索引会失效？**

A. `SELECT * FROM t WHERE name LIKE '张%'`（name 有索引）
B. `SELECT * FROM t WHERE create_time >= '2024-01-01'`（create_time 有索引）
C. `SELECT * FROM t WHERE phone = 13800138000`（phone 是 VARCHAR 类型且有索引）
D. `SELECT * FROM t WHERE status IN (1, 2, 3)`（status 有索引）

<details>
<summary>📋 答案与解析</summary>

**答案：C. SELECT * FROM t WHERE phone = 13800138000**

这是典型的**隐式类型转换**导致索引失效。phone 是 VARCHAR 类型但传入数字常量，MySQL 会将 phone 列隐式转换为数字（相当于对列使用函数），破坏了索引的有序性。

A：LIKE 前缀匹配可以利用 B+ 树有序性 ✅
B：范围查询可以正常使用索引 ✅
D：IN 相当于多个等值条件，可以使用索引 ✅

</details>

---

### 题目 5
**关于索引下推（ICP），以下说法正确的是？**

A. ICP 是 MySQL 8.0 才引入的新特性
B. ICP 主要作用于聚簇索引，减少回表次数
C. 开启 ICP 后，可以将 WHERE 条件中的索引列条件下推到存储引擎层过滤
D. ICP 对所有类型的 SQL 查询都有优化效果

<details>
<summary>📋 答案与解析</summary>

**答案：C. 开启 ICP 后，可以将 WHERE 条件中的索引列条件下推到存储引擎层过滤**

A 错误：ICP 是 MySQL **5.6** 引入的，不是 8.0。B 错误：ICP 主要作用于**二级索引**（聚簇索引本身就读取完整行，ICP 意义不大）。C 正确：ICP 将索引列的条件从 Server 层下推到存储引擎层，在遍历索引时就过滤掉不满足条件的记录，减少回表次数。D 错误：ICP 只对 range、ref、eq_ref、ref_or_null 访问类型生效，且不支持子查询、存储函数等复杂条件。

</details>

---

## 二、填空题（每空 5 分，共 25 分）

### 题目 6
InnoDB 的索引底层采用 __________ 数据结构，默认页大小为 __________ KB。一个三层的 B+ 树大约可以存储 __________ 亿条记录（假设每页可存约 1170 个索引项）。

<details>
<summary>📋 答案与解析</summary>

**答案**：B+ 树（或 B-tree）、16、16

InnoDB 索引底层是 B+ 树（MySQL 文档称为 B-tree），默认页大小 16KB。三层 B+ 树容量约 1170 × 1170 × 1170 ≈ 16 亿条记录。这也是为什么 MySQL 用 B+ 树作为索引结构——通常只需 3-4 次 I/O 即可定位任意记录。

</details>

---

### 题目 7
覆盖索引是指查询所需的所有列都包含在 __________ 中，无需 __________ 。在 EXPLAIN 结果中，Extra 列显示 __________ 表示使用了覆盖索引。

<details>
<summary>📋 答案与解析</summary>

**答案**：索引、回表（或回表查询）、Using index

覆盖索引意味着从索引页就能获取全部所需列的数据，不需要回表到聚簇索引查找完整行数据。EXPLAIN 的 Extra 列出现 `Using index` 就是覆盖索引的标志。

</details>

---

### 题目 8
联合索引的最左匹配原则要求查询必须从索引的 __________ 开始连续匹配，不能 __________ 中间的列。如果遇到 __________ 查询（如 >、<、BETWEEN），后续列的索引会失效。

<details>
<summary>📋 答案与解析</summary>

**答案**：最左边（或第一列）、跳过、范围

最左匹配的本质原因是联合索引的 B+ 树按定义顺序排列，只有从最左边开始连续匹配才能利用有序性进行范围定位。范围查询后的列因为在该范围内不再有序，所以无法继续使用索引精确定位。

</details>

---

### 题目 9
索引失效的常见场景包括：__________ 类型转换、对列使用 __________ 或计算表达式、OR 连接的条件不都有索引、LIKE 以 __________ 开头、以及 __________ / != 等条件。

<details>
<summary>📋 答案与解析</summary>

**答案**：隐式（或隐式类型）、函数（或函数操作）、%（或百分号/通配符）、NOT IN

这些是最常见的索引失效场景。其中隐式类型转换是最高频的陷阱——字符串类型字段传入未加引号的数字常量会导致 MySQL 对列做隐式转换，从而破坏索引有序性。

</details>

---

### 题目 10
前缀索引适用于 __________ 类型的长字符串列，通过只索引前 N 个字符来节省空间。设计前缀索引时需要权衡 __________ 和空间节省，其局限性是无法用于 __________ 索引、ORDER BY 和 GROUP BY 等场景。

<details>
<summary>📋 答案与解析</summary>

**答案**：VARCHAR（或 TEXT/字符串）、选择性（或区分度）、覆盖

前缀索引适合 URL、邮箱等长字符串字段。关键参数是前缀长度——太短选择性差（很多重复），太长则省空间的意义不大。由于前缀索引不保存完整的列值，无法实现覆盖索引（SELECT 该列时仍需回表），也无法支持 ORDER BY/GROUP BY（需要完整值排序）。

</details>

---

## 三、判断题（每题 5 分，共 25 分）

### 题目 11
B+ 树比 B 树更适合数据库索引的核心原因之一是非叶子节点不存储数据，使得树的层级更低，减少磁盘 I/O 次数。

<details>
<summary>📋 答案与解析</summary>

**答案：正确**

这正是 B+ 树的核心优势。B+ 树非叶子节点只存索引键值（不存数据），同样大小的页可以容纳更多索引项（扇出更高），使树更矮胖。以 InnoDB 默认 16KB 页为例，三层 B+ 树即可存储约 16 亿条记录，最多 3 次 I/O 即可定位目标记录。

</details>

---

### 题目 12
InnoDB 的二级索引叶子节点存储的是索引列的值和数据行的物理地址指针。

<details>
<summary>📋 答案与解析</summary>

**答案：错误**

InnoDB 二级索引叶子节点存储的是 **(索引列值, 主键值)** 对，而不是物理地址指针。当需要获取完整行数据时，用主键值回聚簇索引查找。MyISAM 的二级索引才存储物理地址指针。

</details>

---

### 题目 13
对于联合索引 idx(a, b, c)，查询 `WHERE a = 1 AND b IN (2, 3) AND c = 4` 可以充分利用该索引（a、b、c 三列都能用到）。

<details>
<summary>📋 答案与解析</summary>

**答案：正确**

IN 操作符在 MySQL 内部会被拆分为多个等值条件（b=2 OR b=3），属于等值匹配而非范围查询。因此 a 和 b 都是等值匹配，后续的 c 列仍然可以用索引定位。这与 `WHERE a = 1 AND b > 2 AND c = 4` 不同——后者 b 是范围查询，会导致 c 失效。

</details>

---

### 题目 14
只要对某列创建了索引，所有涉及该列的查询都会自动走索引。

<details>
<summary>📋 答案与解析</summary>

**答案：错误**

创建索引不代表所有查询都会走索引。MySQL 优化器基于**成本模型**决定执行计划，考虑因素包括：索引选择性、回表代价、数据分布等。即使有索引，如果优化器判断全表扫描成本更低（如返回数据量超过总量的 20%-30%），也会选择全表扫描。此外，隐式转换、函数操作等也会导致有索引却不走索引。

</details>

---

### 题目 15
EXPLAIN 结果中 Extra 列显示 `Using index condition` 表示同时使用了覆盖索引和索引下推（ICP）。

<details>
<summary>📋 答案与解析</summary>

**答案：错误**

`Using index condition` 表示使用了**索引下推（ICP）**，不表示使用了覆盖索引。两个标记的含义不同：
- `Using index`：表示使用了**覆盖索引**（无需回表）
- `Using index condition`：表示使用了**索引下推**（条件下推到存储引擎层过滤）
- 如果两者同时出现，会显示为 `Using index condition; Using index`

</details>

---

## 四、综合分析题（每题 25 分，共 25 分）

### 题目 16
**场景分析**：你们有一张用户表 `user`，表结构和查询如下：

```sql
CREATE TABLE user (
    id      BIGINT PRIMARY KEY AUTO_INCREMENT,
    name    VARCHAR(50) NOT NULL,
    age     INT NOT NULL,
    phone   VARCHAR(20),
    status  TINYINT DEFAULT 1,
    create_time DATETIME DEFAULT NOW(),
    INDEX idx_name_age (name, age)
);
```

请分析以下 5 个 SQL 语句的索引使用情况：

**(1)** `SELECT * FROM user WHERE name = '张三' AND age = 25;`

**(2)** `SELECT id, name, age FROM user WHERE name = '张三';`

**(3)** `SELECT * FROM user WHERE age = 25;`

**(4)** `SELECT * FROM user WHERE name = '张三' AND age > 20 AND status = 1;`

**(5)** `SELECT * FROM user WHERE phone = 13800138000;`

<details>
<summary>📋 答案与解析</summary>

**(1) `SELECT * FROM user WHERE name = '张三' AND age = 25;`**

✅ **联合索引完全命中**。name 和 age 都是等值匹配，且符合最左匹配顺序（先 name 后 age）。但由于 SELECT * 包含 phone、status、create_time 等不在索引中的列，**需要回表**。

**(2) `SELECT id, name, age FROM user WHERE name = '张三';`**

✅ **覆盖索引**。id 是主键（自动包含在二级索引中），name 和 age 都在联合索引 idx_name_age 中。所有查询列都在索引里，**无需回表**。EXPLAIN 的 Extra 列应显示 `Using index`。

**(3) `SELECT * FROM user WHERE age = 25;`**

❌ **索引失效（不走 idx_name_age）**。跳过了最左边的 name 列，违反最左匹配原则。只能走全表扫描（除非单独建有 age 的索引）。

**(4) `SELECT * FROM user WHERE name = '张三' AND age > 20 AND status = 1;`**

⚠️ **部分命中**。name（等值）和 age（范围）可以用索引，但 **status 不能用索引**——因为 age 是范围查询（>），后面的 status 在该范围内无序，无法用索引定位。最终会先用索引找到 name='张三' AND age>20 的记录，再回表后由 Server 层过滤 status=1。

**(5) `SELECT * FROM user WHERE phone = 13800138000;`**

❌ **索引失效（隐式类型转换）**。phone 是 VARCHAR 类型，但传入的是数字常量。MySQL 会将 phone 列隐式转为数字来比较（`CAST(phone AS SIGNED) = 13800138000`），对列使用函数导致索引失效。正确写法应为 `phone = '13800138000'`。

</details>

---

## 附加题（每题 10 分，共 20 分）

### 题目 17
**为什么 InnoDB 选择 B+ 树而不是哈希表作为默认索引结构？请从查找效率、范围查询、排序三个方面对比分析。**

<details>
<summary>📋 答案与解析</summary>

**答案**：

**1. 查找效率**
- 哈希表：O(1)，理论上更快
- B+ 树：O(log N)，稍慢但在可接受范围内（3-4 次 I/O）
- 实际差距不大：因为数据库瓶颈在磁盘 I/O 而非 CPU 计算，且 B+ 树 3 层即可存 16 亿条记录

**2. 范围查询（核心差异）**
- 哈希表：**不支持**范围查询。哈希表只能做精确匹配（=、IN），无法处理 >、<、BETWEEN、LIKE 'xx%' 等范围条件
- B+ 树：**天然支持**。叶子节点通过双向链表连接，范围查询只需定位起点后沿链表顺序扫描即可

**3. 排序（ORDER BY）**
- 哈希表：**无序**，无法利用索引避免排序（filesort）
- B+ 树：**有序**，可以利用索引的有序性避免额外排序操作

**总结**：虽然哈希表等值查询更快，但数据库场景大量存在范围查询和排序需求，B+ 树在这些方面具有压倒性优势。MySQL 的 Memory 引擎确实支持哈希索引，但仅适用于纯等值查询的场景。

</details>

---

### 题目 18
**有一张订单表 orders，字段包括 order_id（PK）、user_id、status、amount、create_time。业务中有以下高频查询，请你设计最优的索引方案，并说明理由。**

```sql
-- Q1: 根据用户查订单（最高频）
SELECT * FROM orders WHERE user_id = ?;

-- Q2: 根据用户+状态筛选订单
SELECT * FROM orders WHERE user_id = ? AND status = ?;

-- Q3: 根据用户+状态+时间范围分页查询
SELECT * FROM orders WHERE user_id = ? AND status = ?
  ORDER BY create_time DESC LIMIT ?, ?;
```

<details>
<summary>📋 答案与解析</summary>

**答案**：

**推荐索引方案**：

```sql
-- 主索引：覆盖 Q1/Q2/Q3 三种查询模式
CREATE INDEX idx_user_status_ctime ON orders(user_id, status, create_time DESC);
```

**设计理由**：

**1. 列顺序选择：user_id → status → create_time**
- `user_id` 放最前面：Q1/Q2/Q3 都以 user_id 为第一个条件，且 user_id 选择性较高
- `status` 放第二位：Q2 和 Q3 都需要 status 过滤，且是等值查询
- `create_time` 放最后：Q3 需要 ORDER BY create_time，放在最后可以利用索引有序性避免 filesort

**2. 为什么不用多个单列索引？**
- 单独建 `idx_user_id(user_id)` 和 `idx_status(status)` 无法满足 Q3 的复合查询需求
- 联合索引 `idx(user_id, status)` 已经包含了 `idx(user_id)` 的能力（最左匹配），不需要冗余

**3. 排序方向**
- Q3 要求 `ORDER BY create_time DESC`，MySQL 8.0+ 支持**降序索引**，可以直接指定 `create_time DESC`
- 如果是 MySQL 5.7，索引默认 ASC 排序，Q3 可能会出现 backward index scan 或 filesort

**4. 覆盖索引优化**
- 如果 Q3 只需要部分列，可以考虑将 SELECT 的列也加入索引形成覆盖索引：
  ```sql
  CREATE INDEX idx_cover ON orders(user_id, status, create_time, order_id, amount);
  ```
  但要注意索引不宜过大，需权衡空间开销

**5. 不推荐的方案**
- ❌ `idx(status, user_id, create_time)`：user_id 选择性高于 status，放后面效果差
- ❌ 分别建三个单列索引：无法满足联合查询的最左匹配要求
- ❌ `idx(user_id, create_time, status)`：create_time 如果是范围查询（虽然这里是 ORDER BY），status 会受影响

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

> **建议**：基础部分达到 85 分以上再进入下一阶段。如果某些题目做错，回到 [MySQL索引](./MySQL-index.md) 对应章节复习。
