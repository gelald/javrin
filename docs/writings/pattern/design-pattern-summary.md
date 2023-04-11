---
title: 设计模式总结
icon: article
category:

- 设计模式

---

# 设计模式

**最重要的目的：解耦**

开发时区分开，运行时合并用

## 创建型

简单来说目的就是new对象的

对类的实例化进行了抽象，能够使软件模块做到与对象的创建和代码组织无关

## 结构型

简单来说是用于控制代码组成结构的、代码的表现形式

描述类和对象之间如何进行有效的组织，以形成良好的软件体系结构，主要的方式是使用继承方式来组织各个类

## 行为型

简单来说是用于控制逻辑的

描述类和对象之间如何交互以及如何分配职责

## 各设计模式间对比

### 策略模式 vs 委派模式

共同点：行为型模式

不同点：策略模式关注的是能否相互替换；委派模式关注的是分发和调度的过程

### 工厂方法模式 vs 抽象工厂模式

共同点：创建型模式

不同点：工厂方法模式单维度扩展；抽象工厂可以实现产品等级、产品族多维度扩展

### 中介者模式 vs 桥接模式

共同点：具备将两个对象建立联系的动作

不同点：

1. 中介者是行为型模式；桥接模式结构型模式
2. 中介者模式将多维度网状结构的对象建立联系；桥接模式将抽象、具象两个维度对象建立联系

### 委派模式 vs 代理模式

共同点：都能保护目标对象

不同点：

1. 委派模式是行为型模式；代理模式结构型模式
2. 委派模式是一种全权静态代理，不对目标类的功能增强；代理模式会对目标类进行功能增强

### 代理模式 vs 中介者模式

共同点：都能保护目标对象

不同点：

1. 代理模式时结构型模式；中介者模式是行为型模式
2. 代理模式建立目标对象和代理对象的联系还要做功能增强；中介者模式只做建立联系的牵线搭桥工作，不参与具体过程

### 桥接模式 vs 适配器模式

共同点：结构型模式

不同点：

1. 适配器模式希望已有代码是稳定的；桥接模式希望已有代码是可扩展的
2. 桥接模式不推荐使用继承，适配器模式会采用继承

### 建造者模式 vs 工厂模式

共同点：创建型模式，封装创建产品的细节

不同点：

1. 工厂模式希望封装细节创建标准产品，建造者模式希望创建定制化产品
2. 工厂模式产品复杂程度比建造者模式的要复杂，建造者模式产品颗粒度更细
3. 工厂模式一般是单例的，建造者模式一般是多例的

### 代理模式 vs 适配器模式

共同点：

1. 结构型模式
2. 都有保护目标对象的作用

不同点：代理模式为了功能增强；适配器模式为了解决兼容问题

### 适配器模式 vs 装饰器模式

共同点：结构型模式

不同点：

1. 代码结构不同，装饰器同宗同源，适配器不需要同宗同源
2. 适配器模式模式为了解决兼容问题，装饰器模式为了不改变原有功能的基础上增强

### 桥接模式 vs 组合模式

共同点：行为型模式

不同点：桥接模式目的是将具象和抽象两个维度的继承体系建立联系；组合模式的目的是为了统一的API

### 策略模式 vs 模板方法模式

共同点：

1. 行为型模式
2. 可以将底层和应用层代码的某些细节分离

不同点：策略模式可以提供策略给用户选择；模板方法模式是在一个标准化的流程中开放某些微调的操作给用户

## 总结

|  设计模式  |     目的     |   案例   |                     框架源码                      |      一句话归纳      |
|:------:|:----------:|:------:|:---------------------------------------------:|:---------------:|
|  工厂模式  |   封装创建细节   |  实体工厂  |        LoggerFactory<br />BeanFactory         |   产品标准化，生产更高效   |
|  单例模式  |  保证实例唯一性   | CEO、太阳 |       Calendar<br />ApplicationContext        |     保证实例唯一性     |
|  原型模式  |   高效创建对象   |   克隆   |         ArrayList<br />PrototypeBean          |   避免用构造方法创建对象   |
| 建造者模式  |  开放个性配置步骤  |   选配   |   StringBuilder<br />BeanDefinitionBuilder    |      个性化配置      |
|  代理模式  |    增强职责    |   媒婆   |      CglibAopProxy<br />ProxyFactoryBean      |        -        |
|  门面模式  |   统一访问入口   |   前台   |         JdbcUtils<br />RequestFacade          |   打开一扇门，走向全世界   |
| 装饰器模式  | 灵活扩展，同宗同源  |   奶茶   |         BufferReader<br />InputStream         |        -        |
|  享元模式  |   共享资源池    |  线程池   |        String、Integer<br />ObjectPool         |  优化资源配置，减少重复浪费  |
|  组合模式  |  统一整体和个体   | 组织架构树  |             HashMap<br />SqlNode              |        -        |
| 适配器模式  | 兼容互换，求同存异  | 电源适配器  |      AdvisorAdapter<br />HandlerAdapter       |     亡羊补牢的手段     |
|  桥接模式  |  不允许使用继承   |   桥    |                 DriverManager                 |     约定优于配置      |
|  委派模式  |   只对结果负责   |  项目经理  | ClassLoader<br />BeanDefinitionParserDelegate | 这个需求很简单，怎么实现我不管 |
| 模板方法模式 |    逻辑复用    |   -    |         JdbcTemplate<br />HttpServlet         | 流程全部标准化，需要微调请覆盖 |
|  策略模式  |  把选择权交给用户  | 选择支付方式 |     Comparator<br />InstantiationStrategy     | 条条大路通罗马，具体哪条你决定 |
| 责任链模式  |   解耦处理逻辑   |  踢皮球   |                  FilterChain                  | 各人自扫门前雪，不管他人瓦上霜 |
| 迭代器模式  | 统一对集合的访问方式 |   -    |                   Iterator                    |        -        |
|  命令模式  |  解耦请求和处理   |  遥控器   |                   Runnable                    |        -        |
|  状态模式  |  绑定状态与行为   | 订单状态跟踪 |                   Lifecycle                   |  状态驱动行为，行为决定状态  |
| 备忘录模式  |     备份     |  草稿箱   |                       -                       |     后悔药、快照      |
| 中介者模式  |  统一管理网状资源  |  朋友圈   |                     Timer                     |  由一个对象统一维护所有关系  |
| 解释器模式  |  实现特定语法解析  |  摩斯密码  |                    Pattern                    |    一切解释权归我所有    |
| 观察者模式  | 解耦观察者与被观察者 |   闹钟   |             ContextLoaderListener             |     到点就通知我      |
| 访问者模式  | 解耦数据结构与操作  | KPI考核  |             BeanDefinitionVisitor             |        -        |
