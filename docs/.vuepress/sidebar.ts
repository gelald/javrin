import {sidebar} from "vuepress-theme-hope";

export default sidebar([
	"/",
	{
		text: "博客文章",
		icon: "list",
		prefix: "writings/",
		link: "writings/",
		collapsible: false,
		children: [
			{
				text: "Java基础",
				icon: "book",
				collapsible: true,
				prefix: "Java-base/",
				children: [
					"data-and-operation",
					"object-oriented",
					"interface-and-abstract",
					"String",
					"Object",
					"reflection",
					"throwable",
					"generic",
					"lambda-and-functional",
					"spi"
				]
			},
			{
				text: "Java集合",
				icon: "book",
				collapsible: true,
				prefix: "Java-collection/",
				children: [
					"summary",
					"ArrayList",
					"LinkedList",
					"PriorityQueue",
					"ArrayDeque",
					"HashMap-and-HashSet",
					"LinkedHashMap-and-LinkedHashSet",
					"TreeMap-and-TreeSet",
					"stream"
				]
			},
			{
				text: "设计模式",
				icon: "book",
				collapsible: true,
				prefix: "pattern/",
				children: [
					"design-principle",
					"factory",
					"singleton",
					"prototype",
					"builder",
					"proxy",
					"adapter",
					"bridge",
					"flyweight",
					"composite",
					"delegate",
					"template",
					"strategy",
					"chain-of-responsibility",
					"observer",
					"design-pattern-summary"
				]
			},
			{
				text: "JVM",
				icon: "book",
				collapsible: true,
				prefix: "JVM/",
				children: [
					"class-bytecode",
					"class-loading",
					"runtime-memory-model",
					"garbage-collection",
					"jvm-remote-monitor",
                    "metrics-gc-issue"
				]
			},
			{
				text: "并发",
				icon: "book",
				collapsible: true,
				prefix: "concurrency/",
				children: [
					"thread-pool",
					"serial-to-parallel",
					"is-thread-executed-in-executor"
				]
			},
			{
				text: "Spring框架",
				icon: "book",
				collapsible: true,
				prefix: "Spring/",
				children: [
					"SpringBoot-core-component",
					"pretty-controller",
					"filter-and-interceptor",
					"Spring-thread-pool",
					"Spring-schedule",
					"dynamic-schedule",
					"SpringBoot-develop"
				]
			},
			{
				text: "MyBatis框架",
				icon: "book",
				collapsible: true,
				prefix: "MyBatis/",
				children: [
					"MyBatis-start",
					"MyBatis-get-param",
					"MyBatis-cache",
					"MyBatis-Plus-start"
				]
			},
			/*{
				text: "SpringSecurity框架",
				icon: "book",
				collapsible: true,
				prefix: "SpringSecurity/",
				children: "structure"
			},*/
			{
				text: "MySQL",
				icon: "book",
				collapsible: true,
				prefix: "MySQL/",
				children: [
					"MySQL-data-type",
					"MySQL-process-Server",
					"MySQL-process-InnoDB",
					"MySQL-index",
					"MySQL-transaction",
					"MySQL-batch-insert"
				]
			},
			{
				text: "MongoDB",
				icon: "book",
				collapsible: true,
				prefix: "MongoDB/",
				children: [
					"MongoDB-GridFS"
				]
			},
			{
				text: "RocketMQ",
				icon: "book",
				collapsible: true,
				prefix: "RocketMQ/",
				children: [
					"RocketMQ-start",
					"RocketMQ-operation-client",
					"RocketMQ-operation-starter",
					"RocketMQ-theory-1",
					"RocketMQ-theory-2",
					"RocketMQ-broker-config"
				]
			},
			{
				text: "分布式相关",
				icon: "book",
				collapsible: true,
				prefix: "distributed/",
				children: [
					"CAP-theory",
					"distributed-lock",
					"distributed-lock-zookeeper",
					"distributed-transaction"
				],
			},
			{
				text: "系统监控",
				icon: "book",
				collapsible: true,
				prefix: "System-Monitoring/",
				children: [
					"metrics-core"
				],
			},
			{
				text: "容器技术",
				icon: "book",
				collapsible: true,
				prefix: "container/",
				children: [
					"docker",
					"container-communication",
					"modify-docker-default-storage"
				]
			},
			{
				text: "项目工具",
				icon: "book",
				collapsible: true,
				prefix: "project-tools/",
				children: [
					"Maven",
					"Git",
					"UML"
				],
			},
			{
				text: "算法",
				icon: "book",
				collapsible: true,
				prefix: "algorithm/",
				children: [
					"fibonacci",
					"moore-voting"
				],
			},
			{
				text: "值得学习的文章",
				icon: "layer-group",
				collapsible: true,
				prefix: "outside/",
				children: [
					{
						text: "权限系统就该这么设计",
						link: "https://mp.weixin.qq.com/s/ED9eqxUTbWVS39ayiXCjoQ",
						icon: "newspaper"
					},
					{
						text: "用 Arthas 定位 Spring Boot 接口的超时问题",
						link: "https://mp.weixin.qq.com/s/95gg-9vO2CFQh6jE8KEz8w",
						icon: "newspaper"
					},
					{
						text: "快速搭建一个网关服务，动态路由、鉴权看完就会",
						link: "https://juejin.cn/post/7004756545741258765",
						icon: "newspaper"
					}
				]
			},
			/*{
				text: "暂时归档的文章",
				icon: "book",
				collapsible: true,
				prefix: "archive/",
				children: "structure"
			}*/
		]
	},
	{
		text: "学习项目",
		icon: "computer",
		prefix: "/learning/",
		link: "/learning/",
		children: "structure",
	},
]);
