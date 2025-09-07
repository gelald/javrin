---
title: Java 类加载机制
icon: note-sticky
category:

- JVM

---

# Java 类加载机制



## 类的生命周期

类的生命周期总体上包括：加载、使用、卸载；而类的加载阶段总体上分为加载、连接、初始化，而连接阶段可以细分为验证、准备、解析。

类加载的这五个阶段中，加载、验证、准备和初始化这四个阶段发生的顺序是确定的，而解析阶段则不一定，它在某些情况下可以在初始化阶段之后开始，这是为了支持Java语言的运行时绑定(也成为动态绑定或晚期绑定)。

另外注意这里的几个阶段是按顺序开始，而不是按顺序进行或完成，因为这些阶段**通常都是互相交叉地混合进行的**，通常在一个阶段执行的过程中调用或激活另一个阶段。

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220317145818.png)



### 加载

加载是类加载过程的第一个阶段，在加载阶段，JVM需要完成以下三件事

- 通过一个类的全限定类名获取其定义的**二进制字节流**
- 将这个字节流所代表的静态存储结构转化为**方法区的运行时数据结构**
- 在**堆中生成一个代表这个类的 Class 对象**，作为对方法区中这些数据的访问入口

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220317153259.png)

其中加载阶段的获取类的二进制字节流的动作是可控性最强的，因为开发人员既可以使用JVM的类加载器来完成加载，也可以自定义自己的类加载器来完成加载

加载阶段完成后，虚拟机外部的二进制字节流就按照虚拟机所需的格式存储在方法区之中，而且在Java堆中也创建一个`java.lang.Class`类的对象，这样便可以通过该对象访问方法区中的这些数据。

类加载器并不需要等到某个类被「首次主动使用」时再加载它，JVM规范允许类加载器在**预料**某个类将要被使用时就**预先加载**它，如果在预先加载的过程中遇到了class文件缺失或存在错误，类加载器必须在程序首次主动使用该类时才报告错误(LinkageError错误)如果这个类一直没有被程序主动使用，那么类加载器就不会报告错误。

加载 class 文件的方式

- 本地系统中加载
- 通过网络下载 class 文件（可能有安全性问题）
- 从 zip、jar 等压缩文件中提取 class 文件
- 将 java 源文件动态编译为 class 文件



### 连接

> 连接阶段可以细分为验证、准备、解析三个阶段

#### 验证

验证是连接阶段的第一步，这一阶段的目的是为了确保class文件的字节流中包含的信息符合当前虚拟机的要求，并且不会危害虚拟机自身的安全。验证阶段大致会完成4个阶段的检验动作

- 文件格式验证：验证字节流是否符合class文件格式的规范，如是否以 `0xCAFEBABE` 开头等
- 元数据验证：对字节码描述的信息进行语义分析，以保证其描述的信息符合Java语言规范的要求；例如: 这个类是否有除了 `java.lang.Object ` 之外的父类
- 字节码验证：通过数据流和控制流分析，确定程序语义是合法的、符合逻辑的
- 符号引用验证：确保解析动作能正确执行

其中验证阶段是很重要但却不是必须的，因为它对程序运行没有影响。如果引用的类经过反复验证，那么可以考虑采用`-Xverifynone`参数来关闭大部分的类验证措施，以缩短虚拟机类加载的时间。



#### 准备

准备阶段会为静态变量分配内存并初始化为默认值，这些内存会分配在方法区中

- 这时候进行内存分配的仅包括类变量，而不包括实例变量，实例变量会在对象实例化时随着对象一块分配在Java堆中。

- 这里所设置的初始值通常情况下是数据类型**默认的零值**(如0、0L、null、false等)，而不是被在Java代码中被显式地赋予的值。

  假设一个类变量的定义为: `public static int value = 3`；那么变量value在准备阶段过后的初始值为0，而不是3，因为这时候尚未开始执行任何Java方法，而把value赋值为3的指令是在程序编译后，存放于类构造器 `<init>()` 方法之中的，所以**把value赋值为3的动作将在初始化阶段才会执行**。

- 对于同时被 `static` 和 `final` 修饰的常量，必须在声明的时候就为其显式地赋值，否则编译时不通过；而只被 `final` 修饰的常量则既可以在声明时显式地为其赋值，也可以在类初始化时显式地为其赋值，总之，在使用前必须为其显式地赋值，系统不会为其赋予默认零值。

- 对于同时被 `static` 和 `final` 修饰的常量，那么在准备阶段变量value就会被初始化为ConstValue属性所指定的值。假设上面的类变量value被定义为:  `public static final int value = 3;` 编译时Javac将会为value生成ConstantValue属性，在准备阶段虚拟机就会根据ConstantValue的设置将value赋值为3。我们可以理解为`static final`常量在编译期就将其结果放入了调用它的类的常量池中



#### 解析

解析阶段中JVM会把常量池内的符号引用替换为直接引用。解析动作会针对类、接口、字段、类方法、接口方法、方法类型、方法句柄和调用点

符号引用：以一组符号来描述所引用的目标，符号可以是任何形式的字面量

直接引用：直接指向目标的指针、相对偏移量或一个间接定位到目标的句柄



### 初始化

初始化阶段中JVM会对类进行初始化，主要对类变量进行初始化。

#### 初始化步骤

- 假如该类还没被加载和连接，那么程序先加载并连接这个类
- 假如该类的直接父类还没有被初始化，则先初始化其直接父类
- 假如该类中有初始化语句，则系统依次执行这些初始化语句

#### 初始化时机

只有当对类主动使用的时候才会导致类的初始化，类的主动使用包括以下六种

- 通过 new 的方式创建类的实例
- 访问或修改某个类或接口的静态变量
- 调用类的静态方法
- 反射 `Class.forName("com.example.Test")`
- 初始化某个类的子类，那么这个类也会被初始化
- JVM 启动时被标明为启动类的类(Java Test)，直接使用java.exe命令来运行某个主类



## 类加载器

类加载器可以大致划分为三类

- Bootstrap ClassLoader：启动类加载器，负责加载存放在 `$JAVA_HOME/jre/lib` 目录中，或被-Xbootclasspath参数指定的路径中的，并且能被虚拟机识别的类库(如rt.jar，所有的java.*开头的类均被Bootstrap ClassLoader加载)。启动类加载器是无法被Java程序直接引用的。
- Extension ClassLoader：扩展类加载器，该加载器由 `sun.misc.Launcher$ExtClassLoader` 实现，它负责加载 `$JAVA_HOME/jre/lib/ext` 目录中，或由 java.ext.dirs 系统变量指定的路径中的所有类库(如javax.*开头的类)。开发者可以直接使用扩展类加载器。

- Application ClassLoader：应用程序类加载器，该类加载器由 `sun.misc.Launcher$AppClassLoader` 来实现，它负责加载 classpath 所指定的类。开发者可以直接使用该类加载器，如果应用程序中没有自定义过自己的类加载器，一般情况下这个就是程序中**默认**的类加载器。

> 应用程序都是由这三种类加载器互相配合进行加载的，如果有必要，我们还可以加入自定义的类加载器。因为JVM自带的ClassLoader只是懂得从本地文件系统加载标准的java class文件，因此如果编写了自己的ClassLoader，可以实现从特定场所取得class文件，如数据库和网络等

获取类加载器

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

可以证明我们可以获取 Application ClassLoader、Extension ClassLoader，但是无法获取 Bootstrap ClassLoader，因为 Bootstrap ClassLoader 是C语言实现的，找不到一个确定的返回方式，所以返回 null

> 另外值得注意的是：无论通过什么方式获取类加载器，获取的都是同一个实例，因为类加载器是唯一的



## 类加载方式

类加载有三种方式

- 启动应用时由JVM初始化加载
- 使用 `Class.forName()` 方法动态加载
- 使用 `ClassLoader.loadClass()` 方法动态加载



> Class.forName() 和 ClassLoader.loadClass() 的区别

- `ClassLoader.loadClass()`： 只干一件事情，就是将 class 文件加载到 JVM 中，只有在调用 newInstance() 方法才会去执行 static 块
- `Class.forName()`：除了将类的 class 文件加载到 JVM 中之外，还会对类进行解释，执行类中的 static 块
- `Class.forName(name, initialize, loader)`：带参方法可以控制是否加载 static 块。如果 initialize 传入 false ，只有调用了 newInstance() 方法才用去执行 static 块

```java
public class Person {
    static {
        System.out.println("静态初始化块执行了！");
    }
}

...

@Test
public void testLoadClass() throws ClassNotFoundException {
    ClassLoader loader = this.getClass().getClassLoader();
    System.out.println(loader);
    // 使用ClassLoader.loadClass()来加载类，不会执行初始化块
    loader.loadClass("com.example.demo.entity.Person");
}
// sun.misc.Launcher$AppClassLoader@18b4aac2


@Test
public void testForName() throws ClassNotFoundException {
    ClassLoader loader = this.getClass().getClassLoader();
    System.out.println(loader);
    // 使用Class.forName()来加载类，默认会执行初始化块
    Class.forName("com.example.demo.entity.Person");
}
// sun.misc.Launcher$AppClassLoader@18b4aac2
// 静态初始化块执行了！


@Test
public void testForNameNotInit() throws ClassNotFoundException {
    ClassLoader loader = this.getClass().getClassLoader();
    System.out.println(loader);
    // 使用Class.forName()来加载类，并指定initialize，初始化时不执行静态块
    Class.forName("com.example.demo.entity.Person", false, loader);
}
// sun.misc.Launcher$AppClassLoader@18b4aac2

...
```



## 类加载机制

类加载机制有以下几个特点

- 全盘负责：当一个类加载器负责加载某一个类时，该类所依赖和引用的其他类也将由该类加载器负责加载，除非显式地使用另外一个类加载器来加载

- 缓存机制：缓存机制将会保证所有加载过的类都会被缓存，当程序中需要使用某个类时，类加载器先从缓存区寻找该类，只有缓存区不存在时，系统才会读取该类对应的二进制数据，并将其转换成Class对象，存入缓存区
- **双亲委派机制**：如果一个类加载器收到了类加载的请求，它首先不会自己去尝试加载这个类，而是把请求委托给父加载器去完成，依次向上，因此，所有的类加载请求最终都应该被传递到顶层的启动类加载器中。只有当父加载器无法完成该类的加载，子加载器才会尝试自己去加载该类

其中双亲委派机制是 JVM 类加载的一个核心内容，其最大的优势是防止内存中出现多份同样的字节码

### 双亲委派机制过程

1. 当 AppClassLoader 加载一个类时，它首先不会自己去尝试加载这个类，而是把类加载请求委派给父类加载器 ExtClassLoader 去完成
2. 当 ExtClassLoader 加载一个类时，它首先不会自己去尝试加载这个类，而是把类加载请求委派给父类加载器 BootstrapClassLoader 去完成
3. 如果 BootstrapClassLoader 可以加载这个类，那么就加载；如果无法加载，如在 $JAVA_HOME/jre/lib 中没有找到这个类，就会使用 ExtClassLoader 来进行加载
4. 如果 ExtClassLoader 可以加载这个类，那么就加载；如果也无法加载，那么会使用 AppClassLoader 来加载这个类
5. 如果 AppClassLoader 可以加载这个类，那么就加载；如果也无法加载，那么会抛出异常 ClassNotFoundException



### 双亲委派具体实现

```java
public Class<?> loadClass(String name)throws ClassNotFoundException {
    return loadClass(name, false);
}

protected synchronized Class<?> loadClass(String name, boolean resolve)throws ClassNotFoundException {
    // 首先判断该类型是否已经被加载
    Class c = findLoadedClass(name);
    if (c == null) {
        //如果没有被加载，就委托给父类加载或者委派给启动类加载器加载
        try {
            if (parent != null) {
                //如果存在父类加载器，就委派给父类加载器加载
                c = parent.loadClass(name, false);
            } else {
                //如果不存在父类加载器，就检查是否是由启动类加载器加载的类，通过调用本地方法native Class findBootstrapClass(String name)
                c = findBootstrapClass0(name);
            }
        } catch (ClassNotFoundException e) {
            // 如果父类加载器和启动类加载器都不能完成加载任务，才调用自身的加载功能
            c = findClass(name);
        }
    }
    if (resolve) {
        resolveClass(c);
    }
    return c;
}

```

从加载类源码可以看到，如果我们需要自定义一个类加载器的话，需要注意两点

- 继承 ClassLoader，重写 findClass 方法即可。尽量不要重写 loadClass 方法，否则会破坏双亲委派机制
- 需要把类文件放到自定义目录下，否则会被已有的类加载器加载；并且要设置自定义类加载器的类加载根路径 `setRoot()`
