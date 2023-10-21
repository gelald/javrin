const e=JSON.parse('{"key":"v-6a9fa1ca","path":"/writings/SpringSecurity/OAuth2.html","title":"OAuth2 学习","lang":"zh-CN","frontmatter":{"title":"OAuth2 学习","icon":"article","order":3,"category":["干货","SpringSecurity"],"tag":["OAuth2"],"description":"OAuth2 OAuth 是一种授权机制。数据的所有者告诉系统，同意授权第三方应用进入系统，获取这些数据。系统从而产生一个短期的进入令牌（token），用来代替密码，供第三方应用使用。 授权方式 授权码 授权码方式（authorization code），指的是第三方应用先申请一个授权码，然后再用该码获取令牌。 这种方式是最常用的流程，安全性也最高，它适用于那些有后端的 Web 应用。授权码通过前端传送，令牌则是储存在后端，而且所有与资源服务器的通信都在后端完成。这样的前后端分离，可以避免令牌泄漏。","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/SpringSecurity/OAuth2.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"OAuth2 学习"}],["meta",{"property":"og:description","content":"OAuth2 OAuth 是一种授权机制。数据的所有者告诉系统，同意授权第三方应用进入系统，获取这些数据。系统从而产生一个短期的进入令牌（token），用来代替密码，供第三方应用使用。 授权方式 授权码 授权码方式（authorization code），指的是第三方应用先申请一个授权码，然后再用该码获取令牌。 这种方式是最常用的流程，安全性也最高，它适用于那些有后端的 Web 应用。授权码通过前端传送，令牌则是储存在后端，而且所有与资源服务器的通信都在后端完成。这样的前后端分离，可以避免令牌泄漏。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-11-08T08:44:29.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:tag","content":"OAuth2"}],["meta",{"property":"article:modified_time","content":"2022-11-08T08:44:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"OAuth2 学习\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-11-08T08:44:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"授权方式","slug":"授权方式","link":"#授权方式","children":[{"level":3,"title":"授权码","slug":"授权码","link":"#授权码","children":[]},{"level":3,"title":"隐藏式","slug":"隐藏式","link":"#隐藏式","children":[]},{"level":3,"title":"密码式","slug":"密码式","link":"#密码式","children":[]},{"level":3,"title":"凭证式","slug":"凭证式","link":"#凭证式","children":[]}]},{"level":2,"title":"使用令牌","slug":"使用令牌","link":"#使用令牌","children":[]},{"level":2,"title":"更新令牌","slug":"更新令牌","link":"#更新令牌","children":[]},{"level":2,"title":"密码与令牌","slug":"密码与令牌","link":"#密码与令牌","children":[]},{"level":2,"title":"从client_credentials模式看token生成","slug":"从client-credentials模式看token生成","link":"#从client-credentials模式看token生成","children":[{"level":3,"title":"ClientCredentialsTokenEndpointFilter","slug":"clientcredentialstokenendpointfilter","link":"#clientcredentialstokenendpointfilter","children":[]},{"level":3,"title":"TokenEndpoint","slug":"tokenendpoint","link":"#tokenendpoint","children":[]},{"level":3,"title":"OAuth2AccessToken","slug":"oauth2accesstoken","link":"#oauth2accesstoken","children":[]}]},{"level":2,"title":"携带token访问受限资源","slug":"携带token访问受限资源","link":"#携带token访问受限资源","children":[{"level":3,"title":"ResourceServerConfigurerAdapter","slug":"resourceserverconfigureradapter","link":"#resourceserverconfigureradapter","children":[]},{"level":3,"title":"ResourceServerSecurityConfigurer","slug":"resourceserversecurityconfigurer","link":"#resourceserversecurityconfigurer","children":[]}]},{"level":2,"title":"TokenStore","slug":"tokenstore","link":"#tokenstore","children":[{"level":3,"title":"RedisTokenStore","slug":"redistokenstore","link":"#redistokenstore","children":[]}]}],"git":{"createdTime":null,"updatedTime":1667897069000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":2},{"name":"wuyingbin","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":18.06,"words":5418},"filePathRelative":"writings/SpringSecurity/OAuth2.md","excerpt":"<h1> OAuth2</h1>\\n<p><strong>OAuth 是一种授权机制。数据的所有者告诉系统，同意授权第三方应用进入系统，获取这些数据。系统从而产生一个短期的进入令牌（token），用来代替密码，供第三方应用使用。</strong></p>\\n<h2> 授权方式</h2>\\n<h3> 授权码</h3>\\n<p><strong>授权码方式（authorization code），指的是第三方应用先申请一个授权码，然后再用该码获取令牌。</strong></p>\\n<p>这种方式是最常用的流程，<strong>安全性也最高</strong>，它<strong>适用于那些有后端的 Web 应用</strong>。授权码通过前端传送，令牌则是储存在后端，而且所有与资源服务器的通信都在后端完成。这样的前后端分离，可以避免令牌泄漏。</p>","autoDesc":true}');export{e as data};