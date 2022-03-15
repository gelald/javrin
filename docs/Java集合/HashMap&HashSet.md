# HashMap & HashSet



## 概述

把 HashSet 和 HashMap 放在一起讲解，是因为二者在 Java 里有着相同的实现，前者仅仅是对后者做了一层包装，也就是说 HashSet 里面有一个 HashMap，体现了适配器模式。所以这里重点讲解 HashMap



## 底层实现

HashMap 底层是一个链表数组。

HashMap 跟 TreeMap 不同，这个集合不保证元素的顺序，因为插入元素时会对元素进行哈希，数组下标由哈希值决定，所以元素顺序会被打散。

其中哈希方法可能会产生哈希冲突，HashMap采用的是链地址法解决冲突，就是相同哈希值的元素使用一个链表连接起来。

```java
transient Node<K,V>[] table;

static class Node<K,V> implements Map.Entry<K,V> {
    // 记录元素的哈希值
    final int hash;
    final K key;
    V value;
    Node<K,V> next;
    ...
}
```



<img src="https://gitee.com/ngwingbun/picgo-image/raw/master/images/20220315105253.png" style="zoom:80%;" />

从这个结构可以看出，如果找到合适的哈希方法，那么插入元素和获取元素的操作都可以在常数时间内完成；但是如果需要对 HashMap 进行遍历，就需要遍历整个 table 及其后面的冲突链

有两个参数可以影响 HashMap 的性能：初始容量（inital capacity）和负载系数（load factor）。初始容量指定了初始 `table` 的大小，负载系数用来指定自动扩容的临界值。当 `entry` 的数量超过 `capacity*load_factor` 时，容器将自动扩容并重新哈希。对于插入元素较多的场景，将初始容量设大可以减少重新哈希的次数。

将对象放入到 HashMap 或 HashSet 中时，有两个方法需要特别关心：`hashCode()` 和 `equals()`。**`hashCode()` 方法决定了对象会被放到哪个 `bucket` 里，当多个对象的哈希值冲突时，`equals()` 方法决定了这些对象是否是“同一个对象”**。所以，如果要将自定义的对象放入到 `HashMap` 或 `HashSet` 中的键时，需要重写 `hashCode()` 和 `equals()` 方法。



