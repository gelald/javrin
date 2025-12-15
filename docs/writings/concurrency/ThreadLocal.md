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

