# MyBatis简介
## 原始jdbc操作
1. 注册驱动`Class.forName("com.mysql.cj.jdbc.Driver");`
2. 获取连接`DriverManager.getConnection(url, user, password);`
3. 从连接中获取Statement
4. 执行查询`statement.excuteQuery()`
5. 遍历结果集封装实体
6. 释放各种资源

缺陷:
1. 重复代码
2. 数据库连接资源会频繁创建、释放，从而影响程序的性能
3. sql语句和java程序耦合，不易维护
4. 查询时，需要手动把结果集封装到实体中；插入时，需要将实体数据设置到sql语句的占位符中

解决方案:
1. 抽取封装
2. 使用数据库连接池初始化一定的连接资源
3. 将sql语句放到配置文件中(xml)达到解耦的目的
4. 使用反射等将实体和表进行属性和字段的自动映射

# MyBatis入门
开发步骤:
1. 添加MyBatis坐标
2. 创建表
3. 创建实体类
4. 编写实体对应的映射配置文件`XxxMapper.xml`。主要描述的是sql语句**一般来说映射文件的目录层级和实体对应的dao的包层级是对应的**

    ```xml
    <?xml version="1.0" encoding="UTF-8" ?>
    <!DOCTYPE mapper PUBLIC "-//mybaits.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
    <!--namespace:命名空间 标识这个映射文件，与下面操作的id组合而成一个唯一的标识-->
    <mapper namespace="userMapper">
    
        <!--id:操作id resultType:查询到的结果集封装到这个结果类型中-->
        <select id="findAll" resultType="com.itheima.domain.User">
            select * from user
        </select>
    
    </mapper>
    ```
5. 编写核心配置文件`SqlMapConfig.xml`

    ```xml
    <?xml version="1.0" encoding="UTF-8" ?>
    <!DOCTYPE configuration PUBLIC "-//mybaits.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
    <configuration>
    
        <!--配置数据源的环境-->
        <environments default="development">
            <environment id="development">
                <transactionManager type="JDBC"/>
                <dataSource type="POOLED">
                    <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                    <property name="url" value="jdbc:mysql:///test"/>
                    <property name="username" value="root"/>
                    <property name="password" value="root"/>
                </dataSource>
            </environment>
        </environments>
    
        <!--加载映射文件-->
        <mappers>
            <mapper resource="com/itheima/mapper/UserMapper.xml"/>
        </mappers>
    
    </configuration>
    ```

## 查询操作
1. 映射文件使用`select`标签，`select`标签中的`resultType`属性指定返回的类型，方便结果集自动封装成对应对象类型
  
    ```xml
    <!--id:操作id resultType:查询到的结果集封装到这个结果类型中-->
    <select id="findAll" resultType="com.itheima.domain.User">
        select * from user
    </select>
    ```
2. 调用`selectList`方法时，可以直接使用resultType中的类型来接收
    ```java
    @Test
    public void test1() throws IOException {
        //获取核心配置文件
        InputStream inputStream = Resources.getResourceAsStream("sqlMapConfig.xml");
        //获取session工厂对象
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        //获取session会话对象
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //执行操作 参数:映射文件的namespace.操作id
        List<User> userList = sqlSession.selectList("userMapper.findAll");
        //打印数据
        System.out.println(userList);
        //释放资源
        sqlSession.close();
    }
    ```
## 插入操作
1. 映射文件使用`insert`标签，`insert`标签中的`parameterType`属性指定插入的类型，方便后面属性和字段的自动映射
2. sql语句中使用`#{对象属性名}`的结构引用对象的属性

    ```xml
    <!--parameterType:把对象中的属性自动映射到占位符-->
    <insert id="save" parameterType="com.itheima.domain.User">
        insert into user values(#{id},#{username},#{password})
    </insert>
    ```
3. MyBatis默认不提交事务，插入操作涉及数据库数据变化，需要手动提交事务

    ```java
    @Test
    public void test2() throws IOException {
        InputStream inputStream = Resources.getResourceAsStream("sqlMapConfig.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        User user = new User();
        user.setUsername("Tom");
        user.setPassword("abc");
        //传入user对象，目的是为了把属性映射到占位符
        int rowNumber = sqlSession.insert("userMapper.save", user);
        System.out.println(rowNumber);
        //mybatis默认不提交事务，必须手动提交事务才会使数据持久化
        //id自增，虽然前面那次插入操作没有持久化，但id还是会默默自增
        sqlSession.commit();
        sqlSession.close();
    }
    ```

## 更新操作
映射文件使用`update`标签，其余步骤与插入操作类似
    
## 删除操作
- 映射文件使用`delete`标签
    - 如果delete操作根据单一字段删除，那么`parameterType`可以传入对应参数的类型，并且#{}括号中的参数名可任意
    - 如果delete操作根据多个字段删除，那么`parameterType`需要传入该表对应的类，并且#{}中需要填写对象的属性名
```xml
<delete id="delete" parameterType="java.lang.Integer">
    delete from user where id=#{id}
</delete>
```

```java
@Test
public void test4() throws IOException {
    InputStream inputStream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
    SqlSession sqlSession = sqlSessionFactory.openSession();
    int row = sqlSession.delete("userMapper.delete", 7);
    System.out.println(row);
    //mybatis默认不提交事务，必须手动提交事务才会使数据持久化
    sqlSession.commit();
    sqlSession.close();
}
```

# MyBatis映射文件

## 基本sql语句

### select标签

查询语句

```xml
<select id="findAll" resultType="user">
  select * from user
</select>
```

### insert标签

插入语句

```xml
<insert id="save" parameterType="com.itheima.domain.User">
  insert into user values(#{id},#{username},#{password})
</insert>
```

### update标签

更新语句

```xml
<update id="update" parameterType="com.itheima.domain.User">
  update user set username=#{username}, password=#{password} where id=#{id}
</update>
```

### delete标签

删除语句

```xml
<delete id="delete" parameterType="java.lang.Integer">
  delete from user where id=#{id}
</delete>
```

### resultType属性

返回值类型，填写全限定类名

### parameterType属性

参数类型，填写全限定类名

## 动态sql语句

### where标签

可以根据后续是否添加了查询条件动态生成与否where

### if标签

根据实体类的不同取值，使用不同的sql语句进行查询。比如在id不为空的时候，根据id进行查询

```xml
<select id="findByCondition" parameterType="user" resultType="user">
  select * from user
  <where>
    <if test="id != null">
      and id = #{id}
    </if>
    <if test="username != null">
      and username = #{username}
    </if>
    <if test="password != null">
      and password = #{password}
    </if>
  </where>
</select>
```

- test：判断条件

### foreach标签

循环执行sql拼接操作

```xml
<select id="findByIdIn" parameterType="list" resultType="user">
  select * from user
  <where>
    <foreach collection="list" open="id in(" close=")" item="id" separator=",">
      #{id}
    </foreach>
  </where>
</select>
```

- collection：传入的可迭代对象的类型，list/array
- open：开始循环拼接的位置
- close：结束循环拼接的位置
- item：迭代的项
- separator：分隔符

### sql/include标签

可以把重复的sql语句提取出来，达到sql重用的目的

```xml
<!--sql语句抽取-->
<sql id="selectUser">select * from user</sql>

<select id="findByCondition" parameterType="user" resultType="user">
  <include refid="selectUser"/>
  <where>
    <if test="id != null">
      and id = #{id}
    </if>
    <if test="username != null">
      and username = #{username}
    </if>
    <if test="password != null">
      and password = #{password}
    </if>
  </where>
</select>
```

- id：抽取出来的sql语句片段的唯一标识

# MyBatis核心配置文件

## 层级关系
- configuration 配置
    - properties 属性
    - settings 设置
    - typeAliases 类型别名
    - typeHandlers 类型处理器
    - objectFactory 对象工厂
    - plugins 插件
    - environments 环境
        - environment 环境变量
            - transactionManger 事务管理器
            - dataSource 数据源
    - databaseIdProvider 数据库厂商标识
    - mappers 映射器
        - mapper 映射器
## environments标签
数据库环境配置，支持多环境配置
![](https://gitee.com/ngyb/pic/raw/master/20200809172804.png) 
事务管理器(transactionManager)类型有:

- **JDBC** 直接使用了JDBC的提交和回滚设置，依赖于从数据源得到的连接来管理事务作用域
- MANAGED 从来不提交或回滚一个连接，而是让容器来管理事务的整个生命周期。默认情况下会关闭连接，有些容器不希望这样，因此需要将closeConnection属性设置为false来阻止这个默认行为

数据源(dataSource)类型有:
- **UNPOOLED** 每次请求时打开和关闭连接
- **POOLED** 利用「池」的思想将JDBC连接对象统一管理
- JNDI 为了能在如EJB或应用服务器这类容器中使用，容器可以集中或在外部配置数据源，然后放置一个JNDI上下文的引用

## mappers标签
负责加载一系列映射文件
### mapper标签
加载映射配置文件
加载方式有:
- 使用相对路径的资源引用，从resources目录开始 `<mapper resource="com/itheima/mapper/UserMapper.xml"/>`
- 使用全限定资源定位符的资源引用，**用得不多** `<mapper url="file:///data/UserMapper.xml"/>`
- 使用映射器接口实现类的全限定类名，**配合注解使用** `<mapper class="com.itheima.mapper.UserMapper"/>`
- 将包内的映射器接口实现**全部注册为映射器** `<package name="com.itheima.mapper"/>`

## properties标签

实际开发中，习惯将数据源等配置信息单独抽成一个properties文件，该标签可以加载额外配置的properties文件

```xml
<!-- sqlMapConfig.xml -->
<configuration>

    <!--通过properties标签加载外部properties文件-->
    <properties resource="jdbc.properties"/>

    <!--配置数据源的环境-->
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>

    <!--加载映射文件-->
    <mappers>
        <mapper resource="com/itheima/mapper/UserMapper.xml"/>
    </mappers>

</configuration>
```



```properties
# jdbc.properties
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc://mysql:///test
jdbc.username=root
jdbc.password=root
```

## typeAliases标签

### typeAlias标签

类型别名，为一个Java类设置一个短的名字

MyBatis已经将常用的数据类型定义好了别名，基本上就是用基本数据类型代替包装类型，其中String别名是string

## typeHandlers标签

### typeHandler标签

类型处理器，执行sql语句时，涉及到Java类型和JDBC类型的转换

默认的类型处理器

| 类型处理器         | Java类型         | JDBC类型                           |
| ------------------ | ---------------- | ---------------------------------- |
| BooleanTypeHandler | Boolean、boolean | 数据库兼容的BOOLEAN                |
| ByteTypeHandler    | Byte、byte       | 数据库兼容的NUMERIC或BYTE          |
| ShortTypeHandler   | Short、short     | 数据库兼容的NUMERIC或SHORT INTEGER |
| IntegerTypeHandler | Integer、int     | 数据库兼容的NUMERIC或INTEGER       |
| LongTypeHandler    | Long、long       | 数据库兼容的NUMERIC或LONG INTEGER  |

#### 自定义类型处理器实现步骤

- 定义的转换器类XXXTypeHandler继承BaseTypeHandler
- 实现方法
  - setNonNullParameter：Java类型转换成数据库类型
  - getNullableResult：数据库类型转换成Java类型
- 在核心配置文件中注册

## plugins标签

可以使用第三方插件进行扩展功能，常用：PageHelper

# MyBatis相应API

## SqlSessionFactoryBuilder

创建SqlSession Factory对象

`SqlSessionFactory build(InputStream inputStream);`

通过加载MyBatis核心配置文件来构建一个`SqlSessionFactory`对象

## SqlSessionFactory

创建SqlSession对象

`SqlSession openSession();`

默认开启一个事务，但事务不会默认提交

`SqlSession openSession(boolean autoCommit)`

参数为是否自动提交事务

## SqlSession

- 执行sql语句

  ```java
  <T> T selectOne(String statement, Object parameter);
  <E> List<E> selectList(String statement, Object parameter);
  int insert(String statement, Object parameter);
  int update(String statement, Object parameter);
  int delete(String statement, Object parameter);	
  ```

- 操作事务

  ```java
  void commit();
  void rollback();
  ```

# MyBatis的Dao层实现

## 传统实现方式

- XXXMapper
- XXXMapperImpl
- XXXMapper.xml

在XXXMapperImpl类中获取核心配置文件，最终生成SqlSession，调用具体方法，传入namespace.id完成实现

**缺点：繁琐**

## 代理实现方式

**只需编写Mapper接口，由MyBatis根据接口定义创建接口的动态代理对象**

测试：

```java
InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
SqlSession sqlSession = sqlSessionFactory.openSession();
//根据类型获取对应Mapper
UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
List<User> user = userMapper.findAll();
```

# MyBatis多表操作

## 一对一查询配置

\<resultMap> + \<association>

用户和订单的关系如下

![](https://gitee.com/ngyb/pic/raw/master/20210509230738.png)

从订单的角度看，和用户的关系为一对一

**order实体的定义如下**

```java
public class order {
  private Integer id;
    private LocalDateTime orderTime;
    private BigDecimal total;
    //订单属于哪个用户
    private User user;
}
```

**查询的时候需要把用户信息设置到订单实体上**

查询的sql语句

```xml
<select id="findAll" resultMap="orderMap2">
  select *, o.id oid
  from `order` o,
  `user` u
  where o.user_id = u.id;
</select>
```

定义resultMap

**对象.属性的方式**

```xml
<resultMap id="orderMap" type="order">
  <!--column：数据表字段的名称-->
  <!--property：实体属性的名称-->
  <id column="oid" property="id"/>
  <result column="order_time" property="orderTime"/>
  <result column="total" property="total"/>
  <!--对象的取值方式-->
  <result column="user_id" property="user.id"/>
  <result column="username" property="user.username"/>
  <result column="password" property="user.password"/>
  <result column="birthday" property="user.birthday"/>
</resultMap>
```

**association方式**

```xml
<resultMap id="orderMap2" type="com.itheima.mbmulti.domain.Order">
  <!--column：数据表字段的名称-->
  <!--property：实体属性的名称-->
  <id column="oid" property="id"/>
  <result column="order_time" property="orderTime"/>
  <result column="total" property="total"/>
  <!--property：实体属性的名称-->
  <!--javaType：实体属性的类型-->
  <association property="user" javaType="com.itheima.mbmulti.domain.User">
    <id column="uid" property="id"/>
    <result column="username" property="username"/>
    <result column="password" property="password"/>
    <result column="birthday" property="birthday"/>
  </association>
</resultMap>
```

## 多对一查询配置

\<resultMap> + \<collection>

用户和订单的关系如下

![](https://gitee.com/ngyb/pic/raw/master/20210509230738.png)

从用户的角度看，和订单的关系是多对一

**user实体定义如下**

```java
public class User {
  private Integer id;
  private String username;
  private String password;
  private LocalDate birthday;
  //描述用户的订单
  private List<Order> orders;
}
```

**查询的时候需要把订单的信息设置到用户的实体上**

查询的sql语句

```xml
<select id="findAll" resultMap="userMap">
  select *, o.id oid
  from user u,
  `order` o
  where u.id = o.user_id
</select>
```

定义resultMap

```xml
<resultMap id="userMap" type="com.itheima.mbmulti.domain.User">
  <id column="user_id" property="id"/>
  <result column="username" property="username"/>
  <result column="password" property="password"/>
  <result column="birthday" property="birthday"/>
  <!--property：实体的集合属性名称-->
  <!--ofType：当前集合中的数据类型-->
  <collection property="orders" ofType="com.itheima.mbmulti.domain.Order">
    <id column="oid" property="id"/>
    <result column="order_time" property="orderTime"/>
    <result column="total" property="total"/>
  </collection>
</resultMap>
```

## 多对多查询配置

\<resultMap> + \<collection>

用户和角色的关系如下

![](https://gitee.com/ngyb/pic/raw/master/20210510003032.png)

从用户的角度看，用户和角色的关系是多对多

**user实体定义如下**

```java
public class User {
  private Integer id;
  private String username;
  private String password;
  private LocalDate birthday;
  //描述当前用户具备的角色
  private List<Role> roles;
}
```

**role实体定义如下**

```java
public class Role {
  private Integer id;
  private String name;
}
```

**查询的sql语句**

```xml
<select id="findUserAndRole" resultMap="userRoleMap">
  select *
  from user u,
  user_role ur,
  role r
  where u.id = ur.user_id
  and ur.role_id = r.id
</select>
```

**定义的resultMap**

```xml
<resultMap id="userRoleMap" type="com.itheima.mbmulti.domain.User">
  <id column="id" property="id"/>
  <result column="username" property="username"/>
  <result column="password" property="password"/>
  <result column="birthday" property="birthday"/>
  <collection property="roles" ofType="com.itheima.mbmulti.domain.Role">
    <id column="role_id" property="id"/>
    <result column="name" property="name"/>
  </collection>
</resultMap>
```

# MyBatis注解开发

简单的增删改查例子

```java
@Insert("insert into user values (#{id}, #{username}, #{password}, #{birthday})")
void save(User user);
@Update("update user set username = #{username}, password = #{password} where id = #{id}")
void update(User user);
@Delete("delete from user where id = #{id}")
void delete(Integer id);
@Select("select * from user where id = #{id}")
User findById(Integer id);
@Select("select * from user")
List<User> findAll();
```

**核心配置文件修改**

`mapper`标签改成`package`标签，意为扫描该包下的接口

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration PUBLIC "-//mybaits.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>

    <!--通过properties标签加载外部properties文件-->
    <properties resource="jdbc.properties"/>

    <!--自定义别名   -->
    <typeAliases>
        <typeAlias type="com.itheima.mbanno.domain.User" alias="user"/>
    </typeAliases>

    <!--配置数据源的环境-->
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>

    <!--加载映射关系-->
    <mappers>
        <!--指定接口所在的包-->
        <package name="com.itheima.mbanno.mapper"/>
    </mappers>

</configuration>
```

## 一对一关系查询

**OrderMapper.class**

```java
public interface OrderMapper {
    @Select("select *, o.id oid from `order` o, `user` u where o.user_id = u.id")
    @Results({
            @Result(column = "oid", property = "id"),
            @Result(column = "order_time", property = "orderTime"),
            @Result(column = "total", property = "total"),
            @Result(
                    property = "user", //要封装的属性名
                    javaType = User.class, //要封装的实体类型
                    column = "user_id", //根据哪个字段查询
                    one = @One(select = "com.itheima.mbanno.mapper.UserMapper.findById"))//查询的接口和方法
    })
    List<Order> findAll();
}
```

**UserMapper.class**

```java
@Select("select * from user where id = #{id}")
User findById(Integer id);
```

## 一对多关系查询

**UserMapper.class**

```java
@Select("select * from user")
@Results({
  @Result(column = "id", property = "id"),
  @Result(column = "username", property = "username"),
  @Result(column = "password", property = "password"),
  @Result(column = "birthday", property = "birthday"),
  @Result(property = "orders",
          column = "id",
          javaType = List.class,
          many = @Many(select = "com.itheima.mbanno.mapper.OrderMapper.findByUserId"))
})
List<User> findUserAndOrder();
```

**OrderMapper.class**

```java
@Select("select * from `order` where user_id = #{id}")
Order findByUserId(Integer id);
```

## 多对多关系查询

**UserMapper.class**

```java
@Select("select * from user")
@Results({
  @Result(column = "id", property = "id"),
  @Result(column = "username", property = "username"),
  @Result(column = "password", property = "password"),
  @Result(column = "birthday", property = "birthday"),
  @Result(property = "roles",
          column = "id",
          javaType = List.class,
          many = @Many(select = "com.itheima.mbanno.mapper.RoleMapper.findByUserId"))
})
List<User> findUserAndRole();
```

**RoleMapper.class**

```java
@Select("select r.* from user_role ur, role r where ur.role_id = r.id and ur.user_id = #{id}")
List<Role> findByUserId(Integer id);
```

