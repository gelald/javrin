# Spring 定时任务

> 定时任务在日常开发中还是非常常见的，比方说定时发送消息、定时清除一些无效的数据等等，实现定时任务的方式很多样，本篇主要介绍一下各种实现方式及其优缺点

实现定时任务主要有四种方式

- 使用 JDK 中的 Timer 来实现定时任务
- 使用 JDK 中的 ScheduledExecutorService 来实现定时任务
- 使用 Spring 中的 SpringTask 来实现同步定时任务
- 使用 Spring 中的 SpringTask 来实现异步定时任务

其中最常用的方式显而易见的是 SpringTask，本篇还会介绍它结合线程池来实现异步定时任务来进一步提升效率



## Timer

使用 `java.util.Timer` 来调度 `java.util.TimeTask` 来实现一段逻辑按某一个时间间隔来定时执行

```java
// 延时时间
private static final long DELAY = 3000;

// 间隔时间
private static final long PERIOD = 5000;

public static void main(String[] args) {
    DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    System.out.println("main方法开始 --> " + dateTimeFormatter.format(LocalDateTime.now()));
    // 定义要执行的任务
    TimerTask task = new TimerTask() {
        @Override
        public void run() {
            System.out.println("定时任务执行 --> " + dateTimeFormatter.format(LocalDateTime.now()));
        }
    };
    Timer timer = new Timer();
    // 延迟3秒,间隔5秒地执行任务
    timer.schedule(task, DELAY, PERIOD);
}
```

```
main方法开始 --> 2022-04-01 16:04:13
定时任务执行 --> 2022-04-01 16:04:16
定时任务执行 --> 2022-04-01 16:04:21
定时任务执行 --> 2022-04-01 16:04:26
定时任务执行 --> 2022-04-01 16:04:31
定时任务执行 --> 2022-04-01 16:04:36
定时任务执行 --> 2022-04-01 16:04:41
定时任务执行 --> 2022-04-01 16:04:46
```

缺点

- 只能指定延迟、间隔时间，无法指定具体某一个时间执行
- 当Timer执行多个TimerTask时，只要其中一个任务有异常抛出，后续所有任务都会停止执行



## ScheduleExecutorService

> 基于Timer由于异常抛出而终止执行的缺点，阿里巴巴开发规范明确规定：希望开发者使用ScheduleExecutorSerivce代替Timer

```java
// 延时时间
private static final long DELAY = 3000;

// 间隔时间
private static final long PERIOD = 5000;

public static void main(String[] args) {
    DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    System.out.println("main方法开始 --> " + dateTimeFormatter.format(LocalDateTime.now()));
    // 定义要执行的任务
    Runnable task = () -> System.out.println("定时任务执行 --> " + dateTimeFormatter.format(LocalDateTime.now()));
    ScheduledExecutorService scheduledExecutorService = Executors.newSingleThreadScheduledExecutor();
    // 延迟3秒,间隔5秒地执行任务
    scheduledExecutorService.scheduleAtFixedRate(task, DELAY, PERIOD, TimeUnit.MILLISECONDS);
}
```

```
main方法开始 --> 2022-04-01 16:14:36
定时任务执行 --> 2022-04-01 16:14:39
定时任务执行 --> 2022-04-01 16:14:44
定时任务执行 --> 2022-04-01 16:14:49
定时任务执行 --> 2022-04-01 16:14:54
定时任务执行 --> 2022-04-01 16:14:59
```

解决了一个任务抛异常导致整个任务队列终止执行的问题，但是无法指定某一个时间执行的问题依旧存在



## SpringBoot 使用 Spring Task 实现同步定时任务

### 自动配置原理

Spring 为我们提供了执行任务调度的方式，提供TaskExecutor，TaskScheduler接口

SpringBoot 的自动配置类 `org.springframework.boot.autoconfigure.task.TaskSchedulingAutoConfiguration` 为我们默认注入了他们的实现：`ThreadPoolTaskScheduler`，本质上是 `ScheduledExecutorService`  的封装，增强在调度时间上的功能

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20220401163756.png)

```java
@ConditionalOnClass({ThreadPoolTaskScheduler.class})
@Configuration(proxyBeanMethods = false)
@EnableConfigurationProperties({TaskSchedulingProperties.class})
@AutoConfigureAfter({TaskExecutionAutoConfiguration.class})
public class TaskSchedulingAutoConfiguration {

    @Bean
    @ConditionalOnBean(name = {"org.springframework.context.annotation.internalScheduledAnnotationProcessor"})
    @ConditionalOnMissingBean({SchedulingConfigurer.class, TaskScheduler.class, ScheduledExecutorService.class})
    public ThreadPoolTaskScheduler taskScheduler(TaskSchedulerBuilder builder) {
        return builder.build();
    }

    @Bean
    @ConditionalOnMissingBean
    public TaskSchedulerBuilder taskSchedulerBuilder(TaskSchedulingProperties properties,
                                                     ObjectProvider<TaskSchedulerCustomizer> taskSchedulerCustomizers) {
        TaskSchedulerBuilder builder = new TaskSchedulerBuilder();
        builder = builder.poolSize(properties.getPool().getSize());
        Shutdown shutdown = properties.getShutdown();
        builder = builder.awaitTermination(shutdown.isAwaitTermination());
        builder = builder.awaitTerminationPeriod(shutdown.getAwaitTerminationPeriod());
        builder = builder.threadNamePrefix(properties.getThreadNamePrefix());
        builder = builder.customizers(taskSchedulerCustomizers);
        return builder;
    }
}
```



### 使用

```java
// 启用Spring的定时任务调度功能
@EnableScheduling
@SpringBootApplication
public class TimedTasksDemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(TimedTasksDemoApplication.class, args);

    }
}
```

```java
@Slf4j
@Component
public class TaskDemo {
    private final AtomicInteger counts = new AtomicInteger();

    @Scheduled(cron = "0/5 * * * * *")
    public void execute() {
        log.info("[定时任务第 {} 次执行]", counts.incrementAndGet());
    }
}
```

```
2022-04-01 17:14:51.021  INFO 7388 --- [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 895 ms
2022-04-01 17:14:51.358  INFO 7388 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
2022-04-01 17:14:51.369  INFO 7388 --- [           main] c.e.t.t.demo.TimedTasksDemoApplication   : Started TimedTasksDemoApplication in 1.62 seconds (JVM running for 2.291)
2022-04-01 17:14:55.001  INFO 7388 --- [   scheduling-1] c.e.timed.tasks.demo.task.TaskDemo       : [定时任务第 1 次执行]
2022-04-01 17:15:00.013  INFO 7388 --- [   scheduling-1] c.e.timed.tasks.demo.task.TaskDemo       : [定时任务第 2 次执行]
2022-04-01 17:15:05.006  INFO 7388 --- [   scheduling-1] c.e.timed.tasks.demo.task.TaskDemo       : [定时任务第 3 次执行]
2022-04-01 17:15:10.004  INFO 7388 --- [   scheduling-1] c.e.timed.tasks.demo.task.TaskDemo       : [定时任务第 4 次执行]
2022-04-01 17:15:15.005  INFO 7388 --- [   scheduling-1] c.e.timed.tasks.demo.task.TaskDemo       : [定时任务第 5 次执行]
2022-04-01 17:15:20.016  INFO 7388 --- [   scheduling-1] c.e.timed.tasks.demo.task.TaskDemo       : [定时任务第 6 次执行]
2022-04-01 17:15:25.009  INFO 7388 --- [   scheduling-1] c.e.timed.tasks.demo.task.TaskDemo       : [定时任务第 7 次执行]
```

其中比较重要的是 `@Scheduled` 注解，这个注解用于需要定时调度执行的方法

可以传入 `cron`、`fixedDelay`、`fixedRate`三个值之一

`cron` ：**传入 Spring cron 表达式，推荐使用**

`fixedDelay` ：以调用完成时刻开始计算间隔时间，单位是毫秒

`fixedRate` ：以调用开始时刻来计算间隔时间，单位是毫秒



## SpringBoot 使用 Spring Task 实现异步定时任务

### 自动配置原理

Spring Task 除了 `@Scheduled` 、`@EnableScheduling` 同步定时任务之外，还有 `@Async` 、`@EnableAsync` 开启异步的定时任务调度

SpringBoot 自动配置类对异步的支持：`org.springframework.boot.autoconfigure.task.TaskExecutionAutoConfiguration`

```java
@ConditionalOnClass({ThreadPoolTaskExecutor.class})
@Configuration(proxyBeanMethods = false)
@EnableConfigurationProperties({TaskExecutionProperties.class})
public class TaskExecutionAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public TaskExecutorBuilder taskExecutorBuilder(TaskExecutionProperties properties,
                                                   ObjectProvider<TaskExecutorCustomizer> taskExecutorCustomizers,
                                                   ObjectProvider<TaskDecorator> taskDecorator) {
        Pool pool = properties.getPool();
        TaskExecutorBuilder builder = new TaskExecutorBuilder();
        builder = builder.queueCapacity(pool.getQueueCapacity());
        builder = builder.corePoolSize(pool.getCoreSize());
        builder = builder.maxPoolSize(pool.getMaxSize());
        builder = builder.allowCoreThreadTimeOut(pool.isAllowCoreThreadTimeout());
        builder = builder.keepAlive(pool.getKeepAlive());
        Shutdown shutdown = properties.getShutdown();
        builder = builder.awaitTermination(shutdown.isAwaitTermination());
        builder = builder.awaitTerminationPeriod(shutdown.getAwaitTerminationPeriod());
        builder = builder.threadNamePrefix(properties.getThreadNamePrefix());
        Stream var10001 = taskExecutorCustomizers.orderedStream();
        var10001.getClass();
        builder = builder.customizers(var10001::iterator);
        builder = builder.taskDecorator((TaskDecorator)taskDecorator.getIfUnique());
        return builder;
    }

    @Lazy
    @Bean(name = {"applicationTaskExecutor", "taskExecutor"})
    @ConditionalOnMissingBean({Executor.class})
    public ThreadPoolTaskExecutor applicationTaskExecutor(TaskExecutorBuilder builder) {
        return builder.build();
    }
}
```

### 使用

启动类

```java
// 启动Spring的异步调度功能
@EnableAsync
// 启用Spring的定时任务调度功能
@EnableScheduling
@SpringBootApplication
public class TimedTasksDemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(TimedTasksDemoApplication.class, args);

    }
}
```

配置文件

```yaml
spring:
  task:
  	# Spring 定时任务配置
    scheduling:
      thread-name-prefix: summerday- # 线程池的线程名的前缀。默认为 scheduling- ，建议根据自己应用来设置
      pool:
        size: 10 # 线程池大小。默认为 1 ，根据自己应用来设置
      shutdown:
        await-termination: true # 应用关闭时，是否等待定时任务执行完成。默认为 false ，建议设置为 true
        
    # Spring 执行器配置，对应 TaskExecutionProperties 配置类。对于 Spring 异步任务，会使用该执行器。
    execution:
      thread-name-prefix: async- # 线程池的线程名的前缀。默认为 task- ，建议根据自己应用来设置
      pool: # 线程池相关
        core-size: 8 # 核心线程数，线程池创建时候初始化的线程数。默认为 8 。
        max-size: 20 # 最大线程数，线程池最大的线程数，只有在缓冲队列满了之后，才会申请超过核心线程数的线程。默认为 Integer.MAX_VALUE
        keep-alive: 60s # 允许线程的空闲时间，当超过了核心线程之外的线程，在空闲时间到达之后会被销毁。默认为 60 秒
        queue-capacity: 200 # 缓冲队列大小，用来缓冲执行任务的队列的大小。默认为 Integer.MAX_VALUE 。
        allow-core-thread-timeout: true # 是否允许核心线程超时，即开启线程池的动态增长和缩小。默认为 true 。
      shutdown:
        await-termination: true # 应用关闭时，是否等待定时任务执行完成。默认为 false ，建议设置为 true
        await-termination-period: 60 # 等待任务完成的最大时长，单位为秒。默认为 0 ，根据自己应用来设置
```

同步异步对比

```java
private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Scheduled(cron = "0/1 * * * * *")
    public void synTask() {
        sleep();
        System.out.println(Thread.currentThread().getName() + " syn-task 执行,当前时间: " + DATE_TIME_FORMATTER.format(LocalDateTime.now()));
    }

    @Async
    @Scheduled(cron = "0/1 * * * * *")
    public void asyncTask() {
        sleep();
        System.out.println(Thread.currentThread().getName() + " async-task 执行,当前时间: " + DATE_TIME_FORMATTER.format(LocalDateTime.now()));
    }

    private void sleep() {
        try {
            Thread.sleep(10 * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
```

```
async-1 async-task 执行,当前时间: 2022-04-01 17:31:03
summerday-1 syn-task 执行,当前时间: 2022-04-01 17:31:03
async-2 async-task 执行,当前时间: 2022-04-01 17:31:04
async-3 async-task 执行,当前时间: 2022-04-01 17:31:05
async-4 async-task 执行,当前时间: 2022-04-01 17:31:06
async-5 async-task 执行,当前时间: 2022-04-01 17:31:07
async-6 async-task 执行,当前时间: 2022-04-01 17:31:08
async-7 async-task 执行,当前时间: 2022-04-01 17:31:09
async-8 async-task 执行,当前时间: 2022-04-01 17:31:10
async-1 async-task 执行,当前时间: 2022-04-01 17:31:13
summerday-1 syn-task 执行,当前时间: 2022-04-01 17:31:14
async-2 async-task 执行,当前时间: 2022-04-01 17:31:14
async-3 async-task 执行,当前时间: 2022-04-01 17:31:15
async-4 async-task 执行,当前时间: 2022-04-01 17:31:16
async-5 async-task 执行,当前时间: 2022-04-01 17:31:17
async-6 async-task 执行,当前时间: 2022-04-01 17:31:18
```

假设任务本身耗时较长，且间隔较短：间隔1s，执行10s，同步与异步执行的差异就此体现。同步任务需要等任务执行完成后再开启下一个任务，异步任务则不阻塞