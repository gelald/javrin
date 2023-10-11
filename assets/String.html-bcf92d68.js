const n=JSON.parse('{"key":"v-2a529514","path":"/writings/Java-base/String.html","title":"String","lang":"zh-CN","frontmatter":{"title":"String","icon":"article","category":["Java基础"],"tag":["String"],"description":"String 为 String 单独拆分一个模块出来，可以看出 String 的特殊性及重要性。此外 String 也是面试题的「常客」。 不可变 String 类型最大的特点就是不可变，因为内部是使用一个被 final 关键字修饰的 char[] 存储数据，初始化后就不能引用其他数组，并且内部没有改变这个数组的方法，因此它是不可变的。 public final class String implements java.io.Serializable, Comparable&lt;String&gt;, CharSequence { /** The value is used for character storage. */ private final char value[];","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/Java-base/String.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"String"}],["meta",{"property":"og:description","content":"String 为 String 单独拆分一个模块出来，可以看出 String 的特殊性及重要性。此外 String 也是面试题的「常客」。 不可变 String 类型最大的特点就是不可变，因为内部是使用一个被 final 关键字修饰的 char[] 存储数据，初始化后就不能引用其他数组，并且内部没有改变这个数组的方法，因此它是不可变的。 public final class String implements java.io.Serializable, Comparable&lt;String&gt;, CharSequence { /** The value is used for character storage. */ private final char value[];"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-28T15:20:13.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:modified_time","content":"2023-02-28T15:20:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"String\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-02-28T15:20:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"不可变","slug":"不可变","link":"#不可变","children":[]},{"level":2,"title":"创建","slug":"创建","link":"#创建","children":[]},{"level":2,"title":"方法","slug":"方法","link":"#方法","children":[{"level":3,"title":"boolean equals(Object object)","slug":"boolean-equals-object-object","link":"#boolean-equals-object-object","children":[]},{"level":3,"title":"String concat(String str)","slug":"string-concat-string-str","link":"#string-concat-string-str","children":[]},{"level":3,"title":"String substring(int begin, int end)","slug":"string-substring-int-begin-int-end","link":"#string-substring-int-begin-int-end","children":[]},{"level":3,"title":"native String intern()","slug":"native-string-intern","link":"#native-string-intern","children":[]}]},{"level":2,"title":"StringBuilder 和 StringBuffer","slug":"stringbuilder-和-stringbuffer","link":"#stringbuilder-和-stringbuffer","children":[]}],"git":{"createdTime":1677597613000,"updatedTime":1677597613000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":4.57,"words":1370},"filePathRelative":"writings/Java-base/String.md","localizedDate":"2023年2月28日","excerpt":"<h1> String</h1>\\n<blockquote>\\n<p>为 String 单独拆分一个模块出来，可以看出 String 的特殊性及重要性。此外 String 也是面试题的「常客」。</p>\\n</blockquote>\\n<h2> 不可变</h2>\\n<p>String 类型最大的特点就是不可变，因为内部是使用一个被 <code>final</code> 关键字修饰的 <code>char[]</code> 存储数据，初始化后就不能引用其他数组，并且内部没有改变这个数组的方法，因此它是不可变的。</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">final</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">String</span>\\n    <span class=\\"token keyword\\">implements</span> <span class=\\"token class-name\\"><span class=\\"token namespace\\">java<span class=\\"token punctuation\\">.</span>io<span class=\\"token punctuation\\">.</span></span>Serializable</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">Comparable</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">CharSequence</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token doc-comment comment\\">/** The value is used for character storage. */</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">final</span> <span class=\\"token keyword\\">char</span> value<span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
