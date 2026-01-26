---
title: CAS 学习
icon: article
category: 并发
---

# CAS 学习

## CAS 三要素

- 内存值
- 期望值（旧值）
- 新值

语义：Compare-And-Swap 如果读取变量的内存值 = 期望值，那么设置内存值为新值，否则重新读取内存值继续下一轮循环

在 Java 中通常会使用原子类来实现 CAS 功能，比如 `AtomicInteger`、`AtomicLong`、`AtomicReference`等

```java
public class CASDemo {
    private static final AtomicInteger counter = new AtomicInteger(0);

    public static void main(String[] args) throws InterruptedException {
        ExecutorService executor = Executors.newFixedThreadPool(10);

        for (int i = 0; i < 1000; i++) {
            executor.submit(counter::incrementAndGet);
        }

        executor.shutdown();
        boolean b = executor.awaitTermination(1, TimeUnit.MINUTES);
        System.out.println("最终计数: " + counter.get()); // 必定 = 1000
    }
}
```

## CAS 与 synchronized 对比

| 对比维度 | CAS                  | synchronized                           |
|----------|----------------------|----------------------------------------|
| 实现方式 | CPU 原子指令（用户态） | 重量级锁的实现方式是 OS Mutex （内核态） |
| 阻塞     | 自旋重试，不阻塞      | 等待锁的线程会进入阻塞状态，等待唤醒    |
| 适用场景 | 低竞争               | 高竞争                                 |


## CAS 缺陷

### ABA 问题

线程 1 把资源从 A 修改为 B，然后又修改为了 A；在线程 2 的角度来看，资源的状态依然是 A，以为没有被修改，实际上是修改后的状态恰好回到了最初状态

解决方式：使用 `AtomicStampReference`，每次修改都要加入版本号校验，保证完全没有被修改过。**ABA 问题本质上是状态的丢失，通过引入版本号解决，类似数据库的乐观锁**

```java
public class ABADemo {
    @Getter
    static class Account {
        private int balance;
        public Account(int balance) { this.balance = balance; }
        public void withdraw(int amount) { balance -= amount; }
        public void deposit(int amount) { balance += amount; }
    }

    public static void main(String[] args) throws InterruptedException {
        // 1. 有问题的 CAS
        Account account = new Account(100);

        // 线程A：挂起前读取余额=100
        int expected = account.getBalance();

        // 线程B：修改余额
        Thread thread1 = new Thread(() -> {
            try {
                Thread.sleep(100);
            } catch (InterruptedException ignored) {
            }
            account.withdraw(50); // 100→50
            account.deposit(50);  // 50→100
        });
        thread1.start();

        thread1.join();

        // 线程A：恢复后 CAS
        if (account.getBalance() == expected) { // true! 但状态已变化
            account.withdraw(50); // 错误扣除！
        }
        System.out.println("错误结果: " + account.getBalance()); // 50 (应为100)

        // 2. 使用 AtomicStampedReference 解决 ABA 问题
        AtomicStampedReference<Account> safeAccount =
                new AtomicStampedReference<>(new Account(100), 0);

        int[] stampHolder = new int[1];
        Account expectedAcc = safeAccount.get(stampHolder);
        int stamp = stampHolder[0];

        Thread thread2 = new Thread(() -> {
            try {
                Thread.sleep(100);
            } catch (InterruptedException ignored) {
            }
            // 模拟状态变化
            Account newAcc = new Account(50);
            safeAccount.compareAndSet(expectedAcc, newAcc, stamp, stamp + 1);
            safeAccount.compareAndSet(newAcc, new Account(100), stamp + 1, stamp + 2);
        });
        thread2.start();

        thread2.join();

        // 线程A：CAS 检查版本号
        Account newAcc = new Account(50);
        boolean success = safeAccount.compareAndSet(
                expectedAcc, newAcc, stamp, stamp+1
        );
        System.out.println("修复结果: " + success); // false! 版本号已变
    }
}
```

### 自旋循环开销较大

拿 `AtomicInteger` 原子递增操作来说，高竞争情况下，性能较差，因为可能要经历大量失败重试

解决方式：对于这种场景，使用 `LongAddr` 来代替 `AtomicInteger` 来实现累加，通过分段锁的方式来**避免大量的自旋**。对于其他非累加的场景，如果竞争同样很激烈，每次 CAS 的自旋开销总是大于 1 次，应该重新考虑是否需要是否 synchronized 来控制

```java
public class AccumulationTest {
    public static void main(String[] args) throws InterruptedException {
        int threads = 100;
        int iterations = 10000;

        StopWatch stopWatch = new StopWatch();
        // 测试 AtomicInteger 自增性能
        // 使用 CAS 保证原子性，但在高并发下存在大量失败重试
        AtomicInteger atomicInteger = new AtomicInteger(0);
        ExecutorService executor = Executors.newFixedThreadPool(threads);

        stopWatch.start("AtomicInteger");
        for (int i = 0; i < threads; i++) {
            executor.submit(() -> {
                for (int j = 0; j < iterations; j++) {
                    atomicInteger.incrementAndGet();
                }
            });
        }
        executor.shutdown();
        executor.awaitTermination(1, TimeUnit.MINUTES);
        stopWatch.stop();
        System.out.println("AtomicInteger: " + stopWatch.lastTaskInfo().getTimeMillis());

        // 测试 LongAdder 自增性能
        // 将累加操作分散到多个 Cell 中，最后再合并结果
        // 在高并发场景下性能优于 AtomicInteger
        LongAdder longAdder = new LongAdder();
        executor = Executors.newFixedThreadPool(threads);

        stopWatch.start("LongAdder");
        for (int i = 0; i < threads; i++) {
            executor.submit(() -> {
                for (int j = 0; j < iterations; j++) {
                    longAdder.increment();
                }
            });
        }
        executor.shutdown();
        executor.awaitTermination(1, TimeUnit.MINUTES);
        stopWatch.stop();
        System.out.println("LongAdder: " + stopWatch.lastTaskInfo().getTimeMillis());
    }
}

```
