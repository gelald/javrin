---
title: 基于 Nacos 实现 SpringBoot 动态定时任务调度
icon: note-sticky
category:

- 框架
- coding

tag:

- Spring/SpringBoot

---

# 基于 Nacos 实现 SpringBoot 动态定时任务调度

## 背景

最近在项目开发上，有一个定时核对并清理的需求，定时规则较为简单，每15分钟运行一次，并且项目中暂未接入分布式定时任务调度框架；鉴于以上两个原因，我决定直接用 Spring scheduling 开干。

回顾一下 SpringBoot 项目中定义定时任务，其实就几个步骤：

- 在启动类上，或者任意一个配置类上添加 `@EnableScheduling` 注解
- 在需要运行定时任务的方法上，添加 `@Scheduled` 注解, 可以传入 `cron`、`fixedDelay`、`fixedRate`三个值之一
  - `cron`: 传入 Spring cron 表达式，推荐使用
  - `fixedDelay`: 以调用完成时刻开始计算间隔时间，单位是毫秒
  - `fixedRate`: 以调用开始时刻来计算间隔时间，单位是毫秒
- 在这个方法内调用定时任务实际的执行逻辑

我用的cron表达式很快就把这个需求实现了；但这时变数出现了，要求cron表达式支持 Nacos 动态配置，并且「动态配置后，不需要重启服务也能生效」

让我一时间犯了难，后面查询相关资料后，也实现了这个新需求，接下来我分享一下解题过程

## 实现动态变更定时机制

### 配置化 cron 表达式

我们知道，如果一个 Java Bean 使用 `@ConfigurationProperties` 修饰后，当它的配置值通过 Nacos 修改后，Nacos client 会收到变更事件，从而刷新对应的属性值，所以我们考虑把 cron 表达式放入一个 properties 类管理，并使用 `@ConfigurationProperties` 修饰

```java
@Data
@Component
@ConfigurationProperties(prefix = "task-schedule")
public class TaskProperties {
    private String cronExpression = "*/5 * * * * ?";
}
```

然后我们可以把这个 cron 表达式通过 placeholder 绑定到 `@Schedule` 的 cron 中

```java
@Slf4j
@Component
public class SimpleTask {
    @Scheduled(cron = "#{@taskProperties.cronExpression}")
    public void simpleTask2() {
        log.info("SimpleTask2 scheduled");
    }
}
```

### Spring schedule 调度规则

但是启动项目之后发现，无论怎么修改 Nacos 上的配置值，这个定时任务的执行间隔都不会随配置值更新，只会按照首次启动时的 cron 表达式来进行

翻看源码 `ScheduledAnnotationBeanPostProcessor` 这个类的 `postProcessAfterInitialization` 方法

```java
@Override
public Object postProcessAfterInitialization(Object bean, String beanName) {
    ...
    Class<?> targetClass = AopProxyUtils.ultimateTargetClass(bean);
    if (!this.nonAnnotatedClasses.contains(targetClass) &&
            AnnotationUtils.isCandidateClass(targetClass, List.of(Scheduled.class, Schedules.class))) {
        Map<Method, Set<Scheduled>> annotatedMethods = MethodIntrospector.selectMethods(targetClass,
                (MethodIntrospector.MetadataLookup<Set<Scheduled>>) method -> {
                    Set<Scheduled> scheduledAnnotations = AnnotatedElementUtils.getMergedRepeatableAnnotations(
                            method, Scheduled.class, Schedules.class);
                    return (!scheduledAnnotations.isEmpty() ? scheduledAnnotations : null);
                });

            // Non-empty set of methods
            annotatedMethods.forEach((method, scheduledAnnotations) ->
                    scheduledAnnotations.forEach(scheduled -> processScheduled(scheduled, method, bean)));
    ...
    }
    return bean;
}
```

我们知道 `BeanPostProcessor` 中的 `postProcessAfterInitialization` 方法，在 Bean 初始化后执行，看到它在逐一地调度这些定时任务

所以我们可以推断，这些定时任务只会在项目启动之后统一的调度，并不会在运行期间自动更新调度规则

### 追踪定时任务调度

既然我们查看源码后发现 SpringBoot 帮我们调度只发生在项目启动之后，那么如果我们希望响应 Nacos 变更而改变调度规则，我们需要把调度的主动权把握在手

我们继续追踪源码，`ScheduledAnnotationBeanPostProcessor` 的 `processScheduled` 方法，调用 `processScheduledSync`

```java
protected void processScheduled(Scheduled scheduled, Method method, Object bean) {
    ...
    processScheduledSync(scheduled, method, bean);
}

private void processScheduledSync(Scheduled scheduled, Method method, Object bean) {
    Runnable task;
    try {
        task = createRunnable(bean, method, scheduled.scheduler());
    }
    catch (IllegalArgumentException ex) {
        ...
    }
    processScheduledTask(scheduled, task, method, bean);
}
```

我们目前先看同步调用的情况，可以看到 `processScheduledSync` 方法中，做了两件事：
- 创建一个 `Runnable` 对象
- 调度这个 `Runnable` 对象

可以得到一点启发：定时任务相当于创建一个任务，然后使用调度器按规则不停地调用，这里的调度器我们可以简单理解为 Scheduled 线程池

如果我们可以拿到这个定时任务执行的调度器，缓存起来，这样调度的时机、调度的规则都可以由我们自己控制了；而创建一个 `Runnable` 对象其实也不难，可以简单创建后直接把定时任务包装起来

查看 `processScheduledTask` 方法，它确实是这么做的

```java
private void processScheduledTask(Scheduled scheduled, Runnable runnable, Method method, Object bean) {
    try {
        ...
        // Determine initial delay
        ...

        // Check cron expression
        String cron = scheduled.cron();
        if (StringUtils.hasText(cron)) {
            String zone = scheduled.zone();
            if (this.embeddedValueResolver != null) {
                cron = this.embeddedValueResolver.resolveStringValue(cron);
                zone = this.embeddedValueResolver.resolveStringValue(zone);
            }
            if (StringUtils.hasLength(cron)) {
                Assert.isTrue(initialDelay.isNegative(), "'initialDelay' not supported for cron triggers");
                processedSchedule = true;
                if (!Scheduled.CRON_DISABLED.equals(cron)) {
                    CronTrigger trigger;
                    if (StringUtils.hasText(zone)) {
                        trigger = new CronTrigger(cron, StringUtils.parseTimeZoneString(zone));
                    }
                    else {
                        trigger = new CronTrigger(cron);
                    }
                    tasks.add(this.registrar.scheduleCronTask(new CronTask(runnable, trigger)));
                }
            }
        }

        // Check fixed delay
        ...

        // Check fixed rate
        ...

        // Finally register the scheduled tasks
        synchronized (this.scheduledTasks) {
            Set<ScheduledTask> regTasks = this.scheduledTasks.computeIfAbsent(bean, key -> new LinkedHashSet<>(4));
            regTasks.addAll(tasks);
        }
    }
    ...
}
```

`this.registrar.scheduleCronTask(new CronTask(runnable, trigger))`，这个 `this.registrar` 的类型是 `ScheduledTaskRegistrar`，这一句我们可以知道 `ScheduledTaskRegistrar` 就是核心的调度器，负责调度各种定时任务，比如：Cron、FixDelay 等等

它依靠它里面的 `TaskScheduler` 来负责执行最终的任务调度，默认的实现类是 `ThreadPoolTaskScheduler`，它依靠 `ScheduledExecutorService` 来最终实现定时任务的调度

### 掌握调度主动权

继续翻阅源码，我们发现 `SchedulingConfigurer` 接口，它允许我们使用 `ScheduledTaskRegistrar` 来定制化定时任务的执行，有了上面的一点铺垫后，这个接口就很好理解了

```java
@FunctionalInterface
public interface SchedulingConfigurer {

	/**
	 * Callback allowing a {@link org.springframework.scheduling.TaskScheduler}
	 * and specific {@link org.springframework.scheduling.config.Task} instances
	 * to be registered against the given the {@link ScheduledTaskRegistrar}.
	 * @param taskRegistrar the registrar to be configured
	 */
	void configureTasks(ScheduledTaskRegistrar taskRegistrar);
}
```

我们可以拿到方法参数的 `taskRegistrar`，像源码一样 `scheduleCronTask`

这种方式和使用 `@schedule` 相比，更灵活，但是代码也会更为复杂一点，属于编程式调度

并且还可以使用一个成员属性来接收这个 `ScheduledTaskRegistrar`，这样可以随时使用

```java
protected ScheduledTaskRegistrar taskRegistrarHolder;

@Override
public void configureTasks(@Nonnull ScheduledTaskRegistrar taskRegistrar) {
    // set ScheduledTaskRegistrar so that we can use it to schedule the timer task
    taskRegistrarHolder = taskRegistrar;
}

```

### 订阅 Nacos 配置更新事件

对于刚才定义的 `Properties` 类，即使 Nacos 可以帮我们刷新配置，但是不做任何的自定义的话，只是单纯刷新对象属性值也起不到动态的目的，所以我们需要订阅并做出自定义的响应逻辑

通过查阅资料找到了关键组件 `NacosConfigManager`，可以通过这样的方式来订阅配置变更，并且方法上还需要订阅 `ApplicationReadyEvent`

```java
@EventListener(ApplicationReadyEvent.class)
public void refreshConfig() throws Exception {
    // add nacos config listener
    nacosConfigManager.getConfigService().addListener("dynamic-schedule.yml", "DEFAULT_GROUP", new AbstractConfigChangeListener() {
        @Override
        public void receiveConfigChange(ConfigChangeEvent event) {
            // receive config change event
            ...
        }
    });
    log.info("added nacos config listener successfully, especially for cron-expression");
}
```
由于这种方式是订阅整个配置文件的配置变更，每一个配置被更新都会执行这个 `refreshConfig` 方法，所以在里面需要根据具体的配置项来监听

```java
Collection<ConfigChangeItem> changeItems = event.getChangeItems();
for (ConfigChangeItem changeItem : changeItems) {
    log.info("config changed item: {}", changeItem.getKey());
    String key = changeItem.getKey();
    if (!("task-schedule.cron-expression".equals(key) || "task-schedule.cronExpression".equals(key))) {
        log.info("cron-expression has not been changed, doesn't response it");
        return false;
    }
    log.info("schedule config changed, new cron-expression: {}, now refresh the timer task", changeItem.getNewValue());
    return true;
}
```

至此，我们就实现了配置自定义监听，并且监听后我们还能做出其他后续的响应逻辑

### 最终效果

有了上面自定义调度和自定义订阅之后，我们只需要把他们整合一下，就能实现

另外针对任务暂停，这里也做简单的演示

- 初始的 cron 表达式是 `*/5 * * * * ?`，项目启动：

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20250514201050504.png)

- 修改 Nacos 配置，改成 `*/8 * * * * ?`，**并且不重启服务**：

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20250514201324028.png)

- 修改 Nacos 配置，改成 `-`，让任务停止，**并且不重启服务**：

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20250514201449205.png)
  > 在 Spring schedule 中，如果 cron 表达式是一个 `-` 也是表示停止
    
    ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20250514201613743.png)

## 项目地址

我的项目地址加入了常用的 FixedDelayTask 并抽取了核心部分作为抽象公共类，不同类型的任务只需要关注自己的执行逻辑和配置项判断逻辑

我的项目地址：[schedule-learning](https://github.com/gelald/schedule-learning) 欢迎大家学习使用，求求点一个免费的 star 谢谢！

## 感想

从质疑需求，到理解需求，最后实现需求，是一个成长的过程。平时使用 Spring schedule 时，都只是关心如何使用，攻克这个问题的过程，让我重新梳理了一下关键源码，小有收获，分享给大家。