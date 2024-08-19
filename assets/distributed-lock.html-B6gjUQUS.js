import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as i}from"./app-D62f3oGG.js";const r={},l=i('<h1 id="分布式锁" tabindex="-1"><a class="header-anchor" href="#分布式锁"><span>分布式锁</span></a></h1><blockquote><p>在 Java 并发编程中，我们会通过<strong>锁</strong>来避免由于竞争而造成的<strong>数据不一致的问题</strong>，如 <code>synchronized</code> 、<code>Lock</code></p><p>但是在分布式集群工作的开发场景下，多线程会分布在不同机器上，这使得原本单机部署单体架构的并发控制锁策略失效！</p><p>为了实现跨 JVM 的互斥机制来控制资源共享的功能，需要使用分布式锁</p></blockquote><h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念"><span>概念</span></a></h2><p>锁，解决的是多线程情况下的数据一致性的问题</p><p>分布式锁，解决的是分布式集群下的数据一致性的问题，它是控制分布式系统<strong>同步访问共享资源</strong>的一种方式</p><h2 id="分布式锁注意事项" tabindex="-1"><a class="header-anchor" href="#分布式锁注意事项"><span>分布式锁注意事项</span></a></h2><p>在<strong>实现</strong>分布式锁的过程中需要注意的：</p><ul><li>锁的可重入性（递归调用不应该被阻塞、避免死锁）</li><li>锁的超时（避免死锁、死循环等意外情况）</li><li>锁的阻塞（保证原子性等）</li><li>锁的特性支持（阻塞锁、可重入锁、公平锁、联锁、信号量、读写锁）</li></ul><p>在<strong>使用</strong>分布式锁时需要注意：</p><ul><li>分布式锁的开销（分布式锁一般能不用就不用，有些场景可以用乐观锁代替）</li><li>加锁的粒度（控制加锁的粒度，可以优化系统的性能）</li><li>加锁的方式</li></ul><h2 id="分布式锁解决方案" tabindex="-1"><a class="header-anchor" href="#分布式锁解决方案"><span>分布式锁解决方案</span></a></h2><h3 id="基于数据库" tabindex="-1"><a class="header-anchor" href="#基于数据库"><span>基于数据库</span></a></h3><p>基于数据库的分布式锁比较容易理解，但是操作数据库会有一定的性能问题</p><h4 id="基于数据库表" tabindex="-1"><a class="header-anchor" href="#基于数据库表"><span>基于数据库表</span></a></h4><ul><li><p>原理</p><p>创建一张锁表，并且给某个字段添加唯一性约束。当需要锁住资源时，就增加一条记录；当需要释放锁的时候，就删除这条记录；唯一性约束可以保证多个请求同时提交到数据库时<strong>有且只有一条记录会被插入成功</strong>，那么操作成功的那个线程也就获得了锁，可以执行业务</p></li><li><p>不足</p><p>无失效时间、不阻塞、不可重入</p></li></ul><h4 id="基于数据库排他锁" tabindex="-1"><a class="header-anchor" href="#基于数据库排他锁"><span>基于数据库排他锁</span></a></h4><ul><li><p>原理</p><p>如果使用的是 InnoDB 存储引擎，在查询语句（通过唯一索引进行查询）后面加 <code>for update</code> ，当前线程就成功获取了这个表的排他锁，只有这个线程可以任意读取修改数据，其他线程只能读取无法修改</p></li><li><p>不足</p><p>不可重入、无法保证一定使用行锁（如果没有使用唯一索引，将会把整个表锁住）、排他锁长时间不提交导致占用数据库连接影响正常业务</p></li></ul><h3 id="基于-redis" tabindex="-1"><a class="header-anchor" href="#基于-redis"><span>基于 Redis</span></a></h3><p>相比于数据库的实现方式，缓存的实现方式在性能方面表现得更好一点。<strong>通过超时时间来控制锁的失效时间</strong></p><h4 id="基于-redis-的-setnx-方法-lua-脚本" tabindex="-1"><a class="header-anchor" href="#基于-redis-的-setnx-方法-lua-脚本"><span>基于 Redis 的 setnx 方法 + Lua 脚本</span></a></h4><ul><li>获取锁：使用 setnx 进行原子性操作</li><li>释放锁：检查 key 是否存在，且 key 对应的值是否和指定的值一样，一样才能释放锁</li></ul><h4 id="基于-redlock-算法" tabindex="-1"><a class="header-anchor" href="#基于-redlock-算法"><span>基于 RedLock 算法</span></a></h4><ul><li>集群模式下的 Redis 分布式锁，基于 N 个完全独立的 Redis 节点</li></ul><h3 id="基于-zookeeper" tabindex="-1"><a class="header-anchor" href="#基于-zookeeper"><span>基于 ZooKeeper</span></a></h3><ul><li>获取锁：在 ZooKeeper 中指定的目录下创建一个临时有序节点；如果这个节点不是这个目录下序号最小的节点，那么需要等待前一个节点删除</li><li>释放锁：把这个临时节点删除，因为临时节点的生命周期是和会话的生命周期一致的，所以当服务宕机时，锁也会自动释放，避免产生死锁问题</li><li>不足：ZooKeeper 中创建和删除节点只能通过 Leader 服务器来执行，然后 Leader 服务器还需要把数据同步到所有的 Follower 服务器上，这样频繁的网络通信，性能不如缓存</li></ul><p>在正常情况下，ZooKeeper 实现的分布式锁，客户端可以持有锁<strong>任意长的时间</strong>，这可以确保它做完所有需要的资源访问操作之后再释放锁。这避免了基于 Redis 的锁对于有效时间 (lock validity time) 到底设置多长的两难问题。</p>',26),o=[l];function n(s,d){return a(),t("div",null,o)}const h=e(r,[["render",n],["__file","distributed-lock.html.vue"]]),u=JSON.parse('{"path":"/writings/distributed/distributed-lock.html","title":"分布式锁","lang":"zh-CN","frontmatter":{"title":"分布式锁","icon":"article","category":["分布式"],"tag":["锁"],"description":"分布式锁 在 Java 并发编程中，我们会通过锁来避免由于竞争而造成的数据不一致的问题，如 synchronized 、Lock 但是在分布式集群工作的开发场景下，多线程会分布在不同机器上，这使得原本单机部署单体架构的并发控制锁策略失效！ 为了实现跨 JVM 的互斥机制来控制资源共享的功能，需要使用分布式锁 概念 锁，解决的是多线程情况下的数据一致性的...","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/distributed/distributed-lock.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"分布式锁"}],["meta",{"property":"og:description","content":"分布式锁 在 Java 并发编程中，我们会通过锁来避免由于竞争而造成的数据不一致的问题，如 synchronized 、Lock 但是在分布式集群工作的开发场景下，多线程会分布在不同机器上，这使得原本单机部署单体架构的并发控制锁策略失效！ 为了实现跨 JVM 的互斥机制来控制资源共享的功能，需要使用分布式锁 概念 锁，解决的是多线程情况下的数据一致性的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-01T12:32:48.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:tag","content":"锁"}],["meta",{"property":"article:modified_time","content":"2023-03-01T12:32:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"分布式锁\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-03-01T12:32:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"概念","slug":"概念","link":"#概念","children":[]},{"level":2,"title":"分布式锁注意事项","slug":"分布式锁注意事项","link":"#分布式锁注意事项","children":[]},{"level":2,"title":"分布式锁解决方案","slug":"分布式锁解决方案","link":"#分布式锁解决方案","children":[{"level":3,"title":"基于数据库","slug":"基于数据库","link":"#基于数据库","children":[]},{"level":3,"title":"基于 Redis","slug":"基于-redis","link":"#基于-redis","children":[]},{"level":3,"title":"基于 ZooKeeper","slug":"基于-zookeeper","link":"#基于-zookeeper","children":[]}]}],"git":{"createdTime":null,"updatedTime":1677673968000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":4}]},"readingTime":{"minutes":3.57,"words":1072},"filePathRelative":"writings/distributed/distributed-lock.md","autoDesc":true}');export{h as comp,u as data};
