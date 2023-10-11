const e=JSON.parse('{"key":"v-d1d41c7e","path":"/writings/JVM/%E5%86%85%E5%AD%98%E5%88%86%E6%9E%90.html","title":"内存分析","lang":"zh-CN","frontmatter":{"description":"内存分析 在排查 JVM 的相关问题中，内存分析是其中一个有效的手段 常见的内存溢出问题 Java 堆内存溢出 Java 堆内存溢出的情况主要有两种 OutOfMemoryError: Java heap space 可以将 -Xms(初始堆内存)，-Xmx(最大堆内存) 设置为一样来禁止自动扩展堆内存。 当使用一个死循环来不断地在 Java 堆中创建对象，并且 GC-Roots 到对象之间存在引用链，JVM 不会回收对象，就会发生 OutOfMemory。","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/JVM/%E5%86%85%E5%AD%98%E5%88%86%E6%9E%90.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"内存分析"}],["meta",{"property":"og:description","content":"内存分析 在排查 JVM 的相关问题中，内存分析是其中一个有效的手段 常见的内存溢出问题 Java 堆内存溢出 Java 堆内存溢出的情况主要有两种 OutOfMemoryError: Java heap space 可以将 -Xms(初始堆内存)，-Xmx(最大堆内存) 设置为一样来禁止自动扩展堆内存。 当使用一个死循环来不断地在 Java 堆中创建对象，并且 GC-Roots 到对象之间存在引用链，JVM 不会回收对象，就会发生 OutOfMemory。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-28T15:20:13.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:modified_time","content":"2023-02-28T15:20:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"内存分析\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-02-28T15:20:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"常见的内存溢出问题","slug":"常见的内存溢出问题","link":"#常见的内存溢出问题","children":[{"level":3,"title":"Java 堆内存溢出","slug":"java-堆内存溢出","link":"#java-堆内存溢出","children":[]},{"level":3,"title":"MetaSpace（元空间）内存溢出","slug":"metaspace-元空间-内存溢出","link":"#metaspace-元空间-内存溢出","children":[]}]},{"level":2,"title":"定位内存泄漏问题","slug":"定位内存泄漏问题","link":"#定位内存泄漏问题","children":[{"level":3,"title":"堆内存 dump","slug":"堆内存-dump","link":"#堆内存-dump","children":[]}]}],"git":{"createdTime":1677597613000,"updatedTime":1677597613000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":4.63,"words":1389},"filePathRelative":"writings/JVM/内存分析.md","localizedDate":"2023年2月28日","excerpt":"<h1> 内存分析</h1>\\n<blockquote>\\n<p>在排查 JVM 的相关问题中，内存分析是其中一个有效的手段</p>\\n</blockquote>\\n<h2> 常见的内存溢出问题</h2>\\n<h3> Java 堆内存溢出</h3>\\n<p>Java 堆内存溢出的情况主要有两种</p>\\n<h4> OutOfMemoryError: Java heap space</h4>\\n<p>可以将 <code>-Xms(初始堆内存)</code>，<code>-Xmx(最大堆内存)</code> 设置为一样来禁止自动扩展堆内存。</p>\\n<p>当使用一个死循环来不断地在 Java 堆中创建对象，并且 <code>GC-Roots</code> 到对象之间存在引用链，JVM 不会回收对象，就会发生 <code>OutOfMemory</code>。</p>","autoDesc":true}');export{e as data};
