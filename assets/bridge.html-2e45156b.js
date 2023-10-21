const e=JSON.parse('{"key":"v-62771b72","path":"/writings/pattern/bridge.html","title":"桥接模式","lang":"zh-CN","frontmatter":{"title":"桥接模式","icon":"article","category":["设计模式"],"description":"桥接模式 定义：将抽象的部分与它的具体实现部分分离，使得他们都可以独立地变化。主要的目的是通过组合的方式建立两个类之间的联系，而不是继承 适用场景 在抽象和具体实现之间需要增加更多的灵活性的场景 一个类存在多个独立变化的维度，而这多个维度都需要独立进行扩展 不希望使用继承，或者因为多层继承导致系统类的数量剧增 优点： 分离抽象部分及其具体实现部分 提高了系统的扩展性 符合开闭原则 符合合成复用原则","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/pattern/bridge.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"桥接模式"}],["meta",{"property":"og:description","content":"桥接模式 定义：将抽象的部分与它的具体实现部分分离，使得他们都可以独立地变化。主要的目的是通过组合的方式建立两个类之间的联系，而不是继承 适用场景 在抽象和具体实现之间需要增加更多的灵活性的场景 一个类存在多个独立变化的维度，而这多个维度都需要独立进行扩展 不希望使用继承，或者因为多层继承导致系统类的数量剧增 优点： 分离抽象部分及其具体实现部分 提高了系统的扩展性 符合开闭原则 符合合成复用原则"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-01T07:27:35.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:modified_time","content":"2023-03-01T07:27:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"桥接模式\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-03-01T07:27:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]},{"level":2,"title":"桥接模式在源码中的体现","slug":"桥接模式在源码中的体现","link":"#桥接模式在源码中的体现","children":[{"level":3,"title":"DriverManager","slug":"drivermanager","link":"#drivermanager","children":[]}]},{"level":2,"title":"桥接模式和组合模式的区别","slug":"桥接模式和组合模式的区别","link":"#桥接模式和组合模式的区别","children":[]},{"level":2,"title":"桥接模式和适配器模式的区别","slug":"桥接模式和适配器模式的区别","link":"#桥接模式和适配器模式的区别","children":[]}],"git":{"createdTime":1677655655000,"updatedTime":1677655655000,"contributors":[{"name":"wuyingbin","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":4.05,"words":1216},"filePathRelative":"writings/pattern/bridge.md","localizedDate":"2023年3月1日","excerpt":"<h1> 桥接模式</h1>\\n<p>定义：将抽象的部分与它的具体实现部分分离，使得他们都可以独立地变化。主要的目的是通过组合的方式建立两个类之间的联系，而不是继承</p>\\n<p>适用场景</p>\\n<ol>\\n<li>在抽象和具体实现之间需要增加更多的灵活性的场景</li>\\n<li>一个类存在多个独立变化的维度，而这多个维度都需要独立进行扩展</li>\\n<li>不希望使用继承，或者因为多层继承导致系统类的数量剧增</li>\\n</ol>\\n<p>优点：</p>\\n<ol>\\n<li>分离抽象部分及其具体实现部分</li>\\n<li>提高了系统的扩展性</li>\\n<li>符合开闭原则</li>\\n<li>符合合成复用原则</li>\\n</ol>","autoDesc":true}');export{e as data};