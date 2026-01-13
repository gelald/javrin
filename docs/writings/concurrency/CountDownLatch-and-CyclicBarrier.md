---
title: CountDownLatch 与 CyclicBarrier 学习
icon: article
category: 并发
---

# CountDownLatch 与 CyclicBarrier 学习

> CountDownLatch 是 AQS 常见共享模式的实现类，它可以实现线程等待，也可以实现线程通知。CyclicBarrier 和它的功能相似，但是它允许线程复用，在这里对比着学习


## 源码看本质

### CountDownLatch

`CountDownLatch` 是 AQS 共享模式的实现，核心要点：

- 线程通过 `countDown()` 方法对资源进行递减
- 等待资源 `state` 减到 0，然后传播式唤醒所有等待线程 (调用了 `await()` 方法的线程)
- **不可重用，一旦 `state` 减到 0，后续调用 `await()` 方法都不再阻塞，直接通过**

```java
public class CountDownLatch {
    // 构造方法定义 state 有多少份资源
    public CountDownLatch(int count) {
        if (count < 0) throw new IllegalArgumentException("count < 0");
        this.sync = new Sync(count);
    }
    
    // 核心：state 从 N → 0
    public void countDown() {
        // 调用 AQS 共享释放
        sync.releaseShared(1);
    }
    
    public void await() throws InterruptedException {
        // 调用 AQS 共享获取
        sync.acquireSharedInterruptibly(1);
    }

    private static final class Sync extends AbstractQueuedSynchronizer {
        protected boolean tryReleaseShared(int releases) {
            for (;;) {
                int c = getState();
                if (c == 0) return false; // 已归零
                int nextc = c - 1;
                if (compareAndSetState(c, nextc))
                    return nextc == 0; // 归零时唤醒所有
            }
        }

        protected int tryAcquireShared(int acquires) {
            // state=0 时返回正数（成功）
            return (getState() == 0) ? 1 : -1;
        }
    }
}
```

### CyclicBarrier

`CyclicBarrier` 是利用 `CountDownLatch` 和 `Condition` 实现的阻塞唤醒，核心要点：

- 线程通过 `await()` 方法对资源进行递减，然后进入等待状态
- 当资源 `count` 减到 0 时，会执行定义好的到达屏障的回调逻辑，并使用 `signalAll()` 方法唤醒所有等待线程
- **唤醒所有等待线程后，重新创建新屏障，通过 `Generation` 标识屏障代数，实现复用**

```java
public class CyclicBarrier {
    private final Condition trip = lock.newCondition();

    private static class Generation {
        boolean broken = false; // 标记屏障是否被破坏
    }
    
    public int dowait() throws InterruptedException, BrokenBarrierException {
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            final Generation g = generation;
            if (g.broken) throw new BrokenBarrierException();
            
            if (--count == 0) { // 最后一个线程到达
                nextGeneration(); // 创建新屏障
                return 0;
            }
            
            // 等待
            for (;;) {
                trip.await(); // Condition 等待
                if (g.broken) throw new BrokenBarrierException();
                if (g != generation) return index; // 屏障已更新
            }
        } finally {
            lock.unlock();
        }
    }

    private void nextGeneration() {
        trip.signalAll(); // 唤醒所有等待线程
        count = parties; // 重置计数
        generation = new Generation(); // 创建新屏障
    }
}
```


## 屏障效果测试对比

> 分别使用 `CountDownLatch` 和 `CyclicBarrier` 实现屏障效果，对比测试

### CountDownLatch

```java
public class CountDownLatchTest {
    public static void main(String[] args) throws InterruptedException {
        int workerCount = 3;
        CountDownLatch latch = new CountDownLatch(workerCount);

        System.out.println("===== CountDownLatch 测试 =====");
        System.out.println("主线程: 启动 " + workerCount + " 个 worker");

        for (int i = 1; i <= workerCount; i++) {
            new Thread(() -> {
                try {
                    System.out.println(Thread.currentThread().getName() + ": 开始工作");
                    Thread.sleep(1000);
                    System.out.println(Thread.currentThread().getName() + ": 工作完成，调用 countDown()");
                    latch.countDown(); // 通知完成
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }, "Worker-" + i).start();
        }

        System.out.println("主线程调用 await() 等待所有 worker 完成");
        latch.await(); // 主线程等待
        System.out.println("主线程: 所有 worker 完成，继续执行");

        // 尝试重用（会失败！）
        System.out.println("\n⚠️ 尝试重用 CountDownLatch...");
        new Thread(() -> {
            try {
                System.out.println(Thread.currentThread().getName() + ": 再次开始工作");
                Thread.sleep(1000);
                System.out.println(Thread.currentThread().getName() + ": 工作再次完成，再次调用 countDown()");
                latch.countDown(); // 无效果
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }, "Worker-1").start();

        System.out.println("主线程尝试再次调用 await() 来等待第二次 worker 完成");
        latch.await(); // 立即通过（因为 state 已归0）
        System.out.println("主线程: 再次 await() 直接通过！证明不可重用");
    }
}
```

结果：

```
===== CountDownLatch 测试 =====
主线程: 启动 3 个 worker
主线程调用 await() 等待所有 worker 完成
Worker-1: 开始工作
Worker-2: 开始工作
Worker-3: 开始工作
Worker-1: 工作完成，调用 countDown()
Worker-2: 工作完成，调用 countDown()
Worker-3: 工作完成，调用 countDown()
主线程: 所有 worker 完成，继续执行

⚠️ 尝试重用 CountDownLatch...
主线程尝试再次调用 await() 来等待第二次 worker 完成
主线程: 再次 await() 直接通过！证明不可重用
Worker-1: 再次开始工作
Worker-1: 工作再次完成，再次调用 countDown()
```

`CountDownLatch` 的测试中，主线程等待每个 worker，第一次使用时，可以正常实现“屏障”的同步功能，但是第二次使用时却不能达到相同的效果

原因是 `CountDownLatch` 不可重用，`countDown()` 方法会对 `state` 递减，但是没有让 `state` 递增的方法，只能减，不能加，当 `state` 减到 0，尝试第二次使用 `CountDownLatch` 时，`await()` 方法会直接通过，不再阻塞


### CyclicBarrier

```java
public class CyclicBarrierTest {
    public static void main(String[] args) throws InterruptedException {
        int parties = 3;
        CyclicBarrier barrier = new CyclicBarrier(parties, () -> {
            System.out.println("→→→ 阶段完成回调: 所有线程到达屏障 ←←←");
        });

        System.out.println("\n===== CyclicBarrier 测试 =====");

        // 第一阶段
        System.out.println("第一阶段: " + parties + " 个线程互相等待");
        for (int i = 1; i <= parties; i++) {
            new Thread(() -> {
                try {
                    System.out.println(Thread.currentThread().getName() + ": 到达第一阶段屏障, 调用 await()");
                    barrier.await(); // 等待其他线程
                    System.out.println(Thread.currentThread().getName() + ": 通过第一阶段屏障, 唤醒");
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }, "Thread-" + i).start();
        }
        Thread.sleep(2000); // 等待第一阶段完成

        // 第二阶段（重用）
        System.out.println("\n✅ 重用 CyclicBarrier 进行第二阶段");
        for (int i = 1; i <= parties; i++) {
            new Thread(() -> {
                try {
                    System.out.println(Thread.currentThread().getName() + ": 到达第二阶段屏障, 调用 await()");
                    barrier.await();
                    System.out.println(Thread.currentThread().getName() + ": 通过第二阶段屏障, 唤醒");
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }, "Thread-" + i).start();
        }
    }
}
```

结果：

```
===== CyclicBarrier 测试 =====
第一阶段: 3 个线程互相等待
Thread-1: 到达第一阶段屏障, 调用 await()
Thread-2: 到达第一阶段屏障, 调用 await()
Thread-3: 到达第一阶段屏障, 调用 await()
→→→ 阶段完成回调: 所有线程到达屏障 ←←←
Worker-1: 工作再次完成，再次调用 countDown()
Thread-3: 通过第一阶段屏障, 唤醒
Thread-1: 通过第一阶段屏障, 唤醒
Thread-2: 通过第一阶段屏障, 唤醒

✅ 重用 CyclicBarrier 进行第二阶段
Thread-1: 到达第二阶段屏障, 调用 await()
Thread-2: 到达第二阶段屏障, 调用 await()
Thread-3: 到达第二阶段屏障, 调用 await()
→→→ 阶段完成回调: 所有线程到达屏障 ←←←
Thread-3: 通过第二阶段屏障, 唤醒
Thread-1: 通过第二阶段屏障, 唤醒
Thread-2: 通过第二阶段屏障, 唤醒
```

`CyclicBarrier` 的测试中，多个 worker 相互协作，到达临界点触发屏障回调，第一次使用时，可以正常实现“屏障”的同步功能；第二次使用时，依然可以实现“屏障”的同步功能

原因是 `CyclicBarrier` 的屏障是可重用，当不断调用 `await()` 方法对 `count` 递减到 0 时，唤醒所有等待的线程，并重置了 `count`，等待下一轮的屏障到达



## 总结使用场景

- `CountDownLatch`：
  - 等待主体是主线程，主线程等待多个任务完成
  - 等待主体是子线程，子线程等待主线程的统一发令后开始执行
  - 关键在于必须正确调用 `countDown()` 方法，否则容易导致永久阻塞，除非使用 `await(timeout)` 方法

- `CyclicBarrier`：适用所有复用屏障的场景
