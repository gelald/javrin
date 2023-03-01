---
title: MySQL 优化
icon: article
category:

- 数据库

tag:

- MySQL
- 优化

---

# MySQL优化



看explain找优化空间（加索引、利用索引）、SQL 改造、从表结构上处理问题



## SQL 层面优化

### 执行计划

最重要还是要用 `explain` 看 SQL 语句的执行计划



小表驱动大表

### 慢查询日志

默认关闭，不建议开启，建议使用druid来进行监控
