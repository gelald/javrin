import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as i,e as s}from"./app-85442c0b.js";const a={},l=s(`<h1 id="java-类字节码详解" tabindex="-1"><a class="header-anchor" href="#java-类字节码详解" aria-hidden="true">#</a> Java 类字节码详解</h1><h2 id="jvm-概述" tabindex="-1"><a class="header-anchor" href="#jvm-概述" aria-hidden="true">#</a> JVM 概述</h2><p>由于计算机只认识 0 和 1，这意味着任何语言编写的程序最终都需要经过编译器编译成机器码才能被计算机执行。所以在不同平台上运行编写的程序前，都需要重新编译才可以。而 Java 刚推出的时候，口号是：Write Once，Run Anywhere</p><p>为了实现”编写一次，到处运行“的目的，Sun 公司发布了许多可以运行在不同平台上的 JVM，而这些虚拟机都拥有一个共同的功能，那就是可以载入和执行同一种与平台无关的字节码(ByteCode)。于是，Java 源代码不再需要直接根据平台来翻译成 0/1 这种机器码，而是先翻译成字节码，然后通过不同平台上的 JVM 读取并运行，从而实现上述目的。</p><p>如今 JVM 更是扩大了应用的范围，不仅支持 Java 代码，还支持许多基于 JVM 的编程语言，如 Koltin、Groovy 等</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220316154251.png" alt=""></p><h2 id="java-字节码文件" tabindex="-1"><a class="header-anchor" href="#java-字节码文件" aria-hidden="true">#</a> Java 字节码文件</h2><p>class 文件本质上是一个 8 位字节为基础单位的二进制流，各个数据项目紧凑地排列在 class 文件中。JVM 就根据特定的规则来解析这个二进制的数据，从而得到类的信息</p><p>先准备一个 Java 文件</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> m<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">inc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> m <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打开编译后的 class 文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cafe babe 0000 0034 0013 0a00 0400 0f09
0003 0010 0700 1107 0012 0100 016d 0100
0149 0100 063c 696e 6974 3e01 0003 2829
5601 0004 436f 6465 0100 0f4c 696e 654e
756d 6265 7254 6162 6c65 0100 0369 6e63
0100 0328 2949 0100 0a53 6f75 7263 6546
696c 6501 0009 5465 7374 2e6a 6176 610c
0007 0008 0c00 0500 0601 0004 5465 7374
0100 106a 6176 612f 6c61 6e67 2f4f 626a
6563 7400 2100 0300 0400 0000 0100 0200
0500 0600 0000 0200 0100 0700 0800 0100
0900 0000 1d00 0100 0100 0000 052a b700
01b1 0000 0001 000a 0000 0006 0001 0000
0001 0001 000b 000c 0001 0009 0000 001f
0002 0001 0000 0007 2ab4 0002 0460 ac00
0000 0100 0a00 0000 0600 0100 0000 0500
0100 0d00 0000 0200 0e
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="class-文件的结构属性" tabindex="-1"><a class="header-anchor" href="#class-文件的结构属性" aria-hidden="true">#</a> class 文件的结构属性</h3><h4 id="魔数" tabindex="-1"><a class="header-anchor" href="#魔数" aria-hidden="true">#</a> 魔数</h4><p>每个 class 文件的头4个字节成为魔数（Magic Number），它的唯一作用是确定这个文件是否为一个能被虚拟机接受的 class 文件，为 0xCAFEBABE</p><blockquote><p>可以上面 class 文件前4个字节就是 (&quot;cafe babe&quot;)</p></blockquote><h4 id="版本号" tabindex="-1"><a class="header-anchor" href="#版本号" aria-hidden="true">#</a> 版本号</h4><p>紧接着魔数的这个字节存储的是 class 文件的版本号，第5和第6个字节是次版本号；第7和第8个字节是主版本号</p><blockquote><p>上面 class 文件第5、6个字节是0000，代表jdk次版本为0；第7、8个字节是0034，代表jdk主版本为52，但是jdk版本从45开始，除1.0和1.1都使用45.x外，每升级一个大版本，版本号都加1，所以生成该 class 文件的jdk的版本号为1.8.0</p></blockquote><h4 id="常量池" tabindex="-1"><a class="header-anchor" href="#常量池" aria-hidden="true">#</a> 常量池</h4><p>常量池可以理解为 class 文件的资源仓库，是占用 class 文件空间最大的数据项目之一。常量池存储的资源有：变量的属性、类型和名称；方法的属性、类型和名称。</p><p>常量池主要存放两大类常量：字面量和符号引用</p><ul><li>字面量比较接近 Java 中的常量的概念，如文本字符串、被声明为 final 的常量值</li><li>符号引用，包括三类常量：类的接口的全限定类名、方法的名称和描述符、属性的名称和描述符</li></ul><h4 id="访问标识" tabindex="-1"><a class="header-anchor" href="#访问标识" aria-hidden="true">#</a> 访问标识</h4><p>用于标识这个 Class 的属性和访问类型，包括：这个 Class 是类还是接口；访问类型是否为 public；是否定义为 abstract 类型；如果是类的话，是否被声明为 final 等</p><h4 id="类索引、父类索引、接口索引" tabindex="-1"><a class="header-anchor" href="#类索引、父类索引、接口索引" aria-hidden="true">#</a> 类索引、父类索引、接口索引</h4><p>类索引、父类索引、接口索引可以理解为一种描述的数据项目。class 文件依靠类索引、父类索引、接口索引来确定这个类的继承关</p><h4 id="字段表属性" tabindex="-1"><a class="header-anchor" href="#字段表属性" aria-hidden="true">#</a> 字段表属性</h4><p>用于描述接口或类中声明的变量。类的作用域（public、private、protected）、是否为静态变量（static）、是否可变（final）、数据类型（基本数据类型、引用类型）等</p><h4 id="方法表属性" tabindex="-1"><a class="header-anchor" href="#方法表属性" aria-hidden="true">#</a> 方法表属性</h4><p>与字段表属性类似，只不过方法表属性描述的是方法的类型、作用域等</p><h4 id="属性表属性" tabindex="-1"><a class="header-anchor" href="#属性表属性" aria-hidden="true">#</a> 属性表属性</h4><p>用于记录字段表、方法表的特殊属性</p><h3 id="反编译字节码文件" tabindex="-1"><a class="header-anchor" href="#反编译字节码文件" aria-hidden="true">#</a> 反编译字节码文件</h3><blockquote><p>jdk 内置的反编译工具 javap 可以完成反编译字节码文件的工作</p></blockquote><p>用法：<code>javap &lt;options&gt; &lt;classfile&gt;</code></p><p>其中 <code>&lt;options&gt;</code> 常用的选项包括</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-v  -verbose             输出附加信息
-l                       输出行号和本地变量表
-public                  仅显示公共类和成员
-protected               显示受保护的/公共类和成员
-package                 显示程序包/受保护的/公共类和成员 (默认)
-p  -private             显示所有类和成员
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code>javap -verbose -p Test.class</code> 查看输出内容</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Classfile /xxx/Test.class
  Last modified 2022-3-16; size 265 bytes
  MD5 checksum 7cab5513115a4982f1d0f04048c0f405
  Compiled from &quot;Test.java&quot;
public class Test
  minor version: 0
  major version: 52
  flags: ACC_PUBLIC, ACC_SUPER
Constant pool:
   #1 = Methodref          #4.#15         // java/lang/Object.&quot;&lt;init&gt;&quot;:()V
   #2 = Fieldref           #3.#16         // Test.m:I
   #3 = Class              #17            // Test
   #4 = Class              #18            // java/lang/Object
   #5 = Utf8               m
   #6 = Utf8               I
   #7 = Utf8               &lt;init&gt;
   #8 = Utf8               ()V
   #9 = Utf8               Code
  #10 = Utf8               LineNumberTable
  #11 = Utf8               inc
  #12 = Utf8               ()I
  #13 = Utf8               SourceFile
  #14 = Utf8               Test.java
  #15 = NameAndType        #7:#8          // &quot;&lt;init&gt;&quot;:()V
  #16 = NameAndType        #5:#6          // m:I
  #17 = Utf8               Test
  #18 = Utf8               java/lang/Object
{
  private int m;
    descriptor: I
    flags: ACC_PRIVATE

  public Test();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object.&quot;&lt;init&gt;&quot;:()V
         4: return
      LineNumberTable:
        line 1: 0

  public int inc();
    descriptor: ()I
    flags: ACC_PUBLIC
    Code:
      stack=2, locals=1, args_size=1
         0: aload_0
         1: getfield      #2                  // Field m:I
         4: iconst_1
         5: iadd
         6: ireturn
      LineNumberTable:
        line 5: 0
}
SourceFile: &quot;Test.java&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开头的7行信息包括:Class文件当前所在位置，最后修改时间，文件大小，MD5值，编译自哪个文件，类的全限定名，jdk次版本号，主版本号。不过多阐述</p><p>最后1行信息表示源文件名</p><blockquote><p>接下来我们分析中间不容易看懂的内容~</p></blockquote><h4 id="常量池-1" tabindex="-1"><a class="header-anchor" href="#常量池-1" aria-hidden="true">#</a> 常量池</h4><blockquote><p>注意 class 文件的常量池需要和 JVM 运行时常量池区分开</p></blockquote><p>反编译文件后的内容中 <code>Constant pool</code> 就代表常量池，主要存放字面量和符号引用。JVM 在加载 class 文件的时候会进行动态链接，从常量池获得对应的符号引用，再在类创建或运行时解析并翻译到具体的内存地址中。</p><p>我们看第一个常量及其关联的常量</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#1 = Methodref          #4.#15          // java/lang/Object.&quot;&lt;init&gt;&quot;:()V
#4 = Class              #18             // java/lang/Object
#7 = Utf8               &lt;init&gt;
#8 = Utf8               ()V
#15 = NameAndType        #7:#8          // &quot;&lt;init&gt;&quot;:()V
#18 = Utf8               java/lang/Object
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一个常量是一个方法定义，指向了第4和第15个常量。以此类推查看第4和第15个常量。最后可以拼接成第一个常量右侧的注释内容</p><p>这一段可以理解为类构造方法声明，由于 Test 类没有自己的构造方法，所以是调用的父类的构造方法，这里推导后也证明了这一个结论。返回值是V，代表void</p><hr><p>同样地我们看第二个常量及其关联的常量</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#2 = Fieldref            #3.#16         // Test.m:I
#3 = Class               #17            // Test
#5 = Utf8                m
#6 = Utf8                I
#16 = NameAndType        #5:#6          // m:I
#17 = Utf8               Test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二个常量是一个字段定义，指向了第3和第16个常量。推导后的内容是第2个常量右侧的注释内容</p><p>这一段可以理解为类成员变量声明，名字是m，类型是I，代表int</p><hr><p>关于字节码类型和数据类型对应关系</p><table><thead><tr><th>字节码符号</th><th>java 类型</th></tr></thead><tbody><tr><td>B</td><td>byte</td></tr><tr><td>C</td><td>char</td></tr><tr><td>D</td><td>double</td></tr><tr><td>F</td><td>float</td></tr><tr><td>I</td><td>int</td></tr><tr><td>J</td><td>long</td></tr><tr><td>S</td><td>shor</td></tr><tr><td>Z</td><td>boolean</td></tr><tr><td>V</td><td>void</td></tr><tr><td>L</td><td>对象类型，如Object、String</td></tr></tbody></table><p>对于数组类型，每一位使用一个前置的 <code>[</code> 字符来描述，如定义一个 <code>java.lang.String[][]</code> 类型的维数组，将被记录为 <code>[[Ljava/lang/String;</code></p><h4 id="方法表集合" tabindex="-1"><a class="header-anchor" href="#方法表集合" aria-hidden="true">#</a> 方法表集合</h4><p>常量池后面大括号的内容都属于方法表集合</p><p>先从最简单的开始</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private int m;
  descriptor: I
  flags: ACC_PRIVATE
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此处声明了一个私有成员变量，类型是int</p><hr><p>再往下看，很明显是Test的构造方法，返回值是void</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public Test();
  descriptor: ()V
  flags: ACC_PUBLIC
  Code:
    stack=1, locals=1, args_size=1
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object.&quot;&lt;init&gt;&quot;:()V
       4: return
    LineNumberTable:
      line 1: 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们具体看一下 Code 里面的内容</p><ul><li><p><strong>stack</strong>: 最大操作数栈，JVM运行时会根据这个值来分配栈帧(Frame)中的操作栈深度，此处为1</p></li><li><p><strong>locals</strong>: 局部变量所需的存储空间，单位为Slot， Slot是虚拟机为局部变量分配内存时所使用的最小单位，为4个字节大小。方法参数(包括实例方法中的隐藏参数this)，显示异常处理器的参数(try catch中的catch块所定义的异常)，方法体中定义的局部变量都需要使用局部变量表来存放。值得一提的是，locals的大小并不一定等于所有局部变量所占的Slot之和，因为局部变量中的Slot是可以重用的。</p></li><li><p><strong>args_size</strong>: 方法参数的个数，这里是1，因为每个实例方法都会有一个隐藏参数this</p></li><li><p><strong>attribute_info</strong>: 方法体内容，0，1，4为字节码&quot;行号&quot;，该段代码的意思是将第一个引用类型本地变量推送至栈顶，然后执行该类型的实例方法，也就是常量池存放的第一个变量，也就是注释里的 <code>java/lang/Object.&quot;&lt;init&gt;&quot;:()V</code> ， 然后执行返回语句，结束方法。</p></li><li><p><strong>LineNumberTable</strong>: 该属性的作用是描述源码行号与字节码行号(字节码偏移量)之间的对应关系。可以使用 -g:none 或-g:lines选项来取消或要求生成这项信息，如果选择不生成LineNumberTable，当程序运行异常时将无法获取到发生异常的源码行号，也无法按照源码的行数来调试程序。</p></li><li><p><strong>LocalVariableTable</strong>: 该属性的作用是描述帧栈中局部变量与源码中定义的变量之间的关系。可以使用 -g:none 或 -g:vars来取消或生成这项信息，如果没有生成这项信息，那么当别人引用这个方法时，将无法获取到参数名称，取而代之的是arg0， arg1这样的占位符。 start 表示该局部变量在哪一行开始可见，length表示可见行数，Slot代表所在帧栈位置，Name是变量名称，然后是类型签名。</p></li></ul><hr><p>同理分析 inc 方法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public int inc();
  descriptor: ()I
  flags: ACC_PUBLIC
  Code:
    stack=2, locals=1, args_size=1
       0: aload_0
       1: getfield      #2                  // Field m:I
       4: iconst_1
       5: iadd
       6: ireturn
    LineNumberTable:
      line 5: 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>stack：因为逻辑中包括成员变量m获取和累加两个操作</p></li><li><p>args_size：每一个成员方法都有一个隐藏参数this</p></li><li><p>方法体内容是：将this入栈，获取字段#2并置于栈顶，将int类型的1入栈，将栈内顶部的两个数值相加，返回一个int类型的值</p></li></ul><h3 id="分析-try-catch-finally" tabindex="-1"><a class="header-anchor" href="#分析-try-catch-finally" aria-hidden="true">#</a> 分析 try-catch-finally</h3><p>准备一份带有 try-catch-finally 代码块的源文件，利用上面的知识来分析</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestCode</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> x<span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> x<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            x <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> x<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            x <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译与反编译</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>javac TestCode.java
javap <span class="token parameter variable">-verbose</span>  TestCode.class
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看字节码内容中的 foo 方法，比较长，耐心点看</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public int foo();
    descriptor: ()I
    flags: ACC_PUBLIC
    Code:
      stack=1, locals=5, args_size=1
         0: iconst_1  //int型1入栈 -&gt;栈顶=1
         1: istore_1  //将栈顶的int型数值存入第二个局部变量 -&gt;局部2=1
         2: iload_1   //将第二个int型局部变量推送至栈顶 -&gt;栈顶=1
         3: istore_2  //!!将栈顶int型数值存入第三个局部变量 -&gt;局部3=1
         
         4: iconst_3  //int型3入栈 -&gt;栈顶=3
         5: istore_1  //将栈顶的int型数值存入第二个局部变量 -&gt;局部2=3
         6: iload_2   //!!将第三个int型局部变量推送至栈顶 -&gt;栈顶=1
         7: ireturn   //从当前方法返回栈顶int数值 -&gt;1
         
         8: astore_2  // -&gt;局部3=Exception
         9: iconst_2  // -&gt;栈顶=2
        10: istore_1  // -&gt;局部2=2
        11: iload_1   //-&gt;栈顶=2
        12: istore_3  //!! -&gt;局部4=2
        
        13: iconst_3  // -&gt;栈顶=3
        14: istore_1  // -&gt;局部1=3
        15: iload_3   //!! -&gt;栈顶=2
        16: ireturn   // -&gt; 2
        
        17: astore        4    //将栈顶引用型数值存入第五个局部变量=any
        19: iconst_3  //将int型数值3入栈 -&gt; 栈顶3
        20: istore_1  //将栈顶第一个int数值存入第二个局部变量 -&gt; 局部2=3
        21: aload         4    //将局部第五个局部变量(引用型)推送至栈顶
        23: athrow    //将栈顶的异常抛出
      Exception table:
         from    to  target type
             0     4     8   Class java/lang/Exception  //0到4行对应的异常，对应#8中储存的异常
             0     4    17   any                        //Exeption之外的其他异常
             8    13    17   any
            17    19    17   any
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在字节码的4,5，以及13,14中执行的是同一个操作，就是将int型的3入操作数栈顶，并存入第二个局部变量。这正是我们源码在finally语句块中内容。也就是说，JVM在处理异常时，会在每个可能的分支都将finally语句重复执行一遍。</p><p>通过一步步分析字节码，可以得出最后的运行结果是：</p><ul><li>不发生异常时: return 1</li><li>发生异常时: return 2</li><li>发生非Exception及其子类的异常，抛出异常，不返回值</li></ul>`,83),d=[l];function t(c,r){return e(),i("div",null,d)}const o=n(a,[["render",t],["__file","class-bytecode.html.vue"]]);export{o as default};