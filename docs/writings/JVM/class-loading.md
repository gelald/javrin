---
title: Java 类加载机制
icon: article
category: JVM
---

# Java 类加载机制

## 类加载过程

> 类的生命周期总体上包括：**加载**、**使用**、**卸载**；

类的加载阶段总体上分为五个阶段：
- 加载: 读取 `.class` 文件
- 连接
    - 验证: 校验字节码合法性
    - 准备: 为静态变量分配内存并设默认值
    - 解析: 符号引用转直接引用
- 初始化: 执行 `<clinit>` 方法，初始化静态变量和静态代码块

> 类加载的这五个阶段中，**加载、验证、准备和初始化这四个阶段发生的顺序是确定的**，而解析阶段则不一定，它在某些情况下可以在初始化阶段之后开始，这是为了支持Java语言的运行时绑定(也成为动态绑定或晚期绑定)。

> 另外注意这个阶段是按顺序开始，而不是按顺序进行或完成，因为这些阶段**通常都是互相交叉地混合进行的**，通常在一个阶段执行的过程中调用或激活另一个阶段。

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220317145818.png)


### 阶段 1: 加载

在加载阶段，JVM 需要完成以下三件事:

- 通过一个类的**全限定类名**获取其定义的**二进制字节流**
- 将这个字节流所代表的静态存储结构转化为**方法区的运行时数据结构**
- 在**堆中生成一个代表这个类的 `java.lang.Class` 对象**，作为对方法区中这些数据的访问入口

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220317153259.png)

> 其中加载阶段的获取类的二进制字节流的动作是可控性最强的，因为开发人员既可以使用 JVM 的类加载器来完成加载，也可以自定义自己的类加载器来完成加载

> 类加载器并不需要等到某个类被「首次主动使用」时再加载它，JVM 规范允许类加载器在**预料**某个类将要被使用时就**预先加载**它，如果在预先加载的过程中遇到了 `.class` 文件缺失或存在错误，类加载器必须在程序首次主动使用该类时才报告错误(`LinkageError`)，如果这个类一直没有被程序主动使用，那么类加载器就不会报告错误。

类字节流的来源有以下途径:

- **本地文件系统**中加载（最直接）
- 通过网络下载 class 文件（**可能有安全性问题**）
- 从 zip、jar 等**压缩文件中提取** class 文件
- 运行时计算生成（**动态代理**）

---

### 阶段 2: 连接 - 验证

在验证阶段，JVM 需要完成的是：**确保 `.class` 文件的字节流中包含的信息符合当前虚拟机的要求，并且不会危害虚拟机自身的安全**。

验证阶段会做 4 个方面的内容:

- **文件格式验证**：验证字节流是否符合 `.class` 文件格式的规范，比如是否以 `0xCAFEBABE` 开头等
- **元数据验证**：对字节码描述的信息进行语义分析，以保证其描述的信息符合 Java 语言规范的要求，比如这个类是否继承了被 `final` 修饰的类
- **字节码验证**：通过数据流和控制流分析，确定程序语义是合法的、符合逻辑的
- **符号引用验证**：验证引用的类、方法、字段是否存在

> 其中验证阶段是**重要但却不是必须的**，因为它对程序运行没有影响。如果引用的类经过反复验证，那么可以考虑采用 `-Xverifynone` 参数来关闭大部分的类验证措施，以缩短虚拟机类加载的时间。

---

### 阶段 3: 连接 - 准备

在准备阶段，JVM 会**为类的静态变量分配内存并初始化为默认值** (**默认的零值**，如 `0`、`0L`、`null`、`false` 等)

用一个例子具体说明准备阶段的初始化默认值操作:

```java
public class PreparationDemo {
    // 准备阶段：value = 0（默认值）
    // 初始化阶段：value = 123（实际值）
    public static int value = 123;
    
    // 准备阶段：CONSTANT = 123（编译期常量，直接赋值）
    // 同时被 static 和 final 修饰的常量会被直接赋值
    public static final int CONSTANT = 123;
}
```

- 同时被 `static` 和 `final` 修饰的常量，必须在声明的时候就为其显式地赋值，否则编译时不通过
- 只被 `final` 修饰的常量则既可以在声明时显式地为其赋值，也可以在类初始化时显式地为其赋值；总之，在**使用前**必须为其显式地赋值，系统不会为其赋予默认零值

> 内存分配的仅包括类变量，而不包括实例变量，实例变量会在对象实例化时随着对象一块分配在堆内存中

---

### 阶段 4: 连接 - 解析

在解析阶段，JVM 会**把常量池内的符号引用替换为直接引用**

- 符号引用：以一组符号来描述所引用的目标，符号可以是任何形式的字面量
- 直接引用：直接指向目标的指针、相对偏移量或一个间接定位到目标的句柄

```
.class 文件编译后，常量池存储的是方法的名称、类的名称

JVM 还不知道这些方法和类在内存中对应的位置

解析阶段过去后，常量池中存储的会是某个方法在方法表中的偏移量 (0x0012)，某个类在方法区中的地址 (0x00012345)

JVM 知道了这些位置后，在调用时就可以直接跳转过去执行
```

解析的范围包括:
- 类或接口解析
- 字段解析
- 方法解析

---

### 阶段 5: 初始化

在初始化阶段，JVM 会执行类的初始化方法 `<clinit>()` 完成初始化

**初始化步骤**:

- 假如该类还没被加载和连接，那么程序先加载并连接这个类
- 假如该类的直接父类还没有被初始化，则**先初始化其直接父类**
- 假如该类中有初始化语句，则**按顺序**执行这些初始化语句；初始化语句由**静态变量赋值语句**和**静态代码块**组成

```java
public class ClinitDemo {
    static {
        System.out.println("静态代码块 1");
    }
    
    public static int value = 123;
    
    static {
        System.out.println("静态代码块 2");
    }
    
    // 编译后生成的 <clinit>() 方法按顺序执行：
    // 1. System.out.println("静态代码块 1");
    // 2. value = 123; 在准备阶段，value 会被赋值为 0，在初始化阶段才按值初始化
    // 3. System.out.println("静态代码块 2");
}
```

**初始化时机**:

只有当对类**主动使用**的时候才会导致类的初始化

```java
// 1. 通过 new 的方式创建类实例
new MyClass();

// 2. 访问或修改类的静态变量
int value = MyClass.value;
MyClass.value = 100;

// 3. 调用类的静态方法
MyClass.staticMethod();

// 4. 使用 java.lang.reflect 包的方法对类进行反射调用
Class.forName("com.example.MyClass");

// 5. 初始化子类时，父类还没有初始化
class Parent { static {} }
class Child extends Parent { static {} }
new Child();  // 先初始化 Parent，再初始化 Child

// 6. 虚拟机启动时，用户指定的主类（包含 main 方法、单元测试方法）
public static void main(String[] args) { }
```

---

**被动引用不会触发初始化**

```java
// 1. 通过子类引用父类的静态字段，只会初始化父类
class Parent { 
    public static int value = 123; 
    static { System.out.println("Parent init"); }
}
class Child extends Parent {
    static { System.out.println("Child init"); }
}
int v = Child.value;  // 只输出 "Parent init"，Child 不会初始化

// 2. 通过数组定义引用类
Parent[] arr = new Parent[10];  // Parent 不会初始化

// 3. 引用编译期常量
class Constants {
    public static final int VALUE = 123;
    static { System.out.println("Constants init"); }
}
int v = Constants.VALUE;  // Constants 不会初始化
```


## 类加载器

> JDK 8 及之前，类加载器分为 4 种：启动类加载器（Bootstrap，加载核心类库）、扩展类加载器（Extension，加载扩展类库）、应用程序类加载器（App，加载用户类路径）、自定义类加载器。**JDK 9 之后扩展类加载器被平台类加载器（Platform）取代**。

```mermaid
graph TB
    Bootstrap[启动类加载器<br/>Bootstrap ClassLoader<br/>JDK 核心类库]
    
    Platform[扩展/平台类加载器<br/>Extension/Platform ClassLoader<br/>JDK 扩展类库]
    
    App[应用程序类加载器<br/>App ClassLoader<br/>用户类路径 ClassPath]
    
    Custom[自定义类加载器<br/>Custom ClassLoader]
    
    Bootstrap --> Platform --> App --> Custom
```

### 根类加载器 (Bootstrap ClassLoader)

- JDK 9 之前，`Bootstrap ClassLoader` 负责加载 `$JAVA_HOME/jre/lib/` 路径下的核心类库，比如 rt.jar 等
- JDK 9 之后，`Bootstrap ClassLoader` 负责加载 `$JAVA_HOME/lib/modules` 文件（JIMAGE 格式，包含所有 JDK 模块）
- 可以通过 `-Xbootclasspath` VM 参数来自定义

### 扩展类加载器 (Extension ClassLoader)

`Extension ClassLoader` 只存在于 JDK 9 之前，`Extension ClassLoader` 负责加载 `$JAVA_HOME/jre/lib/ext/` 路径下的扩展类库，比如包名 javax.* 开头的类

### 平台类加载器 (Platform ClassLoader)

JDK 9 之后，`Platform ClassLoader` 代替了 `Extension ClassLoader`，负责加载 JDK 内部模块，比如包名 java.sql 开头的类

### 应用类加载器 (App ClassLoader)

`App ClassLoader` 负责加载 classpath 指定（当前工作目录下）的类。如果没有自定义类加载器，那么这个就是默认的类加载器

### 自定义加载器

> 应用程序都是由前面三种类加载器互相配合进行加载的，如果有必要，我们还可以加入自定义的类加载器。因为 JVM 自带的 ClassLoader 只是懂得从本地文件系统加载标准的 java class 文件，因此如果编写了自己的 ClassLoader，可以实现从特定场所取得 class 文件，如数据库和网络等

### 获取类加载器

- JDK 9 之前的做法：

```java
ClassLoader classLoader = this.getClass().getClassLoader();
System.out.println(classLoader);
System.out.println(classLoader.getParent());
System.out.println(classLoader.getParent().getParent());

//******** 输出 *********

sun.misc.Launcher$AppClassLoader@18b4aac2
sun.misc.Launcher$ExtClassLoader@78308db1
null
```

- JDK 9 之后的做法：

```java
// 获取 Platform ClassLoader
ClassLoader platformClassLoader = ClassLoader.getPlatformClassLoader();
// JDK 9 之后用 Platform ClassLoader 替换了 Extension ClassLoader
System.out.println("Platform ClassLoader: " + platformClassLoader);

// 获取 Bootstrap ClassLoader
System.out.println("Platform ClassLoader's parent => Bootstrap ClassLoader: " + platformClassLoader.getParent());

// 获取 App ClassLoader
ClassLoader appClassLoader = ClassLoader.getSystemClassLoader();
// JDK 9 之前的实现：sun.misc.Launcher$AppClassLoader
// JDK 9 之后的实现：jdk.internal.loader.ClassLoaders$AppClassLoader
System.out.println("App ClassLoader: " + appClassLoader);

// ******** 输出 *********

Platform ClassLoader: jdk.internal.loader.ClassLoaders$PlatformClassLoader@433c675d
Platform ClassLoader's parent => Bootstrap ClassLoader: null
App ClassLoader: jdk.internal.loader.ClassLoaders$AppClassLoader@63947c6b
```

可以证明我们可以获取 `App ClassLoader`、`Extension ClassLoader` / `Platform ClassLoader`，但是无法获取 `Bootstrap ClassLoader`，**因为 `Bootstrap ClassLoader` 是使用 C 语言实现的，找不到一个确定的返回方式，所以返回 `null`**

> 另外值得注意的是：**无论通过什么方式获取类加载器，获取的都是同一个实例，因为类加载器是唯一的**


## 类加载方式

类加载有三种方式

- 启动应用时由 JVM 初始化加载
- 使用 `Class.forName()` 方法动态加载
- 使用 `ClassLoader.loadClass()` 方法动态加载

---

`Class.forName()` 和 `ClassLoader.loadClass()` 的区别

- `ClassLoader.loadClass()`：仅将 class 文件加载到 JVM 中，只有在调用 `newInstance()` 方法才会去执行 `static` 块
- `Class.forName()`：除了将类的 class 文件加载到 JVM 中之外，还会对类进行初始化，执行类中的 `static` 块
- `Class.forName(name, initialize, loader)`：带参方法可以控制是否加载 `static` 块。如果 `initialize` 传入 `false` ，只有调用了 `newInstance()` 方法才用去执行 `static` 块

---

```java
public class Person {
    static {
        System.out.println("静态初始化块执行了！");
    }
}


@Test
public void testLoadClass() throws ClassNotFoundException {
    ClassLoader loader = this.getClass().getClassLoader();
    // 使用 ClassLoader.loadClass() 来加载类，不会执行初始化块
    loader.loadClass("com.example.demo.entity.Person");
}
// 没有输出，因为不会执行初始化块


@Test
public void testForName() throws ClassNotFoundException {
    ClassLoader loader = this.getClass().getClassLoader();
    // 使用 Class.forName() 来加载类，默认会执行初始化块
    Class.forName("com.example.demo.entity.Person");
}
// 静态初始化块执行了！


@Test
public void testForNameNotInit() throws ClassNotFoundException {
    ClassLoader loader = this.getClass().getClassLoader();
    // 使用 Class.forName() 来加载类，并指定 initialize，初始化时不执行静态块
    Class.forName("com.example.demo.entity.Person", false, loader);
}
// 没有输出，因为不会执行初始化块
```



## 双亲委派模型

> 当一个类加载器收到类加载的请求时，优先委托父类加载器来加载，只有父类加载器无法加载，才尝试自己加载

### 工作流程

```mermaid
sequenceDiagram
    participant App as AppClassLoader
    participant Platform as PlatformClassLoader
    participant Bootstrap as BootstrapClassLoader
    
    App->>App: 收到加载 MyClass 请求
    App->>Platform: 委托给父加载器
    Platform->>Bootstrap: 委托给父加载器
    
    Bootstrap->>Bootstrap: 尝试加载
    
    alt 在 Bootstrap 范围内
        Bootstrap-->>Platform: 加载成功
        Platform-->>App: 返回 Class 对象
    else 不在 Bootstrap 范围内
        Bootstrap-->>Platform: 无法加载
        Platform->>Platform: 尝试加载
        
        alt 在 Platform 范围内
            Platform-->>App: 返回 Class 对象
        else 不在 Platform 范围内
            Platform-->>App: 无法加载
            App->>App: 自己尝试加载
        end
    end
```

**类加载机制特点**: 

- **全盘负责**：当一个类加载器负责加载某一个类时，该类所依赖和引用的其他类也将由该类加载器负责加载，除非显式地使用另外一个类加载器来加载
- **缓存机制**：缓存机制将会保证所有加载过的类都会被缓存，当程序中需要使用某个类时，类加载器先从缓存区寻找该类，只有缓存区不存在时，系统才会读取该类对应的二进制数据，并将其转换成 Class 对象，存入缓存区

### 双亲委派具体实现

```java
protected Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException {
    // 确保同一个类不会被并发加载
    synchronized (getClassLoadingLock(name)) {
        
        // 检查这个类是否被加载过，如果已加载直接返回，避免重复加载 
        Class<?> c = findLoadedClass(name);
        if (c == null) {
            long t0 = System.nanoTime();
            try {
                // 双亲委派核心
                if (parent != null) {
                    // 如果有父类加载器，委托给父类加载器来加载（这个过程是递归的）
                    c = parent.loadClass(name, false);
                } else {
                    // 如果没有父类加载器（说明已经是 Bootstrap ClassLoader），那么尝试从核心类库路径加载这个类
                    // 最终依赖 native 方法 findBootstrapClass 来实现
                    c = findBootstrapClassOrNull(name);
                }
            } catch (ClassNotFoundException e) {
                // 父类加载器无法加载这个类的时候，捕获异常但不进一步抛出
                // 意味着：父类加载器无法加载，留给自己加载
            }

            // c 仍然是 null，说明父类无法加载，要自己加载
            if (c == null) {
                long t1 = System.nanoTime();

                // findClass 是模板方法，加载器需要实现的核心逻辑，定义具体的查找逻辑
                c = findClass(name);
                PerfCounter.getParentDelegationTime().addTime(t1 - t0);
                PerfCounter.getFindClassTime().addElapsedTimeFrom(t1);
                PerfCounter.getFindClasses().increment();
            }
        }

        // resolve = ture，那么执行类的连接工作（验证、准备、解析）
        if (resolve) {
            resolveClass(c);
        }
        return c;
    }
}
```

> 从加载类源码可以看到，如果我们需要自定义一个类加载器的话，继承 ClassLoader 并重写 `findClass()` 方法即可。**尽量不要重写 loadClass 方法，否则会破坏双亲委派机制**


### 双亲委派机制的意义

双亲委派机制最大的优势是**避免重复加载相同的类，并且保护核心类库**

看以下例子:

```java
// 恶意代码：尝试覆盖 String 类
package java.lang;

public class String {
    public String() {
        // 恶意代码
        System.exit(0);
    }
}
```

用户自定义了一个 `java.lang.String` 类，意图覆盖 JVM 中的正统 String 类，并且存在一些恶意代码。此时如果没有双亲委派模型，这份恶意代码就会对系统造成伤害；

有了双亲委派机制，这个类永远不会被 `Bootstrap ClassLoader` 加载，系统中永远只有 JDK 中的 String 类，保护了核心类库不会被覆盖


## 打破双亲委派模型

### SPI 机制

`DriverManager` 是 JDK 核心类，由 `Bootstrap ClassLoader` 负责加载。但是 MySQL JDBC 驱动 `com.mysql.cj.jdbc.Driver` 是第三方类库，需要由 `App ClassLoader` 加载，按照双亲委派模型，**父类加载器无法访问加载子类加载器加载的类**

解决方案：**JDK 通过线程上下文的类加载器来加载 JDBC 驱动**，打破双亲委派模型，保证了驱动被正确加载

```java
  // DriverManager 的静态代码块
  static {
      loadInitialDrivers();
  }

  // loadInitialDrivers 方法内部
  private static void loadInitialDrivers() {
      // 关键：使用线程上下文类加载器，而不是 DriverManager 自己的类加载器
      // 这个类加载器通常是 App ClassLoader
      AccessController.doPrivileged(() -> {
          ServiceLoader<Driver> sl = ServiceLoader.load(Driver.class, classLoader);
          // ...
      });
  }
```

### Tomcat 

> Tomcat 需要在一个 JVM 中运行多个 Web 应用，每个应用可能使用不同版本的相同第三方库（应用 A 使用 Spring 5，应用 B 使用 Spring 6），并且依赖的 Servlet 版本也可能不一致，按照双亲委派模型，这种运作方式是无法实现的。

所以 Tomcat 的做法是：**每个 Web 应用启动时，给他们创建一个独立的 `WebAppClassLoader`，并且在加载类的时候，优先自己加载，自己找不到再寻求父类加载器**
- 不同应用使用不同版本依赖，因为使用自己的类加载器，所以都可以正确加载
- 不同应用使用相同版本依赖，即便全限定类名一样，但是两个应用使用不同的类加载器，所以两个相同的依赖都会被先后加载

```
Tomcat 类加载器结构：
─────────────────────────────────────────────
        BootstrapClassLoader
                ↓
        ExtensionClassLoader
                ↓
        ApplicationClassLoader
                ↓
        CommonClassLoader（加载 Tomcat 公共类）
                ↓
    ┌───────────┴───────────┐
    ↓                       ↓
CatalinaClassLoader    SharedClassLoader
（加载 Tomcat 自身类）   （加载共享类）
                            ↓
                    WebAppClassLoader（每个 WebApp 一个）
                    /      |      \
                 WebApp1  WebApp2  WebApp3
                 
Tomcat 打破双亲委派的方式：
─────────────────────────────────────────────
1. WebAppClassLoader 先自己尝试加载
2. 找不到再委托给父加载器
```


## 高频面试题

### 类加载过程有多少个阶段，分别做什么事情

- 加载：读取 `.class` 文件，并创建对应的 `java.lang.Class` 对象
- 验证：校验 `.class` 文件合法性，包括文件格式、语法语义
- 准备：为类的静态变量分配内存并初始化为默认值
- 解析：为常量池的符号引用替换成直接引用
- 初始化：执行类的初始化方法 `<clinit>()`

### 准备阶段和初始化阶段对静态变量的处理有什么区别

- 准备阶段对静态变量的处理是设置各种类型默认的 0 值（比如：false、0L、null）
- 初始化阶段对静态变量的处理是根据具体的赋值语句（包括静态代码块中的赋值）进行赋值
- 例外：如果是一个静态 final 变量，那么在准备阶段就会直接设置常量值

```java
public static int value = 123;
// 准备阶段：value = 0（默认值）
// 初始化阶段：value = 123（实际值）

public static final int CONSTANT = 123;
// 准备阶段：CONSTANT = 123（编译期常量，直接赋值）
// 初始化阶段：无操作
```

### 触发类初始化的时机

- 通过 new 关键字创建实例
- 访问、修改类的静态变量
- 调用类的静态方法
- 调用 `Class.forName()` 方法时，传入的类会被初始化
- 初始化子类时，如果父类没有被初始化，那么父类会被初始化
- JVM 启动时会加载主类（包含 main 方法）

### 什么是双亲委派模型？有什么好处

双亲委派模型是：当类加载器收到需要加载类的请求时，优先寻找父类加载器，而不是自己加载；如果父类加载器无法加载，才尝试自己加载
好处：防止代码覆盖并且可以保护核心类库。比如防止用户自定义一个 `java.lang.String` 去覆盖 JDK 的 String 类

### 如何打破双亲委派模型

- 继承 ClassLoader 后，重写 `loadClass()` 方法
- 另外 Java SPI 机制（JDBC）通过当前线程上下文的 ClassLoader 来加载类
- Tomcat 为每一个 Web App 创建一个单独的 WebAppClassLoader 来独立加载自己的依赖
