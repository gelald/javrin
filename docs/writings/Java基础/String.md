# String

> 为 String 单独拆分一个模块出来，可以看出 String 的特殊性及重要性。此外 String 也是面试题的「常客」。

## 不可变

String 类型最大的特点就是不可变，因为内部是使用一个被 `final` 关键字修饰的 `char[]` 存储数据，初始化后就不能引用其他数组，并且内部没有改变这个数组的方法，因此它是不可变的。

```java
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {
    /** The value is used for character storage. */
    private final char value[];
```

不可变的优点：

- 可以用于 `HashMap` 中的 key 。因为作为 key 是需要使用 hashcode 的，而 String 类型数据不可变，所以 hashcode 不需要重新计算，效率更高。

- 可以使用常量池的设计。如果一个字符串已经被创建过了，那么就会从 String 常量池中取得引用。
- 安全性。不可变让它具备线程安全的特点，可以在多个线程中使用。再比如可以作为类的全限定类名，在框架中往往大量使用反射，如果这个字符串是可以改变的，那么就无法使用反射的特性。



## 创建

String 类型的数据常用的创建方式有两种

- 构造方法创建
- 通过字面量创建

两种方式的区别是

- 构造方法创建每次都会在堆中创建一个新的对象，无论两个字符串内容是否相同
- 通过字面量创建的话，第一次创建会把字符串对象放在常量池中，下一次再创建相同内容的字符串时会引用常量池中相同的对象

我们通过一个小例子来感受一下两种创建方式的区别

```java
String a = new String("123");
String b = new String("123");
System.out.println(a == b);		// false

String a = "123";
String b = "123";
System.out.println(a == b);		// true
```

其中字面量创建还可以和编译器优化碰撞新的火花

> String s = "123" + "456"内存中产生几个字符串对象?
>
> 由于等号右边都是常量的运算，所以编译器在编译的时候会进行优化。把"123"、"456"拼接成"123456"，如果此时常量池中没有"123456"，则产生1个，如果有，则产生0个。



## 方法

> 关于 String 的方法有很多，这里简单介绍一些值得注意的

### boolean equals(Object object)

这是比较两个字符串的内容是否一样的方法，通过比较底层数组中的每一个字符是否相等。

值得注意的是：一般推荐把能确定的非空字符串甚至是常量写在方法左边，这样可以有效避免空指针异常。

### String concat(String str)

拼接字符串，返回新字符串。

### String substring(int begin, int end)

以一个左闭右开的区间截断字符串，返回新字符串。

这两个方法重点不是介绍功能，而是因为 String 是不可变的，所以每一次对 String 进行一些内容上的增减操作时，都会返回一个新的 String ，保证了 String 的不可变的特点。

### native String intern()

着重讲一下这个方法，这个方法把字符串对象放到常量池中并返回它的引用。

我们通过一个小例子来演示这个方法的功能

```java
String s1 = new String("aaa");
String s2 = "aaa";
System.out.println(s1 == s2);	// false
String s3 = s1.intern();
System.out.println(s3 == s2);  	// true
```

讲讲这个过程到底发生了什么事情

1. s1 采用构造方法的方式创建了一个字符串对象，这个对象是在堆上的；s2 采用字面量的方式创建了一个字符串对象，这个对象是在字符串常量池中的。

2. 所以当判断 s1 == s2 的时候，结果自然是 false 的，因为这两个对象不是同一个对象。
3. s3 使用 intern 方法获得了一个字符串对象，这个 intern 方法具体是先把 s1 引用的对象放到字符串常量池中，然后返回这个对象的引用。
4. 但是现在 "aaa" 这个字符串在字符串常量池中已存在，所以使用了同一个对象，所以判断 s3 == s2 的时候，结果自然是 true 的。



## StringBuilder 和 StringBuffer

> 介绍完 String，接下来介绍一下它的两个「兄弟」类型

可以把它们看成是长度可以变化的字符串，也就是没有 String 的不可变的特性。

现在从各个角度对比一下 String、StringBuilder、StringBuffer

- 可变性：String 是不可变的；StringBuilder 和 StringBuffer 是可变的。原因：String 底层的字符数组是被 final 修饰的，一旦赋值不可以修改;而 StringBuilder 和 StringBuffer 的都没有。

- 线程安全性：String 是不可变的，多个线程可以共享同一个 String，所以是线程安全的；StringBuffer 的方法中加了同步锁，所以是线程安全的；StringBuilder 没有加锁，是线程不安全的。
- 性能方面：StringBuffer 加了锁，导致性能变差；StringBuilder 没有加锁，性能相对来说比较好；String 每次都会生成新的对象，性能更差一点。StringBuffer 和 StringBuilder 都不会生成新的对象，所以比 String 来说效率更高。
- 从使用场景来说：操作少量数据使用 String；单线程操作大量数据使用 StringBuilder；多线程操作大量数据使用 StringBuffer。