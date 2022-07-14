import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as s,c as a,e as p}from"./app.0f4f56d8.js";const e={},t=p(`<h1 id="\u6CDB\u578B" tabindex="-1"><a class="header-anchor" href="#\u6CDB\u578B" aria-hidden="true">#</a> \u6CDB\u578B</h1><blockquote><p>\u6CDB\u578B\u7684\u672C\u8D28\u662F\u4E3A\u4E86\u53C2\u6570\u5316\u7C7B\u578B\uFF08\u5728\u4E0D\u521B\u5EFA\u65B0\u7684\u7C7B\u578B\u7684\u60C5\u51B5\u4E0B\uFF0C\u901A\u8FC7\u6CDB\u578B\u6307\u5B9A\u7684\u4E0D\u540C\u7C7B\u578B\u6765\u63A7\u5236\u5F62\u53C2\u5177\u4F53\u9650\u5236\u7684\u7C7B\u578B\uFF09\u3002\u4E5F\u5C31\u662F\u8BF4\u5728\u6CDB\u578B\u4F7F\u7528\u8FC7\u7A0B\u4E2D\uFF0C\u64CD\u4F5C\u7684\u6570\u636E\u7C7B\u578B\u88AB\u6307\u5B9A\u4E3A\u4E00\u4E2A\u53C2\u6570\uFF0C\u8FD9\u79CD\u53C2\u6570\u7C7B\u578B\u53EF\u4EE5\u7528\u5728\u7C7B\u3001\u63A5\u53E3\u548C\u65B9\u6CD5\u4E2D\uFF0C\u5206\u522B\u88AB\u79F0\u4E3A\u6CDB\u578B\u7C7B\u3001\u6CDB\u578B\u63A5\u53E3\u3001\u6CDB\u578B\u65B9\u6CD5\u3002</p></blockquote><h2 id="\u4F18\u70B9" tabindex="-1"><a class="header-anchor" href="#\u4F18\u70B9" aria-hidden="true">#</a> \u4F18\u70B9</h2><p>\u9002\u7528\u4E8E\u591A\u79CD\u6570\u636E\u7C7B\u578B\u6267\u884C\u76F8\u540C\u7684\u4EE3\u7801\uFF0C\u4F7F\u7528\u4E00\u4E2A\u6CDB\u578B\u5C01\u88C5\u6240\u6709\u76F8\u540C\u7684\u903B\u8F91</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a <span class="token operator">+</span> <span class="token string">&quot;+&quot;</span> <span class="token operator">+</span> b <span class="token operator">+</span> <span class="token string">&quot;=&quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">float</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">float</span> a<span class="token punctuation">,</span> <span class="token keyword">float</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a <span class="token operator">+</span> <span class="token string">&quot;+&quot;</span> <span class="token operator">+</span> b <span class="token operator">+</span> <span class="token string">&quot;=&quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">double</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">double</span> a<span class="token punctuation">,</span> <span class="token keyword">double</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a <span class="token operator">+</span> <span class="token string">&quot;+&quot;</span> <span class="token operator">+</span> b <span class="token operator">+</span> <span class="token string">&quot;=&quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u770B\u5230\uFF0C\u6BCF\u4E00\u79CD\u7C7B\u578B\u90FD\u8981\u5199\u4E00\u4EFD\u76F8\u540C\u7684\u4EE3\u7801\uFF0C\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u6CDB\u578B\u8FDB\u884C\u903B\u8F91\u5C01\u88C5</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span> <span class="token keyword">extends</span> <span class="token class-name">Number</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">double</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">T</span> a<span class="token punctuation">,</span> <span class="token class-name">T</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a <span class="token operator">+</span> <span class="token string">&quot;+&quot;</span> <span class="token operator">+</span> b <span class="token operator">+</span> <span class="token string">&quot;=&quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token function">doubleValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> b<span class="token punctuation">.</span><span class="token function">doubleValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> a<span class="token punctuation">.</span><span class="token function">doubleValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> b<span class="token punctuation">.</span><span class="token function">doubleValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6CDB\u578B\u4E2D\u7684\u7C7B\u578B\u5728\u4F7F\u7528\u65F6\u6307\u5B9A\uFF0C\u4E0D\u9700\u8981\u5F3A\u5236\u7C7B\u578B\u8F6C\u6362\uFF08<strong>\u7C7B\u578B\u5B89\u5168</strong>\uFF0C\u7F16\u8BD1\u5668\u4F1A<strong>\u68C0\u67E5\u7C7B\u578B</strong>\uFF09</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">List</span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;xxString&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">100d</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u770B\u5230\u96C6\u5408\u4E2D\u653E\u4E86\u591A\u79CD\u7C7B\u578B\u7684\u6570\u636E\uFF0C\u4F7F\u7528\u7684\u65F6\u5019\u5F88\u53EF\u80FD\u9700\u8981\u8FDB\u884C\u5F3A\u5236\u7C7B\u578B\u8F6C\u6362\uFF0C\u751A\u81F3\u6709\u8F6C\u6362\u5931\u8D25\u7684\u5F02\u5E38\u3002\u5982\u679C\u6211\u4EEC\u5728\u5B9A\u4E49\u96C6\u5408\u7684\u65F6\u5019\u5C31\u5DF2\u7ECF\u5B9A\u4E49\u4E86\u8FD9\u4E2A\u96C6\u5408\u4E2D\u4F7F\u7528\u7684\u7C7B\u578B\uFF0C\u90A3\u4E48\u4F7F\u7528\u8D77\u6765\u5C31\u65B9\u4FBF\u8BB8\u591A\uFF0C\u62FF\u5230\u96C6\u5408\u4E2D\u7684\u5143\u7D20\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528 String \u7684\u65B9\u6CD5</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u6CDB\u578B\u7684\u4E0A\u4E0B\u9650" tabindex="-1"><a class="header-anchor" href="#\u6CDB\u578B\u7684\u4E0A\u4E0B\u9650" aria-hidden="true">#</a> \u6CDB\u578B\u7684\u4E0A\u4E0B\u9650</h2><blockquote><p>\u4E3A\u4E86\u89E3\u51B3\u6CDB\u578B\u4E2D\u9690\u542B\u7684\u8F6C\u6362\u95EE\u9898\uFF0CJava\u6CDB\u578B\u52A0\u5165\u4E86\u7C7B\u578B\u53C2\u6570\u7684\u4E0A\u4E0B\u8FB9\u754C\u673A\u5236\u3002<code>&lt;? extends A&gt;</code>\u8868\u793A\u8BE5\u7C7B\u578B\u53C2\u6570\u53EF\u4EE5\u662FA(\u4E0A\u8FB9\u754C)\u6216\u8005A\u7684\u5B50\u7C7B\u7C7B\u578B\u3002\u7F16\u8BD1\u65F6\u64E6\u9664\u5230\u7C7B\u578BA\uFF0C\u5373\u7528A\u7C7B\u578B\u4EE3\u66FF\u7C7B\u578B\u53C2\u6570\u3002\u8FD9\u79CD\u65B9\u6CD5\u53EF\u4EE5\u89E3\u51B3\u5F00\u59CB\u9047\u5230\u7684\u95EE\u9898\uFF0C\u7F16\u8BD1\u5668\u77E5\u9053\u7C7B\u578B\u53C2\u6570\u7684\u8303\u56F4\uFF0C\u5982\u679C\u4F20\u5165\u7684\u5B9E\u4F8B\u7C7B\u578BB\u662F\u5728\u8FD9\u4E2A\u8303\u56F4\u5185\u7684\u8BDD\u5141\u8BB8\u8F6C\u6362\uFF0C\u8FD9\u65F6\u53EA\u8981\u4E00\u6B21\u7C7B\u578B\u8F6C\u6362\u5C31\u53EF\u4EE5\u4E86\uFF0C\u8FD0\u884C\u65F6\u4F1A\u628A\u5BF9\u8C61\u5F53\u505AA\u7684\u5B9E\u4F8B\u770B\u5F85\u3002</p></blockquote><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
    
<span class="token punctuation">}</span>
<span class="token comment">////////////////</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
    
<span class="token punctuation">}</span>
<span class="token comment">///////////////</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">C</span> <span class="token punctuation">{</span>
    
<span class="token punctuation">}</span>

<span class="token comment">///////////////</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">fun1</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">A</span><span class="token punctuation">&gt;</span></span> listA<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...          </span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">fun2</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">B</span><span class="token punctuation">&gt;</span></span> listB<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">funC</span><span class="token punctuation">(</span>listB<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// OK</span>
    <span class="token comment">// ...             </span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6CDB\u578B\u4E0A\u4E0B\u9650\u7684\u7528\u6CD5</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> \u65E0\u9650\u5236\u901A\u914D\u7B26
<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">extends</span> \u5173\u952E\u5B57\u58F0\u660E\u4E86\u7C7B\u578B\u7684\u4E0A\u754C\uFF0C\u8868\u793A\u53C2\u6570\u5316\u7684\u7C7B\u578B\u53EF\u80FD\u662F\u6240\u6307\u5B9A\u7684\u7C7B\u578B\uFF0C\u6216\u8005\u662F\u6B64\u7C7B\u578B\u7684\u5B50\u7C7B
<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">super</span> \u5173\u952E\u5B57\u58F0\u660E\u4E86\u7C7B\u578B\u7684\u4E0B\u754C\uFF0C\u8868\u793A\u53C2\u6570\u5316\u7684\u7C7B\u578B\u53EF\u80FD\u662F\u6307\u5B9A\u7684\u7C7B\u578B\uFF0C\u6216\u8005\u662F\u6B64\u7C7B\u578B\u7684\u7236\u7C7B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u6DF1\u5165\u7406\u89E3\u6CDB\u578B" tabindex="-1"><a class="header-anchor" href="#\u6DF1\u5165\u7406\u89E3\u6CDB\u578B" aria-hidden="true">#</a> \u6DF1\u5165\u7406\u89E3\u6CDB\u578B</h2><blockquote><p>\u4E86\u89E3\u6CDB\u578B\u57FA\u672C\u7528\u9014\u4EE5\u540E\uFF0C\u6DF1\u5165\u6CDB\u578B\u80CC\u540E\u7684\u6CDB\u578B\u64E6\u9664\u53CA\u76F8\u5173\u95EE\u9898\u6765\u52A0\u6DF1\u5BF9\u6CDB\u578B\u7684\u7406\u89E3</p></blockquote><h3 id="\u6CDB\u578B\u64E6\u9664" tabindex="-1"><a class="header-anchor" href="#\u6CDB\u578B\u64E6\u9664" aria-hidden="true">#</a> \u6CDB\u578B\u64E6\u9664</h3><p>\u7531\u4E8E\u6CDB\u578B\u8FD9\u4E2A\u6982\u5FF5\u5E76\u4E0D\u662F\u4ECE\u4E00\u5F00\u59CB\u5C31\u63D0\u51FA\u6765\u7684\uFF0C Java \u8BBE\u8BA1\u4EBA\u5458\u9700\u8981\u8003\u8651\u5411\u524D\u517C\u5BB9\u7684\u95EE\u9898\uFF0C\u56E0\u6B64 Java \u7684\u6CDB\u578B\u5176\u5B9E\u662F\u4E00\u79CD\u4F2A\u6CDB\u578B\u3002\u7B80\u5355\u6765\u8BF4\u5C31\u662F\u53EA\u5728\u8BED\u6CD5\u4E0A\u652F\u6301\u6CDB\u578B\uFF0C\u5728\u7F16\u8BD1\u7684\u671F\u95F4\u4F1A\u8FDB\u884C\u7C7B\u578B\u64E6\u9664\uFF0C\u5C06\u6240\u6709\u6CDB\u578B\u8868\u793A\u7684\u5185\u5BB9\u90FD\u66FF\u6362\u6210\u5177\u4F53\u7684\u7C7B\u578B\uFF0C\u5C31\u50CF\u6CA1\u6709\u6CDB\u578B\u4E00\u6837\u3002</p><p>\u6CDB\u578B\u64E6\u9664\u7684\u539F\u5219</p><ul><li>\u6D88\u9664\u7C7B\u578B\u53C2\u6570\u58F0\u660E\uFF0C\u5373\u5220\u9664 <code>&lt;&gt;</code> \u53CA\u5176\u5305\u56F4\u7684\u90E8\u5206\u3002</li><li>\u6839\u636E\u7C7B\u578B\u53C2\u6570\u7684\u4E0A\u4E0B\u754C\u63A8\u65AD\u5E76\u66FF\u6362\u6240\u6709\u7684\u7C7B\u578B\u53C2\u6570\u4E3A\u539F\u751F\u6001\u7C7B\u578B\uFF1A\u5982\u679C\u7C7B\u578B\u53C2\u6570\u662F\u65E0\u9650\u5236\u901A\u914D\u7B26\u6216\u6CA1\u6709\u4E0A\u4E0B\u754C\u9650\u5B9A\u5219\u66FF\u6362\u4E3AObject\uFF0C\u5982\u679C\u5B58\u5728\u4E0A\u4E0B\u754C\u9650\u5B9A\u5219\u6839\u636E\u5B50\u7C7B\u66FF\u6362\u539F\u5219\u53D6\u7C7B\u578B\u53C2\u6570\u7684\u6700\u5DE6\u8FB9\u9650\u5B9A\u7C7B\u578B\uFF08\u5373\u7236\u7C7B\uFF09\u3002</li><li>\u4E3A\u4E86\u4FDD\u8BC1\u7C7B\u578B\u5B89\u5168\uFF0C\u5FC5\u8981\u65F6\u63D2\u5165\u5F3A\u5236\u7C7B\u578B\u8F6C\u6362\u4EE3\u7801\u3002</li><li>\u81EA\u52A8\u4EA7\u751F\u201C\u6865\u63A5\u65B9\u6CD5\u201D\u4EE5\u4FDD\u8BC1\u64E6\u9664\u7C7B\u578B\u540E\u7684\u4EE3\u7801\u4ECD\u7136\u5177\u6709\u6CDB\u578B\u7684\u201C\u591A\u6001\u6027\u201D\u3002</li></ul><p>\u6CDB\u578B\u64E6\u9664\u7684\u573A\u666F\uFF1A</p><ul><li><p>\u65E0\u9650\u5236\u7C7B\u578B</p><p><code>&lt;T&gt;</code>\u3001<code>&lt;?&gt;</code> \u8FD9\u79CD\u662F\u4E00\u822C\u7684\u6CDB\u578B\u60C5\u51B5\uFF0C\u6CA1\u6709\u9650\u5236\u6CDB\u578B\u7684\u7C7B\u578B\uFF0C\u64E6\u9664\u65F6\u76F4\u63A5\u628A\u6CDB\u578B\u66FF\u6362\u6210 Object \u7C7B\u578B</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">T</span> value<span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">///// \u6CDB\u578B\u64E6\u9664\u540E</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Object</span> value<span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u5B58\u5728\u4E0A\u4E0B\u754C\u7684\u6CDB\u578B</p><p>\u5F62\u5982 <code>&lt;T extends List&gt;</code> \u6709\u4E0A\u754C\u7684\u6CDB\u578B\uFF0C\u5728\u64E6\u9664\u65F6\u4F1A\u76F4\u63A5\u53D6\u201C\u754C\u9650\u201D\u7684\u7C7B\u578B</p><p>\u5F62\u5982 <code>&lt;T super ArrayList&gt;</code> \u6709\u4E0B\u754C\u7684\u6CDB\u578B\uFF0C\u5728\u64E6\u9664\u65F6\u4F1A\u76F4\u63A5\u53D6 Object \u4F5C\u4E3A\u7C7B\u578B</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span> <span class="token keyword">extends</span> <span class="token class-name">List</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">T</span> value<span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">///// \u6CDB\u578B\u64E6\u9664\u540E</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span> value<span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token class-name">List</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span> <span class="token keyword">super</span> <span class="token class-name">ArrayList</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">T</span> value<span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">///// \u6CDB\u578B\u64E6\u9664\u540E</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Object</span> value<span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><p>\u73B0\u5728\u6211\u4EEC\u53EF\u4EE5\u56DE\u7B54\u4E00\u4E2A\u95EE\u9898\u4E86\uFF1A\u4E3A\u4EC0\u4E48\u57FA\u672C\u6570\u636E\u7C7B\u578B\u4E0D\u53EF\u4EE5\u7528\u4E8E\u6CDB\u578B\uFF1F</p><blockquote><p>\u56E0\u4E3A\u6CDB\u578B\u64E6\u9664\u673A\u5236\uFF0C\u7F16\u8BD1\u540E\u7684\u7C7B\u578B\u4F1A\u4F7F\u7528\u6CDB\u578B\u7684\u539F\u59CB\u7C7B\u578B\uFF0C\u5305\u88C5\u7C7B\u578B\u7684\u539F\u59CB\u7C7B\u578B\u662F Object \uFF0C\u57FA\u672C\u6570\u636E\u7C7B\u578B\u6CA1\u6709\u539F\u59CB\u7C7B\u578B\uFF0C\u6240\u4EE5\u4F1A\u62A5\u9519\u3002</p></blockquote><h3 id="\u7F16\u8BD1\u68C0\u67E5" tabindex="-1"><a class="header-anchor" href="#\u7F16\u8BD1\u68C0\u67E5" aria-hidden="true">#</a> \u7F16\u8BD1\u68C0\u67E5</h3><p>\u867D\u7136\u6CDB\u578B\u5728\u7F16\u8BD1\u671F\u4F1A\u8FDB\u884C\u6CDB\u578B\u64E6\u9664\uFF0C\u4F46\u662F\u6307\u5B9A\u6CDB\u578B\u4F1A\u5728\u5F00\u53D1\u65F6\u63D0\u4F9B\u4E00\u5B9A\u7684\u5E2E\u52A9\u3002\u56E0\u4E3A\u5728\u5177\u4F53\u8FD0\u884C\u65F6\uFF0C\u6CDB\u578B\u5DF2\u7ECF\u88AB\u64E6\u9664\u4E3A\u539F\u59CB\u7C7B\u578B\uFF0C\u4F7F\u7528\u5176\u4E2D\u7684\u65B9\u6CD5\u65F6\uFF0C\u5FC5\u7136\u4F34\u968F\u7740\u5F3A\u5236\u7C7B\u578B\u8F6C\u6362\uFF0C\u5982\u679C\u8FD9\u4E2A\u5BF9\u8C61\u672C\u4E0D\u662F\u8FD9\u4E2A\u7C7B\u578B\u7684\uFF0C\u5F3A\u8F6C\u5C31\u4F1A\u6709\u7C7B\u578B\u8F6C\u6362\u7684\u5F02\u5E38\u3002\u6240\u4EE5\u4F7F\u7528\u6CDB\u578B\u540E\uFF0C\u5728\u7F16\u8BD1\u65F6\u5C31\u4F1A\u53D1\u73B0\u95EE\u9898\uFF0C\u6709\u6548\u5730\u628A\u8FD0\u884C\u671F\u7684\u95EE\u9898\u63D0\u524D\u5230\u7F16\u8BD1\u671F\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;100&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u7F16\u8BD1\u9519\u8BEF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,29),c=[t];function o(l,i){return s(),a("div",null,c)}var d=n(e,[["render",o],["__file","\u6CDB\u578B\u673A\u5236.html.vue"]]);export{d as default};
