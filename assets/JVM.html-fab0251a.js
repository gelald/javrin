const e=JSON.parse('{"key":"v-5305fac4","path":"/writings/archive/JVM.html","title":"堆","lang":"zh-CN","frontmatter":{"description":"方法区在JVM中也是一个非常重要的区域，它与堆一样，是被 线程共享 的区域。 在方法区中，存储了每个类的信息（包括类的名称、方法信息、字段信息）、静态变量、常量以及编译器编译后的代码等。 方法区域存放了所加载的类的信息（名称、修饰符等）、类中的静态变量、类中定义为final类型的常量、类中的Field信息、类中的方法信息，当开发人员在程序中通过Class对象中的getName、isInterface等方法来获取信息时，这些数据都来源于方法区域，同时方法区域也是全局共享的 在一定的条件下它也会被GC，当方法区域需要使用的内存超过其允许的大小时，会抛出OutOfMemory的错误信息","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/archive/JVM.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"堆"}],["meta",{"property":"og:description","content":"方法区在JVM中也是一个非常重要的区域，它与堆一样，是被 线程共享 的区域。 在方法区中，存储了每个类的信息（包括类的名称、方法信息、字段信息）、静态变量、常量以及编译器编译后的代码等。 方法区域存放了所加载的类的信息（名称、修饰符等）、类中的静态变量、类中定义为final类型的常量、类中的Field信息、类中的方法信息，当开发人员在程序中通过Class对象中的getName、isInterface等方法来获取信息时，这些数据都来源于方法区域，同时方法区域也是全局共享的 在一定的条件下它也会被GC，当方法区域需要使用的内存超过其允许的大小时，会抛出OutOfMemory的错误信息"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-30T16:21:52.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:modified_time","content":"2022-07-30T16:21:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"堆\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-30T16:21:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"JVM创建一个新对象的内存分配流程","slug":"jvm创建一个新对象的内存分配流程","link":"#jvm创建一个新对象的内存分配流程","children":[]},{"level":2,"title":"局部变量表","slug":"局部变量表","link":"#局部变量表","children":[]},{"level":2,"title":"操作栈","slug":"操作栈","link":"#操作栈","children":[]},{"level":2,"title":"动态连接","slug":"动态连接","link":"#动态连接","children":[]},{"level":2,"title":"方法返回地址","slug":"方法返回地址","link":"#方法返回地址","children":[{"level":3,"title":"哪些内存需要回收，GC发生的内存区域","slug":"哪些内存需要回收-gc发生的内存区域","link":"#哪些内存需要回收-gc发生的内存区域","children":[]},{"level":3,"title":"什么时候回收","slug":"什么时候回收","link":"#什么时候回收","children":[]},{"level":3,"title":"如何回收","slug":"如何回收","link":"#如何回收","children":[]},{"level":3,"title":"如何判断这个对象需要回收，GC的存活标准","slug":"如何判断这个对象需要回收-gc的存活标准","link":"#如何判断这个对象需要回收-gc的存活标准","children":[]}]},{"level":2,"title":"垃圾收集器","slug":"垃圾收集器","link":"#垃圾收集器","children":[]},{"level":2,"title":"GC的目标区域","slug":"gc的目标区域","link":"#gc的目标区域","children":[]},{"level":2,"title":"GC的存活标准","slug":"gc的存活标准","link":"#gc的存活标准","children":[]},{"level":2,"title":"GC算法","slug":"gc算法","link":"#gc算法","children":[]},{"level":2,"title":"GC术语","slug":"gc术语","link":"#gc术语","children":[]},{"level":2,"title":"垃圾收集器","slug":"垃圾收集器-1","link":"#垃圾收集器-1","children":[]}],"git":{"createdTime":1659198112000,"updatedTime":1659198112000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":13.16,"words":3949},"filePathRelative":"writings/archive/JVM.md","localizedDate":"2022年7月30日","excerpt":"<p>方法区在JVM中也是一个非常重要的区域，它与堆一样，是被 <strong>线程共享</strong> 的区域。</p>\\n<p>在方法区中，存储了每个类的信息（包括类的名称、方法信息、字段信息）、静态变量、常量以及编译器编译后的代码等。</p>\\n<p>方法区域存放了所加载的类的信息（名称、修饰符等）、类中的静态变量、类中定义为final类型的常量、类中的Field信息、类中的方法信息，当开发人员在程序中通过Class对象中的getName、isInterface等方法来获取信息时，这些数据都来源于方法区域，同时方法区域也是全局共享的</p>\\n<p>在一定的条件下它也会被GC，当方法区域需要使用的内存超过其允许的大小时，会抛出OutOfMemory的错误信息</p>","autoDesc":true}');export{e as data};