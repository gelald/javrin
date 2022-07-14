import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as a,c as e,e as s}from"./app.0f4f56d8.js";const i={},t=s(`<h1 id="\u7CFB\u7EDF\u8C03\u7528\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#\u7CFB\u7EDF\u8C03\u7528\u51FD\u6570" aria-hidden="true">#</a> \u7CFB\u7EDF\u8C03\u7528\u51FD\u6570</h1><h2 id="recvfrom" tabindex="-1"><a class="header-anchor" href="#recvfrom" aria-hidden="true">#</a> recvfrom</h2><p>Linux\u7CFB\u7EDF\u63D0\u4F9B\u7ED9\u7528\u6237\u7528\u4E8E\u63A5\u6536\u7F51\u7EDCIO\u7684\u7CFB\u7EDF\u63A5\u53E3\u3002\u4ECE\u5957\u63A5\u5B57\u4E0A\u63A5\u6536\u4E00\u4E2A\u6D88\u606F</p><p>\u5982\u679C\u6B64\u7CFB\u7EDF\u8C03\u7528\u8FD4\u56DE\u503C&lt;0\uFF0C\u5E76\u4E14 errno\u4E3AEWOULDBLOCK\u6216EAGAIN\uFF08\u5957\u63A5\u5B57\u5DF2\u6807\u8BB0\u4E3A\u975E\u963B\u585E\uFF0C\u800C\u63A5\u6536\u64CD\u4F5C\u88AB\u963B\u585E\u6216\u8005\u63A5\u6536\u8D85\u65F6 \uFF09\u65F6\uFF0C\u8FDE\u63A5\u6B63\u5E38\uFF0C<strong>\u963B\u585E</strong>\u63A5\u6536\u6570\u636E\uFF08\u8FD9\u5F88\u5173\u952E\uFF0C\u524D4\u79CDIO\u6A21\u578B\u90FD\u8BBE\u8BA1\u6B64\u7CFB\u7EDF\u8C03\u7528\uFF09</p><h2 id="select" tabindex="-1"><a class="header-anchor" href="#select" aria-hidden="true">#</a> select</h2><p>\u7CFB\u7EDF\u8C03\u7528\u5141\u8BB8\u7A0B\u5E8F\u540C\u65F6\u5728\u591A\u4E2A\u5E95\u5C42\u6587\u4EF6\u63CF\u8FF0\u7B26\u4E0A\uFF0C\u7B49\u5F85\u8F93\u5165\u7684\u5230\u8FBE\u6216\u8F93\u51FA\u7684\u5B8C\u6210\u3002\u4EE5<strong>\u6570\u7EC4</strong>\u5F62\u5F0F\u5B58\u50A8\u6587\u4EF6\u63CF\u8FF0\u7B26\uFF0C64\u4F4D\u673A\u5668\u9ED8\u8BA4<strong>2048</strong>\u4E2A\u3002\u5F53\u6709\u6570\u636E\u51C6\u5907\u597D\u65F6\uFF0C\u65E0\u6CD5\u611F\u77E5\u5177\u4F53\u662F\u54EA\u4E2A\u6D41OK\u4E86\uFF0C\u6240\u4EE5\u9700\u8981\u4E00\u4E2A\u4E00\u4E2A\u7684\u904D\u5386\uFF0C\u51FD\u6570\u7684\u65F6\u95F4\u590D\u6742\u5EA6\u4E3A<strong>O(n)</strong></p><h3 id="select\u51FD\u6570\u7684\u7F3A\u9677" tabindex="-1"><a class="header-anchor" href="#select\u51FD\u6570\u7684\u7F3A\u9677" aria-hidden="true">#</a> select\u51FD\u6570\u7684\u7F3A\u9677</h3><ol><li>select\u8C03\u7528\u9700\u8981\u4F20\u5165\u6587\u4EF6\u63CF\u8FF0\u7B26\u6570\u7EC4\uFF0C\u4E5F\u5C31\u662F\u8BF4\u9700\u8981\u62F7\u8D1D\u8FD9\u4EFD\u6570\u7EC4\u5230\u5185\u6838\u7F13\u51B2\u533A\uFF0C\u5728\u9AD8\u5E76\u53D1\u7684\u573A\u666F\u4E0B\u8FD9\u79CD\u62F7\u8D1D\u64CD\u4F5C\u4F1A\u6D88\u8017\u5927\u91CF\u8D44\u6E90</li><li>select\u8C03\u7528\u5728\u5185\u6838\u5C42\u4ECD\u7136\u662F\u901A\u8FC7\u904D\u5386\u7684\u65B9\u5F0F\u68C0\u67E5\u6587\u4EF6\u63CF\u8FF0\u7B26\u7684\u5C31\u7EEA\u72B6\u6001\u7684\u8FD9\u4E2A\u8FC7\u7A0B\u662F\u540C\u6B65\u7684\uFF0C\u53EA\u4E0D\u8FC7\u6CA1\u6709\u7CFB\u7EDF\u8C03\u7528\u5207\u6362\u4E0A\u4E0B\u6587\u7684\u5F00\u9500</li><li>select\u8C03\u7528\u4EC5\u4EC5\u8FD4\u56DE\u7684\u662F\u53EF\u8BFB\u6587\u4EF6\u63CF\u8FF0\u7B26\u7684\u4E2A\u6570\uFF0C\u5177\u4F53\u54EA\u4E2A\u53EF\u8BFB\u8FD8\u9700\u8981\u7528\u6237\u7EBF\u7A0B\u8FDB\u884C\u904D\u5386</li></ol><h2 id="poll" tabindex="-1"><a class="header-anchor" href="#poll" aria-hidden="true">#</a> poll</h2><p>\u4EE5<strong>\u94FE\u8868</strong>\u5F62\u5F0F\u5B58\u50A8\u6587\u4EF6\u63CF\u8FF0\u7B26\uFF0C\u4E0Eselect\u51FD\u6570\u4E3B\u8981\u7684\u533A\u522B\u4E3A\u53D6\u6D88\u4E861024\u4E2A\u6587\u4EF6\u63CF\u8FF0\u7B26\u7684\u9650\u5236\uFF0C\u51FD\u6570\u7684\u65F6\u95F4\u590D\u6742\u5EA6\u4E5F\u4E3A<strong>O(n)</strong></p><h2 id="epoll" tabindex="-1"><a class="header-anchor" href="#epoll" aria-hidden="true">#</a> epoll</h2><p>\u57FA\u4E8E\u4E8B\u4EF6\u9A71\u52A8\u7684\uFF0C\u5982\u679C\u67D0\u4E2A\u6D41\u51C6\u5907\u597D\u4E86\uFF0C\u4F1A\u4EE5\u4E8B\u4EF6\u901A\u77E5\uFF0C\u77E5\u9053\u5177\u4F53\u662F\u54EA\u4E2A\u6D41\uFF0C\u56E0\u6B64\u4E0D\u9700\u8981\u904D\u5386\uFF0C\u51FD\u6570\u7684\u65F6\u95F4\u590D\u6742\u5EA6\u4E3A<strong>O(1)</strong></p><h3 id="epoll\u89E3\u51B3select\u51FD\u6570\u7F3A\u9677\u7684\u65B9\u5F0F" tabindex="-1"><a class="header-anchor" href="#epoll\u89E3\u51B3select\u51FD\u6570\u7F3A\u9677\u7684\u65B9\u5F0F" aria-hidden="true">#</a> epoll\u89E3\u51B3select\u51FD\u6570\u7F3A\u9677\u7684\u65B9\u5F0F</h3><ol><li>\u5185\u6838\u4E2D\u4FDD\u5B58\u4E00\u4EFD\u6587\u4EF6\u63CF\u8FF0\u7B26\u96C6\u5408\uFF0C\u65E0\u9700\u7528\u6237\u5C42\u6BCF\u6B21\u90FD\u91CD\u65B0\u4F20\u5165\uFF0C\u53EA\u9700\u544A\u8BC9\u5185\u6838\u4FEE\u6539\u7684\u90E8\u5206\u5373\u53EF</li><li>\u5185\u6838\u4E0D\u518D\u901A\u8FC7\u8F6E\u8BE2\u7684\u65B9\u5F0F\u627E\u5230\u5C31\u7EEA\u7684\u6587\u4EF6\u63CF\u8FF0\u7B26\uFF0C\u800C\u662F\u901A\u8FC7\u5F02\u6B65IO\u4E8B\u4EF6\u901A\u77E5</li><li>\u5185\u6838\u4EC5\u4F1A\u5C06\u6709IO\u4E8B\u4EF6\u7684\u6587\u4EF6\u63CF\u8FF0\u7B26\u8FD4\u56DE\u7ED9\u7528\u6237\u5C42\uFF0C\u7528\u6237\u5C42\u62FF\u5230\u540E\u65E0\u9700\u505A\u989D\u5916\u7684\u904D\u5386</li></ol><h2 id="sigaction" tabindex="-1"><a class="header-anchor" href="#sigaction" aria-hidden="true">#</a> sigaction</h2><p>\u7528\u4E8E\u8BBE\u7F6E\u5BF9\u4FE1\u53F7\u7684\u5904\u7406\u65B9\u5F0F\uFF0C\u4E5F\u53EF\u68C0\u9A8C\u5BF9\u67D0\u4FE1\u53F7\u7684\u9884\u8BBE\u5904\u7406\u65B9\u5F0F\u3002Linux\u4F7F\u7528<strong>SIGIO\u4FE1\u53F7</strong>\u6765\u5B9E\u73B0IO\u5F02\u6B65\u901A\u77E5\u673A\u5236</p><h1 id="io\u6A21\u578B" tabindex="-1"><a class="header-anchor" href="#io\u6A21\u578B" aria-hidden="true">#</a> IO\u6A21\u578B</h1><p>\u4E0D\u7BA1\u662F\u7F51\u7EDCIO\u8FD8\u662F\u78C1\u76D8IO\uFF0C\u5BF9\u4E8E\u8BFB\u64CD\u4F5C\uFF0C\u90FD\u9700\u8981\u7B49\u5F85\u7F51\u7EDC\u7684\u67D0\u4E2A\u6570\u636E\u5206\u7EC4\u5230\u8FBE\u540E/\u51C6\u5907\u597D\uFF0C<strong>\u5C06\u6570\u636E\u62F7\u8D1D\u5230\u5185\u6838\u7A7A\u95F4\u7684\u7F13\u51B2\u533A\u4E2D\uFF0C\u518D\u4ECE\u5185\u6838\u7A7A\u95F4\u62F7\u8D1D\u5230\u7528\u6237\u7A7A\u95F4\u7684\u7F13\u51B2\u533A</strong></p><h2 id="\u963B\u585Eio\u6A21\u578B" tabindex="-1"><a class="header-anchor" href="#\u963B\u585Eio\u6A21\u578B" aria-hidden="true">#</a> \u963B\u585EIO\u6A21\u578B</h2><blockquote><p>\u6B64\u65F6\u6211\u5DF2\u9965\u6E34\u96BE\u8010\uFF0C\u5168\u7A0B<strong>\u76EF\u7740</strong>\u540E\u53A8\uFF0C\u7B49\u5F85\u7740\u4E00\u5206\u4E00\u79D2\uFF0C\u7EC8\u4E8Equan jia tong\u505A\u597D\u4E86\uFF0C\u5728\u6B64\u671F\u95F4\u867D\u7136\u4EC0\u4E48\u4E8B\u4E5F\u6CA1\u5E72\uFF0C\u4F46\u662F\u6700\u540E\u80FD\u5403\u5230quan jia tong\uFF0C\u6211\u5F88\u5E78\u798F\u3002\u6B64\u5904\u9700\u8981\u4E00\u4E2A\u6E05\u65B0\u7684\u8111\u56DE\u8DEF\uFF0C\u6211\u5C31\u662F\u7A0B\u5E8F\uFF0C\u6211\u60F3\u8981quan jia tong\uFF0C\u4E8E\u662F<strong>\u53D1\u8D77\u4E86\u7CFB\u7EDF\u8C03\u7528</strong>\uFF0C\u800C\u540E\u53A8\u52A0\u5DE5\u7684\u8FC7\u7A0B\u5C31\u662F\u5728\u505A<strong>\u6570\u636E\u51C6\u5907\u548C\u62F7\u8D1D</strong>\u5DE5\u4F5C\u3002quan jia tong\u6700\u7EC8\u5230\u624B\uFF0C\u6570\u636E\u7EC8\u4E8E\u4ECE\u5185\u6838\u7A7A\u95F4\u62F7\u8D1D\u5230\u4E86\u7528\u6237\u7A7A\u95F4\u3002</p></blockquote><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>listenfd <span class="token operator">=</span> <span class="token function">socket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   			<span class="token comment">// \u6253\u5F00\u4E00\u4E2A\u7F51\u7EDC\u901A\u4FE1\u7AEF\u53E3</span>
<span class="token function">bind</span><span class="token punctuation">(</span>listenfd<span class="token punctuation">)</span><span class="token punctuation">;</span>        			<span class="token comment">// \u7ED1\u5B9A</span>
<span class="token function">listen</span><span class="token punctuation">(</span>listenfd<span class="token punctuation">)</span><span class="token punctuation">;</span>      			<span class="token comment">// \u76D1\u542C</span>
<span class="token keyword">while</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  connfd <span class="token operator">=</span> <span class="token function">accept</span><span class="token punctuation">(</span>listenfd<span class="token punctuation">)</span><span class="token punctuation">;</span>  	<span class="token comment">// \u963B\u585E\u5EFA\u7ACB\u8FDE\u63A5</span>
  <span class="token keyword">int</span> n <span class="token operator">=</span> <span class="token function">read</span><span class="token punctuation">(</span>connfd<span class="token punctuation">,</span> buf<span class="token punctuation">)</span><span class="token punctuation">;</span>  	<span class="token comment">// \u963B\u585E\u8BFB\u6570\u636E</span>
  <span class="token function">doSomeThing</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">;</span>  			<span class="token comment">// \u5229\u7528\u8BFB\u5230\u7684\u6570\u636E\u5B8C\u6210\u4E1A\u52A1\u64CD\u4F5C</span>
  <span class="token function">close</span><span class="token punctuation">(</span>connfd<span class="token punctuation">)</span><span class="token punctuation">;</span>     			<span class="token comment">// \u5173\u95ED\u8FDE\u63A5\uFF0C\u5FAA\u73AF\u7B49\u5F85\u4E0B\u4E00\u4E2A\u8FDE\u63A5</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://mmbiz.qpic.cn/mmbiz_gif/GLeh42uInXTyY80RSpUTLjIMiaGGicv9zArJDictJLnnRWwXriaXkgJFXnUsibFTlxjqSaBicqpeH4NhXBCqWuFgc7VQ/640?wx_fmt=gif&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1" alt=""></p><p>\u603B\u4F53\u6765\u770B\uFF0C\u4F1A\u6709\u4E24\u4E2A\u5730\u65B9\u53D1\u751F\u963B\u585E</p><ol><li>accept\u65B9\u6CD5\uFF0C\u8FD9\u91CC\u9700\u8981\u5B8C\u6210Http\u4E09\u6B21\u63E1\u624B\u64CD\u4F5C\uFF0C\u5C5E\u4E8E\u7F51\u7EDC\u5C42\uFF0C\u65E0\u6CD5\u4ECE\u4EE3\u7801\u5C42\u9762\u4F18\u5316</li><li>read\u65B9\u6CD5\uFF0C\u628Aread\u65B9\u6CD5\u7EC6\u8282\u5C55\u5F00\u770B\uFF0C\u4F1A\u6709\u4E24\u4E2A\u9636\u6BB5\u53D1\u751F\u963B\u585E <ol><li>\u6570\u636E\u4ECE\u7F51\u5361\u62F7\u8D1D\u5230\u5185\u6838\u7F13\u51B2\u533A\uFF0C\u5B8C\u6210\u540E\u6587\u4EF6\u63CF\u8FF0\u7B26\u7684\u72B6\u6001\u88AB\u4FEE\u6539\u4E3A\u8BFB\u5DF2\u5C31\u7EEA</li><li>\u6570\u636E\u4ECE\u5185\u6838\u62F7\u8D1D\u5230\u7528\u6237\u7F13\u51B2\u533A\uFF0C\u5B8C\u6210\u540E\u8FD4\u56DE\u5230\u8FBE\u7684\u5B57\u8282\u6570</li></ol></li></ol><p><img src="https://mmbiz.qpic.cn/mmbiz_gif/GLeh42uInXTyY80RSpUTLjIMiaGGicv9zADM8nrhNkEtFpSpLjGicOemZ5mt7orYF8vFC7g83lPVDeSbnlgKl7XaA/640?wx_fmt=gif&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1" alt="\u56FE\u7247"></p><p>\u6574\u4F53\u6D41\u7A0B\u5982\u4E0B\uFF1A</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210817095814.png" alt=""></p><p>\u963B\u585EIO\u7684\u6267\u884C\u8FC7\u7A0B\u662F\u8FDB\u7A0B\u8FDB\u884C\u7CFB\u7EDF\u8C03\u7528\uFF0C<strong>\u7B49\u5F85\u5185\u6838</strong>\u5C06\u6570\u636E\u51C6\u5907\u597D\u5E76\u590D\u5236\u5230\u7528\u6237\u6001\u7F13\u51B2\u533A\u540E\uFF0C\u8FDB\u7A0B<strong>\u653E\u5F03\u4F7F\u7528CPU</strong>\u5E76<strong>\u4E00\u76F4\u963B\u585E</strong>\u5728\u6B64\uFF0C\u76F4\u5230\u6570\u636E\u51C6\u5907\u597D</p><p>\u5982\u679C\u8FD9\u4E2A\u8FDE\u63A5\u7684\u5BA2\u6237\u7AEF\u4E00\u76F4\u4E0D\u53D1\u6570\u636E\uFF0C\u90A3\u4E48\u670D\u52A1\u7AEF\u7EBF\u7A0B\u5C06\u4F1A<strong>\u4E00\u76F4\u963B\u585E\u5728 read \u51FD\u6570\u4E0A\u4E0D\u8FD4\u56DE\uFF0C\u4E5F\u65E0\u6CD5\u63A5\u53D7\u5176\u4ED6\u5BA2\u6237\u7AEF\u8FDE\u63A5</strong></p><h2 id="\u975E\u963B\u585Eio\u6A21\u578B" tabindex="-1"><a class="header-anchor" href="#\u975E\u963B\u585Eio\u6A21\u578B" aria-hidden="true">#</a> \u975E\u963B\u585EIO\u6A21\u578B</h2><blockquote><p>\u6B64\u65F6\u6211<strong>\u6BCF\u96945\u5206\u949F</strong>\u8BE2\u95EEquan jia tong\u597D\u4E86\u6CA1\uFF0C\u5728\u6570\u6B21\u76D8\u95EE\u540E\uFF0C\u7EC8\u4E8E\u51FA\u7089\u4E86\u3002\u5728\u6BCF\u4E00\u6B21\u76D8\u95EE\u4E4B\u524D\uFF0C\u5BF9\u4E8E\u7A0B\u5E8F\u6765\u8BF4\u662F<strong>\u975E\u963B\u585E\u7684</strong>\uFF0C<strong>\u5360\u7528CPU\u8D44\u6E90</strong>\uFF0C\u53EF\u4EE5\u505A\u5176\u4ED6\u4E8B\u60C5\u3002</p></blockquote><p>\u64CD\u4F5C\u7CFB\u7EDF\u63D0\u4F9B\u7684recvfrom\u51FD\u6570\u53EF\u4EE5\u5B9E\u73B0\u975E\u963B\u585E\u7684\u6548\u679C\u3002\u8C03\u7528recvfrom\u524D\uFF0C\u628A\u6587\u4EF6\u63CF\u8FF0\u7B26\u8BBE\u7F6E\u4E3A\u975E\u963B\u585E\uFF08errno\u8BBE\u7F6E\u4E3AEWOULDBLOCK\uFF09\uFF0C\u6BCF\u6B21\u5E94\u7528\u7A0B\u5E8F\u9700\u8981<strong>\u8BE2\u95EE\u5185\u6838</strong>\u662F\u5426\u6709\u6570\u636E\u51C6\u5907\u597D\u3002\u5F53\u6570\u636E\u8FD8\u6CA1\u62F7\u8D1D\u5230\u7528\u6237\u7F13\u51B2\u533A\u524D\u90FD\u8FD4\u56DE-1\uFF0C\u7528\u6237\u7EBF\u7A0B\u9700\u8981\u8FDB\u5165\u4E0B\u4E00\u8F6E\u7684\u8F6E\u8BE2\uFF1B\u5F53\u6570\u636E\u5728\u5185\u6838\u7F13\u51B2\u533A\u51C6\u5907\u597D\u62F7\u8D1D\u5230\u7528\u6237\u7F13\u51B2\u533A\u65F6\uFF0Crecvfrom\u51FD\u6570\u4F1A\u8FDB\u5165\u963B\u585E\u9636\u6BB5\uFF0C\u7136\u540E\u5F00\u59CB\u62F7\u8D1D\u6570\u636E\u5230\u7528\u6237\u7F13\u51B2\u533A\uFF0C\u5B8C\u6210\u540E\u51FD\u6570\u4F1A\u8FD4\u56DE\u5230\u8FBE\u7684\u5B57\u8282\u6570\uFF0C\u5E76\u5F00\u59CB\u5904\u7406\u4E1A\u52A1</p><p><img src="https://mmbiz.qpic.cn/mmbiz_gif/GLeh42uInXTyY80RSpUTLjIMiaGGicv9zAT6rHhibbzK5rXiarLuJU0P4MGrHNl35vVCV4JdS4FeejOkl8bBGz9nVQ/640?wx_fmt=gif&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1" alt="\u56FE\u7247"></p><p>\u6574\u4F53\u6D41\u7A0B\u56FE\u5982\u4E0B\uFF1A</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210817154602.png" alt=""></p><p>\u975E\u963B\u585EIO\u7684\u6267\u884C\u8FC7\u7A0B\u7ECF\u5386\u4E24\u4E2A\u9636\u6BB5</p><ul><li><strong>\u7B49\u5F85\u6570\u636E\u9636\u6BB5\u662F\u975E\u963B\u585E\u7684</strong>\uFF0C\u5F53\u6570\u636E\u8FD8\u672A\u5230\u7F51\u5361\uFF0C\u6216\u8005\u6570\u636E\u5230\u8FBE\u7F51\u5361\u4E86\u4F46\u662F\u8FD8\u6CA1\u62F7\u8D1D\u5230\u5185\u6838\u7F13\u51B2\u533A\u4E4B\u524D\uFF0C\u7528\u6237\u7EBF\u7A0B\u9700\u8981\u4E0D\u505C\u5730\u53BB<strong>\u8F6E\u8BE2\u5185\u6838</strong>\u6570\u636E\u7684\u5C31\u7EEA\u72B6\u6001</li><li><strong>\u6570\u636E\u590D\u5236\u9636\u6BB5\u662F\u963B\u585E\u7684</strong>\uFF0C\u9700\u8981\u7B49\u5F85\u6570\u636E\u4ECE\u5185\u6838\u7F13\u51B2\u533A\u62F7\u8D1D\u5230\u7528\u6237\u7F13\u51B2\u533A\uFF0C\u624D\u80FD\u8FD4\u56DE</li></ul><h2 id="io\u591A\u8DEF\u590D\u7528\u6A21\u578B" tabindex="-1"><a class="header-anchor" href="#io\u591A\u8DEF\u590D\u7528\u6A21\u578B" aria-hidden="true">#</a> IO\u591A\u8DEF\u590D\u7528\u6A21\u578B</h2><blockquote><p>\u6392\u4E86\u5F88\u957F\u7684\u961F\uFF0C\u7EC8\u4E8E\u8F6E\u5230\u6211\u652F\u4ED8\u540E\uFF0C\u62FF\u5230\u4E86\u4E00\u5F20\u5C0F\u7968\uFF0C\u4E0A\u9762\u6709<strong>\u53F7\u6B21</strong>\u3002\u5F53quan jia tong\u51FA\u7089\u540E\uFF0C\u4F1A\u558A\u76F8\u5E94\u7684\u53F7\u6B21\u6765\u53D6\u3002KFC\u8425\u4E1A\u5458\u6253\u5C0F\u7968\u51FA\u53F7\u6B21\u7684\u52A8\u4F5C\u76F8\u5F53\u4E8E\u64CD\u4F5C\u7CFB\u7EDF<strong>\u591A\u5F00\u4E86\u4E2A\u7EBF\u7A0B</strong>\uFF0C\u4E13\u95E8\u63A5\u6536\u5BA2\u6237\u7AEF\u7684\u8FDE\u63A5\u3002\u6211\u53EA\u5173\u6CE8\u53EB\u5230\u7684\u662F\u4E0D\u662F\u6211\u7684\u53F7\uFF0C\u56E0\u6B64\u7A0B\u5E8F\u8FD8\u9700\u5728\u670D\u52A1\u7AEF<strong>\u6CE8\u518C\u6211\u60F3\u76D1\u542C\u7684\u4E8B\u4EF6</strong>\u7C7B\u578B\u3002</p></blockquote><p>\u5F53\u670D\u52A1\u7AEF\u548C\u591A\u4E2A\u5BA2\u6237\u7AEF\u5EFA\u7ACB\u8FDE\u63A5\u65F6\uFF0C\u5982\u679C\u4E3A\u6BCF\u4E00\u4E2A\u5BA2\u6237\u7AEF\u521B\u5EFA\u4E00\u4E2A\u7EBF\u7A0B\uFF0C\u90A3\u4E48\u670D\u52A1\u7AEF\u7684\u7EBF\u7A0B\u8D44\u6E90\u5F88\u5BB9\u6613\u5C31\u88AB\u6D88\u8017\u5B8C</p><p>\u6211\u4EEC\u53EF\u4EE5\u628A\u5EFA\u7ACB\u8FDE\u63A5\u7684\u5BA2\u6237\u7AEF\u7684\u6587\u4EF6\u63CF\u8FF0\u7B26\u90FD\u5B58\u653E\u5230\u4E00\u4E2A\u6570\u7EC4\u91CC\u9762\uFF0C\u901A\u8FC7\u7CFB\u7EDF\u8C03\u7528\u51FD\u6570select\uFF0C\u628A\u4E00\u4E2A\u6587\u4EF6\u63CF\u8FF0\u7B26\u7684\u6570\u7EC4\u53D1\u7ED9\u64CD\u4F5C\u7CFB\u7EDF\uFF0C\u8BA9\u64CD\u4F5C\u7CFB\u7EDF\u53BB\u5B8C\u6210\u904D\u5386\u5E76\u786E\u5B9A\u54EA\u4E2A\u6587\u4EF6\u63CF\u8FF0\u7B26\u662F\u53EF\u4EE5\u8FDB\u884C\u8BFB\u5199\u7684\uFF0C\u7136\u540E\u7528\u6237\u7EBF\u7A0B\u6839\u636E\u7ED3\u679C\u8FDB\u884C\u5904\u7406</p><h3 id="\u670D\u52A1\u7AEF\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#\u670D\u52A1\u7AEF\u4EE3\u7801" aria-hidden="true">#</a> \u670D\u52A1\u7AEF\u4EE3\u7801</h3><p>\u7EBF\u7A0BA</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>while(1) {
  // \u4E0D\u65AD\u63A5\u53D7\u5BA2\u6237\u7AEF\u8FDE\u63A5\uFF0C\u5E76\u628A socket \u6587\u4EF6\u63CF\u8FF0\u7B26\u653E\u5230\u4E00\u4E2A list \u91CC
  connfd = accept(listenfd);
  fcntl(connfd, F_SETFL, O_NONBLOCK);
  fdlist.add(connfd);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7EBF\u7A0BB</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>while(1) {
  // \u628A\u4E00\u5806\u6587\u4EF6\u63CF\u8FF0\u7B26 list \u4F20\u7ED9 select \u51FD\u6570
  // \u6709\u5DF2\u5C31\u7EEA\u7684\u6587\u4EF6\u63CF\u8FF0\u7B26\u5C31\u8FD4\u56DE\uFF0Cnready \u8868\u793A\u6709\u591A\u5C11\u4E2A\u5C31\u7EEA\u7684
  nready = select(fdlist);
  // \u7528\u6237\u5C42\u4F9D\u7136\u8981\u904D\u5386\uFF0C\u53EA\u4E0D\u8FC7\u5C11\u4E86\u5F88\u591A\u65E0\u6548\u7684\u7CFB\u7EDF\u8C03\u7528
  for(fd &lt;-- fdlist) {
    if(fd != -1) {
      // \u53EA\u8BFB\u5DF2\u5C31\u7EEA\u7684\u6587\u4EF6\u63CF\u8FF0\u7B26
      read(fd, buf);
      // \u603B\u5171\u53EA\u6709 nready \u4E2A\u5DF2\u5C31\u7EEA\u63CF\u8FF0\u7B26\uFF0C\u4E0D\u7528\u8FC7\u591A\u904D\u5386
      if(--nready == 0) break;
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://mmbiz.qpic.cn/mmbiz_gif/GLeh42uInXTyY80RSpUTLjIMiaGGicv9zAicgy5qFYcyoWPAV31k82icRe6I4Lya2F9qWcBlhHv3kzpgt9yjD7Hnpw/640?wx_fmt=gif&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1" alt="\u56FE\u7247"></p><p>\u6574\u4F53\u6D41\u7A0B\u5982\u4E0B\uFF1A</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210817160011.png" alt=""></p><ul><li><p>\u5BF9\u4E8E\u7528\u6237\u5C42\u6765\u8BF4\uFF0C\u4E00\u822C<strong>\u611F\u53D7\u4E0D\u5230\u963B\u585E</strong>\uFF0C\u56E0\u4E3A\u8BF7\u6C42\u6765\u4E86\uFF0C\u53EF\u4EE5\u7528\u653E\u5230\u7EBF\u7A0B\u6C60\u91CC\u6267\u884C</p></li><li><p>\u4F46\u5BF9\u4E8E\u6267\u884Cselect\u7684\u5185\u6838\u5C42\u800C\u8A00\uFF0C\u662F<strong>\u963B\u585E</strong>\u7684\uFF0C\u9700\u8981\u963B\u585E\u5730<strong>\u7B49\u5F85\u67D0\u4E2A\u5957\u63A5\u5B57\u53D8\u4E3A\u53EF\u8BFB</strong>\u3002</p></li><li><p>\u505A\u5230\u4E86\u4E00\u4E2A\u7EBF\u7A0B\u5904\u7406\u591A\u4E2A\u5BA2\u6237\u7AEF\u8FDE\u63A5\uFF08\u6587\u4EF6\u63CF\u8FF0\u7B26\uFF09\uFF0C\u53C8\u51CF\u5C11\u4E86\u7CFB\u7EDF\u8C03\u7528\u7684\u5F00\u9500\uFF08\u591A\u4E2A\u6587\u4EF6\u63CF\u8FF0\u7B26\u53EA\u6709\u4E00\u6B21 select \u7684\u7CFB\u7EDF\u8C03\u7528 + n \u6B21\u5C31\u7EEA\u72B6\u6001\u7684\u6587\u4EF6\u63CF\u8FF0\u7B26\u7684 recvfrom \u7CFB\u7EDF\u8C03\u7528\uFF09</p></li><li><p>IO\u591A\u8DEF\u590D\u7528\u5176\u5B9E\u662F\u963B\u585E\u5728select\uFF0Cpoll\uFF0Cepoll\u8FD9\u7C7B\u7CFB\u7EDF\u8C03\u7528\u4E0A\u7684\uFF0C<strong>\u590D\u7528\u7684\u662F\u6267\u884Cselect\uFF0Cpoll\uFF0Cepoll\u7684\u7EBF\u7A0B</strong></p></li></ul><h2 id="\u4FE1\u53F7\u9A71\u52A8io\u6A21\u578B" tabindex="-1"><a class="header-anchor" href="#\u4FE1\u53F7\u9A71\u52A8io\u6A21\u578B" aria-hidden="true">#</a> \u4FE1\u53F7\u9A71\u52A8IO\u6A21\u578B</h2><blockquote><p>\u8DD1KFC\u5ACC\u9EBB\u70E6\uFF0C\u521A\u597D\u6709\u4E2A\u4F1A\u5458\uFF0C\u76F4\u63A5\u70B9\u4EFDwai mai\uFF0C\u7F8E\u6ECB\u6ECB\u3002\u5F53wai mai\u9001\u8FBE\u65F6\uFF0C\u4F1A\u6536\u5230\u53D6\u9910\u7535\u8BDD\uFF08\u4FE1\u53F7\uFF09\u3002\u5728\u6536\u5230\u53D6\u9910\u7535\u8BDD\u4E4B\u524D\uFF0C\u6211\u53EF\u4EE5\u6109\u5FEB\u5730\u5403\u6216\u8005\u5B66\u4E60\u3002</p></blockquote><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/\u4FE1\u53F7\u9A71\u52A8IO\u6A21\u578B.png" alt=""></p><p>\u4FE1\u53F7\u9A71\u52A8IO\u6A21\u578B\u6267\u884C\u5206\u4E3A\u4E24\u4E2A\u9636\u6BB5\uFF1A</p><ul><li><strong>\u6570\u636E\u51C6\u5907\u9636\u6BB5\u662F\u4E0D\u963B\u585E\u7684</strong>\uFF0C\u5F53\u6570\u636E\u51C6\u5907\u5B8C\u6210\u4E4B\u540E\uFF0C\u4F1A\u4E3B\u52A8\u5730\u901A\u77E5\u7528\u6237\u8FDB\u7A0B\u6570\u636E\u5DF2\u7ECF\u51C6\u5907\u5B8C\u6210\uFF0C\u5BF9\u7528\u6237\u7EBF\u7A0B\u505A\u4E00\u4E2A\u56DE\u8C03</li><li><strong>\u6570\u636E\u62F7\u8D1D\u9636\u6BB5\u662F\u963B\u585E\u7684</strong>\uFF0C\u7B49\u5F85\u6570\u636E\u62F7\u8D1D</li></ul><p>\u4E0E\u975E\u963B\u585EIO\u6A21\u578B\u7684\u533A\u522B\u5728\u4E8E\u7B2C\u4E00\u9636\u6BB5\uFF0C\u975E\u963B\u585EIO\u6A21\u578B\u662F\u8F6E\u8BE2\u7ED3\u679C\uFF0C\u4FE1\u53F7\u9A71\u52A8IO\u6A21\u578B\u662F\u7B49\u5F85\u4FE1\u53F7</p><h2 id="\u5F02\u6B65io\u6A21\u578B" tabindex="-1"><a class="header-anchor" href="#\u5F02\u6B65io\u6A21\u578B" aria-hidden="true">#</a> \u5F02\u6B65IO\u6A21\u578B</h2><blockquote><p>\u6B64\u65F6\u79D1\u6280\u7684\u53D1\u5C55\u5DF2\u7ECF\u8D85\u4E4E\u60F3\u8C61\u4E86\uFF0Cwai mai\u673A\u5668\u4EBA\u5C06quan jia tong\u81EA\u52A8\u9001\u8FBE\u5E76<strong>\u8F6C\u6362\u6210\u8425\u517B</strong>\u5FEB\u901F\u6CE8\u5165\u6211\u7684\u4F53\u5185\uFF0C\u540C\u65F6\u8FD8\u80FD\u5F97\u5230\u53E3\u611F\u7684\u6EE1\u8DB3\u3002\u6CE8\u5165\u7ED3\u675F\u540E\uFF0C\u673A\u5668\u4EBA\u4F1A\u63D0\u9192\u6211\u6CE8\u5165\u5B8C\u6BD5\u3002\u5728\u8FD9\u4E2A\u671F\u95F4\u6211\u53EF\u4EE5\u653E\u5FC3\u5927\u80C6\u7684\u73A9\uFF0C\u751A\u81F3\u6CE8\u5C04\u7684\u65F6\u5019\u4E5F<strong>\u4E0D\u9700\u8981\u505C\u4E0B\u6765</strong>\uFF01</p></blockquote><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/\u5F02\u6B65IO\u6A21\u578B.png" alt=""></p><p>\u7528\u6237\u8FDB\u7A0B\u53D1\u8D77\u7CFB\u7EDF\u8C03\u7528\u540E\uFF0C\u7ACB\u523B\u5C31\u53EF\u4EE5\u5F00\u59CB\u53BB\u505A\u5176\u4ED6\u7684\u4E8B\u60C5\uFF0C\u7136\u540E\u76F4\u5230I/O<strong>\u6570\u636E\u51C6\u5907\u597D\u5E76\u590D\u5236\u5B8C\u6210\u540E</strong>\uFF0C\u5185\u6838\u4F1A\u7ED9\u7528\u6237\u8FDB\u7A0B<strong>\u53D1\u9001\u901A\u77E5</strong>\uFF0C\u544A\u8BC9\u7528\u6237\u8FDB\u7A0B\u64CD\u4F5C<strong>\u5DF2\u7ECF\u5B8C\u6210</strong>\u4E86\u3002</p><p>\u7279\u70B9\uFF1A</p><ul><li>\u5F02\u6B65IO\u6267\u884C\u7684<strong>\u4E24\u4E2A\u9636\u6BB5\u90FD\u4E0D\u4F1A\u963B\u585E</strong>\u8BFB\u5199\u64CD\u4F5C\uFF0C\u7531\u5185\u6838\u5B8C\u6210</li><li>\u5B8C\u6210\u540E\u5185\u6838\u5C06\u6570\u636E\u653E\u5230\u6307\u5B9A\u7684\u7F13\u51B2\u533A\uFF0C<strong>\u901A\u77E5</strong>\u5E94\u7528\u7A0B\u5E8F\u6765\u53D6</li></ul><h2 id="\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a> \u603B\u7ED3</h2><ul><li>\u4ECE\u6548\u7387\u4E0A\u770B\uFF1A\u963B\u585EIO&lt;\u975E\u963B\u585EIO&lt;\u591A\u8DEF\u590D\u7528IO&lt;\u4FE1\u53F7\u9A71\u52A8IO&lt;\u5F02\u6B65IO</li><li>\u4ECE\u540C\u6B65/\u5F02\u6B65\u770B\uFF1A\u53EA\u6709\u5F02\u6B65IO\u6A21\u578B\u662F\u5F02\u6B65\u7684\uFF0C\u5176\u4ED6\u5747\u4E3A\u540C\u6B65</li></ul><h3 id="io\u6A21\u578B\u7684\u53D1\u5C55\u7ECF\u5386" tabindex="-1"><a class="header-anchor" href="#io\u6A21\u578B\u7684\u53D1\u5C55\u7ECF\u5386" aria-hidden="true">#</a> IO\u6A21\u578B\u7684\u53D1\u5C55\u7ECF\u5386</h3><ol><li>\u4E00\u5207\u7684\u5F00\u59CB\u90FD\u662F\u6E90\u4E8E\u64CD\u4F5C\u7CFB\u7EDF\u7ED9\u6211\u4EEC\u63D0\u4F9B\u7684recvfrom\u8FD9\u4E2A\u963B\u585E\u7684\u51FD\u6570\uFF0C\u6211\u4EEC\u79F0\u4E4B\u4E3A<strong>\u963B\u585EIO</strong></li><li>\u4E3A\u4E86\u51CF\u5C11\u963B\u585E\u5E26\u6765\u7684\u7B49\u5F85\u65F6\u95F4\uFF0C\u7A0B\u5E8F\u5458\u5728\u7528\u6237\u6001\u901A\u8FC7\u591A\u7EBF\u7A0B\u6765\u9632\u6B62\u4E3B\u7EBF\u7A0B\u5361\u6B7B <ul><li>\u4E3B\u7EBF\u7A0B\u63A5\u6536\u5BA2\u6237\u7AEF</li><li>\u65B0\u5EFA\u5B50\u7EBF\u7A0B\u5B8C\u6210\u963B\u585E\u7684recvfrom\u51FD\u6570\u8C03\u7528</li></ul></li><li>\u540E\u6765\u64CD\u4F5C\u7CFB\u7EDF\u53D1\u73B0\u8FD9\u4E2A\u9700\u6C42\u6BD4\u8F83\u5927\uFF0C\u4E8E\u662F\u5728\u64CD\u4F5C\u7CFB\u7EDF\u5C42\u9762\u63D0\u4F9B\u4E86\u975E\u963B\u585E\u7684recvfrom\u51FD\u6570\uFF0C\u901A\u8FC7\u4FEE\u6539\u6587\u4EF6\u63CF\u8FF0\u7B26\u7684errorno\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u5728\u4E00\u4E2A\u7EBF\u7A0B\u5185\u5B8C\u6210\u591A\u4E2A\u6587\u4EF6\u63CF\u8FF0\u7B26\u7684\u8BFB\u53D6\uFF0C\u6211\u4EEC\u79F0\u4E4B\u4E3A<strong>\u975E\u963B\u585EIO</strong></li><li>\u4F46\u662F\u591A\u4E2A\u6587\u4EF6\u63CF\u8FF0\u7B26\u7684\u8BFB\u53D6\u5C31\u9700\u8981\u904D\u5386\uFF0C\u5F53\u9AD8\u5E76\u53D1\u573A\u666F\u4E0B\uFF0C\u7528\u6237\u6001\u9700\u8981\u904D\u5386\u7684\u6587\u4EF6\u63CF\u8FF0\u7B26\u53D8\u5F97\u591A\u8D77\u6765\u4E86\uFF0C\u76F8\u5F53\u4E8E\u5728\u4E00\u4E2Awhile\u5FAA\u73AF\u5185\u8FDB\u884C\u4E86\u66F4\u591A\u7684\u7CFB\u7EDF\u8C03\u7528\uFF0C\u6B64\u65F6\u6027\u80FD\u5927\u6253\u6298\u6263</li><li>\u540E\u6765\u64CD\u4F5C\u7CFB\u7EDF\u53C8\u53D1\u73B0\u8FD9\u4E2A\u573A\u666F\u9700\u6C42\u91CF\u8F83\u5927\uFF0C\u4E8E\u662F\u53C8\u5728\u64CD\u4F5C\u7CFB\u7EDF\u5C42\u9762\u63D0\u4F9B\u4E86\u904D\u5386\u6587\u4EF6\u63CF\u8FF0\u7B26\u7684\u51FD\u6570\uFF0C\u7528\u6237\u6001\u53EF\u4EE5\u76F4\u63A5\u4ECE\u5185\u6838\u6001\u62FF\u5230\u53EF\u8BFB\u5199\u7684\u6587\u4EF6\u63CF\u8FF0\u7B26\uFF0C\u6211\u4EEC\u79F0\u4E4B\u4E3A<strong>IO\u591A\u8DEF\u590D\u7528</strong></li><li>IO\u591A\u8DEF\u590D\u7528\u6709\u4E09\u4E2A\u51FD\u6570\uFF0C\u6700\u5F00\u59CB\u662Fselect\uFF0C\u7136\u540E\u53C8\u53D1\u660E\u4E86poll\u89E3\u51B3\u4E86select\u5BF9\u6587\u4EF6\u63CF\u8FF0\u7B26\u7684\u9650\u5236\uFF0C\u63A5\u7740\u53C8\u53D1\u660E\u4E86epoll\u89E3\u51B3\u4E86select\u4E09\u4E2A\u4E0D\u8DB3</li></ol><p><strong>\u6240\u4EE5\uFF0CIO \u6A21\u578B\u7684\u6F14\u8FDB\uFF0C\u5176\u5B9E\u5C31\u662F\u65F6\u4EE3\u7684\u53D8\u5316\uFF0C\u5012\u903C\u7740\u64CD\u4F5C\u7CFB\u7EDF\u5C06\u66F4\u591A\u7684\u529F\u80FD\u52A0\u5230\u81EA\u5DF1\u7684\u5185\u6838\u800C\u5DF2</strong></p><p>\u5728\u5185\u6838\u6001\u5B8C\u6210\u64CD\u4F5C\u80AF\u5B9A\u6BD4\u5728\u7528\u6237\u6001\u5B8C\u6210\u64CD\u4F5C\u6548\u7387\u9AD8</p><h1 id="bio-\u540C\u6B65\u963B\u585E" tabindex="-1"><a class="header-anchor" href="#bio-\u540C\u6B65\u963B\u585E" aria-hidden="true">#</a> BIO - \u540C\u6B65\u963B\u585E</h1><h2 id="\u5B9E\u73B0\u8FC7\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u73B0\u8FC7\u7A0B" aria-hidden="true">#</a> \u5B9E\u73B0\u8FC7\u7A0B</h2><ol><li>\u5728\u670D\u52A1\u7AEF\u542F\u52A8\u4E00\u4E2AServerSocket\u6765<strong>\u76D1\u542C\u7F51\u7EDC\u8BF7\u6C42</strong></li><li>\u5BA2\u6237\u7AEF\u542F\u52A8Socket\u53D1\u8D77\u7F51\u7EDC\u8BF7\u6C42</li><li>\u9ED8\u8BA4\u60C5\u51B5\u4E0BServerSocket\u4F1A<strong>\u5EFA\u7ACB\u4E00\u4E2A\u7EBF\u7A0B</strong>\u6765\u5904\u7406\u6B64\u8BF7\u6C42\uFF0C\u5982\u679C\u670D\u52A1\u7AEF\u6CA1\u6709\u7EBF\u7A0B\u53EF\u7528\uFF0C\u5BA2\u6237\u7AEF\u5219\u4F1A<strong>\u963B\u585E\u7B49\u5F85</strong>\u6216\u906D\u5230<strong>\u62D2\u7EDD</strong>\uFF0C<strong>\u5E76\u53D1\u6548\u7387\u6BD4\u8F83\u4F4E</strong></li></ol><h2 id="\u5B9E\u73B0\u539F\u7406" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u73B0\u539F\u7406" aria-hidden="true">#</a> \u5B9E\u73B0\u539F\u7406</h2><p><strong>\u4E00\u4E2A\u8FDE\u63A5\u4E00\u4E2A\u7EBF\u7A0B</strong>\uFF0C\u82E5\u6709\u5BA2\u6237\u7AEF\u6709\u8FDE\u63A5\u8BF7\u6C42\u670D\u52A1\u7AEF\u5C31\u9700\u8981\u542F\u52A8\u4E00\u4E2A\u7EBF\u7A0B\u8FDB\u884C\u5904\u7406\uFF0C\u5982\u679C\u8FD9\u4E2A\u8FDE\u63A5\u4E0D\u505A\u4EFB\u4F55\u4E8B\u60C5\u4F1A\u9020\u6210\u4E0D\u5FC5\u8981\u7684<strong>\u7EBF\u7A0B\u5F00\u9500</strong>\u3002\u53EF\u4EE5\u901A\u8FC7\u7EBF\u7A0B\u6C60\u673A\u5236\u6539\u5584</p><h2 id="\u9002\u7528\u573A\u666F" tabindex="-1"><a class="header-anchor" href="#\u9002\u7528\u573A\u666F" aria-hidden="true">#</a> \u9002\u7528\u573A\u666F</h2><p>\u8FDE\u63A5\u6570\u76EE\u6BD4\u8F83\u5C0F\u4E14\u56FA\u5B9A\u7684\u67B6\u6784\uFF0C\u5BF9\u670D\u52A1\u5668\u8D44\u6E90\u8981\u6C42\u9AD8\uFF0C\u5E76\u53D1\u5C40\u9650\u4E8E\u5E94\u7528\u4E2D</p><h1 id="nio-\u540C\u6B65\u975E\u963B\u585E" tabindex="-1"><a class="header-anchor" href="#nio-\u540C\u6B65\u975E\u963B\u585E" aria-hidden="true">#</a> NIO - \u540C\u6B65\u975E\u963B\u585E</h1><h2 id="\u5B9E\u73B0\u539F\u7406-1" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u73B0\u539F\u7406-1" aria-hidden="true">#</a> \u5B9E\u73B0\u539F\u7406</h2><p><strong>\u4E00\u4E2A\u8BF7\u6C42\u4E00\u4E2A\u901A\u9053</strong>\uFF0C\u5373\u5BA2\u6237\u7AEF\u53D1\u9001\u7684\u8FDE\u63A5\u8BF7\u6C42\u90FD\u4F1A<strong>\u6CE8\u518C\u5230\u591A\u8DEF\u590D\u7528\u5668</strong>\u4E0A\uFF0C\u591A\u8DEF\u590D\u7528\u5668\u8F6E\u8BE2\u5230\u8FDE\u63A5<strong>\u6709 I/O \u8BF7\u6C42\u65F6\u624D\u542F\u52A8</strong>\u4E00\u4E2A\u7EBF\u7A0B\u8FDB\u884C\u5904</p><h2 id="\u9002\u7528\u573A\u666F-1" tabindex="-1"><a class="header-anchor" href="#\u9002\u7528\u573A\u666F-1" aria-hidden="true">#</a> \u9002\u7528\u573A\u666F</h2><p>\u8FDE\u63A5\u6570\u76EE\u591A\u4E14\u8FDE\u63A5\u6BD4\u8F83\u77ED\uFF08\u8F7B\u64CD\u4F5C\uFF09\u7684\u67B6\u6784\uFF0C\u6BD4\u5982\u804A\u5929\u670D\u52A1\u5668\uFF0C\u5E76\u53D1\u5C40\u9650\u4E8E\u5E94\u7528\u4E2D</p><h2 id="\u91CD\u8981\u89D2\u8272" tabindex="-1"><a class="header-anchor" href="#\u91CD\u8981\u89D2\u8272" aria-hidden="true">#</a> \u91CD\u8981\u89D2\u8272</h2><h3 id="\u7F13\u51B2\u533Abuffer" tabindex="-1"><a class="header-anchor" href="#\u7F13\u51B2\u533Abuffer" aria-hidden="true">#</a> \u7F13\u51B2\u533ABuffer</h3><p>\u6240\u6709\u6570\u636E\u90FD\u662F\u7528<strong>\u7F13\u51B2\u533A\uFF08\u7528\u6237\u7A7A\u95F4\u7F13\u51B2\u533A\uFF09\u5904\u7406\u7684\u3002\u5728\u8BFB\u53D6\u6570\u636E\u65F6\uFF0C\u5B83\u662F\u76F4\u63A5\u8BFB\u5230\u7F13\u51B2\u533A\u4E2D\u7684\uFF1B\u5728\u5199\u5165\u6570\u636E\u65F6\uFF0C\u4E5F\u662F\u5199\u5165\u5230\u7F13\u51B2\u533A\u4E2D\u3002\u4EFB\u4F55\u65F6\u5019\u8BBF\u95EENIO\u4E2D\u7684\u6570\u636E\uFF0C\u90FD\u662F\u901A\u8FC7\u7F13\u51B2\u533A\u8FDB\u884C\u64CD\u4F5C\u3002\u7F13\u51B2\u533A\u5B9E\u9645\u4E0A\u662F\u4E00\u4E2A\u6570\u7EC4\uFF0C\u5E76\u63D0\u4F9B\u4E86\u5BF9\u6570\u636E\u7684\u7ED3\u6784\u5316\u8BBF\u95EE</strong>\u4EE5\u53CA<strong>\u7EF4\u62A4\u8BFB\u5199\u4F4D\u7F6E</strong>\u7B49\u4FE1\u606F</p><h4 id="\u5199\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u5199\u64CD\u4F5C" aria-hidden="true">#</a> \u5199\u64CD\u4F5C</h4><ol><li>clear()</li><li>put() -&gt; \u5199\u64CD\u4F5C</li><li>flip() -&gt; \u91CD\u7F6E\u6E38\u6807</li><li>SocketChannel.write(buffer) -&gt; \u5C06\u7F13\u5B58\u6570\u636E\u53D1\u9001\u5230\u7F51\u7EDC\u7684\u53E6\u4E00\u7AEF</li><li>clear()</li></ol><p>\u8BFB\u64CD\u4F5C</p><ol><li>clear()</li><li>SocketChannel.read(buffer) -&gt; \u4ECE\u7F51\u7EDC\u4E2D\u8BFB\u53D6\u6570\u636E</li><li>buffer.flip()</li><li>buffer.get() -&gt; \u8BFB\u53D6\u6570\u636E</li><li>buffer.clear()</li></ol><h3 id="\u901A\u9053channel" tabindex="-1"><a class="header-anchor" href="#\u901A\u9053channel" aria-hidden="true">#</a> \u901A\u9053Channel</h3><p>nio\u4E2D\u5BF9\u6570\u636E\u7684\u8BFB\u53D6\u548C\u5199\u5165\u8981\u901A\u8FC7Channel\uFF0C\u5B83\u5C31\u50CF<strong>\u6C34\u7BA1\u4E00\u6837</strong>\uFF0C\u662F\u4E00\u4E2A\u901A\u9053\u3002\u901A\u9053\u4E0D\u540C\u4E8E\u6D41\u7684\u5730\u65B9\u5C31\u662F\u901A\u9053\u662F<strong>\u53CC\u5411</strong>\u7684\uFF0C\u53EF\u4EE5\u7528\u4E8E\u8BFB\u3001\u5199\u548C\u540C\u65F6\u8BFB\u5199\u64CD\u4F5C\u3002</p><h3 id="\u591A\u8DEF\u590D\u7528\u5668selector" tabindex="-1"><a class="header-anchor" href="#\u591A\u8DEF\u590D\u7528\u5668selector" aria-hidden="true">#</a> \u591A\u8DEF\u590D\u7528\u5668Selector</h3><p>\u7528\u4E8E\u6CE8\u518C\u901A\u9053\u3002\u5BA2\u6237\u7AEF\u53D1\u9001\u7684\u8FDE\u63A5\u8BF7\u6C42\u90FD\u4F1A\u6CE8\u518C\u5230\u591A\u8DEF\u590D\u7528\u5668\u4E0A\uFF0C<strong>\u591A\u8DEF\u590D\u7528\u5668\u8F6E\u8BE2\u5230\u8FDE\u63A5\u6709I/O\u8BF7\u6C42\u65F6\u624D\u542F\u52A8\u4E00\u4E2A\u7EBF\u7A0B\u8FDB\u884C\u5904\u7406</strong></p><h1 id="aio-\u5F02\u6B65\u975E\u963B\u585E" tabindex="-1"><a class="header-anchor" href="#aio-\u5F02\u6B65\u975E\u963B\u585E" aria-hidden="true">#</a> AIO - \u5F02\u6B65\u975E\u963B\u585E</h1><h2 id="\u5B9E\u73B0\u539F\u7406-2" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u73B0\u539F\u7406-2" aria-hidden="true">#</a> \u5B9E\u73B0\u539F\u7406</h2><p>\u8FDB\u884C\u8BFB\u5199\u64CD\u4F5C\u65F6\uFF0C\u53EA\u9700\u76F4\u63A5\u8C03\u7528api\u7684read\u6216write\u65B9\u6CD5\u5373\u53EF\u3002<strong>\u4E00\u4E2A\u6709\u6548\u8BF7\u6C42\u5BF9\u5E94\u4E00\u4E2A\u7EBF\u7A0B</strong>\uFF0C\u5BA2\u6237\u7AEF\u7684IO\u8BF7\u6C42\u90FD\u662F<strong>\u64CD\u4F5C\u7CFB\u7EDF\u5148\u5B8C\u6210\u4E86\u518D\u901A\u77E5\u670D\u52A1\u5668</strong>\u5E94\u7528\u53BB\u542F\u52A8\u7EBF\u7A0B\u8FDB\u884C\u5904\u7406</p><h2 id="\u9002\u7528\u573A\u666F-2" tabindex="-1"><a class="header-anchor" href="#\u9002\u7528\u573A\u666F-2" aria-hidden="true">#</a> \u9002\u7528\u573A\u666F</h2><p>\u8FDE\u63A5\u6570\u76EE\u591A\u4E14\u8FDE\u63A5\u6BD4\u8F83\u957F\uFF08\u91CD\u64CD\u4F5C\uFF09\u7684\u67B6\u6784\uFF0C\u6BD4\u5982\u76F8\u518C\u670D\u52A1\u5668\uFF0C\u5145\u5206\u8C03\u7528 OS \u53C2\u4E0E\u5E76\u53D1\u64CD\u4F5C</p>`,96),r=[t];function o(l,c){return a(),e("div",null,r)}var h=n(i,[["render",o],["__file","IO.html.vue"]]);export{h as default};
