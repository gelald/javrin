import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";import{o as s,c as a,d as n}from"./app.303653fb.js";const d={},i=n(`<h1 id="\u4FEE\u6539docker\u9ED8\u8BA4\u5B58\u50A8\u8DEF\u5F84" tabindex="-1"><a class="header-anchor" href="#\u4FEE\u6539docker\u9ED8\u8BA4\u5B58\u50A8\u8DEF\u5F84" aria-hidden="true">#</a> \u4FEE\u6539Docker\u9ED8\u8BA4\u5B58\u50A8\u8DEF\u5F84</h1><h2 id="\u95EE\u9898\u5F15\u5165" tabindex="-1"><a class="header-anchor" href="#\u95EE\u9898\u5F15\u5165" aria-hidden="true">#</a> \u95EE\u9898\u5F15\u5165</h2><p>\u4ECA\u5929\u5728\u670D\u52A1\u5668(\u64CD\u4F5C\u7CFB\u7EDF: CentOS)\u4E0A\u521B\u5EFA\u65B0\u5BB9\u5668\u7684\u65F6\u5019\u770B\u5230\u5BB9\u5668\u521B\u5EFA\u5931\u8D25\uFF0C\u5E76\u63D0\u793A\u78C1\u76D8\u7A7A\u95F4\u4E0D\u8DB3\u3002</p><p>\u8F93\u5165\u67E5\u8BE2\u78C1\u76D8\u7A7A\u95F4\u547D\u4EE4\u540E\u53D1\u73B0\uFF0C<code>/</code> \u76EE\u5F55\u53EA\u5206\u914D\u4E8650G\u7A7A\u95F4\uFF0C\u800C <code>/home</code> \u76EE\u5F55\u5374\u5206\u914D\u4E86198G\u7A7A\u95F4\u3002</p><p>\u800C Docker \u9ED8\u8BA4\u7684\u5B58\u50A8\u8DEF\u5F84\u662F <code>/var/lib/docker</code> \uFF0C\u662F\u5728 <code>/</code> \u76EE\u5F55\u4E0B\u7684\uFF0C\u5728\u4E0D\u4FEE\u6539\u64CD\u4F5C\u7CFB\u7EDF\u78C1\u76D8\u6302\u8F7D\u7684\u524D\u63D0\u4E0B\uFF0C\u60F3\u8981 Docker \u80FD\u6B63\u5E38\u4F7F\u7528\u3001\u521B\u5EFA\u5BB9\u5668\uFF0C\u6211\u4EEC\u9700\u8981\u628A Docker \u9ED8\u8BA4\u5B58\u50A8\u8DEF\u5F84\u4FEE\u6539\u5230 <code>/home</code> \u76EE\u5F55\u4E0B\u3002</p><h2 id="\u4FEE\u6539\u5B58\u50A8\u8DEF\u5F84" tabindex="-1"><a class="header-anchor" href="#\u4FEE\u6539\u5B58\u50A8\u8DEF\u5F84" aria-hidden="true">#</a> \u4FEE\u6539\u5B58\u50A8\u8DEF\u5F84</h2><ul><li><p>\u6682\u65F6\u505C\u6B62 Docker \u670D\u52A1</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>systemctl stop <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u4FDD\u9669\u8D77\u89C1\uFF0C\u518D\u6B21\u786E\u8BA4 Docker \u7684\u5B58\u50A8\u8DEF\u5F84</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> info <span class="token operator">|</span> <span class="token function">grep</span> Dir

Docker Root Dir: /var/lib/docker              <span class="token comment"># docker\u9ED8\u8BA4\u7684\u5B58\u50A8\u8DEF\u5F84</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u5728 <code>/home</code> \u76EE\u5F55\u4E0B\u65B0\u5EFA\u5B58\u50A8\u76EE\u5F55</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">mkdir</span> -p /home/docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u8FC1\u79FB\u539F\u6709\u6570\u636E\u5230\u65B0\u76EE\u5F55</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">mv</span> /var/lib/docker/* /home/docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u4FEE\u6539 docker.service \u914D\u7F6E\u6587\u4EF6</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">vi</span> /usr/lib/systemd/system/docker.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u627E\u5230\u8FD9\u4E00\u884C</p><p><code>ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock</code></p><p>\u4FEE\u6539\u5982\u4E0B</p><p><code>ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock --graph /home/docker</code></p></li><li><p>\u4F7F\u8FD9\u4EFD\u914D\u7F6E\u6587\u4EF6\u751F\u6548</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>systemctl daemon-reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u542F\u52A8 Docker \u670D\u52A1</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>systemctl start <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u67E5\u770B\u662F\u5426\u4FEE\u6539\u6210\u529F</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> info <span class="token operator">|</span> <span class="token function">grep</span> Dir

Docker Root Dir: /home/docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><p>\u63A5\u4E0B\u6765 Docker \u670D\u52A1\u8FD0\u884C\u8FC7\u7A0B\u4E2D\u7684\u955C\u50CF\u3001\u5BB9\u5668\u5168\u90FD\u5B58\u50A8\u5230\u7A7A\u95F4\u66F4\u5927\u7684 <code>/home</code> \u76EE\u5F55\u4E0B\u4E86\uFF0C\u53C8\u53EF\u4EE5\u6109\u5FEB\u5730\u521B\u5EFA\u5BB9\u5668\u4E86\u{1F609}</p>`,8),c=[i];function r(o,l){return s(),a("div",null,c)}var u=e(d,[["render",r],["__file","modify-docker-default-storage.html.vue"]]);export{u as default};