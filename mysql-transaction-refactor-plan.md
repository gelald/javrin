# 重构计划：MySQL 事务文档

## Context

用户有一份自己撰写的 MySQL 事务笔记 (`MySQL-transaction.md`)，现有一份 AI 生成的更全面的事务与锁笔记 (`mysql-03-transaction-lock.md`)。用户希望在保留自己笔记精华的基础上，吸收 AI 版本的优点进行重构，产出一份结构清晰、内容完整的文档。

重构后的文档将**覆盖** `MySQL-transaction.md`，`mysql-03-transaction-lock.md` 作为参考来源在重构完成后可删除。

---

## 一、原文优点（值得保留）

| 方面 | 具体内容 |
|------|---------|
| **Undo Log 内部结构详解** | insert undo log 的字段拆解（next record、undo type、undo no、table id、primary key field），这是 AI 版本没有的深度 |
| **Update 操作细粒度分类** | 区分"更新主键"vs"更新其他字段"，后者又细分"存储空间不变/变化"两种情况，配图清晰 |
| **Delete 操作 MVCC 关联** | 解释了 delete_mask 存在的原因（MVCC 需要保留历史版本），以及后台线程清理机制 |
| **SELECT COUNT(*) 与 MVCC** | 解释了 InnoDB 为什么不能像 MyISAM 一样 O(1) 计数，这个视角很好 |
| **行锁依赖索引的完整说明** | 包括"二级索引加锁也会锁住主键索引"这个细节 |

## 二、原文遗漏（需要从 AI 版本补充）

| 遗漏内容 | 重要性 | 说明 |
|---------|--------|------|
| **WAL 机制** | 高 | "先写日志再写磁盘"是理解 Redo Log 的前提，原文直接讲 Redo Log 缺少铺垫 |
| **Redo Log 架构细节** | 高 | 缺少 Log Buffer → Redo Log File 的写入流程、`innodb_flush_log_at_trx_commit` 三种策略 |
| **Redo Log 循环写机制** | 中 | write pos 和 checkpoint 的环形缓冲区模型 |
| **Undo Log 清理机制** | 中 | purge 线程、长事务导致表空间膨胀、监控长事务的 SQL |
| **Binlog 与 Redo Log 对比** | 高 | Server 层 vs 引擎层、物理日志 vs 逻辑日志、两阶段提交 |
| **两阶段提交** | 高 | 保证 Redo Log 和 Binlog 一致性的核心机制 |
| **RR 级别幻读例外场景** | 高 | "先快照读后当前读"可能产生幻读，原文说"InnoDB 下可以避免"不够严谨 |
| **锁兼容性矩阵** | 中 | 意向锁的 IS/IX/S/X 兼容关系表格 |
| **插入意向锁** | 中 | INSERT 操作时的特殊 Gap Lock |
| **自增锁（AUTO-INC Lock）** | 低 | 三种模式对比 |
| **加锁规则四条总结** | 高 | InnoDB 加锁的基本单位、访问对象才加锁、唯一索引退化、等值查询末尾退化 |
| **不同 SQL 的加锁场景** | 高 | 等值查询命中唯一索引/普通索引/无索引三种场景的具体加锁分析 |
| **查看锁信息的 SQL** | 中 | `performance_schema.data_lock_waits` 等 |
| **死锁检测机制** | 中 | Wait-For Graph 等待图 |
| **Mermaid 流程图** | 中 | 可视化增强理解 |

## 三、原文需修正/优化的点

| 问题 | 说明 |
|------|------|
| ACID 特性顺序 | 原文按 A→I→D→C 讲解，建议改为先整体概述四个特性，再分别讲 A→D→I→C 的实现 |
| 幻读说法不够严谨 | 原文表格写"InnoDB 下可以避免"，应补充例外场景 |
| 锁的章节缺少总览 | 直接讲 S/X 锁、意向锁，缺少分类总览图 |
| 缺少面试导向 | AI 版本有"面试话术"总结，对学习更有帮助 |

## 四、重构方案

### 文件操作

- **修改文件**: `docs/writings/MySQL/MySQL-transaction.md`（在此文件上重构）
- **删除文件**: `docs/writings/MySQL/mysql-03-transaction-lock.md`（重构完成后）
- **修改文件**: `docs/.vitepress/config.mts`（删除 `mysql-03-transaction-lock` 的侧边栏条目）

### 重构后文档结构

```
# MySQL 事务与锁

## 一、事务基础与 ACID
  - 1.1 什么是事务（银行转账示例）
  - 1.2 ACID 四大特性（总表 + 实现机制对应关系）
  - 1.3 事务生命周期（流程图）

## 二、事务隔离级别
  - 2.1 并发事务问题（脏读/不可重复读/幻读，含区别对比）
  - 2.2 四种隔离级别（表格 + SQL 操作）
  - 2.3 InnoDB RR 级别与幻读（快照读/当前读两种情况 + 例外场景）

## 三、MVCC 多版本并发控制
  - 3.1 核心思想（读写不冲突）
  - 3.2 隐藏字段（DB_TRX_ID / DB_ROLL_PTR / DB_ROW_ID）
  - 3.3 Undo Log 版本链（图解）
  - 3.4 ReadView 可见性判断（四字段 + 判断流程）
  - 3.5 RC vs RR 的 ReadView 差异（每次创建 vs 复用）
  - 3.6 SELECT COUNT(*) 与 MVCC（原文独有，保留）

## 四、Undo Log 详解
  - 4.1 记录的隐藏字段与头信息（原文详细内容保留）
  - 4.2 Insert Undo Log（原文字段拆解保留）
  - 4.3 Update Undo Log
    - Delete 操作（原文保留）
    - Update 操作：更新主键 / 更新其他字段（原文细分保留）
  - 4.4 Undo Log 清理机制（补充：purge 线程、长事务监控）

## 五、事务日志：Redo Log 与 Binlog
  - 5.1 WAL 机制（先写日志再写磁盘）
  - 5.2 Redo Log 架构（Log Buffer → File，三种刷盘策略）
  - 5.3 Redo Log 循环写（write pos / checkpoint）
  - 5.4 Binlog 与 Redo Log 对比
  - 5.5 两阶段提交（保证一致性）
  - 5.6 Redo Log vs Undo Log 对比表

## 六、InnoDB 锁机制
  - 6.1 锁分类总览（分类图）
  - 6.2 共享锁与排他锁
  - 6.3 意向锁（IS/IX + 兼容性矩阵）
  - 6.4 Record Lock（记录锁）
  - 6.5 Gap Lock（间隙锁）
  - 6.6 Next-Key Lock（临键锁 = Record + Gap）
  - 6.7 加锁规则总结（四条规则）
  - 6.8 不同 SQL 的加锁场景（三种场景 + 无索引退化表锁）
  - 6.9 插入意向锁
  - 6.10 查看锁信息的 SQL

## 七、死锁
  - 7.1 死锁产生条件
  - 7.2 经典死锁场景（时序表格）
  - 7.3 死锁检测（Wait-For Graph）
  - 7.4 死锁预防策略

## 八、快照读与当前读
  - 8.1 概念区分
  - 8.2 RR 级别下如何解决幻读（快照读→MVCC / 当前读→Next-Key Lock）

## 核心知识速查表
```

### 编写原则

1. **保留原文精华**：Undo Log 内部结构、Update 细分、SELECT COUNT(*) 等原文独有的深度内容完整保留
2. **吸收 AI 版优点**：Mermaid 图、面试话术、WAL/Binlog/两阶段提交、加锁规则、锁场景分析
3. **统一风格**：保持原文的叙述风格（中文、自然流畅），不用 AI 版的 emoji 标记
4. **Frontmatter 复用**：沿用原文已有的 YAML frontmatter 格式

## 五、验证步骤

1. 执行 `pnpm docs:build` 确认构建成功
2. 启动 `pnpm docs:dev` 检查页面渲染正常（Mermaid 图、表格、代码块）
3. 确认侧边栏中 "MySQL 事务" 链接正常，"MySQL 事务与锁" 已移除
