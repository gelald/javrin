import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as s,c as a,e as t}from"./app.0f4f56d8.js";const p={},o=t(`<h1 id="\u5224\u65AD\u7EBF\u7A0B\u6C60\u4E2D\u7684\u7EBF\u7A0B\u662F\u5426\u6267\u884C\u5B8C\u6BD5" tabindex="-1"><a class="header-anchor" href="#\u5224\u65AD\u7EBF\u7A0B\u6C60\u4E2D\u7684\u7EBF\u7A0B\u662F\u5426\u6267\u884C\u5B8C\u6BD5" aria-hidden="true">#</a> \u5224\u65AD\u7EBF\u7A0B\u6C60\u4E2D\u7684\u7EBF\u7A0B\u662F\u5426\u6267\u884C\u5B8C\u6BD5</h1><h2 id="\u95EE\u9898\u5F15\u5165" tabindex="-1"><a class="header-anchor" href="#\u95EE\u9898\u5F15\u5165" aria-hidden="true">#</a> \u95EE\u9898\u5F15\u5165</h2><p>\u5982\u679C\u67D0\u4E00\u4E2A\u7EBF\u7A0B\u6C60\u4E2D\u6267\u884C\u4EFB\u52A1\u90FD\u662F\u6BD4\u8F83\u91CD\u8981\u7684\uFF0C\u6211\u4EEC\u5E0C\u671B\u8FD9\u4E2A\u7EBF\u7A0B\u6C60\u9500\u6BC1\u524D\u5148\u6B63\u786E\u6267\u884C\u5B8C\u6240\u6709<strong>\u5DF2\u63D0\u4EA4</strong>\u7684\u4EFB\u52A1\uFF0C\u6709\u54EA\u4E9B\u65B9\u5F0F\u53EF\u4EE5\u8FDB\u884C\u9500\u6BC1\u524D\u7684\u7B49\u5F85\u5462\uFF1F</p><h2 id="\u5B9A\u4E49\u7EBF\u7A0B\u6C60" tabindex="-1"><a class="header-anchor" href="#\u5B9A\u4E49\u7EBF\u7A0B\u6C60" aria-hidden="true">#</a> \u5B9A\u4E49\u7EBF\u7A0B\u6C60</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ThreadPoolExecutor</span> poolExecutor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span>
    <span class="token number">10</span><span class="token punctuation">,</span>								<span class="token comment">// 10\u4E2A\u6838\u5FC3\u7EBF\u7A0B</span>
    <span class="token number">20</span><span class="token punctuation">,</span>								<span class="token comment">// \u7EBF\u7A0B\u6C60\u6700\u5927\u7EBF\u7A0B\u6570\u91CF20\u4E2A</span>
    <span class="token number">0L</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span>SECONDS<span class="token punctuation">,</span>			<span class="token comment">// \u975E\u6838\u5FC3\u7EBF\u7A0B\u4E00\u65E6\u7A7A\u95F2\uFF0C\u7ACB\u9A6C\u56DE\u6536</span>
    <span class="token keyword">new</span> <span class="token class-name">LinkedBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span>	<span class="token comment">// \u4EFB\u52A1\u961F\u5217\u6700\u5927\u5BB9\u91CF30\u4E2A\u4EFB\u52A1</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5B9A\u4E49\u7EBF\u7A0B\u4EFB\u52A1" tabindex="-1"><a class="header-anchor" href="#\u5B9A\u4E49\u7EBF\u7A0B\u4EFB\u52A1" aria-hidden="true">#</a> \u5B9A\u4E49\u7EBF\u7A0B\u4EFB\u52A1</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">executeBiz</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> sleepTime <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Double</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">longValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u968F\u673A\u7761\u7720\u4E00\u5B9A\u65F6\u95F4\u6A21\u62DF\u4E1A\u52A1</span>
        <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span>MILLISECONDS<span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span>sleepTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F53\u524D\u7EBF\u7A0B\u6267\u884C\u7ED3\u675F: &quot;</span> <span class="token operator">+</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="isterminated-\u65B9\u5F0F" tabindex="-1"><a class="header-anchor" href="#isterminated-\u65B9\u5F0F" aria-hidden="true">#</a> isTerminated \u65B9\u5F0F</h2><p>\u5728\u4E3B\u7EBF\u7A0B\u4E2D\u8FDB\u884C\u5FAA\u73AF\u6267\u884C <code>isTerminated</code> \u65B9\u6CD5\u6765\u5224\u65AD\u7EBF\u7A0B\u6C60\u4E2D\u7684\u4EFB\u52A1\u662F\u5426\u5168\u90E8\u5B8C\u6210</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">30</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token keyword">int</span> index <span class="token operator">=</span> i<span class="token punctuation">;</span>
        poolExecutor<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F53\u524D\u7EBF\u7A0B\u4EFB\u52A1\u5F00\u59CB\u6267\u884C: &quot;</span> <span class="token operator">+</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">executeBiz</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    poolExecutor<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>poolExecutor<span class="token punctuation">.</span><span class="token function">isTerminated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span>SECONDS<span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\u7EBF\u7A0B\u6C60\u8FD8\u6CA1\u5B8C\u6210\u6240\u6709\u4EFB\u52A1...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5168\u90E8\u7EBF\u7A0B\u5B8C\u6210\u6267\u884C\uFF0C\u7EBF\u7A0B\u6C60\u6210\u529F\u505C\u6B62&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F18\u70B9\uFF1A\u7B80\u5355</p><p>\u7F3A\u70B9\uFF1A\u9700\u8981\u5173\u95ED\u7EBF\u7A0B\u6C60\u624D\u80FD\u901A\u8FC7 <code>isTerminated</code> \u65B9\u6CD5\u6765\u5224\u65AD\uFF0C\u56E0\u4E3A\u5982\u679C\u4E0D\u6267\u884C <code>shutdown</code> \u6216 <code>shutdownNow</code> \u65B9\u6CD5\uFF0C<code>isTerminated</code> \u65B9\u6CD5\u6C38\u8FDC\u90FD\u4E0D\u4F1A\u8FD4\u56DE <code>true</code> \u3002\u4F46\u662F\u4E00\u822C\u5B9E\u9645\u5F00\u53D1\u4E2D\u6781\u5C11\u6570\u60C5\u51B5\u4F1A\u5728\u4E2D\u9014\u5173\u95ED\u7EBF\u7A0B\u6C60\uFF0C\u56E0\u4E3A\u7EBF\u7A0B\u6C60\u7684\u521B\u5EFA\u4E0E\u5173\u95ED\u4E5F\u662F\u6709\u4E00\u5B9A\u5F00\u9500\u7684\uFF0C\u4E00\u822C\u7684\u505A\u6CD5\u662F\u5F53\u7CFB\u7EDF\u5173\u95ED\u65F6\u624D\u8FDB\u884C\u7EBF\u7A0B\u6C60\u7684\u9500\u6BC1\u3002</p><h2 id="getcompletetaskcount-\u65B9\u5F0F" tabindex="-1"><a class="header-anchor" href="#getcompletetaskcount-\u65B9\u5F0F" aria-hidden="true">#</a> getCompleteTaskCount \u65B9\u5F0F</h2><p><code>getTaskCount</code> : \u8FD4\u56DE\u5DF2\u7ECF\u63D0\u4EA4\u7684\u4EFB\u52A1\u603B\u6570</p><p><code>getCompleteTaskCount</code> : \u8FD4\u56DE\u5DF2\u7ECF\u6210\u529F\u6267\u884C\u7684\u4EFB\u52A1\u603B\u6570</p><p>\u5728\u4E3B\u7EBF\u7A0B\u4E2D\u5FAA\u73AF\u6267\u884C <code>getCompleteTaskCount</code> \u65B9\u6CD5\u6765\u83B7\u53D6\u5DF2\u5B8C\u6210\u7684\u4EFB\u52A1\u6570</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">30</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token keyword">int</span> index <span class="token operator">=</span> i<span class="token punctuation">;</span>
        poolExecutor<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F53\u524D\u7EBF\u7A0B\u4EFB\u52A1\u5F00\u59CB\u6267\u884C: &quot;</span> <span class="token operator">+</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">executeBiz</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>poolExecutor<span class="token punctuation">.</span><span class="token function">getTaskCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> poolExecutor<span class="token punctuation">.</span><span class="token function">getCompletedTaskCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F53\u524D\u5DF2\u63D0\u4EA4\u7684\u4EFB\u52A1\u6570: &quot;</span> <span class="token operator">+</span> poolExecutor<span class="token punctuation">.</span><span class="token function">getTaskCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;, \u5F53\u524D\u5DF2\u5B8C\u6210\u7684\u4EFB\u52A1\u6570: &quot;</span> <span class="token operator">+</span> poolExecutor<span class="token punctuation">.</span><span class="token function">getCompletedTaskCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span>SECONDS<span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\u7EBF\u7A0B\u6C60\u8FD8\u6CA1\u5B8C\u6210\u6240\u6709\u4EFB\u52A1...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5168\u90E8\u7EBF\u7A0B\u5B8C\u6210\u6267\u884C\uFF0C\u7EBF\u7A0B\u6C60\u6210\u529F\u505C\u6B62&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F18\u70B9\uFF1A\u4E0D\u9700\u8981\u5173\u95ED\u7EBF\u7A0B\u6C60\uFF0C\u907F\u514D\u521B\u5EFA\u548C\u9500\u6BC1\u7EBF\u7A0B\u6C60\u5E26\u6765\u7684\u5F00\u9500</p><p>\u7F3A\u70B9\uFF1A\u5FC5\u987B\u786E\u4FDD\u6267\u884C <code>getTaskCount</code> \u65B9\u6CD5\u65F6\uFF0C\u6240\u6709\u7EBF\u7A0B\u4EFB\u52A1\u5DF2\u5168\u90E8\u63D0\u4EA4\u6267\u884C\uFF0C\u5426\u5219\u8FD9\u4E2A\u6570\u662F\u4E0D\u51C6\u786E\u7684</p><h2 id="countdownlatch-\u65B9\u5F0F" tabindex="-1"><a class="header-anchor" href="#countdownlatch-\u65B9\u5F0F" aria-hidden="true">#</a> CountDownLatch \u65B9\u5F0F</h2><p>CountDownLatch \u662F JDK \u63D0\u4F9B\u7684\u4E00\u4E2A\u540C\u6B65\u5DE5\u5177\uFF0C\u53EF\u4EE5\u8FBE\u5230\u8BA9\u4E00\u4E2A\u6216\u591A\u4E2A\u7EBF\u7A0B\u7B49\u5F85\u5176\u4ED6\u7EBF\u7A0B\u6267\u884C\u5B8C\u6210\u7684\u6548\u679C</p><p>\u5728\u521D\u59CB\u5316\u65F6\u6307\u5B9A\u4E00\u4E2A\u6574\u6570\u4F5C\u4E3A\u8BA1\u6570\u5668</p><p>\u5F53\u8C03\u7528 <code>countDown</code> \u65B9\u6CD5\u65F6\uFF0C\u8BA1\u6570\u5668\u4F1A\u51CF 1</p><p>\u5F53\u8C03\u7528 <code>await</code> \u65B9\u6CD5\u65F6\uFF0C\u5982\u679C\u5F53\u524D\u8BA1\u6570\u5668\u5927\u4E8E 0\uFF0C\u90A3\u4E48\u5F53\u524D\u7EBF\u7A0B\u4F1A\u88AB\u963B\u585E\uFF0C\u76F4\u5230\u8BA1\u6570\u5668\u51CF\u5230 0 \u4E3A\u6B62</p><hr><p>\u663E\u7136\u53EF\u4EE5\u8BA9\u4E3B\u7EBF\u7A0B\u8C03\u7528 <code>await</code> \u65B9\u6CD5\u6765\u7B49\u5F85\u6240\u6709\u7684\u4EFB\u52A1\u7EBF\u7A0B\u6267\u884C\u5B8C\u6BD5</p><p>\u8C03\u6574\u4E00\u4E0B\u4EFB\u52A1\u8C03\u7528\u903B\u8F91\uFF0C\u591A\u4F20\u5165\u4E00\u4E2A CountDownLatch \u53C2\u6570\u4EE5\u4F9B\u5B50\u7EBF\u7A0B\u8C03\u7528 <code>countDown</code> \u65B9\u6CD5</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">executeBiz</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">,</span> <span class="token class-name">CountDownLatch</span> latch<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> sleepTime <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Double</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">longValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span>MILLISECONDS<span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span>sleepTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F53\u524D\u7EBF\u7A0B\u6267\u884C\u7ED3\u675F: &quot;</span> <span class="token operator">+</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        latch<span class="token punctuation">.</span><span class="token function">countDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token keyword">final</span> <span class="token keyword">int</span> taskCount <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">;</span>
    <span class="token class-name">CountDownLatch</span> countDownLatch <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CountDownLatch</span><span class="token punctuation">(</span>taskCount<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> taskCount<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token keyword">int</span> index <span class="token operator">=</span> i<span class="token punctuation">;</span>
        poolExecutor<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F53\u524D\u7EBF\u7A0B\u4EFB\u52A1\u5F00\u59CB\u6267\u884C: &quot;</span> <span class="token operator">+</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">executeBiz</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> countDownLatch<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\u6B63\u5728\u7B49\u5F85\u7EBF\u7A0B\u6C60\u4E2D\u7684\u4EFB\u52A1\u6267\u884C...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    countDownLatch<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5168\u90E8\u7EBF\u7A0B\u5B8C\u6210\u6267\u884C\uFF0C\u7EBF\u7A0B\u6C60\u6210\u529F\u505C\u6B62&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F18\u70B9\uFF1A\u663E\u7136\u4F7F\u7528 CountDownLatch \u662F\u4E09\u79CD\u65B9\u5F0F\u4E2D\u6700\u4E3A\u7075\u6D3B\u7684\u4E00\u79CD</p><p>\u7F3A\u70B9\uFF1A\u552F\u4E00\u7684\u7F3A\u70B9\u662F\u9700\u8981\u63D0\u524D\u77E5\u9053\u6240\u6709\u7684\u7EBF\u7A0B\u6570\uFF0C\u5426\u5219\u8BA1\u6570\u5668\u65E0\u6CD5\u51C6\u786E\u5730\u5DE5\u4F5C</p>`,31),e=[o];function c(u,l){return s(),a("div",null,e)}var r=n(p,[["render",c],["__file","\u5224\u65AD\u7EBF\u7A0B\u6C60\u4E2D\u7684\u7EBF\u7A0B\u662F\u5426\u6267\u884C\u5B8C\u6BD5.html.vue"]]);export{r as default};
