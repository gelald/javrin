---
title: ConcurrentHashMap
icon: article
category: Java集合

---

# ConcurrentHashMap 介绍

## 引入

HashMap 是最常用的 Map 集合之一，JDK1.8 之后其底层的数组+链表/红黑树的结构使得读写效率都非常高，然而它并不是一个线程安全的集合，如果不加以同步控制，在并发的环境下，可能会导致 HashMap 存在线程安全问题。

### HashMap 线程不安全

HashMap 的 `put()`、`resize()` 方法都没有任何同步措施，比如 `synchronized` 或 CAS 机制，当多个线程同时操作同一个 HashMap 时，这些操作不是原子性的，容易出现竞态条件。



