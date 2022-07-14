# JDBC

## JDBC

概念：Java DataBase Connectivity Java数据库连接

本质：官方定义的一套操作所有关系型数据库的规则，即接口。各个数据库厂商各自实现这个接口，提供数据库驱动jar包，来操作自家数据库

### 使用步骤

1. 导入驱动jar包

2. 注册驱动

3. 获取数据库连接对象 Connection

4. 定义sql

5. 获取执行sql语句的对象 Statement

6. 执行sql，接收结果

7. 处理结果

8. 释放资源

   ```java
   Class.forName("com.mysql.cj.jdbc.Driver");
   Connection connection = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/test", "root", "root");
   String sql = "";
   Statement statement = connection.createStatement();
   ResultSet resultSet = statement.executeQuery(sql);
   ```

   

### DriverManager：驱动管理

**功能**：

1. 注册驱动

   ```java
   static void registerDriver(Driver driver); //注册与给定的驱动程序
   
   //写代码时使用以下语句
   Class.forName("com.mysql.jdbc.Driver");
   //因为Driver类中存在静态代码块，所以只需加载Driver类就好
   static {
     try {
       DriverManager.registerDriver(new Driver());
     } catch (SQLException var1) {
       throw new RuntimeException("Can't register driver!");
     }
   }
   //或者这一句也可以
   import com.mysql.jdbc.Driver;
   new Driver();
   
   //目的就是把Driver类加载进内存并执行static代码块
   
   //注意：mysql5之后的jar包可以省略注册驱动
   ```

   注册驱动三种方式：

   ```java
   Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
   DriverManager.registerDriver(new com.mysql.jdbc.Driver());
   System.setProperty("jdbc.drivers", "com.mysql.jdbc.Driver");
   ```

   

2. 获取数据库连接

   ```java
   static void getConnection(String url, String user, String password);
   /*
   	url:连接的路径
   		语法:"jdbc:mysql://127.0.0.1:3306/test"
   	user:用户名
   	password:密码
   */
   ```

### Connection：数据库连接

**功能**：

1. 获取执行sql的对象 

   ```java
   Statement createStatement();
   
   PrepareStatement prepareStatement(String sql);
   ```

2. 管理事务 

   ```java
   void setAutoCommit(boolean autoCommit);	//调用该方法，设置参数值为false，即开启事务
   
   void commit();	//提交事务
   
   void rollback();	//回滚事务
   ```

### Statement：执行sql的对象

**功能：**执行静态sql语句，（即生成sql语句的时候所有参数都是拼接好的）

```java
boolean execute(String sql); //可以执行任意sql，一般情况不使用

int executeUpdate(String sql); //可以执行dml语句（insert、update、delete）、ddl语句
//返回值：影响的语句，判断dml语句是否执行成功；返回值大于0，执行成功；反之，执行失败
//如果执行的是ddl语句，则返回0

ResultSet executeQuery(String sql); //执行dql语句(select)
```

### ResultSet：结果集

```java
boolean next(); //使结果集游标向下移动一行
//返回值：判断当前行是否是最后一行末尾（最后一行下一行），
//返回false，没有数据；返回true，有数据 

XXX getXXX(参数);	//获取数据 XXX代表数据类型 如：getInt()返回一个int型数值 getString()返回一个字符串
//参数 
//1.int 列的编号，从1开始，getString(1)
//2.String 列的名称 getDouble("balance") 推荐使用列名，因为我们知道列名的类型，避免用编号的方式导致类型对不上的错误

```

**使用步骤**：

1. 游标向下移动一行 `next()`

2. 判断是否有数据

3. 获取数据 `getXXX()`

4. ```java
   while (resultSet.next()) {
     int id = resultSet.getInt("id");
     String name = resultSet.getString("name");
     double balance = resultSet.getDouble("balance");
     System.out.println(id);
     System.out.println(name);
     System.out.println(balance);
   }
   ```

### PrepareStatement

#### sql注入问题

在拼接sql时，有一些sql的特殊关键字参与字符串的拼接，会造成安全性问题。比如：拼接的时候拼上了or 'a' = 'a' 这种恒等式，导致前面的条件再筛选最终还是会查询到所有的记录出来

概念：预编译的sql语句。（参数使用？作为占位符）

后期都使用PrepareStatement：

1. 安全，防止sql注入
2. 在执行可变参数的一条SQL时，PreparedStatement比Statement的效率高，因为DBMS预编译一条SQL当然会比多次编译一条SQL的效率要高。 
3. 对于多次重复执行的语句，使用PreparedStament效率会更高一点，并且在这种情况下也比较适合使用batch

### Statement、PrepareStatement、CallableStatement异同

- 同：Statement、PreparedStatement和CallableStatement都是接口。
- 异：
  1.  继承关系：
     - Statement继承自Wrapper
     - PreparedStatement继承自Statement
     - CallableStatement继承自PreparedStatement
  2. 功能作用：
     - Statement接口提供了执行语句和获取结果的基本方法
     - PreparedStatement接口添加了处理 IN 参数的方法
     - CallableStatement接口添加了处理 OUT 参数的方法
  3. 特点：
     - Statement: **普通的不带参的查询SQL**；支持批量更新,批量删除; 
     - PreparedStatement: 可变参数的SQL,编译一次,执行多次,效率高; 
       安全性好，**有效防止Sql注入等问题**; 支持批量更新,批量删除;
     - CallableStatement: 继承自PreparedStatement,支持带参数的SQL操作; ****
       **支持调用存储过程,**提供了对输出和输入/输出参数(INOUT)的支持; 

#### 使用步骤

1. 导入驱动jar包
2. 注册驱动
3. 获取数据库连接对象 Connection
4. 定义sql
5. 获取执行sql语句的对象 **PrepareStatement**
6. 给sql中的参数赋值 `setXXX(?的位置编号从1开始, ?的值)` xxx代表参数的类型
7. 执行sql，接收结果，不需要传递sql语句
8. 处理结果
9. 释放资源

### 自定义的工具类

- 静态代码块：
  - 驱动注册。读取properties文件获取数据库驱动来注册，写在静态代码块中，使得这个驱动只注册一次，第一次调用方法前就会注册
- 方法：
  1. 获取连接。驱动注册的静态代码块时，读取properties文件顺便给静态变量赋值（url，user，password）来获取连接
  2. 释放资源。重复代码的抽取

```java
public class JDBCUtils {

    private static String url;
    private static String user;
    private static String password;

    private JDBCUtils() {

    }

    static {
        Properties properties = new Properties();
        //绝对路径，可以，但是位置一移动就不好使
        //获取src目录下的文件->ClassLoader
        ClassLoader classLoader = JDBCUtils.class.getClassLoader();
        InputStream resourceAsStream = classLoader.getResourceAsStream("jdbc.properties");
        try {
            properties.load(resourceAsStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        url = properties.getProperty("url");
        user = properties.getProperty("user");
        password = properties.getProperty("password");
        String driver = properties.getProperty("driver");
        try {
            Class.forName(driver);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(url, user, password);
    }

    public static void close(ResultSet resultSet, Statement statement, Connection connection) {
        if (resultSet != null) {
            try {
                resultSet.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (statement != null) {
            try {
                statement.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
```

### 控制事务

事务：一个包含多个步骤的业务操作。如果业务操作被事务管理，那么这些步骤只能同时成功或同时失败

使用Connection对象来管理事务

在执行sql之前**开启事务**

在所有sql执行完成之后**提交事务**

在catch中**回滚事务**

案例：

```java
Connection connection = null;
PreparedStatement preparedStatement1 = null;
PreparedStatement preparedStatement2 = null;
try {
  connection = JDBCUtils.getConnection();
  connection.setAutoCommit(false);
  String sql1 = "update account set balance = balance - ? where id = ?";
  String sql2 = "update account set balance = balance + ? where id = ?";
  preparedStatement1 = connection.prepareStatement(sql1);
  preparedStatement2 = connection.prepareStatement(sql2);
  preparedStatement1.setDouble(1, 500);
  preparedStatement1.setInt(2, 1);
  preparedStatement2.setDouble(1, 500);
  preparedStatement2.setInt(2, 2);
  preparedStatement1.executeUpdate();
  int i = 3 / 0; //异常-------------------
  preparedStatement2.executeUpdate();
  connection.commit();
} catch (Exception e) {
  e.printStackTrace();
  try {
    if (connection != null) {
      connection.rollback();
    }
  } catch (SQLException ex) {
    ex.printStackTrace();
  }
} finally {
  JDBCUtils.close(null, preparedStatement1, connection);
  JDBCUtils.close(null, preparedStatement2, null);
}
```

## 数据库连接池

概念：存放数据库连接的容器。当系统被初始化后，容器会被创建，容器中会申请一些连接对象。当用户访问数据库时，从容器中获取连接对象，用户访问完之后，将连接对象归还给容器

好处：

1. 节约资源，因为连接对象可以复用
2. 高效，直接从容器中获取连接，不用再耗费申请时间

### 实现

- 标准接口：DataSource

  ```java
  Connection getConnection(); //获取连接对象
  
  void close();
  //如果连接对象是从连接池中获取的，那么调用Connection.close()方法就不再关闭连接，而是归还连接
  ```

- 实现

  - c3p0：旧，和hibernate框架同时使用有较好的性能
  - druid：新，由阿里巴巴实现，高效.(读音join d)

### c3p0

**使用步骤**：

1. 导入jar包
2. 定义配置文件
   1. 文件名称：必须是 c3p0.properties 或 c3p0-config.xml ，否则c3p0无法自动寻找配置文件
   2. 文件路径：类路径下，即src目录下
3. 创建核心对象：数据库连接池对象 **ComboPooledDataSource**。构造方法中，不传递参数，使用默认的配置；可以传入自定义配置的名称，则使用的是自定义的配置
4. 获取连接：`getConnection()`

**配置文件**：

```xml
<c3p0-config>
  <!-- 新建ComboPooledDataSource默认使用的的配置读取连接池对象 -->
  <default-config>
  	<!--  连接参数 -->
    <property name="driverClass">com.mysql.jdbc.Driver</property>
    <property name="jdbcUrl">jdbc:mysql://localhost:3306/test</property>
    <property name="user">root</property>
    <property name="password">root</property>
    
    <!-- 连接池参数 -->
    <!--初始化申请的连接数量。容器一初始化，申请好5个连接-->
    <property name="initialPoolSize">5</property>
    <!--最大的连接数量。初始化的一旦用完，再需要使用的话需要再申请，但是申请的总数不能超过10个-->
    <property name="maxPoolSize">10</property>
    <!--超时时间-->
    <property name="checkoutTimeout">3000</property>
  </default-config>

  <!-- 自定义配置，其中name可以作为参数传入ComboPooledDataSource的构造方法中 -->
  <named-config name="otherc3p0"> 
    <!--  连接参数 -->
    <property name="driverClass">com.mysql.jdbc.Driver</property>
    <property name="jdbcUrl">jdbc:mysql://localhost:3306/test</property>
    <property name="user">root</property>
    <property name="password">root</property>
    
    <!-- 连接池参数 -->
    <property name="initialPoolSize">5</property>
    <property name="maxPoolSize">8</property>
    <property name="checkoutTimeout">1000</property>
  </named-config>
</c3p0-config>
```

### druid

**使用步骤**：

1. 导入jar包
2. 定义配置文件
   1. 是properties形式的
   2. 可以是任意名称，可以放在任意的目录下
3. 用properties来加载配置文件
4. 通过工厂类`druidDataSourceFactory`获取数据库连接池对象 
5. 获取连接：`getConnection()`

**配置文件：**

```properties
driverClassName=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://127.0.0.1:3306/test
username=root
password=root
# 初始化连接数量
initialSize=5
# 最大连接数量
maxActive=10
# 超时时间
maxWait=3000
```

**工具类**

- 静态代码块：
  - 在静态代码块中通过properties来加载配置文件，初始化连接池对象
- 方法：
  - 获取连接
  - 释放资源
  - 获取连接池

```java
private static DataSource dataSource;

static {
  Properties properties = new Properties();
  ClassLoader classLoader = JDBCUtils.class.getClassLoader();
  InputStream resourceAsStream = classLoader.getResourceAsStream("druid.properties");
  try {
    properties.load(resourceAsStream);
    dataSource = DruidDataSourceFactory.createDataSource(properties);
  } catch (Exception e) {
    e.printStackTrace();
  }
}

public static Connection getConnection() throws SQLException {
  return dataSource.getConnection();
}

public static void close(Statement statement, Connection connection) {
  if (statement != null) {
    try {
      statement.close();
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }
  if (connection != null) {
    try {
      connection.close(); //归还连接
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }
}

public static void close(ResultSet resultSet, Statement statement, Connection connection) {
  if (resultSet != null) {
    try {
      resultSet.close();
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }
  JDBCUtils.close(statement, connection);
}

public static DataSource getDataSource() {
  return dataSource;
}
```

## Spring JDBC

Spring框架对JDBC的简单封装，使用**JDBCTemplate**对象

不需要申请连接和释放资源了，只需通过连接池获取JDBCTemplate然后即可执行DML、DQL

**步骤**：

1. 导入jar包

2. 创建JDBCTemplate对象。依赖DataSource

    `JDBCTemplate jdbcTemplate = new JDBCTemplate(dataSource)`

3. 调用方法来完成crud的操作

   ```java
   int update();	//执行DML语句，完成增、删、改语句
   //返回影响行数
   
   Map<String, Object> queryForMap();	//查询结果将结果集封装成为map集合
   //列名为key，值为value
   //查询的结果集长度只能是1，否则报错
   
   List<Map<String, Object>> queryForList();	//查询结果将结果集封装成为list集合
   //每一个记录封装成Map<String, Object>，再把所有map装载到List中
   
   List<T> query();	//执行DQL语句，查询结果将结果集封装成JavaBean对象
   //参数：RowMapper
   //一般使用 BeanPropertyRowMapper对象，实现数据->JavaBean对象的转换
   //new BeanPropertyRowMapper<>(T.class)
   
   T queryForObject();	//查询结果将结果集封装成对象(基本数据类型的包装类)
   //一般用于聚合函数的查询
   ```

**案例**

```java

    private JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    /**
     * 修改id为1001的记录的salary为10000
     */
    @Test
    public void test1() {
        String sql = "update emp set salary = 10000 where id = ?";
        template.update(sql, 1001);
    }

    /**
     * 插入一条新记录
     */
    @Test
    public void test2() {
        String sql = "insert into emp(id, ename, dept_id) values(?, ?, ?)";
        template.update(sql, 1015, "郭靖", 10);
    }

    /**
     * 删除一条记录
     */
    @Test
    public void test3() {
        String sql = "delete from emp where id = ?";
        template.update(sql, 1015);
    }

    /**
     * 查询id为1001的记录，将结果集封装成 Map<String, Object>
     */
    @Test
    public void test4() {
        String sql = "select * from emp where id = ?";
        Map<String, Object> stringObjectMap = template.queryForMap(sql, 1001);
        System.out.println(stringObjectMap);
    }

    /**
     * 查询所有记录，将结果集封装成 List<Map<String, Object>>
     */
    @Test
    public void test5() {
        String sql = "select * from emp";
        List<Map<String, Object>> list = template.queryForList(sql);
        for (Map<String, Object> stringObjectMap : list) {
            System.out.println(stringObjectMap);
        }
    }

    /**
     * 查询所有记录，将结果集封装成 List<Emp>
     */
    @Test
    public void test6() {
        String sql = "select * from emp";
        List<Emp> list = template.query(sql, new BeanPropertyRowMapper<>(Emp.class));
        for (Emp emp : list) {
            System.out.println(emp);
        }
    }

    /**
     * 查询记录数
     */
    @Test
    public void test7() {
        String sql = "select count(id) from emp";
        Long total = template.queryForObject(sql, Long.class);
        System.out.println(total);
    }
```

# Servlet

## 概念

server applet 运行在服务端的小程序

servlet就是一个**接口**，定义了Java类被tomcat识别到的**规则**

**配置servlet**

```xml
<!--配置Servlet 全类名和servlet名字的映射-->
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee"
         version="4.0">
    <servlet>
      <servlet-name>demo01</servlet-name>
      <servlet-class>cn.itcast.servlet.ServletDemo01</servlet-class>
    </servlet>
    <!--url对servlet的映射 url和servlet名字的映射-->
    <servlet-mapping>
      <servlet-name>demo01</servlet-name>
      <url-pattern>/demo01</url-pattern>
    </servlet-mapping>
</web-app>
```

## 执行原理

1. 当服务器接收到浏览器的请求后，解析请求的url，获取资源路径
2. 查找web.xml去寻找有没有对应的 `<url-pattern>`
3. 找到url-pattern对应的 `<servlet-class>` 全类名
4. 根据全类名将字节码文件加载进内存Class.forName()
5. 创建对象cls.newInstance()
6. 调用service方法

**抽象方法**

```java
//初始化方法
//在servlet被创建时执行，只执行一次
@Override
public void init(ServletConfig servletConfig) throws ServletException {

}

//获取ServletConfig对象
//Servlet配置对象
@Override
public ServletConfig getServletConfig() {
  return null;
}

//提供服务的方法
//在servlet被访问时执行，执行多次
@Override
public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
  
}

//获取Servlet的信息，版本、作者
@Override
public String getServletInfo() {
  return null;
}

//销毁方法
//在服务器被正常关闭时执行，只执行一次
@Override
public void destroy() {

}
```

## **生命周期**

1. 加载：servlet容器**通过类加载器**使用servlet类对应的文件**加载**servlet

2. 创建：通过调用servlet**构造函数**创建一个servlet对象

3. 初始化：执行init方法，只执行一次

   ```
   创建Servlet的实例是由Servlet容器来完成的，且创建Servlet实例是在初始化方法init()之前
   默认情况下第一次被访问时，Servlet被创建
   可以指定Servlet的创建时机
   在<servlet>标签下的<load-on-startup>配置
   负数：第一次被访问时创建（默认-1）
   0或正数：服务器启动时创建
   
   
   Servlet的init方法只执行一次，说明Servlet在内存中只存在一个对象，Servlet是单例的。
   多个用户访问时，可能存在线程安全的问题
   解决方案：尽量不要servlet中定义成员变量，定义局部变量的话，每次方法入栈都有一份独立的局部变量。即使定义了成员变量也不要对其修改
   ```

4. 提供服务：执行service方法，执行多次。每当有一个客户请求，容器会创建一个线程来处理客户请求

5. 被销毁：执行destroy方法，只执行一次

   ```
   只有服务器正常关闭时，才会执行destroy方法
   
   在销毁servlet之前，执行destroy方法
   ```

## 多线程问题

```
Servlet的init方法只执行一次，说明Servlet在内存中只存在一个对象，Servlet是单例的。servlet处于服务器进程中，它通过多线程方式运行其service方法，一个实例可以服务于多个请求，并且其实例一般不会销毁。
而CGI对每个请求都产生新的进程，服务完成后就销毁，所以效率上低于servlet。
```



## Servlet3.0

- 支持注解配置，可以不需要web.xml

- 在类上使用`@WebServlet("资源路径")`注解，进行配置资源路径

  ```java
  //需要制定urlPatterns的值，但value代表了urlPatterns的值，同时value可以省略，可以非常方便配置
  @WebServlet("/demo2")
  public class ServletDemo01 implements Servlet {
  ```


## 体系结构

实现类

Servlet(接口)--GenericServlet(抽象类)--HttpServlet(抽象类)

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrty5io6j313u0iwgsa.jpg)

### GerericServlet

将Servlet接口中的其他方法做了默认空实现，只将service方法作为抽象。将来创建Servlet时，继承GenericServlet后只需实现service方法

给出了**设计 servlet 的一些骨架，定义了 servlet 生命周期**，还有一些得到名字、配置、初始化参数的方法，其设计的**是和应用层协议无关的**

### HttpServlet

对Http协议的封装，简化操作

1. 定义类继承HttpServlet

2. 复写doGet或者doPost方法

   ```java
   @WebServlet("/RequestDemo01")
   public class RequestDemo01 extends HttpServlet {
       protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
   
       }
   
       protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
   
       }
   }
   ```

   

## 相关配置

- url-pattern：servlet访问路径

  ```
  一个servlet可以定义多个访问路径，一般只定义一个
  
  规则：
  1./xxx
  2./xxx/xxx 多层路径，目录结果
  3.*.do 一定不能加/，路径中一定要加.do
  ```

## Request

**请求的过程**：

1. tomcat服务器根据请求url中的**资源路径**，创建对应的**servlet**对象
2. tomcat服务器创建request和response两个对象，request对象中封装请求消息数据
3. tomcat服务器将request和response传递给servlet中的service方法，并调用
4. 开发人员可以通过request获取请求信息，通过response设置响应数据
5. tomcat服务器在给浏览器做出响应之前，从response对象中提取被设置的响应消息数据

**request继承体系结构**：

ServletRequest(接口)--HttpServletRequest(接口)--RequestFacade(类 tomcat的)

### 功能

#### 获取请求消息数据

1. 获取请求行数据

   ```java
   //获取请求方式
   String getMethod();
   
   // ***** 获取虚拟目录（项目路径）
   String getContextPath();
   
   //获取Servlet路径（资源路径）
   String getServletPath();
   
   //获取get请求参数（路径参数）后续不采用这个方法获取参数（获取到的是一行的）
   String getQueryString();
   
   // ***** 获取请求uri（项目路径+资源路径）
   //contextPath+servletPath
   String getRequestURI();
   
   //获取整个url 不包含路径参数
   //host+contextPath+servletPath
   StringBuffer getRequestURL();
   
   /*
   	（范围更大）uri:统一资源标识符 /day14/demo ：共和国
   	url:统一资源定位符 http://localhost:8080/day14/demo ：中国人民共和国
   */
   
   //获取协议和版本号
   String getProtocol();
   
   //获取客户机的IP地址 IPv6地址
   String getRemoteAddr();
   ```

   ![image-20200619172425047](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfxq3s8oi3j30y60n6adq.jpg)

2. 获取请求头数据

   ```java
   // ***** 根据请求头的名称来获取值
   String getHeader(String name);
   
   //获取所有请求头的名称
   Enumeration<String> getHeaderNames(); //当作迭代器来使用
   ```

   

3. 获取请求体数据（只有post请求方式才有请求体）

   1. 获取流数据

      ```java
      BufferedReader getReader(); //获取字符输入流 （获取到的是一行的）
      ServletInputStream getInputStream(); //获取字节输入流
      ```

      

   2. 从流数据中拿数据

   

#### 其他功能（非常重要）

1. 获取请求参数通用的方式，同时适用get/post请求，可以复用其中一份的代码

   ```java
   //根据参数名获取参数值，会自动分隔
   String getParameter(String name);
   //tomcat8会自动解决中文的问题
   //如果使用了其他版本那么需要使用utf-8重新编码
   String param = request.getParameter("param");
   param = new String(param.getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8);
   
   //根据参数名获取参数值的数组(复选框)
   String[] getParameterValues(String name);
   
   //获取所有的参数名称
   Enumeration<String> getParameterNames();
   
   //获取所有参数的简直对集合
   Map<String, String[]> getParameterMap();
   
   //中文乱码问题
   /*
   	get请求：tomcat8版本已解决中文乱码问题
   	post请求：中文乱码，内部还是适用流的方式获取
   		解决：request.setCharacterEncoding("utf-8")
   */
   ```

   

2. 请求转发:一种在服务器内部的资源跳转的方式

   ```java
   //1.通过request对象获取请求转发器对象
   //path填写资源路径（servlet的名）或者jsp的名字，因为jsp就是servlet
   RequestDispatcher getRequestDispatcher(String path);
   
   //2.使用RequestDispatcher对象进行转发
   void forward(ServletRequest request, ServletResponse response);
   
   
   /*
   	1.浏览器地址栏路径没有发生变化
   	2.只能转发到当前服务器内部的资源中
   	3.转发是同一次请求，同一次请求意味着可以使用request域中的共享数据
   	4.只能转发到相同方法
   */
   ```

   ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrtymg8lj31ru0tkwi9.jpg)

3. 共享数据

   ```java
   //域对象：一个有作用范围的对象，可以在范围内共享数据
   /*
   	request域：代表一次请求的范围，一般用于请求转发的多个资源中共享数据
   */
   
   //存储数据
   void setAttribute(String name, Object object);
   
   //获取数据
   Object getAttribute(String name);
   
   //移除数据
   void removeAttribute(String name);
   ```

   

4. 获取ServletContext对象

   ```java
   Servlet getServletContext();
   ```

### 案例

需求

```
1.login html页面 username、password两个输入框
2.使用druid连接池操作数据库中的user表
3.使用JDBCTemplate封装JDBC
4.登陆成功跳转到SuccessServlet，登陆成功，欢迎用户名
5.登陆失败跳转到FailServlet，登陆失败，用户名或密码错误
```

代码

```java
//domain/User.java
package cn.itcast.domain;

/**
 * @author ngwingbun
 * @date 2020/1/4
 */
public class User {
    private Integer id;
    private String username;
    private String password;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public User(Integer id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}


//dao/UserDao.java
package cn.itcast.dao;

import cn.itcast.domain.User;
import cn.itcast.util.JDBCUtils;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 * @author ngwingbun
 * @date 2020/1/4
 */
public class UserDao {
    private JdbcTemplate jdbcTemplate = new JdbcTemplate(JDBCUtils.getDataSource());

    public User login(User loginUser) {
        try {
            String username = loginUser.getUsername();
            String password = loginUser.getPassword();
            String sql = "select * from user where username = ? and password = ?";
            return this.jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<User>(User.class), username, password);
        } catch (Exception e) {
            return null;
        }
    }
}


//util/JDBCUtils
package cn.itcast.util;

import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

/**
 * @author ngwingbun
 * @date 2020/1/4
 */
public class JDBCUtils {

    private static DataSource dataSource;

    static {
        Properties properties = new Properties();
        ClassLoader classLoader = JDBCUtils.class.getClassLoader();
        InputStream resourceAsStream = classLoader.getResourceAsStream("druid.properties");
        try {
            properties.load(resourceAsStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            dataSource = DruidDataSourceFactory.createDataSource(properties);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }

    public static DataSource getDataSource() {
        return dataSource;
    }

}


//servlet/LoginServlet
package cn.itcast.web.servlet;

import cn.itcast.dao.UserDao;
import cn.itcast.domain.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author ngwingbun
 * @date 2020/1/4
 */
@WebServlet("/loginServlet")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");

        String username = request.getParameter("username");
        String password = request.getParameter("password");
        User loginUser = new User();
        loginUser.setUsername(username);
        loginUser.setPassword(password);
        UserDao userDao = new UserDao();
        User user = userDao.login(loginUser);
        if (user == null) {
            request.getRequestDispatcher("/failServlet").forward(request, response);
        } else {
            request.setAttribute("username", user);
            request.getRequestDispatcher("/successServlet").forward(request, response);
        }
    }
}


//serlvet/SuccessServlet
package cn.itcast.web.servlet;

import cn.itcast.domain.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author ngwingbun
 * @date 2020/1/4
 */
@WebServlet("/successServlet")
public class SuccessServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=utf-8");
        User user = (User) request.getAttribute("user");
        if (user != null) {
            response.getWriter().write("登陆成功，欢迎" + user.getUsername());
        }
    }
}


//servlet/FailServlet
package cn.itcast.web.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author ngwingbun
 * @date 2020/1/4
 */
@WebServlet("/failServlet")
public class FailServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=utf-8");
        response.getWriter().write("登陆失败，用户名或密码错误");
    }
}


//login.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <form action="/day14_test/loginServlet" method="get">
        用户名:<input type="text" name="username"/><br>
        密码:<input type="password" name="password"/><br>
        <input type="submit" value="提交"/>
    </form>
</body>
</html>

```

改进：使用BeanUtils，完成Map->Object，简化数据封装

```
用于封装JavaBean

属性：setter和getter截取后的产物，大多数和成员变量一样。例外：set后面跟其他内容 但也设置成员变量的值

void populate(Object obj, Map map):将map集合的键值对信息，封装到JavaBean对象中
```

## Response

### 功能

#### 设置响应消息

1. 设置响应行

   ```java
   //设置状态码
   void setStatus(int sc);
   ```

   

2. 设置响应头

   ```java
   //设置响应体
   void setHeader(String name, String value);
   ```

   

3. 设置响应体

   ```java
   /*
   	1.获取输出流
   			字符输出流：输出字符				PrintWriter getWriter()
   			字节输出流：输出任意数据		 ServletOutputStream getOutputStream()
   	2.使用输出流将数据输出到浏览器
   */
   PrintWriter getWriter();//获取字符输出流
   ServletOutputStream getOutputStream();//获取字节输出流
   ```

### 案例

#### 重定向

```java
//方法一
//设置状态码为302
response.setStatus(302);
//设置响应头location
response.setHeader("location", "/day15/responseDemo02");

//方法二 简单的重定向方法
response.sendRedirect("/day15/responseDemo02");
```

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsru0l92kj31xo0ny7c4.jpg)

**特点：**

1. 浏览器地址栏发生变化
2. 可以访问其他服务器的资源
3. 重定向是两次请求（不能使用request对象来共享数据）
4. 第二次请求是客户端发出的，所以用绝对路径的话要加上项目路径

**重定向和请求转发的区别**：

```
redirect：请求重定向:客户端行为，本质上为2次请求，地址栏改变，前一次请求对象消失。
举例：去银行办事，结果告诉你少带了东西，你得先去xx局办临时身份证,这时你就会走出银行，自己前往xx局，地址栏改变

forward：请求转发:服务器行为，地址栏不变。
举例：你把钱包落在出租车上，你去警察局报案，警察局说钱包落在某某公司的出租车上，这时你不用亲自去找某某公司的出租车,警察局让出租车自己给你送来，你只要在警察局等就行。所以地址栏不变。
```

**路径：**

1. 相对路径：具有一个相对的位置关系，不以/开头。
   1. 规则：确定访问的当前资源和目标资源的相对位置关系
2. 绝对路径：通过绝对路径可以确定唯一资源，以/开头。
   1. 规则：给客户端：需要加虚拟目录（项目路径）；给服务器：只需要资源路径（Servlet路径）
   2. 建议虚拟目录使用`getContextPath()`来动态获取

#### 服务器输出字符数据到浏览器

```java
//解决中文乱码问题，两个方式
response.setHeader("content-type", "text/html;charset=utf-8");
response.setContentType("text/html;charset=utf-8");

//1.获取字符输出流
PrintWriter writer = response.getWriter();

//2.输出数据
//response获取的PrintWriter不需要手动flush，一次响应结束后会自动销毁，同时获取的流也会自动关闭，流关闭前会刷新缓冲区
writer.write("<h1>h1标题</h1>");
```

#### 服务器输出字节数据到浏览器

```java
//1.获取字节输出流
ServletOutputStream outputStream = response.getOutputStream();
//2.输出数据
outputStream.write("你好".getBytes("GBK"));
```

#### 验证码

servlet

```java
int width = 100;
int height = 50;
//1.创建图片对象，内存中生成
BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
//2.美化图片
//创建画笔对象
Graphics graphics = image.getGraphics();
graphics.setColor(Color.PINK);//填充颜色
graphics.fillRect(0, 0, width, height);//填充

graphics.setColor(Color.BLUE);//边框颜色
graphics.drawRect(0, 0, width - 1, height - 1);//画一个矩形充当边框

//生成随机码
String checkCode = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
Random random = new Random();

int index;
char ch;
for (int i = 1; i <= 4; i++) {
  index = random.nextInt(checkCode.length());
  ch = checkCode.charAt(index);
  graphics.drawString(Character.toString(ch), width / 5 * i, 25);
}

//画干扰线
graphics.setColor(Color.GREEN);
int x1, x2, y1, y2;
for (int i = 0; i < 10; i++) {
  x1 = random.nextInt(width);
  x2 = random.nextInt(width);
  y1 = random.nextInt(height);
  y2 = random.nextInt(height);
  graphics.drawLine(x1, y1, x2, y2);
}
//3.输出图片
ServletOutputStream outputStream = response.getOutputStream();
ImageIO.write(image, "jpg", outputStream);
```

html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script>
        window.onload = function () {
            let checkCode = document.getElementById("checkCode");
            checkCode.onclick = function () {
                let time = new Date().getTime();
                checkCode.src = "/day15/checkCode?" + time;
            }
        }
    </script>
</head>
<body>
<img id="checkCode" src="/day15/checkCode"/>
<a href="">看不清 换一张</a>
</body>
</html>
```

## ServletContext

概念：代表整个Web工程。可以和程序的容器（服务器：tomcat）来通信

### 获取

1. 通过request对象获取：`request.getServletContext();`
2. 通过HttpServlet对象获取：`this.getServletContext();`

web应用只有一个，所以不管何种方式获取出来的对象都是一样的

### 功能

1. 获取MIME类型：互联网通信过程中一种文件的数据类型。格式：大类型/小类型`text/html` `image/jpg`

   ```java
   String getMimeType(String file);//获取MIME类型
   //根据文件的后缀名来获取的，整个MIME类型的对应关系在服务器里面存储着 tomcat下的web.xml
   ```

   

2. 域对象：共享数据

   ```java
   /*
   	serlevtContext域：最大的范围，共享所有用户所有请求的数据
   	生命周期很长：服务器启动产生，服务器关闭才销毁。在内存中驻留很久
   */
   
   //存储数据
   void setAttribute(String name, Object object);
   
   //获取数据
   Object getAttribute(String name);
   
   //移除数据
   void removeAttribute(String name);
   
   ```

   

3. 获取文件的真实路径（服务器路径）

   ```java
   String getRealPath(String path);
   
   
   //三个例子
   ServletContext servletContext = request.getServletContext();
   String bRealPath = servletContext.getRealPath("/b.txt");//web目录下
   System.out.println(bRealPath);
   String cRealPath = servletContext.getRealPath("/WEB-INF/c.txt");//web目录下的WEB-INF目录下
   System.out.println(cRealPath);
   String aRealPath = servletContext.getRealPath("/WEB-INF/classes/a.txt");//src目录下，将来会存在于web目录下的WEB-INF目录下的classes目录下
   System.out.println(aRealPath);
   
   //src目录下的配置文件都可以使用classLoader来获取
   ClassLoader classLoader = ServletContextDemo02.class.getClassLoader();
   URL resource = classLoader.getResource("a.txt");
   System.out.println(resource.getPath());
   ```

### 案例

需求

```
1.页面显示超链接
2.点击超链接后弹出下载提示框
3.完成图片文件下载
```

代码

servlet

```java
//为避免浏览器主动解析了图片等资源导致无法实现弹出下载框，让href不直接指向资源文件，而是指向servlet并手动设置响应头的content-disposition为attachment;filename=xxx

//1.获取请求参数，文件名称
String filename = request.getParameter("filename");

//2.使用字节输入流，读取文件进入内存
//寻找文件真是路径
ServletContext servletContext = request.getServletContext();
String realPath = servletContext.getRealPath("/img/" + filename);
//用字节流关联
FileInputStream fileInputStream = new FileInputStream(realPath);

//3.设置响应头
String mimeType = servletContext.getMimeType(filename);
response.setHeader("content-type", mimeType);
response.setHeader("content-disposition", "attachment;filename=" + filename);

//4.将输入流的数据写出到输出流中
ServletOutputStream outputStream = response.getOutputStream();
byte[] bytes = new byte[1024 * 8];
int len;
while ((len = fileInputStream.read(bytes)) != -1) {
  outputStream.write(bytes, 0, len);
}
//outputStream是response中创建的，不用关闭，但是fileInputStream是手动创建的，需要关闭
fileInputStream.close();
```

# 会话技术

概念：浏览器第一次给服务器发送资源，会话建立。直到有一方断开为止。一次会话包含多次请求和响应。

作用：在一次会话的范围内的多次请求间共享数据。使用会话技术来解决HTTP无状态的问题

分类：

1. 客户端会话技术：Cookie
2. 服务器会话技术：Session

## Cookie

概念：客户端会话技术，将数据保存在客户端

**使用步骤**

1. 创建Cookie对象，绑定数据

   ```java
   public Cookie(String name, String value);//cookie名字和值
   ```

2. 通过响应发送cookie给浏览器

   ```java
   void addCookie(Cookie cookie);
   response.addCookie(Cookie cookie);
   ```

3. 获取请求获取cookie中的数据

   ```java
   Cookie[] getCookies();
   request.getCookies();
   ```

### 实现原理

基于响应头`set-cookie`和请求头`cookie`来实现的

请求到服务器资源后，服务器给响应增加一个响应头`set-cookie:msg=hello`cookie呈键值对形式。浏览器收到响应后发现响应头中有`set-cookie`，知道这是一个cookie，缓存到浏览器中（HTTP请求协议的约束，HTTP中响应头规定：如果浏览器收到set-cookie后，会自动地将`set-cookie`中的数据缓存到客户端）。并且下一次发送请求的时候自动带上`set-cookie`中的数据（数据会自动放到`cookie`请求头中，`cookie:mes=hello`）。在服务器中可以获取请求头中的`cookie`中的数据

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsru140ibj31si0n4dp7.jpg)

### 细节处理

1. 一次发送多个cookie

   创建多个cookie，response调用多次addCookie即可

2. **cookie在浏览器中的存活时间**

   1. 默认情况下，浏览器关闭后，cookie数据被销毁
   2. 持久化存储：`setMaxAge(int second)`
      1. 正数：将cookie的数据写到硬盘的文件中。持久化存储。second：存活时间，超过这个second，这个文件会被自动地删除掉
      2. 负数：默认，存在浏览器的内存中，浏览器关闭，cookie就没了
      3. 0：删除cookie信息

3. cookie存中文。tomcat8之前，不能直接存储中文。tomcat8之后，支持中文

4. **cookie共享问题**

   1. 默认情况下，同一个服务器下多个项目不能共享

      ```
      setPath(String path) //设置cookie的获取范围，默认情况下，设置当前的虚拟目录（项目名称），所以只有当前项目才能获取cookie。如果要多个项目共享，可以把path设置为/
      ```

   2. 不同服务器的共享问题

      ```
      setDomain(String path) //如果设置一级域名相同，那么多个服务器之间，cookie可以共享。
      setDomain(".baidu.com") //那么所有一级域名为.baidu.com的网站都可以共享这个cookie
      ```

### 特点作用

1. cookie存储数据在客户端。数据不安全，容易丢失和篡改
2. 浏览器对于单个cookie大小有限制，以及对同一个域名下的总cookie数量也有限制（20）。
3. cookie一般用于存储少量、不太敏感的数据到浏览器
4. 在不登陆的情况下，完成服务器对客户端的身份识别

### 案例

需求

```
第一次访问，提示，您好，第一次访问
第二次访问，提示，欢迎回来，上一次的访问时间
```

代码

```java
Cookie[] cookies = request.getCookies();
response.setCharacterEncoding("gbk");
PrintWriter writer = response.getWriter();
if (cookies == null) {
	writer.write("第一次登陆，欢迎");
} else {
	for (Cookie cookie : cookies) {
		if ("loginTime".equals(cookie.getName())) {
			String value = cookie.getValue();
			//URL解码
			URLDecoder.decode(value, "utf-8");
			writer.write("欢迎回来，上次登陆时间为" + value);
			break;
		}
	}
}
DateFormat dateFormat = new SimpleDateFormat("yyyy年MM月dd日");
String format = dateFormat.format(new Date());
//URL编码，防止中文乱码的问题
URLEncoder.encode(format, "utf-8");
Cookie cookie = new Cookie("loginTime", format);
response.addCookie(cookie);
```

## Session

概念：服务器的会话技术，在一次会话的多次请求间共享数据，将数据保存在服务器端的HttpSession对象中

使用步骤：

1. 获取HttpSession对象

   ```java
   HttpSession httpSession = request.getSession();
   ```

2. 使用HttpSession对象

   ```java
   //设置属性值
   void setAttribute(String name, String value);
   
   //获取属性值
   Object getAttribute(String name);
   
   //移除属性
   void removeAttribute(String name);
   
   ```

### 实现原理

服务器确保在一次会话中多次获取Session对象是同一个： **session是依赖于cookie的**。cookie是通过请求头和响应头来实现的。**当获取session的时候会优先去查询cookie中是否含有session的信息**。如果第一次获取session，cookie中当然没有session的信息，就会在内存中创建一个新的session对象，这个对象有一个**很长的id**。服务器给客户端发送响应的时候，包含`set-cookie`，其中包含一对：`JSESSIONID=id`，就是内存中session对象的id值。浏览器收到`set-cookie`之后把JSESSIONID存到浏览器里面，下一次再访问服务器的资源时，请求头会带上`cookie`，其中包含`JSESSIONID=id`。**服务器会自动地获取**这个JSESSIONID去**查找内存中**是否有这个id为它的**session**对象

### 细节处理

1. 客户端关闭，服务器不关闭，客户端重新打开访问服务器来获取session，两次获取的session

   1. 默认情况下是不同的。因为客户端关闭，意味着会话结束，这时和前一次访问**是两次不同的会话**，所以客户端重新访问服务器获取的**session是不一样**的

   2. 如果需要达到相同的效果，可以使用cookie。键为JSESSIONID，值为session的id，设置最大存活时间，让cookie持久化到硬盘

      ```java
      Cookie cookie = new Cookie("JSESSIONID", session.getId());
      cookie.setMaxAge(60 * 60);
      response.addCookie(cookie);
      
      ```

2. 客户端不关闭，服务器关闭，服务器重新打开，客户端重新访问服务器来获取session，两次获取的session是不同的。因为服务器关闭后，内存被销毁，session也被销毁，两次session地址值基本上不可能一样。**虽然不一样，但是要确保数据不丢失**。

   1. session的钝化：在服务器正常关闭之前，将session对象序列化到硬盘上
   2. session的活化：在服务器启动后，将session文件转化为内存中的session对象
   3. 这两个过程tomcat帮我们完成。在idea中只有钝化，每次启动会把work目录干掉，无法读取sessions.ser文件，无法完成活化

3. session的销毁

   1. 服务器关闭
   2. session对象调用invalidate()方法，销毁
   3. session默认失效时间：**30分钟**。在tomcat中的web.xml中可以配置

### 特点作用

1. session用于存储一次会话多次请求的数据，存在服务器端
2. session可以存储**任意类型，任意大小**的数据

区别：

1. session存储数据在服务器，cookie存储在客户端
2. session没有数据大小限制，cookie有
3. session数据存在服务器，比较安全，cookie相对于不安全

# JSP

概念：Java Server Page Java服务器端页面。一个特殊的页面，既可以直接定义html标签，又可以定义Java代码

## 原理

1. 客户端向服务器发送http请求
2. 服务器解析请求信息，找是否有index.jsp资源。如果没有，则报404错误
3. 如果找到了index.jsp，会将其转换为.java文件
4. 编译.java文件生成.class文件
5. 由**字节码文件提供访问**

JSP本质上就是一个Servlet。可以简化书写，输出标签的工作由jsp来完成

## 脚本

JSP定义Java代码的方式

1. `<% 代码 %>`：定义的Java代码，在service方法中。
2. `<%! 代码 %>`：定义的是成员 变量/方法，在jsp转换后的servlet类中的成员位置
3. `<%= 代码 %>`：相当于输出语句，输出到页面上。在service方法中。

## 指令

1. page：配置jsp页面的

   ```
   格式：<%@ page 指令="" %>
   
   contentType="text/html;charset=utf-8" => response.setContentType()
   1.设置响应体的mime类型及字符集
   2.设置当前jsp页面的编码
   
   language
   支持的语言。开发出来的时候想一统表现层技术，但是至今只支持java
   
   import
   倒入所需jar包
   
   errorPage
   当前页面发生异常后，会自动跳转到指定的错误页面
   
   isErroePage
   标识当前页面是否是错误页面，不标识其实也能用，但是标识之后可以使用exception对象
   ```

2. include：导入页面的资源文件（另外的jsp页面）

   ```
   格式：<%@ include file="" %>
   ```

3. taglib：导入资源（标签库：jstl）

   ```
   格式：<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
   ```

## 注释

1. html注释：`<!-- -->`只能注释html代码片段
2. jsp注释：`<%-- --%>`可以注释所有，包括java代码

## 内置对象

在jsp中不需要获取和创建、可以直接使用的对象。在jsp转换成java文件的service方法中已经声明好了

前四个是域对象

- pageContext——PageContext
- request——HttpServletRequest
- session——HttpSession
- application——ServletContext
- response——HttpServletResponse
- page(相当于this，当前servlet对象)——Object
- out：将数据输出到页面上的字符输出流对象。和response.getWriter()类似，但是writer无论定义在哪个位置都会先于out输出。**因为tomcat服务器给客户端响应之前会先去找response的缓冲区再找out的缓冲区，拼到响应体中**。建议统一使用out，因为转换后的servlet中都是用out对象，突然用response可能会打乱页面布局——JspWriter
- config——ServletConfig
- exception(只有声明了isErrorPage才有)——Throwable

共享数据使用`xx.setAttribute(key, value)` 和`xx.getAttribute(key)`

| 对象        | 类型                | 作用                                                         |
| ----------- | ------------------- | ------------------------------------------------------------ |
| pageContext | PageContext         | 当前页面共享数据；还可以获取其他8个内置对象                  |
| request     | HttpServletRequest  | 一次请求访问的多个资源(用在转发)                             |
| session     | HttpSession         | 一次会话的多个请求间                                         |
| application | ServletContext      | 多个用户间共享数据(唯一，服务器启动，创建；服务器关闭，销毁) |
| response    | HttpServletResponse | 响应对象                                                     |
| page        | Object              | 当前页面(servlet)对象（this）                                |
| out         | JspWriter           | 输出对象，可以把数据输出到页面上                             |
| config      | ServletConfig       | Servlet配置对象                                              |
| exception   | Throwable           | 只有声明了isErrorPage才有                                    |

## EL表达式

- 概念：Expression Language 表达式语言

- 作用：替换、简化jsp页面中java代码的编写

- 语法：`${表达式}`

- 注意：JSP默认支持EL表达式，如果想原样输出：`${3>4}` 需要忽略EL表达式。

  具体做法：`<%@ page isElIgnore="true" %>` 或 `\${3>4}`（忽略本表达式）

- 使用方式：

  - 运算
    - 算数运算符，其中/=div、%=mod
    - 比较运算符
    - 逻辑运算符，其中&&=and、||=or、!=not
    - 空运算符，empty。
      - `{empty object}`用于判断字符串、集合和数组对象是否为null并判断长度是否为0
      - `{not empty object}`用于判断字符串、集合和数组对象是否不为null并判断长度是否大于0
  - 获取值
    - el表达式只能从域名称中获取值
    - 语法1：`{域名称.key}`：从指定域中获取指定键的值。**如果键不存在，不会报错，得到空字符串**
    - 域名称：pageScope --> pageContext; requestScope --> request; sessionScope --> session; applicationScope --> application(ServletContext)
    - 语法2：`{key}`：依次从最小的域中查找，是否有该键对应的值，直到找到为止
    - 获取对象的值：`{requestScope.user.name}`查找request域中的user键对应的值（对象），再调用该对象的getName()方法，如果没有该方法，则报错
    - 获取List集合的值：`{域名称.键名[索引]}`**假如index超出了范围，也不报错**
    - 获取Map集合的值：`{域名称.键名.key名称}`或`{域名称.键名["key名称"]}`
  - 11个隐式对象，类似jsp的内置对象
    - pageContext：获取jsp其他8个内置对象和`{pageContext.request.contextPath}` 动态获取虚拟目录

## JSTL

- 概念：Java Server Pages Tag Library JSP标准标签库

- 作用：简化jsp上的java代码的编写

- 导入：`<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>` 用c代表这个库

- 常用的JSTL标签

  - if：if语句

    - 格式：`<c:if test="布尔表达式"></c:if>`
    - 没有else语句，想要定义else语句则再额外定义一个if

  - choose：switch语句

    - 格式：

      ```jsp
      <c:choose> switch
        <c:when test="布尔表达式">xxx</c:when> case
        <c:when test="布尔表达式">xxx</c:when> case
        <c:otherwise></c:otherwise> default
      </c:choose>
      ```

      

  - forEach：for循环

    - 普通for格式：

      ```jsp
      <c:forEach begin="1" end="10" var="i" step="1" varStatus="s">
      	xxx
        ${s.index} 容器中元素的索引，从0开始
        ${s.count} 循环次数，从1开始
      </c:forEach>
      ```

    - foreach格式：

      ```jsp
      <c:forEach item="${list}" var="str" varStatus="s">
      	
      </c:forEach>
      ```

## MVC开发模式

- jsp演变历史
  - 早期只有servlet，只能使用response输出标签，非常麻烦
  - 后来有了jsp，jsp既能写前端代码（Html、Css、Js）又能写后台代码（Java），虽说简化了servlet开发，但是过度使用了jsp的话，难以维护，难以分工协作
  - 再后来，java的web开发借鉴mvc开发来使得程序设计更加合理（分离前后端的工作）
- MVC
  - M：Model，模型。JavaBean
    - 完成具体的业务操作。如：查询数据库，封装对象
  - V：View，视图。JSP
    - 展示数据。
  - C：Controller，控制器。Servlet
    - 获取用户的输入
    - 调用模型
    - 将模型返回的数据交给视图进行展示
  - ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsru237bwj31j40u07wh.jpg)
    - 浏览器访问控制器，
    - 控制器调用模型来进行业务操作（比如查询数据库），
    - 操作完把数据返回给控制器，
    - 控制器把数据给视图展示，
    - 给浏览器做出响应
  - 优点
    - 耦合度低。三部分各司其职，互不干扰。方便维护
    - 重用性高
  - 缺点
    - 项目架构变复杂，对开发人员要求高

## 三层架构

- 界面层(表示层/web层)：用户看到的界面。用户可以通过页面上的组件和服务器进行交互
- 业务逻辑层(service层)：处理业务逻辑。
- 数据访问层(dao层；**d**ata **a**ccess **o**bject)：数据存储文件。
- ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsru3dhk9j31sq0u0hdu.jpg)
  - 浏览器访问界面层
  - 界面层调用对应的业务逻辑层
  - 由业务逻辑层访问数据访问层
  - 数据访问层操作数据库(增删查改)
  - 数据访问层把数据封装给业务逻辑层
  - 业务逻辑层把数据给界面层
  - 界面层把数据显示到浏览器中

# Filter

- 概念：当访问服务器资源时，过滤器可以把请求拦截下来，完成一些特殊的功能

- 作用：一般用于通用的操作。如：登录验证、统一编码处理、敏感字符的过滤

- 步骤：

  - 定义一个类，让其实现接口Filter

    ```java
    public class FilterDemo01 implements Filter
    ```

  - 复写接口方法

  - 配置拦截路径

    - web.xml

      ```xml
      <web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee"
         version="4.0">
        <filter>
          <filter-name>filter2</filter-name>
          <filter-class>cn.itcast.web.filter.FilterDemo02</filter-class>
        </filter>
        <filter-mapping>
          <filter-name>filter2</filter-name>
          <url-pattern>/*</url-pattern><!--访问所有资源都会被拦截-->
        </filter-mapping>
      </web-app>
      ```

      

    - 注解

      ```java
      @WebFilter("/*") //所有访问资源的请求都会被该拦截器拦截
      public class FilterDemo01 implements Filter
      ```

  ```java
  @WebFilter("/*") //所有访问资源的请求都会被该拦截器拦截
  public class FilterDemo01 implements Filter {
      @Override
      public void init(FilterConfig filterConfig) throws ServletException {
  
      }
  
      @Override
      public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
          System.out.println("FilterDemo01执行...");
          //放行
          filterChain.doFilter(servletRequest, servletResponse);
      }
  
      @Override
      public void destroy() {
  
      }
  }
  ```

- 执行顺序

  ```java
  public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
    //一般对request对象请求消息增强
    System.out.println("第1步输出");
    //放行
    chain.doFilter(req, resp); //返回了资源 也就是jsp会展示出来 第2步输出
    //一般对response对象响应消息增强
    System.out.println("第3步输出");
  }
  ```

- 生命周期

  - 服务器启动后，会创建filter对象，然后调用init方法。只会执行一次。用于加载资源
  - 服务器关闭后，filter对象被销毁，如果服务器是正常关闭，则会调用destroy方法。只会执行一次。用于释放资源
  - 每一次拦截请求都会执行doFilter方法

- 过滤器配置详解

  - 拦截路径的配置

    - 具体资源路径。如：/index.jsp 只有访问index.jsp资源时，过滤器才会被执行
    - 目录拦截。如：/user/* 访问/user下所有资源时，过滤器都会被执行
    - 后缀名拦截。如：*.jsp 访问所有jsp资源时，过滤器都会被执行
    - 拦截所有资源：/* 访问所有资源时，过滤器都会被执行

  - 拦截方式的配置：资源被访问的方式

    - 注解：设置`dispatcherTypes`  

    - `@WebFilter(urlPatterns = "/*", dispatcherTypes = DispatcherType.FORWARD)`

      - REQUEST：浏览器直接请求资源（默认）
      - FORWARD：转发访问资源
      - INCLUDE：包含访问资源
      - ERROR：错误跳转资源
      - ASYNC：异步访问资源

    - web.xml

      ```xml
      <web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee"
         version="4.0">
        <filter>
          <filter-name>filter2</filter-name>
          <filter-class>cn.itcast.web.filter.FilterDemo02</filter-class>
        </filter>
        <filter-mapping>
          <filter-name>filter2</filter-name>
          <!--拦截路径-->
          <url-pattern>/*</url-pattern><!--访问所有资源都会被拦截-->
          <dispatcher>REQUEST</dispatcher>
        </filter-mapping>
      </web-app>
      ```

- 过滤器链（配置多个过滤器）

  - 执行顺序

    ```
    以2个过滤器为例 类似入栈出栈
    1.过滤器1
    2.过滤器2
    3.资源执行
    4.过滤器2
    5.过滤器1
    ```

  - 过滤器的先后顺序问题
    - 注解：**按照类名字符串比较规则，值小的先执行** AFilter比BFilter先执行
    - web.xml：** `<filter-mapping>` 谁定义在上边谁先执行**

## 案例

### 登录验证

1. 判断是否是登录相关的资源
   - 是，放行
   - 不是，判断是否登录
2. 判断当前用户是否已登录
   - 是，放行
   - 不是，跳转到登录页面

```java
package cn.itcast.web.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * @author ngwingbun
 * @date 2020/2/20
 */
@WebFilter("/*")
public class LoginFilter implements Filter {

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        //1.强转HttpServletRequest
        HttpServletRequest request = (HttpServletRequest) req;
        //2.获取资源请求路径
        String uri = request.getRequestURI();
        //3.判断是否包含登录相关路径 /login.jsp /loginServlet 和 其他静态资源
        if (uri.contains("/login.jsp") || uri.contains("/loginServlet") || uri.contains("/static/")) {
            //证明用户就是想登录
            chain.doFilter(req, resp);
        } else {
            //需要验证用户是否登录
            HttpSession session = request.getSession();
            Object user = session.getAttribute("user");
            if (user != null) {
                //已登录
                chain.doFilter(req, resp);
            } else {
                //未登录，跳转登录信息
                request.setAttribute("login_msg", "您尚未登录，请登录");
                request.getRequestDispatcher("/login.jsp").forward(request, resp);
            }
        }
    }

}

```

### 敏感词汇过滤

1. 对request对象的getParameter()方法进行增强。产生一个新的request对象
2. 放行。将新的request对象传入到china.doFilter里面

```java
package cn.itcast.web.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.ArrayList;
import java.util.List;

/**
 * @author ngwingbun
 * @date 2020/2/20
 */
@WebFilter("/*")
public class SensitiveFilter implements Filter {
    private List<String> list = new ArrayList<>();

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        //1.创建代理对象，增强getParameter()方法
        ServletRequest proxyRequest = (ServletRequest) Proxy.newProxyInstance(req.getClass().getClassLoader(), req.getClass().getInterfaces(), new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                if ("getParameter".equals(method.getName())) {
                    String value = (String) method.invoke(req, args);
                    if (value != null) {
                        for (String str : list) {
                            if (value.contains(str)) {
                                value = value.replaceAll(str, "***");
                            }
                        }
                    }
                    return value;
                }
                return method.invoke(req, args);
            }
        });
        //2.放行
        chain.doFilter(proxyRequest, resp);
    }

    public void init(FilterConfig config) throws ServletException {
        try {
            ServletContext servletContext = config.getServletContext();
            String realPath = servletContext.getRealPath("/WEB-INF/classes/敏感词汇.txt");
            BufferedReader bufferedReader = new BufferedReader(new FileReader(realPath));
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                list.add(line);
            }
            bufferedReader.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}

```

**有用到代理模式**

### post请求中文数据乱码问题

1. 对request、response向下转型
2. 获取请求方式
3. 如果是post请求，设置request的加密方式为`utf-8`以防乱码
4. 对response设置响应类型，如果是返回一张页面：`text/html`；如果是返回json数据：`application/json`，再加上`charset=utf-8`防止乱码

```java
package cn.itcast.travel.web.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 解决全站乱码问题，处理所有的请求
 */
@WebFilter(urlPatterns = "/*", filterName = "Character")
public class CharacterFilter implements Filter {

    @Override
    public void doFilter(ServletRequest req, ServletResponse rep, FilterChain filterChain) throws IOException, ServletException {
        //将父接口转为子接口，目的是为了获取请求方式
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) rep;
        //获取请求方法
        String method = request.getMethod();
        //解决post请求中文数据乱码问题，用普通的req也可以
        if (method.equalsIgnoreCase("post")) {
            request.setCharacterEncoding("utf-8");
        }
        //处理响应乱码，用普通的rep也可以
        response.setContentType("text/html;charset=utf-8");
        filterChain.doFilter(request, response);
    }
}

```

# Listener

- 事件监听机制

  - 事件
  - 事件源
  - 监听器
  - 注册监听：将事件、事件源、监听器绑定在一起。当事件源上发生某件事情后，执行监听器代码

- ServletContextListener：监听ServletContext对象的创建和销毁

  ```java
  void contextInitalized(ServletContextEvent sce);	//ServletContext对象被创建后执行
  //一般用于加载资源
  void contextDestroyed(ServletContextEvent sce);		//ServletContext对象被销毁前执行
  //一般用于释放资源
  ```

- 步骤

  - 定义一个类，让其实现ServletContextListener

    ```java
    public class ContextLoaderListener implements ServletContextListener
    ```

  - 复写方法

    ```java
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
      //1.获取ServletContext对象
      ServletContext servletContext = servletContextEvent.getServletContext();
      //2.获取值
      String initParameter = servletContext.getInitParameter("contextConfigLoader");
      //3.获取真实路径
      String realPath = servletContext.getRealPath(initParameter);
      try {
        //4.加载配置文件
        BufferedReader bufferedReader = new BufferedReader(new FileReader(realPath));
      } catch (FileNotFoundException e) {
        e.printStackTrace();
      }
    }
    
    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
    
    }
    ```

    ```xml
    <!--在web.xml中初始化参数-->
    <context-param>
      <param-name>contextConfigLoader</param-name>
    	<param-value>/WEB-INF/classes/applicationContext.xml</param-value>
    </context-param>
    ```

  - 配置

    - web.xml

      ```xml
      <listener>
        <listener-class>cn.itcast.web.listener.ContextLoaderListener</listener-class>
      </listener>
      ```

    - 注解

      ```java
      @WebListener()
      public class ContextListener implements ServletContextListener
      ```

# AJAX

- 概念：**异步**的JavaScript和Xml （Asynchronous JavaScript And Xml）

- 客户端不需要等待服务器的响应，在服务器处理请求的过程中，客户端可以进行其他操作

- 实现方式

  - 原生JS方式

  - JQuery方式

    - `$.ajax()`，通用型

      ```javascript
      $.ajax({
        url: "",	//请求地址
        type: "",	//请求方式
        data: {
          
        },	//请求携带的参数
        success: function() {
          
        },	//响应成功的回调函数
      })
      ```

    - `$.get()`

    - `$.post()`

# JSON

- 概念 JavaScript Object Notation JavaScript对象表示法

- 获取数据

  - json对象.键名
  - json对象["键名"]
  - 数组对象[索引]

- JSON数据和Java对象相互转换。**因为JSON作为数据的载体在网络中进行传输**

  - 常见解析器：Jsonlib(官方的Json接口实现的实现类)、Gson(谷歌)、fastjson(阿里巴巴)、jackson(SpringMVC内置)

  - Java对象转JSON

    - 导入jackson相关jar包
    - 创建jackson核心对象：ObjectMapper
    - 调用ObjectMapper中的方法进行转换
      - `writeValueAsString(obj)`将Java对象转换为Json字符串
      - `writeValue(参数, obj)`

    ```java
    package cn.itcast.jackson.test;
    
    import cn.itcast.jackson.domain.Person;
    import com.fasterxml.jackson.core.JsonProcessingException;
    import com.fasterxml.jackson.databind.ObjectMapper;
    import org.junit.Test;
    
    /**
     * @author ngwingbun
     * @date 2020/2/20
     */
    public class JacksonTest {
    
        //Java对象->JSON字符串
        @Test
        public void test1() throws JsonProcessingException {
            //创建Java对象
            Person person = new Person("张三", 23, "男");
            System.out.println(person);
            //创建Jackson核心对象
            ObjectMapper objectMapper = new ObjectMapper();
            //转换
            /*
            转换方法
            writeValue(参数, obj):
                参数：
                File：将obj对象转为json字符串并保存到文件中
                Writer：将obj对象转为json字符串并填充到字符输出流
                OutputStream：将obj对象转为json字符串并填充到字节输出流
            writeValueAsString(obj):将对象转为json字符串
             */
            String json = objectMapper.writeValueAsString(person);
            System.out.println(json);
        }
    }
    
    ```

  - Json字符串转Java对象
  
    - 导入jackson相关jar包
    - 创建jackson核心对象：ObjectMapper
    - 调用ObjectMapper中的方法进行转换
      - `readValue(Json字符串数据, Class)`
  
    ```java
    @Test
    public void test5() throws IOException {
      //创建Json字符串
      String json = "{\"gender\":\"男\",\"name\":\"张三\",\"age\":23}";
      //创建Jackson核心对象
      ObjectMapper objectMapper = new ObjectMapper();
      Person person = objectMapper.readValue(json, Person.class);
      System.out.println(person);
    }
    ```
  
    
  
- 注解

  - `@JsonIgnore`：排除属性。对应的属性不会被转换成JSON字符串

  - `@JsonFormat`：属性值格式化。

    ```java
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date birthday; //将来转换成json字符串后会显示年月日而不是毫秒值
    ```

- 复杂的对象转换

  - List

    ```java
    @Test
    public void test3() throws JsonProcessingException {
      //创建Java对象
      Person person1 = new Person("张三", 23, "男");
      person1.setBirthday(new Date());
      Person person2 = new Person("李四", 20, "女");
      person2.setBirthday(new Date());
      Person person3 = new Person("王五", 37, "男");
      person3.setBirthday(new Date());
      //创建集合并插入对象
      List<Person> personList = new ArrayList<>(3);
      personList.add(person1);
      personList.add(person2);
      personList.add(person3);
      System.out.println(personList);
      //创建Jackson核心对象
      ObjectMapper objectMapper = new ObjectMapper();
      String json = objectMapper.writeValueAsString(personList);
      System.out.println(json);
    }
    ```

  - Map

    ```java
    @Test
    public void test4() throws JsonProcessingException {
      //创建Map对象
      Map<String, Object> map = new HashMap<>();
      map.put("name", "张三");
      map.put("age", 23);
      map.put("gender", "男");
      System.out.println(map);
      //创建Jackson核心对象
      ObjectMapper objectMapper = new ObjectMapper();
      String json = objectMapper.writeValueAsString(map);
      System.out.println(json);
    }
    ```

# Jedis

- 概念：一款Java操作redis数据库的工具

### 使用步骤

1. 导入jar包

2. 获取链接

3. 使用

4. 关闭连接

   ```java
   @Test
   public void test1() {
     // 如果使用空参构造，那么默认值是 "localhost", 6379
     Jedis jedis = new Jedis("localhost", 6379);
     jedis.set("username", "zhangsan");
     jedis.close();
   }
   ```

### 操作各种数据结构

- 操作string

  ```java
  @Test
  public void testString() {
    Jedis jedis = new Jedis();
    //存储
    jedis.set("username", "zhangsan");
    //获取
    String username = jedis.get("username");
    System.out.println(username);
    //存储可以指定过期时间的key和value，时间一过，自动删除该键值对
    jedis.setex("activeCode", 20, "abc");
    jedis.close();
  }
  ```

- 操作hash

  ```java
  @Test
  public void testHash() {
    Jedis jedis = new Jedis();
    //存储
    jedis.hset("user", "name", "lisi");
    jedis.hset("user", "age", "24");
    jedis.hset("user", "gender", "male");
    //获取
    String name = jedis.hget("user", "name");
    System.out.println(name);
  
    Map<String, String> user = jedis.hgetAll("user");
    System.out.println(user);
    jedis.close();
  }
  ```

- 操作list

  ```java
  @Test
  public void testList() {
    Jedis jedis = new Jedis();
    //存储
    jedis.lpush("mylist", "a", "b", "c");
    jedis.rpush("mylist", "a", "b", "c");
    //获取
    List<String> mylist = jedis.lrange("mylist", 0, -1);
    System.out.println(mylist);
    //弹出
    String lpop = jedis.lpop("mylist");
    System.out.println(lpop);
    String rpop = jedis.rpop("mylist");
    System.out.println(rpop);
    mylist = jedis.lrange("mylist", 0, -1);
    System.out.println(mylist);
    //删除
    jedis.del("mylist");
    jedis.close();
  }
  ```

- 操作set

  ```java
  @Test
  public void testSet() {
    Jedis jedis = new Jedis();
    //存储
    jedis.sadd("myset", "1", "2", "2");
    //获取
    Set<String> myset = jedis.smembers("myset");
    System.out.println(myset);
    //删除
    jedis.del("myset");
    jedis.close();
  }
  ```

- 操作sortedset

  ```java
  @Test
  public void testSortedSet() {
    Jedis jedis = new Jedis();
    //存储
    jedis.zadd("mysortedset", 3, "亚瑟");
    jedis.zadd("mysortedset", 30, "后裔");
    jedis.zadd("mysortedset", 20, "孙尚香");
    //获取
    Set<String> mysortedset = jedis.zrange("mysortedset", 0, -1);
    System.out.println(mysortedset);
    //删除
    jedis.del("mysortedset");
    jedis.close();
  }
  ```

### 连接池

Jedis连接池：**JedisPool**

使用JedisPool可以对Jedis的连接有更好的复用和管理

使用步骤：

1. 创建连接池对象JedisPool
2. 调用方法`getResource()`方法获取Jedis连接
3. 归还连接

```java
@Test
public void testJedisPool() {
  //创建JedisPool对象
  JedisPool jedisPool = new JedisPool();
  //获取连接
  Jedis jedis = jedisPool.getResource();
  //使用
  jedis.set("hehe", "haha");
  //删除
  jedis.del("hehe");
  //关闭(实际上是归还到连接池中)
  jedis.close();
}
```

### 连接池工具类

作用：

1. 加载配置文件、配置连接池的参数
2. 提供获取连接的方法

JedisPoolUtils

```java
package cn.itcast.jedis.util;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * @author ngwingbun
 * @date 2020/2/22
 */
public class JedisPoolUtils {

    private static JedisPool jedisPool;

    static {
        Properties properties = new Properties();
        InputStream inputStream = JedisPoolUtils.class.getClassLoader().getResourceAsStream("jedis.properties");
        try {
            properties.load(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        //设置最大连接数
        jedisPoolConfig.setMaxTotal(Integer.parseInt(properties.getProperty("maxTotal")));
        //设置最大空闲连接数
        jedisPoolConfig.setMaxIdle(Integer.parseInt(properties.getProperty("maxIdle")));
        jedisPool = new JedisPool(jedisPoolConfig, properties.getProperty("host"), Integer.parseInt(properties.getProperty("port")));
    }

    private JedisPoolUtils() {

    }

    public static Jedis getJedis() {
        return jedisPool.getResource();
    }

    public static void cloes() {
        jedisPool.close();
    }
}

```

Test

```java
@Test
public void testJedisPoolUtils() {
  //获取连接
  Jedis jedis = JedisPoolUtils.getJedis();
  //使用
  jedis.set("hehe", "haha");
  //删除
  jedis.del("hehe");
  //关闭(实际上是归还到连接池中)
  jedis.close();
}
```

### 案例

1. 提供index.html页面，页面中有一个省份 下拉列表
2. 当页面加载完成后发送ajax请求，加载所有省份
3. **使用redis缓存一些不经常发生变化的数据，如果数据经常变化，那么使用redis就没有意义**。**因为数据库的数据一旦发生改变，则需要更新缓存**。数据库执行增删改的操作后，需要将redis的缓存清空，再次存入

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsru43slmj31ts0u0npd.jpg)

后台：

- domain：Province.java

- dao：ProvinceDao.java

  - impl：ProvinceDaoImpl.java

- service：ProvinceService.java

  - impl：ProvinceServiceImpl.java

    ```java
    package cn.itcast.demo.service.impl;
    
    import cn.itcast.demo.dao.ProvinceDao;
    import cn.itcast.demo.dao.impl.ProvinceDaoImpl;
    import cn.itcast.demo.domain.Province;
    import cn.itcast.demo.service.ProvinceService;
    import cn.itcast.demo.util.JedisPoolUtils;
    import com.fasterxml.jackson.core.JsonProcessingException;
    import com.fasterxml.jackson.databind.ObjectMapper;
    import redis.clients.jedis.Jedis;
    
    import java.util.List;
    
    /**
     * @author ngwingbun
     * @date 2020/2/22
     */
    public class ProvinceServiceImpl implements ProvinceService {
    
        private ProvinceDao provinceDao = new ProvinceDaoImpl();
    
        @Override
        public List<Province> findAll() {
            List<Province> provinces = this.provinceDao.findAll();
            return provinces;
        }
    
        @Override
        public String findJson() throws JsonProcessingException {
            Jedis jedis = JedisPoolUtils.getJedis();
            String provinceJson = jedis.get("province");
            if (provinceJson == null || provinceJson.length() == 0) {
                List<Province> provinces = this.findAll();
                ObjectMapper objectMapper = new ObjectMapper();
                provinceJson = objectMapper.writeValueAsString(provinces);
                jedis.set("province", provinceJson);
                jedis.close();
            }
            return provinceJson;
        }
    }
    
    ```

- web.servlet：FindProvinceServlet.java

  ```java
  package cn.itcast.demo.web.servlet;
  
  import cn.itcast.demo.service.ProvinceService;
  import cn.itcast.demo.service.impl.ProvinceServiceImpl;
  
  import javax.servlet.ServletException;
  import javax.servlet.annotation.WebServlet;
  import javax.servlet.http.HttpServlet;
  import javax.servlet.http.HttpServletRequest;
  import javax.servlet.http.HttpServletResponse;
  import java.io.IOException;
  
  /**
   * @author ngwingbun
   * @date 2020/2/22
   */
  @WebServlet("/findProvinceServlet")
  public class FindProvinceServlet extends HttpServlet {
      protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
          ProvinceService provinceService = new ProvinceServiceImpl();
          String json = provinceService.findJson();
          System.out.println(json);
          response.setContentType("application/json;charset=utf-8");
          response.getWriter().write(json);
      }
  
      protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
          this.doPost(request, response);
      }
  }
  ```

- util：JDBCUtils.java、JedisPoolUtils.java

- druid.properties

前端：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/jquery-3.3.1.min.js"></script>
    <script>
        $(function () {
            $.ajax({
                url: "/day23/findProvinceServlet",
                success: function (data) {
                    let province = $("#province");
                    $(data).each(function () {
                        let option = "<option name='" + this.id + "'>" + this.name + "</option>"
                        province.append(option);
                    });
                }
            });
        });
    </script>
</head>
<body>
<select id="province">
    <option>--请选择省份--</option>
</select>
</body>
</html>
```

# HTTP

Hyper Text Transfer Protocol 超文本传输协议

传输协议：定义了客户端和服务器通信时发送数据的格式

**特点**：

1. 基于TCP/IP的协议
2. 默认端口号是80
3. 基于请求响应模型：一次请求对应一次响应
4. 无状态的协议：每次请求之间相互独立，不能交互数据

版本：

- 1.0：每一次请求响应都会建立新的连接

- 1.1：复用连接

## 数据格式

### 请求消息数据格式

- 请求行

  ```
  格式：请求方式 请求url 请求协议/版本
  GET /login.html HTTP/1.1
  
  GET请求
  请求参数在请求行中，在url后
  url长度有限制
  不太安全（参数可以用肉眼看见）
  
  POST请求
  请求参数在请求体中
  url长度没有限制
  相对安全
  ```

- 请求头（浏览器告诉服务器的一些信息）

  ```
  请求头和请求行没有分隔
  
  格式：请求头:请求头的值
  	User-Agent:...
  	Host:...
  
  常见的请求头
  Host:请求的主机
  User-Agent:浏览器访问服务器使用的浏览器版本信息。获取UA中的浏览器信息，做到浏览器兼容
  Accept-x:可以接受响应的格式等
  Referer:告诉服务器，当前请求从哪里来。如果打开浏览器直接输入地址访问，该值为null
  	防盗链
  	统计
  Connection:keep-alive 该连接可复用 1.1才可以用
  ```

- 请求空行

  ```
  空行
  分隔post请求请求头和请求体
  ```

- 请求体

  ```
  封装POST请求消息的请求参数的
  
  GET方式没有请求体
  POST方式
  username=xxx
  ```

### 响应消息数据格式

- 响应行

  ```
  格式：请求协议/版本 响应码状态 状态码描述
  Http/1.1 200 OK
  
  状态码：
  1. 1xx  服务器接受客户端消息，但没有接受完成，等待一段时间后发送1xx的状态码，询问客户端是否继续发送
  2. 2xx  这次请求是成功的。代表：200（成功）
  3. 3xx  重定向。代表：302（重定向） 304（访问缓存）
  4. 4xx  客户端错误。代表：404（请求路径没有对应的资源） 405（请求方式没有对应的方法）
  5. 5xx  服务器错误。代表：500（服务器内部出现异常）
  ```

- 响应头

  ```
  格式：头名称：值
  Content-Type: text/html;charset=UTF-8
  
  常见的响应头
  Content-Type：服务器告诉客户端本次响应体数据格式和编码格式
  Content-disposition：服务器告诉客户端以什么格式打开响应体数据
  	默认：in-line，在当前页面打开
  	attachment;filename=xxx，以附件形式打开响应体，文件下载
  ```

- 响应空行

- 响应体

  ```
  传输的数据
  字节流/字符流
  ```


# Spring

### 属性注入

- 属性注入（反射的方式）

  - 优点：变量方式注入非常简洁

  - 缺点：不能有效的指明依赖。这种方式就过于依赖注入容器了，当没有启动整个依赖容器时，这个类就不能运转，在反射时无法提供这个类需要的依赖

  - 格式：

    ```java
    @Autowired
    private UserService uservice;
    ```

- 构造方法注入

  - 强制依赖注入，通过强制指明依赖注入来保证这个类的运行

  - 格式：

    ```java
    private final UserService userService;
    private final SubjectService subjectService;
    
    @Autowired
    public TestServiceImpl(UserService userService, SubjectService subjectService) {
      this.userService = userService;
      this.subjectService = sujectService;
    }
    ```

- setter方法注入

  - 可选依赖注入，可有可无，即使没有注入这个依赖，那么也不会影响整个类的运行
  
  - 格式：
  
    ```java
    private UserService userService;
    
    @Autowired
    public setUserService (UserService userService) {
      this.userService = userService;
    }
    ```
  
- 总结

  1. 如果这个类使用了依赖注入的类，那么这个类摆脱了这几个依赖必须也能正常运行。
  2. 然而使用变量注入的方式是不能保证这点的，变量方式注入应该尽量避免。
  3. 既然使用了依赖注入方式，那么就表明这个类不再对这些依赖负责，这些都由容器管理，那么如何清楚的知道这个类需要哪些依赖呢？它就要使用set方法方式注入或者构造器注入。

