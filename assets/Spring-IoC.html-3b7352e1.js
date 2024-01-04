const e=JSON.parse('{"key":"v-8a968a4e","path":"/writings/Spring/Spring-IoC.html","title":"Spring IoC 整体脉络","lang":"zh-CN","frontmatter":{"description":"Spring IoC 整体脉络 前言 我们做 Web 后台开发的，其实也可以说是 Spring 开发，因为 Spring 框架在整个 Web 开发中扮演着非常重要的角色。Spring 的引入，完全改变了开发方式，从以前的 new 关键字创建对象到如今由 Spring 容器统一管理所有对象，而后者就是 IoC （Inversion of Control）控制反转这么一种设计思想：把对象的控制权（包括创建、初始化）都交给 Spring 来处理。 此外 Spring 还有其他功能，但是种种诸如 DI、AOP，都是围绕着 IoC 来开展的，所以了解清楚 IoC 对我们学习 Spring 有极大的帮助。","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/Spring/Spring-IoC.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"Spring IoC 整体脉络"}],["meta",{"property":"og:description","content":"Spring IoC 整体脉络 前言 我们做 Web 后台开发的，其实也可以说是 Spring 开发，因为 Spring 框架在整个 Web 开发中扮演着非常重要的角色。Spring 的引入，完全改变了开发方式，从以前的 new 关键字创建对象到如今由 Spring 容器统一管理所有对象，而后者就是 IoC （Inversion of Control）控制反转这么一种设计思想：把对象的控制权（包括创建、初始化）都交给 Spring 来处理。 此外 Spring 还有其他功能，但是种种诸如 DI、AOP，都是围绕着 IoC 来开展的，所以了解清楚 IoC 对我们学习 Spring 有极大的帮助。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-27T12:37:11.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:modified_time","content":"2023-07-27T12:37:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring IoC 整体脉络\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-27T12:37:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"Spring IoC 核心角色","slug":"spring-ioc-核心角色","link":"#spring-ioc-核心角色","children":[{"level":3,"title":"Bean","slug":"bean","link":"#bean","children":[]},{"level":3,"title":"BeanDefinition","slug":"beandefinition","link":"#beandefinition","children":[]},{"level":3,"title":"BeanDefinitionReader","slug":"beandefinitionreader","link":"#beandefinitionreader","children":[]},{"level":3,"title":"BeanFactory","slug":"beanfactory","link":"#beanfactory","children":[]},{"level":3,"title":"BeanFactoryPostProcessor","slug":"beanfactorypostprocessor","link":"#beanfactorypostprocessor","children":[]},{"level":3,"title":"ApplicationContext","slug":"applicationcontext","link":"#applicationcontext","children":[]}]},{"level":2,"title":"IoC 容器初始化过程","slug":"ioc-容器初始化过程","link":"#ioc-容器初始化过程","children":[]},{"level":2,"title":"循环依赖","slug":"循环依赖","link":"#循环依赖","children":[{"level":3,"title":"三级缓存","slug":"三级缓存","link":"#三级缓存","children":[]}]}],"git":{"createdTime":1690461431000,"updatedTime":1690461431000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":2.91,"words":872},"filePathRelative":"writings/Spring/Spring-IoC.md","localizedDate":"2023年7月27日","excerpt":"<h1> Spring IoC 整体脉络</h1>\\n<h2> 前言</h2>\\n<p>我们做 Web 后台开发的，其实也可以说是 Spring 开发，因为 Spring 框架在整个 Web 开发中扮演着非常重要的角色。Spring 的引入，完全改变了开发方式，从以前的 new 关键字创建对象到如今由 Spring 容器统一管理所有对象，而后者就是 IoC （Inversion of Control）控制反转这么一种设计思想：把对象的控制权（包括创建、初始化）都交给 Spring 来处理。</p>\\n<p>此外 Spring 还有其他功能，但是种种诸如 DI、AOP，都是围绕着 IoC 来开展的，所以了解清楚 IoC 对我们学习 Spring 有极大的帮助。</p>","copyright":{"author":"gelald","license":"MIT Licensed"},"autoDesc":true}');export{e as data};