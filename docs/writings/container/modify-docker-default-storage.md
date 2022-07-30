---
title: 修改Docker默认存储路径
icon: article
category:

- 问题解决
- 容器技术

tag:

- Docker
- Linux

---

# 修改Docker默认存储路径

## 问题引入

今天在服务器(操作系统: CentOS)上创建新容器的时候看到容器创建失败，并提示磁盘空间不足。

输入查询磁盘空间命令后发现，`/` 目录只分配了50G空间，而 `/home` 目录却分配了198G空间。

而 Docker 默认的存储路径是 `/var/lib/docker` ，是在 `/` 目录下的，在不修改操作系统磁盘挂载的前提下，想要 Docker
能正常使用、创建容器，我们需要把 Docker 默认存储路径修改到 `/home` 目录下。

## 修改存储路径

- 暂时停止 Docker 服务

  ```bash
  systemctl stop docker
  ```

- 保险起见，再次确认 Docker 的存储路径

  ```bash
  docker info | grep Dir
  
  Docker Root Dir: /var/lib/docker              # docker默认的存储路径
  ```

- 在 `/home` 目录下新建存储目录

  ```bash
  mkdir -p /home/docker
  ```

- 迁移原有数据到新目录

  ```bash
  mv /var/lib/docker/* /home/docker
  ```

- 修改 docker.service 配置文件

  ```bash
  vi /usr/lib/systemd/system/docker.service
  ```

  找到这一行

  `ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock`

  修改如下

  `ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock --graph /home/docker`

- 使这份配置文件生效

  ```bash
  systemctl daemon-reload
  ```

- 启动 Docker 服务

  ```bash
  systemctl start docker
  ```

- 查看是否修改成功

  ```bash
  docker info | grep Dir
  
  Docker Root Dir: /home/docker
  ```

接下来 Docker 服务运行过程中的镜像、容器全都存储到空间更大的 `/home` 目录下了，又可以愉快地创建容器了😉