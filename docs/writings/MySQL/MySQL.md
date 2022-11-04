# 基础知识

**SQL的概念**：Structured Query Language，结构化查询语言。定义了操作所有关系型数据库的规则。

SQL语句分类

- DDL(Data Definition Language)数据定义语言
  - 定义数据库、表、视图、列等。
  - 关键字：`CREATE`、`DROP`、`ALTER`等
- DML(Manipulation)数据操作语言
  - 对表中数据进行增删改
  - 关键字：`INSERT`、`DELETE`、`UPDATE`等
- DQL(Query)数据查询语言
  - 对表中数据进行查询
  - 关键字：`SELECT`、`WHERE`等
- DCL(Control)数据控制语言
  - 定义数据库的访问权限和安全级别以及创建用户
  - 关键字：`GRANT`、`REVOKE`等

**架构图**

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrmbg5m2j30c40ha0yn.jpg)

## 数据类型

- 整数类型
  
  > 显示宽度和数据类型的取值范围是无关的。显示宽度只是指明 MySQL 最大可能显示的数字个数，并且需要启用填充零的选项才有效，数值的位数小于指定的宽度时会由0填充。如果插入了大于显示宽度的值，只要该值不超过该类型整数的取值范围，数值依然可以插入，而且能够显示出来。例如，year 字段插入 19999，当使用 SELECT 查询该列值的时候，MySQL 显示的将是完整的带有 5 位数字的 19999，而不是 4 位数字的值
  
  - tinyint，1个字节，-128~127(有符号)、0~255(无符号)
  
    > **Java中Boolean类型变量可以用tinyint类型的字段**，MySQL里有四个常量：true、false、TRUE、FALSE分别代表1、0、1、0。MySQL保存boolean值时用1代表TRUE，0代表FALSE
  
  - smallint，2个字节
  
  - mediumint，3个字节
  
  - int，4个字节
  
  - bigint，8个字节
  
- 小数类型
  
  > 浮点类型和定点类型都可以用`(M, D)`来表示，其中`M`称为精度，表示总共的位数；`D`称为标度，表示小数的位数。
  >
  > 浮点数类型的取值范围为 M（1～255）和 D（1～30，且不能大于 M-2），分别表示显示宽度和小数位数。M 和 D 在 FLOAT 和DOUBLE 中是可选的，FLOAT 和 DOUBLE 类型将默认会按照实际的精度（由计算机硬件和操作系统决定）。**DECIMAL 的默认 D 值为 0、M 值为 10**。
  >
  > 不论是定点还是浮点类型，如果用户指定的精度**超出精度范围，则会四舍五入进行处理**。
  
  - 浮点类型
    - float，单精度，4个字节
    - double，双精度，8个字节
  - 定点类型
    
    - decimal，M+2个字节
    
      > 在 MySQL 中，定点数以字符串形式存储，在对精度要求比较高的时候（如货币、科学数据），使用 DECIMAL 的类型比较好，另外两个浮点数进行减法和比较运算时也容易出问题，所以在使用浮点数时需要注意，并尽量**避免做浮点数比较**
  
- 日期类型
  - year，格式`yyyy`，范围`1901~2155`，1个字节。可以接受整型和字符串，所以程序中记录年份时可以使用字符串
  - time，格式`HH:mm:ss`，范围`-838:59:59 ~ 838:59:59`，3个字节
  - date，格式`yyyy-MM-dd`，范围`1000-01-01 ~ 9999-12-3`，3个字节
  - datetime，格式`yyyy-MM-dd HH:mm:ss`，范围`1000-01-01 00:00:00 ~ 9999-12-31 23:59:59`，8个字节
  - timestamp，格式`yyyy-MM-dd HH:mm:ss`，范围`1980-01-01 00:00:01 UTC ~ 2040-01-19 03:14:07 UTC`，4个字节。如果不给这个字段赋值，或者赋值为null，那么默认使用系统当前时间来自动赋值
  - datetime和timestamp的区别
    - **存储方式不一样**，timestamp存储时从客户端时区转换成UTC进行存储，查询时从UTC转换到客户端时区返回；datetime不转换，原样存储和读取
    - **时间范围不一样**，timestamp存储的范围为1970-01-01～ 2038-01-19；datetime存储的范围为1000-01-01 ～ 9999-12-31
  
- 字符串类型
  
  > 字符串类型可以在定义时使用M来指定长度
  
  - char(M)，固定长度字符串，M个字节
  
  - varchar(M)，可变长度字符串，当实际存储的长度L小于M，则需要L+1个字节；当实际存储的长度等于M，则需要M+1个字节
  
  - enum，一个字符串对象，值为表创建时列规定中枚举的一列值，语法`<字段名> ENUM( '值1', '值1', …, '值n' )`，从 1 开始编号。依照列索引顺序排列，并且空字符串排在非空字符串前，NULL 值排在其他所有枚举值前。ENUM 列总有一个默认值。如果将 ENUM 列声明为 NULL，NULL 值则为该列的一个有效值，并且默认值为 NULL。如果 ENUM 列被声明为 NOT NULL，其默认值为允许的值列表的第 1 个元素
  
    例子：定义enum类型的列('first', 'second', 'third')，值与索引的对应关系如下：
  
    | 索引 |    值    |
    | :--: | :------: |
    | null |   null   |
    |  0   |    ""    |
    |  1   | "first"  |
    |  2   | "second" |
    |  3   | "third"  |
  
  - set，一个字符串的对象，可以有零或多个值，值为表创建时规定的一列值，语法`SET( '值1', '值2', …, '值n' )`，MySQL会自动删除重复值
  
  - 大文本，适合保存文章、评论等
  
    - tinytext，长度为255，L+1个字节
    - text，长度为65535，L+2个字节
    - mediumtext，长度为16777215，L+3个字节
    - longtext，长度为4294967295，L+4个字节
  
- 二进制类型
  
  > 二进制类型可以在定义时使用M来指定长度
  
  - text，文本类型，一般用来存储文本，最大长度65535字节
  - bit(M)，以**二进制的形式**保存，M 表示每个值的位数，范围为 1～64。如果 M 被省略，默认值为 1，大约(M+7)/8个字节
  - binary(M)，固定长度的二进制字符串，M个字节
  - varbinary(M)，可变长度的二进制字符串，M+1个字节
  - 二进制对象
    - tinyblob，255个字节
    - blob，65535个字节
    - mediumblob，16777215个字节
    - longblob，4294967295个字节



## DDL

### 操作数据库

- Create：创建

  ```mysql
  create database 数据库名称; -- 创建一个新的数据库
  
  create database 数据库名称 character set 字符集; -- 创建一个新的指定字符集的数据库
  
  create database if not exists 数据库名称; -- 如果数据库不存在，则创建；如果存在，则不创建
  ```

- Retrieve：查询

  ```mysql
  show databases; -- 查询所有数据库
  
  show create database 数据库名称; -- 查询某个数据库的创建语句和字符集
  ```

- Update：修改

  ```mysql
  alter database 数据库名称 character set 字符集; -- 修改数据库的字符集
  ```

- Delete：删除

  ```mysql
  drop database 数据库名称; -- 删除数据库
  
  drop database if exists 数据库名称; -- 如果数据库存在，则删除；如果存在，则不删除
  ```

- 使用数据库

  ```mysql
  select database(); -- 查询当前正在使用的数据库名称
  
  use 数据库名称; -- 使用某个数据库
  ```

### 操作表

- Create：创建

  ```mysql
  create table 表名(			-- 创建表的基本语法
  		列名1 数据类型1,
    	列名2 数据类型2,
    	...
    	列名n 数据类型n
  );
  
  -- 在数据类型后接 default xx 给这个列一个默认值
  
  create table 新表名 like 被复制的表名; -- 复制一份表结构相同的表
  ```

  例子

  ```mysql
  create table student(
  		id int,
    	name varchar(32),
    	age int,
    	score double(4, 1),
    	birthday date,
    	insert_time timestamp
  );
  ```

- Retrieve：查询

  ```mysql
  show tables; -- 查询某个数据库中所有的表名称
  
  desc 表名; -- 查询某个表的结构(字段、类型等信息)
  ```

- Update：修改

  ```mysql
  alter table 表名 rename to 新表名; -- 修改表名
  
  show create table 表名; -- 查看建表语句
  
  alter table 表名 character set 字符集 -- 修改表的字符集
  
  alter table 表名 add 列名 数据类型; -- 新增一列
  
  alter table 表名 change 列名 新列名 新数据类型; -- 修改列
  alter table 表名 modify 列名 新数据类型; -- 修改列的数据类型
  
  alter table 表名 drop 列名; -- 删除列
  ```

- Delete：删除

  ```mysql
  drop table 表名;	-- 删除表
  
  drop table if exists 表名; -- 删除前删除
  ```

## DML

### 添加数据

```mysql
insert into 表名(列名1, 列名2,...列名n) values(值1, 值2,...值n); -- 给对应的列添加数据
-- 列名和值要一一对应
-- 如果表名后不定义列名则默认给所有列添加值，但是要给够列
insert into 表名 values(值1, 值2,...值n); -- 给所有的列添加数据
-- 除了数字类型，其他类型都需要使用引号
```

### 删除数据

```mysql
delete from 表名 [where 条件]; -- 按条件删除数据
-- 如果不加条件，则删除表中所有记录

truncate table 表名; -- 删除表，然后再创建一个一摸一样的空表 数据量大的时候比直接drop table效率要高
-- truncate和不带where子句的delete语句作用一样
```

### 修改数据

```mysql
update 表名 set 列名1 = 值1, 列名2 = 值2,...[where 条件]; -- 修改数据
-- 如果不加条件，则修改表中所有记录

-- mysql不支持修改结果集的数据
update(select ...)
```

## DQL

### 基本语法

```mysql
select 					-- 查询语句基本语法
		字段列表
from
		表名列表
where
		条件列表
group by
		分组字段
having
		分组之后的条件
order by
		排序
limit
		数据量限定;
```

### 基础查询

```mysql
select * from 表名; -- 查询表中所有数据

select 列名1, 列名2,... from 表名; -- 按列查询数据

select distinct 列名 from 表名; -- 去除重复的结果集
-- 在查询时distinct关键字会应用于所有列而不是前置它的列

-- 如果有null值参与计算，计算结果都是null
-- 解决方法 ifnull(原值，如果是null替换的值)
select ifnull(列名, 0)+ifnull(列名, 0) from 表名;

select 列名 (as) 别名 from 表名; -- 给查询的列名起别名 as可以省略
```

### 条件查询

```mysql
-- 运算符
>、<、<=、>=、=、<> 	 -- 比较判断符号 不等于：<>
between...and...		-- 在...范围中
in() 								-- 括号内填写 子查询或集合
is null 						-- 查询null值 不为null值：is not null
and &&
or ||
not !
like								-- 模糊查询
```

### 模糊查询

```mysql
-- 占位符
_ -- 单个任意字符
% -- 多个任意字符

-- 例子
-- 查询姓名三个字的人
select name from student where name like '___';
-- 查询姓名第二个字是伟的人
select name from student where name like '_伟%';
-- 查询姓名包含伟的人
select name from student where name like '%伟%';
```

### 排序查询

```mysql
-- 语法
order by 排序字段1 排序方式1, 排序字段2 排序方式2...;
-- 后面的排序条件只有当前面的一样的条件下才会使用后面的排序条件

-- 排序方式
asc -- 升序 默认
desc -- 降序
```

### 聚合函数

```mysql
-- 将一列数据作为一个整体，进行纵向计算
-- 常用聚合函数 (排除了null值，注意)
count -- 计算数量
max -- 最大值
min -- 最小值
sum -- 求和
avg -- 计算平均值

-- 例子
select count(`name`) from student; -- 统计一个有多少个学生
select count(ifnull(english, 0)) from student; -- 避免英语成绩为null不计算
select count(*) from student; -- 只要这一行数据有一列不为null，就算一条记录

select max(math) from student; -- 统计数学成绩最高分
select min(math) from student; -- 统计数学成绩最低分

select sum(math) from student; -- 统计各个同学的数学成绩之和

select avg(math) from sutdent; -- 计算数学成绩的平均分
```

### 分组查询

```mysql
-- 语法
group by 分组字段 having 条件;
-- 分组后只能查：分组字段、聚合函数；查其他字段没有意义
-- where与having的区别
-- 1.where作用在分组之前进行限定，如果不满足条件，则不参与分组;
--   having在分组之后限定，如果不满足结果，则不会被查询出来
-- 2.where后不可接聚合函数，having后可以进行聚合函数的判断

-- 例子
-- 查询男生女生的数学平均分
SELECT sex '性别', AVG(math) '数学平均分', COUNT(Id) '人数' FROM `student3 GROUP BY sex;

-- 70分以下的不参与分组
SELECT sex '性别', AVG(math) '数学平均分', COUNT(Id) '人数' FROM `student3` WHERE math > 70 GROUP BY sex;

-- 分组后只看人数大于2的数据
SELECT sex '性别', AVG(math) '数学平均分', COUNT(Id) '人数' FROM `student3` WHERE math > 70 GROUP BY sex HAVING COUNT(Id) > 2;
-- 可以给COUNT(Id) 起别名
```

### 分页查询

```mysql
-- 语法
limit 开始的索引,每页查询的条数;
-- 注意：开始的索引是该页开始的索引，不是页码
-- 公式：(当前页码 - 1) * 每页显示的条数
-- 最后一页：有多少条显示多少条

-- 例子
select * from student limit 0,3; -- 第一页
select * from student limit 3,3; -- 第二页
select * from student limit 6,3; -- 第三页
```

### 合并查询

- union(无重复并集) 合并时，两个表对应的**列数和数据类型必须相同**

  ```mysql
  select * from A
  union
  select * from B;
  ```

- union all(有重复并集) 相同数据不去重，有多少显示多少

  ```mysql
  select * from A
  union all
  select * from B;
  ```

- intersect(交集) 显示同时满足两个查询的记录 **mysql不支持**

  ```mysql
  
  ```

- minus(差集) 显示满足前一个查询但不满足后一个查询的记录 **mysql不支持**

- ```mysql
  
  ```

  



### 多表查询-----

- 笛卡尔积 两个集合取她们的所有组合情况(并不是所有都是正确的数据)，所以要消除无用数据

  ```mysql
  select * from table_a, table_b;
  -- 获取table_a和table_b的笛卡尔积
  ```

- 内连接查询

  ```mysql
  -- 隐式内连接：使用where条件消除无用数据
  -- 例子
  select * from emp, dept where emp.dept_id = dept.id;
  select t1.name, t2.name from emp t1, dept t2 where t1.dept_id = t2.id;
  
  -- 显式内连接
  -- 语法
  select 字段名 from 表名1 [inner] join 表名2 on 条件; -- inner可以省略
  -- 例子
  -- 查询所有员工的名字及其部门的名字
  select t1.name, t2.name from emp t1 inner join dept t2 on t1.dept.id = t2.id;
  
  
  -- 注意
  -- 查询的表、查询的条件、查询的字段
  ```

- 外连接查询

  ```mysql
  -- 左外连接
  -- 语法
  select 字段名 from 表名1 left [outer] join 表名2 on 条件; -- outer可以省略
  -- 查询的是左表所有数据及其交集部分,在内连接基础上保证左表数据完整,如果不匹配显示为null
  -- 例子
  -- 查询所有员工的名字及其部门的名字，没有部门的也查出来
  select t1.name, t2.name from emp t1 left join dept t2 on emp.dept_id = t2.id;
  
  -- 右外连接
  -- 语法
  select 字段名 from 表名1 right [outer] join 表名2 on 条件; -- outer可以省略
  -- 查询的右表所有数据及其交集部分
  -- 例子
  -- 没有部门的员工查询不出来
  select t1.name, t2.name from emp t1 right join dept t2 on emp.dept_id = t2.id;
  ```

- 子查询

  ```mysql
  -- 查询中嵌套查询，称为子查询
  
  -- 子查询的结果是单行单列的
  		-- 子查询可以作为条件，使用运算符去判断：< <= > >= =
  -- 例子 查询工资小于平均工资的人
  select name from emp where salary <= (select avg(salary) from emp);
  
  
  -- 子查询的结果是多行单列的
  		-- 子查询可以作为条件，使用运算符去判断：in、not in
  -- 例子 查询财务部和市场部的员工
  select name from emp where dept_id in (select id from dept where name = '财务部' or name = '市场部');
  
  
  -- 子查询的结果是多行多列的
  		-- 子查询可以作为虚拟表，可以对其进行普通的表查询
  -- 例子 查询员工入职日期是2011-11-11之后的员工信息和部门信息
  select t1.name, t2.name from (select * from emp where join_date > '2011-11-11') t1, dept t2 where t1.dept_id = t2.id;
  -- 普通内连接查询做法：
  select t1.name, t2.name from emp t1 where t1.join_date > '2011-11-11' join dept t2 on t1.dept = t2.id;
  select t1.name, t2.name from emp t1, dept t2 where t1.dept_id = t2.id and t1.join_date > '2011-11-11';
  ```

- 练习

  ```mysql
  -- 1.查询所有员工信息。查询员工编号，员工姓名，工资，职务名称，职务描述
  SELECT 
  	t1.id, 
  	t1.ename, 
  	t1.salary, 
  	t2.jname, 
  	t2.description 
  FROM 
  	emp t1, 
  	job t2 
  WHERE 
  	t1.job_id = t2.id;
  
  
  -- 2.查询员工编号，员工姓名，工资，职务名称，职务描述，部门名称，部门位置
  SELECT 
  	t1.id, 
  	t1.ename, 
  	t1.salary, 
  	t2.jname, 
  	t2.description, 
  	t3.dname, 
  	t3.loc 
  FROM 
  	emp t1, 
  	job t2, 
  	dept t3 
  WHERE 
  	t1.job_id = t2.id 
  	AND t1.dept_id = t3.id;
  
  
  -- 3.查询员工姓名，工资，工资等级
  SELECT
  	t1.ename,
  	t1.salary,
  	t2.grade
  FROM
  	emp t1,
  	salarygrade t2
  WHERE
  	t1.salary BETWEEN t2.losalary AND t2.hisalary;
  
  
  -- 4.查询员工姓名，工资，职务名称，职务描述，部门名称，部门位置，工资等级
  SELECT
  	t1.ename,
  	t1.salary,
  	t2.jname,
  	t2.description,
  	t3.dname,
  	t3.loc,
  	t4.grade
  FROM
  	emp t1,
  	job t2,
  	dept t3,
  	salarygrade t4
  WHERE
  	t1.job_id = t2.id 
  	AND t1.dept_id = t3.id 
  	AND t1.salary BETWEEN t4.losalary AND t4.hisalary;
  
  
  -- 5.查询出部门编号、部门名称、部门位置、部门人数
  SELECT 
  	t1.id,
  	t1.dname,
  	t1.loc,
  	t2.`count`
  FROM
  	dept t1,
  	(SELECT
  		dept_id,
  		COUNT(id) `count`
  	FROM
  		emp
  	GROUP BY dept_id) t2
  WHERE 
  	t1.id = t2.dept_id;
   
  
  -- 6.查询所有员工的姓名及其直接上级的姓名,没有领导的员工也需要查询
  SELECT
  	t1.ename,
  	t2.ename
  FROM
  	emp t1
  LEFT JOIN
  	emp t2
  ON
  	t1.mgr = t2.id;
  ```

## DCL

### 管理员户

```mysql
-- 查询用户
select * from user;
-- 通配符：% 表示可以在任意主机使用用户登陆数据库

-- 创建用户
create user '用户名'@'主机名' identified by '密码';

-- 删除用户
drop user '用户名'@'主机名';

-- 修改密码
update user set password = password('新密码') where user = '用户名';
-- 或
set password for '用户名'@'主机名' = password('新密码')；

-- 忘记root用户密码
-- 1.停止mysql服务 net stop mysql 
-- 2.使用无验证方式启动mysql服务 mysqld --skip-grant-tables
-- 3.无需用户名 登陆mysql服务
-- 4.设置root用户密码
-- 5.杀掉mysqld的进程
-- 6.启动mysql服务，使用新密码登陆
```

### 授权

```mysql
-- 查询权限
SHOW GRANTS FOR '用户名'@'主机名';

-- 授予权限
GRANT 权限列表 on '数据库名'.'表名' to '用户名'@'主机名';
-- 授予所有权限 on *.*

-- 撤销权限
revoke 权限列表 on '数据库名'.'表名' from '用户名'@'主机名';
```



## 约束

概念：对表中的**数据**进行限定，从而保证数据正确性、有效性、完整性

### 分类

- 主键约束：primary key
- 非空约束：not null
- 唯一约束：unique
- 外键约束：foreign key

### 非空约束 not null

- 创建表时添加约束

  ```mysql
  CREATE TABLE stu(
  	id INT,
  	name VARCHAR(20) NOT NULL -- name为非空
  );
  ```

- 删除非空约束

  ```mysql
  alter table stu modify name varchar(20); -- 后面不写就代表name这一列没有其他约束了
  ```

- 修改表方式添加约束

  ```mysql
  alter table stu modify name varchar(20) not null;
  ```

### 唯一约束 unique

- 创建表时添加约束

  ```mysql
  CREATE TABLE stu(
  	id INT,
  	phone VARCHAR(20) UNIQUE -- 添加唯一约束
  );
  
  -- 注意 唯一约束限定的列的值可以有多个null
  ```

- 删除唯一约束

  ```mysql
  alter table stu drop index phone; -- 删除唯一索引
  ```

- 修改表方式添加约束

  ```mysql
  alter table stu modify phone varchar(20) unique; -- 添加之前应先检查原有数据是否符合约束
  ```

### 主键约束 primary key

- 含义：非空且唯一 not null+unique， 表中记录的唯一标识

- 一张表只能有一个字段为主键

- 创建表时添加约束

  ```mysql
  create table stu(
  	id int primary key, -- 给id添加主键约束
    name varchar(20)
  );
  
  -- 聚合主键
  primary key(col1, col2);
  ```

- 删除主键

  ```mysql
  alter table stu drop primary key; -- 由于一个表只能有一个主键，所以可以不用指定字段名
  ```

- 修改表方式添加主键

  ```mysql
  alter table stu modify id int primary key;
  ```

- 自动增长

  - 概念如果某一列是数值类型，使用auto_increment 可以完成自动增长，之后赋值的时候赋null值也不会影响，null值之前自增。自增是按照上一条记录的值来自增，无论前面的值是否连续。

  - 创建表时添加主键约束并完成自动增长

    ```mysql
    create table stu(
    	id int primary key auto_increment, -- 给id添加主键约束
      name varchar(20)
    );
    ```

  - 删除自动增长

    ```mysql
    alter table stu modify id int; -- 删除自动增长，但是无法删除主键
    ```

  - 修改表的方式添加自动增长

    ```mysql
    alter table stu modify id int auto_increment;
    ```

### 外键约束 foreign key

- 让表于表产生关系，保证数据的正确性

- 创建表时建立外键

  ```mysql
  -- 语法
  create table 表名 {
  	...
  	外键列
  	constraint 外键名称 foreign key (外键列) references 主表名称(列名)
  }
  
  -- 可以省略constraint 外键名称， 系统会分配一个唯一的名称给这个外键
  ```

- 删除外键

  ```mysql
  alter table 表名 drop foreign key 外键名;
  ```

- 添加外键

  ```mysql
  alter table 表名 add constraint 外键名 foreign key (外键列) references 主表名称(列名);
  ```

- 级联操作

  ```mysql
  -- 语法
  alter table 表名 add constraint 外键名 foreign key (外键列) references 主表名称(列名)
  on update cascade on delete cascade;
  
  
  -- 分类
  -- 级联更新、级联删除
  ```

## 数据库还原与备份

- 命令行方式

  ```
  备份：mysqldump -u用户名 -p密码 数据库名 > 保存的路径
  
  还原：
  	1.登陆数据库
  	2.创建数据库
  	3.使用数据库
  	4.执行文件 source 文件路径
  ```

- 图形化工具方式

## select 语句完整的执行顺序

1. **from 子句组装来自不同数据源的数据**，所以为表创建别名，别的地方能用
2. **join...on 子句**
3. **where 子句基于指定的条件对记录行进行筛选**
4. **group by 子句将数据划分为多个分组**
5. **使用聚集函数进行计算**
6. **使用 having 子句筛选分组**
7. 计算所有的表达式
8. **select 的字段**
9. distinct
10. **使用 order by 对结果集进行排序**

## In和Exists区别

### In

```mysql
select 
	*
from
	A
where
	A.field IN (
    select 
    	B.field
    from
    	B
  )
```

执行顺序

1. 执行子查询
2. 将查询结果和原有的A表做笛卡尔积
3. 再根据`where A.field IN B.field`的条件进行筛选

### Exists

```mysql
SELECT
	A.*
FROM
	A
WHERE
	EXISTS (
		SELECT
			B.user_id
		FROM
			B
		WHERE
			A.id = B.user_id
	)
```

执行顺序

1. 执行主查询
2. 将查询结果执行`EXISTS`子句
3. 依次去判断后面的条件是否成立

### 应用场景

如果**子查询**得出的结果集**记录较少**，**主查询**中的**表较大**且又有索引时应该用`in`

如果**主查询记录较少**，**子查询中的表大**，又有索引时使用`exists`

如果是exists，那么以外层表为驱动表，先被访问，如果是IN，那么先执行子查询，所以我们会以驱动表的快速返回为目标

如果查询语句使用了not in 那么内外表都进行全表扫描，没有用到索引；而not extsts 的子查询依然能用到表上的索引。**所以无论那个表大，用not exists都比not in要快**。

## 常用操作

### 字符串截取

- left(str, length): 从字符串左边截取length的长度
- right(str, length): 从字符串右边截取length的长度
- substring(str, pos, len): 从字符串的第pos个位置开始截取，len为空的话代表截取到结尾

### 类型转换

- cast(value as type)
- convert(value, type)
- type: DECIMAL浮点数、SIGNED整型、UNSIGNED无符号整数

### 字段递增赋值

```mysql
-- 设置一个变量 注意@
set @r:=0;
-- 赋值
update tablename set id=(@r:=@r+1)
```

### 格式化字符串补0

- LPAD(str, len, 0): 左边补0
- RPAD(str, len, 0): 右边补0
- 如果len小于str的长度，则截取str

## explain解析

### id

- 有多少个不同的id就说明有多少个查询(主查询+子查询)，从id大到小执行

  ```mysql
  -- 查询mysql课程的老师手机号
  explain
  select tc.phone
  from teacher_contact tc
  where tcid = (
  	select tcid
  	from teacher t
  	where t.tid = (
    	select c.tid
    	from course c
    	where c.cname = 'mysql'
    )
  );
  ```

  ![image-20200930181447617](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/image-20200930181447617.png)

- 相同的id，table列从上到下查询。(数据量会影响sql语句执行顺序--小表驱动大表)

  ```mysql
  -- 查询课程id为2，或者联系表id为3的老师
  explain
  select t.tname, c.cname, tc.phone
  from teacher t, course c, teacher_contact tc
  where t.tid = c.tid
  and t.tcid = tc.tcid
  and (
    c.cid = 2 or tc.tcid = 3
  );
  ```
  
  查询表的顺序是 tc--t--c
  
  ![image-20201003152102982](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/image-20201003152102982.png)
  
  ```mysql
  -- 删掉三行
  delete from teacher where tid in (4,5,6);
  ```
  
  查询表的顺序是 t--c--tc
  
  ![image-20201003152450710](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/image-20201003152450710.png)
  
  关联查询本质是笛卡尔积，最终数量等于a * b * c，**查询优化器会选择中间结果比较少的执行方式**

### select_type

- SIMPLE。没有子查询，没有关联查询

  ```mysql
  explain select * from teacher;
  ```

- PRIMARY。嵌套查询中最外层的查询

- SUBQUERY。子查询

- DERIVED。衍生查询，查询中出现临时结果，中间括号部分叫临时表或派生表

  ```mysql
  explain select cr.name
  from (
  	select * from course where t.id = 1
  	union
    select * from course where t.id = 2 
  ) cr;
  ```

  ![image-20201003153741682](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/image-20201003153741682.png)

- UNION。用到了union关键字的查询

### type(连接类型)

按效率从上往下排序

- 可遇不可求
  - null。MySQL 在优化过程中分解语句，**执行时甚至不用访问表或索引**，例如从一个索引列里选取最小值可以通过单独索引查找完成。
  - system，const类型的一种特例，跟连接中mysql库有关联。**当查询系统表中只有一行结果的情况**
  - const，常量。**单表查询**，当使用主键索引或唯一索引查询到只有一行结果的情况，性能非常好的一种查询
  - eq_ref。**关联查询中**，用索引去查询数据时，一个索引只有一条记录对应(**唯一索引unique index，聚集索引primary index**)，当找到一条数据后马上停止搜索。
- 优化的目标
  - ref。关联查询中，使用非唯一索引查询数据，一个索引可能对应多条记录，所以搜索到一条记录后，要进行目标值附近的小范围扫描，但也不会进行全表扫描
  - range。范围查询，大于、小于、`in`、`between and`。只检索给定范围的行，使用一个索引来选择行
- 一定需要优化的情况
  - index。没有过滤条件，查询索引上全部的数据，**遍历索引树**。
  - all。没有用到任何索引或这张表没有索引，代表**全表扫描**。

### possible_keys(可能用到的索引)

### key(实际用到的索引)

possible_keys为null，key不为null的情况

> 当表中存在联合索引(a,b,c)时，执行以下sql语句 select b from tab where b = 'xxx';
>
> possible_keys为null，key为comidx_a_b_c，Extra有Using index
>
> 和索引覆盖有一定联系：理论上没有使用到索引，但是由于查询的数据刚好在索引的字段中，所以还是会在索引中检索数据

### key_len(索引的长度)

根据实际用到的索引来计算索引的长度，与索引字段的类型及其长度有关系，可以通过这个值去判断是不是用到期望的索引

### rows(估算找到对应记录所需要的行数)

### Extra

- 比较好的情况
  - `Using index` 覆盖索引，索引覆盖了查询的列，不需要回表
  - `Using index condition` 索引下推，服务端把条件下推给存储引擎
- 普通的
  - `Using where` 不用读取表中所有信息，仅通过索引就可以获取所需数据，这发生在对表的全部的请求列都是同一个索引的部分的时候，从存储引擎中获取数据后还需要在服务端中再次过滤
  - `Using filesort` 不能基于索引(where子句中的条件)排序，使用了额外的方式(order字句)来排序
  - `Using temporary` 使用了临时表。
    - 在没有索引的列上使用`distinct`查询时
    - 在没有索引的列上使用`group by`操作
    - 做`join`查询时，对任意一个列进行`group by`操作
    - 排序`order by`操作

# 字符集

**MySQL 8.0开始默认字符集是 `utf8mb4` ，之前版本默认字符集都是 `latin1`**

UTF-8 字符集表示每个字符最多使用 4 个字节。中文占 3 个字节，其他数字、英文、符号占 1 个字节，**但是一些 emoji 符号、繁体字等需要使用 4 个字节来表示**。

而**在 MySQL 中真正表示 UTF-8 字符集的字符集是 `utf8mb4`**。

其中还有一个字符集是 `utf8`，这个不是真正意义上的 UTF-8 字符集，这个字符集最多使用 3 个字节来表示字符，只是囊括了常用的情况，**无法一些特殊字符、表情符号**。

**强烈建议各位把字符集都修改为 utf8mb4。**



这里我引用 CSDN 上名为“_陈哈哈”前辈的话：[MySQL中的 utf8 并不是真正的UTF-8编码 ! !](https://blog.csdn.net/qq_39390545/article/details/106946166)

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20221027152056.png)



# 存储引擎

MyISAM、InnoDB、HEAP、BOB、ARCHIVE、CSV等

## InnoDB

MySQL默认事务型引擎

- 数据存储在表空间(由InnoDB管理的一个黑盒子，由一系列数据文件组成)中。
- 采用MVCC来支持高并发，实现了四个标准的隔离级别。默认是repeatable read。通过**间隙锁**的策略防止幻读的出现
- 基于簇组索引建立的
- 支持**事务**
- 支持**外键**
- 支持**行级锁**；合适于插入和更新操作比较多的应用，适合大数据，大并发。

## MyISAM

- 将表存储在两个文件中：数据文件(.MYD)、索引文件(.MYI)
- **表级锁**；针对表加锁，读取时会对所有需要读的表加上共享锁，写入时对表加上排他锁。支持并发插入，查询的同时可以插入新记录。适合用于**频繁查询**的应用。表锁，不会出现死锁，适合**小数据，小并发**。
- 索引，就算是blob和text类型也可以基于前500个字符来建立索引。也支持全文索引，是一种基于分词创建的

# 事务

## 概念

数据库最小的工作单元

如果一个包含多个步骤的业务操作，被事务管理，那么这些操作要么同时成功，要么同时失败。

## 操作

- 开启事务：`start transaction`
- 事务回滚：`rollback`
- 事务提交：`commit`

开启事务后，没有进行回滚或提交之前，数据会发生“临时”的变化，但是这个变化不是持久的，当关闭当前窗口，数据就会自动默认回滚到之前的状态。如果发现过程中有失败的，那么可以使用回滚，回滚到事务开启的时候数据的状态；如果整个过程都成功，那么可以使用事务提交，让这个临时的变化变成持久的变化。

```mysql
-- 开启事务
start transaction

-- 转账
update account set balance = balance - 500 where name = '张三';
-- 出错了 导致张三的钱扣了，但是李四的钱没有扣到
update account set balance = balance + 500 where name = '李四';

-- 发现事务有问题，进行事务回滚
rollback;

-- 发现事务没有问题，进行事务提交
commit;
```

事务提交的两种方式

- 自动
  - mysql就是默认自动提交的。一条DML语句就会自动提交一次事务
- 手动
  - 需要先`start transaction`开启事务，再`commit`提交事务；在处理过程中如果遇到错误，MySQL一般会自动回滚

```mysql
-- 查看事务默认的提交方式
select @@autocommit; -- 1 自动提交 2 手动提交

-- 修改默认提交方式
set @@autocommit = 0;
-- 修改之后每次的dml语句的执行若想持久化改变就要手动执行commit语句
```

## 四大特征

- 原子性(Atomicity)：事务是不可再分割的最小操作单位，事务中的所有操作要么同时成功，要么同时失败
- 一致性(Consiitency)：事务操作前后，数据、结构完整性不被破坏
- 隔离性(Isolation)：多个事务之间，相互独立。一个事务所做的修改在最终提交前，对其他的事务不可见
- 持久性(Durability)：如果事务提交或者回滚，那么它会持久地更新数据库
- C是目的，AID是手段

## 事务四大特性中原子性、持久性、隔离性实现原理

> 原子性：当事务执行时，先记录undolog(undolog记录的是操作前的值)，随后记录redolog(redolog记录的是操作后的值)。当未提交事务时发生宕机，先执行redolog，把值更新成操作后的值，再执行undolog，把值更新回操作前的值，从而保证事务的执行状态一致
>
> 隔离性：两种方案：1、加锁；2、MVCC。保证在不同的事务中保证前后两次执行相同的查询操作读取到相同的数据
>
> 持久性：因为操作时，数据会写入redolog，所以即使发生宕机了，也能从redolog中去恢复修改的数据，保证了数据的持久性

## 事务并发三大问题

概念：多个事务之间是相互独立的。但是多个事务操作同一批数据，则会引发一些问题，可以通过设置不同的隔离级别来规避这些问题

存在的问题：

1. 脏读：一个事务**读取**另一个事务中**没有提交的数据**
2. 不可重复读(虚读)：在同一个事务中，两次读取的**数据内容不一致**。这是事务 **update **或 **delete** 引发的。
3. 幻读：某个事务在读取某个范围内的记录时，另一个事务又从在范围插入了新纪录，当前的事务在读取该范围的记录时，就会产生幻读。在同一个事务中，两次读取的**数据的数量不一致**。这是 **insert** 时引发的问题

## 隔离级别

1. read uncommitted：读未提交。产生问题：脏读、虚读、幻读。

   **在同一事务内，读取到另一事务未提交的数据**

2. read committed：读已提交。产生问题：虚读、幻读。

   **在同一事务内，读取到另一事务已提交的数据。**

3. repeatable read：可重复读。产生问题：幻读(MySQL默认级别)。

   **在同一事务内，多次读取的数据都是一样的，除非提交事务，否则无法读取其他事务提交的数据**

4. serializable：串行化。可以解决所有问题，在读取的每一行数据上都加锁

   **锁表操作。在一个事务操作这个表的过程中，另外的事务不允许操作这个表，只有锁打开了，才可以操作**

| 事务隔离级别     | 脏读   | 不可重复读(虚读) | 幻读           |
| ---------------- | ------ | ---------------- | -------------- |
| Read Uncommitted | 可能   | 可能             | 可能           |
| Read Committed   | 不可能 | 可能             | 可能           |
| Repeatable Read  | 不可能 | 不可能           | 对InnoDB不可能 |
| Serializable     | 不可能 | 不可能           | 不可能         |

注意：隔离级别从小到大，**安全性越来越高**，但**效率越来越低**

```mysql
-- 查询隔离级别
SELECT @@transaction_isolation;

-- 设置隔离级别(重启生效)
set global transaction isolation level 级别;
```

### 死锁

两个或两个以上的事务在同一个资源上相互占用，并请求锁定对方占用的资源，从而导致恶性循环的现象

**解决方法**：

InnoDB：将持有**最少行级排他锁**的事务进行回滚

### InnoDB解决幻读的方式

MVCC

基于版本Id

临键锁

当前读需要加锁，MVCC中的快照读(数据的副本)不需要加锁

# 锁

作用：事务获取锁这种控制资源，用于保护数据资源，防止其他事务对数据进行冲突的或不兼容的访问，解决事务对于数据并发访问的问题

## 锁粒度

- 锁定粒度：表锁 > 行锁
- 加锁效率：表锁 > 行锁，因为行锁需要先从表中检索到之后才可以加锁
- 冲突概率：表锁 > 行锁
- 并发性能：表锁 < 行锁

InnoDB支持行锁和表锁；MyISAM支持表锁

### 表锁

开销最小的策略。锁定整张表，当一个用户在对表进行新增、删除、修改操作时，需要先获取写锁，这会阻塞其他用户对这张表的读取和修改操作。

写锁会比读锁有更高优先级，写锁可以在锁队列中插入到读锁的前面，读锁不可以。

### 行级锁

锁机制都是在**存储引擎层实现**的，除了服务器某些情况会加表锁(如修改表ALTER TABLE的时候)

## 锁类型

事务结束时自动释放锁

### 共享锁(读)(行)

- 当试图**读取**数据时，事务会为所依赖的数据资源请求共享锁

- 持有共享锁时间：从事务得到共享锁到读操作完成

- 多个事务可以在**同一阶段用共享锁作用于同一数据资源**

- 加锁方式

  ```mysql
  select * from student where id = 1 LOCK IN SHARE MODE;
  ```

### 排他锁(写)(行)

- 当试图**修改**数据时，事务只能为所依赖的数据资源请求排他锁

- 持有排他锁时间：一旦某个事务得到了排他锁，则这个事务将一直持有排他锁直到事务完成

- 一个事务获得了一行数据的排他锁，其他事务就不能再获取该行的锁(共享、排他)，只有获取了排他锁的事务才可以对数据进行读取和修改

- 加锁方式

  ```mysql
  -- 自动
  delete / update / insert 默认加上排他锁
  -- 手动
  select * from student where id = 1 FOR UPDATE;
  ```

### 意向共享锁(表)

意向锁是存储引擎维护的，用户无法手动操作意向锁

表示事务准备给数据行加入共享锁，也就是说一行数据加共享锁前必须先取得该表的意向共享锁

### 意向排他锁(表)

表示事务准备给数据行加入排他锁，也就是说一行数据加排他锁前必须先取得该表的意向排他锁

### 意向锁的意义

可以理解为一个标志，一个事务要成功地锁定一张表的前提：必须确认没有其他事务已经锁定了这张表的任意一行数据。意向锁的存在可以使得加锁前不需要进行全表扫描，所以加锁的效率就更稳定了

### 锁的内容

不加索引，锁表

建立主键索引，锁行

建立主键索引，建立唯一索引，锁行

- **锁的内容是索引**

- 没有索引时，加行锁会锁表

> 因为没有直接使用索引来加锁，InnoDB做了一个全表扫描，把这张表所有的隐含的默认的聚集索引全部锁住了，所以造成了锁表的假象。

- 通过唯一索引加锁时会把主键索引也锁住

> 因为唯一索引存了二级索引本身还存了主键值，锁定了辅助索引后，会把主键索引也锁住

## 行锁算法

**索引区间划分**

- 记录：具体的索引值

- 间隙：每个记录之间的空内容的区间

- 临键：间隙+下一个记录，**左开右闭**
- N个记录，N+1间隙

![image-20200928225821932](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/image-20200928225821932.png)

### 记录锁

使用条件：唯一性索引(唯一索引或聚集索引)等值查询(使用`=`，不是范围查询)，精准匹配到某一条记录

锁定内容：索引

![image-20200928231714612](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/image-20200928231714612.png)

### 间隙锁

**只有在可重复读的事务隔离级别下存在**

使用条件：查询时没有命中任何一条记录，无论使用范围查询还是等值查询

锁定内容：命中的那一个间隙。锁定后，对该间隙的插入和查询都不成功

**可以防止幻读**

![image-20200928232138971](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/image-20200928232138971.png)

### 临键锁

使用条件：范围查询时，范围同时包含了记录和区间；如果没有任何记录，那么退化成间隙锁；如果精准匹配到一条记录，那么退化成记录锁

锁定内容：记录+区间

**是InnoDB默认的行锁算法**

![image-20200928234952461](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/image-20200928234952461.png)

## 乐观锁和悲观锁的区别

> 两者都不是锁的实现，而只是锁的策略
>
> 悲观锁会在事务开始时对数据进行上锁操作，从而保证其他线程无法对该行数据进行修改，等到事务结束时才会释放锁
>
> 乐观锁最大的特点就是不加锁，只会在提交事务时检查对应的数据(状态、版本号、时间戳等)来保证要操作的数据是否被修改过，如果修改过则本次修改失效并回滚

## 锁兼容情况

### 共享锁、排他锁、意向锁

| 已持有\请求的 | 共享锁 | 排他锁 | 意向共享锁 | 意向排他锁 |
| :-----------: | :----: | :----: | :--------: | :--------: |
|    共享锁     |  兼容  |  冲突  |    兼容    |    冲突    |
|    排他锁     |  冲突  |  冲突  |    冲突    |    冲突    |
|  意向共享锁   |  兼容  |  冲突  |    兼容    |    兼容    |
|  意向排他锁   |  冲突  |  冲突  |    兼容    |    兼容    |

1. 排他锁跟其他锁都是冲突的
2. 意向锁互相兼容

### 间隙锁、记录锁、临键锁

## 查看加锁方式

`select * from schema.INNODB_TRX`

### 参数含义

|         参数          |                         参数意义                          |
| :-------------------: | :-------------------------------------------------------: |
|       trx_state       | 事务执行状态：RUNNING、LOCK WAIT、ROLLING BACK、COMMITING |
|      trx_started      |                      事务开始的时间                       |
| trx_requested_lock_id |                      等待事务的锁Id                       |
|  trx_mysql_thread_id  |                  查询时，可能使用的索引                   |

当前事务如果等待时间过长或出现死锁的情况，可以通过 「**kill 线程ID(trx_requested_lock_id)**」 的方式释放当前的锁。

# 日志

MySQL日志主要包括错误日志、一般查询日志、慢查询日志、**事务日志**、**二进制**日志几大类

日志刷新操作

mysql

```mysql
FLUSH LOGS;
```

shell

```shell
mysqladmin flush-logs
```

## 错误日志

记录MySQL服务启动和停止正确和错误的信息，还记录了`mysqld`实例运行过程中发生的错误事件信息

查看错误日志的位置

```mysql
show variables like 'log_error';
```

## 一般查询日志

查询日志可以分为一般查询日志和慢查询日志，通过查询时间`long_query_time`的值来判定

建议关闭这种日志，**默认是关闭的**，因为一般查询日志记录的意义不大，且数据量巨大，一般查询日志记录的不仅仅是`select`语句，几乎所有的语句都会记录

一般查询日志相关变量

```
general_log=off # 是否启用一般查询日志，为全局变量，必须在global上修改。
general_log_file=/mydata/data/hostname.log  # 默认是库文件路径下主机名加上.log
```

## 慢查询日志

查询时间超出变量`long_query_time`所设定值的查询被认为是慢查询，但是查询获取锁(包括锁等待)的时间不计入查询时间内

查看慢查询日志的开启情况

```mysql
show variables like 'slow_query%';
```

开启慢查询日志

```mysql
-- 会话
set slow_query_log='ON';
-- 全局
set global slow_query_log='ON';
-- 永久
-- 修改my.cnf文件
```

慢查询日志相关变量:

```
long_query_time=10 # 指定慢查询超时时长(默认10秒)，超出此时长的属于慢查询
slow_query_log={on|off}  # 是否启用慢查询日志，默认为off
slow_query_log_file=/mydata/data/hostname-slow.log  # 慢查询日志位置，默认文件名后面会加上-slow.log
log_queries_not_using_indexes={on|off} # 查询没有使用索引的时候是否也记入慢查询日志，默认为off
```

慢查询日志专用分析工具：`mysqldumpslow`

```shell
> mysqldumpslow [option] slow_query_log_file
  -d           `debug`：归类后的结果只是精确到0.01秒的，debug选项可以显示其精确的秒数
  -v           `verbose`：显示详细信息
  -t NUM       `just show the top n queries`：仅显示前n条查询
  -a           `don't abstract all numbers to N and strings to 'S'`：归类时不要使用N替换数字，S替换字符串变量
  -g PATTERN   `grep: only consider stmts that include this string`：通过grep来筛选select语句。
```

## 二进制日志(binlog)

- `binlog`（归档日志）包含了**引起或可能引起数据库改变**(如`update`、`delete`语句但没有匹配行)的事件信息，但绝不会包括`select`和`show`这样的查询语句。语句以**"事件"的形式保存**，所以包含了**时间、事件开始和结束位置等信息**。
- 对于事务表的操作，二进制日志**只在事务提交的时候一次性写入**，提交前的每个二进制日志记录都先cache，提交时写入。
- 对于事务表来说，一个事务中可能包含多条二进制日志事件，它们会在提交时一次性写入；而对于非事务表的操作，每次执行完语句就直接写入。
- MySQL数据库的**数据备份**、**主备**、**主主**、**主从**都需要`binlog`来同步数据，保证数据一致性

### 查看二进制日志

#### 在命令行使用mysqlbinlog工具

```shell
> mysqlbinlog [option] log-file...
  -d name, --database=name	只查看指定数据库的日志操作
  -o n, --offset=n				忽略掉日志中的前n个操作命令(事件)
  -r name, --result-file=name		将输出的日志信息输出到指定的文件中，使用重定向也一样可以。
  -s, --short-form					显示简单格式的日志，会省略掉一些额外的信息如位置信息和时间信息以及基于行的日志。
  --start-datetime=m, --stop-datetime=n			指定输出开始时间和结束时间内的所有日志信息
  --start-position=m, --stop-position=n			指定输出开始位置和结束位置内的所有日志信息
  --set-charset=char_name	在输出日志信息到文件中时，在文件第一行加上set names char_name
  -v, -vv		显示更详细信息，基于row的日志默认不会显示出来，此时使用-v或-vv可以查看
```

- 成功执行DML命令在binlog中会包含一对`begin`和`commit`

#### 在mysql客户端中使用show命令

- `show binary logs` ，查看当前使用了哪些二进制日志文件
- `show binlog events in file`，查看日志中进行了哪些操作
- `show master status`，显示主服务器中的二进制日志信息。如果是主从结构，它只会显示主从结构中主服务器的二进制日志信息。可以查看到当前正在使用的日志及下一事件记录的开始位置，还能查看到哪些数据库需要记录二进制日志，哪些数据库不记录二进制日志

### 删除二进制日志

- `reset master`，删除所有日志，并让日志文件重新从000001开始
- `purge binary logs to 'filename.000006'`，清空000006之前的所有日志文件
- `purge binary logs before '2020-01-01 10:00:00'`，删除指定日期之前的所有日志。但是若指定的时间处在正在使用中的日志文件中，将无法进行purge

### binlog日志格式

- `statement`，记录为SQL语句形式，如：`update T set update_time=now() where id=1`，记录的内容如下：

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210907111312.png)

  同步数据时，就执行记录里面的SQL语句

  缺陷：由于`uuid()`、`now()`这些方法每次执行的值都是不一样的，所以**无法记录动态值**

- `row`，记录为SQL语句及其操作的具体数据，保证了动态值确定性，记录的内容如下：

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210907111928.png)

  `row`格式记录的内容看不到详细信息，要通过`mysqlbinlog`工具解析出来。

  缺陷：导致**日志文件变得非常大**，恢复与同步时会更消耗`IO`资源，影响执行速度

- `mixed`，MySQL自己确定使用`statement`还是`row`形式，默认使用`statement`，以下几种情况会使用`row`形式
  
  - 表的存储引擎为NDB，这时对表的`DML`操作都会以`row`的格式记录
  - 使用`now()`、`uuid()`、`user()`等可能引起数据不一致的函数
  - 使用`insert delay`语句
  - 使用临时表

### binlog 刷盘时机

在事务执行的过程中，先把内容写入到`binlog cache`中，在日志提交时，会把`binlog cache`中的内容写入`page cache`中，然后等待刷盘写入到`binlog`文件中

因为一个事务的`binlog`不能被拆开，无论这个事务多大，也要**确保一次性写入**，所以系统会给每个线程分配一个块内存作为`binlog cache`，可以通过`binlog_cache_size`参数控制单个线程 `binlog cache` 大小，如果存储内容超过了这个参数，就要暂存到磁盘`Swap`

`binlog`刷盘策略提供了`sync_binlog`参数

- 0：每次事务提交时都只把 `binlog buffer` 内容写入 `page cache`，等待后台线程每秒的刷盘，把`page cache`的内容写入`binlog`文件**（默认）**

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210908143542.png)

  由于`binlog cache`写入到`page cache`都是内存中的操作，不涉及到磁盘的操作，所以性能很高

  缺点：当机器宕机，而且`page cache`还没进行刷盘操作时，`page cache`中本该记录到`binlog`日志中的内容会丢失

- 1：每次事务提交时都会把`page cache`的内容进行刷盘

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210908141410.png)

  每次事务提交都执行一次完整的记录流程，从`binlog cache`到`page cache`再到磁盘，数据安全不易丢失

  缺点：每次提交事务都进行写磁盘的操作，性能不高

- N(N>1)，折中方案，每次提交事务都把`binlog cache`的内容写入到`page cache`，但是累积N个事务后，才把`page cache`中的内容进行刷盘

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210908144438.png)

  在出现`IO`瓶颈的场景里，将`sync_binlog`设置成一个比较大的值，可以提升性能

  缺点：如果机器宕机，那么会丢失最近的N个事务的`binlog`日志

### 二进制日志相关变量

- log_bin = {on | off | base_name} 指定是否启用记录二进制日志或者指定一个日志路径(路径不能加.否则.后的被忽略)
- log_bin_index = name 指定mysql-bin.index文件的路径
- expire_logs_days = # 指定自动删除二进制日志的时间，即日志过期时间
- binlog_do_db = name 明确指定要记录日志的数据库
- binlog_ignore_db = name 指定不记录二进制日志的数据库
- binlog_format = { mixed | row | statement }  指定二进制日志基于什么模式记录
- binlog_cache_size = 32768 **基于事务类型的日志会先记录在缓冲区**，当达到该缓冲大小时这些日志会写入磁盘
- max_binlog_cache_size = #指定二进制日志缓存最大大小，硬限制。默认4G，够大了，建议不要改
- binlog_cache_use：使用缓存写二进制日志的次数(这是一个实时变化的统计值)
- binlog_cache_disk_use:使用临时文件写二进制日志的次数，当日志超过了binlog_cache_size的时候会使用临时文件写日志，如果该变量值不为0，则考虑增大binlog_cache_size的值
- sync_binlog = { 0 | n } **这个参数直接影响mysql的性能和完整性**
  - sync_binlog=0:不同步，日志何时刷到磁盘由FileSystem决定，这个性能最好
  - sync_binlog=n:每写n次事务，MySQL将执行一次磁盘同步指令fdatasync()将缓存日志刷新到磁盘日志文件中。MySQL中默认的设置是sync_binlog=0，即不同步，这时性能最好，但风险最大。一旦系统奔溃，缓存中的日志都会丢失。
  - 在innodb的主从复制结构中，要保证事务的一致性和持久性的时候，**必须将sync_binlog的值设置为1**，因为设置为1就保证了每次事务提交时二进制日志都会写入到磁盘中，从而立即被从服务器复制过去。

### 二进制日志定点还原数据库

- 一般使用基于时间点来恢复，和基于位置相比，跨日志文件恢复时更方便

  ```shell
  mysqlbinlog --stop-datetime="2014-7-2 15:27:48" /tmp/mysql-bin.000008 | mysql -uuser -ppassword
  ```

- 可以选择恢复多个二进制文件

  ```shell
  mysqlbinlog mysql-bin.[*] | mysql -uuser -ppassword
  ```

  或者导入到一个文件中来恢复

  ```shell
  mysqlbinlog mysql-bin.000001 > /tmp/a.sql
  mysqlbinlog mysql-bin.000002 >> /tmp/a.sql
  mysql -uuser -ppassword -e "source /tmp/a.sql"
  ```

## 事务日志

### redo log

**redo log**（重做日志）是**InnoDB存储引擎独有**的，它让MySQL拥有了**崩溃恢复**的能力，恢复数据时`InnoDB`会使用`redo log`来保证数据的完整性和持久性

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210902170055.png)

#### redo log引入

因为MySQL的IO代价的缘故，MySQL客户端不会每次都直接操作磁盘

在执行查询语句时，MySQL会从磁盘中把一页的数据（称为数据页）加载出来放入**Buffer Pool**中，后续的查询都与这个`Buffer Pool`进行交互，减少磁盘IO开销，提升性能

在执行更新语句时，MySQL的做法也同样如此，当`Buffer Pool`里面的数据需要更新时，先在`Buffer Pool`里面进行更新，当内存中(`Buffer Pool`)数据和硬盘中的数据不一致时，那么内存中的数据称为**脏页**，等待后续`Buffer Pool`进行**刷脏**，然后会把在哪个数据页上做了哪些修改记录到**redo log buffer**（称为重做日志缓存）里面，等待**后续刷盘到redo log文件里面**

**从更新操作也可以看出，MySQL在写文件的处理中一般会伴随缓存+文件的组合**

redo log中的记录是由**表空间号+数据页号+偏移量+修改数据长度+具体修改的数据**组成



**总结**

不把数据页直接刷盘，而用`redo log`进行修改内容的记录的原因

1. 数据页大小是`16KB=16384Byte`，可能也就修改了数据页中几`Byte`的数据，没有必要把完整的数据页进行刷盘，**IO代价太大**
2. 数据页刷盘是**随机写**，因为一个数据页对应的位置可能在硬盘文件的随机位置，所以性能是很差的；而`redo log`是**顺序写**，刷盘速度很快

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210902172253.png)

#### redo log刷盘时机

`InnoDB`存储引擎为`redo log`的刷盘策略提供了 `innodb_flush_log_at_trx_commit` 参数，它支持三种策略。另外`InnoDB`存储引擎有一个后台线程，每隔1秒，就会把`redo log buffer`中的内容写入到**page cache（文件系统缓存）**，然后调用**fsync刷盘**

- 0：每次事务提交时不进行刷盘操作，只是等待后台线程进行每秒的刷盘

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210906165553.png)

- 1：每次事务提交时都进行刷盘操作**（默认）**，除了后台线程进行的每秒的刷盘外，一旦事务提交就进行主动刷盘

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210906170211.png)

- 2：每次事务提交时都只把 `redo log buffer` 内容写入 `page cache`，等待后台线程每秒的刷盘，把`page cache`的内容写入`redo log`文件

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210906170444.png)

#### redo log文件组

硬盘上存储的 `redo log` 日志文件是以一个**日志文件组**的形式出现的，每个的`redo`日志文件大小都是一样的

比如可以配置为一组`4`个文件，每个文件的大小是 `1GB`，那么整个 `redo log` 日志文件组可以记录`4G`的内容

它采用的是**环形数组**形式，从头开始写，写到末尾又回到头循环写

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210906171107.png)

在日志文件组中有两个重要的属性

- `write pos`：当前记录的位置，插入记录的位置
- `checkpoint`：当前擦除的位置，从`redo log`恢复数据的开始位置

如果`write pos`追上了`checkpoint`，**那就说明当前记录的`redo log`已经满了，如果再记录的话会把上一次开始记录的内容覆盖掉**，所以需要停下来先清空一些记录，把`checkpoint`往前推进

#### redo log和bin log区别

- 日志的位置
  - `redo log`是`InnoDB`存储引擎特有的，位于**存储引擎层**
  - `binlog`位于**MySQL Server层**
- 日志的内容
  - `redo log`记录的格式是**表空间号+数据页号+偏移量+修改数据长度+具体修改的数据**
  - `binlog`记录的内容是**语句的原始逻辑（SQL语句）**，不管用什么存储引擎，只要发生了表数据更新，都会产生`binlog`日志
- 两者都属于持久化的保证，但是侧重点不同
  - `redo log`让`InnoDB`存储引擎拥有了崩溃恢复能力
  - `binlog`保证了`MySQL`集群架构的数据一致性



### undo log

`undo log`（回滚日志）保证了事务的**原子性**

当异常发生时，对已执行的操作需要进行**回滚**，在MySQL中，恢复机制是通过`undo log`回滚日志实现的

**回滚日志会先于数据持久化到磁盘上**，这样就保证了即使遇到数据库突然宕机等情况，当用户再次启动数据库的时候，数据库还能够通过查询回滚日志来回滚将之前未完成的事务

#### redo log和undo log区别

MySQL `InnoDB` 引擎使用 **redo log(重做日志)** 保证事务的**持久性**，使用 **undo log(回滚日志)** 来保证事务的**原子性**。



## 两阶段提交

在执行更新语句时，会记录`redo log`和`binlog`两份日志，`redo log`在事务执行过程中可以不断写入（因为`InnoDB`存储引擎有一个后台线程，每隔1秒，就会把`redo log buffer`中的内容写入到`page cache`，然后调用`fsync`刷盘）；而`binlog`只有在事务提交时才写入，所以`redo log`和`binlog`的写入时机是不一致的

### redo log和binlog两份日志不一致导致的问题

以`update T set c = 1 where id = 2`为例，如果写完`redo log `后，`binlog`写入的过程中发生了异常

由于`binlog`没写完就异常，这时候`binlog`里面没有对应的修改记录。因此，之后用`binlog`日志恢复从库的数据时，就会少这一次更新，恢复出来的这一行`c`值是`0`，而原库因为`redo log`日志恢复，这一行`c`值是`1`，最终数据不一致

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210909112032.png)

### 两阶段提交原理

为了防止出现数据不一致的问题，MySQL将`redo log`的写入拆成了两个步骤`prepare`和`commit`，这就是**两阶段提交**

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210909112205.png)



- 当写入`binlog`时发生异常，MySQL会检查`redo log`处于什么阶段，如果是`prepare`阶段，并且也没有对应的`binlog`日志时，就会回滚事务

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210909113524.png)

- 当`redo log`设置`commit`阶段发生异常，此时虽然`redo log`还是处于`prepare`阶段，但是能通过事务Id在`binlog`中找到对应的`binlog`日志，所以可以认为这是完整的记录，就会把事务提交

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210909113538.png)

# 数据库设计

## 多表之间的关系

- 一对一(了解)

  ```mysql
  -- 如：人和身份证的关系
  -- 分析：一个人只有一个身份证，一个身份证只能对应一个人
  
  -- 实现：一对一关系的实现，可以在任意一方添加唯一外键unique指向另一方的主键；或者让两个表的主键相同；或者直接合成一张表
  ```

- 一对多(多对一)(重要)

  ```mysql
  -- 如：部门和员工的关系
  -- 分析：一个部门有多个员工，一个员工只能对应一个部门
  
  -- 实现：在多的一方建立外键，指向一的一方的主键
  ```

- 多对多

  ```mysql
  -- 如：学生和课程
  -- 分析：一个学生可以选择多门课程，一个课程也可以被很多学生选择
  
  -- 实现：多对多关系实现需要借助第三张中间表，这张中间表至少包含两个字段，这两个字段作为中间表的主键，分别指向两个表的主键
  ```

## 范式

设计数据库时需要遵循的规范。要遵循后边的范式要求，必须先遵循前边的所有范式要求

分类

- 第一范式：**每一项都是不可分割的原子数据项**
  - 不允许出现**复合列**
  
    ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrnje6vzj311y0r6arv.jpg)
  
    
  
  - 存在数据冗余
  
  - 数据添加存在问题
  
  - 数据删除存在问题
  
- 第二范式：在第一范式基础上，非码属性必须**完全依赖于码**。在第一范式的基础上**消除非主属性对主码的部分函数依赖**
  - 几个概念
    - 函数依赖：如果通过A的属性(属性组)的值可以确定唯一B的属性的值，那么就称B依赖于A。如学号->姓名，(学号，课程名称)->分数
    - 完全函数依赖：如果A是一个属性组，B属性值的确定需要依赖于A属性组中所有的属性值。如：(学号，课程名称)->分数
    - 部分函数依赖：如果A是一个属性组，B属性值的确定需要依赖于A属性组中某些的属性值。如：(学号，课程名称)->姓名，其实只需学号来确定姓名
    - 传递函数依赖：如果通过A的属性(属性组)的值，可以确定唯一B属性的值，再通过B的属性(属性组)的值，可以确定唯一C属性的值，那么就称C传递依赖于A。如：学号->系名->系主任
    - **码**：如果在一张表中，一个属性或者一个属性组，被其他所有属性所完全依赖，则称这个属性(属性组)为该表的码。如：码：(学号，课程名称)
    - 主属性：码属性组中所有属性
    - 非主属性：除码属性组外的属性
    
  - 做法：拆分表
  
    ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrmck4zvj31ja0u07wh.jpg)
  
  - 解决了**数据冗余**的问题，但存在同样的数据插入、删除的问题
  
- 第三范式：在第二范式基础上，任何非主属性不依赖于其他非主属性。在第二范式基础上消除传递依赖
  - 做法：再拆分表
  
    ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrmdbjrij31320pun9x.jpg)
  
  - 解决了数据**插入**不合法和**删除**风险的问题

## 动态字段

以产品为例，不同类型产品会有不同的属性（电脑、手机），属性名称和个数都不确定

采用做法：**属性公用+属性字段行存储**，公用的字段放在产品表中，特有的字段放在产品属性表中存储

产品分类表、产品表、属性表、产品属性表

## 行转列、列转行



# 分库分表

## 垂直切分

### 垂直分库

根据业务耦合性，将**关联度低**的不同表存储在**不同的数据库**。做法与大系统拆分为多个小系统类似，按业务分类进行独立划分。每个微服务使用单独的一个数据库

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrme94x1j30zs0msthi.jpg)

### 垂直分表

垂直分表是基于数据库中的**"列"**进行，某个表字段较多，可以新建一张**扩展表**，将**不经常用**或**字段长度较大**的字段拆分出去到扩展表中

字段过多的情况下，通过"大表拆小表"，更便于开发与维护，也能**避免跨页**问题。因为MySQL 底层是通过数据页存储的，一条记录占用空间过大会导致跨页，造成额外的性能开销。

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrmf724uj310k0gwn14.jpg)

### 优缺点

- 优点
  - 解决业务系统层面的耦合，业务清晰
  - 与微服务的治理类似，也能对不同业务的数据进行分级管理、维护、监控、扩展等
  - 高并发场景下，垂直切分一定程度的提升 IO、数据库连接数、单机硬件资源的瓶颈
- 缺点
  - 部分表无法 join，只能通过接口聚合方式解决，提升了开发的复杂度
  - 分布式事务处理复杂*
  - 依然存在单表数据量过大的问题(需要水平切分)

## 水平切分

当一个应用难以再细粒度的垂直切分，或切分后数据量行数巨大，存在单库读写、存储性能瓶颈，这时候就需要进行水平切分了。

表内数据内在的**逻辑关系**，将同一个表**按不同的条件分散**到多个数据库或多个表中，每个表中只包含一部分数据，从而使得**单个表的数据量变小，达到分布式的效果**。

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrmfqf5pj30u00xuwxs.jpg)

库内分表只解决了单一表数据量过大的问题，但没有将表分布到不同机器的库上

### 数据分片规则

1. 根据数值**范围**：按照时间区间或 ID 区间来切分
   - 按日期将不同月甚至是日的数据分散到不同的库中
   - 将 userId 为 1~9999 的记录分到第一个库，10000~20000 的分到第二个库，以此类推
   - 单表大小可控，每个表存储的数据量有大致划分
   - 天然便于水平扩展，后期如果想对整个分片集群扩容时，只需要添加节点即可，无需对其他分片的数据进行迁移*
   - 使用分片字段进行范围查找时，连续分片可**快速定位分片**进行快速查询，有效避免跨分片查询的问题
2. 根据数值**取模**：一般采用 hash 取模 mod 的切分方式
   - 将 Customer 表根据 cusno 字段切分到 4 个库中，余数为 0 的放到第一个库，余数为 1 的放到第二个库，以此类推。
   - 数据分片相对比较均匀，不容易出现热点和并发访问的瓶颈
   - 后期分片集群扩容时，需要迁移旧的数据(使用一致性 hash 算法能较好的避免这个问题)*
   - 容易面临跨分片查询的复杂问题。比如上例中，如果频繁用到的查**询条件中不带** cusno 时，将会导致**无法定位数据库**，从而需要同时向 4 个库发起查询，再在内存中合并数据，取最小集返回给应用，分库反而成为拖累。

### 优缺点

- 优点：
  - 不存在单库数据量过大、高并发的性能瓶颈，提升系统稳定性和负载能力
  - 应用端改造较小，不需要拆分业务模块
- 缺点
  - 跨分片的事务一致性难以保证
  - 跨库的 join 关联查询性能较差
  - 数据多次扩展难度和维护量极大

## 带来的问题

- 跨节点关联查询join问题

  ```
  1.全局表。系统中所有模块都可能依赖的一些表，将这类表在每个数据库中都保存一份。这些数据通常很少会进行修改，所以也不担心一致性的问题。
  2.字段冗余。用空间换时间，如保存id的时候顺便保存name，这样不需要每次查询都要额外查询一次id所对应的name；局限：改名
  3.考虑ER分片。如果分片之前可以先确定表与表之间的关系，并将那些具有关联关系的表记录存放到同一个分片上
  ```

- 跨节点分页、排序、函数问题

  ```
  如果需要进行排序或统计数量等问题，当排序字段就是分片字段时，通过分片规则就比较容易定位到指定的分片；当排序字段非分片字段时，就变得比较复杂了，需要在不同的分片节点中将数据进行排序并返回，然后将不同分片返回的结果集进行汇总和再次排序，最终返回给用户
  ```

- 全局主键唯一性问题

  ```
  分库后不允许使用主键自增。可以采用UUID
  ```

- 数据迁移、扩容问题

  ```
  在不同的分片节点中将数据进行排序并返回，然后将不同分片返回的结果集进行汇总和再次排序，最终返回给用户
  ```

## 切分场景

- 能不切分就不切分

  - 例如：升级硬件、升级网络、读写分离、索引优化等等。当数据量达到单表的瓶颈时候，再考虑分库分表。

- 数据量过大，正常运维影响业务访问

  - 数据库备份，单表太大，备份需要大量磁盘IO和网络IO
  - 对大表进行DDL，MySQL锁住全表，时间长，期间业务无法进行

- 随着业务发展，需要对某些字段垂直拆分

  ```
  一张表100个字段，其中99个字段不需要经常改动，剩下的1个是经常修改的。如：用户表的最后登陆时间，这时候可以考虑把主键和需要经常修改的字段分离出去成为一张独立表
  ```

- 数据量快速增长

  - 单表性能接近瓶颈，需要考虑水平切分

- 安全性和可用性

  - 不能牵涉到其他业务

## 案例

```
用户中心
表：User(uid, login_name, passwd, sex, age, nickname)

用户侧：
	
```



# 性能剖析

## 剖析MySQL查询

定义性能最有效的方法就是响应时间

找清楚问题在哪里

### 剖析服务器负载

定位和查询“坏”查询能够显著提升应用的性能；可以及时发现和定位糟糕的用户体验；降低服务器的压力，推迟或避免了服务器昂贵的升级需求；

#### 捕获MySQL的查询到日志文件中

- 可以通过设置`long_query_time`为0来捕获所有的查询
- 慢查询带来的IO开销可以忽略不计

### 剖析单条记录

#### 使用show profile

- 使用`set profiling = 1`后在服务器上执行的所有语句，都会测量其耗费的时间
- 使用`show profiles`，它会列出之前所有的语句的ID、总时长、对应的语句
- 使用`show profile for query Id` 可以查询到特地的语句查询执行的**每个步骤及其花费的时间**
- 一般不建议在**优化排序缓冲区**的方面优化
- **剖析报告能帮助我们定位到每个活动花费的时间，但是并不会告诉原因**

#### 使用show status

- 使用`show global status`可以查看**服务器级别的**从服务器启动时开始计算的查询次数统计
- 注意区分列出的变量是全局级别还是会话级别
- `Handler_read_rnd_next`没有用到索引的读操作
- 使用`explain`也可以得到大致相同的结果，但是explain是通过估计的，show status是通过测量的，结果更加精准，它无法告知临时表是磁盘表还是内存临时表等。

#### 使用慢查询日志

# Schema与数据类型优化

## 选择优化的数据类型

- **更小**的通常更好：选择可以正确存储的最小数据类型，更小的通常更快，占用更少CPU和磁盘和内存
- **简单**就好：简单的数据类型的操作通常**需要更少的CPU周期**。因为字符集和排序规则使得字符比整型更加复杂
- 尽量**避免NULL**：尽量指定为NOT NULL，除非真的需要NULL。因为NULL使得索引、索引统计和值比较都比较复杂。可为NULL的列会使用更多的存储空间，需要特殊处理；可为NULL的列被索引时，每个索引记录需要一个额外的字节。所以建索引应避免可为NULL的列

# 性能优化

## 具体做法

1. 查询时如果已知会得到一条数据，这种情况下加上` limit 1` 会增加性能。**因为 mysql 数据库引擎会在找到一条结果停止搜索**，而不是继续查询下一条是否符合标准直到所有记录查询完毕
2. 用 `not exists` 代替 `not in`。`not exists` 用到了连接能够发挥已经建立好的索引的作用，`not in` 不能使用索引。**`not in `是最慢的方式，要同每条记录比较**，在数据量比较大的操作中不建议使用这种方式。
3. 对于多张大数据量(这里几百条就算大了)的表 JOIN，**要先分页再 JOIN**，否则逻辑读会很高，性能很差
4. 查询时exists适用于b表(在exists或者in中出现的)比A表大的情况，反之适用in
5. 手机号码存储用`BIGINT`。因为CHAR或者VARCHAR，占用空间大，影响查询性能。11位手机号CHAR存储，**utf8编码，则占用33个字节**；使用如果使用INT的话，**INT最大只能保存10为数据**，而手机号为11位，会出现溢出，所以使用**BIGINT占用8个字节，支持11位数据存储**。
6. IP地址存储用无符号`INT`。`INET_ATON()`负责把IP转成数字；`INET_NTOA()`负责把数字转为IP，用无符号INT是为了防止数据溢出

## 索引避雷

1. 不满足最左索引匹配原则

2. 如果使用 `select *` 但是没有有效命中组合索引，尽量使得查询的列命中组合索引让查询走 `全索引扫描` ，比 `全表扫描` 要快，原理是 `索引覆盖`

3. 查询语句中索引列使用了函数、进行了运算会导致索引失效

4. 数据类型出现隐式转化(如varchar不加单引号的话可能会自动转换为int型)，类型不一致导致索引失效

5. like的条件左边包含 `%` 导致索引失效

6. where 语句中两个索引列进行比较导致索引失效

7. OR 语句前后条件没有同时使用索引导致索引失效

8. `not in` 、`not exist` 条件导致索引失效，`not in` **不会让主键索引失效**

9. `order by` 的情况，where 和 limit 必须至少要有一个

   1. 不使用 where ，但是使用 limit ，order by 后面的条件遵循联合索引的最左匹配原则能命中索引

      ```mysql
      explain select * from user
      order by code,age,name
      limit 100;
      ```

   2. 使用 where ，不使用 limit，order by 可以和 where 一起遵循最左匹配原则；如果匹配断层的话（比如命中第一第三个索引），还是能命中索引，但是需要再做一次 `filesort` 排序

      ```mysql
      explain select * from user
      where code='101'
      order by name;
      ```

   3. order by 多个条件需要保持相同的排序才可以命中索引

      ```mysql
      explain select * from user
      order by code desc,age desc
      limit 100;
      ```

   4. 不可以对不同的索引进行排序，会导致索引失效，进行全表扫描

      ```mysql
      explain select * from user
      order by code, height
      limit 100;
      ```

      


# MySQL执行流程与架构

## 一条查询语句执行的流程

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20200913145650.png)

### 客户端(Client)

连接数据库方式：

#### 同步或异步

- 同步：**大部分时间使用**。
- 异步：
  - 客户端异步连接服务端， 并不能减少sql执行时间，只是节省了等待时间。
  - 如果异步连接数据库存在并发，不能共用一个连接，否则会造成数据混乱。也就是每个sql执行的时候都要建立一个单独的连接，但是这种做法会给服务端带来巨大的压力，因为在服务端来说，每一个连接就是一个线程，线程间的切换会占用CPU的资源。
  - 另外异步通信对开发人员来说，增加开发的复杂度，所以一般不建议使用异步连接

#### 连接方式

- 长连接：持续保持连接打开，减少服务端频繁地创建和释放连接所造成的消耗，后续程序还可以继续使用这个连接。但是长时间连接不操作也会断开连接。
  - **jdbc默认8小时没有活动就断开**
  - 非交互式客户端连接(shell)：`show global variables like "wait_timeout";`
  - 交互式客户端连接(navicat)：`show global variables like "interactive_timeout";`
  - 查看连接数：`netstat -an|grep 3306|wc -l` 或 `show full processlist`
  - 默认最大连接数151个：`show global variables like "max_connections";`
  - 修改方式：动态修改 `set variables "max_connnections = 1000"`，一旦关闭就会刷新到以前的值；修改配置文件 `/etc/my.cnf` 永久修改
- 短连接：操作完毕后，连接马上关闭，释放资源。

#### 通信协议

- TCP/IP：
  - 驱动的jar包连接数据库
- Unix Socket：
  - 本地命令行的连接，不走网络协议。使用物理文件

#### 通信方式

- 单工 ：数据单向传输：广播。
- 半双工：数据双向传输，但是不能同时传输：传呼机。
- 全双工：数据双向传输，可以同时传输：手机。
- **mysql采用的是半双工通信方式**

### 查询缓存(Query Cache)

应用场景：

1. 查询的sql语句必须是**一样**的
2. 如果update了表中数据，整个表所有数据的缓存都被清空

应用场景狭隘，5.7版本默认关闭，8.0版本后弃用。使用独立的缓存，如ORM等

### 解析器 (Parse)

- 词法解析：把语句中关键词、表名、字段名等内容拆分成一个一个单词
- 语法解析：检查sql的语法。括号、引号有没有闭合、分号等。
- 最终得到的是一颗**解析树**![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20200913133105.png)
- 称为**硬解析**

### 预处理器(Preprocessor)

- 语义解析：检查数据库、表名、字段名是否存在，是否用到alias，**保证没有歧义**。得到新的解析树

### 查询优化器(Query Optimizer)

- 一条sql语句不只有一种执行方式，最终有相同结果，存在**开销上的差异**
- `基于cost(开销)` 的优化器 ，**会选择一种开销最小的查询方式**
- 优化后的结果是**查询执行计划**。并不一定是最优的执行计划
- 查看执行计划 `explain` 查询语句 
  - `possible_key`代表可能用到的索引
  - `key`代表存储引擎认为得到结果需要扫描的行数(预估)
  - `rows`代表查询到结果需要检索多少行
  - `Extra` 
    - `Using index`代表覆盖索引，不需要回表
    - `Using where`代表在Server层进行了数据过滤。索引的比较发生在存储引擎层，如果结果并不满足查找需求，那么需要站在Server层进行再一步的过滤
    - `Using index condition`代表使用了索引下推


### 存储引擎(Store Engine)

**存储引擎可以理解成表的类型**，如：InnoDB、MyISAM等

mysql5.5版本后默认的存储引擎是InnoDB

- InnoDB
    - 支持事务
    - 支持外键
    - 支持行级别的锁和表级别的锁
    - 支持读、写的并发操作
    - 有特殊的索引存放方式，减少服务端和磁盘的IO次数，提升效率
- MyISAM
    - 不支持事务
    - 拥有比较高的插入和查询的速度
    - 支持表级别的锁，更新数据时会锁表
    - 会存储表中数据的行数，所以执行`count`的速度很快，时间复杂度为O(1)
- Memory
    - 把所有数据只存储到内存里面，操作数据效率非常高
    - 数据库一旦重启/崩溃，数据会丢失
    - 通常作为临时的存储(临时表)
- CSV
    - 逗号分隔，不允许空行，易于编辑
    - 一般用于导入导出数据
- Archive
    - 紧凑、没有索引
    - 一般用于检索大量的历史数据/不会发生变动的数据

查看数据库中表的存储引擎 `show table status from 数据库名;`

### 执行引擎 
- 利用存储引擎提供的API来把查询优化器得到的执行计划来操作存储引擎
- 从存储引擎中拿到结果后会返回给客户端，如果有开启查询缓存，那么也更新到缓存中

### 描述一条查询语句的执行流程

1. 客户端连接MySQL服务端，提交查询语句
2. 服务端首先检查查询缓存是否存在对应结果，如果有则直接返回；如果没有则把查询语句交给解析器
3. 解析器会按关键字、表名等拆分查询语句，并检查语法，生成一颗解析树后交给预处理器
4. 预处理器负责检查语句是否存在歧义：是否有不存在的表、字段等，之后交给查询优化器
5. 查询优化器会根据这个查询语句的各种执行方式的开销，选择一种最低开销的方式，得到一个执行计划
6. 执行引擎用这个执行计划去调用存储引擎提供的接口得到数据
7. 返回数据给客户端，如果数据库开启了查询缓存，则也更新到查询缓存中


## MySQL体系架构

理解版

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20200913141853.png)

服务层中有一个日志：binlog，**默认不开启**
- 记录DDL、DML语句，属于逻辑日志
- 没有大小限制，内容可以追加
- 可以被所有存储引擎使用
- 可以用于数据恢复和主从复制

### InnoDB存储结构

- InnoDB 中块的概念其实就是页
- InnoDB 中簇的概念其实就是区
- 1页的大小是16KB
- 页是 InnoDB 做磁盘管理最小的单位

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20200913144046.png)

## 一条更新语句的执行过程

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20200913152005.png)

- 客户端的操作不会直接操作磁盘，而是先去到InnoDB中的缓冲池Buffer Pool，因为IO代价太大
- Buffer Pool可以加速数据的操作和访问(**为了避免每次在读写数据时访问磁盘增加 IO 开销，Innodb 存储引擎通过把相应的数据页和索引页加载到Buffer Pool中来提高读写速度。然后按照最近最少使用原则来保留缓冲池中的缓存数据。**)
- 当内存的数据页和磁盘的数据页不一致时，内存中的数据页也称为**脏页**
- 所以在InnoDB中一些后台的线程每隔一段时间就一次性地把Buffer Pool的数据同步到磁盘中的数据中，这个动作也称为**刷脏**
- 那么当要读入的数据页不在Buffer Pool中时，就需要在Buffer Pool中申请一个新的数据页，但Buffer Pool中数据页是一定的，当数据页达到上限时此时就需要把最久不使用的数据页从内存中淘汰掉。**但如果淘汰的是脏页，那么就需要把脏页刷到磁盘里(刷脏)才能进行复用。**
- 如果脏页数据还未完全同步到磁盘中，服务端崩溃关闭了，数据会丢失。解决方法：**持久化机制**
- 持久化机制：redo log，把内存的数据写入到日志中，一旦服务端崩溃关闭，就从日志文件中恢复到磁盘(WAL技术，先写日志，再写磁盘)
    - 记录数据页的改动，属于物理日志
    - 大小固定，前面的内容会被覆盖
    - 在InnoDB存储引擎层实现
    - 用于崩溃恢复
    - **写redo log 的过程是顺序写磁盘的，磁盘顺序写减少了寻道等时间，速度比随机写要快很多**

---

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20200913154617.png)

**MySQL InnoDB两阶段(XA)的提交**

1. 客户端提交一条更新语句
2. 服务层接收到这一条更新语句，产生执行计划，交由存储引擎层执行
3. 存储引擎层把修改的结果更新到内存
4. 同时把结果记录到redolog中，把这一行的状态设置成prepare
5. 通知服务层已完成修改，可以提交事务
6. 服务层把修改记录到binlog中
7. 服务层提交事务
8. 存储引擎层把这个事务的状态设置成commit状态


### 更新语句执行的过程为什么需要使用XA两阶段的提交

- 为了保证本次操作中binlog的数据和redolog的数据内容的一致性
- 假设数据写入了redolog后，服务端奔溃关闭了，重新恢复后根据redolog进行崩溃恢复。然而binlog的数据仍未记录本次操作，当执行主从复制的时候，就会产生主服务器和从服务器数据不一致的情况

### 脏页为什么会使SQL变慢

- redo log 大小是一定的，且是循环写入的
- 在高并发场景下，redo log 很快被写满了，但是数据来不及同步到磁盘里，这时候就会产生脏页，并且还会阻塞后续的写入操作

# MySQL索引原理与使用规则

## 索引概念

是数据库管理系统中一个排序的**数据结构**，以**协助快速查询、更新数据库表中的数据**

### 索引工作原理示例

以主键索引为例，一个主键对应一行记录的地址值，通过这个主键找到地址，再通过地址值找到数据

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20200916225708.png)



### 索引类型

- 聚集索引(主键索引)
- 普通索引
- 唯一索引：索引的键值不能重复
- 全文索引：用于提升大字段中使用`like`关键字查询的效率

主键索引、普通索引、唯一索引的区别：

- 主键索引一张表内只允许有一个，值需要唯一，而且不允许空值，可以作为其他表的外键，主键索引使用 `not in` 关键字仍然可以走索引
- 唯一索引一张表内可以有多个，值需要唯一，但是可以允许空值，不可以作为外键
- 普通索引对值没有约束，一般只用于排序

### 索引方法

- BTREE
- HASH
  - 先用索引字段值通过哈希方法，得到哈希值，哈希值对应找到数据的地址值，再找到数据，时间复杂度固定为O(1)
  - 哈希值无序，所以不能用哈希索引实现排序，也不支持范围查询
  - 可能会发生哈希碰撞的情况
  - 在InnoDB存储引擎中不支持**手动创建HASH索引**(会自动在热点的BTREE索引上建自适应的HASH索引)，保存后会自动变回BTREE

## 索引结构

有序数组：访问效率高，数据的变动成本高

单链表：访问效率低

BST树(二叉查找树)：最坏情况退化成单链表

AVL树(平衡二叉树)：AVL树中一个节点就是一页，一页16KB，一个节点只存放键值和磁盘引用的数据量远远达不到16KB，造成空间浪费，访问数据进行磁盘IO时会浪费大量空间

​	解决方案：一个块存多个节点，结果是：指针数量更多，原来的二叉树变成多叉树，所以树的深度减少。

B树(多路平衡查找树)：节点拥有的子树(度)永远比关键字的数量多1。IO次数要比AVL树少。AVL树使用左旋、右旋保持平衡；B树使用分裂合并的操作保持平衡

**B+树(加强版多路平衡查找树)：InnoDB中实际使用的结构**

### 索引数据结构

- 关键字数量和节点拥有的子树的数目(度)是相等的
- 只有叶子结点才存储数据，其他节点只存储索引键值，所以搜索过程中必须搜索到叶子结点中才能真正返回数据，每一次搜索的效率更加的稳定(次数相对稳定)

**InnoDB进一步改良了B+树，加入了顺序访问的指针**

![image-20200917001024745](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/image-20200917001024745.png)

- MyISAM
  - MyISAM存储引擎中有两个文件：.MYI 存储索引， .MYD存储数据
  - 搜索数据时，先从MYI文件中索引的B+树的结构中找到键值对应数据的磁盘地址
  - 再从MYD文件中找到完整数据
  - ![image-20210221222230495](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/image-20210221222230495.png)![image-20210221222253588](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/image-20210221222253588.png)
  - MyISAM索引分为两类：主键索引、辅助(其他)索引，两者检索方式一样
- InnoDB
  - InnoDB存储引擎中只有一个文件：.ibd，所以索引和数据放在一起
  - 因为数据是跟随主键存储的，数据在磁盘中的物理顺序和主键的逻辑顺序一摸一样，所以：**以主键为索引来组织数据存储**
  - InnoDB中只有主键索引是聚集索引：clustered index，数据在磁盘中的物理顺序和主键的逻辑顺序一致。其他索引都是非聚集索引
  - 如果建表时没有指定主键，也就没有了主键索引，那么InnoDB会**默认先寻找第一个没有NULL值的唯一索引作为聚集索引**。如果也没有这个条件，那么InnoDB有一个RowId隐藏字段(递增)作为聚集索引来组织数据的存储
  - InnoDB的主键索引和辅助索引检索数据的方式是有主次之分的，辅助索引必须要到主键索引中检索数据，因为数据都是存放在主键索引B+树上的叶子结点上![image-20200917232914575](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/image-20200917232914575.png)



## 索引使用原则

1. 列的离散度
   - 离散度公式：count(distinct(列)):count(*)，解释：这一列所有不同的值比数据行数
   - 如果列的重复值越多，离散度就越低；如果重复值越少，离散度就越高
   - 在离散度很低的字段上建立索引，作用不大。(explain sql语句 rows字段的值比较大) B+树上重复值过多，不利于检索
   - 当一个字段的离散度太低时，存储引擎直接放弃使用索引，进行全表扫描，也不利于数据检索
2. 联合索引最左匹配原则
   - 假设建的联合索引是(name、phone) B+树中联合索引的存储方式(依据索引建立顺序从左到右)![image-20200920172226252](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/image-20200920172226252.png)
   - 假如定义联合索引`index(a,b,c)`，那么最终得到的索引是
     - `index(a)`
     - `index(a,b)`
     - `index(a,b,c)`
     - 查询时没有用到以上结构的索引，那么这个联合索引是用不上的；要想使用联合索引，必须使用最左边的字段
     - 如果查询时使用的字段满足上面条件，但是顺序不一致，也可以使用到联合索引。因为查询优化器会帮助优化sql语句，调整where子句的顺序
3. 覆盖索引
   - 回表：InnoDB中通过使用普通索引定位主键值，再通过主键值定位具体记录的操作
   - 覆盖索引：索引覆盖了查询的列。将索引列作为要查询的数据这样的话就可以直接返回索引中的的数据，不需要再通过聚集索引去定位行记录，避免了回表的情况发生。
   - 可以使用覆盖索引来优化sql的场景
     - 全表count查询优化。使用`count`时尽可能去命中辅助索引或者聚集索引，而不是使用`count(*)`
     - `where`、`order`查询时索引作为数据列
4. 通配符
   - 当`%`放在前面，那么无法使用索引
   - 当`%`放在后面，可以使用索引
5. 索引条件下推
   - 把条件下推到存储引擎，不需要在Server层进行过滤。5.7版本后默认开启
   - 只适用于普通索引
   - 提升效率

## 优化手段

- 表的索引越全越好，因为不管什么情况都能用上索引，对吗？

  > 虽然这种做法在给每一个字段进行查询时，能提高效率。但是，索引本质是磁盘上的数据结构，建立索引是需要消耗空间的。
  >
  > 而且在更新数据时，数据结构有可能会大量地改变。
  >
  > 如果一个字段非常长(url)，在这个字段上建索引消耗的空间比较大

- 为什么不要在性别字段上建索引？

  > 只有两个值，列的离散度太小，不能明显地提升效率

- 为什么不要使用身份证(UUID)作为主键？

  > 不使用一个递增值作为主键的话，插入数据时，有可能造成大量的页数据的分裂和合并。使用自增id来插入数据，会自动按顺序找到最后的页来进行插入

- 模糊匹配`like abc%`、`like %2673%`、`like %888`都用不到索引，对吗？

  > %放到后面可以使用

- 不要使用`select *`写明具体字段，为什么？

  > 为了使用到覆盖索引
- 在`where`条件中`not in`和`<>`和`not like`都无法使用索引(负向查询)，对吗？

  > not in 有可能可以使用索引，跟数据量有关系
  >
  > <>也可以使用索引

## AVL树、B树、B+树分别解决了的问题

- AVL树：解决了BST树在最坏情况下会出现不平衡的情况(退化成线性单向链表)
- B树：在一个结点上存储多个键值和多个指针，可以减少IO次数
- B+树：数据只存储到叶子结点上，效率更加稳定；叶子结点上还带有顺序访问的指针，做范围查询的时候更加简单

## InnoDB建议使用自增作为主键生成的策略

- 为了防止随机插入时页的分裂和合并
- 存储和查询时都会更加高效

# MySQL事务与锁详解

默认自动开启事务，执行dml语句时自动提交

`show variables like 'atuocommit'` 显示`on`

设置事务是否自动开启

`set autocommit = on/off`

手动开启事务

`start transaction` 或 `begin`

结束一个事物

`commit` 或 `rollback`

## 数据库事务定义

## 事务并发会带来的问题

## 事务隔离性和锁的关系

## 行锁的原理和算法详解

# MySQL性能优化总结

优化从何入手？

连接：

- too many connection
- (连接池)无法获取连接

解决：

- 增大可用的连接数(默认151)
- 减少应用从数据库获取的连接数
  - 减少超时时间来提早释放长连接(默认8小时)
  - 提高连接复用率(连接池)

查询优化器：

记录慢查询日志(slow query log)，默认关闭。

mysqldumpslow工具来分析慢日志

show profiles 查看sql语句及其执行的时间



优化的优先级从上到下；难度越小，收益越高

- sql语句和索引的优化
  - 尽量使用索引
  - 使用好的索引
- 存储引擎和表结构的优化
  - 存储引擎
    - 查询和操作比较多，MyISAM
    - 临时数据，Memory
    - 常规，并发大，更新多，InnoDB
  - 表结构
    - 拆分大表
    - 分区：把数据放到不同的文件夹中存放，**治标不治本的做法**
    - 字段选择原则：使用可以正确存储这个数据的最小的数据类型。如：性别字段使用`tinyint(1)`
    - 不允许为空的字段都定义成not null
    - 少用存储过程、外键、视图，把这部分工作放到程序里面进行

- 架构优化
  - 使用缓存，不用每次都直接和数据库连接
  - 主从复制(读写分离)，写-主；读-从
  - 垂直分库(把不同的模块使用到的库分别独立出来)，关联查询的话使用字段冗余
  - 水平分表(把大表水平分开成几个小表)
- 配置优化(更好地发挥硬件的功能)
  - mysql配置优化

- 操作系统和硬件优化
  - 固态硬盘替换机械硬盘

# SQL语句执行慢的原因

## 写

- 当 redo log 写满时就会进行刷脏页，此时写操作也会终止，那么 SQL 执行自然就会变慢。
- 遇到所要修改的数据行或表加了锁时，需要等待锁释放后才能进行后续操作，SQL 执行也会变慢。

## 读

- 读操作慢常见的原因是未命中索引从而导致全表扫描，可以通过 explain 方式对 SQL 语句进行分析。
- 在读操作时，要读入的数据页不在内存中，需要通过淘汰脏页才能申请新的数据页从而导致执行变慢。我们需要控制脏页的比例，不要让它经常接近 75%。同时还要控制 redo log 的写盘速度，并且通过设置 innodb_io_capacity 参数告诉 InnoDB 你的磁盘能力。

