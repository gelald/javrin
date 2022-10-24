# @Param 源码解析

接下来从 MyBatis 源码中分析 @Param 自定义键名的过程，源码分析过程：

SqlSession#getMapper -> MapperProxy#invoke -> MapperMethod#execute -> ParamNameResolver#getNamedParams



## SqlSession

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



## MapperProxy

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



## MapperMethod

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



## ParamNameResolver

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

