import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as a,c as s,e as p}from"./app.0f4f56d8.js";const t={},e=p(`<h1 id="\u5185\u5B58\u5206\u6790" tabindex="-1"><a class="header-anchor" href="#\u5185\u5B58\u5206\u6790" aria-hidden="true">#</a> \u5185\u5B58\u5206\u6790</h1><blockquote><p>\u5728\u6392\u67E5 JVM \u7684\u76F8\u5173\u95EE\u9898\u4E2D\uFF0C\u5185\u5B58\u5206\u6790\u662F\u5176\u4E2D\u4E00\u4E2A\u6709\u6548\u7684\u624B\u6BB5</p></blockquote><h2 id="\u5E38\u89C1\u7684\u5185\u5B58\u6EA2\u51FA\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u5E38\u89C1\u7684\u5185\u5B58\u6EA2\u51FA\u95EE\u9898" aria-hidden="true">#</a> \u5E38\u89C1\u7684\u5185\u5B58\u6EA2\u51FA\u95EE\u9898</h2><h3 id="java-\u5806\u5185\u5B58\u6EA2\u51FA" tabindex="-1"><a class="header-anchor" href="#java-\u5806\u5185\u5B58\u6EA2\u51FA" aria-hidden="true">#</a> Java \u5806\u5185\u5B58\u6EA2\u51FA</h3><p>Java \u5806\u5185\u5B58\u6EA2\u51FA\u7684\u60C5\u51B5\u4E3B\u8981\u6709\u4E24\u79CD</p><h4 id="outofmemoryerror-java-heap-space" tabindex="-1"><a class="header-anchor" href="#outofmemoryerror-java-heap-space" aria-hidden="true">#</a> OutOfMemoryError: Java heap space</h4><p>\u53EF\u4EE5\u5C06 <code>-Xms(\u521D\u59CB\u5806\u5185\u5B58)</code>\uFF0C<code>-Xmx(\u6700\u5927\u5806\u5185\u5B58)</code> \u8BBE\u7F6E\u4E3A\u4E00\u6837\u6765\u7981\u6B62\u81EA\u52A8\u6269\u5C55\u5806\u5185\u5B58\u3002</p><p>\u5F53\u4F7F\u7528\u4E00\u4E2A\u6B7B\u5FAA\u73AF\u6765\u4E0D\u65AD\u5730\u5728 Java \u5806\u4E2D\u521B\u5EFA\u5BF9\u8C61\uFF0C\u5E76\u4E14 <code>GC-Roots</code> \u5230\u5BF9\u8C61\u4E4B\u95F4\u5B58\u5728\u5F15\u7528\u94FE\uFF0CJVM \u4E0D\u4F1A\u56DE\u6536\u5BF9\u8C61\uFF0C\u5C31\u4F1A\u53D1\u751F <code>OutOfMemory</code>\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">Exception</span> in thread <span class="token string">&quot;main&quot;</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>OutOfMemoryError</span><span class="token operator">:</span> <span class="token class-name">Java</span> heap space
	at <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span>Arrays</span><span class="token punctuation">.</span><span class="token function">copyOf</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">3210</span><span class="token punctuation">)</span>
	at <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span>Arrays</span><span class="token punctuation">.</span><span class="token function">copyOf</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">3181</span><span class="token punctuation">)</span>
	at <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span>ArrayList</span><span class="token punctuation">.</span><span class="token function">grow</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">261</span><span class="token punctuation">)</span>
	at <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span>ArrayList</span><span class="token punctuation">.</span><span class="token function">ensureExplicitCapacity</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">235</span><span class="token punctuation">)</span>
	at <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span>ArrayList</span><span class="token punctuation">.</span><span class="token function">ensureCapacityInternal</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">227</span><span class="token punctuation">)</span>
	at <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span>ArrayList</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">458</span><span class="token punctuation">)</span>
	<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5F53\u51FA\u73B0 OOM \u65F6\u53EF\u4EE5\u901A\u8FC7\u5DE5\u5177\u6765\u5206\u6790 <code>GC-Roots</code> \uFF0C\u67E5\u770B\u5BF9\u8C61\u548C <code>GC-Roots</code> \u662F\u5982\u4F55\u8FDB\u884C\u5173\u8054\u7684\uFF0C\u662F\u5426\u5B58\u5728\u5BF9\u8C61\u7684\u751F\u547D\u5468\u671F\u8FC7\u957F\uFF0C\u6216\u8005\u662F\u8FD9\u4E9B\u5BF9\u8C61\u786E\u5B9E\u8BE5\u5728\u7684\uFF0C\u90A3\u5C31\u8981\u8003\u8651\u5C06\u5806\u5185\u5B58\u8C03\u5927\u4E86\u3002</p><p>\u53EF\u4EE5\u4F7F\u7528 <code>-XX:+HeapDumpOutOfMemoryErorr</code> \u914D\u7F6E\uFF0C\u5F53\u53D1\u751F OOM \u65F6\u4F1A\u81EA\u52A8 dump \u5806\u6808\u5230\u6587\u4EF6\u4E2D\u3002</p><h4 id="outofmemoryerror-gc-overhead-limit-exceeded" tabindex="-1"><a class="header-anchor" href="#outofmemoryerror-gc-overhead-limit-exceeded" aria-hidden="true">#</a> OutOfMemoryError: GC overhead limit exceeded</h4><p>\u901A\u8FC7\u7EDF\u8BA1GC\u65F6\u95F4\u6765\u9884\u6D4B\u662F\u5426\u8981 OOM \u4E86\uFF0C\u63D0\u524D\u629B\u51FA\u5F02\u5E38\uFF0C\u9632\u6B62\u771F\u6B63\u7684 OOM \u53D1\u751F\u3002</p><p>Sun \u5B98\u65B9\u5BF9\u6B64\u7684\u5B9A\u4E49\u662F\uFF1A\u201C\u5E76\u884C/\u5E76\u53D1\u56DE\u6536\u5668\u5728GC\u56DE\u6536\u65F6\u95F4\u8FC7\u957F\u65F6\u4F1A\u629B\u51FAOutOfMemroyError\u3002\u8FC7\u957F\u7684\u5B9A\u4E49\u662F\uFF0C\u8D85\u8FC798%\u7684\u65F6\u95F4\u7528\u6765\u505AGC\u5E76\u4E14\u56DE\u6536\u4E86\u4E0D\u52302%\u7684\u5806\u5185\u5B58\u3002\u7528\u6765\u907F\u514D\u5185\u5B58\u8FC7\u5C0F\u9020\u6210\u5E94\u7528\u4E0D\u80FD\u6B63\u5E38\u5DE5\u4F5C\u3002\u201D</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Map</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> mapList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> i<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">,</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		mapList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>map<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>OutOfMemoryError</span><span class="token operator">:</span> GC overhead limit exceeded
	at <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span>HashMap</span><span class="token punctuation">.</span><span class="token function">newNode</span><span class="token punctuation">(</span><span class="token class-name">HashMap</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">1747</span><span class="token punctuation">)</span> <span class="token operator">~</span><span class="token punctuation">[</span>na<span class="token operator">:</span><span class="token number">1.8</span><span class="token number">.0_181</span><span class="token punctuation">]</span>
	at <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span>HashMap</span><span class="token punctuation">.</span><span class="token function">putVal</span><span class="token punctuation">(</span><span class="token class-name">HashMap</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">642</span><span class="token punctuation">)</span> <span class="token operator">~</span><span class="token punctuation">[</span>na<span class="token operator">:</span><span class="token number">1.8</span><span class="token number">.0_181</span><span class="token punctuation">]</span>
	at <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span>HashMap</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">HashMap</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">612</span><span class="token punctuation">)</span> <span class="token operator">~</span><span class="token punctuation">[</span>na<span class="token operator">:</span><span class="token number">1.8</span><span class="token number">.0_181</span><span class="token punctuation">]</span>
	<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8001\u5E74\u4EE3\u5360\u7528\u8FC7\u591A\u5BFC\u81F4\u9891\u7E41 Full GC\uFF0C\u6700\u7EC8\u5BFC\u81F4GC overhead limit exceed\u3002</p><p>\u53EF\u4EE5\u4F7F\u7528\u53C2\u6570 <code>-XX:-UseGCOverheadLimit</code> \u6765\u505C\u7528\u8FD9\u4E2A\u68C0\u67E5\uFF0C\u4E0D\u8FC7\u8FD9\u4E2A\u53C2\u6570\u65E0\u6CD5\u907F\u514D\u5185\u5B58\u95EE\u9898\uFF0C\u53EA\u4E0D\u8FC7\u662F\u628A\u5F02\u5E38\u5EF6\u540E\u5230\u771F\u6B63\u53D1\u751F OOM \u7684\u65F6\u5019</p><h3 id="metaspace-\u5143\u7A7A\u95F4-\u5185\u5B58\u6EA2\u51FA" tabindex="-1"><a class="header-anchor" href="#metaspace-\u5143\u7A7A\u95F4-\u5185\u5B58\u6EA2\u51FA" aria-hidden="true">#</a> MetaSpace\uFF08\u5143\u7A7A\u95F4\uFF09\u5185\u5B58\u6EA2\u51FA</h3><p>\u5728 Java8 \u4E2D\u4F7F\u7528\u4E86\u5143\u7A7A\u95F4\u6765\u4EE3\u66FF\u6C38\u4E45\u4EE3\u6765\u5B9E\u73B0\u65B9\u6CD5\u533A\uFF0C\u5982\u679C\u4E0D\u6307\u5B9A\u8FD9\u4E2A\u533A\u57DF\u5927\u5C0F\uFF0CJVM \u4F1A\u52A8\u6001\u8C03\u6574\u3002</p><p>\u4F7F\u7528 <code>-XX:MaxMetaspaceSize=10M</code> \u6765\u9650\u5236\u5143\u7A7A\u95F4\u6700\u5927\u5BB9\u91CF\u3002\u8FD9\u6837\u5F53\u4E0D\u505C\u7684\u521B\u5EFA\u7C7B\u65F6\u5C06\u4F1A\u5360\u6EE1\u8BE5\u533A\u57DF\u5E76\u51FA\u73B0 <code>OOM</code>\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token class-name">Enhancer</span> enhancer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Enhancer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		enhancer<span class="token punctuation">.</span><span class="token function">setSuperclass</span><span class="token punctuation">(</span><span class="token class-name">HeapOOM</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		enhancer<span class="token punctuation">.</span><span class="token function">setUseCache</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
		enhancer<span class="token punctuation">.</span><span class="token function">setCallback</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MethodInterceptor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token annotation punctuation">@Override</span>
			<span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">intercept</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">,</span> <span class="token class-name">Method</span> method<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> objects<span class="token punctuation">,</span> <span class="token class-name">MethodProxy</span> methodProxy<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span> methodProxy<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span>o<span class="token punctuation">,</span> objects<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		enhancer<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">Caused</span> by<span class="token operator">:</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span></span>InvocationTargetException</span>
	at <span class="token class-name"><span class="token namespace">sun<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span></span>GeneratedMethodAccessor1</span><span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token class-name">Unknown</span> <span class="token class-name">Source</span><span class="token punctuation">)</span>
	at <span class="token class-name"><span class="token namespace">sun<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span></span>DelegatingMethodAccessorImpl</span><span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token class-name">DelegatingMethodAccessorImpl</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">43</span><span class="token punctuation">)</span>
	at <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span></span>Method</span><span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token class-name">Method</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">498</span><span class="token punctuation">)</span>
	at <span class="token class-name"><span class="token namespace">net<span class="token punctuation">.</span>sf<span class="token punctuation">.</span>cglib<span class="token punctuation">.</span>core<span class="token punctuation">.</span></span>ReflectUtils</span><span class="token punctuation">.</span><span class="token function">defineClass</span><span class="token punctuation">(</span><span class="token class-name">ReflectUtils</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">459</span><span class="token punctuation">)</span>
	at <span class="token class-name"><span class="token namespace">net<span class="token punctuation">.</span>sf<span class="token punctuation">.</span>cglib<span class="token punctuation">.</span>core<span class="token punctuation">.</span></span>AbstractClassGenerator</span><span class="token punctuation">.</span><span class="token function">generate</span><span class="token punctuation">(</span><span class="token class-name">AbstractClassGenerator</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">336</span><span class="token punctuation">)</span>
	<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token number">11</span> more
<span class="token class-name">Caused</span> by<span class="token operator">:</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>OutOfMemoryError</span><span class="token operator">:</span> <span class="token class-name">Metaspace</span>
	at <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>ClassLoader</span><span class="token punctuation">.</span><span class="token function">defineClass1</span><span class="token punctuation">(</span><span class="token class-name">Native</span> <span class="token class-name">Method</span><span class="token punctuation">)</span>
	at <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>ClassLoader</span><span class="token punctuation">.</span><span class="token function">defineClass</span><span class="token punctuation">(</span><span class="token class-name">ClassLoader</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">763</span><span class="token punctuation">)</span>
	<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token number">16</span> more
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F7F\u7528 <code>cglib</code> \u4E0D\u505C\u7684\u521B\u5EFA\u65B0\u7C7B\uFF0C\u6700\u7EC8\u4F1A\u5F15\u53D1\u5143\u7A7A\u95F4\u7684 OOM\u3002</p><h2 id="\u5B9A\u4F4D\u5185\u5B58\u6CC4\u6F0F\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u5B9A\u4F4D\u5185\u5B58\u6CC4\u6F0F\u95EE\u9898" aria-hidden="true">#</a> \u5B9A\u4F4D\u5185\u5B58\u6CC4\u6F0F\u95EE\u9898</h2><h3 id="\u5806\u5185\u5B58-dump" tabindex="-1"><a class="header-anchor" href="#\u5806\u5185\u5B58-dump" aria-hidden="true">#</a> \u5806\u5185\u5B58 dump</h3><h4 id="\u5728-oom-\u65F6\u83B7\u53D6" tabindex="-1"><a class="header-anchor" href="#\u5728-oom-\u65F6\u83B7\u53D6" aria-hidden="true">#</a> \u5728 OOM \u65F6\u83B7\u53D6</h4><p>\u914D\u5408\u53C2\u6570 <code>-XX:+HeapDumpOutOfMemoryError -XX:HeapDumpPath=/data/logs/dump.log</code></p><p>\u5F53\u5806\u5185\u5B58\u7A7A\u95F4\u6EA2\u51FA\u65F6\u8F93\u51FA\u5806\u7684\u5185\u5B58\u5FEB\u7167\u5230\u6307\u5B9A\u6587\u4EF6\u4E2D</p><h4 id="jmap\u83B7\u53D6" tabindex="-1"><a class="header-anchor" href="#jmap\u83B7\u53D6" aria-hidden="true">#</a> jmap\u83B7\u53D6</h4><p>jmap \u662F Java \u81EA\u5E26\u7684\u8C03\u8BD5\u5DE5\u5177</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>jmap -dump:format<span class="token operator">=</span>b <span class="token assign-left variable">file</span><span class="token operator">=</span><span class="token operator">&lt;</span>\u6587\u4EF6\u540D.hprof<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>pid<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u56DB\u3001\u8C03\u4F18\u603B\u7ED3</strong></p><ol><li><p>\u5E74\u8F7B\u4EE3\u5927\u5C0F\u9009\u62E9</p><ul><li><strong>\u54CD\u5E94\u65F6\u95F4\u4F18\u5148\u7684\u5E94\u7528</strong>\uFF1A<strong>\u5C3D\u53EF\u80FD\u8BBE\u5927\uFF0C\u76F4\u5230\u63A5\u8FD1\u7CFB\u7EDF\u7684\u6700\u4F4E\u54CD\u5E94\u65F6\u95F4\u9650\u5236</strong>\uFF08\u6839\u636E\u5B9E\u9645\u60C5\u51B5\u9009\u62E9\uFF09\u3002\u5728\u6B64\u79CD\u60C5\u51B5\u4E0B\uFF0C\u5E74\u8F7B\u4EE3\u6536\u96C6\u53D1\u751F\u7684\u9891\u7387\u4E5F\u662F\u6700\u5C0F\u7684\u3002\u540C\u65F6\uFF0C\u51CF\u5C11\u5230\u8FBE\u5E74\u8001\u4EE3\u7684\u5BF9\u8C61\u3002</li><li><strong>\u541E\u5410\u91CF\u4F18\u5148\u7684\u5E94\u7528</strong>\uFF1A\u5C3D\u53EF\u80FD\u7684\u8BBE\u7F6E\u5927\uFF0C\u53EF\u80FD\u5230\u8FBEGbit\u7684\u7A0B\u5EA6\u3002\u56E0\u4E3A\u5BF9\u54CD\u5E94\u65F6\u95F4\u6CA1\u6709\u8981\u6C42\uFF0C\u5783\u573E\u6536\u96C6\u53EF\u4EE5\u5E76\u884C\u8FDB\u884C\uFF0C\u4E00\u822C\u9002\u54088CPU\u4EE5\u4E0A\u7684\u5E94\u7528\u3002</li></ul></li><li><p>\u5E74\u8001\u4EE3\u5927\u5C0F\u9009\u62E9</p><ul><li><p>\u54CD\u5E94\u65F6\u95F4\u4F18\u5148\u7684\u5E94\u7528</p><p>\uFF1A\u5E74\u8001\u4EE3\u4F7F\u7528\u5E76\u53D1\u6536\u96C6\u5668\uFF0C\u6240\u4EE5\u5176\u5927\u5C0F\u9700\u8981\u5C0F\u5FC3\u8BBE\u7F6E\uFF0C\u4E00\u822C\u8981\u8003\u8651</p><p>\u5E76\u53D1\u4F1A\u8BDD\u7387</p><p>\u548C</p><p>\u4F1A\u8BDD\u6301\u7EED\u65F6\u95F4</p><p>\u7B49\u4E00\u4E9B\u53C2\u6570\u3002\u5982\u679C\u5806\u8BBE\u7F6E\u5C0F\u4E86\uFF0C\u53EF\u4EE5\u4F1A\u9020\u6210\u5185\u5B58\u788E\u7247\u3001\u9AD8\u56DE\u6536\u9891\u7387\u4EE5\u53CA\u5E94\u7528\u6682\u505C\u800C\u4F7F\u7528\u4F20\u7EDF\u7684\u6807\u8BB0\u6E05\u9664\u65B9\u5F0F\uFF1B\u5982\u679C\u5806\u5927\u4E86\uFF0C\u5219\u9700\u8981\u8F83\u957F\u7684\u6536\u96C6\u65F6\u95F4\u3002\u6700\u4F18\u5316\u7684\u65B9\u6848\uFF0C\u4E00\u822C\u9700\u8981\u53C2\u8003\u4EE5\u4E0B\u6570\u636E\u83B7\u5F97\uFF1A</p><ul><li>\u5E76\u53D1\u5783\u573E\u6536\u96C6\u4FE1\u606F</li><li>\u6301\u4E45\u4EE3\u5E76\u53D1\u6536\u96C6\u6B21\u6570</li><li>\u4F20\u7EDFGC\u4FE1\u606F</li><li>\u82B1\u5728\u5E74\u8F7B\u4EE3\u548C\u5E74\u8001\u4EE3\u56DE\u6536\u4E0A\u7684\u65F6\u95F4\u6BD4\u4F8B</li></ul><p>\u51CF\u5C11\u5E74\u8F7B\u4EE3\u548C\u5E74\u8001\u4EE3\u82B1\u8D39\u7684\u65F6\u95F4\uFF0C\u4E00\u822C\u4F1A\u63D0\u9AD8\u5E94\u7528\u7684\u6548\u7387</p></li><li><p><strong>\u541E\u5410\u91CF\u4F18\u5148\u7684\u5E94\u7528</strong>\uFF1A\u4E00\u822C\u541E\u5410\u91CF\u4F18\u5148\u7684\u5E94\u7528\u90FD\u6709\u4E00\u4E2A\u5F88\u5927\u7684\u5E74\u8F7B\u4EE3\u548C\u4E00\u4E2A\u8F83\u5C0F\u7684\u5E74\u8001\u4EE3\u3002\u539F\u56E0\u662F\uFF0C\u8FD9\u6837\u53EF\u4EE5\u5C3D\u53EF\u80FD\u56DE\u6536\u6389\u5927\u90E8\u5206\u77ED\u671F\u5BF9\u8C61\uFF0C\u51CF\u5C11\u4E2D\u671F\u7684\u5BF9\u8C61\uFF0C\u800C\u5E74\u8001\u4EE3\u5C3D\u5B58\u653E\u957F\u671F\u5B58\u6D3B\u5BF9\u8C61\u3002</p></li></ul></li><li><p>\u8F83\u5C0F\u5806\u5F15\u8D77\u7684\u788E\u7247\u95EE\u9898</p><p>\u56E0\u4E3A\u5E74\u8001\u4EE3\u7684\u5E76\u53D1\u6536\u96C6\u5668\u4F7F\u7528\u6807\u8BB0\u3001\u6E05\u9664\u7B97\u6CD5\uFF0C\u6240\u4EE5\u4E0D\u4F1A\u5BF9\u5806\u8FDB\u884C\u538B\u7F29\u3002\u5F53\u6536\u96C6\u5668\u56DE\u6536\u65F6\uFF0C\u4ED6\u4F1A\u628A\u76F8\u90BB\u7684\u7A7A\u95F4\u8FDB\u884C\u5408\u5E76\uFF0C\u8FD9\u6837\u53EF\u4EE5\u5206\u914D\u7ED9\u8F83\u5927\u7684\u5BF9\u8C61\u3002\u4F46\u662F\uFF0C\u5F53\u5806\u7A7A\u95F4\u8F83\u5C0F\u65F6\uFF0C\u8FD0\u884C\u4E00\u6BB5\u65F6\u95F4\u4EE5\u540E\uFF0C\u5C31\u4F1A\u51FA\u73B0\u201C\u788E\u7247\u201D\uFF0C\u5982\u679C\u5E76\u53D1\u6536\u96C6\u5668\u627E\u4E0D\u5230\u8DB3\u591F\u7684\u7A7A\u95F4\uFF0C\u90A3\u4E48\u5E76\u53D1\u6536\u96C6\u5668\u5C06\u4F1A\u505C\u6B62\uFF0C\u7136\u540E\u4F7F\u7528\u4F20\u7EDF\u7684\u6807\u8BB0\u3001\u6E05\u9664\u65B9\u5F0F\u8FDB\u884C\u56DE\u6536\u3002\u5982\u679C\u51FA\u73B0\u201C\u788E\u7247\u201D\uFF0C\u53EF\u80FD\u9700\u8981\u8FDB\u884C\u5982\u4E0B\u914D\u7F6E\uFF1A</p><ul><li><strong>-XX:+UseCMSCompactAtFullCollection</strong>\uFF1A\u4F7F\u7528\u5E76\u53D1\u6536\u96C6\u5668\u65F6\uFF0C\u5F00\u542F\u5BF9\u5E74\u8001\u4EE3\u7684\u538B\u7F29\u3002</li><li><strong>-XX:CMSFullGCsBeforeCompaction=0</strong>\uFF1A\u4E0A\u9762\u914D\u7F6E\u5F00\u542F\u7684\u60C5\u51B5\u4E0B\uFF0C\u8FD9\u91CC\u8BBE\u7F6E\u591A\u5C11\u6B21Full GC\u540E\uFF0C\u5BF9\u5E74\u8001\u4EE3\u8FDB\u884C\u538B\u7F29</li></ul></li></ol>`,35),c=[e];function o(l,u){return a(),s("div",null,c)}var r=n(t,[["render",o],["__file","\u5185\u5B58\u5206\u6790.html.vue"]]);export{r as default};
