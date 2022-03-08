# Object

> Object 是 Java 所有类的最顶层的父类，它的地位不言而喻，有必要研究一番～

这里先主要介绍一下 Object 一些经典的方法，关于它的其他研究，放在后面

## native

开始学习 Object 的方法前，先了解一下 native 关键字

native 关键字用于修饰方法，native 意为原生的，那么原生的方法代表什么意思呢？

> 其实被 native 修饰的方法含义就是交给我们的操作系统来实现这个方法，换言之在程序中这个方法是没有方法体的。

native 方法一般都是出现在 Java 源码中，但其实我们可以自定义，不过我们一般不这么做，而且实现起来也有一定的门槛，作为了解即可。

## equals

equals 方法是用于比较两个对象

默认是比较两个对象的地址指是否相同，和使用 == 比较两个对象作用是一样的

```java
public boolean equals(Object obj) {
    return (this == obj);
}
```

但是在很多类中都会对 equals 方法进行重写，为的实现比较两个对象中的内容是否一样，比较地址值再使用 == 来完成

Integer，equals 方法比较的是两个对象中底层的 int 值是否相等

```java
public boolean equals(Object obj) {
    if (obj instanceof Integer) {
        return value == ((Integer)obj).intValue();
    }
    return false;
}
```

String，equals 方法是对对象中的字符数组进行逐一字符相等判断

```java
public boolean equals(Object anObject) {
    if (this == anObject) {
        return true;
    }
    if (anObject instanceof String) {
        String anotherString = (String)anObject;
        int n = value.length;
        if (n == anotherString.value.length) {
            char v1[] = value;
            char v2[] = anotherString.value;
            int i = 0;
            while (n-- != 0) {
                if (v1[i] != v2[i])
                    return false;
                i++;
            }
            return true;
        }
    }
    return false;
}
```

实际上在开发中，我们也会有重写 equals 方法的场景，那么重写 equals 方法，需要的是

1. 使用 `==` 来检查实参是否为对象的一个引用，如果是，返回 `false`
2. 使用 `isinstanceof` 来检查实参是否为正确的类型（和我同一个类型），如果不是，返回 `false`
3. 把参数进行强制类型转换，转换成同一个类型
4. 检查实参中的域与当前对象中对应的域值是否匹配
   1. 除去 `float`、`double` 的基本数据类型，可以使用 `==` 进行比较
   2. `float` 类型使用 `Float.floatToIntBits` 转换成 `int` 类型的值，然后使用 `==` 操作符比较值
   3. `double` 类型使用 `Double.doubleToLongBits` 转换成 `long` 类型的值，然后使用 `==` 操作符比较值
   4. 引用类型，可以递归调用这个类型的 `equals` 方法
5. 完成以上步骤后，需要再考虑几个问题
   1. 是否有自反性
   2. 是否有传递性
   3. 是否有一致性



## hashCode

返回这个对象的哈希值（由操作系统给出一个整数值）

一般重写 equals 方法的时候，都会重写 hashCode 方法，目的是为了保证两个等价的对象哈希值也相等。因为在某些场景下，我们希望如果两个对象从内容上看是相等的（是等价的），那么它们拥有同一个哈希值。

```java
String s1 = new String("hello");
String s2 = new String("hello");

System.out.println(s1.equals(s2));	// true
System.out.println(s1.hashCode() == s2.hashCode());  // true
System.out.println(s1 == s2);  // false

Set<String> a = new HashSet<>();
a.add(s1);
a.add(s2);
System.out.println(a); // hello
```

比如在 HashSet 中，内容同为 hello 的字符串保证只能被添加一次。

> 可以这么理解：equals 为了让开发者知道两个对象等价；hashCode 为了让程序知道两个对象等价

两个对象用 equals 方法判定后相等，则它们的 hashCode 一定相等。但 hashCode 相等的情况下，equals 方法判定不一定相等。因为有可能存在哈希冲突等问题。



## toString

这个方法一般用于输出对象的信息

默认是 类名+@+hasCode的16进制值 的形式



## clone

这个方法用于从原对象中拷贝一个新对象出来

值得注意的是：

- clone 方法在 Object 类中使用 `protected` 修饰，一个类如果不显式地重写 clone 方法，那么在其他类中就无法直接调用这个对象的 clone 方法
- 重写 clone 方法的时候需要实现 Cloneable 接口

拷贝往往伴随着浅拷贝、深拷贝这个话题

### 浅拷贝

拷贝对象的基本数据类型及其包装类型和 String 类型克隆后修改不影响原始对象

引用类型修改后会影响原始对象，存在被覆盖的风险，因为引用的是同一个对象

方式：通过调用父类的 clone 方法

### 深拷贝

拷贝对象中所有属性包括引用类型的属性都被彻底地复制了一份新的出来，修改后都不影响原始对象

方式：通过转成字节流后再转换成对象

