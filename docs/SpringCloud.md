# 组件篇

## Spring Cloud Netflix核心组件

### Eureka

**关键：注册表**

当调用其他服务时，Eureka Client组件会找Eureka Server咨询：需要使用的服务的信息（IP地址、端口号），然后就可以把这些相关信息从Eureka Server的注册表中拉取到自己**本地缓存起来**。

![img](https://gitee.com/ngwingbun/picgo-image/raw/master/images/007S8ZIlgy1ggaenolne2j30kp07kju0.jpg)

- Eureka Client：当服务启动时，负责将这个服务的信息注册到Eureka Server中；反过来，可以从Eureka Server拉取注册表，从而知道其他服务所在位置
- Eureka Server：注册中心，里面有一个注册表，保存了各个服务所在的IP地址和端口号

### Feign

**关键：动态代理**

![img](https://gitee.com/ngwingbun/picgo-image/raw/master/images/007S8ZIlgy1ggaenyintlj30in070q4d.jpg)

- 如果对某个接口定义了`@FeignClient`注解，Feign就会针对这个接口创建一个动态代理
- 接着调用那个接口，本质就是会调用 Feign创建的**动态代理**，这是核心中的核心
- Feign的动态代理会根据你在接口上的`@RequestMapping`等注解，来动态**构造出你要请求的服务的地址**
- 最后针对这个地址，发起请求、解析响应

### Ribbon

**关键：负载均衡**

如果被调用的服务部署在5台机器上做了集群，那么Ribbon会帮忙解决机器选择的问题，它的作用是负载均衡，会帮你在每次请求时选择一台机器，**均匀的把请求分发到各个机器上**

---

**默认负载均衡算法：轮询**

简单来说，就是如果订单服务对库存服务发起10次请求，那就先让你请求第1台机器、然后是第2台机器、第3台机器、第4台机器、第5台机器，接着再来—个循环，第1台机器、第2台机器。。。以此类推。

---

工作流程：

1. 首先Ribbon会从 Eureka Client里已缓存的服务注册表获取到对应的服务信息，也就知道了所有的服务都部署在了哪些机器上，在监听哪些端口号。
2. 然后Ribbon就可以使用默认的Round Robin算法，从中选择一台机器
3. Feign就会针对这台机器，构造并发起请求

![img](https://gitee.com/ngwingbun/picgo-image/raw/master/images/007S8ZIlgy1ggaezdxtn0j30kr08640v.jpg)

### Zuul

**关键：统一网关**

工作：负责网络路由。目的是让前端不用去关系后端各个服务的地址，前端在调用后端服务时只需知道网关的地址，然后网关会根据请求的一些特征(url等)，转发给后端的各个服务。

此外还可以做一些统一的操作，如：限流、认证授权等

### Hystrix

关键：**服务隔离、熔断、降级**

场景：如果系统处于高并发的场景下，且B服务的响应速度较慢，大量请求涌过来的时候，A服务的100个线程都会卡在B积分服务这块。导致A服务没有一个线程可以处理请求。然后就会导致用户请求A服务的时候，发现A服务也挂了，不响应任何请求了。这就是微服务架构中恐怖的服务雪崩问题。

![img](https://gitee.com/ngwingbun/picgo-image/raw/master/images/007S8ZIlgy1ggaf40ad3bj30js0d1t9z.jpg)

**Hystrix是隔离、熔断以及降级的一个框架**。说白了，**Hystrix会为不同服务构建一个独立的线程池仅供它使用**，比如订单服务请求库存服务是一个线程池，请求仓储服务是一个线程池，请求积分服务是一个线程池。**每个线程池里的线程就仅仅用于请求那个服务。**

打个比方：现在很不幸，积分服务挂了，会导致订单服务里的那个用来调用积分服务的线程都卡死不能工作了！但是由于订单服务调用库存服务、仓储服务的这两个线程池都是正常工作的，**所以这两个服务不会受到任何影响**。

---

服务熔断：如果一个服务调用后返回结果的时间较长，那么可以选择在一定时间内请求积分服务直接就返回了（不执行具体逻辑），不去走网络请求卡住几秒钟，过段时间后恢复正常。

服务降级：每次调用积分服务，就在数据库里记录一条消息，说给某某用户增加了多少积分，因为积分服务挂了，导致没增加成功！这样等积分服务恢复了，可以根据这些记录手工加一下积分。这个过程，就是所谓的降级。通常和熔断一起使用

---

Hystrix隔离、熔断、降级的全流程：

![img](https://gitee.com/ngwingbun/picgo-image/raw/master/images/007S8ZIlgy1ggaf97a437j30kf0eaadz.jpg)

### Hystrix Dashboard

自身服务的监控面板

### Turbine

Hystrix Dashboard智能监控自己服务，这个可以将多个服务的信息汇总到一起来监控

### 总结

![img](https://gitee.com/ngwingbun/picgo-image/raw/master/images/007S8ZIlgy1ggafj3fxpkj30ks0ajgo9.jpg)

## Spring Cloud Alibaba核心组件

Spring Cloud Alibaba和Spring Cloud Netflix相比的优势在于：这套组件经历过数次双11的考验，处理高并发的能力比较好

Sentinel

Nacos

Seate

Dubbo



## 注册中心组件

本质：解耦服务提供者与服务消费者；更进一步，为了支持弹性扩容缩容特性，因为服务的数目和分布往往是动态确定的



### 注册中心的引入

随着单体应用拆分，首当面临的第一份挑战就是服务实例的数量较多，并且服务自身对外暴露的访问地址也具有动态性。可能因为服务扩容、服务的失败和更新等因素，导致服务实例的运行时状态（地址）经常变化。如果把服务地址写到配置类中则需要重启系统，如果写到配置文件中则需要频繁变更



### CAP理论

- 一致性(**C**onsistency)：所有节点在同一时间具有相同的数据
- 可用性(**A**vailability)：保证每个请求不管成功或者失败都有响应；即如果服务宕机，不影响系统接受或发出请求的行为。
- 分隔容忍(**P**artition tolerance)：系统中任意信息的丢失或失败不会影响系统的继续运作；即系统中某个部分宕机了，并不影响整个系统的正常运作。

此外，**CAP不可兼得**。原因：

1. 如果C是第一需求的话，那么会影响A的性能，**因为要数据同步，不然请求结果会有差异，但是数据同步会消耗时间，期间可用性就会降低。**
2. 如果A是第一需求，那么只要有一个服务在，就能正常接受请求，但是对于返回结果不能保证，原因是，**在分布式部署的时候，数据一致的过程不可能像切换线路那么快。**
3. 再如果，同时满足一致性和可用性，那么分区容错就很难保证了，也就是单点，也是分布式的基本核心



### 负载均衡

负载均衡的实现方式有两种

1. 服务端的负载均衡，给服务提供者更强的流量控制权，但是无法满足不同的消费者希望使用不同负载均衡策略的需求。服务端负载均衡的经典代表是`Nginx`
2. 客户端的负载均衡，提供了不同消费者使用不同负载均衡策略的需求，对用户扩展提供更好的支持，但是如果设置不当可能导致获取不到任何服务提供者。客户端负载均衡的经典代表是`Ribbon`



### 考虑

1. 服务注册，每一个新启动的服务都需要注册到注册中心中
2. 服务发现：针对同一个服务，即使注册中心的**不同节点保存的服务提供者信息不尽相同，也并不会造成灾难性的后果。**
3. 服务消费：**能消费才是最重要的**，消费者虽然拿到可能不正确的服务实例信息后尝试消费一下，也要胜过因为无法获取实例信息而不去消费，导致系统异常要好（淘宝的双十一，京东的618就是紧遵AP的最好参照）。
4. 服务测活，测活保证服务的可用性
5. 负载均衡，多个服务提供者，如何均衡各个提供者的负载
6. 集成，服务提供者或消费者集成注册中心的问题
7. 运行时依赖，引入注册中心后，对应用的运行时环境的影响
8. 可用性，保证这侧中心本身的可用性，特别是消除单点故障
9. 服务变更：服务消费者如何及时知道服务的生产者如何及时变更的
   1. **发布订阅模式**：服务消费者能够实时监控服务更新状态，通常采用监听器以及回调机制，例子：`Zookeeper`
   2. **主动拉取策略**：服务消费者定期调用注册中心提供的服务获取接口获取最新的服务列表并更新本地缓存，例子：`Eureka`




### 总览

|                      | Nacos                           | Eureka      | Zookeeper  | Consul            | CoreDNS    |
| -------------------- | ------------------------------- | ----------- | ---------- | ----------------- | ---------- |
| 一致性协议（关注点） | CP+AP                           | AP          | CP         | CP                | -          |
| 健康检查             | TCP/HTTP<br />MySQL/Client Beat | Client Beat | Keep Alive | TCP/HTTP/gRPC/Cmd | -          |
| 负载均衡策略         | 权重/metadata/Selector          | Ribbon      | -          | Fabio             | RoundRobin |
| 雪崩保护             | 有                              | 有          | 无         | 无                | 无         |
| 自动注销实例         | 支持                            | 支持        | 支持       | 不支持            | 不支持     |
| 访问协议             | HTTP/DNS                        | HTTP        | TCP        | HTTP/DNS          | DNS        |
| 监听支持             | 支持                            | 支持        | 支持       | 支持              | 不支持     |
| 多数据中心           | 支持                            | 支持        | 不支持     | 支持              | 不支持     |
| 跨注册中心同步       | 支持                            | 不支持      | 不支持     | 支持              | 不支持     |
| SpringCloud集成      | 支持                            | 支持        | 支持       | 支持              | 不支持     |
| Dubbo集成            | 支持                            | 不支持      | 支持       | 不支持            | 不支持     |
| K8S集成              | 支持                            | 不支持      | 不支持     | 支持              | 支持       |



### Apache ZooKeeper

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20211117184241.png)

`ZooKeeper` 遵循CP原则，任何时候对 `ZooKeeper` 的访问请求能得到一致的数据结果，同时系统对网络分割具备容错性，但是 `ZooKeeper` 不能保证每次服务请求都是可达的

`ZooKeeper` 集群中 `master` 节点宕机了或者因为网络原因与其他节点失去联系时，就要进行 `Leader` 的选举，**这个选举时间太长，一般是30-120秒，这段时间无法处理请求导致选举期间注册服务瘫痪**，在云部署环境下，因为网络问题使得 `ZooKeeper` 集群失去 `master` 节点是大概率事件，**虽然服务能最终恢复，但是漫长的选举事件导致注册长期不可用是不能容忍的**，所以不能保证服务可用性（A）

#### 角色

- `Leader`：一个 `ZooKeeper` 集群同一时间内只会有一个实际工作的 `Leader`，它会发起并维护与各个 `Follower` 和 `Observer` 间的心跳。所有的写操作必须通过 `Leader` 完成再由 `Leader` 将写操作广播给其他服务器
- `Follower`：一个 `ZooKeeper` 集群同一时间内可能存在多个 `Follower` ，它会响应 `Leader` 的心跳。`Follower` 可以直接处理并返回客户端的读请求，同时会把写请求转发给 `Leader` 处理，并且负责在 `Leader` 处理写请求时对请求进行投票
- `Observer`：与 `Follower` 角色类似，但是没有投票权

#### 节点

- `PERSISTENT` - 持久节点：客户端与 `ZooKeeper` 断开连接后，该节点依旧存在，只能手动删除
- `PERSISTENT_SEQUENTIAL` - 持久顺序节点：和 `PERSISTENT` 节点相同，增加了顺序属性，节点名后会追加一个由父节点维护的自增整型数字
- `EPHEMERAL` - 临时节点：生命周期和会话绑定，一旦客户端与 `ZooKeeper` 断开连接，该节点就会被删除
- `EPHEMERAL_SEQUENTIAL` -临时顺序节点：和 `EPHEMERAL` 节点相同，增加了顺序属性

#### Watch机制

- 推：一旦服务端感知主题变化了，那么只会发送一个事件类型和节点信息给关注的客户端，而不会包括具体的变更内容
- 拉：收到变更通知的客户端需要自己去拉具体变更的数据



### Spring Cloud Netflix Eureka

![img](https://gitee.com/ngwingbun/picgo-image/raw/master/images/007S8ZIlgy1ggp754cvvtj30m80azwg8.jpg)

`Eureka` 遵循AP原则，`Eureka Server` 解决单点的问题是建立多个对等的实例，去中心化，使用彼此相互注册的方式提高可用性，虽然节点的数据不一定完全一致，但是能保证每一个节点都能正常提供服务

- 当一个新的 `Eureka Server` 节点启动后，会首先尝试从邻近节点获取所有注册列表信息，并完成初始化。`Eureka Server` 通过 `getEurekaServiceUrls()` 方法获取所有的节点，并且会通过**心跳契约**的方式定期更新
- 在集群环境中如果某台 `Eureka Server` 宕机，`Eureka Client` 的请求会自动切换到新的 `Eureka Server` 节点上，当宕机的服务器重新恢复后，`Eureka` 会再次将其纳入到服务器集群管理之中。当节点开始接受客户端请求时，所有的操作都会在节点间进行复制（Replicate To Peer）操作，将请求复制到该 `Eureka Server` 当前所知的其它所有节点中
- `Eureka` 的集群中，只要有一台 `Eureka Server` 还在，就能保证注册服务可用（保证可用性），只不过查到的信息可能不是最新的（无法保证一致性）
- `Eureka` 可以很好的应对因网络故障导致部分节点失去联系的情况，有一种**自我保护机制**，而不会像 `ZooKeeper` 一样导致整个注册服务瘫痪。如果在15分钟内超过85%的节点都没有正常的心跳，那么 `Eureka` 就认为客户端与注册中心出现了网络故障，此时会出现以下几种情况：
  - `Eureka` 不再从注册表中移除因为长时间没有收到心跳而过期的服务
  - `Eureka` 仍然能够接受新服务注册和查询请求，但是**不会被同步到其它节点上（即保证当前节点依然可用）**
  - 当网络稳定时，当前实例新注册的信息会被同步到其它节点中



#### Eureka常用配置

```yaml
eureka:
	#eureka客户端配置
	client:
		#是否将自己注册到eureka服务端上去
		register-with-eureka: true
		#是否获取eureka服务端上注册的服务列表
		fetch-registry: true
		#指定注册中心的地址
        service-url:
        	defaultZone: http://localhost:8001/eureka/
        #启用eureka客户端
        enabled: true
        #定义去eureka服务端获取服务列表的时间间隔
        registry-fetch-interval-seconds: 30
  	#eureka服务端配置
	server:
  		#关闭eureka服务端的保护机制
    	enable-self-preservation: false
  	#eureka客户端实例配置
  	instance:
  		#定义服务多久去注册中心续约
    	lease-renewal-interval-in-seconds: 30
    	#定义服务多久不去续约认为服务失效
    	lease-expiration-duration-in-seconds: 90
    	#服务主机名称
    	hostname: localhost
    	#是否优先使用ip来作为主机名
    	prefer-ip-address: false
```

##### 注册中心常用配置

```yaml
eureka:
  	instance:
    	hostname: localhost
  	client:
    	fetch-registry: false
    	register-with-eureka: false
  	server:
    	enable-self-preservation: false
```

##### 服务常用配置

```yaml
eureka:
  	client:
    	serviceUrl:
      		defaultZone: http://localhost:8001/eureka/
    	fetch-registry: true
    	register-with-eureka: true
```



#### 为Eureka注册中心添加认证

##### 添加依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

##### 配置文件

```yaml
server:
  port: 8004
spring:
  application:
    name: eureka-security-server
  #配置SpringSecurity登录用户名和密码
  security:
    user:
      name: root
      password: root
eureka:
  instance:
    hostname: localhost
  client:
    fetch-registry: false
    register-with-eureka: false
```

##### 添加WebSecurityConfig配置

```java
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
      	/*
         *  默认情况下添加SpringSecurity依赖的应用每个请求都需要添加CSRF token才能访问，
         *  Eureka客户端注册时并不会添加，所以需要配置/eureka/**路径不需要CSRF token。
         */
        http.csrf().ignoringAntMatchers("/eureka/**");
        super.configure(http);
    }
}
```

##### 运行服务

进入注册中心时发现需要填写账号密码，填入配置文件中的账号、密码即可进入

##### 服务注册

```yaml
eureka:
	client:
		service-url:
			#填写注册中心地址时需要带上账号密码
			defaultZone: http://${username}:${password}@${hostname}:${port}/eureka/
```



### Spring Cloud Alibaba Nacos

- 除了服务的注册发现之外，还支持动态配置服务。动态配置服务可以让开发者**以中心化、外部化和动态化的方式管理所有环境的应用配置和服务配置**。**动态配置消除了配置变更时重新部署应用和服务的需要，让配置管理变得更加高效和敏捷**。配置中心化管理让实现无状态服务变得更简单，让服务按需弹性扩展变得更容易。
- 一句话概括：Nacos=Spring Cloud注册中心 + Spring Cloud配置中心



### Consul

- 依赖Consul SDK发现服务
- 可以通过Consul Template定时从Consul集群获取最新的服务提供者列表并刷新LoadBalance配置，对于消费者来说只需要配置一个统一的服务调用地址

Consul强一致性带来的是：

1. 服务注册相比Eureka稍慢，因为raft协议规定超过半数的节点都写入成功才算注册成功
2. master节点宕机后，重新选举，导致集群不可用



## 配置中心组件

### Spring Cloud Config

#### 配置为本地配置中心

```yaml
#配置文件在本地
spring:
	profiles:
		active: native
#配置文件的目录
spring:
	cloud:
		config:
			server:
				#配置业务服务获取配置文件时的前缀,非必须
				prefix: /config
				native:
					search-locations: ${configLocation:/config-central}
```

#### 业务服务获取配置文件

```yaml
#由于要获取配置信息,所以必须要用bootstrap.yml,如果有application.yml会无法读取
cloud:
	config:
    	#快速失败响应,一旦无法读取配置文件,直接提示启动失败
    	fail-fast: true
    	#配置中心地址
        uri: http://admin:admin@${config.host:39.108.218.3}:${config.port:8768}/config
        #获取的配置文件名称
        profile: ${spring.profiles.active}
```



## 网关组件

主要起屏蔽下游业务服务的作用，对于浏览器而言，只需要跟网关交互就相当于在与下游多个业务服务节点交互，让浏览器觉得他在和一台服务器交互。可以在网关层做一些最上层的公用的操作，如过**滤恶意请求、设置ip黑白名单、做身份认证、限流、负载均衡**等。

### Zuul(1.x)

- 底层是servlet，处理的是http请求
- 基于同步 IO
- 需要Ribbon、Hystrix配合实现负载均衡，熔断

### Zuul(2.x)

- 基于 Netty Server 实现了异步 IO 来接入请求

### Gateway

- 底层是servlet，但使用了webflux，多嵌套了一层框架
- 提供了异步支持
- 提供了抽象负载均衡，提供了抽象流控

#### Spring Cloud Gateway解决跨域问题



## 负载均衡组件

### Ribbon

#### Ribbon负载均衡策略

- `com.netflix.loadbalancer.RandomRule`：从提供服务的实例中以随机的方式
- `com.netflix.loadbalancer.RoundRobinRule`： 以线性轮询的方式，就是维护一个计数器，从提供服务的实例中按顺序选取，第一次选第一个，第二次选第二个，以此类推，到最后一个以后再从头来过
- `com.netflix.loadbalancer.RetryRule`：在RoundRobinRule的基础上添加重试机制，即在指定的重试时间内，反复使用线性轮询策略来选择可用实例
- `com.netflix.loadbalancer.WeightedResponseTimeRule`：对RoundRobinRule的扩展，响应速度越快的实例选择权重越大，越容易被选择
- `com.netflix.loadbalancer.BestAvailableRule`：选择并发较小的实例
- `com.netflix.loadbalancer.AvailabilityFilteringRule`：先过滤掉故障实例，再选择并发较小的实例
- `com.netflix.loadbalancer.ZoneAwareLoadBalancer`：采用双重过滤，同时过滤不是同一区域的实例和故障实例，选择并发较小的实例



## 服务容错保护组件

### Hystrix



# 常见问题

### Eureka注册中心，服务注销马上被发现的原因

### Eureka注册中心，服务重启不能马上被发现

`一个服务启动后最长可能需要2分钟时间才能被其它服务感知到`

原因：三处缓存+一处延迟

- Eureka对http响应做了缓存，缓存生命周期是**30秒**

  ```java
  //响应客户端查询某个服务信息的HTTP请求
  public Response getApplication(@PathParam("version") String version, @HeaderParam("Accept") String acceptHeader, @HeaderParam("X-Eureka-Accept") String eurekaAccept){
  	...
    //从缓存中拿数据
    String payLoad = this.responseCache.get(cacheKey);
    //get()方法首先会去缓存中查询数据，如果没有则生成数据返回（即真正去查询注册列表），且缓存的有效时间为30s。也就是说，客户端拿到Eureka的响应并不一定是即时的，大部分时候只是缓存信息
    if (payLoad != null) {
      logger.debug("Found: {}", this.appName);
      return Response.ok(payLoad).build();
    } else {
      logger.debug("Not Found: {}", this.appName);
      return Response.status(Status.NOT_FOUND).build();
    }
    ...
  }
  ```

- Eureka Client对已经获取到的注册信息做了缓存。即服务通过eureka客户端第一次查询到可用服务地址后会将结果缓存，下次再调用时就不会真正向Eureka发起HTTP请求了，这个缓存时间是**30秒**

- 负载均衡组件Ribbon也做了缓存。因为Eureka Client调用服务时是根据Ribbon动态选择具体的服务提供者（假设服务提供者有做集群）。Ribbon会从Eureka Client获取服务列表，然后将结果缓存**30秒**。

- 如果不是在Spring Cloud环境下使用这些组件(Eureka, Ribbon)，服务启动后并不会马上向Eureka注册，而是**需要等到第一次发送心跳请求时才会注册**。心跳请求的发送间隔也是**30秒**。（Spring Cloud对此做了修改，服务启动后会马上注册）

---

**另一说法**

- 客户端获取服务实例信息定时任务。客户端在启动的时候会从注册中心**全量获取**所有实例信息，然后启动一个定时任务，定时（**默认的时间是30秒**）从注册中心**差别获取**实例信息。定时任务的执行间隔就导致了服务延迟。

  ```yaml
  eureka:
    client:
      registry-fetch-interval-seconds: 1 #默认30秒
  ```

- 修改这个时间后也不能解决，注册中心也会对实例进行缓存，有二级缓存，参考上面

### Eureka Server节点能否在配置文件里配置自身的Server地址

可以的！当一个Server解析配置的集群地址时，**会过滤掉自身的地址**，这样**服务同步时就不需要同步自身**了。我们配置多个Server时，不需要手动的排除Server自身的发现地址。假设三个注册中心的集群：Server 0,1,2，每个节点可以都加上他们3个的服务发现地址，但他们在实际初始化时，每个Server里**只会生成2个用于数据同步的内置Node**，比如 Server 0 初始化时生成1和2的数据同步Node，类名叫 PeerEurekaNode。

### Eureka Server配置registerWithEureka和fetchRegistry的区别

其实每一个Eureka Server Node都内置了一个Eureka Client，也就是说一个Server Node节点可以接受其他Client的注册，**也可以作为一个Client注册到其他Server上**，被其他Client发现和调用。

**registerWithEureka**和**fetchRegistry**的默认值都是**true**，他们**都是客户端配置**

- **registerWithEureka**：是否要注册到其他Server上。如果我的Server上其实开放了一些Http接口供调用，那么就需要注册，这样其他的Client才能发现我的服务，才能通过RPC调用我提供的Http接口。如果我的Server没有提供对外Http接口，那么这个参数可以设置为false。
- **fetchRegistry**：是否需要拉取服务信息。和是否注册一样，如果我的Server需要调用其他的Client的Http接口，那么就需要获取相应的服务发现信息，这样才能正常的调用。同时这个参数还有一个**重要的作用，就是决定Server在初始化时是否立即全量同步其他节点的服务信息**！！！Server初始化时会先初始化其内置的Client。若配置了fetchRegistry=true，那么Client在初始化时会从其他Server全量拉取服务信息，放进Client容器中。Server在初始化时会尝试同步Client容器里的服务信息，如果fetchRegistry=false，服务信息不存在，**只能被动的等其他Server节点以增量的形式同步过来**(Client在执行注册和心跳时对应的注册Server节点会广播此事件，同步给其他的Server节点。当其他Server节点还没有此服务信息时，改为注册此服务信息)。当然正常的通过心跳来同步，最多也仅需要30S而已，是否需要设置此参数就看各自的需求了。

### Eureka Server节点间的服务信息同步的流程是怎么样的

不同于Zookeeper，每个操作都需要过半数的节点执行成功才返回给Client。

Server在初始化时，会根据配置信息生成与其他的Server同步的客户端。每当Server接收到Client的服务请求时，会先处理请求，然后将自身作为一个Client的角色，用相同的请求信息去请求配置里的那些Server节点。会将同步请求封装成一个Task，然后存入一个Queue中，Server定时的提取Queue里的任务，批量的处理它们。

Server之间的同步只会传播一次，它们通过Header里的一个参数来标识是来自Client的请求还是Server的请求。如果是Server的请求，那么**接收到此请求后不会再进行传播**

### Eureka Server回收服务信息的自我保护机制是什么？要注意什么？

Server每隔60S执行一次服务信息回收，移除那些心跳时间超时的。能够回收有3个前提：

1. 心跳信息超时，回收时间距离上次心跳时间超过90秒
2. 开启了租约过期功能，默认是开启的
3. 未触发自我保护机制，实际发送心跳的总数小于总数的15%。所谓的自我保护机制，指的是上一分钟内，服务实际发送心跳的总数超过预计总数的85%，可以近似理解为正常存活的Client超过85%。

那需要注意些什么？如果你的Client个数较少，比如就5个，或者说同一个Server对应的Client就5个，那么当其中的一个宕机了，1/5=20%，直接就触发了自我保护机制，宕机的服务信息会一直存在，不会被回收。对于这种情况，在学习的情况下，可以关闭自我保护机制：eureka.server.enable-self-preservation = false；后者也可以设置Server触发自我保护机制的临界值，eureka.server.renewal-percent-threshold = 0.85，默认是85%，可以修改成适当的值，比如0.5。

# 其他

## SpringCloud和Dubbo如何选择?

知乎 廖雪峰老师回答:

一定要选SpringCloud全家桶：因为它社区支持非常强大，更新非常快。运行速度慢不是缺点，扩展性不强也不是缺点。中小型公司总是担心，如果到了BAT级别不知道SpringCloud撑不撑得住，多虑了，到了那个级别早就财富自由了，这个问题让老板花钱招人解决

---

SpringCloud数据传输：http+json，Dubbo数据传输：rpc+二进制

**Dubbo 采用单一长连接和 NIO 异步通讯（保持连接/轮询处理），使用自定义报文的 TCP 协议，并且序列化使用定制 Hessian2 框架，适合于小数据量大并发的服务调用，以及服务消费者机器数远大于服务提供者机器数的情况，但不适用于传输大数据的服务调用。而 Spring Cloud 直接使用 HTTP 协议（但也不是强绑定，也可以使用 RPC 库，或者采用 HTTP 2.0 + 长链接方式（Fegin 可以灵活设置））且一般采用json的格式来传输数据。**