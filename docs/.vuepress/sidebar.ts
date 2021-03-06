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
				prefix: "spring/",
				children: [
					{
						text: "Controller就该这么写",
						link: "pretty-controller",
						icon: "article"
					},
					{
						text: "Spring中的线程池",
						link: "spring-thread-pool",
						icon: "article"
					}
				]
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
