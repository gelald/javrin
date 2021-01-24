# 基础知识

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
- `pom`

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

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfsrj94k24j30ya0l2b29.jpg)



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

### **作用域**

- provided：只在编译和测试时起作用（servlet、jsp）
- test：只在测试的时候起作用（junit）
- runtime：只在测试和运行时起作用（JDBC驱动）

### 一二三方库

- 一方库：本工程中的各模块的相互依赖
- 二方库：公司内部其他项目提供的依赖
- 三方库：其他组织、公司等来自第三方的依赖