# 概念

认证（Authentication）：验证某个用户是否是在系统中已注册的合法用户

授权（Authorization）：授予某个用户具有哪些权限，一般在认证之后进行。实现授权的方式有：Cookie、Session、Token、OAuth

## Cookie和Session的区别

1. 从安全性看，Session存储在服务端，Cookie存储在客户端，所以Session比Cookie安全
2. 从存储的内容看，Session可以存储任意数据类型，Cookie只支持存字符串数据，如果想要设置其他类型数据则需要转换成字符串
3. 从有效期看，Cookie可设置为长时间保存，Session一般失效的时间较短，客户端关闭或者Session超时都会使其失效
4. 从存储大小看，单个Cookie保存的数据不能超过4KB，Session没有存储大小限制，但是如果存储太多数据会占用较多服务器资源

# 安全架构的演进

## 单块阶段

![](https://gitee.com/ngyb/pic/raw/master/20210801175433.png)

由于Http请求具有无状态性，两个Http请求是互不关联的，服务器怎么识别当前用户已经登录？如何记住用户登录状态？

**使用服务器端的Session和浏览器端的Cookie来共同实现**

服务器端使用Session（可以理解为一个哈希表）来记录用户数据、数据的时间戳（超时不更新会自动删除），浏览器端使用Cookie来记录服务器端的sessionId，后续浏览器端发送请求的时候把Cookie带上，用于服务器端校验用户登录状态及其他信息

## 粘性会话阶段(Sticky Session)

![](https://gitee.com/ngyb/pic/raw/master/20210801175500.png)

由于服务端做了集群，Nginx对服务端进行负载均衡

浏览器端登录时，Nginx把用户流量发送到Server1上；执行其他操作时，Nginx可能把用户流量发送到Server2上，由于Server2上的Session没有当前用户的登录状态，所以导致用户需要重新登录认证

**使用粘性会话来实现**

Nginx需要截获并记录sessionId与服务器的IP地址做关联，请求转发的时候根据这个关联关系做转发，保证会话期间用户和某台服务器做绑定

### 粘性会话存在的不足

1. 一旦用户与某台服务器进行了绑定，那么当这台服务器需要升级或者宕机，一批用户的会话就会消失，必须重新登录
2. 粘性会话让Nginx和服务端都变成有状态的结构，难以扩展

**解决方案**

1. 会话同步复制，把会话数据实时在服务器之间进行同步复制，即使某台服务器宕机，负载均衡可以自动切换流量。但是会提高系统的复杂度
2. 无状态会话，把Session数据存在浏览器端，通过请求携带Session来实现携带用户数据。但是有泄漏用户数据的风险，且浏览器对Cookie有大小限制

## 集中会话阶段(Centralized Session)

![](https://gitee.com/ngyb/pic/raw/master/20210801175521.png)

**把Session集中存储在某个地方，服务端和Nginx均无需自己存储会话状态**，可以存在数据库或缓存。服务端、Nginx、Redis都可以方便水平扩展

## 微服务阶段-Auth Service+Token

![image-20210801175542818](/Users/ngyb/Library/Application Support/typora-user-images/image-20210801175542818.png)

由一个特定的服务统一承担登录认证、会话管理、令牌颁发、校验职责

## 微服务阶段-Auth Service+网关+Token

![image-20210801175557528](/Users/ngyb/Library/Application Support/typora-user-images/image-20210801175557528.png)

认证服务职责不变，网关做统一发送令牌到认证服务校验的工作

## 微服务阶段-Auth Service+网关+JWT

![](https://gitee.com/ngyb/pic/raw/master/20210801185818.png)

当访问流量大的时候，会对Auth Service的访问压力比较大，可能成为性能的瓶颈

**可以采用JWT令牌，自包含数据和签名，所以网关可以自行解析和校验**

# 基本使用

## 开启SpringSecurity
- 继承WebSecurityConfigurerAdapter抽象类
- 重写`protected void configure(HttpSecurity http) throws Exception`方法
    ```java
    @Override
    protected void configure(HttpSecurity http) throws Exception {
    
        http
                //表单认证方式
                .formLogin()
                //HTTP Basic认证方式
                //.httpBasic()
                .and()
                //授权配置
                .authorizeRequests()
                //所有请求
                .anyRequest()
                //都需要认证
                .authenticated();
    }
    ```
- 默认的账号为`user`，默认的密码在启动时会出现在控制台中

**验证方式**：

- 表单验证方式: 登录时跳转到一张全新的网页, 带有一个登录表单
- HTTP Basic方式: 弹出一个类似Alert的窗口来填写用户名密码

### 角色-资源访问控制
方便演示，把用户和角色存放在内存中
- 继承WebSecurityConfigurerAdapter抽象类
- 重写`protected void configure(AuthenticationManagerBuilder auth) throws Exception`方法记录账号与配置角色
    ```java
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .inMemoryAuthentication()
                //用户admin1，密码admin1（管理员），同时具有 ADMIN,USER 权限
                .withUser("admin1")
                .password("{noop}admin1")
                .roles("ADMIN", "USER")
                .and()
                //用户user1，密码user1（普通用户），只具有USER权限
                .withUser("user1")
                .password("{noop}user1")
                .roles("USER");
    }
    ```
- 重写`protected void configure(HttpSecurity http) throws Exception`方法来配置角色能访问的资源
    ```java
    @Override
    protected void configure(HttpSecurity http) throws Exception {
    
        http
                //表单认证方式
                .formLogin()
                .and()
                //授权配置
                .authorizeRequests()
                //USER权限能访问/product/**下的所有资源
                .antMatchers("/product/**").hasRole("USER")
                //ADMIN权限能访问/product/**下的所有资源
                .antMatchers("/admin/**").hasRole("ADMIN")
                //所有请求
                .anyRequest()
                //都需要认证
                .authenticated();
    }
    ```
- 当使用admin1账号时，访问两个资源都成功；当使用user1账号时，只能访问/product下的资源，访问/admin下的资源则提示没有权限

## URL拦截匹配规则

### 规则注册顺序

完成规则注册主要的类为`AbstractConfigAttributeRequestMatcherRegistry`

匹配规则用`UrlMapping`来表示

![](https://gitee.com/ngyb/pic/raw/master/20210810170136.png)

1. SpringSecurity会将所有`.antMatchers("/api/**").xxx()`的规则在代码中从上到下（按注册优先级顺序）放入一个`ArrayList<UrlMapping>`，**先注册的规则放在前面，后注册的规则放在后面**

   ![](https://gitee.com/ngyb/pic/raw/master/20210810165838.png)

2. 然后对这个`urlMappings`进行处理，按顺序遍历，以`requestMatcher`为key，以`configAttrs`为value放到一个`LinkedHashMap`中，**同一个URL，不同的执行规则，后存储的会覆盖先存储的**，这个`LinkedHashMap`就是最终的规则集合

   ![](https://gitee.com/ngyb/pic/raw/master/20210810170702.png)

### 规则匹配顺序

完成规则匹配主要的类为`DefaultFilterInvocationSecurityMetadataSource`

当SpringSecurity从请求中取出访问的URL时，会通过之前得到的这个`LinkedHashMap`来遍历匹配URL，第一个能匹配上这个URL的规则，那么就是最终执行的规则

![](https://gitee.com/ngyb/pic/raw/master/20210810171917.png)

### 匹配问题

```java
http.authorizeRequests().antMatchers("/api/**").denyAll();    		//拒绝访问

http.authorizeRequests().antMatchers("/api/**").authenticated();    //需认证通过

http.authorizeRequests().antMatchers("/api/**").permitAll();    	//无条件允许访问
```

1. 一个url可以匹配多个规则：如 /api/bbb/ccc 这个url ，既可以匹配 /** ，又可以匹配 /api/**，最终会匹配哪条规则呢？

   > 因为存储规则的时候是先放在ArrayList的，所以先注册的规则最终会放在LinkedHashMap前面，后续匹配的时候就会先匹配，一旦匹配上，后续的任何规则都不再匹配。**所以第一条能匹配上的，就是最终会执行的规则。**

2. 存在相同url 的匹配规则，如上面例子中 "/api/**" 一共有三条规则，一个denyAll，一个authenticated，一个permitAll ，最终会匹配哪条规则呢？

   > 在ArrayList转换成LinkedHashMap的时候，同一个URL的，后面的匹配规则会覆盖掉前面的匹配规则。**所以最终执行的规则是同一个URL最后注册的规则。**

# 核心组件

## SecurityContext
安全上下文，用户登录通过SpringSecurity通过验证后，验证的信息会存放在SecurityContext中

```java
public interface SecurityContext extends Serializable {
	/**
	 * 获取当前已验证的验证信息
	 */
	Authentication getAuthentication();
 
	/**
     * 修改或删除已验证的验证信息
	 */
	void setAuthentication(Authentication authentication);
}
```

## SecurityContextHolder
- 用于持有SecurityContext实例的组件(存储SecurityContext)
- 默认的存储的策略有三种
    - MODE_THREADLOCAL: SecurityContext存储在线程中(默认)
    - MODE_INHERITABLETHREADLOCAL: SecurityContext存储在线程中，但子线程可以获取到父线程中的SecurityContext
    - MODE_GLOBAL: SecurityContext在所有线程中都相同
    - **可以自定义存储策略,但是需要实现SecurityContextHolderStrategy接口**
- SecurityContextHolder只需提供存储SecurityContext的存储规则,至于具体的存储方式则交由SecurityContextHolderStrategy其实现类来控制

## SecurityContextPersistenceFilter
SpringSecurity过滤器链上的第一个过滤器,请求的第一个过滤器,响应的最后一个过滤器
- 请求的第一个过滤器,请求进来时会检测session中是否有SecurityContext,如果有则把SecurityContext从session中拿出来;如果没有则新建一个SecurityContext**放到线程中**
- 响应的最后一个过滤器,响应进来时把SecurityContext从线程中拿出来,**清除线程中的SecurityContext,放入session中**

## Authentication
认证,一般用于表示当前用户，SecurityContext中使用Authentication来存储的用户验证信息
```java
public interface Authentication extends Principal, Serializable {
    /**
	 * 获取用户角色信息
	 */
	Collection<? extends GrantedAuthority> getAuthorities();

    /**
     * 获取证明用户认证(密码等)的信息
     */
	Object getCredentials();

    /**
     * 获取用户的额外信息(可以理解成用户表中的信息)
     */
	Object getDetails();

    /**
     * 获取用户身份信息,未认证时获取到的是用户名;已认证后获取到的是UserDetails
     */
	Object getPrincipal();

    /**
	 * 获取当前Authentication是否已认证
	 */
	boolean isAuthenticated();

    /**
	 * 设置当前Authentication的认证状态
	 */
	void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException;
}
```

## UserDetails
存储的是用户信息
```java
public interface UserDetails extends Serializable {
    /**
	 * 获取用户角色信息
	 */
	Collection<? extends GrantedAuthority> getAuthorities();

    /**
	 * 获取密码
	 */
	String getPassword();

    /**
	 * 获取用户名
	 */
	String getUsername();

    /**
	 * 获取帐户是否过期
	 */
	boolean isAccountNonExpired();

    /**
	 * 获取帐户是否被锁定
	 */
	boolean isAccountNonLocked();

    /**
	 * 获取密码是否过期
	 */
	boolean isCredentialsNonExpired();

    /**
	 * 获取帐户是否可用
	 */
	boolean isEnabled();
}
```

## UserDetailsService
只有一个方法，目的是获取UserDetails
```java
public interface UserDetailsService {
    /**
	 * 通过用户名来获取UserDetails
	 */
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}
```
通常开发时会自定义一个CustomUserDetailsService来实现这个接口,并重写`loadUserByUsername`方法
可以通过查询数据库、缓存等来获取用户信息,组装到User中,这个User`org.springframework.security.core.userdetails.User`是实现UserDetails接口的
如果查询不到,那么可以使用提供的UsernameNotFoundExcepion`org.springframework.security.core.userdetails.UsernameNotFoundException`来抛出异常


## AuthenticationManager
只有一个方法,目的是检验Authentication
```java
public interface AuthenticationManager {
    Authentication authenticate(Authentication authentication) throws AuthenticationException;
}
```
检验失败时会抛出AuthenticationException异常,但是这是一个抽象类,抛出的通常是其子类
常见的BadCredentialsException,密码错误



## PasswordEncoder

Spring Security的**PasswordEncoder**接口用于执行密码的单向转换，以便安全地存储密码

```java
public interface PasswordEncoder {

    /**
     * 密码加密方法 将字符序列(即原密码)进行编码
     * Encode the raw password. Generally, a good encoding algorithm applies a SHA-1 or
     * greater hash combined with an 8-byte or greater randomly generated salt.
     */
    String encode(CharSequence rawPassword);

    /**
     * 密码匹配方法 比较字符序列和编码后的密码是否匹配
     * Verify the encoded password obtained from storage matches the submitted raw
     * password after it too is encoded. Returns true if the passwords match, false if
     * they do not. The stored password itself is never decoded.
     *
     * @param rawPassword the raw password to encode and match
     * @param encodedPassword the encoded password from storage to compare with
     * @return true if the raw password, after encoding, matches the encoded password from
     * storage
     */
    boolean matches(CharSequence rawPassword, String encodedPassword);

}
```

### NoOpPasswordEncoder

Spring Security5之前默认的PasswordEncoder实现类，没有编码的编码器，密码会直接泄漏，不安全，已弃用

```java
@Deprecated
public final class NoOpPasswordEncoder implements PasswordEncoder {

    public String encode(CharSequence rawPassword) {
        return rawPassword.toString();
    }

    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        return rawPassword.toString().equals(encodedPassword);
    }

    public static PasswordEncoder getInstance() {
        return INSTANCE;
    }

    private static final PasswordEncoder INSTANCE = new NoOpPasswordEncoder();

    private NoOpPasswordEncoder() {
    }

}
```

### BCryptPasswordEncoder

### DelegatingPasswordEncoder

随着Spring Security5之前默认的`NoOpPasswordEncoder`已经被弃用，默认的编码器被换成了另一个特定算法的编码器，这样会带来两个问题：

- 有许多使用旧密码编码的应用程序无法轻松迁移
- 密码存储的最佳做法(算法)可能会再次发生变化

简单来说就是要保证**新的密码编码器和旧密码的兼容性**、**自身的稳健性**以及**一定的可变性**（切换到更好的算法）

`DelegatingPasswordEncoder`能实现的效果

- 确保使用当前密码存储建议对密码进行编码
- 允许验证现代和传统格式的密码
- 允许将来升级编码算法

其实`DelegatingPasswordEncoder`不是真正意义上的编码器，没有使用一种特定的编码算法，而是一个**委派密码编码器**，它将具体编码的实现根据要求委派给不同的算法，以此来实现不同编码算法之间的兼容和变化协调。内部维护了一个Map集合，集合的结构是**键为加密算法的名称，值为具体加密算法的PasswordEncoder**

#### 构造方法

```java
public DelegatingPasswordEncoder(String idForEncode, Map<String, PasswordEncoder> idToPasswordEncoder) {
  if(idForEncode == null) {
    throw new IllegalArgumentException("idForEncode cannot be null");
  }
  if(!idToPasswordEncoder.containsKey(idForEncode)) {
    throw new IllegalArgumentException("idForEncode " + idForEncode + "is not found in idToPasswordEncoder " + idToPasswordEncoder);
  }
  for(String id : idToPasswordEncoder.keySet()) {
    if(id == null) {
      continue;
    }
    if(id.contains(PREFIX)) {
      throw new IllegalArgumentException("id " + id + " cannot contain " + PREFIX);
    }
    if(id.contains(SUFFIX)) {
      throw new IllegalArgumentException("id " + id + " cannot contain " + SUFFIX);
    }
  }
  this.idForEncode = idForEncode;
  this.passwordEncoderForEncode = idToPasswordEncoder.get(idForEncode);
  this.idToPasswordEncoder = new HashMap<>(idToPasswordEncoder);
}
```

构造方法里面做了一系列的键的校验，最终设定使用的默认编码算法和维护的编码器集合

通常有两种构造方式

**工厂构造**

工厂构造会使用到`PasswordEncoderFactories`来帮助我们进行构造

```java
PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
```

**PasswordEncodeFactories**

具体的实现

```java
public static PasswordEncoder createDelegatingPasswordEncoder() {
  String encodingId = "bcrypt";
  Map<String, PasswordEncoder> encoders = new HashMap<>();
  encoders.put(encodingId, new BCryptPasswordEncoder());
  encoders.put("ldap", new LdapShaPasswordEncoder());
  encoders.put("MD4", new Md4PasswordEncoder());
  encoders.put("MD5", new MessageDigestPasswordEncoder("MD5"));
  encoders.put("noop", NoOpPasswordEncoder.getInstance());
  encoders.put("pbkdf2", new Pbkdf2PasswordEncoder());
  encoders.put("scrypt", new SCryptPasswordEncoder());
  encoders.put("SHA-1", new MessageDigestPasswordEncoder("SHA-1"));
  encoders.put("SHA-256", new MessageDigestPasswordEncoder("SHA-256"));
  encoders.put("sha256", new StandardPasswordEncoder());

  return new DelegatingPasswordEncoder(encodingId, encoders);
}
```

结合`DelegatingPasswordEncoder`的构造方法看，这个工厂构造做了两件事情

1. 设置默认的加密算法为`bcrypt`，遇到新密码，`DelegatingPasswordEncoder`会委派给`BCryptPasswordEncoder`
2. 进行加密收集了常见的加密算法，并将其设置到`DelegatingPasswordEncoder`维护的Map集合，这样可以保持对`ldap`、`MD5`等加密算法进行兼容，且新密码会使用`bcrypt`算法进行加密

**定制构造**

其实和工厂构造原理相似，只不过可以自定义地指定默认加密算法和维护的加密算法集合，**一般推荐使用工厂构造**

例子

```java
String idForEncode = "bcrypt";
Map encoders = new HashMap<>();
encoders.put(idForEncode, new BCryptPasswordEncoder());
encoders.put("noop", NoOpPasswordEncoder.getInstance());
encoders.put("pbkdf2", new Pbkdf2PasswordEncoder());
encoders.put("scrypt", new SCryptPasswordEncoder());
encoders.put("sha256", new StandardPasswordEncoder());

PasswordEncoder passwordEncoder = new DelegatingPasswordEncoder(idForEncode, encoders);
```

#### 密码存储格式

因为这个编码器维护了多种加密算法，所以密码中**包含了使用的加密算法和密文密码**

```
{id}encodedPassword
```

- **id**标识使用**PaswordEncoder**的种类
- **encodedPassword**是原密码被编码后的密码

#### 加密

```java
public String encode(CharSequence rawPassword) {
  return "{" + this.idForEncode + "}" + this.passwordEncoderForEncode.encode(rawPassword);
}
```

加密算法的原理很简单

1. 构造`DelegatingPasswordEncoder`时指定了默认加密算法
2. 用这个默认的加密算法从维护的编码器集合找到对应算法的编码器
3. 最终加密时，需要在前面拼接`{使用的加密算法}`

#### 匹配

```java
public boolean matches(CharSequence rawPassword, String prefixEncodedPassword) {
  if(rawPassword == null && prefixEncodedPassword == null) {
    return true;
  }
  //取出编码算法的id
  String id = extractId(prefixEncodedPassword);
  //根据编码算法的id从支持的密码编码器Map(构造时传入)中取出对应编码器
  PasswordEncoder delegate = this.idToPasswordEncoder.get(id);
  if(delegate == null) {
    //如果找不到对应的密码编码器则使用默认密码编码器进行匹配判断,此时比较的密码字符串是 prefixEncodedPassword
    return this.defaultPasswordEncoderForMatches.matches(rawPassword, prefixEncodedPassword);
  }
  //从 prefixEncodedPassword 中提取获得 encodedPassword 
  String encodedPassword = extractEncodedPassword(prefixEncodedPassword);
  //使用对应编码器进行匹配判断,此时比较的密码字符串是 encodedPassword ,不携带编码算法id头
  return delegate.matches(rawPassword, encodedPassword);
}
```

- `rawPassword`是明文的密码
- `prefixEncodedPassword`是`DelegatingPasswordEncoder`标准密码格式`{加密算法}密文密码`
- 中间会通过`prefixEncodedPassword`进行**获取加密算法和提取纯密文密码**
- 最终也是委派具体使用的编码器进行匹配这一操作
- 当找不到对应的密码编码器时，最终会抛出异常，**提醒你要自己选择一个默认密码编码器来取代它**

# OAuth2

**OAuth 就是一种授权机制。数据的所有者告诉系统，同意授权第三方应用进入系统，获取这些数据。系统从而产生一个短期的进入令牌（token），用来代替密码，供第三方应用使用。**

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

虽然凭证式(cliennt_credentials)和其他模式有所不同，但是**总体上的抽象是固定的**，只是具体的实现类会被响应地替换。我们从**最简单**的凭证式去看spring security oauth2内部的运作流程，**方便理解**

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

![](https://gitee.com/ngyb/pic/raw/master/spring-security-oauth2-xjf-2-1.png)

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

![](https://gitee.com/ngyb/pic/raw/master/spring-security-oauth2-xjf-2-2.png)

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



# JWT

随着移动互联网的兴起，传统基于session/cookie的web网站认证方式转变为了基于OAuth2等开放授权协议的单点登录模式（SSO，Single Sign On），相应的基于服务器session+浏览器cookie的Auth手段也发生了转变，JWT(Json Web Token)的出现成为了当前的热门的Token Auth机制。JWT是一个非常轻巧的规范，这个规范允许我们使用JWT在两个组织之间传递安全可靠的信息。session/cookie得方式把认证信息放在了服务端，jwt把认证信息放在了客户端，减轻了服务端的内存压力

## 特点

- JWT是无状态的
- JWT 不仅可以用于认证，也可以用于交换信息，因为payload部分可以自定义内容
- JWT可以防止篡改，因为JWT包含了签名
- JWT不能存放敏感数据，因为payload部分只进行了base64编码
- JWT是一次性的，如果想修改内容，必须重新颁发一个

JWT(Json Web Token)有两种实现方式：JWS(Json Web Signature)与JWE(Json Web Encryption)

![](https://gitee.com/ngyb/pic/raw/master/20210227182347.png)

## JWS

JSON Web Signature是一个**统一表达形式的字符串**

![](https://gitee.com/ngyb/pic/raw/master/20210227182556.png)

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

![](https://gitee.com/ngyb/pic/raw/master/20210228102124.png)

### 生成步骤

1. **JOSE Header**与JWS的Header含义相同
2. 生成一个随机的Content Encryption Key （CEK）
3. 使用RSAES-OAEP 加密算法，用公钥加密CEK，生成**JWE Encrypted Key**
4. 生成JWE初始化向量**Initialization Vector**
5. 使用AES-GCM加密算法对明文部分进行加密生成密文**Ciphertext**
6. 算法会随之生成一个128位的认证标记**Authentication Tag**
7. 对5个部分分别进行Base64编码

JWE的计算过程相对繁琐，不够轻量级，因此**适合与数据传输而非token认证**，但该协议也足够安全可靠，用简短字符串描述了传输内容，**兼顾数据的安全性与完整性**。

## JWT流程

Client：客户端

Auth Server：认证服务器

Resource Server：资源服务器

JWT签名算法一般会有两个选择：HS256（HMACSHA256、对称算法）和RS256（RSASHA256、非对称算法）

### HMAC流程

![](https://gitee.com/ngyb/pic/raw/master/20210801193743.png)

Auth Server需要与Resource Server提前商定好用于签名、校验的密钥secret，并且**必须保证secret不能泄漏**，否则不安全，攻击者可以利用这个secret来伪造令牌

### RSA流程

![](https://gitee.com/ngyb/pic/raw/master/20210801193801.png)

Auth Server在生成JWT的时候使用私钥进行加密，Resource Server在校验JWT的时候使用公钥进行解密。**RSA方式更加安全**，secret需要Auth Server和Resource Server双方都保密，私钥只存在于Auth Server，只需保证私钥不被泄漏即可

# RedisTokenStore

存储token的方式有很多：JWT、Redis、JDBC、InMemory

![](https://gitee.com/ngyb/pic/raw/master/Token%E7%BB%A7%E6%89%BF%E4%BD%93%E7%B3%BB.png)

## Redis存储Token的优势

- 登录信息一般不需要长效储存，使用Redis可以减少DB的压力
- Redis可以实现Token的时效性，Token过期失效自动删除
- Redis的响应速度非常快，如果不出现网络问题，基本上是毫秒级别相应
- 使用Redis可以避免单点的问题，在分布式系统中，无论是哪一个机器处理请求都是从Redis获取Token

