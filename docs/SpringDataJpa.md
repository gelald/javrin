# SpringDataJpa

## 概念

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

  

  

  ![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/007S8ZIlgy1gfsrory7h9j30k80cogn9-20210312220056561.jpg)





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

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/007S8ZIlgy1gfsrosdgs1j316a0q20ve.jpg)



## Jpa的映射策略

在Hibernate5.x的版本中，Hibernate将实体映射到数据库的表中时，会经历两个步骤

1. 从对象模型提取一个适合的**逻辑名称**，这个逻辑名称可以通过`@Table`、`@Column`等注解完成，也可以通过指定`ImplicitNamingStrategy`完成
2. 将上述得到的逻辑名称转换成**物理名称**，这个物理名称由`PhysicalNamingStrategy`决定



### ImplicitNamingStrategy

隐式命名策略，当一个实体没有显示地命名映射到数据库表或属性没有显示地命名映射到数据库表字段时（没有使用`@Table`、`@Column`等注解），需要隐式地确定具体映射的表或字段，那么表名隐式的被认为是实体名，或者`@Entity`中的`name`属性

在配置文件中的键名为：`spring.jpa.hibernate.naming.implicit-strategy`

有五个可以指定的值：

- `org.hibernate.boot.model.naming.ImplicitNamingStrategyJpaCompliantImpl`
- `org.hibernate.boot.model.naming.ImplicitNamingStrategyLegacyHbmImpl`
- `org.hibernate.boot.model.naming.ImplicitNamingStrategyLegacyJpaImpl`
- `org.hibernate.boot.model.naming.ImplicitNamingStrategyComponentPathImpl`
- `org.springframework.boot.orm.jpa.hibernate.SpringImplicitNamingStrategy`

一般开发时常用的做法会在实体上使用`@Table`注解标记映射的表、在属性上使用`@Column`注解标记映射的字段，隐式命名策略少用



### PhysicalNamingStrategy

物理命名策略，用于转换“逻辑名称”(隐式或显式)的表或列成一个物理名称

在配置文件中的键名为：`spring.jpa.hibernate.naming.physical-strategy`

有两个可以指定的值：

- `org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl`
- `org.springframework.boot.orm.jpa.hibernate.SpringPhysicalNamingStrategy`



#### PhysicalNamingStrategyStandardImpl

当物理命名策略指定为这个值时，表名列名都不做修改，直接映射（CreateTime ==> CreateTime）



##### 证明

```java
public class PhysicalNamingStrategyStandardImpl implements PhysicalNamingStrategy, Serializable {
    public static final PhysicalNamingStrategyStandardImpl INSTANCE = new PhysicalNamingStrategyStandardImpl();

    public PhysicalNamingStrategyStandardImpl() {
    }

    public Identifier toPhysicalCatalogName(Identifier name, JdbcEnvironment context) {
        return name;
    }

    public Identifier toPhysicalSchemaName(Identifier name, JdbcEnvironment context) {
        return name;
    }

    public Identifier toPhysicalTableName(Identifier name, JdbcEnvironment context) {
        return name;
    }

    public Identifier toPhysicalSequenceName(Identifier name, JdbcEnvironment context) {
        return name;
    }

    public Identifier toPhysicalColumnName(Identifier name, JdbcEnvironment context) {
        return name;
    }
}
```

无论是数据库名、列名等方法，都是直接返回true，对名字不做修改，所以这个命名策略是直接映射的



#### SpringPhysicalNamingStrategy

当物理命名策略指定为这个值时，首字母小写，大写字母变为小写且前面加下划线（CreateTime ==> create_time）



##### 证明

```java
public class SpringPhysicalNamingStrategy implements PhysicalNamingStrategy {
    public SpringPhysicalNamingStrategy() {
    }

    public Identifier toPhysicalCatalogName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return this.apply(name, jdbcEnvironment);
    }

    public Identifier toPhysicalSchemaName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return this.apply(name, jdbcEnvironment);
    }

    public Identifier toPhysicalTableName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return this.apply(name, jdbcEnvironment);
    }

    public Identifier toPhysicalSequenceName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return this.apply(name, jdbcEnvironment);
    }

    public Identifier toPhysicalColumnName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return this.apply(name, jdbcEnvironment);
    }

    private Identifier apply(Identifier name, JdbcEnvironment jdbcEnvironment) {
        if (name == null) {
            return null;
        } else {
            StringBuilder builder = new StringBuilder(name.getText().replace('.', '_'));

            for(int i = 1; i < builder.length() - 1; ++i) {
                if (this.isUnderscoreRequired(builder.charAt(i - 1), builder.charAt(i), builder.charAt(i + 1))) {
                    builder.insert(i++, '_');
                }
            }

            return this.getIdentifier(builder.toString(), name.isQuoted(), jdbcEnvironment);
        }
    }

    protected Identifier getIdentifier(String name, boolean quoted, JdbcEnvironment jdbcEnvironment) {
        if (this.isCaseInsensitive(jdbcEnvironment)) {
            name = name.toLowerCase(Locale.ROOT);
        }

        return new Identifier(name, quoted);
    }

    protected boolean isCaseInsensitive(JdbcEnvironment jdbcEnvironment) {
        return true;
    }

    private boolean isUnderscoreRequired(char before, char current, char after) {
        return Character.isLowerCase(before) && Character.isUpperCase(current) && Character.isLowerCase(after);
    }
}
```

查看源码可以看出：`apply`方法将大写前加下划线、`getIdentifier`方法将大写变为小写，所以这个命名策略映射是把驼峰转换成下划线的



### PhysicalNamingStrategy和ImplicitNamingStrategy的区别

从逻辑上看

- `ImplicitNamingStrategy`只管模型对象层次的处理
- `PhysicalNamingStrategy`只管映射成真实的数据名称的处理

从处理场景上看

- 仅仅只有当没有显式地提供名称时才会使用，也就是说当对象模型中已经指定了`@Table`或者`@Entity`等name时，设置的`ImplicitNamingStrategy`并不会起作用

- 无论对象模型中是否显式地指定列名或者已经被隐式决定，`PhysicalNamingStrategy`都会应用，所以**发挥决定性作用**的是`PhysicalNamingStrategy`



## 开发时遇到的问题

### Could not safely identify store assignment for repository candidate interface

当启动引入了Spring Data Jpa依赖的应用时，控制台输出下列日志

> [org.springframework.data.repository.config.RepositoryConfigurationExtensionSupport] 283 - Spring Data Elasticsearch - Could not safely identify store assignment for repository candidate interface…
>
> [org.springframework.data.repository.config.RepositoryConfigurationExtensionSupport] 283 - Spring Data Redis - Could not safely identify store assignment for repository candidate interface…

#### 原因

应用引入了Spring Data Jpa作为持久层框架的同时引入了Redis、Elasticsearch等Spring Data支持的数据库(Spring Data对这些数据库封装并提供了一系列方法，方便完成增删查改)，但未把它们作为数据持久化存储源repository使用。类似的还有MongoDB

以Redis为例，`RedisRepositoriesAutoConfiguration`里面的注解`@ConditionalOnProperty`会判断 `spring.data.redis.repositories.enable `这个配置项的属性，如果不存在(默认为true)或若存在且属性值为true会自动扫描**继承**`org.springframework.data.repository.Repository`的实体Repository接口

![RedisRepositoriesAutoConfiguration中判断属性逻辑](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210830163455.png)

#### 解决方法

在配置文件中显式地将上面提到的属性设置为false，那么这些自动配置类就不会扫描了

```yaml
spring:
  data:
    redis:
      repositories:
        enabled: false
    elasticsearch:
      repositories:
        enabled: false
```

