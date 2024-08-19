import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as l}from"./app-D62f3oGG.js";const n={},t=l(`<h1 id="线程堆栈分析" tabindex="-1"><a class="header-anchor" href="#线程堆栈分析"><span>线程堆栈分析</span></a></h1><blockquote><p>Thread Dump是非常有用的诊断Java应用问题的工具</p></blockquote><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span>介绍</span></a></h2><p>Thread Dump 是非常有用的诊断 Java 应用问题的工具。每一个 JVM 都有及时生成所有线程在某一点状态的thread-dump的能力。它提供了当前活动线程的快照，及JVM中所有Java线程的堆栈跟踪信息，堆栈信息一般包含完整的类名及所执行的方法，甚至还有源代码的行数，并且执行的时候不影响系统的性能。</p><h2 id="抓取" tabindex="-1"><a class="header-anchor" href="#抓取"><span>抓取</span></a></h2><p>一般系统挂起、崩溃或者性能低下时，需要抓取系统的线程堆栈（Thread Dump）来进行后续的分析。但是由于Thread Dump只是一个线程的快照，往往不足以确定问题。一般每次会间隔20-30秒，至少抓取3次dump信息，如果多次dump信息都指向同一个问题，那么问题可能就被确定了。</p><p>线程堆栈的抓取，一般有两种方式</p><ul><li><p>操作系统层面</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ps</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -ef</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">grep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 应用名</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">kill</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">pi</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">d&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>kill -3可以打印进程各个线程的堆栈信息，kill -3 pid 后文件的保存路径为：<code>/proc/\${pid}/cwd</code>，文件名为：antBuilderOutput.log</p><p>弊端：容易手误输成 <code>kill -9</code> 导致系统进程被杀死，一般不使用这种方式</p></li><li><p>Java 层面</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">jps</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> # 打印所有的Java进程</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">jstack</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [-l </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">]</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">pi</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">d&gt; | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">tee</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -a</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> jstack.log</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> # 获取ThreadDump</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>JVM 为我们提供了强大的调试工具，先是通过 jps 来找到对应的应用的进程，然后通过 jstack 来获取 ThreadDump 信息</p></li></ul><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析"><span>分析</span></a></h2><h3 id="dump-信息" tabindex="-1"><a class="header-anchor" href="#dump-信息"><span>Dump 信息</span></a></h3><ul><li><p>头部信息：时间、JVM 信息</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">2022-03-27</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 14:49:18</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Full</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> thread</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> dump</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Java</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> HotSpot</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">TM</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">64-Bit</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Server</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> VM</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (25.291-b10 </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">mixed</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> mode</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">):</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>线程 INFO 信息块</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">1.</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;Timer-0&quot;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> daemon</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> prio=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">10</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> tid=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0xac190c00</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> nid=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0xaef</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> in</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Object.wait</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() [0xae77d000] </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 线程名称：Timer-0；线程类型：daemon；优先级: 10，默认是5；</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># JVM线程id：tid=0xac190c00，JVM内部线程的唯一标识（通过java.lang.Thread.getId()获取，通常用自增方式实现）。</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 对应系统线程id（NativeThread ID）：nid=0xaef，和top命令查看的线程pid对应，不过一个是10进制，一个是16进制。（通过命令：top -H -p pid，可以查看该进程的所有线程信息）</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 线程状态：in Object.wait()；</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 起始栈地址：[0xae77d000]，对象的内存地址，通过JVM内存查看工具，能够看出线程是在哪儿个对象上等待；</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">2.</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  java.lang.Thread.State:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> TIMED_WAITING</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (on </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">object</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> monitor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">3.</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  at</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> java.lang.Object.wait</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Native</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Method</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">4.</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">  -waiting</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> on</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">0xb3885f6</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">0&gt; (a </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">java.util.TaskQueue</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)     </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 继续wait </span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">5.</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  at</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> java.util.TimerThread.mainLoop</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Timer.java:509</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">6.</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">  -locked</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">0xb3885f6</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">0&gt; (a </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">java.util.TaskQueue</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)         </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"># 已经locked</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">7.</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  at</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> java.util.TimerThread.run</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Timer.java:462</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Java</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> thread</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> statck</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> trace：是上面2-7行的信息。到目前为止这是最重要的数据，Java</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> stack</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> trace提供了大部分信息来精确定位问题根源。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="java-thread-stack-trace-详解" tabindex="-1"><a class="header-anchor" href="#java-thread-stack-trace-详解"><span>Java Thread Stack Trace 详解</span></a></h3><p>基于栈的结构特性，所以应该自下而上地分析堆栈信息</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">-locked</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">0xb3885f6</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">0&gt; (a </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">java.util.TaskQueue</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">-waiting</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> on</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">0xb3885f6</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">0&gt; (a </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">java.util.TaskQueue</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>也就是说对象先上锁，锁住对象 0xb3885f60 ，然后释放该对象锁，进入waiting状态</strong></p><p>大致的代码可以还原成如下结构</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">synchronized</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> (obj) {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">    //...</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">    obj</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">wait</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">    //...</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这块代码的执行流程是这样子：</p><ol><li>先使用 <code>synchronized</code> 获取了对象的 <code>Monitor</code> （对应于 <code>locked &lt;0xb3885f60&gt;</code>）</li><li>当执行到 <code>obj.wait()</code> 时，线程放弃了 <code>Monitor</code> 的所有权，进入了 「wait set」队列（对应于 <code>waiting on &lt;0xb3885f60&gt;</code>）</li></ol><h3 id="线程状态分析" tabindex="-1"><a class="header-anchor" href="#线程状态分析"><span>线程状态分析</span></a></h3><p>线程状态是一个很重要的指标，我们往往可以根据线程的状态分析到线程运行的状态、过程等，进一步发现问题所在。线程的状态在 <code>Thread.State</code> 这个内部枚举类中有定义。</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> enum</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> State</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">    /**</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     * 刚创建尚未启动的状态</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     */</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">    NEW</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">    /**</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     * 可运行的状态</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     * 处于可运行的线程具备运行的条件，在运行队列中等待操作系统的调度，或者是运行中的状态</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     * 如果长期处于这个状态，这说明线程一直得不得执行的机会（存在线程饥饿的问题），或者是线程运行时间很长（存在性能问题）</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     */</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">    RUNNABLE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">    /**</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     * 线程正在等待获取java对象的监视器(也叫内置锁)，正在等待进入由synchronized保护的代码块。</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     * synchronized用来保证原子性，任意时刻最多只能由一个线程进入该临界区域，其他线程只能排队等待。</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     */</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">    BLOCKED</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">    /**</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     * 等待状态</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     * 进入这个状态可能是由于调用了这几个方法</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     *   不填写超时时间的 Object.wait()</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     *   不填写超时时间的 Thread.join()</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     *   LockSupport.part()</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     * 处于这个状态的线程只有等待某个特定的事件发生，才能得到执行的机会（通常是另一个线程）</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     * 如果不发生这个特定的事件，线程只能处于一直等待的状态，不会得到执行的机会</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     * 比如：</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     * A线程调用了obj对象的obj.wait方法，如果没有线程调用obj.notify或obj.notifyAll方法，那么A线程就没有办法恢复运行</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     */</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">    WAITING</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">    /**</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     * 限时等待状态</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     * 这个状态的线程意味着调用了限时版本的等待方法。</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     * 不同于WAITING状态，TIMED_WAITING状态当发生特定事件或者等待时间过去后，线程一样可以恢复运行。</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     */</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">    TIMED_WAITING</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">    </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">    /**</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     * 结束状态</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     * 可能是线程执行完成run方法后正常返回，或者是抛出异常而结束</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     */</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">    TERMINATED</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22),e=[t];function h(k,p){return a(),s("div",null,e)}const c=i(n,[["render",h],["__file","线程堆栈分析.html.vue"]]),A=JSON.parse('{"path":"/writings/JVM/%E7%BA%BF%E7%A8%8B%E5%A0%86%E6%A0%88%E5%88%86%E6%9E%90.html","title":"线程堆栈分析","lang":"zh-CN","frontmatter":{"description":"线程堆栈分析 Thread Dump是非常有用的诊断Java应用问题的工具 介绍 Thread Dump 是非常有用的诊断 Java 应用问题的工具。每一个 JVM 都有及时生成所有线程在某一点状态的thread-dump的能力。它提供了当前活动线程的快照，及JVM中所有Java线程的堆栈跟踪信息，堆栈信息一般包含完整的类名及所执行的方法，甚至还有源代...","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/JVM/%E7%BA%BF%E7%A8%8B%E5%A0%86%E6%A0%88%E5%88%86%E6%9E%90.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"线程堆栈分析"}],["meta",{"property":"og:description","content":"线程堆栈分析 Thread Dump是非常有用的诊断Java应用问题的工具 介绍 Thread Dump 是非常有用的诊断 Java 应用问题的工具。每一个 JVM 都有及时生成所有线程在某一点状态的thread-dump的能力。它提供了当前活动线程的快照，及JVM中所有Java线程的堆栈跟踪信息，堆栈信息一般包含完整的类名及所执行的方法，甚至还有源代..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-28T15:20:13.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:modified_time","content":"2023-02-28T15:20:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"线程堆栈分析\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-02-28T15:20:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"介绍","slug":"介绍","link":"#介绍","children":[]},{"level":2,"title":"抓取","slug":"抓取","link":"#抓取","children":[]},{"level":2,"title":"分析","slug":"分析","link":"#分析","children":[{"level":3,"title":"Dump 信息","slug":"dump-信息","link":"#dump-信息","children":[]},{"level":3,"title":"Java Thread Stack Trace 详解","slug":"java-thread-stack-trace-详解","link":"#java-thread-stack-trace-详解","children":[]},{"level":3,"title":"线程状态分析","slug":"线程状态分析","link":"#线程状态分析","children":[]}]}],"git":{"createdTime":null,"updatedTime":1677597613000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":4.56,"words":1368},"filePathRelative":"writings/JVM/线程堆栈分析.md","autoDesc":true}');export{c as comp,A as data};
