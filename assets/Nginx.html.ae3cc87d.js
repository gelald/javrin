import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";import{o as i,c as a,d as t}from"./app.dcab4746.js";const d={},n=t(`<h1 id="nginx-\u914D\u7F6E\u8BB0\u5F55" tabindex="-1"><a class="header-anchor" href="#nginx-\u914D\u7F6E\u8BB0\u5F55" aria-hidden="true">#</a> Nginx \u914D\u7F6E\u8BB0\u5F55</h1><h2 id="root-\u4E0E-alias\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#root-\u4E0E-alias\u533A\u522B" aria-hidden="true">#</a> root \u4E0E alias\u533A\u522B</h2><p>nginx \u6307\u5B9A\u2F42\u4EF6\u8DEF\u5F84\u6709\u4E24\u79CD\u2F45\u5F0F root \u548C alias\uFF0Croot \u4E0E alias \u4E3B\u8981\u533A\u522B\u5728\u4E8E nginx \u5982\u4F55\u89E3\u91CA location \u540E\u2FAF\u7684 uri\uFF0C\u8FD9\u4F1A\u4F7F\u4E24\u8005\u5206\u522B\u4EE5\u4E0D\u540C\u7684\u2F45\u5F0F\u5C06\u8BF7\u6C42\u6620\u5C04\u5230\u670D\u52A1\u5668\u2F42\u4EF6\u4E0A\u3002</p><h3 id="root" tabindex="-1"><a class="header-anchor" href="#root" aria-hidden="true">#</a> root</h3><p>root \u6307\u5B9A\u2F6C\u5F55\u7684\u4E0A\u7EA7\u2F6C\u5F55\uFF0C\u5E76\u4E14\u8BE5\u4E0A\u7EA7\u2F6C\u5F55\u8981\u542B\u6709 locatoin \u6307\u5B9A\u540D\u79F0\u7684\u540C\u540D\u2F6C\u5F55\u3002</p><p>\u4EE5root\u2F45\u5F0F\u8BBE\u7F6E\u8D44\u6E90\u8DEF\u5F84\uFF1A</p><ul><li><p>\u8BED\u6CD5\uFF1Aroot path</p></li><li><p>\u914D\u7F6E\u5757\uFF1Ahttp\u3001server\u3001location\u3001if</p></li></ul><p>\u4F8B\u5B50\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>location /img/ {
	alias /var/www/image/;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u82E5\u6309\u7167\u4E0A\u8FF0\u914D\u7F6E\u7684\u8BDD\uFF0C\u5219\u8BBF\u95EE <code>/img/</code> \u2F6C\u5F55\u2FA5\u2FAF\u7684\u2F42\u4EF6\u65F6\uFF0Cnginx \u4F1A\u2F83\u52A8\u53BB <code>/var/www/image/</code> \u2F6C\u5F55\u627E\u2F42\u4EF6</p><h3 id="alias" tabindex="-1"><a class="header-anchor" href="#alias" aria-hidden="true">#</a> alias</h3><p>alias \u6307\u5B9A\u7684\u2F6C\u5F55\u662F\u51C6\u786E\u7684\uFF0C\u7ED9location\u6307\u5B9A\u2F00\u4E2A\u2F6C\u5F55\u3002</p><p>\u4EE5 alias \u2F45\u5F0F\u8BBE\u7F6E\u8D44\u6E90\u8DEF\u5F84\uFF1A</p><ul><li><p>\u8BED\u6CD5\uFF1Aalias path\u3002\u9700\u8981\u6CE8\u610F\u7684\u662F\u76EE\u5F55\u540E\u9762\u4E00\u5B9A\u8981\u6709 <code>/</code></p></li><li><p>\u914D\u7F6E\u5757\uFF1Alocation</p></li></ul><p>\u4F8B\u5B50\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>location /img/ {
	root /var/www/image;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u82E5\u6309\u7167\u8FD9\u79CD\u914D\u7F6E\u7684\u8BDD\uFF0C\u5219\u8BBF\u95EE <code>/img/</code> \u2F6C\u5F55\u4E0B\u7684\u2F42\u4EF6\u65F6\uFF0Cnginx \u4F1A\u53BB <code>/var/www/image/img/</code> \u2F6C\u5F55\u4E0B\u627E\u2F42\u4EF6</p><h2 id="proxy-pass-\u4E0E-\u7684\u5173\u7CFB" tabindex="-1"><a class="header-anchor" href="#proxy-pass-\u4E0E-\u7684\u5173\u7CFB" aria-hidden="true">#</a> proxy_pass \u4E0E / \u7684\u5173\u7CFB</h2><p>\u5728 nginx \u4E2D\u914D\u7F6E proxy_pass \u4EE3\u7406\u8F6C\u53D1\u65F6</p><ul><li>\u5982\u679C\u5728 proxy_pass \u540E\u9762\u7684 url \u52A0 <code>/</code>\uFF0C\u8868\u793A\u7EDD\u5BF9\u6839\u8DEF\u5F84\uFF1B</li><li>\u5982\u679C\u6CA1\u6709 <code>/</code>\uFF0C\u8868\u793A\u76F8\u5BF9\u8DEF\u5F84\uFF0C\u628A\u5339\u914D\u7684\u8DEF\u5F84\u90E8\u5206\u4E5F\u7ED9\u4EE3\u7406\u8D70\u3002</li></ul><p>\u5047\u8BBE\u4E0B\u9762\u56DB\u79CD\u60C5\u51B5\u5206\u522B\u7528 <code>http://127.0.0.1/proxy/test.html</code> \u8FDB\u884C\u8BBF\u95EE\u3002</p><p>\u7B2C\u4E00\u79CD\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>location /proxy/ {
	proxy_pass http://192.168.0.120/;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8BBF\u95EE\u7684 URL\uFF1A<code>http://127.0.0.1/proxy/test.html</code></p><p>\u4EE3\u7406\u5230 URL\uFF1A<code>http://192.168.0.120/test.html</code></p><p>\u7B2C\u4E8C\u79CD\uFF08\u76F8\u5BF9\u4E8E\u7B2C\u4E00\u79CD\uFF0C\u6700\u540E\u5C11\u4E00\u4E2A / \uFF09</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>location /proxy/ {
	proxy_pass http://192.168.0.120;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8BBF\u95EE\u7684 URL\uFF1A<code>http://127.0.0.1/proxy/test.html</code></p><p>\u4EE3\u7406\u5230 URL\uFF1A<code>http://192.168.0.120/proxy/test.html</code></p><p>\u7B2C\u4E09\u79CD\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>location /proxy {
	proxy_pass http://192.168.0.120/;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8BBF\u95EE\u7684 URL\uFF1A<code>http://127.0.0.1/proxy/test.html</code></p><p>\u4EE3\u7406\u5230 URL\uFF1A<code>http://192.168.0.120//test.html</code></p><p>\u7B2C\u56DB\u79CD\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>location /proxy {
	proxy_pass http://192.168.0.120;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8BBF\u95EE\u7684 URL\uFF1A<code>http://127.0.0.1/proxy/test.html</code></p><p>\u4EE3\u7406\u5230 URL\uFF1A<code>http://192.168.0.120/proxy/test.html</code></p><p>\u7B2C\u4E94\u79CD\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>location /proxy/ {
	proxy_pass http://192.168.0.120/aaa/;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8BBF\u95EE\u7684 URL\uFF1A<code>http://127.0.0.1/proxy/test.html</code></p><p>\u4EE3\u7406\u5230 URL\uFF1A<code>http://192.168.0.120/aaa/test.html</code></p><p>\u7B2C\u516D\u79CD\uFF08\u76F8\u5BF9\u4E8E\u7B2C\u4E94\u79CD\uFF0C\u6700\u540E\u5C11\u4E00\u4E2A / \uFF09</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>location /proxy/ {
	proxy_pass http://192.168.0.120/aaa;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8BBF\u95EE\u7684 URL\uFF1A<code>http://127.0.0.1/proxy/test.html</code></p><p>\u4EE3\u7406\u5230 URL\uFF1A<code>http://192.168.0.120/aaatest.html</code></p>`,45),s=[n];function l(o,r){return i(),a("div",null,s)}var v=e(d,[["render",l],["__file","Nginx.html.vue"]]);export{v as default};
