const e=JSON.parse('{"key":"v-1b25adda","path":"/writings/distributed/distributed-lock-zookeeper.html","title":"分布式锁 ZooKeeper 实现","lang":"zh-CN","frontmatter":{"title":"分布式锁 ZooKeeper 实现","icon":"article","category":["分布式"],"tag":["锁","ZooKeeper"],"description":"分布式锁 ZooKeeper 实现 问题引入 开发时遇到一个需求：简单理解为很多个工人同时并发使用一个钳子进行工作，一个钳子在同一时间下只能被一个工人拿到并工作。 在传统单体应用架构下，我们会使用 synchronized 或者 lock 机制来解决多线程的资源竞争问题； 但是在分布式集群工作的开发场景下，多线程会分布在不同机器上，这使得原本单机部署单体架构的并发控制锁策略失效！ 为了实现跨 JVM 的互斥机制来控制资源共享的功能，需要使用分布式锁","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/distributed/distributed-lock-zookeeper.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"分布式锁 ZooKeeper 实现"}],["meta",{"property":"og:description","content":"分布式锁 ZooKeeper 实现 问题引入 开发时遇到一个需求：简单理解为很多个工人同时并发使用一个钳子进行工作，一个钳子在同一时间下只能被一个工人拿到并工作。 在传统单体应用架构下，我们会使用 synchronized 或者 lock 机制来解决多线程的资源竞争问题； 但是在分布式集群工作的开发场景下，多线程会分布在不同机器上，这使得原本单机部署单体架构的并发控制锁策略失效！ 为了实现跨 JVM 的互斥机制来控制资源共享的功能，需要使用分布式锁"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-01T12:32:48.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:tag","content":"锁"}],["meta",{"property":"article:tag","content":"ZooKeeper"}],["meta",{"property":"article:modified_time","content":"2023-03-01T12:32:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"分布式锁 ZooKeeper 实现\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-03-01T12:32:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"问题引入","slug":"问题引入","link":"#问题引入","children":[]},{"level":2,"title":"选型","slug":"选型","link":"#选型","children":[]},{"level":2,"title":"简单回顾 ZooKeeper","slug":"简单回顾-zookeeper","link":"#简单回顾-zookeeper","children":[]},{"level":2,"title":"ZooKeeper 分布式锁实现原理","slug":"zookeeper-分布式锁实现原理","link":"#zookeeper-分布式锁实现原理","children":[]},{"level":2,"title":"分布式锁应用","slug":"分布式锁应用","link":"#分布式锁应用","children":[]}],"git":{"createdTime":1677673968000,"updatedTime":1677673968000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":4.47,"words":1341},"filePathRelative":"writings/distributed/distributed-lock-zookeeper.md","localizedDate":"2023年3月1日","excerpt":"<h1> 分布式锁 ZooKeeper 实现</h1>\\n<h2> 问题引入</h2>\\n<p>开发时遇到一个需求：简单理解为很多个工人同时并发使用一个钳子进行工作，一个钳子在同一时间下只能被一个工人拿到并工作。</p>\\n<p>在传统单体应用架构下，我们会使用 <code>synchronized</code> 或者 <code>lock</code> 机制来解决多线程的资源竞争问题；</p>\\n<p>但是在分布式集群工作的开发场景下，多线程会分布在不同机器上，这使得原本单机部署单体架构的并发控制锁策略失效！</p>\\n<p>为了实现跨 JVM 的互斥机制来控制资源共享的功能，需要使用分布式锁</p>","copyright":{"author":"gelald","license":"MIT Licensed"},"autoDesc":true}');export{e as data};