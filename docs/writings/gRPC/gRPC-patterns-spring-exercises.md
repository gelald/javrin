# gRPC 通信模式与 Spring Boot 整合 — 练习题

> 参考: [gRPC 通信模式与 Spring Boot 整合](./gRPC-patterns-spring.md)

**总分 100 分 + 附加题 20 分** | 及格线 70 分 | 优秀线 85 分

---

## 一、选择题（每题 5 分，共 30 分）

### 1. gRPC 的 Server Streaming RPC 中，以下哪个描述是正确的？

A. 客户端发送多个请求，服务端返回一个响应
B. 客户端发送一个请求，服务端返回多个响应
C. 客户端和服务端同时发送多个消息
D. 客户端发送一个请求，服务端返回一个响应

<details>
<summary>答案</summary>

**B. 客户端发送一个请求，服务端返回多个响应**

Server Streaming 是"一进多出"模式。proto 定义中 `stream` 关键字写在 `returns` 的类型前面：`rpc ListOrders(Request) returns (stream Response);`
</details>

---

### 2. 以下哪种 Stub 类型**不支持** Client Streaming RPC？

A. AsyncStub
B. BlockingStub
C. FutureStub
D. B 和 C 都不支持

<details>
<summary>答案</summary>

**D. B 和 C 都不支持**

BlockingStub 只支持 Unary 和 Server Streaming。FutureStub 只支持 Unary。**Client Streaming 和 Bidirectional Streaming 只能用 AsyncStub**。这是面试高频考点。
</details>

---

### 3. 在 proto 文件中，如何定义一个 Client Streaming RPC？

A. `rpc Upload(FileChunk) returns (stream UploadResponse);`
B. `rpc Upload(stream FileChunk) returns (UploadResponse);`
C. `rpc Upload(stream FileChunk) returns (stream UploadResponse);`
D. `rpc Upload(FileChunk) returns (UploadResponse);`

<details>
<summary>答案</summary>

**B. `rpc Upload(stream FileChunk) returns (UploadResponse);`**

`stream` 写在**请求参数类型前** = 客户端流式发送（Client Streaming）。记忆技巧：stream 写在哪边，哪边就是流。
</details>

---

### 4. `StreamObserver` 接口中的 `onCompleted()` 方法的作用是？

A. 发送一条消息
B. 标记流正常结束
C. 处理流中的错误
D. 取消当前 RPC 调用

<details>
<summary>答案</summary>

**B. 标记流正常结束**

`StreamObserver` 三个方法：`onNext(V)` 发送/接收消息，`onError(Throwable)` 处理错误，`onCompleted()` 标记流正常结束。调用 `onCompleted()` 后不能再调用 `onNext()`。
</details>

---

### 5. Spring Boot 整合 gRPC 时，服务端用什么注解将类注册为 gRPC 服务？

A. `@RestController`
B. `@GRpcService`（grpc-spring-boot-starter）
C. 继承 `ImplBase` 后注册为 `@Bean` 即可（Spring 官方 spring-grpc）
D. `@GrpcController`

<details>
<summary>答案</summary>

**C. 继承 `ImplBase` 后注册为 `@Bean` 即可**

Spring 官方的 `spring-grpc` 项目中，只需要将继承 `ImplBase` 的类标记为 `@Service`（或 `@Bean`），Spring Boot 自动发现并注册为 gRPC 服务。注意区分社区版 `grpc-spring-boot-starter`（用 `@GRpcService`）和官方 `spring-grpc`（用 `@Bean`/`@Service`）。
</details>

---

### 6. 在 Bidirectional Streaming RPC 中，客户端和服务端的流是什么关系？

A. 客户端发完后服务端才能发
B. 服务端必须等客户端的 onCompleted 才能响应
C. 两端的流完全独立，可以随时互发消息
D. 只能交替发送，不能同时发

<details>
<summary>答案</summary>

**C. 两端的流完全独立，可以随时互发消息**

Bidirectional Streaming 的核心特性是**双流独立**。客户端的 `requestObserver.onNext()` 和服务端的 `responseObserver.onNext()` 互不阻塞，可以随时调用。这是它和"请求-响应交替"模式的关键区别。
</details>

---

## 二、填空题（每空 3 分，共 18 分）

### 7. gRPC 的四种通信模式分别是 _____、_____、_____ 和 _____。

<details>
<summary>答案</summary>

**Unary RPC**（一元调用）、**Server Streaming RPC**（服务端流）、**Client Streaming RPC**（客户端流）、**Bidirectional Streaming RPC**（双向流）
</details>

---

### 8. 在 proto 文件中，`rpc Chat(stream ChatMessage) returns (stream ChatMessage)` 定义的是 _____ 类型的 RPC，其中请求端的 `stream` 表示 _____ 是流式发送的。

<details>
<summary>答案</summary>

**Bidirectional Streaming**（双向流）、**客户端**

两边都有 `stream` 关键字，表示客户端和服务端都可以流式发送消息。
</details>

---

### 9. Spring Boot 客户端通过 _____ 创建 Channel，再用 _____ 方法创建 Stub 实例。

<details>
<summary>答案</summary>

**GrpcChannelFactory**、`XxxGrpc.newBlockingStub(channel)`（或 `newStub`/`newFutureStub`）

```java
@Bean
UserGrpc.UserBlockingStub stub(GrpcChannelFactory channels) {
    return UserGrpc.newBlockingStub(channels.createChannel("user-service:9090"));
}
```
</details>

---

## 三、简答题（每题 10 分，共 30 分）

### 10. 请对比 BlockingStub、AsyncStub 和 FutureStub 三种客户端 Stub 的区别和适用场景。

<details>
<summary>答案</summary>

| 特性 | BlockingStub | FutureStub | AsyncStub |
| --- | --- | --- | --- |
| 同步/异步 | 同步阻塞 | 异步（Future） | 异步（回调） |
| Unary | 支持 | 支持 | 支持 |
| Server Streaming | 支持（Iterator） | 不支持 | 支持 |
| Client Streaming | **不支持** | **不支持** | 支持 |
| Bidirectional | **不支持** | **不支持** | 支持 |

**适用场景**：
- **BlockingStub**：最常用，适合简单的 Unary 查询和 Server Streaming 消费。代码简洁直观
- **FutureStub**：需要并发调用多个 gRPC 服务时，用 `ListenableFuture` 编排异步调用
- **AsyncStub**：流式通信（Client/Bidi Streaming）唯一选择，也适合高并发非阻塞场景

**面试重点**：记住"Client Streaming 和 Bidi Streaming 只能用 AsyncStub"这个限制。
</details>

---

### 11. 请说明 Server Streaming RPC 的完整工作流程，包括客户端和服务端的交互过程。

<details>
<summary>答案</summary>

**工作流程**：

```
Client                            Server
  |                                  |
  | -- onNext(request) ------------> |  客户端发送单个请求
  | -- onCompleted() --------------> |  客户端标记请求结束
  |                                  |
  | <== onNext(response1) ========= |  服务端推送第1条
  | <== onNext(response2) ========= |  服务端推送第2条
  | <== onNext(responseN) ========= |  服务端推送第N条
  | <== onCompleted() ============= |  服务端标记流结束
```

**服务端代码模式**：
1. 接收请求参数，执行查询
2. 循环调用 `responseObserver.onNext(resp)` 逐条推送
3. 最后调用 `responseObserver.onCompleted()` 结束

**客户端代码模式**（BlockingStub）：
```java
Iterator<Response> it = blockingStub.serverStreamingCall(request);
while (it.hasNext()) {
    Response resp = it.next();
    // 处理每条响应
}
```

**典型场景**：实时日志推送、大数据集分批返回、股票行情订阅。
</details>

---

### 12. 在 Spring Boot 项目中整合 gRPC，服务端和客户端分别需要做哪些配置？请写出关键步骤。

<details>
<summary>答案</summary>

**服务端**：

1. 添加依赖：`spring-grpc-spring-boot-starter`
2. 定义 `.proto` 文件，Maven 插件生成代码
3. 继承生成的 `ImplBase`，标记为 `@Service`：

```java
@Service
public class UserGrpcService extends UserServiceGrpc.UserServiceImplBase {
    @Override
    public void getUser(GetUserRequest request,
                        StreamObserver<UserResponse> responseObserver) {
        // 业务逻辑
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
```

4. `application.yml` 配置端口：`spring.grpc.server.port=9090`

**客户端**：

1. 添加依赖：`spring-grpc-client-spring-boot-starter`
2. 通过 `GrpcChannelFactory` 创建 Stub Bean：

```java
@Bean
UserServiceGrpc.UserServiceBlockingStub userStub(GrpcChannelFactory channels) {
    return UserServiceGrpc.newBlockingStub(
        channels.createChannel("user-service:9090")
    );
}
```

3. 在业务代码中注入 Stub 直接调用

**核心优势**：Spring Boot 自动管理 gRPC Server 的生命周期、Channel 复用、依赖注入，无需手动创建 `ManagedChannel` 或 `Server`。
</details>

---

## 四、场景题（每题 11 分，共 22 分）

### 13. 你需要设计一个实时日志查询系统：前端发起一次查询请求，后端持续将匹配的日志推送给前端。请选择合适的 gRPC 通信模式，并写出关键代码。

<details>
<summary>答案</summary>

**选择 Server Streaming RPC**：一次查询请求，持续推送多条日志结果。

**proto 定义**：

```protobuf
service LogService {
  rpc StreamLogs(LogQuery) returns (stream LogEntry);
}

message LogQuery {
  string keyword = 1;
  string level = 2;  // INFO / WARN / ERROR
}

message LogEntry {
  string timestamp = 1;
  string level = 2;
  string message = 3;
}
```

**服务端实现**：

```java
@Service
public class LogGrpcService extends LogServiceGrpc.LogServiceImplBase {

    @Override
    public void streamLogs(LogQuery request,
                           StreamObserver<LogEntry> responseObserver) {
        // 模拟持续查询日志
        logRepository.streamByKeyword(request.getKeyword())
            .forEach(log -> {
                LogEntry entry = LogEntry.newBuilder()
                    .setTimestamp(log.getTimestamp())
                    .setLevel(log.getLevel())
                    .setMessage(log.getMessage())
                    .build();
                responseObserver.onNext(entry);  // 逐条推送
            });
        responseObserver.onCompleted();
    }
}
```

**为什么不用 Unary**：日志可能很多，一次性返回所有日志会导致内存溢出。Server Streaming 逐条推送，内存可控。
</details>

---

### 14. 你需要实现一个文件上传功能：客户端将大文件分块上传，服务端接收所有块后返回上传结果。请选择通信模式，说明客户端和服务端的 StreamObserver 分别是什么角色。

<details>
<summary>答案</summary>

**选择 Client Streaming RPC**：客户端发送多个文件块，服务端汇总后返回一个结果。

**proto 定义**：

```protobuf
service FileService {
  rpc UploadFile(stream FileChunk) returns (UploadResponse);
}

message FileChunk {
  string filename = 1;
  bytes data = 2;
  int32 chunk_index = 3;
}

message UploadResponse {
  bool success = 1;
  int64 total_size = 2;
  string file_id = 3;
}
```

**StreamObserver 角色说明**：

| 角色 | 类型 | 说明 |
| --- | --- | --- |
| 服务端方法返回值 | `StreamObserver<FileChunk>` | 服务端用它**接收**客户端的文件块 |
| 服务端方法参数 | `StreamObserver<UploadResponse>` | 服务端用它**发送**最终结果 |
| 客户端请求 Observer | `StreamObserver<FileChunk>` | 客户端用它**发送**文件块 |
| 客户端响应 Observer | `StreamObserver<UploadResponse>` | 客户端用它**接收**最终结果 |

**核心流程**：
1. 客户端获取 `requestObserver`（发送端）
2. 循环调用 `requestObserver.onNext(chunk)` 发送文件块
3. 发送完毕调用 `requestObserver.onCompleted()`
4. 服务端在 `onCompleted()` 中汇总结果，通过 `responseObserver.onNext(resp)` 返回

**为什么不用 Unary**：大文件无法一次性加载到内存。分块上传内存可控，且可以展示上传进度。
</details>

---

## 五、附加题（共 20 分）

### 15. （10 分）请解释 `StreamObserver` 的 `onNext`、`onError`、`onCompleted` 三个方法的调用规则和约束。

<details>
<summary>答案</summary>

**调用规则**：

1. **`onNext(V value)`**：发送或接收一条消息，可以调用多次（流式场景）
2. **`onError(Throwable t)`**：通知流发生错误，调用后流**终止**，不能再调用任何方法
3. **`onCompleted()`**：通知流正常结束，调用后流**终止**，不能再调用任何方法

**关键约束**：
- `onCompleted()` 和 `onError()` **互斥**，只能调用其中一个，且只能调用一次
- 调用 `onCompleted()` 或 `onError()` 后，不能再调用 `onNext()`
- 如果不调用 `onCompleted()` 或 `onError()`，流会一直挂着（资源泄漏）
- `onError` 会立即终止流，不需要先调用 `onCompleted()`

**常见 bug**：忘记调用 `onCompleted()` 导致客户端一直等待，或者 `onError` 后又调用了 `onNext()`。
</details>

---

### 16. （10 分）你负责一个微服务系统的 gRPC 整合。服务 A 需要同时调用服务 B 的 Unary 接口和服务 C 的 Server Streaming 接口。请设计 Spring Boot 中的 Stub 配置方案，并说明如何让两个调用并发执行。

<details>
<summary>答案</summary>

**Stub 配置**：

```java
@Configuration
public class GrpcClientConfig {

    @Bean
    ServiceBGrpc.ServiceBBlockingStub serviceBStub(GrpcChannelFactory channels) {
        return ServiceBGrpc.newBlockingStub(
            channels.createChannel("service-b:9090")
        );
    }

    @Bean
    ServiceCGrpc.ServiceCBlockingStub serviceCStub(GrpcChannelFactory channels) {
        return ServiceCGrpc.newBlockingStub(
            channels.createChannel("service-c:9090")
        );
    }
}
```

**并发调用方案**：

```java
@Service
public class OrchestratorService {
    private final ServiceBGrpc.ServiceBBlockingStub serviceBStub;
    private final ServiceCGrpc.ServiceCBlockingStub serviceCStub;

    // 方案一: CompletableFuture（推荐）
    public CombinedResult callBoth(Request req) {
        CompletableFuture<ResponseB> futureB = CompletableFuture.supplyAsync(
            () -> serviceBStub.query(req)
        );
        CompletableFuture<Iterator<ResponseC>> futureC = CompletableFuture.supplyAsync(
            () -> serviceCStub.stream(req)
        );

        // 等待两个调用都完成
        CompletableFuture.allOf(futureB, futureC).join();
        return new CombinedResult(futureB.join(), futureC.join());
    }
}
```

**关键点**：
1. 两个 Stub 的 Channel 是独立的（不同服务），互不影响
2. BlockingStub 的调用会阻塞线程，所以用 `CompletableFuture.supplyAsync` 放到线程池
3. Server Streaming 的 BlockingStub 返回 `Iterator`，可以用 `while(hasNext())` 消费
4. 如果对性能要求更高，服务 B 可以用 `FutureStub` 获得更自然的异步 API

**注意**：不要在同一个请求线程中串行调用两个 BlockingStub，否则延迟是两个服务之和。
</details>

---

## 评分参考

| 题号 | 分值 | 核心考点 |
| --- | --- | --- |
| 1-6 | 各 5 分 | 四种模式概念、Stub 类型限制、StreamObserver、Spring 整合 |
| 7-9 | 各 6 分 | 模式名称、stream 关键字位置、GrpcChannelFactory |
| 10-12 | 各 10 分 | Stub 对比、Server Streaming 流程、Spring Boot 整合步骤 |
| 13-14 | 各 11 分 | 日志推送场景、文件上传场景 |
| 15-16 | 各 10 分 | StreamObserver 规则、并发调用设计 |

**错题知识点速查**：

| 错题 | 回到笔记复习 |
| --- | --- |
| 1, 3, 7, 8 | 第 1-5 节"四种通信模式" |
| 2, 5, 10 | 第 6 节"Stub 类型对比" |
| 4, 15 | 第 8 节"StreamObserver 回调机制" |
| 5, 9, 12 | 第 7 节"Spring Boot 整合" |
| 13 | 第 3 节"Server Streaming" |
| 14 | 第 4 节"Client Streaming" |
| 16 | 第 6-7 节综合 |

> 如果某些题目做错，回到 [gRPC 通信模式与 Spring Boot 整合](./gRPC-patterns-spring.md) 对应章节复习。
