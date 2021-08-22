# UML

统一建模语言（Unified Modeling Language），是一种为面向对象系统的产品进行说明、可视化和编制文档的**一种标准语言**。

UML使用面向对象设计的建模工具，但独立于任何具体程序设计语言

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210519173435.png)

# 结构图

## 静态图

### 类图

#### 关系描述

##### 关联关系

一种拥有的关系，具有方向性

**普通箭头实线的表示单向关系，箭头指向被拥有者**![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210528152414.png)

**不用箭头实线的表示双向关系**![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210528152433.png)

##### 聚合关系

整体与部分的关系。**不同的生命周期**

**用带空心菱形的实线表示，菱形指向整体，箭头指向个体**![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210527142356.png)

##### 组合关系

整体与部分的关系，组合比聚合更加严格。**相同的生命周期，人和手**

**用带实心菱形的实线表示，菱形指向整体，箭头指向个体**![image-20210527145559530](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20210527145559530.png)

##### 泛化关系

表示一个更泛化的元素和一个更具体地元素之间地关系。**与继承地概念相同**

**用带三角箭头地实线表示，箭头指向父类**![image-20210527163801461](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20210527163801461.png)

##### 实现关系

类与接口地关系

**用带三角箭头的虚线表示，箭头指向接口**![image-20210527163910615](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20210527163910615.png)

##### 依赖关系

如果一个类的改动会影响到另一个类，则两个类之间存在依赖关系，一般而言，依赖是单向的

**用带普通箭头的虚线表示，箭头指向被依赖者**![image-20210527164028177](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20210527164028177.png)



![image-20210527164239202](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20210527164239202.png)

- `+`表示public
- `-`表示private
- `#`表示protected
- `~`表示default，可省略
- 字段和方法返回值的数据类型非必须
- **抽象**类或抽象方法用**斜体**表示
- **静态**类或静态方法加**下划线**
- 如果是接口需要在类名上方加<\<Interface>\>

#### 类图、关系案例

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210528153025.png)

#### 案例二《大话设计模式》

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210528160102.png)

# 交互图

## 时序图

时序图描述对象之间消息的发送顺序，强调时间顺序。时序图是一个二维图，横轴代表对象，纵轴表示时间，消息在各对象之间横向传递，依照时间顺序纵向排列。用箭头表示消息、用竖虚线表示对象的生命线

**可以直观的描述并发进程**

###  组成元素

#### 角色（Actor）

#### 对象（Object）

#### 生命线（Lifeline）

#### 控制焦点（Focus of Control）

#### 消息（Message）

#### 自关联消息

#### 组合片段

- Opt 选项：包含一个可能发生或可能不发生的序列，可以在临界中指定序列发生的条件
- Alt 抉择：包含一个片段列表，这些片段包含备选的消息序列，**仅能发生一个序列**
- par 并行：并行执行
- Loop 循环：片段重复一定次数

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210528165112.png)

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210528170059.png)

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210528170155.png)

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210528170243.png)

### 时序图案例

![image-20210528171201505](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20210528171201505.png)

