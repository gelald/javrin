# gRPC 基础与 Protobuf — 面试指南

> 参考: [gRPC 基础与 Protobuf](./gRPC-basic-protobuf.md)

**面试热度**：🔥🔥🔥🔥（项目用了 gRPC 就会被深问）

---

## 高频面试题 Top 10

### Q1：gRPC 是什么？你们项目为什么选择 gRPC？

> 面试频率：⭐⭐⭐⭐⭐

**标准回答**：

gRPC 是 Google 开源的高性能 RPC 框架，基于 HTTP/2 + Protobuf。

我们项目选 gRPC 的原因：
1. **服务间高频调用**：内部微服务之间调用频繁，Protobuf 二进制编码比 JSON 体积小 3-10 倍
2. **低延迟要求**：HTTP/2 多路复用避免了 HTTP/1.1 的队头阻塞
3. **强类型契约**：.proto 文件即接口契约，编译期就能发现类型不匹配问题
4. **自动代码生成**：前后端共享 proto 文件，消除了手动对接的工作量

对外 API 我们仍然用 REST，因为浏览器友好、调试方便。

---

### Q2：gRPC 和 REST 有什么区别？什么时候用 gRPC，什么时候用 REST？

> 面试频率：⭐⭐⭐⭐⭐

**核心对比**：

| 维度 | gRPC | REST |
| --- | --- | --- |
| 协议 | HTTP/2 | HTTP/1.1 |
| 序列化 | Protobuf（二进制） | JSON（文本） |
| 接口约束 | .proto 强类型 | 无强制约束 |
| 流式通信 | 四种模式原生支持 | 需要 WebSocket |
| 浏览器支持 | 需要 gRPC-Web | 原生 |

**选型原则**：
- **内部服务间通信** → gRPC（高性能、强类型、流式）
- **对外暴露 API** → REST（通用性强、浏览器友好、调试方便）
- **实时推送场景** → gRPC Server Streaming（比 WebSocket 更轻量）

---

### Q3：Protobuf 为什么比 JSON 高效？能具体说说编码原理吗？

> 面试频率：⭐⭐⭐⭐⭐

**三个关键词：字段编号、Varint、二进制 TLV**

1. **字段编号替代字段名**：JSON 传输 `"username": "Alice"`，key 占 10 字节。Protobuf 用编号 1 只占 1 字节 Tag
2. **Varint 可变长编码**：整数用可变字节数，数字 30 只需 1 字节（JSON 中 `"age":30` 至少 5 字节）
3. **二进制 TLV 结构**：无 `{}`、`""`、`,` 等文本分隔符，解析效率更高

编码结构是 **Tag-Length-Value**：
- Tag = (field_number << 3) | wire_type
- wire_type 0 = Varint（整数），2 = Length-delimited（字符串、嵌套 message）

---

### Q4：proto 文件中的字段编号为什么不能修改？

> 面试频率：⭐⭐⭐⭐⭐

因为 Protobuf 的二进制编码**完全依赖字段编号来识别字段**，不传输字段名。

修改编号后：
- 老客户端用旧编号写入的数据，新服务端用新编号读取 → 读到错误字段
- 新客户端用新编号写入的数据，老服务端用旧编号读取 → 字段丢失或错位

这就是为什么删除字段时必须 `reserved` 保留编号，而不是让编号空闲出来复用。

---

### Q5：Protobuf 的 Varint 编码是怎么回事？

> 面试频率：⭐⭐⭐⭐

Varint 用可变长度编码整数，核心规则：
- 每个字节只用低 7 位存数据
- 最高位(MSB) = 1 表示后面还有字节，0 表示最后一个字节
- 小端序排列

效果：
- 0-127 → 1 字节
- 128-16383 → 2 字节
- 负数（`int32`）→ 固定 10 字节（补码提升为 int64）

**进阶**：如果字段可能出现负数，用 `sint32`/`sint64` + ZigZag 编码，-1 只需 1 字节。

---

### Q6：proto3 的 reserved 关键字有什么用？

> 面试频率：⭐⭐⭐⭐

`reserved` 用于**保留字段编号或字段名**，防止未来误用。

```protobuf
message User {
  reserved 2, 9 to 11;    // 保留编号
  reserved "password";     // 保留名称

  string username = 1;
  string email = 3;
}
```

**典型场景**：删除字段时必须 `reserved`。如果不保留，新同事可能用编号 2 定义新字段，导致老数据（编号 2 存的是旧字段值）被错误解析。

---

### Q7：你们项目中是怎么做 Protobuf Schema 演进的？有哪些注意事项？

> 面试频率：⭐⭐⭐⭐

**安全操作**：
- 新增字段（新编号）→ 老代码忽略新字段
- 删除字段（reserved 保留编号）→ 新代码忽略旧字段
- `int32` ↔ `int64` → 兼容

**危险操作**：
- 修改字段编号 → 二进制编码混乱
- 复用已删除的编号 → 老数据解析错误
- 不兼容的类型变更（如 `int32` → `string`）

**实践经验**：部署时先上线服务端（兼容新旧数据），再上线客户端。

---

### Q8：gRPC 的代码生成是怎么工作的？生成了哪些类？

> 面试频率：⭐⭐⭐⭐

通过 Maven 的 `protobuf-maven-plugin` 配置，在编译期调用 `protoc` 编译器：

1. **protoc** 编译器 → 生成消息类（`HelloRequest.java`、`HelloReply.java`）
2. **protoc-gen-grpc-java** 插件 → 生成服务基类（`GreeterGrpc.java`）

`GreeterGrpc.java` 中包含：
- `GreeterImplBase`：服务端继承的抽象类
- `newBlockingStub()`：同步阻塞客户端
- `newFutureStub()`：Future 异步客户端
- `newStub()`：完全异步客户端（StreamObserver 回调）

---

### Q9：HTTP/2 对 gRPC 的性能提升体现在哪些方面？

> 面试频率：⭐⭐⭐⭐

三个核心特性：

1. **多路复用**：一个 TCP 连接上通过 Stream ID 并行传输多个请求/响应，消除 HTTP/1.1 的队头阻塞
2. **头部压缩（HPACK）**：用静态表 + 动态表索引重复 Header，减少带宽
3. **二进制分帧**：数据拆分为二进制 Frame，解析效率比文本协议高

**面试速记**：多路复用省连接，头部压缩省带宽，二进制分帧省解析。

---

### Q10：ManagedChannel 怎么管理？为什么不能每次调用都新建？

> 面试频率：⭐⭐⭐

`ManagedChannel` 是**线程安全的重量级资源**，内部维护 TCP 连接和 HTTP/2 多路复用。

正确做法：
- **全局创建一个 Channel 并复用**（类似数据库连接池的概念）
- 使用完毕后调用 `channel.shutdown()` 优雅关闭

错误做法：
- 每次 RPC 调用创建新 Channel → 大量 TCP 握手开销，完全浪费 HTTP/2 多路复用的优势

```java
// 正确: 全局复用
ManagedChannel channel = Grpc.newChannelBuilder(target, credentials).build();
GreeterGrpc.GreeterBlockingStub stub = GreeterGrpc.newBlockingStub(channel);
```

---

## 易错点总结

### 易错点 1：混淆"字段编号"和"字段顺序"

| 概念 | 说明 |
| --- | --- |
| 字段编号 | proto 中的 `= 1`、`= 2`，二进制编码用的标识 |
| 字段声明顺序 | proto 文件中的书写顺序，**不影响编码** |

字段编号可以不连续、不按顺序声明，编码只看编号。

### 易错点 2：proto3 所有字段都有默认值

proto3 中字段没有 `required`，所有字段都是 optional：
- `int32` 默认 0
- `string` 默认 ""
- `bool` 默认 false
- `repeated` 默认空列表

**无法区分"未设置"和"值为默认值"**。如果需要区分，用 `optional` 关键字（proto3.12+）。

### 易错点 3：负数的 int32 编码效率极低

`int32` 类型的负数会被提升为 `int64`，Varint 编码固定占 **10 字节**。如果字段可能为负数（如温度、偏移量），必须用 `sint32` / `sint64`（ZigZag 编码，-1 只需 1 字节）。

### 易错点 4：删除字段 ≠ 删除编号

删除字段时，编号必须永久保留（`reserved`）。编号是二进制协议的一部分，不是"占位符"。

---

## 面试话术模板

**场景：面试官问"介绍一下你们项目中 gRPC 的使用"**

> 我们项目是微服务架构，服务间通信选择了 gRPC。选型理由是服务间调用频繁、对延迟敏感，gRPC 的 Protobuf 编码比 JSON 体积小 3-10 倍，HTTP/2 多路复用避免了连接开销。
>
> 我们用 proto3 定义接口契约，Maven 的 protobuf-maven-plugin 自动生成代码。服务端继承 ImplBase 实现业务逻辑，客户端用 BlockingStub 同步调用。
>
> Schema 演进方面，我们严格遵守字段编号不可变更的原则，删除字段时用 reserved 保留编号。部署时先上线服务端再上线客户端，确保新老版本兼容。
>
> 对外 API 我们仍然用 REST，保证浏览器兼容性和调试便利性。

---

**下一步**：完成练习题（目标 85 分+）。如果某些知识不太清楚，回到 [gRPC 基础与 Protobuf](./gRPC-basic-protobuf.md) 对应章节复习。
