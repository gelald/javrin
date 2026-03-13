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

- [阿里云 ATP 平台](https://atp.console.aliyun.com/overview)

主要查看哪些对象占据着大量的空间