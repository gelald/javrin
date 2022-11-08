---
title: OAuth2 学习
icon: article
order: 3
category:

- 干货
- SpringSecurity

tag:

- OAuth2

---

# OAuth2

**OAuth 是一种授权机制。数据的所有者告诉系统，同意授权第三方应用进入系统，获取这些数据。系统从而产生一个短期的进入令牌（token），用来代替密码，供第三方应用使用。**

## 授权方式

### 授权码

**授权码方式（authorization code），指的是第三方应用先申请一个授权码，然后再用该码获取令牌。**

这种方式是最常用的流程，**安全性也最高**，它**适用于那些有后端的 Web 应用**。授权码通过前端传送，令牌则是储存在后端，而且所有与资源服务器的通信都在后端完成。这样的前后端分离，可以避免令牌泄漏。

1. A 网站提供一个链接，用户点击后就会跳转到 B 网站，授权用户数据给 A网站使用

   示例链接：

   ```
   https://b.com/oauth/authorize?
     response_type=code&
     client_id=CLIENT_ID&
     redirect_uri=CALLBACK_URL&
     scope=read
   ```

   `response_type=code` 表示要求返回授权码

   `client_id` 让B网站知道是哪一个应用在请求

   `scope=read` 表示授权的范围是只读

   `redirect_uri` 表示B网站接受或拒绝请求后跳转的网站

   ---

2. 用户跳转后，B 网站会要求用户登录，然后询问是否同意给予 A 网站授权。用户表示同意，这时 B 网站就会跳回`redirect_uri`参数指定的网址，并且把授权码作为URL参数

   示例链接

   ```
   https://a.com/callback?code=AUTHORIZATION_CODE
   ```

   其中授权码作为query parameter拼接在上一步填写的回调地址后面

   ---

3. A 网站拿到授权码以后，就可以在后端，向 B 网站请求令牌

   示例链接

   ```
   https://b.com/oauth/token?
    client_id=CLIENT_ID&
    client_secret=CLIENT_SECRET&
    grant_type=authorization_code&
    code=AUTHORIZATION_CODE&
    redirect_uri=CALLBACK_URL
   ```

   `client_id`、`client_secret` 是让B网站确认A网站的身份

   `grant_type=authorization_code` 表示采用授权码这种授权方式

   `code` 是上一步拿到的授权码

   `redirect_uri` 需要和上一步的回调地址一致，用于校验

   ---

4. A网站收到请求以后，就会颁发令牌

   示例

   ```json
   {    
     "access_token":"ACCESS_TOKEN",
     "token_type":"bearer",
     "expires_in":2592000,
     "refresh_token":"REFRESH_TOKEN",
     "scope":"read",
     "uid":100101,
     "info":{...}
   }
   ```

   `access_token` 访问资源的令牌

   `refresh_token` 用于刷新令牌的刷新令牌

### 隐藏式

**隐藏式方式（implicit）适用于那些纯前端的Web应用，直接向前端颁发令牌。这种方式没有授权码这个中间步骤**

这种方式把令牌直接传给前端，是很不安全的。因此，只能用于一些安全要求不高的场景，并且令牌的有效期必须非常短，通常就是会话期间（session）有效，浏览器关掉，令牌就失效了。

1. A 网站提供一个链接，用户点击后跳转到 B 网站，授权用户数据给 A 网站使用

   示例链接

   ```
   https://b.com/oauth/authorize?
     response_type=token&
     client_id=CLIENT_ID&
     redirect_uri=CALLBACK_URL&
     scope=read
   ```

   `response_type=code` 表示要求直接返回令牌

   `client_id` 让B网站知道是哪一个应用在请求

   `scope=read` 表示授权的范围是只读

   `redirect_uri` 表示B网站接受或拒绝请求后跳转的网站

   ---

2. 用户跳转到 B 网站，登录后同意给予 A 网站授权。这时，B 网站就会跳回`redirect_uri`参数指定的跳转网址，并且把令牌作为URL锚点跳转

   示例链接

   ```
   https://a.com/callback#token=ACCESS_TOKEN
   ```

   其中令牌作为fragment拼接在上一步填写的回调地址后面

   这是因为 OAuth 2.0 允许跳转网址是 HTTP 协议，因此存在"中间人攻击"的风险，而浏览器跳转时，**路径参数会发到服务器，而锚点不会发到服务器，就减少了泄漏令牌的风险**

3. A 网站通过URL拿到令牌

### 密码式

**密码式（password）允许用户把用户名和密码直接告诉某个应用，该应用就使用用户的用户名密码去申请令牌**

1. A 网站要求用户提供 B 网站的用户名和密码。拿到以后，A 就直接向 B 请求令牌

   示例链接

   ```
   https://oauth.b.com/token?
     grant_type=password&
     username=USERNAME&
     password=PASSWORD&
     client_id=CLIENT_ID
   ```

   `grant_type=password` 表示采用密码式的授权方式

   `username` 用户的用户名

   `password` 用户的密码

   `client_id` 让B网站知道是哪一个应用在请求

   ---

2. B 网站验证身份通过后，给出令牌作为上面请求的响应，A 网站拿到令牌

### 凭证式

**凭证式（client credentials），适用于没有前端的命令行应用，即在命令行下请求令牌。**

这种方式给出的令牌，是针对第三方应用的，而不是针对用户的，即有可能多个用户共享同一个令牌。

1. A 应用在命令行向 B 发出请求

   示例链接

   ```
   https://oauth.b.com/token?
     grant_type=client_credentials&
     client_id=CLIENT_ID&
     client_secret=CLIENT_SECRET
   ```

   `grant_type=client_credentials` 表示采用凭证式的授权方式

   `client_id`、`client_secret` 让B网站知道是哪一个应用在请求

2. B 网站验证通过以后，直接返回令牌

## 使用令牌

在请求头中加入`Authorization=Bearer access_token`

## 更新令牌

认证服务器颁发令牌时，一次性会颁发两个令牌，一个是`access_token`用于获取资源，另一个是`refresh_token`用于更新令牌、续期

更新令牌示例：

```
https://b.com/oauth/token?
  grant_type=refresh_token&
  client_id=CLIENT_ID&
  client_secret=CLIENT_SECRET&
  refresh_token=REFRESH_TOKEN
```

`grant_type=refresh_token` 表示要求更新令牌

`client_id`、`client_secret` 让认证服务器知道是哪一个应用在请求

`refresh_token` 填用于更新令牌的令牌

认证服务器校验通过后，就会颁发新的令牌

## 密码与令牌

密码（password）与令牌（token）的作用是一样的，都可以进入系统，但是有三点差异

1. 令牌是短期的，到期会自动失效，用户自己无法修改。密码一般长期有效，用户不修改，就不会发生变化
2. 令牌可以被数据所有者撤销，会立即失效。举例，屋主可以随时取消快递员的令牌。密码一般不允许被他人撤销
3. 令牌有权限范围（scope），比如只能进小区的二号门。对于网络服务来说，只读令牌就比读写令牌更安全。密码一般是完整权限

上面这些设计，保证了令牌既可以让第三方应用获得权限，同时又随时可控，不会危及系统安全

## 从client_credentials模式看token生成

虽然凭证式(cliennt_credentials)和其他模式有所不同，但是**总体上的抽象是固定的**，只是具体的实现类会被相应地替换。我们从**最简单**的凭证式去看spring security oauth2内部的运作流程，**方便理解**

**首先开启Debug信息**

```yml
logging:
  level:
    org.springframework: DEBUG
```

**关键类**

```
ClientCredentialsTokenEndpointFilter
DaoAuthenticationProvider
TokenEndpoint
TokenGranter
```

### ClientCredentialsTokenEndpointFilter

关键代码

```java
public ClientCredentialsTokenEndpointFilter() {
  	this("/oauth/token");
}

public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
        throws AuthenticationException, IOException, ServletException {
    ...
    String clientId = request.getParameter("client_id");
    String clientSecret = request.getParameter("client_secret");

    ...
    clientId = clientId.trim();
    UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(clientId,
            clientSecret);

    return this.getAuthenticationManager().authenticate(authRequest);

}
```

在请求到达`/oauth/token`之前经过了`ClientCredentialsTokenEndpointFilter`这个过滤器(构造方法中是拦截的路径)

父类`AbstractAuthenticationProcessingFilter`的`doFilter`方法中执行了`attemptAuthentication`方法，这个方法主要做了这些工作：

1. 从请求中获取`client_id`,`client_secret`，组装成一个`UsernamePasswordAuthenticationToken`**作为身份标识**

2. 使用顶层身份管理器`AuthenticationManager`去**进行身份认证**

   > 1. `AuthenticationManager`的实现类一般是`ProviderManager`
   >2. `ProviderManager`内部维护了一个`List`，真正的身份认证是由一系列`AuthenticationProvider`去完成
   > 3. `AuthenticationProvider`的常用实现类则是`DaoAuthenticationProvider` 
   >4. `DaoAuthenticationProvider`内部又聚合了一个`UserDetailsService`接口
   > 5. `UserDetailsService`才是获取用户详细信息的最终接口

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/spring-security-oauth2-xjf-2-1.png)

> 虽然说client模式是不存在“用户”的概念的，但是这里的身份认证`UserDetailsService`的实现被适配成了`ClientDetailsUserDetailsService`
>
> 这个设计是将client客户端的信息（`client_id`,`client_secret`）适配成用户的信息(`username`,`password`)，这样认证流程就不需要修改
>
> 经过`ClientCredentialsTokenEndpointFilter`之后，身份信息已经得到了`AuthenticationManager`的验证。接着便到达了`TokenEndpoint`



### TokenEndpoint

刚刚前面一系列的`ClientCredentialsTokenEndpointFilter`、`ProviderManager`、`DaoAuthenticationProvider`可以理解为一些**前置校验**、**身份封装**等操作

关键代码

```java
@FrameworkEndpoint
public class TokenEndpoint extends AbstractEndpoint {

    @RequestMapping(value = "/oauth/token", method=RequestMethod.POST)
    public ResponseEntity<OAuth2AccessToken> postAccessToken(Principal principal, @RequestParam
    Map<String, String> parameters) throws HttpRequestMethodNotSupportedException {
         ...
        String clientId = getClientId(principal);
        ClientDetails authenticatedClient = getClientDetailsService().loadClientByClientId(clientId);
        ...
        TokenRequest tokenRequest = getOAuth2RequestFactory().createTokenRequest(parameters, authenticatedClient);
        ...
        OAuth2AccessToken token = getTokenGranter().grant(tokenRequest.getGrantType(), tokenRequest);
        ...
        return getResponse(token);

    }

    private TokenGranter tokenGranter;

 }
```

经过一系列的前置操作，方法参数中的`principal`已经填充了相关信息

方法内部依赖了一个`TokenGranter`来颁发token

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/spring-security-oauth2-xjf-2-2.png)

#### CompositeTokenGranter

TokenGranter的设计思路是：**使用CompositeTokenGranter管理一个List列表**，每一种grantType对应一个具体的真正授权者，在debug过程中可以发现CompositeTokenGranter **内部就是在循环调用**所有的TokenGranter(包含5种默认的TokenGranter和自定义的TokenGranter)实现类的grant方法，而granter内部则是**通过grantType来区分是否是各自的授权类型**

```java
public class CompositeTokenGranter implements TokenGranter {

    private final List<TokenGranter> tokenGranters;

    public CompositeTokenGranter(List<TokenGranter> tokenGranters) {
        this.tokenGranters = new ArrayList<TokenGranter>(tokenGranters);
    }

    public OAuth2AccessToken grant(String grantType, TokenRequest tokenRequest) {
        for (TokenGranter granter : tokenGranters) {
            OAuth2AccessToken grant = granter.grant(grantType, tokenRequest);
            if (grant!=null) {
                return grant;
            }
        }
        return null;
    }
}
```



#### AbstractTokenGranter

以客户端模式为例，思考如何产生token的，则需要继续研究5种授权者的抽象类：`AbstractTokenGranter`

```java
public abstract class AbstractTokenGranter implements TokenGranter {

    protected final Log logger = LogFactory.getLog(getClass());

    //与token相关的service，重点
    private final AuthorizationServerTokenServices tokenServices;
    //与clientDetails相关的service，重点
    private final ClientDetailsService clientDetailsService;
    //创建oauth2Request的工厂，重点
    private final OAuth2RequestFactory requestFactory;

    private final String grantType;
    ...

    public OAuth2AccessToken grant(String grantType, TokenRequest tokenRequest) {

        ...
        String clientId = tokenRequest.getClientId();
        ClientDetails client = clientDetailsService.loadClientByClientId(clientId);
        validateGrantType(grantType, client);

        logger.debug("Getting access token for: " + clientId);

        return getAccessToken(client, tokenRequest);

    }

    protected OAuth2AccessToken getAccessToken(ClientDetails client, TokenRequest tokenRequest) {
        return tokenServices.createAccessToken(getOAuth2Authentication(client, tokenRequest));
    }

    protected OAuth2Authentication getOAuth2Authentication(ClientDetails client, TokenRequest tokenRequest) {
        OAuth2Request storedOAuth2Request = requestFactory.createOAuth2Request(client, tokenRequest);
        return new OAuth2Authentication(storedOAuth2Request, null);
    }

    ...
}
```

1. 从参数中获取`client_id`
2. （以`InMemoryClientDetailsService`为例）从`clientDetailsService`维护的Map集合`clientDetailsStore`中获取`ClientDetails`对象，这个对象包含应用的所有信息（client_id、client_secret等）
3. 校验该应用是否支持当前的`grant_type`
4. 下一步生成token



#### AuthorizationServerTokenServices

其中最终完成生成Token的类是`AuthorizationServerTokenServices`，默认实现类是`DefaultTokenServices`

`AuthorizationServerTokenServices`定义了创建token、刷新token、获取token的规范

```java
public interface AuthorizationServerTokenServices {
    //创建token
    OAuth2AccessToken createAccessToken(OAuth2Authentication authentication) throws AuthenticationException;
    //刷新token
    OAuth2AccessToken refreshAccessToken(String refreshToken, TokenRequest tokenRequest)
            throws AuthenticationException;
    //获取token
    OAuth2AccessToken getAccessToken(OAuth2Authentication authentication);

}
```



#### DefaultTokenServices

`DefaultTokenServices`提供了创建token，刷新token，获取token的实现。在创建token时，他会调用tokenStore对产生的token和相关信息存储到对应的实现类中，可以是Redis，数据库，内存，jwt

创建token的关键代码

```java
@Transactional
public OAuth2AccessToken createAccessToken(OAuth2Authentication authentication) throws AuthenticationException {

    OAuth2AccessToken existingAccessToken = tokenStore.getAccessToken(authentication);
    OAuth2RefreshToken refreshToken = null;
    // 查看是否存在相同的token，有的话先用回它
    if (existingAccessToken != null) {
        // 看看这个token是不是过期了
        if (existingAccessToken.isExpired()) {
            // 如果是过期了，那就把它从存储（jdbc、redis、memory等）中移除
            if (existingAccessToken.getRefreshToken() != null) {
                // 如果这个token同时有刷新令牌，也把刷新令牌移除
                refreshToken = existingAccessToken.getRefreshToken();
                // The token store could remove the refresh token when the
                // access token is removed, but we want to
                // be sure...
                tokenStore.removeRefreshToken(refreshToken);
            }
            tokenStore.removeAccessToken(existingAccessToken);
        }
        else {
            // 如果没有过期，那就重新存起来并返回
            // Re-store the access token in case the authentication has changed
            tokenStore.storeAccessToken(existingAccessToken, authentication);
            return existingAccessToken;
        }
    }

    // 颁发刷新令牌
    // Only create a new refresh token if there wasn't an existing one
    // associated with an expired access token.
    // Clients might be holding existing refresh tokens, so we re-use it in
    // the case that the old access token expired.
    if (refreshToken == null) {
        refreshToken = createRefreshToken(authentication);
    }
    // 如果这个刷新令牌过期了，那就需要重新颁发
    // But the refresh token itself might need to be re-issued if it has expired.
    else if (refreshToken instanceof ExpiringOAuth2RefreshToken) {
        ExpiringOAuth2RefreshToken expiring = (ExpiringOAuth2RefreshToken) refreshToken;
        if (System.currentTimeMillis() > expiring.getExpiration().getTime()) {
            refreshToken = createRefreshToken(authentication);
        }
    }

    //生成token并存储起来
    OAuth2AccessToken accessToken = createAccessToken(authentication, refreshToken);
    tokenStore.storeAccessToken(accessToken, authentication);
    // In case it was modified
    refreshToken = accessToken.getRefreshToken();
    if (refreshToken != null) {
        tokenStore.storeRefreshToken(refreshToken, authentication);
    }
    return accessToken;

}
```



### OAuth2AccessToken

其中`OAuth2AccessToken`的实现类是`DefaultOAuth2AccessToken`就是最终拿到的token序列化之前的原始类

```java
@org.codehaus.jackson.map.annotate.JsonSerialize(using = OAuth2AccessTokenJackson1Serializer.class)
@org.codehaus.jackson.map.annotate.JsonDeserialize(using = OAuth2AccessTokenJackson1Deserializer.class)
@com.fasterxml.jackson.databind.annotation.JsonSerialize(using = OAuth2AccessTokenJackson2Serializer.class)
@com.fasterxml.jackson.databind.annotation.JsonDeserialize(using = OAuth2AccessTokenJackson2Deserializer.class)

public interface OAuth2AccessToken {

    public static String BEARER_TYPE = "Bearer";

    public static String OAUTH2_TYPE = "OAuth2";

    /**
     * The access token issued by the authorization server. This value is REQUIRED.
     */
    public static String ACCESS_TOKEN = "access_token";

    /**
     * The type of the token issued as described in <a
     * href="http://tools.ietf.org/html/draft-ietf-oauth-v2-22#section-7.1">Section 7.1</a>. Value is case insensitive.
     * This value is REQUIRED.
     */
    public static String TOKEN_TYPE = "token_type";

    /**
     * The lifetime in seconds of the access token. For example, the value "3600" denotes that the access token will
     * expire in one hour from the time the response was generated. This value is OPTIONAL.
     */
    public static String EXPIRES_IN = "expires_in";

    /**
     * The refresh token which can be used to obtain new access tokens using the same authorization grant as described
     * in <a href="http://tools.ietf.org/html/draft-ietf-oauth-v2-22#section-6">Section 6</a>. This value is OPTIONAL.
     */
    public static String REFRESH_TOKEN = "refresh_token";

    /**
     * The scope of the access token as described by <a
     * href="http://tools.ietf.org/html/draft-ietf-oauth-v2-22#section-3.3">Section 3.3</a>
     */
    public static String SCOPE = "scope";

    ...
}
```



#### DefaultOAuth2AccessToken

```java
public class DefaultOAuth2AccessToken implements Serializable, OAuth2AccessToken {

    private static final long serialVersionUID = 914967629530462926L;

    private String value;

    private Date expiration;

    private String tokenType = BEARER_TYPE.toLowerCase();

    private OAuth2RefreshToken refreshToken;

    private Set<String> scope;

    private Map<String, Object> additionalInformation = Collections.emptyMap();

    //getter,setter
}
```

一个典型的样例token响应,如下所示，就是上述类序列化后的结果：

```json
{ 
    "access_token":"950a7cc9-5a8a-42c9-a693-40e817b1a4b0", 
    "token_type":"bearer", 
    "refresh_token":"773a0fcd-6023-45f8-8848-e141296cb3cb", 
    "expires_in":27036, 
    "scope":"select" 
}
```



## 携带token访问受限资源

资源服务器`ResourceServerConfig`继承了`ResourceServerConfigurerAdapter`

### ResourceServerConfigurerAdapter

```java
public class ResourceServerConfigurerAdapter implements ResourceServerConfigurer {
    public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
    }

    public void configure(HttpSecurity http) throws Exception {
        ((AuthorizedUrl)http.authorizeRequests().anyRequest()).authenticated();
    }
}
```

我们注意到其相关配置类是ResourceServerConfigurer，内部关联了`ResourceServerSecurityConfigurer`和`HttpSecurity`。前者与资源安全配置相关，后者与http安全配置相关



### ResourceServerSecurityConfigurer

核心配置

```java
public void configure(HttpSecurity http) throws Exception {

    AuthenticationManager oauthAuthenticationManager = oauthAuthenticationManager(http);
  	// 创建OAuth2AuthenticationProcessingFilter,核心过滤器
    resourcesServerFilter = new OAuth2AuthenticationProcessingFilter();
    resourcesServerFilter.setAuthenticationEntryPoint(authenticationEntryPoint);
  	// 为OAuth2AuthenticationProcessingFilter提供固定的AuthenticationManager即OAuth2AuthenticationManager
    // 它并没有将OAuth2AuthenticationManager添加到spring的容器中
    // 不然可能会影响spring security的普通认证流程（非oauth2请求）
    // 只有被OAuth2AuthenticationProcessingFilter拦截到的oauth2相关请求才被特殊的身份认证器处理。
    resourcesServerFilter.setAuthenticationManager(oauthAuthenticationManager);
    if (eventPublisher != null) {
        resourcesServerFilter.setAuthenticationEventPublisher(eventPublisher);
    }
    if (tokenExtractor != null) {
      	//设置了TokenExtractor默认的实现—-BearerTokenExtractor
        resourcesServerFilter.setTokenExtractor(tokenExtractor);
    }
    resourcesServerFilter = postProcess(resourcesServerFilter);
    resourcesServerFilter.setStateless(stateless);

    http
        .authorizeRequests().expressionHandler(expressionHandler)
    .and()
        .addFilterBefore(resourcesServerFilter, AbstractPreAuthenticatedProcessingFilter.class)
        .exceptionHandling()
            .accessDeniedHandler(accessDeniedHandler)//相关的异常处理器，可以重写相关实现，达到自定义异常的目的
            .authenticationEntryPoint(authenticationEntryPoint);
}
```



#### OAuth2AuthenticationProcessingFilter

过滤器核心配置

```java
public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain){

    final HttpServletRequest request = (HttpServletRequest) req;
    final HttpServletResponse response = (HttpServletResponse) res;

    try {
        //从请求中取出身份信息，即access_token
        Authentication authentication = tokenExtractor.extract(request);

        if (authentication == null) {
            ...
        }
        else {
            request.setAttribute(OAuth2AuthenticationDetails.ACCESS_TOKEN_VALUE, authentication.getPrincipal());
            if (authentication instanceof AbstractAuthenticationToken) {
                AbstractAuthenticationToken needsDetails = (AbstractAuthenticationToken) authentication;
                needsDetails.setDetails(authenticationDetailsSource.buildDetails(request));
            }
            //认证身份
            Authentication authResult = authenticationManager.authenticate(authentication);
            ...
            eventPublisher.publishAuthenticationSuccess(authResult);
            //将身份信息绑定到SecurityContextHolder中
            SecurityContextHolder.getContext().setAuthentication(authResult);
        }
    }
    catch (OAuth2Exception failed) {
        ...
        return;
    }

    chain.doFilter(request, response);
}
```

OAuth2保护资源的核心认证过滤器。如果与`OAuth2AuthenticationManager`结合使用，则会从到来的请求之中提取一个OAuth2 token，之后使用`OAuth2Authentication`来填充Spring Security上下文(`SecurityContextHolder`)。



#### TokenExtractor

这个类的作用是从请求中**各个地方**提取token出来

```java
public class BearerTokenExtractor implements TokenExtractor {

    private final static Log logger = LogFactory.getLog(BearerTokenExtractor.class);

    @Override
    public Authentication extract(HttpServletRequest request) {
        String tokenValue = extractToken(request);
        if (tokenValue != null) {
            PreAuthenticatedAuthenticationToken authentication = new PreAuthenticatedAuthenticationToken(tokenValue, "");
            return authentication;
        }
        return null;
    }

    protected String extractToken(HttpServletRequest request) {
        // 首先从请求头中检查是否存在token
        String token = extractHeaderToken(request);

        // bearer type allows a request parameter as well
        if (token == null) {
            ...
            // 如果请求头没有token，那么从请求参数、请求体中获取token
        }

        return token;
    }

    /**
     * Extract the OAuth bearer token from a header.
     */
    protected String extractHeaderToken(HttpServletRequest request) {
        Enumeration<String> headers = request.getHeaders("Authorization");
        while (headers.hasMoreElements()) { // typically there is only one (most servers enforce that)
            ...
            // 从Header中获取token
        }
        return null;
    }

}
```

可以看到`BearerTokenExtractor`可以从多角度提取token，也就是说我们有多种携带token的方式

- 在请求头中携带

  ```
  http://localhost:8080/order/1
  Header：
  Authentication：Bearer f732723d-af7f-41bb-bd06-2636ab2be135
  ```

- 在请求参数中携带

  ```
  http://localhost:8080/order/1?access_token=f732723d-af7f-41bb-bd06-2636ab2be135
  ```

- 在请求体中携带

  ```
  http://localhost:8080/order/1
  form param：
  access_token=f732723d-af7f-41bb-bd06-2636ab2be135
  ```

  

#### OAuth2AuthenticationManager

`OAuth2AuthenticationManager`和`ProviderManager`都是`AuthenticationManager`身份认证顶层接口，前者用于token认证相关的，后者用于token获取相关的

身份认证关键代码

```java
public Authentication authenticate(Authentication authentication) throws AuthenticationException {

    ...
    String token = (String) authentication.getPrincipal();
    //最终还是借助tokenServices根据token加载身份信息
    OAuth2Authentication auth = tokenServices.loadAuthentication(token);
    ...

    checkClientDetails(auth);

    if (authentication.getDetails() instanceof OAuth2AuthenticationDetails) {
        OAuth2AuthenticationDetails details = (OAuth2AuthenticationDetails) authentication.getDetails();
        ...
    }
    auth.setDetails(authentication.getDetails());
    auth.setAuthenticated(true);
    return auth;

}
```

#### ResourceServerTokenServices

避免产生误解，tokenServices分为两类，一个是用在认证服务器(生成token)端的`AuthorizationServerTokenServices`，另一个是用在资源服务器(校验token)端的`ResourceServerTokenServices`

```java
public interface ResourceServerTokenServices {

    //根据accessToken加载客户端信息
    OAuth2Authentication loadAuthentication(String accessToken) throws AuthenticationException, InvalidTokenException;

    //根据accessToken获取完整的访问令牌详细信息。
    OAuth2AccessToken readAccessToken(String accessToken);

}
```



## TokenStore

存储token的方式有很多：JWT、Redis、JDBC、InMemory

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/Token%E7%BB%A7%E6%89%BF%E4%BD%93%E7%B3%BB.png)

### RedisTokenStore

#### Redis存储Token的优势

- 登录信息一般不需要长效储存，使用Redis可以减少数据库的压力
- Redis可以实现Token的时效性，Token过期失效自动删除
- Redis的响应速度非常快，如果不出现网络问题，基本上是毫秒级别相应
- 使用Redis可以避免单点的问题，在分布式系统中，无论是哪一个机器处理请求都是从Redis获取Token

#### Redis存储Token的内容

用Redis存储Token时，Spring Security OAuth2会生成以下几个key**前缀**

```java
private static final String ACCESS = "access:";
private static final String AUTH_TO_ACCESS = "auth_to_access:";
private static final String AUTH = "auth:";
private static final String REFRESH_AUTH = "refresh_auth:";
private static final String ACCESS_TO_REFRESH = "access_to_refresh:";
private static final String REFRESH = "refresh:";
private static final String REFRESH_TO_ACCESS = "refresh_to_access:";
private static final String CLIENT_ID_TO_ACCESS = "client_id_to_access:";
private static final String UNAME_TO_ACCESS = "uname_to_access:";
```

从``RedisTokenStore`中可以发现，用的是Spring Security OAuth2提供的`JdkSerializationStrategy`这个序列化工具，然后我们通过redis-cli查看具体key对应的值时，发现存储的是序列化后的对象，不是简单易读的json形式，估计是为了提高存储和读取的性能考虑

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210903232126.png)

可以替换成自定义实现的序列化工具

需要自行实现`RedisTokenStoreSerializationStrategy`接口

```java
@Bean
public RedisTokenStore redisTokenStore(){
    RedisTokenStore store = new RedisTokenStore(redisConnectionFactory);
    store.setSerializationStrategy(new FastjsonRedisTokenStoreSerializationStrategy());
    return store;
}
```

但是由于`DefaultOAuth2RefreshToken`、`DefaultOAuth2AccessToken`没有默认的无参构造方法，**需要定制化序列化以及反序列化策略**



**access:[key(access_token)]**

由`access:`前缀+`access_token`组成的，而`access_token`是请求token接口返回的

其中的内容对应对象`OAuth2AccessToken`

```json
{
	//token，拿着这个token我们就可以资源（接口）了
  "access_token": "x8U6xmAK0MeFDEJ0",
  //token类型是一个票据类型，还有授权码类型等等
  "token_type": "bearer",
  //用于刷新access_token（资源访问token）的token
  "refresh_token": "0qLDRZE70MeFDEI!",
  //access_token剩余存活时间（单位是秒）
  "expires_in": 29658,
  //拿这个token可以访问那些范围内的资源
  "scope": "server"
}
```



**auth_to_access:[key]**

这个key是将username、client_id、scope三个值加密后的值

```java
public String extractKey(OAuth2Authentication authentication) {
	//省略一些代码
	values.put(USERNAME, authentication.getName());
	values.put(CLIENT_ID, authorizationRequest.getClientId());
	values.put(SCOPE, OAuth2Utils.formatParameterList(new TreeSet<String>(authorizationRequest.getScope())));
	return generateKey(values);
}

protected String generateKey(Map<String, String> values) {
  //省略一些代码
	MessageDigest digest = MessageDigest.getInstance("MD5");
  //对这个map进行md5加密
  byte[] bytes = digest.digest(values.toString().getBytes("UTF-8"));
  return String.format("%032x", new BigInteger(1, bytes));
}
```

反序列化之后得到的结果和access:[key]的结果一致，对应的对象是`OAuth2AccessToken`

```json
{
	//token，拿着这个token我们就可以资源（接口）了
  "access_token": "x8U6xmAK0MeFDEJ0",
  //token类型是一个票据类型，还有授权码类型等等
  "token_type": "bearer",
  //用与刷新access_token（资源访问token）的token
  "refresh_token": "0qLDRZE70MeFDEI!",
  //access_token剩余存活时间（单位是秒）
  "expires_in": 29658,
  //拿这个token可以访问那些范围内的资源
  "scope": "server"
}
```



**auth:[key(access_token)]**

由`auth:`前缀+`access_token`组成的，而`access_token`是请求token接口返回的

其中的内容对应对象`OAuth2Authentication`

主要包含当前**登录用户的信息**，以及用户附带的**角色**和和**权限**信息、生成Token时的**授权方式**等信息

```json
{
    "authorities": [{
            "authority": "ROLE_USER"
        },
        {
            "authority": "USER_RETRIEVE"
        }
    ],
    "details": null,
    "authenticated": true,
    "userAuthentication": {
        "authorities": [{
                "authority": "ROLE_USER"
            },
            {
                "authority": "USER_RETRIEVE"
            }
        ],
        "details": {
            "client_secret": "app",
            "grant_type": "password",
            "client_id": "app",
            "username": "wuji"
        },
        "authenticated": true,
        "principal": {
            "password": null,
            "username": "wuji",
            "authorities": [{
                    "authority": "ROLE_USER"
                },
                {
                    "authority": "USER_RETRIEVE"
                }
            ],
            "accountNonExpired": true,
            "accountNonLocked": true,
            "credentialsNonExpired": true,
            "enabled": true
        },
        "credentials": null,
        "name": "wuji"
    },
    "credentials": "",
    "principal": {
        "password": null,
        "username": "wuji",
        "authorities": [{
                "authority": "ROLE_USER"
            },
            {
                "authority": "USER_RETRIEVE"
            }
        ],
        "accountNonExpired": true,
        "accountNonLocked": true,
        "credentialsNonExpired": true,
        "enabled": true
    },
    "oauth2Request": {
        "clientId": "app",
        "scope": ["server"],
        "requestParameters": {
            "grant_type": "password",
            "client_id": "app",
            "username": "wuji"
        },
        "resourceIds": [],
        "authorities": [],
        "approved": true,
        "refresh": false,
        "redirectUri": null,
        "responseTypes": [],
        "extensions": {},
        "grantType": "password",
        "refreshTokenRequest": null
    },
    "clientOnly": false,
    "name": "wuji"
}
```



**access_to_refresh:[key(access_token)]**

由`access_to_refresh:`前缀+`access_token`组成的，而`access_token`是请求token接口返回的

其中的内容是认证时返回的`refresh_token`，用于刷新令牌

```
grz0Xlzi0MeQwkx9
```



**refresh_to_access:[key(refresh_token)]**

由`refresh_to_access:`前缀+`refresh_token`组成的，而`refresh_token`由请求token接口返回

其中的内容是拿`refresh_token`去刷新令牌时，生成的新的`accessToken`

```
TesxUOBt0MeRDDxA
```



**refresh:[key(refresh_token)]**

由`refresh_to_access:`前缀+`refresh_token`组成的，而`refresh_token`由请求token接口返回

拿`refresh_token`去刷新令牌的时候，会先获取这个key的信息，判断当前`refresh_token`是否还有效，无效则无法刷新令牌

其中的内容是

```json
{
 //refresh_toekn
  "value": "grz0Xlzi0MeQwkx9",
  //过期时间戳（mills）
  "expiration": 1557821765322
}
```



**refresh_atuh:[key(refresh_token)]**

由`refresh_auth:`前缀+`refresh_token`组成，而`refresh_token`由请求token接口返回

与`auth`类似，其中内容对应的对象是`OAuth2Authentication`

```json
{
  "authorities": [
    {
      "authority": "ROLE_USER"
    },
    {
      "authority": "USER_RETRIEVE"
    }
  ],
  "details": null,
  "authenticated": true,
  "userAuthentication": {
    "authorities": [
      {
        "authority": "ROLE_USER"
      },
      {
        "authority": "USER_RETRIEVE"
      }
    ],
    "details": {
      "client_secret": "app",
      "grant_type": "password",
      "client_id": "app",
      "username": "wuji"
    },
    "authenticated": true,
    "principal": {
      "password": null,
      "username": "wuji",
      "authorities": [
        {
          "authority": "ROLE_USER"
        },
        {
          "authority": "USER_RETRIEVE"
        }
      ],
      "accountNonExpired": true,
      "accountNonLocked": true,
      "credentialsNonExpired": true,
      "enabled": true
    },
    "credentials": null,
    "name": "wuji"
  },
  "credentials": "",
  "principal": {
    "password": null,
    "username": "wuji",
    "authorities": [
      {
        "authority": "ROLE_USER"
      },
      {
        "authority": "USER_RETRIEVE"
      }
    ],
    "accountNonExpired": true,
    "accountNonLocked": true,
    "credentialsNonExpired": true,
    "enabled": true
  },
  "oauth2Request": {
    "clientId": "app",
    "scope": ["server"],
    "requestParameters": {
      "grant_type": "password",
      "client_id": "app",
      "username": "wuji"
    },
    "resourceIds": [],
    "authorities": [],
    "approved": true,
    "refresh": false,
    "redirectUri": null,
    "responseTypes": [],
    "extensions": {},
    "grantType": "password",
    "refreshTokenRequest": null
  },
  "clientOnly": false,
  "name": "wuji"
}
```



**client_id_to_access:[key(client_id)]**

由`client_id_to_access:`前缀+`client_id`组成，而`client_id`由服务端定义，用于标识当前请求哪一个应用的token

这个key将使用当前`client_id`所生成的所有`OAuth2AccessToken`对象存储起来，是一个`list`结构

```json
[{
    "access_token": "TesxUOBt0MeRDDxA",
    "token_type": "bearer",
    "refresh_token": "grz0Xlzi0MeQwkx9",
    "expires_in": 41714,
    "scope": "server"
}]
```



**uname_to_access:[key(client_id:username)]**

由`uname_to_access:`前缀+`client_id:username`组成，`client_id`由服务端定义，`username`是用户名

这个key将使用当前`client_id`和指定用户名`username`所生成的所有`OAuth2AccessToken`对象存储起来，是一个`list`结构

```json
[{
    "access_token": "TesxUOBt0MeRDDxA",
    "token_type": "bearer",
    "refresh_token": "grz0Xlzi0MeQwkx9",
    "expires_in": 41714,
    "scope": "server"
}]
```

