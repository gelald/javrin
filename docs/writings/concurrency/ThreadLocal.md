---
title: ThreadLocal 学习
icon: article
category: 并发
---

# ThreadLocal 学习


## 引入

在多线程环境中，如果多个线程同时操作一个共享资源，会有线程安全问题；解决这个问题除了对资源加锁，还可以使用 ThreadLocal 来给每一个线程创建一份资源的副本，每个副本互相隔离，每个线程独立操作，互不影响。


## 案例

现在要记录每一个 Session 的当前用户信息，如果直接使用全局普通变量来接收，那么在多线程环境下，可能会产生互相覆盖的问题，这个时候可以使用 ThreadLocal 变量来解决线程安全问题

```java
@Slf4j
public class ThreadLocalDemo {

    public static void main(String[] args) throws InterruptedException {
        // 创建多个线程模拟并发访问
        Thread thread1 = new Thread(() -> {
            SafeUserSession.setCurrentUser("User-Thread-1");
            try {
                TimeUnit.MILLISECONDS.sleep(350);
            } catch (InterruptedException e) {
                log.error("线程中断", e);
            }
            log.info("{} current user: {}", Thread.currentThread().getName(), SafeUserSession.getCurrentUser());
            SafeUserSession.clear();
        }, "Thread-1");

        Thread thread2 = new Thread(() -> {
            SafeUserSession.setCurrentUser("User-Thread-2");
            try {
                TimeUnit.MILLISECONDS.sleep(350);
            } catch (InterruptedException e) {
                log.error("线程中断", e);
            }
            log.info("{} current user: {}", Thread.currentThread().getName(), SafeUserSession.getCurrentUser());
            SafeUserSession.clear();
        }, "Thread-2");

        thread1.start();
        thread2.start();

        thread1.join();
        thread2.join();
    }


    static class SafeUserSession {
        // 直接使用 String 线程不安全
        // private static String currentUser;
        // 使用 ThreadLocal 为每个线程维护独立的变量副本
        private static final ThreadLocal<String> currentUser = new ThreadLocal<>();

        public static void setCurrentUser(String user) {
            // currentUser = user;
            currentUser.set(user);
        }

        public static String getCurrentUser() {
            // return currentUser;
            return currentUser.get();
        }

        public static void clear() {
            // currentUser = "";
            currentUser.remove(); // 清理资源，防止内存泄漏
        }
    }
}
```


## 结构

要弄懂为什么它能解决线程安全问题，需要从它的结构着手

![ThreadLocal 结构](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/thread-local-structure.png)

每一个 Thread 类都有一个自己的 ThreadLocalMap，具体可以在 Thread 类中找到成员变量 `threadLocals`

```java
public class Thread implements Runnable {
    /* ThreadLocal values pertaining to this thread. This map is maintained
     * by the ThreadLocal class. */
    ThreadLocal.ThreadLocalMap threadLocals = null;
}
```

ThreadLocalMap 底层结构是一个 Entry数组，Entry 以 [key, value] 格式来存储数据，其中 **key 可以看成是 ThreadLocal**，value 是具体往 ThreadLocal 中存入的数据

> 以上面的例子看，每个线程往自己 ThreadLocal 类型的 `currentUser` 中存储当前用户信息时，就是往线程中的 ThreadLocalMap `threadLocals` 存入一份数据。key 是 `currentUser` 这个 ThreadLocal，value 是存入的用户信息


### ThreadLocal 怎么实现线程隔离

看完 ThreadLocal 的结构图后，我们就能明白 ThreadLocal 线程隔离的实现方式：每个线程对 ThreadLocal 进行读写时，都是对自己的 ThreadLocalMap (`threadLocals`) 进行读写的，这个 map 是 Thread 的**成员变量**，每个 Thread 独立一份，读写隔离。通过这个特点，ThreadLocal 实现了线程隔离


### Entry

看结构图我们可以看到 Entry 是继承了 `WeakReference`，进一步看 Entry 的构造方法

```java
        static class Entry extends WeakReference<ThreadLocal<?>> {
            /** The value associated with this ThreadLocal. */
            Object value;

            Entry(ThreadLocal<?> k, Object v) {
                // k 是 key，通过 WeakReference 的构造方法创建一个指向 key 的弱引用出来
                super(k);
                // v 是 value，正常记录
                value = v;
            }
        }
```

可以看到 Entry 的构造方法中会通过 `WeakReference` 的构造方法创建一个弱引用，指向原来的 key，而 value 则是用普通的成员变量来进行存储

> 关于弱引用的定义以及作用可以参考：


### 为什么 key 不设计成强引用

假设 ThreadLocal 的 key 是强引用，以下是可能出问题的代码

```java
public class UserService {
    
    public void processUser(String userId) {
        // 注意：这是一个局部使用的 ThreadLocal，不是 static 的
        ThreadLocal<UserContext> context = new ThreadLocal<>();

        context.set(new UserContext(userId));
        try {
            // 业务逻辑：调用多个方法，它们都通过 context.get() 获取上下文
            doStep1();
            doStep2();
        } finally {
            context.remove(); // 假设你忘了这行，或者没写
        }
        // 方法结束，局部变量 context 出作用域 → 不再有强引用指向它！
    }
}
```

1. Tomcat 线程池处理请求然后调用了 `UserService` 的 `processUser` 方法，ThreadLocal 变量 `context` 在方法结束后，业务代码没有任何地方再持有这个 ThreadLocal 对象的强引用
2. 但线程池中的线程还存活着，准备处理下一个请求
3. Thread 中的 ThreadLocal.ThreadLocalMap 类型的 `threadLocals` 还存活，并且仍然保留着上一次请求的 Entry
4. Entry 中的 key 因为被 `threadLocals` 仍然强引用着（假设 ThreadLocal 的 key 是强引用），value 被 key 强引用着
5. 这个 Entry 无法被 GC，即使我们不再使用它（因为是局部变量，下一次调用仍然会创建一个新的 ThreadLocal 实例），仍然会占据着内存空间，长期下来会有大量的 ThreadLocal 无法被回收，这就是内存泄漏

---

如果 key 设计成弱引用

1. 那么上述第 4 点中，ThreadLocal.ThreadLocalMap 对 key 的引用只是一个弱引用，那么在下一轮 GC 中这个 key 就可以被回收
2. 在后续调用 ThreadLocal 的 `get/set` 的时候，会触发清理机制（调用 `cleanSomeSlots`）而清理一些 key 是已经指向 null 的 entry
3. 即使不手动调用 `remove` 方法，至少 key 能被回收，避免无限累积，还有清理机制可以避免内存泄漏


### ThreadLocal 最佳使用方式

经过上面的分析，总结一下 ThreadLocal 最佳使用方式

1. ThreadLocal 最好作为 `private static final` 字段，在整个应用的生命周期中只有一个实例；尽量不要在方法内使用 `new ThreadLocal()` 的方式创建，虽然 key 是弱引用可以被 GC，但是 value 如果没有被主动 remove 的话，容易一直累积在内存中导致内存溢出
2. 在使用完成 ThreadLocal 后，主动调用 remove 来清理，因为清理机制容易有滞后性，尽可能使用完后就清理


## ThreadLocalMap 中的 Hash

### Hash 算法

和 HashMap 类似，ThreadLocalMap 也需要一定的哈希算法来让元素落入到合适的数组索引上

```java
    // i 是数组索引，key 是存入的 ThreadLocal，len 是 ThreadLocalMap 的数组长度
    int i = key.threadLocalHashCode & (len-1);
```

可以看到 ThreadLocalMap 也是使用 hash & (数组长度 - 1) 这种算法来计算索引值，这一点和 HashMap 一致，重点看 `threadLocalHashCode`

```java
public class ThreadLocal<T> {
    private final int threadLocalHashCode = nextHashCode();

    private static AtomicInteger nextHashCode = new AtomicInteger();

    private static final int HASH_INCREMENT = 0x61c88647;

    private static int nextHashCode() {
        return nextHashCode.getAndAdd(HASH_INCREMENT);
    }
}
```

- 每个 ThreadLocal 实例在创建时，都会分配一个**唯一、递增的哈希码**，其中 `nextHashCode` 属性使用的是 AtomicInteger 原子类，所以可以保证多个线程获取哈希码时是线程安全的
- `HASH_INCREMENT = 0x61c88647` 是一个**斐波那契乘数**（黄金比例 0.618 的整数近似），这个值能让数据在长度满足 2 的次幂的数组中排列更加均匀，减少冲突

测试一下假设按照默认的 ThreadLocalMap 的数组长度（16），每一轮的元素索引：

```java
public class MapIndexTest {
    // ThreadLocalMap 中定义的递增值，斐波那契乘数
    private static final int HASH_INCREMENT = 0x61c88647;
    public static void main(String[] args) {
        // ThreadLocalMap 的长度是 16，计算每一个数据的索引
        AtomicInteger nextHashCode = new AtomicInteger();
        for (int i = 0; i < 16; i++) {
            // 按照 hash & (length - 1) 的方式计算索引
            int index = nextHashCode.getAndAdd(HASH_INCREMENT) & 15;
            System.out.println("本轮索引值: " + index);
        }
    }
}
```

![ThreadLocalMap 索引测试结果](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/thread-local-index-test.png)

可以看到每一轮的索引值分布都很平均


### Hash 冲突

尽管通过 `HASH_INCREMENT` 让元素尽可能均匀分布来避免哈希冲突，但是无法保证完全没有冲突，ThreadLocalMap 解决冲突的方法是**线性探测法**

当发生哈希冲突时，寻找下一个索引，采取的方式就是直接 +1 往后寻找，如果超出数组长度，回到数组第一位继续寻找合适的位置

```java
    private static int nextIndex(int i, int len) {
        return ((i + 1 < len) ? i + 1 : 0);
    }
```

在往后探测的过程中，如果找到一些失效的条目，会直接清理并使用这个位置

```java
private void set(ThreadLocal<?> key, Object value) {

    ...

    for (Entry e = tab[i];
            e != null;
            // 往后遍历 寻找合适索引
            e = tab[i = nextIndex(i, len)]) {
        // 如果键相同，则更新值
        if (e.refersTo(key)) {
            e.value = value;
            return;
        }

        // 如果元素是一个无效引用，那么清理并插入新值
        if (e.refersTo(null)) {
            replaceStaleEntry(key, value, i);
            return;
        }
    }

    ...
}
```


## ThreadLocal 读取数据

- 首先拿到当前线程的 ThreadLocalMap
- 从 map 中根据 ThreadLocal 来获取元素
- 理想情况下，ThreadLocal 计算出来的第一个索引值就能获取到目标数据
- **如果发生了哈希冲突（第一个索引值的key和需要查询的数据的key不一致），那么就要往后寻找（线性探测法）**
- 往后探测的过程中，如果发现某个位置的元素已经失效，也去把它清理掉，直到最终找到目标元素

```java
    public T get() {
        // 获取当前线程
        Thread t = Thread.currentThread();
        // 获取线程的 ThreadLocalMap
        ThreadLocalMap map = getMap(t);
        if (map != null) {
            ThreadLocalMap.Entry e = map.getEntry(this);
            if (e != null) {
                @SuppressWarnings("unchecked")
                T result = (T)e.value;
                return result;
            }
        }
        // 如果Map还没初始化，那么在这里执行初始化
        return setInitialValue();
    }

    private Entry getEntry(ThreadLocal<?> key) {
        // 通过哈希计算确定第一个索引值
        int i = key.threadLocalHashCode & (table.length - 1);
        Entry e = table[i];
        if (e != null && e.refersTo(key))
            // 第一个索引值的数据的key和传入的key相等
            return e;
        else
            // 有哈希冲突，需要使用线性探测的方式往后寻找
            // 开始往后寻找不是null的元素，直到匹配上key
            return getEntryAfterMiss(key, i, e);
    }

    private Entry getEntryAfterMiss(ThreadLocal<?> key, int i, Entry e) {
        Entry[] tab = table;
        int len = tab.length;

        // 核心条件：数组元素不是null，所以清理失效元素时不能仅仅把它置为null
        while (e != null) {
            if (e.refersTo(key))
                return e;
            if (e.refersTo(null))
                // 发现key指向了null，证明他是失效的，把他清理
                expungeStaleEntry(i);
            else
                // 如果没有匹配上，往后寻找新的索引
                i = nextIndex(i, len);
            e = tab[i];
        }
        return null;
    }
```


## ThreadLocal 写入数据

- 和 `get()` 方法一样，首先要拿到当前线程的 ThreadLocalMap
- 如果 map 还没初始化就初始化
- 如果 map 已经初始化，调用 ThreadLocalMap 的 `set()` 方法
    - 根据哈希值计算索引
    - 线性探测，从计算出来的第一个索引开始往后找合适的插入位置
    - 如果找到相同的 key，直接更新数据
    - 如果找到元素的 key 指向 null，调用 `replaceStaleEntry()` 执行清理 + 插入
    - 如果找到了 null 的位置，说明是空槽位，直接插入
    - 检查是否需要清理数据或者扩容

```java
    public void set(T value) {
        // 获取当前线程的 ThreadLocalMap
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null) {
            // 调用 map 的 set 方法
            map.set(this, value);
        } else {
            // map 还没初始化需要先初始化
            createMap(t, value);
        }
    }


    private void set(ThreadLocal<?> key, Object value) {

        Entry[] tab = table;
        int len = tab.length;

        // 根据哈希计算索引值
        int i = key.threadLocalHashCode & (len-1);

        // 开始线性探测
        for (Entry e = tab[i];
                // 重点条件：线性探测的元素不能是null，null会中断探测
                e != null;
                // 每一轮循环都往后寻找下一个索引
                e = tab[i = nextIndex(i, len)]) {

            // 如果key相同，更新值
            if (e.refersTo(key)) {
                e.value = value;
                return;
            }

            // 如果key指向了null，说明已经被gc了
            // 这里不能直接更新，要执行replaceStaleEntry
            if (e.refersTo(null)) {
                replaceStaleEntry(key, value, i);
                return;
            }
        }

        // 线性探测结束（找到了空的槽位），直接插入
        tab[i] = new Entry(key, value);
        int sz = ++size;

        // 检查添加元素后是否需要清理或者扩容
        if (!cleanSomeSlots(i, sz) && sz >= threshold)
            rehash();
    }
```

其中 `replaceStaleEntry()`: 这是 ThreadLocal 最精妙的设计之一，当你在 `set()` 时，探测路径上遇到一个无效条目（key指向null），不会简单覆盖，而是：
- 清理当前冲突区域中的多个无效条目
    - 不仅清理当前 key 指向 null 的位置
    - 还会向前(找到冲突区域的起点) 向后(向后扫描到null为止) 扫描一段连续的非 null 空间，把里面所有 key 指向 null 的无效条目最终都清理掉
- 把新 entry 插入到**最优位置**，这样能让新 entry 更靠近它理想的哈希位置，避免后续 `get()` / `set()` 时带来更多的线性探测导致浪费性能
- **`replaceStaleEntry()` 不仅插入新值，还对当前冲突链做了一次局部清理，这是 ThreadLocal 在无 GC 协助下自主管理内存的核心机制**

**`replaceStaleEntry()` 是 ThreadLocal 在 set 时遇到 key 为 null 的陈旧条目时触发的优化机制：它会清理当前哈希冲突区域内的多个陈旧条目，并将新值插入到更靠近理想位置的槽中，从而减少探测长度、降低内存泄漏风险**

## ThreadLocalMap 扩容

- ThreadLocalMap 扩容阈值是 `len * 2 / 3`，当数组元素数量超过这个阈值，会触发扩容避免更多的哈希冲突
- 扩容时会先清理所有无效条目，避免无效条目持续占用内存
- 清理无效条目后，如果元素数量仍然超过 `threshold - threshold / 4` 这个数值，那么触发真正的扩容逻辑
- 扩容逻辑：
    - 数组长度直接扩容为原来的 2 倍
    - 对旧数组所有元素重新计算新数组中的索引值
    - 如果有冲突，那么也使用线性探测的方式寻找下一个合适的索引

```java
private void rehash() {
    // 清理所有过期的条目
    expungeStaleEntries();

    // 如果清理后，满足条件了就可以不用扩容
    // 无法满足的话，就需要执行扩容逻辑
    if (size >= threshold - threshold / 4)
        resize();
}

/**
 * Double the capacity of the table.
 */
private void resize() {
    Entry[] oldTab = table;
    int oldLen = oldTab.length;
    // 直接扩容为原来的2倍
    int newLen = oldLen * 2;
    Entry[] newTab = new Entry[newLen];
    int count = 0;

    for (Entry e : oldTab) {
        if (e != null) {
            ThreadLocal<?> k = e.get();
            if (k == null) {
                e.value = null; // Help the GC
            } else {
                // 重新计算索引位置
                int h = k.threadLocalHashCode & (newLen - 1);
                while (newTab[h] != null)
                    // 哈希冲突时线性探测新索引
                    h = nextIndex(h, newLen);
                newTab[h] = e;
                count++;
            }
        }
    }

    setThreshold(newLen);
    size = count;
    table = newTab;
}

/**
 * Expunge all stale entries in the table.
 */
private void expungeStaleEntries() {
    Entry[] tab = table;
    int len = tab.length;
    for (int j = 0; j < len; j++) {
        Entry e = tab[j];
        // Entry虽然不是null，但是key已经指向null了（弱引用被GC了）
        if (e != null && e.refersTo(null))
            // 探测式清理
            expungeStaleEntry(j);
    }
}
```


## ThreadLocalMap 清理机制

ThreadLocalMap 的清理机制从调用方式可以分为两大类：

- 被动式清理（探测式清理）：`set()` / `get()` 方法调用时线性探测无效条目清理
    - `getEntry()` 方法线性探测时遇到无效条目（key指向null），执行 `expungeStaleEntry()` 方法执行清理
    - `set()` 方法在插入时执行线性探测，如果遇到无效条目（key指向null），执行 `replaceStaleEntry()` 方法执行清理并优化插入位置
    - `set()` 方法在插入数据后执行 `cleanSomeSlots()` 进行启发式清理，从插入位置往后探测，如果遇到无效条目（key指向null），执行 `expungeStaleEntry()` 方法执行清理
    - `set()` 方法在执行 `cleanSomeSlots()` 后发现仍需要扩容，执行 `expungeStaleEntries()` 方法进行全量清理，扫描所有无效条目（key指向null），执行 `expungeStaleEntry()` 方法执行清理；清理后发现空间仍然不足就会执行真正的扩容（数组长度 * 2）并重新计算所有元素的位置
- 主动式清理：`remove()` 方法，执行 `expungeStaleEntry()` 方法精准清理某一个键对应的数据。尽管有这么多被动式清理，但是依然无法代替 `remove()` 方法，因为如果后续没有再调用 `get()` / `set()` 方法的话，泄露风险仍在，应该主动清理

上面提到探测式清理的清理无效条目方法 `expungeStaleEntry()`，其实他不是简单的直接把数组某一位设置为 null，因为线性探测法还要保证有哈希冲突的元素，在获取时能正确寻回

比如元素A、B、C，经过哈希计算，出现了一些哈希冲突，A -> 0，B -> 0，C -> 1，此时 B 和 C 都无法满足，需要线性探测往后寻找可用的索引:
- A -> 0 （正常写入）
- B -> 1 （发现 0 这一位已经有元素了，往后寻找）
- C -> 2 （因为 B 元素已经占据了 1 这个位置，只能往后寻找）

假设此时 B 元素被移除，并假设直接让数组的 1 号索引指向 null，那么在获取 C 元素时，通过哈希计算得到的索引是 1，最终会得到 null 并返回，出现了数据不一致的情况

因为线性探测法一旦遇到 null，就会停止，null 是线性探测的中断信号，直接设置 null 会中断线性探测

---

所以 ThreadLocalMap 的 `expungeStaleEntry()` 清理方法也是高度配合线性探测这个解决哈希冲突的方法的，分两步走
- 清理当前位置的元素
- 向后检测，迁移那些当时因为这个位置有冲突的元素

**这样才能保证之前有冲突的元素后面还能找回**

```java
private int expungeStaleEntry(int staleSlot) {
    Entry[] tab = table;
    int len = tab.length;

    // 移除过期条目，把value指向null，并把数组这个位置清空
    tab[staleSlot].value = null;
    tab[staleSlot] = null;
    size--;

    // 向后遍历直到遇到中断信号（null）
    // 可能某个元素当时插入时碰到了哈希冲突，现在这个位置空置出来了，可以把他迁移过来
    Entry e;
    int i;
    for (i = nextIndex(staleSlot, len);
            (e = tab[i]) != null;
            i = nextIndex(i, len)) {
        ThreadLocal<?> k = e.get();
        // 如果下一个位置的条目的键已经是null了，那么也清空它
        if (k == null) {
            e.value = null;
            tab[i] = null;
            size--;
        } else {
            // 用下一个索引元素的键的哈希值计算出索引
            int h = k.threadLocalHashCode & (len - 1);
            // 如果计算出来本该存入的索引位置和他当前位于的位置不匹配，那么就要往前迁移
            if (h != i) {
                // 清空当前位置
                tab[i] = null;

                while (tab[h] != null)
                    // 避免这种情况：它本应放入索引0，因为多次冲突，最终放入了5
                    // 现在把4清空出来，但是0~3依旧有元素（简单理解），需要继续寻找下一个可用的索引直到找到了4
                    h = nextIndex(h, len);
                // 迁移到应该往前迁移的位置
                tab[h] = e;
            }
        }
    }
    return i;
}
```

```java
// 对过期条目进行全量清理
private void expungeStaleEntries() {
    Entry[] tab = table;
    int len = tab.length;
    for (int j = 0; j < len; j++) {
        Entry e = tab[j];
        if (e != null && e.refersTo(null))
            expungeStaleEntry(j);
    }
}
```


## ThreadLocal 失效场景


### 父子线程场景

对于父子线程的场景，ThreadLocal 无法满足，在子线程中获取父线程的 ThreadLocal 值时，会获取失败

```java
public class FailedScenarios {
    public static void main(String[] args) throws InterruptedException {
        ThreadLocal<String> parentValue = new ThreadLocal<>();
        parentValue.set("测试父子线程 ThreadLocal 表现");

        System.out.println("父线程中的值: " + parentValue.get());

        Thread thread = new Thread(() -> {
            try {
                TimeUnit.MILLISECONDS.sleep(350);
                System.out.println("子线程中的值: " + parentValue.get());
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        });

        thread.start();
        thread.join();

        System.out.println("结束");
    }
}
```

得到了以下结果：

```
父线程中的值: 测试父子线程 ThreadLocal 表现
子线程中的值: null
结束
```

可以看到子线程的确无法获取父线程的 ThreadLocal，原因是：父线程中的 `threadlLocals` 这个 ThreadLocalMap 没有传递给子线程，这也是 ThreadLocal 可以实现线程隔离的根本原因

如果要解决这个问题，需要引入 ThreadLocal 的子类 InheritableThreadLocal，原理是 Thread 初始化时会检查父线程的 `inheritableThreadLocals`，并初始化自己的 `inheritableThreadLocals`，后面使用 `getMap()` 的过程中就用 `inheritableThreadLocals` 代替原来的 `threadLocals`

```java
public class Thread implements Runnbale {
    /* ThreadLocal values pertaining to this thread. This map is maintained
     * by the ThreadLocal class. */
    ThreadLocal.ThreadLocalMap threadLocals = null;

    /*
     * InheritableThreadLocal values pertaining to this thread. This map is
     * maintained by the InheritableThreadLocal class.
     */
    ThreadLocal.ThreadLocalMap inheritableThreadLocals = null;

    private Thread(ThreadGroup g, Runnable target, String name, long stackSize, AccessControlContext acc,
                   boolean inheritThreadLocals) {
        ...
        // 如果需要继承父线程的ThreadLocal，那么就创建一个ThreadLocalMap记录父线程的ThreadLocal
        if (inheritThreadLocals && parent.inheritableThreadLocals != null)
            this.inheritableThreadLocals = ThreadLocal.createInheritedMap(parent.inheritableThreadLocals);
        ...
    }
}

```

把上面代码中的 ThreadLocal 的实现类修改成 InheritableThreadLocal 后，子线程就能正确获取值


### 线程池场景

JDK 默认没有支持线程池场景下 ThreadLocal 值传递的功能，因此阿里巴巴开源了一套工具 **TransmittableThreadLocal** 来实现该功能

使用这个功能需要引入新的依赖

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>transmittable-thread-local</artifactId>
    <version>${ttl.version}</version>
</dependency>
```

阿里巴巴无法改动 JDK 的源码，因此他内部通过**装饰器模式**在原有的功能上做增强，以此来实现线程池场景下的 ThreadLocal 值传递。

TTL 改造的地方有两处：
- 实现自定义的 Thread ，在 `run()` 方法内部做 ThreadLocal 变量的赋值操作
- 基于 线程池 进行装饰，在 `execute()` 方法中，不提交 JDK 内部的 Thread ，而是提交自定义的 Thread


## 关键面试题


### 为什么 ThreadLocalMap 不采用链表或者红黑树来解决哈希冲突

因为 ThreadLocalMap 是线程私有的，读写频率虽然较高，但是总条目大概率比较有限，如果数据量不大的情况下维护链表或者红黑树成本太高，并且短路径线性探测法的性能优于指针跳转


### 为什么 HashMap / ConcurrentHashMap 不采用开放定址法来解决哈希冲突

- 开放定址法要求删除元素不能直接设置null，否则无法查回一开始有哈希冲突而被放到其他索引的元素，HashMap / ConcurrentHashMap 作为通用容器，必须支持高效删除
- 开放定址法的扩容成本太高了，扩容时要对所有元素重新计算索引，而链地址法则每个桶只需要拆分成高低位两个新桶即可，很多元素位置不变，全量 hash 对于 HashMap 来说成本太高
- 开放定址法不需要考虑并发控制，探测路径跨越多个槽位；链地址法天然支持 CAS 操作 / 锁桶头 这种加锁操作


### `ThreadLocal.set()` 方法内部如何避免内存泄漏

- 线性探测时，如果遇到 key 已经指向 null 的无效 entry，执行 `replaceStaleEntry()` 向后扫描整个冲突集，清理所有无效条目后再将新 entry 插入到最优的位置（减少未来探测长度）
- 插入完成后，执行 `cleanSomeShots()` 执行启发式清理，从插入位置向后扫描所有无效 entry，把他们全都清理
- 如果启发式清理没有清理到元素，那么会检查元素是否超出扩容阈值，执行 `expungeStaleEntries()` 扫描整个数组的所有过期 entry 并清理


### 既然 `set()` 方法有这么多重手段避免内存泄漏，为什么仍然需要手动 `remove()`

`set()` 方法的清理属于被动式清理，它依赖于下一轮的调用，假设后续没有任何操作，那么这些清理手段就不会被执行；一些过期的条目可能一直存在 map 中，一直占据内存，尤其在线程池的场景中，过期条目会永久占用内存，也就是永久泄漏；所以调用 `remove()` 主动释放资源是最可靠的方式


### `replaceStaleEntry()` 和 `expungeStaleEntry()` 主要区别

- `expungeStaleEntry()` 会从传入的索引开始，向后清理连续非 null 的区域中的所有无效条目
- `replaceStaleEntry()` 会向前扫描冲突区域的起点，向后扫描直到碰到 null 值，清理这一段冲突区域中所有无效条目；并且会把新 entry 插入到更靠近理想的哈希位置中，提升后续操作的效率


## 参考链接

![ThreadLocal 详解](https://javaguide.cn/java/concurrent/threadlocal.html)
