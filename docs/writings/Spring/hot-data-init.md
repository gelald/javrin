# 热点数据初始化



## 思路

热点数据或字典数据初始化的思路：

- 尽可能在程序启动时就把数据放到缓存中（比如：redis），不希望在第一次查询时让用户等待时间较长
- 如果说在程序启动时就把数据加载到内存中，那么我们应该要把握好程序启动完成的时机



## 如何选择加载时机



### main 方法

最简单粗暴的方法：写在 SpringBoot 程序的 main 方法中

```java
@SpringBootApplication
public class UserApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserApplication.class, args);
      	log.info("加载热点数据到内存中");
    }
}
```

这种做法不够优雅，要是项目组其他成员效仿这种做法，会污染程序的启动方法



### 利用 Bean 的生命周期

升级一下，把数据字典的加载工作放到 Bean 的初始化方法执行

设置 Bean 的初始化方法有三种：

- 使用 `@PostConstruct` 注解
- Bean 实现 InitializingBean 接口
- 如果使用 `@Bean` 实现自定义的话，配置 `init-method` 方法

```java
@PostConstruct
public void postConstruct() {
		log.info("========Bean初始化后加载热点数据========");
}
```

这种方式还算可以，但是不太推荐，因为数据预热这个操作超出了 Bean 的生命周期这个范畴，这是项目级别的工作



### 优雅的方法

这里简单讲讲两种优雅的方法：

- 订阅 `ApplicationReadyEvent` 事件

  ```java
  @Slf4j
  @Component
  public class ApplicationReaderEventListener implements ApplicationListener<ApplicationReadyEvent> {
      @Override
      public void onApplicationEvent(ApplicationReadyEvent event) {
          log.info("========应用启动完成后加载热点数据========");
      }
  }
  ```

  

- 实现 `ApplicationRunner` 接口

  ```java
  @Slf4j
  @Component
  public class ApplicationReaderRunner implements ApplicationRunner {
      @Override
      public void run(ApplicationArguments args) throws Exception {
          log.info("========应用启动完成后加载热点数据========");
      }
  }
  ```

  

总的来说这两种方法都很好地抓住了程序启动完成的时机，是一种较为优雅的方式，从功能实现上也没有和其他内容耦合，强烈推荐



启动时机：`ApplicationRunner` 优先于 `ApplicationListener`

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20230612235828.png)



## 总结

数据预热是一件老生常谈的事情，如何选择预热的时机其实不算是技术难题，应该要更多地考量如何把这件事情做得优雅、合理，保证代码的可读性、可维护性。