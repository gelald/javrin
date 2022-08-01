import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as a,c as s,d as e}from"./app.0d811bf4.js";const o={},c=e(`<h1 id="\u7EBF\u7A0B\u6C60" tabindex="-1"><a class="header-anchor" href="#\u7EBF\u7A0B\u6C60" aria-hidden="true">#</a> \u7EBF\u7A0B\u6C60</h1><h2 id="\u7EBF\u7A0B\u6C60\u5F15\u5165" tabindex="-1"><a class="header-anchor" href="#\u7EBF\u7A0B\u6C60\u5F15\u5165" aria-hidden="true">#</a> \u7EBF\u7A0B\u6C60\u5F15\u5165</h2><p>\u5728 Java \u4E2D\uFF0C\u6211\u4EEC\u4E00\u822C\u901A\u8FC7\u7EE7\u627F <code>Thread</code> \u7C7B\u548C\u5B9E\u73B0 <code>Runnnable</code> \u63A5\u53E3\uFF0C\u8C03\u7528\u7EBF\u7A0B\u7684 <code>start()</code> \u65B9\u6CD5\u5B9E\u73B0\u7EBF\u7A0B\u7684\u542F\u52A8\u3002\u4F46\u5982\u679C\u5E76\u53D1\u7684\u6570\u91CF\u5F88\u591A\uFF0C\u800C\u4E14\u6BCF\u4E2A\u7EBF\u7A0B\u90FD\u662F\u6267\u884C\u5F88\u77ED\u7684\u65F6\u95F4\u4FBF\u7ED3\u675F\u4E86\uFF0C\u90A3\u6837<strong>\u9891\u7E41\u7684\u521B\u5EFA\u7EBF\u7A0B\u548C\u9500\u6BC1\u8FDB\u7A0B\u4F1A\u5927\u5927\u7684\u964D\u4F4E\u7CFB\u7EDF\u8FD0\u884C\u7684\u6548\u7387</strong>\u3002</p><p>\u7EBF\u7A0B\u6C60\u6B63\u662F\u4E3A\u4E86\u89E3\u51B3\u591A\u7EBF\u7A0B\u6548\u7387\u4F4E\u7684\u95EE\u9898\u800C\u4EA7\u751F\u7684\uFF0C\u901A\u8FC7\u7BA1\u7406\u4E00\u7EC4\u5DE5\u4F5C\u7EBF\u7A0B\u4F7F\u5F97\u7EBF\u7A0B\u53EF\u4EE5\u88AB\u590D\u7528\uFF0C\u7EBF\u7A0B\u6267\u884C\u7ED3\u675F\u540E\u4E0D\u88AB\u9500\u6BC1\uFF0C\u800C\u662F\u53EF\u4EE5\u7EE7\u7EED\u6267\u884C\u5176\u4ED6\u4EFB\u52A1\u3002\u5728\u9AD8\u5E76\u53D1\u73AF\u5883\u4E0B\uFF0C\u7CFB\u7EDF\u8D44\u6E90\u662F\u5B9D\u8D35\u7684\uFF0C\u9700\u8981\u8282\u7EA6\u8D44\u6E90\u624D\u80FD\u63D0\u9AD8\u53EF\u7528\u6027\u3002</p><p>\u7EBF\u7A0B\u6C60\u7684\u4F5C\u7528\u4E00\u8A00\u4EE5\u853D\u4E4B\uFF0C\u5C31\u662F\u63D0\u9AD8\u7CFB\u7EDF\u6548\u7387\u548C\u541E\u5410\u91CF\u3002\u5982\u679C\u670D\u52A1\u5668\u5BF9\u6BCF\u4E2A\u8BF7\u6C42\u90FD\u5206\u522B\u521B\u5EFA\u4E00\u4E2A\u7EBF\u7A0B\u7684\u8BDD\uFF0C\u5728\u5F88\u77ED\u65F6\u95F4\u5185\u5C31\u4F1A\u4EA7\u751F\u5F88\u591A\u521B\u5EFA\u548C\u9500\u6BC1\u7684\u52A8\u4F5C\uFF0C\u7136\u800C\u670D\u52A1\u5668\u5728\u521B\u5EFA\u548C\u9500\u6BC1\u7EBF\u7A0B\u4E0A\u82B1\u8D39\u7684\u65F6\u95F4\u548C\u6D88\u8017\u7684\u7CFB\u7EDF\u8D44\u6E90\u90FD\u76F8\u5F53\u5927\uFF0C\u7EBF\u7A0B\u6C60\u5C31\u53EF\u4EE5\u5C3D\u91CF\u51CF\u5C11\u8FD9\u79CD\u60C5\u51B5\u7684\u53D1\u751F\u3002</p><h2 id="threadpoolexecutor" tabindex="-1"><a class="header-anchor" href="#threadpoolexecutor" aria-hidden="true">#</a> ThreadPoolExecutor</h2><p><code>ThreadPoolExecutor</code> \u662F Java \u4E2D\u63D0\u4F9B\u7684\u5E38\u7528\u7684\u7EBF\u7A0B\u6C60\u5BF9\u8C61\u3002</p><h3 id="\u91CD\u8981\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#\u91CD\u8981\u53C2\u6570" aria-hidden="true">#</a> \u91CD\u8981\u53C2\u6570</h3><ul><li><p><code>corePoolSize</code>\uFF1A\u6838\u5FC3\u7EBF\u7A0B\u6570\u3002</p><ul><li>\u6838\u5FC3\u7EBF\u7A0B\u9ED8\u8BA4\u60C5\u51B5\u4E0B\u4F1A<strong>\u4E00\u76F4\u5B58\u6D3B</strong>\uFF0C\u5373\u4F7F\u6CA1\u6709\u4EFB\u52A1\u9700\u8981\u6267\u884C\u3002</li><li>\u5F53\u7EBF\u7A0B\u6570\u5C0F\u4E8E\u6838\u5FC3\u7EBF\u7A0B\u6570\u65F6\uFF0C\u5373\u4F7F\u6709\u7EBF\u7A0B\u7A7A\u95F2\uFF0C\u7EBF\u7A0B\u6C60\u4E5F\u4F1A\u4F18\u5148\u521B\u5EFA\u65B0\u7EBF\u7A0B\u5904\u7406\u3002</li></ul></li><li><p><code>queueCapacity</code>\uFF1A\u4EFB\u52A1\u961F\u5217\u5BB9\u91CF\uFF08\u9ED8\u8BA4\uFF1A<code>Integer.MAX_VALUE</code>\uFF09\u3002</p><ul><li>\u5F53\u6838\u5FC3\u7EBF\u7A0B\u6570\u8FBE\u5230\u6700\u5927\u5E76\u4E14\u6240\u6709\u6838\u5FC3\u7EBF\u7A0B\u90FD\u5728\u5DE5\u4F5C\u72B6\u6001\u4E2D\uFF0C\u65B0\u4EFB\u52A1\u4F1A\u653E\u5728\u4EFB\u52A1\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C\u3002</li></ul></li><li><p><code>maxPoolSize</code>\uFF1A\u6700\u5927\u7EBF\u7A0B\u6570\uFF08\u9ED8\u8BA4\uFF1A<code>Integer.MAX_VALUE</code>\uFF09\u3002</p><ul><li>\u7528\u4E8E\u89C4\u5B9A\u7EBF\u7A0B\u6C60\u7684\u6700\u5927\u80FD\u521B\u5EFA\u7684\u7EBF\u7A0B\u6570\u91CF\u3002</li><li>\u5F53\u7EBF\u7A0B\u6570 &gt; <code>corePoolSize</code>\uFF0C<strong>\u4E14\u4EFB\u52A1\u961F\u5217\u5DF2\u6EE1\u65F6</strong>\u3002\u7EBF\u7A0B\u6C60\u4F1A\u521B\u5EFA\u65B0\u7EBF\u7A0B\u6765\u5904\u7406\u4EFB\u52A1\uFF0C\u76F4\u5230\u7EBF\u7A0B\u6570\u91CF\u8FBE\u5230 <code>maxPoolSize</code> \u3002</li><li>\u5F53\u7EBF\u7A0B\u6570\u5DF2\u7ECF = <code>maxPoolSize</code>\uFF0C<strong>\u4E14\u4EFB\u52A1\u961F\u5217\u5DF2\u6EE1\u65F6</strong>\uFF0C\u7EBF\u7A0B\u6C60\u4F1A\u6267\u884C\u62D2\u7EDD\u7B56\u7565\u6765<strong>\u62D2\u7EDD\u5904\u7406</strong>\u4EFB\u52A1\u3002</li></ul></li><li><p><code>keepAliveTime</code>\uFF1A\u7EBF\u7A0B\u7A7A\u95F2\u65F6\u95F4\uFF08\u79D2\uFF09\uFF08\u9ED8\u8BA4\uFF1A60\uFF09\u3002</p><ul><li>\u5F53\u7EBF\u7A0B\u7684\u7A7A\u95F2\u65F6\u95F4\u8FBE\u5230 <code>keepAliveTime</code> \u65F6\uFF0C\u7EBF\u7A0B\u4F1A\u81EA\u52A8\u9500\u6BC1\uFF0C\u76F4\u5230\u7EBF\u7A0B\u6570\u7B49\u4E8E <code>corePoolSize</code> \u3002</li></ul></li><li><p><code>allowCoreThreadTimeout</code>\uFF1A\u5141\u8BB8\u6838\u5FC3\u7EBF\u7A0B\u8D85\u65F6\uFF08\u9ED8\u8BA4\uFF1A<code>false</code>\uFF09\u3002</p><ul><li>\u5F53 <code>allowCoreThreadTimeout</code> = <code>true</code> \u65F6\uFF0C\u6838\u5FC3\u7EBF\u7A0B\u7684\u7A7A\u95F2\u65F6\u95F4\u8FBE\u5230 <code>keepAliveTime</code> \u4E5F\u4F1A\u81EA\u52A8\u9500\u6BC1\u3002</li></ul></li><li><p><code>rejectedExecutionHandler</code>\uFF1A\u4EFB\u52A1\u62D2\u7EDD\u5904\u7406\u5668\uFF08\u9ED8\u8BA4\uFF1A<code>AbortPolicy</code>\uFF09</p><ul><li>\u5F53\u7EBF\u7A0B\u6570\u8FBE\u5230 <code>maxPoolSize</code>\uFF0C\u4E14\u4EFB\u52A1\u961F\u5217\u5DF2\u6EE1\u65F6\uFF0C\u5C31\u4F1A\u91C7\u7528\u8BBE\u5B9A\u7684\u62D2\u7EDD\u5904\u7406\u5668\u6765\u62D2\u7EDD\u4EFB\u52A1\u3002</li></ul></li><li><p><code>RejectedExecutionHandler</code>\uFF1A\u5F53\u7EBF\u7A0B\u6C60\u65E0\u6CD5\u5904\u7406\u4EFB\u52A1\u7684\u62D2\u7EDD\u7B56\u7565\u63A5\u53E3\uFF0C\u5E38\u89C1\u7684\u5B9E\u73B0\u7C7B\u6709\u4EE5\u4E0B\u51E0\u4E2A\uFF1A</p><ul><li><code>ThreadPoolExecutor.AbortPolicy</code> : \u4E22\u5F03\u4EFB\u52A1\u5E76\u629B\u51FA <code>RejectedExecutionException</code>\u3002</li><li><code>ThreadPoolExecutor.DiscardPolicy</code> : \u4E22\u5F03\u4EFB\u52A1\uFF0C\u4F46\u662F\u4E0D\u629B\u51FA\u5F02\u5E38\u3002</li><li><code>ThreadPoolExecutor.DiscardOldestPolicy</code> : \u4E22\u5F03\u961F\u5217\u6700\u524D\u9762\u7684\u4EFB\u52A1\uFF0C\u7136\u540E\u91CD\u65B0\u5C1D\u8BD5\u6267\u884C\u4EFB\u52A1\u3002</li><li><code>ThreadPoolExecutor.CallerRunsPolicy</code> : \u4E0D\u5728\u65B0\u7EBF\u7A0B\u4E2D\u6267\u884C\u4EFB\u52A1\uFF0C\u800C\u662F\u7531\u8C03\u7528\u8005\u6240\u5728\u7684\u7EBF\u7A0B\u6765\u6267\u884C\u3002</li><li>\u540C\u65F6\u4E5F\u53EF\u4EE5\u5B9E\u73B0 <code>RejectedExecutionHandler</code> \u63A5\u53E3\u6765\u81EA\u5B9A\u4E49\u62D2\u7EDD\u5904\u7406\u5668\uFF0C\u6BD4\u5982\u53EF\u4EE5\u628A\u65E0\u6CD5\u5904\u7406\u7684\u4EFB\u52A1\u8FDB\u884C\u6301\u4E45\u5316\uFF0C\u7B49\u5230\u7EBF\u7A0B\u6C60\u53EF\u4EE5\u5904\u7406\u65F6\u518D\u91CD\u65B0\u5904\u7406\u3002</li></ul></li></ul><h3 id="\u521B\u5EFA\u7EBF\u7A0B\u6C60" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFA\u7EBF\u7A0B\u6C60" aria-hidden="true">#</a> \u521B\u5EFA\u7EBF\u7A0B\u6C60</h3><p>\u4E00\u822C\u521B\u5EFA\u7EBF\u7A0B\u6C60\u7684\u65B9\u5F0F\u6709\u4E24\u79CD\uFF1A\u6784\u9020\u65B9\u6CD5 \u548C <code>Executors</code>\uFF0C\u6211\u4EEC\u63A8\u8350\u4F7F\u7528\u6784\u9020\u65B9\u6CD5\u6765\u81EA\u884C\u521B\u5EFA\uFF0C\u539F\u56E0\u540E\u9762\u518D\u5206\u6790</p><h4 id="\u6784\u9020\u65B9\u6CD5\u521B\u5EFA\u7EBF\u7A0B\u6C60" tabindex="-1"><a class="header-anchor" href="#\u6784\u9020\u65B9\u6CD5\u521B\u5EFA\u7EBF\u7A0B\u6C60" aria-hidden="true">#</a> \u6784\u9020\u65B9\u6CD5\u521B\u5EFA\u7EBF\u7A0B\u6C60</h4><p>\u7ED3\u5408\u4EE5\u4E0A\u53C2\u6570\u6765\u8FDB\u4E00\u6B65\u5B66\u4E60 <code>ThreadPoolExecutor</code> \u7684\u6784\u9020\u65B9\u6CD5</p><p>\u6211\u4EEC\u9009\u62E9\u5176\u4E2D\u4E00\u4E2A\u8F83\u4E3A\u7ECF\u5178\u7684\u6784\u9020\u65B9\u6CD5\u6765\u770B</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token keyword">int</span> corePoolSize<span class="token punctuation">,</span>
                          <span class="token keyword">int</span> maximumPoolSize<span class="token punctuation">,</span>
                          <span class="token keyword">long</span> keepAliveTime<span class="token punctuation">,</span>
                          <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">,</span>
                          <span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">&gt;</span></span> workQueue<span class="token punctuation">,</span>
                          <span class="token class-name">RejectedExecutionHandler</span> handler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">this</span><span class="token punctuation">(</span>corePoolSize<span class="token punctuation">,</span>      <span class="token comment">// \u6838\u5FC3\u7EBF\u7A0B\u6570</span>
		maximumPoolSize<span class="token punctuation">,</span>    <span class="token comment">// \u6700\u5927\u7EBF\u7A0B\u6570	</span>
		keepAliveTime<span class="token punctuation">,</span>      <span class="token comment">// \u7EBF\u7A0B\u7A7A\u95F2\u65F6\u95F4</span>
		unit<span class="token punctuation">,</span>               <span class="token comment">// \u7EBF\u7A0B\u7A7A\u95F2\u65F6\u95F4\u5355\u4F4D</span>
		workQueue<span class="token punctuation">,</span>          <span class="token comment">// \u7F13\u5B58\u961F\u5217\u5BF9\u8C61</span>
		<span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">defaultThreadFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>   <span class="token comment">// \u7528\u4E8E\u8BBE\u7F6E\u521B\u5EFA\u7EBF\u7A0B\u7684\u5DE5\u5382\uFF0C\u53EF\u4EE5\u901A\u8FC7\u7EBF\u7A0B\u5DE5\u5382\u7ED9\u6BCF\u4E2A\u7EBF\u7A0B\u505A\u4E9B\u66F4\u6709\u610F\u4E49\u7684\u4E8B\u60C5\uFF0C\u6BD4\u5982\u8BBE\u7F6Edaemon\u548C\u4F18\u5148\u7EA7\u7B49\u7B49</span>
		handler<span class="token punctuation">)</span><span class="token punctuation">;</span>           <span class="token comment">// \u4EFB\u52A1\u62D2\u7EDD\u7B56\u7565\u5904\u7406\u5668</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5176\u4E2D <code>workQueue</code> : \u7528\u4E8E\u4FDD\u5B58\u7B49\u5F85\u6267\u884C\u7684\u4EFB\u52A1\u7684\u963B\u585E\u961F\u5217\u3002\u53EF\u4EE5\u9009\u62E9\u4EE5\u4E0B\u51E0\u4E2A\u963B\u585E\u961F\u5217\u3002</p><ul><li><code>ArrayBlockingQueue</code> : \u4E00\u4E2A\u57FA\u4E8E\u6570\u7EC4\u7ED3\u6784\u7684\u6709\u754C\u963B\u585E\u961F\u5217\uFF0C\u6B64\u961F\u5217\u6309 FIFO\uFF08\u5148\u8FDB\u5148\u51FA\uFF09\u6392\u5E8F\u5143\u7D20\u3002</li><li><code>LinkedBlockingQueue</code> : \u4E00\u4E2A\u57FA\u4E8E\u94FE\u8868\u7ED3\u6784\u7684\u65E0\u754C(\u9ED8\u8BA4\u957F\u5EA6\u662FInteger.MAX_VALUE)\u963B\u585E\u961F\u5217\uFF0C\u6B64\u961F\u5217\u6309 FIFO \uFF08\u5148\u8FDB\u5148\u51FA\uFF09 \u6392\u5E8F\u5143\u7D20\uFF0C\u541E\u5410\u91CF\u901A\u5E38\u8981\u9AD8\u4E8E <code>ArrayBlockingQueue</code>\u3002\u9759\u6001\u5DE5\u5382\u65B9\u6CD5 <code>Executors.newFixedThreadPool()</code> \u4F7F\u7528\u4E86\u8FD9\u4E2A\u961F\u5217\u3002</li><li><code>SynchronousQueue</code> : \u4E00\u4E2A<strong>\u4E0D\u5B58\u50A8\u5143\u7D20\u7684\u963B\u585E\u961F\u5217</strong>\u3002\u6BCF\u4E2A\u63D2\u5165\u64CD\u4F5C\u5FC5\u987B\u7B49\u5230\u53E6\u4E00\u4E2A\u7EBF\u7A0B\u8C03\u7528\u79FB\u9664\u64CD\u4F5C\uFF0C\u5426\u5219\u63D2\u5165\u64CD\u4F5C\u4E00\u76F4\u5904\u4E8E\u963B\u585E\u72B6\u6001\uFF0C\u541E\u5410\u91CF\u901A\u5E38\u8981\u9AD8\u4E8E <code>LinkedBlockingQueue</code>\u3002\u9759\u6001\u5DE5\u5382\u65B9\u6CD5 <code>Executors.newCachedThreadPool()</code> \u4F7F\u7528\u4E86\u8FD9\u4E2A\u961F\u5217\u3002</li><li><code>PriorityBlockingQueue</code> : \u4E00\u4E2A\u5177\u6709\u4F18\u5148\u7EA7(\u57FA\u4E8E\u5806\u7ED3\u6784)\u7684\u65E0\u754C\u963B\u585E\u961F\u5217\u3002</li></ul><h4 id="executors" tabindex="-1"><a class="header-anchor" href="#executors" aria-hidden="true">#</a> Executors</h4><p>\u9664\u4E86\u4F7F\u7528\u6784\u9020\u65B9\u6CD5\uFF0C\u4E5F\u53EF\u4EE5\u901A\u8FC7 <code>Executors</code> \u5176\u4E2D\u7684\u9759\u6001\u65B9\u6CD5\u6765\u521B\u5EFA\u7EBF\u7A0B\u6C60\u3002</p><p>\u53EF\u4EE5\u521B\u5EFA4\u7C7B\u9884\u5B9A\u4E49\u597D\u53C2\u6570\u7684\u7EBF\u7A0B\u6C60\uFF0C<strong>\u4F46\u662F\u4E0D\u63A8\u8350\u4F7F\u7528\u8FD9\u4E9B\u9759\u6001\u65B9\u6CD5\u6765\u521B\u5EFA\u7EBF\u7A0B\u6C60\uFF0C\u56E0\u4E3A\u5BB9\u6613\u5BFC\u81F4 OOM \u95EE\u9898</strong>\u3002</p><ul><li><code>CachedThreadPool</code> (\u53EF\u7F13\u5B58\u7EBF\u7A0B\u6C60)</li></ul><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ExecutorService</span> <span class="token function">newCachedThreadPool</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span>MAX_VALUE<span class="token punctuation">,</span>
                                  <span class="token number">60L</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span>SECONDS<span class="token punctuation">,</span>
                                  <span class="token keyword">new</span> <span class="token class-name">SynchronousQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5F53\u4E00\u4E2A\u4EFB\u52A1\u63D0\u4EA4\u65F6\uFF0C<code>corePoolSize</code> \u4E3A 0 \u4E0D\u521B\u5EFA\u6838\u5FC3\u7EBF\u7A0B\uFF0C<code>SynchronousQueue</code> \u662F\u4E00\u4E2A\u4E0D\u5B58\u50A8\u5143\u7D20\u7684\u963B\u585E\u961F\u5217\uFF0C\u53EF\u4EE5\u7406\u89E3\u4E3A\u961F\u91CC\u6C38\u8FDC\u662F\u6EE1\u7684\uFF0C\u56E0\u6B64<strong>\u6700\u7EC8\u4F1A\u521B\u5EFA\u975E\u6838\u5FC3\u7EBF\u7A0B\u6765\u6267\u884C\u4EFB\u52A1</strong>\u3002\u56E0\u4E3A <code>Integer.MAX_VALUE</code> \u975E\u5E38\u5927\uFF0C\u53EF\u4EE5\u8BA4\u4E3A\u662F<strong>\u53EF\u4EE5\u65E0\u9650\u521B\u5EFA\u7EBF\u7A0B</strong>\u7684\uFF0C\u5728\u8D44\u6E90\u6709\u9650\u7684\u60C5\u51B5\u4E0B\u5BB9\u6613\u5F15\u8D77 OOM \u5F02\u5E38\u3002</p><p>\u5E94\u7528\u573A\u666F\uFF1A\u6267\u884C\u5927\u91CF\u3001\u8017\u65F6\u5C11\u7684\u4EFB\u52A1\u3002</p><hr><ul><li><code>SingleThreadPool</code> (\u5355\u7EBF\u7A0B\u7EBF\u7A0B\u6C60)</li></ul><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ExecutorService</span> <span class="token function">newSingleThreadExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">FinalizableDelegatedExecutorService</span>
        <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span>
                                <span class="token number">0L</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span>MILLISECONDS<span class="token punctuation">,</span>
                                <span class="token keyword">new</span> <span class="token class-name">LinkedBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5F53\u4E00\u4E2A\u4EFB\u52A1\u63D0\u4EA4\u65F6\uFF0C<strong>\u53EA\u6709\u4E00\u4E2A\u6838\u5FC3\u7EBF\u7A0B\u6765\u5904\u7406\u4EFB\u52A1</strong>\uFF0C\u7F13\u5B58\u961F\u5217\u662F\u957F\u5EA6\u4E3A <code>Integer.MAX_VALUE</code> \u7684 <code>LinkedBlockingQueue</code>\uFF0C\u53EF\u4EE5\u8BA4\u4E3A\u662F\u65E0\u754C\u961F\u5217\uFF0C\u56E0\u6B64\u5F80<strong>\u961F\u5217\u4E2D\u53EF\u4EE5\u63D2\u5165\u65E0\u9650\u591A\u7684\u4EFB\u52A1</strong>\uFF0C\u5728\u8D44\u6E90\u6709\u9650\u7684\u65F6\u5019\u5BB9\u6613\u5F15\u8D77 OOM \u5F02\u5E38\u3002</p><p>\u5E94\u7528\u573A\u666F\uFF1A\u4E0D\u9002\u5408\u3010\u5E76\u53D1\u4F46\u53EF\u80FD\u5F15\u8D77 IO \u963B\u585E\u53CA\u5F71\u54CD UI \u7EBF\u7A0B\u54CD\u5E94\u3011\u7684\u64CD\u4F5C\uFF0C\u5982\u6570\u636E\u5E93\u64CD\u4F5C\u3001\u6587\u4EF6\u64CD\u4F5C\u7B49\u3002</p><hr><ul><li><code>FixedThreadPool</code> (\u5B9A\u957F\u7EBF\u7A0B\u6C60)</li></ul><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ExecutorService</span> <span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token keyword">int</span> nThreads<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span>nThreads<span class="token punctuation">,</span> nThreads<span class="token punctuation">,</span>
                                  <span class="token number">0L</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span>MILLISECONDS<span class="token punctuation">,</span>
                                  <span class="token keyword">new</span> <span class="token class-name">LinkedBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5B9A\u957F\u7EBF\u7A0B\u6C60\u5176\u5B9E\u548C\u5355\u4E2A\u6838\u5FC3\u7EBF\u7A0B\u6C60\u7C7B\u4F3C\uFF0C\u552F\u4E00\u533A\u522B\u662F\u53EF\u4EE5\u7531\u7528\u6237\u5B9A\u4E49\u4E00\u4E2A\u56FA\u5B9A\u7684\u6838\u5FC3\u7EBF\u7A0B\u6570\u91CF\u3002</p><hr><ul><li><code>ScheduleThreadPool</code> (\u5B9A\u65F6\u7EBF\u7A0B\u6C60)</li></ul><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ScheduledExecutorService</span> <span class="token function">newScheduledThreadPool</span><span class="token punctuation">(</span><span class="token keyword">int</span> corePoolSize<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ScheduledThreadPoolExecutor</span><span class="token punctuation">(</span>corePoolSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6838\u5FC3\u7EBF\u7A0B\u6570\u91CF\u56FA\u5B9A\uFF0C\u975E\u6838\u5FC3\u7EBF\u7A0B\u6570\u91CF<strong>\u65E0\u9650</strong>\uFF0C\u6267\u884C\u5B8C\u95F2\u7F6E 10 ms \u540E\u56DE\u6536\uFF0C\u4EFB\u52A1\u961F\u5217\u4E3A <code>DelayedWorkQueue</code> \u5EF6\u65F6\u963B\u585E\u961F\u5217\u3002\u5F53\u4EFB\u52A1\u5806\u79EF\u65F6\uFF0C\u7F13\u5B58\u961F\u5217\u6EE1\u4E86\u4E4B\u540E\uFF0C\u4F1A<strong>\u521B\u5EFA\u5927\u91CF\u975E\u6838\u5FC3\u7EBF\u7A0B\u6765\u5904\u7406\u4EFB\u52A1</strong>\uFF0C\u5728\u8D44\u6E90\u6709\u9650\u7684\u60C5\u51B5\u4E0B\u5BB9\u6613\u5F15\u8D77 OOM \u5F02\u5E38\u3002</p><p>\u4F7F\u7528\u573A\u666F\uFF1A\u6267\u884C\u5B9A\u65F6\u6216\u8005\u5468\u671F\u6027\u4EFB\u52A1\u3002</p><h3 id="\u6267\u884C\u6D41\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u6267\u884C\u6D41\u7A0B" aria-hidden="true">#</a> \u6267\u884C\u6D41\u7A0B</h3><p>\u5176\u5B9E\u4ECE\u4E0A\u9762\u7684\u6838\u5FC3\u7EBF\u7A0B\u3001\u961F\u5217\u7684\u53C2\u6570\u5927\u81F4\u53EF\u4EE5\u4E86\u89E3\u5230 <code>ThreadPoolExecutor</code> \u7684\u6267\u884C\u6D41\u7A0B\uFF0C\u8FD9\u4E00\u5C0F\u8282\u6765\u66F4\u8FDB\u4E00\u6B65\u66F4\u8BE6\u7EC6\u5730\u7406\u89E3\u5B83\u7684\u6267\u884C\u6D41\u7A0B</p><p><code>ThreadPoolExecutor</code> \u6267\u884C\u6D41\u7A0B\u56FE</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220330155842.png" alt=""></p><p>\u5F53\u4E00\u4E2A\u4EFB\u52A1\u9700\u8981\u6DFB\u52A0\u5230\u7EBF\u7A0B\u6C60\u4E2D\u6267\u884C\u65F6</p><ul><li>\u5982\u679C\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u91CF\u5C0F\u4E8E\u6838\u5FC3\u7EBF\u7A0B\u6570\uFF0C\u90A3\u4E48\u5373\u4F7F\u6838\u5FC3\u7EBF\u7A0B\u5168\u90E8\u5904\u4E8E\u7A7A\u95F2\u72B6\u6001\uFF0C\u4E5F\u8981\u521B\u5EFA\u65B0\u7684\u7EBF\u7A0B\u4F5C\u4E3A\u6838\u5FC3\u7EBF\u7A0B\u6765\u5904\u7406\u8FD9\u4E2A\u4EFB\u52A1</li><li>\u5982\u679C\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u91CF\u7B49\u4E8E\u6838\u5FC3\u7EBF\u7A0B\u6570\uFF0C\u800C\u4E14\u6838\u5FC3\u7EBF\u7A0B\u90FD\u4E0D\u7A7A\u95F2\uFF0C\u4F46\u662F\u7F13\u5B58\u961F\u5217\u672A\u6EE1\uFF0C\u90A3\u4E48\u4EFB\u52A1\u653E\u5230\u7F13\u5B58\u961F\u5217\u4E2D\u7B49\u5F85\u6267\u884C</li><li>\u5982\u679C\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u91CF\u5927\u4E8E\u6838\u5FC3\u7EBF\u7A0B\u6570\uFF0C\u7F13\u5B58\u961F\u5217\u5DF2\u6EE1\uFF0C\u4F46\u7EBF\u7A0B\u6570\u5C0F\u4E8E\u6700\u5927\u7EBF\u7A0B\u6570\uFF0C\u90A3\u4E48\u521B\u5EFA\u65B0\u7684\u7EBF\u7A0B\u6765\u5904\u7406\u8FD9\u4E2A\u4EFB\u52A1</li><li>\u5982\u679C\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u6570\u91CF\u5927\u4E8E\u6838\u5FC3\u7EBF\u7A0B\u6570\uFF0C\u7F13\u5B58\u961F\u5217\u5DF2\u6EE1\uFF0C\u800C\u4E14\u7EBF\u7A0B\u6570\u7B49\u4E8E\u6700\u5927\u7EBF\u7A0B\u6570\uFF0C\u90A3\u4E48\u901A\u8FC7 <code>RejectedExecutionHandler</code> \uFF08\u62D2\u7EDD\u5904\u7406\u5668\uFF09\u6765\u5904\u7406\u8FD9\u4E2A\u4EFB\u52A1</li></ul><h3 id="\u4E3A\u4EC0\u4E48\u963F\u91CC\u5DF4\u5DF4\u89C4\u8303\u660E\u786E\u8BF4\u4E0D\u5141\u8BB8\u4F7F\u7528-executors-\u521B\u5EFA\u7EBF\u7A0B\u6C60" tabindex="-1"><a class="header-anchor" href="#\u4E3A\u4EC0\u4E48\u963F\u91CC\u5DF4\u5DF4\u89C4\u8303\u660E\u786E\u8BF4\u4E0D\u5141\u8BB8\u4F7F\u7528-executors-\u521B\u5EFA\u7EBF\u7A0B\u6C60" aria-hidden="true">#</a> \u4E3A\u4EC0\u4E48\u963F\u91CC\u5DF4\u5DF4\u89C4\u8303\u660E\u786E\u8BF4\u4E0D\u5141\u8BB8\u4F7F\u7528 Executors \u521B\u5EFA\u7EBF\u7A0B\u6C60</h3><p><code>Executors.newSingleThreadPool()</code> \u548C <code>Executors.newFixedSingleThreadPool()</code> \u5B9A\u4E49\u7684\u7EBF\u7A0B\u6C60\u7F13\u5B58\u961F\u5217\u9009\u578B\u4E3A <code>LinkedBlockingQueue</code> \u957F\u5EA6\u4E3A <code>Integer.MAX_VALUE</code> \uFF0C\u5F53\u5806\u79EF\u4EFB\u52A1\u65F6\u5BB9\u6613\u5360\u7528\u5927\u91CF\u5185\u5B58\u8FDB\u800C\u5BFC\u81F4 OOM \u7684\u53D1\u751F</p><p><code>Executors.newCachedThreadPool()</code> \u548C <code>Executors.newScheduleThreadPool()</code> \u5B9A\u4E49\u7684\u6700\u5927\u7EBF\u7A0B\u6570\u4E3A <code>Integer.MAX_VALUE</code> \uFF0C\u5F53\u4EFB\u52A1\u5806\u79EF\u65F6\u53EF\u80FD\u4F1A\u521B\u5EFA\u6570\u91CF\u975E\u5E38\u591A\u7684\u7EBF\u7A0B\u8FDB\u884C\u5904\u7406\u4EFB\u52A1\uFF0C\u5BB9\u6613\u5360\u7528\u5927\u91CF\u5185\u5B58\u8FDB\u800C\u5BFC\u81F4 OOM \u7684\u53D1\u751F</p><p>\u6240\u4EE5\u63A8\u8350\u4F7F\u7528\u6784\u9020\u65B9\u6CD5\u6765\u521B\u5EFA\u7EBF\u7A0B\u6C60\uFF0C\u5C3D\u53EF\u80FD\u901A\u8FC7\u591A\u6B21\u8C03\u6574\u7EBF\u7A0B\u6C60\u53C2\u6570\uFF0C\u6765\u5F97\u5230\u4E00\u4E2A\u6700\u9002\u5408\u7CFB\u7EDF\u7684\u7EBF\u7A0B\u6C60</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token keyword">int</span> corePoolSize<span class="token punctuation">,</span>
                          <span class="token keyword">int</span> maximumPoolSize<span class="token punctuation">,</span>
                          <span class="token keyword">long</span> keepAliveTime<span class="token punctuation">,</span>
                          <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">,</span>
                          <span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">&gt;</span></span> workQueue<span class="token punctuation">,</span>
                          <span class="token class-name">ThreadFactory</span> threadFactory<span class="token punctuation">,</span>
                          <span class="token class-name">RejectedExecutionHandler</span> handler<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u7EBF\u7A0B\u6C60\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#\u7EBF\u7A0B\u6C60\u53C2\u6570" aria-hidden="true">#</a> \u7EBF\u7A0B\u6C60\u53C2\u6570</h2><p><s>\u7EBF\u7A0B\u6C60\u53C2\u6570\u6211\u4EEC\u4E00\u822C\u4F1A\u6839\u636E\u300C\u6BCF\u79D2\u4EFB\u52A1\u6570\u300D\u3001\u300C\u6BCF\u4E2A\u4EFB\u52A1\u82B1\u8D39\u7684\u65F6\u95F4\u300D\u3001\u300C\u7CFB\u7EDF\u5BB9\u5FCD\u7684\u6700\u5927\u54CD\u5E94\u65F6\u95F4\u300D(\u53EF\u4EE5\u7406\u89E3\u4E3A\u4EFB\u52A1\u8D85\u65F6\u65F6\u95F4)\u6765\u8C03\u6574 <code>corePoolSize</code>\u3001<code>queueCapacity</code>\u3001<code>maxPoolSize</code>\u3001<code>rejectedExecutionHandler</code> \u8FD9\u51E0\u4E2A\u6838\u5FC3\u7684\u53C2\u6570</s></p><p>\u601D\u8003\u4E86\u5F88\u4E45\uFF0C\u8FD9\u91CC\u8FD8\u662F\u4E0D\u628A\u4E4B\u524D\u5199\u7684\u7EBF\u7A0B\u6C60\u53C2\u6570\u9009\u62E9\u7684\u601D\u8DEF\u5199\u51FA\u6765\u4E86\u3002</p><p>\u56E0\u4E3A\u5E76\u53D1\u73AF\u5883\u975E\u5E38\u590D\u6742\uFF0C\u670D\u52A1\u5668\u8D44\u6E90\u4E5F\u662F\u975E\u5E38\u5403\u7D27\u7684\uFF0C\u4E0D\u662F\u6211\u8BF4\u591A\u5C11\u5C31\u6572\u5B9A\u591A\u5C11\u7684\uFF0C\u662F\u9700\u8981\u4E0D\u65AD\u5730\u5728\u5B9E\u6218\u4E2D\u8FDB\u884C\u8C03\u6574\u7684\u3002</p><h3 id="\u6309\u7EBF\u7A0B\u6C60\u7C7B\u578B\u6765\u7B80\u5355\u5212\u5206\u7EBF\u7A0B\u6C60\u5927\u5C0F" tabindex="-1"><a class="header-anchor" href="#\u6309\u7EBF\u7A0B\u6C60\u7C7B\u578B\u6765\u7B80\u5355\u5212\u5206\u7EBF\u7A0B\u6C60\u5927\u5C0F" aria-hidden="true">#</a> \u6309\u7EBF\u7A0B\u6C60\u7C7B\u578B\u6765\u7B80\u5355\u5212\u5206\u7EBF\u7A0B\u6C60\u5927\u5C0F</h3><p>\u8FD9\u91CC\u662F\u6211\u4ECE\u4E00\u4E9B\u6280\u672F\u5E73\u53F0\u4E0A\u9762\u627E\u5230\u7684\u8C03\u6574\u7B56\u7565\uFF0C\u4F46\u662F\u4E5F\u4E0D\u80FD\u4F5C\u4E3A\u6700\u7EC8\u7684\u6570\u503C\uFF0C\u4E5F\u662F\u4F5C\u4E3A\u53C2\u8003\u4E4B\u540E\u4E0D\u65AD\u8FDB\u884C\u8C03\u6574\u7684\u3002</p><ul><li><p>\u5982\u679C\u662F CPU \u5BC6\u96C6\u578B\u4EFB\u52A1\uFF0C\u6BD4\u5982\u9700\u8981\u5BF9\u5927\u91CF\u6570\u636E\u8FDB\u884C\u6392\u5E8F\u3001\u8FD0\u7B97\u7B49\uFF0C\u8FD9\u4E9B\u4EFB\u52A1 CPU \u5229\u7528\u7387\u5F88\u9AD8\uFF0C\u5C3D\u91CF\u8BA9\u8FD9\u4E9B\u4EFB\u52A1\u5E76\u884C\u6267\u884C\uFF0C\u51CF\u5C11\u7EBF\u7A0B\u5207\u6362\u7684\u5F00\u9500\uFF0C\u6240\u4EE5\u7EBF\u7A0B\u6C60\u5927\u5C0F\u53EF\u4EE5\u8BBE\u7F6E\u4E3A NCPU + 1\u3002\uFF084\u6838CPU\uFF0C\u7EBF\u7A0B\u6C60\u5927\u5C0F\u8BBE\u7F6E\u4E3A5\uFF09</p></li><li><p>\u5982\u679C\u662F IO \u5BC6\u96C6\u578B\u4EFB\u52A1\uFF0C\u6BD4\u5982\u9700\u8981\u8FDB\u884C\u6587\u4EF6\u8BFB\u53D6\u3001\u7F51\u7EDC\u8BFB\u53D6\uFF0C\u8FD9\u4E9B\u4EFB\u52A1 IO \u64CD\u4F5C\u65F6\u95F4\u957F\uFF0CCPU \u4F1A\u5904\u4E8E\u7A7A\u95F2\u72B6\u6001\uFF0C\u5BFC\u81F4 CPU \u5229\u7528\u7387\u4E0D\u9AD8\uFF0C\u8BA9\u8FD9\u4E9B\u7EBF\u7A0B\u5728\u7B49\u5F85 IO \u64CD\u4F5C\u65F6\uFF0C\u5176\u4ED6\u7EBF\u7A0B\u53EF\u4EE5\u4F7F\u7528 CPU\uFF0C\u6240\u4EE5\u7EBF\u7A0B\u6C60\u5927\u5C0F\u53EF\u4EE5\u8BBE\u7F6E\u4E3A 2*NCPU + 1\u3002\uFF084\u6838CPU\uFF0C\u7EBF\u7A0B\u6C60\u5927\u5C0F\u8BBE\u7F6E\u4E3A9\uFF09</p></li></ul><blockquote><p>\u5F53\u7136\u4EE5\u4E0A\u53EA\u662F\u4E00\u4E2A\u53C2\u8003\u503C\uFF0C\u5177\u4F53\u8FD8\u662F\u9700\u8981\u6839\u636E\u673A\u5668\u6027\u80FD\u3001\u7CFB\u7EDF\u8FD0\u884C\u60C5\u51B5\u6765\u51B3\u5B9A\u6216\u8005\u8C03\u6574\u3002\u53EF\u4EE5\u5C1D\u8BD5\u5148\u6839\u636E\u4EFB\u52A1\u7C7B\u578B\u628A\u7EBF\u7A0B\u6C60\u5927\u5C0F\u8BBE\u7F6E\u4E3A\u53C2\u8003\u503C\uFF0C\u5173\u6CE8\u4EFB\u52A1\u6267\u884C\u60C5\u51B5\u3001\u7CFB\u7EDF\u8D44\u6E90\u5229\u7528\u7387\u7B49\u6307\u6807\u8FDB\u884C\u9002\u5F53\u8C03\u6574\u3002</p><p>\u6BD4\u5982\u7EBF\u7A0B\u672A\u8FBE\u5230\u6700\u5927\u7EBF\u7A0B\u6570\u65F6\uFF0C\u670D\u52A1\u5668\u7684 CPU \u5DF2\u7ECF\u5360\u6EE1\u4E86\uFF0C\u8FD9\u65F6\u9700\u8981\u5347\u7EA7\u786C\u4EF6\u6216\u8005\u662F\u4F18\u5316\u4EE3\u7801\u903B\u8F91\u6765\u8C03\u6574\u3002</p><p>\u5982\u679C\u7EBF\u7A0B\u6C60\u8FC7\u5927\uFF0C\u4F1A\u5BFC\u81F4\u5185\u5B58\u5360\u7528\u91CF\u8FC7\u9AD8\uFF0C\u8FD8\u53EF\u80FD\u4F1A\u8017\u5C3D\u8D44\u6E90\uFF1B\u5982\u679C\u7EBF\u7A0B\u6C60\u8FC7\u5C0F\uFF0C\u4F1A\u7531\u4E8E\u5B58\u5728\u8D44\u6E90\u7A7A\u95F2\u7684\u60C5\u51B5\uFF0C\u5BF9\u7CFB\u7EDF\u541E\u5410\u91CF\u9020\u6210\u635F\u5931\u3002</p></blockquote>`,57),t=[c];function l(p,i){return a(),s("div",null,t)}var r=n(o,[["render",l],["__file","thread-pool.html.vue"]]);export{r as default};
