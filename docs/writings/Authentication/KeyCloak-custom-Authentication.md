# Keycloak 自定义 Authenticator



## 前言

最近项目需要上 SSO，项目组经过技术选型后，选择了 Keycloak 作为项目的认证中心，并且使用 Keycloak 来进行自定义用户校验



## 概念简介

### Keycloak 简单介绍

Keycloak 是一款能应用于单点登录和应用的访问管理等方面的认证产品，由 Red Hat 进行开发维护。Keycloak 有以下特色功能：

- Single Signed On：单点登录
- Social Login：支持常见的(国外)社交网络账号登陆，如 Google、GitHub、Facebook 等
- User Federation：可以理解为自定义用户存储，Keycloak 默认会把数据存储在内置的 H2 数据库中，如果使用运用在项目中，那么需要使用项目中的存储
- Admin Console：管理控制台，集成了一个可视化界面，对于认证的配置可以直接在界面上进行配置，可以启用、禁用等功能，更可以进行用户管理

还有其他相关的功能介绍就不赘述了，引自官网：[Keycloak](https://www.keycloak.org/)



### Keycloak 和 Spring Security 对比

因为我在以前都是做 Spring Security 做认证、授权这一块的，包括 SSO、OAuth2.0 等，另外国内大部分都是使用 Spring Security 来实现，自然会想着拿 keycloak 和 Spring Security 做对比，他们之间主要有以下区别：

- 用户管理：Keycloak 提供了一套用户管理控制台，提供了用户注册、权限管理等用户集中管理功能；Spring Security 不会提供用户管理界面，它只是对我们 Web 开发中重复的用户身份认证、授权工作进行了封装
- 生态：Keycloak 是一套独立的 IAM 解决方案，可以和任何应用整合起来使用，为许多语言提供了开发的 SDK，当然也包括 Java；Spring Security 和 Spring 生态紧密结合在一起，可以和 Spring 各种模块无缝衔接，比如 SpringMVC 等

---

**另外其实 Spring Security 和 Keycloak 也不是完全割裂开来的，Spring Security 可以实现与 Keycloak 集成，因为 Keycloak 是一套完整的 IAM (身份认证和访问管理) 解决方案，Spring Security 提供了一个可插拔的架构，允许开发者和各种 IAM 解决方案集成并实现 SSO 功能**



### SPI 开发模式



## Keycloak 控制台配置

### Realm

### Client

### Authentication Flow

### User federation



## Authentication SPI



## User Storage SPI

### MyBatis User Storage



## Token 增强



## Rest 服务



## 参考链接

[Keycloak](https://www.keycloak.org/)

[OAuth 2.0 和 OpenID Connect 的基本原理和区别（干货）](https://blog.csdn.net/qq_24550639/article/details/111089296)

[ID Token and Access Token: What's the Difference?](https://auth0.com/blog/id-token-access-token-what-is-the-difference/)



https://blog.csdn.net/weixin_51572314/article/details/130227939

https://zhuanlan.zhihu.com/p/411062890

https://www.zhihu.com/question/419613516

