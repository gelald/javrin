# JWT

随着移动互联网的兴起，传统基于 `Session+Cookie` 的Web网站认证方式转变成了基于 `OAuth2` 等开放授权协议的单点登录模式（SSO，Single Sign On），相应的基于服务器 `Session+Cookie` 的 `Auth` 手段也转变成 `JWT(Json Web Token)` 为代表`Token Auth`机制。

`JWT`是一个非常轻巧的规范，这个规范允许我们使用 `JWT` 在两个组织之间传递安全可靠的信息。`Session+Cookie`的方式把认证信息放在了服务端，`JWT`把认证信息放在了客户端，减轻了服务端的内存压力

- `JWS`：签名过的 `JWT`
- `JWE`：部分 Payload 经过加密的 `JWT`
- `JWA`： `JWT` 用到的密码学算法
- `JWK`：`JWT` 的密钥

## 特点

- `JWT` 是无状态的
- `JWT`  不仅可以用于认证，也可以用于交换信息，因为 Payload 部分可以自定义内容
- `JWT` 可以防止篡改，因为 `JWT` 包含了签名
- `JWT` 不能存放敏感数据，因为 Payload 部分只进行了base64编码
- `JWT` 是一次性的，如果想修改内容，必须重新颁发一个

`JWT(Json Web Token)` 有两种实现方式：`JWS(Json Web Signature)` 与 `JWE(Json Web Encryption)`

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210227182347.png)

## JWS

`JWS(JSON Web Signature)`：`Signed JWT`**签名过的`JWT`**，是一个**统一表达形式的字符串**

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210227182556.png)

### Header 头部

头部用于描述关于该 `JWT` 的最基本的信息，例如其类型以及签名所用的算法等

- alg：签名所用的算法，如 HMAC 或 RSA 等
- typ：令牌的类型
- jti(可选)：【`JWT` ID】代表正在使用 `JWT` 的编号，这个编号对应服务端应当唯一，也可以放在 Payload 中
- cty(可选)：【Content Type】这个比较少见。当 Payload 中为任意数据时，这个值无需设置；但是当 Payload 中也有 `JWT` 的时候，也就是**嵌套** `JWT` 时，这个值必须设定为 `JWT`

JSON 内容要经 Base64 编码生成字符串成为 Header 

### Payload 负载

- iss：【issuer】发布者的 url
- sub：【subject】该 `JWT` 面向的用户
- aud：【audience】接收者的 url
- exp：【expiration】过期时间，unix时间戳
- nbf：【not before】使用时间不能早于这个时间，unix时间戳
- iat：【issued at】签发时间，时间戳
- jti：【`JWT` ID】该 `JWT` 的唯一编号

负载的内容还可以**自定义追加**

JSON 内容要经 Base64 编码生成字符串成为 Payload 

### Signature 签名

拥有该部分的 `JWT` 被称为 `JWS` ；没有则称为 `nonsecure JWT` 也就是不安全的 `JWT` ，此时 Header 中声明的签名算法为 None

 这个部分 Header 与 Payload 先进行 Base64 编码再通过 Header 中声明的加密方式，使用密钥 secret 进行加密，生成签名

 `JWS` 的主要目的是**保证了数据**在传输过程中**不被修改**，验证数据的完整性。但由于仅采用 Base64 对消息内容编码(Header与Payload)，因此**不保证数据的不可泄露性，所以不适合用于传输敏感数据**



## JWE

`JWE(JSON Web Encrypted)`：`Encrypted JWT`部分Payload**经过加密的`JWT`**，相对于 `JWS`，`JWE` 则**同时保证了安全性与数据完整性**

`JWE`由五部分组成

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210228102124.png)

### 生成步骤

1. `JOSE Header` 与 `JWS` 的 Header 含义相同
2. 生成一个随机的 `Content Encryption Key （CEK）`
3. 使用 RSAES-OAEP 加密算法，用公钥加密CEK，生成`JWE Encrypted Key`
4. 生成`JWE`初始化向量 `Initialization Vector`
5. 使用 AES-GCM 加密算法对明文部分进行加密生成密文 `Ciphertext`
6. 算法会随之生成一个128位的认证标记 `Authentication Tag`
7. 对5个部分分别进行 Base64 编码

JWE的计算过程相对繁琐，不够轻量级，因此**适合与数据传输而非Token认证**，但该协议也足够安全可靠，用简短字符串描述了传输内容，**兼顾数据的安全性与完整性**



## JWT流程

Client：客户端

Auth Server：认证服务器

Resource Server：资源服务器

JWT签名算法一般会有两个选择：HS256（HMACSHA256、对称算法）和RS256（RSASHA256、非对称算法）

### HMAC流程

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210801193743.png)

Auth Server需要与Resource Server提前商定好用于签名、校验的密钥secret，并且**必须保证secret不能泄漏**，否则不安全，攻击者可以利用这个secret来伪造令牌

### RSA流程

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210801193801.png)

Auth Server在生成JWT的时候使用私钥进行加密，Resource Server在校验JWT的时候使用公钥进行解密。**RSA方式更加安全**，secret需要Auth Server和Resource Server双方都保密，私钥只存在于Auth Server，只需保证私钥不被泄漏即可