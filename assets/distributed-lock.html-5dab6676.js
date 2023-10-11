const e=JSON.parse('{"key":"v-05d98039","path":"/writings/distributed/distributed-lock.html","title":"分布式锁","lang":"zh-CN","frontmatter":{"title":"分布式锁","icon":"article","category":["分布式"],"tag":["锁"],"description":"分布式锁 在 Java 并发编程中，我们会通过锁来避免由于竞争而造成的数据不一致的问题，如 synchronized 、Lock 但是在分布式集群工作的开发场景下，多线程会分布在不同机器上，这使得原本单机部署单体架构的并发控制锁策略失效！ 为了实现跨 JVM 的互斥机制来控制资源共享的功能，需要使用分布式锁 概念 锁，解决的是多线程情况下的数据一致性的问题","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/distributed/distributed-lock.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"分布式锁"}],["meta",{"property":"og:description","content":"分布式锁 在 Java 并发编程中，我们会通过锁来避免由于竞争而造成的数据不一致的问题，如 synchronized 、Lock 但是在分布式集群工作的开发场景下，多线程会分布在不同机器上，这使得原本单机部署单体架构的并发控制锁策略失效！ 为了实现跨 JVM 的互斥机制来控制资源共享的功能，需要使用分布式锁 概念 锁，解决的是多线程情况下的数据一致性的问题"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-01T12:32:48.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:tag","content":"锁"}],["meta",{"property":"article:modified_time","content":"2023-03-01T12:32:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"分布式锁\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-03-01T12:32:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"概念","slug":"概念","link":"#概念","children":[]},{"level":2,"title":"分布式锁注意事项","slug":"分布式锁注意事项","link":"#分布式锁注意事项","children":[]},{"level":2,"title":"分布式锁解决方案","slug":"分布式锁解决方案","link":"#分布式锁解决方案","children":[{"level":3,"title":"基于数据库","slug":"基于数据库","link":"#基于数据库","children":[]},{"level":3,"title":"基于 Redis","slug":"基于-redis","link":"#基于-redis","children":[]},{"level":3,"title":"基于 ZooKeeper","slug":"基于-zookeeper","link":"#基于-zookeeper","children":[]}]}],"git":{"createdTime":1660809766000,"updatedTime":1677673968000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":4}]},"readingTime":{"minutes":3.57,"words":1072},"filePathRelative":"writings/distributed/distributed-lock.md","localizedDate":"2022年8月18日","excerpt":"<h1> 分布式锁</h1>\\n<blockquote>\\n<p>在 Java 并发编程中，我们会通过<strong>锁</strong>来避免由于竞争而造成的<strong>数据不一致的问题</strong>，如 <code>synchronized</code> 、<code>Lock</code></p>\\n<p>但是在分布式集群工作的开发场景下，多线程会分布在不同机器上，这使得原本单机部署单体架构的并发控制锁策略失效！</p>\\n<p>为了实现跨 JVM 的互斥机制来控制资源共享的功能，需要使用分布式锁</p>\\n</blockquote>\\n<h2> 概念</h2>\\n<p>锁，解决的是多线程情况下的数据一致性的问题</p>","autoDesc":true}');export{e as data};
