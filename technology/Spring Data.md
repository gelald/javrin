- JPA：Java Persistence API。通过注解或者XML描述【对象-关系表】之间的映射关系，并将实体对象持久化到数据库中。
  - 注解：`@Entity`、`@Table`、`@Column`等等
  - JPA的API：具体方法对应SQL操作：`merge(T t)`、`persist(Object var1)`
  - JPQL查询语句：通过面向对象的方式查询数据，避免程序与SQL语句紧密耦合。
- Hibernate：JPA是一套规范，仅仅定义了一些接口，Hibernate是实现了JPA接口的ORM框架。也就是说JPA是一套ORM规范，Hibernate实现了JPA规范。
- Spring Data JPA：**按照约定好的方法命名规则来写dao层接口**，可以在不写接口实现类的情况下，实现对数据库的访问和操作。同时还提供很多除了CRUD之外的功能，如：分页、排序、复杂查询等。**可以理解为JPA规范的在此封装抽象，底层还是使用了Hibernate的JPA技术实现**![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfsrory7h9j30k80cogn9.jpg)





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

