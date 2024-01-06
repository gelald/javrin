import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as s,e}from"./app-f9042815.js";const i={},t=e(`<h1 id="线程堆栈分析" tabindex="-1"><a class="header-anchor" href="#线程堆栈分析" aria-hidden="true">#</a> 线程堆栈分析</h1><blockquote><p>Thread Dump是非常有用的诊断Java应用问题的工具</p></blockquote><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2><p>Thread Dump 是非常有用的诊断 Java 应用问题的工具。每一个 JVM 都有及时生成所有线程在某一点状态的thread-dump的能力。它提供了当前活动线程的快照，及JVM中所有Java线程的堆栈跟踪信息，堆栈信息一般包含完整的类名及所执行的方法，甚至还有源代码的行数，并且执行的时候不影响系统的性能。</p><h2 id="抓取" tabindex="-1"><a class="header-anchor" href="#抓取" aria-hidden="true">#</a> 抓取</h2><p>一般系统挂起、崩溃或者性能低下时，需要抓取系统的线程堆栈（Thread Dump）来进行后续的分析。但是由于Thread Dump只是一个线程的快照，往往不足以确定问题。一般每次会间隔20-30秒，至少抓取3次dump信息，如果多次dump信息都指向同一个问题，那么问题可能就被确定了。</p><p>线程堆栈的抓取，一般有两种方式</p><ul><li><p>操作系统层面</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> 应用名
<span class="token function">kill</span> <span class="token parameter variable">-3</span> <span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>kill -3可以打印进程各个线程的堆栈信息，kill -3 pid 后文件的保存路径为：<code>/proc/\${pid}/cwd</code>，文件名为：antBuilderOutput.log</p><p>弊端：容易手误输成 <code>kill -9</code> 导致系统进程被杀死，一般不使用这种方式</p></li><li><p>Java 层面</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>jps <span class="token comment"># 打印所有的Java进程</span>
jstack <span class="token punctuation">[</span>-l <span class="token punctuation">]</span> <span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token function">tee</span> <span class="token parameter variable">-a</span> jstack.log <span class="token comment"># 获取ThreadDump</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>JVM 为我们提供了强大的调试工具，先是通过 jps 来找到对应的应用的进程，然后通过 jstack 来获取 ThreadDump 信息</p></li></ul><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><h3 id="dump-信息" tabindex="-1"><a class="header-anchor" href="#dump-信息" aria-hidden="true">#</a> Dump 信息</h3><ul><li><p>头部信息：时间、JVM 信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">2022</span>-03-27 <span class="token number">14</span>:49:18
Full thread dump Java HotSpot<span class="token punctuation">(</span>TM<span class="token punctuation">)</span> <span class="token number">64</span>-Bit Server VM <span class="token punctuation">(</span><span class="token number">25.291</span>-b10 mixed mode<span class="token punctuation">)</span>:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>线程 INFO 信息块</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>. <span class="token string">&quot;Timer-0&quot;</span> daemon <span class="token assign-left variable">prio</span><span class="token operator">=</span><span class="token number">10</span> <span class="token assign-left variable">tid</span><span class="token operator">=</span>0xac190c00 <span class="token assign-left variable">nid</span><span class="token operator">=</span>0xaef <span class="token keyword">in</span> Object.wait<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>0xae77d000<span class="token punctuation">]</span> 
<span class="token comment"># 线程名称：Timer-0；线程类型：daemon；优先级: 10，默认是5；</span>
<span class="token comment"># JVM线程id：tid=0xac190c00，JVM内部线程的唯一标识（通过java.lang.Thread.getId()获取，通常用自增方式实现）。</span>
<span class="token comment"># 对应系统线程id（NativeThread ID）：nid=0xaef，和top命令查看的线程pid对应，不过一个是10进制，一个是16进制。（通过命令：top -H -p pid，可以查看该进程的所有线程信息）</span>
<span class="token comment"># 线程状态：in Object.wait()；</span>
<span class="token comment"># 起始栈地址：[0xae77d000]，对象的内存地址，通过JVM内存查看工具，能够看出线程是在哪儿个对象上等待；</span>
<span class="token number">2</span>.  java.lang.Thread.State: TIMED_WAITING <span class="token punctuation">(</span>on object monitor<span class="token punctuation">)</span>
<span class="token number">3</span>.  at java.lang.Object.wait<span class="token punctuation">(</span>Native Method<span class="token punctuation">)</span>
<span class="token number">4</span>.  <span class="token parameter variable">-waiting</span> on <span class="token operator">&lt;</span>0xb3885f6<span class="token operator"><span class="token file-descriptor important">0</span>&gt;</span> <span class="token punctuation">(</span>a java.util.TaskQueue<span class="token punctuation">)</span>     <span class="token comment"># 继续wait </span>
<span class="token number">5</span>.  at java.util.TimerThread.mainLoop<span class="token punctuation">(</span>Timer.java:509<span class="token punctuation">)</span>
<span class="token number">6</span>.  <span class="token parameter variable">-locked</span> <span class="token operator">&lt;</span>0xb3885f6<span class="token operator"><span class="token file-descriptor important">0</span>&gt;</span> <span class="token punctuation">(</span>a java.util.TaskQueue<span class="token punctuation">)</span>         <span class="token comment"># 已经locked</span>
<span class="token number">7</span>.  at java.util.TimerThread.run<span class="token punctuation">(</span>Timer.java:462<span class="token punctuation">)</span>
Java thread statck trace：是上面2-7行的信息。到目前为止这是最重要的数据，Java stack trace提供了大部分信息来精确定位问题根源。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="java-thread-stack-trace-详解" tabindex="-1"><a class="header-anchor" href="#java-thread-stack-trace-详解" aria-hidden="true">#</a> Java Thread Stack Trace 详解</h3><p>基于栈的结构特性，所以应该自下而上地分析堆栈信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token parameter variable">-locked</span> <span class="token operator">&lt;</span>0xb3885f6<span class="token operator"><span class="token file-descriptor important">0</span>&gt;</span> <span class="token punctuation">(</span>a java.util.TaskQueue<span class="token punctuation">)</span>
<span class="token parameter variable">-waiting</span> on <span class="token operator">&lt;</span>0xb3885f6<span class="token operator"><span class="token file-descriptor important">0</span>&gt;</span> <span class="token punctuation">(</span>a java.util.TaskQueue<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>也就是说对象先上锁，锁住对象 0xb3885f60 ，然后释放该对象锁，进入waiting状态</strong></p><p>大致的代码可以还原成如下结构</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">synchronized</span> <span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//...</span>
    obj<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这块代码的执行流程是这样子：</p><ol><li>先使用 <code>synchronized</code> 获取了对象的 <code>Monitor</code> （对应于 <code>locked &lt;0xb3885f60&gt;</code>）</li><li>当执行到 <code>obj.wait()</code> 时，线程放弃了 <code>Monitor</code> 的所有权，进入了 「wait set」队列（对应于 <code>waiting on &lt;0xb3885f60&gt;</code>）</li></ol><h3 id="线程状态分析" tabindex="-1"><a class="header-anchor" href="#线程状态分析" aria-hidden="true">#</a> 线程状态分析</h3><p>线程状态是一个很重要的指标，我们往往可以根据线程的状态分析到线程运行的状态、过程等，进一步发现问题所在。线程的状态在 <code>Thread.State</code> 这个内部枚举类中有定义。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">State</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 刚创建尚未启动的状态
     */</span>
    <span class="token constant">NEW</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/**
     * 可运行的状态
     * 处于可运行的线程具备运行的条件，在运行队列中等待操作系统的调度，或者是运行中的状态
     * 如果长期处于这个状态，这说明线程一直得不得执行的机会（存在线程饥饿的问题），或者是线程运行时间很长（存在性能问题）
     */</span>
    <span class="token constant">RUNNABLE</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/**
     * 线程正在等待获取java对象的监视器(也叫内置锁)，正在等待进入由synchronized保护的代码块。
     * synchronized用来保证原子性，任意时刻最多只能由一个线程进入该临界区域，其他线程只能排队等待。
     */</span>
    <span class="token constant">BLOCKED</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/**
     * 等待状态
     * 进入这个状态可能是由于调用了这几个方法
     *   不填写超时时间的 Object.wait()
     *   不填写超时时间的 Thread.join()
     *   LockSupport.part()
     * 处于这个状态的线程只有等待某个特定的事件发生，才能得到执行的机会（通常是另一个线程）
     * 如果不发生这个特定的事件，线程只能处于一直等待的状态，不会得到执行的机会
     * 比如：
     * A线程调用了obj对象的obj.wait方法，如果没有线程调用obj.notify或obj.notifyAll方法，那么A线程就没有办法恢复运行
     */</span>
    <span class="token constant">WAITING</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/**
     * 限时等待状态
     * 这个状态的线程意味着调用了限时版本的等待方法。
     * 不同于WAITING状态，TIMED_WAITING状态当发生特定事件或者等待时间过去后，线程一样可以恢复运行。
     */</span>
    <span class="token constant">TIMED_WAITING</span><span class="token punctuation">,</span>
    
    <span class="token doc-comment comment">/**
     * 结束状态
     * 可能是线程执行完成run方法后正常返回，或者是抛出异常而结束
     */</span>
    <span class="token constant">TERMINATED</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22),l=[t];function p(c,o){return a(),s("div",null,l)}const u=n(i,[["render",p],["__file","线程堆栈分析.html.vue"]]);export{u as default};
