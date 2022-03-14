# PriorityQueue

## 概述

Java 有一种特殊的队列叫做优先队列。**Java 中优先队列的作用是能保证每次取出的元素都是队列中权值最小的**。这里牵涉到了大小关系，**元素大小的评判可以通过元素本身的自然顺序(natural ordering)，也可以通过构造时传入的比较器**(Comparator)。

Java 中实现优先队列的集合是 PriorityQueue，通过堆实现优先队列，具体是通过完全二叉树实现的堆，而二叉树则是由数组实现的。

<img src="https://gitee.com/ngwingbun/picgo-image/raw/master/images/20220314172348.png" style="zoom:70%;" />

父子节点的编号之间有这样的关系

- leftNo = parentNo * 2 + 1
- rightNo = parentNo * 2 + 2
- parentNo = (nodeNo - 1) / 2

有这样的关系后，可以轻易计算出某一个节点的父节点及其子节点的下标，所以二叉树可以使用数组来实现