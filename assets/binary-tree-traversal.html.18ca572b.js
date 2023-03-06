import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as s,c as a,d as t}from"./app.7df38a27.js";const p={},e=t(`<h1 id="\u4E8C\u53C9\u6811\u7684\u904D\u5386\u65B9\u5F0F" tabindex="-1"><a class="header-anchor" href="#\u4E8C\u53C9\u6811\u7684\u904D\u5386\u65B9\u5F0F" aria-hidden="true">#</a> \u4E8C\u53C9\u6811\u7684\u904D\u5386\u65B9\u5F0F</h1><p>\u4E8C\u53C9\u6811\u4ECE\u904D\u5386\u65B9\u5411\u53EF\u4EE5\u5206\u4E3A\u6DF1\u5EA6\u4F18\u5148\u641C\u7D22\u548C\u5E7F\u5EA6\u4F18\u5148\u641C\u7D22</p><h2 id="\u4E8C\u53C9\u6811\u901A\u7528\u5B9A\u4E49" tabindex="-1"><a class="header-anchor" href="#\u4E8C\u53C9\u6811\u901A\u7528\u5B9A\u4E49" aria-hidden="true">#</a> \u4E8C\u53C9\u6811\u901A\u7528\u5B9A\u4E49</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TreeNode</span> <span class="token punctuation">{</span>
	<span class="token keyword">int</span> val<span class="token punctuation">;</span>
	<span class="token class-name">TreeNode</span> left<span class="token punctuation">;</span>
	<span class="token class-name">TreeNode</span> right<span class="token punctuation">;</span>
	
    <span class="token class-name">TreeNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    
    <span class="token class-name">TreeNode</span><span class="token punctuation">(</span><span class="token keyword">int</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>val <span class="token operator">=</span> val<span class="token punctuation">;</span> <span class="token punctuation">}</span>
		
    <span class="token class-name">TreeNode</span><span class="token punctuation">(</span><span class="token keyword">int</span> val<span class="token punctuation">,</span> <span class="token class-name">TreeNode</span> left<span class="token punctuation">,</span> <span class="token class-name">TreeNode</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>val <span class="token operator">=</span> val<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>left <span class="token operator">=</span> left<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>right <span class="token operator">=</span> right<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u6DF1\u5EA6\u4F18\u5148\u641C\u7D22" tabindex="-1"><a class="header-anchor" href="#\u6DF1\u5EA6\u4F18\u5148\u641C\u7D22" aria-hidden="true">#</a> \u6DF1\u5EA6\u4F18\u5148\u641C\u7D22</h2><p>\u6DF1\u5EA6\u4F18\u5148\u641C\u7D22\uFF0CDepth First Search</p><p>\u5148\u5E8F\u904D\u5386\uFF1A\u5148\u4F7F\u7528\u5F53\u524D\u8282\u70B9\uFF0C\u518D\u904D\u5386\u5DE6\u5B50\u6811\uFF0C\u518D\u904D\u5386\u53F3\u5B50\u6811</p><h3 id="\u9012\u5F52\u5199\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u9012\u5F52\u5199\u6CD5" aria-hidden="true">#</a> \u9012\u5F52\u5199\u6CD5</h3><p>\u9012\u5F52\u672C\u8D28\u662F\u65B9\u6CD5\u4E0D\u65AD\u8FDB\u6808\u51FA\u6808\u7684\u8FC7\u7A0B\uFF0C\u4F46\u662F\u5C42\u6B21\u592A\u6DF1\u4F7F\u7528\u9012\u5F52\u53EF\u80FD\u4F1A\u5BFC\u81F4\u6808\u6EA2\u51FA</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">dfsRecursively</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//\u9012\u5F52\u7ED3\u675F\u6761\u4EF6</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>root <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//\u4F7F\u7528\u8FD9\u4E2A\u8282\u70B9</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//\u9012\u5F52\u5DE6\u5B50\u6811</span>
    <span class="token function">dfsRecursively</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//\u9012\u5F52\u53F3\u5B50\u6811</span>
    <span class="token function">dfsRecursively</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u975E\u9012\u5F52\u5199\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u975E\u9012\u5F52\u5199\u6CD5" aria-hidden="true">#</a> \u975E\u9012\u5F52\u5199\u6CD5</h3><p>\u5176\u5B9E\u53EF\u4EE5\u628A\u8FDB\u6808\u51FA\u6808\u7684\u52A8\u4F5C\u653E\u5230\u5BF9\u6811\u8282\u70B9\u4E0A\uFF0C\u4E0D\u7528\u62C5\u5FC3\u9012\u5F52\u90A3\u6837\u5C42\u7EA7\u8FC7\u6DF1\u5BFC\u81F4\u7684\u6808\u6EA2\u51FA\u95EE\u9898</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">dfsNonRecursively</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>root <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//\u5B9A\u4E49\u4E00\u4E2A\u6808\u5BB9\u5668</span>
    <span class="token class-name">Deque</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TreeNode</span><span class="token punctuation">&gt;</span></span> deque <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayDeque</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//\u628A\u6839\u8282\u70B9\u5165\u6808</span>
    deque<span class="token punctuation">.</span><span class="token function">addFirst</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//\u8FDB\u884C\u5165\u6808\u51FA\u6808\u7684\u52A8\u4F5C</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token operator">!</span>deque<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//\u628A\u8FD9\u4E2A\u8282\u70B9\u51FA\u6808\uFF0C\u5E76\u4F7F\u7528\u8FD9\u4E2A\u8282\u70B9</span>
        <span class="token class-name">TreeNode</span> node <span class="token operator">=</span> deque<span class="token punctuation">.</span><span class="token function">removeFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//\u5DE6\u5B50\u6811\u5165\u6808</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        	deque<span class="token punctuation">.</span><span class="token function">addFirst</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//\u53F3\u5B50\u6811\u5165\u6808</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	        deque<span class="token punctuation">.</span><span class="token function">addFirst</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>    
        <span class="token punctuation">}</span>    
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5E7F\u5EA6\u4F18\u5148\u641C\u7D22" tabindex="-1"><a class="header-anchor" href="#\u5E7F\u5EA6\u4F18\u5148\u641C\u7D22" aria-hidden="true">#</a> \u5E7F\u5EA6\u4F18\u5148\u641C\u7D22</h2><p>\u5E7F\u5EA6\u4F18\u5148\u641C\u7D22\uFF1ABreadth First Search</p><p>\u5E7F\u5EA6\u4F18\u5148\u641C\u7D22\u5C31\u662F\u5229\u7528\u961F\u5217\uFF0C\u5229\u7528\u961F\u5217\u5148\u8FDB\u5148\u51FA\u7684\u7279\u70B9\uFF0C\u5C42\u5C42\u5F80\u4E0B\u904D\u5386\u4E8C\u53C9\u6811\u8282\u70B9</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">bfs</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>root <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//\u5B9A\u4E49\u4E00\u4E2A\u961F\u5217\u5BB9\u5668</span>
    <span class="token class-name">Deque</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TreeNode</span><span class="token punctuation">&gt;</span></span> deque <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayDeque</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//\u628A\u6839\u8282\u70B9\u653E\u5165\u961F\u5217</span>
    deque<span class="token punctuation">.</span><span class="token function">addLast</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token operator">!</span>deque<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//\u8282\u70B9\u51FA\u961F\u5217\uFF0C\u5E76\u4F7F\u7528\u8FD9\u4E2A\u8282\u70B9</span>
        <span class="token class-name">TreeNode</span> node <span class="token operator">=</span> deque<span class="token punctuation">.</span><span class="token function">removeFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//\u5DE6\u5B50\u6811\u8FDB\u961F\u5217</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            deque<span class="token punctuation">.</span><span class="token function">addLast</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//\u53F3\u5B50\u6811\u8FDB\u961F\u5217</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            deque<span class="token punctuation">.</span><span class="token function">addLast</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),o=[e];function c(l,i){return s(),a("div",null,o)}var d=n(p,[["render",c],["__file","binary-tree-traversal.html.vue"]]);export{d as default};
