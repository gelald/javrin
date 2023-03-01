---
title: 桥接模式
icon: article
category:

- 设计模式

---

# 桥接模式

定义：将抽象的部分与它的具体实现部分分离，使得他们都可以独立地变化。主要的目的是通过组合的方式建立两个类之间的联系，而不是继承

适用场景

1. 在抽象和具体实现之间需要增加更多的灵活性的场景
2. 一个类存在多个独立变化的维度，而这多个维度都需要独立进行扩展
3. 不希望使用继承，或者因为多层继承导致系统类的数量剧增

优点：

1. 分离抽象部分及其具体实现部分
2. 提高了系统的扩展性
3. 符合开闭原则
4. 符合合成复用原则

缺点：

1. 增加了系统的理解和设计难度
2. 需要正确地识别系统中两个独立变化的维度



## 示例

工作中经常通过消息来进行沟通，无论是邮件消息、短信消息还是内部消息，同时按照消息紧急程度来看也能分为普通消息、紧急消息等。这时消息就可以分为消息类型、消息紧急程度两个独立的维度，两个维度之间可以自由组合，如：普通邮件消息、紧急短信消息，这时仅仅用继承的话就比较麻烦

现在在消息类型和消息紧急程度这两个维度中间建立一个桥接角色，后续再有新的消息类型，只需要再加一个IMessage的实现类即可



消息发送的统一接口

```java
public interface IMessage {
    //发送消息的内容和接收人
    void send(String message,String toUser);
}
```



邮件消息的实现类

```java
public class EmailMessage implements IMessage {
    public void send(String message, String toUser) {
        System.out.println("使用邮件消息发送" + message + "给" + toUser);
    }
}
```



短信消息的实现类

```java
public class SmsMessage implements IMessage {
    public void send(String message, String toUser) {
        System.out.println("使用短信消息发送" + message + "给" + toUser);
    }
}
```



桥接抽象角色

```java
public abstract class AbastractMessage {
  	// 持有一个实现部分的对象
    private IMessage message;

  	// 构造方法传入实现部分的对象
    public AbastractMessage(IMessage message) {
        this.message = message;
    }
  
  	// 发送消息，委派给实现部分的方法
    void sendMessage(String message,String toUser){
        this.message.send(message,toUser);
    }
}
```



普通消息实现类

```java
public class NormalMessage extends AbastractMessage {
    public NormalMessage(IMessage message) {
        super(message);
    }

    @Override
    void sendMessage(String message, String toUser){
        message = "【普通】" + message;
        super.sendMessage(message,toUser);
    }
}
```



紧急消息实现类

```java
public class UrgencyMessage extends AbastractMessage {
    public UrgencyMessage(IMessage message) {
        super(message);
    }

    @Override
    void sendMessage(String message, String toUser){
        message = "【加急】" + message;
        super.sendMessage(message,toUser);
    }
}
```



## 桥接模式在源码中的体现

### DriverManager

`DriverManager` 中持有了一系列的 `DriverInfo` 对象，这些对象是由各数据库厂商实现的 `Driver` 类注册到 `DriverManger` 生成

```java
public class DriverManager {
  	// List of registered JDBC drivers
  	private final static CopyOnWriteArrayList<DriverInfo> registeredDrivers = new CopyOnWriteArrayList<>();
  	// ...
  
    /**
     * Load the initial JDBC drivers by checking the System property
     * jdbc.properties and then use the {@code ServiceLoader} mechanism
     */
    static {
      loadInitialDrivers();
      println("JDBC DriverManager initialized");
    }
  
    // ...
  
  	public static synchronized void registerDriver(java.sql.Driver driver) throws SQLException {
        registerDriver(driver, null);
    }
  
  	public static synchronized void registerDriver(java.sql.Driver driver, DriverAction da)
      throws SQLException {
        /* Register the driver if it has not already been added to our list */
        if(driver != null) {
            registeredDrivers.addIfAbsent(new DriverInfo(driver, da));
        } else {
            // This is for compatibility with the original DriverManager
            throw new NullPointerException();
        }
        println("registerDriver: " + driver);
    }
  
    // ...
}  
```

`DriverMangeer` 中的 `getConnection()` 方法中会调用各自厂商实现的 `Driver` 的 `connect()` 方法获取连接对象

```java
public class DriverManager {
  // ...
  
  @CallerSensitive
  public static Connection getConnection(String url, java.util.Properties info) throws SQLException {
    return (getConnection(url, info, Reflection.getCallerClass()));
  }
  
  //  Worker method called by the public getConnection() methods.
  private static Connection getConnection(String url, java.util.Properties info, Class<?> caller) throws SQLException {
    /*
     * When callerCl is null, we should check the application's
     * (which is invoking this class indirectly)
     * classloader, so that the JDBC driver class outside rt.jar
     * can be loaded from here.
     */
    ClassLoader callerCL = caller != null ? caller.getClassLoader() : null;
    synchronized(DriverManager.class) {
      // synchronize loading of the correct classloader.
      if (callerCL == null) {
        callerCL = Thread.currentThread().getContextClassLoader();
      }
    }

    if(url == null) {
      throw new SQLException("The url cannot be null", "08001");
    }

    println("DriverManager.getConnection(\"" + url + "\")");

    // Walk through the loaded registeredDrivers attempting to make a connection.
    // Remember the first exception that gets raised so we can reraise it.
    SQLException reason = null;

    for(DriverInfo aDriver : registeredDrivers) {
      // If the caller does not have permission to load the driver then
      // skip it.
      if(isDriverAllowed(aDriver.driver, callerCL)) {
        try {
          println("    trying " + aDriver.driver.getClass().getName());
          Connection con = aDriver.driver.connect(url, info);
          if (con != null) {
            // Success!
            println("getConnection returning " + aDriver.driver.getClass().getName());
            return (con);
          }
        } catch (SQLException ex) {
          if (reason == null) {
            reason = ex;
          }
        }

      } else {
        println("    skipping: " + aDriver.getClass().getName());
      }

    }

    // if we got here nobody could connect.
    if (reason != null)    {
      println("getConnection failed: " + reason);
      throw reason;
    }

    println("getConnection: no suitable driver found for "+ url);
    throw new SQLException("No suitable driver found for "+ url, "08001");
  }
  
  // ...
}
```

这么做可以巧妙地避开继承所带来的强依赖的结果，为不同的数据库提供了相同的接口



## 桥接模式和组合模式的区别

组合模式注重的是需要有一条主线或者某一个共同点

桥接模式是一种非常特殊的组合模式，桥接模式注重的是组合的形式



## 桥接模式和适配器模式的区别

适配器模式主要解决的是兼容问题

桥接模式主要解决的是两个维度连接的问题


