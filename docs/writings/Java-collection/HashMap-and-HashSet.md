---
title: HashMap 与 HashSet
icon: article
category:

- Java集合

---

# HashMap 与 HashSet


## 概述

把 HashSet 和 HashMap 放在一起讲解，是因为二者在 Java 里有着相同的实现，前者仅仅是对后者做了一层包装，也就是说 HashSet 里面有一个 HashMap，体现了适配器模式。所以这里重点讲解 HashMap


## 计算哈希值

HashMap 的重点之一是计算元素的哈希值确定存储的位置，尽管底层数据结构在不同的 JDK 版本中存在差异，但是哈希数组是不变的结构，在学习底层结构前先学习 HashMap 是如何计算哈希值的。

使用存入的 key 调用 hashCode 方法，可以得到一个哈希值，但是这个哈希值一般比较大，所以需要使用一定的手段把这个大的哈希值落入到数组索引范围内。

1. 这个操作可以使用**模运算**，模运算可以保证落在数组索引范围内

   >假设 table 长度为16
   >
   >x % 16 的结果一定是 0~15 的范围内

   不足：哈希值比较大，大数模运算效率不高

2. 在一定条件下可以尝试把模运算转换为**与运算**

   >模运算转与运算
   >
   >如果一个数是 2 的 n 次幂，那么有 x % n = x & (n - 1)

   通过上述例子，大家应该也可以大致了解为什么 HashMap 规定 table 的长度一定是 2 的 n 次幂吧，因为满足这个条件才允许把模运算转换为与运算，而且与运算效率是非常高的

   不足：在与运算中决定索引的部分在于数组长度，所以出现重复的概率较大，可能导致出现的链表长度较长，不能充分利用数组

   > 假设 table 长度为16
   >
   > hash值240(11110000)和144(10010000)不一样，但是和15(00001111)的与运算是一样的，同样都是0

3. 因为int类型用4个字节存储，可以把哈希值高16位和低16位先进行**异或运算**，再进行**与运算**，这样可以更有效避免哈希冲突，因为高16位也参与了运算

   > HashMap 的做法
   >
   > int hash = (h = key.hashCode()) ^ (h >>> 16);
   >
   > int index = (n - 1) & hash

   ```java
   static final int hash(Object key) {
       int h;
       return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
   }
   
   // ...
   tab[i = (n - 1) & hash]
   // ...
   ```

### 哈希冲突的解决方式

哈希函数存在一定的哈希碰撞的几率，HashMap采用的是链地址法解决冲突，在数组上维护一个链表，把哈希冲突的节点（哈希值相同的节点）都组成一条链

此外，解决哈希冲突的方法还有开放定址法、重新 hash 等


## 底层实现

### JDK1.8之前

在 JDK 1.8 之前 HashMap 底层是**数组加链表的结合**。相同哈希值的元素统一放在数组相同的索引下标下，并使用链表来存储多个元素

### JDK1.8之后

在 JDK 1.8 以后，HashMap 底层结构迎来了优化，假如此时有大量相同索引下标的元素，会导致链表变长，使得查询元素的效率下降。因此 HashMap 针对这种情况做了一定的调整：当链表长度大于阈值（默认是8）时，会优先调用 `treeifyBin()` 方法，然后再判断当前数组长度是否大于最小树化阈值（默认是64），小于阈值，则先调用 `resize()` 方法数组扩容；大于等于阈值，则把链表转换位红黑树结构（一种高效的查询树结构）。

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

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220315105253.png)



从这个结构可以看出，如果找到合适的哈希方法，那么插入元素和获取元素的操作都可以在常数时间内完成；但是如果需要对 HashMap 进行遍历，就需要遍历整个 table 及其后面的冲突链

有两个参数可以影响 HashMap 的性能：初始容量（inital capacity）16和负载系数（load factor）0.75。初始容量指定了初始 `table` 的大小，负载系数用来指定自动扩容的临界值。当 `entry` 的数量超过 `capacity*load_factor` 时，容器将自动扩容并重新哈希。对于插入元素较多的场景，将初始容量设大可以减少重新哈希的次数。负载因子用于控制数组存放的元素的疏密程度，如果负载因子太大，HashMap越不轻易扩容，数组中存放的元素会更多，链表的长度也会增加，降低查询元素的效率；如果负载因子太小，HashMap容易触发扩容，那么存放的数据会很分散，数组的使用率会变低。

将对象放入到 HashMap 或 HashSet 中时，有两个方法需要特别关心：`hashCode()` 和 `equals()`。**`hashCode()` 方法决定了对象会被放到哪个 `bucket` 里，当多个对象的哈希值冲突时，`equals()` 方法决定了这些对象是否是“同一个对象”**。所以，如果要将自定义的对象放入到 `HashMap` 或 `HashSet` 中的键时，需要重写 `hashCode()` 和 `equals()` 方法。




## 初始化

如果初始化 HashMap 的时候传入了一个容量，由于 HahsMap 规定容量必须是 2 的 n 次幂，所以 HashMap 会对这个容量进行检查调整，保证满足条件

```java
static final int tableSizeFor(int cap) {
    // 防止cap本来就是2的幂次方，比如16，我们希望函数返回16而不是32
    int n = cap - 1;
    // 保证n的最高位的1之后所有位都变成1
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
}
```

> 例如：
> 假设 cap = 13 → n = 12（二进制 1100）
> 
> n |= n >>> 1 → 1100 | 0110 = 1110
> 
> n |= n >>> 2 → 1110 | 0011 = 1111
> 
> 后续操作不会改变结果（因为已经是全 1）
> 
> 最终 n = 15 → n + 1 = 16，即大于等于 13 的最小 2 的幂。 

`tableSizeFor()` 方法通过不断地右移+或运算，保证初始容量向上取整为大于或等于该值地最小2的幂次方


## 容量方面

### 概念

- HashMap 默认长度是 16，符合 2 的 n 次幂的条件，在代码中是这么体现的

  ```java
  static final int DEFAULT_INITIAL_CAPACITY = 1 << 4; // aka 16
  ```

- 默认的负载因子是 0.75f

- 默认数组扩容阈值是 16 \* 0.75f = 12，也就是说当数组中元素个数达到12个时，需要进行扩容了

- 默认链表树化阈值是 8，但是这不是充分条件；只有当数组长度达到 64 ，且链表上的元素个数达到 8 个，才会触发转换成红黑树。因为如果当前数组长度小于 64，应该优先进行数组扩容，以减少搜索时间

  ```java
  static final int TREEIFY_THRESHOLD = 8;
  static final int MIN_TREEIFY_CAPACITY = 64;
  
  final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {
      // ...
      // 链表元素大于 TREEIFY_THRESHOLD，可以考虑树化
  	if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
          treeifyBin(tab, hash);
      // ...
  }
  
  final void treeifyBin(Node<K,V>[] tab, int hash) {
      // ...
      // 数组长度小于 MIN_TREEIFY_CAPACITY，优先扩容
      if (tab == null || (n = tab.length) < MIN_TREEIFY_CAPACITY)
          resize();
      else if ((e = tab[index = (n - 1) & hash]) != null) {
          // ...
      }
  }
  ```


## 扩容

当 HashMap 第一次初始化数组或数组容量超出阈值（数组长度 * 负载因子）时会触发扩容动作

和 ArrayList 不同，HashMap 的扩容不是简单的数组复制，需要重新计算哈希确定索引，所以**开发时一定要避免频繁扩容的发生**

```java
final Node<K,V>[] resize() {
    Node<K,V>[] oldTab = table;
    int oldCap = (oldTab == null) ? 0 : oldTab.length;
    int oldThr = threshold;
    int newCap, newThr = 0;
    if (oldCap > 0) {
        if (oldCap >= MAXIMUM_CAPACITY) {
            // 当前容量是否大于HashMap中table的最大容量，使用整型数据最大值
            threshold = Integer.MAX_VALUE;
            return oldTab;
        }
        else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY && oldCap >= DEFAULT_INITIAL_CAPACITY) {
            // 扩容为当前容量的2倍
            // 扩容阈值也需要随着扩容*2
            newThr = oldThr << 1; // double threshold
        }
    }
    else if (oldThr > 0) // initial capacity was placed in threshold
        newCap = oldThr;
    else {               // zero initial threshold signifies using defaults
        // 上面两个条件都不满足说明这里是第一次初始化table
        // 换言之是使用无参构造来创建HashMap

        // 初始化容量是16
        newCap = DEFAULT_INITIAL_CAPACITY;
        // 初始化的阈值是0.75*16 = 12，超过12个元素，会触发扩容
        newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
    }
    if (newThr == 0) {
        // 初始化时指定了容量和负载因子，这里重新计算阈值
        float ft = (float)newCap * loadFactor;
        newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                  (int)ft : Integer.MAX_VALUE);
    }
    threshold = newThr;
    // 根据新容量来初始化table
    @SuppressWarnings({"rawtypes","unchecked"})
    Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
    table = newTab;
    // 迁移元素到新table中
    if (oldTab != null) {
        for (int j = 0; j < oldCap; ++j) {
            Node<K,V> e;
            if ((e = oldTab[j]) != null) {
                oldTab[j] = null;
                if (e.next == null) {
                    // 没有next，说明是数组中的普通节点
                    // 普通节点重新计算索引
                    newTab[e.hash & (newCap - 1)] = e;
                }
                else if (e instanceof TreeNode) {
                    // 红黑树节点迁移逻辑
                    // 将红黑树拆分成2棵子树，如果子树节点数小于等于 UNTREEIFY_THRESHOLD（默认为 6），则将子树转换为链表；如果大于，则保留红黑树结构
                    ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
                }
                else { // preserve order
                    // 链表节点的迁移会产生两条新的链表
                    Node<K,V> loHead = null, loTail = null;
                    Node<K,V> hiHead = null, hiTail = null;
                    Node<K,V> next;
                    do {
                        next = e.next;
                        // 计算关键
                        if ((e.hash & oldCap) == 0) {
                            if (loTail == null)
                                loHead = e;
                            else
                                loTail.next = e;
                            loTail = e;
                        }
                        else {
                            if (hiTail == null)
                                hiHead = e;
                            else
                                hiTail.next = e;
                            hiTail = e;
                        }
                    } while ((e = next) != null);
                    // 把两条链放到数组中
                    if (loTail != null) {
                        loTail.next = null;
                        newTab[j] = loHead;
                    }
                    if (hiTail != null) {
                        hiTail.next = null;
                        newTab[j + oldCap] = hiHead;
                    }
                }
            }
        }
    }
    // 不需要扩容说明是第一次初始化table，创建数组后直接返回
    return newTab;
}
```

### (e.hash & oldCap) == 0

计算的关键是这一行，决定扩容链表元素的索引

用例子来说明会更直观

```
假设元素A的hash值为21，元素B的hash值为42，扩容前容量为16
现在分别计算元素A、B的扩容前后的索引

元素A扩容前索引：5		元素A扩容后索引：21
21 & (16 - 1)		 21 & (32 - 1)
  00010101			   00010101
& 00001111			 & 00011111
-----------			 -----------
  00000101			   00010101

元素B扩容前索引：10		元素B扩容后索引：10
42 & (16 - 1)		 42 & (32 - 1)
  00101010			   00101010
& 00001111			 & 00011111
-----------			 -----------
  00001010			   00001010
  
  
可以看到两个元素的索引在扩容前后是否改变是由hash值第5位决定的（对应容量的那一位）
21的二进制第4位是1，所以扩容后索引改变了
42的二进制第4位是0，所以扩容后索引不变

而检验第4位是否为0其实可以通过元素hash值和00010000做与运算，而00010000是(0001111-00001111)的结果，而且刚好是16！可以推导出前后两个索引的差值就是oldCap！
这不是偶然，经过推导，如果原容量是32，那么看扩容前后是否需要改变，可以通过检验第5位是否为0，可以通过元素hash值和00100000做与运算
而且扩容后如果索引改变，改变后的索引值一定是原索引值+原数组长度！

```

那么使用例子验证后，能够证明(e.hash & oldCap) == 0的效果，就是判断元素索引是否需要改变。如果(e.hash & oldCap) == 0，那么新索引会等于旧索引，放到loHead链表中；否则新索引=旧索引+oldCap，放到hiHead链表中

在代码中体现扩容是否需要改变索引的地方是：扩容链表元素时，HashMap维护了两个链表

```java
// 索引不变的链表
Node<K,V> loHead = null, loTail = null;
// 索引+oldCap的链表
Node<K,V> hiHead = null, hiTail = null;
```

## 添加元素

### JDK1.8的做法

HashMap 添加元素大致会分为以下几步

1. 根据键计算哈希值
2. 检查数组是否需要进行初始化
3. 添加元素，添加元素有三种情况

   - 数组
     - 如果该位置上没有元素，那么新建一个Node并放入数组
     - 如果该位置上有元素且**哈希值和key都相同**，那么用新的元素替换原有元素，并返回原有元素

   - 如果数组中这个位置有元素，并且和元素的哈希值不同，则需要往后迭代链表
     - 如果链表上有元素哈希值和需要添加元素**哈希值和key都相同**，那就替换，并返回原有元素
     - 如果链表上没有元素哈希值和待添加元素哈希值相同，那就尾插法插入一个Node，并且需要关心链表长度
       - 如果链表长度达到了转为红黑树的阈值（默认值是8），那么就需要进行链表转红黑树的操作

   - 红黑树，按照红黑树的插入元素逻辑进行

4. 添加元素后，留意数组的长度，如果 HashMap 中的节点数量大于（容量*负载因子），那么 HashMap 需要进行扩容

```java
public V put(K key, V value) {
    // hash(key) 把key的hashCode的高16位异或低16位
    return putVal(hash(key), key, value, false, true);
}

final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {
    Node<K,V>[] tab; Node<K,V> p; int n, i;
    
    if ((tab = table) == null || (n = tab.length) == 0) {
        // 如果table为空，说明HashMap没有初始化
        // resize是初始化操作
		n = (tab = resize()).length; 
    }
    // 数组索引的计算使用长度-1来和hash值进行与运算
    if ((p = tab[i = (n - 1) & hash]) == null) {
        tab[i] = newNode(hash, key, value, null);   
    }
    else {
        // 如果这个位置已经有值了，说明有哈希冲突，需要往后链
        Node<K,V> e; K k;
        if (p.hash == hash && ((k = p.key) == key || (key != null && key.equals(k)))) {
            // 如果两个Node的key相同，直接替换value
            e = p;
        }
        else if (p instanceof TreeNode) {
            // 如果本来就是红黑树，就按照红黑树的方式插入元素
            e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
        }
        else {
            // 不是红黑树说明是普通链表
            // 如果key不同，使用尾插法的方式往下存储
            for (int binCount = 0; ; ++binCount) {
                if ((e = p.next) == null) {
                    p.next = newNode(hash, key, value, null);
                    if (binCount >= TREEIFY_THRESHOLD - 1) {
                        // 如果一条链上的元素数量大于树化的阈值，那么就需要把链表转成红黑树
                        // 阈值是8
                        // 只有当数组长度大于或者等于 64 的情况下，才会执行转换红黑树操作，以减少搜索时间。否则，就是只是对数组扩容。
                        treeifyBin(tab, hash);
                    }
                    break;
                }
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k))))
                    // 如果两个Node的key相同，跳出循环
                    break;
                p = e;
            }
        }
        if (e != null) { // existing mapping for key
            // 如果数组上原本有值，那么在替换后把原有的值返回
            V oldValue = e.value;
            if (!onlyIfAbsent || oldValue == null)
                e.value = value;
            afterNodeAccess(e);
            return oldValue;
        }
    }
    ++modCount;
    if (++size > threshold) {
        // 如果插入元素后容器长度大于扩容的阈值了，那么需要扩容
       	// 阈值：容量 * 扩容因子
        resize();   
    }
    afterNodeInsertion(evict);
    return null;
}
```

### JDK1.7的做法

对于 put 方法的分析如下：
- 如果定位到的数组位置没有元素 就直接插入。
- 如果定位到的数组位置有元素，遍历以这个元素为头结点的链表，依次和插入的 key 比较，如果 key 相同就直接覆盖，不同就采用头插法插入元素。

```java
public V put(K key, V value) {
    if (table == EMPTY_TABLE) {
        inflateTable(threshold);
    }
    if (key == null)
        return putForNullKey(value);
    int hash = hash(key);
    int i = indexFor(hash, table.length);
    for (Entry<K,V> e = table[i]; e != null; e = e.next) { // 先遍历
        Object k;
        if (e.hash == hash && ((k = e.key) == key || key.equals(k))) {
            V oldValue = e.value;
            e.value = value;
            e.recordAccess(this);
            return oldValue;
        }
    }

    modCount++;
    addEntry(hash, key, value, i);  // 再插入
    return null;
}
```

## 获取元素

获取元素的逻辑其实不难，其实无非是根据键的 hash 值来寻找

如果能在数组中找到对应的元素就返回

如果不行就往后迭代链表或红黑树，根据节点类型执行相应的寻找逻辑

```java
public V get(Object key) {
    Node<K,V> e;
    return (e = getNode(hash(key), key)) == null ? null : e.value;
}

final Node<K,V> getNode(int hash, Object key) {
    Node<K,V>[] tab; Node<K,V> first, e; int n; K k;
    // 计算索引值的公式：(长度-1) & hash
    if ((tab = table) != null && (n = tab.length) > 0 &&
        (first = tab[(n - 1) & hash]) != null) {
        // 根据索引检查数组元素
        if (first.hash == hash && // always check first node
            ((k = first.key) == key || (key != null && key.equals(k))))
            // 对比key，如果数组元素是待查找元素，则返回
            return first;
        if ((e = first.next) != null) {
            // 数组元素不符合并且数组存在链表
            // 判断是否红黑树
            if (first instanceof TreeNode)
                // 如果是红黑树，那就按照红黑树的方式寻找
                return ((TreeNode<K,V>)first).getTreeNode(hash, key);
            // 如果是普通链表，则按照普通链表的方式寻找
            do {
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k))))
                    return e;
            } while ((e = e.next) != null);
        }
    }
    return null;
}
```

## 删除元素

删除元素的逻辑总体上看是做了两件事情

1. 使用获取元素的逻辑找到需要删除的元素
2. 分别执行不同情况的删除节点的逻辑（数组、链表、红黑树）

```java
public V remove(Object key) {
    Node<K,V> e;
    return (e = removeNode(hash(key), key, null, false, true)) == null ? null : e.value;
}

final Node<K,V> removeNode(int hash, Object key, Object value,
                           boolean matchValue, boolean movable) {
    // value = null，matchValue = false，movable = true
    Node<K,V>[] tab; Node<K,V> p; int n, index;
    // 与获取元素逻辑相似，根据key从HashMap获取需要找到的那个元素
    if ((tab = table) != null && (n = tab.length) > 0 &&
        (p = tab[index = (n - 1) & hash]) != null) {
        Node<K,V> node = null, e; K k; V v;
        if (p.hash == hash &&
            ((k = p.key) == key || (key != null && key.equals(k))))
            node = p;
        else if ((e = p.next) != null) {
            if (p instanceof TreeNode)
                node = ((TreeNode<K,V>)p).getTreeNode(hash, key);
            else {
                do {
                    if (e.hash == hash &&
                        ((k = e.key) == key ||
                         (key != null && key.equals(k)))) {
                        node = e;
                        break;
                    }
                    p = e;
                } while ((e = e.next) != null);
            }
        }
        if (node != null && (!matchValue || (v = node.value) == value ||
                             (value != null && value.equals(v)))) {
            if (node instanceof TreeNode) {
                // 如果是红黑树，那么走红黑树的移除节点的逻辑
                ((TreeNode<K,V>)node).removeTreeNode(this, tab, movable);
            }
            else if (node == p) {
                // 如果这个节点是链表上的第一个节点，说明这个节点是数组上的节点
                // 那么把这个节点的下一个节点放到数组上
                tab[index] = node.next;
            }
            else {
                // 如果这个节点是链表中的一个节点，那就修改相关引用达到断开链表的目的
                p.next = node.next;
            }
            ++modCount;
            --size;
            afterNodeRemoval(node);
            return node;
        }
    }
    return null;
}
```


## 遍历 HashMap

遍历 HashMap 总体上会有两个方式，遍历 keySet 和 遍历 entrySet

但是**推荐使用 entrySet 来遍历**，原因是

- 根据 entrySet 进行遍历，遍历的是内部类 Node，其中记录了节点的所有信息，获取节点值非常方便，性能也高
- 根据 keySet 进行遍历的话，遍历的是所有键，没有额外的信息，获取节点值则需要**额外调用 get 方法**，这其中也要根据节点类型进行获取，并不是一蹴而就的

```java
// entrySet模式
for (Map.Entry<Integer, String> entry : map.entrySet()) {
  System.out.println(entry.getKey());
  System.out.println(entry.getValue());
}

// keySet模式
for (Integer key : map.keySet()) {
  System.out.println(key);
  System.out.println(map.get(key));
}
```


## HashSet

HashSet 是对 HashMap 的简单包装，HashSet 的方法都会转换成合适的 HashMap 方法，因此学习过 HashMap 的原理后，HashSet 的实现其实不难理解

```java
public class HashSet<E> {
	......
    // HashSet里面维护了一个HashMap
	private transient HashMap<E,Object> map;
    // Dummy value to associate with an Object in the backing Map
    private static final Object PRESENT = new Object();
    public HashSet() {
        map = new HashMap<>();
    }
    ......
    public boolean add(E e) {
        // 简单的方法转换
        return map.put(e, PRESENT)==null;
    }
    ......
}
```


## 参考

[HashMap 源码分析](https://javaguide.cn/java/collection/hashmap-source-code.html)