## @Component 和 @Bean 的区别

`@Component` 注解是一个通用的注解，可以作用在任何想交给 SpringIoC 容器管理的类上，Spring 会自动创建这个类的实例对象注入 IoC 容器中



`@Bean` 注解是用于**配置类**中声明一个 Bean 的，用于配置类的方法上面，表示把这个方法返回的对象注册到 IoC 容器中，可以自定义 Bean 的创建和初始化过程，包括 Bean 名称、作用域、依赖等



1. 用途不同：
   - `@Component` 注解用于标识一个想交给 SpringIoC 容器管理的类，Spring 会通过 `@ComponentScan` 注解扫描这些被修饰的类，自动创建这些类的实例对象并注册到 IoC 容器中
   - `@Bean` 注解用于配置类中声明和配置 Bean 对象，表示把方法返回的对象注册到 IoC 容器中
2. 控制权不同：
   - `@Component` 修饰的类是通过 Spring 框架来创建和初始化的
   - `@Bean` 修饰的方法返回的对象是由开发人员手动控制 Bean 的创建和配置过程