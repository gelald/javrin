import { sidebar } from "vuepress-theme-hope";

export default sidebar([
  "/",
  // "/home",
  // "/slide",
  /*{
    text: "如何使用",
    icon: "creative",
    prefix: "/guide/",
    link: "/guide/",
    children: "structure",
  },*/
  {
    text: "博客文章",
    icon: "article",
    prefix: "/writings/",
    link: "/writings/",
    collapsable: true,
    // children: "structure",
    children: [
      {
        text: "Spring&SpringBoot框架",
        icon: "note",
        collapsable: true,
        prefix: "Spring/",
        children: [
          {
            text: "Controller就该这么写",
            link: "PrettyController"
          }
        ]
      },
      {
        text: "算法",
        icon: "note",
        collapsable: true,
        prefix: "Algorithm/",
        children: [
          /*{
            text: "动态规划",
            link: "DynamicProgramming"
          },*/
          {
            text: "斐波拉契数列",
            link: "Fibonacci"
          },
          {
            text: "摩尔投票法",
            link: "MooreVotingMethod"
          }
        ],
      },
      {
        text: "项目工具",
        icon: "note",
        collapsable: true,
        prefix: "ProjectTools/",
        children: "structure",
      },
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
