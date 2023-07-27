import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as s,c as a,d as e}from"./app.00677c1d.js";const t={},p=e(`<h1 id="\u53CD\u5C04\u673A\u5236" tabindex="-1"><a class="header-anchor" href="#\u53CD\u5C04\u673A\u5236" aria-hidden="true">#</a> \u53CD\u5C04\u673A\u5236</h1><blockquote><p>Java \u4E2D\u7684\u53CD\u5C04\u673A\u5236\u662F\u6307\u52A8\u6001\u83B7\u53D6\u7684\u4FE1\u606F\u4EE5\u53CA\u52A8\u6001\u8C03\u7528\u5BF9\u8C61\u7684\u65B9\u6CD5\u7684\u529F\u80FD\u3002\u5728\u8FD0\u884C\u4E2D\u5BF9\u4E8E\u4EFB\u610F\u4E00\u4E2A\u7C7B\uFF0C\u90FD\u80FD\u77E5\u9053\u8FD9\u4E2A\u7C7B\u6240\u6709\u7684\u5C5E\u6027\u548C\u65B9\u6CD5\uFF1B\u4EFB\u610F\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u90FD\u80FD\u8C03\u7528\u5B83\u7684\u65B9\u6CD5\u548C\u5C5E\u6027\u3002</p></blockquote><h2 id="java-\u4EE3\u7801\u7ECF\u5386\u7684\u4E09\u4E2A\u9636\u6BB5" tabindex="-1"><a class="header-anchor" href="#java-\u4EE3\u7801\u7ECF\u5386\u7684\u4E09\u4E2A\u9636\u6BB5" aria-hidden="true">#</a> Java \u4EE3\u7801\u7ECF\u5386\u7684\u4E09\u4E2A\u9636\u6BB5</h2><ol><li>Source \u6E90\u4EE3\u7801\u9636\u6BB5\u3002\u8FD9\u4E2A\u9636\u6BB5\u8FD8\u662F class \u6587\u4EF6\uFF0C\u5B58\u653E\u7740\u5F00\u53D1\u4EBA\u5458\u7F16\u5199\u597D\u5E76\u7F16\u8BD1\u540E\u7684 Java \u4EE3\u7801\u3002</li><li>Class \u7C7B\u5BF9\u8C61\u9636\u6BB5\u3002\u7C7B\u52A0\u8F7D\u5668 ClassLoader \u52A0\u8F7D class \u6587\u4EF6\uFF0C\u4F7F\u5176\u6210\u4E3A\u4E00\u4E2A Class \u7C7B\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u8BBF\u95EE\u5230\u8FD9\u4E2A\u7C7B\u7684\u6210\u5458\u53D8\u91CF\u3001\u6210\u5458\u65B9\u6CD5\u7B49\u3002</li><li>RunTime \u8FD0\u884C\u9636\u6BB5\u3002\u901A\u8FC7 <code>\u7C7B \u5BF9\u8C61\u540D = new \u7C7B()</code> \u7684\u65B9\u5F0F\u521B\u5EFA\u51FA\u6765\u3002</li></ol><h2 id="class-\u7C7B" tabindex="-1"><a class="header-anchor" href="#class-\u7C7B" aria-hidden="true">#</a> Class \u7C7B</h2><p>Class \u7C7B\u4E0E <code>class</code> \u5173\u952E\u5B57\u4E0D\u540C\uFF0CClass \u662F\u4E00\u4E2A\u7C7B\u578B\u3002</p><p>\u4E00\u4E2A\u7C7B\u6709\uFF1A\u6210\u5458\u53D8\u91CF\u3001\u65B9\u6CD5\u3001\u6784\u9020\u65B9\u6CD5\u3001\u5305\u7B49\u7B49\u4FE1\u606F\uFF0C\u5229\u7528\u53CD\u5C04\u6280\u672F\u53EF\u4EE5\u5BF9\u4E00\u4E2A\u7C7B\u8FDB\u884C\u89E3\u5256\uFF0C\u628A\u4E2A\u4E2A\u7EC4\u6210\u90E8\u5206\u6620\u5C04\u6210\u4E00\u4E2A\u4E2A\u5BF9\u8C61\uFF0C\u800C\u628A\u8FD9\u4E9B\u5BF9\u8C61\u7EC4\u7EC7\u8D77\u6765\u7684\u7C7B\u5C31\u662F Class \u7C7B\u3002</p><h2 id="\u53CD\u5C04\u7684\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#\u53CD\u5C04\u7684\u4F7F\u7528" aria-hidden="true">#</a> \u53CD\u5C04\u7684\u4F7F\u7528</h2><h3 id="\u83B7\u53D6-class-\u5BF9\u8C61" tabindex="-1"><a class="header-anchor" href="#\u83B7\u53D6-class-\u5BF9\u8C61" aria-hidden="true">#</a> \u83B7\u53D6 Class \u5BF9\u8C61</h3><p>\u5728\u7C7B\u52A0\u8F7D\u7684\u65F6\u5019\uFF0CJVM\u4F1A\u6839\u636E class \u6587\u4EF6\u521B\u5EFA\u4E00\u4E2A Class \u5BF9\u8C61</p><p>\u83B7\u53D6 Class \u5BF9\u8C61\u4E00\u822C\u6709\u4E09\u79CD\u65B9\u5F0F</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token comment">// \u6E90\u7801\u9636\u6BB5</span>
<span class="token comment">// \u5C06\u5B57\u8282\u7801\u6587\u4EF6\u52A0\u8F7D\u8FDB\u5185\u5B58\uFF0C\u8FD4\u56DEClass\u5BF9\u8C61</span>
<span class="token comment">// \u5E38\u7528\u4E8E\u914D\u7F6E\u6587\u4EF6\uFF0C\u5C06\u5168\u7C7B\u540D\u5B9A\u4E49\u5728\u914D\u7F6E\u6587\u4EF6\u4E2D</span>
<span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">&quot;\u5168\u7C7B\u540D&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Class\u5BF9\u8C61\u9636\u6BB5</span>
<span class="token comment">// \u901A\u8FC7\u7C7B\u540D\u7684class\u5C5E\u6027\u6765\u83B7\u53D6Class\u5BF9\u8C61</span>
<span class="token comment">// \u591A\u7528\u4E8E\u53C2\u6570\u7684\u4F20\u9012</span>
\u7C7B\u540D<span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">;</span> 

<span class="token comment">// RunTime\u9636\u6BB5</span>
<span class="token comment">// \u901A\u8FC7\u7236\u7C7BObject\u4E2D\u7684getClass\u65B9\u6CD5\u83B7\u53D6Class\u5BF9\u8C61</span>
\u5BF9\u8C61<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u9700\u8981\u6CE8\u610F\u7684\u662F</p><blockquote><p>\u540C\u4E00\u4E2A\u5B57\u8282\u7801\u6587\u4EF6\u5728\u4E00\u6B21\u7A0B\u5E8F\u4E2D\u53EA\u4F1A\u88AB\u52A0\u8F7D\u4E00\u6B21\uFF0C<strong>\u4E0D\u8BBA\u901A\u8FC7\u54EA\u4E00\u79CD\u65B9\u5F0F\u83B7\u53D6\u7684Class\u5BF9\u8C61\u90FD\u662F\u540C\u4E00\u4E2A</strong></p></blockquote><h3 id="\u83B7\u53D6\u6784\u9020\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u83B7\u53D6\u6784\u9020\u65B9\u6CD5" aria-hidden="true">#</a> \u83B7\u53D6\u6784\u9020\u65B9\u6CD5</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token comment">// \u83B7\u53D6\u6240\u6709public\u6784\u9020\u65B9\u6CD5</span>
<span class="token class-name">Constructor</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getConstructors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u6839\u636E\u6784\u9020\u65B9\u6CD5\u7684\u53C2\u6570\u7C7B\u578B\u6240\u5BF9\u5E94\u7684\u7C7B\u53BB\u83B7\u53D6\u7279\u5B9A\u7684public\u6784\u9020\u65B9\u6CD5</span>
<span class="token class-name">Constructor</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">getConstructor</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> parameterTypes<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u83B7\u53D6\u6240\u6709\u6784\u9020\u65B9\u6CD5</span>
<span class="token class-name">Constructor</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getDeclaredConstructors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u6839\u636E\u6784\u9020\u65B9\u6CD5\u7684\u53C2\u6570\u7C7B\u578B\u6240\u5BF9\u5E94\u7684\u7C7B\u53BB\u83B7\u53D6\u7279\u5B9A\u7684\u6784\u9020\u65B9\u6CD5</span>
<span class="token class-name">Constructor</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">getDeclaredConstructor</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> parameterTypes<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u521B\u5EFA\u5BF9\u8C61" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFA\u5BF9\u8C61" aria-hidden="true">#</a> \u521B\u5EFA\u5BF9\u8C61</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token comment">// \u6839\u636E\u6784\u9020\u65B9\u6CD5\u7684\u53C2\u6570\u5217\u8868\u4F20\u5165\u6307\u5B9A\u53C2\u6570\uFF0C\u521B\u5EFA\u4E00\u4E2A\u5BF9\u8C61</span>
<span class="token class-name">T</span> <span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u83B7\u53D6\u6210\u5458\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u83B7\u53D6\u6210\u5458\u65B9\u6CD5" aria-hidden="true">#</a> \u83B7\u53D6\u6210\u5458\u65B9\u6CD5</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token comment">// \u83B7\u53D6\u6240\u6709public\u6210\u5458\u65B9\u6CD5(\u9664\u4E86\u81EA\u5DF1\u7684publib\u65B9\u6CD5\uFF0C\u8FD8\u5305\u542B\u7236\u7C7B/Object\u7C7B\u4E2D\u7684public\u65B9\u6CD5)</span>
<span class="token class-name">Method</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getMethods</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u6839\u636E\u65B9\u6CD5\u540D\u548C\u6210\u5458\u65B9\u6CD5\u7684\u53C2\u6570\u7C7B\u578B\u6240\u5BF9\u5E94\u7684\u7C7B\u53BB\u83B7\u53D6\u7279\u5B9A\u7684public\u6210\u5458\u65B9\u6CD5</span>
<span class="token class-name">Method</span> <span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> parameterTypes<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u83B7\u53D6\u6240\u6709\u6210\u5458\u65B9\u6CD5</span>
<span class="token class-name">Method</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getDeclaredMethods</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u6839\u636E\u65B9\u6CD5\u540D\u548C\u6210\u5458\u65B9\u6CD5\u7684\u53C2\u6570\u7C7B\u578B\u6240\u5BF9\u5E94\u7684\u7C7B\u53BB\u83B7\u53D6\u7279\u5B9A\u7684\u6210\u5458\u65B9\u6CD5</span>
<span class="token class-name">Method</span> <span class="token function">getDeclaredMethod</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> parameterTypes<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u9700\u8981\u6CE8\u610F!!</p><p>\u5982\u679C\u4F7F\u7528 <code>getDeclaredMethods()</code> \u8FD9\u79CD\u5FFD\u7565\u4FEE\u9970\u7B26\u7684\u83B7\u53D6\u65B9\u5F0F\uFF0C\u540E\u7EED\u7684\u4F7F\u7528\u4E4B\u524D\u9700\u8981\u6267\u884C\u8FD9\u4E00\u53E5</p><p><code>method.setAccessible(true)</code></p><p>\u8FD9\u6837\u4F7F\u7528\u7684\u8FC7\u7A0B\u4E2D\u4E5F\u540C\u6837\u5FFD\u7565\u4FEE\u9970\u7B26\uFF0C\u624D\u80FD\u6B63\u5E38\u4F7F\u7528\u3002\u4FD7\u79F0\u66B4\u529B\u53CD\u5C04\u3002</p><p>\u83B7\u53D6\u6210\u5458\u65B9\u6CD5\u540E\u8C03\u7528</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token comment">// \u6839\u636EMethod\u5BF9\u8C61\u4E2D\u7684\u53C2\u6570\u5217\u8868\u7684\u7C7B\u578B\uFF0C\u4F20\u5165\u6307\u5B9A\u7C7B\u578B\u7684\u53C2\u6570\uFF0C\u540C\u65F6\u4F20\u5165\u5BF9\u8C61\uFF0C\u9700\u8981\u786E\u5B9A\u6267\u884C\u54EA\u4E2A\u5BF9\u8C61\u7684\u65B9\u6CD5</span>
<span class="token class-name">Object</span> <span class="token function">invoke</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u83B7\u53D6\u6210\u5458\u53D8\u91CF" tabindex="-1"><a class="header-anchor" href="#\u83B7\u53D6\u6210\u5458\u53D8\u91CF" aria-hidden="true">#</a> \u83B7\u53D6\u6210\u5458\u53D8\u91CF</h3><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token comment">// \u83B7\u53D6\u6240\u6709\u7531public\u4FEE\u9970\u7684\u6210\u5458\u53D8\u91CF</span>
<span class="token class-name">Field</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getFields</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u83B7\u53D6\u6307\u5B9A\u7684\u7531public\u4FEE\u9970\u7684\u6210\u5458\u53D8\u91CF</span>
<span class="token class-name">Field</span> <span class="token function">getField</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u83B7\u53D6\u6240\u6709\u6210\u5458\u53D8\u91CF\uFF0C\u4E0D\u8003\u8651\u4FEE\u9970\u7B26</span>
<span class="token class-name">Field</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getDeclaredFields</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u83B7\u53D6\u6307\u5B9A\u7684\u6210\u5458\u53D8\u91CF</span>
<span class="token class-name">Field</span> <span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u83B7\u53D6\u6210\u5458\u53D8\u91CF\u540E\u7684\u64CD\u4F5C</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token comment">// \u4E3A\u8FD9\u4E2A\u53D8\u91CF\u8D4B\u503C</span>
<span class="token keyword">void</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u83B7\u53D6\u8FD9\u4E2A\u53D8\u91CF\u7684\u503C</span>
<span class="token class-name">Object</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u4F18\u70B9" tabindex="-1"><a class="header-anchor" href="#\u4F18\u70B9" aria-hidden="true">#</a> \u4F18\u70B9</h2><ul><li>\u53EF\u4EE5\u5728\u7A0B\u5E8F\u8FD0\u884C\u8FC7\u7A0B\u4E2D\uFF0C\u64CD\u4F5C\u6210\u5458\u53D8\u91CF\u3001\u6210\u5458\u65B9\u6CD5\u3001\u6784\u9020\u65B9\u6CD5\u7B49\u5BF9\u8C61</li><li>\u53EF\u4EE5\u89E3\u8026\uFF0C\u63D0\u9AD8\u7A0B\u5E8F\u7684\u53EF\u6269\u5C55\u6027\u3001\u7075\u6D3B\u6027</li></ul><h2 id="\u7F3A\u70B9" tabindex="-1"><a class="header-anchor" href="#\u7F3A\u70B9" aria-hidden="true">#</a> \u7F3A\u70B9</h2><ul><li>\u53CD\u5C04\u521B\u5EFA\u5BF9\u8C61\u8981\u6BD4\u6B63\u5E38\u521B\u5EFA\u5BF9\u8C61\u6548\u7387\u8981\u4F4E\uFF0C\u56E0\u4E3AJVM\u65E0\u6CD5\u5BF9\u8FD9\u4E9B\u4EE3\u7801\u8FDB\u884C\u4F18\u5316\uFF0C\u6027\u80FD\u4F1A\u6709\u4E00\u5B9A\u7684\u635F\u8017</li><li>\u7834\u574F\u7C7B\u7684\u5C01\u88C5\u6027\uFF0C\u56E0\u4E3A\u53CD\u5C04\u53EF\u4EE5\u5FFD\u7565\u4FEE\u9970\u7B26\u8FDB\u884C\u8BBF\u95EE\uFF0C\u8FD9\u6837\u5C31\u5931\u53BB\u4E86\u4FEE\u9970\u7B26\u7684\u610F\u4E49\uFF0C\u751A\u81F3\u8FD8\u53EF\u80FD\u6709\u5B89\u5168\u95EE\u9898</li></ul><h2 id="\u7ED3\u5408\u4F18\u70B9\u7F3A\u70B9\u7684\u4E00\u70B9\u601D\u8003" tabindex="-1"><a class="header-anchor" href="#\u7ED3\u5408\u4F18\u70B9\u7F3A\u70B9\u7684\u4E00\u70B9\u601D\u8003" aria-hidden="true">#</a> \u7ED3\u5408\u4F18\u70B9\u7F3A\u70B9\u7684\u4E00\u70B9\u601D\u8003</h2><p>\u53CD\u5C04\u662F\u4E00\u628A\u53CC\u5203\u5251\u3002</p><p>\u5728\u8FD0\u884C\u671F\u80FD\u83B7\u53D6\u7C7B\u7684\u4FE1\u606F\u8FD9\u65E0\u7591\u662F\u4E00\u4E2A\u5DE8\u5927\u7684\u89E3\u8026\u64CD\u4F5C\uFF0C\u8BB8\u591A\u4F18\u79C0\u7684\u6846\u67B6\u6B63\u662F\u5F88\u597D\u5730\u4F7F\u7528\u4E86\u8FD9\u4E2A\u7279\u6027\uFF0C\u5982\uFF1ASpring\u6846\u67B6\uFF0C\u4E3A\u5F00\u53D1\u5E26\u6765\u4E86\u8BB8\u591A\u4FBF\u5229\u3002</p><p>\u4F46\u540C\u65F6\u5176\u66B4\u529B\u8BBF\u95EE\u7684\u7279\u70B9\u4E3A\u7A0B\u5E8F\u7559\u4E0B\u4E00\u5B9A\u7684\u9690\u60A3\uFF0C\u5982\u679C\u4F7F\u7528\u4E0D\u5F53\u4F1A\u5BFC\u81F4\u96BE\u4EE5\u901A\u8FC7\u7A0B\u5E8F\u8FFD\u6EAFbug\u7684\u8D77\u56E0\u3002</p><p>\u800C\u4E14\u53CD\u5C04\u7C7B\u53CA\u53CD\u5C04\u65B9\u6CD5\u7684\u83B7\u53D6\uFF0C\u90FD\u662F\u901A\u8FC7\u4ECE\u5217\u8868\u4E2D\u641C\u5BFB\u67E5\u627E\u5339\u914D\u7684\u65B9\u6CD5\uFF0C\u6240\u4EE5\u67E5\u627E\u6027\u80FD\u4F1A\u968F\u7C7B\u7684\u5927\u5C0F\u65B9\u6CD5\u591A\u5C11\u800C\u53D8\u5316\u3002</p><p>\u6240\u4EE5\u4E00\u822C\u5F00\u53D1\u7684\u8FC7\u7A0B\u4E2D\u5C3D\u91CF\u5C11\u7528\uFF0C\u5B66\u4E60\u53CD\u5C04\u66F4\u591A\u7684\u662F\u534F\u52A9\u6211\u4EEC\u7406\u89E3\u90A3\u4E9B\u4F18\u79C0\u6846\u67B6\u7684\u539F\u7406\uFF5E</p>`,40),c=[p];function l(o,i){return s(),a("div",null,c)}var r=n(t,[["render",l],["__file","reflection.html.vue"]]);export{r as default};