---
title: SpringSecurity 核心组件
icon: article
order: 1
category: SpringSecurity

tag:
  - SpringSecurity
---

# Spring Security 核心组件

> 以下 Spring Security 的版本是 6.1.0

## UserDetails

`UserDetails` 是一份静态的用户数据模型，提供了用户信息，回答了“用户是谁”的问题。它不参与认证的过程，只为认证过程提供数据，比如：用户名、密码、权限列表、帐号状态。

请注意：`UserDetails` 和项目中自定义的 "User" 不能直接划等号，这里会存在一个转换的过程，自定义的用户数据模型往往包含更多或更少的信息，`UserDetails` 是 Spring Security 官方定义的数据规范，在构建 `UserDetials` 对象时需要遵循规范来保证认证过程符合预期，比如：账号是否可用、是否锁定、用户有哪些权限等等。

```java
public interface UserDetails extends Serializable {

    /**
     * 用户权限集合，用于构建认证主体的权限集合
     */
    Collection<? extends GrantedAuthority> getAuthorities();

    String getPassword();

    String getUsername();

    /**
     * 账号是否过期，如果是，在认证阶段会抛出 AccountExpiredException
     */
    boolean isAccountNonExpired();

    /**
     * 账号是否锁定，如果是，在认证阶段会抛出 LockedException
     */
    boolean isAccountNonLocked();

    /**
     * 账号凭证（一般指密码）是否过期，如果是，在认证阶段会抛出 CredentialsExpiredException
     */
    boolean isCredentialsNonExpired();

    /**
     * 账号是否可用，如果不可用，在认证阶段会抛出 DisabledException
     */
    boolean isEnabled();
}
```

### UserDetailsService

`UserDetailsService` 是 Spring Security 提供的查询 `UserDetails` 的规范，里面只有一个方法：`loadUserByUsername`，其中这个 Username 不一定真的对应我们自定义用户的 username，它可以是任意的用户唯一标识，比如在以手机号码为主体的认证系统中，这个 username 就可以是用户的手机号码

```java
public interface UserDetailsService {

    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}
```

在实际开发中，我们需要实现这个接口，来完成用户数据的查询并封装成 `UserDetails` 格式返回

## Authentication

`Authentication` 是一个动态的认证上下文对象，回答了“请求主体是谁？是否通过认证？拥有哪些权限？”的问题。这是它和 `UserDetails` 最本质的区别，一个是用户数据模型，而它是 Spring Security 中实际流动和使用的核心对象。

在认证阶段，认证前它仅封装了用户提交的登录凭证（比如用户名和密码）；认证成功后它会被再次填充为一个包含用户信息的对象，来证明这个用户已经通过了认证。

在授权阶段，其中 `authorization` 属性是授权决策的直接数据来源。

```java
public interface Authentication extends Principal, Serializable {

    /**
     * 认证主体的权限集合，用于鉴权
     */
    Collection<? extends GrantedAuthority> getAuthorities();

    /**
     * 认证前：用户凭证（密码）
     * 认证后：出于安全考虑，会对其进行擦除，返回 null
     */
    Object getCredentials();

    Object getDetails();

    /**
     * 认证前：用户名
     * 认证后：通过认证的用户对象
     */
    Object getPrincipal();

    /**
     * 声明认证主体是否已经通过了认证
     */
    boolean isAuthenticated();

    void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException;
}
```

## SecurityContext

`SecurityContext` 翻译为安全上下文，在用户通过认证后，认证信息会被包含在 `Authentication` 对象中，而 `Authentication` 会存储到 `SecurityContext` 上下文中。

简单理解为：**存放认证信息的容器**

```java
public interface SecurityContext extends Serializable {
    Authentication getAuthentication();

    void setAuthentication(Authentication authentication);
}
```

## SecurityContextHolder

`SecurityContextHolder` 从名字中不难看出他是用于获取 `SecurityContext` 的组件，但是细看源码，它并不直接负责存储，而是提供存储的策略，实际的存储工作由不同的 `SecurityContextHolderStrategy` 来实现。

`SecurityContextHolder` 会调用当前使用的 `SecurityContextHolderStrategy` 来获取或修改 `SecurityContext`。有 3 种存储策略：

- `MODE_THREADLOCAL`：底层使用 `ThreadLocal` 来实现存储，`SecurityContext` 存储在当前线程中（默认存储策略）
- `MODE_INHERITABLETHREADLOCAL`：底层使用 `InheritableThreadLocal` 来实现存储，在 `MODE_THREADLOCAL` 基础上，可以在开启的子线程中获取 `SecurityContext`
- `MODE_GLOBAL`：底层使用静态变量来实现存储，`SecurityContext` 始终只有一份会被全局读写

### 自定义 SecurityContextHolderStrategy

如果 3 种默认的存储策略都不满足使用的话，可以自定义存储策略

- 实现 `SecurityContextHolderStrategy` 接口，并实现接口方法
- 在 `spring.security.strategy` 配置值中指定自定义的 `SecurityContextHolderStrategy` 的全限定类名

```java
public class SecurityContextHolder {
    public static final String SYSTEM_PROPERTY = "spring.security.strategy";
    
    private static String strategyName = System.getProperty(SYSTEM_PROPERTY);
    
    private static SecurityContextHolderStrategy strategy;

  	private static void initializeStrategy() {
		if (MODE_PRE_INITIALIZED.equals(strategyName)) {
			Assert.state(strategy != null, "When using " + MODE_PRE_INITIALIZED
					+ ", setContextHolderStrategy must be called with the fully constructed strategy");
			return;
		}
		if (!StringUtils.hasText(strategyName)) {
			// Set default
			strategyName = MODE_THREADLOCAL;
		}
        // 按官方提供的存储策略初始化
		if (strategyName.equals(MODE_THREADLOCAL)) {
			strategy = new ThreadLocalSecurityContextHolderStrategy();
			return;
		}
		if (strategyName.equals(MODE_INHERITABLETHREADLOCAL)) {
			strategy = new InheritableThreadLocalSecurityContextHolderStrategy();
			return;
		}
		if (strategyName.equals(MODE_GLOBAL)) {
			strategy = new GlobalSecurityContextHolderStrategy();
			return;
		}
		// Try to load a custom strategy
		try {
            // 关键：按类名加载你的自定义 SecurityContextHolderStrategy
			Class<?> clazz = Class.forName(strategyName);
			Constructor<?> customStrategy = clazz.getConstructor();
			strategy = (SecurityContextHolderStrategy) customStrategy.newInstance();
		}
		catch (Exception ex) {
			ReflectionUtils.handleReflectionException(ex);
		}
	}
}
```

## AuthenticationProvider

`AuthenticationProvider` 是实际负责认证工作的核心组件，前面提到过：`Authentication` 中的数据会在认证前后产生变化，就是 `AuthenticationProvider` 来实现的。

```java
public interface AuthenticationProvider {

	/**
	 * 执行核心的认证逻辑
	 */
	Authentication authenticate(Authentication authentication) throws AuthenticationException;

	/**
	 * 决定当前 Provider 实现类是否支持认证这个认证主体
	 */
	boolean supports(Class<?> authentication);

}
```
### AbstractUserDetailsAuthenticationProvider

以用户名密码登录的机制为例，它的实现类是 `AbstractUserDetailsAuthenticationProvider`，它的 `supports` 方法是这样子的：

```java
    @Override
    public boolean supports(Class<?> authentication) {
      return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }
```

判断当前 `authentication` 是否和 `UsernamePasswordAuthenticationToken` 类相同，显然用户名密码登录时的 `Authentication` 会使用 `UsernamePasswordAuthenticationToken` 作为实现类

接下来看 `authenticate` 方法（仅列出关键代码）：

```java
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
      // 第一步校验参数...

      // 第二步从 cache 中获取用户，如果没有启用 cache 的话，默认是 NullUserCache 实现 cache（不做任何的缓存操作）
      UserDetails user = this.userCache.getUserFromCache(username);
      if (user == null) {
        try {
          // 如果 cache 中无法查询到用户，那么使用 retrieveUser 方法来获取用户
          // 其中 retrieveUser 方法是子类实现的，最终把 user 查询出来
          user = retrieveUser(username, (UsernamePasswordAuthenticationToken) authentication);
        }
        catch (UsernameNotFoundException ex) {
          // 查不到 user 会抛出 UsernameNotFoundException，进而被封装成 BadCredentialsException
          throw new BadCredentialsException(this.messages
              .getMessage("AbstractUserDetailsAuthenticationProvider.badCredentials", "Bad credentials"));
        }
      }

      try {
        // 第三步做的校验包括：isAccountNonLocked、isEnabled、isAccountNonExpired
        // 如果不满足以上条件，那么会抛出各类型的异常
        this.preAuthenticationChecks.check(user);
        // 第四步执行子类中实现的额外校验
        // 一般是密码校验
        additionalAuthenticationChecks(user, (UsernamePasswordAuthenticationToken) authentication);
      }
      catch (AuthenticationException ex) {
        // ...
      }
      // 第五步做的校验是：isCredentialsNonExpired
      this.postAuthenticationChecks.check(user);
      // ...
      // 可以看到 principalToReturn 被指定为整个 user
      Object principalToReturn = user;
      // ...
      // 最终给 Authenticatoin 注入用户信息，实现认证前后的数据转换，其中 Authentication 的 principal 会填充 user 信息
      return createSuccessAuthentication(principalToReturn, authentication, user);
    }
```

### DaoAuthenticationProvider

`DaoAuthenticationProvider` 是 `AbstractUserDetailsAuthenticationProvider` 的实现类，负责了上面提到的 `retrieveUser`、`additionalAuthenticationChecks` 等重要工作

首先看 `retrieveUser`，主要的工作还是去查询用户，另外还有一个防攻击的额外步骤：

```java
    @Override
    protected final UserDetails retrieveUser(String username, UsernamePasswordAuthenticationToken authentication)
        throws AuthenticationException {
      prepareTimingAttackProtection();
      try {
        // getUserDetailsService 方法去获取我们实现 UserDetailsService 接口的实现类来调用 loadUserByUsername 方法
        UserDetails loadedUser = this.getUserDetailsService().loadUserByUsername(username);
        if (loadedUser == null) {
          throw new InternalAuthenticationServiceException(
              "UserDetailsService returned null, which is an interface contract violation");
        }
        return loadedUser;
      }
      catch (UsernameNotFoundException ex) {
        // 非常精妙的一个设计：即使无法查询到用户，依然去对一个默认的密码做密码校验
        // 目的：填充密码校验的时间，让攻击者无法通过响应时间来破解用户名是否存在
        mitigateAgainstTimingAttack(authentication);
        throw ex;
      }
      //...
    }
```

然后看 `additionalAuthenticationChecks` 方法，就是通过 passwordEncoder 来校验密码：

```java
    @Override
    @SuppressWarnings("deprecation")
    protected void additionalAuthenticationChecks(UserDetails userDetails,
        UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
      // 参数校验...
      String presentedPassword = authentication.getCredentials().toString();
      if (!this.passwordEncoder.matches(presentedPassword, userDetails.getPassword())) {
        this.logger.debug("Failed to authenticate since password does not match stored value");
        throw new BadCredentialsException(this.messages
            .getMessage("AbstractUserDetailsAuthenticationProvider.badCredentials", "Bad credentials"));
      }
    }
```

## AuthenticationManager

`AuthenticationManager` 接口的结构和 `AuthenticationProvider` 结构很类似，都是有一个 `authenticate` 方法，但是它们扮演的角色却大不相同。

核心功能是指派之前提到的 `supports` 方法是 `true` 的 `AuthenticationProvider` 来执行真正的认证工作

```java
public interface AuthenticationManager {

	Authentication authenticate(Authentication authentication) throws AuthenticationException;
}
```

### ProviderManager

`ProviderManager` 是 Spring Security 中使用到的实现类，里面的逻辑更证实了他只是一个委派者角色

```java
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        // ...
      Class<? extends Authentication> toTest = authentication.getClass();
      for (AuthenticationProvider provider : getProviders()) {
        // 验证 supports 方法是否返回 true，true 的情况才满足认证的条件
        if (!provider.supports(toTest)) {
          continue;
        }
        // 打印日志...
        try {
          result = provider.authenticate(authentication);
          if (result != null) {
            copyDetails(authentication, result);
            break;
          }
        }
        catch (AccountStatusException | InternalAuthenticationServiceException ex) {
          // 异常处理...
        }
        catch (AuthenticationException ex) {
          // 异常处理...
        }
      }
      // ...
    }
```

## DefaultSecurityFilterChain

Spring Security 对 Servlet 应用增加是基于 Servlet Filter 实现的，常见的包括处理 csrf 的过滤器、校验权限的过滤器、处理登录的过滤器等等，它们通常会被组织成一个 FilterChain 的形式来工作，我们可以理解为一个 FilterChain 包含了多个相同模块但不同功能的 Filter。比如 Spring Security 提供的 FilterChain 就叫 `DefaultSecurityFilterChain`，我们引入了 Spring Security 的依赖并启动应用后，控制台会输出这一段信息：

```txt
2023-06-14T08:55:22.321-03:00  INFO 76975 --- [           main] o.s.s.web.DefaultSecurityFilterChain     : Will secure any request with [
org.springframework.security.web.session.DisableEncodeUrlFilter@404db674,
org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter@50f097b5,
org.springframework.security.web.context.SecurityContextHolderFilter@6fc6deb7,
org.springframework.security.web.header.HeaderWriterFilter@6f76c2cc,
org.springframework.security.web.csrf.CsrfFilter@c29fe36,
org.springframework.security.web.authentication.logout.LogoutFilter@ef60710,
org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter@7c2dfa2,
org.springframework.security.web.authentication.ui.DefaultLoginPageGeneratingFilter@4397a639,
org.springframework.security.web.authentication.ui.DefaultLogoutPageGeneratingFilter@7add838c,
org.springframework.security.web.authentication.www.BasicAuthenticationFilter@5cc9d3d0,
org.springframework.security.web.savedrequest.RequestCacheAwareFilter@7da39774,
org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter@32b0876c,
org.springframework.security.web.authentication.AnonymousAuthenticationFilter@3662bdff,
org.springframework.security.web.access.ExceptionTranslationFilter@77681ce4,
org.springframework.security.web.access.intercept.AuthorizationFilter@169268a7]
```

可以看到这个 FilterChain 里面包含的多个 Filter，一旦看见这些 Filter，说明 Spring Security 已经成功接管了项目的认证授权模块


### UsernamePasswordAuthenticationFilter

`UsernamePasswordAuthenticationFilter` 是 Spring Security 过滤器链上关于认证的过滤器，它是发起认证流程的起点，所有的组件都将由它来组织并发起工作

回顾 Filter 的工作流程，核心方法就是 `doFilter`，拦截请求，完成拦截的逻辑后会递归地调用同一 FilterChain 上的 Filter，我们看 `UsernamePasswordAuthenticationFilter` 父类中实现的 `doFilter` 方法：

```java
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException {
      doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
        throws IOException, ServletException {
      // ...
      try {
        // attemptAuthentication 是执行认证的核心方法
        Authentication authenticationResult = attemptAuthentication(request, response);
        // 认证成功后存储 session 信息，这里不展开
        this.sessionStrategy.onAuthentication(authenticationResult, request, response);
        // ...
        // 认证通过后的处理
        successfulAuthentication(request, response, chain, authenticationResult);
      }
      catch (InternalAuthenticationServiceException failed) {
        this.logger.error("An internal error occurred while trying to authenticate the user.", failed);
        // 认证失败的处理
        unsuccessfulAuthentication(request, response, failed);
      }
      catch (AuthenticationException ex) {
        // 认证失败的处理
        unsuccessfulAuthentication(request, response, ex);
      }
    }
```

可以看到 `doFilter` 方法中的核心逻辑还是执行 `attemptAuthentication` 方法，认证成功后做某些处理，认证失败又会做另外的处理，我们具体看它会做什么处理：

```java
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
        Authentication authResult) throws IOException, ServletException {
        
        // 这里使用 SecurityContextHolderStrategy 来创建 SecurityContext 
        SecurityContext context = this.securityContextHolderStrategy.createEmptyContext();
        // 为 SecurityContext 存储 Authentication 对象
        context.setAuthentication(authResult);
        // 更新 SecurityContext 到 SecurityContextHolder 中，方便后续使用
        this.securityContextHolderStrategy.setContext(context);

        this.securityContextRepository.saveContext(context, request, response);
        if (this.logger.isDebugEnabled()) {
            this.logger.debug(LogMessage.format("Set SecurityContextHolder to %s", authResult));
        }
        this.rememberMeServices.loginSuccess(request, response, authResult);
        if (this.eventPublisher != null) {
            this.eventPublisher.publishEvent(new InteractiveAuthenticationSuccessEvent(authResult, this.getClass()));
        }
        this.successHandler.onAuthenticationSuccess(request, response, authResult);
    }


    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
        AuthenticationException failed) throws IOException, ServletException {
        
        // 认证失败先清除 SecurityContext
        this.securityContextHolderStrategy.clearContext();

        this.logger.trace("Failed to process authentication request", failed);
        this.logger.trace("Cleared SecurityContextHolder");
        this.logger.trace("Handling authentication failure");
        this.rememberMeServices.loginFail(request, response);
        this.failureHandler.onAuthenticationFailure(request, response, failed);
    }
```

最后看 `attemptAuthentication` 方法，核心的工作依然是调用 `AuthenticationManager` 进而去委派实际的 `AuthenticationProvider` 来完成实际的认证工作

```java
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
        // ...
        
        // 参数处理
		String username = obtainUsername(request);
		username = (username != null) ? username.trim() : "";
		String password = obtainPassword(request);
		password = (password != null) ? password : "";
		
		// 把用户名密码封装到 Authentication 中
		UsernamePasswordAuthenticationToken authRequest = UsernamePasswordAuthenticationToken.unauthenticated(username, password);
		// 这里主要把 IP地址、sessionId 信息添加到 Authentication 中
        setDetails(request, authRequest);
		
		// 调用 AuthenticationManager 来完成认证
		return this.getAuthenticationManager().authenticate(authRequest);
	}

```

## Spring Security 完整认证流程

![AuthenticationManager工作流程](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/daoauthenticationprovider.png)

1. `UsernamePasswordAuthenticationFilter` 把用户名和密码封装成 `UsernamePasswordAuthenticationToken`, 并传递给 `AuthenticationManager`，它由 `ProviderManager` 实现。
2. `ProviderManager` 会遍历所有 `AuthenticationProvider`，最后发现 `DaoAuthenticationProvider` 符合 `support` 方法返回 `true` 的要求，由 `DaoAuthenticationProvider` 来完成认证的工作。
3. `DaoAuthenticationProvider` 调用 `UserDetailsService` 去查询用户信息并封装成 `UserDetails`。
4. `DaoAuthenticationProvider` 使用 `PasswordEncoder` 来验证上一步查询到的 `UserDetails` 上的密码。
5. 当认证成功时，返回的 `Authentication` 同样是 `UsernamePasswordAuthenticationToken` 类型，并且其中 `principal` 是由配置的 `UserDetailsService` 返回的 `UserDetails`。最终，返回的 `UsernamePasswordAuthenticationToken` 被 `UsernamePasswordAuthenticationFilter` 通过 `SecurityContext` 最终储存在 `SecurityContextHolder` 上。