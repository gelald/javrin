---
title: Maven基础知识
icon: article
category:

- 干货
- 项目工具

tag:

- Maven
- 基础

---

# Maven

### **依赖管理**

maven工程对jar包的管理过程。jar包放在系统的jar包仓库中，当maven工程使用到对应的jar包时，根据既定的jar包坐标去寻找

### **一键构建**

maven使用一个命令完成对项目的编译、测试、打包、安装、发布、部署的一系列工作

### **仓库种类**

1. 本地仓库
2. 中央仓库。maven中央仓库，放置了几乎所有开源的jar包
3. 远程仓库（私服）。如果私服没有找到，则去中央仓库寻找
4. 启动maven工程，先去本地仓库寻找jar包，如果没有找到并且是联网状态下，会去maven的中央仓库寻找所需jar包。

### **标准目录结构**

- `src/main/java`：核心代码部分
- `src/main/resources`：配置文件部分
- `src/test/java`：测试代码部分
- `src/test/resources`：测试配置文件
- `src/main/webapp`：页面资源，包括js、css、图片等
- `pom.xml`

### **常用命令**

- `clean`：把target目录删除，清除项目的编译信息
- `compile`：把/src/main/java下的核心代码编译放置在classes目录下
- `test`：**除了执行`compile`命令外**，还把/src/test/java下的测试代码编译放置在test-classes目录下
- `package`：**除了执行`test`命令外**，还把项目打成包放置在target目录下
- `install`：**除了执行`package`命令外**，还把包安装到本地仓库下

### **生命周期**

- 清理生命周期
  - clean
- 默认生命周期
  - compile
  - test
  - package
  - install
- 站点生命周期

### **Maven概念模型**

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrj94k24j30ya0l2b29.jpg)

#### 项目对象模型

`pom.xml`

1. 项目自身信息，包括项目自身的坐标
2. 项目运行所依赖的jar包
3. 项目运行环境信息（tomcat等）

#### 依赖管理模型

`<dependency>`

1. 公司组织的名称`<groupId>`
2. 项目名`<artifactId>`
3. 版本号`<version>`

#### relativePath

- 在 `<parent>` 标签下指定 `<relativePath/>`，说明这个依赖不从本地路径获取，始终从Maven仓库中获取

- 默认是../pom.xml，即父依赖所在目录下的pom文件
- 查找顺序：relativePath元素中的地址–本地仓库–远程仓库

### **Scope**

- compile：**默认**，参与编译、运行、测试。参与打包

- provided：只参与编译、测试（servlet、jsp）。不参与打包

- test：只参与测试（junit）

- runtime：只参与运行、测试（JDBC驱动）

- system：参与编译、运行、测试，但依赖项不会从maven仓库获取，而是从本地文件系统拿，一定要配合systemPath属性使用

- import

  ```
  Maven和Java一样是单继承
  但是在开发SpringCloud应用时，由于SpringCloud是基于SpringBoot的，所以生成的pom文件已经有spring-boot-starter-parent这个父类，来管理SpringBoot里面组件的版本，但是SpringCloud同样需要管理自己组件的版本，所以用import解决单继承的问题
  
  <!-- SpringBoot管理组件版本 -->
  <parent>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-parent</artifactId>
      <version>2.4.3</version>
      <relativePath/> <!-- lookup parent from repository -->
  </parent>
  
  <!-- SpringCloud管理组件版本 -->
  <dependencyManagement>
      <dependencies>
          <!-- <scope>import</scope>解决单继承问题，类似parent标签， -->
          <dependency>
              <groupId>org.springframework.cloud</groupId>
              <artifactId>spring-cloud-dependencies</artifactId>
              <version>2020.0.1</version>
              <type>pom</type>
              <scope>import</scope>
          </dependency>
      </dependencies>
  </dependencyManagement>
  ```

#### systemPath

用于指向一个jar包的磁盘路径

#### Scope依赖传递

### 依赖排除

#### 排除依赖

##### 应用场景

如果A依赖B，B依赖C，但是由于jar包冲突等问题A不能依赖C，这时候需要在依赖B的时候把依赖C排除

##### 具体做法

使用exlusions标签，可以同时排除多个

```xml
<project>
  ...
  <dependencies>
    <dependency>
      <groupId>sample.ProjectB</groupId>
      <artifactId>Project-B</artifactId>
      <version>1.0</version>
      <scope>compile</scope>
      <exclusions>
        <exclusion>  <!-- declare the exclusion here -->
          <groupId>sample.ProjectC</groupId>
          <artifactId>Project-C</artifactId>
        </exclusion>
      </exclusions> 
    </dependency>
  </dependencies>
</project>
```

#### 可选依赖

optional是maven依赖jar时的一个选项，表示该依赖是可选的，不会被依赖传递。**Maven默认会做排除操作**

**只在传递上起效，继承依赖时optional不起作用**

##### 应用场景

- B项目依赖了logback、log4j、commons log三种不同的日志框架
- A项目依赖了B项目

在开发中一个项目一般只使用一种日志框架，那么我们项目中就会有多余的依赖，多余依赖越来越多的时候，最终会导致项目很臃肿

##### 具体做法

需要在B项目中把其他的日志依赖设置成可选依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-api</artifactId>
        <optional>true</optional>
    </dependency>
    
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-core</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```

#### 依赖排除的意义

- 节约磁盘、内存等空间
- 避免许可协议问题
- 减少不必要的依赖传递
- **减少jar包冲突**

#### 第一声明优先原则

在pom.xml配置文件中，如果有两个名称相同版本不同的依赖声明，那么**先写的会生效**。

#### 最短路径优先原则

**直接依赖优先于传递依赖**，如果传递依赖的jar包版本冲突了，那么可以直接声明一个指定版本的依赖jar，即可解决冲突。

### 一二三方库

- 一方库：本工程中的各模块的相互依赖
- 二方库：公司内部其他项目提供的依赖
- 三方库：其他组织、公司等来自第三方的依赖
