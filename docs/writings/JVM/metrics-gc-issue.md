---
title: Metrics NaN 问题追踪
icon: note-sticky
category:

- JVM

tag:

- 监控
- 调优

---

# Metrics NaN 问题追踪

> 以下使用的代码都是经过脱敏的示例代码
>

## 问题引入

我在我们项目中负责了一个 metrics 的收集与展示，本来是一个比较简单的一个需求，每 30 秒定时更新到 metrics 中，很快就写完、测试通过并上线了。

metrics 数据大概是这样：

`app_version_metrics {Code=”0”, Version=”1.0.1”,} 55`

`app_version_metrics {Code=”0”, Version=”1.0.2”,} 20`

Grafana 根据这个数据的格式展示在 dashboard 上。直到后面有一天这个应用发生了 OOM，在排查的同时，发现这个 metrics 有时候会出现这种情况：

`app_version_metrics {Code=”0”, Version=”1.0.1”,} NaN`

count 居然显示的是 “NaN” (Not a number) 而不是一个正常的数字

示例代码：

```java
public void putMetrics(List<MetricsVersionDTO> metricsVersionDTOList) {
    for (MetricsVersionDTO metricsVersionDTO : metricsVersionDTOList) {
        String version = metricsVersionDTO.version();
        Long count = metricsVersionDTO.count();
        log.info("[refreshVersionForMetrics] version: {}, count: {}", version, count);
        meterRegistry.gauge("app_version_metrics", Tags.of("Code", "0", "Version", version), count);
    }
}
```

同时看到日志中每次都能正常显示：

```
[refreshVersionForMetrics] version: 1.0.1, count: 55
[refreshVersionForMetrics] version: 1.0.2, count: 20
```

看日志发现这个 count 每次都能设置到一个正常的数值，实在百思不得其解。

## 追踪问题

由于这个应用不是一个核心应用，偏数据收集展示的应用，所以 OOM 问题没有很重视，先多分配了 100 M 内存就没有继续看了。

后续盯着看了许久，没有出现 NaN 问题了。

直到一星期后，OOM 问题再度出现，并且 NaN 的问题同步出现。OOM 的问题其他同事在根据，但是 NaN 的问题让我不由想到与 OOM 有关联。

这个 count 大概率是被 GC 了才会变成 NaN 的，否则他应该是一个常驻内存的对象。

回看一开始的代码，能看到这个 count 的来源是局部变量：metricsVersionDTO

```java
meterRegistry.gauge("app_version_metrics", Tags.of("Code", "0", "Version", version), count);
```

排查到这里有了大概的想法，应该是内存不足被 GC 了，于是在网上再搜集了一些资料。

### ⚠️ 主要原因分析

metrics 中 `count`值在 Prometheus 中偶尔显示为 `NaN`，通常与 Micrometer 中 Gauge 的工作机制有关。**Gauge 需要对一个持续存在的状态对象保持强引用**，否则当该对象被垃圾回收（Garbage Collection）后，Gauge 就无法获取其值，从而返回 `NaN`。

核心原因在于代码中的 `count`是一个局部变量（`Long`类型），每次循环都会创建一个新的对象。`meterRegistry.gauge`方法注册的 Gauge 默认**不持有**提供的这个 `count`对象的强引用。当垃圾回收器回收掉这个 `count`对象后，下次 Prometheus 抓取时，Gauge 尝试获取值就会失败，从而返回 `NaN`。

### 🛠️ 推荐的解决方案

修改代码，确保为每个唯一的标签组合（即每个不同的 `version`）都对应一个被**强引用**的状态对象（例如 `AtomicLong`）。并且通常的做法会使用一个 `Map`来管理这些对象。

### 💡 其他注意事项

**初始值**：可以在创建 `AtomicLong`时赋予初始值 `0`，这可以避免在第一次设置具体数值之前 Prometheus 抓取到 `NaN`。

修改后代码：

```java
public class MetricsComponent {

    private final MeterRegistry meterRegistry;
    
    // 使用ConcurrentHashMap来维护对AtomicLong的强引用，Key为标签组合的字符串形式
    private final ConcurrentHashMap<String, AtomicLong> gaugeMap = new ConcurrentHashMap<>();

    @Autowired
    public MetricsComponent(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
    }

    public void putMetrics(List<MetricsVersionDTO> metricsVersionDTOList) {
        for (MetricsVersionDTO metricsVersionDTO : metricsVersionDTOList) {
            String version = metricsVersionDTO.version();
            Long count = metricsVersionDTO.count();
		        log.info("[refreshVersionForMetrics] version: {}, count: {}", version, count);

            // 根据标签组合生成一个唯一的Key
            String gaugeKey = String.format("%s-%s", "0", version);
            
            // 获取或创建对应的AtomicLong
            AtomicLong gaugeCount = gaugeMap.computeIfAbsent(gaugeKey, k -> {
                AtomicLong newLong = new AtomicLong(0);
                // 注册Gauge，并始终引用这个newLong
                Gauge.builder("app_version_metrics", newLong, AtomicLong::get)
                      .tags(Tags.of("Code", "0", "Version", version))
                      .register(meterRegistry);
                return newLong;
            });
            
            // 更新AtomicLong的值
            gaugeCount.set(count);
            log.info("Updated app_version_metrics: {}, value: {}", gaugeKey, count);
        }
    }
}
```

# 总结

看似简单的“统计上报”逻辑，实则隐含对**对象生命周期**的强依赖。如果对 Micrometer 的工作机制理解不深，极易因“局部变量默认释放”的惯性思维，触发 GC 导致的指标失效

内存管理的蝴蝶效应，OOM 与 metrics 异常绝非孤立事件。内存压力下 GC 的“不可控回收”，会通过“对象销毁→状态丢失→指标异常”的链条，将资源问题传导至监控体系。这印证了一个关键认知：**任何长期运行的服务，“内存与资源管理”都需前置考量**，不能因功能“非核心”而放松稳定性要求。