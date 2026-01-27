---
title: Future 和 FutureTask学习
icon: article
category: 并发
---

# Future 和 FutureTask学习

## Thread 和 Running 的缺陷

回顾之前学习的，创建线程的方式，有两种

- 继承 `Thread` 类，重写 `run()` 接口
- 实现 `Runnable` 接口，实现 `run()` 接口

但是这两种实现方式都有一个缺陷：**没有返回值**，如果需要运行一个带返回值的任务，原有的方式就不够用了。

所以 JDK 提供了一个接口：`Callable`，只有一个 `call()` 方法，这个方法既支持泛型，还支持抛出异常，这是 `Runnable` 不具备的能力

```java
@FunctionalInterface
public interface Callable<V> {
    V call() throws Exception;
}
```

## Callable 与 Future

`Callabel` 一般不会单独使用，而是搭配线程池，就像这样：

```java
Future<Integer> future = executorService.submit(() -> 123);
Integer result = future.get();
System.out.println(result);
```

其中提交给线程池运行后的结果不是直接返回的，而是通过 `Future`来进行包装，`Future` 提供了检查计算是否完成、是否取消，阻塞获取计算结果的方法

```java
public interface Future<V> {
    V get() throws InterruptedException, ExecutionException;
    V get(long timeout, TimeUnit unit) throws ...;
    boolean cancel(boolean mayInterruptIfRunning);
    boolean isCancelled();
    boolean isDone();
}
```

其中最重要的方法是 `get()`，他的作用获取 `Callable` 的执行结果

- 如果此刻 `Callable` 定义的任务还没执行完，那么会阻塞当前线程，直到运算完成；所以 `Future` 也提供了带超时时间的 `get()` 方法，目的就是避免持续阻塞进而引发的资源耗尽或死锁等问题
- `get()` 方法可以抛出异常，其中 `ExecutionException` 是 `Callable` 任务执行过程中抛出的异常的包装异常
- 必须主动调用 `get()` 方法才能得到任务结果，无法做到异步回调通知


## FutureTask

虽然 Future 提供了获取异步任务结果的能力，但是其本质上还是阻塞等待的方式，无法做到回调通知，因此在复杂的流程编排中还不够用

