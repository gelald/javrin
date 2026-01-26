---
title: 线程池学习
icon: article
category: 并发
---

# 线程池

## 线程池引入

在 Java 中，我们一般通过继承 `Thread` 类和实现 `Runnnable` 接口，调用线程的 `start()` 方法实现线程的启动。但如果并发的数量很多，而且每个线程都是执行很短的时间便结束了，那样**频繁的创建线程和销毁进程会大大的降低系统运行的效率**。

线程池正是为了解决多线程效率低的问题而产生的，通过管理一组工作线程使得线程可以被复用，线程执行结束后不被销毁，而是可以继续执行其他任务。在高并发环境下，系统资源是宝贵的，需要节约资源才能提高可用性。

线程池的作用一言以蔽之，就是提高系统效率和吞吐量。如果服务器对每个请求都分别创建一个线程的话，在很短时间内就会产生很多创建和销毁的动作，然而服务器在创建和销毁线程上花费的时间和消耗的系统资源都相当大，线程池就可以尽量减少这种情况的发生。



## ThreadPoolExecutor

`ThreadPoolExecutor` 是 Java 中提供的常用的线程池对象。

### 7 大重要参数

- `corePoolSize`：核心线程数（默认：0）。

	* 核心线程默认情况下会**一直存活**，即使没有任务需要执行。
	* 当线程数小于核心线程数时，即使有线程空闲，线程池也会优先创建新线程处理。

- `maximumPoolSize`：最大线程数（默认：`Integer.MAX_VALUE`）。

	* 用于规定线程池的最大能创建的线程数量。
	* 当线程数 > `corePoolSize`，**且任务队列已满时**。线程池会创建新线程来处理任务，直到线程数量达到 `maxPoolSize` 。
	* 当线程数已经 = `maxPoolSize`，**且任务队列已满时**，线程池会执行拒绝策略来**拒绝处理**任务。

- `keepAliveTime`：非核心线程空闲时间（默认：60）。

	* 当非核心线程的空闲时间达到 `keepAliveTime` 时，线程会自动销毁，直到线程数等于 `corePoolSize` 。

- `unit`：时间单位，配合 `keepAliveTime` 参数一起使用。

- `workQueue`：阻塞队列，存放待执行的线程任务，当核心线程数达到最大并且所有核心线程都在工作状态中，新任务会放在任务队列中等待执行。

	* `ArrayBlockingQueue`：基于数组实现的有界阻塞队列
    * `LinkedBlockingQueue`：基于链表实现的无界阻塞队列
    * `SynchronousQueue`：无界阻塞队列，**不存储任务，直接提交**，每次插入操作必须等到一个线程移除操作，否则插入操作会一直处于阻塞状态。

- `threadFactory`：线程工厂，用于创建线程，可以配置线程优先级、**线程命名**以及线程类型（用户线程/守护线程）

- `handler`：任务拒绝处理器，当线程数达到 `maxPoolSize`，且任务队列已满时，就会采用设定的拒绝处理器来拒绝任务。

  * `ThreadPoolExecutor.AbortPolicy` （默认）: 丢弃任务并抛出 `RejectedExecutionException`。
  * `ThreadPoolExecutor.DiscardPolicy` : 丢弃任务，但是不抛出异常。
  * `ThreadPoolExecutor.DiscardOldestPolicy` : 丢弃队列最前面的任务，然后重新尝试执行任务。
  * `ThreadPoolExecutor.CallerRunsPolicy` : 不在新线程中执行任务，而是由调用者所在的线程来执行。
  * 同时也可以实现 `RejectedExecutionHandler` 接口来自定义拒绝处理器，比如可以把无法处理的任务进行持久化，等到线程池可以处理时再重新处理。


### 创建线程池

一般创建线程池的方式有两种：构造方法 和 `Executors`，我们推荐使用构造方法来自行创建，原因后面再分析

#### 构造方法创建线程池

结合以上参数来进一步学习 `ThreadPoolExecutor` 的构造方法

我们选择其中一个较为经典的构造方法来看

```java
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue,
                          RejectedExecutionHandler handler) {
	this(corePoolSize,      // 核心线程数
		maximumPoolSize,    // 最大线程数	
		keepAliveTime,      // 线程空闲时间
		unit,               // 线程空闲时间单位
		workQueue,          // 缓存队列对象
		Executors.defaultThreadFactory(),   // 用于设置创建线程的工厂，可以通过线程工厂给每个线程做些更有意义的事情，比如设置daemon和优先级等等
		handler);           // 任务拒绝策略处理器
}
```

其中 `workQueue` : 用于保存等待执行的任务的阻塞队列。可以选择以下几个阻塞队列。

- `ArrayBlockingQueue` : 一个基于数组结构的有界阻塞队列，此队列按 FIFO（先进先出）排序元素。
- `LinkedBlockingQueue` : 一个基于链表结构的无界(默认长度是Integer.MAX_VALUE)阻塞队列，此队列按 FIFO （先进先出） 排序元素，吞吐量通常要高于 `ArrayBlockingQueue`。静态工厂方法 `Executors.newFixedThreadPool()` 使用了这个队列。
- `SynchronousQueue` : 一个**不存储元素的阻塞队列**。每个插入操作必须等到另一个线程调用移除操作，否则插入操作一直处于阻塞状态，吞吐量通常要高于 `LinkedBlockingQueue`。静态工厂方法 `Executors.newCachedThreadPool()` 使用了这个队列。
- `PriorityBlockingQueue` : 一个具有优先级(基于堆结构)的无界阻塞队列。



#### Executors

除了使用构造方法，也可以通过 `Executors` 其中的静态方法来创建线程池。

可以创建4类预定义好参数的线程池，**但是不推荐使用这些静态方法来创建线程池，因为容易导致 OOM 问题**。

- `CachedThreadPool` (可缓存线程池)

```java
public static ExecutorService newCachedThreadPool() {
    return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                  60L, TimeUnit.SECONDS,
                                  new SynchronousQueue<Runnable>());
}
```

当一个任务提交时，`corePoolSize` 为 0 不创建核心线程，`SynchronousQueue` 是一个不存储元素的阻塞队列，可以理解为队里永远是满的，因此**最终会创建非核心线程来执行任务**。因为 `Integer.MAX_VALUE` 非常大，可以认为是**可以无限创建线程**的，在资源有限的情况下容易引起 OOM 异常。

应用场景：执行大量、耗时少的任务。

---

- `SingleThreadPool`  (单线程线程池)

```java
public static ExecutorService newSingleThreadExecutor() {
    return new FinalizableDelegatedExecutorService
        (new ThreadPoolExecutor(1, 1,
                                0L, TimeUnit.MILLISECONDS,
                                new LinkedBlockingQueue<Runnable>()));
}
```

当一个任务提交时，**只有一个核心线程来处理任务**，缓存队列是长度为 `Integer.MAX_VALUE` 的 `LinkedBlockingQueue`，可以认为是无界队列，因此往**队列中可以插入无限多的任务**，在资源有限的时候容易引起 OOM 异常。

应用场景：不适合【并发但可能引起 IO 阻塞及影响 UI 线程响应】的操作，如数据库操作、文件操作等。

---

- `FixedThreadPool` (定长线程池)

```java
public static ExecutorService newFixedThreadPool(int nThreads) {
    return new ThreadPoolExecutor(nThreads, nThreads,
                                  0L, TimeUnit.MILLISECONDS,
                                  new LinkedBlockingQueue<Runnable>());
}
```

定长线程池其实和单个核心线程池类似，唯一区别是可以由用户定义一个固定的核心线程数量。

---

- `ScheduleThreadPool` (定时线程池)

```java
public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize) {
    return new ScheduledThreadPoolExecutor(corePoolSize);
}
```

核心线程数量固定，非核心线程数量**无限**，执行完闲置 10 ms 后回收，任务队列为 `DelayedWorkQueue` 延时阻塞队列。当任务堆积时，缓存队列满了之后，会**创建大量非核心线程来处理任务**，在资源有限的情况下容易引起 OOM 异常。

使用场景：执行定时或者周期性任务。



### 执行流程

其实从上面的核心线程、队列的参数大致可以了解到 `ThreadPoolExecutor` 的执行流程，这一小节来更进一步更详细地理解它的执行流程

`ThreadPoolExecutor` 执行流程图

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220330155842.png)



当一个任务需要添加到线程池中执行时

- 如果线程池中线程数量小于核心线程数，那么即使核心线程全部处于空闲状态，也要创建新的线程作为核心线程来处理这个任务
- 如果线程池中线程数量等于核心线程数，而且核心线程都不空闲，但是缓存队列未满，那么任务放到缓存队列中等待执行
- 如果线程池中线程数量大于核心线程数，缓存队列已满，但线程数小于最大线程数，那么创建新的线程来处理这个任务
- 如果线程池中线程数量大于核心线程数，缓存队列已满，而且线程数等于最大线程数，那么通过 `RejectedExecutionHandler` （拒绝处理器）来处理这个任务



### 为什么阿里巴巴规范明确说不允许使用 Executors 创建线程池

`Executors.newSingleThreadPool()` 和 `Executors.newFixedSingleThreadPool()` 定义的线程池缓存队列选型为 `LinkedBlockingQueue` 长度为 `Integer.MAX_VALUE` ，当堆积任务时容易占用大量内存进而导致 OOM 的发生

`Executors.newCachedThreadPool()` 和 `Executors.newScheduleThreadPool()` 定义的最大线程数为 `Integer.MAX_VALUE` ，当任务堆积时可能会创建数量非常多的线程进行处理任务，容易占用大量内存进而导致 OOM 的发生

所以推荐使用构造方法来创建线程池，尽可能通过多次调整线程池参数，来得到一个最适合系统的线程池

```java
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue,
                          ThreadFactory threadFactory,
                          RejectedExecutionHandler handler)
```



## 线程池参数

~~线程池参数我们一般会根据「每秒任务数」、「每个任务花费的时间」、「系统容忍的最大响应时间」(可以理解为任务超时时间)来调整 `corePoolSize`、`queueCapacity`、`maxPoolSize`、`rejectedExecutionHandler` 这几个核心的参数~~

思考了很久，这里还是不把之前写的线程池参数选择的思路写出来了。

因为并发环境非常复杂，服务器资源也是非常吃紧的，不是我说多少就敲定多少的，是需要不断地在实战中进行调整的。


### 按线程池类型来简单划分线程池大小

这里是我从一些技术平台上面找到的调整策略，但是也不能作为最终的数值，也是作为参考之后不断进行调整的。

- 如果是 CPU 密集型任务，比如需要对大量数据进行排序、运算等，这些任务 CPU 利用率很高，尽量让这些任务并行执行，减少线程切换的开销，所以线程池大小可以设置为 NCPU + 1。（4核CPU，线程池大小设置为5）

- 如果是 IO 密集型任务，比如需要进行文件读取、网络读取，这些任务 IO 操作时间长，CPU 会处于空闲状态，导致 CPU 利用率不高，让这些线程在等待 IO 操作时，其他线程可以使用 CPU，所以线程池大小可以设置为 2*NCPU + 1。（4核CPU，线程池大小设置为9）



> 当然以上只是一个参考值，具体还是需要根据机器性能、系统运行情况来决定或者调整。可以尝试先根据任务类型把线程池大小设置为参考值，关注任务执行情况、系统资源利用率等指标进行适当调整。
>
> 比如线程未达到最大线程数时，服务器的 CPU 已经占满了，这时需要升级硬件或者是优化代码逻辑来调整。
>
> 如果线程池过大，会导致内存占用量过高，还可能会耗尽资源；如果线程池过小，会由于存在资源空闲的情况，对系统吞吐量造成损失。
