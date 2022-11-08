---
title: MyBatis 入门学习
icon: article
order: 1
category:

- 干货
- 框架

tag:

- 基础
- MyBatis

---

# MyBatis 入门

## MyBatis 是什么

MyBatis 是一个基于 Java 的持久层框架，这个持久层框架包括 SQL Maps 和 Data Access Objects。



## MyBatis 特点

1. MyBatis 是一个半自动的 ORM 框架。
2. MyBatis 支持定制化 SQL、存储过程。
3. MyBatis 可以使用简单的 XML 配置文件或注解来完成配置和原始映射，将实体对象映射成数据库中的记录。



## MyBatis 和其他持久层框架对比

- JDBC
  - SQL 夹杂在 Java 代码中，导致代码耦合度高
  - 在实际开发中 SQL 可能会有变化，硬编码会导致代码难以维护
- Hibernate 和 JPA
  - 操作简便，内部自动生成，开发效率高
  - 内部自动生成的 SQL 语句，需要进行优化时不方便
  - 某些需求下的长难复杂 SQL 需要绕过框架来实现
  - 反射操作太多，导致数据库性能下降
- MyBatis
  - 轻量级，性能出色
  - SQL 和 Java 代码分开，功能边界清晰。Java 代码专注于业务、SQL 语句专注于数据操作



## MyBatis 核心配置文件

MyBatis 核心配置文件有一些重点需要关注的属性标签，简单了解即可，后续用 SpringBoot 整合后不需要编写。

- environments：设置连接数据库的环境，比如可以指定开发环境和生产环境的数据库。
  - default：当前使用的数据库环境
  - environment：具体数据库环境的连接、账号密码等信息
- properties：引入外部配置文件，便于把数据库连接等信息写到独立的配置文件中。
- typeAliases：设置类型别名，为了减少多次查询 resultType 全类名的书写。
  - typeAlias：单独设置某一个类型的类型别名
  - package：以包为单位，设置这个包下的类型默认别名都是类名
- mappers：主要的工作是引入映射文件。
  - mapper：单独引入一个映射文件
  - package：以包为单位，引入这个目录下的所有映射文件



## MyBatis 中 ${} 和 #{} 区别

- ${} 使用字符串拼接的方式拼接 SQL 语句，容易发生 SQL 注入风险，**一般不用这种方式**，同时也需要频繁手动添加单引号。

- #{} 使用占位符赋值的方式拼接 SQL 语句，有效防止 SQL 注入风险，当参数是字符串类型和日期类型时，能自动添加单引号。



## MyBatis 获取参数

- 单个参数

  使用 #{} 来获取，占位符中可以填写参数名。

- 多个参数

  MyBatis 会将多个参数存储到一个 Map 集合中，以 arg0、arg1 等为键，以具体参数为值，因此需要用 #{} 以键的方式进行访问。

- Map 参数

  如果不想让 MyBatis 来给参数定义键名，那么可以自己用 Map 集合给多个参数自定义键名，然后用 #{} 按照参数在 Map 中的键名来访问。

- 实体类型参数

  参与业务逻辑的参数往往是一个实体类对象，实体类对象与 Map 集合方式类似，使用 #{} 使用属性名来进行访问。

- 使用 @Param 注解

  MyBatis 会将这些参数放到 Map 集合中，以 @Param 注解中的内容作为参数的键名，简单来说就是自定义 MyBatis 中的 Map 集合中的键名，使用 #{} 使用键名来访问。其中 @Param 自定义参数键名的原理：[MyBatis-@Param原理解析](./MyBatis-@Param.md)

**实际开发中应该以实体类型和@Param方式为主。**



## MyBatis 特殊 SQL 执行

### 模糊查询

#### 问题引入

```java
public interface UserMapper {
  List<User> findByUsernameLike(@Param("username") String username);
}
```

```xml
<select id="findByUsernameLike" resultType="User">
	select * from t_user where username like '%#{username}%'
</select>
```

形成的 SQL 语句：`select * from t_user where username like '%?%'`

由于模糊查询需要使用 `'%查询条件%'` 的形式，有一对单引号包围着，使用 `#{}` 的话，形成的 SQL 语句中的 `?` 不再被解析成占位符，而是简单地设置成一个字符串！此时 SQL 语句中没有占位符，而我们却为 SQL 语句中的占位符赋值，所以会导致报错。



#### 解决方案

- 使用 `${}` 的方式，因为 `${}` 就是通过字符串拼接的方式来组装 SQL 语句的。

  ```xml
  <select id="findByUsernameLike" resultType="User">
  	select * from t_user where username like '%${username}%'
  </select>
  ```

  

- 使用 `concat()` 方法，因为在 MySQL 中用这个方法来完成字符串拼接的。

  ```xml
  <select id="findByUsernameLike" resultType="User">
  	select * from t_user where username like concat('%', #{username}, '%')
  </select>
  ```



- 使用双引号来拼接，推荐使用这种方式，最方便。

  ```xml
  <select id="findByUsernameLike" resultType="User">
  	select * from t_user where username like "%"#{username}"%"
  </select>
  ```



### where in

#### 问题引入

```java
public interface UserMapper {
  // ids:用逗号分隔的各个用户id
  int deleteMore(@Param("ids") String ids);
}
```

```xml
<delete id="deleteMore">
	delete from t_user where id in (#{ids})
</delete>
```

形成的 SQL 语句：`delete from t_user where id in ('?')`

使用 `#{}` 后，MyBatis 解析后会在 `#{}` 两侧各加上一个单引号，这就导致 in 关键字后面不是一个数组，而是一个字符串！导致无法找到任何一条记录，这些记录无法被删除。



#### 解决方案

使用 `${}` 的方式，因为 MyBatis 不会在 `${}` 两侧加上单引号，实现了 in 关键字后面接数组的形式。

```xml
<delete id="deleteMore">
	delete from t_user where id in (${ids})
</delete>
```



### 插入记录后获取自动递增的 ID

#### 问题引入

```java
public interface UserMapper {
  // 增删改的返回值是固定的，返回受影响的行数，所以不能把递增后的id作为返回值
  void insertUser(User user);
}
```

如果需要保存一对多关系，那么需要先获取主表和从表中的主键，然后才能把主表和从表的关系建立起来。



#### 解决方案

在标签中使用 `useGeneratedKeys` 、`keyProperty` 属性来把生成后的主键设置到实体中的 id 属性中。

- `useGeneratedKeys` ：设置当前 SQL 使用了自增的主键
- `keyProperty` ：将自增的主键的值赋值给参数中某一个属性

```xml
<!--使用自增 id，并把这个id放置到对象中的id属性中-->
<insert id="insertUser" useGeneratedKeys="true" keyProperty="id">
	insert into t_user values(null, #{username}, #{password}, #{age})
</insert>
```



## 自定义映射

### 字段名属性名不一致

在查询语句中，会经常使用 resultType，这种默认的映射关系要求对象的属性和查询出来的结果字段一一对应。如果字段名和属性名不一致的时候，那么这个映射关系就需要我们自定义。

- 使用 resultType + 字段别名。由于 MySQL 的字段命名一般使用下划线命名，Java 对象成员属性命名一般使用小驼峰命名。二者不一致时，在查询的时候可以使用字段别名把 MySQL 的字段名设置成对象属性名，通过 resultType 完成自动映射。

  - 此外也可以使用全局配置来完成，在核心配置文件中设置 `mapUnderscoreToCamelCase` 属性为 `true` ，让 MyBatis 自动把 MySQL 中这些下划线命名的字段统一转换成小驼峰命名，让其符合 Java 的命名规则，实现自动映射。

    ```xml
    <settings>
      <!--设置启用数据库字段下划线映射到java对象的驼峰式命名属性，默认为false-->
      <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>
    ```

  

- 使用 resultMap 实现自定义查询结果与对象的映射关系。

  ```xml
  <!--为resultMap设置一个标识，下面select标签引用-->
  <!--type代表为具体的类型进行自定义映射关系-->
  <resultMap id="empResultMap" type="Emp">
    <!--专门为主键提供的设置-->
  	<id property="eid" column="eid"></id>
    <!--property代表属性名，column代表查询出来的结果的字段名-->
    <result property="empName" column="emp_name"></result>
  </resultMap>
  
  <select id="getAllEmp" resultMap="empResultMap">
  	select * from t_emp
  </select>
  ```



### 多对一的映射关系

员工与部门存在多对一的关系，在查询员工数据时，如何把员工所在部门数据也查询出来呢？

```java
@Data
public class Emp {
  private Integer eid;
  private String empName;
  private Dept dept;
}

@Data
public class Dept {
  private Integer did;
  private String deptName;
}
```



- 使用 resultMap 进行级联属性映射，把部门数据映射到 dept 属性上

  ```xml
  <resultMap id="empAndDeptResultMap" type="Emp">
  	<id property="eid" column="eid"></id>
    <result property="empName" column="emp_name"></result>
    <result property="dept.did" column="did"></result>
    <result property="dept.deptName" column="dept_name"></result>
  </resultMap>
  
  <select id="getEmpAndDept" resultMap="empAndDeptResultMap">
  	select * from t_emp left join t_dept on t_emp.did = t_dept.did where t_emp.eid = #{eid}
  </select>
  ```

  通过这种方式把与员工关联的部门数据组装到 Emp 实体上。

  

- 使用 association 标签进行映射

  ```xml
  <resultMap id="empAndDeptResultMap" type="Emp">
  	<id property="eid" column="eid"></id>
    <result property="empName" column="emp_name"></result>
    <!--property代表映射到实体上的属性，javaType代表映射的类型-->
    <association property="dept" javaType="Dept">
    	<id property="did" column="did"></id>
      <result property="deptName" column="dept_name"></result>
    </association>
  </resultMap>
  
  <select id="getEmpAndDept" resultMap="empAndDeptResultMap">
  	select * from t_emp left join t_dept on t_emp.did = t_dept.did where t_emp.eid = #{eid}
  </select>
  ```

  把 did、dept_name 查询出来后映射成一个 dept 对象，然后再将其映射到 emp 对象中的 dept 属性中。

  

- 使用 association 标签 + **分步查询**实现多对一关系的映射

  ```xml
  <!--EmpMapper.xml-->
  <resultMap id="empAndDeptResultMap" type="Emp">
  	<id property="eid" column="eid"></id>
    <result property="empName" column="emp_name"></result>
    <!--property代表映射到实体上的属性，select代表子查询的唯一标识(命名空间.id)，column代表传入子查询的条件-->
    <association property="dept" select="com.xxx.DeptMapper.getDept" 
                 column="did"></association>
  </resultMap>
  
  <select id="getEmpAndDept" resultMap="empAndDeptResultMap">
  	select * from t_emp where eid = #{eid}
  </select>
  
  <!--DeptMapper.xml-->
  <!--已开启下划线转驼峰配置-->
  <select id="getDept" resultType="Dept">
  	select * from t_dept where did = #{did}
  </select>
  ```
  
  先查出员工信息，拿着员工的 did 去查询部门信息，随后把部门信息映射到员工 dept 属性上。



### 一对多的映射关系

部门与员工存在一对多的关系，在查询部门数据时，如何把部门下所有的员工数据也查询出来呢？

```java
@Data
public class Emp {
  private Integer eid;
  private String empName;
  private Dept dept;
}

@Data
public class Dept {
  private Integer did;
  private String deptName;
  private List<Emp> emps;
}
```



- 使用 collection 标签处理一对多映射关系（集合类型）

  ```xml
  <resultMap id="deptAndEmpResultMap" type="Dept">
  	<id property="did" column="did"></id>
    <result property="deptName" column="dept_name"></result>
    <!--property代表需要映射的属性，ofType代表集合中数据的类型-->
    <collection property="emps" ofType="Emp">
    	<id property="eid" column="eid"></id>
      <result property="empName" column="emp_name"></result>
      <!--这里不能再映射部门的信息，否则会出现循环引用-->
    </collection>
  </resultMap>
  
  <select id="getDeptAndEmp" resultMap="deptAndEmpResultMap">
  	select * from t_dept left join t_emp on t_dept.did = t_emp.did where t_dept.did = #{did}
  </select>
  ```

  把查询出来的员工信息映射到 emps 集合中，完成一对多的映射。

  

- 使用 collection 标签 + **分步查询**实现一对多关系的映射

  ```xml
  <!--DeptMapper.xml-->
  <resultMap id="deptAndEmpResultMap" type="Dept">
  	<id property="did" column="did"></id>
    <result property="deptName" column="dept_name"></result>
    <!--property代表需要映射的属性，select代表需要执行的分步查询，column代表分步查询的条件-->
    <collection property="emps" select="com.xxx.EmpMapper.getEmp"
                column="did"></collection>
  </resultMap>
  
  <select id="getDeptAndEmp" resultMap="deptAndEmpResultMap">
  	select * from t_dept where did = #{did}
  </select>
  
  <!--EmpMapper.xml-->
  <!--已开启下划线转驼峰配置-->
  <select id="getEmp" resultType="Emp">
  	select * from t_emp where did = #{did}
  </select>
  ```



## 延迟加载

用回使用分步查询员工与部门信息的例子，**使用分步查询可以实现延迟加载，延迟加载可以有效降低资源消耗**，日常的开发中，涉及一对多、多对一映射的时候应该**优先考虑分步查询**以降低资源消耗。

如果当前只访问员工信息，不访问部门信息，那么只会执行查询员工信息的 SQL 语句；如果同时访问员工信息和部门信息，那么才会执行第二步的 SQL 语句。



延迟加载相关配置：

- `lazyLoadingEnabled` ：延迟加载的全局开关。当开启时，所有级联对象都会延迟加载。
- `aggressiveLazyLoading` ：属性延迟加载的开关。当开启时，任何方法的调用都会加载该对象的所有级联对象属性；否则，每个级联对象属性在使用的时候才会按需加载。

另外当打开全局延迟加载的配置后，所有的分步查询都会变成延迟加载，如果有些功能不需要延迟加载，那么可以在具体的分步查询中设置本次查询是否使用延迟加载：

`fetchType` ：本次分步查询的加载方式，lazy：延迟加载；earge：立即加载。

```xml
<resultMap id="empAndDeptResultMap" type="Emp">
	<id property="eid" column="eid"></id>
  <result property="empName" column="emp_name"></result>
  <!--property代表映射到实体上的属性，select代表子查询的唯一标识(命名空间.id)，column代表传入子查询的条件-->
  <!--lazy代表本次分步查询使用延迟加载，eager代表本次分步查询使用立即加载-->
  <association property="dept" select="com.xxx.DeptMapper.getDept" 
               column="did" fetchType="lazy"></association>
</resultMap>
```



## 动态 SQL 语句

MyBatis 提供的 动态 SQL 技术是一种**根据特定条件动态拼接 SQL 语句**的功能，目的是为了解决拼接 SQL 语句字符串时的痛点问题。

比如：没有设置条件时，SQL 语句中不能出现 where 子句；如果有设置条件，那么才需要拼接 where 子句；如果设置了多个条件，那么 where 子句中还需要拼接 and 关键字。



### if 标签

根据标签中 test 属性所对应的表达式决定标签中的内容是否需要拼接到 SQL 中。

```xml
<!--List<Emp> getEmpByCondition(Emp emp);-->
<select id="getEmpByCondition" resultType="Emp">
	select * from t_emp where
  <if test="eid != null and eid != ''">
  	eid = #{eid}
  </if>
  <if test="empName != null and empName != ''">
  	and emp_name = #{empName}
  </if>
</select>
```



### where 标签

避免出现所有 if 条件都不满足的情况下 where 关键字多余的情况，同时避免多余的 and 或 or 关键字产生，所以使用动态生成 where 的方式，假如 if 标签中所有的条件都不满足，生成的 SQL 语句就不会带有 where 子句。一般开发中会使用 where 标签 + if 标签来实现动态拼接条件查询。

```xml
<!--List<Emp> getEmpByCondition(Emp emp);-->
<select id="getEmpByCondition" resultType="Emp">
	select * from t_emp
  <where>
    <if test="eid != null and eid != ''">
      eid = #{eid}
    </if>
    <if test="empName != null and empName != ''">
      and emp_name = #{empName}
    </if>
  </where>
</select>
```



### trim 标签

where 标签还存在一个缺陷：只能去除 if 标签中内容前的 and 或 or 关键字，当这些连接条件的关键字在 if 标签中内容的后面时，使用 where 标签无法移除。这时候需要使用 trim 标签，将标签中的内容前面或后面添加指定的内容，可以用于添加条件连接关键字。

```xml
<!--List<Emp> getEmpByCondition(Emp emp);-->
<select id="getEmpByCondition" resultType="Emp">
	select * from t_emp
  <!--prefix|suffix:将trim标签中内容前面或后面添加指定内容-->
  <!--prefixOverrides|suffixOverrides:将trim标签中内容前面或后面去掉指定内容-->
  <trim prefix="where" suffixOverrides="and|or">
    <if test="eid != null and eid != ''">
      eid = #{eid} and
    </if>
    <if test="empName != null and empName != ''">
      emp_name = #{empName} or
    </if>
    <if test="did != null and did != ''">
      did = #{did}
    </if>
  </trim>
</select>
```

- 当传入的参数只有 eid 时：只有第一条 if 标签有内容，此时移除后缀的 and 关键字，前缀添加 where 关键字，SQL 语句正常。
- 当传入的参数有 eid 和 empName 时：第一第二条 if 标签有内容，此时移除的后缀是 empName 所在的 if 标签内容中的 or，前缀添加 where 关键字，SQL 语句正常。
- 当传入的参数所有属性都是空的时候，不添加前缀 where 关键字，SQL 语句也正常。



### choose when otherwise 标签

这几个标签是一个组合，用于表示一些更复杂的选择逻辑，相当于 Java 中的 if...else if...else 代码块。

```xml
<!--List<Emp> getEmpByCondition(Emp emp);-->
<select id="getEmpByCondition" resultType="Emp">
	select * from t_emp
  <where>
    <!--choose标签代表一个父标签，代表需要开启一个if...else代码块-->
    <choose>
      <!--两个when标签表示了if...else if代码块，有且只有一个条件可以被满足，所以两个when中都不需要添加and关键字-->
      <when test="eid != null and eid != ''">
        eid = #{eid}
      </when>
      <when test="empName != null and empName != ''">
        emp_name = #{empName}
      </when>
      <!--otherwise标签代表了else的情况，当上面所有条件都不成立，就用这个条件，不需要添加and关键字-->
      <otherwise>
        did = #{did}
      </otherwise>
    </choose>
  </where>
</select>
```



### foreach 标签

当请求中的参数是一个数组并且需要遍历数组中每一个数据时，需要使用到 foreach 标签，这个标签在批量删除、批量添加中较为常用。

- 通过数组实现批量删除

  ```xml
  <!--int deleteMoreByArray(@Param("ids") Integer[] ids);-->
  <!-- 以where eid in () 的形式实现-->
  <delete id="deleteMoreByArray">
  	delete from t_emp where eid in
    <!--遍历ids数组，每一项内容名为eid，各项内容中间使用,分隔，整个遍历以(开始，以)结束，自动补充一个小括号-->
    <foreach collection="ids" item="eid" separator="," open="(", close=")">
      #{eid}
    </foreach>
  </delete>
  
  <!-- 以where eid="xx" or eid="" 的形式实现-->
  <delete id="deleteMoreByArray">
  	delete from t_emp where
    <!--遍历ids数组，每一项内容名为eid，各项内容中间使用or分隔-->
    <foreach collection="ids" item="eid" separator="or">
      eid = #{eid}
    </foreach>
  </delete>
  ```

  

- 通过集合实现批量添加

  ```xml
  <!--int insertMoreByList(@Param("ids") List<Emp> emps)-->
  <insert id="insertMoreByList">
    insert into t_emp values
    <!--每一对括号由,来分隔-->
    <foreach collection="emps" item="emp" separator=",">
    	(null, #{emp.empName}, null)
    </foreach>
  </insert>
  ```

  


### sql 标签

主要负责抽取常用的 SQL 语句片段，当使用到同一个 SQL 语句片段时，可以使用这个标签来引入。

老生常谈不要使用 `select *` ，那我们可以把需要经常用到的几个列抽取成一个代码片段来在各个地方引入。

```xml
<sql id="empColumns">eid, emp_name, did</sql>

<!--List<Emp> getEmpByCondition(Emp emp);-->
<select id="getEmpByCondition" resultType="Emp">
  <!--使用include标签来引入，id是sql语句片段唯一标识-->
  select <include refid="empColumns"></include> from t_emp
  <where>
    <if test="eid != null and eid != ''">
      eid = #{eid}
    </if>
    <if test="empName != null and empName != ''">
      and emp_name = #{empName}
    </if>
  </where>
</select>
```



## MyBatis 分页插件

MyBatis 中的分页不需要在 SQL 语句中来编写分页的语句，是通过分页插件来实现的，只需要设置相关信息就可以使用。

- 在 pom.xml 文件中添加依赖

  ```xml
  <dependency>
  	<groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>5.2.0</version>
  </dependency>
  ```

  

- 在 MyBatis 核心配置文件中配置分页插件

  ```xml
  <plugins>
  	<plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>
  </plugins>
  ```

  

- 在查询中使用分页插件，只需要在获取数据前设置分页的操作就可以自动完成分页。SQL语句使用分页时需要计算当前页第一条数据在整个表中的索引，分页插件帮我们完成了这部分的操作，只需要填入当前页码即可。

  ```java
  //SQL语句中分页语句 limit index,pageSize
  //index是当前页第一条数据的索引
  //pageSize是每一页显示多少条数据
  //pageNum是当前页的页码
  //index = (pageNum - 1) * pageSize
  
  EmpMapper empMapper = sqlSession.getMapper(EmpMapper.class);
  //从第1页开始查询，每页显示4条数据
  PageHelper.startPage(1, 4);
  List<Emp> list = empMapper.selectByExample(null);
  ```

  

- 如果需要获取更详细的分页信息，如是否有上一页下一页、具体上一页下一页页码、首页末页等，可以使用 PageInfo 来获取

  ```java
  EmpMapper empMapper = sqlSession.getMapper(EmpMapper.class);
  //从第1页开始查询，每页显示4条数据
  PageHelper.startPage(1, 4);
  List<Emp> list = empMapper.selectByExample(null);
  PageInfo<Emp> page = new PageInfo<>(list);
  ```

  

