---
title: JVM 远程监控
icon: article
category:

- JVM

tag:

- 监控
- 调优

---

# JVM 远程监控

## JVM 可视化监控工具

JDK 中提供了两款可视化监控工具：

- jconsole，可以查看当前 cpu、内存、类、线程的使用情况。
- jvisualvm，与 jconsole 的功能差别不大，但是 jvisualvm 可以安装 Visual GC 插件，Visual GC 是常常使用的一个功能，可以明显的看到年轻代、老年代的内存变化，以及 gc 频率、gc 的时间等。关于 jvisualvm 的使用这一篇文章有简单介绍：[这款 Java 性能调优的可视化工具，你真的会用吗](https://mp.weixin.qq.com/s/tR6MzCg8lCC0vD6UtFu8LQ)

## 远程监控方式

- jmx
- jstatd

## jmx

如果需要使用 jmx 的远程监控的功能，那在程序启动的时候就需要加入必要的 vm 参数：

```
# 开启 jmx 远程监控功能
-Dcom.sun.management.jmxremote
# 配置提供远程服务的端口
-Dcom.sun.management.jmxremote.port=8777
# 本地 jmx client 提供服务的端口
-Dcom.sun.management.jmxremote.rmi.port=8777
# 关闭 jmx 远程服务 ssl 和认证功能
-Dcom.sun.management.jmxremote.authenticate=false
-Dcom.sun.management.jmxremote.ssl=false
# jmx 默认是通过 localhost 的 ip 地址提供 RMI 服务的，需要明确指定 RMI 服务的地址
-Djava.rmi.server.hostname=192.168.1.90
```

在 java 程序启动命令中加入以上 vm 参数后，远程监控工具就可以通过 `<远程主机名或 IP 地址>:8777`+用户名密码或者`service:jmx:rmi:///jndi/rmi://<远程主机名或 ip 地址>:8777/jmxrmi` 远程连接 Java 应用进行监控了

## jstatd

jstatd 是 jdk 中一个独立的工具，jvisualvm 只有使用 jstatd 连接才能使用 Visual GC 功能

使用 jstatd 连接需要指定一个策略文件`.policy`

`vi allpermission.policy`

```bash
grant  codebase "file:${java.home}/lib/tools.jar" {
	# 表示开放所有权限
	permission java.security.AllPermission;
};
```

然后使用这个策略文件来启动 jstatd

`jstatd -J-Djava.security.policy=allpermission.policy -J-Djava.rmi.server.hostname=192.168.1.90`

jstatd 默认用一个 1099 端口，可以使用 `-nr -p 端口` 的方式修改 jstatd 尝试去连接的 rmi register 端口，另外还会使用一个随机的端口

## jmx 和 jstatd 区别

- 生命周期
  - jmx 的生命周期严格和 Java 程序的生命周期绑定，只要启动时没有加上 jmx 的配置项，那么就需要停止运行、加入 jmx 选项，重新启动，才能通过 jmx 的方式连接
  - jstatd 是 jdk 中一个独立的工具，所以他的生命周期也是相对独立的，当需要进行远程监控时，可以随时打开
- 功能方面：只有通过 jstatd 连接才能使用 jvisualvm 中 visual gc 的功能
- jstatd 端口：jstatd server 的端口是随机选择的，不能指定，只能指定尝试去连接的 rmi register 端口

## docker 容器无法使用 JDK 命令的问题

在容器中使用 jps 命令是可以正常返回的，看到各个 java 程序的进程 id。然而需要使用 jmap 命令打印堆栈信息时，提示了以下这个错误：

```
Error attaching to process: sun.jvm.hotspot.debugger.DebuggerException: Can't attach to the process: ptrace(PTRACE_ATTACH, ..) failed for 1: Operation not permitted
```

这个问题其实不是什么 bug，是 docker 的一个安全特性，类似于 jmap 这些 JDK 工具依赖于 Linux 的 PTRACE_ATTACH，而是 docker 自 1.10 版本后在默认的 seccomp 配置文件中禁用了 ptrace，所以 PTRACE 功能默认是关闭的。

### 解决方案

主要的解决方向是把 SYS_PTRACE 功能打开，或者获取主机访问权限

- docker 命令行启动，根据上面的意思能得到两个启动语句，二选一执行：

  ```bash
  docker run --cap-add=SYS_PTRACE ...
  
  docker run --privileged ...
  ```

  

- docker compose 启动，也可以根据解决方向得到两份 compose 文件：

  ```yaml
  version: '3'
  
  services:
    tomcat:
      image: tomcat:latest
      cap_add:
        - SYS_PTRACE
  
  ```

  

  ```yaml
  version: '3'
  
  services:
    tomcat:
      image: tomcat:latest
      # 获取主机访问权限
      privileged: true
  
  ```

  

- rancher 管理容器方式启动，获取主机访问权限，其实类似于 `-privileged` 选项：

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20221212163918.png)

  

- K8S 启动方式：

  ```yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: tomcat-2
  spec:
    containers:
    - name: tomcat-2
      image: tomcat:latest
      securityContext:
        capabilities:
          add: ["SYS_PTRACE"]
  ```

## 参考链接

[jvisualvm 监控远程 jvm 的两种连接方式对比](https://www.jianshu.com/p/5a5972d821e1)

[JVisualVM 远程连接 JVM 的两种方式---jstatd 方式含泪踩坑](https://my.oschina.net/lik/blog/5583380)

[Can‘t attach the process:ptrace(PTRACE_ATTACH)](https://blog.51cto.com/u_12393361/5021517)

[Docker 解决 openjdk 容器里无法使用 JDK 的 jmap 等命令问题](https://www.jb51.net/article/201427.htm)

[JVM in Docker and PTRACE_ATTACH](https://jarekprzygodzki.wordpress.com/2016/12/19/jvm-in-docker-and-ptrace_attach/)

[Docker run reference | Docker Documentation](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities)

[Configure a Security Context for a Pod or Container | Kubernetes](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/)
