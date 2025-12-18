---
title: volatile 学习
icon: article
category: 并发
---

# volatile 学习


## 引入

在学习单例模式的时候，对于懒汉式单例，我们使用了锁 + 双重检查的手段来保证单例对象被正确初始化，但仍然存在不足，多线程条件下容易出现**半初始化**的情况，我们最终在对象的定义时加上了 `volatile` 关键字，来彻底保证单例对象正确初始化

> 半初始化：在对象创建的时候会经历三个阶段：分配内存、调用对象的构造方法（初始化）、建立引用关系（把对象地址赋值给引用变量），**其中第二、第三步可能会被 JVM 进行重排序**。单线程情况下，构造方法会在使用对象前完成，所以没有影响；多线程情况下，其他线程可能会拿到构造单例线程已经把引用关系建立起来了，instance 已经不指向 null了，但是单例对象的构造方法还没执行完，这种情况下直接使用单例对象就会出问题


```java
public class DoubleCheckSingleton {
    //解决指令重排序带来的问题
    private volatile static DoubleCheckSingleton instance;
    
    private DoubleCheckSingleton() {}
    
    public static DoubleCheckSingleton getInstance() {
        //检查是否要阻塞；如果实例不为空，那么就不用进入阻塞了，提高效率
        if (instance == null) {
            synchronized(DoubleCheckSingleton.class) {
                //检查是否要重新创建实例；防止进入了第一层条件后进来覆盖实例或者创建更多实例
            	if (instance == null) {
            		instance = new LazySimpleSingleton();
        		}
        		return instance;
        	}
        }
    }
}
```

## volatile 作用

- 可见性
    - 一个线程对被 `volatile` 修饰的变量的修改，**对其他线程立即可见**
    - 对写操作，强制刷回主内存；对读操作，强制从主内存中获取最新值

```java
public class VisibleIssue {
    // 如果不加上 volatile，子线程中无法获知最新状态无法退出循环
    static volatile boolean flag = true;

    public static void main(String[] args) throws InterruptedException {
        new Thread(() -> {
            while (flag) {

            }
            // 如果不解决可见性问题，这一行无法输出
            System.out.println("退出循环");
        }).start();

        Thread.sleep(2000);
        flag = false;
    }
}
```

- 禁止指令重排序，`volatile` 通过内存屏障来禁止 JVM 对指令重排序
    - 写 `volatile` 操作前，禁止上面的写操作重排序到它之后（**StoreStore**）
    - 读 `volatile` 操作后，禁止下面的读/写重排到它之前（**LoadLoad** / **LoadStore**）
    - 单例模式 DCL 写法很好地体现了这一点

- volatile 只能保证可见性和有序性，无法保证原子性

```java
public class NonAtomicIssue {
    static volatile Integer var = 0;
    public static void main(String[] args) throws InterruptedException {
        Thread thread1 = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                var++;
            }
        });

        Thread thread2 = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                var++;
            }
        });

        thread1.start();
        thread2.start();
        thread1.join();
        thread2.join();

        System.out.println("最终var预期值是: 20000，实际值是: " + var);
    }
}
```
结果：
```
最终var预期值是: 20000，实际值是: 12909
```

> 虽然使用了 volatile 来保证数据的修改对另一个线程立刻可见，但是 var++ 操作是一个复合操作，包含：从主内存中读取到工作内存中、在工作内存中修改 var 的值、把工作内存中的 var 更新到主内存中。**这些操作同一时间无法对多个线程互斥，容易有踩踏意外，比如线程1、2同时更新 var 为同一个值，这样就漏掉其中一次自增了**


## 保证可见性原理

- 写操作：JMM（Java 并发内存模型）中规定：当线程 A 对一个 volatile 变量修改时，把该线程本地内存中的共享变量最新值刷新(flush)到主内存
- 读操作：JMM中规定：使当前线程本地内存中的共享变量的缓存失效(invalidate)，后续的读取必须从主内存中加载

写操作 `flush`、读操作 `invalidate` 保证了一个线程对 volatile 变量的修改对其他线程的可见性，这也是 happens-before 的底层支撑

> happens-before 规则其中一条：对一个 `volatile` 变量的写操作 happens-before 后续对它的读操作。这就保证了：**写操作的结果对后续读操作可见**


## 内存屏障

内存屏障的作用是保证指令不会被重排序

- 写操作时插入
    - StoreStore：禁止 volatile 之前的普通写重排到 volatile 写之后
    - StoreLoad：禁止 volatile 写与后续读重排
- 读操作时插入
    - LoadLoad：禁止 volatile 之后的普通读重排到 volatile 读之前
    - LoadStore：禁止 volatile 读与后续写重排

JVM 在 `volatile` 读写处插入内存屏障，写时防止前面的写被重排到后面，读时防止后面的读被重排到前面，从而保证有序性和可见性
