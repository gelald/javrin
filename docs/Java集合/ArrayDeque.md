# ArrayDeque

> ArrayDeque 现在已经逐渐取代 Stack 的位置，称为实现栈功能的首选集合



## 概述

### 从栈说起

栈是一种具有元素先进后出特点的数据结构

虽然 Java 里有一个叫做 Stack 的类，但是当需要使用栈时，Java 已不推荐使用 Stack，而是**推荐使用更高效的 ArrayDeque**，次选是 LinkedList。



### Deque

ArrayDeque 和 LinkedList 都实现了一个 Deque 接口，Deque（double ended queue），表示双向队列，接口内定义了对头尾元素的插入删除等操作，所以既可以当作栈进行使用，也可以当作队列使用。



## 底层实现

从名字可以猜测出 ArrayDeque 底层通过数组实现，为了满足可以同时在数组两端插入或删除元素的需求，该数组还必须是循环的，即**循环数组**，也就是说数组的任何一点都可能被看作起点或者终点。另外，该容器不允许放入`null`元素。

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220314152101.png)

ArrayDeque 包含了两个指针，head 指向循环数组中第一个有效元素，tail 指向循环数组尾端第一个可以插入元素的空位。可以看到 head 不一定总是等于 0，且head 不一定总是比 tail 大。



## 构造方法

因为 ArrayDeque 底层是数组，所以构造方法主要是完成数组的初始化。

与 ArrayList 类似，构造方法有三个重载形式

```java
// 空参构造默认初始化为长度为16的数组
public ArrayDeque() {
    elements = new Object[16];
}

// 传入指定长度来初始化数组
public ArrayDeque(int numElements) {
    allocateElements(numElements);
}

// 传入集合来初始化数组
public ArrayDeque(Collection<? extends E> c) {
    allocateElements(c.size());
    addAll(c);
}
```



需要值得注意的是：数组长度必须是2的倍数，如果传入的值不符合这个条件，需要进行修正

经过系列的移位操作，保证了两个字节中一定是 2 的 n 次幂 - 1 的条件，然后再自增，最终保证了数组初始化长度一定是 2 的 n 次幂

```java
private static final int MIN_INITIAL_CAPACITY = 8;

private static int calculateSize(int numElements) {
    int initialCapacity = MIN_INITIAL_CAPACITY;
    if (numElements >= initialCapacity) {
        initialCapacity = numElements;
        initialCapacity |= (initialCapacity >>>  1);
        initialCapacity |= (initialCapacity >>>  2);
        initialCapacity |= (initialCapacity >>>  4);
        initialCapacity |= (initialCapacity >>>  8);
        initialCapacity |= (initialCapacity >>> 16);
        initialCapacity++;

        if (initialCapacity < 0)   // Too many elements, must back off
            initialCapacity >>>= 1;// Good luck allocating 2 ^ 30 elements
    }
    return initialCapacity;
}
```



## 自动扩容

由于底层是数组，和 ArrayList 类似，当数组空间不够时，就需要进行自动扩容。和 ArrayList 不同，ArrayDeque 的扩容是扩大为原来容量的 2 倍，无论 head 和 tail 扩容前是多少，扩容后都统一为 head = 0，tail = 新数组长度

扩容流程图

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220314153332.png)



扩容的过程中会把数组分为两部分拷贝

```java
private void doubleCapacity() {
    assert head == tail;
    int p = head;
    int n = elements.length;
    int r = n - p; // head右边元素的个数
    int newCapacity = n << 1;//原空间的2倍
    if (newCapacity < 0)
        throw new IllegalStateException("Sorry, deque too big");
    Object[] a = new Object[newCapacity];
    System.arraycopy(elements, p, a, 0, r);//复制右半部分，对应上图中绿色部分
    System.arraycopy(elements, 0, a, r, p);//复制左半部分，对应上图中灰色部分
    elements = (E[])a;
    head = 0;
    tail = n;
}
```



## 添加元素

由于是双向队列，所以添加元素可以从两个方向添加，体现到具体方法就是 addFirst、addLast

```java
public void addFirst(E e) {
    if (e == null)//不允许放入null
        throw new NullPointerException();
    elements[head = (head - 1) & (elements.length - 1)] = e;//下标是否越界
    if (head == tail)//空间是否够用
        doubleCapacity();//扩容
}
```

下标越界的处理解决起来非常简单，`head = (head - 1) & (elements.length - 1)` 就可以了，**这段代码相当于取余，同时解决了 `head` 为负值的情况**。因为`elements.length` 必需是`2`的指数倍，`elements - 1` 就是二进制低位全 `1`，跟 `head - 1` 相与之后就起到了取模的作用，如果 `head - 1 `为负数(其实只可能是-1)，则相当于对其取相对于 `elements.length` 的补码。

addFirst 的工作原理图

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220314165914.png)



```java
public void addLast(E e) {
    if (e == null)//不允许放入null
        throw new NullPointerException();
    elements[tail] = e;//赋值
    if ( (tail = (tail + 1) & (elements.length - 1)) == head)//下标越界处理
        doubleCapacity();//扩容
}
```

addLast 的工作原理图

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220314170008.png)



## 返回元素

返回元素也同样有两个方向，从首端、尾端返回，并且可以选择获取元素是否从集合中删除

pollFirst 删除并返回 ArrayDeque 首端元素

```java
public E pollFirst() {
    E result = elements[head];
    if (result == null)// null值意味着deque为空
        return null;
    elements[h] = null;// 设置为null让GC起作用
    head = (head + 1) & (elements.length - 1);//下标越界处理
    return result;
}
```

peekFirst 返回但不删除 ArrayDeque 首端元素

```java
public E peekFirst() {
    return elements[head]; // elements[head] is null if deque empty
}
```



## 相关 API 归纳

### 栈

和传统的 Stack 容器的 API 对应如下

| Stack   | Deque         | 说明                             |
| ------- | ------------- | -------------------------------- |
| push(e) | addFirst(e)   | 往栈中插入元素，失败抛异常       |
| peek()  | getFirst()    | 获取但不删除栈顶元素，失败抛异常 |
| pop()   | removeFirst() | 获取并删除栈顶元素，失败抛异常   |

> 其实 Deque 关于栈的操作还有另一套 API，只不过和上面列的相比，只是遇到失败会返回特殊值( `false` 或 `null` )，一般情况下使用上面列出的即可



### 队列

和传统的 Queue 容器的 API 对应如下

| Queue     | Deque         | 说明                               |
| --------- | ------------- | ---------------------------------- |
| add(e)    | addLast(e)    | 向队列尾部插入元素，失败抛异常     |
| element() | getFirst()    | 获取但不删除队列首元素，失败抛异常 |
| remove()  | removeFitst() | 获取并删除队列首元素，失败抛异常   |

> 其实 Deque 关于队列的操作还有另一套 API，只不过和上面列的相比，只是遇到失败会返回特殊值( `false` 或 `null` )，一般情况下使用上面列出的即可



### Deque 的 API 一般规律

- 如果操作失败抛异常，那么使用：`addXXX` 、`getXXX` 、`removeXXX`
  - 如果操作首元素，那么就是：`addFirst` 、`getFirst` 、`removeFirst`
  - 如果操作尾元素，那么就是：`addLast` 、`getLast` 、`removeLast`
- 如果操作失败返回特殊值，那么使用：`offerXXX` 、`peekXXX` 、`pollXXX`
  - 如果操作首元素，那么就是：`offerFirst` 、`peekFirst` 、`pollFirst`
  - 如果操作尾元素，那么就是：`offerLast` 、`peekLast` 、`pollLast`
