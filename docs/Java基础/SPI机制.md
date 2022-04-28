# SPI

> SPI（Service Provider Interface），是 JDK 内置的一种服务提供发现机制，可以用来启用框架扩展和替换组件，主要是被框架的开发人员使用

## SPI使用

- 定义标准（接口）

- 具体的服务提供者实现

  - 实现接口
  - 在 `META-INF/services` 目录下定义一个名为接口全限定名的文件，文件内容是具体的实现类全限定名

- 开发人员使用

  ```java
  ServiceLoader<Driver> loadedDrivers = ServiceLoader.load(Driver.class);
  //获取迭代器
  Iterator<Driver> driversIterator = loadedDrivers.iterator();
  //遍历
  while(driversIterator.hasNext()) {
      driversIterator.next();
      //可以做具体的业务逻辑
  }
  ```

  

## SPI在源码中的案例

### JDBC DriverManager

- JDBC 接口定义

定义了接口 `java.sql.Driver` ，但是具体的实现工作交给具体的数据库厂商提供

- MySQL 接口实现

在 `mysql-connector-java-8.0.21.jar` 中，有一个目录：`META-INF/services` ，其中有一个以接口 `java.sql.Driver` 为名的文件，文件内容是简单的实现类的全限定类名 `com.mysql.cj.jdbc.Driver`

- DriverManager 加载驱动

```java
public class DriverManager {
    static {
        loadInitialDrivers();
        println("JDBC DriverManager initialized");
    }
    
    ...
        
    private static void loadInitialDrivers() {
		...
        AccessController.doPrivileged(new PrivilegedAction<Void>() {
            public Void run() {
				// 本地服务加载
                ServiceLoader<Driver> loadedDrivers = ServiceLoader.load(Driver.class);
                Iterator<Driver> driversIterator = loadedDrivers.iterator();

                try{
                    while(driversIterator.hasNext()) {
                        // 需要理解
                        driversIterator.next();
                    }
                } catch(Throwable t) {
                // Do nothing
                }
                return null;
            }
        });
		...
    }
}
```

`DriverManager` 本地服务加载拿到所有的 `Driver` 的实现类后，看似仅仅做了简单的迭代，实则不然

在 MySQL 实现的 `Driver` 中，把驱动注册到 `DriverManager` 是通过静态方法来完成的，静态方法是在访问这个类的时候触发，所以当上面迭代到每一个驱动的时候，这个方法就会触发

```java
public class Driver extends NonRegisteringDriver implements java.sql.Driver {
    public Driver() throws SQLException {
    }
    static {
        try {
            DriverManager.registerDriver(new Driver());
        } catch (SQLException var1) {
            throw new RuntimeException("Can't register driver!");
        }
    }
}
```



## SPI与API的区别

简单理解：

SPI：接口的定义在使用方，接口的实现在实现方

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220428102743.png)

API：接口的定义和实现都在实现方

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220428102900.png)