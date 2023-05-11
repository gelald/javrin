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

# 修改 Docker 默认存储路径

## 问题引入

今天在服务器(操作系统: CentOS)上创建新容器的时候看到容器创建失败，并提示磁盘空间不足。

输入查询磁盘空间命令后发现，`/` 目录只分配了50G空间，而 `/home` 目录却分配了198G空间。

而 Docker 默认的存储路径是 `/var/lib/docker` ，是在 `/` 目录下的，在不修改操作系统磁盘挂载的前提下，想要 Docker
能正常使用、创建容器，我们需要把 Docker 默认存储路径修改到 `/home` 目录下。



## 修改方法一

直接修改 docker 的启动参数

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



如果 `Docker` 的版本是 `1.12` 或以上的，可以修改或新建 `daemon.json` 文件。修改后会立即生效，不需重启 `Docker` 服务。

```bash
# 修改配置文件
vi /etc/docker/daemon.json


{
    "graph": "/new-path/docker"
}
```



## 修改方法二

不修改启动参数，创建目录的软链接，存放目录依旧是那个，但是实际存放目录已经被修改了

- 我们知道在操作系统当中，默认情况下 `Docker` 容器的存放位置在 `/var/lib/docker` 目录下面，可以通过下面命令查看具体位置。

  ```bash
  docker info | grep Dir
  
  Docker Root Dir: /var/lib/docker
  ```

  

- 解决默认存储容量不足的情况，最直接且最有效的方法就是挂载新的分区到该目录。但是在原有系统空间不变的情况下，所以采用软链接的方式，修改镜像和容器的存放路径达到同样的目的。

  

- 停掉 Docker 服务

  ```bash
  systemctl stop docker
  ```

  

- 然后移动整个 `/var/lib/docker` 目录到空间不较大的目的路径。这时候启动 `Docker` 时发现存储目录依旧是 `/var/lib/docker` 目录，但是实际上是存储在数据盘 `/data/docker` 上了。

  ```bash
  # 移动原有的内容
  mv /var/lib/docker /home/docker
  
  # 创建链接
  ln -sf /home/docker /var/lib/docker
  ```



接下来 Docker 服务运行过程中的镜像、容器全都存储到空间更大的 `/home` 目录下了，又可以愉快地创建容器了😉



参考链接：https://huaweicloud.csdn.net/6331127bd3efff3090b513db.html