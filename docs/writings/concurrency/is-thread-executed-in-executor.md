---
title: 判断线程池中的线程是否执行完毕
icon: article
order: 3
category:

- 文章
- 问题解决
- 并发

tag:

- 线程池

---

# 判断线程池中的线程是否执行完毕

## 问题引入

如果某一个线程池中执行任务都是比较重要的，我们希望这个线程池销毁前先正确执行完所有**已提交**的任务，有哪些方式可以进行销毁前的等待呢？



## 定义线程池

```java
private final ThreadPoolExecutor poolExecutor = new ThreadPoolExecutor(
    10,								// 10个核心线程
    20,								// 线程池最大线程数量20个
    0L, TimeUnit.SECONDS,			// 非核心线程一旦空闲，立马回收
    new LinkedBlockingQueue<>(30)	// 任务队列最大容量30个任务
);
```

## 定义线程任务

```java
private void executeBiz(int index) {
    long sleepTime = new Double(Math.random() * 10000).longValue();
    try {
        // 随机睡眠一定时间模拟业务
        TimeUnit.MILLISECONDS.sleep(sleepTime);
        System.out.println("当前线程执行结束: " + index);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
}
```



## isTerminated 方式

在主线程中进行循环执行 `isTerminated` 方法来判断线程池中的任务是否全部完成。

```java
public void test1() throws InterruptedException {
    for (int i = 0; i < 30; i++) {
        final int index = i;
        poolExecutor.execute(() -> {
            System.out.println("当前线程任务开始执行: " + index);
            executeBiz(index);
        });
    }
    poolExecutor.shutdown();
    while (!poolExecutor.isTerminated()) {
        TimeUnit.SECONDS.sleep(1);
        System.out.println("线程池还没完成所有任务...");
    }
    System.out.println("全部线程完成执行，线程池成功停止");
}
```

优点：简单

缺点：需要关闭线程池才能通过 `isTerminated` 方法来判断，因为如果不执行 `shutdown` 方法，`isTerminated` 方法永远都不会返回 `true` 。但是一般实际开发中极少数情况会在中途关闭线程池，因为线程池的创建与关闭也是有一定开销的，一般的做法是当系统关闭时才进行线程池的销毁。

**所以这种方式不推荐**



## getCompleteTaskCount 方式

`getTaskCount` : 返回已经提交的任务总数

`getCompleteTaskCount` : 返回已经成功执行的任务总数

在主线程中循环执行 `getCompleteTaskCount` 方法来获取已完成的任务数

```java
public void test2() throws InterruptedException {
    for (int i = 0; i < 30; i++) {
        final int index = i;
        poolExecutor.execute(() -> {
            System.out.println("当前线程任务开始执行: " + index);
            executeBiz(index);
        });
    }
    while (poolExecutor.getTaskCount() != poolExecutor.getCompletedTaskCount()) {
        System.out.println("当前已提交的任务数: " + poolExecutor.getTaskCount() + ", 当前已完成的任务数: " + poolExecutor.getCompletedTaskCount());
        TimeUnit.SECONDS.sleep(1);
        System.out.println("线程池还没完成所有任务...");
    }
    System.out.println("全部线程完成执行，线程池成功停止");
}
```

优点：不需要关闭线程池，避免创建和销毁线程池带来的开销。

缺点：必须确保执行 `getTaskCount` 方法时，所有线程任务**已全部提交执行**，否则这个数是不准确的。



## CountDownLatch 方式

CountDownLatch 是 JDK 提供的一个同步工具，可以达到让一个或多个线程等待其他线程执行完成的效果。

在初始化时指定一个整数作为计数器，

当调用 `countDown` 方法时，计数器会减 1，

当调用 `await` 方法时，如果当前计数器大于 0，那么当前线程会被**阻塞，直到计数器减到 0 为止**。

---

显然可以让主线程调用 `await` 方法来等待所有的任务线程执行完毕，

调整一下任务调用逻辑，多传入一个 CountDownLatch 参数以供子线程调用 `countDown` 方法。

```java
private void executeBiz(int index, CountDownLatch latch) {
    long sleepTime = new Double(Math.random() * 10000).longValue();
    try {
        TimeUnit.MILLISECONDS.sleep(sleepTime);
        System.out.println("当前线程执行结束: " + index);
    } catch (InterruptedException e) {
        e.printStackTrace();
    } finally {
        latch.countDown();
    }
}
```

```java
public void test3() throws InterruptedException {
    final int taskCount = 30;
    CountDownLatch countDownLatch = new CountDownLatch(taskCount);
    for (int i = 0; i < taskCount; i++) {
        final int index = i;
        poolExecutor.execute(() -> {
            System.out.println("当前线程任务开始执行: " + index);
            executeBiz(index, countDownLatch);
        });
    }
    System.out.println("正在等待线程池中的任务执行...");
    countDownLatch.await();
    System.out.println("全部线程完成执行，线程池成功停止");
}
```

优点：显然使用 CountDownLatch 是三种方式中最为灵活的一种。

缺点：唯一的缺点是需要提前知道所有的线程数，否则计数器无法准确地工作。
