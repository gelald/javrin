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

如果两个线程 A、B 同时写入不同的数据，当发生不同数据hash冲突时，他们可能会同时读取对应索引的bucket的头节点，各自创建新节点并返回，最终会导致节点**数据覆盖**的问题。并且 size 属性的更新也并非原子操作（写入数据后采用 `++size` 的方式更新）

### 线程安全的替代方案

正因为 HashMap 是线程不安全的，所以需要寻找线程安全的替代方案

- `HashTable`：所有方法都使用 `synchronized` 修饰，使用全局锁，性能不高
- `Collections.synchronizedMap(new HashMap<>())`：把 HashMap 包装为 SynchronizedMap，所有方法的逻辑都被 `synchronized` 代码块包裹，与 HashTable 类似，也是使用全局锁，性能不高
- `ConcurrentHashMap`：采用更精细化的锁控制，JDK1.7使用分段锁，JDK1.8使用 CAS + `synchronized`


## JDK 1.7 ConcurrentHashMap

### 底层结构

在 JDK1.7 中，ConcurrentHashMap 的存储结构是由 Segment + 数组 + 链表的结构。Segment 可以理解为一个 HashMap 的结构，Segment 一旦初始化后就无法扩容，默认容量是 16，对应支持最多 16 个线程并发访问

### 初始化

### 扩容

### put

### get


## JDK 1.8 ConcurrentHashMap

### 底层结构

在 JDK1.8 中，ConcurrentHashMap 的存储结构是由 Node数组 + 链表/红黑树 组成，当 hash 冲突链表达到一定长度后，链表会转换为红黑树，与 HashMap 类似

### 初始化

- ConcurrentHashMap 的初始化是一个懒加载的行为，构造时只记录容量，首次写操作才初始化 table，避免无用开销
- sizeCtl 被 volatile 修饰，使得对它的修改能让其他线程及时感知到
- 用 CAS 的方式来修改 sizeCtl，其他线程感知到 sizeCtl 小于 0 就执行 yield 让出 CPU 并进行自旋等待，保证只有一个线程能进行初始化
- 经过 CAS 后进行多一次的 table 检查，双重检查避免重复初始化
- ConcurrentHashMap 使用 CAS 和 volatile 实现了无锁初始化，避免了直接使用 synchronized 的性能损耗

```java
    // 容器初始化和调整大小的空间
    // 构造时，sizeCtl是容量
    // 初始化时，sizeCtl被设置为-1作为正在初始化的标志位
    // 初始化完成后，转变为扩容阈值
    private transient volatile int sizeCtl;

    /**
     * Initializes table, using the size recorded in sizeCtl.
     */
    private final Node<K,V>[] initTable() {
        Node<K,V>[] tab; int sc;
        while ((tab = table) == null || tab.length == 0) {
            // 如果sizeCtl小于0，此时有其他线程正在执行initTable
            if ((sc = sizeCtl) < 0)
                // 让出CPU使用权，只有一个线程能初始化，其他线程自旋等待，直到初始化完成
                Thread.yield(); // lost initialization race; just spin
            else if (U.compareAndSetInt(this, SIZECTL, sc, -1)) {
                // 线程 CAS 成功把sizeCtl改成-1，抢到initTable执行权
                try {
                    // CAS 后进行双重检查，避免重复初始化
                    if ((tab = table) == null || tab.length == 0) {
                        int n = (sc > 0) ? sc : DEFAULT_CAPACITY;
                        @SuppressWarnings("unchecked")
                        Node<K,V>[] nt = (Node<K,V>[])new Node<?,?>[n];
                        // 初始化 table
                        table = tab = nt;
                        // 计算扩容阈值
                        sc = n - (n >>> 2);
                    }
                } finally {
                    // 初始化完成，把sizeCtl设置为扩容阈值
                    sizeCtl = sc;
                }
                break;
            }
        }
        return tab;
    }
```

### put

### get


## 总结
