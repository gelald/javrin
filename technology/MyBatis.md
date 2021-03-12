#### 持久层技术解决方案

1. JDBC（Java跟数据库交互的规范）

   - Connection
   - PrepareStatement
   - ResultSet

2. JdbcTemplate（工具类，算不上框架）

   - Spring对JDBC进行简单的封装

   

# 概述

MyBatis内部封装了jdbc，只需专注于sql语句，不必再花精力去处理加载驱动、创建连接等过程。用xml或注解的形式来配置需要执行的statement，通过java对象和statement中的动态参数来最终生成执行的sql语句，最后由MyBatis框架封装为java对象返回结果，使用的是ORM思想



MyBatis支持xml配置和注解配置，同时MyBatis也支持Dao的实现类，但是在实际开发过程中，越简便越好，所以都不采用，一般采用注解配置会更方便

# ORM

**Object Relational Mapping** 对象关系映射。把数据库表和实体类对应起来，把数据库字段和实体类的属性对应起来，让我们可以操作实体类就实现操作表

# QuickStart

1. 创建maven工程，并修改打包方式为jar、导入mybatis、mysql等内容的坐标

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <project xmlns="http://maven.apache.org/POM/4.0.0"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
       <modelVersion>4.0.0</modelVersion>
   
       <groupId>cn.itheima</groupId>
       <artifactId>day25_mybatis1</artifactId>
       <version>1.0-SNAPSHOT</version>
       <packaging>jar</packaging>
   
       <dependencies>
           <dependency>
               <groupId>org.mybatis</groupId>
               <artifactId>mybatis</artifactId>
               <version>3.4.5</version>
           </dependency>
           <dependency>
               <groupId>mysql</groupId>
               <artifactId>mysql-connector-java</artifactId>
               <version>8.0.11</version>
           </dependency>
           <dependency>
               <groupId>log4j</groupId>
               <artifactId>log4j</artifactId>
               <version>1.2.17</version>
           </dependency>
           <dependency>
               <groupId>junit</groupId>
               <artifactId>junit</artifactId>
               <version>4.10</version>
           </dependency>
       </dependencies>
   </project>
   
   ```

2. 创建实体类（尽量与表字段一一对应）和dao的接口

   User.java

   ```java
   package cn.itheima.domain;
   
   import java.io.Serializable;
   import java.util.Date;
   
   /**
    * @author ngyb
    * @date 2020/2/28
    */
   public class User implements Serializable {
       private Integer id;
       private String username;
       private Date birthday;
       private String sex;
       private String address;
   
       @Override
       public String toString() {
           return "User{" +
                   "id=" + id +
                   ", username='" + username + '\'' +
                   ", birthday=" + birthday +
                   ", sex='" + sex + '\'' +
                   ", address='" + address + '\'' +
                   '}';
       }
   
       public Integer getId() {
           return id;
       }
   
       public void setId(Integer id) {
           this.id = id;
       }
   
       public String getUsername() {
           return username;
       }
   
       public void setUsername(String username) {
           this.username = username;
       }
   
       public Date getBirthday() {
           return birthday;
       }
   
       public void setBirthday(Date birthday) {
           this.birthday = birthday;
       }
   
       public String getSex() {
           return sex;
       }
   
       public void setSex(String sex) {
           this.sex = sex;
       }
   
       public String getAddress() {
           return address;
       }
   
       public void setAddress(String address) {
           this.address = address;
       }
   }
   ```

   UserDao.java

   ```java
   package cn.itheima.dao;
   
   import cn.itheima.domain.User;
   
   import java.util.List;
   
   /**
    * @author ngyb
    * @date 2020/2/28
    */
   public interface UserDao {
       List<User> findAll();
   }
   ```

3. 创建MyBatis的主配置文件

   SqlMapConfig.xml

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE configuration
           PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
           "http://mybatis.org/dtd/mybatis-3-config.dtd">
   <!--mybatis的主配置文件-->
   <configuration>
       <!--配置环境，default是使用以下哪个环境，要和以下的环境id对应上-->
       <environments default="mysql">
           <!--配置mysql的环境-->
           <environment id="mysql">
               <!--配置事务类型-->
               <transactionManager type="JDBC"></transactionManager>
               <!--配置数据源，也叫连接池-->
               <dataSource type="POOLED">
                   <!--配置连接数据库的四个基本信息-->
                   <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                   <property name="url" value="jdbc:mysql://localhost:3306/mb"/>
                   <property name="user" value="root"/>
                   <property name="password" value="root"/>
               </dataSource>
           </environment>
       </environments>
       <!--指定映射配置文件的位置，指的是每个dao独立的配置文件-->
       <mappers>
           <mapper resource="com/itheima/dao/UserDao.xml"/>
       </mappers>
   </configuration>
   ```

4. 创建映射配置文件

   UserDao.xml

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE mapper
           PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
           "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
   <!--配置映射的类-->
   <mapper namespace="cn.itheima.dao.UserDao">
       <!--配置findAll方法，id中要写上对应的方法名称，resultType说明的是执行sql返回数据之后要封装成什么类型（全类名）-->
       <select id="findAll" resultType="cn.itheima.domain.User">
           select * from user
       </select>
   </mapper>
   ```

5. 测试

   MyBatisTest.java

   ```java
   @Test
   public void test1() throws Exception {
     //1.读取配置文件
     InputStream inputStream = Resources.getResourceAsStream("SqlMapConfig.xml");
     //2.SqlSessionFactory工厂类
     SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
     SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(inputStream);
     //3.使用工厂生产一个SqlSession对象
     SqlSession sqlSession = sqlSessionFactory.openSession();
     //4.使用SqlSession创建Dao接口的代理对象
     UserDao userDao = sqlSession.getMapper(UserDao.class);
     //5.使用代理对象执行方法
     List<User> users = userDao.findAll();
     for (User user : users) {
       System.out.println(user);
     }
     //6.释放资源
     sqlSession.close();
     inputStream.close();
   }
   ```


## xml配置形式

Dao

```java
public interface UserDao {
    List<User> findAll();
}

```

主配置文件

```xml
<!--指定映射配置文件的位置，指的是每个dao独立的配置文件-->
<mappers>
  <mapper resource="com/itheima/dao/UserDao.xml"/>
</mappers>
```

映射配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!--配置映射的类-->
<mapper namespace="cn.itheima.dao.UserDao">
    <!--配置findAll方法，id中要写上对应的方法名称，resultType说明的是执行sql返回数据之后要封装成什么类型（全类名）-->
    <select id="findAll" resultType="cn.itheima.domain.User">
        select * from user
    </select>
</mapper>
```

## 注解配置形式

Dao

```java
public interface UserDao {
    @Select("select * from user")
    List<User> findAll();
}
```

主配置文件

```xml
<!--用注解来配置，此处应该是使用class属性指定被注解的dao全类名-->
<mappers>
  <mapper class="com.itheima.dao.UserDao"/>
</mappers>
```

## 环境搭建的注意事项

1. 在MyBatis中，把持久层的操作接口的名称和映射文件也叫做：`Mapper`。所以UserDao对应的**映射配置文件**一般叫做`UserMapper.xml`。以后遇见了Mapper文件应该反应过来
2. 包的创建可以递归地创建`cn.itheima.dao`创建出来是三级的目录，但是在resouces中目录的创建必须要分三次来创建，否则创建出来的是一个名为`cn.itheima.dao`的目录
3. 映射配置文件的`mapper`标签的`namespace`的值必须是dao接口的全类名
4. 映射配置文件的操作配置的`id`的值必须是dao接口的方法名
5. 遵循3、4点之后就可以不需要写dao的实现类

# 使用步骤

1. 通过`Resources`来读取配置文件，也可以用`classLoader`来获取
2. 通过配置来创建对应的`SqlSessionFactoryBuilder`
3. 用SqlSessionFactoryBuilder来创建`SqlSessionFactory`
4. 通过SqlSessionFactory来创建`SqlSession`对象
5. 创建Dao接口的`代理对象`
6. 调用Dao接口中的方法
7. 释放资源（session、inputStream）



# MyBatis中的设计模式

- 构建者模式

  ```java
  SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
  SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(inputStream);
  ```

  提供配置，让它来给我创建工厂

  把对象的创建细节隐藏，使使用者直接调用方法即可拿到对象

- 工厂模式

  ```java
  SqlSession sqlSession = sqlSessionFactory.openSession();
  ```

  解耦，降低类之间的依赖关系

- 代理模式

  ```java
  UserDao userDao = sqlSession.getMapper(UserDao.class);
  ```

  不修改源码下对已有方法增强；从而实现不写dao的实现类也能实现功能

# 自定义MyBatis分析

1. 创建代理对象
2. 在代理对象中调用selectList





-------

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
