# Spring IoC 整体脉络



## 前言

我们做 Web 后台开发的，其实也可以说是 Spring 开发，因为 Spring 框架在整个 Web 开发中扮演着非常重要的角色。Spring 的引入，完全改变了开发方式，从以前的 new 关键字创建对象到如今由 Spring 容器统一管理所有对象，而后者就是 IoC （Inversion of Control）控制反转这么一种设计思想：把对象的控制权（包括创建、初始化）都交给 Spring 来处理。

此外 Spring 还有其他功能，但是种种诸如 DI、AOP，都是围绕着 IoC 来开展的，所以了解清楚 IoC 对我们学习 Spring 有极大的帮助。



## Spring IoC 核心角色

### Bean

Bean 其实就是包装过的 Object，Bean 是 Spring 中的核心角色，由 Spring 管理和创建的对象我们都称之为 Bean。



### BeanDefinition

既然 Spring 帮助我们管理所有的对象，那么这些对象长什么样，比如说全路径、类名、需要什么属性，这是 Spring 需要知道的，而这些信息我们**称为 Bean 的元数据**，用于描述创建 Bean 所需要的信息。

Spring 使用了 `BeanDefinition` 来表示这些 Bean 的元数据，在 `BeanDefinition` 中我们可以看到比较熟悉的配置 `isSingleton()` 是否单例、`isPrototype()` 是否多例、`setInitMethodName()` 设置初始化方法等等。



### BeanDefinitionReader

既然 Spring 使用了 `BeanDefinition` 来描述 Bean 的元数据，那么这些 Bean 的元数据从哪里来呢？在以前我们会写 XML 配置文件来定义 Bean 的各种属性，现在开发我们都会用注解来进行配置这些元数据，甚至配置文件的格式也不局限于 .xml 格式，还可能有 .properties 格式，为了适配各种渠道，Spring 使用 `BeanDefinitionReader` 这个接口统一了读取各种配置的行为，他有两个常见的实现类 `XmlBeanDefinitionReader` 读取 XML 配置文件、`PropertiesBeanDefinitionReader` 读取 Properties 配置文件。

此外，注解和配置文件差异挺大的，所以读取注解配置的 `AnnotatedBeanDefinitionReader` 没有去实现 `BeanDefinitionReader` 接口，专门做基于注解的 `BeanDefinition` 的读取和注册。



### BeanFactory

使用 `BeanDefinitionReader` 读取到的这些 `BeanDefinition` 后，最终拿去按其要求创建 Bean ，而创建 Bean 的角色就是 `BeanFactory`，可以说 `BeanFactory` 是一个工厂也是一个容器，他负责生产和管理各个 Bean 的实例，也对外提供获取 Bean 的接口。，1这是 Spring IoC 容器的顶层接口，



### BeanFactoryPostProcessor



### ApplicationContext

`BeanFactory` 是 Spring IoC 容器的顶层接口，`ApplicationContext` 是它的子接口，拥有更加丰富的功能



## IoC 容器初始化过程

介绍了以上核心角色后，把他们串起来看，`BeanFactory` 通过 `BeanDefinitionReader` 使用描述 `Bean` 的元数据的 `BeanDefinition` 来创建 `Bean`







## 循环依赖

概念：两个单例的 Bean，彼此依赖着对方，比如 A 依赖 B，B 依赖 A，在 Spring 程序启动的时候会抛出循环依赖的异常



关键词：「三级」缓存、提前「暴露」对象



![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230611000200.png)





![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230610235912.png)



解决的核心手段：把实例化和初始化分开执行，先用半成品赋值，所以构造器注入的方式，无法解决循环依赖的问题 



### 三级缓存

三个 map 结构，在 `DefaultSingletonBeanRegistry` 中

- 一级缓存：`Map<String, Object> singletonObjects` 存储
- 二级缓存：`Map<String, Object> earlySingletonObjects` 存储 BeanName
- 三级缓存：`Map<String, ObjectFactory<?>> singletonFactories` 

> ObjectFactory：getBean 的逻辑，为 AOP 准备



AbstractApplicationContext#refresh



