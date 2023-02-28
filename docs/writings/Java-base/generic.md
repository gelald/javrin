---
title: 泛型机制
icon: article
category:

- Java基础

tag:

- 框架基础

---

# 泛型机制

> 泛型的本质是为了参数化类型（在不创建新的类型的情况下，通过泛型指定的不同类型来控制形参具体限制的类型）。也就是说在泛型使用过程中，操作的数据类型被指定为一个参数，这种参数类型可以用在类、接口和方法中，分别被称为泛型类、泛型接口、泛型方法。



## 优点

适用于多种数据类型执行相同的代码，使用一个泛型封装所有相同的逻辑

```java
private static int add(int a, int b) {
    System.out.println(a + "+" + b + "=" + (a + b));
    return a + b;
}

private static float add(float a, float b) {
    System.out.println(a + "+" + b + "=" + (a + b));
    return a + b;
}

private static double add(double a, double b) {
    System.out.println(a + "+" + b + "=" + (a + b));
    return a + b;
}
```

可以看到，每一种类型都要写一份相同的代码，我们可以通过泛型进行逻辑封装

```java
private static <T extends Number> double add(T a, T b) {
    System.out.println(a + "+" + b + "=" + (a.doubleValue() + b.doubleValue()));
    return a.doubleValue() + b.doubleValue();
}
```



泛型中的类型在使用时指定，不需要强制类型转换（**类型安全**，编译器会**检查类型**）

```java
List list = new ArrayList();
list.add("xxString");
list.add(100d);
list.add(new Person());
```

可以看到集合中放了多种类型的数据，使用的时候很可能需要进行强制类型转换，甚至有转换失败的异常。如果我们在定义集合的时候就已经定义了这个集合中使用的类型，那么使用起来就方便许多，拿到集合中的元素可以直接使用 String 的方法

```java
List<String> list = new ArrayList<String>();
```



## 泛型的上下限

> 为了解决泛型中隐含的转换问题，Java泛型加入了类型参数的上下边界机制。`<? extends A>`表示该类型参数可以是A(上边界)或者A的子类类型。编译时擦除到类型A，即用A类型代替类型参数。这种方法可以解决开始遇到的问题，编译器知道类型参数的范围，如果传入的实例类型B是在这个范围内的话允许转换，这时只要一次类型转换就可以了，运行时会把对象当做A的实例看待。

```java
public class A {
    
}
////////////////
public class B extends A {
    
}
///////////////
public class C {
    
}

///////////////

public static void fun1(List<? extends A> listA) {
    // ...          
}
public static void fun2(List<B> listB) {
    funC(listB); // OK
    // ...             
}

```



泛型上下限的用法

```java
<?> 无限制通配符
<? extends E> extends 关键字声明了类型的上界，表示参数化的类型可能是所指定的类型，或者是此类型的子类
<? super E> super 关键字声明了类型的下界，表示参数化的类型可能是指定的类型，或者是此类型的父类
```



## 深入理解泛型

> 了解泛型基本用途以后，深入泛型背后的泛型擦除及相关问题来加深对泛型的理解

### 泛型擦除

由于泛型这个概念并不是从一开始就提出来的， Java 设计人员需要考虑向前兼容的问题，因此 Java 的泛型其实是一种伪泛型。简单来说就是只在语法上支持泛型，在编译的期间会进行类型擦除，将所有泛型表示的内容都替换成具体的类型，就像没有泛型一样。

泛型擦除的原则

- 消除类型参数声明，即删除 `<>` 及其包围的部分。
- 根据类型参数的上下界推断并替换所有的类型参数为原生态类型：如果类型参数是无限制通配符或没有上下界限定则替换为Object，如果存在上下界限定则根据子类替换原则取类型参数的最左边限定类型（即父类）。
- 为了保证类型安全，必要时插入强制类型转换代码。
- 自动产生“桥接方法”以保证擦除类型后的代码仍然具有泛型的“多态性”。

泛型擦除的场景：

- 无限制类型

  `<T>`、`<?>` 这种是一般的泛型情况，没有限制泛型的类型，擦除时直接把泛型替换成 Object 类型

  ```java
  public class Test<T> {
      private T value;
      
      public T getValue() {
          return value;
      }
  }
  ///// 泛型擦除后
  public class Test {
      private Object value;
      
      public Object getValue() {
          return value;
      }
  }
  ```

- 存在上下界的泛型

  形如 `<T extends List>` 有上界的泛型，在擦除时会直接取“界限”的类型

  形如 `<T super ArrayList>`  有下界的泛型，在擦除时会直接取 Object 作为类型

  ```java
  public class Test<T extends List> {
      private T value;
      
      public T getValue() {
          return value;
      }
  }
  ///// 泛型擦除后
  public class Test {
      private List value;
      
      public List getValue() {
          return value;
      }
  }
  
  
  public class Test<T super ArrayList> {
      private T value;
      
      public T getValue() {
          return value;
      }
  }
  ///// 泛型擦除后
  public class Test {
      private Object value;
      
      public Object getValue() {
          return value;
      }
  }
  ```



现在我们可以回答一个问题了：为什么基本数据类型不可以用于泛型？

> 因为泛型擦除机制，编译后的类型会使用泛型的原始类型，包装类型的原始类型是 Object ，基本数据类型没有原始类型，所以会报错。



### 编译检查

虽然泛型在编译期会进行泛型擦除，但是指定泛型会在开发时提供一定的帮助。因为在具体运行时，泛型已经被擦除为原始类型，使用其中的方法时，必然伴随着强制类型转换，如果这个对象本不是这个类型的，强转就会有类型转换的异常。所以使用泛型后，在编译时就会发现问题，有效地把运行期的问题提前到编译期。

```java
ArrayList<String> list = new ArrayList<>();  
list.add("100");  
list.add(123); // 编译错误
```

