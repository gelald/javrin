# 二分查找

概述：二分查找参考了二叉查找树的原理对**数组**进行数据查询，每次都用一个**中间值**与目标值做比较从而划分出两个下一轮的查询区间，直到找到目标值为止。



适用场景：**数组中的数据是有序的，而是元素不能重复**



在写二分查找，经常容易纠结的点在于：

- 新一轮查找区间的右边界是 middle 还是 middle - 1
- while 条件中要写 left < right 还是 left <= right
- 数组的长度是奇数和偶数时，对中间值有什么影响



总的来说只要把区间划分讨论清楚，上面的问题就迎刃而解了

区间划分方式：

- 写法一：[left, right]
- 写法二：[left, right)



## 写法一

我们定义 target 是在一个在左闭右闭的区间里，**也就是[left, right]** 



### 程序实现

- 初始 left 是最左边的索引，初始 right 是最右边的索引

  

- 循环条件：left <= right，当 left = right 的时候，区间内只有一个值，此时这个值也是有比较意义的

  

- middle = ( left + right ) / 2

  > 为了防止 left + right 的值溢出取值范围，用一个等式替换：left + (( right - left ) / 2)

  

- target 值和 middle 比

  - 如果相等就返回索引值

  - 如果小于 middle 值，那么 left 不变，right = middle - 1 (因为 middle 已经被比较过了，所以下一个区间应该不包含 middle 值)

  - 如果大于 middle 值，那么 right 不变，left = middle + 1 (理由同上)




所以整体代码如下

```java
public void binarySearch(int[] array, int target) {
    if(array.length == 0) {
        return -1;
    }
    if(target < array[0] || target > array[array.length - 1]) {
        return -1;
    }
    int left = 0;
    int right = array.length - 1;
    while(left <= right) {
        int middle = left + ((right - left) / 2);
        if(target == array[middle]) {
            //如果在数组中找到了目标值，返回下标
            return middle;
        } else if (target > array[middle]) {
            //大于中间值，那么target可能位于右边的区间[middle+1, right]
            left = middle + 1;
        } else {
            //小于中间值，那么target可能位于左边的区间[left, middle+1]
            right = middle - 1;
        }
    }
    return -1;
}
```



### 如果数组长度是奇数

假设如下数组：[1, 4, 7, 9, 16, 20, 23]，数组长度是7，目标值是 1

- 初始
  - left = 0，right = 6
- 第一次循环
  - middle = 3，array[middle] = 9
  - 大于 target 值，圈定左边的区间，right = 2
- 第二次循环
  - middle = 1，array[middle] = 4
  - 大于 target 值，圈定左边的区间，right = 0
- 第三次循环
  - middle = 0，array[middle] = 1
  - 等于 target 值，返回下标 0



### 如果数组长度是偶数

假设如下数组：[1, 4, 7, 9, 16, 20]，数组长度是6，目标值是 20

- 初始
  - left = 0，right = 5
- 第一次循环
  - middle = 2， array[middle] = 7
  - 小于 target 值，圈定右边区间，left = 3
- 第二次循环
  - middle = 4，array[middle] = 16
  - 小于 target 值，圈定右边区间，left = 5
- 第三次循环
  - middle = 5，array[middle] = 20
  - 等于 target 值，返回下标 5



**可以看到只要区间变化、中间值讨论得合理，无论数组长度是奇数还是偶数，都是没有影响的**



## 写法二

我们定义 target 是在一个在左闭右开的区间里，**也就是[left, right)** 



### 程序实现

- 初始 left 是最左边索引，初始 right 是数组长度 (因为定义了左闭右开区间的话，右边界是无法访问的)

  

- 循环条件：left < right，因为在左闭右开区间中，是不存在 left == right 的情况的

  

- middle 值不变，依旧是取中间值 middle = ( left + right ) / 2

  > 右边界无法触及，基本上的规律是写法二的 right 比 写法一的 right 大 1，虽然大 1 可能对中间值产生影响，但是是不会影响最终结果的，所以依旧这么取中间值

  

- target 值和 middle 比

  - 如果相等就返回索引值

  - 如果小于 middle 值，那么 left 不变，right = middle (时刻记住右边界是不可触达的)

  - 如果大于 middle 值，那么 right 不变，left = middle + 1 (这个 middle 已经被比较过了，所以区间中不需要再包含 middle 值)



所以整体代码如下

```java
public void binarySearch(int[] array, int target) {
    //数组为空的情况
    if(array.length == 0) {
        return -1;
    }
    //确定目标值是否位于数组中
    if(target < array[0] || target > array[array.length - 1]) {
        return -1;
    }
    int left = 0;
    int right = array.length;
    while(left < right) {
        int middle = left + ((right - left) / 2);
        if(target == array[middle]) {
            return middle;
        } else if (target  < array[middle]) {
            //因为right右边界是无法触及的，再加上middle不应该包含在新的区间中
            right = middle;
        } else {
            //左边界更新规则和写法一无异
            left = middle + 1;
        }
    }
    return -1;
}
```



## 总结

用主流的两种区间划定方案讨论了二分查找的写法，解决了以前写二分查找的纠结点
