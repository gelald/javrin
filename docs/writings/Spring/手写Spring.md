# 手写Spring

这个专题是手写 Spring 框架，准确点来说是用自己的理解去仿照 Spring 框架实现它的核心功能点，包括 IoC、DI、MVC、AOP、JDBC 这几个核心的模块。手写框架是理解框架其中一个有效的途径，毕竟”好记性不如烂笔头“。

很多初学者去看源码的时候容易陷入一个误区，拿到程序直接 Ctrl 点进去看，看着看着就被困在里面了。其实点进去看不是不行，而是需要一定的前提条件，前提条件就是需要先理解这个模块的时序图，有哪些关键的类，因为框架的封装程度是很高的，心里面始终会有一个清晰的主线，不至于绕晕。

对我个人来说，学习源码比较有效的方式还是两点

1. 先学会使用。如何使用框架，相信往上也有不少优质的资源。先从搭建一个 Demo 开始，再到一些典型场景演练，理解框架的使用方式，使用场景。
2. 深入理解，70%时间猜想，30%时间验证。花大额时间去猜想这个框架的核心工作原理是很有必要的，这样可以帮助我们尽可能站在设计者的角度去看这个框架。当然这也需要一定的基础积累，手写 Spring 下来，本人最大的体会就是框架离不开反射、正则和设计模式，所以有效理解框架是需要我们有足够殷实的基础知识，这些基础知识往往单独看比较难以理解，但是组合使用下来，我相信会有更深层次的理解！

## Spring解决了什么问题

开始手写之前，我们要先达到会用这一层次，需要知道 Spring 框架解决了什么问题，我们为什么要去用它。

- IoC 功能解决了创建对象的问题（工厂模式、原型模式、单例模式）

- DI 功能解决了给对象自动赋值的问题（组合复用原则）
- MVC 功能解决了响应用户请求的问题（委派模式、策略模式、解释器模式）
- AOP功能提供了面向切面的设计，解耦程序与通知回调（责任链模式、动态代理模式）
- Jdbc提供了一个ORM框架（模板方法模式、建造者模式）

## 了解Spring基本工作原理

使用一个非常简易版的 DispatcherServlet 了解 IoC、DI、MVC 的工作原理。

Java Web 项目的入口在 web.xml，并且 Servlet 的 init 方法、doPost 方法可以实现 Spring 的初始化阶段、运行阶段的工作，所以我们使用 Servlet 作为程序的入口，并实现大部分的逻辑

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



## 实现 IoC 功能

第一版的手写 Spring 用一个大类完成了所有的功能，从单一职责原则来看，这是不合理的，也不符合开闭原则，所以接下来会逐步把 Spring 对应的功能拆分出来，优化整个代码结构

这一节我们来关注 Spring IoC 功能，这个功能关注工厂怎么把对象创建出来然后交给用户。使用了工厂模式、原型模式、单例模式。

### 核心角色简述

- ApplicationContext：上下文，开放给用户进行使用，持有 BeanFactory 的引用。使用了门面模式，封装了许多实用的功能。
- BeanFactory：Spring IoC 模块中负责创建对象的最顶层的工厂接口。
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

上一节我们实现了 IoC 功能，但是其中的依赖注入目前写得不是那么优雅，而且也无法解决一个老生常谈的问题——循环依赖，所以这一节我们重点关注 Spring 如何完成自动赋值和通过三级缓存解决循环依赖的问题。遵循组合复用原则。

### 什么是循环依赖

在开始之前，先了解一下什么是循环依赖，方便后续理解。

1. 自己依赖自己的直接依赖

   ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220220155738.png)

   

2. 两个对象之间互相依赖

   ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220220155836.png)

   

3. 多个对象之间的间接依赖

   ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220220155859.png)
   
   

### 循环依赖的情况

- 单例的 setter 注入（能解决）

- 多例的 setter 注入 （不能解决）

  > 多例的 Bean 使用一次就创建一次，不需要缓存起来。不使用缓存也就无法解决循环引用，程序启动会报错。

- 构造器注入（不能解决）

  > 使用构造器注入时，需要在延时加载的情况下才能解决循环依赖。
  >
  > 因为加入singletonFactories三级缓存的前提是执行了构造器（反射调用），缓存中没有需要引入的对象，所以构造器的循环依赖没法解决。

- 单例的代理对象 setter 注入（有可能解决）

  > Bean 初始化完成后，后面还需要进行一步二级缓存中的对象和原始对象是否相等的检查。如果被注入的 Bean 是代理对象，那么这一步检查无法通过。
  >
  > 为什么说有可能解决，因为**类加载顺序会影响 Bean 的实例化过程**，默认情况下 Spring 是根据路径+文件名进行扫描，如果说这个被注入的代理 Bean 比当前正在实例化的 Bean 要后加载，那么不会出现在二级缓存中，也就不需要进行检查

- DependsOn循环依赖（不能解决）

  > `AbstractBeanFactory` 中的 `doGetBean` 方法会检查 dependsOn 的实例有没有循环依赖，如果有循环依赖则抛异常。

  ```java
  //如果当前Bean有依赖Bean
  if (dependsOn != null) {
  	for (String dep : dependsOn) {
  		if (isDependent(beanName, dep)) {
  			throw new BeanCreationException(mbd.getResourceDescription(), beanName, "Circular depends-on relationship between '" + beanName + "' and '" + dep + "'");
  		}
          //递归调用getBean方法，获取当前Bean的依赖Bean
          registerDependentBean(dep, beanName);
          //把被依赖Bean注册给当前依赖的Bean
          getBean(dep);
      }
  }
  ```

### Spring如何检测是否存在循环依赖

在实例化 Bean 的时候，会给 Bean 进行标记（把这个 Bean 放到一个 Set 容器中），后面在依赖注入的时候会发生递归调用实例化，如果发现处于创建中的状态，说明有循环依赖。


### 核心角色简述

singletonObjects：一级缓存，保存完成实例化、注入、初始化的 Bean 实例

earlySingletonObjects：二级缓存，保存完成实例化的 Bean 实例

singletonFactories：三级缓存，保存 Bean 的创建工厂，便于后面扩展有机会创建代理对象，在 AOP 模块中实现动态代理发挥作用

singletonsCurrentlyInCreation：保存正在创建的 Bean 的 BeanName，为了标记这个 Bean 正在创建

### 实现基本思路

加一个容器，只要是正在实例化的 Bean ，就把它的 BeanName 缓存下来

1. 根据 beanName 从 BeanDefinitionMap 中拿到自己的 BeanDefinition
2. 去一级缓存中检查这个 Bean 是否已经完成实例化
   1. 如果返回不是 `null` 说明已经完成实例化，就返回这个Bean
   2. 如果返回是 `null` 说明还没完成，就往下走
3. 使用反射的方式进行实例化
4. 把创建 Bean 的工厂添加到三级缓存中，为了考虑后面有可能需要一个代理对象，可以从里面拿到代理对象。创建工厂的时候是利用了上面实例化后的 Bean 的，所以当不需要动态代理的情况下，这个工厂创建出来的 Bean 和完成实例化后的 Bean 是同一个引用
6. 执行依赖注入，依赖注入的逻辑就是递归调用上述步骤
6. 把创建好、完成依赖注入的 Bean 放入一级缓存

---

检查这个 Bean 是否完成实例化的具体逻辑

1. 检查一级缓存
   1. 如果一级缓存有，就返回一级缓存中的值
   2. 如果一级缓存没有，且这个 Bean 不是正在实例化的，就返回 `null`
   3. 如果一级缓存没有，且这个 Bean 正在进行实例化，**说明有循环依赖**，往下走
2. 检查二级缓存
   1. 如果二级缓存有，就返回二级缓存中的值
   2. 如果二级缓存没有，往下走
3. 检查三级缓存
   1. 如果三级缓存没有这个对象的工厂，就返回 `null`
   2. 如果三级缓存有这个对象的工厂，从三级缓存中拿到对象工厂并创建这个对象，把 Bean 放入二级缓存，移除三级缓存中的工厂对象，这样不用每次都要去三级缓存中创建对象，提升性能



## 实现 MVC 功能

关注前端页面、用户请求如何与后台逻辑建立映射关系

### 前端九大组件介绍

|           组件名            |                             解释                             |
| :-------------------------: | :----------------------------------------------------------: |
|      MultipartResolver      | 支持多文件上传的组件<br />把request内部的文件流解析成MultipartFile |
|       LocaleResolver        |                     本地语言环境，国际化                     |
|        ThemeResolver        |      主题模板处理器<br />简单来说是对换皮肤功能进行支持      |
|     **HandlerMapping**      |                  保存url和Method的映射关系                   |
|     **HandlerAdapter**      |                        动态参数适配器                        |
|  HandlerExceptionResolver   |                          异常拦截器                          |
| RequestToViewNameTranslator |             视图提取器，从request中提取viewName              |
|      **ViewResolver**       |                     视图转换器，模板引擎                     |
|       FlashMapManager       |         参数缓存器<br />缓存url中的参数（请求参数）          |

FlashMapManager的作用：`request.forward()` 转发，能自动携带上一次请求的所有参数；`request.redirect()` 重定向，会丢失上一次请求的参数，这时候就需要 FlashMapManager 把参数找回来

### 实现基本思路

为了方便理解，九大组件抽取其中的 HandlerMapping、HandlerAdapter、ViewResolver 这三个组件进行实现

- 初始化阶段，主要完成三大组件的初始化

  - 初始化 HandlerMapping 容器，使用 HandlerMapping 对象来记录 Controller 对象、Method 及其定义的 mapping 规则，其中 mapping 规则支持正则表达式

  - 初始化 HandlerAdapter 容器，每一个 HandlerMapping 对应一个方法，也就对应一个 HandlerAdapter
  - 初始化 ViewResovler ，记录模板文件的路径

- 运行阶段，主要完成请求委派、方法调用、页面渲染并返回的工作

  - 遍历 HandlerMapping 容器，根据 handlerMapping 中的 pattern 进行 url 的匹配，拿到对应的 handlerMapping
  - 根据 HandlerAdapter 与 HandlerMapping 的映射关系，拿到对应的 HandlerAdapter
  - HandlerAdapter 进行处理，拿到 ModelAndView。Handler 可以看成是需要执行的 Controller 对象，HandlerAdapter 主要完成的是建立参数列表、反射调用 Handler 中对应的方法、根据返回值构建 ModelAndView 对象
  - ViewResolver 模板引擎根据 ModelAndView 拿到 View 对象，并将其渲染返回



## 实现 AOP 功能

关注面向切面编程，解耦代码增强与实际逻辑，通知回调。使用了责任链模式、代理模式。

AOP常用于：日志监控、权限控制、事务管理等

### 核心角色简述

AdvisedSupport：解析AOP配置信息，构建切面与切点之间的关系的工具类

AopConfig：保存AOP的配置信息

Advice：通知，完成切面回调的封装

JdkDynamicAopProxy：使用Jdk生成代理类的工具

CglibAopProxy：使用Cglib生成代理类的工具

DefaultAopProxyFactory：创建生成代理类工具的工厂的默认实现

### 实现基本思路

在手写 DI 功能的时候我们可以了解到，三级缓存的设计是为了可以方便创建代理对象，所以 AOP 的功能也就从这里开始

1. 反射创建对象时，初始化 AopConfig 对象
1. 把切面表达式转换成正则表达式，与目标类全限定类名进行匹配
1. 如果匹配上就构建目标对象方法与切面对象方法的关系（一对多关系）

---

其中精华所在是增强方法执行链和目标方法的执行过程

MethodInterceptor 是所有通知类型类的顶层接口，其中有一个 invoke 方法，代表执行该类通知的通知方法。需要增加新的通知类型，只需要执行这个接口即可

MethodInvocation 负责递归调度增强方法与目标方法，其中内部维护了一个索引，这个索引用于在执行链上进行移动

```java
public class MSMethodInterceptor {
    ...
    public Object proceed() throws Throwable {
        if (this.currentInterceptorIndex == this.interceptorsAndDynamicMethodMatchers.size() - 1) {
            // 如果把链中的方法执行完了，那就执行目标类自己的方法
            return this.method.invoke(this.target, this.arguments);
        }
        // 从执行链中获取一个通知回调方法
        Object interceptorOrInterceptionAdvice = this.interceptorsAndDynamicMethodMatchers.get(++this.currentInterceptorIndex);

        if (interceptorOrInterceptionAdvice instanceof MSMethodInterceptor) {
            // 判断类型并强转
            MSMethodInterceptor methodInterceptor = (MSMethodInterceptor) interceptorOrInterceptionAdvice;
            return methodInterceptor.invoke(this);
        } else {
            return this.proceed();
        }
    }
    ...
}
```

假设这个执行链上有三个类型通知的拦截器：before、after、afterThrowing

他们各自的实现分别是

```java
public class MSMethodBeforeAdviceInterceptor implements MSMethodInterceptor {
	...
    @Override
    public Object invoke(MSMethodInvocation invocation) throws Throwable {
        // 先执行了before的逻辑，再执行其他的
        this.before(invocation);
        return invocation.proceed();
    }
    ...
}
```

```java
public class MSAfterReturningAdviceInterceptor implements MSMethodInterceptor {
	...
    @Override
    public Object invoke(MSMethodInvocation invocation) throws Throwable {
        // 等到其他的执行完成后得到返回值再执行after方法
        Object returnValue = invocation.proceed();
        this.after(invocation, returnValue);
        return returnValue;
    }
	...
}
```

```java
public class MSAspectJAfterThrowingAdvice implements MSMethodInterceptor {
	...
    @Override
    public Object invoke(MSMethodInvocation invocation) throws Throwable {
        try {
            // 正常执行，如果捕获到异常，就执行afterThrowing方法
            return invocation.proceed();
        } catch (Throwable throwable) {
            this.afterThrowing(invocation, throwable);
            throw throwable;
        }
    }
    ...
}
```

这里的递归链是连接了两个对象，递归着 MethodInvocation#proceed、MethodInterceptor#invoke 这个循环
