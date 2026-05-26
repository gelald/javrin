# gRPC 生产实践与高级特性 — 练习题

> 参考: [gRPC 生产实践与高级特性](./gRPC-production.md)

**总分 100 分 + 附加题 20 分** | 及格线 70 分 | 优秀线 85 分

---

## 一、选择题（每题 5 分，共 30 分）

### 1. gRPC 中，ServerInterceptor 的核心方法签名是？

A. `intercept(Call call, Request request)`
B. `interceptCall(ServerCall, Metadata, ServerCallHandler)`
C. `handle(HandlerContext context)`
D. `doFilter(Request, Response, FilterChain)`

<details>
<summary>答案</summary>

**B. `interceptCall(ServerCall, Metadata, ServerCallHandler)`**

gRPC 的 ServerInterceptor 接口定义的核心方法是 `interceptCall`，三个参数分别是：调用对象（封装了方法描述等信息）、请求头（Metadata）、下一个处理器（调用链）。
</details>

---

### 2. 在 Spring Boot 中，要将一个 ServerInterceptor 注册为全局拦截器，应该使用哪个注解？

A. `@Component`
B. `@GrpcService`
C. `@GrpcGlobalServerInterceptor`
D. `@Bean`

<details>
<summary>答案</summary>

**C. `@GrpcGlobalServerInterceptor`**

grpc-spring-boot-starter 提供的专用注解，标注后该拦截器自动对所有 `@GrpcService` 生效。`@Component` 不能自动注册为 gRPC 拦截器。
</details>

---

### 3. gRPC 的 Deadline 传播机制中，以下哪个说法是正确的？

A. Deadline 只在客户端生效，不会传递到服务端
B. Deadline 会自动传播，每个下游服务看到的是剩余时间
C. 每个服务需要手动设置自己的超时时间，框架不传播
D. Deadline 和 Timeout 完全一样，没有区别

<details>
<summary>答案</summary>

**B. Deadline 会自动传播，每个下游服务看到的是剩余时间**

Deadline 是绝对时间点，gRPC 框架会自动将其传播到调用链上的每个服务。每经过一跳，剩余时间自动递减。这是 gRPC 防止级联阻塞的核心机制。Timeout（相对时长）不会传播。
</details>

---

### 4. 当 gRPC 服务端发生 `DEADLINE_EXCEEDED` 错误时，对应的 HTTP 状态码类比是？

A. 400 Bad Request
B. 401 Unauthorized
C. 404 Not Found
D. 504 Gateway Timeout

<details>
<summary>答案</summary>

**D. 504 Gateway Timeout**

`DEADLINE_EXCEEDED` 表示请求在规定时间内未完成，类比 HTTP 的 504 Gateway Timeout。
</details>

---

### 5. gRPC 负载均衡中，`round_robin` 策略的特点是？

A. 始终选择第一个可用地址
B. 随机选择一个地址
C. 按顺序轮流选择所有地址
D. 根据服务器负载动态选择

<details>
<summary>答案</summary>

**C. 按顺序轮流选择所有地址**

`round_robin`（轮询）策略将请求按顺序轮流分配到所有可用地址。`pick_first`（默认）是始终选第一个。gRPC 标准库不提供基于负载的策略。
</details>

---

### 6. 以下关于 gRPC Metadata 的说法，正确的是？

A. Metadata 就是 Protobuf 消息的一部分
B. Metadata 类似 HTTP Header，用于传递 Token、TraceId 等元数据
C. Metadata 只能在客户端发送
D. Metadata 不支持自定义 Key

<details>
<summary>答案</summary>

**B. Metadata 类似 HTTP Header，用于传递 Token、TraceId 等元数据**

Metadata 是 gRPC 的"带外数据"通道，类似 HTTP Header。客户端和服务端都可以发送 Metadata。支持自定义 Key（如 `Metadata.Key.of("authorization", ...)`），不是 Protobuf 消息的一部分。
</details>

---

## 二、填空题（每空 3 分，共 18 分）

### 7. gRPC 客户端设置 Deadline 的两个 API 是 `_____()` 和 `withDeadline()`，其中 `_____()` 更常用（传入相对时间）。

<details>
<summary>答案</summary>

**withDeadlineAfter**、**withDeadlineAfter**

```java
// 最常用: 相对时间
stub.withDeadlineAfter(3, TimeUnit.SECONDS).sayHello(request);

// 绝对时间点
stub.withDeadline(Deadline.after(3, TimeUnit.SECONDS)).sayHello(request);
```

`withDeadlineAfter` 直接传入时长，更方便。`withDeadline` 传入 Deadline 对象（绝对时间点），适合需要精确控制的场景。
</details>

---

### 8. gRPC 拦截器中，客户端向 Metadata 注入 Token 需要重写 `SimpleForwardingClientCall` 的 `_____()` 方法；服务端从 Metadata 读取 Token 通过 `interceptCall` 的第二个参数 `_____` 获取。

<details>
<summary>答案</summary>

**start**、**Metadata**（或 `headers`）

客户端拦截器在 `start()` 方法中通过 `headers.put(key, value)` 注入 Token。服务端拦截器通过 `interceptCall(call, headers, next)` 的 `headers` 参数读取。
</details>

---

### 9. gRPC 健康检查协议的全称是 `_____._____.v1.Health`，在 Kubernetes 中可以通过配置 `_____` 探针（probe 类型）来使用。

<details>
<summary>答案</summary>

**grpc.health**、**grpc**（或 `grpc` 探针类型）

Kubernetes 1.24+ 原生支持 `grpc` 类型的探针，直接连接 gRPC 健康检查服务。

```yaml
livenessProbe:
  grpc:
    port: 9090
```
</details>

---

## 三、简答题（每题 10 分，共 30 分）

### 10. 请解释 gRPC 中 Deadline 和 Timeout 的区别，以及 Deadline 传播如何防止级联阻塞。

<details>
<summary>答案</summary>

**Deadline vs Timeout**：

| 维度 | Timeout | Deadline |
| --- | --- | --- |
| 定义 | 相对时长（"等 3 秒"） | 绝对时间点（"到 12:00:03"） |
| 传播 | 不传播，每层各自独立 | 自动传播，剩余时间递减 |
| 防级联 | 不能 | 能 |

**防止级联阻塞的机制**：

假设 Client → Service A → Service B → Service C，Client 设置 5s Deadline：

1. Client 发起调用，Deadline = 当前时间 + 5s
2. Service A 收到请求（耗时 0.5s），剩余 4.5s。调用 Service B 时 Deadline 自动传播
3. Service B 收到请求（耗时 1s），剩余 3.5s。调用 Service C 时 Deadline 自动传播
4. Service C 发现剩余时间不足或已过期，**立即放弃处理**，返回 `DEADLINE_EXCEEDED`

如果用 Timeout，每层各自设 3s，Service C 可能在 Service A 已经超时返回后还在处理，白白浪费资源。
</details>

---

### 11. 请说明 gRPC ServerInterceptor 的认证拦截器实现思路，以及认证失败时如何正确地终止调用。

<details>
<summary>答案</summary>

**实现思路**：

1. 在 `interceptCall` 方法中从 `Metadata` 提取 Token
2. 校验 Token（JWT 解析、Redis 查询等）
3. 校验通过：用 `Context` 传递用户信息，调用 `Contexts.interceptCall()` 继续调用链
4. 校验失败：调用 `call.close()` 终止，返回空 Listener

**认证失败时的正确写法**：

```java
// 正确: 调用 close + 返回空 Listener
if (token == null || !validate(token)) {
    call.close(Status.UNAUTHENTICATED
            .withDescription("Invalid token"),
            new Metadata());
    return new ServerCall.Listener<ReqT>() {};  // 空 Listener
}
```

**注意事项**：
- 不能直接 `throw` 异常，必须通过 `call.close()` 优雅关闭
- 返回空 Listener（`new ServerCall.Listener<ReqT>() {}`），否则框架会继续尝试调用方法
- 校验通过后用 `Contexts.interceptCall(ctx, call, headers, next)` 将 Context 绑定到调用链
</details>

---

### 12. 请解释 gRPC 的客户端负载均衡和服务端负载均衡的区别，以及 gRPC 为什么选择客户端负载均衡。

<details>
<summary>答案</summary>

**区别**：

| 维度 | 客户端 LB | 服务端 LB |
| --- | --- | --- |
| 位置 | 客户端 SDK 内 | 独立代理（如 Nginx） |
| 典型工具 | gRPC 内置 round_robin | Nginx, Envoy, Kubernetes Service |
| 连接模型 | 客户端直连服务端 | 客户端 → 代理 → 服务端 |
| 额外延迟 | 无 | 有（多一跳代理） |
| 适用协议 | gRPC (HTTP/2 长连接) | REST (HTTP/1.1 短连接) |

**gRPC 选择客户端 LB 的原因**：

gRPC 基于 HTTP/2 长连接 + 多路复用。如果用服务端代理（如 Nginx）做负载均衡，客户端与代理之间是一个长连接，代理需要维护到每个后端的连接池，反而成为瓶颈。

而客户端负载均衡让客户端直接维护到每个服务实例的连接，充分利用 HTTP/2 多路复用的优势，省去中间代理的开销。

**补充**：在 K8s 环境中，常用 Service（DNS + round_robin）配合客户端 LB，或者用 Service Mesh（Istio/Envoy）实现透明的服务端 LB。
</details>

---

## 四、场景题（每题 11 分，共 22 分）

### 13. 你的 gRPC 微服务系统中，调用链路为 Gateway → OrderService → PaymentService。Gateway 设置了 5 秒 Deadline。请描述：
1. Deadline 如何在调用链中传播？
2. 如果 PaymentService 处理时间过长导致超时，OrderService 应该怎么处理？
3. 客户端（Gateway）应该如何处理 `DEADLINE_EXCEEDED` 错误？

<details>
<summary>答案</summary>

**1. Deadline 传播过程**：

```
Gateway (t=0, 剩余5s)
  → OrderService (t=0.5s, 剩余4.5s, 自动传播)
    → PaymentService (t=1s, 剩余4s, 自动传播)
```

gRPC 框架自动将 Deadline 从 Gateway 传播到 OrderService，再传播到 PaymentService。每经过一跳，剩余时间递减。PaymentService 收到的 Deadline 是"当前时间 + 4s"。

**2. OrderService 的处理**：

```java
// OrderService 调用 PaymentService 时, 不需要额外设置 Deadline
// 框架自动传播, PaymentService 会感知剩余时间
PaymentResponse response;
try {
    response = paymentStub.processPayment(request);
} catch (StatusRuntimeException e) {
    if (e.getStatus().getCode() == Status.Code.DEADLINE_EXCEEDED) {
        // PaymentService 超时, OrderService 也应该立即返回
        // 不能重试! 因为 Deadline 已经快过期了
        responseObserver.onError(Status.DEADLINE_EXCEEDED
                .withDescription("Payment processing timeout")
                .asRuntimeException());
        return;
    }
    throw e;
}
```

**3. Gateway 的处理**：

```java
try {
    OrderResponse response = orderStub
            .withDeadlineAfter(5, TimeUnit.SECONDS)
            .createOrder(request);
    return response;
} catch (StatusRuntimeException e) {
    if (e.getStatus().getCode() == Status.Code.DEADLINE_EXCEEDED) {
        // 超时, 返回友好提示, 不暴露内部细节
        return OrderResponse.newBuilder()
                .setSuccess(false)
                .setMessage("请求超时, 请稍后重试")
                .build();
    }
    throw e;
}
```

**关键原则**：
- 不要在中间层重试已超时的请求（Deadline 已快过期）
- 客户端应该向用户返回友好提示，不要暴露内部错误详情
- 每层都可以通过 `Context.current().getDeadline()` 检查剩余时间
</details>

---

### 14. 你的团队需要为 gRPC 服务添加以下横切功能：JWT 认证、请求日志、Prometheus 指标采集。请设计拦截器方案，包括：
1. 需要实现哪些拦截器？
2. 拦截器的执行顺序应该怎么安排？为什么？
3. 给出 Spring Boot 中的注册方式。

<details>
<summary>答案</summary>

**1. 需要实现的拦截器**：

| 拦截器 | 类型 | 职责 |
| --- | --- | --- |
| AuthServerInterceptor | ServerInterceptor | JWT 校验，失败直接拒绝 |
| LoggingServerInterceptor | ServerInterceptor | 记录请求/响应日志和耗时 |
| MetricCollectingClientInterceptor | ClientInterceptor | Prometheus 指标采集（可用 starter 内置） |

**2. 执行顺序**：

```
请求进入 → Auth → Logging → 业务逻辑 → Logging → 响应返回
```

- **Auth 最先执行**：未认证的请求不应该被记录日志（浪费存储），也不应该到达业务层
- **Logging 第二执行**：记录所有已认证请求的日志和耗时
- **Metrics 由 starter 内置拦截器处理**：不需要手写

**3. Spring Boot 注册方式**：

```java
@Configuration
public class GrpcInterceptorConfig {

    @GrpcGlobalServerInterceptor
    @Order(1)  // 最先执行
    public AuthServerInterceptor authInterceptor(JwtParser jwtParser) {
        return new AuthServerInterceptor(jwtParser);
    }

    @GrpcGlobalServerInterceptor
    @Order(2)  // 第二执行
    public LoggingServerInterceptor loggingInterceptor() {
        return new LoggingServerInterceptor();
    }

    @Bean
    @GrpcGlobalClientInterceptor
    public MetricCollectingClientInterceptor metricCollector(MeterRegistry registry) {
        return new MetricCollectingClientInterceptor(registry);
    }
}
```

**补充说明**：
- 如果有些接口不需要认证（如健康检查），可以在 Auth 拦截器中白名单放行
- Metrics 也可以用 `grpc-spring-boot-starter` 的自动配置，省去手动注册
- 生产环境建议 Auth 拦截器还包含限流逻辑（`RESOURCE_EXHAUSTED`）
</details>

---

## 五、附加题（共 20 分）

### 15.（10 分）请解释 gRPC 中 `Metadata` 和 Protobuf 消息的区别，以及为什么 Token、TraceId 应该放在 Metadata 而不是 Protobuf 消息中。

<details>
<summary>答案</summary>

**Metadata vs Protobuf 消息**：

| 维度 | Metadata | Protobuf 消息 |
| --- | --- | --- |
| 本质 | 键值对（类似 HTTP Header） | 结构化业务数据 |
| 传输位置 | HTTP/2 HEADERS 帧 | HTTP/2 DATA 帧 |
| 定义方式 | 代码中定义 Key | .proto 文件定义 message |
| 处理位置 | 拦截器层 | 业务层 |
| 序列化 | 纯文本（ASCII） | Protobuf 二进制 |

**为什么 Token/TraceId 放 Metadata**：

1. **关注点分离**：Token、TraceId 是**基础设施关注点**，不属于业务数据。放在 Metadata 中，业务代码不需要感知它们
2. **拦截器友好**：拦截器可以统一读取 Metadata，不需要解析每个业务消息
3. **跨服务一致性**：所有 RPC 方法都自动携带 Metadata，不需要在每个 proto 文件中重复定义 Token 字段
4. **不影响接口契约**：.proto 文件只定义业务数据，保持干净

**类比**：就像 HTTP 中，Authorization 放在 Header 而不是 Body 中。
</details>

---

### 16.（10 分）请设计一个 gRPC 服务端拦截器，实现基于令牌桶算法的限流功能。要求：
1. 每个用户（通过 Metadata 中的 user-id 识别）限制每秒 10 次请求
2. 超出限制时返回 `RESOURCE_EXHAUSTED`
3. 考虑并发安全

<details>
<summary>答案</summary>

```java
public class RateLimitServerInterceptor implements ServerInterceptor {

    private static final Metadata.Key<String> USER_ID_KEY =
            Metadata.Key.of("user-id", Metadata.ASCII_STRING_MARSHALLER);

    // 每个用户一个令牌桶, ConcurrentHashMap 保证并发安全
    private final ConcurrentHashMap<String, RateLimiter> limiters = new ConcurrentHashMap<>();

    // 每秒允许的请求数
    private final double permitsPerSecond;

    public RateLimitServerInterceptor(double permitsPerSecond) {
        this.permitsPerSecond = permitsPerSecond;
    }

    @Override
    public <ReqT, RespT> ServerCall.Listener<ReqT> interceptCall(
            ServerCall<ReqT, RespT> call,
            Metadata headers,
            ServerCallHandler<ReqT, RespT> next) {

        String userId = headers.get(USER_ID_KEY);
        if (userId == null) {
            userId = "anonymous";
        }

        // 获取该用户的令牌桶 (不存在则创建)
        RateLimiter limiter = limiters.computeIfAbsent(
                userId, k -> RateLimiter.create(permitsPerSecond));

        // 尝试获取令牌 (非阻塞)
        if (!limiter.tryAcquire()) {
            // 超出限制, 返回 RESOURCE_EXHAUSTED
            call.close(Status.RESOURCE_EXHAUSTED
                    .withDescription("Rate limit exceeded for user: " + userId),
                    new Metadata());
            return new ServerCall.Listener<ReqT>() {};
        }

        return next.startCall(call, headers);
    }
}
```

**关键设计点**：

1. **`ConcurrentHashMap`**：保证多线程并发安全，`computeIfAbsent` 原子操作
2. **`RateLimiter.tryAcquire()`**：非阻塞方式尝试获取令牌，超限立即返回 false（用 Guava 的 RateLimiter）
3. **`RESOURCE_EXHAUSTED`**：gRPC 标准状态码，类比 HTTP 429 Too Many Requests
4. **空 Listener**：限流时返回空 Listener，不进入业务逻辑
5. **按用户隔离**：每个用户独立的令牌桶，互不影响

**注册方式**：

```java
@GrpcGlobalServerInterceptor
@Order(1)  // 限流应该尽早执行, 在认证之后
public RateLimitServerInterceptor rateLimitInterceptor() {
    return new RateLimitServerInterceptor(10.0);  // 每秒10次
}
```

**生产优化**：实际生产中需要加缓存过期清理（避免 userId 无限增长）、分布式限流（Redis + Lua 脚本）、限流指标暴露等。
</details>

---

## 评分参考

| 题号 | 分值 | 核心考点 |
| --- | --- | --- |
| 1-6 | 各 5 分 | 拦截器 API、Deadline 传播、Status Code、负载均衡、Metadata |
| 7-9 | 各 6 分 | Deadline API、拦截器方法签名、健康检查协议 |
| 10-12 | 各 10 分 | Deadline 传播机制、认证拦截器实现、客户端 LB 原理 |
| 13-14 | 各 11 分 | Deadline 级联处理实战、拦截器方案设计 |
| 15-16 | 各 10 分 | Metadata vs Protobuf、限流拦截器设计 |

**错题知识点速查**：

| 错题 | 回到笔记复习 |
| --- | --- |
| 1, 2, 7, 8 | 第 1 节"拦截器机制" |
| 3, 4, 9 | 第 2 节"Deadline 与超时传播" |
| 5, 6 | 第 4 节"负载均衡" + 第 1 节"Metadata" |
| 10, 13 | 第 2 节"Deadline 传播流程" |
| 11 | 第 1.3 节"JWT 认证拦截器" |
| 12 | 第 4 节"负载均衡" |
| 14 | 第 1.5 节"Spring Boot 整合拦截器" |
| 15 | 第 1 节"Metadata"概念 |
| 16 | 第 1 节"拦截器机制"综合 |

> 如果某些题目做错，回到 [gRPC 生产实践与高级特性](./gRPC-production.md) 对应章节复习。
