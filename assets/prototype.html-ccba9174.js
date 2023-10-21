const e=JSON.parse('{"key":"v-b6bf2d96","path":"/writings/pattern/prototype.html","title":"原型模式","lang":"zh-CN","frontmatter":{"title":"原型模式","icon":"article","category":["设计模式"],"description":"原型模式 定义：原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。调用者不需要关心创建细节，不调用构造方法 适用场景： 类初始化时消耗的资源较多 new关键字产生的一个对象需要非常繁琐的过程（字段较多） 循环体中生产大量对象 优点： 性能优秀，JDK 自带的原型模式是基于 内存二进制流 的拷贝，比直接 new 一个对象性能上提升了许多 可以使用深克隆方式保存对象的状态，使用原型模式将对象复制一份并将其状态保存起来，简化了创建过程","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/pattern/prototype.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"原型模式"}],["meta",{"property":"og:description","content":"原型模式 定义：原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。调用者不需要关心创建细节，不调用构造方法 适用场景： 类初始化时消耗的资源较多 new关键字产生的一个对象需要非常繁琐的过程（字段较多） 循环体中生产大量对象 优点： 性能优秀，JDK 自带的原型模式是基于 内存二进制流 的拷贝，比直接 new 一个对象性能上提升了许多 可以使用深克隆方式保存对象的状态，使用原型模式将对象复制一份并将其状态保存起来，简化了创建过程"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-01T07:27:35.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:modified_time","content":"2023-03-01T07:27:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"原型模式\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-03-01T07:27:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"浅克隆写法","slug":"浅克隆写法","link":"#浅克隆写法","children":[]},{"level":2,"title":"深克隆写法","slug":"深克隆写法","link":"#深克隆写法","children":[]},{"level":2,"title":"原型模式在源码中的体现","slug":"原型模式在源码中的体现","link":"#原型模式在源码中的体现","children":[{"level":3,"title":"ArrayList","slug":"arraylist","link":"#arraylist","children":[]},{"level":3,"title":"HashMap","slug":"hashmap","link":"#hashmap","children":[]}]}],"git":{"createdTime":1677655655000,"updatedTime":1677655655000,"contributors":[{"name":"wuyingbin","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":3.02,"words":907},"filePathRelative":"writings/pattern/prototype.md","localizedDate":"2023年3月1日","excerpt":"<h1> 原型模式</h1>\\n<p>定义：原型实例指定创建对象的种类，并且通过<strong>拷贝</strong>这些原型创建新的对象。调用者不需要关心创建细节，不调用构造方法</p>\\n<p>适用场景：</p>\\n<ol>\\n<li>类初始化时消耗的资源较多</li>\\n<li><code>new</code>关键字产生的一个对象需要非常繁琐的过程（字段较多）</li>\\n<li>循环体中生产大量对象</li>\\n</ol>\\n<p>优点：</p>\\n<ol>\\n<li>\\n<p>性能优秀，JDK 自带的原型模式是基于 <code>内存二进制流</code> 的拷贝，比直接 <code>new</code> 一个对象性能上提升了许多</p>\\n</li>\\n<li>\\n<p>可以使用深克隆方式保存对象的状态，使用原型模式将对象复制一份并将其状态保存起来，简化了创建过程</p>\\n</li>\\n</ol>","autoDesc":true}');export{e as data};