---
title: yield 学习
icon: article
isOriginal: false
category: 并发
---

# yield 方法

> 在学习 ConcurrentHashMap 时，`initTable()` 方法中控制只有一个线程可以执行初始化的部分，其他等待的线程为了节约 CPU 资源，执行 `yield()` 方法来自旋等待
> 
> `yield()` 方法是 Thread 类中的一个方法，它被 `native` 修饰，所以它是一个本地接口(Native Interface)，依靠底层 C++ 代码实现。

```java
public class Thread implements Runnable {
    public static native void yield();
}
```

## 基本作用

提示线程调度器，**当前线程愿意让出当前使用的 CPU 时间片**，提示调度器当前高优先级的任务已经执行完成，可以去执行其他同等重要的任务，但是这只是一个**信号**、**建议**，调度器可能会认为当前没有重要的任务而忽略这个信号，会导致调用 `yield()` 方法的线程继续执行

这也是 `yield()` 方法的最大局限，因为让出 CPU 时间片这个效果是无法保证的，另外如果频繁地执行 `yield()` 可能会导致大量线程上下文切换，反而降低程序性能


## 和 wait / sleep 方法对比

| 对比方法 | 关键区别 |
| ------- | -------- |
| `Object.wait()` (成员方法) | `wait()` 会释放当前线程持有的锁，并使线程进入 `TIMED_WAITING` 或 `WAITING` 状态，直到被 `notify()` 唤醒，并且需要被包括在同步代码块内。而 `yield()` 不释放锁，且线程保持 `RUNNABLE` 状态 |
| `Thread.sleep()` (静态方法) | `sleep()` 会让当前线程进入`TIMED_WAITING` 或 `WAITING` 状态，期间不会消耗 CPU 时间，并且不释放锁。`yield()` 只是让出CPU，但可能立刻被再次调度，没有固定的休眠期 |


## 总结

简单来说，应该把 `yield()` 方法看作是一个“谦让”的动作，只是对线程调度器释放一个信号：当前紧急任务已经完成，可以调度其他同样紧急的任务，但是无法保证这个信号会得到调度器的响应。在实际生产中，应该优先考虑 juc 包下的工具来确定同步执行的机制。
