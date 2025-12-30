---
title: AQS 学习
icon: article
category: 并发
---

# AQS 学习


## 引入

经过 synchronized 的学习，我们知道 synchronized 可以很方便地给一段共享资源的操作加上锁，对操作进行同步控制；但是 synchronized 也有一定的弊端：**不支持中断、不支持超时、不支持公平锁**

AQS 就是用来解决这些问题的，AQS 全称叫 AbstractQueueSynchronizer（抽象队列同步器），它把同步的通用逻辑（排队、阻塞、唤醒）封装成了一个框架，用于构建各种同步工具来解决多线程的同步问题，常见的实现有：ReentrantLock、CountDownLatch 等

AQS 提供了阻塞式同步器的标准实现框架，避免每个工具类重复实现复杂的线程排队和状态管理逻辑，保证了 JUC 包的一致性和可靠性。


## AQS 核心思想

> AQS 的核心设计其实可以一句话概括：一个状态(state) + 一个等待队列(CLH) + 一套原子操作(CAS)


### state

`state` 可以理解为锁的计数器，或者资源剩余量，用具体例子来说明：

- `ReentrantLock`: `state = 0` 表示无锁，`state > 0` 表示被持有
- `CountDownLatch`: `state = 3` 表示还需要进行 3 次 `countDown()`

关键设计：`state` 被 `volatile` 修饰，保证了多个线程之间的可见性


### CLH 阻塞队列

CLH 队列是一个链表实现的阻塞队列，AQS 通过 prev 和 next 两个指针来维护链表

- 当线程获取 `state` 失败时，会被封装成一个 `Node` ，**通过 CAS 的方式加入 CLH 队列尾部**
- 每个线程只需要关注前驱线程，比如线程 B 阻塞时，**只等待前驱节点线程 A 唤醒** (`LockSupport.unpark`)；避免了全局通知的开销，同时天然保证 FIFO 特性

关键设计：队列的操作都通过 CAS 的方式来保证线程安全，避免使用 `synchronized`，提升了性能


## AQS 工作流程

以 `ReentrantLock` 为例，假设有一段代码需要使用锁进行保护

```java
ReentrantLock lock = new ReentrantLock();
lock.lock();
try {

} finally {
    lock.unlock();
}
```

### 尝试获取锁


### 获取锁失败，加入CLH队列


### 自旋阻塞等待


### 释放锁时唤醒后继线程



## AQS 两种方式