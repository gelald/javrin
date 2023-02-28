---
title: PriorityQueue
icon: article
category:

- Java集合

---

# PriorityQueue

## 概述

Java 有一种特殊的队列叫做优先队列。**Java 中优先队列的作用是能保证每次取出的元素都是队列中权值最小的**。这里牵涉到了大小关系，**元素大小的评判可以通过元素本身的自然顺序(natural ordering)，也可以通过构造时传入的比较器**(Comparator)。

Java 中实现优先队列的集合是 PriorityQueue，通过堆实现优先队列，具体是通过完全二叉树实现的堆（任意一个非叶子结点的权值都不大于其左右结点的权值），而二叉树则是由数组实现的。

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220314172348.png)



父子节点的编号之间有这样的关系

- leftNo = parentNo * 2 + 1
- rightNo = parentNo * 2 + 2
- parentNo = (nodeNo - 1) / 2

有这样的关系后，可以轻易计算出某一个节点的父节点及其子节点的下标，所以二叉树可以使用数组来实现



## 构造方法

空参的构造方法生成的数组默认长度是11

```java
private static final int DEFAULT_INITIAL_CAPACITY = 11;

public PriorityQueue() {
    this(DEFAULT_INITIAL_CAPACITY, null);
}
```



## 添加元素

对堆中添加元素必然会导致小顶堆的特性被破坏，所以需要进行必要的调整

```java
public boolean offer(E e) {
    if (e == null)//不允许放入null元素
        throw new NullPointerException();
    modCount++;
    int i = size;
    if (i >= queue.length)
        grow(i + 1);//自动扩容
    size = i + 1;
    if (i == 0)//队列原来为空，这是插入的第一个元素
        queue[0] = e;
    else
        siftUp(i, e);//调整
    return true;
}
```

上述代码中，扩容函数 `grow()` 类似于 `ArrayList` 里的 `grow()` 函数，就是再申请一个更大的数组，并将原数组的元素复制过去，这里不再赘述。

需要注意的是 `siftUp(int k, E x)` 方法，该方法用于插入元素 `x` 并维持堆的特性。

调整的过程为 : 从 `k` 指定的位置开始，将 `x` 逐层与当前点的 `parent` 进行比较并交换，直到满足 `x >= queue[parent]` 为止

```java
private void siftUp(int k, E x) {
    while (k > 0) {
        //parentNo = (nodeNo-1)/2 用无符号右移表示处以2
        int parent = (k - 1) >>> 1;
        Object e = queue[parent];
        if (comparator.compare(x, (E) e) >= 0)//调用比较器的比较方法
            break;
        queue[k] = e;
        k = parent;
    }
    queue[k] = x;
}
```



## 获取元素

从堆中获取元素，每次都会获取堆顶权值最小的那一个元素出来。由于堆使用数组来实现，所以根据索引关系，索引为0的元素就是堆顶元素，所以获取元素操作是常数时间

```java
public E peek() {
    if (size == 0)
        return null;
    return (E) queue[0];//0下标处的那个元素就是最小的那个
}
```



## 删除元素

删除元素常用的方式是删除并返回堆顶元素

- 获取堆顶元素并将其返回并删除

  ```java
  public E poll() {
      if (size == 0)
          return null;
      int s = --size;
      modCount++;
      E result = (E) queue[0];//0下标处的那个元素就是最小的那个
      E x = (E) queue[s];
      queue[s] = null;//指向null促进GC的工作
      if (s != 0)
          siftDown(0, x);//调整
      return result;
  }
  ```

- 与添加元素类似，删除元素后也需要进行堆的调整

  ```java
  private void siftDown(int k, E x) {
      int half = size >>> 1;
      while (k < half) {
      	//首先找到左右孩子中较小的那个，记录到c里，并用child记录其下标
          int child = (k << 1) + 1;//leftNo = parentNo*2+1
          Object c = queue[child];
          int right = child + 1;
          if (right < size &&
              comparator.compare((E) c, (E) queue[right]) > 0)
              c = queue[child = right];
          if (comparator.compare(x, (E) c) <= 0)
              break;
          queue[k] = c;//然后用c取代原来的值
          k = child;
      }
      queue[k] = x;
  }
  ```

  调整堆的流程图

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220314193835.png)
  
  

