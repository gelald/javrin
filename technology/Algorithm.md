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

