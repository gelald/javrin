---
title: Lambda 表达式与函数式编程
icon: article
category:

- Java基础

---

# Lambda 表达式与函数式编程

> Lambda 表达式和函数式接口都是 Java 8 的新特性，二者的有效结合形成了一个高级用法：函数式编程



## Lambda 表达式

>Lambda 允许把函数作为一个方法的参数（函数作为参数传递进方法中）。使用 Lambda 表达式可以使代码变的更加简洁紧凑。



### 更优雅地使用函数式接口

当函数式接口作为一个方法地参数时，基于面向对象的知识，我们需要在方法的参数列表中新建一个匿名内部类，然后重写方法。

如果使用 Lambda 表达式，可以传入形如 `() -> {}` 这样的方法，作为这个接口类型的参数，更优雅简洁，并且无需加载这个内部类的 class 文件



### Lambda 延迟执行

> 有些场景的代码执行后，结果不一定会被使用，从而造成性能浪费。而Lambda表达式是延迟执行的，这正好可以作为解决方案，提升性能。

我们不妨用一个小例子引入

> 日志可以协助我们记录程序运行情况，记录下各种信息，在bug出现的时候可以帮助我们快速定位问题，以便项目监控和优化。
>
> 这里有一个特殊的场景，我们拼接字符串之后，在满足条件后才进行输出打印

```java
public class LoggerDemo {
    private static void log(int level, String msg) {
    	// 条件判断
        if (level == 1) {
            System.out.println(msg);
        }
    }

    public static void main(String[] args) {
        String msg1 = "Java";
        String msg2 = "Python";
        String msg3 = "Go";
        // 方法调用，必须提前拼接字符串造成性能浪费
        log(1, msgA + msgB + msgC);
    }
}
```

无论 level 是否满足，log 方法的第二个参数无论如何都会先完成拼接，然后再进行方法内进行判断 (level == 1)

- 如果判断通过，这种情况没有产生影响

- 如果判断不通过，那么在进入方法之前三个字符串的拼接操作是白做了的，花在拼接字符串上的时间白白浪费了，造成了性能浪费

Lambda 表达式的出现，能有效解决这种浪费性能的场景

```java
public class LoggerDemo {
    private static void log(int level, MessageBuilder builder) {
        if (level == 1) {
            System.out.println(builder.buildMessage());
        }
    }
    public static void main(String[] args) {
        String msgA = "Hello";
        String msgB = "World";
        String msgC = "Java";
        long start = System.currentTimeMillis();
        // 条件不通过的情况
        log(2, () -> {
            System.out.println("Lambda执行！");
            return msgA + msgB + msgC;
        });
        long end = System.currentTimeMillis();
        System.out.println("未延迟执行花费时间:"+(end-start));
    }
}

// 下面这个是函数式接口，方便lambda表达式的使用。
@FunctionalInterface
interface MessageBuilder {
    String buildMessage();
}
```

经测试

- 不使用 Lambda 表达式无论条件是否通过花费平均时间是 48ms
- 使用 Lambda 表达式条件通过的情况下花费平均时间是 49ms
- 使用 Lambda 表达式条件不通过的情况下花费平均时间是 20ms

可以发现，使用 Lambda 表达式当条件通过后和原来比不影响，但是条件不通过时花费的时间直接折半了。因为进入 log 方法时，builder 还是一个内部类的形式，只有调用 buildMessage 方法才会进行字符串拼接。可见使用了lambda表达式的延迟特性之后，可以**提高一定条件下代码的性能**。



### 闭包

Java 中使用 Lambda 表达式需要注意闭包问题，在 Lambda 表达式中使用的变量应为 `final` 修饰，即使没有显式地标识，虚拟机编译期也会帮我们加上

接下来看一个反例

```java
@FunctionalInterface
public interface Printer {
    void print();
}

public class Demo {
    private static void log(Printer printer) {
        printer.print();
    }
    
	public void test2() {
    	for (int i = 0; i < 10; i++) {
            // 这里会提示编译异常
            // 因为i在每次迭代都会自增，不是final变量
            // 需要进行一次转换
        	log(() -> System.out.println("lambda表达式外的值：" + i));
    	}
    }
}

///////////// 修改后

public class Demo {
    private static void log(Printer printer) {
        printer.print();
    }
    
	public void test2() {
    	for (int i = 0; i < 10; i++) {
            // 使用一个值固定的变量用作lambda表达式中
            // 此处的final即使不写，编译器也会加上
            final int finalI = i;
        	log(() -> System.out.println("lambda表达式外的值：" + i));
    	}
    }
}
```



## 函数式接口

> 有且只有一个抽象方法的接口称为函数式接口

格式：

```java
// 检测一个接口是否为函数式接口
// 是：编译成功；否：报错（接口中没有抽象方法、抽象方法的个数大于一个）
@FunctionalInterface
public interface 接口名称 {
	public abstract 返回值类型 方法名(参数列表);
  	// 其他非抽象方法内容
  	// 默认、静态、私有方法
}
```

**函数式接口的出现使得一个方法可以作为另一个方法的输入与输出**



## 常用的函数式接口

### Supplier

> `java.util.function.Supplier<T>`，被称之为**生产型接口**

抽象方法： `T get()`

指定泛型是什么类型，get 方法就会生产什么类型的数据 ，具体返回什么数据，需要自行定义

案例

> 求数组元素的最大值，使用 Supplier 作为方法参数类型，通过 Lambda 表达式求出数组的最大值

```java
public static int getMax(Supplier<Integer> sup) {
    return sup.get();
}

public static void main(String[] args) {
    // 定义数组
    int[] arr = {100, -50, 89, 92, 40, -5};
    // 调用getMax方法求出最大值
    int maxValue = getMax(() -> {
        int max = arr[0];
        // 遍历数组逐个比较
        for(int i : arr) {
            if (i > max) {
                max = i;
            }
        }
        return max;
    });
    System.out.println("数组中元素最大值是：" + max);
}
```



### Consumer

> `java.util.function.Consumer<T>`，被称之为**消费型接口**

抽象方法：`void accept(T t)`

指定泛型是什么类型，accept 方法就会消费什么类型的数据，具体怎么消费使用，需要自行定义

案例

> 反转输出字符串，使用 Consumer 作为方法参数类型之一

```java
public static void reverseOut(String str, Consumer<String> con) {
    con.accept(str);
}

public static void main(String[] args) {
    // 定义一个字符串
    String str = "hello";
    // 调用reverseOut方法进行反转输出
    reverseOut(str, (String name) -> {
        // 对传递过来的字符串进行消费
        String reStr = new StringBuffer(name).reverse().toString();
        System.out.println("反转后的结果：" + reStr);
    })
}
```



默认方法：`default Consumer<T> andThen(Comsumer<? super T> after)`

组合两个 Consumer 接口，再对数据进行消费

```java
Consumer<String> con1;
Consumer<String> con2;
String s = "hello";
con1.accept(s);
con2.accept(s);
// 等价于
// 谁在前谁先消费
con1.andThen(con2).accept(s);
```



### Predicate

> `java.util.function.Predicate<T>`，这个接口主要用于判断，被称为**判断型接口**

抽象方法：`boolean test(T t)`

指定泛型是什么类型，test 方法就对什么类型数据进行判断，从而返回一个布尔值

案例

> 判断一个手机号码字符串长度是否等于11，使用 Predicate 作为方法参数

```java
public boolean isPhoneNumber(String phoneNumberStr, Predicate<String> pre) {
    return pre.test(phoneNumberStr);
}

public static void main(String[] args) {
    // 定义一个手机号码的字符串
    String phoneNumberStr = "1234567890";
    boolean result = isPhoneNumber(phoneNumberStr, (s) -> s.length == 11);
    if(result) {
       System.out.println("这个手机号码符合长度"); 
    } else {
       System.out.println("这个手机号码不符合长度要求");
    }
}
```



默认方法

1. `default Predicate<T> and(Predicate<? super T> other)`，作用：把两个Predicate条件连接起来实现**并且**的效果
2. `default Predicate<T> or(Predicate<? super T> other)`，作用：把两个Predicate条件连接起来实现**或**的效果
3. `default Predicate<T> negate(){return (t) -> !test(t)}`，作用：对当前条件判断结果取反





### Function

> `java.util.function.Function<T,R>`，这个接口主要用于转换，被称为**转换型接口**。T：前置条件；R：后置条件

抽象方法：`R apply(T t)`

根据T类型的参数获取R类型的结果

案例

> 使用Map\<String, Integer>存储学生的名字及其成绩，利用 Function 转换为ArrayList\<Integer>，并求其中的平均数

```java
public static void main(String[] args) {
    // 求Integer类型ArrayList中所有元素的平均数
    Function<ArrayList<Integer> ,Integer  > f1 = arr ->{
        int count =0;
        for (int a : arr) {
            count += a;
        }
        return count / arr.size();
    };
    // 将Map<String,Integer>中value存到ArrayList<Integer>中
    Function<Map<String , Integer> ,ArrayList<Integer>> f2 = map ->{
        // 定义Integer泛型的集合用来保存Map集合中的值
        ArrayList<Integer> arrayList = new ArrayList<>();
        Set<String> keySet = map.keySet();
        for (String key : keySet) {
            arrayList.add(map.get(key));
        }
        return arrayList;
    };
    
    // 创建Map集合,以学生姓名为key成绩为value
    Map<String, Integer> map = new HashMap<>();
    map.put("岑小村", 59);
    map.put("谷天洛", 82);
    map.put("渣渣辉", 98);
    map.put("蓝小月", 65);
    map.put("皮几万", 70);
    // 将学生成绩保存到新集合中
    ArrayList<Integer> scoreList = f2.apply(map);
    // 求学生的平均成绩
    Integer score = f1.apply(scoreList);
    System.out.println("学生的平均成绩为: "+score);
}
```



## 方法引用

> 方法引用的出现是为了让 Lambda 表达式的优雅度进一步提升
>
> 如果 Lambda 表达式的方法体是直接引用别的类中的方法的话，可以使用方法引用

使用前提：

- 需要使用的对象和方法都是已存在的
- Lambda 表达式中传递的参数一定是方法引用中能接收的
- 方法引用返回的参数一定是 Lambda 表达式能接收的

用一个案例感受一下方法引用的优雅

```java
// Lambda 表达式写法
person -> person.getData();

// 方法引用写法
Person::getData;
```

格式：

- 使用 `::` 方法引用运算符代替箭头
- 参数忽略

其他方式：

- 通过类名称引用静态方法
- 通过`super`引用父类成员方法 `super::方法`
- 通过`this`引用本类成员方法 `this::方法`
- 类的构造方法的引用 `类名称::new`

