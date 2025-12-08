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

> 关于 yield() 的介绍👉: [yield学习](../concurrency/yield.md)

```java
    // 容器初始化和调整大小的空间
    // 构造时，sizeCtl表示容量（如果有指定初始容量）
    // 初始化时，sizeCtl被设置为-1作为正在初始化的标志位
    // 初始化完成后，sizeCtl表示扩容阈值
    // 扩容时，sizeCtl被设置为-N（高16位表示扩容的标识，低16位减1为正在扩容线程数）
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


### 扩容

和 HashMap 一样，当哈希桶过于拥挤时，查询效率会从 O(1) 退化成 O(n) (链表变长) 或者 O(log n) (红黑树)，尽管链表超过一定阈值后也会转换成红黑树来提升查询效率，但是哈希桶扩容也是能大大提升查询效率的。

当元素数量 > threshold 时，ConcurrentHashMap 会把底层数组的容量扩容为原来的 2 倍，让元素重新分布，降低冲突。

- 触发时机：
    - `put()` 成功插入一个元素后，调用 `addCount()` 检查是否需要扩容，检查元素数量是否超过阈值 `sizeCtl`
    - 在迁移一个哈希桶之前，会把哈希桶的头节点转换为特殊节点 `ForwardingNode` (hash = -1)

- 扩容期间的读写操作，写操作加锁或CAS，读操作依靠 `volatile` 保证可见性
    - 扩容期间读操作：读取数据的过程完全不加锁，靠 `volatile` 和 `ForwardingNode` 保证线程安全
    - 扩容期间写操作：写入数据时发现对应的哈希桶已迁移，则去新数组进行插入；如果未迁移，那么先协助迁移桶，再写入
    - 写操作和迁移桶前都仅会对某一个哈希桶加锁，既保证迁移和写操作互斥，又降低锁的颗粒度，最大程度减少竞争

- 协作扩容：ConcurrentHashMap 的扩容不是一蹴而就，而是充分利用多核CPU，多个线程参与合作
    - 第一个发现需要扩容的线程会初始化一个新的数组 `nextTable`，并开始迁移第一位元素
    - 后续调用 `put()` 的线程，如果发现正在扩容（检查到哈希桶第一个元素是 `ForwardingNode`），也会帮忙迁移
    - 每个参与扩容的线程**通过 CAS 申请一段区间（如果[0~15]）**来迁移避免重复迁移

- 扩容结束：当所有哈希桶都迁移完成时，最后一个线程会：
    - 把 `table` 指向 `nextTable` 并清空 `nextTable`
    - 重新计算新的 `sizeCtl` = 负载因子（默认是0.75） * 新容量

#### 迁移逻辑

```java
private final void transfer(Node<K,V>[] tab, Node<K,V>[] nextTab) {
    int n = tab.length, stride;
    // 计算每个线程负责的步长（stride）

    // ... 初始化 nextTab（如果第一个线程）

    for (int i = 0, bound = 0;;) {
        Node<K,V> f = tabAt(tab, i);
        if (f == null)
            advance = casTabAt(tab, i, null, fwd); // 直接设为 ForwardingNode
        else if ((fh = f.hash) == MOVED)
            continue; // 已迁移
        else {
            synchronized (f) { // 对哈希桶头加锁，保证迁移和写操作互斥
                if (tabAt(tab, i) == f) { // 双重检查
                    Node<K,V> ln = null, hn = null;
                    // ... 遍历链表，按 hash & oldCap 分成 low/high 两组
                    setTabAt(nextTab, i, ln);        // 低位链
                    setTabAt(nextTab, i + n, hn);    // 高位链（偏移 n）
                    setTabAt(tab, i, fwd);           // 迁移完成后，将旧桶设为 ForwardingNode
                    // ...
                }
            }
        }
    }
}
```

#### 其他线程协助迁移逻辑

```java
final Node<K,V>[] helpTransfer(Node<K,V>[] tab, Node<K,V> f) {
    Node<K,V>[] nextTab; int sc;
    if (tab != null && (f instanceof ForwardingNode) &&
        (nextTab = ((ForwardingNode<K,V>)f).nextTable) != null) {
        int rs = resizeStamp(tab.length);
        while (nextTab == nextTable && table == tab &&
               (sc = sizeCtl) < 0) {
            if ((sc >>> RESIZE_STAMP_SHIFT) != rs || sc == rs + 1 || sc == rs + MAX_RESIZERS)
                break;
            if (transferIndex <= 0)
                break;
            if (U.compareAndSwapInt(this, SIZECTL, sc, sc + 1)) {
                transfer(tab, nextTab); // 协助迁移
                break;
            }
        }
        // putVal()方法发现索引落在了已迁移的哈希桶，那么需要去新表插入
        // 具体的行为是返回 nextTab，在下一轮的循环中操作 nextTab
        return nextTab; // 返回新表
    }
    return table;
}
```

#### 检查是否需要扩容的逻辑

```java
private final void addCount(long x, int check) {
    if (check >= 0) {
        Node<K,V>[] tab, nt; int n, sc;
        while (s >= (long)(sc = sizeCtl) && (tab = table) != null &&
            (n = tab.length) < MAXIMUM_CAPACITY) {
            // ...
            if (sc < 0) { // sizeCtl小于0，表示正在扩容
                // 使用 CAS 的方式对 sizeCtl 增加1，表示当前线程需要加入扩容操作
                if (U.compareAndSetInt(this, SIZECTL, sc, sc + 1))
                    // 主动参与扩容
                    transfer(tab, nt);
            }
        }
    }
}
```


### put

put 操作流程：

- `spread()` 方法计算 key 的 hash 值
- 如果发现 `table` 是 `null`，那么调用 `initTable()` 来完成数组初始化，通过 CAS 的方式确保只有一个线程能进入初始化流程
- 如果发现对应的哈希桶是一个空桶，那么使用 CAS 的方式插入数据
- 如果发现对应的哈希桶有数据，那么需要使用 `synchronized` 锁住哈希桶第一个元素，来完成链表或红黑树的插入
- 完成插入数据的工作后，调用 `addCount()` 方法来进行扩容检查，如果需要扩容，那么参与扩容工作

> ConcurrentHashMap put方法采用分段锁思想：只有在必要时针对单个桶加锁，其他情况使用 CAS 或者无锁操作，最大化减少锁竞争的开销

```java
    public V put(K key, V value) {
        return putVal(key, value, false);
    }

    /** Implementation for put and putIfAbsent */
    final V putVal(K key, V value, boolean onlyIfAbsent) {
        if (key == null || value == null) throw new NullPointerException();
        // 计算哈希值
        // 与 HashMap 类似，采用了高16位和低16位异或的方式来降低哈希冲突
        int hash = spread(key.hashCode());
        int binCount = 0;
        for (Node<K,V>[] tab = table;;) {
            Node<K,V> f; int n, i, fh; K fk; V fv;
            if (tab == null || (n = tab.length) == 0)
                // 底层 table 未初始化时，执行初始化
                // 使用 CAS 确保只有一个线程可以初始化，其他 CAS 失败的线程执行 yield 进行自旋
                tab = initTable();
            else if ((f = tabAt(tab, i = (n - 1) & hash)) == null) {
                // 通过 CAS 的方式进行空桶插入
                if (casTabAt(tab, i, null, new Node<K,V>(hash, key, value)))
                    break;                   // no lock when adding to empty bin
            }
            else if ((fh = f.hash) == MOVED)
                // 发现元素落在已迁移的哈希桶
                // 协助迁移过程，最后返回nextTab，在下一轮循环中完成数据插入
                tab = helpTransfer(tab, f);
            else if (onlyIfAbsent // check first node without acquiring lock
                     && fh == hash
                     && ((fk = f.key) == key || (fk != null && key.equals(fk)))
                     && (fv = f.val) != null)
                return fv;
            else {
                V oldVal = null;
                // 哈希桶已经有数据，需要锁住桶头避免其他线程的写入或扩容影响
                synchronized (f) {
                    // 双重检查，防止在等待锁期间，该桶被扩容（变为 ForwardingNode）
                    if (tabAt(tab, i) == f) {
                        if (fh >= 0) {
                            // 链表的方式插入
                            binCount = 1;
                            for (Node<K,V> e = f;; ++binCount) {
                                K ek;
                                if (e.hash == hash &&
                                    ((ek = e.key) == key ||
                                     (ek != null && key.equals(ek)))) {
                                    oldVal = e.val;
                                    if (!onlyIfAbsent)
                                        e.val = value;
                                    break;
                                }
                                Node<K,V> pred = e;
                                if ((e = e.next) == null) {
                                    pred.next = new Node<K,V>(hash, key, value);
                                    break;
                                }
                            }
                        }
                        else if (f instanceof TreeBin) {
                            // 红黑树的方式插入
                            Node<K,V> p;
                            binCount = 2;
                            if ((p = ((TreeBin<K,V>)f).putTreeVal(hash, key,
                                                           value)) != null) {
                                oldVal = p.val;
                                if (!onlyIfAbsent)
                                    p.val = value;
                            }
                        }
                        else if (f instanceof ReservationNode)
                            throw new IllegalStateException("Recursive update");
                    }
                }
                if (binCount != 0) {
                    if (binCount >= TREEIFY_THRESHOLD)
                        treeifyBin(tab, i);
                    if (oldVal != null)
                        return oldVal;
                    break;
                }
            }
        }
        // 更新元素数量，如果超出sizeCtl，就需要扩容
        addCount(1L, binCount);
        return null;
    }

```

### get

- ConcurrentHashMap 中有一些特殊的 hash 值，-1代表正在扩容，-2代表红黑树的根节点，碰上这两种情况时需要特殊处理
- `get()` 方法读取数据不需要加锁
    - 底层的 table 用 `volatile` 修饰，一旦扩容完成，就能立刻读取到新 table
    - 获取元素时，使用的 `tabAt` 方法底层使用 `UnSafe` 的 `getReferenceVolatile` 实现，以 `volatile` 语义保证读取数组元素的可见性
    - Node 的 key 和 hash 都用 `final` 修饰，元素的 hash 不可变



```java
    public V get(Object key) {
        Node<K,V>[] tab; Node<K,V> e, p; int n, eh; K ek;
        // 计算key对应的索引
        int h = spread(key.hashCode());
        if ((tab = table) != null && (n = tab.length) > 0 &&
            (e = tabAt(tab, (n - 1) & h)) != null) {
            // 和哈希数组的第一个元素的hash值相同
            if ((eh = e.hash) == h) {
                // 直接命中哈希数组上的第一个元素
                if ((ek = e.key) == key || (ek != null && key.equals(ek)))
                    return e.val;
            }
            else if (eh < 0)
                // hash值小于0，说明正在扩容或者是红黑树，如果是 ForwardingNode，会去nextTab中寻找
                return (p = e.find(h, key)) != null ? p.val : null;
            while ((e = e.next) != null) {
                // 无法命中第一个元素，并且hash值正常，并且发现还有后续节点，说明当前是链表结构，按照链表的方式查询
                if (e.hash == h &&
                    ((ek = e.key) == key || (ek != null && key.equals(ek))))
                    return e.val;
            }
        }
        return null;
    }
```

## 总结
