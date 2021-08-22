# 二分法

## 适用场景

## 注意事项

1. 遍历的条件

   1. `while(left <= right)`；退出循环的条件是left>right，需要思考最终返回left还是right
   2. `while(left < right)`；退出循环的条件是left=right，只需返回left或right即可，因为是一样的值
   3. `while(left+1 <= right)`；退出循环的条件是left+1=right，需要思考最终返回left还是right

   **推荐使用`while(left < right)`**

2. 边界收缩，mid可以分到左边或者分到右边

   - 左边，即区间分成[left, mid]和[mid+1, right]

     ```
     left = mid + 1;
     right = mid;
     ```

   - 右边，即区间分成[left, mid-1]和[mid, right]

     ```
     left = mid;
     right = mid - 1;
     ```

     

## 模板

```java
public int binarySearch(int[] nums, int target) {
  int left = 0, right = nums.length; // 注意
  while(left < right) { // 注意
    int mid = (left + right) >>> 1; // 注意
    if(nums[mid] == target) {
      // 相关逻辑
    } else if(nums[mid] < target) {
      left = mid + 1; // 注意
    } else {
      right = mid; // 注意
    }
  }
  // 相关返回值
  return 0;
}
```



# 滑动窗口

滑动窗口模式是用于在给定数组或链表中从第一个元素开始**滑动一个特定大小的窗口**并逐个元素地向右滑，并根据你所求解的问题调整窗口的长度。

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210816145253.png)

## 适用场景

1. 问题的输入是一种线性数据机构，比如链表、数组或字符串
2. 要求寻找最长/最短的子字符串、子数组或者所需的值

例子

- 大小为 K 的子数组的最大和
- 带有 K 个不同字符的最长子字符串
- 寻找字符相同但排序不一样的字符串



# 双指针

二指针（Two Pointers）是这样一种模式：两个指针以**一前一后的模式**在数据结构中**迭代**，直到一个或两个指针达到某种特定条件

二指针通常在排序数组或链表中搜索配对时很有用；**比如当你必须将一个数组的每个元素与其它元素做比较时**。如果只有一个指针，必须继续在数组中循环回来才能找到答案。这种使用单个迭代器进行来回在时间和空间复杂度上都很低效——这个概念被称为「渐进分析（asymptotic analysis）」

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210816153450.png)

## 适用场景

1. 处理**排序数组**
2. 查找满足某些约束的一组元素

例子

- 求一个排序数组的平方
- 求总和为零的三元组
- 比较包含回退（backspace）的字符串



# 快慢指针

快速和慢速指针方法也被称为 Hare & Tortoise 算法，该算法会使用两个在数组（或序列/链表）中**以不同速度移动的指针**

通过以不同的速度进行移动（比如在一个循环链表中），该算法证明这两个指针注定会相遇。**只要这两个指针在同一个循环中，快速指针就会追赶上慢速指针**

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210816155229.png)

## 适用场景

1. 处理**链表中的循环**的问题
2. 当你需要知道特定元素的位置或链表的总长度时

例子

- 链表循环
- 回文链表
- 环形数组中的循环

### 如何判断使用快慢指针而不是双指针

- 在不能反向移动的单链链表中，不适合使用双指针，因为双指针是需要一个一前一后的模式
- 如果是想确定一个链表是否是回文时，需要使用快慢指针
- 双指针常用于数组、快慢指针常用于链表



# 广度优先搜索

广度优先搜索（Breadth first search, BFS）

# 深度优先搜索

深度优先搜索（Depth first search, DFS）
