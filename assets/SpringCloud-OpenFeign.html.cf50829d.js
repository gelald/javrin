import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as s,c as a,d as e}from"./app.00677c1d.js";const t={},p=e(`<h1 id="spring-cloud-openfeign-\u7B80\u8BB0" tabindex="-1"><a class="header-anchor" href="#spring-cloud-openfeign-\u7B80\u8BB0" aria-hidden="true">#</a> Spring Cloud OpenFeign \u7B80\u8BB0</h1><h2 id="\u7B80\u5355\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#\u7B80\u5355\u4ECB\u7ECD" aria-hidden="true">#</a> \u7B80\u5355\u4ECB\u7ECD</h2><p>OpenFeign \u662F SpringCloud \u9488\u5BF9 NetFlix \u7684 Feign \u505A\u7684\u4E8C\u6B21\u5C01\u88C5\uFF0C\u5B83\u7684\u524D\u8EAB Feign \u662F Http \u901A\u4FE1\u7684\u5BA2\u6237\u7AEF\uFF0C\u4F7F\u7528 Feign \u53EF\u4EE5\u8BA9\u6211\u4EEC\u5F00\u53D1\u65F6<strong>\u5C4F\u853D\u7F51\u7EDC\u901A\u4FE1\u7684\u7EC6\u8282\uFF0C\u628A\u6240\u6709\u7684\u8FDC\u7A0B\u65B9\u6CD5\u8C03\u7528\u90FD\u53D8\u5F97\u50CF\u76F4\u63A5\u9762\u5411\u672C\u5730\u63A5\u53E3\u8C03\u7528\u7684\u65B9\u5F0F\u4E00\u6837\u65B9\u4FBF</strong>\u3002</p><p>OpenFeign \u5BF9 Feign \u4E8C\u6B21\u5C01\u88C5\u540E\uFF0C\u5728\u5176\u4E0A<strong>\u52A0\u5165\u4E86 SpringMVC \u7684\u6CE8\u89E3\u652F\u6301</strong>\uFF0C\u6211\u4EEC\u5E38\u7528\u7684 <code>@RequestMapping</code>\u3001<code>@RequestBody</code> \u7B49\u3002</p><p>\u53E6\u5916 OpenFeign \u8FD8<strong>\u96C6\u6210\u4E86 Ribbon\u3001Hystrix \u7EC4\u4EF6</strong>\u3002</p><ul><li>Ribbon \u7EC4\u4EF6\u5B9E\u73B0\u4E86\u5BA2\u6237\u7AEF\u8D1F\u8F7D\u5747\u8861\uFF0C\u7EF4\u62A4\u4E86\u4E00\u4EFD\u670D\u52A1(\u5730\u5740)\u6E05\u5355\uFF0C\u5F53\u8FD9\u4E2A\u670D\u52A1\u6709\u591A\u4E2A\u5B9E\u4F8B\u65F6\uFF0C\u6839\u636E\u8FD9\u4EFD\u6E05\u5355\u548C\u8D1F\u8F7D\u5747\u8861\u7B56\u7565\uFF0C\u9009\u62E9\u5176\u4E2D\u4E00\u4E2A\u5B9E\u4F8B\u8FDB\u884C\u8C03\u7528\u3002</li><li>Hystrix \u7EC4\u4EF6\u5B9E\u73B0\u4E86\u670D\u52A1\u964D\u7EA7\u7194\u65AD\uFF0C\u5F53\u76EE\u6807\u670D\u52A1\u4E0D\u53EF\u7528\u65F6\uFF0C\u63D0\u4F9B\u540E\u5907\u7684\u914D\u7F6E\u65B9\u5F0F\u6765\u544A\u8BC9\u8C03\u7528\u65B9\uFF0C\u8C03\u7528\u5931\u8D25\u3002</li></ul><h2 id="\u4E00\u4E9B\u7279\u6027" tabindex="-1"><a class="header-anchor" href="#\u4E00\u4E9B\u7279\u6027" aria-hidden="true">#</a> \u4E00\u4E9B\u7279\u6027</h2><h3 id="gzip-\u538B\u7F29" tabindex="-1"><a class="header-anchor" href="#gzip-\u538B\u7F29" aria-hidden="true">#</a> Gzip \u538B\u7F29</h3><p>\u6211\u4EEC\u77E5\u9053\uFF0C\u53D1\u9001 Http \u8BF7\u6C42\u524D\uFF0C\u9700\u8981\u5BF9\u6570\u636E\u8FDB\u884C\u4E00\u5C42\u4E00\u5C42\u7684\u5305\u88C5\uFF0C\u90A3\u4E48\u8FD9\u5C31\u4F1A\u5BFC\u81F4\u539F\u672C\u9700\u8981\u53D1\u9001\u7684\u201C\u6838\u5FC3\u6570\u636E\u201D\u53D8\u5927\u4E86\uFF0C\u90A3\u4E48\u53D1\u9001\u6570\u636E\u65F6\uFF0C\u9700\u8981\u7684\u65F6\u95F4\u66F4\u957F\u4E86\uFF0COpenFeign\u652F\u6301\u5BF9\u8BF7\u6C42\u548C\u54CD\u5E94\u8FDB\u884CGZIP\u538B\u7F29\uFF0C\u4EE5\u6B64\u6765\u63D0\u4F9B\u901A\u4FE1\u6548\u7387\uFF0C\u5F00\u542F\u540E\u53EF\u4EE5\u6709\u6548\u8282\u7EA6\u7F51\u7EDC\u8D44\u6E90\uFF0C\u4F46\u540C\u65F6\u4E5F\u4F1A\u589E\u52A0 CPU \u7684\u8D1F\u62C5\uFF0C\u5F00\u542F\u65F6\u9700\u8981\u8003\u8651\u597D\u538B\u7F29\u7684\u5927\u5C0F</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">feign</span><span class="token punctuation">:</span>
  <span class="token comment"># \u538B\u7F29\u914D\u7F6E</span>
  <span class="token key atrule">compression</span><span class="token punctuation">:</span>
    <span class="token key atrule">request</span><span class="token punctuation">:</span>
	    <span class="token comment"># \u914D\u7F6E\u8BF7\u6C42GZIP\u538B\u7F29</span>
      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token comment"># \u914D\u7F6E\u538B\u7F29\u652F\u6301\u7684MIME TYPE</span>
      <span class="token key atrule">mime-types</span><span class="token punctuation">:</span> text/xml<span class="token punctuation">,</span> application/xml<span class="token punctuation">,</span> application/json
      <span class="token comment"># \u914D\u7F6E\u538B\u7F29\u6570\u636E\u5927\u5C0F\u7684\u4E0B\u9650</span>
      <span class="token key atrule">min-request-size</span><span class="token punctuation">:</span> <span class="token number">2048</span>
    <span class="token key atrule">response</span><span class="token punctuation">:</span>
    	<span class="token comment"># \u914D\u7F6E\u54CD\u5E94GZIP\u538B\u7F29</span>
      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u65E5\u5FD7\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u65E5\u5FD7\u914D\u7F6E" aria-hidden="true">#</a> \u65E5\u5FD7\u914D\u7F6E</h3><p>\u9488\u5BF9 FeignClient \u6267\u884C\u7684\u65B9\u6CD5\uFF0COpenFeign \u4E3A\u6BCF\u4E00\u4E2A FeignClient \u63D0\u4F9B\u4E86\u5355\u72EC\u7684\u65E5\u5FD7\u8F93\u51FA\u7B49\u7EA7\uFF0C\u6838\u5FC3\u7684\u7C7B\u662F <code>feign.Logger</code></p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FeignClientConfiguration</span> <span class="token punctuation">{</span>
  
  	<span class="token doc-comment comment">/**
     * Logger.Level \u7684\u5177\u4F53\u7EA7\u522B\u5982\u4E0B\uFF1A
     * NONE\uFF1A\u4E0D\u8BB0\u5F55\u4EFB\u4F55\u4FE1\u606F
     * BASIC\uFF1A\u4EC5\u8BB0\u5F55\u8BF7\u6C42\u65B9\u6CD5\u3001URL\u4EE5\u53CA\u54CD\u5E94\u72B6\u6001\u7801\u548C\u6267\u884C\u65F6\u95F4
     * HEADERS\uFF1A\u9664\u4E86\u8BB0\u5F55 BASIC\u7EA7\u522B\u7684\u4FE1\u606F\u5916\uFF0C\u8FD8\u4F1A\u8BB0\u5F55\u8BF7\u6C42\u548C\u54CD\u5E94\u7684\u5934\u4FE1\u606F
     * FULL\uFF1A\u8BB0\u5F55\u6240\u6709\u8BF7\u6C42\u4E0E\u54CD\u5E94\u7684\u660E\u7EC6\uFF0C\u5305\u62EC\u5934\u4FE1\u606F\u3001\u8BF7\u6C42\u4F53\u3001\u5143\u6570\u636E
     */</span>
		<span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Logger<span class="token punctuation">.</span>Level</span> <span class="token function">feignLoggerLevel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Logger<span class="token punctuation">.</span>Level</span><span class="token punctuation">.</span>FULL<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">/////////////////////////////////////////////////////////////////</span>

<span class="token comment">//\u6307\u5B9A\u4F7F\u7528\u54EA\u4E00\u4E2A\u914D\u7F6E\u7C7B</span>
<span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;user-service&quot;</span><span class="token punctuation">,</span> configuration <span class="token operator">=</span> <span class="token class-name">FeignClientConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserClient</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/user/hello&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">String</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53E6\u5916\u8FD8\u8981\u5728\u914D\u7F6E\u6587\u4EF6\u4E2D\u6307\u5B9A\u65E5\u5FD7\u7B49\u7EA7</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">logging</span><span class="token punctuation">:</span>
  <span class="token key atrule">level</span><span class="token punctuation">:</span>
    <span class="token key atrule">com.hello.UserClient</span><span class="token punctuation">:</span> debug
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5E95\u5C42\u901A\u4FE1\u7684-http-\u7EC4\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u5E95\u5C42\u901A\u4FE1\u7684-http-\u7EC4\u4EF6" aria-hidden="true">#</a> \u5E95\u5C42\u901A\u4FE1\u7684 Http \u7EC4\u4EF6</h3><p>OpenFeign Http \u901A\u4FE1\u7EC4\u4EF6\u9ED8\u8BA4\u662F\u4F7F\u7528 jdk \u81EA\u5E26\u7684 <code>HttpURLConnection</code>\uFF0C\u7531\u4E8E\u6CA1\u6709\u8FDE\u63A5\u6C60\uFF0C\u6027\u80FD\u4E0D\u9AD8\uFF0C\u652F\u6301\u6362\u6210\u5176\u4ED6\u7684 Http \u901A\u4FE1\u7EC4\u4EF6\uFF0COpenFeign\u63D0\u4F9B\u4E86 okhttp\u3001httpclient \u8FD9\u4E24\u79CD\uFF0C\u73B0\u5728\u66F4\u4E3A\u4E3B\u6D41\u7684\u662F\u7528 okhttp\uFF0C\u652F\u6301\u8FDE\u63A5\u6C60\u3001\u591A\u7EBF\u7A0B\uFF0C\u4F7F\u7528\u540E\u8FD8\u4E0D\u9700\u8981\u624B\u52A8\u5173\u95ED\u91CA\u653E\u8D44\u6E90</p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>io.github.openfeign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>feign-okhttp<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">feign</span><span class="token punctuation">:</span>
	<span class="token key atrule">httpclient</span><span class="token punctuation">:</span>
		<span class="token key atrule">enable</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
  <span class="token key atrule">okhttp</span><span class="token punctuation">:</span>
  	<span class="token key atrule">enable</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u8C03\u7528\u8D85\u65F6" tabindex="-1"><a class="header-anchor" href="#\u8C03\u7528\u8D85\u65F6" aria-hidden="true">#</a> \u8C03\u7528\u8D85\u65F6</h3><p>\u5173\u4E8E OpenFeign \u8C03\u7528\u8D85\u65F6\uFF0C\u8D85\u8FC7\u9608\u503C\u5C31\u4F1A\u8FD4\u56DE\u5931\u8D25\uFF0C\u5982\u679C\u4E0B\u6E38\u63A5\u53E3\u53CD\u5E94\u65F6\u95F4\u6BD4\u8F83\u957F\uFF0C\u90A3\u4E48\u9700\u8981\u8FDB\u884C\u63A5\u53E3\u4F18\u5316\u6216\u8005\u63D0\u9AD8\u8D85\u65F6\u65F6\u95F4\uFF0C\u4E00\u822C Ribbon \u8D85\u65F6\u62A5\u9519\u662F\u8FD9\u6837\u7684\uFF1A<code>Read timed out executing POST http://***</code></p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">ribbon</span><span class="token punctuation">:</span>
	<span class="token comment"># \u5EFA\u7ACB\u8FDE\u63A5\u7684\u8D85\u65F6\u65F6\u95F4</span>
  <span class="token key atrule">ReadTimeout</span><span class="token punctuation">:</span> <span class="token number">2000</span>
  <span class="token comment"># \u5EFA\u7ACB\u8FDE\u63A5\u540E\u4ECE\u670D\u52A1\u8C03\u7528\u63A5\u53E3\u83B7\u53D6\u54CD\u5E94\u7684\u8D85\u65F6\u65F6\u95F4</span>
  <span class="token key atrule">ConnectTimeout</span><span class="token punctuation">:</span> <span class="token number">3000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u7194\u65AD\u964D\u7EA7" tabindex="-1"><a class="header-anchor" href="#\u7194\u65AD\u964D\u7EA7" aria-hidden="true">#</a> \u7194\u65AD\u964D\u7EA7</h3><p>\u7B80\u5355\u4ECB\u7ECD\u4E00\u4E0B\u964D\u7EA7\u548C\u7194\u65AD</p><ol><li>\u964D\u7EA7\uFF08Fallback\uFF09\uFF1A\u964D\u7EA7\u662F\u4E00\u79CD\u5728<strong>\u7CFB\u7EDF\u51FA\u73B0\u5F02\u5E38\u6216\u8D85\u65F6</strong>\u7684\u60C5\u51B5\u4E0B\uFF0C<strong>\u8FD4\u56DE\u4E00\u4E2A\u9ED8\u8BA4\u7684\u7ED3\u679C</strong>\u6216\u8005\u4E00\u4E2A\u5907\u7528\u7684\u670D\u52A1\u6765\u907F\u514D\u7CFB\u7EDF\u5D29\u6E83\u7684\u673A\u5236\u3002\u964D\u7EA7\u53EF\u4EE5\u5728\u5BA2\u6237\u7AEF\u6216\u8005\u670D\u52A1\u7AEF\u5B9E\u73B0\u3002</li><li>\u7194\u65AD\uFF08Circuit Breaker\uFF09\uFF1A\u7194\u65AD\u662F\u4E00\u79CD\u5728\u7CFB\u7EDF\u51FA\u73B0\u5F02\u5E38\u6216\u6545\u969C\u65F6\uFF0C\u5BF9\u8BE5\u670D\u52A1\u7684\u8BF7\u6C42\u8FDB\u884C\u7194\u65AD\uFF0C\u907F\u514D\u5927\u91CF\u8BF7\u6C42\u6D8C\u5165\u5BFC\u81F4\u7CFB\u7EDF\u5D29\u6E83\u7684\u673A\u5236\u3002\u7194\u65AD\u5668\u4F1A\u5728\u4E00\u6BB5\u65F6\u95F4\u5185\u76D1\u63A7\u670D\u52A1\u7684\u72B6\u6001\uFF0C<strong>\u5F53\u670D\u52A1\u7684\u5931\u8D25\u7387\u8FBE\u5230\u4E00\u5B9A\u9608\u503C\u65F6\uFF0C\u7194\u65AD\u5668\u4F1A\u89E6\u53D1\u7194\u65AD\u64CD\u4F5C</strong>\uFF0C\u5C06\u8BF7\u6C42\u8F6C\u53D1\u5230\u964D\u7EA7\u903B\u8F91\uFF0C\u907F\u514D\u5411\u5931\u8D25\u7684\u670D\u52A1\u53D1\u9001\u8BF7\u6C42\u3002</li></ol><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;user-service&quot;</span><span class="token punctuation">,</span> configuration <span class="token operator">=</span> <span class="token class-name">FeignClientConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> fallback <span class="token operator">=</span> <span class="token class-name">UserClientFallback</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserClient</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/user/hello&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">String</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//////////////////////////////////////////////////////////////////////</span>

<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserClientFallback</span> <span class="token keyword">implements</span> <span class="token class-name">UserClient</span> <span class="token punctuation">{</span>
  <span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;\u7528\u6237\u63A5\u53E3\u8C03\u7528\u5931\u8D25&quot;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5DE5\u4F5C\u539F\u7406\u7B80\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u5DE5\u4F5C\u539F\u7406\u7B80\u8FF0" aria-hidden="true">#</a> \u5DE5\u4F5C\u539F\u7406\u7B80\u8FF0</h2><ul><li>\u5728 SpringBoot \u5E94\u7528\u542F\u52A8\u65F6\uFF0C\u7531\u4E8E\u6211\u4EEC\u52A0\u4E0A\u4E86 <code>@EnableOpenFeign</code> \u6CE8\u89E3\uFF0C\u5F00\u542F\u5BF9\u5305\u8DEF\u5F84\u626B\u63CF\uFF0C\u6240\u6709\u88AB <code>@FeignClient</code> \u6CE8\u89E3\u4FEE\u9970\u7684\u7C7B\uFF0C\u4F1A\u88AB\u6CE8\u518C\u5230 SpringIoC \u5BB9\u5668\u4E2D\u3002</li><li>\u7531\u4E8E\u6CA1\u6709\u5199\u8FC7\u5B9E\u73B0\u7C7B\uFF0C\u90A3\u4E48\u6CE8\u518C\u5230\u5BB9\u5668\u4E2D\u7684\u662F\u4E00\u4E2A\u4EE3\u7406\u7C7B\uFF0C\u5177\u4F53\u662F Spring \u901A\u8FC7 JDK \u7684\u4EE3\u7406\u65B9\u5F0F\u751F\u6210\u4EE3\u7406\u5BF9\u8C61\u3002</li><li>\u5F53\u8FD9\u4E9B\u5B9A\u4E49\u7684 FeignClient \u88AB\u8C03\u7528\u65F6\uFF0COpenFeign \u4F1A\u4E3A\u6BCF\u4E2A\u63A5\u53E3\u65B9\u6CD5\u521B\u5EFA\u4E00\u4E2A <code>RequestTemplate</code> \u5BF9\u8C61\u3002\u8BE5\u5BF9\u8C61\u5C01\u88C5\u4E86HTTP\u8BF7\u6C42\u9700\u8981\u7684\u6240\u6709\u4FE1\u606F\uFF0C\u4F8B\u5982\u8BF7\u6C42\u53C2\u6570\u540D\u3001\u8BF7\u6C42\u65B9\u6CD5\u7B49\u4FE1\u606F\u3002</li><li>\u7136\u540E\u7531 <code>RequestTemplate</code> \u751F\u6210 <code>Request</code>\uFF0C\u628A <code>Request</code> \u4EA4\u7ED9 <code>Client</code> \u53BB\u5904\u7406\uFF0C\u8FD9\u91CC\u7684 <code>Client</code> \u53EF\u4EE5\u662F JDK \u539F\u751F\u7684<code>URLConnection</code>\u3001<code>HttpClient</code> \u6216 <code>Okhttp</code> \u3002\u6700\u540E <code>Client</code> \u88AB\u5C01\u88C5\u5230 <code>LoadBalanceClient</code> \u7C7B\uFF0C\u770B\u8FD9\u4E2A\u7C7B\u7684\u540D\u5B57\u65E2\u53EF\u4EE5\u77E5\u9053\u662F\u7ED3\u5408 Ribbon \u8D1F\u8F7D\u5747\u8861\u53D1\u8D77\u670D\u52A1\u4E4B\u95F4\u7684\u8C03\u7528\uFF0C\u56E0\u4E3A\u5728 OpenFeign \u4E2D\u9ED8\u8BA4\u662F\u5DF2\u7ECF\u6574\u5408\u4E86 Ribbon \u4E86\u3002</li></ul>`,28),i=[p];function l(o,c){return s(),a("div",null,i)}var r=n(t,[["render",l],["__file","SpringCloud-OpenFeign.html.vue"]]);export{r as default};