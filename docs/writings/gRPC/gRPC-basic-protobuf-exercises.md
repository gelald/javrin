# gRPC 基础与 Protobuf — 练习题

> 参考: [gRPC 基础与 Protobuf](./gRPC-basic-protobuf.md)

**总分 100 分 + 附加题 20 分** | 及格线 70 分 | 优秀线 85 分

---

## 一、选择题（每题 5 分，共 30 分）

### 1. gRPC 默认使用哪种传输协议？

A. HTTP/1.1
B. HTTP/2
C. TCP 原始 socket
D. WebSocket

<details>
<summary>答案</summary>

**B. HTTP/2**

gRPC 基于 HTTP/2 构建，利用其多路复用、头部压缩和二进制分帧特性实现高性能。
</details>

---

### 2. Protobuf 编码中，字段是通过什么识别的？

A. 字段名（字符串）
B. 字段编号（整数）
C. 字段类型
D. 字段声明顺序

<details>
<summary>答案</summary>

**B. 字段编号（整数）**

Protobuf 二进制编码使用 Tag 中的 field_number 来识别字段，不传输字段名。这就是为什么字段编号一旦分配就不能修改。
</details>

---

### 3. proto3 中，字段编号 1-15 的优势是什么？

A. 支持更多数据类型
B. Tag 只占 1 字节，编码更紧凑
C. 序列化速度更快
D. 支持嵌套 message

<details>
<summary>答案</summary>

**B. Tag 只占 1 字节，编码更紧凑**

编号 1-15 与 wire_type 组合后，Tag 值不超过 127，Varint 编码只需 1 字节。编号 16+ 需要 2 字节 Tag。因此高频字段应优先使用 1-15。
</details>

---

### 4. 以下哪种操作会破坏 Protobuf 的向后兼容性？

A. 新增字段并分配新编号
B. 删除字段并用 `reserved` 保留编号
C. 修改已有字段的编号
D. 将 `int32` 改为 `int64`

<details>
<summary>答案</summary>

**C. 修改已有字段的编号**

Protobuf 二进制编码完全依赖字段编号来识别字段。修改编号后，老数据按旧编号解析会读到错误的字段，新数据按新编号写入老代码无法识别。
</details>

---

### 5. Protobuf 的 Varint 编码主要用于什么？

A. 压缩字符串
B. 用可变字节数编码整数
C. 加密传输数据
D. 编码浮点数

<details>
<summary>答案</summary>

**B. 用可变字节数编码整数**

Varint 编码的核心思想：小数字用少量字节（如 1 只需 1 字节），大数字用更多字节。每个字节的最高位(MSB)标识"是否还有后续字节"。
</details>

---

### 6. gRPC 客户端中，`ManagedChannel` 的正确使用方式是？

A. 每次调用创建新的 Channel
B. 全局创建一个 Channel 并复用
C. Channel 不需要关闭
D. Channel 只能用于一次 RPC 调用

<details>
<summary>答案</summary>

**B. 全局创建一个 Channel 并复用**

ManagedChannel 是线程安全的、重量级资源（维护 TCP 连接、HTTP/2 多路复用），应全局复用。用完后需要 `shutdown()` 关闭。每次调用都创建新 Channel 会严重浪费资源。
</details>

---

## 二、填空题（每空 3 分，共 18 分）

### 7. gRPC 的三大核心组件是 _____、_____ 和 _____。

<details>
<summary>答案</summary>

**HTTP/2**（传输协议）、**Protobuf**（序列化格式）、**IDL**（接口定义语言/.proto 文件）
</details>

---

### 8. Protobuf 编码中，每个字段的 Tag 由 _____ 和 _____ 两部分组成，计算公式为 Tag = (field_number _____ 3) | wire_type。

<details>
<summary>答案</summary>

**field_number**（字段编号）、**wire_type**（线型）、**<<**（左移）

Tag = (field_number << 3) | wire_type。通过位运算将编号和类型打包为一个整数。
</details>

---

### 9. 在 proto3 中，删除一个字段后应该使用 _____ 关键字保留其编号，以防止新字段 _____ 旧编号。

<details>
<summary>答案</summary>

**reserved**、**复用**

```protobuf
reserved 3;           // 保留编号
reserved "old_name";  // 保留字段名
```

如果不 reserved，新字段可能复用旧编号，导致老数据按新类型解析，产生严重 bug。
</details>

---

## 三、简答题（每题 10 分，共 30 分）

### 10. 请解释 gRPC 为什么比 REST + JSON 性能更好，从传输层和序列化层两个角度分析。

<details>
<summary>答案</summary>

**传输层（HTTP/2）**：
- **多路复用**：一个 TCP 连接并行处理多个请求，避免 HTTP/1.1 的队头阻塞和连接开销
- **头部压缩（HPACK）**：用索引表压缩重复的 Header，减少带宽消耗
- **二进制分帧**：二进制解析比文本解析效率更高

**序列化层（Protobuf）**：
- **字段编号替代字段名**：不传输 `"username"` 这样的字符串 key，只用 1-2 字节的编号
- **Varint 可变长编码**：小整数只占 1 字节（JSON 中 `"age": 30` 至少占 5 字节）
- **二进制格式**：无 `{}`、`""`、`:` 等分隔符，整体体积比 JSON 小 3-10 倍

**总结**：HTTP/2 解决传输效率（省连接、省带宽），Protobuf 解决编码效率（省空间、省解析）。
</details>

---

### 11. 请说明 proto3 中 `reserved` 关键字的作用和使用场景。

<details>
<summary>答案</summary>

**作用**：声明某些编号或名称"不可再用"，编译器会阻止新字段使用被保留的编号/名称。

**使用场景**：

1. **删除字段时**（最常见）：删除字段后必须 `reserved` 其编号，防止未来新字段误用旧编号
2. **预留编号**：为未来功能预留编号

```protobuf
message User {
  reserved 2, 15, 9 to 11;  // 保留编号范围
  reserved "password";       // 保留字段名

  string username = 1;
  string email = 3;
}
```

**为什么不直接删？**：如果不 reserved，新同事可能用编号 2 定义新字段，导致老数据（用编号 2 存的是已删除的旧字段）被错误解析为新字段的数据。
</details>

---

### 12. 请解释 Protobuf 的 Varint 编码原理，并以数字 150 为例说明编码过程。

<details>
<summary>答案</summary>

**原理**：
- 每个字节只用低 7 位存储数据，最高位(MSB)是"继续位"
- MSB = 1 表示后面还有字节，MSB = 0 表示这是最后一个字节
- 小端序排列（低位在前）

**150 的编码过程**：

```
150 的二进制: 10010110

拆分为 7 位一组（从低位开始）:
  低 7 位: 0010110  (22)
  高 7 位: 0000001  (1)

每组加继续位:
  第 1 字节: 1_0010110 = 10010110 = 0x96  (MSB=1, 还有后续)
  第 2 字节: 0_0000001 = 00000001 = 0x01  (MSB=0, 结束)

编码结果: 0x96 0x01 (2 字节)
```

**效果**：数字 1-127 只需 1 字节，128-16383 需 2 字节。相比 JSON 中 `30` 占 2 字节（ASCII "30"），Varint 编码的 30 只需 1 字节（0x1E）。
</details>

---

## 四、场景题（每题 11 分，共 22 分）

### 13. 你的团队正在开发一个微服务系统，服务 A 需要高频调用服务 B（每秒数千次，延迟要求 < 10ms）。请用 gRPC vs REST 的角度分析应该选哪种方案，给出理由。

<details>
<summary>答案</summary>

**推荐 gRPC**，理由：

1. **高频 + 低延迟**：Protobuf 二进制编码比 JSON 序列化/反序列化快 3-5 倍，体积小 3-10 倍
2. **HTTP/2 多路复用**：一个 TCP 连接并行处理数千请求，避免 HTTP/1.1 连接池开销
3. **强类型约束**：.proto 文件即契约，编译期发现接口不匹配问题，避免运行时类型错误
4. **代码自动生成**：前后端共享 .proto 文件，消除了手动对接接口的工作

**补充说明**：
- 如果服务 B 同时需要对前端暴露 API，可以 REST + gRPC **双协议并存**
- 内部服务间用 gRPC，对外 API 用 REST，这是业界常见的架构模式
- 面试时注意不要一棒子打死 REST，要体现"按场景选择"的工程思维
</details>

---

### 14. 项目上线后，你需要修改一个 proto 文件中的 `User` 消息。原来如下：

```protobuf
message User {
  string username = 1;
  string password = 2;
  string email = 3;
}
```

需求：删除 `password` 字段，新增 `phone` 字段，新增 `avatar_url` 字段。请写出修改后的 proto 文件，并说明需要注意什么。

<details>
<summary>答案</summary>

**修改后的 proto 文件**：

```protobuf
message User {
  string username  = 1;
  reserved 2;               // password 已删除, 保留编号 2
  reserved "password";       // 同时保留字段名
  string email     = 3;
  string phone     = 4;      // 新字段, 新编号
  string avatar_url = 5;     // 新字段, 新编号
}
```

**注意事项**：

1. **必须 `reserved 2`**：password 原来用编号 2，删除后必须保留，否则未来有人用编号 2 定义新字段，老数据中编号 2 存的是 password 的值，会被错误解析为新字段
2. **新编号不能是 2**：phone 和 avatar_url 必须用从未使用过的编号（4 和 5）
3. **不能复用已删除编号**：即使 password 删除了，编号 2 也永久属于它
4. **老数据兼容**：老数据包含编号 2 的字段，新代码会忽略它；新数据不包含编号 2，老代码也正常工作
5. **部署顺序**：推荐先部署服务端（能处理新旧两种数据），再部署客户端
</details>

---

## 五、附加题（共 20 分）

### 15. （10 分）请写出 gRPC 一次 Unary RPC 调用在 HTTP/2 层面的请求-响应流程（用 HEADERS / DATA 帧描述）。

<details>
<summary>答案</summary>

```
Client                                        Server
  |                                              |
  | --- HEADERS (END_HEADERS) -----------------> |  :method=POST
  |                                              |  :path=/package.Service/Method
  |                                              |  content-type=application/grpc+proto
  |                                              |  grpc-timeout=1S
  |                                              |
  | --- DATA (END_STREAM) ---------------------> |  <Length-Prefixed Message>
  |                                              |  (5字节header + 序列化后的Protobuf)
  |                                              |
  | <--- HEADERS (END_HEADERS) ----------------- |  :status=200
  |                                              |
  | <--- DATA ---------------------------------- |  <Length-Prefixed Message>
  |                                              |
  | <--- HEADERS (END_STREAM, END_HEADERS) ----- |  grpc-status=0 (OK)
  |                                              |
```

**关键点**：
- 请求：HEADERS 帧 + DATA 帧（END_STREAM 表示请求结束）
- 响应：HEADERS 帧 + DATA 帧 + Trailers HEADERS 帧（携带 grpc-status）
- grpc-status=0 表示成功，非 0 表示各种错误
</details>

---

### 16. （10 分）proto3 中 `int32` 和 `sint32` 有什么区别？为什么负数应该用 `sint32`？

<details>
<summary>答案</summary>

**区别**：

| 类型 | 编码方式 | 正数效率 | 负数效率 |
| --- | --- | --- | --- |
| `int32` | 标准 Varint | 高（小正数 1 字节） | 极低（负数固定 10 字节） |
| `sint32` | ZigZag + Varint | 高（小正数 2 字节） | 高（小负数 2 字节） |

**为什么负数 `int32` 效率低？**

`int32` 对负数使用**补码表示**，-1 的补码是 `0xFFFFFFFF`（10 字节 Varint），因为 int32 在编码时会被提升为 int64。

**ZigZag 编码原理**：

```
原始值      ZigZag 编码值
 0           0
-1           1
 1           2
-2           3
 2           4
...
```

公式：`(n << 1) ^ (n >> 31)`

ZigZag 将负数映射为小的正数，然后用 Varint 编码，效果是 -1 只需 1 字节而不是 10 字节。

**结论**：如果你的字段可能出现负数（如温度、坐标偏移），应该用 `sint32` / `sint64`。
</details>

---

## 评分参考

| 题号 | 分值 | 核心考点 |
| --- | --- | --- |
| 1-6 | 各 5 分 | 基础概念（协议、编码、字段编号、兼容性、Channel） |
| 7-9 | 各 6 分 | 三大组件、Tag 计算、reserved 用法 |
| 10-12 | 各 10 分 | gRPC vs REST 深度分析、reserved 场景、Varint 原理 |
| 13-14 | 各 11 分 | 技术选型实战、proto 文件修改实操 |
| 15-16 | 各 10 分 | HTTP/2 帧序列、ZigZag 编码 |

**错题知识点速查**：

| 错题 | 回到笔记复习 |
| --- | --- |
| 1, 2, 7 | 第 1 节"gRPC 是什么" |
| 3, 8 | 第 4 节"Protobuf 编码原理" |
| 4, 5, 9 | 第 5/7 节"proto3 语法 + Schema 演进" |
| 6 | 第 8 节"快速实战" |
| 10 | 第 2/3/4 节"对比 + HTTP/2 + 编码" |
| 11, 12 | 第 5/7 节"reserved + Varint" |
| 13 | 第 2 节"gRPC vs REST" |
| 14 | 第 7 节"Schema 演进" |

> 如果某些题目做错，回到 [gRPC 基础与 Protobuf](./gRPC-basic-protobuf.md) 对应章节复习。
