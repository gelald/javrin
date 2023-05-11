---
title: Spring 中的拦截器与过滤器
icon: article
category:

- 框架

tag:

- SpringMVC

---


# Spring 中的拦截器与过滤器

> 在 SpringBoot 的 Web 项目开发中，如果想实现拦截、过滤的功能，大概会有三种做法：Filter 过滤器、Interceptor 拦截器、AOP 切面编程，而我们今天要讨论的是 Filter 与 Interceptor 它们之间的区别。

## Filter 过滤器

其实 Filter 是 Servlet 中用于拦截请求、过滤请求的一个接口，在以前，我们通常会使用 Filter 来拦截请求设置请求的字符集、判断用户是否登陆、校验权限等等。其工作原理和核心配置文件 `web.xml`  息息相关，在配置文件中我们会配置过滤器的名称，以及它过滤的 URL 规则，配置好后，符合过滤规则的请求就会先来到过滤器这里执行 Filter 中的逻辑，以及判断是否能进行下一步的流转。虽然使用原生的 Servlet 开发的时代大概率已经过去，但是 Servlet 却是 Web 开发基础中的基础，所以 Filter 接口也是能用于 SpringBoot 项目的。



### Filter 方法简单介绍

```java
public interface Filter {

  	//Web容器（如Tomcat）在初始化这个Filter时调用，一般用于初始化一些资源
    public default void init(FilterConfig filterConfig) throws ServletException {}

  	//这个方法是具体执行过滤器逻辑的方法
  	//另外chain变量是过滤器链，可以使用这个变量来决定这个请求是否可以向下流转
    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain) throws IOException, ServletException;

  	//Web容器（如Tomcat）在关闭前会销毁Filter，一般用于资源的释放
    public default void destroy() {}
}
```





### SpringBoot 中添加 Filter 

SpringBoot 项目中添加 Filter 的步骤主要包括 Filter 定义与注册，添加的方式有 3 种，下面一一做展示



- 方式一：使用 `@WebFilter` 注解 + `@ServletComponentScan` 注解

  ```java
  // 过滤器
  package com.example.demo.filter.one;
  
  @WebFilter(filterName = "filter-one", urlPatterns = "/bad/*")
  public class FilterOne implements Filter {
      @Override
      public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
          //执行Filter逻辑
          System.out.println("这是Filter过滤器1号");
          //让请求继续进入Filter链的下一个节点
          chain.doFilter(request, response);
      }
  }
  
  
  // 启动类
  @SpringBootApplication
  @ServletComponentScan(basePackages = "com.example.demo.filter.one")
  public class SpringBootDemoApplication {
  
      public static void main(String[] args) {
          SpringApplication.run(SpringBootDemoApplication.class, args);
      }
  
  }
  ```

  

- 方式二：使用 `FilterRegistrationBean` 来注册一般过滤器

  ```java
  // 过滤器
  public class FilterTwo implements Filter {
      @Override
      public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
          //执行Filter逻辑
          System.out.println("这是Filter过滤器2号");
          //让请求继续进入Filter链的下一个节点
          chain.doFilter(request, response);
      }
  }
  
  
  // 配置类
  @Configuration
  public class FilterConfiguration {
      @Bean
      public FilterRegistrationBean<FilterTwo> filterRegistrationBean() {
          FilterTwo filterTwo = new FilterTwo();
          FilterRegistrationBean<FilterTwo> filterRegistrationBean = new FilterRegistrationBean<>();
          filterRegistrationBean.setFilter(filterTwo);
          //设置过滤器名、过滤规则
          filterRegistrationBean.setName("filter-two");
          filterRegistrationBean.addUrlPatterns("/bad/*");
          return filterRegistrationBean;
      }
  }
  ```

  

- 方式三：使用 `DelegatingFilterProxyRegistrationBean` 注册已被 Spring 管理的过滤器

  ```java
  // 过滤器
  @Component
  public class FilterThree implements Filter {
      @Override
      public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
          //执行Filter逻辑
          System.out.println("这是Filter过滤器3号");
          //让请求继续进入Filter链的下一个节点
          chain.doFilter(request, response);
      }
  }
  
  
  // 配置类
  @Configuration
  public class FilterConfiguration {
      @Bean
      public DelegatingFilterProxyRegistrationBean delegatingFilterProxyRegistrationBean() {
          DelegatingFilterProxyRegistrationBean delegatingFilterProxyRegistrationBean = new DelegatingFilterProxyRegistrationBean("filterThree");
          delegatingFilterProxyRegistrationBean.setName("filter-three");
          delegatingFilterProxyRegistrationBean.addUrlPatterns("/bad/*");
          return delegatingFilterProxyRegistrationBean;
      }
  }
  ```



### Filter 原理

#### 简单介绍一下三种做法的 Filter 注册原理

- 方式一，SpringBoot 在启动时，`ServletComponentScanRegistrar` 类实现了 `ImportBeanDefinitionRegistrar` 接口，负责把 `@ServletComponentScan` 中的包路径传递给 `ServletComponentRegisteringPostProcessor` 类，`ServletComponentRegisteringPostProcessor` 实现了 `BeanFactoryPostProcessor` 接口，在调用 `postProcessBeanFactory()` 方法时，使用 `WebServletHandler` 、`WebFilterHandler`、`WebListenerHandler` 一个个对比，符合条件就调用 `doHandle()` 方法来把 Filter 作为 `FilterRegistrationBean` 类型的 Bean 注册到 Spring IoC 容器中。
- 方式二和方式三差异不大
  - 相同点，无论是 `FilterRegistrationBean` 还是 `DelegatingFilterProxyRegistrationBean`，他们都是实现了 `ServletContextInitializer` 接口的，在调用 `onStartup()` 方法时，抽象基类 `AbstractFilterRegistrationBean` 会调用 `addRegistration()` 方法，这个方法就是根据两个子类中返回的 Filter ，添加到 Spring IoC 容器中。
  - 不同点，`DelegatingFilterProxyRegistrationBean` 通过传入的 targetBeanName 名字,在 Spring IoC 容器中查找该 Fillter 类型的 Bean，并通过 `DelegatingFilterProxy` 生成基于这个 Bean 的代理 Filter 对象；而 `FilterRegistrationBean`  则是直接设置一个 Filter ，因此这个 Filter 可以由 Spring IoC 容器管理，也可不用管理。如果一个 Filter 被声明为一个 Bean，而不通过 `DelegatingFilterProxyRegistrationBean` 添加到 Spring IoC 容器中，那么这个过滤器是无法添加过滤规则的，全局适用。



#### Filter 在请求中的工作流程

在一次请求里，Filter 不是独立工作，而是以 FilterChain 过滤链的形式来进行过滤，每次请求都根据 URL 的匹配规则来找到符合规则的 Filter ，组装成一条过滤链，请求经过过滤链后才能到达 `DispatcherServlet`

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230410161437.png)

这个 `ApplicationFilterChain` 在整个过滤器的工作链路中是一个核心角色，在 `createFilterChain()` 方法中，会按顺序地添加符合规则的过滤器，组建成一条过滤器链交给 `StandardWrapperValve`，在调用过滤器逻辑时，直接拿这条过滤器链来做过滤，过滤器中维护了过滤器的顺序，接下来的逻辑就是各个 `Filter` 的过滤逻辑。执行完各个过滤器后，如果这个请求都通过了过滤，那么最终会来到 `DispatcherServlet` 中。





## HandlerInterceptor 拦截器

拦截器是 Spring 中的内容，它依赖于 Spring 容器，能从 Spring 容器中获取其他 Bean；拦截器提供了更加细颗粒度的拦截功能，更能体现 AOP 思想。



### HandlerInterceptor 方法简单介绍

```java
public interface HandlerInterceptor {

  	//在请求被处理前（到达Controller前）进行处理，如果返回false，那么请求不往下进行
    default boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
        throws Exception {

      return true;
    }
  
  	//在请求被处理后（执行完Controller逻辑后）进行处理
    default void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
        @Nullable ModelAndView modelAndView) throws Exception {
    }
  
  	//在页面渲染结束后执行，一般用于资源释放
    default void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
        @Nullable Exception ex) throws Exception {
    }

}

```



### SpringBoot 中添加 HandlerInterceptor

与 Filter 类似，添加 HandlerInterceptor 的步骤也分为两步，定义与注册



```java
// 拦截器
@Component
public class HandlerInterceptorOne implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("请求到Controller前-执行 HandlerInterceptor 逻辑");
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("Controller执行完后-执行 HandlerInterceptor 逻辑");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("返回视图前-执行 HandlerInterceptor 逻辑");
    }
}


// 配置类
@Configuration
public class InterceptorConfiguration implements WebMvcConfigurer {
    @Autowired
    private HandlerInterceptorOne handlerInterceptorOne;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //这册拦截器
        registry.addInterceptor(handlerInterceptorOne)
                //设置拦截的路径
                .addPathPatterns("/bad/*")
                //设置不拦截的路径（排除这些路径）
                .excludePathPatterns("/bad/test");
    }
}
```



### HandlerInterceptor 原理

`HandlerInterceptor` 的工作与 `Filter` 差别不大，先往容器里注册拦截器，当请求来到 `DispatcherServlet` 时，调用 `getHandler()` 方法根据请求的 URL 从容器中取出 URL 符合拦截规则的拦截器，组装成一条拦截器链 `HandlerExecutionChain` 。然后 `DispatcherServlet` 按照 `preHandle` -> `handle(Controller)` -> `postHandle` -> `afterCompletion` 的顺序往下执行。

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230411234815.png)



## 总结

虽然两者名字上、功能上都颇为相似，但他们还是有部分区别的：

1. Filter 是 Servlet 的内容，依赖于 Web 容器，不依赖于 Spring 容器，SpringBoot 保留了 Filter 的功能；HandlerInterceptor 是 Spring 中的内容，依赖于 Spring 容器，与其他普通的 Bean 一样被 Spring 容器管理

2. Filter 主要是对进入到核心组件 `DispathcerServlet` 前的请求进行拦截过滤，只有通过过滤的请求才能来到 `DispatcherServlet`；HandlerInterceptor 主要对来到 `DispatcherServlet` 的请求在执行 Controller 逻辑前、逻辑后、渲染结束后三个阶段做拦截，有 AOP 的意味。两者执行顺序如下：

   `Filter#doFilter()` -> `DispatcherServlet#doDispatch()` -> `HandlerInterceptor#preHandle()` -> `Controller#接口方法()` -> `HandlerInterceptor#postHandle()` -> `HandlerInterceptor#afterCompletion()`



综上所述，在基于 SpringBoot 的项目开发中，如果有需要对请求拦截处理的场景，**优先选择 HandlerInterceptor**。



## 参考资料

[springboot 中 HandlerInterceptor和Filter区别及使用](https://blog.csdn.net/sfwqwfew/article/details/129014345)

[关于springboot中添加Filter的方法](https://www.jianshu.com/p/3d421fbce734)

[【Springboot】拦截器](https://www.cnblogs.com/HelloWxl/p/16597273.html)

[Spring MVC HandlerInterceptor 实现原理（源码）](https://blog.csdn.net/top_code/article/details/69367823)
