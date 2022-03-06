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



## hashcode

