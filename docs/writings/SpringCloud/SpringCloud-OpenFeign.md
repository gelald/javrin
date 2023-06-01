# Spring Cloud OpenFeign 简记



## 简单介绍

OpenFeign 是 SpringCloud 针对 NetFlix 的 Feign 做的二次封装，它的前身 Feign 是 Http 通信的客户端，使用 Feign 可以让我们开发时**屏蔽网络通信的细节，把所有的远程方法调用都变得像直接面向本地接口调用的方式一样方便**。

OpenFeign 对 Feign 二次封装后，在其上**加入了 SpringMVC 的注解支持**，我们常用的 `@RequestMapping`、`@RequestBody` 等。

另外 OpenFeign 还**集成了 Ribbon、Hystrix 组件**。

- Ribbon 组件实现了客户端负载均衡，维护了一份服务(地址)清单，当这个服务有多个实例时，根据这份清单和负载均衡策略，选择其中一个实例进行调用。
- Hystrix 组件实现了服务降级熔断，当目标服务不可用时，提供后备的配置方式来告诉调用方，调用失败。



## 一些特性

### Gzip 压缩

我们知道，发送 Http 请求前，需要对数据进行一层一层的包装，那么这就会导致原本需要发送的“核心数据”变大了，那么发送数据时，需要的时间更长了，OpenFeign支持对请求和响应进行GZIP压缩，以此来提供通信效率，开启后可以有效节约网络资源，但同时也会增加 CPU 的负担，开启时需要考虑好压缩的大小

```yaml
feign:
  # 压缩配置
  compression:
    request:
	    # 配置请求GZIP压缩
      enabled: true
      # 配置压缩支持的MIME TYPE
      mime-types: text/xml, application/xml, application/json
      # 配置压缩数据大小的下限
      min-request-size: 2048
    response:
    	# 配置响应GZIP压缩
      enabled: true
```



### 日志配置

针对 FeignClient 执行的方法，OpenFeign 为每一个 FeignClient 提供了单独的日志输出等级，核心的类是 `feign.Logger`

```java
@Configuration
public class FeignClientConfiguration {
  
  	/**
     * Logger.Level 的具体级别如下：
     * NONE：不记录任何信息
     * BASIC：仅记录请求方法、URL以及响应状态码和执行时间
     * HEADERS：除了记录 BASIC级别的信息外，还会记录请求和响应的头信息
     * FULL：记录所有请求与响应的明细，包括头信息、请求体、元数据
     */
		@Bean
    public Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL;
    }
}
/////////////////////////////////////////////////////////////////

//指定使用哪一个配置类
@FeignClient(name = "user-service", configuration = FeignClientConfiguration.class)
public interface UserClient {
    @GetMapping(value = "/user/hello")
    String hello(@RequestParam("name") String name);
}

```

另外还要在配置文件中指定日志等级

```yaml
logging:
  level:
    com.hello.UserClient: debug
```



### 底层通信的 Http 组件

OpenFeign Http 通信组件默认是使用 jdk 自带的 `HttpURLConnection`，由于没有连接池，性能不高，支持换成其他的 Http 通信组件，OpenFeign提供了 okhttp、httpclient 这两种，现在更为主流的是用 okhttp，支持连接池、多线程，使用后还不需要手动关闭释放资源

```xml
<dependency>
	<groupId>io.github.openfeign</groupId>
  <artifactId>feign-okhttp</artifactId>
</dependency>
```

```yaml
feign:
	httpclient:
		enable: false
  okhttp:
  	enable: true
```



### 调用超时

关于 OpenFeign 调用超时，超过阈值就会返回失败，如果下游接口反应时间比较长，那么需要进行接口优化或者提高超时时间，一般 Ribbon 超时报错是这样的：`Read timed out executing POST http://***`

```yaml
ribbon:
	# 建立连接的超时时间
  ReadTimeout: 2000
  # 建立连接后从服务调用接口获取响应的超时时间
  ConnectTimeout: 3000
```



### 熔断降级

简单介绍一下降级和熔断

1. 降级（Fallback）：降级是一种在**系统出现异常或超时**的情况下，**返回一个默认的结果**或者一个备用的服务来避免系统崩溃的机制。降级可以在客户端或者服务端实现。
2. 熔断（Circuit Breaker）：熔断是一种在系统出现异常或故障时，对该服务的请求进行熔断，避免大量请求涌入导致系统崩溃的机制。熔断器会在一段时间内监控服务的状态，**当服务的失败率达到一定阈值时，熔断器会触发熔断操作**，将请求转发到降级逻辑，避免向失败的服务发送请求。

```java
@FeignClient(name = "user-service", configuration = FeignClientConfiguration.class, fallback = UserClientFallback.class)
public interface UserClient {
    @GetMapping(value = "/user/hello")
    String hello(@RequestParam("name") String name);
}

//////////////////////////////////////////////////////////////////////

@Component
public class UserClientFallback implements UserClient {
  @Override
  public String hello(@RequestParam("name") String name) {
    return "用户接口调用失败";
  }
}
```



## 工作原理简述

- 在 SpringBoot 应用启动时，由于我们加上了 `@EnableOpenFeign` 注解，开启对包路径扫描，所有被 `@FeignClient` 注解修饰的类，会被注册到 SpringIoC 容器中。
- 由于没有写过实现类，那么注册到容器中的是一个代理类，具体是 Spring 通过 JDK 的代理方式生成代理对象。
- 当这些定义的 FeignClient 被调用时，OpenFeign 会为每个接口方法创建一个 `RequestTemplate` 对象。该对象封装了HTTP请求需要的所有信息，例如请求参数名、请求方法等信息。
- 然后由 `RequestTemplate` 生成 `Request`，把 `Request` 交给 `Client` 去处理，这里的 `Client` 可以是 JDK 原生的`URLConnection`、`HttpClient` 或 `Okhttp` 。最后 `Client` 被封装到 `LoadBalanceClient` 类，看这个类的名字既可以知道是结合 Ribbon 负载均衡发起服务之间的调用，因为在 OpenFeign 中默认是已经整合了 Ribbon 了。