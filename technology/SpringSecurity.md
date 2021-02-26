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

##### 验证方式:
- 表单验证方式: 登录时跳转到一张全新的网页, 带有一个登录表单
- HTTP Basic方式: 弹出一个类似Alert的窗口来填写用户名密码

#### 角色-资源访问控制
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
认证,一般用于表示当前用户,SecurityContext中使用Authentication来存储的用户验证信息
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
只有一个方法,目的是获取UserDetails
```java
public interface UserDetailsService {
    /**
	 * 通过用户名来获取UserDetails
	 */
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}
```
通常开发时会自定义一个CustomUserDetailsService来实现这个接口,并重写loadUserByUsername方法
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

# OAuth2

# JWT

随着移动互联网的兴起，传统基于session/cookie的web网站认证方式转变为了基于OAuth2等开放授权协议的单点登录模式（SSO，Single Sign On），相应的基于服务器session+浏览器cookie的Auth手段也发生了转变，Json Web Token出现成为了当前的热门的Token Auth机制

JSON Web Token（JWT）是一个非常轻巧的规范。这个规范允许我们使用JWT在两个组织之间传递安全可靠的信息。