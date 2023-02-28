import {sidebar} from "vuepress-theme-hope";

export default sidebar([
	"/",
	/*{
		text: "如何使用",
		icon: "creative",
		prefix: "/guide/",
		link: "/guide/",
		children: "structure",
	},*/
	{
		text: "博客文章",
		icon: "list",
		prefix: "/writings/",
		link: "/writings/",
		collapsable: true,
		children: [
			{
				text: "Java基础",
				icon: "note",
				collapsable: true,
				prefix: "Java-base/",
				children: [
					"object-oriented",
					"data-and-operation",
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
				icon: "note",
				collapsable: true,
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
				text: "JVM",
				icon: "note",
				collapsable: true,
				prefix: "JVM/",
				children: [
					"class-bytecode",
					"class-loading",
					"runtime-memory-model",
					"garbage-collection",
					"jvm-remote-monitor"
				]
			},
			{
				text: "并发",
				icon: "note",
				collapsable: true,
				prefix: "concurrency/",
				children: [
					"thread-pool",
					"serial-to-parallel",
					"is-thread-executed-in-executor"
				]
			},
			{
				text: "Spring框架",
				icon: "note",
				collapsable: true,
				prefix: "Spring/",
				children: [
					"SpringBoot-core-component",
					"pretty-controller",
					"Spring-thread-pool",
					"Spring-schedule",
					"SpringBoot-develop"
				]
			},
			{
				text: "MyBatis框架",
				icon: "note",
				collapsable: true,
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
				icon: "note",
				collapsable: true,
				prefix: "SpringSecurity/",
				children: "structure"
			},*/
			{
				text: "MySQL",
				icon: "note",
				collapsable: true,
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
				text: "消息队列",
				icon: "note",
				collapsable: true,
				prefix: "message-queue/",
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
				icon: "note",
				collapsable: true,
				prefix: "distributed/",
				children: [
					"CAP-theory",
					"distributed-lock",
					"distributed-transaction"
				],
			},
			{
				text: "容器技术",
				icon: "note",
				collapsable: true,
				prefix: "container/",
				children: [
					"docker",
					"container-communication",
					"modify-docker-default-storage"
				]
			},
			{
				text: "项目工具",
				icon: "note",
				collapsable: true,
				prefix: "project-tools/",
				children: [
					"Maven",
					"Git",
					"UML"
				],
			},
			{
				text: "算法",
				icon: "note",
				collapsable: true,
				prefix: "algorithm/",
				children: [
					{
						text: "斐波拉契数列",
						link: "fibonacci",
						icon: "article"
					},
					{
						text: "摩尔投票法",
						link: "moore-voting",
						icon: "article"
					}
				],
			},
			{
				text: "值得学习的文章",
				icon: "note",
				collapsable: true,
				prefix: "outside/",
				children: [
					{
						text: "权限系统就该这么设计",
						link: "https://mp.weixin.qq.com/s/ED9eqxUTbWVS39ayiXCjoQ",
						icon: "article"
					},
					{
						text: "用 Arthas 定位 Spring Boot 接口的超时问题",
						link: "https://mp.weixin.qq.com/s/95gg-9vO2CFQh6jE8KEz8w",
						icon: "article"
					},
					{
						text: "快速搭建一个网关服务，动态路由、鉴权看完就会",
						link: "https://juejin.cn/post/7004756545741258765",
						icon: "article"
					}
				]
			},
			/*{
				text: "暂时归档的文章",
				icon: "note",
				collapsable: true,
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
	/*{
		text: "文章",
		icon: "note",
		prefix: "/posts/",
		children: [
			{
				text: "文章 1-4",
				icon: "note",
				collapsable: true,
				prefix: "article/",
				children: ["article1", "article2", "article3", "article4"],
			},
			{
				text: "文章 5-12",
				icon: "note",
				children: [
					{
						text: "文章 5-8",
						icon: "note",
						collapsable: true,
						prefix: "article/",
						children: ["article5", "article6", "article7", "article8"],
					},
					{
						text: "文章 9-12",
						icon: "note",
						children: ["article9", "article10", "article11", "article12"],
					},
				],
			},
		],
	},*/
]);
