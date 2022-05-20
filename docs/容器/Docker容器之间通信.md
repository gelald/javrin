# Docker容器之间相互访问

## 问题引入

最近在找 Redis 好看的 GUI ，发现了 Redis 自家的 GUI「RedisInsight」还支持 Docker 部署（1.11.1版本），打算使用 Docker Compose 来启动 Redis 和 RedisInsight



这是我的两份 docker-compose.yaml 文件

> 左边是 RedisInsight，右边是 Redis 的完全体—— RedisMod

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220519204620.png)

启动后，进入 RedisInsight 打算连接本地的 Redis，发现怎么连接都连接不上，后面判断是网络的问题。

> 因为虽然本机可以通过 127.0.0.1:6379 连接 Redis，但是对于 RedisInsight 容器来说，是无法通过 127.0.0.1 这个网络连接的，因为他们处于的网络是不一样的。
>
> 因为本机、RedisMod容器、RedisInsight容器可以看成是局域网内的三个上网设备，所以也就**无法直接互相连通**
>
> 虽然可以使用本机的 IP 地址进行连接，但是 IP 地址不能保证不变，写一个固定的值也不灵活。



那有没有什么办法可以让两个容器互相连通互相访问的同时还保持一定的灵活性呢？答案自然是有的



## 解决方案

### docker run 使用 link 参数

在不使用 Docker Compose 的时候，在启动命令中加入 `--link` 参数，就可以实现容器之间的访问

- 启动 redismod 容器

  ```bash
  docker run --rm --name redismod -p 6379:6379 -v /data/:/data -d redislabs/redismod:latest
  ```

- 启动 redisinsight容器

  ```bash
  docker run --rm --name redisinsight -p 8001:8001 -v /db:/db --link redismod -d redislabs/redisinsight:latest
  ```

使用 `--link` 中指定的 `redismod` 即可映射到 redismod 的容器网络中

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220517233054.png)

![image-20220517233113573](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/image-20220517233113573.png)

可以看到是连接成功的



### docker compose 同一份 docker-compose.yaml 文件

相比使用 docker run 命令启动容器，显然 docker compose 才是更为推荐的那一个方式，把启动所需的镜像、环境等全都写到一份 docker-compose.yaml 文件中，方便使用。

如果使用 docker compose 的方式，就是把两个容器的启动信息都**写到同一份文件中**，再在需要依赖另一个容器的容器启动信息中加入 depends_on、links 参数，这样得到的结果和上面使用 docker run 的方式得到的结果是一样的

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220519214933.png)



### docker compose 连接同一个网络

上述同一份 docker-compose.yaml 文件的方法虽然可行，但是存在一定的局限性，假如需要链接一个使用 docker run 运行的容器，又怎么样实现互相访问呢？

这时，我们可以让两个容器都连接着同一个网络，那么这两个容器就相当于是这个网络下的两个上网设备，也就可以实现互通了

> 先回顾一下 Docker 的网卡

#### Docker 网卡介绍

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220517230048.png)

- bridge：默认网卡，类似于 VMware 的 NAT 模式，如果需要访问容器内部的端口需要进行端口映射
- host：直接使用主机网络，类似于 VMware 的桥接模式，访问容器内部的端口时不需要进行端口映射，直接访问即可，但是可能会与主机的端口号冲突
- none：禁止所有联网，没有网络驱动



#### 自定义网络

使用 `docker network create custom-local-net` 创建一个名为 `custom-local-net` 的 Docker 网卡，**默认是 bridge 模式的**，但是和 bridge 模式又有一定的区别

这个问题官方给出了解释：

> **User-defined bridges provide automatic DNS resolution between containers**.
> Containers on the default bridge network can only access each other by IP addresses, unless you use the --link option, which is considered legacy. On a user-defined bridge network, containers can resolve each other by name or alias.

这一段话官方给出了不少的信息量：

1. 用户自定义的网络是基于 bridge 的，并且**容器间可以通过容器名或别名进行自动 DNS 相互解析的功能**！
2. 使用默认的 bridge 网络仅仅能通过各自的 IP 地址来进行通信，**除非使用 `--link` 选项**
3. **`--link` 选项**实现的容器相互访问功能已经被官方认定**是过时的**

由 1. 可以得知，使用自定义网络就能实现容器间相互通信的功能！



#### 实现

铺垫了这么多，该到实践阶段了

`custom-local-net` 已经被创建了，所以在 docker-compose.yaml 文件中直接指定即可

为了区别于上面的现象，对服务名进行一定的修改

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220519222223.png)

其中在 docker-compose.yaml 文件中使用外部网络需要声明/创建

- 创建并使用，如果没有手动使用 `docker network create` 命令，需要在使用前创建

  ```yaml
  services:
  	xxx:
  		networks:
  			- new_net
  networks:
  	new_net:
  		# 声明使用的网络是使用 bridge 驱动来创建的
  		driver: bridge
  ```

  

- 声明并使用，如果在外面已经手动创建了网络，在 docker-compose.yaml 文件中只需声明一下即可

  ```yaml
  services:
  	xxx:
  		networks:
  			- created_net
  networks:
  	created_net:
  		# 声明使用的网络是外部创建的
  		external: true
  ```

  

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220519223001.png)

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220519223021.png)

最终也是实现了访问 redismod 的网络

