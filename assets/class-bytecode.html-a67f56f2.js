const e=JSON.parse('{"key":"v-3483f8e2","path":"/writings/JVM/class-bytecode.html","title":"Java 类字节码详解","lang":"zh-CN","frontmatter":{"title":"Java 类字节码详解","icon":"article","category":["JVM"],"description":"Java 类字节码详解 JVM 概述 由于计算机只认识 0 和 1，这意味着任何语言编写的程序最终都需要经过编译器编译成机器码才能被计算机执行。所以在不同平台上运行编写的程序前，都需要重新编译才可以。而 Java 刚推出的时候，口号是：Write Once，Run Anywhere 为了实现”编写一次，到处运行“的目的，Sun 公司发布了许多可以运行在不同平台上的 JVM，而这些虚拟机都拥有一个共同的功能，那就是可以载入和执行同一种与平台无关的字节码(ByteCode)。于是，Java 源代码不再需要直接根据平台来翻译成 0/1 这种机器码，而是先翻译成字节码，然后通过不同平台上的 JVM 读取并运行，从而实现上述目的。","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/JVM/class-bytecode.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"Java 类字节码详解"}],["meta",{"property":"og:description","content":"Java 类字节码详解 JVM 概述 由于计算机只认识 0 和 1，这意味着任何语言编写的程序最终都需要经过编译器编译成机器码才能被计算机执行。所以在不同平台上运行编写的程序前，都需要重新编译才可以。而 Java 刚推出的时候，口号是：Write Once，Run Anywhere 为了实现”编写一次，到处运行“的目的，Sun 公司发布了许多可以运行在不同平台上的 JVM，而这些虚拟机都拥有一个共同的功能，那就是可以载入和执行同一种与平台无关的字节码(ByteCode)。于是，Java 源代码不再需要直接根据平台来翻译成 0/1 这种机器码，而是先翻译成字节码，然后通过不同平台上的 JVM 读取并运行，从而实现上述目的。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-28T15:20:13.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:modified_time","content":"2023-02-28T15:20:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 类字节码详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-02-28T15:20:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"JVM 概述","slug":"jvm-概述","link":"#jvm-概述","children":[]},{"level":2,"title":"Java 字节码文件","slug":"java-字节码文件","link":"#java-字节码文件","children":[{"level":3,"title":"class 文件的结构属性","slug":"class-文件的结构属性","link":"#class-文件的结构属性","children":[]},{"level":3,"title":"反编译字节码文件","slug":"反编译字节码文件","link":"#反编译字节码文件","children":[]},{"level":3,"title":"分析 try-catch-finally","slug":"分析-try-catch-finally","link":"#分析-try-catch-finally","children":[]}]}],"git":{"createdTime":1677597613000,"updatedTime":1677597613000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":11.24,"words":3371},"filePathRelative":"writings/JVM/class-bytecode.md","localizedDate":"2023年2月28日","excerpt":"<h1> Java 类字节码详解</h1>\\n<h2> JVM 概述</h2>\\n<p>由于计算机只认识 0 和 1，这意味着任何语言编写的程序最终都需要经过编译器编译成机器码才能被计算机执行。所以在不同平台上运行编写的程序前，都需要重新编译才可以。而 Java 刚推出的时候，口号是：Write Once，Run Anywhere</p>\\n<p>为了实现”编写一次，到处运行“的目的，Sun 公司发布了许多可以运行在不同平台上的 JVM，而这些虚拟机都拥有一个共同的功能，那就是可以载入和执行同一种与平台无关的字节码(ByteCode)。于是，Java 源代码不再需要直接根据平台来翻译成 0/1 这种机器码，而是先翻译成字节码，然后通过不同平台上的 JVM 读取并运行，从而实现上述目的。</p>","autoDesc":true}');export{e as data};
