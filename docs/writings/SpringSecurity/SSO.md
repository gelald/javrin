# SSO

## 概念

SSO 是 Single Sign On 的缩写，意为单点登录，是一种思想、规范，单点登录的意思就是在一个多应用的系统中，用户只需要登陆一次就可以访问他权限范围内的应用，注销也同样只需要注销一次，比如淘宝、天猫等。

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20221106162900.png)





## 实现方式

既然 SSO 是一种抽象的思想，我们就需要按照它的思想来实现它，在 Java 中可以理解成是一个接口，那么 SSO 常见的解决方案有 OAuth2、CAS：

- CAS：CAS 是 Central Authentication Service 的缩写（中央式认证服务），该服务是**为应用提供可信身份认证的单点登录系统**。CAS 包含两个部分： CAS Server 和 CAS Client。CAS Server 需要独立部署，主要负责对用户的认证工作；CAS Client 负责处理对客户端受保护资源的访问请求，需要登录时，重定向到 CAS Server。
- OAuth2：OAuth2 是 Open Authority 的缩写，是一种授权机制。数据的所有者告诉系统，同意授权第三方应用进入系统，获取这些数据。系统从而产生一个短期的进入令牌（一般会使用 JWT 的方式来承载用户的 Access_Token），用来代替密码，供第三方应用使用。具体例子是：可以使用微信账号来登陆京东应用。





## CAS 认证流程

以下是 CAS 官网的流程图

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20221107145356.png)



### 名词解释

- TGT：全名是 Ticket Granted Ticket，意为票根，当用户登录成功 CAS Server 创建，可以可以签发 ST
- TGC：全名是 Ticket Granted Cookie，浏览器 cookie 中 CASTGC的值，CAS Server 创建 TGT 后，会在cookie中放入 TGC，可以通过 TGC 来找到 TGT
- ST：全名是 Service Ticket，意为票据，由 TGT 生成，是具体业务服务的票据



### 单点登录的核心流程

1. 用户第一次访问业务系统，业务系统发现本次请求的 cookie 中没有 sessionid，也没有 ST，重定向到 CAS 认证中心
2. CAS 认证中心发现本次请求的 cookie 中没有 TGC，于是展示登录页面
3. 用户在浏览器完成登录操作，提交给 CAS Server 完成密码校验工作
4. CAS Server 验证用户信息后，创建 TGT，并将 TGT 的 id 写入到 cookie 中的 CASTGC 属性中，同时生成一个 ST 让用户重定向到业务系统
5. 业务系统收到请求后，发现本次请求的 cookid 没有 sessionid，但是有 ST，去 CAS 认证中心验证 ST 的有效性，如果有效就创建 session，并把 sessionid 放到cookie 中
6. 此后浏览器每一个请求都会带上这个 cookie 来请求，业务服务会根据 cookie 中的 sessionid 来获取对应的 session，判定用户已登录，就把资源返回给浏览器



### 访问另一个系统流程

1. 业务系统B发现本次请求中的 cookie 里的 sessionid 找不到 session，但是看到 cookie 中有 TGC，那么会去 CAS 认证中心验证 TGC 的有效性
2. CAS 认证中心发现本次请求中的 cookie 里有CASTGC，其中记录了 TGT 的 id，所以会生成一个 ST 让用户重定向到业务系统B
3. 业务系统B收到请求后，发现有 ST，去 CAS 认证中心验证 ST 的有效性，发现有效，创建 session，并把 sessionid 放到 cookie 中
4. 此后用户就用这个 sessionid 和业务系统B进行通信



### 单点登出核心流程

1. 用户在业务系统A中退出登录，业务系统A删除 session，并把 cookie 中的 sessionid 删掉
2. 业务系统A通知 CAS 认证中心用户退出登录了
3. CAS 认证中心删除 TGT，并把 cookie 中的 CASTGC 删掉
4. CAS 认证中心通知其他这个用户访问过的应用
5. 其他应用删除 session，并清除用户 cookie 中的 sessionid



## OAuth2 认证流程

以下是 OAuth2 的流程图

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20221108130302.png)



### 角色解释

- Client：调用资源服务器API的客户端
- User：资源拥有者，也就是用户
- Authorization Server：认证服务器，进行认证和授权
- Resource Server：资源服务器，保护受保护的资源

举例阐述这个几个角色，比如现在京东可以使用微信进行登录（京东可以使用微信提供的一个微信用户唯一标识符openId作为自己用户的其中一个标识），京东要获取这个标识符，需要微信同意，微信同意的前提是获得用户的授权，用户授权后，京东就能完成通过微信登录了。如果此时京东还需要获取微信好友关系等信息，需要拿着登录后微信授予的令牌去请求，否则无法通过微信的权限校验。

这其中 Client 是京东App，User 是使用微信登录京东的用户，Authorization Server 是微信的认证服务器，Resource Server 是微信的资源服务器。



### 单点登录的核心流程

1. 用户打开京东客户端后，客户端向用户申请授权
2. 用户在微信端同意给予京东客户端授权
3. 京东客户端拿着用户给予的授权向微信认证服务器进行认证
4. 认证服务器完成认证，给予京东客户端令牌（Access Token）
5. 此后京东需要再向微信端获取其他信息就需要使用这个令牌
6. 微信资源服务器校验令牌合法性，如果合法则放行



## 总结

在以前，我经常会把 SSO 和 OAuth2 混为一谈，在了解过后才发现 SSO 其实是一种认证思想，而 OAuth2 是其一种常见的解决方案，而Spring Security OAuth2 是 Spring Security 和 OAuth2 整合起来的落地产品；另外还有 CAS 这种实现方式，了解过 CAS 框架觉得服务部署和配置更加复杂，不太易于上手，当然目前也有很多的系统在使用CAS，在选择的时候开发者根据这些区别和复杂程度去决策。我个人偏向于使用 OAuth2，因为他还可以授权一个第三方应用访问一些受保护的资源，授权方式更多样，能满足更多的应用场景。



参考资源：

[SSO单点登录和OAuth2.0的区别和理解](https://ximeneschen.blog.csdn.net/article/details/115182080)

[CAS实现SSO全流程教程--基本原理和服务端配置（CAS集成JDBC,LDAP）](https://blog.csdn.net/qq_32650789/article/details/124879861)

