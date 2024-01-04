const e=JSON.parse('{"key":"v-30420bb2","path":"/writings/MySQL/MySQL-transaction.html","title":"MySQL 事务解析","lang":"zh-CN","frontmatter":{"title":"MySQL 事务解析","icon":"article","category":["数据库","文章"],"tag":["MySQL","事务","锁"],"description":"MySQL 事务解析 事务：一个包含多个操作的最小工作单元，这些操作要么同时成功，要么同时失败。本篇介绍事务，由于 MyISAM 存储引擎不支持事务，所以本篇默认存储引擎为 InnoDB。 事务 ACID 特性 Atomicity：原子性，一个事务内的多个操作要么全部成功，要么全部失败 Isolation：隔离性，数据库系统提供的隔离机制保证事务在不受外部并发操作影响的独立环境下运行 Duration：持久性，只要这个事务提交成功，那么这个事务对数据的操作是永久性生效的 Consistency：一致性，逻辑一致性，数据库总时从一个一致状态变到另一个一致状态（事务对数据修改前后的数据总体保证一致，银行转账的例子）","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/MySQL/MySQL-transaction.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"MySQL 事务解析"}],["meta",{"property":"og:description","content":"MySQL 事务解析 事务：一个包含多个操作的最小工作单元，这些操作要么同时成功，要么同时失败。本篇介绍事务，由于 MyISAM 存储引擎不支持事务，所以本篇默认存储引擎为 InnoDB。 事务 ACID 特性 Atomicity：原子性，一个事务内的多个操作要么全部成功，要么全部失败 Isolation：隔离性，数据库系统提供的隔离机制保证事务在不受外部并发操作影响的独立环境下运行 Duration：持久性，只要这个事务提交成功，那么这个事务对数据的操作是永久性生效的 Consistency：一致性，逻辑一致性，数据库总时从一个一致状态变到另一个一致状态（事务对数据修改前后的数据总体保证一致，银行转账的例子）"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-01T07:27:35.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:tag","content":"MySQL"}],["meta",{"property":"article:tag","content":"事务"}],["meta",{"property":"article:tag","content":"锁"}],["meta",{"property":"article:modified_time","content":"2023-03-01T07:27:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL 事务解析\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-03-01T07:27:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"事务 ACID 特性","slug":"事务-acid-特性","link":"#事务-acid-特性","children":[]},{"level":2,"title":"MySQL 如何保证原子性","slug":"mysql-如何保证原子性","link":"#mysql-如何保证原子性","children":[]},{"level":2,"title":"undo log","slug":"undo-log","link":"#undo-log","children":[{"level":3,"title":"记录的隐藏字段","slug":"记录的隐藏字段","link":"#记录的隐藏字段","children":[]},{"level":3,"title":"记录的头信息","slug":"记录的头信息","link":"#记录的头信息","children":[]},{"level":3,"title":"insert undo log","slug":"insert-undo-log","link":"#insert-undo-log","children":[]},{"level":3,"title":"update undo log","slug":"update-undo-log","link":"#update-undo-log","children":[]}]},{"level":2,"title":"MySQL 如何保证持久性","slug":"mysql-如何保证持久性","link":"#mysql-如何保证持久性","children":[]},{"level":2,"title":"MySQL 如何保证隔离性","slug":"mysql-如何保证隔离性","link":"#mysql-如何保证隔离性","children":[{"level":3,"title":"事务隔离性问题","slug":"事务隔离性问题","link":"#事务隔离性问题","children":[]},{"level":3,"title":"事务隔离级别","slug":"事务隔离级别","link":"#事务隔离级别","children":[]},{"level":3,"title":"MySQL 不同的事务隔离级别实现方式","slug":"mysql-不同的事务隔离级别实现方式","link":"#mysql-不同的事务隔离级别实现方式","children":[]},{"level":3,"title":"MVCC","slug":"mvcc","link":"#mvcc","children":[]},{"level":3,"title":"LBCC","slug":"lbcc","link":"#lbcc","children":[]},{"level":3,"title":"快照读与当前读","slug":"快照读与当前读","link":"#快照读与当前读","children":[]},{"level":3,"title":"InnoDB RR 隔离级别下如何解决幻读问题","slug":"innodb-rr-隔离级别下如何解决幻读问题","link":"#innodb-rr-隔离级别下如何解决幻读问题","children":[]}]},{"level":2,"title":"MySQL 如何保证一致性","slug":"mysql-如何保证一致性","link":"#mysql-如何保证一致性","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1676904395000,"updatedTime":1677655655000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1},{"name":"wuyingbin","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":17.61,"words":5283},"filePathRelative":"writings/MySQL/MySQL-transaction.md","localizedDate":"2023年2月20日","excerpt":"<h1> MySQL 事务解析</h1>\\n<blockquote>\\n<p>事务：一个包含多个操作的最小工作单元，这些操作要么同时成功，要么同时失败。本篇介绍事务，由于 MyISAM 存储引擎不支持事务，所以本篇默认存储引擎为 InnoDB。</p>\\n</blockquote>\\n<h2> 事务 ACID 特性</h2>\\n<ul>\\n<li>\\n<p>Atomicity：原子性，一个事务内的多个操作要么全部成功，要么全部失败</p>\\n</li>\\n<li>\\n<p>Isolation：隔离性，数据库系统提供的隔离机制保证事务在不受外部并发操作影响的独立环境下运行</p>\\n</li>\\n<li>\\n<p>Duration：持久性，只要这个事务提交成功，那么这个事务对数据的操作是永久性生效的</p>\\n</li>\\n<li>\\n<p>Consistency：一致性，逻辑一致性，数据库总时从一个一致状态变到另一个一致状态（事务对数据修改前后的<strong>数据总体保证一致</strong>，银行转账的例子）</p>\\n</li>\\n</ul>","copyright":{"author":"gelald","license":"MIT Licensed"},"autoDesc":true}');export{e as data};