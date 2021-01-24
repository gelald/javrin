# 坑爹面试题

## Spring中的Bean是线程安全的吗？

- Spring中的Bean从哪里来
  - 从IOC容器中来
- IOC容器中的Bean从哪里来
  - 反射创建出来的
- 反射创建出来的Bean从哪里来
  - 根据配置文件扫描出来的
- 扫描出来的Bean从哪里来
  - 自己编写的

**所以Spring中的Bean = 自己编写的Bean**

**答案**：

```
不一定，Spring中的Bean的安全性是由开发人员决定的，跟Spring没有关系

//网上答案
Spring中的Bean默认是单例模式的，框架并没有对bean进行多线程的封装处理
实际上大部分时间Bean是无状态的（比如Dao），所以说在某种程度上来说Bean其实是安全的
但是如果Bean是有状态的，那就需要开发人员自己来进行线程安全的保证，最简单的办法就是改变bean的作用域，把 "singleton"改为"protopyte" 这样每次请求Bean就相当于是 new Bean() 这样就可以保证线程的安全了

有状态就是有数据存储功能
无状态就是不会保存数据

原型Bean，每次创建一个新对象，不存在各线程共享Bean的情况，自然不会有线程安全的问题
单例Bean，所有线程共享一个实例Bean，会存在资源的竞争，如果单例Bean,是一个无状态Bean，也就是线程中的操作不会对Bean的成员执行查询以外的操作，那么这个单例Bean是线程安全的。常见的Controller、Service、Dao等，这些Bean大多是无状态的，只关注于方法本身。

尽量不要定义静态变量，无论是单例还是原型作用域的Bean，都是线程不安全的
```

## Spring中的Bean是如何被回收的？

- Spring中的Bean默认是单例的
  - 存在IOC容器中，IOC容器一直持有它的引用
  - IOC容器和Spring上下文共进退
  - 一直是可达的状态，一直都不会回收
  - 直到程序结束才会连同IOC容器一并被回收
- 原型作用域
  - 用一次创建一次，使用完抛弃
  - 所以抛弃后bean就变成不可达了
  - 所以抛弃后就被回收

# GPSpring基本思路

## 配置阶段

1. **配置web.xml**

   DispatcherServlet

2. **设定init-param**

   contextConfigLocation = classpath:application.xml

3. **设定url-param**

   /*

4. **配置Annotation**

   @Controller @Service @Autowirted @RequestMapping

## 初始化阶段

1. **调用init方法**

   加载配置文件

2. **IOC容器初始化**

   Map<String, Object>

3. **扫描相关的类**

   scan-package="com.xxx"，

   1. 递归子目录
   2. 只扫描class文件

4. ***(IOC)*创建实例化并保存至容器**

   通过反射机制将类实例化到IOC容器中

   1. 首字母小写
   2. 做判断，只有用了注解(@Controller、@Service)的才实例化
   3. 存入IOC容器的Key，因为Service默认根据类型注入，类型往往是接口
   4. 同名的类处理

   正确处理

   - Controller

     - 一般比较唯一，而且没有接口，处理简单，直接首字母小写保存至容器中

   - Service

     类名首字母小写是必须的

     - 考察自定义命名

       - 自定义命名为空，就用首字母小写作为key
       - 自定义命名不为空，就用自定义命名作为key

     - 考察根据类型注入

       获取这个类的接口，把这个接口的名称作为key，value是这个类

     所以Service支持类型也支持名称注入

     IOC容器中同一个Service可能有两个key

5. ***(DI)*进行DI操作**

   扫描IOC容器中的实例，给没有赋值的属性自动赋值

   1. 遍历IOC容器的类，获取他们的字段`getDeclaredFields()`
   2. **只针对那些加了`@Autowired`的字段，这些字段才需要依赖注入**
   3. 如果没有使用自定义名称，就按类型获取对象
   4. 如果使用了自定义名称，就按自定义的名称获取对象
   5. 为对应字段赋值(从IOC容器中获取出来的对象)

6. ***(MVC)*初始化HandlerMapping**

   用Map<String, Object>来记录：一个URL和一个Method进行一对一的关联映射。**注意：requestMapping中的value可以不加`/`**

   1. 遍历IOC容器**(被@Controller修饰)的类**
   2. 获取Controller上面的RequestMapping里面的value1
   3. 获取他们的**公有方法**`getMethods()`
   4. 获取具体方法上面的RequestMapping里面的value2
   5. 把value1和value2拼接起来作为url。考虑到`/`省略的情况，采取的做法：拼接时都加/，然后替换多出的/：`url = ("/" + value1 + "/" + value2).replaceAll("/+", "/")`
   6. key为url，value为method放入handlerMapping

## 运行阶段

1. **调用doGet/doPost**

   Web容器调用doGet/doPost方法

2. **匹配HandlerMapping**

   从request对象中获取用户输入的url，找到对应的Method

   1. 拿到url
   2. 拿到contextPath
   3. 从url中移除contextPath和多余的/，因为他们不参与handlerMapping的匹配
   4. handlerMapping匹配出来的method，获取它的类`method.getDeclaringClass`，通过一定的手段得到beanName，再从ioc容器中获取对应的bean
   5. 拿到这个请求的参数

3. **反射调用method.invoker()**

   利用反射调用方法并返回结果

4. **response.getWrite().write()**

   将返回结果输出到浏览器



