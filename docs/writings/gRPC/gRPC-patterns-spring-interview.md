# gRPC 通信模式与 Spring Boot 整合 — 面试指南

> 参考: [gRPC 通信模式与 Spring Boot 整合](./gRPC-patterns-spring.md)

**面试热度**：🔥🔥🔥🔥🔥（项目用了 gRPC 就必问）

---

## 高频面试题 Top 10

### Q1：gRPC 有哪四种通信模式？分别适合什么场景？

> 面试频率：⭐⭐⭐⭐⭐

| 模式 | 请求-响应 | 典型场景 |
| --- | --- | --- |
| **Unary** | 1 → 1 | 普通查询、增删改（最常用） |
| **Server Streaming** | 1 → N | 实时推送、大结果集分批返回、日志流 |
| **Client Streaming** | N → 1 | 文件上传、批量提交、聚合计算 |
| **Bidirectional** | N → N | 聊天、实时协作、双向心跳 |

> "我们项目中 Unary 用得最多（普通 CRUD），Server Streaming 用于实时消息推送（替代 WebSocket），Client Streaming 用于大文件分块上传。"

---

### Q2：BlockingStub、AsyncStub、FutureStub 有什么区别？

> 面试频率：⭐⭐⭐⭐⭐

| 特性 | BlockingStub | FutureStub | AsyncStub |
| --- | --- | --- | --- |
| 方式 | 同步阻塞 | `ListenableFuture` | 回调 `StreamObserver` |
| Unary | 支持 | 支持 | 支持 |
| Server Streaming | 支持（Iterator） | 不支持 | 支持 |
| Client Streaming | **不支持** | **不支持** | 支持 |
| Bidirectional | **不支持** | **不支持** | 支持 |

**面试关键**：Client Streaming 和 Bidirectional Streaming **只能用 AsyncStub**，因为 BlockingStub 的语义无法表达"客户端主动发流"。

---

### Q3：你们项目中用的哪种通信模式？为什么？

> 面试频率：⭐⭐⭐⭐⭐

**回答模板**（根据你的项目选择）：

> "我们项目主要用了 **Unary 和 Server Streaming** 两种模式：
> - 内部服务的增删改查全部用 **Unary**，因为是标准的请求-响应语义
> - 消息通知服务用 **Server Streaming**，客户端订阅后服务端持续推送新消息
>
> 选择 Server Streaming 而不是 WebSocket 的原因是：gRPC 原生支持、与现有微服务架构一致、Protobuf 编码更高效。"

---

### Q4：Spring Boot 怎么整合 gRPC？@GrpcService 和普通 @Service 有什么区别？

> 面试频率：⭐⭐⭐⭐⭐

**Spring 官方 `spring-grpc` 整合方式**：

1. 服务端：继承 `ImplBase`，注册为 `@Bean`（或 `@Service`），Spring Boot 自动发现并启动 gRPC Server
2. 客户端：通过 `GrpcChannelFactory` 创建 Channel，再用 `XxxGrpc.newBlockingStub(channel)` 创建 Stub

**`@GrpcService` vs `@Service` 的区别**：

| 维度 | @Service（Spring 官方方式） | @GRpcService（社区 starter） |
| --- | --- | --- |
| 所属 | Spring 官方 `spring-grpc` | 社区 `grpc-spring-boot-starter` |
| 作用 | 标记为 Spring Bean | 同时标记为 gRPC 服务 |
| 依赖注入 | 完全支持 | 完全支持 |
| 配置 | `spring.grpc.server.port` | `grpc.server.port` |

**核心要点**：两者本质都是把 gRPC 服务实现注册到 Spring 容器，区别只是自动发现机制不同。面试时说明你用的是哪种即可。

---

### Q5：Server Streaming 的服务端怎么实现？客户端怎么消费？

> 面试频率：⭐⭐⭐⭐

**服务端**：循环调用 `responseObserver.onNext(resp)` 逐条推送，最后 `responseObserver.onCompleted()`：

```java
@Override
public void listOrders(ListOrdersRequest request,
                       StreamObserver<OrderResponse> responseObserver) {
    for (Order order : orderRepo.findByUserId(request.getUserId())) {
        responseObserver.onNext(toResponse(order));
    }
    responseObserver.onCompleted();
}
```

**客户端（BlockingStub）**：返回 `Iterator`，用 `while(hasNext())` 消费：

```java
Iterator<OrderResponse> it = blockingStub.listOrders(request);
while (it.hasNext()) {
    process(it.next());
}
```

---

### Q6：Client Streaming 的 StreamObserver 流向是怎样的？

> 面试频率：⭐⭐⭐⭐

Client Streaming 有两个 StreamObserver，容易混淆：

```
服务端方法签名:
StreamObserver<FileChunk> uploadFile(StreamObserver<UploadResponse> responseObserver)
^返回值: 服务端用来接收客户端请求的Observer              ^参数: 服务端用来发送响应的Observer

客户端:
StreamObserver<FileChunk> requestObserver = asyncStub.uploadFile(responseObserver);
^客户端用来发送请求                                     ^客户端用来接收响应
```

**核心**：服务端返回的是"接收请求"的 Observer，参数是"发送响应"的 Observer。客户端获取"发送请求"的 Observer，传入"接收响应"的 Observer。

---

### Q7：Bidirectional Streaming 和"交替请求-响应"有什么区别？

> 面试频率：⭐⭐⭐⭐

**关键区别**：Bidirectional Streaming 的两端流是**完全独立**的。

- 交替模式：必须 一问一答，严格交替
- 双向流：客户端可以连续发 10 条消息不等回复，服务端也可以随时推送，两端的 `onNext()` 互不阻塞

```java
// 双向流中, 服务端可以在任意时刻响应
@Override
public void onNext(ChatMessage msg) {
    // 不需要等客户端 onCompleted, 收到消息立即回复
    responseObserver.onNext(buildReply(msg));
}
```

**底层原理**：HTTP/2 的多路复用让两个方向的 Stream 独立传输。

---

### Q8：gRPC 的 StreamObserver 有哪些调用约束？忘记调用 onCompleted 会怎样？

> 面试频率：⭐⭐⭐

**调用约束**：
1. `onCompleted()` 和 `onError()` **互斥**，只能调一个，且只能调一次
2. 调用 `onCompleted()` 或 `onError()` 后**不能再调用** `onNext()`
3. **必须**调用 `onCompleted()` 或 `onError()` 之一来关闭流

**忘记 onCompleted 的后果**：
- 客户端会一直等待，表现为**请求挂起**
- 服务端资源（线程、内存）无法释放
- 大量挂起的流会导致**资源泄漏**甚至服务不可用

这是 gRPC 开发中最常见的 bug 之一。

---

### Q9：如何在 Spring Boot 中管理 gRPC 客户端的 Channel？

> 面试频率：⭐⭐⭐

**推荐方式**：用 `GrpcChannelFactory` 创建 Channel，Spring Boot 自动管理生命周期。

```java
@Bean
UserServiceGrpc.UserServiceBlockingStub userStub(GrpcChannelFactory channels) {
    return UserServiceGrpc.newBlockingStub(
        channels.createChannel("user-service:9090")
    );
}
```

**注意**：
- 一个服务一个 Channel（Channel 本身支持 HTTP/2 多路复用）
- 不要在每次调用时创建新 Channel
- Spring Boot 关闭时会自动 shutdown Channel
- 如果不用 Spring Boot，需要手动 `ManagedChannel.shutdown()`

---

### Q10：你们项目中 gRPC 和 REST 是怎么共存的？

> 面试频率：⭐⭐⭐⭐

> "我们采用**内外分离**的架构：
> - **内部服务间通信**：全部用 gRPC，享受高性能和强类型
> - **对外暴露 API**：用 REST（Spring MVC），对前端友好、调试方便
> - 同一个服务可以同时启动 HTTP 端口（REST）和 gRPC 端口，互不影响
>
> Spring Boot 中 gRPC 服务端口和 HTTP 端口是独立的，通过 `spring.grpc.server.port` 和 `server.port` 分别配置。"

---

## 易错点总结

### 易错点 1：BlockingStub 用于 Client/Bidi Streaming

BlockingStub **不支持** Client Streaming 和 Bidirectional Streaming。这两种模式必须用 AsyncStub（回调方式）。

如果面试官问"BlockingStub 能不能做 Client Streaming"，答案是不能。

### 易错点 2：proto 中 stream 位置搞反

```protobuf
// Server Streaming: stream 在 returns 中
rpc List(Request) returns (stream Response);

// Client Streaming: stream 在参数中
rpc Upload(stream Request) returns (Response);

// Bidirectional: 两边都有 stream
rpc Chat(stream Request) returns (stream Response);
```

记忆：**stream 写在哪边，哪边就是流式发送**。

### 易错点 3：StreamObserver 不调 onCompleted

忘记 `onCompleted()` 是最常犯的错误。客户端会无限等待，表现为超时或挂起。**每个流必须以 `onCompleted()` 或 `onError()` 结束**。

### 易错点 4：混淆 Spring 官方和社区 gRPC Starter

- **Spring 官方**：`org.springframework.grpc:spring-grpc-spring-boot-starter`，用 `@Bean`/`@Service` 注册
- **社区版**：`net.devh:grpc-spring-boot-starter`，用 `@GRpcService` 注解

面试时说明你用的是哪种，避免混淆。

### 易错点 5：Unary 用 AsyncStub 时的回调陷阱

Unary 模式下用 AsyncStub，如果直接在 `onNext` 回调中访问外部变量，要注意**线程安全**。推荐用 BlockingStub 或 FutureStub 处理 Unary 调用，AsyncStub 留给流式场景。

---

## 面试话术模板

**场景：面试官问"介绍一下你们项目中 gRPC 的使用方式"**

> 我们项目是 Spring Boot 微服务架构，用 Spring 官方的 `spring-grpc` 整合 gRPC。
>
> **通信模式**方面，主要用了 Unary 和 Server Streaming。内部服务的增删改查全部用 Unary，消息通知服务用 Server Streaming 做实时推送。
>
> **客户端**通过 `GrpcChannelFactory` 创建 Channel 和 Stub，Spring Boot 自动管理生命周期。我们用的是 BlockingStub，因为主要场景是 Unary 调用。
>
> **服务端**继承 protoc 生成的 ImplBase，注册为 Spring Bean，可以正常使用依赖注入。gRPC 端口和 HTTP 端口独立配置，内部用 gRPC 通信，对外暴露 REST API。
>
> 开发中需要注意 StreamObserver 必须调用 `onCompleted()` 关闭流，否则会导致资源泄漏。这个问题我们在 Code Review 中作为必检项。

---

**下一步**：完成练习题（目标 85 分+）。如果某些知识不太清楚，回到 [gRPC 通信模式与 Spring Boot 整合](./gRPC-patterns-spring.md) 对应章节复习。
