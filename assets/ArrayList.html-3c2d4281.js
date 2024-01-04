const e=JSON.parse('{"key":"v-7285f567","path":"/writings/Java-collection/ArrayList.html","title":"ArrayList","lang":"zh-CN","frontmatter":{"title":"ArrayList","icon":"article","category":["Java集合"],"description":"ArrayList 在日常的开发中，ArrayList 几乎是 List 接口中使用得最多的实现类，它的地位不言而喻 底层实现 ArrayList 有着线性顺序存储、索引访问、动态长度等特点，底层的实现其实还是数组，其他的功能就是围绕这个数组开展的 /** * The array buffer into which the elements of the ArrayList are stored. * The capacity of the ArrayList is the length of this array buffer. Any * empty ArrayList with elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA * will be expanded to DEFAULT_CAPACITY when the first element is added. */ // 负责存储的数组 transient Object[] elementData; // non-private to simplify nested class access /** * The size of the ArrayList (the number of elements it contains). * * @serial */ // 集合中元素个数 private int size;","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/Java-collection/ArrayList.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"ArrayList"}],["meta",{"property":"og:description","content":"ArrayList 在日常的开发中，ArrayList 几乎是 List 接口中使用得最多的实现类，它的地位不言而喻 底层实现 ArrayList 有着线性顺序存储、索引访问、动态长度等特点，底层的实现其实还是数组，其他的功能就是围绕这个数组开展的 /** * The array buffer into which the elements of the ArrayList are stored. * The capacity of the ArrayList is the length of this array buffer. Any * empty ArrayList with elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA * will be expanded to DEFAULT_CAPACITY when the first element is added. */ // 负责存储的数组 transient Object[] elementData; // non-private to simplify nested class access /** * The size of the ArrayList (the number of elements it contains). * * @serial */ // 集合中元素个数 private int size;"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-28T15:20:13.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:modified_time","content":"2023-02-28T15:20:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ArrayList\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-02-28T15:20:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"底层实现","slug":"底层实现","link":"#底层实现","children":[]},{"level":2,"title":"构造方法","slug":"构造方法","link":"#构造方法","children":[{"level":3,"title":"ArrayList(int initialCapacity)","slug":"arraylist-int-initialcapacity","link":"#arraylist-int-initialcapacity","children":[]},{"level":3,"title":"ArrayList()","slug":"arraylist-1","link":"#arraylist-1","children":[]},{"level":3,"title":"ArrayList(Collection<? extends E> c)","slug":"arraylist-collection-extends-e-c","link":"#arraylist-collection-extends-e-c","children":[]}]},{"level":2,"title":"自动扩容","slug":"自动扩容","link":"#自动扩容","children":[]},{"level":2,"title":"添加元素","slug":"添加元素","link":"#添加元素","children":[]},{"level":2,"title":"获取元素","slug":"获取元素","link":"#获取元素","children":[]},{"level":2,"title":"删除元素","slug":"删除元素","link":"#删除元素","children":[]},{"level":2,"title":"修剪","slug":"修剪","link":"#修剪","children":[]},{"level":2,"title":"Fail-Fast 机制","slug":"fail-fast-机制","link":"#fail-fast-机制","children":[]},{"level":2,"title":"数组拷贝","slug":"数组拷贝","link":"#数组拷贝","children":[]},{"level":2,"title":"Arrays.toList","slug":"arrays-tolist","link":"#arrays-tolist","children":[]}],"git":{"createdTime":1677597613000,"updatedTime":1677597613000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":7.48,"words":2244},"filePathRelative":"writings/Java-collection/ArrayList.md","localizedDate":"2023年2月28日","excerpt":"<h1> ArrayList</h1>\\n<blockquote>\\n<p>在日常的开发中，ArrayList 几乎是 List 接口中使用得最多的实现类，它的地位不言而喻</p>\\n</blockquote>\\n<h2> 底层实现</h2>\\n<p>ArrayList 有着线性顺序存储、索引访问、动态长度等特点，底层的实现其实还是数组，其他的功能就是围绕这个数组开展的</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token doc-comment comment\\">/**\\n * The array buffer into which the elements of the ArrayList are stored.\\n * The capacity of the ArrayList is the length of this array buffer. Any\\n * empty ArrayList with elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA\\n * will be expanded to DEFAULT_CAPACITY when the first element is added.\\n */</span>\\n<span class=\\"token comment\\">// 负责存储的数组</span>\\n<span class=\\"token keyword\\">transient</span> <span class=\\"token class-name\\">Object</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> elementData<span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// non-private to simplify nested class access</span>\\n\\n<span class=\\"token doc-comment comment\\">/**\\n * The size of the ArrayList (the number of elements it contains).\\n *\\n * <span class=\\"token keyword\\">@serial</span>\\n */</span>\\n<span class=\\"token comment\\">// 集合中元素个数</span>\\n<span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">int</span> size<span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{"author":"gelald","license":"MIT Licensed"},"autoDesc":true}');export{e as data};