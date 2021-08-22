# 概念

- JPA：Java Persistence API。**JPA是一组Java持久层Api的规范**，通过注解或者XML描述【对象-关系表】之间的映射关系，并将实体对象持久化到数据库中。
  
  - 注解：`@Entity`、`@Table`、`@Column`等等
  - JPA的API：具体方法对应SQL操作：`merge(T t)`、`persist(Object var1)`
  - JPQL查询语句：通过面向对象的方式查询数据，避免程序与SQL语句紧密耦合。
  
- Hibernate：JPA是一套规范，仅仅定义了一些接口，**Hibernate是实现了JPA接口的ORM框架**。也就是说JPA是一套ORM规范，Hibernate实现了JPA规范。

- Spring Data JPA：**是JPA Repository的实现**，和Hibernate、MyBatis不在同一层次上。**按照约定好的方法命名规则来写dao层接口**，可以在不写接口实现类的情况下，实现对数据库的访问和操作。同时还提供很多除了CRUD之外的功能，如：分页、排序、复杂查询等。**可以理解为JPA规范的在此封装抽象，底层还是使用了Hibernate的JPA技术实现**

- MyBatis：没有采用面向对象方式，而是采用了原生的SQL，然后把数据填入POJO

- SQL：结构化查询语句(Structured Query Language)，数据库查询语句

- HQL：(Hibernate Query Language)，相对于Criteria查询提供了更加丰富和灵活的查询特性，提供了类似SQL语句的查询方式，同时也提供了更加**面向对象**的封装

- JPQL：Java持久化查询语句(Java Persistence Query Language)，在JavaEE中，专门为Java 应用程序访问和导航实体实例设计的，具有与SQL 相类似的特征，JPQL是完全面向对象的，具备继承、多态和关联等特性，是HQL的子集

  - 缺点：HQL/JPQL等语言更加复杂和难以理解；性能上明显降低，速度更慢，内存占用巨大，而且还不好优化；关联查询受到许多限制：如果两个实体类之间没有（实现）关联关系，你就不能把两个实体（或者表）join起来查询。这是很恼火的事情，因为我们很多时候并不需要显式定义两个实体类之间的关联关系就可以实现业务逻辑，如果使用HQL，只是为了join我们就必须在两个实体类之间添加代码，而且还不能逆向工程，如果表里面没有定义外键约束的话，逆向工程会把我们添加的关联代码抹掉

  

  

  ![](https://gitee.com/ngyb/pic/raw/master/007S8ZIlgy1gfsrory7h9j30k80cogn9-20210312220056561.jpg)





### JPA主要类及结构图

##### 真正的 JPA 的底层封装类

- EntityManager
- EntityManagerImpl

**7个Repository接口**

- Repository
- CurdRepository
- PagingAndSortingRepository
- JpaRepository
- QueryByExampleExecutor
- JpaSpecificationExecutor
- QueryDslPredicateExecutor

**2个Repository实现类**

- SimpleJpaRepository
- QueryDslJpaRepository

**类结构关系图**

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfsrosdgs1j316a0q20ve.jpg)

