---
title: AQS 常用工具学习
icon: article
category: 并发
---

# AQS 常用工具总结

> 在这里从案例到重点源码分析来逐一剖析 AQS 常用工具 `CountDownLatch`、`CyclicBarry`、`Semaphore`


## CountDownLatch

`CountDownLatch` 主要的功能是实现**一次性**的线程等待或线程通知，比如主线程等待所有工作线程同时完成或者所有工作线程等待主线程的开始信号，但是需要重点关注：**`CountDownLatch` 的等待唤醒是一次性的，再次使用会失效**

### 使用案例

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


### 源码看本质

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

从源码可以得知 `CountDownLatch` 不可重用的原因：**`countDown()` 方法会对 `state` 递减，但是没有让 `state` 递增的方法，只能减，不能加**；当 `state` 减到 0，尝试第二次使用 `CountDownLatch` 时，`await()` 方法会**直接通过，不再阻塞**


## CyclicBarry

`CyclicBarry` 的作用和 `CountDownLatch` 类似，也是可以实现线程等待的功能，但是最大的不同是：`CyclicBarry` 可以实现复用，实现多次屏障

### 使用案例

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


### 源码看本质

`CyclicBarrier` 没有直接利用 AQS 来实现线程同步的功能，而是利用 `ReentrantLock` 和 `Condition` 实现的阻塞唤醒，核心要点：

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

从源码可以得知 `CyclicBarrier` 屏障可重用的原因是：当不断调用 `await()` 方法对 `count` 递减到 0 时，唤醒所有等待的线程，会重置 `count`，等待下一轮的屏障到达


## Semaphore

保护共享资源安全是锁的工作，而**控制同时使用某资源的线程数量**则是 `Semaphore` 的工作。如果场景是需要对共享资源做一些并发读写的操作，需要锁来保护线程安全；如果场景是需要先申请某些许可后才能工作，则需要 `Semaphore` 来控制

### 使用案例

```java
public class SemaphoreTest {
    // 模拟停车场
    static class ParkingLot {
        private final Semaphore spaces; // 车位信号量
        private final AtomicInteger parkedCars; // 当前停车数

        public ParkingLot(int totalSpaces) {
            this.spaces = new Semaphore(totalSpaces);
            this.parkedCars = new AtomicInteger(0);
        }

        public void park(String carName) throws InterruptedException {
            System.out.println(carName + " 正在等待车位...");
            spaces.acquire(); // 获取车位（可能阻塞）
            int current = parkedCars.incrementAndGet();
            System.out.printf("%s 停入成功！当前停车数: %d/%d\n",
                    carName, current, spaces.availablePermits() + current);
        }

        public void leave(String carName) {
            System.out.println(carName + " 准备离场...");
            int current = parkedCars.decrementAndGet();
            spaces.release(); // 释放车位
            System.out.printf("%s 驶出停车场！当前停车数: %d/%d\n",
                    carName, current, spaces.availablePermits() + current);
        }
    }

    public static void main(String[] args) throws InterruptedException {
        ParkingLot lot = new ParkingLot(3); // 3个车位的小型停车场

        // 创建5辆车（模拟5个线程）
        ExecutorService executor = Executors.newFixedThreadPool(5);
        for (int i = 1; i <= 5; i++) {
            final String carName = "Car-" + i;
            executor.submit(() -> {
                try {
                    lot.park(carName); // 停车
                    // 模拟停车1-3秒
                    Thread.sleep((long)(Math.random() * 2000) + 1000);
                    lot.leave(carName); // 驶出
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });

            // 每0.5秒来一辆车
            Thread.sleep(500);
        }

        executor.shutdown();
        executor.awaitTermination(1, TimeUnit.MINUTES);
        System.out.println("【停车场关闭】所有车辆已处理完毕");
    }
}
```

结果：

```
Car-1 正在等待车位...
Car-1 停入成功！当前停车数: 1/3
Car-2 正在等待车位...
Car-2 停入成功！当前停车数: 2/3
Car-3 正在等待车位...
Car-3 停入成功！当前停车数: 3/3
Car-4 正在等待车位...
Car-5 正在等待车位...
Car-1 准备离场...
Car-1 驶出停车场！当前停车数: 2/3
Car-4 停入成功！当前停车数: 3/3
Car-3 准备离场...
Car-3 驶出停车场！当前停车数: 2/3
Car-5 停入成功！当前停车数: 3/3
Car-2 准备离场...
Car-2 驶出停车场！当前停车数: 2/3
Car-4 准备离场...
Car-4 驶出停车场！当前停车数: 1/3
Car-5 准备离场...
Car-5 驶出停车场！当前停车数: 0/3
【停车场关闭】所有车辆已处理完毕
```

`Semaphore` 的测试中，需要申请资源的线程数 > 资源数，`Semaphore` 控制好资源被安全地申请和释放，如果还有资源，那么直接申请成功；如果资源已经不足了，那么申请资源的线程必须排队等待，知道资源被释放


### 源码看本质

`Semaphore` 也是 AQS 共享模式的实现，核心要点：

- 需要申请资源的线程通过 `acquire()` 方法对资源 `state` 进行递减
    - 如果递减成功，则说明申请资源/申请许可成功
    - 如果递减失败（`tryAcquireShared()` 返回值小于 0）则进入等待队列
- 需要归还资源的线程通过 `release()` 方法对资源 `state` 进行递增，并试图唤醒等待队列中的线程（如果等待线程有线程）

```java
    // Semaphore 默认非公平模式
    final int nonfairTryAcquireShared(int acquires) {
        for (;;) {
            int available = getState();
            int remaining = available - acquires;
            if (remaining < 0 ||
                compareAndSetState(available, remaining))
                return remaining;
        }
    }

    // AQS 共享模式
    public final void acquireSharedInterruptibly(int arg)
        throws InterruptedException {
        if (Thread.interrupted() ||
            // 尝试获取资源
            (tryAcquireShared(arg) < 0 &&
            // 尝试获取失败时返回负数，进入排队逻辑
             acquire(null, arg, true, true, false, 0L) < 0))
            throw new InterruptedException();
    }
```

虽然 `Semaphore` 不是锁，但也要像锁一样去使用，`acquire()` 需要和 `release()` 成对出现，并且最好把 `release()` 放在 `finally` 块，避免出现资源无法得到释放而产生死锁的情况


## 总结

| 工具           | 注意事项                             | 使用场景                   |
|----------------|--------------------------------------|----------------------------|
| ReentrantLock  | 保证 `unlock()` 一定能执行，避免死锁  | 保护共享资源的加减（修改）   |
| CountDownLatch | 只能使用一次，阻塞唤醒后不能再次使用  | 主线程等待多个任务完成     |
| CyclicBarry    | 可以实现多次屏障，可复用              | 多个线程互相等待           |
| Semaphore      | 保证 `release()` 一定能执行，避免死锁 | 控制同时访问资源的线程数量 |
