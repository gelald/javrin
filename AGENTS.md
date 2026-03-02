# AGENTS.md - AI 编码助手指南

本文档为 AI 编码助手（如 Claude、Copilot 等）提供项目指南，确保生成的代码和内容符合项目规范。

## AI 助手规则

- **使用中文回答所有问题**
- 遵循本文档中的代码风格和规范
- 在完成代码修改后，主动运行验证命令确保更改正确

## 项目概述

- **项目名称**：Javrin
- **项目类型**：VitePress 文档站点
- **项目目的**：Java 后端知识库，包含博客文章与学习项目
- **主要内容**：Java 基础、并发编程、JVM、MySQL、Redis、Spring、SpringCloud 等核心知识点
- **技术栈**：
  - VitePress 2.0.0-alpha.12
  - pnpm 10.22.0
  - Node.js 22
  - markdown-it-mathjax3（数学公式支持）

## 构建命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器（端口 9901）
pnpm docs:dev

# 构建文档（重要：验证构建是否成功）
pnpm docs:build

# 预览构建结果
pnpm docs:preview
```

## 测试与验证

**此项目无测试/lint 命令**。

最重要的验证方式是执行构建命令，检查是否能成功打包：

```bash
pnpm docs:build
```

这关系到 GitHub Actions 的部署结果，构建失败会导致部署失败。

## 文档编写规范

### 1. YAML Frontmatter 格式

每篇 Markdown 文档应包含 YAML frontmatter：

```yaml
---
title: 文档标题
icon: article
order: 1
category: 分类名称
tag:
  - 标签1
  - 标签2
---
```

常用字段说明：
- `title`：文档标题（必填）
- `icon`：图标名称，如 `article`、`note-sticky`
- `order`：侧边栏排序
- `category`：文档分类
- `tag`：标签列表

### 2. Markdown 格式规范

- 使用 ATX 风格标题（`#` 符号）
- 标题层级从 H1 开始，逐级递增
- 列表使用 `-` 符号，嵌套使用 4 空格缩进
- 强调使用 `**粗体**` 和 `*斜体*`
- 代码块必须指定语言：

````markdown
```java
public class Example {
    // Java 代码
}
```
````

### 3. 图片规范

- 图片使用外部 OSS 托管，URL 格式：
  - `https://jarvin-image.oss-cn-guangzhou.aliyuncs.com/...`
  - `https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/...`
- 不将图片存放在项目中
- 图片语法：`![图片描述](图片URL)`

### 4. 代码示例规范

- Java 代码遵循阿里巴巴 Java 编码规范
- 代码示例应包含必要的注释说明
- 使用中文注释
- 类名使用大驼峰命名，方法名使用小驼峰命名

### 5. 内容组织

- 使用引用块（`>`）强调重要概念或提示
- 使用表格对比不同概念
- 复杂概念分步骤解释
- 每个章节使用二级标题（`##`）分隔

## Git 提交规范

### 提交信息格式

```
<type>: <subject>

<body>
```

### 提交类型

- `feat`：新增功能或文档
- `fix`：修复问题
- `docs`：文档更新
- `style`：格式调整（不影响内容）
- `refactor`：重构
- `chore`：构建/工具变动

### 示例

```
docs: 新增 Spring Security 核心组件文档

- 添加 UserDetails 接口说明
- 添加 Authentication 接口说明
- 添加代码示例
```

## 项目结构

```
javrin/
├── docs/                      # 文档目录
│   ├── .vitepress/           # VitePress 配置
│   │   ├── config.mts        # 主配置文件（导航、侧边栏等）
│   │   └── dist/             # 构建输出目录
│   ├── public/               # 静态资源
│   ├── writings/             # 学习笔记
│   │   ├── Java-base/        # Java 基础
│   │   ├── Java-collection/  # Java 集合
│   │   ├── concurrency/      # 并发编程
│   │   ├── JVM/              # JVM
│   │   ├── Spring/           # Spring 框架
│   │   ├── SpringSecurity/   # Spring Security
│   │   ├── MyBatis/          # MyBatis
│   │   ├── MySQL/            # MySQL
│   │   ├── Redis/            # Redis
│   │   ├── RocketMQ/         # RocketMQ
│   │   ├── pattern/          # 设计模式
│   │   └── ...               # 其他分类
│   ├── learning/             # 学习项目
│   ├── index.md              # 首页
│   └── README.md             # 旧版首页
├── package.json              # 项目配置
├── pnpm-lock.yaml           # 依赖锁定文件
├── wrangler.toml            # Cloudflare Workers 配置
└── AGENTS.md                # 本文件
```

## VitePress 配置

配置文件位于 `docs/.vitepress/config.mts`，主要配置项：

- `title`：站点标题
- `description`：站点描述
- `base`：部署基础路径（GitHub Actions 环境为 `/javrin`）
- `themeConfig.nav`：导航栏配置
- `themeConfig.sidebar`：侧边栏配置
- `themeConfig.search`：本地搜索配置

修改配置后需重新启动开发服务器查看效果。

## GitHub Actions 部署

项目使用 GitHub Actions 自动部署到 GitHub Pages，工作流文件：`.github/workflows/deploy-docs.yml`

部署流程：
1. 推送到 `main` 分支触发
2. 安装 pnpm 和 Node.js 22
3. 安装依赖（`pnpm install --frozen-lockfile`）
4. 构建文档（`pnpm docs:build`）
5. 部署到 GitHub Pages

**重要**：确保本地构建成功后再推送，避免部署失败。

## 常见问题

### 构建失败

1. 检查 Node.js 版本是否为 22
2. 检查 pnpm 版本是否为 10.22.0
3. 删除 `node_modules` 和 `pnpm-lock.yaml` 后重新安装
4. 检查 Markdown 语法是否正确

### 开发服务器无法启动

1. 检查端口 9901 是否被占用
2. 检查依赖是否安装完整

### 侧边栏/导航不显示

1. 检查 `docs/.vitepress/config.mts` 配置
2. 确认文件路径和 base 路径正确

## 参考资料

- [VitePress 官方文档](https://vitepress.dev/)
- [阿里巴巴 Java 编码规范](https://github.com/alibaba/p3c)