---
title: Git 基础知识
index: false
icon: article
category:
- Git
- ProjectTool
---

# Git

## 概念

![image-20201124094223951](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/image-20201124094223951.png)

- 工作区 ：就是你在电脑上看到的目录

- 暂存区 ：能够提交到版本库的文件、目录内容，所有要提交到版本库的内容都必须先从工作区添加到暂存区

- 版本库 ：就是 `.git` 目录。工作区有一个隐藏目录 `.git`，这不属于工作区，这是版本库。其中版本库里面存放了很多东西，其中最重要的就是 `stage(暂存区)`，还有 Git 为我们自动创建了第一个分支 master ，以及指向 master 的一个指针 HEAD(现在可以修改默认第一个分支名字叫 main 分支)

## Git 工作目录的状态

- untracked：未跟踪（未被纳入版本控制）

- tracked：已跟踪（被纳入版本控制）
  - Unmodified：未修改状态
  
  - Modified：已修改状态
  
  - Staged：已暂存状态

### 修改状态

- 使用 `git add <file>` 将未跟踪状态的文件变成已暂存状态(加入暂存区)

- 使用 `git reset HEAD <file>` 将已暂存状态的文件(暂存区的文件)，回到原始状态(取消暂存)

## 本地操作

- 删除文件：`git rm <file>`，**相当于删除文件+把修改添加到暂存区**

- HEAD：这是当前分支版本顶端的别名，也就是在当前分支你最近的一个提交
- 建立本地仓库
  - `git init` 会在当前目录新建一个`.git`的隐藏文件夹
- 查看是否有修改
  - `git status` 
- 查看修改内容
  - `git diff 文件名`
- 把文件添加到暂存区
  - `git add 文件名` 
- 把暂存区中修改的文件提交到版本库中
  - `git commit -m 本次提交的信息`
- 查看提交的历史记录
  - `git log`
- 撤销修改
  - `git checkout -- file`
    - 还没放到暂存区，回到和版本库一摸一样的状态
    - 已经放入暂存区再进行修改，回到暂存区的状态
- 回退版本
  - `git reset -hard HEAD^` 回退上一个版本
  - `git reset -hard HEAD^^` 回退到上上个版本 回退的版本数由`^`的数目决定
  - `git reset -hard HEAD~100` 回退前100个版本
  - `git reset -hard 版本号` 回退到特定版本
  - `git relog` 查看每一个版本的版本号
- 关于撤销的操作
  - 撤销**上一个**提交到版本库的版本：`git reset --head HEAD^`
  - 撤销当前**还没提交**的文件：`git checkout --file`
  - 撤销**已提交**的文件：`git reset HEAD file`
- 创建分支
  - `git branch 分支名`
  - `git branch`  查看当前分支
  - `git branch –d name` 删除分支
- 切换分支
  - `git checkout 分支名`
- 合并分支
  - `git merge 分支名` 合并分支**到当前分支**上
- 开发时一般流程
  - 创建dev分支：`git branch dev`
  - 切换dev分支：`git checkout dev`
  - 把改动从工作区放入暂存区：`git add .`
  - 把暂存区的改动提交到版本库：`git commit -m "commit message"`
  - 切换master分支：`git checkout master` 此时master的分支是没改动过的
  - 把dev的改动合并到master分支：`git merge dev`
  - 接下来要么删除dev分支：`git branch -d dev`
  - 要么切换到dev分支继续开发：`git checkout dev`

### git reset

- `git reset --soft commit_id`：commit_id之后的**commit修改全部在暂存区中**，**本地当前的修改保留在工作区**
- `git reset --mixed commit_id`(默认)：commit_id之后的**commit和本地修改全都放在工作区中**
- `git reset --hard commit_id`：commit_id之后的**commit和本地修改全部移除**，将项目的状态恢复到commit_id的状态。对于未追踪的文件没有影响(由始至终没有add过的文件)

### git revert

- `git revert -e <commit_id>`：重做指定commit的**提交信息**，生成一个新的commit_id
- `git revert -n <commit_id>`：重做执行commit的**代码修改**，将commit_id中的修改，从本地仓库放回到index区，我们可以重新做修改并重新提交

### reset和revert对比

- `git revert`是用一次新的commit来回滚之前的commit，此次提交之前的**commit都会被保留不动**
- `git reset`是回到某次提交，提交及之前的commit都会被保留，但是此commit_id之后的**修改都会被删除或放回工作区等待下一次提交**

## 远程仓库

- 查看远程仓库：`git remote -v`

- 关联已知本地库和远程库
  - ` git remote add origin 远程库地址`
- 把当前分支推送到远程仓库
  - `git push`
  - `git push -u `  不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令
- 从远程仓库拉取、抓取
  - `git fetch`：抓取，从远程仓库获取最新版本到本地，不会自动merge
  - `git pull`：拉取，从远程仓库获取最新版本并merge到本地
- 从远程仓库克隆
  - `git clone <url>`
- 删除本地远程仓库的记录(不会真正删除远程仓库)
  - `git remote rm origin`

## 把错误的代码提交到代码库中

### 移除commit，保留commit的修改

1. 使用`git log`命令获取当前分支下提交的commit_id。假设错误提交的commit_id为commit_id4，也就是说要将修改回滚到commit_id3
2. 使用`git reset <commit_id>`命令将某个commit_id(commit_id3)后面的commit清除，并保留修改的代码在工作区`WorkSpace`
3. 修改代码
4. 提交代码

### 修改中间的commit，对其他commit没有影响

> 在项目开发中，突然发现在前几次的提交中，有一次提交中包含一个bug；当然我们可以进行一个新的修改，然后再提交一次； 但是不优雅。
>
>  我们可以直接**重做**有bug的commit，git revert是用于“反做”某一个版本，以达到撤销该版本的修改的目的。

1. 使用`git log`命令获取当前分支下提交的commit_id
2. 使用`git revert -n <commit_id>`命令将改动放回暂存区`index`
3. 修改代码
4. 提交代码

### 发现某个文件修改错误了，想要将文件恢复到刚pull代码时的状态

使用`git checkout -- <file_name>`命令，回滚到本地仓库中的状态

## 分支

**查看分支**

- 列出所有**本地分支**：`git branch`
- 列出所有**远程分支**：`git branch -r`
- 列出所有本地分支与远程分支：`git branch -a`

**创建分支**：`git branch <分支名>`

**切换分支**：`git checkout <分支名>`

**删除分支**

- **删除本地分支**：`git branch -d <分支名>`

- **删除远程分支**：`git push origin -d <分支名>`

## 标签

标签指的是某个分支特定时间点的状态，通常会使用标签来标记发布节点（1.0、1.2等）通过标签，可以很方便的切换到标记时的状态

- 列出已有标签 ：`git tag`

- 查看标签信息 ：`git show <标签名>`

- 创建标签 ：`git tag <标签名>`

- 推送标签 ：`git push origin <标签名>`

- 删除标签 ：

  - 删除本地标签 ：`git tag -d <标签名>`
  
  - 删除远程标签 ：`git push origin :refs/tags/<标签名>`
