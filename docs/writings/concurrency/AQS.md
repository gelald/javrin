---
title: AQS 学习
icon: article
category: 并发
---

# AQS 学习


## 引入

经过 synchronized 的学习，我们知道 synchronized 可以很方便地给一段共享资源的操作加上锁，对操作进行同步控制；但是 synchronized 也有一定的弊端：**不支持中断、不支持超时、不支持公平锁**

AQS 就是用来解决这些问题的，AQS 全称叫 AbstractQueueSynchronizer（抽象队列同步器），它把同步的通用逻辑（排队、阻塞、唤醒）封装成了一个框架，用于构建各种同步工具来解决多线程的同步问题，常见的实现有：ReentrantLock、CountDownLatch 等

AQS 提供了阻塞式同步器的标准实现框架，避免每个工具类重复实现复杂的线程排队和状态管理逻辑，保证了 JUC 包的一致性和可靠性。


## AQS 核心思想

> AQS 的核心设计其实可以一句话概括：一个状态(state) + 一个等待队列(CLH) + 一套原子操作(CAS)


### state

`state` 可以理解为锁的计数器，或者资源剩余量，用具体例子来说明：

- `ReentrantLock`: `state = 0` 表示无锁，`state > 0` 表示被持有
- `CountDownLatch`: `state = 3` 表示还需要进行 3 次 `countDown()`

关键设计：`state` 被 `volatile` 修饰，保证了多个线程之间的可见性


### CLH 阻塞队列

CLH 队列是一个链表实现的阻塞队列，AQS 通过 prev 和 next 两个指针来维护链表

- 当线程获取 `state` 失败时，会被封装成一个 `Node` ，**通过 CAS 的方式加入 CLH 队列尾部**
- 每个线程只需要关注前驱线程，比如线程 B 阻塞时，**只等待前驱节点线程 A 唤醒** (`LockSupport.unpark`)；避免了全局通知的开销，同时天然保证 FIFO 特性

关键设计：队列的操作都通过 CAS 的方式来保证线程安全，避免使用 `synchronized`，提升了性能


## AQS 两种模式

### 独占模式

- 一次只允许一个线程通过
- `tryAcquire()` 方法返回 `boolean`，代表是否成功获取锁
- 代表：`ReentrantLock`、`ReentrantReadWriteLock.WriteLock`


### 共享模式

- 资源足够的情况下，允许多个线程同时通过
- `tryAcquireShared()` 方法返回 `int`
    - `>=0` 代表成功，如果资源还有多的，可能会唤醒后继线程
    - `<0` 代表失败
- 代表：`CountDownLatch`、`ReentrantReadWriteLock.ReadLock`、`Semaphore`


## AQS 简易实现


### 不可重入锁

接下来使用 AQS 来实现 synchronized 功能

```java
public class AQSDemo {
    public static void main(String[] args) throws InterruptedException {
        SimpleMutex simpleMutex = new SimpleMutex();

        Thread t1 = new Thread(() -> {
            // 线程1：获取锁并持有3秒
            System.out.println(Thread.currentThread().getName() + " 尝试获取锁");
            simpleMutex.lock();
            System.out.println(Thread.currentThread().getName() + " 获取锁成功");
            try {
                TimeUnit.SECONDS.sleep(3);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            } finally {
                System.out.println(Thread.currentThread().getName() + " 释放锁");
                simpleMutex.unlock();
            }
        }, "Thread-1");

        Thread t2 = new Thread(() -> {
            try {
                // 确保线程1拿到锁
                TimeUnit.MILLISECONDS.sleep(100);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            // 线程2：获取锁时会进入阻塞状态，直到线程1释放锁
            System.out.println(Thread.currentThread().getName() + " 尝试获取锁");
            simpleMutex.lock();
            System.out.println(Thread.currentThread().getName() + " 获取锁成功");
            try {
                TimeUnit.SECONDS.sleep(3);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            } finally {
                simpleMutex.unlock();
                System.out.println(Thread.currentThread().getName() + " 释放锁");
            }
        }, "Thread-2");

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println("主线程结束，锁状态：" + (simpleMutex.isLocked() ? "已锁" : "未锁"));
    }
}

/**
 * 一个基于 AQS 的简单互斥锁（不可重入）
 */
class SimpleMutex {
    // 实现互斥锁的核心组件，通过 AQS 来构建同步工具
    private static class Sync extends AbstractQueuedSynchronizer {
        @Override
        protected boolean tryAcquire(int arg) {
            // 通过 CAS 的方式修改 state 值
            // 原子地获取锁
            if (compareAndSetState(0, 1)) {
                // 记录当前拥有独立访问权限的线程
                // 可重入的基础
                setExclusiveOwnerThread(Thread.currentThread());
                return true;
            }
            return false;
        }

        @Override
        protected boolean tryRelease(int arg) {
            if (getState() == 0) {
                // 如果 state 已经是 0，说明没有成功获取锁，或者已经被释放了，抛出异常
                throw new IllegalMonitorStateException();
            }
            // 清除拥有独立访问权限线程的标识
            setExclusiveOwnerThread(null);
            // state = 0 说明释放锁
            setState(0);
            return true;
        }

        @Override
        protected boolean isHeldExclusively() {
            // 通过 state 是否等于 1 来判断锁是否被持有
            return getState() == 1;
        }
    }

    private final Sync sync = new Sync();

    public void lock() {
        sync.acquire(1);
    }

    public void unlock() {
        sync.release(1);
    }

    public boolean isLocked() {
        return sync.isHeldExclusively();
    }
}
```

结果是：

```
Thread-1 尝试获取锁
Thread-1 获取锁成功
Thread-2 尝试获取锁
Thread-1 释放锁
Thread-2 获取锁成功
Thread-2 释放锁
主线程结束，锁状态：未锁
```

### 可重入锁

在简易实现的基础上添加重入的支持，核心要点就是检查 `state` 的数量和 `exclusiveOwnerThread` 的指向

```java
public class AQSDemo {
    public static void main(String[] args) throws InterruptedException {
        ReentrantMutex reentrantMutex = new ReentrantMutex();

        Thread t = new Thread(() -> {
            System.out.println("线程开始");

            reentrantMutex.lock();
            System.out.println("第1次 lock，holdCount = " + reentrantMutex.getHoldCount());

            reentrantMutex.lock();
            System.out.println("第2次 lock，holdCount = " + reentrantMutex.getHoldCount());

            reentrantMutex.lock();
            System.out.println("第3次 lock，holdCount = " + reentrantMutex.getHoldCount());

            // 释放三次
            reentrantMutex.unlock();
            System.out.println("第1次 unlock，holdCount = " + reentrantMutex.getHoldCount());

            reentrantMutex.unlock();
            System.out.println("第2次 unlock，holdCount = " + reentrantMutex.getHoldCount());

            reentrantMutex.unlock();
            System.out.println("第3次 unlock，holdCount = " + reentrantMutex.getHoldCount());

            System.out.println("线程结束，锁是否释放: " + !reentrantMutex.isLocked());
        });

        t.start();
        try {
            t.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

class ReentrantMutex {
    private static class Sync extends AbstractQueuedSynchronizer {
        @Override
        protected boolean tryAcquire(int acquires) {
            Thread current = Thread.currentThread();
            int state = getState();

            if (state == 0) {
                // 无锁，尝试获取
                if (compareAndSetState(0, acquires)) {
                    setExclusiveOwnerThread(current);
                    return true;
                }
            } else if (current == getExclusiveOwnerThread()) {
                // 可重入：同一线程再次获取
                int next = state + acquires;
                if (next < 0) { // 溢出检查
                    throw new Error("Maximum lock count exceeded");
                }
                setState(next);
                return true;
            }
            return false;
        }

        @Override
        protected boolean tryRelease(int releases) {
            int state = getState() - releases;
            if (Thread.currentThread() != getExclusiveOwnerThread()) {
                // 非持有者释放锁，抛出异常
                throw new IllegalMonitorStateException();
            }

            boolean free = false;

            if (state == 0) {
                // 重入次数归零，真正释放
                free = true;
                setExclusiveOwnerThread(null);
            }
            // 未归零，继续更新 state
            setState(state);
            // 注意：AQS release() 会检查 tryRelease() 返回值是否为 true
            return free;
        }

        @Override
        protected boolean isHeldExclusively() {
            return getExclusiveOwnerThread() == Thread.currentThread();
        }

        public int getHoldCount() {
            // 如果被持有着，返回重入次数
            // 如果没有被持有，直接返回0
            return isHeldExclusively() ? getState() : 0;
        }
    }

    private final Sync sync = new Sync();

    public void lock() {
        sync.acquire(1);
    }

    public void unlock() {
        sync.release(1);
    }

    public boolean isLocked() {
        return sync.isHeldExclusively();
    }

    public int getHoldCount() {
        return sync.getHoldCount();
    }
}
```

结果是：

```
线程开始
第1次 lock，holdCount = 1
第2次 lock，holdCount = 2
第3次 lock，holdCount = 3
第1次 unlock，holdCount = 2
第2次 unlock，holdCount = 1
第3次 unlock，holdCount = 0
线程结束，锁是否释放: true
```

### 总结

因为 AQS 中已经定义好 acquire 和 release 方法，并提供 tryAcquire 和 tryRelease 方法给子类实现，所以在具体的实现类中只需要实现好两个 try 方法即可

AQS 负责完成阻塞排队、释放唤醒的通用操作，子类只需要实现好 “怎么样是获取/释放锁成功/失败” ，这体现了**模板方法**的设计模式
