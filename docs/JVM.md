方法区在JVM中也是一个非常重要的区域，它与堆一样，是被 **线程共享** 的区域。 

在方法区中，存储了每个类的信息（包括类的名称、方法信息、字段信息）、静态变量、常量以及编译器编译后的代码等。









方法区域存放了所加载的类的信息（名称、修饰符等）、类中的静态变量、类中定义为final类型的常量、类中的Field信息、类中的方法信息，当开发人员在程序中通过Class对象中的getName、isInterface等方法来获取信息时，这些数据都来源于方法区域，同时方法区域也是全局共享的

在一定的条件下它也会被GC，当方法区域需要使用的内存超过其允许的大小时，会抛出OutOfMemory的错误信息







大多数 JVM 将内存区域划分为 **Method Area（Non-Heap）（方法区）** ,**Heap（堆）** , **Program Counter Register（程序计数器）** ,  **VM Stack（虚拟机栈，也有翻译成JAVA 方法栈的）,Native Method Stack** （ **本地方法栈** ），其中**Method Area** 和 **Heap** 是线程共享的 ，VM Stack，Native Method Stack 和Program Counter Register是非线程共享的。为什么分为 线程共享和非线程共享的呢?请继续往下看。

首先我们熟悉一下一个一般性的 Java 程序的工作过程。一个 Java 源程序文件，会被编译为字节码文件（以 class 为扩展名），每个java程序都需要运行在自己的JVM上，然后告知 JVM 程序的运行入口，再被 JVM 通过字节码解释器加载运行。那么程序开始运行后，都是如何涉及到各内存区域的呢？

概括地说来，JVM初始运行的时候都会分配好 **Method Area（方法区）** 和**Heap（堆）** ，而JVM 每遇到一个线程，就为其分配一个 **Program Counter Register（程序计数器）** ,  **VM Stack（虚拟机栈）和Native Method Stack （本地方法栈），** 当线程终止时，三者（虚拟机栈，本地方法栈和程序计数器）所占用的内存空间也会被释放掉。这也是为什么我把内存区域分为线程共享和非线程共享的原因，非线程共享的那三个区域的生命周期与所属线程相同，而线程共享的区域与JAVA程序运行的生命周期相同，所以这也是系统垃圾回收的场所只发生在线程共享的区域（实际上对大部分虚拟机来说知发生在Heap上）的原因。

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/007S8ZIlgy1gfsrkraosbj30x10k874x.jpg)

![JVM内存图2](https://gitee.com/ngwingbun/picgo-image/raw/master/images/007S8ZIlgy1gfsrks46l1j30hu0gbt92.jpg)







-Xmx: 最大堆大小

-Xms: 初始堆大小

-Xmn: 年轻代大小

-XXSurvivorRatio: 年轻代中Eden区与Survivor区的大小比值

一个年轻代由1个Eden区加2个Survivor区组成


![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/%E8%BF%90%E8%A1%8C%E6%97%B6%E6%95%B0%E6%8D%AE%E5%8C%BA.png)


# 堆

- 内存区域中最大的一块，**被所有线程共享**，所有的**对象实例以及数组**都要在堆上分配。
- 堆是垃圾收集器管理的主要区域。
- 从内存回收的角度来看：堆区可以细分为**新生代**和**老年代**；对新生代再细致一点的有**Eden**空间、**From Surviror**空间、**To Survivor**空间等。
- 从内存分配的角度来看：堆可以划分出多个线程私有的分配缓冲区(TLAB)
- 堆内存逻辑上连续、物理上不连续；既可以实现成固定大小，也可以在运行时动态调整：`Xms 256M` `Xmx 1024M`，其中`-X`代表它是JVM运行参数，`ms`是memory start，内存初始值，`mx`是memory max，内存最大值
- 堆内存的空间分配![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/007S8ZIlgy1gfsrksxin4j313c0m2e81.jpg)
  - 老年代占 2/3
  - 新生代占 1/3
    - Eden占 8/10
    - From Survivor占 1/10
    - To Survivor 占 1/10
  - `-XX:IntialSurvivorRatio` 新生代中Eden/Survivor空间的初始比例，默认是8
  - `-XX:NewRatio` 老年代/新生代的内存比例，默认是2
- 堆内存溢出：`OutOfMemoryError: Java heap space`
- `-XX:+HeapDumpOnOutOfMemoryError`：让JVM遇到OOM异常时，输出堆内信息

## JVM创建一个新对象的内存分配流程

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/007S8ZIlgy1gfsrktwl9jj30y50u0x6q.jpg)

1. **绝大部分对象在Eden区生成**
2. 当Eden区填满时，会触发`Young Garbage Collection`即`YGC`
3. 在Eden区实现回收的策略
   1. 没有被引用的对象直接回收，如果还存活则移送到`Survivor`区
   2. Survivor区分为s0/s1两块内存空间，每次进行YGC的时候，将存活对象复制到未使用的那块空间，然后将当前正在使用的空间完全清除，**交换两块空间的使用状态**
   3. 如果YGC要移送的对象大于Survivor区容量的上限，则直接移交给老年代
   4. 交换次数到阈值的时候晋升到老年代。`-XX:MaxTenuringThreshold`配置新生代晋升到老年代的阈值，默认是15，交换次数到达第15次，晋升老年代。

# Metaspace元空间

- **在HotSpot JVM中**，**方法区**用于存放**类(Class)**和**方法的元数据(Method)**以及**常量池**，每当一个类初次被加载时，它的元数据都会放到方法区中，该区域被**所有线程共享**

- 永久代是HotSpot虚拟机对虚拟机规范中方法区的一种实现方式，永久代中加载的类太多会导致永久代内存溢出，`OutOfMemoryError:PermGen`。因为要促进HotSpot和JRockit融合，而JRockit没有永久代，再加上JVM开发者希望这一块内存可以更灵活管理，**最终`PermGen`最终被移除，方法区移动至`Metaspace`，字符串常量池移至堆区**

- Jdk8中，类的元信息(Object)、字段、静态属性(System.in)、方法、常量(100000)等都移动到元空间区

- 元空间的本质和永久代类似，都是对 JVM 规范中方法区的实现。不过元空间与永久代之间最大的区别在于：**元空间并不在虚拟机中，而是使用本地内存**。因此，默认情况下，元空间的大小仅受本地内存限制。**而永久代虽然可以设置内存的大小，但是很难确定一个合适的大小。**因为其中的影响因素很多，比如类数量的多少、常量数量的多少等。**永久代中的元数据的位置也会随着一次full GC发生移动**，比较消耗虚拟机性能。

- 调参

  | 参数                      | 作用                                                         |
  | ------------------------- | ------------------------------------------------------------ |
  | -XX:MetaspaceSize         | 分配给Metaspace的初始大小（字节单位）                        |
  | -XX:MaxMetaspaceSize      | 分配给Metaspace的最大值，超过此值会触发**Full GC**，默认没有限制，但应该取决于系统内存的大小。**JVM会动态改变此值** |
  | -XX:MinMetaspaceFreeRatio | 在GC后，最小的Metaspace剩余空间容量的百分比，减少为分配空间所导致的垃圾收集 |
  | -XX:MaxMetaspaceFreeRatio | 在GC后，最大的Metaspace剩余空间容量的百分比，减少为释放空间所导致的垃圾收集 |

  

# Java虚拟机栈

- JVM会为**每一个线程**被**创建**时，创建一个**单独的栈**，换言之该区域是**线程私有**的，栈的生命周期和线程一样
- 所有的Java方法(非native方法)都是通过Java虚拟机栈来实现调用和执行的，当然这个过程需要堆、元空间数据的配合
- 方法需要执行则需要入栈，执行完毕之后方法需要出栈，出入栈的元素称为栈帧。**栈对应线程，栈帧对应方法**。每一个栈帧中分配多少内存基本上是在类结构确定下来时就已知的
- 在活动线程中，只有位于栈顶的栈帧才是有效。`StackOverflowError`标识**请求的栈溢出，内存耗尽**
- 在执行方法的过程中，如果出现了异常，会进行**异常回溯**，返回地址通过异常处理表确定。

## 局部变量表

- 存放**方法参数**、**方法内部定义的局部变量**的区域（存放8种基本数据类型和引用类型的引用，实例存在堆中）
- 局部变量表所需的内存空间**在编译期间完成分配**，当进入一个方法时，这个方法需要在帧中**分配多大的局部变量空间是完全确定的**，在方法运行期间**不会改变局部变量表的大小**。

## 操作栈

- 当JVM为方法创建栈帧的时候，**在栈帧中为方法创建一个操作数栈**，保证方法内指令可以完成工作
- 重要

## 动态连接

- **每个栈帧中包含一个在常量池中对当前方法的引用**，目的是支持方法调用过程的动态连接

## 方法返回地址

- 遇到`RETURN`、`IRETURN`、`ARETURN`等返回字节码指令，正常退出
- 异常退出

# 本地方法栈

- Java虚拟机栈为虚拟机执行Java方法服务，本地方法栈为虚拟机执行Native方法服务
- 本地方法栈同样会抛出`StackOverflowError`
- **该区域也是线程私有的**

# 程序计数器

- **线程私有**，可以看作是当前线程所执行的字节码的行号指示器：CPU可能交替执行A、B线程，CPU需要知道执行线程A的哪一部分指令，程序计数器会告诉CPU

# 直接内存

- 不是虚拟机运行时数据区的一部分，也不是虚拟机规范中定义的内存区域，但是这部分也会被频繁使用，也会导致`OutOfMemoryError`
- NIO引用了一种基于通道和缓冲区的IO方式，可以使用 Native 函数库直接分配堆外内存，然后通过一个存储在 Java 堆中的 DirectByteBuffer 对象作为这块内存的引用进行操作。这样能在一些场景中显著提高性能，因为**避免了在 Java 堆和 Native 堆中来回复制数据**

# Code Cache

- JVM**将其字节码存储为本机代码的区域**

- JIT是代码缓存区域的最大消费者

- 如果这一块OOM了，在日志中可以看到`OutOfMemoryError code cache`

-  

  | 选项                        | 默认值 | 描述                                  |
  | --------------------------- | ------ | ------------------------------------- |
  | PrintCodeCache              | false  | 是否在JVM退出前打印CodeCache使用情况  |
  | PrintCodeCacheOnCompilation | false  | 是否在每个方法被JIT编译后打印使用情况 |



# 垃圾回收

### 哪些内存需要回收，GC发生的内存区域

### 什么时候回收

### 如何回收

### 如何判断这个对象需要回收，GC的存活标准





## 垃圾收集器

- 串行收集器
- 并行收集器
- CMS收集器
- G1收集器



## GC的目标区域

- **堆 和 方法区**，因为运行期间才能知道会创建哪些对象，所以**内存的分配和回收都是动态的**。程序计数器、虚拟机栈、本地方法栈都是线程私有的，生命周期和线程一致。每一个栈帧分配多少内存基本上在类结构确定下来就是已知的；方法结束或线程结束，内存自然就随着回收了。所以**这几个区域的内存分配和回收都是确定的**。

## GC的存活标准

- 引用计数算法

  - 在对象头维护着一个`counter`计数器，对象被引用一次则计数器+1；若引用无效则计数器-1，当计数器为0时，就认为该对象无效了。
  - 缺陷：无法解决循环引用的问题，当循环引用的对象的计数器永远不为0，导致这些对象永远不会被释放

- 可达性分析算法

  - 从`GC Roots`为起点开始向下搜索，**当一个对象的GC Roots没有与任何`引用链`相连时**，证明该对象是`不可达对象`。
  - **GC Roots**：Java虚拟机栈中的局部变量表中引用的对象、本地方法栈中引用的对象、元空间中常量引用的对象、元空间中静态属性引用的对象
  - **引用链**：GC Roots向下搜索所经过的路径

- 引用分类，JVM在进行GC的时候对不同的引用类型有着不同的策略

  - 强引用：**只有当强引用被设为null的时候，对象才会被回收**。如果被错误地保持了强引用，如赋值给了static变量，则很长时间不会被回收

    ```java
    MyClass obj = new MyClass();
    ```

  - 软引用：**只有当JVM认为内存不足时，才会去试图回收软引用指向的对象；JVM会确保在抛出`OutOfMemoryError`之前，清理软引用指向的对象**。软引用通常用来实现内存敏感的缓存：有空闲则保留，内存不足则清理。

    ```java
    SoftReference<MyClass> weakReference = new WeakReference<>(new MyClass());
    ```

  - 弱引用：**当JVM进行垃圾回收时，无论内存是否充足，都会回收只被弱引用指向的对象**

    ```java
    WeakReference<MyClass> weakReference = new WeakReference<>(new MyClass());
    ```

  - 虚引用：一个对象是否有虚引用的存在，**完全不会对其生存时间构成影响**，也无法通过虚引用来取得一个对象实例。**被虚引用指向唯一目的就是能在这个对象被收集器回收时收到一个系统通知**

    ```java
    PhantomReference<MyClass> phantomReference = new PhantomReference(new MyClass(), new ReferenceQueue());
    ```

## GC算法

- 标记-清除算法（Mark-Sweep）
  - 优点：快速
  - 缺点：1.标记和清除这两个过程的**效率都不高**；2.**空间问题**，标记清除之后会产生大量不连续的内存碎片。**导致后面在分配大对象的时候无法找到足够大且连续的内存而不得不提前触发另一次垃圾回收**
  - ![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/007S8ZIlgy1gfsrkux7i8j30m807y74o.jpg)
- 复制算法（Copying）
  - 将可用内存按容量划分为**大小相等的两块**，每次只使用其中一块。当这一块的内存用完了，就将还**存活的对象复制到另一块上面**，并对前一块空间进行清理
  - ![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/007S8ZIlgy1gfsrkvvgwfj30m809x3z0.jpg)
  - 优点：每次都是对半区内存进行回收，分配大对象的时候也就不用考虑内存碎片的问题
  - 缺点：**可用内存缩小了一半**
  - 这种算法一般用在**新生代**
- 标记-整理算法（Mark-Compact）
  - **标记过程和标记-清除算法一样**，但是后续是让所有存活对象都向一端移动，然后**清理掉端边界以外的可回收对象**
  - ![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/007S8ZIlgy1gfsrkwtbdpj30m80bpjs2.jpg)
  - 主要用于老年代
- 分代收集算法
  - 新生代：复制算法
  - 老年代：标记-清除算法、标记-整理算法
  - **先有分代收集算法，才会将堆分成新生代和老年代**

## GC术语

- **部分收集(Partial GC)**：目标不是完整收集整个Java堆的垃圾收集
  - **新生代收集(Minor GC/Young GC/YGC)**：新生代的垃圾收集
  - **老年代收集(Major GC/Old GC/OGC)**：老年代的垃圾收集，**目前只有GMS收集器会有单独收集老年代的行为**
  - **混合收集(Mixed GC)**：收集整个新生代以及部分老年代的垃圾收集，**目前只有G1收集器会有这种行为**
- **整堆收集(Full GC)**：收集整个Java堆和方法区的垃圾收集
- **并行(Parallel)**：并行阶段是由多个GC 线程执行
- **串行(Serial)**：串行阶段在单个GC线程上执行
- **STW(Stop The World)**：在Stop The World阶段，应用程序被暂停，以便GC线程执行其工作。当应用程序因为GC暂停时，通常是由于Stop The World阶段
- **并发(Concurrent)**：应用程序线程和垃圾收集器线程交替执行
- **增量**：

## 垃圾收集器

