---
title: Stream 流式处理
icon: article
category:

- Java集合

---

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

> Stream 可以操作集合、数组，而它们获取流的方式各有不同

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

数组比较特殊，自身没有方法，需要使用辅助

使用 Stream 的静态方法

```java
// 方法的参数是可变参数，可以传入数组
public static<T> Stream<T> of(T... values) {
    return Arrays.stream(values);
}
```

使用 Arrays 的静态方法

```java
public static <T> Stream<T> stream(T[] array) {
    return stream(array, 0, array.length);
}
```



### 流的分类

- stream 是串行流，由主线程按顺序都流执行操作

- parallelStream 是并行流，内部是以多线程并行的方式对流进行操作。如果流中的数据量足够大，并行流可以加快处理速度。但是数据量少的情况下使用并行流线程切换的开销相对处理数据的时间更多



## 方法使用

> 接下来使用各种案例来演示方法的使用

下面是案例使用的员工类

```java
@Data
@AllArgsConstructor
public class Person {
    private String name;  	// 姓名
    private int salary; 	// 薪资
    private int age; 		// 年龄
    private String sex; 	// 性别
    private String area;  	// 地区
}
```



### 遍历（foreach）

Stream 也支持类似集合的遍历

```java
List<Integer> list = Arrays.asList(6, 7, 3, 8, 1, 2, 9);

// 遍历打印元素
list.stream().forEach(System.out::println);
```



### 筛选（filter）

筛选，是按照一定的规则校验流中的元素，将符合条件的元素提取到新的流中的操作。

```java
List<Integer> list = Arrays.asList(6, 7, 3, 8, 1, 2, 9);

// 遍历输出符合条件的元素
list.stream().filter(x -> x > 7).forEach(System.out::println);
```



### 匹配（find/match）

匹配往往可以搭配着筛选来使用

```java
List<Integer> list = Arrays.asList(7, 6, 9, 3, 8, 2, 1);

// 匹配第一个
Optional<Integer> findFirst = list.stream().filter(x -> x > 6).findFirst();
// 匹配任意（适用于并行流）
Optional<Integer> findAny = list.parallelStream().filter(x -> x > 6).findAny();
// 是否包含符合特定条件的元素
boolean anyMatch = list.stream().anyMatch(x -> x > 6);

System.out.println("匹配第一个值：" + findFirst.get());
System.out.println("匹配任意一个值：" + findAny.get());
System.out.println("是否存在大于6的值：" + anyMatch);
```



### 聚合（max/min/count）

Stream 提供了类似 MySQL 的数据统计功能，极大地方便了对集合、数组进行数据统计的工作

```java
List<String> list1 = Arrays.asList("adnm", "admmt", "pot", "xbangd", "weoujgsd");
List<Integer> list2 = Arrays.asList(7, 6, 9, 4, 11, 6);

// 获取集合中长度最长的字符串
Optional<String> max = list1.stream().max(Comparator.comparing(String::length));
System.out.println("最长的字符串：" + max.get());
// 获取集合中数值最小的元素
Optional<Integer> min = list2.stream().min(Integer::compareTo);
System.out.println("最小的元素：" + min.get());
// 获取集合中大于6的元素个数
long count = list2.stream().filter(x -> x > 6).count();
System.out.println("list中大于6的元素个数：" + count);
```



### 归约（reduce）

归约也称缩减，就是把一个流缩减成一个值，方便对求和、求积和求最值

```java
List<Integer> list = Arrays.asList(1, 3, 2, 8, 11, 4);

// 求和方式
Optional<Integer> sum = list.stream().reduce(Integer::sum);
// 求乘积
Optional<Integer> product = list.stream().reduce((x, y) -> x * y);
// 求最大值方式
Optional<Integer> max = list.stream().reduce((x, y) -> x > y ? x : y);
System.out.println("list求和：" + sum.get());
System.out.println("list求积：" + product.get());
System.out.println("list求和：" + max.get());
```



### 映射（map/flatMap）

映射，就是将一个流按照一定的规则映射到另一个流中

map：接收一个方法作为参数，这个方法会被应用到每一个元素上，并将其映射成一个新的元素

```java
String[] strArr = { "abcd", "bcdd", "defde", "fTr" };
// 每一个元素大写
List<String> strList = Arrays.stream(strArr).map(String::toUpperCase).collect(Collectors.toList());
System.out.println("每个元素大写：" + strList);
```

flatMap：接收一个方法作为参数，将每一个元素都换成另一个流，然后把所有流连接成一个流

```java
List<String> list = Arrays.asList("m、k、l、a", "1、3、5、7");
List<String> listNew = list.stream().flatMap(s -> {
    // 将每个元素转换成一个stream
    String[] split = s.split("、");
    return Arrays.stream(split);
}).collect(Collectors.toList());

System.out.println("处理前的集合：" + list);
// 处理前的集合：[m、k、l、a, 1、3、5、7]
System.out.println("处理后的集合：" + listNew);
// 处理后的集合：[m, k, l, a, 1, 3, 5, 7]
```



### 收集（collect）

> 收集，就是把一个流收集起来，可以收集成一个值也可以形成一个新的集合

收集的功能过于丰富，逐一演示



#### 归集（toList/toSet/toMap）

因为流不存储数据，那么在流中的数据完成处理后，需要将流中的数据重新归集到新的集合里

```java
List<Integer> list = Arrays.asList(1, 6, 3, 4, 6, 7, 9, 6, 20);
// 提取偶数元素
List<Integer> listNew = list.stream().filter(x -> x % 2 == 0).collect(Collectors.toList());
Set<Integer> set = list.stream().filter(x -> x % 2 == 0).collect(Collectors.toSet());

System.out.println("toList:" + listNew);
System.out.println("toSet:" + set);



List<Person> personList = new ArrayList<Person>();
personList.add(new Person("Tom", 8900, 23, "male", "New York"));
personList.add(new Person("Jack", 7000, 25, "male", "Washington"));
personList.add(new Person("Lily", 7800, 21, "female", "Washington"));
personList.add(new Person("Anni", 8200, 24, "female", "New York"));
// 提取工资大于8000的员工，收集成员工名->员工的形式
Map<?, Person> map = personList.stream().filter(p -> p.getSalary() > 8000).collect(Collectors.toMap(Person::getName, p -> p));

System.out.println("toMap:" + map);
```



#### 统计（count/averagin）

Collectors 提供了一系列用于数据统计的静态方法

```java
List<Person> personList = new ArrayList<Person>();
personList.add(new Person("Tom", 8900, 23, "male", "New York"));
personList.add(new Person("Jack", 7000, 25, "male", "Washington"));
personList.add(new Person("Lily", 7800, 21, "female", "Washington"));

// 求平均工资
Double average = personList.stream().collect(Collectors.averagingDouble(Person::getSalary));
// 一次性统计所有信息
DoubleSummaryStatistics collect = personList.stream().collect(Collectors.summarizingDouble(Person::getSalary));

System.out.println("员工平均工资：" + average);
// 员工平均工资：7900.0
System.out.println("员工工资所有统计：" + collect);
// 员工工资所有统计：DoubleSummaryStatistics{count=3, sum=23700.000000, min=7000.000000, average=7900.000000, max=8900.000000}
```



#### 分组（partitioningBy/groupingBy）

partitioningBy：按条件分组，符合的一组，不符合的另一组

groupingBy：自定义分组，自定义键值对

```java
List<Person> personList = new ArrayList<Person>();
personList.add(new Person("Tom", 8900, 28, "male", "New York"));
personList.add(new Person("Jack", 7000, 57,"male", "Washington"));
personList.add(new Person("Lily", 7800, 19,"female", "Washington"));
personList.add(new Person("Anni", 8200, 35,"female", "New York"));
personList.add(new Person("Owen", 9500, 43,"male", "New York"));
personList.add(new Person("Alisa", 7900, 26,"female", "New York"));

// 将员工按薪资是否高于8000分组
Map<Boolean, List<Person>> part = personList.stream().collect(Collectors.partitioningBy(x -> x.getSalary() > 8000));
// 将员工按性别分组
Map<String, List<Person>> group = personList.stream().collect(Collectors.groupingBy(Person::getSex));

System.out.println("员工按薪资是否大于8000分组情况：" + part);
// false: [], true: []
System.out.println("员工按性别分组情况：" + group);
// male: [], female: []
```



#### 接合（joining）

接合就是使用特定的连接符将 Stream 中的元素连接起来

```java
List<String> list = Arrays.asList("A", "B", "C");
String string = list.stream().collect(Collectors.joining("-"));
System.out.println("拼接后的字符串：" + string);
// A-B-C
```



### 排序（sorted）

sorted()：自然排序，流中元素的类型需要实现 Comparable 接口

sorted(Comparator com)：实现一个排序器自定义排序

```java
List<Integer> list = Arrays.asList(9000, 8900, 9000, 9600, 8800);

// 使用Integer的自然排序方式
List<Integer> sortedList = list.stream().sorted().collect(Collectors.toList());
System.out.println("使用Integer的自然排序方式：" + sortedList);
// 使用Integer的自然排序方式：[8800, 8900, 9000, 9000, 9600]

List<Person> personList = new ArrayList<>();
personList.add(new Person("Sherry", 9000, 24, "female", "New York"));
personList.add(new Person("Tom", 8900, 22, "male", "Washington"));
personList.add(new Person("Jack", 9000, 25, "male", "Washington"));
personList.add(new Person("Lily", 8800, 26, "male", "New York"));
personList.add(new Person("Alisa", 9000, 26, "female", "New York"));

// 先按工资降序排序，如果工资相同再按年龄降序排序
List<String> newList = personList.stream().sorted((p1, p2) -> {
    if (p1.getSalary() == p2.getSalary()) {
        return p2.getAge() - p1.getAge();
    } else {
        return p2.getSalary() - p1.getSalary();
    }
}).map(Person::getName).collect(Collectors.toList());
System.out.println("先按工资降序排序，如果工资相同再按年龄降序排序：" + newList);
// 先按工资降序排序，如果工资相同再按年龄降序排序：[Alisa, Jack, Sherry, Tom, Lily]
```



### 组合（concat）

可以把两个流组合起来，形成一个新的流

```java
List<String> list1 = Arrays.asList("a", "b", "c", "d");
List<String> list2 = Arrays.asList("d", "e", "f", "g");
Stream<String> stream1 = list1.stream();
Stream<String> stream2 = list2.stream();
// concat:合并两个流
List<String> newList = Stream.concat(stream1, stream2).distinct().collect(Collectors.toList());
System.out.println("流合并：" + newList);
// 流合并：[a, b, c, d, e, f, g]
```



### 提取（skip/limit）

流可以对其中的元素进行去跳过、限制等操作

```java
List<String> list = Arrays.asList("a", "b", "c", "d", "d", "e", "f", "g");
// limit：限制从流中获得前n个数据
List<String> collect1 = list.stream().limit(5).collect(Collectors.toList());
// skip：跳过前n个数据
List<String> collect2 = list.stream().skip(3).limit(4).collect(Collectors.toList());

System.out.println("limit：" + collect1);
// limit：[a, b, c, d, d]
System.out.println("skip：" + collect2);
// skip：[d, d, e, f]
```

