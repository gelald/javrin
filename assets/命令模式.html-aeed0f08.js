const t=JSON.parse('{"key":"v-ad3c9180","path":"/writings/pattern/%E5%91%BD%E4%BB%A4%E6%A8%A1%E5%BC%8F.html","title":"命令模式","lang":"zh-CN","frontmatter":{"description":"命令模式 定义：对命令的封装，每一个命令都是一个操作，请求的一方发出请求要求执行一个操作；接收的一方收到请求并执行操作 在一般的系统中，行为请求者和行为实现者通常是一种紧耦合关系，因为这样做的方式简单明了。但是这种做法往往缺乏扩展性，当这些行为需要被记录、被撤销等，只能修改源码，命令模式在请求和实现中间加入一个抽象命令接口，解耦了请求与实现 本质：解耦命令请求与处理 适用场景： 现实语义中具体“命令”含义的操作 需要支持宏操作（命令组合操作） 请求调用者和请求接收者需要解耦","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/pattern/%E5%91%BD%E4%BB%A4%E6%A8%A1%E5%BC%8F.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"命令模式"}],["meta",{"property":"og:description","content":"命令模式 定义：对命令的封装，每一个命令都是一个操作，请求的一方发出请求要求执行一个操作；接收的一方收到请求并执行操作 在一般的系统中，行为请求者和行为实现者通常是一种紧耦合关系，因为这样做的方式简单明了。但是这种做法往往缺乏扩展性，当这些行为需要被记录、被撤销等，只能修改源码，命令模式在请求和实现中间加入一个抽象命令接口，解耦了请求与实现 本质：解耦命令请求与处理 适用场景： 现实语义中具体“命令”含义的操作 需要支持宏操作（命令组合操作） 请求调用者和请求接收者需要解耦"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-01T07:27:35.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:modified_time","content":"2023-03-01T07:27:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"命令模式\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-03-01T07:27:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]},{"level":2,"title":"命令模式在源码中的体现","slug":"命令模式在源码中的体现","link":"#命令模式在源码中的体现","children":[{"level":3,"title":"JDK","slug":"jdk","link":"#jdk","children":[]}]}],"git":{"createdTime":1677655655000,"updatedTime":1677655655000,"contributors":[{"name":"wuyingbin","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":2.47,"words":742},"filePathRelative":"writings/pattern/命令模式.md","localizedDate":"2023年3月1日","excerpt":"<h1> 命令模式</h1>\\n<p>定义：对命令的封装，每一个命令都是一个操作，请求的一方发出请求要求执行一个操作；接收的一方收到请求并执行操作</p>\\n<p>在一般的系统中，行为请求者和行为实现者通常是一种紧耦合关系，因为这样做的方式简单明了。但是这种做法往往缺乏扩展性，当这些行为需要被记录、被撤销等，只能修改源码，命令模式在请求和实现中间加入一个抽象命令接口，解耦了请求与实现</p>\\n<p>本质：解耦命令请求与处理</p>\\n<p>适用场景：</p>\\n<ol>\\n<li>现实语义中具体“命令”含义的操作</li>\\n<li>需要支持宏操作（命令组合操作）</li>\\n<li>请求调用者和请求接收者需要解耦</li>\\n</ol>","autoDesc":true}');export{t as data};
