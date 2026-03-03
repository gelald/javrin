---
title: Future 与异步编程
icon: article
category: 并发
---

# Future 与异步编程

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

## Future

`Callabel` 一般不会单独使用，而是搭配线程池，就像这样：

```java
Future<Integer> future = executorService.submit(() -> 123);
Integer result = future.get();
System.out.println(result);
```

其中提交给线程池运行后的结果不是直接返回的，而是通过 `Future` 来进行包装，`Future` 提供了检查计算是否完成、是否取消，阻塞获取计算结果的方法

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


## FutureTask 可执行的 Future

`FutureTask` 是 `Future` 的实现类，除此之外还实现了 `Runnable`，使它具备了：

- 可以被线程执行的能力，(`Future` 只是一个结果的 "占位符"，它并不能直接运行)
- 可以获取结果的能力

### **状态机的体现**

`FutureTask` 的 `state` 属性和 CAS 修改的方式，保证了 `run()` 方法只被执行一次

```java
    private volatile int state;
    private static final int NEW          = 0;      // 创建完成
    private static final int COMPLETING   = 1;
    private static final int NORMAL       = 2;      // 正常完成
    private static final int EXCEPTIONAL  = 3;      // 执行异常
    private static final int CANCELLED    = 4;      // 被取消
    private static final int INTERRUPTING = 5;      // 正在中断
    private static final int INTERRUPTED  = 6;      // 已中断
```

### **`Run()` 方法只执行一次的原因**

因为 `run()` 方法执行的时候会优先检查 `state` 是否为 `NEW`，是才能执行，否则不执行

```java
    public void run() {
        if (state != NEW || !RUNNER.compareAndSet(this, null, Thread.currentThread()))
            return;
        try {
            
        } finally {

        }
    }
```

### **调用 `get()` 方法阻塞获取结果**

- 如果当前任务未执行完，那么会通过 `LockSupport.park()` 来挂起调用线程
- 如果当前任务执行完成了，`run()` 方法会调用 `LockSupport.unpark()` 所有等待的线程，并把结果存放到 `outcome` 属性中



## CompletableFuture 异步任务编排

`Future` 和 `FutureTask` 虽然给线程任务提供了获取任务结果的能力，但是其本质上还是阻塞等待的方式，无法做到回调通知，因此在复杂的流程编排中还不够用

`CompletableFuture` 拥有这种能力，能实现多任务流程编排、异步回调等功能

### 常用创建方式

| **方法**                                                | **说明**       |
|-------------------------------------------------------|--------------|
| `CompletableFuture.runAsync(Runnable action)`         | 异步执行有返回结果的任务 |
| `CompletableFuture.supplyAsync(Supplier<T> supplier)` | 异步执行无返回结果的任务 |

> 默认会使用 `ForkJoinPool.commonPool()`，在实际生产环境中必须指定自定义线程池，避免影响其他使用公共组件的功能（比如 `paparallelStreamra`）


### 编排模式

#### 串行依赖（A → B → C）

