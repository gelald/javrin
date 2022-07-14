import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as s,c as a,e}from"./app.0f4f56d8.js";const t={},p=e(`<h1 id="object" tabindex="-1"><a class="header-anchor" href="#object" aria-hidden="true">#</a> Object</h1><blockquote><p>Object \u662F Java \u6240\u6709\u7C7B\u7684\u6700\u9876\u5C42\u7684\u7236\u7C7B\uFF0C\u5B83\u7684\u5730\u4F4D\u4E0D\u8A00\u800C\u55BB\uFF0C\u6709\u5FC5\u8981\u7814\u7A76\u4E00\u756A\uFF5E</p></blockquote><p>\u8FD9\u91CC\u5148\u4E3B\u8981\u4ECB\u7ECD\u4E00\u4E0B Object \u4E00\u4E9B\u7ECF\u5178\u7684\u65B9\u6CD5\uFF0C\u5173\u4E8E\u5B83\u7684\u5176\u4ED6\u7814\u7A76\uFF0C\u653E\u5728\u540E\u9762</p><h2 id="native" tabindex="-1"><a class="header-anchor" href="#native" aria-hidden="true">#</a> native</h2><p>\u5F00\u59CB\u5B66\u4E60 Object \u7684\u65B9\u6CD5\u524D\uFF0C\u5148\u4E86\u89E3\u4E00\u4E0B native \u5173\u952E\u5B57</p><p>native \u5173\u952E\u5B57\u7528\u4E8E\u4FEE\u9970\u65B9\u6CD5\uFF0Cnative \u610F\u4E3A\u539F\u751F\u7684\uFF0C\u90A3\u4E48\u539F\u751F\u7684\u65B9\u6CD5\u4EE3\u8868\u4EC0\u4E48\u610F\u601D\u5462\uFF1F</p><blockquote><p>\u5176\u5B9E\u88AB native \u4FEE\u9970\u7684\u65B9\u6CD5\u542B\u4E49\u5C31\u662F\u4EA4\u7ED9\u6211\u4EEC\u7684\u64CD\u4F5C\u7CFB\u7EDF\u6765\u5B9E\u73B0\u8FD9\u4E2A\u65B9\u6CD5\uFF0C\u6362\u8A00\u4E4B\u5728\u7A0B\u5E8F\u4E2D\u8FD9\u4E2A\u65B9\u6CD5\u662F\u6CA1\u6709\u65B9\u6CD5\u4F53\u7684\u3002</p></blockquote><p>native \u65B9\u6CD5\u4E00\u822C\u90FD\u662F\u51FA\u73B0\u5728 Java \u6E90\u7801\u4E2D\uFF0C\u4F46\u5176\u5B9E\u6211\u4EEC\u53EF\u4EE5\u81EA\u5B9A\u4E49\uFF0C\u4E0D\u8FC7\u6211\u4EEC\u4E00\u822C\u4E0D\u8FD9\u4E48\u505A\uFF0C\u800C\u4E14\u5B9E\u73B0\u8D77\u6765\u4E5F\u6709\u4E00\u5B9A\u7684\u95E8\u69DB\uFF0C\u4F5C\u4E3A\u4E86\u89E3\u5373\u53EF\u3002</p><h2 id="equals" tabindex="-1"><a class="header-anchor" href="#equals" aria-hidden="true">#</a> equals</h2><p>equals \u65B9\u6CD5\u662F\u7528\u4E8E\u6BD4\u8F83\u4E24\u4E2A\u5BF9\u8C61</p><p>\u9ED8\u8BA4\u662F\u6BD4\u8F83\u4E24\u4E2A\u5BF9\u8C61\u7684\u5730\u5740\u6307\u662F\u5426\u76F8\u540C\uFF0C\u548C\u4F7F\u7528 == \u6BD4\u8F83\u4E24\u4E2A\u5BF9\u8C61\u4F5C\u7528\u662F\u4E00\u6837\u7684</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">==</span> obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F46\u662F\u5728\u5F88\u591A\u7C7B\u4E2D\u90FD\u4F1A\u5BF9 equals \u65B9\u6CD5\u8FDB\u884C\u91CD\u5199\uFF0C\u4E3A\u7684\u5B9E\u73B0\u6BD4\u8F83\u4E24\u4E2A\u5BF9\u8C61\u4E2D\u7684\u5185\u5BB9\u662F\u5426\u4E00\u6837\uFF0C\u6BD4\u8F83\u5730\u5740\u503C\u518D\u4F7F\u7528 == \u6765\u5B8C\u6210</p><p>Integer\uFF0Cequals \u65B9\u6CD5\u6BD4\u8F83\u7684\u662F\u4E24\u4E2A\u5BF9\u8C61\u4E2D\u5E95\u5C42\u7684 int \u503C\u662F\u5426\u76F8\u7B49</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>obj <span class="token keyword">instanceof</span> <span class="token class-name">Integer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> value <span class="token operator">==</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">)</span>obj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">intValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>String\uFF0Cequals \u65B9\u6CD5\u662F\u5BF9\u5BF9\u8C61\u4E2D\u7684\u5B57\u7B26\u6570\u7EC4\u8FDB\u884C\u9010\u4E00\u5B57\u7B26\u76F8\u7B49\u5224\u65AD</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> anObject<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">==</span> anObject<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>anObject <span class="token keyword">instanceof</span> <span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> anotherString <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span>anObject<span class="token punctuation">;</span>
        <span class="token keyword">int</span> n <span class="token operator">=</span> value<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">==</span> anotherString<span class="token punctuation">.</span>value<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">char</span> v1<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> value<span class="token punctuation">;</span>
            <span class="token keyword">char</span> v2<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> anotherString<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
            <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>n<span class="token operator">--</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>v1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> v2<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
                    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                i<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5B9E\u9645\u4E0A\u5728\u5F00\u53D1\u4E2D\uFF0C\u6211\u4EEC\u4E5F\u4F1A\u6709\u91CD\u5199 equals \u65B9\u6CD5\u7684\u573A\u666F\uFF0C\u90A3\u4E48\u91CD\u5199 equals \u65B9\u6CD5\uFF0C\u9700\u8981\u7684\u662F</p><ol><li>\u4F7F\u7528 <code>==</code> \u6765\u68C0\u67E5\u5B9E\u53C2\u662F\u5426\u4E3A\u5BF9\u8C61\u7684\u4E00\u4E2A\u5F15\u7528\uFF0C\u5982\u679C\u662F\uFF0C\u8FD4\u56DE <code>false</code></li><li>\u4F7F\u7528 <code>isinstanceof</code> \u6765\u68C0\u67E5\u5B9E\u53C2\u662F\u5426\u4E3A\u6B63\u786E\u7684\u7C7B\u578B\uFF08\u548C\u6211\u540C\u4E00\u4E2A\u7C7B\u578B\uFF09\uFF0C\u5982\u679C\u4E0D\u662F\uFF0C\u8FD4\u56DE <code>false</code></li><li>\u628A\u53C2\u6570\u8FDB\u884C\u5F3A\u5236\u7C7B\u578B\u8F6C\u6362\uFF0C\u8F6C\u6362\u6210\u540C\u4E00\u4E2A\u7C7B\u578B</li><li>\u68C0\u67E5\u5B9E\u53C2\u4E2D\u7684\u57DF\u4E0E\u5F53\u524D\u5BF9\u8C61\u4E2D\u5BF9\u5E94\u7684\u57DF\u503C\u662F\u5426\u5339\u914D <ol><li>\u9664\u53BB <code>float</code>\u3001<code>double</code> \u7684\u57FA\u672C\u6570\u636E\u7C7B\u578B\uFF0C\u53EF\u4EE5\u4F7F\u7528 <code>==</code> \u8FDB\u884C\u6BD4\u8F83</li><li><code>float</code> \u7C7B\u578B\u4F7F\u7528 <code>Float.floatToIntBits</code> \u8F6C\u6362\u6210 <code>int</code> \u7C7B\u578B\u7684\u503C\uFF0C\u7136\u540E\u4F7F\u7528 <code>==</code> \u64CD\u4F5C\u7B26\u6BD4\u8F83\u503C</li><li><code>double</code> \u7C7B\u578B\u4F7F\u7528 <code>Double.doubleToLongBits</code> \u8F6C\u6362\u6210 <code>long</code> \u7C7B\u578B\u7684\u503C\uFF0C\u7136\u540E\u4F7F\u7528 <code>==</code> \u64CD\u4F5C\u7B26\u6BD4\u8F83\u503C</li><li>\u5F15\u7528\u7C7B\u578B\uFF0C\u53EF\u4EE5\u9012\u5F52\u8C03\u7528\u8FD9\u4E2A\u7C7B\u578B\u7684 <code>equals</code> \u65B9\u6CD5</li></ol></li><li>\u5B8C\u6210\u4EE5\u4E0A\u6B65\u9AA4\u540E\uFF0C\u9700\u8981\u518D\u8003\u8651\u51E0\u4E2A\u95EE\u9898 <ol><li>\u662F\u5426\u6709\u81EA\u53CD\u6027</li><li>\u662F\u5426\u6709\u4F20\u9012\u6027</li><li>\u662F\u5426\u6709\u4E00\u81F4\u6027</li></ol></li></ol><h2 id="hashcode" tabindex="-1"><a class="header-anchor" href="#hashcode" aria-hidden="true">#</a> hashCode</h2><p>\u8FD4\u56DE\u8FD9\u4E2A\u5BF9\u8C61\u7684\u54C8\u5E0C\u503C\uFF08\u7531\u64CD\u4F5C\u7CFB\u7EDF\u7ED9\u51FA\u4E00\u4E2A\u6574\u6570\u503C\uFF09</p><p>\u4E00\u822C\u91CD\u5199 equals \u65B9\u6CD5\u7684\u65F6\u5019\uFF0C\u90FD\u4F1A\u91CD\u5199 hashCode \u65B9\u6CD5\uFF0C\u76EE\u7684\u662F\u4E3A\u4E86\u4FDD\u8BC1\u4E24\u4E2A\u7B49\u4EF7\u7684\u5BF9\u8C61\u54C8\u5E0C\u503C\u4E5F\u76F8\u7B49\u3002\u56E0\u4E3A\u5728\u67D0\u4E9B\u573A\u666F\u4E0B\uFF0C\u6211\u4EEC\u5E0C\u671B\u5982\u679C\u4E24\u4E2A\u5BF9\u8C61\u4ECE\u5185\u5BB9\u4E0A\u770B\u662F\u76F8\u7B49\u7684\uFF08\u662F\u7B49\u4EF7\u7684\uFF09\uFF0C\u90A3\u4E48\u5B83\u4EEC\u62E5\u6709\u540C\u4E00\u4E2A\u54C8\u5E0C\u503C\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">String</span> s1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> s2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s1<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">// true</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s1<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> s2<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// true</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s1 <span class="token operator">==</span> s2<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// false</span>

<span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// hello</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6BD4\u5982\u5728 HashSet \u4E2D\uFF0C\u5185\u5BB9\u540C\u4E3A hello \u7684\u5B57\u7B26\u4E32\u4FDD\u8BC1\u53EA\u80FD\u88AB\u6DFB\u52A0\u4E00\u6B21\u3002</p><blockquote><p>\u53EF\u4EE5\u8FD9\u4E48\u7406\u89E3\uFF1Aequals \u4E3A\u4E86\u8BA9\u5F00\u53D1\u8005\u77E5\u9053\u4E24\u4E2A\u5BF9\u8C61\u7B49\u4EF7\uFF1BhashCode \u4E3A\u4E86\u8BA9\u7A0B\u5E8F\u77E5\u9053\u4E24\u4E2A\u5BF9\u8C61\u7B49\u4EF7</p></blockquote><p>\u4E24\u4E2A\u5BF9\u8C61\u7528 equals \u65B9\u6CD5\u5224\u5B9A\u540E\u76F8\u7B49\uFF0C\u5219\u5B83\u4EEC\u7684 hashCode \u4E00\u5B9A\u76F8\u7B49\u3002\u4F46 hashCode \u76F8\u7B49\u7684\u60C5\u51B5\u4E0B\uFF0Cequals \u65B9\u6CD5\u5224\u5B9A\u4E0D\u4E00\u5B9A\u76F8\u7B49\u3002\u56E0\u4E3A\u6709\u53EF\u80FD\u5B58\u5728\u54C8\u5E0C\u51B2\u7A81\u7B49\u95EE\u9898\u3002</p><h2 id="tostring" tabindex="-1"><a class="header-anchor" href="#tostring" aria-hidden="true">#</a> toString</h2><p>\u8FD9\u4E2A\u65B9\u6CD5\u4E00\u822C\u7528\u4E8E\u8F93\u51FA\u5BF9\u8C61\u7684\u4FE1\u606F</p><p>\u9ED8\u8BA4\u662F \u7C7B\u540D+@+hasCode\u768416\u8FDB\u5236\u503C \u7684\u5F62\u5F0F</p><h2 id="clone" tabindex="-1"><a class="header-anchor" href="#clone" aria-hidden="true">#</a> clone</h2><p>\u8FD9\u4E2A\u65B9\u6CD5\u7528\u4E8E\u4ECE\u539F\u5BF9\u8C61\u4E2D\u62F7\u8D1D\u4E00\u4E2A\u65B0\u5BF9\u8C61\u51FA\u6765</p><p>\u503C\u5F97\u6CE8\u610F\u7684\u662F\uFF1A</p><ul><li>clone \u65B9\u6CD5\u5728 Object \u7C7B\u4E2D\u4F7F\u7528 <code>protected</code> \u4FEE\u9970\uFF0C\u4E00\u4E2A\u7C7B\u5982\u679C\u4E0D\u663E\u5F0F\u5730\u91CD\u5199 clone \u65B9\u6CD5\uFF0C\u90A3\u4E48\u5728\u5176\u4ED6\u7C7B\u4E2D\u5C31\u65E0\u6CD5\u76F4\u63A5\u8C03\u7528\u8FD9\u4E2A\u5BF9\u8C61\u7684 clone \u65B9\u6CD5</li><li>\u91CD\u5199 clone \u65B9\u6CD5\u7684\u65F6\u5019\u9700\u8981\u5B9E\u73B0 Cloneable \u63A5\u53E3</li></ul><p>\u62F7\u8D1D\u5F80\u5F80\u4F34\u968F\u7740\u6D45\u62F7\u8D1D\u3001\u6DF1\u62F7\u8D1D\u8FD9\u4E2A\u8BDD\u9898</p><h3 id="\u6D45\u62F7\u8D1D" tabindex="-1"><a class="header-anchor" href="#\u6D45\u62F7\u8D1D" aria-hidden="true">#</a> \u6D45\u62F7\u8D1D</h3><p>\u62F7\u8D1D\u5BF9\u8C61\u7684\u57FA\u672C\u6570\u636E\u7C7B\u578B\u53CA\u5176\u5305\u88C5\u7C7B\u578B\u548C String \u7C7B\u578B\u514B\u9686\u540E\u4FEE\u6539\u4E0D\u5F71\u54CD\u539F\u59CB\u5BF9\u8C61</p><p>\u5F15\u7528\u7C7B\u578B\u4FEE\u6539\u540E\u4F1A\u5F71\u54CD\u539F\u59CB\u5BF9\u8C61\uFF0C\u5B58\u5728\u88AB\u8986\u76D6\u7684\u98CE\u9669\uFF0C\u56E0\u4E3A\u5F15\u7528\u7684\u662F\u540C\u4E00\u4E2A\u5BF9\u8C61</p><p>\u65B9\u5F0F\uFF1A\u901A\u8FC7\u8C03\u7528\u7236\u7C7B\u7684 clone \u65B9\u6CD5</p><h3 id="\u6DF1\u62F7\u8D1D" tabindex="-1"><a class="header-anchor" href="#\u6DF1\u62F7\u8D1D" aria-hidden="true">#</a> \u6DF1\u62F7\u8D1D</h3><p>\u62F7\u8D1D\u5BF9\u8C61\u4E2D\u6240\u6709\u5C5E\u6027\u5305\u62EC\u5F15\u7528\u7C7B\u578B\u7684\u5C5E\u6027\u90FD\u88AB\u5F7B\u5E95\u5730\u590D\u5236\u4E86\u4E00\u4EFD\u65B0\u7684\u51FA\u6765\uFF0C\u4FEE\u6539\u540E\u90FD\u4E0D\u5F71\u54CD\u539F\u59CB\u5BF9\u8C61</p><p>\u65B9\u5F0F\uFF1A\u901A\u8FC7\u8F6C\u6210\u5B57\u8282\u6D41\u540E\u518D\u8F6C\u6362\u6210\u5BF9\u8C61</p>`,41),o=[p];function c(l,i){return s(),a("div",null,o)}var d=n(t,[["render",c],["__file","Object.html.vue"]]);export{d as default};
