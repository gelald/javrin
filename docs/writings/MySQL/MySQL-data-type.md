---
title: MySQL 数据类型
icon: article
order: 6
category:

- 干货
- 数据库

tag:

- 数据类型
- MySQL

---

# MySQL 数据类型

MySQL 中主要包含 5 大类的数据类型，分别是整数型、小数型、字符串型、日期型、其他类型。



## 整数类型

### 数据类型

参考：[MySQL :: MySQL 8.0 Reference Manual :: 11.1.2 Integer Types (Exact Value) - INTEGER, INT, SMALLINT, TINYINT, MEDIUMINT, BIGINT](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html)

| 数据类型  | 字节数  | 范围                                          |
| --------- | ------- | --------------------------------------------- |
| TINYINT   | 1个字节 | 有符号：0~2^8^-1<br />无符号：-2^7^~2^7^-1    |
| SMALLINT  | 2个字节 | 有符号：0~2^16^-1<br />无符号：-2^15^~2^15^-1 |
| MEDIUMINT | 3个字节 | 有符号：0~2^24^<br />无符号：-2^23^~2^23^-1   |
| INT       | 4个字节 | 有符号：0~2^32^<br />无符号：-2^31^~2^31^-1   |
| BIGINT    | 8个字节 | 有符号：0~2^64^<br />无符号：-2^63^~2^63^-1   |



### 显示宽度

我们经常能看见 INT(11) 的写法，其中括号内的数值是这个字段最大可能显示的数字个数，显示宽度只和展示有关，和数值范围无关。当打开 zerofill 选项时，当数值的位数小于指定的宽度时会由 0 填充存入。比如定义了 INT(3) 字段并打开以零填充，存入了一个6，最终显示 006。这个功能在开发过程中，意义不大。



### 和 Java 类型对应

**这里只讨论无符号的情况，有符号需要按数值范围来调整**

- 一般来说TINYINT、SMALLINT、MEDIUMINT、INT 都可以用 `java.lang.Integer` 来对应，因为 `Integer` 用 4 个字节存储数据
- BINGINT 由于超出 4 个字节，所以需要用 `java.lang.Long` 来对应
- **`java.lang.Boolean` 类型变量可以用 TINYINT 类型的字段**，MySQL 里有四个常量：true、false、TRUE、FALSE 分别代表 1、0、1、0。MySQL 保存 boolean 值时用 1 代表 TRUE，0 代表 FALSE





## 小数类型

### 数据类型

其中小数类型可以细分为浮点类型和定点类型

- 浮点类型

  - FLOAT：单精度，4 个字节
  - DOUBLE：双精度，8 个字节

- 定点类型

  - DECIMAL(M, D)：M 精度代表最大位数，D 标度代表小数点后的位数。DECIMAL(M, D) 会占用 M + 2 个字节，因为它是以字符串形式进行存储的，当存入一个数时，会存储数字代表的字符，一个数字字符使用一个字节空间，另外要存入描述这个数据的元数据，元数据固定占用 2 个字节，所以是 M + 2。默认 M 是 10，D 是 0.

    > 在 MySQL 中，定点数以字符串形式存储，在对精度要求比较高的时候（如货币、科学数据），使用 DECIMAL 的类型比较好，另外两个浮点数进行减法和比较运算时也容易出问题，所以在使用浮点数时需要注意，并尽量**避免做浮点数比较**



### 和 Java 类型对应

使用 BigDecimal 来对应，使用 Double、Float 容易发生精度丢失



### 如何选择

小数类型建议统一选择使用 DECIMAL



## 日期类型

### 数据类型

| 数据类型  | 格式                | 范围                                             | 字节数 |
| --------- | ------------------- | ------------------------------------------------ | ------ |
| YEAR      | yyyy                | 1901 ~ 2155                                      | 1      |
| DATE      | yyyy-MM-dd          | 1000-01-01 ~ 9999-12-31                          | 3      |
| TIME      | HH:mm:ss            | -838:59:59 ~ 838:59:59                           | 3      |
| DATETIME  | yyyy-MM-dd HH:mm:ss | 1000-01-01 00:00:00 ~ 9999-12-31 23:59:59        | 8      |
| TIMESTAMP | yyyyMMddHHmmss      | 1970-01-01 00:00:00 UTC ~ 2038-01-19 3:14:07 UTC | 4      |



### DATETIME 和 TIMESTAMP 的区别

- 时间范围：TIMESTAMP 存储的范围为1970-01-01～ 2038-01-19；DATETIME 存储的范围为1000-01-01 ～ 9999-12-31。显然 DATETIME 的时间范围更广
- 自动转换：TIMESTAMP 存储时从客户端时区转换成 UTC 进行存储，查询时从 UTC 转换为客户端时区返回；DATETIME 不做转换，原封不动地存储和读取



### 和 Java 类型对应

MySQL 中这些日期类型可以和 java.sql 包下的类对应

| MySQL 类型 | Java 类型                                          |
| ---------- | -------------------------------------------------- |
| YEAR       | java.sql.Short/java.sql.Date（日期选择当年第一天） |
| DATE       | java.sql.Date（只包含日期）                        |
| TIME       | java.sql.Time（只包含时间）                        |
| DATETIME   | java.sql.Timestamp（包含日期时间）                 |
| TIMESTAMP  | java.sql.Timestamp                                 |

其中 DATETIME 和 TIMESTAMP 也可以使用 java.time.LocalDateTime 来对应，需要设置好序列化与反序列化



### 如何选择

- YEAR、DATE、TIME 这三种有特定的存储格式，可以按需求进行选择。
- DATETIME、TIMESTAMP 的选择主要考虑日期使用范围，TIMESTAMP 的时间范围只到 2038 年，如果需要使用的日期比较大，那么就需要使用 DATETIME；如果涉及到跨时区、时区转换的业务，放在程序中处理也可以，更容易把控。



## 字符串类型

### 数据类型

这里主要讨论常见的 CHAR、VARCHAR，其他的还有 BINARY、VARBINARY、BLOB、TEXT、ENUM、SET 这几种类型。

其中定义 CHAR、VARCHAR 时必须跟上一个数值 N，用于描述这个字段可容纳的**最大字符数**。

- CHAR(N) ：固定长度字符串
- VARCHAR(N) ：可变长度的字符串



用例子说明两者区别：

参考：[MySQL :: MySQL 8.0 Reference Manual :: 11.3.2 The CHAR and VARCHAR Types](https://dev.mysql.com/doc/refman/8.0/en/char.html)

| 存入的值   | CHAR(4) | VARCHAR(4) |
| ---------- | ------- | ---------- |
| ''         | '&nbsp;&nbsp;&nbsp;&nbsp;'  | ''         |
| 'ab'       | 'ab&nbsp;&nbsp;'  | 'ab'       |
| 'abcd'     | 'abcd'  | 'abcd'     |
| 'abcdefgh' | 'abcd'  | 'abcd'     |

- 当存储的内容没有超出字段可容纳的最大字符数时
  - CHAR(N) ：存储内容后进行填充，直到达到 N 个字符
  - VARCHAR(N) ：存储内容
- 当存储的内容大于或等于字段可容纳的最大字符数时，两者都只存储最大字符数的内容，后面的内容被截断。（超出自动截断的功能需要关闭 `STRICT_TRANS_TABLES` 功能，否则不存储）



### CHAR、VARCHAR字段占用字节数量

CHAR 和 VARCHAR 占用的字节数量和字符占用字节数、字段长度息息相关

- **CHAR 类型字段最多存放 255 个字符，和编码无关**
- 字符占用字节数：**不同字符占据的字节数不同**，假设使用 utf8mb4 字符集，数字、英文、符号占用 1 个字节，中文占用 3 个字节，其他一些 emoji 符号、繁体字等需要使用 4 个字节。
- VARCHAR 最多可以表示 65535 个字节，由于 VARCHAR 是一个长度可变的字符串，需要使用额外的空间来**存储字段长度**，当字段长度小于等于 255 字节时，需要使用 1 个字节，当字段长度大于 255 字节时，需要使用 2 个字节。



### 如何选择

- 尽可能不选用 TEXT 类型存储字符串。MySQL 内存临时表不支持 TEXT 数据类型，如果查询中包含这些列就不能使用内存临时表，必须使用磁盘临时表；存储 TEXT 类型数据时，不和行记录存储在一起，而是在磁盘中开辟另外的空间存储，行记录中只存储地址，所以 TEXT 类型数据还要经历二次查询。
- 存储定长的字符串时，尽量使用 CHAR，因为 CHAR 索引速度非常快。VARCHAR 类型的数据在查找时需要先获取数据段长度，然后按长度检索内容；CHAR 类型的数据无需计算字段长度，只需要按部就班地检索



## 其他类型

其他类型中包含二进制类型，其他类型不详细展开

- tinyblob，255个字节
- blob，65535个字节
- mediumblob，16777215个字节
- longblob，4294967295个字节



## 一些更普遍的规则

- 在满足需求的情况下，可以选择占用空间更小的数据类型就选择更小的，数据类型越小，查询、插入时占用的计算机资源就越少
- 能使用整型就不使用字符串类型，因为有字符集和排序规则，使得字符串类型比整型更复杂



## 参考链接

[关于MySQL中的字段长度以及占用空间总结](https://blog.csdn.net/qq_45333238/article/details/125092611)

[【Mysql】：搞清楚字符串类型char、varchar、text - JoyoHub](https://joyohub.com/mysql/mysql-string/)
