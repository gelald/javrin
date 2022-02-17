Spring1.0

Spring解决了什么问题

IoC解决了创建对象的问题（工厂模式、原型模式、单例模式），DI解决了给对象自动赋值的问题（组合复用原则），MVC解决了响应用户请求的问题（委派模式、策略模式、解释器模式），AOP提供了面向切面的设计，解耦程序、通知、回调（责任链模式、动态代理模式），Jdbc提供了一个ORM框架（模板方法模式、建造者模式）

# 手写Spring

## 300行代码了解Spring基本工作原理

了解IoC、DI、MVC的工作原理。遵循单一职责原则

### 实现基本思路

- 配置阶段
  - 入口：web.xml，在web.xml中配置DispatcherServlet
  - 配置Spring主配置文件
  - 配置注解到具体类上
- 初始化阶段 触发MVC、IoC、DI核心组件的启动
  - init方法，加载配置文件
  - 初始化IoC容器 Map
  - 扫描包路径下的相关类
  - 通过反射的手段将类实例化并保存到IoC容器中
  - 扫描IoC容器中的类进行自动赋值
  - 将URL和Method进行一对一关联 Map
- 运行阶段 
  - 调用doPost、doGet方法，获取Request、Response对象
  - 从Request对象中获取用户输入的url，根据之前保存的映射关系找到具体method
  - 通过反射的方式调用这个method，并返回结果
  - 将返回结果输出到浏览器

## 30个类实现IoC功能

关注工厂怎么把对象创建出来然后交给用户。遵循了工厂模式、原型模式、单例模式

### 实现基本思路

Map 容器

Factory 工厂

Definition 元信息、配置、Bean的定义

​	

Bean 实例

Reader 解析器

Context 上下文





BeanFactory：Spring IoC模块最顶层最重要的接口，创建对象的工厂的最顶层接口

BeanDefinition：在使用Spring时，可能会有各种配置文件(xml、yml、annotation、properties)，它们语法都不一样，Spring为了统一操作，使用了一个顶层的设计：BeanDefinition，专门来保存来自各种配置信息的类相关配置





ApplicationContext上下文，持有BeanFactory的引用，使用了门面模式，开放给用户使用

BeanFactory负责创建Bean，在创建Bean之前需要把配置信息读取出来

BeanDefinitionReader读取并解析所有的配置文件，但是配置信息有可能来自不同的配置文件（xml、yml、properties）或者注解，它们的语法都不一样，Spring为了统一操作，使用了一个顶层的设计：BeanDefinition统一保存类的配置、定义

BeanFactory根据BeanDefinition通过反射的手段进行Bean的实例化。但是这些创建出来的Bean有可能是原生的Bean，有可能是代理的Bean，Spring为了统一操作，都把这些Bean都封装到一个叫BeanWrapper对象中(持有了Bean的引用)

最终缓存到IoC容器中的是BeanWrapper对象

## 30个类实现DI功能

实现给对象自动赋值的功能，解决循环依赖注入的问题，依照组合复用原则

### 什么是循环依赖

循环依赖存在于下列情况



A依赖B

B依赖A

```java
public class BeanA {
    @Autowired
    private BeanB b;
}
////////////////////
public class BeanB {
    @Autowired
    private BeanA a;
}
```



A依赖B

B依赖A

B依赖C

C依赖A

```java
public class BeanA {
    @Autowired
    private BeanB b;
}
////////////////////
public class BeanB {
    @Autowired
    private BeanA a;
    @Autowired
    private BeanC c;
}
////////////////////
public class BeanC {
    @Autowired
    private BeanA a;
}
```



A依赖A

```java
public class BeanA {
    @Autowired
    private BeanA a;
}
```



### 不支持循环依赖的情况

1. 通过构造器注入
2. 非单例的Bean



### 实现基本思路

获取对象getBean()开始

加一个容器，只要是存在相互依赖的关系，就标记一下

把已经创建好的bean，放到一个新的缓存里面，先不做依赖注入

> 假设IQueryService依赖了IModifyService，那么这时候需要递归调用getBean("modifyService")

在创建新的bean之前，加一个循环依赖的判断

> 首先去一级缓存检查是否有这个值，有就取出来，没有就递归调用getBean

依赖注入的方法

> 原来是从三级缓存中拿值出来，现在要改成用getBean取出来



一级缓存：保存已经完成依赖注入的Bean，成熟的Bean

二级缓存：保存早期的纯净的Bean，没有做依赖注入的

三级缓存：为以后的AOP实现动态代理做准备