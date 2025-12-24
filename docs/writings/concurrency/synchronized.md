---
title: synchronized 学习
icon: article
category: 并发
---

# synchronized 学习


## 引入

在刚开始学习并发的时候，我们碰到一些多个线程同时操作同一个共享变量的情景，比如两个线程对同一个变量累加10000次，如果不加锁会有线程安全问题（结果不如预期）

```java
public class TinySynchronizedDemo {
    public static Integer result = 0;
    public static void main(String[] args) throws InterruptedException {
        Thread thread1 = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                result++;
            }
        });

        Thread thread2 = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                result++;
            }
        });

        thread1.start();
        thread2.start();

        thread1.join();
        thread2.join();

        System.out.println("result: " + result);
    }
}

```

这段程序对共享变量的操作没有加锁，因为 result++ 这个操作其实是一个复合的操作，能拆分成 1.从主内存中取值、2.在工作内存中修改、3.把工作内存中地值更新回主内存 这三步操作，如果没有加锁控制，可能线程一在工作内存中的修改还没更新到主内存中的时候，线程二已经从主内存中读了 result 的值到工作内存中了，这会导致漏掉一些更新到主内存的步骤，最终结果会小于 20000

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/NonLockIssue.png)

如果要让这段代码按预期执行，result++ 这个操作必须要保证是前后两个线程串行执行，也就是同步地执行，在 Java 中控制同步的操作可以用锁来实现，`synchronized` 是 Java 锁的其中一个代表，可以把程序这样调整

```java
public class TinySynchronizedDemo {
    public static Integer result = 0;
    public static void main(String[] args) throws InterruptedException {
        Thread thread1 = new Thread(() -> {
            synchronized (TinySynchronizedDemo.class) {
                for (int i = 0; i < 10000; i++) {
                    result++;
                }
            }
        });

        Thread thread2 = new Thread(() -> {
            synchronized (TinySynchronizedDemo.class) {
                for (int i = 0; i < 10000; i++) {
                    result++;
                }
            }
        });

        thread1.start();
        thread2.start();

        thread1.join();
        thread2.join();

        System.out.println("result: " + result);
    }
}
```

最终的结果也是符合预期的 20000

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/LockResult.png)


## 使用方式

synchronized 可以对对象加锁，也可以对类加锁


### 类锁


#### synchronized 修饰静态方法

synchronized 用在静态方法上，锁住的对象就是当前方法所在的 Class 类

```java
public class SynchronizedUsageDemo implements Runnable {

    @Override
    public void run() {
        staticMethod();
    }

    /**
     * synchronized用在静态方法上，锁对象是当前方法所在的 Class 对象
     */
    public static synchronized void staticMethod() {
        System.out.println("线程 " + Thread.currentThread().getName() + " 开始");
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println("线程 " + Thread.currentThread().getName() + " 结束");
    }

    public static void main(String[] args) {
        Thread thread1 = new Thread(new SynchronizedUsageDemo());
        Thread thread2 = new Thread(new SynchronizedUsageDemo());

        thread1.start();
        thread2.start();
    }
}

---

线程 Thread-0 开始
线程 Thread-0 结束
线程 Thread-1 开始
线程 Thread-1 结束
```


#### synchronized 指定锁对象为 Class 对象

在 synchronized 中指定一个 class 对象，锁住的对象就是这个 class 对象

```java
public class SynchronizedUsageDemo implements Runnable {

    @Override
    public void run() {
        // 在 synchronized 中指定一个 class 对象，锁住的对象就是这个 class 对象
        synchronized(SynchronizedUsageDemo.class){
            System.out.println("线程 " + Thread.currentThread().getName() + " 开始");
            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println("线程 " + Thread.currentThread().getName() + " 结束");
        }
    }

    public static void main(String[] args) {
        Thread thread1 = new Thread(new SynchronizedUsageDemo());
        Thread thread2 = new Thread(new SynchronizedUsageDemo());

        thread1.start();
        thread2.start();
    }
}

---

线程 Thread-0 开始
线程 Thread-0 结束
线程 Thread-1 开始
线程 Thread-1 结束
```

### 对象锁


#### 代码块形式 手动指定锁对象

在 synchronized 中指定的对象就是锁住的对象

```java
public class SynchronizedUsageDemo implements Runnable {
    public final Object lock = new Object();

    @Override
    public void run() {
        // 在 synchronized 中指定的对象就是锁住的对象
        synchronized (lock) {
            System.out.println("线程 " + Thread.currentThread().getName() + " 开始");
            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println("线程 " + Thread.currentThread().getName() + " 结束");
        }
    }

    public static void main(String[] args) {
        // 因为需要演示对象锁，如果两个对象不一致，锁住的对象也就不一致，无法正确控制同步
        SynchronizedUsageDemo instance = new SynchronizedUsageDemo();
        Thread thread1 = new Thread(instance);
        Thread thread2 = new Thread(instance);

        thread1.start();
        thread2.start();
    }
}

---

线程 Thread-0 开始
线程 Thread-0 结束
线程 Thread-1 开始
线程 Thread-1 结束
```


#### 方法锁形式 修饰普通方法

synchronized 用在普通方法上，锁对象是 this 指针

```java
public class SynchronizedUsageDemo implements Runnable {

    @Override
    public void run() {
        this.method();
    }

    /**
     * synchronized 用在普通方法上，锁对象是 this 指针
     */
    public synchronized void method() {
        System.out.println("线程 " + Thread.currentThread().getName() + " 开始");
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println("线程 " + Thread.currentThread().getName() + " 结束");
    }

    public static void main(String[] args) {
        // 因为需要演示对象锁，如果两个对象不一致，锁住的对象也就不一致，无法正确控制同步
        SynchronizedUsageDemo instance = new SynchronizedUsageDemo();
        Thread thread1 = new Thread(instance);
        Thread thread2 = new Thread(instance);

        thread1.start();
        thread2.start();
    }
}

---

线程 Thread-0 开始
线程 Thread-0 结束
线程 Thread-1 开始
线程 Thread-1 结束
```


### 使用重点

使用 synchronized 的一个核心重点是：**保证多个线程锁住的是同一个对象**

如果多个线程锁住的对象不一致，那么这把锁就无法正确控制同步，可以看这个例子：

```java
public class NonFinalLockIssue {
    static Integer count = 0;

    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                synchronized (count) {
                    count++;
                }
            }
        });
        thread.start();

        for (int i = 0; i < 10000; i++) {
            synchronized (count) {
                count++;
            }
        }
        thread.join();

        System.out.println(count);
    }
}
```

这段程序的意图是分别在父子线程中执行 10000 次对 count 变量的累加，并且这个累加的动作是被包含在 synchronized 块当中的，希望两个线程的操作可以同步地执行；这段程序的预期结果是 20000，然而实际的结果总是小于 20000。**原因就是 count 变量每次经过拆箱累加、装箱之后，已经不是原来的对象，换言之锁住的对象已经发生了改变，所以无法控制同步了**

正确的修改方法是：**重新定义一个不可变对象作为加锁对象**

```java
public class NonFinalLockIssue {
    static Integer count = 0;

    static final Object lock = new Object();

    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                synchronized (lock) {
                    count++;
                }
            }
        });
        thread.start();

        for (int i = 0; i < 10000; i++) {
            synchronized (lock) {
                count++;
            }
        }
        thread.join();

        System.out.println(count);
    }
}
```


## 底层结构

synchronized 底层是基于 JVM 的 Monitor 来实现


### Monitor 三要素

- Owner：当前持有锁的线程
- EntryList：阻塞等待锁的线程队列
- WaitSet：调用 `wait()` 方法的线程队列


### 对象头 Mark Word

Java 中每个对象的对象头都包含了 Mark Word，用于存储 HashCode、 GC 分代年龄、锁标记位、线程 ID、指向 Monitor 的指针 等信息


## 锁升级