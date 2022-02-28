## Spring 是什么

Spring 是一个可以简化开发，低代码侵入的框架

Spring 所做的一切都是围绕简化开发开展的



## 使用 Spring 有什么好处

1. 简化开发
2. 提供了许多解决方案：IoC、AOP、声明式事务管理
3. 提供了许多围绕 Spring 生态的工具类：JdbcTemplate、BeanUtils



Spring 5为 Spring Boot、Spring Cloud 奠定基础

1. 全面支持注解编程，具体体现在几乎不需要使用 xml 配置文件，使用大量的注解完成配置，使用 Spring Boot 一分钟内可以搭建一个 Web 项目
2. 全面支持去 Servlet 化，具体体现在 Spring Boot 程序启动不需要外部的容器，直接内置了 Tomcat、Jetty 等 Servlet 容器
3. 全面支持函数式编程
4. 全面支持异步编程



## BeanFactory 和 ApplicationContext的区别

1. ApplicationContext 是 BeanFactory 的实现类
2. BeanFactory 是一个创建 Bean 的顶层设计；ApplicationContext 是提供给用户使用的门面，功能是更加全面的
3. 真正 IoC 的实现是在 DefaultListableBeanFactory 中，但是有共同的接口



## BeanFactory 和 FactoryBean 的区别

BeanFactory是IoC容器的顶层设计

FactoryBean是用于构建Bean的一个包装类



## Spring、SpringMVC、SpringBoot、SpringCloud之间的关系

它们之间的关系

<img src="https://gitee.com/ngwingbun/picgo-image/raw/master/images/20220220111243.png" style="zoom:33%;" />

- Spring 是轻量级的 Java 开发框架，负责创建各种 Bean 实例，并维护着 Bean 与 Bean 之间的关系。其中有两个核心的功能：IoC 控制反转、AOP 面向切面，另外还为开发提供很多全面的基础架构支持，包含很多开箱即用的模块，如：SpringJDBC、SpringSecurity，极大提高应用开发效率。

- SpringMVC 是 Spring 的 Web 框架，SpringMVC 是用于解决前台页面和后台逻辑处理之间的映射关系。SpringMVC 是一个请求驱动的框架，由一个中央 Servlet (`DispatcherServlet`) 将请求分派给具体控制器并提供其他功能以促进 Web 开发。同时与 Spring IoC 容器完全集成，因此允许使用 Spring 的其他功能。

- SpringBoot 是 Spring 的升级框架，得益于 `Starter` 和 `AutoConfiguration` 的设计，遵循**约定大于配置**的原则，简化配置流程，通过简单的 jar 包引入，大大提高了开发效率。同时 SpringBoot 把 Servlet 容器集成到框架中，如 Tomcat、Jetty 等，在开发时不用再手动配置这些容器的路径，简化操作。SpringBoot 相对于 SpringMVC 来说，更推崇前后端分离，更专注于后端接口的开发。

- SpringCloud 是一个基于 SpringBoot 的微服务框架。分布式的时代，系统之间需要打通、组成集群，从而具备更大的吞吐能力。把单体项目拆分成多个微服务，每个微服务尽心独立的开发、部署。为了降低各微服务系统的差异化接入成本，所以通常基于 SpringBoot 构建微服务系统。

  SpringCloud 关注微服务整合、管理的服务治理框架，**具有生态定位**。提供丰富的组件框架，如：服务注册、发现；服务间调用；网关；配置中心；断路器等等。



Spring：Spring已有的生态，能支持我们日常开发的所有功能

Spring Boot：进一步简化Spring的开发工作，原因是一系列的配置文件，难以更新、维护。SpringBoot内置了默认的配置，我们需要配置的往往是需要覆盖的配置，配置简单了。内置各种Servlet容器，能够自运行，部署也简单了。官方提供了一套脚手架，一键搭建，节省时间。

Spring Cloud：帮助项目从单体架构转变为分布式架构。注册中心、监控、配置中心、负载均衡、熔断。目的是为了打造一个生态，提供一站式分布式的解决方案。



---



## Spring 中的 Bean 是线程安全的吗

不一定，因为 Spring 中的 Bean 是根据配置信息（xml、注解）来反射创建的，然后缓存到 IoC 容器中，Spring 中的 Bean 的线程安全性是由开发人员决定的，Spring 只是负责创建工作。

回答这个问题，需要先搞清楚导致 Bean 线程不安全的原因，Spring 只是负责 Bean 的创建工作，没有对 Bean 进行多线程的封装，所以导致一个对象是线程不安全的原因是：这个 Bean  具有**数据存储**功能，线程中的操作对 Bean 的成员执行了查询以外的操作。

- 假如这个数据存储功能是一个普通成员变量，这时候要对 Bean 的作用域进行分类讨论

  - 如果这个 Bean 是原型作用域，每次使用都创建一个新对象，不存在各线程共享 Bean 的情况，那么这个 Bean 是线程安全的

  - 如果这个 Bean 是单例作用域，所有线程都共享同一个实例，那就会存在资源的竞争，那么这个 Bean 不是线程安全的


- 假如这个数据存储功能是一个静态成员变量，那么无论是单例还是原型作用域的 Bean ，都是线程不安全的。



## Spring Bean 各作用域区别

singleton：默认，单例，在任何地方都可以通过 IoC 容器拿到

prototype：

request：作用域在一次请求发起和结束之间

session：作用域在一个session创建和session失效之间



## 解释 Spring Bean 的生命周期

Bean 的生命周期包括：创建、调用、销毁。

- 如果 Bean 的作用域是 singleton
  - 如果 Bean 不是延时加载的，那么 IoC 容器会一直持有它的引用，而 IoC 容器和 Spring 是共进退的。所以这个 Bean 会随着 Spring 的启动而创建，因为是单例，所以每次调用都用的同一个对象，最后随着 Spring 的停止而销毁。
  - 如果 Bean 是延时加载的，那么 Bean 的创建是在调用之前创建，调用时每次都使用同一个对象，最后随着 Spring 的停止而销毁。
- 如果 Bean 的作用域是 prototype
  - 原型作用域下，每次使用 Bean 都会创建新对象。所以 Bean 在调用前创建，调用后销毁。



## Spring 中的 Bean 是如何被回收的

Spring 中的 Bean 的回收问题和这个 Bean 的作用域相关

- 当这个 Bean 的作用域是单例时（默认情况）

  > 只要这个 Bean 存在 IoC 容器中，那么 IoC 容器就一直持有它的引用；并且 IoC 容器和 Spring 上下文是共进退的；所以这个 Bean 在程序运行中一直是处于可达的状态，不会进行回收；只有当程序结束时才会连同 IoC 容器一并被回收

- 当这个 Bean 的作用域时原型时

  > 只要这个 Bean 需要使用，就会新创建一个；使用完就抛弃，抛弃后这个 Bean 就处于不可达的状态，会进行回收；所以只要这个 Bean 使用完成后，就会进行回收



## 项目中如何应用AOP

声明式事务管理、日志监听、权限管理



## Spring 使用了哪些设计模式

工厂模式：BeanFactory

单例模式（容器式单例）

原型模式

代理模式（动态代理）：AOP

享元模式：

门面模式：ApplicationContext

适配器模式

委派模式：DispathcerServlet

责任链模式：AOP

解释器模式：MVC

