import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "My Awesome Project",
    description: "A VitePress Site",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '首页', link: '/'},
            {text: '笔记', link: '/writings'}
        ],

        sidebar: [
            {
                text: '学习笔记',
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
                            {text: "HashMap和HashSet", link: "/HashMap-and-HashSet"},
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
                            {text: "类字节码", link: "/class-bytecode"},
                            {text: "类加载机制", link: "/class-loading"},
                            {text: "运行时内存模型", link: "/runtime-memory-model"},
                            {text: "垃圾回收", link: "/garbage-collection"},
                            {text: "JVM远程监控", link: "/jvm-remote-monitor"},
                            {text: "Metrics GC问题排查", link: "/metrics-gc-issue"}
                        ],
                    },
                    {
                        text: "并发",
                        collapsed: true,
                        base: "/writings/concurrency",
                        items: [
                            {text: "线程池", link: "/thread-pool"},
                            {text: "串行改并行", link: "/serial-to-parallel"},
                            {text: "任务是否在线程池中执行", link: "/is-thread-executed-in-executor"}
                        ],
                    },
                    {
                        text: "Spring框架",
                        collapsed: true,
                        base: "/writings/Spring",
                        items: [
                            {text: "SpringBoot核心组件", link: "/SpringBoot-core-component"},
                            {text: "漂亮的Controller", link: "/pretty-controller"},
                            {text: "过滤器和拦截器", link: "/filter-and-interceptor"},
                            {text: "Spring线程池", link: "/Spring-thread-pool"},
                            {text: "Spring定时任务", link: "/Spring-schedule"},
                            {text: "动态定时任务", link: "/dynamic-schedule"},
                            {text: "SpringBoot开发", link: "/SpringBoot-develop"}
                        ],
                    },
                    {
                        text: "MyBatis框架",
                        collapsed: true,
                        base: "/writings/MyBatis",
                        items: [
                            {text: "MyBatis入门", link: "/MyBatis-start"},
                            {text: "MyBatis获取参数", link: "/MyBatis-get-param"},
                            {text: "MyBatis缓存", link: "/MyBatis-cache"},
                            {text: "MyBatis-Plus入门", link: "/MyBatis-Plus-start"}
                        ],
                    },
                    {
                        text: "MySQL",
                        collapsed: true,
                        base: "/writings/MySQL",
                        items: [
                            {text: "MySQL数据类型", link: "/MySQL-data-type"},
                            {text: "MySQL服务器处理过程", link: "/MySQL-process-Server"},
                            {text: "MySQL InnoDB处理过程", link: "/MySQL-process-InnoDB"},
                            {text: "MySQL索引", link: "/MySQL-index"},
                            {text: "MySQL事务", link: "/MySQL-transaction"},
                            {text: "MySQL批量插入", link: "/MySQL-batch-insert"}
                        ],
                    },
                    {
                        text: "MongoDB",
                        collapsed: true,
                        base: "/writings/MongoDB",
                        items: [
                            {text: "MongoDB GridFS", link: "/MongoDB-GridFS"}
                        ],
                    },
                    {
                        text: "RocketMQ",
                        collapsed: true,
                        base: "/writings/RocketMQ",
                        items: [
                            {text: "RocketMQ入门", link: "/RocketMQ-start"},
                            {text: "RocketMQ客户端操作", link: "/RocketMQ-operation-client"},
                            {text: "RocketMQ Starter操作", link: "/RocketMQ-operation-starter"},
                            {text: "RocketMQ理论(1)", link: "/RocketMQ-theory-1"},
                            {text: "RocketMQ理论(2)", link: "/RocketMQ-theory-2"},
                            {text: "RocketMQ Broker配置", link: "/RocketMQ-broker-config"}
                        ],
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
                            {text: "Docker", link: "/docker"},
                            {text: "容器通信", link: "/container-communication"},
                            {text: "修改Docker默认存储", link: "/modify-docker-default-storage"}
                        ],
                    },
                    {
                        text: "项目工具",
                        collapsed: true,
                        base: "/writings/project-tools",
                        items: [
                            {text: "Maven", link: "/Maven"},
                            {text: "Git", link: "/Git"},
                            {text: "UML", link: "/UML"}
                        ],
                    },
                    {
                        text: "算法",
                        collapsed: true,
                        base: "/writings/algorithm",
                        items: [
                            {text: "斐波那契数列", link: "/fibonacci"},
                            {text: "摩尔投票法", link: "/moore-voting"}
                        ],
                    },
                    {
                        text: "值得学习的文章",
                        collapsed: true,
                        base: "/writings/outside",
                        items: [
                            {text: "权限系统就该这么设计", link: "https://mp.weixin.qq.com/s/ED9eqxUTbWVS39ayiXCjoQ"},
                            {text: "用 Arthas 定位 Spring Boot 接口的超时问题", link: "https://mp.weixin.qq.com/s/95gg-9vO2CFQh6jE8KEz8w"},
                            {text: "快速搭建一个网关服务，动态路由、鉴权看完就会", link: "https://juejin.cn/post/7004756545741258765"}
                        ],
                    }
                ]
            },
            {
                text: '学习项目',
                items: [
                    {text: 'RocketMQ学习', link: '/learning/RocketMQ-learning'}
                ]
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/gelald/javrin'}
        ]
    }
})
