# xml

Extensible Markup Language

## 可扩展

标签都是自定义的，没有一个标签是规定好的。

## 与HTML区别

1. xml标签都是自定义的，html标签是预定义的。
2. xml的语法严格，html语法松散（没有严格要求每一个标签的属性、不一定要关闭标签等）
3. xml存储数据，html展示数据

## 功能

1. 配置文件
2. 在网络中传输

## 语法

1. 后缀名为.xml
2. xml第一行必须定义为文档声明
3. xml文档中有且仅有一个根标签
4. 属性值必须使用引号(单双都可)引起来
5. 标签必须正确关闭
6. xml标签名称区分大小写

例子

```xml
<?xml version='1.0' ?>
<users>
  <user id='1'>
    <name>zhangsan</name>
    <age>23</age>
    <gender>male</gender>
    <br/>
  </user>

  <user id='2'>
    <name>lisi</name>
    <age>24</age>
    <gender>female</gender>
  </user>
</users>
```

## 组成部分

1. 文档声明
   1. 格式：`<?xml 属性列表 ?>`
   2. 属性列表
      - version：版本号，必须填写。 一般用1.0
      - encoding：编码方式，使用的字符集。默认ISO-8859-1
      - standardalone：是否独立。是否依赖其他文件（大部分不设置）
2. 规则
   1. 名称可以包含字母、数字以及其他的字符
   2. 名称不能以数字或者标点符号开始 
   3. 名称不能以字母 xml（或者 XML、Xml 等等）开始 
   4. 名称不能包含空格 
3. 属性：id要唯一

## 约束

规定xml文档的书写规则

分类：

1. dtd
2. schema

### DTD

使用

引入dtd文档到xml文件中

1. 内部：将约束规则定义在xml文档中
2. 外部：将约束规则定义在dtd文件中
   1. 本地：`<!DOCTYPE 根标签名 SYSTEM "dtd文件路径">`
   2. 网络：`<!DOCTYPE 根标签名 PUBLIC "dtd文件名字" "dtd文件URL">`

### Schema

使用

1. 填写xml文档的根元素
2. 引入xsi前缀.  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
3. 引入xsd文件命名空间.  xsi:schemaLocation="http://www.itcast.cn/xml  student.xsd"
4. 为每一个xsd约束声明一个前缀,作为标识

例子

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
		xmlns="http://www.springframework.org/schema/beans"   				使用的beans的xsd就直接引用
    xmlns:context="http://www.springframework.org/schema/context" 使用context在前面加context:
   	xmlns:mvc="http://www.springframework.org/schema/mvc" 				使用mvc在前面加mvc:
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans											文件名
        http://www.springframework.org/schema/beans/spring-beans.xsd		文件路径
        http://www.springframework.org/schema/context 
        http://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/mvc
        http://www.springframework.org/schema/mvc/spring-mvc.xsd">

    
    <context:annotation-config />
    <context:component-scan base-package="cn.cisol.mvcdemo">
        <!-- ... -->
    </context:component-scan>


    <mvc:annotation-driven />
    <mvc:resources mapping="/resources/**" location="/resources/" />


    <bean
        class="org.springframework.web.servlet.view.ContentNegotiatingViewResolver">
        <!-- ... -->
    </bean>
```

## 解析

操作xml文档，将其数据读入内存

**操作方式**

1. DOM（服务器）：将标记语言文档一次性加载进内存，在内存中形成一棵DOM树![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfsrtx9en0j31ry0pigws.jpg)
   - 优点：操作方便，可以对文档进行crud的所有操作
   - 缺点：一次性加载，比较占内存
2. SAX（移动端）：逐行读取，急于事件驱动。读取一行释放一行，在内存中永远只有一行
   - 优点：基本不占内存
   - 缺点：只能读取，不能增删改

## 解析器

解析xml的工具包

1. JAXP：支持DOM、SAX思想，性能差
2. DOM4J：基于DOM思想，性能优秀
3. Jsoup：基于DOM

### Jsoup

使用步骤：

1. 导入jar包
2. 获取Document对象
3. 获取对应的标签 Element对象
4. 获取数据

#### Jsoup

工具类，解析HTML或XML文档，返回Document对象

```java
Document parse(File in, String charset); //解析xml或html文件
Document parse(String str); //解析xml或html字符串
Document parse(URL url, int time); //通过网络路径获取指定的html或xml的文档对象
```

#### Document

文档对象，代表内存中的dom树

```java
Elements getElementByTag(String tagName); //根据标签名称获取元素对象集合
Elements getElementByAttribute(String key); //根据属性名称获取元素对象集合
Elements getElementByAttributeValue(String key, String value); //根据属性名和值获取元素对象集合
```

#### Elements

元素对象Element的集合。`ArrayList<Element>`

#### Element

元素对象，可以获取对象的数据、文本、属性等

#### Node

节点对象