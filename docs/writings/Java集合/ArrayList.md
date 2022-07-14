# ArrayList

> 在日常的开发中，ArrayList 几乎是 List 接口中使用得最多的实现类，它的地位不言而喻

## 底层实现

ArrayList 有着线性顺序存储、索引访问、动态长度等特点，底层的实现其实还是数组，其他的功能就是围绕这个数组开展的

```java
/**
 * The array buffer into which the elements of the ArrayList are stored.
 * The capacity of the ArrayList is the length of this array buffer. Any
 * empty ArrayList with elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA
 * will be expanded to DEFAULT_CAPACITY when the first element is added.
 */
// 负责存储的数组
transient Object[] elementData; // non-private to simplify nested class access

/**
 * The size of the ArrayList (the number of elements it contains).
 *
 * @serial
 */
// 集合中元素个数
private int size;
```

- 由于 Java 的泛型擦除机制，所以底层数组使用 Object 类型即可存放任何类型的对象

- 一般称数组长度为 capacity，capacity 和 size的含义有一定的区别

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220312210703.png)
  
  



## 构造方法

### ArrayList(int initialCapacity)

传入一个大于 0 的数值作为集合的初始容量

```java
/**
 * Constructs an empty list with the specified initial capacity.
 *
 * @param  initialCapacity  the initial capacity of the list
 * @throws IllegalArgumentException if the specified initial capacity is negative
 */
public ArrayList(int initialCapacity) {
    if (initialCapacity > 0) {
        this.elementData = new Object[initialCapacity];
    } else if (initialCapacity == 0) {
        this.elementData = EMPTY_ELEMENTDATA;
    } else {
        throw new IllegalArgumentException("Illegal Capacity: " + initialCapacity);
    }
}
```

### ArrayList()

当不传初始容量时，数组会被初始化为空数组。等到添加元素时才进行数组扩容并存储

```java
/**
 * Shared empty array instance used for empty instances.
 */
private static final Object[] EMPTY_ELEMENTDATA = {};

/**
 * Shared empty array instance used for default sized empty instances. We
 * distinguish this from EMPTY_ELEMENTDATA to know how much to inflate when
 * first element is added.
 */
private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};

/**
 * Constructs an empty list with an initial capacity of ten.
 */
public ArrayList() {
    this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
}
```

其中两个空数组的区别是

- EMPTY_ELEMENTDATA：普通的空数组
- DEFAULTCAPACITY_EMPTY_ELEMENTDATA：空参构造方法专用空数组，目的是为了方便知道在第一次扩容时需要扩大为默认容量

### ArrayList(Collection<? extends E> c)

传入一个集合，把元素作为 ArrayList 集合中的元素

```java
/**
 * Constructs a list containing the elements of the specified
 * collection, in the order they are returned by the collection's
 * iterator.
 *
 * @param c the collection whose elements are to be placed into this list
 * @throws NullPointerException if the specified collection is null
 */
public ArrayList(Collection<? extends E> c) {
    elementData = c.toArray();
    if ((size = elementData.length) != 0) {
        // c.toArray might (incorrectly) not return Object[] (see 6260652)
        if (elementData.getClass() != Object[].class)
            elementData = Arrays.copyOf(elementData, size, Object[].class);
    } else {
        // replace with empty array.
        this.elementData = EMPTY_ELEMENTDATA;
    }
}
```



## 自动扩容

自动扩容发生在每次向集合中添加元素前，集合会先检查添加元素后元素的个数是否会超出数组的长度，如果超出，就需要进行扩容来满足添加元素的需求。

集合扩容时，除了 size 要扩大为原来的 1.5 倍，还需要进行数组元素迁移，因为数组一旦定义了，长度就不可变，所以扩大容量的过程其实是首先定义一个新的对应容量的数组，然后把旧数组的元素一个个迁移到新数组上。

这个动作的代价其实很高，在开发的过程中，应该**尽可能避免**集合扩容。如果我们可以预知需要保存多少元素，那么在实例化 ArrayList 的时候就应该指定足够的容量。

```java
// 内部使用的扩容方法
// 检查添加元素后的元素个数，当前数组长度是否能满足
private void ensureCapacityInternal(int minCapacity) {
    if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        minCapacity = Math.max(DEFAULT_CAPACITY, minCapacity);
    }

    ensureExplicitCapacity(minCapacity);
}
private void ensureExplicitCapacity(int minCapacity) {
    modCount++;

    // overflow-conscious code
    if (minCapacity - elementData.length > 0)
        grow(minCapacity);
}

/**
 * The maximum size of array to allocate.
 * Some VMs reserve some header words in an array.
 * Attempts to allocate larger arrays may result in
 * OutOfMemoryError: Requested array size exceeds VM limit
 */
// 数组最大能分配的长度
private static final int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;

/**
 * Increases the capacity to ensure that it can hold at least the
 * number of elements specified by the minimum capacity argument.
 *
 * @param minCapacity the desired minimum capacity
 */
// 计算新数组的容量，并把原数组元素迁移到新元素上
private void grow(int minCapacity) {
    // overflow-conscious code
    int oldCapacity = elementData.length;
    int newCapacity = oldCapacity + (oldCapacity >> 1);
    // 检查扩大为原来1.5倍后，容量是否够用
    // 如果还不够，直接用添加后的元素个数作为数组容量
    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity;
    // 是否超过能分配的最大容量，较少遇到这种情况
    // 而且这么大容量可能会有OutOfMemoryError
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);
    // minCapacity is usually close to size, so this is a win:
    // 迁移数组元素
    elementData = Arrays.copyOf(elementData, newCapacity);
}
private static int hugeCapacity(int minCapacity) {
    if (minCapacity < 0) // overflow
        throw new OutOfMemoryError();
    return (minCapacity > MAX_ARRAY_SIZE) ?
        Integer.MAX_VALUE :
    MAX_ARRAY_SIZE;
}

```

自动扩容中迁移数组元素的过程

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220312213658.png)



## 添加元素

ArrayList 在添加元素之前，都会调用 `ensureCapacityInternal` 方法来检查是否超出容量，如果超出了需要进行自动扩容

添加单个元素提供了两个方法：

- 添加到末尾
- 按索引添加，按索引添加之前会判断这个插入的索引是否超出当前数组的索引范围，然后还需要进行元素的迁移

```java
public boolean add(E e) {
    ensureCapacityInternal(size + 1);  // Increments modCount!!
    elementData[size++] = e;
    return true;
}

public void add(int index, E element) {
    rangeCheckForAdd(index);

    ensureCapacityInternal(size + 1);  // Increments modCount!!
    System.arraycopy(elementData, index, elementData, index + 1, size - index);
    elementData[index] = element;
    size++;
}
```

两种方式的工作原理图

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220313173010.png)



可以看到 `add(int index, E e)` 需要先移动元素，再完成插入操作，这意味着这个方法有着线性的时间复杂度



## 获取元素

获取元素的原理很简单，因为 ArrayList 底层是数组，所以就是根据索引来获取数组中的元素，但是要注意索引不能越界。

同时，使用 ArrayList 时使用了泛型，但是底层是 Object 数组，所以获取值时需要进行强制类型转换。

```java
public E get(int index) {
    rangeCheck(index);
    // 类型转换
    return (E) elementData[index];
}
```



## 删除元素

删除元素的操作是添加元素操作的逆过程，需要将删除位后面的元素往前移动。

删除元素提供了两个方法：

- 根据索引删除元素，会先判断这个索引是否在数组索引范围内
- 根据元素删除，遍历集合，删除第一个和这个元素相等的元素

促使 GC 的操作：

如：原数组是：[1, 2, 3, 4, 5]；删除索引为2的元素

经历 `System.arraycopy(elementData, index+1, elementData, index, numMoved);` 后

原数组变为：[1, 2, 4, 5, 5]；把删除位后面的元素往前覆盖了，但是最后一位是没办法覆盖的，而此时数组还持有最后一个元素的引用，如果不把最后一位设置为 `null`，除非对应位置有被其他元素覆盖，负责原来对象就一直不会被回收

```java
public E remove(int index) {
    rangeCheck(index);

    modCount++;
    E oldValue = elementData(index);

    int numMoved = size - index - 1;
    // 判断删除的元素是不是最后一位
    if (numMoved > 0) {
        // 如果删除的不是最后一位，那么把删除位后面的元素都往前移动一位
       	System.arraycopy(elementData, index+1, elementData, index, numMoved);
    }
    // 把最后一个位置设置为null，让GC起作用
    elementData[--size] = null;

    return oldValue;
}
```



## 修剪

ArrayList 中有两个意思相近的值

- size：集合中存储元素的个数
- capacity：对象数组的长度

修剪方法的功能是把数组的长度调整为当前集合存储的实际元素个数

```java
public void trimToSize() {
    modCount++;
    if (size < elementData.length) {
        elementData = (size == 0)
            ? EMPTY_ELEMENTDATA
            : Arrays.copyOf(elementData, size);
    }
}
```



## Fail-Fast 机制

ArrayList 采用了快速失败的机制，通过记录 modCount 参数来实现。

在面对并发的修改时，迭代器很快就会完全失败，而不是冒着在将来某个不确定时间发生任意不确定行为的风险。



## 数组拷贝

> 查看 ArrayList 的源码时发现，由于底层是对象数组，所以在某些场景下，需要进行数组的拷贝，把旧数组的元素拷贝到新数组上

能完成数组拷贝工作的方法大概有以下两个：`Arrays.copyOf` 与 `Systems.arrayCopy` 

联系：`Arrays.copyOf` 内部调用了 `Systems.arrayCopy` 

区别：

1. `Systems.arrayCopy`  需要一个目标数组，将源数组元素拷贝到目标数组中，可以指定拷贝源数组的索引起点、放入目标数组的位置、长度
2. `Arrays.copyOf`  在方法内部新建一个数组，拷贝这个数组到新数组中，并返回新数组



## Arrays.toList

Java 数组的工具类 Arrays 中 `toList` 方法实现了 `数组转为 List集合` 的功能

但是这个方法返回的对象 `ArrayList` 是 Arrays 的内部类，并没有实现修改集合的方法，所以这个对象不能调用 add、remove 等方法，否则会抛出 `UnsupportedOperationException` 异常。

> 《阿里巴巴Java开发手册》对其的描述为：Arrays.toList 体现的是适配器模式，只是转换接口，后台仍是数组。

```java
public static <T> List<T> asList(T... a) {
    return new ArrayList<>(a);
}

private static class ArrayList<E>
    extends AbstractList<E> 
    implements RandomAccess, java.io.Serializable {
    private static final long serialVersionUID = -2764017481108945198L;
    private final E[] a;

    ArrayList(E[] array) {
        a = Objects.requireNonNull(array);
    }

	// ...
}
```

