# gRPC 生产实践与高级特性 — 面试指南

> 参考: [gRPC 生产实践与高级特性](./gRPC-production.md)

**面试热度**：🔥🔥🔥🔥（展示生产经验的关键模块）

---

## 高频面试题 Top 10

### Q1：gRPC 的拦截器是怎么用的？和 Spring MVC 的拦截器有什么区别？

> 面试频率：⭐⭐⭐⭐⭐

**标准回答**：

gRPC 拦截器分为 ServerInterceptor 和 ClientInterceptor，类似 Spring MVC 的 Filter + Interceptor 组合。

**类比表**：

| gRPC | Spring MVC | 作用 |
| --- | --- | --- |
| ServerInterceptor | Filter | 服务端通用逻辑（认证、日志、限流） |
| ClientInterceptor | RestTemplate Interceptor | 客户端请求增强（注入 Token） |
| Metadata | HttpServletRequest Header | 传递元数据 |
| Context | RequestContextHolder | 调用链上下文传递 |

**我们项目中的使用**：
1. ServerInterceptor 做 JWT 认证：从 Metadata 提取 Token，校验后用 Context 传递 userId
2. ServerInterceptor 做日志：记录方法名、耗时、状态码
3. ClientInterceptor 注入 Token：每次调用自动带上 `Authorization: Bearer xxx`

**和 Spring MVC 的关键区别**：gRPC 拦截器操作的是 `ServerCall` 和 `Metadata`，不是 HttpServletRequest/Response，因为 gRPC 走 HTTP/2 二进制协议。

---

### Q2：gRPC 的超时是怎么处理的？什么是 Deadline 传播？

> 面试频率：⭐⭐⭐⭐⭐

**三个关键词：Deadline、自动传播、防止级联阻塞**

1. **Deadline vs Timeout**：Deadline 是绝对时间点（"到 12:00:03"），Timeout 是相对时长（"等 3 秒"）
2. **自动传播**：gRPC 框架自动将 Deadline 传播到调用链上的每个下游服务，每经过一跳剩余时间递减
3. **防止级联阻塞**：下游服务发现 Deadline 已过期会立即放弃处理，不会继续消耗资源

```java
// 客户端设置
stub.withDeadlineAfter(5, TimeUnit.SECONDS).getUser(request);
```

**面试加分**：实际项目中，我们在网关层设置统一的 Deadline（如 5s），内部服务调用不需要额外设置超时，框架自动传播。不同接口可以设不同 Deadline：读操作 3s，写操作 10s。

---

### Q3：gRPC 怎么做认证鉴权？

> 面试频率：⭐⭐⭐⭐⭐

**标准流程**：

1. 客户端 ClientInterceptor 在 Metadata 中注入 `Authorization: Bearer <jwt_token>`
2. 服务端 ServerInterceptor 从 Metadata 提取 Token 并校验
3. 校验通过：用 `Context` 传递用户信息给业务层
4. 校验失败：调用 `call.close(Status.UNAUTHENTICATED)` 终止调用

```java
// 认证失败时的关键代码
call.close(Status.UNAUTHENTICATED
        .withDescription("Invalid token"), new Metadata());
return new ServerCall.Listener<ReqT>() {};  // 空 Listener, 终止调用链
```

**面试关键**：认证失败不能直接 `throw` 异常，必须通过 `call.close()` 优雅关闭并返回空 Listener。

---

### Q4：gRPC 的错误处理怎么做？和 REST 的错误处理有什么区别？

> 面试频率：⭐⭐⭐⭐⭐

**核心区别**：REST 用 HTTP 状态码 + JSON 错误体，gRPC 用 Status Code + Metadata Trailers。

**服务端错误处理流程**：

1. 捕获业务异常 → 转为 gRPC Status Code
2. 通过 `StatusRuntimeException` 返回给客户端
3. 可选：在 Metadata Trailers 中附加结构化错误详情（`google.rpc.ErrorInfo`）

```java
// 常见映射
ResourceNotFoundException → Status.NOT_FOUND
ValidationException → Status.INVALID_ARGUMENT
AuthException → Status.UNAUTHENTICATED
RateLimitException → Status.RESOURCE_EXHAUSTED
Exception → Status.INTERNAL
```

**Spring Boot 整合**：我们用 `@GrpcAdvice` + `@GrpcExceptionHandler` 做统一异常处理，类似 Spring MVC 的 `@ControllerAdvice`。

**客户端处理**：

```java
try {
    stub.getUser(request);
} catch (StatusRuntimeException e) {
    Status.Code code = e.getStatus().getCode();
    // 根据 code 做不同处理
}
```

---

### Q5：gRPC 的 Metadata 是什么？和 Protobuf 消息有什么区别？

> 面试频率：⭐⭐⭐⭐

**类比 HTTP Header**：Metadata 是 gRPC 的"带外数据"通道，在 HTTP/2 HEADERS 帧中传输，不在 Protobuf DATA 帧中。

| 维度 | Metadata | Protobuf 消息 |
| --- | --- | --- |
| 传输位置 | HEADERS 帧 | DATA 帧 |
| 内容 | Token、TraceId 等基础设施数据 | 业务数据 |
| 处理位置 | 拦截器 | 业务层 |
| 定义方式 | 代码中 `Metadata.Key` | .proto 文件 |

**为什么 Token/TraceId 放 Metadata**：关注点分离——业务代码不需要感知认证和追踪信息，拦截器统一处理。

---

### Q6：gRPC 怎么做负载均衡？和 Nginx 负载均衡有什么区别？

> 面试频率：⭐⭐⭐⭐

**核心区别**：gRPC 用**客户端负载均衡**，REST 常用 Nginx 做**服务端负载均衡**。

**为什么 gRPC 不用 Nginx**：gRPC 基于 HTTP/2 长连接 + 多路复用。客户端与 Nginx 之间是一个长连接，Nginx 需要维护到每个后端的连接池，反而成为瓶颈。客户端负载均衡让客户端直接连每个实例，更高效。

**两种策略**：
- `pick_first`（默认）：选第一个地址，适合开发环境
- `round_robin`：轮询所有地址，适合生产多实例

**生产实践**：搭配健康检查（`healthCheckConfig`），自动摘除不健康实例。

---

### Q7：你们项目中 gRPC 拦截器的执行顺序是怎么安排的？

> 面试频率：⭐⭐⭐⭐

**我们项目的顺序**：

```
请求进入 → 限流（RateLimit）→ 认证（Auth）→ 日志（Logging）→ 业务逻辑
```

**排序原则**：
1. **限流最前**：未通过限流的请求不应该消耗任何资源（包括认证的计算开销）
2. **认证第二**：未认证的请求不应该被记录日志（浪费存储）
3. **日志第三**：记录所有合法请求的日志和耗时

用 `@Order` 注解控制顺序：

```java
@GrpcGlobalServerInterceptor @Order(1) RateLimitInterceptor
@GrpcGlobalServerInterceptor @Order(2) AuthInterceptor
@GrpcGlobalServerInterceptor @Order(3) LoggingInterceptor
```

---

### Q8：gRPC 的 Deadline 传播在实际项目中是怎么用的？

> 面试频率：⭐⭐⭐⭐

**我们的实践**：

1. **网关层设置 Deadline**：外部请求进入时设置统一 Deadline（如 5s）
2. **内部服务不额外设置**：框架自动传播，每层感知的是剩余时间
3. **关键接口自定义**：某些耗时操作（如报表生成）单独设更长的 Deadline

**注意事项**：
- 永远不要设无 Deadline 的调用——这是生产事故隐患
- 中间层收到 `DEADLINE_EXCEEDED` 不要重试（剩余时间已经不够了）
- 通过 `Context.current().getDeadline()` 可以检查剩余时间，决定是否继续处理

---

### Q9：gRPC 的健康检查怎么做的？

> 面试频率：⭐⭐⭐

gRPC 内置标准健康检查协议 `grpc.health.v1.Health`，支持 `SERVING` / `NOT_SERVING` 状态。

**Spring Boot 整合**：配置 `grpc.server.health-service.type=ACTUATOR`，自动将 Spring Actuator 健康状态映射到 gRPC Health。

**Kubernetes 集成**：K8s 1.24+ 原生支持 gRPC 探针：

```yaml
livenessProbe:
  grpc:
    port: 9090
```

**搭配负载均衡**：round_robin + healthCheckConfig，自动摘除不健康实例。

---

### Q10：gRPC 的可观测性是怎么做的？

> 面试频率：⭐⭐⭐

**三大支柱**：

1. **日志**：ServerInterceptor 统一记录方法名、耗时、状态码
2. **指标**：`MetricCollectingClientInterceptor` + Prometheus，自动采集调用次数、延迟分布、错误率
3. **链路追踪**：OpenTelemetry gRPC Interceptor，自动注入/提取 TraceId，实现跨服务追踪

```java
// Prometheus 指标 - 开箱即用
@Bean
MetricCollectingClientInterceptor metricCollector(MeterRegistry registry) {
    return new MetricCollectingClientInterceptor(registry);
}
```

**面试策略**：这个话题不需要展开太多，说清楚"拦截器 + Prometheus + OpenTelemetry"三个关键词即可。

---

## 易错点总结

### 易错点 1：认证失败直接 throw 异常

```java
// 错误: throw 会导致框架行为不可控
if (!validate(token)) {
    throw new RuntimeException("Auth failed");
}

// 正确: 调用 call.close() + 返回空 Listener
if (!validate(token)) {
    call.close(Status.UNAUTHENTICATED
            .withDescription("Invalid token"), new Metadata());
    return new ServerCall.Listener<ReqT>() {};
}
```

### 易错点 2：混淆 Deadline 和 Timeout

Deadline 会**自动传播**，Timeout 不会。生产中应该用 Deadline（`withDeadlineAfter`），不要在每一层各自设 Timeout。

### 易错点 3：Metadata Key 大小写

gRPC Metadata 的 Key **只能包含小写字母、数字和特定符号**，不能包含大写字母：

```java
// 正确
Metadata.Key.of("authorization", Metadata.ASCII_STRING_MARSHALLER);
Metadata.Key.of("x-request-id", Metadata.ASCII_STRING_MARSHALLER);

// 错误: 大写字母会导致运行时异常
Metadata.Key.of("Authorization", Metadata.ASCII_STRING_MARSHALLER);  // 报错!
```

### 易错点 4：拦截器中忘记调用 next

拦截器中**必须调用 `next.startCall()`** 或返回空 Listener，否则请求会被静默吞掉。

```java
// 错误: 忘记调用 next, 请求卡住
return new ServerCall.Listener<ReqT>() {};

// 正确: 传递给下一个处理器
return next.startCall(call, headers);
```

### 易错点 5：round_robin 不配健康检查

生产环境使用 `round_robin` 时**必须搭配健康检查**，否则请求会被轮询到已下线的实例，导致大量 `UNAVAILABLE` 错误。

---

## 面试话术模板

**场景：面试官问"你们 gRPC 在生产环境是怎么用的？"**

> 我们项目是微服务架构，服务间通信用 gRPC。生产层面主要做了三件事：
>
> **第一，拦截器体系**：用 ServerInterceptor 统一处理认证、日志、限流。认证拦截器从 Metadata 提取 JWT Token，校验后用 Context 传递用户信息。拦截器执行顺序是限流 → 认证 → 日志，用 @Order 控制。
>
> **第二，超时控制**：网关层设置统一的 Deadline（5s），内部服务调用框架自动传播，每层感知的是剩余时间。这样避免了级联阻塞——下游服务发现 Deadline 过期会立即放弃。
>
> **第三，错误处理**：用 @GrpcAdvice 做统一异常处理，业务异常自动转为 gRPC Status Code。客户端捕获 StatusRuntimeException，根据 Code 做不同处理。
>
> 负载均衡方面，我们用 round_robin + 健康检查，自动摘除不健康实例。可观测性方面，用 Prometheus 采集成 gRPC 指标，OpenTelemetry 做链路追踪。

---

**下一步**：完成练习题（目标 85 分+）。如果某些知识不太清楚，回到 [gRPC 生产实践与高级特性](./gRPC-production.md) 对应章节复习。
