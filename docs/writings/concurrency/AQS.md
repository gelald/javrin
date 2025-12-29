---
title: AQS 学习
icon: article
category: 并发
---

# AQS 学习


## 引入

AQS 全称叫 AbstractQueueSynchronizer（抽象队列同步器），它把同步器的通用逻辑（排队、阻塞、唤醒）封装成了一个框架，用于构建各种同步工具来解决多线程的同步问题，常见的有：ReentrantLock、CountDownLatch 等

AQS 提供了阻塞式同步器的标准实现框架，避免每个工具类重复实现复杂的线程排队和状态管理逻辑，保证了 JUC 包的一致性和可靠性。


## AQS 核心组件

- state：作用是记录同步状态，记录锁是否被持有；通过 `volatile` 来保证可见性
- CLH 阻塞队列：作用是存放等待获取同步状态的线程
- CAS：作用是安全地修改 state 和 CLH 队列指针 head / tail


### CLH 阻塞队列

CLH 

CLH 高效的原因：

- 每个线程入队列不加锁，通过 CAS 方式更新 tail
- 每个线程只需要关注前驱线程，比如线程 B 阻塞时，只等待前驱节点线程 A 唤醒 (`LockSupport.unpark`)；避免了全局通知的开销，同时天然保证 FIFO 特性


## 共享/独享模式

