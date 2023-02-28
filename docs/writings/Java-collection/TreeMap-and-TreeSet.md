---
title: TreeMap 与 TreeSet
icon: article
category:

- Java集合

---

# TreeMap & TreeSet



## 概述

把 TreeSet 和 TreeMap 放在一起讲解，是因为二者在 Java 里有着相同的实现，前者仅仅是对后者做了一层包装，也就是说 TreeSet 里面有一个 TreeMap，体现了适配器模式。所以这里重点讲解 TreeMap

Java 中的 TreeMap 实现了 SortedMap 接口，也就是说会按照 `key` 的大小顺序对元素进行排序，`key` 大小的判断可以通过其类型本身的自然顺序，也可以通过构造时传入的比较器。



### 红黑树

TreeMap 底层是通过红黑树实现的，在此之前我们需要先简单了解一下红黑树

红黑树结构：

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220314223432.png)

红黑树是一种近似平衡的二叉查找树，它能够确保任何一个节点的左右子树的高度差不会超过二者中较低那个的一倍

红黑树是满足以下条件的二叉树：

1. 每个节点的颜色要么红色要么黑色
2. 根节点必然是黑色的
2. 每个叶子节点必然是黑色（空的叶子节点）
3. 不允许有连续红色的节点（一个红色的节点，其子节点一定是黑色的）
4. 从任一节点到其叶子的所有简单路径都包含相同数目的黑色节点。

红黑树本质上还是一颗二叉查找树，只不过在其基础上添加了一些约束，防止二叉查找树退化成链表

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220315093348.png)

如图：右边路径有4个节点，左边路径两个；节点9后面不能再有节点了，添加红违反特性（4），添加黑违法特性（5）

红色节点就是用来补充在黑色节点之间只控制每条路径黑色节点相同即达到平衡，来减少平衡二叉树，频繁的平衡操作

如果插入节点后，违反了红黑树的条件，所以需要进行红黑树的调整。红黑树的调整包括变色和旋转



## 获取元素

`get(Object key)` 方法根据指定的 `key` 值返回对应的 `value`，该方法的核心是调用了 `getEntry(Object key)` ，是根据 `key` 的自然顺序(或者比较器顺序)对二叉查找树进行递归查找，直到找到满足 `k.compareTo(p.key) == 0` 的 `entry` 。

```java
final Entry<K,V> getEntry(Object key) {
    ......
    if (key == null)//不允许key值为null
        throw new NullPointerException();
    Comparable<? super K> k = (Comparable<? super K>) key;//使用元素的自然顺序
    Entry<K,V> p = root;
    while (p != null) {
        int cmp = k.compareTo(p.key);
        if (cmp < 0)//向左找
            p = p.left;
        else if (cmp > 0)//向右找
            p = p.right;
        else
            return p;
    }
    return null;
}
```

获取元素的流程

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220315094428.png)



## 添加元素

添加元素的逻辑不难理解，主要是调整子树的逻辑

```java
public V put(K key, V value) {
	......
    int cmp;
    Entry<K,V> parent;
    if (key == null)
        throw new NullPointerException();
    Comparable<? super K> k = (Comparable<? super K>) key;//使用元素的自然顺序
    do {
        parent = t;
        cmp = k.compareTo(t.key);
        if (cmp < 0) t = t.left;//向左找
        else if (cmp > 0) t = t.right;//向右找
        else return t.setValue(value);
    } while (t != null);
    Entry<K,V> e = new Entry<>(key, value, parent);//创建并插入新的entry
    if (cmp < 0) parent.left = e;
    else parent.right = e;
    fixAfterInsertion(e);//调整
    size++;
    return null;
}
```

添加元素流程图

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220315095932.png)



## 删除元素

**由于红黑树是一棵增强版的二叉查找树，红黑树的删除操作跟普通二叉查找树的删除操作也就非常相似，唯一的区别是红黑树在节点删除之后可能需要进行调整**。现在考虑一棵普通二叉查找树的删除过程，可以简单分为两种情况:

1. 删除点p的左右子树都为空，或者只有一棵子树非空。
2. 删除点p的左右子树都非空。

```java
private void deleteEntry(Entry<K,V> p) {
    modCount++;
    size--;
    if (p.left != null && p.right != null) {// 2. 删除点p的左右子树都非空。
        Entry<K,V> s = successor(p);// 后继
        p.key = s.key;
        p.value = s.value;
        p = s;
    }
    Entry<K,V> replacement = (p.left != null ? p.left : p.right);
    if (replacement != null) {// 1. 删除点p只有一棵子树非空。
        replacement.parent = p.parent;
        if (p.parent == null)
            root = replacement;
        else if (p == p.parent.left)
            p.parent.left  = replacement;
        else
            p.parent.right = replacement;
        p.left = p.right = p.parent = null;
        if (p.color == BLACK)
            fixAfterDeletion(replacement);// 调整
    } else if (p.parent == null) {
        root = null;
    } else { // 1. 删除点p的左右子树都为空
        if (p.color == BLACK)
            fixAfterDeletion(p);// 调整
        if (p.parent != null) {
            if (p == p.parent.left)
                p.parent.left = null;
            else if (p == p.parent.right)
                p.parent.right = null;
            p.parent = null;
        }
    }
}
```

值得注意的是，只有删除节点的颜色是黑色的时候，可能破坏规则5，才会触发调整树逻辑，因为删除红色节点不会破坏红黑树的约束条件。



## TreeSet

`TreeSet` 是对 `TreeMap` 的简单包装，对 `TreeSet` 的函数调用都会转换成合适的 `TreeMap` 方法，因此 `TreeSet` 的实现比较简单

```java
// TreeSet是对TreeMap的简单包装
public class TreeSet<E> extends AbstractSet<E>
    implements NavigableSet<E>, Cloneable, java.io.Serializable
{
	......
    private transient NavigableMap<E,Object> m;
    // Dummy value to associate with an Object in the backing Map
    private static final Object PRESENT = new Object();
    public TreeSet() {
        this.m = new TreeMap<E,Object>();// TreeSet里面有一个TreeMap
    }
    ......
    public boolean add(E e) {
        return m.put(e, PRESENT)==null;
    }
    ......
}
```

