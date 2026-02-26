# WebSecurity vs HttpSecurity 对比

## 核心区别

### **WebSecurity**

**作用范围**: 全局级别，控制整个 Spring Security 的顶层配置

**核心功能**:
- 定义哪些请求**完全绕过** Spring Security 过滤器链
- 配置防火墙（Firewall）

**使用场景**:

| 场景 | 说明 |
|------|------|
| **静态资源忽略** | `/h2-console/**`, `/favicon.ico` 等 |
| **第三方回调** | Webhook 端点、支付宝/微信回调 |
| **健康检查** | `/actuator/health`, `/actuator/info` |
| **遗留系统接口** | 暂时不迁移的旧 API |

**特点**:
- ⚠️ 被忽略的路径**完全没有安全保护**
- ⚠️ 不能使用 `@PreAuthorize` 等注解
- ⚠️ 不能使用 `permitAll()` 等细粒度控制
- ✅ 性能最好（完全不经过过滤器）

**配置示例**:
```java
@Bean
public WebSecurityCustomizer webSecurityCustomizer() {
    return (web) -> web.ignoring().requestMatchers(
            new AntPathRequestMatcher("/h2-console/**"),
            new AntPathRequestMatcher("/favicon.ico")
    );
}
```

---

### **HttpSecurity**

**作用范围**: 细粒度级别，配置具体的安全策略

**核心功能**:
- 配置认证方式（JWT、OAuth2、Form、Basic）
- 配置授权规则（基于角色、权限、表达式）
- 配置 CSRF、CORS、Session 管理
- 配置登录/登出行为

**使用场景**:

| 场景 | 说明 |
|------|------|
| **API 认证** | JWT、OAuth2 Resource Server |
| **权限控制** | `hasRole()`, `hasAuthority()` |
| **跨域配置** | CORS 策略 |
| **会话管理** | Stateful vs Stateless |
| **登录页面** | 自定义登录页、登出逻辑 |

**特点**:
- ✅ 支持细粒度权限控制
- ✅ 支持完整的认证流程
- ✅ 可以使用 `@PreAuthorize` 等注解
- ⚠️ 所有请求都经过过滤器链（有性能开销）

**配置示例**:
```java
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(AbstractHttpConfigurer::disable)
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(new AntPathRequestMatcher("/actuator/**")).permitAll()
            .requestMatchers(new AntPathRequestMatcher("/api/public/**")).permitAll()
            .requestMatchers(new AntPathRequestMatcher("/api/admin/**")).hasRole("admin")
            .requestMatchers(new AntPathRequestMatcher("/api/user/**")).hasAnyRole("user", "admin")
            .anyRequest().authenticated()
        )
        .oauth2ResourceServer(oauth2 -> oauth2
            .jwt(jwt -> jwt
                .decoder(jwtDecoder())
                .jwtAuthenticationConverter(jwtAuthenticationConverter())
            )
        );
    return http.build();
}
```

---

## 对比总结表

| 维度 | WebSecurity | HttpSecurity |
|------|-------------|--------------|
| **级别** | 顶层全局配置 | 具体安全策略 |
| **安全保护** | ❌ 完全绕过 | ✅ 完整保护 |
| **性能** | 最优（无过滤器开销） | 有过滤器开销 |
| **灵活性** | 低（只有忽略） | 高（细粒度控制） |
| **典型用途** | 静态资源、第三方回调 | API 认证授权 |
| **注解支持** | ❌ 不支持 @PreAuthorize | ✅ 支持 @PreAuthorize |
| **认证方式** | ❌ 无认证 | ✅ JWT/OAuth2/Form/Basic |
| **授权控制** | ❌ 无授权 | ✅ 基于角色/权限/表达式 |

---

## 常见问题解答

### Q: 为什么 H2 控制台用 WebSecurity 而不是 HttpSecurity 的 permitAll()？

**A**: 
1. H2 控制台有**自己的认证机制**（数据库用户名密码）
2. 使用 `permitAll()` 仍然会经过 Spring Security 过滤器链，产生大量 DEBUG 日志
3. 使用 `ignoring()` 完全绕过，让 H2 自己处理认证，性能更优

### Q: 什么时候选择 ignoring() vs permitAll()？

| 选择 | 场景 |
|------|------|
| **ignoring()** | 完全信任的路径，不需要任何 Spring Security 功能 |
| **permitAll()** | 需要 Spring Security 上下文，但不需要认证（如登录页、公开 API） |

### Q: 使用 ignoring() 有什么风险？

**A**: 
- 被忽略的路径**完全没有安全保护**
- 不能使用 `@PreAuthorize` 等权限注解
- 不能获取 `Authentication` 对象
- 谨慎使用，仅用于真正不需要安全的资源

---

## 最佳实践建议

1. **最小化 ignoring() 范围** - 仅用于静态资源、健康检查等
2. **优先使用 permitAll()** - 需要 Spring Security 上下文时使用
3. **明确区分职责** - WebSecurity 管全局忽略，HttpSecurity 管具体安全策略
4. **记录忽略的路径** - 在文档中说明为什么某些路径被忽略

---

## 参考资料

- [Spring Security 官方文档 - WebSecurityCustomizer](https://docs.spring.io/spring-security/reference/servlet/configuration/java.html)
- [Spring Security 官方文档 - HttpSecurity](https://docs.spring.io/spring-security/reference/servlet/integrations/httpsecurity.html)
- [Spring Security Filter Chain 详解](https://spring.io/guides/topicals/spring-security-architecture/)

---

**SpringBoot 版本**: 3.1.5  
**Spring Security 版本**: 6.1.5
