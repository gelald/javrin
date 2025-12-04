---
title: sleep 和 wait 方法的区别
icon: article
isOriginal: false
category: 并发
---

# sleep 和 wait 方法的区别

Java 中的 `sleep()` 和 `wait()` 都可以用于线程的暂停，但它们在用途、使用方式和底层机制上有本质区别。以下是主要区别：

## 1. **所属类不同**
- `sleep()` 是 `Thread` 类的静态方法。
- `wait()` 是 `Object` 类的实例方法。

---

## 2. **是否释放锁**
- `sleep()`：**不会释放**对象锁（monitor）。线程即使在睡眠中，依然持有锁。
- `wait()`：**会释放**对象锁，使其他线程有机会获取该对象的锁。

---

## 3. **使用场景不同**
- `sleep()`：通常用于**让当前线程暂停一段时间**，例如定时任务、模拟延迟等。
- `wait()`：用于**线程间协作与通信**，通常与 `notify()`/`notifyAll()` 配合使用，实现生产者-消费者、条件等待等模式。

---

## 4. **调用位置限制**
- `sleep()`：可以在**任何地方**调用。
- `wait()`：**必须在同步块（synchronized）中调用**，否则会抛出 `IllegalMonitorStateException`。

---

## 5. **唤醒方式**
- `sleep()`：**自动唤醒**，当指定时间过去后线程自动恢复。
- `wait()`：需要**其他线程调用 `notify()` 或 `notifyAll()`** 来唤醒，也可以使用带超时的 `wait(long timeout)` 实现自动唤醒。

---

## 6. **异常处理**
- `sleep()`：抛出 `InterruptedException`。
- `wait()`：也抛出 `InterruptedException`，此外若不在同步块中调用会抛出 `IllegalMonitorStateException`。

---

## 示例对比

```java
// sleep 示例
try {
    Thread.sleep(1000); // 暂停1秒，不释放锁
} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
}

// wait 示例
synchronized (obj) {
    try {
        obj.wait(); // 释放 obj 的锁，等待被 notify
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
}
```

---

## 总结口诀
- **sleep 不放锁，wait 要同步**；  
- **sleep 是 Thread，wait 是 Object**；  
- **sleep 自动醒，wait 要人叫。**
