# JWT

随着移动互联网的兴起，传统基于`Session+Cookie`的Web网站认证方式转变成了基于`OAuth2`等开放授权协议的单点登录模式（SSO，Single Sign On），相应的基于服务器`Session+Cookie`的Auth手段也转变成JWT(Json Web Token)为代表的Token Auth机制。

JWT是一个非常轻巧的规范，这个规范允许我们使用JWT在两个组织之间传递安全可靠的信息。`Session+Cookie`的方式把认证信息放在了服务端，JWT把认证信息放在了客户端，减轻了服务端的内存压力

## 特点

- JWT是无状态的
- JWT 不仅可以用于认证，也可以用于交换信息，因为payload部分可以自定义内容
- JWT可以防止篡改，因为JWT包含了签名
- JWT不能存放敏感数据，因为payload部分只进行了base64编码
- JWT是一次性的，如果想修改内容，必须重新颁发一个

JWT(Json Web Token)有两种实现方式：JWS(Json Web Signature)与JWE(Json Web Encryption)

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210227182347.png)

## JWS

JSON Web Signature是一个**统一表达形式的字符串**

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210227182556.png)

### Header 头部

头部用于描述关于该JWT的最基本的信息，例如其类型以及签名所用的算法等。

- alg：签名所用的算法
- typ：类型

JSON内容要经Base64编码生成字符串成为Header。

### Payload 负载

负载中有**5个内容**是由**JWT的标准来定义**的

- iss(issuer)：签发者
- sub(subject)：主题
- aud(audience)：接收者
- exp(expires)：过期时间，时间戳
- iat(issued at)：签发时间，时间戳
- jti(jwt id)：编号

负载的内容还可以**自定义追加**

JSON内容要经Base64编码生成字符串成为Payload。

### Signature 签名

 这个部分header与payload先进行base64编码再通过header中声明的加密方式，使用密钥secret进行加密，生成签名。

 JWS的主要目的是**保证了数据**在传输过程中**不被修改**，验证数据的完整性。但由于仅采用Base64对消息内容编码(header与payload)，因此**不保证数据的不可泄露性，所以不适合用于传输敏感数据**。

## JWE

相对于JWS，**JWE则同时保证了安全性与数据完整性。**

JWE由五部分组成

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210228102124.png)

### 生成步骤

1. **JOSE Header**与JWS的Header含义相同
2. 生成一个随机的Content Encryption Key （CEK）
3. 使用RSAES-OAEP 加密算法，用公钥加密CEK，生成**JWE Encrypted Key**
4. 生成JWE初始化向量**Initialization Vector**
5. 使用AES-GCM加密算法对明文部分进行加密生成密文**Ciphertext**
6. 算法会随之生成一个128位的认证标记**Authentication Tag**
7. 对5个部分分别进行Base64编码

JWE的计算过程相对繁琐，不够轻量级，因此**适合与数据传输而非Token认证**，但该协议也足够安全可靠，用简短字符串描述了传输内容，**兼顾数据的安全性与完整性**。

## JWT流程

Client：客户端

Auth Server：认证服务器

Resource Server：资源服务器

JWT签名算法一般会有两个选择：HS256（HMACSHA256、对称算法）和RS256（RSASHA256、非对称算法）

### HMAC流程

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210801193743.png)

Auth Server需要与Resource Server提前商定好用于签名、校验的密钥secret，并且**必须保证secret不能泄漏**，否则不安全，攻击者可以利用这个secret来伪造令牌

### RSA流程

![](https://gitee.com/ngwingbun/picgo-image/raw/master/images/20210801193801.png)

Auth Server在生成JWT的时候使用私钥进行加密，Resource Server在校验JWT的时候使用公钥进行解密。**RSA方式更加安全**，secret需要Auth Server和Resource Server双方都保密，私钥只存在于Auth Server，只需保证私钥不被泄漏即可