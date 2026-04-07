---
title: MySQL 语句执行流程-存储引擎层
icon: article
category: 数据库
tag:
  - MySQL
  - 原理
---

# MySQL 语句执行流程-存储引擎层

> 上一篇学习完 SQL 语句在 Server 层流转的过程，这一篇我们学习 MySQL 语句执行流程中存储引擎层的部分，本篇学习使用的存储引擎是 InnoDB

## 一、InnoDB 存储引擎介绍

> MySQL 中常见的存储引擎有 InnoDB 和 MyISAM，**MySQL 5.5 后默认的存储引擎是 InnoDB**

### MySQL 存储引擎相关命令

```sql
-- 查看所有支持的存储引擎
SHOW ENGINES;

-- 查看默认存储引擎
SHOW VARIABLES LIKE 'default_storage_engine';

-- 建表时指定存储引擎
CREATE TABLE t1 (id INT PRIMARY KEY) ENGINE = InnoDB;

-- 修改已有表的存储引擎
ALTER TABLE t1 ENGINE = InnoDB;
```

---

### InnoDB vs MyISAM 核心差异对比

| 特性           | InnoDB             | MyISAM                     |
| -------------- | ------------------ | -------------------------- |
| **事务支持**   | ✅ 支持 ACID       | ❌ 不支持                  |
| **锁粒度**     | 行级锁（Row Lock） | 表级锁（Table Lock）       |
| **MVCC**       | ✅ 支持            | ❌ 不支持                  |
| **外键**       | ✅ 支持            | ❌ 不支持                  |
| **崩溃恢复**   | ✅ 通过 Redo Log   | ❌ 需要手动修复            |
| **索引结构**   | 聚簇索引           | 非聚簇索引                 |
| **全文索引**   | ✅ MySQL 5.6+ 支持 | ✅ 原生支持                |
| **COUNT(\*)**  | 需遍历索引计数     | 直接存储行数               |
| **存储空间**   | .ibd（数据+索引）  | .MYD（数据）+ .MYI（索引） |
| **并发写性能** | 高（行锁）         | 低（表锁）                 |
| **适合场景**   | 高并发 OLTP        | 读多写少、不需要事务       |

---

### InnoDB 成为默认存储引擎的原因

InnoDB 每一个特性都支撑了它成为默认存储引擎：

- **行级锁 + 支持 MVCC** 的特性让 InnoDB **支持高并发读写**
- **聚簇索引**的特性让 InnoDB 的**数据检索速度更快**
- 支持**事务**的特性让 InnoDB 保证了数据的**安全修改**
- **Redo Log** 的特性让 InnoDB 支持服务**崩溃后安全恢复数据**

---

### InnoDB 存储引擎层架构总览

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230228103941.png)


## 二、Buffer Pool
  
### 为什么需要 Buffer Pool（直接读写磁盘的问题）

在 MySQL 中，存储引擎负责数据存储、数据读取、数据更新，但是数据实际上存在磁盘中。因此无论是哪一款存储引擎，当客户端需要对数据进行修改时，都需要先把数据从磁盘中加载到内存中，数据操作完成后，把内存中的数据再写回到磁盘中。

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230108190723.png)

显然这种做法是不太合理的，多个更新操作都直接操作磁盘，**由于磁盘 IO 效率不高，导致性能低下**。

MySQL 的设计者自然也考虑到了这个问题，所以在客户端与磁盘文件中间设计了一个 `Buffer Pool` ，专门用于更新数据使用的缓冲池，**毕竟操作内存的效率还是要比操作磁盘更高**。

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230109095338.png)

- 读取数据：如果数据存在 Buffer Pool，则直接从 Buffer Pool 中读取；如果不存在，则从磁盘读取数据，再写入到 Buffer Pool 中。

- 写入数据：数据先写入 Buffer Pool，然后根据配置的持久化策略，把数据写入到磁盘文件中。

这种做法尽可能地**避免了客户端直接和磁盘进行 IO**，Buffer Pool 的加入提升了读写性能。

---

### InnoDB 数据存储的逻辑结构

Buffer Pool 的加入的确能有效提升读写效率，但是我们还需要考虑一个问题：**每次客户端需要多少字节就从磁盘中读取多少字节，这显然不合理，因为磁盘 IO 效率低，特别是磁盘的随机读操作**。

InnoDB 中处理的数据并不是一个字节一个字节处理，而是以一定的逻辑结构为单位，下面是 InnoDB 数据存储的逻辑结构

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230109110050.png)

我们需要重点关注 Extent 和 Page，1 个 Extent 包含了 64 个 Page，**Page 是 InnoDB 存储引擎磁盘管理的最小单元，每个页的大小默认为 16KB**。

---

### 缓存预读机制

根据**局部性原理**，往往一块需要使用的数据，它附近位置的数据可能也会马上被用到；为了进一步减少磁盘 IO 的次数，InnoDB 设计了预读机制，一次性读取多一点数据到 Buffer Pool 中，**在数据交互时，可以尽量减少磁盘 IO 的次数**，使用到了一个**空间换时间**的思想。

InnoDB 中数据的最小单位是页，所以从磁盘文件中读取数据写入 Buffer Pool 中也是以页为单位。缓存中的页会对应一份元数据，这个元数据包含数据页的编号，数据页在 Buffer Pool 中的地址等信息。

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230109102637.png)

InnoDB 使用两种预读算法来提升 IO 的效率：线性预读和随机预读

#### 线性预读

当我们读取一个 Extent 中的 Page 的数量达到了 `innodb_read_ahead_threshold` （默认56）个时，提前加载下一个 Extent 的数据到 Buffer Pool 中。方便后面数据访问时可以直接访问 Buffer Pool，不需要再访问磁盘。

#### 随机预读

当 Buffer Pool 中缓存的 Page 的数量达到了 13 个时（ `innodb_random_read_ahead` 参数控制此行为是否开启），提前把当前正在读取的 Extent 中剩下的所有 Page 读取到 Buffer Pool 中。方便访问后面的 Page 时可以直接访问 Buffer Pool。

---

###  缓存淘汰机制

有了预读机制后，Buffer Pool 的作用得到了进一步的发挥，通过减少数据交互时的磁盘 IO 次数，达到提升数据操作性能的目的。

此时我们同样需要考虑一个问题，Buffer Pool 默认大小是 128 M，虽然我们可以通过修改配置来增大这个空间，但是 Buffer Pool 的空间总是有限的，如果缓存页中加载了非常多的数据也会导致缓存空间耗尽

#### LRU 变体算法与冷热数据区

InnoDB 使用的是一种 **LRU 的变体算法**将缓冲池作为一个链表进行管理，当需要对 Buffer Pool 进行内存淘汰时，最近最少使用的缓存页将会被清除。使用 `midpoint` 把数据划分为冷数据区和热数据区。`New Sublist`：热数据区；`Old Sublist`：冷数据区。其中每一个数据区都分别有 `Head` 和 `Tail` 指针

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230109180706.png)

链表数据存放规则：

- 无论是预读还是普通读取，所有数据页读取到 Buffer Pool 中时，都使用**头插法**插入到冷数据区中，更早的数据往 `Tail` 方向挪动，避免了预读机制的存在导致热数据区的数据被冲掉

- 当冷数据区中的数据被访问，那么这份数据会移动到热数据区中，没有被访问到的数据会转移到冷数据区中

- 当实现内存淘汰时，会把冷数据区中 Tail 部分的数据淘汰掉

默认热数据区和冷数据区大小比例是 **5:3**，通过参数 `innodb_old_blocks_pct` 来控制。冷数据区的占比越小，会使得冷数据区没有被访问的数据的淘汰速度更快，在生产环境中，内存足够大时，会尽量把这个数值调低，尽量避免热数据被淘汰。

---

####  热数据转移规则

假设我们现在执行了一条不带索引不带 limit 的查询语句

```sql
select * from account;
```

由于这条语句没有使用索引，所以会进行全表扫描，但是这种查询很多时候都是短时间内只访问一 次，后面基本上都不会用到的。

假设这些数据被访问一次就导致它从冷数据区转移到热数据区中，热数据区中的热点数据被转移到冷数据区中，当发生内存淘汰时，位于冷数据区中的“原来的热点数据”就被清除出内存，导致 Buffer Pool 中全是一些低频访问的冷数据，这大大降低了缓存的命中率，无法充分发挥缓存的作用。

这种情况很常见，同时 InnoDB 的设计者也考虑到了这个问题，所以 InnoDB 定义了冷数据转移到热数据的规则：**如果这个数据页在 LRU 链表中冷数据区存在的时间超过了 1 秒，就把它移动到热数据区**，这个时间可以通过参数 `innodb_old_blocks_time` 来进行控制。

> 因为通过预读机制和全表扫描加载到冷数据区中的数据，通常在 1 秒内会加载并且完成对他们的访问，它们会放在冷数据区等待清空，不会有太多机会进入热数据区；如果 1 秒后还有其他操作对它进行了访问，那说明确实有多个场景要对他进行操作，才会放入到热数据区的头部。

所以 Buffer Pool 中的 LRU 算法整体原理是这样的：

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230110004720.png)

---

#### InnoDB 不采用传统 LRU 算法的原因

通过 midpoint 把数据区分割成冷、热数据区，默认比例是 5:3；避免了全表扫描读取了大量的数据进入 Buffer Pool，这些数据可能是只用一次的冷数据，但是 Buffer Pool 空间有限，如果全表扫描出来的冷数据太多，会挤走热数据，导致 Buffer Pool 的利用率下降。这个机制保证了冷数据可以自然淘汰、不挤占热数据的空间，只有再次被访问时才能升级到热数据区

---

### 数据刷盘机制

> 缓存预读和缓存淘汰与读场景相关，下面介绍 Buffer Pool 如何在写场景中发挥作用

#### 脏页与刷脏概念

当内存中的数据和磁盘中的数据不一致时，我们称**内存中的数据为脏数据，也称为脏页**；**把内存中的数据写入到磁盘中的这个过程我们称为刷脏**。

从这方面也能看出，内存和磁盘，**可靠的其实是磁盘数据**。

---

### Flush 链表

Buffer Pool 中需要更新到磁盘中的数据是修改过的数据，Buffer Pool 中存在着预读机制加载进来的数据，全部更新同步一遍显然不合理，所以 Buffer Pool 使用了 Flush 链表来记录修改过的数据。

Flush 链表中记录着修改过的数据页，后台线程会按配置的策略把数据进行持久化到磁盘中。

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230110141808.png)

- 刷脏触发场景（系统内存不足 / MySQL 正常关闭）
- Redo Log 空间不足触发刷脏（简单提及，详见日志笔记）

## 三、Change Buffer
  ### 3.1 工作原理
  ### 3.2 触发 merge 的场景
  ### 3.3 使用限制（唯一索引不能用）