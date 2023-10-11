const e=JSON.parse('{"key":"v-aab99d66","path":"/writings/Java-collection/ArrayDeque.html","title":"ArrayDeque","lang":"zh-CN","frontmatter":{"title":"ArrayDeque","icon":"article","category":["Java集合"],"description":"ArrayDeque ArrayDeque 现在已经逐渐取代 Stack 的位置，称为实现栈功能的首选集合 概述 从栈说起 栈是一种具有元素先进后出特点的数据结构 虽然 Java 里有一个叫做 Stack 的类，但是当需要使用栈时，Java 已不推荐使用 Stack，而是推荐使用更高效的 ArrayDeque，次选是 LinkedList。 Deque ArrayDeque 和 LinkedList 都实现了一个 Deque 接口，Deque（double ended queue），表示双向队列，接口内定义了对头尾元素的插入删除等操作，所以既可以当作栈进行使用，也可以当作队列使用。","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/Java-collection/ArrayDeque.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"ArrayDeque"}],["meta",{"property":"og:description","content":"ArrayDeque ArrayDeque 现在已经逐渐取代 Stack 的位置，称为实现栈功能的首选集合 概述 从栈说起 栈是一种具有元素先进后出特点的数据结构 虽然 Java 里有一个叫做 Stack 的类，但是当需要使用栈时，Java 已不推荐使用 Stack，而是推荐使用更高效的 ArrayDeque，次选是 LinkedList。 Deque ArrayDeque 和 LinkedList 都实现了一个 Deque 接口，Deque（double ended queue），表示双向队列，接口内定义了对头尾元素的插入删除等操作，所以既可以当作栈进行使用，也可以当作队列使用。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-28T15:20:13.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:modified_time","content":"2023-02-28T15:20:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ArrayDeque\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-02-28T15:20:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[{"level":3,"title":"从栈说起","slug":"从栈说起","link":"#从栈说起","children":[]},{"level":3,"title":"Deque","slug":"deque","link":"#deque","children":[]}]},{"level":2,"title":"底层实现","slug":"底层实现","link":"#底层实现","children":[]},{"level":2,"title":"构造方法","slug":"构造方法","link":"#构造方法","children":[]},{"level":2,"title":"自动扩容","slug":"自动扩容","link":"#自动扩容","children":[]},{"level":2,"title":"添加元素","slug":"添加元素","link":"#添加元素","children":[]},{"level":2,"title":"返回元素","slug":"返回元素","link":"#返回元素","children":[]},{"level":2,"title":"相关 API 归纳","slug":"相关-api-归纳","link":"#相关-api-归纳","children":[{"level":3,"title":"栈","slug":"栈","link":"#栈","children":[]},{"level":3,"title":"队列","slug":"队列","link":"#队列","children":[]},{"level":3,"title":"Deque 的 API 一般规律","slug":"deque-的-api-一般规律","link":"#deque-的-api-一般规律","children":[]}]}],"git":{"createdTime":1677597613000,"updatedTime":1677597613000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":5.14,"words":1543},"filePathRelative":"writings/Java-collection/ArrayDeque.md","localizedDate":"2023年2月28日","excerpt":"<h1> ArrayDeque</h1>\\n<blockquote>\\n<p>ArrayDeque 现在已经逐渐取代 Stack 的位置，称为实现栈功能的首选集合</p>\\n</blockquote>\\n<h2> 概述</h2>\\n<h3> 从栈说起</h3>\\n<p>栈是一种具有元素先进后出特点的数据结构</p>\\n<p>虽然 Java 里有一个叫做 Stack 的类，但是当需要使用栈时，Java 已不推荐使用 Stack，而是<strong>推荐使用更高效的 ArrayDeque</strong>，次选是 LinkedList。</p>\\n<h3> Deque</h3>\\n<p>ArrayDeque 和 LinkedList 都实现了一个 Deque 接口，Deque（double ended queue），表示双向队列，接口内定义了对头尾元素的插入删除等操作，所以既可以当作栈进行使用，也可以当作队列使用。</p>","autoDesc":true}');export{e as data};
