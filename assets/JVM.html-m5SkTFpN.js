import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-D62f3oGG.js";const t={},n=e('<p>方法区在JVM中也是一个非常重要的区域，它与堆一样，是被 <strong>线程共享</strong> 的区域。</p><p>在方法区中，存储了每个类的信息（包括类的名称、方法信息、字段信息）、静态变量、常量以及编译器编译后的代码等。</p><p>方法区域存放了所加载的类的信息（名称、修饰符等）、类中的静态变量、类中定义为final类型的常量、类中的Field信息、类中的方法信息，当开发人员在程序中通过Class对象中的getName、isInterface等方法来获取信息时，这些数据都来源于方法区域，同时方法区域也是全局共享的</p><p>在一定的条件下它也会被GC，当方法区域需要使用的内存超过其允许的大小时，会抛出OutOfMemory的错误信息</p><p>大多数 JVM 将内存区域划分为 <strong>Method Area（Non-Heap）（方法区）</strong> ,<strong>Heap（堆）</strong> , <strong>Program Counter Register（程序计数器）</strong> , <strong>VM Stack（虚拟机栈，也有翻译成JAVA 方法栈的）,Native Method Stack</strong> （ <strong>本地方法栈</strong> ），其中<strong>Method Area</strong> 和 <strong>Heap</strong> 是线程共享的 ，VM Stack，Native Method Stack 和Program Counter Register是非线程共享的。为什么分为 线程共享和非线程共享的呢?请继续往下看。</p><p>首先我们熟悉一下一个一般性的 Java 程序的工作过程。一个 Java 源程序文件，会被编译为字节码文件（以 class 为扩展名），每个java程序都需要运行在自己的JVM上，然后告知 JVM 程序的运行入口，再被 JVM 通过字节码解释器加载运行。那么程序开始运行后，都是如何涉及到各内存区域的呢？</p><p>概括地说来，JVM初始运行的时候都会分配好 <strong>Method Area（方法区）</strong> 和<strong>Heap（堆）</strong> ，而JVM 每遇到一个线程，就为其分配一个 <strong>Program Counter Register（程序计数器）</strong> , <strong>VM Stack（虚拟机栈）和Native Method Stack （本地方法栈），</strong> 当线程终止时，三者（虚拟机栈，本地方法栈和程序计数器）所占用的内存空间也会被释放掉。这也是为什么我把内存区域分为线程共享和非线程共享的原因，非线程共享的那三个区域的生命周期与所属线程相同，而线程共享的区域与JAVA程序运行的生命周期相同，所以这也是系统垃圾回收的场所只发生在线程共享的区域（实际上对大部分虚拟机来说知发生在Heap上）的原因。</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrkraosbj30x10k874x.jpg" alt=""></p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrks46l1j30hu0gbt92.jpg" alt="JVM内存图2"></p><p>-Xmx: 最大堆大小</p><p>-Xms: 初始堆大小</p><p>-Xmn: 年轻代大小</p><p>-XXSurvivorRatio: 年轻代中Eden区与Survivor区的大小比值</p><p>一个年轻代由1个Eden区加2个Survivor区组成</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/运行时数据区.png" alt=""></p><h1 id="堆" tabindex="-1"><a class="header-anchor" href="#堆"><span>堆</span></a></h1><ul><li>内存区域中最大的一块，<strong>被所有线程共享</strong>，所有的<strong>对象实例以及数组</strong>都要在堆上分配。</li><li>堆是垃圾收集器管理的主要区域。</li><li>从内存回收的角度来看：堆区可以细分为<strong>新生代</strong>和<strong>老年代</strong>；对新生代再细致一点的有<strong>Eden</strong>空间、<strong>From Surviror</strong>空间、<strong>To Survivor</strong>空间等。</li><li>从内存分配的角度来看：堆可以划分出多个线程私有的分配缓冲区(TLAB)</li><li>堆内存逻辑上连续、物理上不连续；既可以实现成固定大小，也可以在运行时动态调整：<code>Xms 256M</code> <code>Xmx 1024M</code>，其中<code>-X</code>代表它是JVM运行参数，<code>ms</code>是memory start，内存初始值，<code>mx</code>是memory max，内存最大值</li><li>堆内存的空间分配<img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrksxin4j313c0m2e81.jpg" alt=""><ul><li>老年代占 2/3</li><li>新生代占 1/3 <ul><li>Eden占 8/10</li><li>From Survivor占 1/10</li><li>To Survivor 占 1/10</li></ul></li><li><code>-XX:IntialSurvivorRatio</code> 新生代中Eden/Survivor空间的初始比例，默认是8</li><li><code>-XX:NewRatio</code> 老年代/新生代的内存比例，默认是2</li></ul></li><li>堆内存溢出：<code>OutOfMemoryError: Java heap space</code></li><li><code>-XX:+HeapDumpOnOutOfMemoryError</code>：让JVM遇到OOM异常时，输出堆内信息</li></ul><h2 id="jvm创建一个新对象的内存分配流程" tabindex="-1"><a class="header-anchor" href="#jvm创建一个新对象的内存分配流程"><span>JVM创建一个新对象的内存分配流程</span></a></h2><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrktwl9jj30y50u0x6q.jpg" alt=""></p><ol><li><strong>绝大部分对象在Eden区生成</strong></li><li>当Eden区填满时，会触发<code>Young Garbage Collection</code>即<code>YGC</code></li><li>在Eden区实现回收的策略 <ol><li>没有被引用的对象直接回收，如果还存活则移送到<code>Survivor</code>区</li><li>Survivor区分为s0/s1两块内存空间，每次进行YGC的时候，将存活对象复制到未使用的那块空间，然后将当前正在使用的空间完全清除，<strong>交换两块空间的使用状态</strong></li><li>如果YGC要移送的对象大于Survivor区容量的上限，则直接移交给老年代</li><li>交换次数到阈值的时候晋升到老年代。<code>-XX:MaxTenuringThreshold</code>配置新生代晋升到老年代的阈值，默认是15，交换次数到达第15次，晋升老年代。</li></ol></li></ol><h1 id="metaspace元空间" tabindex="-1"><a class="header-anchor" href="#metaspace元空间"><span>Metaspace元空间</span></a></h1><ul><li><p><strong>在HotSpot JVM中</strong>，<strong>方法区</strong>用于存放<strong>类(Class)<strong>和</strong>方法的元数据(Method)<strong>以及</strong>常量池</strong>，每当一个类初次被加载时，它的元数据都会放到方法区中，该区域被<strong>所有线程共享</strong></p></li><li><p>永久代是HotSpot虚拟机对虚拟机规范中方法区的一种实现方式，永久代中加载的类太多会导致永久代内存溢出，<code>OutOfMemoryError:PermGen</code>。因为要促进HotSpot和JRockit融合，而JRockit没有永久代，再加上JVM开发者希望这一块内存可以更灵活管理，<strong>最终<code>PermGen</code>最终被移除，方法区移动至<code>Metaspace</code>，字符串常量池移至堆区</strong></p></li><li><p>Jdk8中，类的元信息(Object)、字段、静态属性(System.in)、方法、常量(100000)等都移动到元空间区</p></li><li><p>元空间的本质和永久代类似，都是对 JVM 规范中方法区的实现。不过元空间与永久代之间最大的区别在于：<strong>元空间并不在虚拟机中，而是使用本地内存</strong>。因此，默认情况下，元空间的大小仅受本地内存限制。**而永久代虽然可以设置内存的大小，但是很难确定一个合适的大小。**因为其中的影响因素很多，比如类数量的多少、常量数量的多少等。<strong>永久代中的元数据的位置也会随着一次full GC发生移动</strong>，比较消耗虚拟机性能。</p></li><li><p>调参</p><table><thead><tr><th>参数</th><th>作用</th></tr></thead><tbody><tr><td>-XX:MetaspaceSize</td><td>分配给Metaspace的初始大小（字节单位）</td></tr><tr><td>-XX:MaxMetaspaceSize</td><td>分配给Metaspace的最大值，超过此值会触发<strong>Full GC</strong>，默认没有限制，但应该取决于系统内存的大小。<strong>JVM会动态改变此值</strong></td></tr><tr><td>-XX:MinMetaspaceFreeRatio</td><td>在GC后，最小的Metaspace剩余空间容量的百分比，减少为分配空间所导致的垃圾收集</td></tr><tr><td>-XX:MaxMetaspaceFreeRatio</td><td>在GC后，最大的Metaspace剩余空间容量的百分比，减少为释放空间所导致的垃圾收集</td></tr></tbody></table></li></ul><h1 id="java虚拟机栈" tabindex="-1"><a class="header-anchor" href="#java虚拟机栈"><span>Java虚拟机栈</span></a></h1><ul><li>JVM会为<strong>每一个线程</strong>被<strong>创建</strong>时，创建一个<strong>单独的栈</strong>，换言之该区域是<strong>线程私有</strong>的，栈的生命周期和线程一样</li><li>所有的Java方法(非native方法)都是通过Java虚拟机栈来实现调用和执行的，当然这个过程需要堆、元空间数据的配合</li><li>方法需要执行则需要入栈，执行完毕之后方法需要出栈，出入栈的元素称为栈帧。<strong>栈对应线程，栈帧对应方法</strong>。每一个栈帧中分配多少内存基本上是在类结构确定下来时就已知的</li><li>在活动线程中，只有位于栈顶的栈帧才是有效。<code>StackOverflowError</code>标识<strong>请求的栈溢出，内存耗尽</strong></li><li>在执行方法的过程中，如果出现了异常，会进行<strong>异常回溯</strong>，返回地址通过异常处理表确定。</li></ul><h2 id="局部变量表" tabindex="-1"><a class="header-anchor" href="#局部变量表"><span>局部变量表</span></a></h2><ul><li>存放<strong>方法参数</strong>、<strong>方法内部定义的局部变量</strong>的区域（存放8种基本数据类型和引用类型的引用，实例存在堆中）</li><li>局部变量表所需的内存空间<strong>在编译期间完成分配</strong>，当进入一个方法时，这个方法需要在帧中<strong>分配多大的局部变量空间是完全确定的</strong>，在方法运行期间<strong>不会改变局部变量表的大小</strong>。</li></ul><h2 id="操作栈" tabindex="-1"><a class="header-anchor" href="#操作栈"><span>操作栈</span></a></h2><ul><li>当JVM为方法创建栈帧的时候，<strong>在栈帧中为方法创建一个操作数栈</strong>，保证方法内指令可以完成工作</li><li>重要</li></ul><h2 id="动态连接" tabindex="-1"><a class="header-anchor" href="#动态连接"><span>动态连接</span></a></h2><ul><li><strong>每个栈帧中包含一个在常量池中对当前方法的引用</strong>，目的是支持方法调用过程的动态连接</li></ul><h2 id="方法返回地址" tabindex="-1"><a class="header-anchor" href="#方法返回地址"><span>方法返回地址</span></a></h2><ul><li>遇到<code>RETURN</code>、<code>IRETURN</code>、<code>ARETURN</code>等返回字节码指令，正常退出</li><li>异常退出</li></ul><h1 id="本地方法栈" tabindex="-1"><a class="header-anchor" href="#本地方法栈"><span>本地方法栈</span></a></h1><ul><li>Java虚拟机栈为虚拟机执行Java方法服务，本地方法栈为虚拟机执行Native方法服务</li><li>本地方法栈同样会抛出<code>StackOverflowError</code></li><li><strong>该区域也是线程私有的</strong></li></ul><h1 id="程序计数器" tabindex="-1"><a class="header-anchor" href="#程序计数器"><span>程序计数器</span></a></h1><ul><li><strong>线程私有</strong>，可以看作是当前线程所执行的字节码的行号指示器：CPU可能交替执行A、B线程，CPU需要知道执行线程A的哪一部分指令，程序计数器会告诉CPU</li></ul><h1 id="直接内存" tabindex="-1"><a class="header-anchor" href="#直接内存"><span>直接内存</span></a></h1><ul><li>不是虚拟机运行时数据区的一部分，也不是虚拟机规范中定义的内存区域，但是这部分也会被频繁使用，也会导致<code>OutOfMemoryError</code></li><li>NIO引用了一种基于通道和缓冲区的IO方式，可以使用 Native 函数库直接分配堆外内存，然后通过一个存储在 Java 堆中的 DirectByteBuffer 对象作为这块内存的引用进行操作。这样能在一些场景中显著提高性能，因为<strong>避免了在 Java 堆和 Native 堆中来回复制数据</strong></li></ul><h1 id="code-cache" tabindex="-1"><a class="header-anchor" href="#code-cache"><span>Code Cache</span></a></h1><ul><li><p>JVM<strong>将其字节码存储为本机代码的区域</strong></p></li><li><p>JIT是代码缓存区域的最大消费者</p></li><li><p>如果这一块OOM了，在日志中可以看到<code>OutOfMemoryError code cache</code></p></li><li></li></ul><table><thead><tr><th>选项</th><th>默认值</th><th>描述</th></tr></thead><tbody><tr><td>PrintCodeCache</td><td>false</td><td>是否在JVM退出前打印CodeCache使用情况</td></tr><tr><td>PrintCodeCacheOnCompilation</td><td>false</td><td>是否在每个方法被JIT编译后打印使用情况</td></tr></tbody></table><h1 id="垃圾回收" tabindex="-1"><a class="header-anchor" href="#垃圾回收"><span>垃圾回收</span></a></h1><h3 id="哪些内存需要回收-gc发生的内存区域" tabindex="-1"><a class="header-anchor" href="#哪些内存需要回收-gc发生的内存区域"><span>哪些内存需要回收，GC发生的内存区域</span></a></h3><h3 id="什么时候回收" tabindex="-1"><a class="header-anchor" href="#什么时候回收"><span>什么时候回收</span></a></h3><h3 id="如何回收" tabindex="-1"><a class="header-anchor" href="#如何回收"><span>如何回收</span></a></h3><h3 id="如何判断这个对象需要回收-gc的存活标准" tabindex="-1"><a class="header-anchor" href="#如何判断这个对象需要回收-gc的存活标准"><span>如何判断这个对象需要回收，GC的存活标准</span></a></h3><h2 id="垃圾收集器" tabindex="-1"><a class="header-anchor" href="#垃圾收集器"><span>垃圾收集器</span></a></h2><ul><li>串行收集器</li><li>并行收集器</li><li>CMS收集器</li><li>G1收集器</li></ul><h2 id="gc的目标区域" tabindex="-1"><a class="header-anchor" href="#gc的目标区域"><span>GC的目标区域</span></a></h2><ul><li><strong>堆 和 方法区</strong>，因为运行期间才能知道会创建哪些对象，所以<strong>内存的分配和回收都是动态的</strong>。程序计数器、虚拟机栈、本地方法栈都是线程私有的，生命周期和线程一致。每一个栈帧分配多少内存基本上在类结构确定下来就是已知的；方法结束或线程结束，内存自然就随着回收了。所以<strong>这几个区域的内存分配和回收都是确定的</strong>。</li></ul><h2 id="gc的存活标准" tabindex="-1"><a class="header-anchor" href="#gc的存活标准"><span>GC的存活标准</span></a></h2><ul><li><p>引用计数算法</p><ul><li>在对象头维护着一个<code>counter</code>计数器，对象被引用一次则计数器+1；若引用无效则计数器-1，当计数器为0时，就认为该对象无效了。</li><li>缺陷：无法解决循环引用的问题，当循环引用的对象的计数器永远不为0，导致这些对象永远不会被释放</li></ul></li><li><p>可达性分析算法</p><ul><li>从<code>GC Roots</code>为起点开始向下搜索，<strong>当一个对象的GC Roots没有与任何<code>引用链</code>相连时</strong>，证明该对象是<code>不可达对象</code>。</li><li><strong>GC Roots</strong>：Java虚拟机栈中的局部变量表中引用的对象、本地方法栈中引用的对象、元空间中常量引用的对象、元空间中静态属性引用的对象</li><li><strong>引用链</strong>：GC Roots向下搜索所经过的路径</li></ul></li><li><p>引用分类，JVM在进行GC的时候对不同的引用类型有着不同的策略</p><ul><li><p>强引用：<strong>只有当强引用被设为null的时候，对象才会被回收</strong>。如果被错误地保持了强引用，如赋值给了static变量，则很长时间不会被回收</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">MyClass</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> obj </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> MyClass</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li><p>软引用：<strong>只有当JVM认为内存不足时，才会去试图回收软引用指向的对象；JVM会确保在抛出<code>OutOfMemoryError</code>之前，清理软引用指向的对象</strong>。软引用通常用来实现内存敏感的缓存：有空闲则保留，内存不足则清理。</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">SoftReference</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">MyClass</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> weakReference </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> WeakReference</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> MyClass</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">())</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li><p>弱引用：<strong>当JVM进行垃圾回收时，无论内存是否充足，都会回收只被弱引用指向的对象</strong></p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">WeakReference</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">MyClass</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> weakReference </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> WeakReference</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> MyClass</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">())</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li><p>虚引用：一个对象是否有虚引用的存在，<strong>完全不会对其生存时间构成影响</strong>，也无法通过虚引用来取得一个对象实例。<strong>被虚引用指向唯一目的就是能在这个对象被收集器回收时收到一个系统通知</strong></p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">PhantomReference</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">MyClass</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> phantomReference </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> PhantomReference</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> MyClass</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> ReferenceQueue</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">())</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li></ul></li></ul><h2 id="gc算法" tabindex="-1"><a class="header-anchor" href="#gc算法"><span>GC算法</span></a></h2><ul><li>标记-清除算法（Mark-Sweep） <ul><li>优点：快速</li><li>缺点：1.标记和清除这两个过程的<strong>效率都不高</strong>；2.<strong>空间问题</strong>，标记清除之后会产生大量不连续的内存碎片。<strong>导致后面在分配大对象的时候无法找到足够大且连续的内存而不得不提前触发另一次垃圾回收</strong></li><li><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrkux7i8j30m807y74o.jpg" alt=""></li></ul></li><li>复制算法（Copying） <ul><li>将可用内存按容量划分为<strong>大小相等的两块</strong>，每次只使用其中一块。当这一块的内存用完了，就将还<strong>存活的对象复制到另一块上面</strong>，并对前一块空间进行清理</li><li><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrkvvgwfj30m809x3z0.jpg" alt=""></li><li>优点：每次都是对半区内存进行回收，分配大对象的时候也就不用考虑内存碎片的问题</li><li>缺点：<strong>可用内存缩小了一半</strong></li><li>这种算法一般用在<strong>新生代</strong></li></ul></li><li>标记-整理算法（Mark-Compact） <ul><li><strong>标记过程和标记-清除算法一样</strong>，但是后续是让所有存活对象都向一端移动，然后<strong>清理掉端边界以外的可回收对象</strong></li><li><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrkwtbdpj30m80bpjs2.jpg" alt=""></li><li>主要用于老年代</li></ul></li><li>分代收集算法 <ul><li>新生代：复制算法</li><li>老年代：标记-清除算法、标记-整理算法</li><li><strong>先有分代收集算法，才会将堆分成新生代和老年代</strong></li></ul></li></ul><h2 id="gc术语" tabindex="-1"><a class="header-anchor" href="#gc术语"><span>GC术语</span></a></h2><ul><li><strong>部分收集(Partial GC)</strong>：目标不是完整收集整个Java堆的垃圾收集 <ul><li><strong>新生代收集(Minor GC/Young GC/YGC)</strong>：新生代的垃圾收集</li><li><strong>老年代收集(Major GC/Old GC/OGC)</strong>：老年代的垃圾收集，<strong>目前只有GMS收集器会有单独收集老年代的行为</strong></li><li><strong>混合收集(Mixed GC)</strong>：收集整个新生代以及部分老年代的垃圾收集，<strong>目前只有G1收集器会有这种行为</strong></li></ul></li><li><strong>整堆收集(Full GC)</strong>：收集整个Java堆和方法区的垃圾收集</li><li><strong>并行(Parallel)</strong>：并行阶段是由多个GC 线程执行</li><li><strong>串行(Serial)</strong>：串行阶段在单个GC线程上执行</li><li><strong>STW(Stop The World)</strong>：在Stop The World阶段，应用程序被暂停，以便GC线程执行其工作。当应用程序因为GC暂停时，通常是由于Stop The World阶段</li><li><strong>并发(Concurrent)</strong>：应用程序线程和垃圾收集器线程交替执行</li><li><strong>增量</strong>：</li></ul><h2 id="垃圾收集器-1" tabindex="-1"><a class="header-anchor" href="#垃圾收集器-1"><span>垃圾收集器</span></a></h2>',57),l=[n];function r(o,g){return a(),s("div",null,l)}const p=i(t,[["render",r],["__file","JVM.html.vue"]]),c=JSON.parse('{"path":"/writings/archive/JVM.html","title":"堆","lang":"zh-CN","frontmatter":{"description":"方法区在JVM中也是一个非常重要的区域，它与堆一样，是被 线程共享 的区域。 在方法区中，存储了每个类的信息（包括类的名称、方法信息、字段信息）、静态变量、常量以及编译器编译后的代码等。 方法区域存放了所加载的类的信息（名称、修饰符等）、类中的静态变量、类中定义为final类型的常量、类中的Field信息、类中的方法信息，当开发人员在程序中通过Clas...","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/archive/JVM.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"堆"}],["meta",{"property":"og:description","content":"方法区在JVM中也是一个非常重要的区域，它与堆一样，是被 线程共享 的区域。 在方法区中，存储了每个类的信息（包括类的名称、方法信息、字段信息）、静态变量、常量以及编译器编译后的代码等。 方法区域存放了所加载的类的信息（名称、修饰符等）、类中的静态变量、类中定义为final类型的常量、类中的Field信息、类中的方法信息，当开发人员在程序中通过Clas..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrkraosbj30x10k874x.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-30T16:21:52.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:modified_time","content":"2022-07-30T16:21:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"堆\\",\\"image\\":[\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrkraosbj30x10k874x.jpg\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrks46l1j30hu0gbt92.jpg\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/%E8%BF%90%E8%A1%8C%E6%97%B6%E6%95%B0%E6%8D%AE%E5%8C%BA.png\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrksxin4j313c0m2e81.jpg\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrktwl9jj30y50u0x6q.jpg\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrkux7i8j30m807y74o.jpg\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrkvvgwfj30m809x3z0.jpg\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrkwtbdpj30m80bpjs2.jpg\\"],\\"dateModified\\":\\"2022-07-30T16:21:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"JVM创建一个新对象的内存分配流程","slug":"jvm创建一个新对象的内存分配流程","link":"#jvm创建一个新对象的内存分配流程","children":[]},{"level":2,"title":"局部变量表","slug":"局部变量表","link":"#局部变量表","children":[]},{"level":2,"title":"操作栈","slug":"操作栈","link":"#操作栈","children":[]},{"level":2,"title":"动态连接","slug":"动态连接","link":"#动态连接","children":[]},{"level":2,"title":"方法返回地址","slug":"方法返回地址","link":"#方法返回地址","children":[{"level":3,"title":"哪些内存需要回收，GC发生的内存区域","slug":"哪些内存需要回收-gc发生的内存区域","link":"#哪些内存需要回收-gc发生的内存区域","children":[]},{"level":3,"title":"什么时候回收","slug":"什么时候回收","link":"#什么时候回收","children":[]},{"level":3,"title":"如何回收","slug":"如何回收","link":"#如何回收","children":[]},{"level":3,"title":"如何判断这个对象需要回收，GC的存活标准","slug":"如何判断这个对象需要回收-gc的存活标准","link":"#如何判断这个对象需要回收-gc的存活标准","children":[]}]},{"level":2,"title":"垃圾收集器","slug":"垃圾收集器","link":"#垃圾收集器","children":[]},{"level":2,"title":"GC的目标区域","slug":"gc的目标区域","link":"#gc的目标区域","children":[]},{"level":2,"title":"GC的存活标准","slug":"gc的存活标准","link":"#gc的存活标准","children":[]},{"level":2,"title":"GC算法","slug":"gc算法","link":"#gc算法","children":[]},{"level":2,"title":"GC术语","slug":"gc术语","link":"#gc术语","children":[]},{"level":2,"title":"垃圾收集器","slug":"垃圾收集器-1","link":"#垃圾收集器-1","children":[]}],"git":{"createdTime":null,"updatedTime":1659198112000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":13.16,"words":3949},"filePathRelative":"writings/archive/JVM.md","autoDesc":true}');export{p as comp,c as data};