---
title: SpringSecurity 学习
icon: article
order: 1
category:

- 干货
- SpringSecurity

tag:

- SpringSecurity

---

# Spring Security

## 概念

认证（Authentication）：验证某个用户是否是在系统中已注册的合法用户

授权（Authorization）：授予某个用户具有哪些权限，一般在认证之后进行。实现授权的方式有：Cookie、Session、Token、OAuth

### Cookie和Session的区别

1. 从安全性看，Session存储在服务端，Cookie存储在客户端，所以Session比Cookie安全
2. 从存储的内容看，Session可以存储任意数据类型，Cookie只支持存字符串数据，如果想要设置其他类型数据则需要转换成字符串
3. 从有效期看，Cookie可设置为长时间保存，Session一般失效的时间较短，客户端关闭或者Session超时都会使其失效
4. 从存储大小看，单个Cookie保存的数据不能超过4KB，Session没有存储大小限制，但是如果存储太多数据会占用较多服务器资源

## 安全架构的演进

### 单块阶段

<img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210801175433.png" style="zoom:30%;" />

由于Http请求具有无状态性，两个Http请求是互不关联的，服务器怎么识别当前用户已经登录？如何记住用户登录状态？

**使用服务器端的Session和浏览器端的Cookie来共同实现**

服务器端使用Session（可以理解为一个哈希表）来记录用户数据、数据的时间戳（超时不更新会自动删除），浏览器端使用Cookie来记录服务器端的sessionId，后续浏览器端发送请求的时候把Cookie带上，用于服务器端校验用户登录状态及其他信息

### 粘性会话阶段(Sticky Session)

<img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210801175500.png" style="zoom:30%;" />

由于服务端做了集群，Nginx对服务端进行负载均衡

浏览器端登录时，Nginx把用户流量发送到Server1上；执行其他操作时，Nginx可能把用户流量发送到Server2上，由于Server2上的Session没有当前用户的登录状态，所以导致用户需要重新登录认证

**使用粘性会话来实现**

Nginx需要截获并记录sessionId与服务器的IP地址做关联，请求转发的时候根据这个关联关系做转发，保证会话期间用户和某台服务器做绑定

#### 粘性会话存在的不足

1. 一旦用户与某台服务器进行了绑定，那么当这台服务器需要升级或者宕机，一批用户的会话就会消失，必须重新登录
2. 粘性会话让Nginx和服务端都变成有状态的结构，难以扩展

**解决方案**

1. 会话同步复制，把会话数据实时在服务器之间进行同步复制，即使某台服务器宕机，负载均衡可以自动切换流量。但是会提高系统的复杂度
2. 无状态会话，把Session数据存在浏览器端，通过请求携带Session来实现携带用户数据。但是有泄漏用户数据的风险，且浏览器对Cookie有大小限制

### 集中会话阶段(Centralized Session)

<img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210801175521.png" style="zoom:30%;" />

**把Session集中存储在某个地方，服务端和Nginx均无需自己存储会话状态**，可以存在数据库或缓存。服务端、Nginx、Redis都可以方便水平扩展

### 微服务阶段-Auth Service+Token

<img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/image-20210801175542818.png" alt="image-20210801175542818" style="zoom:30%;" />

由一个特定的服务统一承担登录认证、会话管理、令牌颁发、校验职责

### 微服务阶段-Auth Service+网关+Token

<img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/image-20210801175557528.png" alt="image-20210801175557528" style="zoom:30%;" />

认证服务职责不变，网关做统一发送令牌到认证服务校验的工作

### 微服务阶段-Auth Service+网关+JWT

<img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210801185818.png" style="zoom:30%;" />

当访问流量大的时候，会对Auth Service的访问压力比较大，可能成为性能的瓶颈

**可以采用JWT令牌，自包含数据和签名，所以网关可以自行解析和校验**

## Spring Security基本使用

### 开启SpringSecurity
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

这种权限控制的方式一般采纳于不同角色能访问不同应用的资源上；比如Web端是一个应用，移动端是一个应用，可以通过这种方式来控制角色访问权限。更细粒度的权限推荐系统内自行实现；比如同应用下功能权限、接口权限，自行实现一套角色资源控制体系

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

### URL拦截匹配规则

#### 规则注册顺序

完成规则注册主要的类为`AbstractConfigAttributeRequestMatcherRegistry`

匹配规则用`UrlMapping`来表示

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210810170136.png)

1. SpringSecurity会将所有`.antMatchers("/api/**").xxx()`的规则在代码中从上到下（按注册优先级顺序）放入一个`ArrayList<UrlMapping>`，**先注册的规则放在前面，后注册的规则放在后面**

   ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210810165838.png)

2. 然后对这个`urlMappings`进行处理，按顺序遍历，以`requestMatcher`为key，以`configAttrs`为value放到一个`LinkedHashMap`中，**同一个URL，不同的执行规则，后存储的会覆盖先存储的**，这个`LinkedHashMap`就是最终的规则集合

   ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210810170702.png)

#### 规则匹配顺序

完成规则匹配主要的类为`DefaultFilterInvocationSecurityMetadataSource`

当SpringSecurity从请求中取出访问的URL时，会通过之前得到的这个`LinkedHashMap`来遍历匹配URL，第一个能匹配上这个URL的规则，那么就是最终执行的规则

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210810171917.png)

#### 匹配问题

```java
http.authorizeRequests().antMatchers("/api/**").denyAll();    		//拒绝访问

http.authorizeRequests().antMatchers("/api/**").authenticated();    //需认证通过

http.authorizeRequests().antMatchers("/api/**").permitAll();    	//无条件允许访问
```

1. 一个url可以匹配多个规则：如 /api/bbb/ccc 这个url ，既可以匹配 /** ，又可以匹配 /api/**，最终会匹配哪条规则呢？

   > 因为存储规则的时候是先放在ArrayList的，所以先注册的规则最终会放在LinkedHashMap前面，后续匹配的时候就会先匹配，一旦匹配上，后续的任何规则都不再匹配。**所以第一条能匹配上的，就是最终会执行的规则。**

2. 存在相同url 的匹配规则，如上面例子中 "/api/**" 一共有三条规则，一个denyAll，一个authenticated，一个permitAll ，最终会匹配哪条规则呢？

   > 在ArrayList转换成LinkedHashMap的时候，同一个URL的，后面的匹配规则会覆盖掉前面的匹配规则。**所以最终执行的规则是同一个URL最后注册的规则。**

## Spring Security核心组件

### SecurityContext
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

### SecurityContextHolder
- 用于持有SecurityContext实例的组件(存储SecurityContext)
- 默认的存储的策略有三种
    - MODE_THREADLOCAL: SecurityContext存储在线程中(默认)
    - MODE_INHERITABLETHREADLOCAL: SecurityContext存储在线程中，但子线程可以获取到父线程中的SecurityContext
    - MODE_GLOBAL: SecurityContext在所有线程中都相同
    - **可以自定义存储策略,但是需要实现SecurityContextHolderStrategy接口**
- SecurityContextHolder只需提供存储SecurityContext的存储规则,至于具体的存储方式则交由SecurityContextHolderStrategy其实现类来控制

### SecurityContextPersistenceFilter
SpringSecurity过滤器链上的第一个过滤器,请求的第一个过滤器,响应的最后一个过滤器
- 请求的第一个过滤器,请求进来时会检测session中是否有SecurityContext,如果有则把SecurityContext从session中拿出来;如果没有则新建一个SecurityContext**放到线程中**
- 响应的最后一个过滤器,响应进来时把SecurityContext从线程中拿出来,**清除线程中的SecurityContext,放入session中**

### Authentication
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

### UserDetails
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

### UserDetailsService
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


### AuthenticationManager
只有一个方法,目的是检验Authentication
```java
public interface AuthenticationManager {
    Authentication authenticate(Authentication authentication) throws AuthenticationException;
}
```
检验失败时会抛出AuthenticationException异常,但是这是一个抽象类,抛出的通常是其子类
常见的BadCredentialsException,密码错误



### PasswordEncoder

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

#### NoOpPasswordEncoder

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

#### BCryptPasswordEncoder

#### DelegatingPasswordEncoder

随着Spring Security5之前默认的`NoOpPasswordEncoder`已经被弃用，默认的编码器被换成了另一个特定算法的编码器，这样会带来两个问题：

- 有许多使用旧密码编码的应用程序无法轻松迁移
- 密码存储的最佳做法(算法)可能会再次发生变化

简单来说就是要保证**新的密码编码器和旧密码的兼容性**、**自身的稳健性**以及**一定的可变性**（切换到更好的算法）

`DelegatingPasswordEncoder`能实现的效果

- 确保使用当前密码存储建议对密码进行编码
- 允许验证现代和传统格式的密码
- 允许将来升级编码算法

其实`DelegatingPasswordEncoder`不是真正意义上的编码器，没有使用一种特定的编码算法，而是一个**委派密码编码器**，它将具体编码的实现根据要求委派给不同的算法，以此来实现不同编码算法之间的兼容和变化协调。内部维护了一个Map集合，集合的结构是**键为加密算法的名称，值为具体加密算法的PasswordEncoder**

##### 构造方法

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

##### 密码存储格式

因为这个编码器维护了多种加密算法，所以密码中**包含了使用的加密算法和密文密码**

```
{id}encodedPassword
```

- **id**标识使用**PaswordEncoder**的种类
- **encodedPassword**是原密码被编码后的密码

##### 加密

```java
public String encode(CharSequence rawPassword) {
  return "{" + this.idForEncode + "}" + this.passwordEncoderForEncode.encode(rawPassword);
}
```

加密算法的原理很简单

1. 构造`DelegatingPasswordEncoder`时指定了默认加密算法
2. 用这个默认的加密算法从维护的编码器集合找到对应算法的编码器
3. 最终加密时，需要在前面拼接`{使用的加密算法}`

##### 匹配

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



