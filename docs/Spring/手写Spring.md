# 手写Spring

## Spring解决了什么问题

- IoC 功能解决了创建对象的问题（工厂模式、原型模式、单例模式）

- DI 功能解决了给对象自动赋值的问题（组合复用原则）
- MVC 功能解决了响应用户请求的问题（委派模式、策略模式、解释器模式）
- AOP功能提供了面向切面的设计，解耦程序、通知、回调（责任链模式、动态代理模式）
- Jdbc提供了一个ORM框架（模板方法模式、建造者模式）

## 了解Spring基本工作原理

了解IoC、DI、MVC的工作原理。遵循单一职责原则。

### 实现基本思路

- 配置阶段
  - 入口：web.xml，在 web.xml 中配置 DispatcherServlet
  - 配置 Spring 主配置文件（需要扫描的包路径）
  - 配置注解到具体类上
- 初始化阶段 触发 MVC、IoC、DI 核心组件的启动
  - init 方法，加载配置文件
  - 初始化 IoC 容器（可以简单看成是 Map ）
  - 扫描包路径下的相关类
  - 通过反射的手段将类实例化并保存到 IoC 容器中（需要交给 Spring IoC 容器管理的类）
  - 扫描 IoC 容器中的类进行自动赋值
  - 将 url 和 Method 进行一对一关联（可以简单看成是 Map）
- 运行阶段 
  - 调用 doPost、doGet 方法，获取 Request、Response 对象
  - 从 Request 对象中获取用户输入的 url ，根据之前保存的映射关系找到具体 Method
  - 根据 Method 上的参数列表（参数名字与参数位置的映射关系）与url 中的参数（参数名字与参数值的映射关系），构建调用方法时的需要的参数列表
  - 通过反射的方式调用这个 Method，并返回结果
  - 将返回结果输出到浏览器

## 实现IoC功能

关注工厂怎么把对象创建出来然后交给用户。使用了工厂模式、原型模式、单例模式。

DispatcherServlet 完成IoC、DI、MVC功能显然不太合理，需要进行逐步的拆分。

### 核心角色简述

- ApplicationContext：上下文，开放给用户进行使用，持有 BeanFactory 的引用。使用了门面模式，封装了许多实用的功能。
- BeanFactory：SpringIoC 模块中负责创建对象的最顶层的工厂接口。
- BeanDefinitionReader：一个负责读取并解析配置文件的工具类。因为 Bean 的配置信息来自不同的配置文件，如：xml、yml、properties，甚至是注解，它们的语法都不尽相同，Spring 定义了这个顶层的读取配置的接口，不同配置信息有各自的实现。
- BeanDefinitoin：保存类的配置信息（BeanName、是否延时加载等），后续 BeanFactory 根据它来进行 Bean 的创建。Bean 的配置可能来自不同的配置文件，经过 BeanDefinitionReader 读取解析后创建统一的 BeanDefinition。
- BeanWrapper：对创建出来的 Bean 进行了封装，持有着 Bean 的引用。因为 BeanFactory 根据 BeanDefinition 对 Bean 进行实例化后，这些 Bean 有可能是原生的，也有可能是代理的，Spring 为了统一操作，都把 Bean 封装到 BeanWrapper 对象中，最终缓存到 IoC 容器中的是 BeanWrapper 对象。

### 实现基本思路

1. DispatcherServlet 中持有着 ApplicationContext 的引用，调用 init 方法时，交给 ApplicationContext 进行配置文件的加载
2. ApplicationContext 中持有着 BeanDefinitionReader 和 BeanFactory 的引用，配置文件的加载交给 BeanDefinitionReader 进行，创建对象交给 BeanFactory 进行
3. BeanDefinitionReader 加载配置文件，根据配置文件扫描包路径下的相关类
4. BeanDefinitionReader 根据所有需要被注册的 class 文件创建 BeanDefinition 并缓存起来
5. BeanFactory 拿到这些 BeanDefinition 后进行 BeanName 与 BeanDefinition 的映射，方便后续实例化
6. BeanFactory 根据 BeanName 与 BeanDefinition 的映射进行非延时加载 Bean 的实例化
7. 创建 Bean 后，把 Bean 封装成 BeanWrapper
8. 分别缓存 Bean 与 BeanWrapper
9. 执行依赖注入

## 实现 DI 功能

关注 Spring 如何通过三级缓存，完成自动赋值和解决循环依赖的问题。使用了工厂模式、原型模式、单例模式。

### 核心角色简述

