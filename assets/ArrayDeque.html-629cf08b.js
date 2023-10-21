import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as s,e}from"./app-859571d0.js";const t={},p=e(`<h1 id="arraydeque" tabindex="-1"><a class="header-anchor" href="#arraydeque" aria-hidden="true">#</a> ArrayDeque</h1><blockquote><p>ArrayDeque 现在已经逐渐取代 Stack 的位置，称为实现栈功能的首选集合</p></blockquote><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><h3 id="从栈说起" tabindex="-1"><a class="header-anchor" href="#从栈说起" aria-hidden="true">#</a> 从栈说起</h3><p>栈是一种具有元素先进后出特点的数据结构</p><p>虽然 Java 里有一个叫做 Stack 的类，但是当需要使用栈时，Java 已不推荐使用 Stack，而是<strong>推荐使用更高效的 ArrayDeque</strong>，次选是 LinkedList。</p><h3 id="deque" tabindex="-1"><a class="header-anchor" href="#deque" aria-hidden="true">#</a> Deque</h3><p>ArrayDeque 和 LinkedList 都实现了一个 Deque 接口，Deque（double ended queue），表示双向队列，接口内定义了对头尾元素的插入删除等操作，所以既可以当作栈进行使用，也可以当作队列使用。</p><h2 id="底层实现" tabindex="-1"><a class="header-anchor" href="#底层实现" aria-hidden="true">#</a> 底层实现</h2><p>从名字可以猜测出 ArrayDeque 底层通过数组实现，为了满足可以同时在数组两端插入或删除元素的需求，该数组还必须是循环的，即<strong>循环数组</strong>，也就是说数组的任何一点都可能被看作起点或者终点。另外，该容器不允许放入<code>null</code>元素。</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220314152101.png" alt=""></p><p>ArrayDeque 包含了两个指针，head 指向循环数组中第一个有效元素，tail 指向循环数组尾端第一个可以插入元素的空位。可以看到 head 不一定总是等于 0，且head 不一定总是比 tail 大。</p><h2 id="构造方法" tabindex="-1"><a class="header-anchor" href="#构造方法" aria-hidden="true">#</a> 构造方法</h2><p>因为 ArrayDeque 底层是数组，所以构造方法主要是完成数组的初始化。</p><p>与 ArrayList 类似，构造方法有三个重载形式</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 空参构造默认初始化为长度为16的数组</span>
<span class="token keyword">public</span> <span class="token class-name">ArrayDeque</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    elements <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token number">16</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 传入指定长度来初始化数组</span>
<span class="token keyword">public</span> <span class="token class-name">ArrayDeque</span><span class="token punctuation">(</span><span class="token keyword">int</span> numElements<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">allocateElements</span><span class="token punctuation">(</span>numElements<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 传入集合来初始化数组</span>
<span class="token keyword">public</span> <span class="token class-name">ArrayDeque</span><span class="token punctuation">(</span><span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">allocateElements</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">addAll</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要值得注意的是：数组长度必须是2的倍数，如果传入的值不符合这个条件，需要进行修正</p><p>经过系列的移位操作，保证了两个字节中一定是 2 的 n 次幂 - 1 的条件，然后再自增，最终保证了数组初始化长度一定是 2 的 n 次幂</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">MIN_INITIAL_CAPACITY</span> <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">calculateSize</span><span class="token punctuation">(</span><span class="token keyword">int</span> numElements<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> initialCapacity <span class="token operator">=</span> <span class="token constant">MIN_INITIAL_CAPACITY</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>numElements <span class="token operator">&gt;=</span> initialCapacity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        initialCapacity <span class="token operator">=</span> numElements<span class="token punctuation">;</span>
        initialCapacity <span class="token operator">|=</span> <span class="token punctuation">(</span>initialCapacity <span class="token operator">&gt;&gt;&gt;</span>  <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        initialCapacity <span class="token operator">|=</span> <span class="token punctuation">(</span>initialCapacity <span class="token operator">&gt;&gt;&gt;</span>  <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        initialCapacity <span class="token operator">|=</span> <span class="token punctuation">(</span>initialCapacity <span class="token operator">&gt;&gt;&gt;</span>  <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        initialCapacity <span class="token operator">|=</span> <span class="token punctuation">(</span>initialCapacity <span class="token operator">&gt;&gt;&gt;</span>  <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        initialCapacity <span class="token operator">|=</span> <span class="token punctuation">(</span>initialCapacity <span class="token operator">&gt;&gt;&gt;</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        initialCapacity<span class="token operator">++</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>initialCapacity <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>   <span class="token comment">// Too many elements, must back off</span>
            initialCapacity <span class="token operator">&gt;&gt;&gt;=</span> <span class="token number">1</span><span class="token punctuation">;</span><span class="token comment">// Good luck allocating 2 ^ 30 elements</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> initialCapacity<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自动扩容" tabindex="-1"><a class="header-anchor" href="#自动扩容" aria-hidden="true">#</a> 自动扩容</h2><p>由于底层是数组，和 ArrayList 类似，当数组空间不够时，就需要进行自动扩容。和 ArrayList 不同，ArrayDeque 的扩容是扩大为原来容量的 2 倍，无论 head 和 tail 扩容前是多少，扩容后都统一为 head = 0，tail = 新数组长度</p><p>扩容流程图</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220314153332.png" alt=""></p><p>扩容的过程中会把数组分为两部分拷贝</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">doubleCapacity</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">assert</span> head <span class="token operator">==</span> tail<span class="token punctuation">;</span>
    <span class="token keyword">int</span> p <span class="token operator">=</span> head<span class="token punctuation">;</span>
    <span class="token keyword">int</span> n <span class="token operator">=</span> elements<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token keyword">int</span> r <span class="token operator">=</span> n <span class="token operator">-</span> p<span class="token punctuation">;</span> <span class="token comment">// head右边元素的个数</span>
    <span class="token keyword">int</span> newCapacity <span class="token operator">=</span> n <span class="token operator">&lt;&lt;</span> <span class="token number">1</span><span class="token punctuation">;</span><span class="token comment">//原空间的2倍</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>newCapacity <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token string">&quot;Sorry, deque too big&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">[</span>newCapacity<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">arraycopy</span><span class="token punctuation">(</span>elements<span class="token punctuation">,</span> p<span class="token punctuation">,</span> a<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> r<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//复制右半部分，对应上图中绿色部分</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">arraycopy</span><span class="token punctuation">(</span>elements<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> a<span class="token punctuation">,</span> r<span class="token punctuation">,</span> p<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//复制左半部分，对应上图中灰色部分</span>
    elements <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">E</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>a<span class="token punctuation">;</span>
    head <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    tail <span class="token operator">=</span> n<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="添加元素" tabindex="-1"><a class="header-anchor" href="#添加元素" aria-hidden="true">#</a> 添加元素</h2><p>由于是双向队列，所以添加元素可以从两个方向添加，体现到具体方法就是 addFirst、addLast</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addFirst</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token comment">//不允许放入null</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    elements<span class="token punctuation">[</span>head <span class="token operator">=</span> <span class="token punctuation">(</span>head <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token punctuation">(</span>elements<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> e<span class="token punctuation">;</span><span class="token comment">//下标是否越界</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> tail<span class="token punctuation">)</span><span class="token comment">//空间是否够用</span>
        <span class="token function">doubleCapacity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//扩容</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下标越界的处理解决起来非常简单，<code>head = (head - 1) &amp; (elements.length - 1)</code> 就可以了，<strong>这段代码相当于取余，同时解决了 <code>head</code> 为负值的情况</strong>。因为<code>elements.length</code> 必需是<code>2</code>的指数倍，<code>elements - 1</code> 就是二进制低位全 <code>1</code>，跟 <code>head - 1</code> 相与之后就起到了取模的作用，如果 <code>head - 1 </code>为负数(其实只可能是-1)，则相当于对其取相对于 <code>elements.length</code> 的补码。</p><p>addFirst 的工作原理图</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220314165914.png" alt=""></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addLast</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token comment">//不允许放入null</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    elements<span class="token punctuation">[</span>tail<span class="token punctuation">]</span> <span class="token operator">=</span> e<span class="token punctuation">;</span><span class="token comment">//赋值</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span>tail <span class="token operator">=</span> <span class="token punctuation">(</span>tail <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token punctuation">(</span>elements<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> head<span class="token punctuation">)</span><span class="token comment">//下标越界处理</span>
        <span class="token function">doubleCapacity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//扩容</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>addLast 的工作原理图</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220314170008.png" alt=""></p><h2 id="返回元素" tabindex="-1"><a class="header-anchor" href="#返回元素" aria-hidden="true">#</a> 返回元素</h2><p>返回元素也同样有两个方向，从首端、尾端返回，并且可以选择获取元素是否从集合中删除</p><p>pollFirst 删除并返回 ArrayDeque 首端元素</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">pollFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">E</span> result <span class="token operator">=</span> elements<span class="token punctuation">[</span>head<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token comment">// null值意味着deque为空</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    elements<span class="token punctuation">[</span>h<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span><span class="token comment">// 设置为null让GC起作用</span>
    head <span class="token operator">=</span> <span class="token punctuation">(</span>head <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token punctuation">(</span>elements<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//下标越界处理</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>peekFirst 返回但不删除 ArrayDeque 首端元素</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">peekFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> elements<span class="token punctuation">[</span>head<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// elements[head] is null if deque empty</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="相关-api-归纳" tabindex="-1"><a class="header-anchor" href="#相关-api-归纳" aria-hidden="true">#</a> 相关 API 归纳</h2><h3 id="栈" tabindex="-1"><a class="header-anchor" href="#栈" aria-hidden="true">#</a> 栈</h3><p>和传统的 Stack 容器的 API 对应如下</p><table><thead><tr><th>Stack</th><th>Deque</th><th>说明</th></tr></thead><tbody><tr><td>push(e)</td><td>addFirst(e)</td><td>往栈中插入元素，失败抛异常</td></tr><tr><td>peek()</td><td>getFirst()</td><td>获取但不删除栈顶元素，失败抛异常</td></tr><tr><td>pop()</td><td>removeFirst()</td><td>获取并删除栈顶元素，失败抛异常</td></tr></tbody></table><blockquote><p>其实 Deque 关于栈的操作还有另一套 API，只不过和上面列的相比，只是遇到失败会返回特殊值( <code>false</code> 或 <code>null</code> )，一般情况下使用上面列出的即可</p></blockquote><h3 id="队列" tabindex="-1"><a class="header-anchor" href="#队列" aria-hidden="true">#</a> 队列</h3><p>和传统的 Queue 容器的 API 对应如下</p><table><thead><tr><th>Queue</th><th>Deque</th><th>说明</th></tr></thead><tbody><tr><td>add(e)</td><td>addLast(e)</td><td>向队列尾部插入元素，失败抛异常</td></tr><tr><td>element()</td><td>getFirst()</td><td>获取但不删除队列首元素，失败抛异常</td></tr><tr><td>remove()</td><td>removeFitst()</td><td>获取并删除队列首元素，失败抛异常</td></tr></tbody></table><blockquote><p>其实 Deque 关于队列的操作还有另一套 API，只不过和上面列的相比，只是遇到失败会返回特殊值( <code>false</code> 或 <code>null</code> )，一般情况下使用上面列出的即可</p></blockquote><h3 id="deque-的-api-一般规律" tabindex="-1"><a class="header-anchor" href="#deque-的-api-一般规律" aria-hidden="true">#</a> Deque 的 API 一般规律</h3><ul><li>如果操作失败抛异常，那么使用：<code>addXXX</code> 、<code>getXXX</code> 、<code>removeXXX</code><ul><li>如果操作首元素，那么就是：<code>addFirst</code> 、<code>getFirst</code> 、<code>removeFirst</code></li><li>如果操作尾元素，那么就是：<code>addLast</code> 、<code>getLast</code> 、<code>removeLast</code></li></ul></li><li>如果操作失败返回特殊值，那么使用：<code>offerXXX</code> 、<code>peekXXX</code> 、<code>pollXXX</code><ul><li>如果操作首元素，那么就是：<code>offerFirst</code> 、<code>peekFirst</code> 、<code>pollFirst</code></li><li>如果操作尾元素，那么就是：<code>offerLast</code> 、<code>peekLast</code> 、<code>pollLast</code></li></ul></li></ul>`,51),o=[p];function c(l,i){return a(),s("div",null,o)}const r=n(t,[["render",c],["__file","ArrayDeque.html.vue"]]);export{r as default};