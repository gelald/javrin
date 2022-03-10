# Stream

> Stream流 是 Java8 推出的一个方便集合、数组操作的一个结构

## 概述

流式思想：集合元素的处理方案，方案就是一种函数模型。其中集合元素都没有被处理，只有当最终方法执行完了整个模型才会按照指定策略进行操作，**得益于 Lambda 表达式的延迟性**

Stream 的操作可以分为两种

- 中间操作：返回值仍然是一个流，可以继续调用 Stream 的方法
- 终端操作：终端操作会生成一个新的集合或值，操作结束后无法继续使用 Stream 的方法，每个流只能进行一次终端操作

Stream 有几个特点

- Stream 不存储数据，而是按照一定的规则对数据进行运算，一般会输出结果
- Stream 不会改变数据源，一般情况下会生成一个新的集合或值
- Stream 的中间操作具有**延迟操作**的特性，只有终端操作执行了，才会进行中间操作



## 获取流

> Stream 可以操作集合、数组，它们获取流的方式各有不同

### 集合

所有 Collection 集合都可以通过 stream 默认方法来获取流

```java
// 获取串行流
default Stream<E> stream() {
    return StreamSupport.stream(spliterator(), false);
}

// 获取并行流
default Stream<E> parallelStream() {
    return StreamSupport.stream(spliterator(), true);
}
```

### 数组

数组比较特殊，自身没有方法，需要使用 Stream 接口辅助

```java
// 方法的参数是可变参数，可以传入数组
public static<T> Stream<T> of(T... values) {
    return Arrays.stream(values);
}
```

