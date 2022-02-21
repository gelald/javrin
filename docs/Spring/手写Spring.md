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

关注 Spring 如何完成自动赋值和通过三级缓存解决循环依赖的问题。遵循组合复用原则

### 什么是循环依赖

1. 自己依赖自己的直接依赖

   <img src="https://gitee.com/ngwingbun/picgo-image/raw/master/images/20220220155738.png" style="zoom:50%;" />

2. 两个对象之间互相依赖

   <img src="https://gitee.com/ngwingbun/picgo-image/raw/master/images/20220220155836.png" style="zoom:50%;" />

3. 多个对象之间的间接依赖

   <img src="https://gitee.com/ngwingbun/picgo-image/raw/master/images/20220220155859.png" style="zoom:50%;" />

### Spring如何检测是否存在循环依赖

在实例化 Bean 的时候，会给 Bean 进行标记，后面在依赖注入的时候会发生递归调用实例化，如果发现处于创建中的状态，说明有循环依赖。

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

