const t=JSON.parse('{"key":"v-5244e0c9","path":"/writings/Spring/pretty-controller.html","title":"Controller 就该这么写","lang":"zh-CN","frontmatter":{"title":"Controller 就该这么写","icon":"article","isOriginal":true,"category":["框架","coding","文章"],"tag":["SpringMVC","问题解决","优化"],"description":"一个优秀的 Controller 层逻辑 说到 Controller，相信大家都不陌生，它可以很方便地对外提供数据接口。它的定位，我认为是「不可或缺的配角」，说它不可或缺是因为无论是传统的三层架构还是现在的COLA架构，Controller 层依旧有一席之地，说明他的必要性；说它是配角是因为 Controller 层的代码一般是不负责具体的逻辑业务逻辑实现，但是它负责接收和响应请求 从现状看问题 Controller 主要的工作有以下几项 接收请求并解析参数 调用 Service 执行具体的业务代码（可能包含参数校验） 捕获业务逻辑异常做出反馈 业务逻辑执行成功做出响应","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/Spring/pretty-controller.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"Controller 就该这么写"}],["meta",{"property":"og:description","content":"一个优秀的 Controller 层逻辑 说到 Controller，相信大家都不陌生，它可以很方便地对外提供数据接口。它的定位，我认为是「不可或缺的配角」，说它不可或缺是因为无论是传统的三层架构还是现在的COLA架构，Controller 层依旧有一席之地，说明他的必要性；说它是配角是因为 Controller 层的代码一般是不负责具体的逻辑业务逻辑实现，但是它负责接收和响应请求 从现状看问题 Controller 主要的工作有以下几项 接收请求并解析参数 调用 Service 执行具体的业务代码（可能包含参数校验） 捕获业务逻辑异常做出反馈 业务逻辑执行成功做出响应"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-28T15:46:06.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:tag","content":"SpringMVC"}],["meta",{"property":"article:tag","content":"问题解决"}],["meta",{"property":"article:tag","content":"优化"}],["meta",{"property":"article:modified_time","content":"2023-02-28T15:46:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Controller 就该这么写\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-02-28T15:46:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"从现状看问题","slug":"从现状看问题","link":"#从现状看问题","children":[]},{"level":2,"title":"改造 Controller 层逻辑","slug":"改造-controller-层逻辑","link":"#改造-controller-层逻辑","children":[{"level":3,"title":"统一返回结构","slug":"统一返回结构","link":"#统一返回结构","children":[]},{"level":3,"title":"统一包装处理","slug":"统一包装处理","link":"#统一包装处理","children":[]},{"level":3,"title":"处理 cannot be cast to java.lang.String 问题","slug":"处理-cannot-be-cast-to-java-lang-string-问题","link":"#处理-cannot-be-cast-to-java-lang-string-问题","children":[]},{"level":3,"title":"参数校验","slug":"参数校验","link":"#参数校验","children":[]},{"level":3,"title":"自定义异常与统一拦截异常","slug":"自定义异常与统一拦截异常","link":"#自定义异常与统一拦截异常","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1659369419000,"updatedTime":1677599166000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":3},{"name":"wuyingbin","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":12.69,"words":3806},"filePathRelative":"writings/Spring/pretty-controller.md","localizedDate":"2022年8月1日","excerpt":"<h1> 一个优秀的 Controller 层逻辑</h1>\\n<blockquote>\\n<p>说到 Controller，相信大家都不陌生，它可以很方便地对外提供数据接口。它的定位，我认为是「不可或缺的配角」，说它不可或缺是因为无论是传统的三层架构还是现在的COLA架构，Controller\\n层依旧有一席之地，说明他的必要性；说它是配角是因为 Controller 层的代码一般是不负责具体的逻辑业务逻辑实现，但是它负责接收和响应请求</p>\\n</blockquote>\\n<h2> 从现状看问题</h2>\\n<p>Controller 主要的工作有以下几项</p>\\n<ul>\\n<li>接收请求并解析参数</li>\\n<li>调用 Service 执行具体的业务代码（可能包含参数校验）</li>\\n<li>捕获业务逻辑异常做出反馈</li>\\n<li>业务逻辑执行成功做出响应</li>\\n</ul>","autoDesc":true}');export{t as data};
