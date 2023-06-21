# Java 线程基本知识



## 在 Java 中如何创建线程

### 继承 Thread 类

```java
public class ThreadTest {
    public static class ThreadDemo extends Thread {
        @Override
        public void run() {
            System.out.println("ThreadDemo线程运行");
        }
    }

    public static void main(String[] args) {
        ThreadDemo threadDemo = new ThreadDemo();
        threadDemo.start();
    }
}
```

通过调用 `start` 方法，JVM 会创建出一个线程，等到这个线程得到 CPU 时间片后，会调用 `run` 方法真正执行



### 实现 Runnable 接口

JDK8 提供了 Lambda 表达式和函数式接口这两个特性，可以快速实现，无需创建真正的实现类

```java
public class ThreadTest {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> System.out.println("实现Runnable线程运行"));
        thread.start();
    }
}
```



### Thread 和 Runnable 对比

- 设计原则中有一条：合成复用原则，能使用接口(组合关系)就不要使用子类(继承关系)，使用接口耦合度更低
- 如果使用线程时，不需要使用 Thread 类中其他的方法，显然使用 Runnable 接口会更为轻量，因为只需要实现关键的 `run` 方法

**所以优先使用实现 Runnable 接口这种方式来创建线程**



### Callable + Future

如果我们希望这个线程任务在执行完成后能有一个返回值，那么 Thread 和 Runnable 的做法就不够用了，JDK 提供了 Callable 和 FutrueTask 解决这个问题

Callable 接口和 Runnable 接口类似，同样只有一个抽象方法，不同的是 Callable 中的方法有返回值，还支持泛型，并且还能抛出异常

```java
@FunctionalInterface
public interface Callable<V> {
    V call() throws Exception;
}
```

> Callable 一般很少和 Thread 来配合使用，一般都是配合线程池来使用

Future 接口代表一个异步计算的结果，提供了检查计算是否完成、是否取消，获取计算结果的方法

```java
Future<Integer> future = executorService.submit(() -> 123);
Integer result = future.get();
System.out.println(result);
```

> 执行 get 方法时，当前线程会进入阻塞状态，直到等到结果返回

Callable 和 Future 各司其职，Callable 负责产生数据，Future 负责接收结果



### Callable + FutureTask

FutureTask 是 Future 的一个实现类，使用 Callable + FutureTask 区别不会太大，使用 FutureTask 的话，就把定义任务、获取结果这两步都包装起来了，结果没有差别

```java
FutureTask<Integer> futureTask = new FutureTask<>(() -> 456);
executorService.submit(futureTask);
Integer result = futureTask.get();
System.out.println(result);
```





## Java 线程的状态及转换

### 操作系统中线程状态转换

操作系统中的线程主要有以下三种状态

- 就绪状态（ready）：线程正在等待使用 CPU，等待调度后可以进入执行状态
- 执行状态（running）：线程正在使用 CPU 资源
- 等待状态（waiting）：线程等待事件调用或者等待其他资源（IO 资源）
- 结束状态（terminated）：线程任务执行完毕后退出



### Java 线程的 6 个状态

```java
// Thread.State
public enum State {
    NEW,
    RUNNABLE,
    BLOCKED,
    WAITING,
    TIMED_WAITING,
    TERMINATED;
}
```



- NEW，位于这个状态的
