---
title: 斐波那契数列
icon: article
category:

- 算法

tag:

- 数组

---

# 斐波那契数列

## 概念

斐波那契数列是一个很经典的数列，在学习递归的时候，经常会拿它来做例子讲解

> 假设一对刚出生的小兔子，过一个月就能长大成大兔子，再过一个月就能生下一对小兔子，并且此后每个月都生一对小兔子，一年内没有发生死亡，问：一对刚出生的兔子，一年内繁殖多少对兔子

那么形成数列就是：0、1、1、2、3、5、8、13、21、34

在数学上，斐波拉契数列的推导式为

$$ F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2), \text{其中}n≥2, n∈N^* $$

## 递归

既然分析出了数学推导式，反映到程序上，第一个最容易想到的方式就是递归，因为这个斐波那契数列就是为递归而生的，推导式天然符合递归的特征！

```java
public int fibonacci(int n) {
  if (n < 2) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

相信这个程序不用过多讲解，基本上就是从推导式翻译成 Java 语言

我们看一下这个程序的开销：

时间复杂度：$O(2^n)$

空间复杂度：$O(1)$

## 备忘录

递归的解法看起来很好，但是有一个弊端，就是在递归的过程中存在了一些“重复计算”

例如现在需要求 n=5 的结果，由推导式可以得知 F(5) 的结果就等于 F(3) + F(4) 的结果

这时候就分别求两个中间值，但是在求 F(4) 的结果时，发现还需要使用前面计算过的 F(3)、F(2) 等，这就白白浪费计算资源了

可以把递归过程中产生的中间值都缓存起来，后续有同样需求时，就拿出来使用

```java
public int fibonacci(int n, Map<Integer, Integer> cache) {
  if (n < 2) {
    return n;
  }
  if (cache.containKey(n)) {
    return cache.get(n);
  }
  int result = fibonacci(n - 1, cache) + fibonacci(n - 2, cache);
  cache.put(n, result);
  return result;
}
```

每次计算前都先去缓存中查询一下有没有计算过，边计算边缓存来达到节省时间的目的，这是典型的空间换时间的手段

我们看一下这个方法的开销：

时间复杂度：$O(n)$

空间复杂度：$O(n)$

## 动态规划

从数列的推导式看出，这个推导式的计算思想是自顶向下的（想求F(n)，需要先求F(n-1)...）

但是我们从一开始寻找规律的时候就是一个一个月来计算出来的，是自底向上的，程序中自然也可以使用这种方式来进行一步一步计算最终需要求的值出来

这种做法我们称为动态规划，动态规划两大要素：状态转移方程、边界条件。状态转移方程就是推导式，边界条件就是 n≥2

```java
public int fibonacci(int n) {
  if (n < 2) {
    return n;
  }
  int p = 0;
  int q = 0;
  int r = 1;
  for(int i = 2;i <= n; i++) {
    p = q;
    q = r;
    r = p + q;
  }
  return r;
}
```

- 程序中的 **p 变量代表数列第一个元素的前一个元素，这里使用 0 来表示**

- 程序中的 q 变量代表数列第一个元素，r 变量代表数列的第二个元素

- 迭代的过程中，p 和 q 变量各自往后移动一位，而 r 变量一直作为两个变量相加的和，用于最终返回结果

<br/>

这种做法把中间使用的变量降低为常量数量级，占用空间更少

时间复杂度：$O(n)$

空间复杂度：$O(1)$

<br/>

<br/>

斐波那契数列真的是一个非常经典、非常值得细究的一个数列

解题的时候从一开始的递归到后面的动态规划，思维的锻炼其实就在此
