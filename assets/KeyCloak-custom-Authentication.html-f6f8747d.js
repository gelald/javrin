import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as h,c,a as e,b as a,d as t,e as i}from"./app-85442c0b.js";const s={},d=i('<h1 id="keycloak-自定义-authenticator" tabindex="-1"><a class="header-anchor" href="#keycloak-自定义-authenticator" aria-hidden="true">#</a> Keycloak 自定义 Authenticator</h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>最近项目需要上 SSO，项目组经过技术选型后，选择了 Keycloak 作为项目的认证中心，并且使用 Keycloak 来进行自定义用户校验</p><h2 id="概念简介" tabindex="-1"><a class="header-anchor" href="#概念简介" aria-hidden="true">#</a> 概念简介</h2><h3 id="keycloak-简单介绍" tabindex="-1"><a class="header-anchor" href="#keycloak-简单介绍" aria-hidden="true">#</a> Keycloak 简单介绍</h3><p>Keycloak 是一款能应用于单点登录和应用的访问管理等方面的认证产品，由 Red Hat 进行开发维护。Keycloak 有以下特色功能：</p><ul><li>Single Signed On：单点登录</li><li>Social Login：支持常见的(国外)社交网络账号登陆，如 Google、GitHub、Facebook 等</li><li>User Federation：可以理解为自定义用户存储，Keycloak 默认会把数据存储在内置的 H2 数据库中，如果使用运用在项目中，那么需要使用项目中的存储</li><li>Admin Console：管理控制台，集成了一个可视化界面，对于认证的配置可以直接在界面上进行配置，可以启用、禁用等功能，更可以进行用户管理</li></ul>',7),l={href:"https://www.keycloak.org/",target:"_blank",rel:"noopener noreferrer"},u=i('<h3 id="keycloak-和-spring-security-对比" tabindex="-1"><a class="header-anchor" href="#keycloak-和-spring-security-对比" aria-hidden="true">#</a> Keycloak 和 Spring Security 对比</h3><p>因为我在以前都是做 Spring Security 做认证、授权这一块的，包括 SSO、OAuth2.0 等，另外国内大部分都是使用 Spring Security 来实现，自然会想着拿 keycloak 和 Spring Security 做对比，他们之间主要有以下区别：</p><ul><li>用户管理：Keycloak 提供了一套用户管理控制台，提供了用户注册、权限管理等用户集中管理功能；Spring Security 不会提供用户管理界面，它只是对我们 Web 开发中重复的用户身份认证、授权工作进行了封装</li><li>生态：Keycloak 是一套独立的 IAM 解决方案，可以和任何应用整合起来使用，为许多语言提供了开发的 SDK，当然也包括 Java；Spring Security 和 Spring 生态紧密结合在一起，可以和 Spring 各种模块无缝衔接，比如 SpringMVC 等</li></ul><hr><p><strong>另外其实 Spring Security 和 Keycloak 也不是完全割裂开来的，Spring Security 可以实现与 Keycloak 集成，因为 Keycloak 是一套完整的 IAM (身份认证和访问管理) 解决方案，Spring Security 提供了一个可插拔的架构，允许开发者和各种 IAM 解决方案集成并实现 SSO 功能</strong></p><h3 id="spi-开发模式" tabindex="-1"><a class="header-anchor" href="#spi-开发模式" aria-hidden="true">#</a> SPI 开发模式</h3><h2 id="keycloak-控制台配置" tabindex="-1"><a class="header-anchor" href="#keycloak-控制台配置" aria-hidden="true">#</a> Keycloak 控制台配置</h2><h3 id="realm" tabindex="-1"><a class="header-anchor" href="#realm" aria-hidden="true">#</a> Realm</h3><h3 id="client" tabindex="-1"><a class="header-anchor" href="#client" aria-hidden="true">#</a> Client</h3><h3 id="authentication-flow" tabindex="-1"><a class="header-anchor" href="#authentication-flow" aria-hidden="true">#</a> Authentication Flow</h3><h3 id="user-federation" tabindex="-1"><a class="header-anchor" href="#user-federation" aria-hidden="true">#</a> User federation</h3><h2 id="authentication-spi" tabindex="-1"><a class="header-anchor" href="#authentication-spi" aria-hidden="true">#</a> Authentication SPI</h2><h2 id="user-storage-spi" tabindex="-1"><a class="header-anchor" href="#user-storage-spi" aria-hidden="true">#</a> User Storage SPI</h2><h3 id="mybatis-user-storage" tabindex="-1"><a class="header-anchor" href="#mybatis-user-storage" aria-hidden="true">#</a> MyBatis User Storage</h3><h2 id="token-增强" tabindex="-1"><a class="header-anchor" href="#token-增强" aria-hidden="true">#</a> Token 增强</h2><h2 id="rest-服务" tabindex="-1"><a class="header-anchor" href="#rest-服务" aria-hidden="true">#</a> Rest 服务</h2><h2 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h2>',17),k={href:"https://www.keycloak.org/",target:"_blank",rel:"noopener noreferrer"},p={href:"https://blog.csdn.net/qq_24550639/article/details/111089296",target:"_blank",rel:"noopener noreferrer"},y={href:"https://auth0.com/blog/id-token-access-token-what-is-the-difference/",target:"_blank",rel:"noopener noreferrer"},f=e("p",null,"https://blog.csdn.net/weixin_51572314/article/details/130227939",-1),_=e("p",null,"https://zhuanlan.zhihu.com/p/411062890",-1),S=e("p",null,"https://www.zhihu.com/question/419613516",-1);function g(b,x){const r=o("ExternalLinkIcon");return h(),c("div",null,[d,e("p",null,[a("还有其他相关的功能介绍就不赘述了，引自官网："),e("a",l,[a("Keycloak"),t(r)])]),u,e("p",null,[e("a",k,[a("Keycloak"),t(r)])]),e("p",null,[e("a",p,[a("OAuth 2.0 和 OpenID Connect 的基本原理和区别（干货）"),t(r)])]),e("p",null,[e("a",y,[a("ID Token and Access Token: What's the Difference?"),t(r)])]),f,_,S])}const w=n(s,[["render",g],["__file","KeyCloak-custom-Authentication.html.vue"]]);export{w as default};