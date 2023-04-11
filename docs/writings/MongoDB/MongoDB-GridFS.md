---
title: MongoDB GridFS学习
icon: article
category:

- 数据库

tag:

- MongoDB
- GridFS

---

# GridFS 学习

GridFS 是 MongoDB 提供的用于持久化文件的存储模块



> 现代互联网产品的数据形式已经不局限于文字，还有很多图片等二进制数据，然而二进制数据是不适合存储在普通关系型数据库中的（如：MySQL ），关系型数据库更多的是存储文件的访问路径。GridFS 是 MongoDB 中提供的用于持久化二进制数据的存储模块

## GridFS 概述

GridFS 是 MongoDB 的一个子模块，用于存储和检索超过 16M（BSON）的文件，如果文件大小没有超过 16M 可以将数据保存常规的BSON中

在实际系统开发中，上传的图片或者文件可能尺寸会很大，此时我们可以借用 GridFS 来辅助管理这些文件，GridFS 会自动将文件分成块，每一块作为一条文档单独存储（GridFS使用的块容量默认是256K）

## 工作原理

- GridFS 存储文件是**将文件分块存储**，文件会按照 **256KB** 的大小分割成多个块进行存储

- GridFS 使用两个集合存储文件，默认使用的 bucket 名叫 `fs`，这个名字也可以自定义

	- 一个集合是 `fs.chunks`，用于存储文件的**二进制数据**，分块后的每一个块都作为一个文档存储在这个集合中
    
	- 一个集合是 `fs.files`，用于存储文件的**元数据信息**（文件名称、文件类型、上传时间等信息）
    
	- 如果文件大于 256K，那么会将文件分割成多个块，最终将**多个块信息**存储在 `fs.chunks` 集合中的多个文档中，然后将**一个文件信息**存储在 `fs.files` 集合中的一个文档中，对于同一个大文件，`fs.chunks` 集合中多个文档中的 `file_id` 字段对应 `fs.files` 集中某一个文档的 `_id` 字段。

## 特点

### 优点

集成在 MongoDB 内部，业务方面无需引入存储平台

### 缺点

性能相比对象存储较差，小文件块太多维护起来不方便，且修改文档时候需要先删除再重新保存

## 应用场景

- 应用系统有需要上传图片（用户上传或者系统本身的文件发布等）

- 文件分布式存储与读取（与其他分布式文件存储系统没啥区别）

- 文件的量级处于飞速增长，有可能达到操作系统自己的文件系统的查询性能瓶颈（甚至超过系统硬盘的扩容范围）

- 文件的备份（不使用 GridFS 这种方式也可以做，但是更加方面）

- 文件系统访问的故障转移和修复（GridFS 可以避免用于存储用户上传内容的文件系统出现的某些问题）

- 文件检索支持索引检索，存储除文件本身以外还需要关联更多的元数据信息（文件的发布式作者、发布时间、文件 tag 属性等等**自定义信息**），有了索引后可以更快的检索出文件元数据和文件本身。

- 对文件的分类模糊（文件夹分类关系混乱或者无法分类）

- 文件尺寸较小，而且众多，且文件经常有可能被迁移、删除、修改元数据等