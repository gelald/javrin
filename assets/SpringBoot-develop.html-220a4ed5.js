const a=JSON.parse('{"key":"v-6dd1e032","path":"/writings/Spring/SpringBoot-develop.html","title":"SpringBoot 开发中的一些问题总结","lang":"zh-CN","frontmatter":{"title":"SpringBoot 开发中的一些问题总结","icon":"article","isOriginal":true,"category":["框架","coding"],"tag":["Spring/SpringBoot","问题解决","优化"],"description":"SpringBoot 开发中的一些问题总结 SpringBoot 时间格式化 在 Java 中时间格式化有两种方式： Date 类型，使用 SimpleDateFormat 进行格式化 // 定义时间格式化对象和格式化样式 SimpleDateFormat simpleDateFormat = new SimpleDateFormat(\\"yyyy-MM-dd HH:mm:ss\\"); // 格式化时间对象 String dateString = simpleDateFormat.format(new Date()) LocalDateTime 类型，使用 DateTimeFormatter 进行格式化。推荐使用这种方式，因为 DateTimeFormatter 是线程安全的。 // 定义时间格式化对象和格式化样式 DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(\\"yyyy-MM-dd HH:mm:ss\\"); // 格式化时间对象 String dateString = dateTimeFormatter.format(LocalDateTime.now());","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/Spring/SpringBoot-develop.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"SpringBoot 开发中的一些问题总结"}],["meta",{"property":"og:description","content":"SpringBoot 开发中的一些问题总结 SpringBoot 时间格式化 在 Java 中时间格式化有两种方式： Date 类型，使用 SimpleDateFormat 进行格式化 // 定义时间格式化对象和格式化样式 SimpleDateFormat simpleDateFormat = new SimpleDateFormat(\\"yyyy-MM-dd HH:mm:ss\\"); // 格式化时间对象 String dateString = simpleDateFormat.format(new Date()) LocalDateTime 类型，使用 DateTimeFormatter 进行格式化。推荐使用这种方式，因为 DateTimeFormatter 是线程安全的。 // 定义时间格式化对象和格式化样式 DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(\\"yyyy-MM-dd HH:mm:ss\\"); // 格式化时间对象 String dateString = dateTimeFormatter.format(LocalDateTime.now());"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-28T15:46:06.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:tag","content":"Spring/SpringBoot"}],["meta",{"property":"article:tag","content":"问题解决"}],["meta",{"property":"article:tag","content":"优化"}],["meta",{"property":"article:modified_time","content":"2023-02-28T15:46:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SpringBoot 开发中的一些问题总结\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-02-28T15:46:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"SpringBoot 时间格式化","slug":"springboot-时间格式化","link":"#springboot-时间格式化","children":[{"level":3,"title":"全局时间格式化","slug":"全局时间格式化","link":"#全局时间格式化","children":[]},{"level":3,"title":"部分时间格式化","slug":"部分时间格式化","link":"#部分时间格式化","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]}]}],"git":{"createdTime":1672799118000,"updatedTime":1677599166000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":3}]},"readingTime":{"minutes":2.08,"words":625},"filePathRelative":"writings/Spring/SpringBoot-develop.md","localizedDate":"2023年1月4日","excerpt":"<h1> SpringBoot 开发中的一些问题总结</h1>\\n<h2> SpringBoot 时间格式化</h2>\\n<p>在 Java 中时间格式化有两种方式：</p>\\n<ul>\\n<li>\\n<p><code>Date</code> 类型，使用 <code>SimpleDateFormat</code> 进行格式化</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token comment\\">// 定义时间格式化对象和格式化样式</span>\\n<span class=\\"token class-name\\">SimpleDateFormat</span> simpleDateFormat <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">SimpleDateFormat</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"yyyy-MM-dd HH:mm:ss\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token comment\\">// 格式化时间对象</span>\\n<span class=\\"token class-name\\">String</span> dateString <span class=\\"token operator\\">=</span> simpleDateFormat<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">format</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Date</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div></li>\\n<li>\\n<p><code>LocalDateTime</code> 类型，使用 <code>DateTimeFormatter</code> 进行格式化。推荐使用这种方式，因为 <code>DateTimeFormatter</code> 是线程安全的。</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token comment\\">// 定义时间格式化对象和格式化样式</span>\\n<span class=\\"token class-name\\">DateTimeFormatter</span> dateTimeFormatter <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">DateTimeFormatter</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">ofPattern</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"yyyy-MM-dd HH:mm:ss\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token comment\\">// 格式化时间对象</span>\\n<span class=\\"token class-name\\">String</span> dateString <span class=\\"token operator\\">=</span> dateTimeFormatter<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">format</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">LocalDateTime</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">now</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div></li>\\n</ul>","autoDesc":true}');export{a as data};