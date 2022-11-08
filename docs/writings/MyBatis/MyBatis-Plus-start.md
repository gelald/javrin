---
title: MyBatis-Plus 学习
icon: article
order: 4
category:

- 干货
- 持久层

tag:

- 基础
- MyBatis-Plus

---

# MyBatis-Plus 学习

## MyBatis-Plus 是什么

MyBatis-Plus 是一个增强 MyBatis 的框架，在 MyBatis 框架基础上**只做增强，不做改变**，为简化开发，**提高效率**而生。MyBatis-Plus **提供了通用的 Mapper 和 Service，提供了强大的 CRUD 功能**，可以在不编写任何 SQL 语句的情况下，快速的实现对单表的 CRUD、批量、逻辑删除、分页等操作。

MyBatis-Plus 官网地址：[MyBatis-Plus](https://baomidou.com)


## MyBatis-Plus 常用注解

- @TableName：设置实体类所对应的表名，比如实体类名是 User，表名是 t_user，可以使用这个注解来完成映射的操作。

  - 如果存在大量相同的表名前缀，MyBatis-Plus 还提供了一种更方便的操作，用于统一配置实体类对应表名的前缀。

    ```yaml
    mybatis-plus:
    	global-config:
    		db-config:
    			#全局表名前缀
    			table-prefix: t_
    ```

    

- @TableId：指定一个属性对应的字段作为表中主键，因为 MyBatis-Plus 默认把名为 id 的字段作为主键，当主键字段名不叫 id 或者主键属性名和主键字段名不一致时，需要手动指定。如果在主键属性中手动设置了数据，那么就不会自动生成。
  - type 属性：主键生成策略。
    - IdType.ASSIGN_ID：雪花算法（默认），雪花算法在分布式场景下较为常用。
    - IdType.AUTO：自动递增策略。如果想使用数据库自动递增，那么**需要在数据库中主键字段设置为自动递增**，并且设置主键生成策略为自动递增策略。
    
  - 如果需要设置统一的主键生成策略，MyBatis-Plus 也提供了全局的配置
  
    ```yaml
    mybatis-plus:
    	global-config:
    		db-config:
    			#全局主键生成策略设置为自动递增
    			id-type: auto
    ```
  
    
  
- @TableField：指定普通属性对应的字段名。另外在 MyBatis-Plus 中会自动把 MySQL 中这些下划线命名的字段统一转换成小驼峰命名。

- @TableLogic：指定属性为逻辑删除字段。逻辑删除：将对应数据中代表是否被删除的字段值修改为“被删除状态”，但是仍旧能在数据库中看到这条数据

  - 执行删除方法：删除方法在执行时全都执行 update 语句，把逻辑删除字段的值设置为“被删除状态”
  - 执行查询方法：查询方法在执行时自动加上过滤被逻辑删除的条件



## 条件构造器

在执行查询、修改、删除语句时是需要添加条件的，在 MyBatis-Plus 中，使用条件构造器来封装各种条件。

### Wrapper

Wrapper 是条件构造器的顶层父类，其下有几个常用的实现类

- Wrapper：条件构造器的顶层父类
  - AbstractWrapper：查询条件封装，用于生成 SQL 中的 where 子句，可以链式调用
    - QueryWrapper：查询和删除语句的条件封装
    - UpdateWrapper：更新语句的条件封装，封装的是更新的字段和更新的条件
    - AbstractLambdaWrapper：使用 Lambda 语法封装条件
      - LambdaQueryWrapper：查询和删除语句 Lambda 语法的条件封装
      - LambdaUpdateWrapper：更新语句 Lambda 语法的条件封装



### QueryWrapper

QueryWrapper 主要用于查询、删除功能中，也能用在更新功能中，其中 QueryWrapper 可以用于：

- 组装排序条件

- 组装查询条件，其中的方法基本上都涵盖了 SQL 语句中的各种条件比较方式，生成的条件默认用 and 关键字来连接。需要注意的是条件的优先级：

  - 查询（用户名中包含字母 a 并且年龄大于 20 ）或邮箱为 null 的用户

    ```java
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.like("user_name", "a")
      .gt("age", 20)
      .or()
      .isNotNull("email");
    List<User> userList = userMapper.selectList(queryWrapper);
    ```

    

  - 查询用户名中包含字母 a 并且（年龄大于 20 或邮箱为 null）的用户

    ```java
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.like("user_name", "a")
      .and(wrapper -> wrapper.gt("age", 20)
          .or()
          .isNotNull("email"));
    List<User> userList = userMapper.selectList(queryWrapper);
    ```

    

- 组装 select 语句，可以指定查询返回的字段以节省资源



#### 动态组装条件

很多时候前端列表的查询会提供多种条件给用户选择，用户可以选择多个条件的组合，如果在一个一个属性做 if 判断然后组装查询条件，这样子的写法有点臃肿，MyBatis-Plus 提供了一种更为简洁的方式。

需求：当输入了用户名关键字，就用这个关键字做模糊查询；如果分别输入了年龄的上界和下界，就从这个范围中搜索。

- 使用 if 代码块的方式：

  ```java
  QueryWrapper<User> queryWrapper = new QueryWrapper<>();
  if(StringUtils.isNotBlank(username)) {
    queryWrapper.like("user_name", username);
  }
  if(ageBegin != null) {
    queryWrapper.gt("age", ageBegin);
  }
  if(ageEnd != null) {
    queryWrapper.lt("age", ageEnd);
  }
  List<User> userList = userMapper.selectList(queryWrapper);
  ```

  

- 使用 condition 组装条件：

  ```java
  QueryWrapper<User> queryWrapper = new QueryWrapper<>();
  queryWrapper.like(StringUtils.isNotBlank(username), "user_name", username)
    .gt(ageBegin != null, "age", ageBegin)
    .lt(ageEnd != null, "age", ageEnd);
  List<User> userList = userMapper.selectList(queryWrapper);
  ```



### UpdateWrapper

UpdateWrapper 主要用于更新功能中，可以**同时设置需要更新的字段和更新的条件**。

需求：将用户名中包含 a 并且（年龄大于 20 或邮箱为 null ）的用户信息修改

```java
UpdateWrapper<User> updateWrapper = new UpdateWrapper<>();
updateWrapper.like("user_name", "a")
  .and(wrapper -> wrapper.gt("age", 20)
      .or()
      .isNull("email"));
updateWrapper.set("user_name", "小明")
  .set("email", "test@qq.com");
userMapper.update(null, updateWrapper);
```



### LambdaQueryWrapper

为了防止字段名写错或者忘记字段名，使用 Lamdda 系列的条件构造器可以更方便编写条件，使用一个函数式接口，**要想访问哪一个字段就访问实体类中的哪一个属性**，可以自动获取属性所对应的字段名。

需求：当输入了用户名关键字，就用这个关键字做模糊查询；如果分别输入了年龄的上界和下界，就从这个范围中搜索。

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.like(StringUtils.isNotBlank(username), User::getUsername, username)
  .gt(ageBegin != null, User::getAge, ageBegin)
  .lt(ageEnd != null, User::getAge, ageEnd);
```



### LambdaUpdateWrapper

同理，为了防止字段名

需求：将用户名中包含 a 并且（年龄大于 20 或邮箱为 null ）的用户信息修改

```java
UpdateWrapper<User> updateWrapper = new UpdateWrapper<>();
updateWrapper.like(User::getUsername, "a")
  .and(wrapper -> wrapper.gt(User::getAge, 20)
      .or()
      .isNull(User::getEmail));
updateWrapper.set(User::getUsername, "小明")
  .set(User::getEmail, "test@qq.com");
userMapper.update(null, updateWrapper);
```



## 插件

### 分页插件

在 MyBatis 中，分页插件需要额外引入配置，而在 MyBatis-Plus 中，分页插件已经自带，只需要简单配置。

- 配置配置类

  ```java
  @Configuration
  public class MyBatisPlusConfig {
    @Bean
    public MyBatisPlusInterceptor myBatisPlusInterceptor() {
      MyBatisPlusInterceptor myBatisPlusInterceptor = new MyBatisPlusInterceptor();
      //添加分页插件
      myBatisPlusInterceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MySQL));
      return myBatisPlusInterceptor;
    }
  }
  ```
  
  
  
- 使用分页，MyBatis-Plus 中分页对象第一个属性是当前页码，第二个属性是当前页数据量

  ```java
  //Mapper中的方法
  <P extends IPage<T>> P selectPage(P page, @Param("ew") Wrapper<T> queryWrapper);
  
  @Test
  public void testPage(){
    //查询第2页数据，每页3条数据，所以得到的数据的索引应该是3、4、5
    Page<User> page = new Page<>(2, 3);
    userMapper.selectPage(page, null);
    System.out.println("当前页数据:"+page.getRecords());
    System.out.println("总分页数量:"+page.getPages());
    System.out.println("总记录数量:"+page.getTotal());
    System.out.println("是否有下一页:"+page.hasNext());
    System.out.println("是否有上一页:"+page.hasPrevious());
  }
  ```
  
  
  
- 自定义分页，有时候提供的API不满足我们的需求，也可以自己写分页方法，但是要注意第一个参数必须是 IPage 类型

  ```xml
  <!--IPage<User> selectPageVo(@Param("page") IPage<User> page, @Param("age") Integer age);-->
  <select id="selectPageVo" resultType="User">
    select uid,user_name,age,email from t_user where age > #{age}
  </select>
  ```

  ```java
  //Mapper中的方法
  IPage<User> selectPageVo(@Param("page") IPage<User> page, @Param("age") Integer age);
  
  @Test
  public void testPageVo(){
    //查询第1页数据，每页3条数据，所以得到的数据的索引应该是0、1、2
    Page<User> page = new Page<>(1, 3);
    userMapper.selectPageVo(page, 20);
    System.out.println(page.getRecords());
    System.out.println(page.getPages());
    System.out.println(page.getTotal());
    System.out.println(page.hasNext());
    System.out.println(page.hasPrevious());
  }
  ```



### 乐观锁

在修改数据库中的数据时，为了避免发生修改冲突的问题，我们需要对数据加锁防止并发修改，锁的类型按加锁与否可以分为乐观锁和悲观锁。

- 乐观锁：对数据修改持乐观态度。只有在数据进行提交更新的时候，才对数据修改冲突进行检测，如果发生冲突，就返回给用户异常信息，让用户自行决定后续操作，一般使用 version 属性来实现，每次操作都更新一遍 version。
- 悲观锁：对数据修改持悲观态度。在整个数据处理过程中，将数据处于锁定状态，一般使用锁来实现。



#### 问题引入

场景：一份商品成本 80 元，售价 100 元。老板吩咐小李，让他把价格上涨 50 元，但是小李没有立刻去上调，等了 1 个小时后，老板觉得这个价格有点太高了，就吩咐小王让他去把价格下调 30 元，此时刚好小李也同时在操作价格，小王拿到价格的时候是 100 元，下调 30 元后覆盖了小李修改的价格，最终价格被设定为 70 元。

```java
@Test
public void method1() {
  //小李查询商品价格
  Product productLi = productMapper.selectById(1);
  System.out.println("小李查询的商品价格：" + productLi.getPrice());
  //小王查询商品价格
  Product productWang = productMapper.selectById(1);
  System.out.println("小王查询的商品价格：" + productLi.getPrice());
  //小李把价格上调50
  productLi.setPrice(productLi.getPrice() + 50);
  productMapper.updateById(productLi);
  //小王把价格下调30
  productWang.setPrice(productWang.getPrice() - 30);
  productMapper.updateById(productWang);
  //老板查询商品价格:70
  Product productBoss = productMapper.selectById(1);
  System.out.println("老板查询的商品价格：" + productBoss.getPrice());
}
```



#### MyBatis-Plus 使用乐观锁

- 配置配置类

  ```java
  @Configuration
  public class MyBatisPlusConfig {
    @Bean
    public MyBatisPlusInterceptor myBatisPlusInterceptor() {
      MyBatisPlusInterceptor myBatisPlusInterceptor = new MyBatisPlusInterceptor();
      //添加乐观锁插件
      myBatisPlusInterceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
      return myBatisPlusInterceptor;
    }
  }
  ```

  

- 标识乐观锁版本号属性

  ```java
  public class Product {
  	private Long id;
    private String name;
    private Integer price;
    @Version //标识实体类中代表乐观锁版本号字段的属性
    private Integer version;
  }
  ```

  

- 模拟修改冲突

  1. 取出记录时，获取当前数据的 version
  2. 更新时，带上这个 version 作为查询的条件
  3. 执行更新时，把这个 version 字段 + 1
  4. 如果当前 version 的值和预期的值不一致，就更新失败

  ```java
  @Test
  public void method1() {
    //小李查询商品价格
    Product productLi = productMapper.selectById(1);
    System.out.println("小李查询的商品价格：" + productLi.getPrice());
    //小王查询商品价格
    Product productWang = productMapper.selectById(1);
    System.out.println("小王查询的商品价格：" + productLi.getPrice());
    //小李把价格上调50
    productLi.setPrice(productLi.getPrice() + 50);
    productMapper.updateById(productLi);
    //小王把价格下调30，由于版本号与预期不符，修改是不成功的
    productWang.setPrice(productWang.getPrice() - 30);
    productMapper.updateById(productWang);
    //老板查询商品价格:150
    Product productBoss = productMapper.selectById(1);
    System.out.println("老板查询的商品价格：" + productBoss.getPrice());
  }
  ```

  由于在小王修改价格时，当前版本号与预期版本号不一致，找不到 version = 0 的记录，导致修改失败，所以最终的价格是小李修改后的价格 150 元。

  

- 优化修改，由于小李操作后，小王的操作就不成功了，没有实现需求，需要对小王的修改操作进行优化

  ```java
  @Test
  public void method2() {
    //小李查询商品价格
    Product productLi = productMapper.selectById(1);
    System.out.println("小李查询的商品价格：" + productLi.getPrice());
    //小王查询商品价格
    Product productWang = productMapper.selectById(1);
    System.out.println("小王查询的商品价格：" + productLi.getPrice());
    //小李把价格上调50
    productLi.setPrice(productLi.getPrice() + 50);
    productMapper.updateById(productLi);
    //小王把价格下调30
    productWang.setPrice(productWang.getPrice() - 30);
    int result = productMapper.updateById(productWang);
    if (result == 0) {
      //result=0代笔小王修改失败了，需要重试
      Product productWangNew = productMapper.selectById(1);
      productWangNew.setPrice(productWangNew.getPrice() - 30);
      productMapper.updateById(productWangNew);
    }
    //老板查询商品价格:120
    Product productBoss = productMapper.selectById(1);
    System.out.println("老板查询的商品价格：" + productBoss.getPrice());
  }
  ```



## 通用枚举

有一些属性的取值都是比较固定的，例如性别（男、女），MyBatis-Plus 为此提供了枚举属性的解决方案：`@EnumValue` ，使用这个注解标识的属性，在保存时作为存储的数据保存到数据库中，其他属性不参与保存。

```java
@Getter
public enum SexEnum {
  MALE(1, "男"),
  FEMALE(2, "女");
  
  @EnumValue //存储时把注解标识的属性存储到数据库中
  private Integer sex;
  private String sexName;
}
```

```java
@Data
public class User {
  private Long id;
  private String name;
  private SexEnum sex;
}
```

```java
User user = new User();
user.setName("张三");
user.setSex(SexEnum.MALE);
userMapper.insert(user);
```

## 总结

MyBatis-Plus 是对 MyBatis 框架的一次再封装，增强了 MyBatis 的功能，比如 CRUD 方面，另外还提供了许多新的功能，比如乐观锁插件、通用枚举等。这里只是简单列举了我目前常用到的功能，关于其他扩展功能和插件可以到官网了解更多。