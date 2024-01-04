const e=JSON.parse('{"key":"v-c19a37b2","path":"/writings/archive/IO.html","title":"系统调用函数","lang":"zh-CN","frontmatter":{"description":"系统调用函数 recvfrom Linux系统提供给用户用于接收网络IO的系统接口。从套接字上接收一个消息 如果此系统调用返回值&lt;0，并且 errno为EWOULDBLOCK或EAGAIN（套接字已标记为非阻塞，而接收操作被阻塞或者接收超时 ）时，连接正常，阻塞接收数据（这很关键，前4种IO模型都设计此系统调用） select 系统调用允许程序同时在多个底层文件描述符上，等待输入的到达或输出的完成。以数组形式存储文件描述符，64位机器默认2048个。当有数据准备好时，无法感知具体是哪个流OK了，所以需要一个一个的遍历，函数的时间复杂度为O(n)","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/archive/IO.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"系统调用函数"}],["meta",{"property":"og:description","content":"系统调用函数 recvfrom Linux系统提供给用户用于接收网络IO的系统接口。从套接字上接收一个消息 如果此系统调用返回值&lt;0，并且 errno为EWOULDBLOCK或EAGAIN（套接字已标记为非阻塞，而接收操作被阻塞或者接收超时 ）时，连接正常，阻塞接收数据（这很关键，前4种IO模型都设计此系统调用） select 系统调用允许程序同时在多个底层文件描述符上，等待输入的到达或输出的完成。以数组形式存储文件描述符，64位机器默认2048个。当有数据准备好时，无法感知具体是哪个流OK了，所以需要一个一个的遍历，函数的时间复杂度为O(n)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-30T16:21:52.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:modified_time","content":"2022-07-30T16:21:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"系统调用函数\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-30T16:21:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"recvfrom","slug":"recvfrom","link":"#recvfrom","children":[]},{"level":2,"title":"select","slug":"select","link":"#select","children":[{"level":3,"title":"select函数的缺陷","slug":"select函数的缺陷","link":"#select函数的缺陷","children":[]}]},{"level":2,"title":"poll","slug":"poll","link":"#poll","children":[]},{"level":2,"title":"epoll","slug":"epoll","link":"#epoll","children":[{"level":3,"title":"epoll解决select函数缺陷的方式","slug":"epoll解决select函数缺陷的方式","link":"#epoll解决select函数缺陷的方式","children":[]}]},{"level":2,"title":"sigaction","slug":"sigaction","link":"#sigaction","children":[]},{"level":2,"title":"阻塞IO模型","slug":"阻塞io模型","link":"#阻塞io模型","children":[]},{"level":2,"title":"非阻塞IO模型","slug":"非阻塞io模型","link":"#非阻塞io模型","children":[]},{"level":2,"title":"IO多路复用模型","slug":"io多路复用模型","link":"#io多路复用模型","children":[{"level":3,"title":"服务端代码","slug":"服务端代码","link":"#服务端代码","children":[]}]},{"level":2,"title":"信号驱动IO模型","slug":"信号驱动io模型","link":"#信号驱动io模型","children":[]},{"level":2,"title":"异步IO模型","slug":"异步io模型","link":"#异步io模型","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[{"level":3,"title":"IO模型的发展经历","slug":"io模型的发展经历","link":"#io模型的发展经历","children":[]}]},{"level":2,"title":"实现过程","slug":"实现过程","link":"#实现过程","children":[]},{"level":2,"title":"实现原理","slug":"实现原理","link":"#实现原理","children":[]},{"level":2,"title":"适用场景","slug":"适用场景","link":"#适用场景","children":[]},{"level":2,"title":"实现原理","slug":"实现原理-1","link":"#实现原理-1","children":[]},{"level":2,"title":"适用场景","slug":"适用场景-1","link":"#适用场景-1","children":[]},{"level":2,"title":"重要角色","slug":"重要角色","link":"#重要角色","children":[{"level":3,"title":"缓冲区Buffer","slug":"缓冲区buffer","link":"#缓冲区buffer","children":[]},{"level":3,"title":"通道Channel","slug":"通道channel","link":"#通道channel","children":[]},{"level":3,"title":"多路复用器Selector","slug":"多路复用器selector","link":"#多路复用器selector","children":[]}]},{"level":2,"title":"实现原理","slug":"实现原理-2","link":"#实现原理-2","children":[]},{"level":2,"title":"适用场景","slug":"适用场景-2","link":"#适用场景-2","children":[]}],"git":{"createdTime":1659198112000,"updatedTime":1659198112000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":12.62,"words":3785},"filePathRelative":"writings/archive/IO.md","localizedDate":"2022年7月30日","excerpt":"<h1> 系统调用函数</h1>\\n<h2> recvfrom</h2>\\n<p>Linux系统提供给用户用于接收网络IO的系统接口。从套接字上接收一个消息</p>\\n<p>如果此系统调用返回值&lt;0，并且 errno为EWOULDBLOCK或EAGAIN（套接字已标记为非阻塞，而接收操作被阻塞或者接收超时 ）时，连接正常，<strong>阻塞</strong>接收数据（这很关键，前4种IO模型都设计此系统调用）</p>\\n<h2> select</h2>\\n<p>系统调用允许程序同时在多个底层文件描述符上，等待输入的到达或输出的完成。以<strong>数组</strong>形式存储文件描述符，64位机器默认<strong>2048</strong>个。当有数据准备好时，无法感知具体是哪个流OK了，所以需要一个一个的遍历，函数的时间复杂度为<strong>O(n)</strong></p>","copyright":{"author":"gelald","license":"MIT Licensed"},"autoDesc":true}');export{e as data};