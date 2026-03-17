---

title: 垃圾回收问题追踪

icon: article

category: JVM

---

# 垃圾回收问题追踪

## GC 日志文件

### 开启 GC 日志


**JDK8 GC 日志开启**

```
-verbose:gc -Xloggc:./gc.log -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=50M

# 开启 GC 日志输出
# 日志文件保存到当前目录下的 gc.log 文件中
# GC 日志内容包含时间戳和详细的内存变化数据
# 开启日志文件轮转，当单文件超过 50M，文件会以这样的形式存储 gc.log.0, gc.log.1, gc.log.2 ...
# 允许最多存在 5 个文件，当第 6 个文件创建时，删除最旧的那一份
```


**JDK17 GC 日志开启**

```
-Xlog:gc*:file=./gc.log:time,uptime,level,tags,filecount=5,filesize=50M

# 参数作用和 JDK8 基本一致
```


### 分析 GC 日志


**JDK8 GC 日志分析**

```plaintext
# Minor GC
2024-01-15T10:30:00.123+0800: [GC (Allocation Failure) 
# 时间戳              触发原因

[PSYoungGen: 262144K->32768K(306176K)] 
# 新生代：GC 前->GC 后 (总大小)

688128K->458752K(1008128K)], 0.0456789 secs]
# 整个堆：GC 前->GC 后 (总大小), 耗时

=================================================================

# Full GC
2024-01-15T10:35:00.456+0800: [Full GC (Ergonomics) 
# GC 类型      触发原因

[PSYoungGen: 32768K->0K(306176K)] 
# 新生代：GC 前->GC 后 (总大小)

[ParOldGen: 425984K->393216K(702464K)]
# 老年代：GC 前->GC 后 (总大小)

458752K->393216K(1008640K)]
# 整个堆内存：GC 前->GC 后 (总大小)

[Metaspace: 51234K->51234K(1099776K)], 0.2345678 secs]
# 元空间信息, GC 耗时
```


**JDK17 GC 日志分析**

```
[2024-01-15T10:30:00.123+0800] info: GC (G1 Evacuation Pause) 
# 时间戳              级别  GC 类型

safepoint.total_time=2.345ms
young=12.456ms old=0.000ms humongous=0.123ms
roots.scan_time=1.234ms
# 各项耗时详情

Heap after GC:
 region 0 Eden    used 32M
 region 1 Survivor used 8M
 region 2-10 Old  used 500M
# 各个区域使用的空间
```



## 堆转储文件 (heapdump)

当程序发生 OutOfMemoryError 问题时，堆转储文件 (heapdump) 往往能帮助我们追踪定位原因

### 导出

导出 heap dump 文件有几个方式

1. 发生 OOM 时自动导出，需要增加以下 JVM 参数
   ```
   java -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=./dump_demo.hprof JavaApplication
   ```
2. 程序运行时，使用 JDK 工具导出
   - 执行 `jps` 查看进程 ID
   - 执行 `jmap -dump:format=b,file=jmap_dump.hprof <进程ID>`
3. 程序运行时，使用 Arthas 工具导出
   - 执行 `java -jar ./arthas-boot.jar` 运行 Arthas
   - 选择需要导出堆转储文件的进程，进入 Arthas 控制台
   - 执行 `heapdump arthas_dump.hprof`

### 分析 heapdump 文件

#### 常用分析工具

- Eclipse MAT
- [阿里云 ATP 平台](https://atp.console.aliyun.com/overview)
- VisualVM


#### 常用功能

虽然功能名称不同工具可能命名上略有差异，但是总体上差异不大

| 功能 | 用途 | 适用场景 |
| --- | --- | --- |
| **Dominator Tree** | 查看占用最大的对象 | 快速定位大对象 |
| **Histogram** | 统计对象数量和大小 | 找到异常数量的对象 |
| **Leak Suspects** | 自动分析泄漏嫌疑 | 快速诊断 |
| **OQL** | 使用类似 SQL 的语法查询对象 | 精确查找特定对象 |


#### 内存泄漏定位步骤


**Step 1: 打开 Heap Dump，查看 Dominator Tree**

```
Dominator Tree 显示对象及其保留堆大小：
┌────────────────────────────────────────────┐
│ Class Name              │ Retained Heap   │
├─────────────────────────┼─────────────────┤
│ OrderCache              │ 2,147,483,648 B │ ← 占用最大
│ ExcelExportTask         │ 3,221,225,472 B │ ← 异常
│ Thread-123              │ 536,870,912 B   │
└────────────────────────────────────────────┘
```



![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/oom-heapdump-1.png)


- **Shallow Heap size**：每一个对象自己占用的空间大小
- **Retained Heap size**：如果 A 对象保持着对 B 对象和 C 对象的引用，那么回收 A 对象意味着 B、C 对象都可以被回收，所以指的是这个对象及其引用对象的空间大小；也可以理解为：**如果回收了它，可以释放多大的空间出来**



**Step 2: 查看引用链**

```
右键对象 → Path to GC Roots → exclude weak/soft references

结果示例：
Thread-123 (main)
  └─ ExcelExportTask
       └─ XSSFWorkbook
            └─ ArrayList
                 └─ 50,000 个 Row 对象  ← 问题所在
```


**Step 3: 定位代码**

```
找到持有引用的类和方法：
- ExcelExportTask.export()
- XSSFWorkbook 未关闭
- 代码位置：com.example.service.ExcelService:45
```



### 常见内存泄漏场景

#### 场景 1: 静态集合存储大量对象未清理

```java
// 错误示例：静态 Map 无限增长
public class CacheManager {
    private static Map<String, Object> cache = new HashMap<>();
    
    public void put(String key, Object value) {
        cache.put(key, value);  // 只增不减，最终导致内存泄漏
    }
}

// 正确做法：使用 Caffeine 或设置容量限制
private static Cache<String, Object> cache = Caffeine.newBuilder()
    .maximumSize(10000)
    .build();
```


#### 场景 2: 资源未关闭

```java
// 错误示例：IO 流未关闭
public void export() {
    Workbook workbook = new XSSFWorkbook();
    // 业务逻辑...
    // 忘记 workbook.close() -> 内存泄漏
    // 或者未在 final 块中执行 close() 并发生了异常  -> 内存泄漏
}

// 正确做法：try-with-resources
public void export() {
    try (Workbook workbook = new XSSFWorkbook()) {
        // 业务逻辑...
    }  // 自动关闭
}
```



#### 场景 3: ThreadLocal 使用完未清理

```java
// 错误示例：ThreadLocal 未 remove
public class RequestContext {
    private static ThreadLocal<User> userHolder = new ThreadLocal<>();
    
    public void setUser(User user) {
        userHolder.set(user);
    }
    // 没有 remove() → 线程池复用时内存泄漏
}

// 正确做法：使用后清理
public void clear() {
    userHolder.remove();
}
```


## 线上 GC 问题排查记录

### GC 频繁导致 CPU 飙高

#### 背景

- **系统**：订单服务，JDK8
- **配置**：4 核 8G，堆内存 4GB
- **现象**：接口响应从 50ms 增长到 500ms，CPU 持续 90%+

#### 优化目标

- 接口响应时间回到 50ms 到 100ms 的区间
- CPU 使用率下降到 50% 左右

#### 排查过程

**Step 1：确认 GC 情况**

```bash
# 查看 GC 统计
jstat -gcutil <pid> 1000

# 输出（每秒刷新）
 S0     S1     E      O      M     CCS    YGC     YGCT    FGC    FGCT
 0.00   0.00  95.31  82.45  98.12  97.56  1250    45.67   25     12.34

# 分析：
# - Eden 区 95% 使用率，频繁 Minor GC
# - 老年代 82%，接近 CMS 触发阈值
# - FGC 25 次，过于频繁
```


**Step 2：分析 GC 日志**

```
# 日志片段
2024-01-15T10:30:00.123+0800: [GC (Allocation Failure) ...], 0.089s
2024-01-15T10:30:01.234+0800: [GC (Allocation Failure) ...], 0.095s
2024-01-15T10:30:02.345+0800: [GC (Allocation Failure) ...], 0.092s
# 1 秒 1 次 Minor GC，异常频繁！

2024-01-15T10:35:00.456+0800: [Full GC (Ergonomics) ...], 1.234s
# Full GC 耗时 1.2 秒，导致接口超时
```

**Step 3：导出堆快照**

```bash
# 导出堆转储
jmap -dump:format=b,file=heap.hprof <pid>

# 使用 MAT 分析
# 发现：OrderCache 缓存占用 2GB，未设置过期策略
```

#### 解决方案

**代码层面**：

```java
// 修复前：无限增长
Map<String, Order> cache = new HashMap<>();

// 修复后：使用 Caffeine，设置过期策略
Cache<String, Order> cache = Caffeine.newBuilder()
    .maximumSize(10000)
    .expireAfterWrite(1, TimeUnit.HOURS)
    .build();
```

**参数调整**：

```bash
# 调整前
-Xms4g -Xmx4g

# 调整后
-Xms6g -Xmx6g                    # 增加堆内存
-XX:NewRatio=1                   # 新生代比例调整为 1:1
-XX:CMSInitiatingOccupancyFraction=75  # 提高 CMS 触发阈值
```

#### 效果验证

```
修复后：
- Minor GC 频率：1 次/秒 → 10 次/分钟
- Full GC 频率：25 次/小时 → 0 次/小时
- CPU 使用率：90% → 40%
- 接口响应：500ms → 50ms
```

---

### 内存泄漏导致老年代持续增长

#### 背景

- 系统：报表服务，JDK8
- 配置：8 核 16G，堆内存 8G
- 业务：每天定时导出 Excel 报表
- 现象：老年代使用率每天增长 5%，从 60% 增长到 95%，每周必定触发一次 Full GC

#### 优化目标

- 老年代在每次 Full GC 后，使用率应该下降而不是持续增长

#### 排查过程

**Step 1: 每天使用 Arthas 工具查看老年代使用率**

```bash
# 每天记录老年代使用率
jstat -gcutil <pid>

# 发现趋势
Day 1:  O = 60%
Day 3:  O = 72%
Day 5:  O = 85%
Day 7:  O = 95%  → Full GC

# 确认是内存泄漏
# 老年代持续增长，Minor GC 后不降反升
# Full GC 后老年代只降到 70%，无法回到最初的 60%
```

**Step 2: 导出 heapdump 文件分析**

```bash
jmap -dump:live,format=b,file=heap.hprof <pid>
```

**Step 3: 使用 MAT 工具分析**

```
Dominator Tree 显示：
┌─────────────────────────────────────────────┐
│ Class Name              │ Retained Heap    │
├─────────────────────────┼──────────────────┤
│ XSSFWorkbook            │ 3,221,225,472 B  │ ← 占用 3GB
│ OrderCache              │ 536,870,912 B    │
└─────────────────────────────────────────────┘

Path to GC Roots:
Thread-15 (Excel-Export-Worker)
  └─ ThreadLocal$ThreadLocalMap
       └─ Entry(key=ThreadLocal, value=XSSFWorkbook)
            └─ XSSFSheet
                 └─ 50,000 行数据
```

**Step 4: 定位代码**

```java
// 问题代码：ExcelExportService.java
public class ExcelExportService {
    // ThreadLocal 存储 Workbook，方便多方法共享
    private static ThreadLocal<Workbook> workbookHolder = new ThreadLocal<>();
    
    public void exportDailyReport() {
        Workbook workbook = new XSSFWorkbook();
        workbookHolder.set(workbook);  // 存入 ThreadLocal
        
        try {
            // 生成报表...
            fillData(workbook);
            writeToFile(workbook);
        } catch (Exception e) {
            log.error("导出失败", e);
        }
        // 问题：没有 workbookHolder.remove()
        // workbook 残留在 ThreadLocal 中，线程池复用时不释放
    }
}
```


#### 解决方案

**代码修复:**

```java
public void exportDailyReport() {
    Workbook workbook = new XSSFWorkbook();
    workbookHolder.set(workbook);
    
    try {
        fillData(workbook);
        writeToFile(workbook);
    } catch (Exception e) {
        log.error("导出失败", e);
    } finally {
        // 1. 使用完成后清理 ThreadLocal
        workbookHolder.remove();
        // 2. 关闭 Workbook (如果没有使用 ThreadLocal 可以使用 try-with-resource 来关闭)
        try {
            workbook.close();
        } catch (IOException e) {
            log.warn("关闭 Workbook 失败", e);
        }
    }
}
```


#### 效果验证

```
修复后监控：
Day 1:  O = 45%
Day 3:  O = 48%
Day 7:  O = 46%  → 稳定在 45-50%
Full GC：从每周 1 次 → 0 次
```