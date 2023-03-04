# 二分查找

概述：二分查找参考了 AVL 树的原理对**数组**进行数据查询，每次都用一个**中间值**与目标值做比较从而划分出两个下一轮的查询区间，直到找到目标值为止。



适用场景：**数组中的数据是有序的，而是元素不能重复**



其实在写二分查找，经常容易纠结的点在于：

- 新一轮查找区间的右边界是 middle 还是 middle - 1
- while 条件中要写 left < right 还是 left <= right
- 数组的长度是奇数/偶数时中间值需要怎么取值

总的来说只要把区间划分讨论清楚，上面的问题就迎刃而解了

区间划分方式：

- 写法一：[left, right]
- 写法二：[left, right)



## 写法一

### 数组长度奇数

> 假设数组长度是 7

初始 middle = array.length / 2 = 3

初始 left = 0

初始 right = array.length - 1

target 值和 middle 比

- 如果相等就返回
- 如果小于 middle 值，那么 left 不变，right = middle - 1 (因为 middle)

