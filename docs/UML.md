# UML

统一建模语言（Unified Modeling Language），是一种为**面向对象**系统的产品进行说明、可视化和编制文档的**标准语言**。

UML使用面向对象设计的建模工具，但独立于任何具体程序设计语言

<img src="https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210519173435.png" style="zoom:80%;" />

## 关系描述

- 关联：这是一种静态关系，与运行过程的状态无关，在运行前就可以确定
  - **普通箭头实线**的表示**单向关系**，**箭头**指向**被拥有者**
  - **没有箭头实线**的表示**双向关系**
  
  ![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20220303110200.png)
  
- 聚合：整体与部分的关系。**不同的生命周期**
  - 用**带空心菱形的实线**表示，**菱形**指向**整体**，**箭头**指向**个体**

  ![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20220303110127.png)
  
- 组合：整体与部分的关系，组合比聚合更加**严格**。**相同的生命周期**
  - 用**带实心菱形的实线**表示，**菱形**指向**整体**，**箭头**指向**个体**

  ![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20220303110142.png)
  
- 泛化：表示一个**更泛化**的元素和一个**更具体**的元素之间的关系。父类与子类的关系
  - 用**带三角箭头的实线**表示，**箭头**指向**父类**

  ![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20220303105832.png)
  
- 实现：实现类与接口的关系
  - 用**带三角箭头的虚线**表示，**箭头**指向**接口**

  ![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20220303110059.png)
  
- 依赖：如果一个类的改动会影响到另一个类，则两个类之间存在依赖关系，**一般而言，依赖是单向的**
  - 用**带普通箭头的虚线**表示，**箭头**指向**被依赖者**
  
  ![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20220303110218.png)



## 类图

<img src="https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210913152524.png" style="zoom:67%;" />

- `+`：`public`
- `-`：`private`
- `#`：`protected`
- `~`：`default`，可省略
- 字段和方法返回值的数据类型**可省略**
- **抽象**类或抽象方法用**斜体**表示
- **静态**类或静态方法加**下划线**
- 如果是接口需要在类名上方加<\<Interface>\>

### 类图案例

#### 案例一

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210913155546.png)

#### 案例二《大话设计模式》

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210913160834.png)



## 时序图

时序图描述对象之间消息的发送顺序，**强调时间顺序**。时序图是一个二维图，**横轴代表对象**，**纵轴表示时间**，消息在各对象之间横向传递，依照时间顺序纵向排列。用箭头表示消息、用竖虚线表示对象的生命线

**可以直观的描述并发进程**

###  组成元素

- 角色（Actor）：系统角色：人、机器，一般是一个入口

- 对象（Object）：类名

- 生命线（Lifeline）：对象所存在的时间

- 控制焦点（Focus of Control）：激活，当前执行的逻辑

- 消息（Message）：同步消息、异步消息

- 自关联消息：方法自身调用、一个对象的某个方法调用另一个方法

- 组合片段
  - Opt 选项：包含一个可能发生或可能不发生的序列，可以在临界中指定序列发生的条件

    ![image-20210913164725091](/Users/ngyb/Library/Application Support/typora-user-images/image-20210913164725091.png)

  - Alt 抉择：包含一个片段列表，这些片段包含备选的消息序列，**仅能发生一个序列**

    <img src="https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210913164626.png" style="zoom:75%;" />

  - Par 并行：并行执行

    ![image-20210913164838389](/Users/ngyb/Library/Application Support/typora-user-images/image-20210913164838389.png)

  - Loop 循环：片段重复一定次数

    ![image-20210913164905544](/Users/ngyb/Library/Application Support/typora-user-images/image-20210913164905544.png)

### 时序图案例

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20220303110340.png)

图像无法加载
