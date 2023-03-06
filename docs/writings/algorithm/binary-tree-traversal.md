# 二叉树的遍历方式

二叉树从遍历方向可以分为深度优先搜索和广度优先搜索

## 二叉树通用定义

```java
public class TreeNode {
	int val;
	TreeNode left;
	TreeNode right;
	
    TreeNode() {}
    
    TreeNode(int val) { this.val = val; }
		
    TreeNode(int val, TreeNode left, TreeNode right) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}
```





## 深度优先搜索

深度优先搜索，Depth First Search

先序遍历：先使用当前节点，再遍历左子树，再遍历右子树



### 递归写法

递归本质是方法不断进栈出栈的过程，但是层次太深使用递归可能会导致栈溢出

```java
public void dfsRecursively(TreeNode root) {
    //递归结束条件
    if(root == null) {
        return;
    }
    //使用这个节点
    System.out.println(root.val);
    //递归左子树
    dfsRecursively(root.left);
    //递归右子树
    dfsRecursively(root.right);
}
```



### 非递归写法

其实可以把进栈出栈的动作放到对树节点上，不用担心递归那样层级过深导致的栈溢出问题

```java
public void dfsNonRecursively(TreeNode root) {
    if(root == null) {
        return;
    }
    //定义一个栈容器
    Deque<TreeNode> deque = new ArrayDeque<>();
    //把根节点入栈
    deque.addFirst(root);
    //进行入栈出栈的动作
    while(!deque.isEmpty()) {
        //把这个节点出栈，并使用这个节点
        TreeNode node = deque.removeFirst();
        System.out.println(node.val);
        //左子树入栈
        if(node.left != null) {
        	deque.addFirst(root.left);
        }
        //右子树入栈
        if(node.right != null) {
	        deque.addFirst(root.right);    
        }    
    }
}
```



## 广度优先搜索

广度优先搜索：Breadth First Search

广度优先搜索就是利用队列，利用队列先进先出的特点，层层往下遍历二叉树节点

```java
public void bfs(TreeNode root) {
    if(root == null) {
        return;
    }
    //定义一个队列容器
    Deque<TreeNode> deque = new ArrayDeque<>();
    //把根节点放入队列
    deque.addLast(root);
    
    while(!deque.isEmpty()) {
        //节点出队列，并使用这个节点
        TreeNode node = deque.removeFirst();
        System.out.println(node.val);
        //左子树进队列
        if(node.left != null) {
            deque.addLast(node.left);
        }
        //右子树进队列
        if(node.right != null) {
            deque.addLast(node.right);
        }
    }
}
```

