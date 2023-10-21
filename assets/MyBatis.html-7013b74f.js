const e=JSON.parse('{"key":"v-32c492f2","path":"/writings/archive/MyBatis.html","title":"MyBatis简介","lang":"zh-CN","frontmatter":{"description":"MyBatis简介 原始jdbc操作 注册驱动Class.forName(\\"com.mysql.cj.jdbc.Driver\\"); 获取连接DriverManager.getConnection(url, user, password); 从连接中获取Statement 执行查询statement.excuteQuery() 遍历结果集封装实体 释放各种资源","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/archive/MyBatis.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"MyBatis简介"}],["meta",{"property":"og:description","content":"MyBatis简介 原始jdbc操作 注册驱动Class.forName(\\"com.mysql.cj.jdbc.Driver\\"); 获取连接DriverManager.getConnection(url, user, password); 从连接中获取Statement 执行查询statement.excuteQuery() 遍历结果集封装实体 释放各种资源"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-30T16:21:52.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:modified_time","content":"2022-07-30T16:21:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MyBatis简介\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-30T16:21:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"原始jdbc操作","slug":"原始jdbc操作","link":"#原始jdbc操作","children":[]},{"level":2,"title":"查询操作","slug":"查询操作","link":"#查询操作","children":[]},{"level":2,"title":"插入操作","slug":"插入操作","link":"#插入操作","children":[]},{"level":2,"title":"更新操作","slug":"更新操作","link":"#更新操作","children":[]},{"level":2,"title":"删除操作","slug":"删除操作","link":"#删除操作","children":[]},{"level":2,"title":"基本sql语句","slug":"基本sql语句","link":"#基本sql语句","children":[{"level":3,"title":"select标签","slug":"select标签","link":"#select标签","children":[]},{"level":3,"title":"insert标签","slug":"insert标签","link":"#insert标签","children":[]},{"level":3,"title":"update标签","slug":"update标签","link":"#update标签","children":[]},{"level":3,"title":"delete标签","slug":"delete标签","link":"#delete标签","children":[]},{"level":3,"title":"resultType属性","slug":"resulttype属性","link":"#resulttype属性","children":[]},{"level":3,"title":"parameterType属性","slug":"parametertype属性","link":"#parametertype属性","children":[]}]},{"level":2,"title":"动态sql语句","slug":"动态sql语句","link":"#动态sql语句","children":[{"level":3,"title":"where标签","slug":"where标签","link":"#where标签","children":[]},{"level":3,"title":"if标签","slug":"if标签","link":"#if标签","children":[]},{"level":3,"title":"foreach标签","slug":"foreach标签","link":"#foreach标签","children":[]},{"level":3,"title":"sql/include标签","slug":"sql-include标签","link":"#sql-include标签","children":[]}]},{"level":2,"title":"层级关系","slug":"层级关系","link":"#层级关系","children":[]},{"level":2,"title":"environments标签","slug":"environments标签","link":"#environments标签","children":[]},{"level":2,"title":"mappers标签","slug":"mappers标签","link":"#mappers标签","children":[{"level":3,"title":"mapper标签","slug":"mapper标签","link":"#mapper标签","children":[]}]},{"level":2,"title":"properties标签","slug":"properties标签","link":"#properties标签","children":[]},{"level":2,"title":"typeAliases标签","slug":"typealiases标签","link":"#typealiases标签","children":[{"level":3,"title":"typeAlias标签","slug":"typealias标签","link":"#typealias标签","children":[]}]},{"level":2,"title":"typeHandlers标签","slug":"typehandlers标签","link":"#typehandlers标签","children":[{"level":3,"title":"typeHandler标签","slug":"typehandler标签","link":"#typehandler标签","children":[]}]},{"level":2,"title":"plugins标签","slug":"plugins标签","link":"#plugins标签","children":[]},{"level":2,"title":"SqlSessionFactoryBuilder","slug":"sqlsessionfactorybuilder","link":"#sqlsessionfactorybuilder","children":[]},{"level":2,"title":"SqlSessionFactory","slug":"sqlsessionfactory","link":"#sqlsessionfactory","children":[]},{"level":2,"title":"SqlSession","slug":"sqlsession","link":"#sqlsession","children":[]},{"level":2,"title":"传统实现方式","slug":"传统实现方式","link":"#传统实现方式","children":[]},{"level":2,"title":"代理实现方式","slug":"代理实现方式","link":"#代理实现方式","children":[]},{"level":2,"title":"一对一查询配置","slug":"一对一查询配置","link":"#一对一查询配置","children":[]},{"level":2,"title":"多对一查询配置","slug":"多对一查询配置","link":"#多对一查询配置","children":[]},{"level":2,"title":"多对多查询配置","slug":"多对多查询配置","link":"#多对多查询配置","children":[]},{"level":2,"title":"一对一关系查询","slug":"一对一关系查询","link":"#一对一关系查询","children":[]},{"level":2,"title":"一对多关系查询","slug":"一对多关系查询","link":"#一对多关系查询","children":[]},{"level":2,"title":"多对多关系查询","slug":"多对多关系查询","link":"#多对多关系查询","children":[]}],"git":{"createdTime":1659198112000,"updatedTime":1659198112000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":12.11,"words":3633},"filePathRelative":"writings/archive/MyBatis.md","localizedDate":"2022年7月30日","excerpt":"<h1> MyBatis简介</h1>\\n<h2> 原始jdbc操作</h2>\\n<ol>\\n<li>注册驱动<code>Class.forName(\\"com.mysql.cj.jdbc.Driver\\");</code></li>\\n<li>获取连接<code>DriverManager.getConnection(url, user, password);</code></li>\\n<li>从连接中获取Statement</li>\\n<li>执行查询<code>statement.excuteQuery()</code></li>\\n<li>遍历结果集封装实体</li>\\n<li>释放各种资源</li>\\n</ol>","autoDesc":true}');export{e as data};