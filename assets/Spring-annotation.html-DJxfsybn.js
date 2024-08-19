import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a as o}from"./app-D62f3oGG.js";const a={},i=o('<h2 id="component-和-bean-的区别" tabindex="-1"><a class="header-anchor" href="#component-和-bean-的区别"><span>@Component 和 @Bean 的区别</span></a></h2><p><code>@Component</code> 注解是一个通用的注解，可以作用在任何想交给 SpringIoC 容器管理的类上，Spring 会自动创建这个类的实例对象注入 IoC 容器中</p><p><code>@Bean</code> 注解是用于<strong>配置类</strong>中声明一个 Bean 的，用于配置类的方法上面，表示把这个方法返回的对象注册到 IoC 容器中，可以自定义 Bean 的创建和初始化过程，包括 Bean 名称、作用域、依赖等</p><ol><li>用途不同： <ul><li><code>@Component</code> 注解用于标识一个想交给 SpringIoC 容器管理的类，Spring 会通过 <code>@ComponentScan</code> 注解扫描这些被修饰的类，自动创建这些类的实例对象并注册到 IoC 容器中</li><li><code>@Bean</code> 注解用于配置类中声明和配置 Bean 对象，表示把方法返回的对象注册到 IoC 容器中</li></ul></li><li>控制权不同： <ul><li><code>@Component</code> 修饰的类是通过 Spring 框架来创建和初始化的</li><li><code>@Bean</code> 修饰的方法返回的对象是由开发人员手动控制 Bean 的创建和配置过程</li></ul></li></ol>',4),r=[i];function p(c,l){return t(),n("div",null,r)}const g=e(a,[["render",p],["__file","Spring-annotation.html.vue"]]),s=JSON.parse('{"path":"/writings/Spring/Spring-annotation.html","title":"","lang":"zh-CN","frontmatter":{"description":"@Component 和 @Bean 的区别 @Component 注解是一个通用的注解，可以作用在任何想交给 SpringIoC 容器管理的类上，Spring 会自动创建这个类的实例对象注入 IoC 容器中 @Bean 注解是用于配置类中声明一个 Bean 的，用于配置类的方法上面，表示把这个方法返回的对象注册到 IoC 容器中，可以自定义 Bean...","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/Spring/Spring-annotation.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:description","content":"@Component 和 @Bean 的区别 @Component 注解是一个通用的注解，可以作用在任何想交给 SpringIoC 容器管理的类上，Spring 会自动创建这个类的实例对象注入 IoC 容器中 @Bean 注解是用于配置类中声明一个 Bean 的，用于配置类的方法上面，表示把这个方法返回的对象注册到 IoC 容器中，可以自定义 Bean..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-15T14:23:03.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:modified_time","content":"2023-06-15T14:23:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-15T14:23:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"@Component 和 @Bean 的区别","slug":"component-和-bean-的区别","link":"#component-和-bean-的区别","children":[]}],"git":{"createdTime":1686838983000,"updatedTime":1686838983000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":0.92,"words":275},"filePathRelative":"writings/Spring/Spring-annotation.md","localizedDate":"2023年6月15日","autoDesc":true}');export{g as comp,s as data};
