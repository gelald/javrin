# Spring集成Web环境
## ApplicationContext应用上下文获取方式
应用上下文对象是通过`new ClassPathXmlApplicationContext(配置文件)`的方式获取的，但是每次从容器中获取Bean的时候都需要编写这一句代码

这样的弊端是：**配置文件加载多次，应用上下文对象创建多次，影响性能**

在Web项目中，可以使用`ServletContextListener`监听Web应用的启动，当Web应用启动时，就加载Spring配置文件，创建应用上下文对象`ApplicationContext`，将其存储到最大的域`ServletContext`中，这样就可以在任意位置从域中获取应用上下文对象了

## Spring提供获取应用上下文的工具
Spring提供了一个监听器`ContextLoaderListener`完成了上述功能的封装：内部加载Spring配置文件，创建应用上下文对象，并存储到`ServletContext`域中；另外还提供了一个客户端工具`WebApplicationContextUtils`供使用者获取应用上下文对象，使得使用者获取应用上下文对象时无需记住存入ServletContext域中的键

使用Spring提供的工具需要做：
1. 在`web.xml`中配置`ContextLoaderListener`监听器（导入spring-web坐标）
2. 使用`WebApplicationContextUtils`获取应用上下文对象`ApplicationContext`

# SpringMVC介绍
## SpringMVC开发步骤
1. 导入SpringMVC坐标
2. 配置SpringMVC核心控制器`DispatcherServlet`（前端控制器，负责共有行为）
3. 编写Controller
4. 使用注解`@Controller`配置到Spring容器中，并使用`@RequestMapping`注解配置业务方法的映射地址
5. 配置SpringMVC核心文件`spring-mvc.xml`配置组件扫描

## SpringMVC执行流程
![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20200804161600.png)
绿色这一块代表DispatcherServlet，接收请求，按照资源地址分发请求到对应的Controller处

# SpringMVC组件解析
## SpringMVC各个组件的分工
![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210912122708.png)

1. 用户从浏览器发送请求至**前端控制器DispatcherServlet**
2. DispatcherServlet收到请求后调用**处理器映射器HandlerMapping**
3. HandlerMapping根据xml配置或者注解找到具体的处理器Handler(Controller)，生成处理器对象及处理器拦截器封装成**处理器执行链HandlerExecutionChain**一并返回给DispatcherServlet
4. DispatcherServlet调用**处理器适配器HandlerAdapter**
5. HandlerAdapter调用具体的**处理器Handler(Controller)**
6. Controller执行完成返回**模型和视图对象ModalAndView**
7. HandlerAdapter将返回的ModalAndView再返回给DispatcherServlet
8. DispatcherServlet将ModalAndView传递给**视图解析器ViewResolver**
9. 由ViewResolver解析后返回**视图对象View**
10. DispatcherServlet根据View进行渲染视图生成**视图页面jsp**
11. DispatcherServlet响应用户
---
**重要组件**
- 前端控制器：DispatcherServlet   帮助调用其他公共组件
- 处理器映射器：HandlerMapping  根据请求地址返回一个执行链
- 处理器适配器：HandlerAdapter  被前端控制器调用，调用处理器
- 处理器：Handler  其实就是Controller
- 视图解析器：ViewResolver  把ModalAndView解析成View
- 视图：View  封装着视图的信息

## SpringMVC注解解析
- @Controller，相当于@Component，只不过赋予了语义；把当前类加入到Spring容器中
- @RequestMapping，把请求的地址进行映射到具体的（某个类的）某个方法上，建立请求URL和处理请求方法之间的对应关系
    - value: 指定请求的URL，和path属性一样
    - method: 指定请求的方法
    - params: 指定限制请求参数的条件。例如：params={"accountName"},表示请求参数必须要有accountName。params={"money!100"},表示请求参数中money不能是100
- @ResponseBody，告知SpringMVC框架，该方法不进行视图跳转，直接进行http响应体的方式响应数据

    
## SpringMVC ViewResolver的配置

```xml
<!--web.xml-->
<!--配置内部资源视图解析器-->
<bean id="viewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <!--配置前缀、后缀，无需每次都写，专注于jsp的文件名即可-->
    <property name="prefix" value="/jsp/"/>
    <property name="suffix" value=".jsp"/>
</bean>
```

# SpringMVC数据响应
**响应方式**
- 页面跳转
    - 直接返回字符串
    - 通过ModalAndView对象返回
- 返回数据
    - 直接返回字符串
    - 返回对象或集合

## 页面跳转
### 返回字符串形式
此种方式会将返回的字符串和视图解析器的前缀后缀拼接后进行跳转(默认的行为是转发forward，可以在字符串前面手动指定是转发或是重定向行为)
![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20200805112522.png)

### 返回ModalAndView对象
Modal：封装数据
View：展示数据

**形式一 : 手动new**
```java
@RequestMapping("/quick")
public ModalAndView quick() {
    ModalAndView modalAndView = new ModalAndView();
    //设置模型数据(键值对，数据在request域当中)
    modalAndView.addObject("key", "value");
    //设置视图名称
    modalAndView.setViewName("视图名称");
    return modalAndView;
}
```

**形式二 : 使用方法中的形参(SpringMVC注入)**
```java
@RequestMapping("/quick")
public ModalAndView quick(ModalAndView modalAndView) {
    //设置模型数据(键值对，数据在request域当中)
    modalAndView.addObject("key", "value");
    //设置视图名称
    modalAndView.setViewName("视图名称");
    return modalAndView;
}
```

**形式三 : ModalAndView拆开的形式** 传入数据，返回视图
```java
@RequestMapping("/quick")
public String quick(Modal modal) {
    //这个modal在视图中也可以调用
    modal.setAttribute("key", "value");
    return "视图名称";
}
```
## 数据回写
### 直接返回字符串
- Servlet的形式：`response.getWriter().print("字符串");`
- SpringMVC的形式：
    - 通过框架注入的response对象，然后的步骤和Servlet一样`response.getWriter().print("字符串");`，方法返回值为`void`
    - 使用注解`@ResponseBody`告知框架，方法返回的字符串不是视图文件名称而是直接在http响应体中返回

        ```java
        @ResponseBody
        @RequestMapping("/quick")
        public String quick(Modal modal) {
            return "hello";
        }
        ```

### 返回对象或集合
**配置方法一**
1. 注入jackson-core、jackson-databind、jackson-annotation依赖的坐标
2. 配置spring-mvc.xml配置文件，使用`MappingJackson2HttpMessageConverter`作为处理器映射器RequestMappingHandlerAdapter的消息转换器MessageConverter
    ```xml
    <!--配置转换器（自动序列化对象）-->
    <bean id="messageConverter" class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter"/>
    
    <!--配置处理器适配器-->
    <bean id="handlerAdapter" class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter">
        <!--配置处理器适配器中的转换器-->
        <property name="messageConverters">
            <list>
                <ref bean="messageConverter"/>
            </list>
        </property>
    </bean>-->
    ```
3. 编写Controller

    ```java
    @RequestMapping("/quick2")
    @ResponseBody
    public User quick2() {
        User user = new User();
        user.setName("李四");
        user.setAge(20);
        return user;
    }
    ```

**配置方法二**
使用mvc的注解驱动代替

```xml
<!--mvc的注解驱动-->
<mvc:annotation-driver/>
```

作用: 在SpringMVC中，**处理器映射器HandlerMapping、处理器适配器HandlerAdapter、视图解析器ViewResolver**被称为SpringMVC的三大组件。
使用`<mvc:annotation-driver/>`自动加载RequestMappingHandlerMapping处理器映射器和RequestMappingHandlerAdapter处理器适配器，从而替代这两个组件的一系列配置，同时默认底层就会集成jackson进行对象或集合的json格式字符串的转换

# SpringMVC获得请求数据
## 获得请求参数
- 基本类型参数
- POJO类型参数(简单JavaBean对象) 把数据封装成一个对象
- 数组类型参数
- 集合类型参数

### 获取基本类型参数
Controller中的方法的参数名称要和请求参数的名称一致，参数值会自动匹配(包括MultipartFile类型的参数，名称也需要一致)

```java
//url:http://localhost:8080/user/quick?username=lisi&age=20

@RequestMapping("/quick")
@ResponseBody
public void quick(String username, int age) {
    System.out.println(username);
    System.out.println(age);
}
```
### 获取POJO类型参数
Controller中的方法的POJO参数的属性名要和请求参数的名称一致，参数值会自动映射匹配。**映射匹配的本质是反射调用每一个属性的get/set方法**

```java
//url:http://localhost:8080/user/quick?username=lisi&age=20

@RequestMapping("/quick")
@ResponseBody
public void quick(User user) {
    System.out.println(user.getUserName());
    System.out.println(user.getAge());
}
```
### 获取数组类型参数(用得不多)
Controller中的方法的数组名称要和请求参数的名称一致，参数值会自动映射匹配

```java
//url:http://localhost:8080/user/quick?strs=111&strs=222&strs=333

@RequestMapping("/quick")
@ResponseBody
public void quick(String[] strs) {
    System.out.println(Arrays.asList(strs));
}
```
### 获取集合类型参数
**获取方法一**

获取集合参数时，将集合参数包到一个POJO(VO)中

UserVO.java

```java
public class UserVO {
    private List<User> userList;

    @Override
    public String toString() {
        return "UserVO{" +
                "userList=" + userList +
                '}';
    }

    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }
}
```

form.jsp(用表单来发起post请求)

```html
<form action="${pageContext.request.contextPath}/user/quick4" method="post">
    <%--表明是第几个User对象的username、age--%>
    <label>
        <input type="text" name="userList[0].username">
    </label><br/>
    <input type="text" name="userList[0].age"><br/>
    <input type="text" name="userList[1].username"><br/>
    <input type="text" name="userList[1].age"><br/>
    <input type="text" name="userList[2].username"><br/>
    <input type="text" name="userList[2].age"><br/>
    <input type="submit" value="提交"/>
</form>
```

UserController.java

```java
@RequestMapping("/quick4")
@ResponseBody
public void quick4(UserVO userVO) {
    System.out.println(userVO);
}
```

**获取方法二**
当使用ajax提交时，可以指定`contentType`为`application/json`形式，那么在方法参数位置使用`@RequestBody`可以直接接收集合数据而无需使用POJO进行包装

## 静态资源文件访问
为防止js、css等静态的资源文件也被误拿去与系列的RequestMapping做匹配(一般的结果都是找不到，最终返回404)
**解决方法一** 
在spring-mvc.xml配置文件中配置静态资源的访问路径

```xml
<mvc:resources mapping="/js/**" location="/js/"/>
<mvc:resources mapping="/img/**" location="/img/"/>
```
**解决方法二**

```xml
<mvc:default-servlet-handler/>
```

## 请求数据乱码问题
Post请求会出现乱码问题
**解决方法**
设置一个过滤器(SpringMVC提供的)来进行编码的过滤

```xml
<!--配置全局过滤器-->
<filter>
    <filter-name>CharacterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>UTF-8</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>CharacterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```
## 参数绑定注解
当请求的参数名称与Controller的方法参数名称不一致时，需要通过`@RequestParam`注解显示地绑定

@RequestParam参数
- value：请求的参数名称
- required：指定该参数是否必须，默认为true，没有则报错(400 - Bad Request)
- defaultValue：当没有指定的参数时，使用默认值去赋值

## Restful风格
**Restful**是一种软件**架构风格**、**设计风格**，**不是标准**，提供一组设计原则和约束条件。
主要用于客户端和服务器交互类的软件，基于这个风格设计的软件可以更加简洁，更有层次，更易于实现缓存机制。

Restful风格的请求是使用`url+请求方式`或`请求方式+资源`的形式。表示一次请求的**目的**
- GET：获取资源
- POST：新建资源
- PUT：更新资源
- DELETE：删除资源

### 获取请求参数
数据不以`?name=value&name=value`的方式携带，而是把数据放到url内部

例子：
```text
/user/1 GET:    查询id为1的user
/user/1 DELETE: 删除id为1的user
/user/1 PUT:    更新id为1的user
/user   POST:   新增user
```

开发中使用`@PathVariable`注解进行占位符的匹配获取工作
```java
//url:http://localhost:8080/user/quick/zhangsan

@RequestMapping("/quick/{name}")
@ResponseBody
public void quick(@PathVariable(value="name", required=true) String name) {
    System.out.println(name);
}
```

@PathVariable参数
- value：参数名称
- required：是否必须，默认是true

## 自定义类型转换器
SpringMVC默认有提供一些常用的类型转换器，如String->int
但是不是所有的类型都提供了转换器，没有提供的需要自定义转换器，如日期类型的数据需要日期转换器

自定义类型转换器开发步骤
1. 定义转换器类，实现`Converter`接口

    ```java
    public class DateConverter implements Converter<String, Date> {
    /**
     * 将日期字符串转换成日期对象并返回
     *
     * @param dateString 日期字符串
     * @return 日期对象
     */
    public Date convert(String dateString) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;
        try {
            date = dateFormat.parse(dateString);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }
    ```
2. 在spring-mvc.xml配置文件中**声明转换器**

    ```xml
    <!--声明日期类型转换器-->
    
    <!--日期转换器对象交由Spring管理-->
    <bean id="dateConverter" class="com.itheima.converter.DateConverter"/>
    
    <!--让转换器服务工厂对象来创建日期转换器的对象-->
    <bean id="conversionService" class="org.springframework.context.support.ConversionServiceFactoryBean">
        <property name="converters">
            <list>
                <ref bean="dateConverter"/>
            </list>
        </property>
    </bean>
    ```
3. 在`<annotation-driven>`中引用转换器
  
    ```xml
    <!--conversionService属性声明转换器服务工厂-->
    <mvc:annotation-driven conversion-service="conversionService"/>
    ```
    
## 获取请求头
用`@RequestHeader`注解获取请求头的内容，相当于`request.getHeader(name)`

@RequestHeader参数
- value：请求头名称
- required：是否必须携带此请求头


```java
@RequestMapping("/quick")
@ResponseBody
public void quick(@RequestHeader("User-Agent") String userAgent) {
    System.out.println(userAgent);
}
```
---
请求头中有一个比较常用和重要的属性是Cookie，针对这个Cookie，SpringMVC有单独的一个注解`@CookieValue`来专门获取请求的Cookie

@CookieValue参数
- value：指定的cookie名称(常用:JSESSIONID)
- required：是否必须携带此cookie

## 文件上传
文件上传客户端三要素
1. input项的type="file"
2. 表单的提交方式是post
3. 表单的enctype属性是多部分表单形式`enctype="multipart/form-data"`

文件上传原理
1. 当`enctype="application/x-www-form-urlencoded"`时，表单的正文内容格式是`?name=value&name=value`
2. 当`enctype="multipart/form-data"`时，表单的正文内容就变成多部分形式。`request.getParameter()`等方法将失效

多部分表单示意图：
![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20200805175744.png)

### 文件上传开发步骤
- 导入fileupload和io坐标

```xml
<dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.3.1</version>
</dependency>
<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.4</version>
</dependency>
```
- 在spring-mvc.xml中配置文件上传解析器

```xml
<!--配置文件上传解析器-->
<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
    <!--上传文件的编码类型-->
    <property name="defaultEncoding" value="UTF-8"/>
    <!--上传文件的总大小 5M-->
    <property name="maxUploadSize" value="5242800"/>
    <!--上传单个文件的大小 5M-->
    <property name="maxUploadSizePerFile" value="5242800"/>
</bean>
```
- 开发上传程序


```html
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<form action="${pageContext.request.contextPath}/user/file" method="post" enctype="multipart/form-data">
    名称：<input type="text" name="name"><br/>
    文件：<input type="file" name="file"><br/>
    <input type="submit" value="提交">
</form>
</body>
</html>
```

```java
@PostMapping("/file")
@ResponseBody
public void uploadFile(String name, MultipartFile file) throws IOException {
    System.out.println(name);
    String originalFilename = file.getOriginalFilename();
    //转移文件
    file.transferTo(new File("/Users/ngwingbun/Downloads/" + originalFilename));
}
```

- 如果是多文件上传的程序
    - 在html/jsp中设定多个`<input type="file" name="file"><br/>`
    - controller中MultipartyFile参数设置为数组，就像接收普通数组参数一样

# SpringMVC拦截器
SpringMVC的拦截器interceptor相当于Servlet开发中的filter，用于进行预处理和后处理

将拦截器按照一定的顺序联结成一条链就被称为拦截器链interceptor chain。拦截器也是AOP思想的实现

拦截器interceptor和过滤器filter的区别
![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20200806121952.png)
filter拦截的是请求，interceptor拦截的是方法

## 自定义拦截器
- 创建拦截器类实现`HandlerInterceptor`接口
  
```java
public class CustomInterceptor implements HandlerInterceptor {

    /**
     * 在目标方法执行之前执行
     *
     * @param request
     * @param response
     * @param handler
     * @return 返回false，不被放行；返回true，代表放行
     * @throws Exception
     */
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        return false;
    }

    /**
     * 在目标方法执行之后视图返回之前执行
     *
     * @param request
     * @param response
     * @param handler
     * @param modelAndView
     * @throws Exception
     */
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    /**
     * 在整个流程都执行完毕后执行
     *
     * @param request
     * @param response
     * @param handler
     * @param ex
     * @throws Exception
     */
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}
```
- 在spring-mvc.xml中配置拦截器

```xml
<!--配置拦截器interceptor-->
<mvc:interceptors>
    <mvc:interceptor>
        <!--对哪些资源执行拦截操作-->
        <mvc:mapping path="/**"/>
        <bean class="com.itheima.interceptor.CustomInterceptor"/>
    </mvc:interceptor>
</mvc:interceptors>
```

## 案例：用户登陆&SpringMVC拦截器的使用
- 开发拦截器实现`HandlerInterceptor`接口。检查session中是否记录了用户的信息，如果没有则不放行并重定向到登录页面，如果有则放行
- 配置拦截器。放行部分请求(登陆请求)

    ```xml
    <!--配置对哪些资源进行拦截操作-->
    <mvc:mapping path="/**"/>
    <!--配置对哪些资源排除拦截操作,可插入多个-->
    <mvc:exclude-mapping path="/user/login"/>
    <bean class="全限定类名"/>
    ```

# SpringMVC异常处理
思路：系统的Dao、Service、Controller出现的异常都是用`throws Exception`向上抛出，最后让SpringMVC前端控制器`DispatcherServlet`交由异常处理器进行异常处理
![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20200806195505.png)
SpringMVC有既定的异常处理器，比较简单，可以根据系统需求自定义异常处理器

## SpringMVC提供的
SpringMVC提供的简单映射异常处理器`SimpleMappingExceptionResolver`

配置的内容是: **异常类型与错误视图的映射关系**

```xml
<!--配置简单映射异常处理器-->
<bean class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver">
    <!--默认错误视图，当无法匹配到下面列出的异常时，匹配这一个-->
    <!--value中是视图名称，由于上面视图解析器已经配置了前缀后缀，所以只需填写视图名称-->
    <property name="defaultErrorView" value="error"/>
    <!--异常视图映射关系-->
    <property name="exceptionMappings">
        <map>
            <!--key:异常类型 value:错误视图-->
            <entry key="java.lang.ClassCastException" value="cce-error"/>
            <entry key="com.itheima.exception.MyException" value="cus-error"/>
        </map>
    </property>
</bean>
```

## 自定义异常处理器
- 自定义异常处理器类，实现SpringMVC的异常处理接口`HandlerExceptionResolver`

    ```java
    public class MyExceptionResolver implements HandlerExceptionResolver {
        /**
         * @param httpServletRequest
         * @param httpServletResponse
         * @param o
         * @param e                   捕获的异常对象
         * @return ModelAndView: 跳转的错误视图信息
         */
        public ModelAndView resolveException(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) {
            ModelAndView modelAndView = new ModelAndView();
            if (e instanceof MyException) {
                modelAndView.addObject("info", "自定义异常");
            } else if (e instanceof ClassCastException) {
                modelAndView.addObject("info", "类转换异常");
            }
            modelAndView.setViewName("error");
            return modelAndView;
        }
    }
    ```
- 配置异常处理器 因为该处理器已经实现了`HandlerExceptionResolver`接口，所以只需放入容器，SpringMVC即可识别出是异常处理器
    ```xml
    <!--配置自定义异常处理器-->
    <bean class="com.itheima.resolver.MyExceptionResolver"/>
    ```
