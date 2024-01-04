const e=JSON.parse('{"key":"v-6ad7909c","path":"/writings/RocketMQ/RocketMQ-theory-2.html","title":"RocketMQ 原理分析-2","lang":"zh-CN","frontmatter":{"title":"RocketMQ 原理分析-2","icon":"article","category":["干货","消息队列"],"tag":["原理","RocketMQ"],"description":"RocketMQ 原理分析-2 本篇原理分析主要讲解消息存储与读取方面 RocketMQ 如何存储消息 消息发送到 RocketMQ 后，为了保证消息不会丢失，RocketMQ 会把消息内容存储到磁盘文件中，主要的存储文件包括 CommitLog、ConsumeQueue、IndexFile 文件 CommitLog CommitLog 文件存储消息内容及消息总长度，其中消息总长度固定 4 个字节。","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/RocketMQ/RocketMQ-theory-2.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"RocketMQ 原理分析-2"}],["meta",{"property":"og:description","content":"RocketMQ 原理分析-2 本篇原理分析主要讲解消息存储与读取方面 RocketMQ 如何存储消息 消息发送到 RocketMQ 后，为了保证消息不会丢失，RocketMQ 会把消息内容存储到磁盘文件中，主要的存储文件包括 CommitLog、ConsumeQueue、IndexFile 文件 CommitLog CommitLog 文件存储消息内容及消息总长度，其中消息总长度固定 4 个字节。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-04T10:49:34.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:tag","content":"原理"}],["meta",{"property":"article:tag","content":"RocketMQ"}],["meta",{"property":"article:modified_time","content":"2023-03-04T10:49:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"RocketMQ 原理分析-2\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-03-04T10:49:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"RocketMQ 如何存储消息","slug":"rocketmq-如何存储消息","link":"#rocketmq-如何存储消息","children":[{"level":3,"title":"CommitLog","slug":"commitlog","link":"#commitlog","children":[]},{"level":3,"title":"ConsumeQueue","slug":"consumequeue","link":"#consumequeue","children":[]},{"level":3,"title":"IndexFile","slug":"indexfile","link":"#indexfile","children":[]}]},{"level":2,"title":"RocketMQ 如何对文件进行读写","slug":"rocketmq-如何对文件进行读写","link":"#rocketmq-如何对文件进行读写","children":[{"level":3,"title":"ConsumeQueue 文件","slug":"consumequeue-文件","link":"#consumequeue-文件","children":[]},{"level":3,"title":"page cache","slug":"page-cache","link":"#page-cache","children":[]},{"level":3,"title":"CommitLog 文件","slug":"commitlog-文件","link":"#commitlog-文件","children":[]},{"level":3,"title":"零拷贝","slug":"零拷贝","link":"#零拷贝","children":[]}]},{"level":2,"title":"RocketMQ 消费者如何拉取消息","slug":"rocketmq-消费者如何拉取消息","link":"#rocketmq-消费者如何拉取消息","children":[]},{"level":2,"title":"RocketMQ 如何保证负载均衡","slug":"rocketmq-如何保证负载均衡","link":"#rocketmq-如何保证负载均衡","children":[{"level":3,"title":"生产者的负载均衡","slug":"生产者的负载均衡","link":"#生产者的负载均衡","children":[]},{"level":3,"title":"消费者负载均衡","slug":"消费者负载均衡","link":"#消费者负载均衡","children":[]}]},{"level":2,"title":"RocketMQ 高可用机制","slug":"rocketmq-高可用机制","link":"#rocketmq-高可用机制","children":[{"level":3,"title":"异步复制会不会也像异步刷盘那样影响消息的可靠性呢？","slug":"异步复制会不会也像异步刷盘那样影响消息的可靠性呢","link":"#异步复制会不会也像异步刷盘那样影响消息的可靠性呢","children":[]},{"level":3,"title":"一般做法","slug":"一般做法","link":"#一般做法","children":[]}]}],"git":{"createdTime":1677926974000,"updatedTime":1677926974000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":15.59,"words":4678},"filePathRelative":"writings/RocketMQ/RocketMQ-theory-2.md","localizedDate":"2023年3月4日","excerpt":"<h1> RocketMQ 原理分析-2</h1>\\n<blockquote>\\n<p>本篇原理分析主要讲解消息存储与读取方面</p>\\n</blockquote>\\n<h2> RocketMQ 如何存储消息</h2>\\n<p>消息发送到 RocketMQ 后，为了保证消息不会丢失，RocketMQ 会把消息内容存储到磁盘文件中，主要的存储文件包括 CommitLog、ConsumeQueue、IndexFile 文件</p>\\n<h3> CommitLog</h3>\\n<p>CommitLog 文件存储消息内容及消息总长度，其中消息总长度固定 4 个字节。</p>\\n<p><img src=\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220903164152.png\\" alt=\\"\\"></p>","copyright":{"author":"gelald","license":"MIT Licensed"},"autoDesc":true}');export{e as data};