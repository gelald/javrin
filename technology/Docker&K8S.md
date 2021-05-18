**Docker**

- build，ship and run：搭建、发送、运行
- build once， run anywher：搭建一次，到处能用
- 镜像(Image)
- 容器(Container)
- 仓库(Repository)



**Kubernetes**

- 一个K8S系统，通常称为一个K8S集群(Cluster)
- 一个Master节点(主节点)
- 一群Node节点(计算节点)



|        | Write Once Run Anywhere | 模板        | 对象            |
| ------ | ----------------------- | ----------- | --------------- |
| Java   | JVM                     | Class       | Object          |
| Docker | Docker Engine           | Image(镜像) | Container(容器) |

## 容器化技术

运行的应用及其包含的所有资源，都可以称之为一个**Container**

**Docker部署方式**

在不同的操作系统中，Docker Engine实现了Docker跨平台的特性

每一个APP就是一个根据Image创建出来的Container，都是运行在Docker Engine之上

![img](https://gitee.com/ngyb/pic/raw/master/007S8ZIlgy1ggcrlngnsij30xa0ql3z4.jpg)

**虚拟机部署方式**

Hypervisor虚拟化技术，通常可以使用VMware来作为实现。

在VMware中安装各自的操作系统，然后运行应用

![img](https://gitee.com/ngyb/pic/raw/master/007S8ZIlgy1ggcrm3v2mdj30xa0qldiv.jpg)

Container：代码和依赖的集合

Image：Container的模板，运行时会变成Container

### 虚拟化技术与容器化技术

虚拟化技术会有操作系统的支持，OS一启动会向物理机申请很多的资源，Docker的话Container需要多少，就申请多少（动态分配）

结合：虚拟机+Docker![image-20200702230121622](https://gitee.com/ngyb/pic/raw/master/007S8ZIlgy1ggd0wdnzkyj319o0u0tew.jpg)



docker pull 拉取镜像

docker images 查看本地镜像

docker run --name 容器名 镜像名 运行镜像   `-it --rm -dp`

docker ps -a 查看当前运行的container 

docker build -t `wuyb/cheers2019` . 构建镜像， 中间的是镜像的名字

docker push --name 推送镜像到hub.docker



**镜像**：镜像相当于**一个root文件系统**

**容器**：镜像和容器的关系，就像面向对象中的类和对象的关系，**镜像是静态的定义，容器是镜像运行时的实体**。容器可以被创建、启动、停止、删除等

**仓库**：仓库是一个保存镜像的地方

# Docker命令

**centos8为例子**

## 服务相关命令（daemon）

**查看docker服务状态**：`systemctl status docker`

**启动docker服务**：`systemctl start docker`

**停止docker服务**：`systemctl stop docker`

**重启docker服务**：`systemctl restart docker`

**开机启动docker**：`systemctl enable docker`

## 镜像相关命令（image）

**查看镜像**：`docker images`

**搜索镜像**：`docker search <镜像名称>`

**拉取镜像**：`docker pull <镜像名称>:<版本号>`，版本号不填默认是latest 

**删除镜像**：`docker rmi <镜像id>`

## 容器相关命令（container）

**创建容器**：`docker run`

- -i：保持容器运行
- -t：为容器分配一个伪输入终端，创建完成后自动进入容器，执行退出后会关闭容器
- -d：以守护模式（后台）运行、创建容器，创建完后不会自动进入容器，且进入后执行退出不会关闭容器
- -it创建的容器一般称为交互式容器，-id创建的容器一般称为守护式容器
- --name：为容器起名字

---

`docker run -it --name=c1 centos:7 /bin/bash`

`centos:7`代表镜像

`/bin/bash`代表进入容器初始化指令

---

**查看正在运行的容器**：`docker ps`

**查看所有容器**：`docker ps -a`

**进入容器**：`docker exec`

如果创建容器时使用后台创建的方式，需要使用这种方式进入容器

---

`docker exec -it c2 /bin/bash`

`c2`代表需要进入的容器

`/bin/bahs`代表进入容器初始化指令

---

**停止容器**：`docker stop <容器名称>`

**删除容器**：`docker rm <容器id>或<容器名称>`

**查看容器信息**：`docker inspect <容器名称>`

# Docker数据卷

**数据卷**是**宿主机**中的一个目录或文件

当容器目录和数据卷目录绑定后，对方的**修改会立即同步**

一个数据卷可以**被多个容器同时挂载**

一个容器可以**挂载多个数据卷**

## 数据卷作用

- 容器数据**持久化**
- 外部机器和容器**间接通信**
- 容器之间**数据交换**

## 配置数据卷

`docker run ... -v 宿主机目录:容器内目录`

- 两个目录都必须是**绝对路径**
- 如果目录不存在，都**会自动创建**
- 可以挂载多个数据卷，写多个-v即可

## 数据卷容器

多容器进行数据交换的手段

- 多个容器挂载同一个数据卷
- 数据卷容器

![](https://gitee.com/ngyb/pic/raw/master/20210518162256.png)

c3容器挂载一个数据卷，c1、c2分别挂载到c3容器上

1. 创建启动c3数据卷容器，使用-v参数 设置数据卷

   ```bash
   docker run -it --name=c3 -v /volume centos:7 /bin/bash
   ```

   `/volume`是容器目录，docker会默认在宿主机上分配一个目录，可以通过`docker inspect`来查看

2. 创建启动c1、c2容器，使用--volumes-from参数 设置数据卷

   ```bash
   docker run -it --name=c1 --volumes-from c3 centos:7 /bin/bash
   docker run -it --name=c2 --volumes-from c3 centos:7 /bin/bash
   ```

   创建后，c1、c2容器中都有一个名叫`/volume`的目录

   通过`docker inspect`命令可以看到**c1、c2宿主机的数据卷和c3默认分配的目录是同一个目录**，所以**即使c3容器挂了，也不会影响c1、c2容器的正常使用**的，因为最终是指向了同一个宿主机的目录

# Dockerfile
