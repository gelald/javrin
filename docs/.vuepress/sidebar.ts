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
				text: "并发",
				icon: "note",
				collapsable: true,
				prefix: "concurrency/",
				children: "structure"
			},
			{
				text: "Spring&SpringBoot框架",
				icon: "note",
				collapsable: true,
				prefix: "Spring/",
				children: [
					{
						text: "Controller就该这么写",
						link: "pretty-controller",
						icon: "article"
					},
					{
						text: "Spring线程池的使用",
						link: "spring-thread-pool",
						icon: "article"
					}
				]
			},
			{
				text: "MyBatis框架",
				icon: "note",
				collapsable: true,
				prefix: "MyBatis/",
				children: "structure"
			},
			{
				text: "SpringSecurity框架",
				icon: "note",
				collapsable: true,
				prefix: "SpringSecurity/",
				children: "structure"
			},
			{
				text: "MySQL",
				icon: "note",
				collapsable: true,
				prefix: "MySQL/",
				children: "structure"
			},
			{
				text: "消息队列",
				icon: "note",
				collapsable: true,
				prefix: "message-queue/",
				children: [
					{
						text: "RocketMQ入门",
						link: "RocketMQ-start",
						icon: "article"
					},
					{
						text: "RocketMQ操作落地(rocketmq-client方式)",
						link: "RocketMQ-operation-client",
						icon: "article"
					},
					{
						text: "RocketMQ操作落地(rocketmq-starter方式)",
						link: "RocketMQ-operation-starter",
						icon: "article"
					},
					{
						text: "RocketMQ原理分析-1",
						link: "RocketMQ-theory-1",
						icon: "article"
					},
					{
						text: "RocketMQ原理分析-2",
						link: "RocketMQ-theory-2",
						icon: "article"
					},
					{
						text: "RocketMQ中Broker配置详解",
						link: "RocketMQ-broker-config",
						icon: "article"
					}
				]
			},
			{
				text: "分布式理论",
				icon: "note",
				collapsable: true,
				prefix: "distributed/",
				children: "structure",
			},
			{
				text: "容器技术",
				icon: "note",
				collapsable: true,
				prefix: "container/",
				children: "structure",
			},
			{
				text: "项目工具",
				icon: "note",
				collapsable: true,
				prefix: "project-tools/",
				children: "structure",
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
					}
				]
			}
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
