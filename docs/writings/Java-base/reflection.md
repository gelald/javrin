---
title: 反射机制
icon: article
category:

- Java基础

tag:

- 框架基础

---

# 反射机制

> Java 中的反射机制是指动态获取的信息以及动态调用对象的方法的功能。在运行中对于任意一个类，都能知道这个类所有的属性和方法；任意一个对象，都能调用它的方法和属性。

## Java 代码经历的三个阶段

1. Source 源代码阶段。这个阶段还是 class 文件，存放着开发人员编写好并编译后的 Java 代码。
2. Class 类对象阶段。类加载器 ClassLoader 加载 class 文件，使其成为一个 Class 类对象，可以访问到这个类的成员变量、成员方法等。
3. RunTime 运行阶段。通过 `类 对象名 = new 类()` 的方式创建出来。



## Class 类

Class 类与 `class` 关键字不同，Class 是一个类型。

一个类有：成员变量、方法、构造方法、包等等信息，利用反射技术可以对一个类进行解剖，把个个组成部分映射成一个个对象，而把这些对象组织起来的类就是 Class 类。



## 反射的使用

### 获取 Class 对象

在类加载的时候，JVM会根据 class 文件创建一个 Class 对象

获取 Class 对象一般有三种方式

```java
// 源码阶段
// 将字节码文件加载进内存，返回Class对象
// 常用于配置文件，将全类名定义在配置文件中
Class.forName("全类名");

// Class对象阶段
// 通过类名的class属性来获取Class对象
// 多用于参数的传递
类名.class; 

// RunTime阶段
// 通过父类Object中的getClass方法获取Class对象
对象.getClass(); 
```

需要注意的是

> 同一个字节码文件在一次程序中只会被加载一次，**不论通过哪一种方式获取的Class对象都是同一个**



### 获取构造方法

```java
// 获取所有public构造方法
Constructor<?>[] getConstructors();
// 根据构造方法的参数类型所对应的类去获取特定的public构造方法
Constructor<T> getConstructor(Class<?>... parameterTypes);

// 获取所有构造方法
Constructor<?>[] getDeclaredConstructors();
// 根据构造方法的参数类型所对应的类去获取特定的构造方法
Constructor<T> getDeclaredConstructor(Class<?>... parameterTypes);
```



### 创建对象

```java
// 根据构造方法的参数列表传入指定参数，创建一个对象
T newInstance(Object... args);
```



### 获取成员方法

```java
// 获取所有public成员方法(除了自己的publib方法，还包含父类/Object类中的public方法)
Method[] getMethods();
// 根据方法名和成员方法的参数类型所对应的类去获取特定的public成员方法
Method getMethod(String name, Class<?>... parameterTypes);

// 获取所有成员方法
Method[] getDeclaredMethods();
// 根据方法名和成员方法的参数类型所对应的类去获取特定的成员方法
Method getDeclaredMethod(String name, Class<?>... parameterTypes);
```

需要注意!!

如果使用 `getDeclaredMethods()` 这种忽略修饰符的获取方式，后续的使用之前需要执行这一句

`method.setAccessible(true)` 

这样使用的过程中也同样忽略修饰符，才能正常使用。俗称暴力反射。

获取成员方法后调用

```java
// 根据Method对象中的参数列表的类型，传入指定类型的参数，同时传入对象，需要确定执行哪个对象的方法
Object invoke(Object obj, Object... args)
```



### 获取成员变量

```java
// 获取所有由public修饰的成员变量
Field[] getFields();
// 获取指定的由public修饰的成员变量
Field getField(String name);

// 获取所有成员变量，不考虑修饰符
Field[] getDeclaredFields();
// 获取指定的成员变量
Field getDeclaredField(String name);
```

获取成员变量后的操作

```java
// 为这个变量赋值
void set(Object obj, Object value);
// 获取这个变量的值
Object get(Object obj);
```



## 优点

- 可以在程序运行过程中，操作成员变量、成员方法、构造方法等对象
- 可以解耦，提高程序的可扩展性、灵活性

## 缺点

- 反射创建对象要比正常创建对象效率要低，因为JVM无法对这些代码进行优化，性能会有一定的损耗
- 破坏类的封装性，因为反射可以忽略修饰符进行访问，这样就失去了修饰符的意义，甚至还可能有安全问题

## 结合优点缺点的一点思考

反射是一把双刃剑。

在运行期能获取类的信息这无疑是一个巨大的解耦操作，许多优秀的框架正是很好地使用了这个特性，如：Spring框架，为开发带来了许多便利。

但同时其暴力访问的特点为程序留下一定的隐患，如果使用不当会导致难以通过程序追溯bug的起因。

而且反射类及反射方法的获取，都是通过从列表中搜寻查找匹配的方法，所以查找性能会随类的大小方法多少而变化。

所以一般开发的过程中尽量少用，学习反射更多的是协助我们理解那些优秀框架的原理～