# 基础知识学习--视频

## 概述

**IoC(Inverse of Control:反转控制)**和**AOP(Aspect Oriented Programming:面向切面编程)**是它的两大内核。提供了表现层SpringMVC、持久层SpringJDBC以及业务层事务管理等众多的应用技术。还能整合第三方框架和类库。**最新版本：Spring5**

三层架构

![ssm三层架构](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrp3ldh9j31bv0qzac3.jpg)

## 程序耦合和解耦

- **耦合**：简单的理解就是**程序间的依赖关系**

  - 类之间的依赖关系
  - 方法之间的依赖关系

- **解耦**：简单的理解就是**降低**程序之间的耦合性

  - **某个类在编译期就具体地依赖于某个类，从这点上来说这个类的独立性是很差的**
  - 实际开发中应该做到：**编译期不依赖，运行期才依赖**。只有做到这一点才能避免某个类独立性差的问题

- **解耦思路**

  1. 使用反射来创建对象(依赖字符串)，避免使用new关键字(依赖具体的类)

  2. 通过读取配置文件来获取要创建的对象的全限定类名(把字符串从源码转移到配置文件中)

     ```java
     //使用JDBC的一个Demo
     //第一步：注册驱动
     //虽然两种做法都是可行的，但是明显下面的做法是更加地具有独立性
     
     //编译期就依赖了某个具体的类
     DriverManager.registerDriver(new com.mysql.cj.jdbc.Driver);
     //运行期才会通过这个类的全类名使用反射来获取这个类
     Class.forName("com.mysql.cj.jdbc.Driver");
     //通过配置文件来获取驱动类，以后更换oracle数据库不需要修改代码，修改配置文件即可
     Class.forName(properties.getProperty("Driver"));
     ```
     
3. 工厂模式解耦
  
   ```java
     //BeanFactory.java
     
     
     public class BeanFactory {
     
         private static Properties properties;
     
         //静态代码块为properties对象赋值
         static {
             //实例化
             properties = new Properties();
             //获取properties流对象
             InputStream in = ClassLoader.getSystemResourceAsStream("bean.properties");
             try {
                 properties.load(in);
             } catch (IOException e) {
                 throw new ExceptionInInitializerError("初始化properties失败");
             }
         }
     
         public static Object getBean(String beanName) {
             Object bean = null;
             String beanPath = properties.getProperty(beanName);
             try {
                 bean = Class.forName(beanPath).newInstance();
             } catch (Exception e) {
                 e.printStackTrace();
             }
             return bean;
         }
     }
   ```
   
     ```properties
     #bean.properties
     
     
     accountService=com.itheima.service.Impl.AccountServiceImpl
     accountDao=com.itheima.dao.Impl.AccountDaoImpl
     ```
   
     **存在的问题：对象每次使用都被创建一次，效率低**
   
     ```java
     //BeanFactory.java
     
     
     public class BeanFactory {
     
         private static Map<String, Object> maps;
     
         static {
             //实例化
             maps = new HashMap<>();
             Properties properties = new Properties();
             //获取properties流对象
             InputStream in = ClassLoader.getSystemResourceAsStream("bean.properties");
             try {
                 properties.load(in);
             } catch (IOException e) {
            throw new ExceptionInInitializerError("初始化properties失败");
             }
             Enumeration<Object> keys = properties.keys();
             while (keys.hasMoreElements()) {
                 String key = keys.nextElement().toString();
                 Object value = properties.getProperty(key);
                 maps.put(key, value);
             }
      }
     
         public static Object getBean(String beanName) {
             return maps.get(beanName);
         }
     }
     
     ```



## IoC

- 主动获取对象：`new`关键字。应用的独立性很差，因为应用和资源有着一个明显的依赖关系

- 被动获取对象：工厂模式。工厂控制着`资源`，实现控制权反转。实现了应用和资源之间必然的依赖关系的脱离，耦合度更小

- 基于xml的IoC案例

  ```xml
  <!-- bean.xml -->
  
  <?xml version="1.0" encoding="UTF-8"?>
  <beans xmlns="http://www.springframework.org/schema/beans"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
      <bean id="accountService" class="com.itheima.service.Impl.AccountServiceImpl"/>
      <bean id="accountDao" class="com.itheima.dao.Impl.AccountDaoImpl"/>
  </beans>
  ```
  
```java
  public class Client {
    public static void main(String[] args) {
      ApplicationContext applicationContext = new ClassPathXmlApplicationContext("bean.xml");
      //两种做法都可以， 个人喜欢第二种
      //AccountService accountService = (AccountService) applicationContext.getBean("accountService");
      AccountService accountService = applicationContext.getBean("accountService", AccountService.class);
      accountService.saveAccount();
    }
  }
```

### 核心容器对象

- Spring的IoC核心容器对象：`ApplicationContext`

- 三个常用实现类

  - `ClassPathXmlApplicationContext`：加载类路径下的配置文件
  - `FileSystemXmlApplicationContext`：加载磁盘任意路径下的配置文件，前提是要有访问权限
  - `AnnotationConfigApplicationContext`：用于读取注解创建容器

- 核心容器的两个接口引发的问题

  - `ApplicationContext`：**它是BeanFactory的子接口**。在构建核心容器时，创建对象采用的策略是**立即加载的方式**。也就是说，只要**一读取完配置文件**马上就用**反射的方式创建**配置文件中配置的对象。**单例对象适用**

    ```java
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("bean.xml");
    ```

  - `BeanFactory`：**它才是 Spring 容器中的顶层接口**。 在构建核心容器时，创建对象采用的策略是**延迟加载的方式**。也就是说，只有通过id获取对象时才真正创建对象。**多例对象适用**

    ```java
    Resource resource = new ClassPathResource("bean.xml");
    BeanFactory beanFactory = new XmlBeanFactory(resource);
    ```



## 配置文件--

### Bean标签

- id：bean的Id

- class：bean的全限定类名

- scope

  - **singleton（默认）**
    - Bean的实例个数：**单个**
    - Bean的创建时机：**当Spring配置文件加载创建Spring容器时创建Bean**
    - 生命周期
      - 对象创建：当应用加载，创建容器时，对象被创建
      - 对象运行：只要容器存在，对象一直存活着
      - 对象销毁：当应用卸载，销毁容器时，对象被销毁
  - **prototype**
    - Bean的实例个数：**多个**
    - Bean的创建时机：**当调用getBean方法时创建Bean**
    - 生命周期：
      - 对象创建：当使用对象时，创建新的对象实例
      - 对象运行：只要对象在使用中，就一直存活着
      - 对象销毁：当对象不被使用了，就被JVM回收了
  - request：Spring创建一个bean对象，放入ioc容器的同时，也会将对象存入request域
  - session：Spring创建一个bean对象，放入ioc容器的同时，也会将对象存入session域

- init-method：对象初始化时执行的方法

- destroy-method：对象销毁时的方法

- 创建Bean的三种方式

  - **无参构造方法（默认）**

  - 工厂静态方法（一个工厂，一个静态方法创建对象）

    ```xml
    <bean id="userDao" class="com.itheima.ioc.factory.StaticFactory" factory-method="getUserDao"></bean>
    ```

  - 工厂实例方法（一个工厂，一个实例方法创建对象）

    ```xml
    <bean id="factory" class="com.itheima.ioc.factory.InstanceFactory"></bean>
    <bean id="userDao" factory-bean="factory" factory-method="getUserDao"></bean>
    ```

### 配置文件拆分与导入

在主配置文件中导入

```xml
<import resource="applicationContext-dao.xml"></import>
<import resource="applicationContext-service.xml"></import>
```

### 加载Properties文件

jdbc配置为例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                            http://www.springframework.org/schema/context  http://www.springframework.org/schema/context/spring-context.xsd">
    <!--加载外部properties文件-->
    <context:property-placeholder location="classpath:jdbc.properties"/>

    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>
</beans>
```



## 相关API

### ApplicationContext继承体系

- ApplicationContext：接口，代表Spring应用上下文，通过其获取Spring容器中的Bean对象
- ClassPathXmlApplicationContext：实现类，从类加载路径下加载配置文件
- FileSystemXmlApplicationContext：实现类，从磁盘物理路径下加载配置文件
- AnnotationConfigApplicationContext：实现类，使用注解配置容器对象，使用其来创建Spring容器，读取注解

### getBean方法

- 使用名称（bean的id）获取bean对象`public Object getBean(String name) throws BeansException`
- 使用类型获取bean对象`public <T> T getBean(Class<T> requiredType) throws BeansException`
- 如果容器中存在某个类型的对象有多个的情况，那么需要使用第一种，因为id具有唯一性。

## 依赖注入Dependency Injection

依赖注入是Spring框架核心IoC的具体实现

### 引用数据类型（对象）注入

在容器内部把dao赋予service

- 构造方法

  ```xml
  1、在service中定义一个带dao的构造方法，养成好习惯，顺带创建一个无参构造
  2、在配置文件中如下修改
  <bean id="userService" class="com.itheima.ioc.service.impl.UserServiceImpl">
  	<constructor-arg name="userDao" ref="userDao"/>
  </bean>
  ```

- set方法（常用）

  ```xml
  1、在service中定义一个成员变量dao
  2、编写一个set方法
  3、在配置文件中如下修改
  <bean id="userService" class="com.itheima.ioc.service.impl.UserServiceImpl">
  	<property name="userDao" ref="userDao"/>
  </bean>
  ```

### 普通数据类型注入

配置文件中，不使用ref，使用value

### 集合类型注入

- List

  ```xml
  <property name="list">
  	<list>
      <value>aaa</value>
      <value>bbb</value>
      <value>ccc</value>
      <!-- 如果是引用类型则使用 -->
      <ref bean="beanId"/>
      <ref bean="beanId"/>
    </list>
  </property>
  ```

- Map

  ```xml
  <property name="map">
  	<map>
      <entry key="user1" value-ref="user1id"></entry>
      <entry key="user2" value-ref="user2id"></entry>
    </map>
  </property>
  ```

- Properties

  ```xml
  <property name="map">
  	<props>
      <prop key="p1">p1</prop>
      <prop key="p2">p2</prop>
      <prop key="p3">p3</prop>
    </props>
  </property>
  ```

  

## 注解开发

Spring是轻代码重配置的框架，配置比较繁琐，注解可以简化配置，提升效率

### 原始注解

主要是代替`<Bean>`中自定义开发的bean的配置

|      注解       |                            说明                            |
| :-------------: | :--------------------------------------------------------: |
| **@Component**  |                  使用在类上用于实例化Bean                  |
| **@Controller** |               使用在Web层类上用于实例化Bean                |
|  **@Service**   |             使用在Service层类上用于实例化Bean              |
| **@Repository** |               使用在Dao层类上用于实例化Bean                |
| **@Autowired**  |              使用在字段上用于根据类型依赖注入              |
| **@Qualifier**  |       结合@Autowired一起使用用于根据名称进行依赖注入       |
|  **@Resource**  |      相当于@Autowired+@Qualifier，意思是按照名称注入       |
|   **@Value**    |        注入普通属性，结合spl使用: @Value(${value})         |
|   **@Scope**    | 标注Bean的作用范围(Singleton、prototype、request、session) |
| @PostConstruct  |          使用在方法上标注该方法是Bean的初始化方法          |
|   @PreDestroy   |           使用在方法上标注该方法是Bean的销毁方法           |

@Resource：在spring中允许省略name属性值，省略后在以下情况中代表不同的行为

- 注解标注set方法时省略name属性，如setXXX()，则name值默认为xXX，去掉“set”，首字母小写
- **注解直接标注变量时省略name属性，则那么name值默认与所标注变量名相同**
- 如果@Resource省略name属性后，**按其默认规则没有找到所需要注入的Bean时，则采用byType的方式寻找**，即寻找与所标注set方法参数类型或所标注变量类型相匹配的Bean，如有唯一匹配则直接注入，如有多个匹配，则抛出异常

使用注解进行开发时，**需要在applicationContext.xml中配置组件扫描，指定哪个包下的Bean需要进行扫描以便识别使用注解配置的类、字段和方法**

```xml
<context:component-scan base-package="包名"/>
```

### 新注解

|      注解       |                             说明                             |
| :-------------: | :----------------------------------------------------------: |
| @Configuration  | 用于指定当前类时一个Spring配置类，当创建容器时会从该类上加载注解 |
| @ComponentScan  |            用于指定Spring在初始化容器时要扫描的包            |
|      @Bean      |     使用在方法上，标注将该方法的返回值存储到Spring容器中     |
| @PropertySource |                 用于加载.properties文件配置                  |
|     @Import     |                      用于导入其他配置类                      |

```java
@Configuration
@ComponentScan("com.itheima")
@Import({DataSourceConfiguration.class})
public class SpringConfiguration {
}
```

```java
@Configuration
@PropertySource("classpath:jdbc.properties")
public class DataSourceConfiguration {

    @Value("${jdbc.driver}")
    private String driver;
    @Value("${jdbc.url}")
    private String url;
    @Value("${jdbc.username}")
    private String username;
    @Value("${jdbc.password}")
    private String password;

    @Bean("dataSource")
    public DataSource getDataSource() throws Exception {
        ComboPooledDataSource dataSource = new ComboPooledDataSource();
        dataSource.setDriverClass(driver);
        dataSource.setJdbcUrl(url);
        dataSource.setUser(username);
        dataSource.setPassword(password);
        return dataSource;
    }
}
```

**结合新注解与原始注解达到全注解开发**

## 整合Junit

Junit中每一个测试方法都需要通过加载配置文件获取Spring容器，比较繁琐。

解决思路：

- 让SpringJunit加载配置文件创建Spring容器称告诉它
- 将需要测试的Bean直接在测试类中进行注入

步骤：

1. 导入SpringJunit的Maven坐标
2. 使用@Runwith代替原来的运行期(默认是junit执行测试方法，需要替换为由SpringJUnit4ClassRunner执行测试方法)
3. 使用@ContextConfiguration指定文件或配置类
4. 使用@Autowired注入需要测试的对象
5. 创建测试方法进行测试

实现：

```java
@RunWith(SpringJUnit4ClassRunner.class) //由该类来帮助我们执行测试方法
//@ContextConfiguration("classpath:applicationContext.xml") //配置文件方式
@ContextConfiguration(classes = SpringConfiguration.class)	//注解@Configuration方式
public class SpringJunitTest {

    @Autowired
    private UserService userService;

    @Test
    public void test1() {
        this.userService.save();
    }
}
```

## AOP

作用：在不修改源码的情况下对方法进行功能增强

优势：抽取代码，减少重复代码，便于维护

底层实现：通过**Spring提供的动态代理技术**实现，生成的代理对象执行方法时先进行功能增强的介入，再去调用目标对象方法

常用的动态代理技术：

- JDK代理：基于**接口**的动态代理技术（缺陷：必须有接口）
- cglib代理：基于**父类**的动态代理技术

### 基于JDK的动态代理

![image-20200711183642107](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1ggn7trpl4aj30r20euq73.jpg)

寻找目标对象实现的接口，对接口动态地生成一个代理实现对象，目标对象与代理对象是兄弟关系的

```java
public class ProxyTest {
    public static void main(String[] args) {
        //增强对象
        final Advice advice = new Advice();
        //目标对象
        final Target target = new Target();
        //动态生成一个目标对象的兄弟对象
        TargetInterface proxy = (TargetInterface) Proxy.newProxyInstance(
                target.getClass().getClassLoader(),
                target.getClass().getInterfaces(),
                new InvocationHandler() {
                    @Override
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        //前置增强
                        advice.before();
                        Object invoke = method.invoke(target, args);
                        //后置增强
                        advice.after();
                        return invoke;
                    }
                });
        proxy.save();
    }
}
```



### 基于cglib的动态代理

![image-20200711183918941](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1ggn7wgbsnoj30m60fqtbr.jpg)

对目标对象动态地生成一个子对象

```java
public static void main(final String[] args) {
  //增强对象
  final Advice advice = new Advice();
  //目标对象
  final Target target = new Target();
  //动态生成的子对象
  //1、创建增强器
  Enhancer enhancer = new Enhancer();
  //2、设置父类（目标对象）
  enhancer.setSuperclass(target.getClass());
  //3、设置回掉函数
  enhancer.setCallback(new MethodInterceptor() {
    @Override
    public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
      advice.before();
      Object invoke = method.invoke(target, objects);
      advice.after();
      return invoke;
    }
  });
  //4、创建代理对象
  Target proxy = (Target) enhancer.create();
  proxy.save();
}
```

### 相关概念

- Target（目标对象）：代理的目标对象
- Proxy（代理）：一个类被AOP增强后，产生一个结果代理类
- Joinpoint（连接点）：被拦截到的点。在Spring中指的是**方法**。**可以被增强的方法**叫连接点
- **Pointcut**（切入点）：对哪些Joinpoint进行拦截的定义。**真正需要被增强的方法**叫切入点
- **Advice**（通知/增强）：拦截到Joinpoint之后所要做的事情。**需要加入的增强的方法**
- **Aspect**（切面）：切入点和增强的结合
- **Weaving**（织入）：把增强应用到目标对象来创建新的代理对象的过程。**切入点和增强结合的过程**。Spring采用动态代理织入

### 明确事项

- 需要编写的内容

  1. 目标对象的目标方法（需要增强的切入点）（**切点**）
  2. 编写切面类，切面类中的增强方法（**通知**）
  3. 配置织入关系（将哪些通知和哪些连接点进行结合）（**织入**）

- AOP实现的内容

  Spring监控切入点方法的执行，一旦切入点方法被执行，使用代理机制，动态创建目标对象的代理对象，根据通知类型（前置、后置），在代理对象的对应位置，将通知对应功能织入，完成完整过程

- AOP底层使用哪种代理方式

  根据目标对象对应的类是否实现了接口来决定采用的方式，如果有实现接口，则使用基于jdk的代理方式，否则使用基于cglib的代理方式

### XML方式的AOP开发

```xml
<!--配置目标对象-->
<bean id="target" class="com.itheima.Target"/>

<!--配置切面对象-->
<bean id="aspect" class="com.itheima.Aspect"/>

<!--配置织入：告诉Spring框架哪些方法需要被哪些增强-->
<aop:config>
  <!--声明切面-->
  <aop:aspect ref="aspect">
    <!--切面：切入点(切点表达式)+通知-->
    <aop:before method="before" pointcut="execution(public void com.itheima.Target.save())"/>
  </aop:aspect>
</aop:config>
```

1. 把目标对象、切面对象都交由Spring的IoC容器管理
2. 配置织入：`<aop:config>`
   1. 声明切面类`<aop:aspect ref="切面类引用">`
   2. 声明通知、切入点`<aop:before(通知类型) method="通知方法" point-cut="execution(切点表达式)">`

#### 切点表达式

`execution([修饰符] 返回值类型 包名.类名.方法名(参数类型))`

- 返回值类型、包名、类名、方法名可以使用星号* 代表任意
- 包名中使用`..`表示当前包及其子包下的类
- 参数列表使用`..`表示任意个数、类型的参数列表

**抽取**：

```xml
<!--配置织入：告诉Spring框架哪些方法需要被哪些增强-->
<aop:config>
  <!--声明切面-->
  <aop:aspect ref="aspect">
    <!--抽取切点表达式-->
    <aop:pointcut id="pointcut" expression="execution(* com.itheima.*.*(..))"/>
    <!--切面：切入点(切点表达式)+通知-->
    <aop:before method="before" pointcut-ref="pointcut"/>
    <aop:after-returning method="afterReturning" pointcut-ref="pointcut"/>
    <aop:around method="around" pointcut-ref="pointcut"/>
    <aop:after-throwing method="afterThrowing" pointcut-ref="pointcut"/>
    <aop:after method="after" pointcut-ref="pointcut"/>
  </aop:aspect>
</aop:config>
```

#### 通知类型

`<aop:通知类型 method="切面类中方法名" pointcut="切点表达式"/>`

|     名称     |          标签           |                     说明                     |
| :----------: | :---------------------: | :------------------------------------------: |
|   前置通知   |     `<aop:before>`      |        前置通知，在切入点方法之前执行        |
|   后置通知   | `<aop:after-returning>` |        后置通知，在切入点方法之后执行        |
|   环绕通知   |     `<aop:around>`      |     环绕通知，在切入点方法之前之后都执行     |
| 异常抛出通知 |    `<aop:throwing>`     |   异常抛出通知，在切入点方法出现异常时执行   |
|   最终通知   |      `<aop:after>`      | 最终通知，无论切入点执行是否有有异常都会执行 |

```xml
<aop:before method="before" pointcut="execution(* com.itheima.*.*(..))"/>
<aop:after-returning method="afterReturning" pointcut="execution(* com.itheima.*.*(..))"/>
<aop:around method="around" pointcut="execution(* com.itheima.*.*(..))"/>
<aop:after-throwing method="afterThrowing" pointcut="execution(* com.itheima.*.*(..))"/>
<aop:after method="after" pointcut="execution(* com.itheima.*.*(..))"/>
```

没有异常抛出的通知执行

![image-20200712001518331](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1ggnhm1nw9ij30bs09amxq.jpg)

有异常抛出的通知执行

![image-20200712001543888](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1ggnhmhix3gj30a406c74l.jpg)

### 注解方式的AOP开发

```xml
<!-- 扫描bean -->
<context:component-scan base-package="com.itheima"/>
<!-- 开启aop自动代理 -->
<aop:aspectj-autoproxy/>
```

**切面类定义**：

```java
@Component
@Aspect //标注当前类是一个切面类
public class Aspect {}
```

**通知配置的语法**：`@通知形式("切点表达式")`：`@Before("execution(* com.itheima.*.*(..))")`

**切点表达式的抽取**

```java
@Pointcut("execution(* com.itheima.*.*(..))")
public void pointcut() {}

@After("pointcut()")
public void after() {
  System.out.println("最终增强...");
}
```

## Spring JdbcTemplate

开发步骤：

1. 导入spring-jdbc和spring-tx(事务模块)坐标
2. 创建数据库表和实体
3. 创建JdbcTemplate对象
4. 设置数据源对象（连接池）
5. 执行数据库操作

```java
public void test1() {
  //数据源对象
  DruidDataSource druidDataSource = new DruidDataSource();
  druidDataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
  druidDataSource.setUrl("jdbc:mysql://localhost:3306/test");
  druidDataSource.setUsername("root");
  druidDataSource.setPassword("root");
  //JdbcTemplate对象
  JdbcTemplate jdbcTemplate = new JdbcTemplate();
  //设置数据源
  jdbcTemplate.setDataSource(druidDataSource);
  //执行操作
  int row = jdbcTemplate.update("insert into account value(?, ?, ?)", null, "tom", 5000);
  System.out.println(row);
}
```

### 创建权交由Spring

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

		<!--加载jdbc.properties文件-->
    <context:property-placeholder location="classpath:jdbc.properties"/>

    <!--数据源对象-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>

    <!--jdbc模板对象-->
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        <property name="dataSource" ref="dataSource"/>
    </bean>
</beans>
```

## 事务控制

编程式：使用API操作

声明式：使用配置的方式

### 编程式事务控制相关对象

`PlatformTransactionManager`：接口，Spring的事务管理器

**不同的dao层技术由不同的实现类**，jdbc/mybatis：DataSourceTransactionManager；hibernate：HibernateTransactionManager

`TransactionDefinition`：事务的定义信息对象。设置/获取事务隔离级别、传播行为等

事务隔离级别：

1. 默认，数据库默认哪种就用哪种
2. 读未提交，三种问题都不能解决
3. 读已提交，能解决脏读
4. 可重复读，能解决脏读，不可重复读
5. 串行化，能解决脏读，不可重复读，幻读，但是性能很低

事务传播行为：解决A业务方法调用B业务方法时事务统一性的问题

1. REQUIRED：**默认**，如果A业务方法没有事务，B业务方法就新建一个事务；如果A业务方法已存在事务，那么B业务方法就加入到A的事务中
2. SUPPORTS：如果A业务方法有事务，那么B方法就支持当前事务；如果A方法没有事务，那么B方法就以非事务方式执行
3. MANDATORY：如果A方法有事务，就使用当前事务；如果A方法没有事务，那么B方法抛出异常

超时时间：默认没有超时

是否只读：建议查询方法时设置为只读

`TransactionStatus`：事务具体的运行状态：是否完成、是否会滚等

### 基于XML的声明式事务控制

声明式的目的：事务管理属于系统层面的服务，不应该与业务逻辑耦合，完成解耦

声明式事务控制底层就是AOP

```xml
<!--需要注入tx、aop的命名空间-->

<!--配置一个平台事务管理器，这里使用jdbc，所以使用DataSourceTransactionManager-->
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
  <!--注入dataSource是需要拿到connection对象来控制事务-->
  <property name="dataSource" ref="dataSource"/>
</bean>

<!--事务控制， 通知：事务增强-->
<tx:advice id="txAdvice" transaction-manager="transactionManager">
  <!--设置事务属性信息-->
  <tx:attributes>
    <!--为切点方法设置事务信息-->
    <!--*为通配符，代表任意方法，也可以作为方法名前缀后缀；也可以单独地为某个切点方法设置属于自己的事务信息-->
    <tx:method name="*" isolation="DEFAULT" propagation="REQUIRED" timeout="-1" read-only="false"/>
  </tx:attributes>
</tx:advice>

<!--配置事务的AOP织入-->
<aop:config>
  <!--普通切面：aspect；事务切面：advisor-->
  <aop:advisor advice-ref="txAdvice" pointcut="execution(* com.itheima.service.impl.*.*(..))"/>
</aop:config>
```

- 平台事务管理器配置
- 事务通知的配置
  - 引入前面配置好的平台事务管理器
  - 可以为不同方法配置不同的事务参数
- 事务aop织入的配置
  - 事务的aop采用advisor

### 基于注解的声明式事务控制

```xml
<!--事务的注解驱动-->
<tx:annotation-driven transaction-manager="transactionManager"/>
```

```java
@Service
//在类上面配置的话事务信息适用所有方法
@Transactional(isolation = Isolation.REPEATABLE_READ)
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountDao accountDao;

  	//可以单独为方法配置事务信息，采用就近原则
    @Transactional(isolation = Isolation.DEFAULT)
    public void transfer(String outMan, String inMan, Double money) {
        accountDao.out(outMan, money);
				//int i = 1/0; //制造错误
        accountDao.in(inMan, money);
    }
}
```

- 使用`@Transactional`在需要进行事务控制的类或方法上修饰，注解的属性和xml配置方式相同，可配置事务的隔离级别、传播行为等
- 在xml配置文件中要开启事务注解驱动`<tx: annotation-driven/>`

# 基础知识学习-- Mic

## Spring Boot

### Spring Boot核心内容

- Starter组件，提供开箱即用的组件
- 自动装配，自动根据上下文完成bean的装配（最核心部分）
- Actuator，SpringBoot的应用监控
- SpringBootCLI，基于命令行工具快速构建SpringBoot应用

Starter组件核心部分也是基于自动装配来实现

### Spring Boot自动装配原理

#### 例子效果

添加redis的相关starter后，即可在程序中使用RedisTemplate，无需使用XML形式或注解形式来把它注入到IoC容器中

#### 自动装配的实现

- 如果使用全注解方式进行Bean的装配，则需要@Configuration和@Bean同时配合。而@EnableXXX注解就是对这两个注解的封装，把相关组件的Bean装配到IoC容器中
- @EnableXXX注解中都会携带一个@Import注解，**Spring会解析到@Import导入的配置类，从而实现Bean的装配**。常见的@EnableScheduling注解中就包含了@Import({SchedulingConfiguration.class})

#### Spring Boot自动装配的实现

- Spring Boot的自动装配的实现是通过@SpringBootApplication中的@EnableAutoConfiguration实现，但是其中@Import导入的不是XXXConfiguration，而是一个AutoConfigurationImportSelector
- AutoConfigurationImportSelector实现了ImportSelector接口，这个接口只有一个selectImports方法，这个方法返回一个String数组，里面需要指定需要装配到IoC容器的类

##### Configuration和Selector的区别

ImportSelector更为灵活，还可以实现批量装配，并且可以根据上下文来决定哪些类能够被IoC容器初始化

#### Spring Boot自动装配原理

最终调用getAutoConfigurationEntry来获得所有需要自动装配的配置类

# 注解

## @RequestMapping 

- 一个用来处理请求地址映射的注解，它提供路由信息 
- 用在类上
  - 表示类中的所有响应请求的方法都是以该地址作为**父路径** 
- 用在方法上
  - 表示请求该方法的路径
- value：路径
- method：请求方法：get/post等
- consumes：指定处理请求的提交内容类型（Content-Type），也就是说前端发送过来的数据必须要符合这种内容类型。例如application/json，text/html等
- produces：指定返回的内容类型，**仅当request请求头中的(Accept)类型中包含该指定类型才返回**

## @RestController

- 效果：@Controller+@ResponseBody
- 注解告诉Spring以**json字符串**的形式渲染结果，并**直接返回**给调用者 

**一个请求方法只可以有一个`@RequestBody`，但可以有多个`@RequestParam`和`@PathVariable`**

### @RequestParam

用于获取查询参数

- value：参数名，必须对应上
- required：是否必须，默认`true`
- default：默认值

### @PathVariable

用于获取路径参数，直接拼接在url后即可

### @RequestBody

获取请求体并且ContentType为application/json格式的参数，将JSON数据反序列化成Java对象

### @ResponseBody

将Java对象序列化为JSON数据，用来作为返回数据输出到前端

## @Autowired

### Spring中三种依赖注入的方式

#### 基于 constrctor 注入

```java
private final DependencyA dependencyA;
private final DependencyB dependencyB;
private final DependencyC dependencyC;
 
@Autowired
public DI(DependencyA dependencyA, DependencyB dependencyB, DependencyC dependencyC) {
    this.dependencyA = dependencyA;
    this.dependencyB = dependencyB;
    this.dependencyC = dependencyC;
}
```

> 在Spring 4.3 版本后，如果这个类只有一个构造方法，那么这个构造方法上面的`@Autowired`可以省略

- 优点：基于constructor的注入，会**固定依赖注入的顺序**；该方式不允许我们创建bean对象之间的循环依赖关系，这种限制其实是一种利用构造器来注入的益处 - 当你甚至没有注意到使用setter注入的时候，Spring**能解决循环依赖**的问题
- **明显缺点**：假如我们需要注入的对象特别多的时候，我们的构造器就会显得非常的冗余、不好看，非常影响美观和可读性，维护起来也较为困难。解决手段：使用Lombok插件中的`@RequiredArgsConstructor`注解，省去手动编写构造方法的工作

#### 基于 setter 注入

```java
private DependencyA dependencyA;
private DependencyB dependencyB;
private DependencyC dependencyC;
 
@Autowired
public void setDependencyA(DependencyA dependencyA) {
    this.dependencyA = dependencyA;
}
 
@Autowired
public void setDependencyB(DependencyB dependencyB) {
    this.dependencyB = dependencyB;
}
 
@Autowired
public void setDependencyC(DependencyC dependencyC) {
    this.dependencyC = dependencyC;
}
```

> 在Spring 4.3 版本后，setter方法上面的`@Autowired`可以省略

- 优点：基于setter的注入，只有**当对象是需要被注入的时候它才会帮助我们注入依赖，而不是在初始化的时候就注入**；另一方面如果你使用基于constructor注入，CGLIB不能创建一个代理，迫使你使用基于接口的代理或虚拟的无参数构造函数
- 缺点：我们不能将对象设为final的

#### 基于 filed 注入

```java
@Autowired
private DependencyA dependencyA;
 
@Autowired
private DependencyB dependencyB;
 
@Autowired
private DependencyC dependencyC;
```

- 优点：**精短，可读性高**，不需要多余的代码，也方便维护
- 缺点：
  - 添加依赖过于简单，往往导致一个类注入了非常多的bean，违背单一职责原则
  - 无法构建不可变对象（`final`修饰的变量），导致有空指针异常的可能
  - 类与容器高度耦合，不能在容器外部单独实例化；类不能绕过反射进行实例化（例如单元测试中），必须通过依赖容器才能去实例化它，这更像集成测试

### 装配顺序

例子，Svc接口有三个实现类SvcA、SvcB、SvcC

```java
@Autowired
@Qualifier(value="svcB")
private Svc svcA;
```

1. 默认按照`type`在上下文中查找匹配的bean。即查找**类型**是Svc的bean
2. 如果没有`@Qualifier`注解，则按照变量名进行匹配。即查找**名字**为svcA的bean
3. 如果有`@Qualifier`注解，则按照`@Qualifier`中指定的`name`进行匹配。即查找**名字**为svcB的bean
4. 如果上述情况都没找到，由于`@Autowired`的required值默认为true，会导致报错

### 总结

- 强制性的依赖性或者当目标不可变时，使用构造函数注入（**尽量都使用构造器来注入**）
- 可选或多变的依赖使用setter注入（**可以使用构造器结合setter的方式来注入**）
- 在大多数的情况下避免field域注入（**感觉大多数同学可能会有异议，毕竟这个方式写起来非常简便，但是它的弊端确实远大于这些优点**）
- Spring 4 推荐constructor注入

## @Inject

在Spring 的环境下，**`@Inject`和`@Autowired` 是相同的** ，因为它们的依赖注入都是使用`AutowiredAnnotationBeanPostProcessor`来处理的。

## @Resource

这是JDK的注解，不属于Spring，但是Spring实现了对它的支持

`@Resource`有两个重要的属性：`name`和`type`，而Spring 将`@Resource`注解的`name`属性解析为bean的名字，而`type`属性则解析为bean的类型。

### 装配顺序

1. 如果同时指定了`name`和`type`，则Spring会从上下文中寻找两项条件都唯一匹配的bean进行装配，否则抛出异常
2. 如果指定了`name`，则Spring会从上下文中查找**名字**为指定值的bean进行装配
3. 如果指定了`type`，则Spring会从上下文中查找**类型**为指定值的bean进行装配
4. 如果`name`和`type`都没有指定，则**默认按照名字**来进行装配；如果**没有则按照类型**进行装配；如果还是没有，则抛出异常

## @Scope

Spring中声明Bean的作用域

- singleton：唯一bean实例（单例）**默认**
- prototype：每次请求都新建一个新的bean实例
- request：每一次 HTTP 请求都会产生一个新的 bean，该 bean 仅在当前 HTTP request 内有效
- session：每一次 HTTP 请求都会产生一个新的 bean，该 bean 仅在当前 HTTP session 内有效

## @Configuration

允许在 Spring 上下文中注册额外的 bean 或导入其他配置类

## @Conditional

按照一定的条件进行判断，满足条件给容器注册bean

### 标注在方法上

```java
@Configuration
public class BeanConfig {
 
    //如果WindowsCondition的实现方法返回true，则注入这个bean    
    @Conditional({WindowsCondition.class})
    @Bean("bill")
    public Person person1(){
        return new Person("Bill Gates",62);
    }
 
    //如果LinuxCondition的实现方法返回true，则注入这个bean
    @Conditional({LinuxCondition.class})
    @Bean("linus")
    public Person person2(){
        return new Person("Linus",48);
    }
  
  	//WindowsCondition、LinuxCondition类各自实现Condition接口实现matches方法
  	//matches方法根据既定的条件返回ture、false，@Conditional注解再根据结果来加载对应的Bean
}

@Test
public void test1(){
  String osName = applicationContext.getEnvironment().getProperty("os.name");
  System.out.println("当前系统为：" + osName);
  Map<String, Person> map = applicationContext.getBeansOfType(Person.class);
  //根据操作系统来加载Bean
  System.out.println(map);
}
```

### 标注在类上

一个类中可以注入很多实例，@Conditional标注在类上就决定了一批bean是否注入。

```java
//只要满足WindowsCondition中的条件，则同时加载bill、linus
@Conditional({WindowsCondition.class})
@Configuration
public class BeanConfig {
 
    @Bean("bill")
    public Person person1(){
        return new Person("Bill Gates",62);
    }
 
    @Bean("linus")
    public Person person2(){
        return new Person("Linus",48);
    }
}
```

### Condition中有多个条件类

逻辑关系是「与」关系，只有同时满足多个条件，才加载对应的bean

### @ConditionalOnBean

如果应用上下文中「有」对应的条件Bean，才会加载被修饰的bean

###  @ConditionalOnMissingBean

如果应用上下文中「没有」对应的条件Bean，才会加载被修饰的bean

### @ConditionalOnClass

如果某个类「存在」classpath中，才会加载被修饰的bean

### @ConditionalOnMissingClass

如果某个类「不存在」classpath中，才会加载被修饰的bean

### @ConditionalOnProperty

与配置文件共同决定是否加载bean

```java
@Conditional({OnPropertyCondition.class})
public @interface ConditionalOnProperty {
  	// 获取对应property名称的值，与name不可同时使用(代表name)
    String[] value() default {};

  	// 配置属性名称的前缀，比如spring.http.encoding，可以和name组合使用，组成完整的配置属性名称
    // 如果前缀不是.结尾的，会自动加上
    String prefix() default "";

    // 数组，配置属性完整名称或部分名称
    // 获取对应property名称的值，与value不可同时使用
    String[] name() default {};

  	// 可与name组合使用，比较获取到的属性值与havingValue给定的值是否相同，相同才加载配置
    String havingValue() default "";

  	// 缺少该配置属性时是否可以加载。如果为true，没有该配置prefix+name代表的属性时也会正常加载；反之则不会生效
    boolean matchIfMissing() default false;
}
```

- prefix+name来确定配置文件中属性的键、判断键的值是否和havingValue相同，相同才加载。
- 可以不必按照prefix+name来确定键，可以省略prefix，直接用name来确定
- 如果指定了matchIfMissing为ture，那么配置文件中不填写该属性也可以正常地加载bean



# 常见操作--推文

## SpringBoot 读取配置文件

### 配置文件默认路径

如果没有更改默认的配置文件位置，那么 SpringBoot 会从以下这四个位置加载配置文件

- 模块根目录下的 config 目录下的配置文件
- 模块根目录下的配置文件
- resources 目录（classpath）下的 config 目录下的配置文件
- resources 目录（classpath）下的配置文件

如果需要修改配置文件位置，可以在启动命令中加入 `--spring.config.location` 来修改



### 配置文件加载优先级

SpringBoot 应用加载配置文件会有优先级，各个配置文件会进行互补配置，但高优先级的配置项会覆盖低优先级的配置项

#### 同一应用中

- 模块根目录下的 config 目录下的配置文件
- 模块根目录下的配置文件
- resources 目录（classpath）下的 config 目录下的配置文件
- resources 目录（classpath）下的配置文件

#### 不同类型

- properties
- yaml
- yml

从 `spring-boot-starter-parent` 中看到这三种文件的加载顺序，从上往下加载，下面的会覆盖上面的

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211213153125.png)

#### 配置中心

SpringBoot 应用配置优先级：命令行参数 > 操作系统环境变量 > 应用外的配置文件 > 应用内的配置文件

SpringCloud 应用引入配置文件中配置优先级：配置中心 > 命令行参数 > 操作系统环境变量 > 应用内的配置文件

设计者认为配置中心的优先级就是最高的，不允许外部修改，如果需要覆盖，要在远程配置中加入这段配置

```yaml
spring:
	cloud:
		config:
			allowOverride: true
			overrideNode: true
			overrideSystemProperties: false
```



### @Value

Spring 为大家提供许多开箱即用的功能，`@Value` 就是一个极其常用的功能，它能将配置信息注入到 bean 中去

#### 基本使用

在配置文件中定义好的配置，使用 `@Value` 通过 el 表达式来读取，读取的规则是 `${配置路径}`

```yaml
custom:
	savePath : /Users/a/Desktop/test998/
```

```java
@Component
public class TestService {
    
    // "/Users/a/Desktop/test998/"
    @Value("${custom.savePath}")
    private  String savePath ;
}
```



#### 默认值

如果在 el 表达式中指定默认值的话，那么当读取配置文件发现键不存在时使用默认值

```java
@Component
public class TestService {
    
    // "abcdef"
    @Value("${custom.savePath:abcdef}")
    private  String savePath ;
}
```



#### 读取数组数据

```yaml
test:
  array1: aaa,bbb,ccc
  array2: 111,222,333
  array3: 11.1,22.2,33.3
```

虽然数组在具体业务代码中数据操作上没有 `List` 等集合方便，但是在这方面比集合更为方便，不需要额外的配置类，而且仅仅使用逗号分割即可

读取时直接指定属性路径，并把接收的属性设置为具体类型的数组即可，甚至可以设置默认值

```java
@Value("${test.array1:}")
private String[] testArray1;

@Value("${test.array2:}")
private int[] testArray2;

@Value("${test.array3:}")
private double[] testArray3;
```

冒号后的值表示当 key 不存在的时候使用的默认值，数组的 length 为 0，**并非为空数组**



#### 读取集合数据

```yaml
test2:
  collection:
    list: aaa,bbb,ccc
    set: 111,222,333,111
```

集合这类数据结构在操作中拥有着无可比拟的简便性，但是读取集合数据并非一蹴而就，不像读取数组时那么简单方便，需要借助 el 表达式来完成

先使用 `split()` 函数进行切分，为了避免不配置这个 key 时会报错，需要加上默认值

```java
@Value("#{'${test2.collection.list:}'.split(',')}")
private List<String> testList;
```

但是这样做还有个问题，当不配置该 key 值，默认值会为 `""` ，它的 size = 1（不同于数组，length = 0），这样解析出来的 list 就不是空了，这样会产生数据不一致的问题，所以要在使用 `split()` 函数之前先判定是否为空，所以最终版为

```java
@Value("#{'${test2.collection.list:}'.empty ? null : '${test2.collection.list:}'.split(',')}")
private List<String> testList;
@Value("#{'${test2.collection.set:}'.empty ? null : '${test2.collection.set:}'.split(',')}")
private Set<String> setList;
```



#### @PropertySource

一般来说用得不多，因为配置文件都处于默认情况下是不需要的

需要使用 `@PropertySource` 的情况是

- 配置文件不在默认目录下
- 多配置文件引用。如果多个配置文件中有同名的属性值，则取数组中最后一个配置文件中的属性



#### 总结

平常开发中，读取配置文件的情况还是很常见的，使用 `@Value` 结合 el 表达式来读取配置文件的方式能覆盖绝大部分的应用场景，用起来也相对方便；而对于自定义的配置我个人不是十分推荐这种做法，在团队的开发中，使用 `@Value` 来读取配置文件与维护配置文件的统一管控可能存在难度，配置文件的修改可能无法及时同步到代码上，我倾向于使用面向对象的方式管理自定义的配置



### @ConfigurationProperties

相较于 `@Value` 的使用简便，这个 `@ConfigurationProperties` 注解则略显笨重，需要用一个配置类来组织自定义的配置

#### 基本使用

#### 读取集合数据

```yaml
test:
  collection:
    list:
      - aaa
      - bbb
      - ccc
    set:
      - 111
      - 222
      - 333
      - 111
    map:
      name: zhangsan
      sex: male
      math: 90
      english: 85
```

集合数据的读取，除了可以使用 `@Value` + el 表达式 的方式读取，也可以使用配置类来完成

新增配置类这个方式比较贴合面向对象的方式，并且当在 maven 中引入 configuration-processor 依赖后，可以把配置文件的键和配置类的属性名建立联系（输入时会提示键名）。缺点是当配置需要变动时，配置类需要修改，不符合开闭原则

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```

```java
@Data
@Component
@ConfigurationProperties(prefix = "test.collection")
public class CollectionProperties {
    private List<String> list;
    private Set<Integer> set;
    private Map<String, Object> map;
}
```

如果使用了 `@Component` 注解，就把这个配置类标记成一个 bean ，然后使用的时候就像普通的 bean 一样注入就可以了

```java
@Autowired
private CollectionProperties collectionProperties;
```



#### @EnableConfigurationProperties

有时候 `ConfigurationProperties` 注解会配合这个注解进行使用，由一个大的配置类来管理多个 Properties ，这种做法的不足是需要新加配置类来进行统一管理，一般把 Properties 都写到同一个包路径下也可以达到统一管理的目的，但是这种做法的统一性会更强

```java
@Data
@ConfigurationProperties(prefix = "biz.order")
public class OrderModuleProperties {
    // ...
}


@Data
@ConfigurationProperties(prefix = "biz.pay")
public class PayModuleProperties {
    // ...
}


@Configuration
@EnableConfigurationProperties(value = {OrderModuleProperties.class, PayModuleProperties.class})
public class CustomPropertiesConfiguration {
    // ...
}
```



## SpringBoot异常处理

### @ControllerAdvice

被这个注解修饰的类是全局异常处理类

其中`assignableTypes`指定特定的Controller类，可以让这个异常处理类特定地处理这些Controller抛出的异常

### @ExceptionHandler

被这个注解修饰的方法是异常处理类中处理具体异常的方法

`value`可以指定特定的异常类，可以写`Exception.class`，代表抛出的所有异常都由这个方法来处理

### ResponseStatusException

一般作为发生异常时抛出的异常

提供三个属性

- status：http请求状态吗
- reason：错误消息
- cause：抛出的异常(Throwable的子类)

## SpringBoot关于实体的操作

### @Entity

说明这个class是实体类，并且使用默认的orm规则

class名即数据库表中表名，class字段名即表中的字段名，但是一般不会一一对应上，所以会使用`@Table`指定表名和`@Column`指定列名

### @Table

指定这个实体类映射的数据库中的表（修改orm规则）（声明表名）

### @Column

指定这个列映射的数据库中表的字段名（修改orm规则）（声明字段名）

### 创建主键

#### @Id

声明一个字段为主键

#### @GeneratedValue

通过`strategy`来指定主键生成策略

`GenerationType`有四种主键生成策略

- TABLE：使用一个特定的数据库表格来保存主键
- SEQUENCE：在某些数据库中,不支持主键自增长,比如Oracle、PostgreSQL其提供了一种叫做"序列(sequence)"的机制生成主键
- IDENTITY：主键自增长
- AUTO：把主键生成策略交给持久化引擎（默认）

#### @GenericGenerator

指定自定义的主键生成策略

- name：自定义的策略名称
- strategy：使用的策略

```java
@Id
@GeneratedValue(strategy = GenerationType.AUTO, generator = "IdentityIdGenerator")
@GenericGenerator(name = "IdentityIdGenerator", strategy = "identity")
private Long id;

// ==========等价于==========

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

/**
 * 注意：
 * 1、上面部分中GeneratedValue中既使用了Auto，又使用了自定义生成策略，是使用自定义策略的写法，因为strategy默认值就是Auto
 * 2、GeneratedValue中的generator的值需要和GenericGenerator的name对应上
 * 3、GenericGenerator中的strategy的取值可从DefaultIdentifierGeneratorFactory查询
 */
```



### 枚举类型字段

#### @Enumerated

枚举类型字段需要使用其来修饰

需要通过value指定类型，这个类型由EnumType枚举类来维护，取值是**ORDINAL**(默认)、**STRING**

### 大字段

#### @Lob

@Lob 注解属性将被持久化为 数据库中的Blob 或 Clob 类型

#### @Basic

因为Blob、Clob这两种类型的数据一般占用的内存空间比较大，所以通常使用延迟加载的方式，可以与@Basic标记同时使用，设置加载方式为FetchType.LAZY

### 关联关系

#### @OneToOne

一对一关系；场景：水平分表后的外键关联

#### @OneToMany

一对多关系；场景：主表对从表

#### @ManyToOne

多对一关系；场景：从表对主表、一般的外键

#### @ManyToMany

多对多关系

### @Transient

不需要与数据库映射的字段，在保存的时候**不需要保存进数据库**（不参与数据库与程序数据流动的过程）

### @JsonIgnoreProperties

作用在类上时常用来标记不参与序列化的字段

**特别地**

```java
@JsonIgnoreProperties(value={"hibernateLazyInitializer","handler"})

//作用是在 json 序列化时忽略 bean 中的一些不需要转化的特别属性

//hibernateLazyInitializer
//因为jsonplugin用的是java的内审机制,hibernate会给被管理的pojo加入一个hibernateLazyInitializer属性,jsonplugin会把hibernateLazyInitializer也拿出来操作,并读取里面一个不能被反射操作的属性就产生了异常. 


//handler
//级联查询中会被加上handler属性
```

### @JsonIgnore

一般作用在属性上，用来声明此属性不需要参与序列化

### @JsonFormat @DateTimeFormat

`DateTimeFormat`

- 在请求非JSON数据时（如：`@RequestParam`、form-data），使用`@DateTimeFormat可以把日期String类型转换成对应的日期类型(Date、LocalDate等)`
- 在请求JSON数据的场景中，该注解的作用会失效
- pattern属性填写接受哪种格式的`String`类型的日期数据，如`yyyy-MM-dd HH:mm:ss`可以接受`2020-12-12 20:00:00`格式的数据

`JsonFormat`

- 在请求非JSON数据时（如：`@RequestParam`、form-data），使用`@DateTimeFormat`不能完成返回的日期数据格式化，需要搭配`@JsonFormat`完成返回时格式化的工作
- 在请求JSON数据时且使用了`@RequestBody`注解，使用`@JsonFormat`能实现接受参数时`String`类型的日期数据反序列化成对应的日期类型，也能实现在方法返回时日期数据序列化成对应格式的`String`类型的日期
- pattern属性填写接受哪种格式的`String`类型的日期数据，如`yyyy-MM-dd HH:mm:ss`可以接受`2020-12-12 20:00:00`格式的数据；timezone属性填写当前时区，一般填写`GMT+8`，因为有可能数据库所在的服务器时间不是东八区会造成时间误差

## SpringBoot中关于事务的内容

### @Transactional

能保证方法内多个数据库操作要么同时成功、要么同时失败。

- **作用于类**：表示该类所有`public`方法都配置相同的事务属性信息
- **作用于方法**：表示该方法使用事务；如果该方法所在的类和方法本身都使用了`@Transactional`，则会覆盖使用作用在方法上的事务信息
- **作用于接口**：不推荐这种方法。因为一旦标注在Interface上并且配置了Spring AOP 使用CGLib动态代理，将会导致`@Transactional`注解失效
- 默认情况下，事务只有遇到运行期异常才会自动回滚，可以设置为`rollbackFor=Exception.class`，那么这个事务的执行过程只要遇到异常都会回滚

### Spring中的事务分类

- 编程式事务：代码中手动管理事务的提交和回滚等操作，代码侵入性较强
- 声明式事务：基于`AOP`面向切面的，它将具体业务与事务处理部分解耦，代码侵入性很低
  - 基于`TX`和`AOP`的xml配置文件方式
  - 基于`@Transactional`注解

### @Transactional失效场景

- 应用到**非`public`**方法上
- propagation属性设置错误
- rollbackFor属性设置错误
- 同一个类中方法调用（只有当事务方法被当前类以外的代码调用时，才会由`Spring`生成的代理对象来管理）
- 事务方法内部由catch，无法抛出异常导致无法回滚
- 数据库引擎不支持事务（MyISAM）



# SpringBoot优化

优化的方向

- 线程数
- 超时时间
- jvm优化

## 线程数

主要是调整初始线程数和最大线程数

**初始线程数**保障刚启动时稳定接收大量请求

**最大线程数**来最大化使用资源来维持系统稳定

## 超时时间

超时时间用来保障连接数不容易被压垮，如果大批量延迟比较高的请求过来，不容易把线程打满，**宁愿丢包也不愿意把机器压垮**

## JVM优化

主要是调整初始堆和最大堆

- -Xms：jvm初始堆大小
- -Xmx：jvm最大堆大小

