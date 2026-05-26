import {defineConfig} from 'vitepress'
import { vitepressMermaidPreview } from 'vitepress-mermaid-preview';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Javrin",
    description: "「Javrin」是我的学习笔记 希望能帮助你😎",
    // 因为 Github Pages 部署时使用了自定义仓库，域名并非 https://<USERNAME>.github.io ，而是 https://<USERNAME>.github.io/<REPO>
    // 所以对于 Github Pages 必须有相对路径，也就是指定 base 属性；但对于 Vercel 等其他平台，这个配置不是必须的，可以省去
    // GITHUB_ACTIONS 是 GitHub Actions 运行时自动设置的环境变量，我们可以利用这个环境变量来做区分，如果是 Github Pages 情况，那么加上 base
    base: process.env.GITHUB_ACTIONS === 'true' ? '/javrin' : '/',
    // 生成的url不带.html后缀
    cleanUrls: true,
    head: [
        ["link", {
            rel: "icon",
            // icon 路径和 base 属性同理
            href: process.env.GITHUB_ACTIONS === 'true' ? "/javrin/favicon.ico" : "/favicon.ico"
        }]
    ],
    themeConfig: {
        logo: '/logo.svg',
        // 开启全文搜索后，会建立索引，因为文件数量多、文件内容也多，所以索引文件可能会很大
        search: {
            provider: "local"
        },

        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: "首页", link: "/"},
            {text: "笔记", link: "/writings"},
            {text: "vitepress文档", link: "https://vitepress.dev/reference/site-config"}
        ],

        sidebar: [
            {
                text: "学习笔记",
                items: [
                    {
                        text: "Java基础",
                        collapsed: true,
                        base: "/writings/Java-base",
                        items: [
                            {text: "数据类型和运算符", link: "/data-and-operation"},
                            {text: "对象和面向对象", link: "/object-oriented"},
                            {text: "接口和抽象类", link: "/interface-and-abstract"},
                            {text: "String", link: "/String"},
                            {text: "Object", link: "/Object"},
                            {text: "反射", link: "/reflection"},
                            {text: "Throwable", link: "/throwable"},
                            {text: "泛型", link: "/generic"},
                            {text: "Lambda和函数式接口", link: "/lambda-and-functional"},
                            {text: "SPI", link: "/spi"}
                        ],
                    },
                    {
                        text: "Java集合",
                        collapsed: true,
                        base: "/writings/Java-collection",
                        items: [
                            {text: "总结", link: "/summary"},
                            {text: "ArrayList", link: "/ArrayList"},
                            {text: "LinkedList", link: "/LinkedList"},
                            {text: "PriorityQueue", link: "/PriorityQueue"},
                            {text: "ArrayDeque", link: "/ArrayDeque"},
                            {text: "HashMap", link: "/HashMap"},
                            {text: "ConcurrentHashMap", link: "/ConcurrentHashMap"},
                            {text: "LinkedHashMap和LinkedHashSet", link: "/LinkedHashMap-and-LinkedHashSet"},
                            {text: "TreeMap和TreeSet", link: "/TreeMap-and-TreeSet"},
                            {text: "Stream", link: "/stream"}
                        ],
                    },
                    {
                        text: "设计模式",
                        collapsed: true,
                        base: "/writings/pattern",
                        items: [
                            {text: "设计原则", link: "/design-principle"},
                            {text: "工厂模式", link: "/factory"},
                            {text: "单例模式", link: "/singleton"},
                            {text: "原型模式", link: "/prototype"},
                            {text: "建造者模式", link: "/builder"},
                            {text: "代理模式", link: "/proxy"},
                            {text: "适配器模式", link: "/adapter"},
                            {text: "桥接模式", link: "/bridge"},
                            {text: "享元模式", link: "/flyweight"},
                            {text: "组合模式", link: "/composite"},
                            {text: "委派模式", link: "/delegate"},
                            {text: "模板方法模式", link: "/template"},
                            {text: "策略模式", link: "/strategy"},
                            {text: "责任链模式", link: "/chain-of-responsibility"},
                            {text: "观察者模式", link: "/observer"},
                            {text: "设计模式总结", link: "/design-pattern-summary"}
                        ],
                    },
                    {
                        text: "JVM",
                        collapsed: true,
                        base: "/writings/JVM",
                        items: [
                            {text: "运行时内存模型", link: "/runtime-memory-model"},
                            {text: "垃圾回收基础", link: "/garbage-collection"},
                            {text: "垃圾回收问题追踪", link: "/garbage-collection-advanced"},
                            {text: "类加载机制", link: "/class-loading"},
                            {text: "JVM 远程监控", link: "/jvm-remote-monitor"},
                            {text: "Metrics GC 问题排查", link: "/metrics-gc-issue"},
                            {text: "线上 OOM 问题排查", link: "/oom-troubleshoot"}
                        ],
                    },
                    {
                        text: "并发",
                        collapsed: true,
                        base: "/writings/concurrency",
                        items: [
                            {text: "sleep 和 wait的区别", link: "/difference-between-sleep-and-wait"},
                            {text: "yield 学习", link: "/yield"},
                            {text: "ThreadLocal 学习", link: "/ThreadLocal"},
                            {text: "volatile 学习", link: "/volatile"},
                            {text: "synchronized 学习", link: "/synchronized"},
                            {text: "CAS 学习", link: "/CAS"},
                            {text: "AQS 从原理到实战", link: "/AQS-theory"},
                            {text: "ReentrantLock 学习", link: "/ReentrantLock"},
                            {text: "JUC 常用工具学习", link: "/JUC"},
                            {text: "线程池学习", link: "/ThreadPoolExecutor"},
                            {text: "Future 专题", link: "/Future-topic"},
                            {text: "任务是否在线程池中执行", link: "/is-thread-executed-in-executor"}
                        ],
                    },
                    {
                        text: "Spring框架",
                        collapsed: true,
                        base: "/writings/Spring",
                        items: [
                            {text: "Spring 阶段一: IOC 容器原理", link: "/spring-01-ioc-container"},
                            {text: "Spring 阶段二: AOP 原理", link: "/spring-02-aop-principle"},
                            {text: "Spring 阶段三: Bean 生命周期", link: "/spring-03-bean-lifecycle"},
                            {text: "Spring 阶段四: 循环依赖", link: "/spring-04-circular-dependency"},
                            {text: "Spring 阶段五: 事务管理", link: "/spring-05-transaction"},
                            {text: "Spring Boot 阶段一: 自动配置原理", link: "/springboot-01-autoconfigure"},
                            {text: "Spring Boot 阶段二: 起步依赖与内嵌容器", link: "/springboot-02-starter-container"},
                            {text: "Spring Boot 阶段三: 配置加载与环境抽象", link: "/springboot-03-config-env"},
                            {text: "Spring Boot 阶段四: Actuator 与监控", link: "/springboot-04-actuator.md"},
                            {text: "SpringBoot 核心组件", link: "/SpringBoot-core-component"},
                            {text: "Controller 就该这么写", link: "/pretty-controller"},
                            {text: "Spring 过滤器和拦截器", link: "/filter-and-interceptor"},
                            {text: "Spring 线程池", link: "/Spring-thread-pool"},
                            {text: "Spring 定时任务", link: "/Spring-schedule"},
                            {text: "基于 Nacos 实现 SpringBoot 动态定时任务调度", link: "/dynamic-schedule"},
                            {text: "SpringBoot 开发中的一些问题总结", link: "/SpringBoot-develop"}
                        ],
                    },
                    {
                        text: "Spring Security",
                        collapsed: true,
                        base: "/writings/SpringSecurity",
                        items: [
                            {text: "SpringSecurity 核心组件", link: "/Spring-Security-core-component"},
                            {text: "SpringSecurity 之 WebSecurity 和 HttpSecurity 的区别", link: "/WebSecurity-and-HttpSecurity"}
                        ]
                    },
                    // {
                    //     text: "MyBatis框架",
                    //     collapsed: true,
                    //     base: "/writings/MyBatis",
                    //     items: [
                    //         {text: "MyBatis入门", link: "/MyBatis-start"},
                    //         {text: "MyBatis获取参数", link: "/MyBatis-get-param"},
                    //         {text: "MyBatis缓存", link: "/MyBatis-cache"},
                    //         {text: "MyBatis-Plus入门", link: "/MyBatis-Plus-start"}
                    //     ],
                    // },
                    {
                        text: "MySQL",
                        collapsed: true,
                        base: "/writings/MySQL",
                        items: [
                            {text: "MySQL 数据类型", link: "/MySQL-data-type"},
                            {text: "MySQL Server层", link: "/MySQL-process-Server"},
                            {text: "MySQL 存储引擎层", link: "/MySQL-process-Engine"},
                            {text: "MySQL 索引", link: "/MySQL-index"},
                            {text: "MySQL 事务与锁", link: "/MySQL-transaction-lock"},
                            {text: "MySQL 优化篇", link: "/MySQL-optimization"},
                            {text: "MySQL 批量插入", link: "/MySQL-batch-insert"}
                        ],
                    },
                    {
                        text: "Redis",
                        collapsed: true,
                        base: "/writings/Redis",
                        items: [
                            {text: "Redis 数据结构", link: "/Redis-data-structure"},
                            {text: "Redis 核心原理", link: "/Redis-core-principle"},
                            {text: "Redis 持久化", link: "/Redis-persistence"},
                            {text: "Redis 高可用", link: "/Redis-high-availability"},
                            {text: "Redis 缓存实战", link: "/Redis-cache-practice"}
                        ],
                    },
                    {
                        text: "RocketMQ",
                        collapsed: true,
                        base: "/writings/RocketMQ",
                        items: [
                            {text: "RocketMQ 入门", link: "/RocketMQ-start"},
                            {text: "RocketMQ 操作落地 (rocketmq-client 方式)", link: "/RocketMQ-operation-client"},
                            {text: "RocketMQ 操作落地 (rocketmq-starter 方式)", link: "/RocketMQ-operation-starter"},
                            {text: "RocketMQ 理论(1)", link: "/RocketMQ-theory-1"},
                            {text: "RocketMQ 理论(2)", link: "/RocketMQ-theory-2"},
                            {text: "RocketMQ 进阶", link: "/RocketMQ-Advanced"},
                            {text: "RocketMQ Broker配置", link: "/RocketMQ-broker-config"}
                        ],
                    },
                    {
                        text: "gRPC",
                        collapsed: true,
                        base: "/writings/gRPC",
                        items: [
                            {text: "gRPC 基础与 Protobuf", link: "/gRPC-basic-protobuf"},
                            {text: "gRPC 通信模式与 Spring Boot 整合", link: "/gRPC-patterns-spring"},
                            {text: "gRPC 生产实践与高级特性", link: "/gRPC-production"}
                        ]
                    },
                    {
                        text: "分布式相关",
                        collapsed: true,
                        base: "/writings/distributed",
                        items: [
                            {text: "CAP理论", link: "/CAP-theory"},
                            {text: "分布式锁", link: "/distributed-lock"},
                            {text: "Zookeeper分布式锁", link: "/distributed-lock-zookeeper"},
                            {text: "分布式事务", link: "/distributed-transaction"}
                        ],
                    },
                    {
                        text: "系统监控",
                        collapsed: true,
                        base: "/writings/System-Monitoring",
                        items: [
                            {text: "Metrics核心概念", link: "/metrics-core"}
                        ],
                    },
                    {
                        text: "容器技术",
                        collapsed: true,
                        base: "/writings/container",
                        items: [
                            {text: "Docker基础知识", link: "/docker"},
                            {text: "Docker容器通信", link: "/container-communication"},
                            {text: "修改Docker默认存储", link: "/modify-docker-default-storage"}
                        ],
                    },
                    {
                        text: "项目工具",
                        collapsed: true,
                        base: "/writings/project-tools",
                        items: [
                            {text: "Maven", link: "/Maven"},
                            {text: "Git", link: "/Git"}
                        ],
                    },
                    {
                        text: "算法",
                        collapsed: true,
                        base: "/writings/algorithm",
                        items: [
                            {text: "斐波那契数列", link: "/fibonacci"},
                            {text: "动态规划", link: "/dynamic-programming"},
                            {text: "摩尔投票法", link: "/moore-voting"}
                        ],
                    },
                    {
                        text: "值得学习的文章",
                        collapsed: true,
                        items: [
                            {text: "权限系统就该这么设计", link: "https://mp.weixin.qq.com/s/ED9eqxUTbWVS39ayiXCjoQ"},
                            {text: "用 Arthas 定位 Spring Boot 接口的超时问题", link: "https://mp.weixin.qq.com/s/95gg-9vO2CFQh6jE8KEz8w"},
                            {text: "快速搭建一个网关服务，动态路由、鉴权看完就会", link: "https://juejin.cn/post/7004756545741258765"}
                        ],
                    }
                ]
            },
            {
                text: "学习项目",
                items: [
                    {text: "RocketMQ学习", link: "/learning/RocketMQ-learning"}
                ]
            }
        ],

        socialLinks: [
            {icon: "github", link: "https://github.com/gelald/javrin"}
        ],

        // 页面大纲设置
        outline: {
            level: [2, 4],
            label: "页面导航"
        }
    },
    // 开启最后更新时间
    lastUpdated: true,

    markdown: {
        breaks: true,
        config: (md) => {
            vitepressMermaidPreview(md, {
                showToolbar: true, // 全局设置：是否默认显示工具栏
            });
        },
        math: true
    },

    vite: {
        build: {
            // 将告警阈值从 500KB 提升到 3000KB
            chunkSizeWarningLimit: 3000
        }
    }
})
