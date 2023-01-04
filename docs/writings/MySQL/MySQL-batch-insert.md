# MySQL 批量插入数据



## 前言

我们在操作大量数据写入数据库的时候，因为写入数据库涉及到磁盘 IO ，所以最合适的方案就是批量插入，具体反映到程序上面是如何批量插入呢？有哪些方案呢？我们带着这些问题一起向下看



## 环境准备

### 数据库版本

```mysql
mysql> select version();
+-----------+
| version() |
+-----------+
| 8.0.29    |
+-----------+
1 row in set (0.00 sec)
```



### 数据库表结构

```mysql
CREATE TABLE `batch_maintain` (
  `maintain_id` int(11) NOT NULL AUTO_INCREMENT,
  `maintain_num` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '保养工单编号',
  `maintain_name` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '保养计划',
  `equipment_num` bigint(20) NOT NULL COMMENT '设备编号',
  `maintain_type` int(11) NOT NULL COMMENT '养护类型',
  `functionary` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '责任人',
  `maintain_duration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '保养周期',
  `start_time` datetime DEFAULT NULL COMMENT '开始时间',
  `end_time` datetime DEFAULT NULL COMMENT '结束时间',
  `maintain_status` tinyint(4) NOT NULL COMMENT '保养状态',
  PRIMARY KEY (`maintain_id`)
) ENGINE=InnoDB AUTO_INCREMENT=900001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='保养工单';
```



### 程序依赖

| 依赖                      | 版本   |
| ------------------------- | ------ |
| spring-boot-starter-web   | 2.6.1  |
| mybatis-plus-boot-starter | 3.5.2  |
| HikariCP                  | 4.0.3  |
| mysql-connector-java      | 8.0.27 |



## 代码实现

MySQL插入数据主要是在获取连接、关闭连接、释放资源和提交事务等方面较耗能，如果使用 for 循环进行单条插入时，每次都在获取连接、释放连接和资源关闭等操作上花费时间，如果数据量大的情况下极其消耗资源，会导致操作时间过长，实际上这些资源都是可以复用起来，所以大批量数据插入时尽量使用批处理（批量插入），批处理对资源利用率更高，效率也就比单条插入更高。开启批处理需要在 JDBC 连接上配置批处理属性 `rewriteBatchedStatements=true` ，数据库驱动才会帮我们批量执行 SQL 语句。



虽然确定了使用批处理插入的方式，但还可以从这 3 个维度考虑这个问题

- JDBC 原生 / 框架封装的方法
- 直接提交 / 事务提交



### 事务与批量处理的区别

- 事务是指一个包含多个步骤的操作，这些操作要么全部成功，要么全部失败；事务原理是把 SQL 语句存储在数据库服务器，没有提交事务的数据存放在数据库的临时表空间，**消耗的是数据库服务器的内存空间**，在最后提交事务的时候把临时表空间的数据提交到数据库服务端执行。
- 批处理是指把多个 SQL 语句缓存起来，最终一次性提交给数据库；把 SQL 语句缓存在 JDBC 客户端，**会消耗客户端的内存**，在最后提交时把客户端缓存的 SQL 语句提交到数据库服务端执行。



### 前置准备

由于会使用到原生的 JDBC，需要自行获取连接、创建语句集，因此我封装了一个 HikariCP 的工具类。

```java
public class HikariCPUtils {
    public static HikariDataSource dataSource;

    /*
     * 初始化数据源
     */
    static {
        Properties properties = new Properties();
        // 读取配置文件
        try (InputStream inputStream = HikariCPUtils.class.getClassLoader().getResourceAsStream("hikaricp.properties")) {
            properties.load(inputStream);
            // 按照Hikaricp的配置加载Hikaricp配置类
            HikariConfig config = new HikariConfig(properties);
            // 根据配置生成连接池
            dataSource = new HikariDataSource(config);
        } catch (IOException exception) {
            throw new RuntimeException(exception);
        }
    }

    /**
     * 通过数据源获取连接
     */
    public static Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }

    /**
     * 关闭连接
     *
     * @param connection 数据库连接
     */
    public static void close(Connection connection) {
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    /**
     * 关闭语句集和连接
     * 由于用了连接池，这里的关闭连接其实不是销毁，而是交还给连接池
     *
     * @param statement  语句集
     * @param connection 数据库连接
     */
    public static void close(Statement statement, Connection connection) {
        if (statement != null) {
            try {
                statement.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        close(connection);
    }

    /**
     * 关闭结果集、语句集和连接
     *
     * @param resultSet  结果集
     * @param statement  语句集
     * @param connection 数据库连接
     */
    public static void close(ResultSet resultSet, Statement statement, Connection connection) {
        if (resultSet != null) {
            try {
                resultSet.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        close(statement, connection);
    }
}
```



HikariCP 独立的配置文件 `hikaricp.properties` 

```properties
# 连接池名
poolName=JDBC-DataSource
# 数据库驱动|不填写HikariCp会自动识别
driverClassName=com.mysql.cj.jdbc.Driver
# 访问数据库连接
jdbcUrl=jdbc:mysql://localhost:3306/test?useSSL=false&allowPublicKeyRetrieval=true&useUnicode=true&characterEncoding=utf-8&serverTimezone=GMT%2B8&useServerPrepStmts=true&rewriteBatchedStatements=true
# 数据库用户名
username=root
# 数据库密码
password=root
# 最大连接数
maximumPoolSize=30
# 连接池空闲连接的最小数量
minimumIdle=5
# 开启事务自动提交
autoCommit=true
# 是否自定义配置，为true时下面两个参数才生效
dataSource.cachePrepStmts=true
# 连接池大小默认25，官方推荐250-500
dataSource.prepStmtCacheSize=250
# 单条语句最大长度默认256，官方推荐2048
dataSource.prepStmtCacheSqlLimit=2048
```



### MyBatis 批处理事务提交

为了方便在 MyBatis 中使用事务，我们需要重新获取一个 SqlSession；另外为了降低内存压力，批处理采用分批提交的方式，即把一个大集合切分成多个小集合来提交，最后一次性提交事务，把提交到数据库的 SQL 语句递交给 MySQL 服务端执行。

```java
@Override
public void doImport(List<Maintain> maintains) {
  StopWatch stopWatch = new StopWatch();
  stopWatch.start();
  // 按每一批大小切割原集合
  List<List<Maintain>> lists = this.splitList(maintains, BATCH_SIZE);
  // 开启批量处理模式、关闭自动提交事务
  try (SqlSession sqlSession = sqlSessionFactory.openSession(ExecutorType.BATCH, false)) {
    // 用这个创建出来的sqlSession获取Mapper，否则配置不生效
    MaintainMapper maintainMapper = sqlSession.getMapper(MaintainMapper.class);
    for (List<Maintain> list : lists) {
      // 每次插入一批数据
      for (Maintain maintain : list) {
        maintainMapper.insert(maintain);
      }
      // 清除statementList
      sqlSession.flushStatements();
    }
    // 提交事务
    sqlSession.commit();
  } catch (Exception exception) {
    exception.printStackTrace();
  } finally {
    stopWatch.stop();
    System.out.println("MyBatis批处理事务插入方式花费时间 ==> " + stopWatch.getLastTaskTimeMillis());
  }
}

private List<List<Maintain>> splitList(List<Maintain> list, int splitSize) {
  //判断集合是否为空
  if (CollectionUtils.isEmpty(list))
    return Collections.emptyList();
  // 计算分割的份数
  // (总数+每一份的数量-1) / 每一份的数量
  int maxSize = (list.size() + splitSize - 1) / splitSize;
  //开始分割
  return
    // 生成一个从0开始，长度为切割份数的序列
    Stream.iterate(0, integer -> integer + 1).limit(maxSize)
    .parallel()
    // 从数字转换成集合
    // 每一份集合都跳过前(n*每一份数量)，然后取每一份数量
    // 比如，第一份集合是跳过(0*1000=0)个元素，往后取1000个元素，就是第1个-第1000个元素组成了第一份集合
    // 第二份集合是跳过(1*1000)个元素，往后取1000个元素，就是第1001个-第2000个元素组成了第二份集合
    .map(integer -> list.parallelStream().skip((long) integer * splitSize).limit(splitSize).collect(Collectors.toList()))
    .filter(subList -> !subList.isEmpty())
    .collect(Collectors.toList());
}
```



```xml
<insert id="insertBatchMaintain">
  insert into batch_maintain (maintain_num, maintain_name, equipment_num, maintain_type, functionary,
  maintain_duration, start_time, end_time, maintain_status)
  values
  <foreach collection='maintainList' item='maintain' separator=','>
    (#{maintain.maintainNum}, #{maintain.maintainName}, #{maintain.equipmentNum}, #{maintain.maintainType},
    #{maintain.functionary}, #{maintain.maintainDuration}, #{maintain.startTime}, #{maintain.endTime},
    #{maintain.maintainStatus})
  </foreach>
</insert>
```



| 数据量/插入时间(毫秒) | 第一次 | 第二次 | 第三次 |
| --------------------- | ------ | ------ | ------ |
| 5w条                  | 7698   | 7629   | 7493   |
| 10w条                 | 15694  | 15887  | 15339  |
| 20w条                 | 24564  | 22924  | 26506  |
| 40w条                 | 55419  | 57856  | 57416  |



### MyBatis-Plus 批处理事务提交

这里没有显式地控制事务，为什么也是事务提交呢？对底层源码查看到 `saveBatch()` 方法是利用分片处理（默认 batchSize 是 1000） + **分批提交事务**（当处理的数据达到 batchSize 时会触发 `flushStatements()` 方法）的操作，从而提高性能。

```java
public void doImport(List<Maintain> maintains) {
  StopWatch stopWatch = new StopWatch();
  stopWatch.start();
  try {
    // 使用MyBatis-Plus封装的批处理方法
    this.maintainService.saveBatch(maintains);
  } catch (Exception exception) {
    exception.printStackTrace();
  } finally {
    stopWatch.stop();
    System.out.println("MyBatis-Plus批处理插入方式花费时间 ==> " + stopWatch.getLastTaskTimeMillis());
  }
}
```



| 数据量/插入时间(毫秒) | 第一次 | 第二次 | 第三次 |
| --------------------- | ------ | ------ | ------ |
| 5w条                  | 6703   | 6408   | 6445   |
| 10w条                 | 11355  | 11657  | 11493  |
| 20w条                 | 22735  | 22482  | 24238  |
| 40w条                 | 51405  | 51292  | 50074  |



### JDBC 批处理直接提交

JDBC 批量提交的方式是

1. 使用 `addBatch()` 方法把语句放到缓存区
2. 调用 `executeBatch()` 方法一次性把这些语句都提交到数据库

```java
@Override
public void doImport(List<Maintain> maintains) {
  StopWatch stopWatch = new StopWatch();
  Connection connection = null;
  PreparedStatement preparedStatement = null;
  stopWatch.start();
  try {
    connection = HikariCPUtils.getConnection();
    String sql = "insert into batch_maintain (maintain_num, maintain_name, equipment_num, maintain_type, functionary, maintain_duration, start_time, end_time, maintain_status) values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    preparedStatement = connection.prepareStatement(sql);
    int count = 0;
    for (Maintain maintain : maintains) {
      preparedStatement.setString(1, maintain.getMaintainNum());
      preparedStatement.setString(2, maintain.getMaintainName());
      preparedStatement.setLong(3, maintain.getEquipmentNum());
      preparedStatement.setInt(4, maintain.getMaintainType());
      preparedStatement.setString(5, maintain.getFunctionary());
      preparedStatement.setString(6, maintain.getMaintainDuration());
      preparedStatement.setTimestamp(7, Timestamp.from(maintain.getStartTime().toInstant(ZoneOffset.ofHours(8))));
      preparedStatement.setTimestamp(8, Timestamp.from(maintain.getEndTime().toInstant(ZoneOffset.ofHours(8))));
      preparedStatement.setBoolean(9, maintain.getMaintainStatus());
      // 提交到缓存区
      preparedStatement.addBatch();
      count++;
      if (count % BATCH_SIZE == 0) {
        // 一次性提交缓存区中的SQL语句
        preparedStatement.executeBatch();
        count = 0;
      }
    }
    if (count != 0) {
      preparedStatement.executeBatch();
    }
  } catch (SQLException exception) {
    exception.printStackTrace();
  } finally {
    stopWatch.stop();
    HikariCPUtils.close(preparedStatement, connection);
    System.out.println("jdbc批处理插入方式花费时间 ==> " + stopWatch.getLastTaskTimeMillis());
  }
}
```



| 数据量/插入时间(毫秒) | 第一次 | 第二次 | 第三次 |
| --------------------- | ------ | ------ | ------ |
| 5w条                  | 3397   | 3350   | 3240   |
| 10w条                 | 9199   | 8993   | 9052   |
| 20w条                 | 17421  | 17817  | 17676  |
| 40w条                 | 31198  | 32074  | 32561  |



### JDBC 批处理事务提交

JDBC 事务提交使用方式也很简单

1. `connection.setAutoCommit(false)` 设置手动提交
2. `connection.commit()` 执行批处理后提交事务

```java
@Override
public void doImport(List<Maintain> maintains) {
  StopWatch stopWatch = new StopWatch();
  Connection connection = null;
  PreparedStatement preparedStatement = null;
  stopWatch.start();
  try {
    connection = HikariCPUtils.getConnection();
    // 开启事务手动提交
    connection.setAutoCommit(false);
    String sql = "insert into batch_maintain (maintain_num, maintain_name, equipment_num, maintain_type, functionary, maintain_duration, start_time, end_time, maintain_status) values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    preparedStatement = connection.prepareStatement(sql);
    int count = 0;
    for (Maintain maintain : maintains) {
      preparedStatement.setString(1, maintain.getMaintainNum());
      preparedStatement.setString(2, maintain.getMaintainName());
      preparedStatement.setLong(3, maintain.getEquipmentNum());
      preparedStatement.setInt(4, maintain.getMaintainType());
      preparedStatement.setString(5, maintain.getFunctionary());
      preparedStatement.setString(6, maintain.getMaintainDuration());
      preparedStatement.setTimestamp(7, Timestamp.from(maintain.getStartTime().toInstant(ZoneOffset.ofHours(8))));
      preparedStatement.setTimestamp(8, Timestamp.from(maintain.getEndTime().toInstant(ZoneOffset.ofHours(8))));
      preparedStatement.setBoolean(9, maintain.getMaintainStatus());
      preparedStatement.addBatch();
      count++;
      if (count % BATCH_SIZE == 0) {
        // 一次性提交缓存区中的SQL语句
        preparedStatement.executeBatch();
        count = 0;
      }
    }
    if (count != 0) {
      preparedStatement.executeBatch();
    }
    // 提交事务
    connection.commit();
  } catch (SQLException exception) {
    exception.printStackTrace();
  } finally {
    stopWatch.stop();
    HikariCPUtils.close(preparedStatement, connection);
    System.out.println("jdbc批处理事务插入方式花费时间 ==> " + stopWatch.getLastTaskTimeMillis());
  }
}
```



| 数据量/插入时间(毫秒) | 第一次 | 第二次 | 第三次 |
| --------------------- | ------ | ------ | ------ |
| 5w条                  | 3240   | 3428   | 3153   |
| 10w条                 | 6606   | 6281   | 7160   |
| 20w条                 | 12014  | 14157  | 14655  |
| 40w条                 | 23317  | 25490  | 22860  |



### 总结

- 使用 MyBatis 的方式使用批量提交 insert 语句而不是批量拼接 insert 语句的 value，主要的考量是数据库服务端解析长的 SQL 语句会更加耗时。诚然使用 insert 语句拼接 value 的话，提交到服务器上的 insert 语句少了，网络负载少了，性能也能提上去，**但是这是建立在数据量不大的情况下**，当数据量变大，这条 insert 语句会变得很长，数据库解析 SQL 语句也会变慢。所以单纯 value 拼接方案难以经受大量数据的考验，只能在特定数量之内安全的提升性能，这么看 MyBatis-Plus 默认方案的选择也有一定的道理。

- 从结果看 JDBC 原生要比 MyBatis-Plus 更快，原因可能是 MyBatis-Plus 的方法在处理数据插入操作时，需要进行 ORM 转换，效率一般；原生的 JDBC 直接使用 SQL 语句，无需转换，效率更高。
- 在批处理中，尽管使用事务和不使用事务总体上时间差距不大（可能需要增大测试的数据量），但还是要比不使用事务快一点点；而实际上在循环单条插入时速度差异更大，原因是在循环单条插入时 MySQL 把每一个插入操作都看成是一个事务，这意味着每一个插入操作都需要把日志数据写入磁盘，而使用事务提交时，这些所有的插入操作都只进行一次日志数据的写入，IO 次数更少，效率也就更高。
- 其中使用批处理时非常值得考虑一个问题就是分批提交，虽然这会比直接批处理要慢一点，但是由于数据库每次接收的 SQL 语句的数量是有上限的，如果批处理提交的数量超出这个上限，那么很可能导致数据库拒绝这一批数据并抛出异常，查看 MySQL 一次发送的数据包的大小上限的语句： `SHOW VARIABLES LIKE '%max_allowed_packet%';` 。另外把大量的数据分成多批进行批处理也能有效降低 JDBC 客户端的内存压力。
- 在处理大批量数据时，**建议使用原生 JDBC 批量 + 分批 + 事务提交**，既能保证效率，又能尽可能避免出现内存泄漏等问题。



## 参考链接

[号称全网最快的数据库连接池HikariCP的工具类开发-HikariCPUtils](https://dandelioncloud.cn/article/details/1482640589962424322)

[mysql批量插入数据，一次插入多少行数据效率最高？](https://blog.csdn.net/LJFPHP/article/details/99708888)

[MyBatis-Plus 批处理有坑，我教你改造](https://cdn.modb.pro/db/175259)

[介绍MySQL Jdbc驱动的rewriteBatchedStatements参数](https://www.cnblogs.com/chenjianjx/archive/2012/08/14/2637914.html)

