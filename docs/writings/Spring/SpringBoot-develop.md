---
title: SpringBoot 开发中的一些问题总结
icon: article
category:

- 干货
- 文章
- Spring/SpringBoot
- coding

---

# SpringBoot 开发中的一些问题总结



## SpringBoot 时间格式化

在 Java 中时间格式化有两种方式：

- `Date` 类型，使用 `SimpleDateFormat` 进行格式化

  ```java
  // 定义时间格式化对象和格式化样式
  SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
  // 格式化时间对象
  String dateString = simpleDateFormat.format(new Date())
  ```

  

- `LocalDateTime` 类型，使用 `DateTimeFormatter` 进行格式化。推荐使用这种方式，因为 `DateTimeFormatter` 是线程安全的。

  ```java
  // 定义时间格式化对象和格式化样式
  DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
  // 格式化时间对象
  String dateString = dateTimeFormatter.format(LocalDateTime.now());
  ```

  

众所周知，Spring makes all simple ，在 SpringBoot 中有更优雅的格式化的方式

### 全局时间格式化

如果项目的序列化工具使用 Spring 提供的 jackson，那么可以考虑使用这种方式，在符合需求的情况下可以“一劳永逸”

```yaml
spring:
	jackson:
		# 格式化时间字段
		date-format: yyyy-MM-dd HH:mm:ss
		# 指定时区，我们身处于东八区
		time-zone: GMT+8
```

Controller 在返回时，使用 jackson 序列化工具，对返回的数据进行统一的 JSON 格式化处理，所以这种方式一个很重要的前提条件就是**项目使用 jackson 作为序列化工具**



### 部分时间格式化

灵活与统一永远是一对长期的博弈，上面也提到了要一劳永逸也是要在符合需求的情况下，实际开发中难免会有多种时间格式的需求场景，Spring 提供了统一的配置方式，也提供了灵活的部分格式化的方式

```java
@Data
public class Order {
    private int id;
    // 对 createTime 字段进行格式化处理、指定时区
    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss", timezone = "GMT+8")
    private Date createTime;
    // 对 updateTime 字段进行格式化处理、指定时区
		@JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss", timezone = "GMT+8")
    private LocalDateTime updateTime;
}
```

和上述方式一样，也是在 Controller 返回的时候，使用 jackson 序列化工具来进行统一的格式化处理，所以这种方式的前提也是**项目使用 jackson 作为序列化工具**



### 总结

从 Java 的做法和 Spring 的做法可以看出，**Spring 的做法更偏向于配置**而不是开发，无需修改核心业务代码，只需要简单的配置一下，代码侵入度更低，维护起来更加友好。