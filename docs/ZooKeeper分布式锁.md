# ZooKeeper 分布式锁

## 问题引入

开发时遇到一个需求：简单理解为很多个工人同时并发使用一个钳子进行工作，一个钳子在同一时间下只能被一个工人拿到并工作。

在传统单体应用架构下，我们会使用 `synchronized` 或者 `lock` 机制来解决多线程的资源竞争问题；

但是在分布式集群工作的开发场景下，多线程会分布在不同机器上，这使得原本单机部署单体架构的并发控制锁策略失效！

为了解决跨 JVM 的互斥机制来控制资源共享的问题，需要使用分布式锁



## 选型

目前分布式锁比较成熟、常见的解决方案有两种，简单对比一下

- 基于 Redis 的分布式锁 —— RedLock，适用于并发量很大、性能要求很高的场景，但是可靠性的问题需要使用其他手段解决
- 基于 ZooKeeper 的分布式锁 —— Curator，适用于并发量不大、但是可靠性要求高的场景，因为每次在创建锁和释放锁的过程中，都要动态创建、销毁暂时节点来实现锁功能

基于上述比较和需求，所以我选择了使用 ZooKeeper 作为项目中的分布式锁



## 简单回顾 ZooKeeper

ZooKeeper 的数据结构是树形层次结构，树下面可以不断创建节点

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220520115700.png)

其中节点有几种类型

- 持久化节点：节点创建后，需要手动删除，即使 ZooKeeper 服务端重启，这个节点依然存在
- 持久化顺序节点：特性和持久化节点一样，只不过 ZooKeeper 会给节点进行顺序编号
- 临时节点：节点创建之后，和当前创建的会话生命周期保持一致，当会话关闭后节点就会被删除
- 临时顺序节点：特性和临时节点一样，同样地 ZooKeeper 会给节点进行顺序编号



## ZooKeeper 分布式锁实现原理

每一个分布式锁对应的是 ZooKeeper 的一个节点，每一个需要获取分布式锁的客户端线程都在特定目录下创建一个临时有序节点

- 当创建的临时节点就是这个目录下的第一个节点，说明获取锁成功，可以开始业务
- 当创建的临时节点不是这个目录下的第一个节点，说明当前目录对应的分布式锁已经被其他客户端线程获取了，此时需要进入阻塞状态。**等待前一个节点**释放锁时唤醒当前线程

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220520143039.png)



## 分布式锁应用

服务端：ZooKeeper 3.6.3

客户端框架：Curator，它为 ZooKeeper 客户端提供了一些比较普遍、开箱即用、分布式开发的解决方案，例如 Recipe、共享锁服务、Master 选举机制等功能

有一句很出名的评价：

> Guava is to Java that Curator to ZooKeeper

以下贴出关键代码

> 依赖

```xml
<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
    <version>3.6.3</version>
    <exclusions>
        <exclusion>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
        </exclusion>
        <exclusion>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-recipes</artifactId>
    <version>5.2.1</version>
    <exclusions>
        <exclusion>
            <groupId>org.apache.zookeeper</groupId>
            <artifactId>zookeeper</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-framework</artifactId>
    <version>5.2.1</version>
</dependency>
```

> 相关配置

```java
@Data
@Component
@ConfigurationProperties(prefix = "biz.zookeeper")
public class ZookeeperProperties {
    /**
     * Zookeeper服务器地址
     */
    private String server;
    /**
     * 获取Zookeeper锁的最长等待时间
     */
    private Long maxWaitingTimeForLock;
}
```



```java
@Configuration
public class ZookeeperConfiguration {
    @Autowired
    private ZookeeperProperties zookeeperProperties;

    // 注入时,指定initMethod和destroyMethod
    @Bean(initMethod = "init", destroyMethod = "destroy")
    public CuratorClientUtil curatorClientUtil() {
        return new CuratorClientUtil(zookeeperProperties.getServer());
    }
}
```



```java
@Slf4j
public class CuratorClientUtil {
    @Getter
    private CuratorFramework client;
    private final String zookeeperServer;

    public CuratorClientUtil(String zookeeperServer) {
        this.zookeeperServer = zookeeperServer;
    }

    /**
     * 创建CuratorFrameworkFactory并且启动
     */
    public void init() {
        // 重试策略,等待1s,最大重试3次
        RetryPolicy retryPolicy = new ExponentialBackoffRetry(1000, 3);
        this.client = CuratorFrameworkFactory.builder()
                .connectString(zookeeperServer)
                .sessionTimeoutMs(5000)
                .connectionTimeoutMs(5000)
                .retryPolicy(retryPolicy)
                .build();
        this.client.start();
    }

    /**
     * 容器关闭,CuratorFrameworkFactory关闭
     */
    public void destroy() {
        try {
            if (Objects.nonNull(this.client)) {
                this.client.close();
            }
        } catch (Exception e) {
            log.error("CuratorFramework close error => {}", e.getMessage());
        }
    }
}
```



> 使用

```java
// 获取当前线程的名字，方便观察那些线程在获取锁
String threadName = Thread.currentThread().getName();
// 在zookeeper下创建锁对应的临时有序节点
final String lockPath = "/BizLock";
InterProcessMutex interProcessMutex = new InterProcessMutex(this.curatorClientUtil.getClient(), lockPath);

try{
    if (logger.isDebugEnabled()) {
        logger.debug("{} 尝试获取锁", threadName);
    }
    // 尝试获取锁
    boolean hasAcquired = interProcessMutex.acquire(this.zookeeperProperties.getMaxWaitingTimeForLock(), TimeUnit.SECONDS);

    if (hasAcquired) {
        // 获取锁成功 执行业务
        if (logger.isDebugEnabled()) {
            logger.debug("{} 获取锁成功", threadName);
        }

        // 模拟进行业务
        Thread.sleep(3000);
        
    } else {
        logger.debug("{} 获取锁失败", threadName);
    }

} catch (Exception e) {
    if (logger.isDebugEnabled()) {
        logger.debug("{} 获取锁异常, 异常是: {}", threadName, e);
    }
} finally {
    // 业务处理完成，释放锁，唤醒比当前线程创建的节点序号大(最靠近)的线程获取锁
    interProcessMutex.release();
    if (logger.isDebugEnabled()) {
        logger.debug("{} 释放锁", threadName);
    }
}
```

后续业务进行中时，看到日志中的现象就是所有线程到这一段代码时都串行进行了



> 以上就是我关于 ZooKeeper 分布式锁的总结与应用，关于 ZooKeeper 分布式锁还有其他的做法，不拘泥于形式，最重要的是能满足业务！