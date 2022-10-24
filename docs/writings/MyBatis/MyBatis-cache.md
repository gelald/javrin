# MyBatis 缓存

MyBatis 的缓存就是把当前查询的数据记录到内存中，等下一次查询相同数据的时候，就从缓存中取，不再查询数据库了。**缓存的目的就是为了提高查询速度，但是不能影响查询的结果，当数据发生改变，缓存也就失效了。**



## MyBatis 一级缓存

**MyBatis 一级缓存默认开启**

Mybatis 一级缓存是 **SqlSession 级别**的，意思是通过同一个 SqlSession 查询出来的数据会被缓存，下次查询相同数据的时候就从缓存中获取，不再查询数据库。

### 一级缓存失效的场景

- 使用了不同一个 SqlSession，因为不同的 SqlSession 对应不同的一级缓存。

- 使用同一个 SqlSession，但是查询条件不一样。

- 使用同一个 SqlSession，但是两次相同查询期间执行了任何一次增删改操作，因为这些操作会修改数据库中的数据，需要重新查询。

- 使用同一个 SqlSession，但是两次相同查询期间手动清空了缓存。

  `sqlSession.clearCache()` ：清除一级缓存的方法



## MyBatis 二级缓存

**MyBatis 二级缓存需要手动开启**

MyBatis 二级缓存是 **SqlSessionFactory 级别**的， 通过同一个 SqlSessionFactory 创建出来的 SqlSession 查询的结果会被缓存，下次再次执行相同的查询语句的时候就从缓存中获取，不再查询数据库。 可见二级缓存的范围要比一级缓存的范围大。

### 二级缓存开启的条件

这些二级缓存开启的条件要同时满足，才能正确开启。

1. 在 MyBatis 核心配置文件中，设置全局配置属性 cacheEnabled="true"，但是默认就是 true，不需要配置。

   ```xml
   <settings>
     <!--设置启用二级缓存，默认为true-->
     <setting name="cacheEnabled" value="true"/>
   </settings>
   ```

2. 具体的映射文件中设置标签 `<cache/>` 。

3. **二级缓存必须在 SqlSession 关闭或提交之后有效**。当 SqlSession 在没提交或没关闭前，数据会缓存在一级缓存中；当关闭或提交后数据才会被保存到二级缓存中。

4. 查询的数据所转换的实体类必须实现序列化的接口。

### 二级缓存失效的场景

两次查询之间执行了任意一次的增删改操作，**会使一级和二级缓存同时失效**。

### 二级缓存注意事项

- 在单表上使用二级缓存：在做关联关系查询时，就会发生多表的操作，此时有可能这些表存在于多个 namespace （Mapper 接口）中，这就会导致这不同的 namespace 中的数据不一致的情况。

- 查询多于修改时使用二级缓存：在查询操作远远多于增删改操作的情况下可以使用二级缓存。因为任何增删改操作都将刷新二级缓存，对二级缓存的频繁刷新将降低系统性能。



## MyBatis 缓存原理

### Cache

MyBatis 中缓存的顶层接口是 Cache，里面定义了缓存的各种操作，重点是 put（缓存数据）、get（获取数据）、clear（清除缓存数据）方法。

### PerpetualCache

MyBatis 中缓存的默认实现是 PerpetualCache，实现方式比较简单，主要是利用了 HashMap 来进行数据存储。

```java
public class PerpetualCache implements Cache {

  private final String id;
  private final Map<Object, Object> cache = new HashMap<>();

  public PerpetualCache(String id) {
    this.id = id;
  }
 
  @Override
  public void putObject(Object key, Object value) {
    cache.put(key, value);
  }

  @Override
  public Object getObject(Object key) {
    return cache.get(key);
  }

  @Override
  public void clear() {
    cache.clear();
  }
  ...
}
```



### MyBatis 缓存数据流程

从 SqlSession 开始，假设当前需要查询一批数据，会使用 Mapper 的代理类调用查询方法

```java
public class MapperProxy<T> implements InvocationHandler, Serializable {
  private static class PlainMethodInvoker implements MapperMethodInvoker {
    private final MapperMethod mapperMethod;

    public PlainMethodInvoker(MapperMethod mapperMethod) {
      super();
      this.mapperMethod = mapperMethod;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args, SqlSession sqlSession) throws Throwable {
      return mapperMethod.execute(sqlSession, args);
    }
  }
}
```

MapperMethod 是代理具体方法执行的代理类，调用 SqlSession 来查询数据

```java
private <E> Object executeForMany(SqlSession sqlSession, Object[] args) {
    List<E> result;
    //SQL语句获取参数
    Object param = method.convertArgsToSqlCommandParam(args);
    //查询数据
    if (method.hasRowBounds()) {
      RowBounds rowBounds = method.extractRowBounds(args);
      result = sqlSession.selectList(command.getName(), param, rowBounds);
    } else {
      result = sqlSession.selectList(command.getName(), param);
    }
    ...
  }
```

SqlSession 相当于一个门面，具体 SQL 语句的执行是交给一个 Executor 来执行的

```java
public class DefaultSqlSession implements SqlSession {
  private <E> List<E> selectList(String statement, Object parameter, RowBounds rowBounds, ResultHandler handler) {
    try {
      MappedStatement ms = configuration.getMappedStatement(statement);
      return executor.query(ms, wrapCollection(parameter), rowBounds, handler);
    } catch (Exception e) {
      throw ExceptionFactory.wrapException("Error querying database.  Cause: " + e, e);
    } finally {
      ErrorContext.instance().reset();
    }
  }
}
```

其中 Executor 查询数据时会先查询缓存中有没有数据，如果有就返回；如果没有就查询数据库并把数据设置到缓存中

```java
public abstract class BaseExecutor implements Executor {
	@Override
  public <E> List<E> query(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler, CacheKey key, BoundSql boundSql) throws SQLException {
    ...
    List<E> list;
    try {
      queryStack++;
      //从缓存中获取
      list = resultHandler == null ? (List<E>) localCache.getObject(key) : null;
      if (list != null) {
        handleLocallyCachedOutputParameters(ms, key, parameter, boundSql);
      } else {
        //查询数据库
        list = queryFromDatabase(ms, parameter, rowBounds, resultHandler, key, boundSql);
      }
    } finally {
      queryStack--;
    }
    ...
  }
  
  private <E> List<E> queryFromDatabase(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler, CacheKey key, BoundSql boundSql) throws SQLException {
    List<E> list;
    ...
    //执行具体的查询
    list = doQuery(ms, parameter, rowBounds, resultHandler, boundSql);
    //缓存数据
    localCache.putObject(key, list);
    ...
  }
}
```



### MyBatis 一级缓存失效原理

在上面都分别提及了一级缓存和二级缓存失效的场景，其实不难发现本质的原因就是 SqlSession 执行了 commit 或 close 方法，以 commit 方法为例

SqlSession 中的 commit 方法是调用 executor 的 commit 方法的

```java
public class DefaultSqlSession implements SqlSession {
  @Override
  public void commit() {
    commit(false);
  }

  @Override
  public void commit(boolean force) {
    try {
      executor.commit(isCommitOrRollbackRequired(force));
      dirty = false;
    } catch (Exception e) {
      throw ExceptionFactory.wrapException("Error committing transaction.  Cause: " + e, e);
    } finally {
      ErrorContext.instance().reset();
    }
  }
}
```

BaseExecutor 中的 commit 方法调用时会主动地去清理缓存，也就导致缓存失效了

```java
public abstract class BaseExecutor implements Executor {
	@Override
  public void commit(boolean required) throws SQLException {
    if (closed) {
      throw new ExecutorException("Cannot commit, transaction is already closed");
    }
    clearLocalCache();
    flushStatements();
    if (required) {
      transaction.commit();
    }
  }
  
  @Override
  public void clearLocalCache() {
    if (!closed) {
      localCache.clear();
      localOutputParameterCache.clear();
    }
  }
}
```



## MyBatis 查询缓存的顺序

如果二级缓存和一级缓存同时开启，查询缓存时会有以下顺序

- 先查询二级缓存，因为二级缓存的范围比一级缓存的范围大，可能有其他程序查询出来的数据
- 如果二级缓存没有命中，那么再查询一级缓存
- 如果一级缓存没有命中，那么查询数据库，查询完成后把数据保存到一级缓存中
- 等到 SqlSession 关闭后，会把一级缓存更新到二级缓存中



## MyBatis 整合第三方缓存

MyBatis 是一个持久层框架，工作是把数据持久化到磁盘上，但是每一次读取磁盘都涉及到 IO 操作，效率不如从缓存中读取高。缓存在MyBatis 中是非常有意义的，虽然 MyBatis 不是专门做缓存功能的（MyBatis 内部的缓存使用了 HashMap 来实现），但是它提供了缓存的接口，**可以由其他缓存技术来作为 MyBatis 的二级缓存**，不能更换一级缓存的实现。



MyBatis 二级缓存整合第三方缓存有两种选择：本地缓存和分布式缓存。

- 本地缓存：本地缓存和应用程序运行在同一个进程中；优势就是操作速度非常快，缺点就是多程序无法共享这个缓存；只适合单节点非集群的应用场景。本地缓存中比较流行的是 EHCache。
- 分布式缓存：应用程序和分布式缓存组件互相分离；优势就是多个应用程序可以共享这一份缓存并且可以集群式部署，提供了高可用的运行环境；缺点是可能会有网络上的延迟；适合分布式集群场景。分布式缓存中比较流行的是 Redis。



### MyBatis 整合 EHCache

参考链接：[MyBatis-----9、MyBatis整合第三方缓存EHCache](https://blog.csdn.net/lyy_sss/article/details/125752946)

1. 添加依赖

   ```xml
   <!-- Mybatis EHCache整合包 -->
   <dependency>
     <groupId>org.mybatis.caches</groupId>
     <artifactId>mybatis-ehcache</artifactId>
     <version>1.2.1</version>
   </dependency>
   <!-- slf4j日志门面的一个具体实现 -->
   <dependency>
     <groupId>ch.qos.logback</groupId>
     <artifactId>logback-classic</artifactId>
     <version>1.2.3</version>
   </dependency>
   ```

   

2. 创建 EHCache 配置文件

   ```xml
   <?xml version="1.0" encoding="utf-8" ?>
   <ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:noNamespaceSchemaLocation="../config/ehcache.xsd">
       <!-- 磁盘保存路径 -->
       <diskStore path="D:\atguigu\ehcache"/>
       <defaultCache
               maxElementsInMemory="1000"
               maxElementsOnDisk="10000000"
               eternal="false"
               overflowToDisk="true"
               timeToIdleSeconds="120"
               timeToLiveSeconds="120"
               diskExpiryThreadIntervalSeconds="120"
               memoryStoreEvictionPolicy="LRU">
       </defaultCache>
   </ehcache>
   ```

   

3. 在映射文件中设置二级缓存的类型，使用 EHCache 作为二级缓存的实现

   ```xml
   <cache type="org.mybatis.caches.ehcache.EhcacheCache"/>
   ```

   

4. 添加日志

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <configuration debug="true">
   	<!-- 指定日志输出的位置 -->
   	<appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
   		<encoder>
   			<!-- 日志输出的格式 -->
   			<!-- 按照顺序分别是：时间、日志级别、线程名称、打印日志的类、日志主体内容、换行 -->
   			<pattern>[%d{HH:mm:ss.SSS}] [%-5level] [%thread] [%logger] [%msg]%n</pattern>
   		</encoder>
   	</appender>
     
     <!-- 设置全局日志级别。日志级别按顺序分别是：DEBUG、INFO、WARN、ERROR -->
     <!-- 指定任何一个日志级别都只打印当前级别和后面级别的日志。 -->
     <root level="DEBUG">
     	<!-- 指定打印日志的appender，这里通过“STDOUT”引用了前面配置的appender -->
     	<appender-ref ref="STDOUT" />
     </root>
     
     <!-- 根据特殊需求指定局部日志级别 -->
     <logger name="com.atguigu.crowd.mapper" level="DEBUG"/>
   </configuration>
   ```



### MyBatis 整合 Redis

参考链接：[MyBatis从入门到精通(四)—MyBatis缓存和二级缓存整合Redis](https://blog.csdn.net/qq_35427589/article/details/123812094)

其中 Redis 中负责数据缓存和读取的底层结构用的是 hash 数据结构，使用 namespace 作为 hash 的键，缓存数据作为 hash 的值。

1. 添加依赖

   ```xml
   <dependency>
     <groupId>org.mybatis.caches</groupId>
     <artifactId>mybatis-redis</artifactId>
     <version>1.0.0-beta2</version>
   </dependency>
   ```

   

2. 在配置文件中添加 redis 连接信息

   ```yaml
   spring:
   	redis:
   		host:localhost
   		port:6379
   		password:123456
   		database:1
   ```

   

3. 在映射文件中设置二级缓存的类型，使用 Redis 作为二级缓存的实现

   ```xml
   <cache type="org.mybatis.caches.redis.RedisCache"/>
   ```

   
