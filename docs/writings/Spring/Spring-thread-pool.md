---
title: Spring 线程池的使用
icon: article
category:

- 框架
- 并发
- 文章

tag:

- Spring/SpringBoot
- 线程池

---

# SpringBoot 线程池

> 众所周知，「Spring makes all simple」，当然也包括线程池。
>
> 线程池回顾：[线程池](../concurrency/thread-pool.md)



## Spring 实现的线程池

先看看 Spring 中提供的线程池

### TaskExecutor

`TaskExecutor` 是 Spring 中线程池的顶层接口

```java
@FunctionalInterface
public interface TaskExecutor extends Executor {
    
	@Override
	void execute(Runnable task);
    
}
```

可以看到它是继承了 JDK 中的线程池接口 `Executor` ，也没有做针对 `execute` 方法的实现，可以看出它对于其实现类更多地只是作为一个标识，标识这是 Spring 的线程池。

> 另外一句题外话：从 Spring 对其命名以及抽象方法中形参的命名来看，我认为 Spring 想给开发人员明确一个思想：所有线程池中运行的线程，都认为是一个任务



### SimpleAsyncTaskExecutor

`SimpleAsyncTaskExecutor` 虽然是实现了顶层接口 `TaskExecutor` ，但是严格意义上来说，他不能归属于线程池。

我们这就一步步看他工作流程

```java
public class SimpleAsyncTaskExecutor extends CustomizableThreadCreator implements AsyncListenableTaskExecutor, Serializable {
    
	@Override
	public void execute(Runnable task) {
		execute(task, TIMEOUT_INDEFINITE);
	}
    
	@Override
	public void execute(Runnable task, long startTimeout) {
		Assert.notNull(task, "Runnable must not be null");
		Runnable taskToUse = (this.taskDecorator != null ? this.taskDecorator.decorate(task) : task);
		if (isThrottleActive() && startTimeout > TIMEOUT_IMMEDIATE) {
			this.concurrencyThrottle.beforeAccess();
			doExecute(new ConcurrencyThrottlingRunnable(taskToUse));
		}
		else {
			doExecute(taskToUse);
		}
	}
    
	protected void doExecute(Runnable task) {
		// 每次都创建一个线程并启动这个线程任务
		Thread thread = (this.threadFactory != null ? this.threadFactory.newThread(task) : createThread(task));
		thread.start();
	}
    
}
```

可以看到 `execute(Runnable task)` 方法往下调用了 `execute(Runnable task, long startTimeout)` 方法，最终会调用真正执行的 `doExecute(Runnable task)`
> 题外话，xxx、doXxx的命名方式，很Spring~

在 `doExecute` 方法中，居然每次调用都是创建了一个新的线程！
> 好家伙，又回到最初学习多线程的时候，手动创建线程

这种频繁地创建线程的做法显然是不合理的，所以 `SimpleAsyncTaskExecutor` 不能称为真正意义上的线程池



### SyncTaskExecutor

从名字上看，可以大概知道 `SyncTaskExecutor` 这个线程池是一个同步的线程池

```java
public class SyncTaskExecutor implements TaskExecutor, Serializable {
    public SyncTaskExecutor() {
    }

    public void execute(Runnable task) {
        Assert.notNull(task, "Runnable must not be null");
        task.run();
    }
}
```

`execute(Runnable task)` 方法只是简单执行了线程的 `run` 方法，注意：不是 `start` 方法，所以说这是一个**同步调用**
> 好家伙，学习多线程的时候就多次提醒开启线程不能执行 `run` 方法，而是要执行 `start` 方法等待线程调用

因此 `SyncTaskExecutor` 一般不适合用于多线程的业务



### ThreadPoolTaskExecutor

这个是最常用的线程池，实际上是对 JDK 的 `ThreadPoolExecutor` 的一个包装

其创建方式和 `ThreadPoolExecutor` 的创建方式基本保持一致


```java
public class ThreadPoolTaskExecutor extends ExecutorConfigurationSupport implements AsyncListenableTaskExecutor, SchedulingTaskExecutor {

	//非常熟悉的参数
	private int corePoolSize = 1;
	private int maxPoolSize = Integer.MAX_VALUE;
	private int keepAliveSeconds = 60;
	private int queueCapacity = Integer.MAX_VALUE;
	private boolean allowCoreThreadTimeOut = false;

	@Nullable
	private TaskDecorator taskDecorator;

	//实际上使用了 JDK 的线程池来完成线程的调用
	@Nullable
	private ThreadPoolExecutor threadPoolExecutor;
	
	//使用上面的参数来初始化一个 JDK 的线程池
	@Override
	protected ExecutorService initializeExecutor(
			ThreadFactory threadFactory, RejectedExecutionHandler rejectedExecutionHandler) {

		BlockingQueue<Runnable> queue = createQueue(this.queueCapacity);

		ThreadPoolExecutor executor;
		if (this.taskDecorator != null) {
			executor = new ThreadPoolExecutor(
					this.corePoolSize, this.maxPoolSize, this.keepAliveSeconds, TimeUnit.SECONDS,
					queue, threadFactory, rejectedExecutionHandler) {
				@Override
				public void execute(Runnable command) {
					Runnable decorated = taskDecorator.decorate(command);
					if (decorated != command) {
						decoratedTaskMap.put(decorated, command);
					}
					super.execute(decorated);
				}
			};
		}
		else {
			executor = new ThreadPoolExecutor(
					this.corePoolSize, this.maxPoolSize, this.keepAliveSeconds, TimeUnit.SECONDS,
					queue, threadFactory, rejectedExecutionHandler);

		}

		if (this.allowCoreThreadTimeOut) {
			executor.allowCoreThreadTimeOut(true);
		}

		this.threadPoolExecutor = executor;
		return executor;
	}
	
	//如果有传入线程池任务队列的容量，那就使用 LinkedBlockQueue ，否则使用 SynchronousQueue 这种不存储元素的阻塞队列
	protected BlockingQueue<Runnable> createQueue(int queueCapacity) {
		if (queueCapacity > 0) {
			return new LinkedBlockingQueue<>(queueCapacity);
		}
		else {
			return new SynchronousQueue<>();
		}
	}
}
```

其中这个 `initializeExecutor` 方法是在其父类 `ExecutorConfigurationSupport` 实现了 `InitializingBean` 接口，在 `afterPropertiesSet` 调用的，也就是说 `ThreadPoolTaskExecutor` 在初始化时就根据这些参数创建了任务队列、JDK 的线程池。

此外，父类还实现了 `DisposableBean` 接口，当容器关闭时，也能自动根据参数 `waitForTasksToCompleteOnShutdown` 来销毁线程池、停止任务。


## SpringBoot 使用线程池进行异步调用

### 使用

在 SpringBoot 项目中使用线程池实现异步调用很简单，只需要借助 `@Async` 注解。

被 `@Async` 修饰的方法只能要么没有返回值，要么返回 `Future<?>` 对象。

```java
@Component
public class AsyncTask {

    @Async
    public void testVoidAsyncTask() {
        try {
            Thread.sleep(6000);
            System.out.println("无返回值的异步任务执行完成");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    
    @Async
    public Future<String> testFutureAsyncTask() throws Exception {
        Thread.sleep(6000);
        System.out.println("有返回值的异步任务执行完成，获取结果将会阻塞主线程");
        return new AsyncResult<String>("test");
    }
}
```



### 注意事项

1. 调用被 `@Async` 和 `@Transactional` 标注的方法需要从**外部调用**，内部调用是会导致失效的，因为 `@Transactional` 和 `@Async` 注解的实现都是基于 Spring 的 AOP，而 AOP 的实现是基于动态代理模式实现的。那么注解失效的原因就很明显了，有可能因为调用方法的是对象本身而不是代理对象，因为**没有经过 Spring 容器**。
2. 这里进行异步调用的线程池使用的是 Spring 默认的线程池 `SimpleAsyncTaskExecutor` ，上面已经分析过，这个线程池由于每次都创建一个新线程来执行任务，开销大而且有 OOM 的风险，所以不能直接使用，需要自定义一个适合业务的线程池。



## SpringBoot 自定义线程池

既然使用 Spring 默认的线程池 `SimpleAsyncTaskExecutor` 会有 OOM 的风险，所以我们需要自定义一个满足业务、安全的线程池。

在 SpringBoot 项目中定义并使用自定义的线程池有以下两种方式



### 1. 直接根据配置定义线程池 Bean

手动根据参数创建一个线程池的 Bean，然后在调用时在 `@Async` 注解中填写使用的线程池的 BeanName 

这种方式比较灵活，能指定每一个异步任务所使用的线程池

```java
// 启动多线程的支持
@EnableAsync
@Configuration
public class AsyncTaskConfig {
 
    // 方便演示就先使用@Value
    // 一般会使用@EnableConfigurationProperties修饰一个配置类，统一管理相关配置
    @Value("${spring.task.execution.pool.core-size}")
    private int corePoolSize;
    @Value("${spring.task.execution.pool.max-size}")
    private int maxPoolSize;
    @Value("${spring.task.execution.pool.queue-capacity}")
    private int queueCapacity;
    @Value("${spring.task.execution.thread-name-prefix}")
    private String namePrefix;
    @Value("${spring.task.execution.pool.keep-alive}")
    private int keepAliveSeconds;
    
    @Bean
    public Executor customExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        // 最大线程数
        executor.setMaxPoolSize(maxPoolSize);
        // 核心线程数
        executor.setCorePoolSize(corePoolSize);
        // 任务队列的大小
        executor.setQueueCapacity(queueCapacity);
        // 线程前缀名
        executor.setThreadNamePrefix(namePrefix);
        // 非核心线程存活时间
        executor.setKeepAliveSeconds(keepAliveSeconds);
        // 拒绝处理策略，交给调用方法线程执行
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        // 线程池初始化
        executor.initialize();
        return executor;
    }
}
```

```java
@Component
public class AsyncTask {
 
    // 传入自定义线程池的名字
    // 告诉 Spring 这里使用我们自定义的线程池而不是默认的线程池
    @Async("customExecutor")
    public void testAsyncTask() {
        try {
            Thread.sleep(6000);
            System.out.println("使用自定义的线程池完成业务");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```



### 2. 实现 AsyncConfigurer 接口

实现这个接口即可替换掉 Spring 默认的线程池，在使用 `@Async` 的时候也就不用再指定线程池的名字了。

这种方式替换了 Spring 默认的线程池，还可以定义异常的处理，较为优雅；但其实和第一种方式并不冲突，如果默认的线程池无法满足所有需求，那么定义其他线程池也是很合理的。

```java
/**
 * 原生(Spring)异步线程池装配类
 * 实现AsyncConfigurer接口，重写getAsyncExecutor和getAsyncUncaughtExceptionHandler方法，
 * 这样使用默认线程池时就会使用自己重写之后的线程池
 **/
@Slf4j
@EnableAsync
@Configuration
public class NativeAsyncTaskConfig implements AsyncConfigurer {

    // 方便演示就先使用@Value
    // 一般会使用@EnableConfigurationProperties修饰一个配置类，统一管理相关配置
    @Value("${spring.task.execution.pool.core-size}")
    private int corePoolSize;
    @Value("${spring.task.execution.pool.max-size}")
    private int maxPoolSize;
    @Value("${spring.task.execution.pool.queue-capacity}")
    private int queueCapacity;
    @Value("${spring.task.execution.thread-name-prefix}")
    private String namePrefix;
    @Value("${spring.task.execution.pool.keep-alive}")
    private int keepAliveSeconds;
    @Value("${spring.task.execution.pool.wait-for-tasks-to-complete-on-shutdown}")
    private boolean waitForTasksToCompleteOnShutdown;
    @Value("${spring.task.execution.pool.await-termination-seconds}")
    private boolean awaitTerminationSeconds;
    
	/**
     * 重写默认线程池
     */
    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        // 最大线程数
        executor.setMaxPoolSize(maxPoolSize);
        // 核心线程数
        executor.setCorePoolSize(corePoolSize);
        // 任务队列的大小
        executor.setQueueCapacity(queueCapacity);
        // 线程名前缀
        executor.setThreadNamePrefix(namePrefix);
        // 非核心线程存活时间
        executor.setKeepAliveSeconds(keepAliveSeconds);
        // 设置线程池关闭的时候等待所有任务都完成
        executor.setWaitForTasksToCompleteOnShutdown(true);
        // 设置线程池中任务的等待时间，如果超过这个时候还没有销毁就强制销毁，以确保应用最后能够被关闭，而不是阻塞住
        executor.setAwaitTerminationSeconds(awaitTerminationSeconds);
        // 拒绝处理策略，交给调用方法线程执行
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        // 线程池初始化
        executor.initialize();
        return executor;
    }

    /**
     * 异步任务重异常处理
     */
    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return (ex, method, params) -> {
            log.error(ex.getMessage(), ex);
            log.error("异步任务发生异常，方法名:{}，参数表:{}", method.getName(), params);
        };
    }
}
```

```java
@Component
public class AsyncTask {
 
    // 使用的是默认的线程池，而默认的线程池已被我们重写
    @Async
    public void testAsyncTask() {
        try {
            Thread.sleep(6000);
            System.out.println("使用自定义的线程池完成业务");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```



