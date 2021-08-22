# HashMap源码学习

## 前提知识

- HashMap的数据结构是：**数组+链表+红黑树**

  ![image-20200625165758447](https://gitee.com/ngyb/pic/raw/master/007S8ZIlgy1gg4n24g07uj31500jeq5e.jpg)

- 数据存储形式：key-value形式；用Node对象来管理，记录了key、value、hash、next(指向下一个结点所持有的引用)![image-20200625223702194](https://gitee.com/ngyb/pic/raw/master/007S8ZIlgy1gg4wuvac6yj30x807i0tl.jpg)

- 引入红黑树的目的：减少链表长度，查询/插入的效率更高


## put方法的执行流程

1. 计算哈希值以确定下标

   1. 用存入的key调用`hashCode()`方法，得到一个哈希值，这个哈希值一般较大
   2. 通过一定的手段，让这个大数值哈希值落在数组长度的区间之中

   - 比较容易想到的做法：

     ```
     //默认长度为例
     key.hashCode() ==> hash
     hash%16 ==> [0,15]
     ```

   - 不足之处1：大数值做取模运算的效率较低

   - 补充知识：取模运算转换成与运算

     ```
     如果一个数x是2的n次幂，那么hash%n = hash&(n-1)
     与运算比模运算效率更高
     ```

   - 做法改良1：

     ```
     //默认长度为例
     key.hashCode() ==> hash
     hash&(16-1) ==> [0,15]
     ```

   - 不足之处2：在与运算中决定索引的部分在于数组长度，所以出现重复的概率较大，可能导致出现的链表长度较长，不能充分利用数组，查询的效率也较低

     ```
     hash值011110000和010010000不一样，但是和15的与运算是一样的
     ```

   - 做法改良2：把高16位和低16位做**「异或」**运算

     ```
     必须保证数组长度是2的n次幂，否则参与运算的数(2^n - 1)不是01111的结构，有部分位数始终为0，这样重复的概率又会增大
     
     注意：手动传入HashMap的容量不是2的n次幂的话，构造方法中会有所处理
     this.threshold = tableSizeFor(initialCapacity);//把数组大小调整成2的n次幂
     ```

     ![image-20200626000041882](https://gitee.com/ngyb/pic/raw/master/007S8ZIlgy1gg4z9x8veej31ba0g40ul.jpg)

   - **面试题：为什么HashMap中的hash不使用key.hashCode()，而是采用结果的高低16位做异或运算**

     ```
      为了降低hash值重复的概率
     ```

   3. **最终做法：**使用高16位和低16位进行异或，然后和（容量-1）进行&运算

      ```java
      (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
      index = (n - 1) & hash
      ```

2. 如果数组为空，准备数组, **默认大小16**

   ```java
   //HashMap中的Node数组
   transient Node<K,V>[] table;
   //初始化
   n = (tab = resize()).length;
   
   //resize
   else {	// zero initial threshold signifies using defaults
     newCap = DEFAULT_INITIAL_CAPACITY; //16
     //...
   }
   //使用确定下来的容量去初始化数组
   Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
   ```

3. 确定创建出来的Node存放在数组的哪一个位置中，如果该位置没有存放元素，则直接放，如果有则需要考虑

   - **index的确定**：哈希值 & (数组长度 - 1)

     ```java
     i = (n - 1) & hash;
     ```

   - 如果该位置没有存放元素，直接存放

     ```java
     tab[i] = newNode(hash, key, value, null);
     ```

   - 如果已经存在元素

     - 如果两个Node的key或者hash相同，那么直接替换value，**不需要创建新的Node**

       ```java
       //p是table[i]上已存在的头节点
       if (p.hash == hash && ((k = p.key) == key || (key != null && key.equals(k))))
       	e = p;
       ```

     - 如果key值不相同，那么用尾插法的方式往下存储，顺延成单向链表的形式

       ```
       从头节点开始遍历，遍历到最后一个next为空的节点后再插入到链表中去
       
       如果key或hash相同的话，就替换value
       
       //注意 
       在JDK1.7的HashMap中按照头插法的方式插入，也就是说，新来的节点是新的头节点
       在JDK1.8的HashMap中按照尾插法的方式插入，新来的节点是尾节点
       解决的问题：效率/链表循环
       ```

     - 如果插入后链表的长度会超过8，那么会在插入之前先转换成红黑树

       ```java
       if (binCount >= TREEIFY_THRESHOLD - 1)
       	treeifyBin(tab, hash);
       ```

     - 如果原本是红黑树，那么按照红黑树的结构存储

       ```java
       else if (p instanceof TreeNode)
         e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
       ```

4. 如果插入后，HashMap中的节点数量大于（容量*扩容因子），那么HashMap会进行扩容

## HashMap容量调整方面的内容

- HashMap默认长度是16，符合2的n次幂的条件

- HashMap默认扩容因子是0.75f

- 默认数组大小扩容标准：16*0.75=12

- 链表的节点数 >= 8且数组长度>=64，链表会转换成红黑树，当数组长度**不足64**，节点 hash 的碰撞率可能会比较高，进而导致链表长度较长，**优先扩容而不是树化**

- 红黑树节点数 <= 6，红黑树会转换成链表

- 数组默认大小16，每当增加一个Node，就++size，当size超过（数组长度*扩容因子）就会扩容

- 扩容

  ```java
  // Initializes or doubles table size.
  // 初始化或双倍数组的长度
  Node<K, V>[] resize();
  
  //1、判断当前容量是否超过了最大值2的30次幂
  //2、扩容是直接当前容量*2，并判断扩容后是否超过最大值
  //3、扩容因子也要随着扩容而*2
  //4、用新的容量创建新的数组
  //5、数据迁移到新的数组
  	//1、普通节点迁移：像普通插入一样，计算hash&(容量-1)得到index并放入新数组
  	//2、红黑树迁移
  	//3、链表迁移：通过下面这个条件，构建两个链表
  	(e.hash & oldCap) == 0
    //如果这个结果等于0，那么它的hash和新旧数组容量做&运算的结果是相同的，那么代表它在新旧数组的位置是相同的
    //如果这个结果等于1，那么它的hash和新旧数组容量做&运算的结果相差了oldCap，那么代表它在新数组的位置是（旧数组的位置+旧数组的容量）
    //位置只有两种可能：1、在旧数组下标的位置；2、在旧数组下标+旧数组容量的位置
  ```

  ![image-20200626160734777](https://gitee.com/ngyb/pic/raw/master/007S8ZIlgy1gg5r80fninj31j70u0e66.jpg)



## 抛开HashMap，hash冲突有哪些解决方法

- 开放定址法
- 链地址法
- 重新hash

## 多线程方面

多线程操作和单线程操作的结果不一致，就会引发线程安全的问题

---

HashTable，解决了HashMap多线程不安全的问题，方式：基本上每个方法都加上了`synchronized`关键字。效率较低，因为synchronized方法执行时，会把整个对象锁住

ConcurrentHashMap，也解决了HashMap多线程不安全的问题，方式：细化每一步操作，在最有可能出现线程安全问题的地方加锁即可，提升效率

- 初始化数组大小。使用CAS乐观锁

  ```java
  Node<K,V>[] tab; int sc;
  while ((tab = table) == null || tab.length == 0) {
    if ((sc = sizeCtl) < 0)
      Thread.yield(); // 第二个线程同时进来的话，线程让步，不执行else if
    else if (U.compareAndSwapInt(this, SIZECTL, sc, -1)) {
      try {
        if ((tab = table) == null || tab.length == 0) {
          int n = (sc > 0) ? sc : DEFAULT_CAPACITY;
          @SuppressWarnings("unchecked")
          Node<K,V>[] nt = (Node<K,V>[])new Node<?,?>[n];
          table = tab = nt;
          sc = n - (n >>> 2);
        }
      } finally {
        sizeCtl = sc;  //修改sizeCtl
      }
      break;
    }
  }
  ```

- put元素。使用CAS乐观锁

- put不是头节点的元素。不管是红黑树还是链表，使用局部的synchronized(obj){}，这个锁的对象是当前数组的头节点

- 扩容。只能让一个线程进行扩容，当发现其他线程在扩容时，停止进行插入操作，帮助扩容，帮助的话是从后往前领取16个容量

  ```java
  else if ((fh = f.hash) == MOVED)
  	tab = helpTransfer(tab, f);
  ```

  

# HashMap的遍历方式与性能分析

## 遍历

### 遍历方法

4类7种

1. 迭代器(Iterator)

   1. EntrySet

      ```java
      Iterator<Map.Entry<Integer, String>> iterator = map.entrySet().iterator();
      while (iterator.hasNext()) {
        Map.Entry<Integer, String> entry = iterator.next();
        System.out.println(entry.getKey());
        System.out.println(entry.getValue());
      }
      ```

   2. KeySet

      ```java
      Iterator<Integer> iterator = map.keySet().iterator();
      while (iterator.hasNext()) {
        Integer key = iterator.next();
        System.out.println(key);
        System.out.println(map.get(key));
      }
      ```

2. For Each

   1. EntrySet

      ```java
      for (Map.Entry<Integer, String> entry : map.entrySet()) {
        System.out.println(entry.getKey());
        System.out.println(entry.getValue());
      }
      ```

   2. KeySet

      ```java
      for (Integer key : map.keySet()) {
        System.out.println(key);
        System.out.println(map.get(key));
      }
      ```

3. Lambda表达式

   ```java
   map.forEach((key, value) -> {
     System.out.println(key);
     System.out.println(value);
   });
   ```

4. Stream遍历

   1. 单线程Stream

      ```java
      map.entrySet().stream().forEach((entry) -> {
        System.out.println(entry.getKey());
        System.out.println(entry.getValue());
      });
      ```

   2. 多线程Stream

      ```java
      map.entrySet().parallelStream().forEach((entry) -> {
        System.out.println(entry.getKey());
        System.out.println(entry.getValue());
      });
      ```



### 性能测试

**parallelStream>entrySet>stream>keySet**

原因分析：

1. 多线程stream性能一定是最好的
2. 虽然stream遍历的都是entrySet，但是比普通遍历要慢
3. entrySet比keySet快是因为，entrySet取值只需entry.getValue(key)，key与value都已经记录到entry对象中，只遍历一次；keySet因为要map.get(key)，相当于嵌套两层遍历



## 删除安全性测试

1. 迭代器方式

   ```java
   Iterator<Map.Entry<Integer, String>> iterator = map.entrySet().iterator();
   while (iterator.hasNext()) {
       Map.Entry<Integer, String> entry = iterator.next();
       if (entry.getKey() == 1) {
           System.out.println("del:" + entry.getKey());
           iterator.remove();
       } else {
           System.out.println("show:" + entry.getKey());
       }
   }
   ```

2. for each方式

   ```java
   for (Map.Entry<Integer, String> entry : map.entrySet()) {
       if (entry.getKey() == 1) {
           System.out.println("del:" + entry.getKey());
           map.remove(entry.getKey());// Throws
       } else {
           System.out.println("show:" + entry.getKey());
       }
   }
   ```

3. lambda表达式

   ```java
   map.forEach((key, value) -> {
       if (key == 1) {
           System.out.println("del:" + key);
           map.remove(key);// Throws
       } else {
           System.out.println("show:" + key);
       }
   });
   ```

   ```java
   // 根据 map 中的 key 去判断删除
   map.keySet().removeIf(key -> key == 1);
   map.forEach((key, value) -> {
       System.out.println("show:" + key);
   });
   ```

4. stream方式

   ```java
   map.entrySet().stream().forEach((entry) -> {
       if (entry.getKey() == 1) {
           System.out.println("del:" + entry.getKey());
           map.remove(entry.getKey());// Throws
       } else {
           System.out.println("show:" + entry.getKey());
       }
   });
   ```

   ```java
   map.entrySet().stream().filter(m -> 1 != m.getKey()).forEach((entry) -> {
       if (entry.getKey() == 1) {
           System.out.println("del:" + entry.getKey());
       } else {
           System.out.println("show:" + entry.getKey());
       }
   });
   ```

结论：

1. **遍历的过程中不允许使用map.remove来删除元素**
2. **使用迭代器遍历entrySet来删除是最高效率、最安全的方法**
3. lambda表达式删除元素使用removeIf方法
4. stream删除元素使用filter方法



# HashMap常见面试题

### 重要的属性

默认的初始容量16

默认负载因子0.75

容量阈值=容量*负载因子，当元素个数超过容量阈值，hashmap会进行扩容

table数组存放的是元素（也称链表的引用），初始化是在扩容方法里面进行初始化的（执行put方法时，会去检查table是否为空，如果为空则执行扩容方法）

### HashMap数据结构

数组+链表+红黑树，一般情况下，当链表长度大于等于8且数组长度大于等于64，链表会自动转换成红黑树。当数组长度**不足64**，节点 hash 的碰撞率可能会比较高，进而导致链表长度较长，**优先扩容而不是树化**

### HashMap工作原理

HashMap底层是数组和单向链表的实现，通过put方法和get方法实现存储和查询

### 数组长度为什么是 2 的n次幂

1. (n - 1) & hash，当n为2次幂时，会满足一个公式：(n - 1) & hash = hash % n，&运算要比%运算效率高
2. 能保证索引值肯定在capacity 中，不会超出数组长度。因为索引的计算是需要和n - 1进行与运算，得出的结果必然小于等于n - 1

### HashMap如何保证数组的长度是2的n次幂

1. 默认的数组长度是`1<<4`，就是16
2. 如果在构造方法中传入自定义的数组长度，那么HashMap会有`tableSizeFor()`方法，来调整初始长度，获取大于这个长度的最小的2的n次幂的数值，以此作为数组的长度。这个`tableSizeFor`方法的原理是不断地进行或运行，把最高位的1后面的位全部变成1，最后判断是否在[0,2^30]，如果是，则分别取值为1、2^30，否则在原结果上再加1，就得到了2的n次幂了。

### 当两个对象的 hashCode 相同会发生什么

hashCode相同，不一定就是相等的（equals方法判断），所以两者的数组下标相同，发生碰撞。HashMap对hash碰撞的做法是链地址法，所以这个对象会存到对应索引的链表中去

### 为什么要重写hashCode和equals方法

当在HashMap中存储时采用的键是自定义对象，需要重写equals方法。因为HashMap 插入元素时是根据元素的hash值在数组中的位置，所以HashMap 的 key 需要重写 equals 和 hashcode 方法。

### 有没有重写过hashCode和equals方法

```java
public class Person {  
  Integer id;  
  String name;  

  public Person(Integer id, String name) {  
    this.id = id;  
    this.name = name;  
  }  

  @Override
  public int hashCode() { 
    return id.hashCode(); 
  }

  @Override  
  public boolean equals(Object obj) {  
    if (obj == null) return false;  
    if (obj == this) return true;  
    if (obj instanceof Person) {  
      Person person = (Person) obj;  
      if (this.id == person.id)  
        return true;  
    }  
    return false;  
  }  

  public static void main(String[] args) {  
    Person p1 = new Person(1, "aaa");  
    Person p2 = new Person(1, "bbb");  
    HashMap<Person, String> map = new HashMap<>();  
    map.put(p1, "这是p1");  
    System.out.println(map.get(p2));  
  }  
}
```

如果不重写 hashcode 方法时，插入 p1 后便无法用 p2 取出元素，这是因为 p1 和 p2 的哈希值不相等。

如果不重写equals方法时，也不管用，因为即使hash值相等，但是还要比较key是否「相等」，基本类型通过`==`，引用类型通过`equals`

### hash方法原理

获取键的hashCode，然后让高16位和低16位进行异或运算，具体做法是把hashCode无符号右移16位。原因：为了让对象的hashCode的32位值中只要有一位发生改变，整个hash方法的返回值就会改变，尽可能减少碰撞

### 确定索引的原理

本质是让一个较大的数值落入到一个较小的区间中，做法：可以使用hash方法的返回值和数组长度做一个取模运算，结果肯定是落入到数组长度的范围中，取模运算的效率较低；当数组长度满足2的n次幂时，hash%n=hash&(n-1)，位运算效率比取模运算效率高

### put方法执行流程

1. 调用`hash()`方法并通过&(数组长度-1)来确定元素在数组中的索引
2. 如果没有发生碰撞，则直接放入数组中
3. 如果出现碰撞（`hash`相同），检查该位置上的链表。
   1. 如果遍历到的元素的`hash`相同，`key`也相等(用`==`和`equals`方法进行比较)，则说明这两个键是相等，替换`value`即可
   2. 如果链表还没树化，则以尾插法存储到链表中，如果键相等，则采用上述做法；如果插入后链表长度超过8个，就执行`treeifyBin()`方法，这个方法会进一步检查数组长度，再决定是否树化。因为当 table 数组容量比较小时，元素的碰撞率可能会比较高，进而导致链表长度较长。这个时候应该优先扩容，而不是立马树化。
   3. 如果已经树化，则以红黑树的插入方式进行插入
4. 如果数组元素超过12个(默认的数组长度*默认的负载因子0.75=12)，那么数组执行`resize()`方法进行扩容

### 扩容方法执行流程

如果数组为空，那么指定数组的初始容量为16，初始的阈值为16*0.75=12，并按容量来创建数组

如果数组不为空，一般容量不会达到1<<30，所以考虑普通的情况，普通的情况为`table`的容量扩大为原来的2倍，`threshold`阈值也扩大为原来的2倍。

接下来是元素的迁移

1. 普通节点迁移：像普通插入一样，计算`hash&(容量-1)`得到index并放入新数组；
2. 红黑树迁移，需要对红黑树进行拆分；
3. 链表迁移：通过这个条件`(e.hash & oldCap) == 0`，如果这个结果等于0，那么它的hash和新旧数组容量做&运算的结果是相同的，那么代表它在新旧数组的位置是相同的；如果这个结果最高位等于1，那么它的hash和新旧数组容量做&运算的结果相差了oldCap，那么代表它在新数组的位置是（旧数组的位置+旧数组的容量）。元素在新数组中位置只有两种可能：1、在旧数组下标的位置；2、在旧数组下标+旧数组容量的位置

### get方法执行流程

1. 先调用`hash()`方法来得出hash值
2. 根据hash值和(长度-1)做与运算
3. 得出索引后看看数组对应索引的元素的键是否和需要寻找元素的键相等(hash、equals)
4. 如果不相等，往下看链表，往后遍历，直到找到或遍历结束；如果是红黑树结构，按照红黑树的查找方式来查找

### remove方法执行流程

1. 先确定数组中的索引
2. 根据key是否相等来判断数组中的元素是否为需要找的那个元素(hash、equals)
3. 如果不相等，往后遍历链表；如果是红黑树结构，按照红黑树的查找方式来查找
4. 看看是否能寻找到对应的元素，如果寻找到就删除
   1. 数组中的节点（链表第一个节点）：让第二个节点成为第一个节点`tab[index] = node.next; `
   2. 红黑树节点：红黑树的删除方式`removeTreeNode`方法会对红黑树进行变色、旋转等操作来保持红黑树的平衡结构
   3. 链表中的节点：链表的删除方式

### HashMap 的 table 的容量如何确定？loadFactor 是什么？该容量如何变化？这种变化会带来什么问题？

1. `table`的大小是由`capacity`这个参数确定的，默认是16，最大是1<<<30，可以构造方法传入，并且会由`tableSizeFor()`方法动态调整成2的n次幂，方便后续计算元素的index
2. `loadFactor`是负载因子，由它和数组大小来决定是否需要扩容，默认是0.75。阈值=数组大小*负载因子，当数组中元素的个数超过阈值，那么这时候会动态扩容
3. 扩容使用`resize()`方法，注意该方法同时是初始化数组的方法。将table长度变为原来的2倍
4. 扩容的影响：当数据量大但初始化容量比较小时，频繁地扩容会带来频繁地创建数组并搬运元素的动作，比较影响性能。比如：有1025个元素需要存到HashMap中，但是初始化没有指定容量，默认是16，那么需要进行8次扩容

### modCount属性的理解

在 HashMap 中有一个名为 modCount 的变量，它用来表示集合被修改的次数，修改指的是插入元素或删除元素，源码中在最后都会对 modCount 进行自增

当我们在遍历 HashMap 时，每次遍历下一个元素前都会对 modCount 进行判断，若和原来的不一致说明集合结果被修改过了，然后就会抛出异常。在HashIterator中，nextNode方法中只要modCount被修改过，就抛出ConcurrentModificationException异常

迭代器中的remove方法，在删除完元素后，会维持modCount不变。所以需要在遍历中删除HashMap的节点时，需要使用迭代器

在HashIterator中，nextNode方法中只要modCount被修改过，就抛出ConcurrentModificationException异常

### 红黑树的见解

- 每一个节点要么是红色，要么是黑色
- 根节点一定是黑色
- 每一个叶子节点都是黑色(的空节点)
- 如果节点是红色的，则它的子节点必须是黑色的（反之不一定）（**不存在两个连续的红色节点**）
- 从根节点到叶节点或空子节点的每条路径，必须包含相同数目的黑色节点（即相同的黑色高度）

### 链地址法导致的链表过深问题为什么不用二叉查找树代替，而选择红黑树？为什么不一直使用红黑树？

二叉树存在一个缺陷，在最坏的情况下会变成线性结构，这就跟原来链表一样，存在深度很深的问题，遍历查询会很慢。

红黑树在插入新数据后可以需要通过左旋，右旋、变色这些操作来保持平衡，引入红黑树主要是为了解决链表查询深度的问题，我们知道红黑树属于平衡二叉树，但是为了保持“平衡”是需要付出代价的，但是该代价所损耗的资源要比遍历线性链表要少，所以当长度大于8的时候，会使用红黑树，如果链表长度很短的话，根本不需要引入红黑树，引入反而会慢。

### jdk1.8对HashMap做了哪些改变

- 在jdk1.8中如果链表的长度超过了8，且数组长度大于64，那么链表将转换为红黑树；如果数组长度小于64，即使链表长度超过8，那么这时也是扩容，因为考虑到数组长度较小时，hash碰撞的可能性较高，为避免链表的深度过深，优先考虑扩容

- 发生hash碰撞时，jdk1.7会在链表采用头插法的方式插入，而jdk1.8会在链表采用尾插法的方式插入

### HashMap、LinkedHashMap、TreeMap有什么区别

HashMap是无序的，因为遍历时是遍历数组中每一个包含节点的位置，然后往下遍历链表，所以一般情况下和插入顺序是不一致。一般都会使用HashMap，来完成一般的元素增删查改工作

LinkedHashMap、TreeMap是有顺序的。但他们两者的顺序是不同的

- LinkedHashMap保存的顺序是插入的顺序，在用 Iterator 遍历时，读取到的数据和插入的数据的顺序是一致的，先插入先读取；此外，遍历比 HashMap 慢。在需要输出的顺序和输入的顺序相同的情况下选用这个集合。

- TreeMap实现了SortMap接口，能够把它保存的记录根据键排序（默认按键的升序排序，也可以指定排序的比较器），也就是能自动排序的意思，读取出来数据的顺序和插入的数据的顺序不一定是一致的。在需要按自然顺序或自定义顺序遍历键的情况下选用这个集合。

### HashMap、HashTable的区别

- 从线程安全性来看：HashMap是线程不安全的，原因：；HashTable是线程安全的，原因：基本上每个方法都加上了`synchronized`关键字
- 从null值来看：HashMap允许最多一个元素的键为null，因为键需要唯一，允许多个元素的值为null；Hashtable中元素的键、值都不允许为null
- 从默认初始容量来看：HashMap的默认初始容量是16，Hashtable的默认初始容量是11
- 从扩容方面来看：HashMap的扩容是数组容量扩大到原来容量的2倍，Hashtable的扩容是数组容量扩大到原来容量的2倍+1
- 从确定hash原理来看：HashMap通过对象的hashCode高16位异或低16位；Hashtable直接使用对象的hashCode

### 为什么HashMap是线程不安全的

`put()`

A、B两个线程插入数据到数组中的位置相同。假设A分到的时间片用完时刚好获取到该桶里面的链表头结点，而线程B在其时间片内成功把数据插入到数组中，此时线程A再次被调度，它依然持有过期的链表头但是它对此一无所知，以至于它认为它应该这样做，如此一来就覆盖了线程B插入的记录，这样线程B插入的记录就凭空消失了，造成了数据不一致的行为。

---

`resize()`、`transfer()`

死循环、环链

简单来说就是其他线程影响了原有线程中e节点和next节点的位置，造成环链

![image-20200722110604379](https://gitee.com/ngyb/pic/raw/master/007S8ZIlgy1ggzkm9cjjej30u02g2e81.jpg)

### HashMap、ConcurrentHashMap的区别

- 从线程安全性来看：HashMap是线程不安全的，原因：；ConcurrentHashMap是线程安全的，原因：采用了CAS算法+部分synchronized的做法
- 从null值来看：HashMap允许最多一个元素的键为null，允许多个元素的值为null；ConcurrentHashMap中元素的键、值都不允许为null

最主要的区别点：线程安全性

HashMap线程不安全

ConcurrentHashMap是一个线程安全且高效的 HashMap 实现。不同于Hashtable直接在大部分方法上加锁的方式，在jdk1.7中，它采用分段锁的方式；在jdk1.8中采用CAS算法+部分synchronized的做法。这两种做法逗比直接在方法上加锁效率要高。此外ConcurrentHashMap中元素的键和值都不允许是null

### ConcurrentHashMap、HashTable的区别

大家都是线程安全的Map实现，但是两者保证线程安全的方式不一样

- HashTable的方式是在大部分方法上加锁，锁住整个链表结构来处理并发问题，多个线程竞争一把锁，容易阻塞
- ConcurrentHashMap
  - jdk1.7中使用分段锁（ReentrantLock + Segment + HashEntry），相当于把一个 HashMap 分成多个段，每段分配一把锁，这样支持多线程访问。锁粒度：基于 Segment，包含多个 HashEntry。
  - jdk1.8中使用 CAS + synchronized + Node + 红黑树。锁粒度：Node（首结点）。锁粒度降低了。

### 针对 ConcurrentHashMap 锁机制具体分析

JDK 1.7 中，采用分段锁的机制，实现并发的更新操作，底层采用数组+链表的存储结构，包括两个核心静态内部类 Segment 和 HashEntry。

1. Segment 继承 ReentrantLock（重入锁） 用来充当锁的角色，每个 Segment 对象守护每个散列映射表的若干个桶；
2. HashEntry 用来封装映射表的键-值对；
3. 每个桶是由若干个 HashEntry 对象链接起来的链表

![img](https://gitee.com/ngyb/pic/raw/master/007S8ZIlgy1ggymu3ustxj30mb0cct9y.jpg)

JDK 1.8 中，采用Node + CAS + Synchronized来保证并发安全。取消类 Segment，直接用 table 数组存储键值对；当 HashEntry 对象组成的链表长度超过 TREEIFY_THRESHOLD 时，链表转换为红黑树，提升性能。底层变更为数组 + 链表 + 红黑树。

![img](https://gitee.com/ngyb/pic/raw/master/007S8ZIlgy1ggymujqrg6j30lc0793ye.jpg)

### ConcurrentHashMap 在 JDK 1.8 中，为什么要使用内置锁 synchronized 来代替重入锁 ReentrantLock？

1. 颗粒度降低了
2. 基于 JVM 的 synchronized 优化空间更大，更加自然
3. 在大量的数据操作下，对于 JVM 的内存压力，基于 API 的 ReentrantLock 会开销更多的内存

### ConcurrentHashMap 的并发度是什么

程序运行时能够同时更新 ConccurentHashMap 且不产生锁竞争的最大线程数。默认为 16，且可以在构造函数中设置。

当用户设置并发度时，ConcurrentHashMap 会使用大于等于该值的最小2幂指数作为实际并发度（假如用户设置并发度为17，实际并发度则为32）

### 简单介绍一下ConcurrentHashMap

`private transient volatile int sizeCtl`

当为负数时，-1 表示正在初始化，-N 表示 N - 1 个线程正在进行扩容；

当为 0 时，表示 table 还没有初始化；

当为其他正数时，表示初始化或者下一次进行扩容的大小。

---

`put()`

存储方法

如果没有初始化，就调用 initTable() 方法来进行初始化；

如果没有 hash 冲突就直接 CAS 无锁插入；

如果需要扩容，就先进行扩容；

如果存在 hash 冲突，就加锁来保证线程安全，两种情况：一种是链表形式就直接遍历到尾端插入，一种是红黑树就按照红黑树结构插入；

如果该链表的数量大于阀值 8，就要先转换成红黑树的结构，break 再一次进入循环

如果添加成功就调用 addCount() 方法统计 size，并且检查是否需要扩容。

---

`transfer()`

扩容方法

默认容量为 16，扩容时，容量变为原来的两倍。

---

`helpTransfer()`

调用多个工作线程一起帮助进行扩容，这样的效率就会更高。

---

`get()`

获取方法

计算 hash 值，定位到该 table 索引位置，如果是首结点符合就返回；

如果遇到扩容时，会调用标记正在扩容结点 ForwardingNode.find()方法，查找该结点，匹配就返回；

以上都不符合的话，就往下遍历结点，匹配就返回，否则最后就返回 null。

