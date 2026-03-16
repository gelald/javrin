---

title: 垃圾回收问题追踪

icon: article

category: JVM

---

# 垃圾回收问题追踪

## GC 日志文件

### 开启 GC 日志

- JDK8: 在启动命令中加入这些 JVM 参数

```bash
-verbose:gc -Xloggc:./gc.log -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=50M

# 开启 GC 日志输出
# 日志文件保存到当前目录下的 gc.log 文件中
# GC 日志内容包含时间戳和详细的内存变化数据
# 开启日志文件轮转，当单文件超过 50M，文件会以这样的形式存储 gc.log.0, gc.log.1, gc.log.2 ...
# 允许最多存在 5 个文件，当第 6 个文件创建时，删除最旧的那一份
```

- JDK17: 在启动命令中加入这些 JVM 参数

```bash
-Xlog:gc*:file=./gc.log:time,uptime,level,tags,filecount=5,filesize=50M

# 参数作用和 JDK8 基本一致
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

### 分析

常用分析工具：

- Eclipse MAT
- [阿里云 ATP 平台](https://atp.console.aliyun.com/overview)
- VisualVM

常见内存溢出原因：容器占据大量对象，容器一直被强引用无法释放，导致这些对象都无法被释放，最终导致内存溢出


查看分析时，打开支配树 (Dominator Tree) 视图


![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/oom-heapdump-2.png)



![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/oom-heapdump-1.png)


- **Shallow Heap size**：每一个对象自己占用的空间大小
- **Retained Heap size**：如果 A 对象保持着对 B 对象和 C 对象的引用，那么回收 A 对象意味着 B、C 对象都可以被回收，所以指的是这个对象及其引用对象的空间大小；也可以理解为：**如果回收了它，可以释放多大的空间出来**