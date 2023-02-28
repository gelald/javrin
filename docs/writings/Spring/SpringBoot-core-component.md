---
title: SpringBoot 核心组件
icon: article
category:

- 框架

tag:

- Spring/SpringBoot

---

# SpringBoot 核心组件

> SpringBoot 有四大组件：starter、autoconfigure、actuator 以及 CLI



## Spring Boot Starter

### 示例

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>

<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>1.3.2</version>
</dependency>
```

在 Spring Boot 项目的 pom 文件中经常能看到这两种依赖

- `spring-boot-starter-xxx` ：Spring Boot 官方提供的 starter
- `xxx-spring-boot-starter` ：非官方，厂商自己封装的 starter

引入依赖后，在 Spring Boot 核心配置文件中进行简单的相关配置即可

---

如果不使用 starter，以 MyBatis 为例

引入依赖时需要以下依赖

```xml
 <dependency>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-starter-jdbc</artifactId>
 </dependency>
 <dependency>
     <groupId>org.mybatis</groupId>
     <artifactId>mybatis</artifactId>
 </dependency>
 <dependency>
     <groupId>org.mybatis</groupId>
     <artifactId>mybatis-spring</artifactId>
 </dependency>
```

并且需要自己手动编写配置文件配置相关的 bean，并且要把它们注入到 Spring 容器中 



### 小结

- 使用 starter 可以帮助我们封装好所有需要的依赖，避免了手动添加时导致的 jar 包冲突等问题
- 使用 starter 帮我们解决了把 bean 自动注入到 Spring 容器的工作，并且配置上更加简化



## Spring Boot Autoconfigure

> autoconfigure 往往伴随着 starter ，是 starter 能力体现的具体实现

以 MyBatis 为例，`mybatis-spring-boot-autoconfigure` 依赖就在 `mybatis-spring-boot-starter` 里面

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220428152640.png)



### 小结

autoconfigure 的内容主要是实现了配置 bean 实例到 Spring 容器中，所以说 autoconfigure 是 starter 能力的具体实现



## Spring Boot actuator

> actuator 是 Spring Boot 提供的监控插件，提供了很多接口来获取当前项目的各项运行状态指标

Spring Boot 对这些可以监控的端点称为 **Endpoints**



### 使用方法

- 添加依赖

  ```xml
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-actuator</artifactId>
  </dependency>
  ```

  

- 配置需要开启监控的端点

  ```yaml
  management:
    endpoint:
      health: ## 开启健康监控端点
        enabled: true
  ```

  

- 启动服务时，可以在控制台中看到这样的输出

  ```bash
  ...
  2022-04-28 15:50:30.785  INFO 19660 --- [           main] o.s.b.a.e.web.EndpointLinksResolver      : Exposing 1 endpoint(s) beneath base path '/actuator'
  ...
  ```

  

- 验证，访问 `IP:port/actuator` 就能看到监控信息的地址

  ```json
  {
      "_links":{
          "self":{
              "href":"http://localhost:8080/actuator",
              "templated":false
          },
          "health":{
              "href":"http://localhost:8080/actuator/health",
              "templated":false
          },
          "health-path":{
              "href":"http://localhost:8080/actuator/health/{*path}",
              "templated":true
          }
      }
  }
  ```



### 小结

actuator 可以在 Spring Boot 的监控中发挥了巨大的作用。另外，当项目升级到 Spring Cloud 微服务项目时，actuator 暴露的端点可以很好地让注册中心知道当前服务是否在线、可用。



## Spring Boot CLI

Spring Boot CLI 是一个 Spring Boot 提供的客户端工具，主要的功能是

- 运行 groovy 脚本
- 打包 groovy 文件到 jar
- 初始化 Spring Boot 项目
- 其他

这个组件在日常开发中使用得较少，了解即可

官方文档：[Spring Boot CLI](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-cli.html)
