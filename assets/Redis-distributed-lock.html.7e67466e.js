import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as s,c as a,d as t}from"./app.7c5e8c99.js";const p={},e=t(`<h1 id="redis-\u5206\u5E03\u5F0F\u9501" tabindex="-1"><a class="header-anchor" href="#redis-\u5206\u5E03\u5F0F\u9501" aria-hidden="true">#</a> Redis \u5206\u5E03\u5F0F\u9501</h1><p>\u6982\u5FF5</p><p>jvm \u540C\u6B65\u9501</p><p>\u4F7F\u7528\u573A\u666F</p><p>\u4E0E zookeeper \u5206\u5E03\u5F0F\u9501\u7684\u5BF9\u6BD4</p><h2 id="\u4E00\u6B65\u6B65\u5206\u6790\u5982\u4F55\u5728-java-\u4E2D\u4F7F\u7528-redis-\u5206\u5E03\u5F0F\u9501" tabindex="-1"><a class="header-anchor" href="#\u4E00\u6B65\u6B65\u5206\u6790\u5982\u4F55\u5728-java-\u4E2D\u4F7F\u7528-redis-\u5206\u5E03\u5F0F\u9501" aria-hidden="true">#</a> \u4E00\u6B65\u6B65\u5206\u6790\u5982\u4F55\u5728 Java \u4E2D\u4F7F\u7528 Redis \u5206\u5E03\u5F0F\u9501</h2><h3 id="\u505A\u6CD5\u4E00" tabindex="-1"><a class="header-anchor" href="#\u505A\u6CD5\u4E00" aria-hidden="true">#</a> \u505A\u6CD5\u4E00</h3><p>\u6211\u4EEC\u770B\u7F51\u4E0A\u7684\u8D44\u6599\u90FD\u8BF4\u6700\u57FA\u7840\u7684\u5B9E\u73B0\u662F\u4F7F\u7528 <code>setnx</code> \u547D\u4EE4\uFF08set if not exist\uFF09</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisLock</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> redisTemplate<span class="token punctuation">;</span>
    <span class="token comment">//\u9501\u7684\u524D\u7F00\u540D\u79F0</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> LOCK_PREFIX <span class="token operator">=</span> <span class="token string">&quot;GET_LOCK&quot;</span><span class="token punctuation">;</span>
    <span class="token comment">//\u9501\u7684\u8FC7\u671F\u65F6\u95F4\uFF0C\u5C3D\u53EF\u80FD\u907F\u514D\u4E1A\u52A1\u6CA1\u6709\u6267\u884C\u5B8C\u9501\u5C31\u81EA\u52A8\u91CA\u653E</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> EXPIRE_TIME <span class="token operator">=</span> <span class="token number">300L</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">lock</span><span class="token punctuation">(</span><span class="token class-name">String</span> lockName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> key <span class="token operator">=</span> LOCK_PREFIX <span class="token operator">+</span> lockName<span class="token punctuation">;</span>
        <span class="token comment">//\u52A0\u9501</span>
        <span class="token class-name">Boolean</span> setFlag <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setIfAbsent</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Boolean</span><span class="token punctuation">.</span>TRUE<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>setFlag<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot; ************ Redis\u52A0\u9501\u6210\u529F\uFF1A{} ************ &quot;</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//\u8BBE\u7F6E\u8FC7\u671F\u65F6\u95F4\uFF0C\u9632\u6B62\u51FA\u73B0\u6B7B\u9501\uFF0C\u7A0B\u5E8F\u5D29\u6E83\u3001\u670D\u52A1\u5668\u5B95\u673A\u90FD\u662F\u4E0D\u4F1A\u91CA\u653E\u9501\u7684</span>
                redisTemplate<span class="token punctuation">.</span><span class="token function">expire</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> EXPIRE_TIME<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span>SECONDS<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//\u5904\u7406\u4E1A\u52A1\u903B\u8F91</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;\u5904\u7406\u4E1A\u52A1\u4E2D&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span>SECONDS<span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// *******\u4E1A\u52A1\u903B\u8F91\u5904\u7406\u7ED3\u675F****** //</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;\u4E1A\u52A1\u5904\u7406\u8FC7\u7A0B\u4E2D\u51FA\u73B0\u5F02\u5E38\uFF1A{}&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                <span class="token comment">//\u52A0\u9501\u5904\u7406\u7684\u903B\u8F91\u5B8C\u6210\uFF0C\u624B\u52A8\u91CA\u653E\u9501</span>
                redisTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot; ************ Redis\u91CA\u653E\u9501\u6210\u529F\uFF1A{} ************ &quot;</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;\u83B7\u53D6\u9501\u5931\u8D25&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u79CD\u505A\u6CD5\u770B\u4F3C\u53EF\u4EE5\u5B9E\u73B0\uFF0C\u4F46\u662F\u4F1A\u5B58\u5728\u4E24\u4E2A\u95EE\u9898</p><ul><li><strong>\u5982\u679C\u6267\u884C\u5B8C <code>setIfAbsent</code> \u540E\uFF0C\u6267\u884C <code>expire</code> \u524D\u670D\u52A1\u5668\u5B95\u673A\u4E86\uFF0C\u8FD9\u4E2A\u9501\u5C31\u4E00\u76F4\u9501\u4F4F\uFF0C\u65E0\u6CD5\u91CA\u653E\u4E86</strong></li><li><strong>\u56E0\u4E3A\u52A0\u5165\u4E86\u9501\u8FC7\u671F\u65F6\u95F4\uFF0C\u90A3\u4E48\u5728 finally \u5757\u4E2D\u76F4\u63A5\u8FD9\u6837\u91CA\u653E\u9501\u662F\u53EF\u80FD\u4F1A\u91CA\u653E\u6389\u5176\u4ED6\u7EBF\u7A0B\u52A0\u7684\u9501\u7684</strong></li></ul><h3 id="\u505A\u6CD5\u4E8C" tabindex="-1"><a class="header-anchor" href="#\u505A\u6CD5\u4E8C" aria-hidden="true">#</a> \u505A\u6CD5\u4E8C</h3><p>\u5438\u53D6\u4E0A\u4E00\u4E2A\u505A\u6CD5\u7684\u4E0D\u8DB3\uFF0C\u8BA9\u52A0\u9501\u548C\u8BBE\u7F6E\u8FC7\u671F\u65F6\u95F4\u8FD9\u4E24\u4E2A\u64CD\u4F5C\u6210\u4E3A\u4E00\u4E2A<strong>\u539F\u5B50\u64CD\u4F5C</strong>\uFF0C\u53E6\u5916\u5728 finally \u4E2D\u589E\u52A0\u4E86\u91CA\u653E\u9501\u524D\u7EBF\u5224\u65AD\u5F53\u524D\u9501\u662F\u5426\u662F\u81EA\u5DF1\u7684\u4E00\u4E2A\u5224\u65AD\uFF0C\u907F\u514D\u91CA\u653E\u6389\u4E0D\u5C5E\u4E8E\u81EA\u5DF1\u7EBF\u7A0B\u7684\u9501</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisLock</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> redisTemplate<span class="token punctuation">;</span>
    <span class="token comment">//\u9501\u7684\u524D\u7F00\u540D\u79F0</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> LOCK_PREFIX <span class="token operator">=</span> <span class="token string">&quot;GET_LOCK&quot;</span><span class="token punctuation">;</span>
    <span class="token comment">//\u9501\u7684\u8FC7\u671F\u65F6\u95F4\uFF0C\u5C3D\u53EF\u80FD\u907F\u514D\u4E1A\u52A1\u6CA1\u6709\u6267\u884C\u5B8C\u9501\u5C31\u81EA\u52A8\u91CA\u653E</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> EXPIRE_TIME <span class="token operator">=</span> <span class="token number">300L</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">lock</span><span class="token punctuation">(</span><span class="token class-name">String</span> lockName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> key <span class="token operator">=</span> LOCK_PREFIX <span class="token operator">+</span> lockName<span class="token punctuation">;</span>
        <span class="token class-name">String</span> value <span class="token operator">=</span> UUID<span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Boolean</span> setFlag <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setIfAbsent</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> EXPIRE_TIME<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span>SECONDS<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Boolean</span><span class="token punctuation">.</span>TRUE<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>setFlag<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot; ************ Redis\u52A0\u9501\u6210\u529F\uFF1A{} ************ &quot;</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//\u8BBE\u7F6E\u8FC7\u671F\u65F6\u95F4\uFF0C\u9632\u6B62\u51FA\u73B0\u6B7B\u9501\uFF0C\u7A0B\u5E8F\u5D29\u6E83\u3001\u670D\u52A1\u5668\u5B95\u673A\u90FD\u662F\u4E0D\u4F1A\u91CA\u653E\u9501\u7684</span>
                redisTemplate<span class="token punctuation">.</span><span class="token function">expire</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> EXPIRE_TIME<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span>SECONDS<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//\u5904\u7406\u4E1A\u52A1\u903B\u8F91</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;\u5904\u7406\u4E1A\u52A1\u4E2D&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span>SECONDS<span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;\u83B7\u53D6\u9501\u5931\u8D25&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;\u4E1A\u52A1\u5904\u7406\u8FC7\u7A0B\u4E2D\u51FA\u73B0\u5F02\u5E38\uFF1A{}&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token comment">//\u4E3A\u4E86\u9632\u6B62\u5728\u91CA\u653E\u9501\u65F6\uFF0C\u539F\u6709\u9501\u5DF2\u7ECF\u8FC7\u671F\u81EA\u52A8\u91CA\u653E\uFF0C\u800C\u91CA\u653E\u7684\u662F\u5176\u4ED6\u7684\u9501</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                redisTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),o=[e];function c(l,i){return s(),a("div",null,o)}var d=n(p,[["render",c],["__file","Redis-distributed-lock.html.vue"]]);export{d as default};
