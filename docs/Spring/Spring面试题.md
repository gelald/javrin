## Spring、SpringMVC、SpringBoot、SpringCloud之间的关系

它们之间的关系

<img src="https://gitee.com/ngwingbun/picgo-image/raw/master/images/20220220111243.png" style="zoom:33%;" />

- Spring 是轻量级的 Java 开发框架，负责创建各种 Bean 实例，并维护着 Bean 与 Bean 之间的关系。其中有两个核心的功能：IoC 控制反转、AOP 面向切面，另外还为开发提供很多全面的基础架构支持，包含很多开箱即用的模块，如：SpringJDBC、SpringSecurity，极大提高应用开发效率。

- SpringMVC 是 Spring 的 Web 框架，SpringMVC 是用于解决前台页面和后台逻辑处理之间的映射关系。SpringMVC 是一个请求驱动的框架，由一个中央 Servlet (`DispatcherServlet`) 将请求分派给具体控制器并提供其他功能以促进 Web 开发。同时与 Spring IoC 容器完全集成，因此允许使用 Spring 的其他功能。

- SpringBoot 是 Spring 的升级框架，得益于 `Starter` 和 `AutoConfiguration` 的设计，遵循**约定大于配置**的原则，简化配置流程，通过简单的 jar 包引入，大大提高了开发效率。同时 SpringBoot 把 Servlet 容器集成到框架中，如 Tomcat、Jetty 等，在开发时不用再手动配置这些容器的路径，简化操作。SpringBoot 相对于 SpringMVC 来说，更推崇前后端分离，更专注于后端接口的开发。

- SpringCloud 是一个基于 SpringBoot 的微服务框架。分布式的时代，系统之间需要打通、组成集群，从而具备更大的吞吐能力。把单体项目拆分成多个微服务，每个微服务尽心独立的开发、部署。为了降低各微服务系统的差异化接入成本，所以通常基于 SpringBoot 构建微服务系统。

  SpringCloud 关注微服务整合、管理的服务治理框架，**具有生态定位**。提供丰富的组件框架，如：服务注册、发现；服务间调用；网关；配置中心；断路器等等。



## Spring 中的 Bean 是线程安全的吗

不一定，因为 Spring 中的 Bean 是根据配置信息（xml、注解）来反射创建的，然后缓存到 IoC 容器中，Spring 中的 Bean 的线程安全性是由开发人员决定的，Spring 只是负责创建工作。

回答这个问题，需要先搞清楚导致 Bean 线程不安全的原因，Spring 只是负责 Bean 的创建工作，没有对 Bean 进行多线程的封装，所以导致一个对象是线程不安全的原因是：这个 Bean  具有**数据存储**功能，线程中的操作对 Bean 的成员执行了查询以外的操作。

假如这个数据存储功能是一个普通成员变量，这时候要对 Bean 的作用域进行分类讨论

- 如果这个 Bean 是原型作用域，每次使用都创建一个新对象，不存在各线程共享 Bean 的情况，那么这个 Bean 是线程安全的
- 如果这个 Bean 是单例作用域，所有线程都共享同一个实例，那就会存在资源的竞争，那么这个 Bean 不是线程安全的

假如这个数据存储功能是一个静态成员变量，那么无论是单例还是原型作用域的 Bean ，都是线程不安全的。



## Spring 中的 Bean 是如何被回收的

Spring 中的 Bean 的回收问题和这个 Bean 的作用域相关

- 当这个 Bean 的作用域是单例时（默认情况）

  > 只要这个 Bean 存在 IoC 容器中，那么 IoC 容器就一直持有它的引用；并且 IoC 容器和 Spring 上下文是共进退的；所以这个 Bean 在程序运行中一直是处于可达的状态，不会进行回收；只有当程序结束时才会连同 IoC 容器一并被回收

- 当这个 Bean 的作用域时原型时

  > 只要这个 Bean 需要使用，就会新创建一个；使用完就抛弃，抛弃后这个 Bean 就处于不可达的状态，会进行回收；所以只要这个 Bean 使用完成后，就会进行回收