---
title: MyBatis 获取参数指南
icon: article
order: 2
category:

- 文章
- 框架

tag:

- 基础
- 源码
- MyBatis

---

# MyBatis 获取参数指南

MyBatis 是一个轻量级，性能出色的半 ORM 框架，支持定制化 SQL，SQL 和 Java 代码分开，功能边界清晰。Java 代码专注于业务、SQL 语句专注于数据操作。

接下来我们学习一下 MyBatis 框架中，Java 代码如何传递参数，SQL 语句如何获取接口参数。



## ${} 和 #{} 的区别

在 MyBatis 中，SQL 语句获取参数一般用 ${} 和 #{} 这两种方式，这两种方式的区别在于：

- ${} 使用**字符串拼接的方式**拼接 SQL 语句，容易发生 SQL 注入，**一般不用这种方式**，同时也需要频繁手动添加单引号。

- #{} 使用**占位符赋值的方式**拼接 SQL 语句，有效防止 SQL 注入，当参数是字符串类型和日期类型时，**能自动添加单引号**。



### SQL注入简介

上面提到 ${} 方式容易引发 SQL 注入，那么 SQL 注入是什么意思呢？

其实 SQL 注入是一种常见的攻击手段，攻击者在提交表单的时候额外添加一些额外的 SQL 语句，如果一些应用程序对用户输入的数据的合法性判断不严格或者没有过滤，可能会引发数据泄漏或者数据被篡改。

用一个简单的例子来说明：

```java
public interface UserMapper {
  List<User> findById(Integer id);
  
  int deleteById(Integer id);
}
```

```xml
<mapper namespace="com.example.UserMapper">
  <select id="findById" resultType="User">
  	select * from t_user where id = ${id}
  </select>
  
  <delete id="deleteById">
  	delete from t_user where id = ${id}
  </delete>
</mapper>
```

此时攻击者在表单提交的时候，id这一栏输入的是 `5 and 1=1` ，然后 SQL 语句拼接后就会变成 `select * from t_user where id = 5 and 1 = 1` ，可见 SQL 语句中的条件语句中拼接了一个恒等式，因此这个筛选条件不再有效，这个 SQL 语句执行的后果是把所有用户的数据都查询出来了，这就把系统中的数据泄漏了，攻击者就拿到了这些敏感数据。



因此我们一般都会选择使用 #{} 的获取参数方式，来规避 SQL 注入的风险。



## 各种数据类型参数的获取方式

- 单个参数

  使用 #{} 来获取，占位符中可以填写参数名。

- 多个参数

  MyBatis 会将多个参数存储到一个 Map 集合中，以 arg0、arg1 等为键，以具体参数为值，因此 #{} 占位符中需要填写键名进行参数访问。

- Map 参数

  如果不想让 MyBatis 来给参数定义键名，那么可以自己用 Map 集合给多个参数自定义键名，然后用 #{} 按照参数在 Map 中的键名来访问。比如定义了一个 Map，存储了 `("id", id), ("age", age)` 那么就可以分别通过 id 和 age 来获取对应的参数。

- 实体类型参数

  参与业务逻辑的参数往往是一个实体类对象，实体类对象与 Map 集合方式类似，只不过键名是具体的属性名（getXXX方法名中去掉get，把首字母小写），所以 #{} 占位符中填写属性名来进行访问。

- 使用 @Param 注解

  使用 @Param 注解后 MyBatis 会将这些参数放到一个 Map 集合中，以 @Param 注解中的内容作为参数的键名，简单来说就是自定义 MyBatis 中的 Map 集合中的键名，使用 #{} 使用键名来访问。



### 推荐使用

实际开发中，我们倡导使用**实体类**和 **@Param 注解**的方式，最大的原因还是方便访问使用。

一般情况下，如果是多个参数我会用一个 DTO 来将他们组织成一个对象，在 SQL 语句中通过 #{属性名} 的方式进行获取；如果是分散地传递，那么我会用 @Param 注解手动添加一个键名，在 SQL 语句中通过 #{键名} 的方式进行获取。



## @Param 源码解读

接下来从 MyBatis 源码中分析 @Param 自定义键名的过程，源码分析过程：

SqlSession#getMapper -> MapperProxy#invoke -> MapperMethod#execute -> ParamNameResolver#getNamedParams



### SqlSession

尽管现在开发时都不会再写下面这样的代码，但是回归最原始的方式有助于我们分析过程。

```java
InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(inputStream);
SqlSession sqlSession = sqlSessionFactory.openSession();
UserMapper mapper = sqlSession.getMapper(UserMapper.class);
```

在调用 `getMapper` 方法时通过追踪源码发现是使用代理模式来创建 Mapper 的代理对象的。

```java
// MapperProxyFactory.class
protected T newInstance(MapperProxy<T> mapperProxy) {
  return (T) Proxy.newProxyInstance(mapperInterface.getClassLoader(), new Class[] { mapperInterface }, mapperProxy);
}

public T newInstance(SqlSession sqlSession) {
  final MapperProxy<T> mapperProxy = new MapperProxy<>(sqlSession, mapperInterface, methodCache);
  return newInstance(mapperProxy);
}
```



### MapperProxy

其中 MapperProxy 就是代理 Mapper 的代理类，泛型代表具体的 Mapper 类型。

```java
public class MapperProxy<T> implements InvocationHandler, Serializable {
  
  @Override
  public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
    if (Object.class.equals(method.getDeclaringClass())) {
      return method.invoke(this, args);
    } else {
      // 调用方法的对象一般都会是具体的 Mapper 对象
      return cachedInvoker(method).invoke(proxy, method, args, sqlSession);
    }
  }
  
  private MapperMethodInvoker cachedInvoker(Method method) throws Throwable {
    return MapUtil.computeIfAbsent(methodCache, method, m -> {
      if (m.isDefault()) {
        // 如果方法被 defalut 修饰走的逻辑，一般 Mapper 中都写抽象方法
      } else {
        // 其中 PlainMethodInvoker 是 MapperProxy 的一个内部类，负责进一步代理方法的执行
        return new PlainMethodInvoker(new MapperMethod(mapperInterface, method, sqlSession.getConfiguration()));
      }
    });
  }
  
  private static class PlainMethodInvoker implements MapperMethodInvoker {
    @Override
    public Object invoke(Object proxy, Method method, Object[] args, SqlSession sqlSession) throws Throwable {
      return mapperMethod.execute(sqlSession, args);
    }
  }
}
```



### MapperMethod

MapperMethod 是具体为 Mapper 方法执行增强的对象，增强逻辑都在这个类中实现。

```java
public class MapperMethod {
  public Object execute(SqlSession sqlSession, Object[] args) {
    Object result;
    // switch-case 代码块为了区分 SQL 语句的类型(增删改查)
    switch (command.getType()) {
      ...
      case SELECT:
        if (method.returnsVoid() && method.hasResultHandler()) {
          // 返回空值
          executeWithResultHandler(sqlSession, args);
          result = null;
        } else if (method.returnsMany()) {
          // 返回集合
          result = executeForMany(sqlSession, args);
        } else if (method.returnsMap()) {
          // 返回 Map 集合
          result = executeForMap(sqlSession, args);
        } else if (method.returnsCursor()) {
          // 返回 Cursor 对象(游标)
          result = executeForCursor(sqlSession, args);
        } else {
          // 其他情况
          Object param = method.convertArgsToSqlCommandParam(args);
          result = sqlSession.selectOne(command.getName(), param);
          if (method.returnsOptional()
              && (result == null || !method.getReturnType().equals(result.getClass()))) {
            result = Optional.ofNullable(result);
          }
        }
        break;
    }
    return result;
  }
  
  public Object convertArgsToSqlCommandParam(Object[] args) {
    return paramNameResolver.getNamedParams(args);
  }
}
```

其中在 `case SELECT` 代码块下每一个查询的类型中经过追踪都会调用一个方法：`convertArgsToSqlCommandParam(args)`，通过方法名可以大概了解到这个方法是把 Mapper 方法中传入的参数转换到为 SQL 语句准备的参数。



### ParamNameResolver

在 ParamNameResolver 中，构造方法负责把参数索引和 @Param 值存储，`getNamedParams` 方法负责把 @Param 值和参数值存储。

```java
public class ParamNameResolver {
  // 备用的参数键名
  public static final String GENERIC_NAME_PREFIX = "param";
	// 方法的参数是否使用了@Param注解
  private final boolean useActualParamName;
	// 方法参数的索引与@Param中value的对应关系Map集合
  private final SortedMap<Integer, String> names;
  
  public ParamNameResolver(Configuration config, Method method) {
    this.useActualParamName = config.isUseActualParamName();
    final Class<?>[] paramTypes = method.getParameterTypes();
    // 二维数组是因为
    // 1.一个方法上可能有多个参数，所以数组第一维度代表这个方法的参数集合
    // 2.一个参数可能被多个注解修饰，所以数组第二维度代表修饰这个参数的注解集合
    final Annotation[][] paramAnnotations = method.getParameterAnnotations();
    final SortedMap<Integer, String> map = new TreeMap<>();
    int paramCount = paramAnnotations.length;
    
    // 从@Param注解中获取value值(参数的自定义键名)
    for (int paramIndex = 0; paramIndex < paramCount; paramIndex++) {
      if (isSpecialParameter(paramTypes[paramIndex])) {
        // 跳过特殊参数，暂时不细究
        continue;
      }
      String name = null;
      for (Annotation annotation : paramAnnotations[paramIndex]) {
        if (annotation instanceof Param) {
          hasParamAnnotation = true;
          name = ((Param) annotation).value();
          break;
        }
      }
      if (name == null) {
        // @Param was not specified.
        if (useActualParamName) {
          name = getActualParamName(method, paramIndex);
        }
        if (name == null) {
          // use the parameter index as the name ("0", "1", ...)
          // gcode issue #71
          name = String.valueOf(map.size());
        }
      }
      // (参数位置索引,参数自定义键名)
      map.put(paramIndex, name);
    }
    names = Collections.unmodifiableSortedMap(map);
  }
  
  public Object getNamedParams(Object[] args) {
    final int paramCount = names.size();
    if (args == null || paramCount == 0) {
      return null;
    } else if (!hasParamAnnotation && paramCount == 1) {
      Object value = args[names.firstKey()];
      return wrapToMapIfCollection(value, useActualParamName ? names.get(0) : null);
    } else {
      // 这个Map集合存储的结构:(参数自定义键名,参数值)
      // 除了这个对应关系，MyBatis还准备了一个备用的键名，结构:(paramn,第n个参数)
      final Map<String, Object> param = new ParamMap<>();
      int i = 0;
      for (Map.Entry<Integer, String> entry : names.entrySet()) {
        param.put(entry.getValue(), args[entry.getKey()]);
        // 备用参数名(param1, param2, ...)
        final String genericParamName = GENERIC_NAME_PREFIX + (i + 1);
        // 保证不和原有的自定义键名冲突
        if (!names.containsValue(genericParamName)) {
          param.put(genericParamName, args[entry.getKey()]);
        }
        i++;
      }
      return param;
    }
  }
}  
```

比如一个方法的参数列表是 `(@Param("username") String username, @Param("code") Integer code)` ，传入的参数是 `("admin", 20)` ，那么此时这个 `param` Map 集合中的数据就是：

|    键    |  值   |
| :------: | :---: |
| username | admin |
|   code   |  10   |
|  param1  | admin |
|  param2  |  10   |





## 使用 #{} 的特殊情况

前面在介绍 ${} 和 #{} 的区别的时候有说到一个点是自动添加单引号，这个特殊情况也围绕这个点来展开。



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


## 总结

本篇文章从源码、举例演示 MyBatis 中各种获取参数的方式与情况，如果有不对的地方还请指正，一起学习。
