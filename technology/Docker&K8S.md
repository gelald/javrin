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

![img](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggcrlngnsij30xa0ql3z4.jpg)

**虚拟机部署方式**

Hypervisor虚拟化技术，通常可以使用VMware来作为实现。

在VMware中安装各自的操作系统，然后运行应用

![img](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggcrm3v2mdj30xa0qldiv.jpg)

Container：代码和依赖的集合

Image：Container的模板，运行时会变成Container

### 虚拟化技术与容器化技术

虚拟化技术会有操作系统的支持，OS一启动会向物理机申请很多的资源，Docker的话Container需要多少，就申请多少（动态分配）

结合：虚拟机+Docker![image-20200702230121622](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggd0wdnzkyj319o0u0tew.jpg)



docker pull 拉取镜像

docker images 查看本地镜像

docker run --name 容器名 镜像名 运行镜像   `-it --rm -dp`

docker ps -a 查看当前运行的container 

docker build -t `wuyb/cheers2019` . 构建镜像， 中间的是镜像的名字

docker push --name 推送镜像到hub.docker

