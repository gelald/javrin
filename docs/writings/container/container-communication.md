---
title: Docker容器通信
icon: article
category:

- 问题解决
- 容器技术

tag:

- Docker
- 网络

---

# 如何让Docker容器之间进行相互访问

## 问题引入

之前在找 Redis 好看的 GUI ，发现了 Redis 自家的 WebGUI「RedisInsight」还支持 Docker 部署 (1.11.1版本)，打算使用 Docker
Compose 来启动 Redis 和 RedisInsight


> 最近「RedisInsight」2.x版本的桌面客户端已经推出了，可以看这篇文章了解
> 👉[颜值爆表！Redis官方可视化工具来啦，功能真心强大！](https://juejin.cn/post/7072537112834211847)



我们进入正题

因为我喜欢用 docker compose 来运行容器，所以这次问题也由我的两份 docker-compose.yaml 文件开始

> 左边是 RedisInsight，右边是 Redis 的完全体—— RedisMod

| redismod容器                                                 | redisinsight容器                                             |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220916153156.png) | ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220916153251.png) |



启动后，进入 RedisInsight 打算连接本地的 Redis，发现无法使用 127.0.0.1:6379 连接 Redis。

因为虽然宿主机可以通过 127.0.0.1:6379 连接 Redis，因为 Redis 容器通过端口映射的方式把 6379 端口映射到宿主机上；但是对于 RedisInsight 容器来说，是无法通过 127.0.0.1 这个网络连接的，因为 Redis 不是在 RedisInsight 容器内启动，而且端口也不是向它映射，需要拿到 Redis 容器的 IP 地址才能正确连接。通过 docker inspect 容器id 可以看到两个容器的 IP地址：

| redismod容器IP地址                                           | redisinsight容器IP地址                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220915174403.png) | ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220915174151.png) |



虽然可以使用宿主机的 IP 地址进行连接，但是 IP 地址不能保证不变，写一个固定的值也不灵活。那有没有什么办法可以让两个容器互相连通互相访问的同时还保持一定的灵活性呢？答案自然是有的。



## 前置知识

> 先回顾一下 Docker 的网卡

### Docker 网卡介绍

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220517230048.png)

- bridge：默认网卡，类似于 VMware 的 NAT 模式，如果需要访问容器内部的端口需要进行端口映射。
- host：直接使用主机网络，类似于 VMware 的桥接模式，访问容器内部的端口时不需要进行端口映射，直接访问即可，但是可能会与主机的端口号冲突。
- none：禁止所有联网，没有网络驱动。



### 自定义网络

使用 `docker network create custom-local-net` 创建一个名为 custom-local-net 的 Docker 网卡，**这个网卡是基于 bridge 模式的**，但是和 bridge 模式又有一定的区别。

这个问题官方给出了解释：

> **User-defined bridges provide automatic DNS resolution between containers**.
> Containers on the default bridge network can only access each other by IP addresses, unless you use the --link option, which is considered legacy. On a user-defined bridge network, containers can resolve each other by name or alias.

这一段话官方给出了不少的信息量：

1. 用户自定义的网络是基于 bridge 的，并且**容器间可以通过容器名或别名进行自动 DNS 相互解析的功能**！
2. 使用默认的 bridge 网络仅仅能通过各自的 IP 地址来进行通信，**除非使用 `--link` 选项**
3. **`--link` 选项**实现的容器相互访问功能已经被官方认定**是过时的**

由第 1 点可以得知，使用自定义网络就能实现容器间相互通信的功能！



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

使用 `--link` 中指定的 `redismod` 即可映射到 redismod 的容器网络中。

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220915175803.png)

然后在 Host 处填写 [redismod] 就可以自动解析为 redismod 容器的 IP 地址。

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220517233054.png)

![image-20220517233113573](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/image-20220517233113573.png)

可以看到是连接成功的



### 使用同一份 docker-compose.yaml 文件

相比使用 docker run 命令启动容器，显然 docker compose 才是**更为推荐**的那一个方式，把启动所需的镜像、环境等全都写到一份 docker-compose.yaml 文件中，方便使用。

如果使用 docker compose 的方式，就是把两个容器的启动信息都**写到同一份文件中**，再在需要依赖另一个容器的容器启动信息中加入 depends_on、links 参数，这样 redisinsight 也可以使用 redismod 解析到其容器的 IP地址，得到的结果和上面使用 docker run 的方式得到的结果是一样的。

```yaml
version: '3'
services:
  redismod:
    image: redislabs/redismod:latest
    ports:
      - 6379:6379
    volumes:
      - /redismod/data:/data

  redisinsight:
    image: redislabs/redisinsight:latest
    ports:
      - 8001:8001
    volumes:
      - /redisinsight/db:/db
```



### docker run 使用自定义网络

在上面我们简单地介绍了一下如何自定义网络，并且知道使用 `link` 参数的方式已经是过时的，那通过自定义网络，让 Redis 容器和 RedisInsight 容器处于同一个网络，并且他们可以互相进行 DNS 解析，就可以让 RedisInsight 访问到 Redis 容器了。

另外，docker run 命令也可以手动指定容器连接的网络，使用 `network` 参数。

- 自定义网络 custom-local-net 

  ```bash
  docker network create custom-local-net
  ```

  

- 启动 redismod 容器

  ```bash
  docker run --rm --name redismod -p 6379:6379 -v /redismod/data:/data --network custom-local-net -d redislabs/redismod:latest
  ```

  

- 启动 redisinsight 容器

  ```bash
  docker run --rm --name redisinsight -p 8001:8001 -v /redisinsight/db:/db --network custom-local-net -d redislabs/redisinsight:latest
  ```



进入 redisinsight 容器中 ping redismod 发现是能 ping 通的，在控制台中自然也能通过 redismod 作为 host 来连接 redis 数据库。

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220916145505.png)



### docker compose 使用自定义网络

使用同一份 docker-compose.yaml 文件的方法虽然可行，但是还存在一定的局限性，假如需要链接一个使用 docker run 运行的容器，又怎么样实现互相访问呢？或者如果是这个需要容器本就处于一个已创建的自定义网络呢？

另外使用 docker run 能指定自定义网络，docker compose 自然也是可以的，通过 `networks` 指令。custom-local-net 网络已经被创建了，所以在 docker-compose.yaml 文件中直接指定即可。



其中在 docker-compose.yaml 文件中有两种使用自定义网络的方式：

- 创建并使用，如果没有手动使用 `docker network create` 命令，需要在使用前创建

  ```yaml
  version: '3'
  services:
    redisinsight-local-net:
      image: redislabs/redisinsight:latest
      ports:
        - 8001:8001
      volumes:
        - /redisinsight/db:/db
      networks:
        - custom-local-net-2
  
    redismod-local-net:
      image: redislabs/redismod:latest
      ports:
        - 6379:6379
      volumes:
        - /redismod/data:/data
      networks:
        - custom-local-net-2
  
  
  networks:
    custom-local-net-2:
      # 声明使用的网络是使用 bridge 驱动来创建的
      driver: bridge
      ipam:
        # 网络配置
        config:
          # 分配的子网网段
          - subnet: 172.25.64.0/18
          # 网关地址
            gateway: 172.25.64.1
  
  ```

  

- 声明并使用，如果已经手动创建了网络，在 docker-compose.yaml 文件中只需声明一下即可

  ```yaml
  version: '3'
  services:
    redisinsight-local-net:
      image: redislabs/redisinsight:latest
      ports:
        - 8001:8001
      volumes:
        - /redisinsight/db:/db
      networks:
        - custom-local-net
  
    redismod-local-net:
      image: redislabs/redismod:latest
      ports:
        - 6379:6379
      volumes:
        - /redismod/data:/data
      networks:
        - custom-local-net
  
  
  networks:
    custom-local-net:
    	# 声明这个网络是外部定义的
      external: true
  ```



![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220519223001.png)

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220519223021.png)

最终也是实现了访问 redismod 的网络



## 总结

Docker 容器之间相互访问是实际生产中难以绕开的一道坎，诚然可以使用桥接模式，但是桥接模式不太利于环境的迁移。显然使用能自动完成 DNS 解析的网络模式会更为灵活，也更为优雅。



参考资料

[【Docker系列】Docker Compose 网络_小叶柏杉的博客-CSDN博客_docker-compose 网络模式](https://blog.csdn.net/weixin_48447848/article/details/122631699)
