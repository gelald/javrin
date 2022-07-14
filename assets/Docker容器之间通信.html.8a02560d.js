import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";import{o as n,c as s,e as a}from"./app.0f4f56d8.js";const o={},i=a(`<h1 id="docker\u5BB9\u5668\u4E4B\u95F4\u76F8\u4E92\u8BBF\u95EE" tabindex="-1"><a class="header-anchor" href="#docker\u5BB9\u5668\u4E4B\u95F4\u76F8\u4E92\u8BBF\u95EE" aria-hidden="true">#</a> Docker\u5BB9\u5668\u4E4B\u95F4\u76F8\u4E92\u8BBF\u95EE</h1><h2 id="\u95EE\u9898\u5F15\u5165" tabindex="-1"><a class="header-anchor" href="#\u95EE\u9898\u5F15\u5165" aria-hidden="true">#</a> \u95EE\u9898\u5F15\u5165</h2><p>\u6700\u8FD1\u5728\u627E Redis \u597D\u770B\u7684 GUI \uFF0C\u53D1\u73B0\u4E86 Redis \u81EA\u5BB6\u7684 GUI\u300CRedisInsight\u300D\u8FD8\u652F\u6301 Docker \u90E8\u7F72\uFF081.11.1\u7248\u672C\uFF09\uFF0C\u6253\u7B97\u4F7F\u7528 Docker Compose \u6765\u542F\u52A8 Redis \u548C RedisInsight</p><p>\u8FD9\u662F\u6211\u7684\u4E24\u4EFD docker-compose.yaml \u6587\u4EF6</p><blockquote><p>\u5DE6\u8FB9\u662F RedisInsight\uFF0C\u53F3\u8FB9\u662F Redis \u7684\u5B8C\u5168\u4F53\u2014\u2014 RedisMod</p></blockquote><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220519204620.png" alt=""></p><p>\u542F\u52A8\u540E\uFF0C\u8FDB\u5165 RedisInsight \u6253\u7B97\u8FDE\u63A5\u672C\u5730\u7684 Redis\uFF0C\u53D1\u73B0\u600E\u4E48\u8FDE\u63A5\u90FD\u8FDE\u63A5\u4E0D\u4E0A\uFF0C\u540E\u9762\u5224\u65AD\u662F\u7F51\u7EDC\u7684\u95EE\u9898\u3002</p><blockquote><p>\u56E0\u4E3A\u867D\u7136\u672C\u673A\u53EF\u4EE5\u901A\u8FC7 127.0.0.1:6379 \u8FDE\u63A5 Redis\uFF0C\u4F46\u662F\u5BF9\u4E8E RedisInsight \u5BB9\u5668\u6765\u8BF4\uFF0C\u662F\u65E0\u6CD5\u901A\u8FC7 127.0.0.1 \u8FD9\u4E2A\u7F51\u7EDC\u8FDE\u63A5\u7684\uFF0C\u56E0\u4E3A\u4ED6\u4EEC\u5904\u4E8E\u7684\u7F51\u7EDC\u662F\u4E0D\u4E00\u6837\u7684\u3002</p><p>\u56E0\u4E3A\u672C\u673A\u3001RedisMod\u5BB9\u5668\u3001RedisInsight\u5BB9\u5668\u53EF\u4EE5\u770B\u6210\u662F\u5C40\u57DF\u7F51\u5185\u7684\u4E09\u4E2A\u4E0A\u7F51\u8BBE\u5907\uFF0C\u6240\u4EE5\u4E5F\u5C31<strong>\u65E0\u6CD5\u76F4\u63A5\u4E92\u76F8\u8FDE\u901A</strong></p><p>\u867D\u7136\u53EF\u4EE5\u4F7F\u7528\u672C\u673A\u7684 IP \u5730\u5740\u8FDB\u884C\u8FDE\u63A5\uFF0C\u4F46\u662F IP \u5730\u5740\u4E0D\u80FD\u4FDD\u8BC1\u4E0D\u53D8\uFF0C\u5199\u4E00\u4E2A\u56FA\u5B9A\u7684\u503C\u4E5F\u4E0D\u7075\u6D3B\u3002</p></blockquote><p>\u90A3\u6709\u6CA1\u6709\u4EC0\u4E48\u529E\u6CD5\u53EF\u4EE5\u8BA9\u4E24\u4E2A\u5BB9\u5668\u4E92\u76F8\u8FDE\u901A\u4E92\u76F8\u8BBF\u95EE\u7684\u540C\u65F6\u8FD8\u4FDD\u6301\u4E00\u5B9A\u7684\u7075\u6D3B\u6027\u5462\uFF1F\u7B54\u6848\u81EA\u7136\u662F\u6709\u7684</p><h2 id="\u89E3\u51B3\u65B9\u6848" tabindex="-1"><a class="header-anchor" href="#\u89E3\u51B3\u65B9\u6848" aria-hidden="true">#</a> \u89E3\u51B3\u65B9\u6848</h2><h3 id="docker-run-\u4F7F\u7528-link-\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#docker-run-\u4F7F\u7528-link-\u53C2\u6570" aria-hidden="true">#</a> docker run \u4F7F\u7528 link \u53C2\u6570</h3><p>\u5728\u4E0D\u4F7F\u7528 Docker Compose \u7684\u65F6\u5019\uFF0C\u5728\u542F\u52A8\u547D\u4EE4\u4E2D\u52A0\u5165 <code>--link</code> \u53C2\u6570\uFF0C\u5C31\u53EF\u4EE5\u5B9E\u73B0\u5BB9\u5668\u4E4B\u95F4\u7684\u8BBF\u95EE</p><ul><li><p>\u542F\u52A8 redismod \u5BB9\u5668</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run --rm --name redismod -p <span class="token number">6379</span>:6379 -v /data/:/data -d redislabs/redismod:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u542F\u52A8 redisinsight\u5BB9\u5668</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run --rm --name redisinsight -p <span class="token number">8001</span>:8001 -v /db:/db --link redismod -d redislabs/redisinsight:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><p>\u4F7F\u7528 <code>--link</code> \u4E2D\u6307\u5B9A\u7684 <code>redismod</code> \u5373\u53EF\u6620\u5C04\u5230 redismod \u7684\u5BB9\u5668\u7F51\u7EDC\u4E2D</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220517233054.png" alt=""></p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/image-20220517233113573.png" alt="image-20220517233113573"></p><p>\u53EF\u4EE5\u770B\u5230\u662F\u8FDE\u63A5\u6210\u529F\u7684</p><h3 id="docker-compose-\u540C\u4E00\u4EFD-docker-compose-yaml-\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#docker-compose-\u540C\u4E00\u4EFD-docker-compose-yaml-\u6587\u4EF6" aria-hidden="true">#</a> docker compose \u540C\u4E00\u4EFD docker-compose.yaml \u6587\u4EF6</h3><p>\u76F8\u6BD4\u4F7F\u7528 docker run \u547D\u4EE4\u542F\u52A8\u5BB9\u5668\uFF0C\u663E\u7136 docker compose \u624D\u662F\u66F4\u4E3A\u63A8\u8350\u7684\u90A3\u4E00\u4E2A\u65B9\u5F0F\uFF0C\u628A\u542F\u52A8\u6240\u9700\u7684\u955C\u50CF\u3001\u73AF\u5883\u7B49\u5168\u90FD\u5199\u5230\u4E00\u4EFD docker-compose.yaml \u6587\u4EF6\u4E2D\uFF0C\u65B9\u4FBF\u4F7F\u7528\u3002</p><p>\u5982\u679C\u4F7F\u7528 docker compose \u7684\u65B9\u5F0F\uFF0C\u5C31\u662F\u628A\u4E24\u4E2A\u5BB9\u5668\u7684\u542F\u52A8\u4FE1\u606F\u90FD<strong>\u5199\u5230\u540C\u4E00\u4EFD\u6587\u4EF6\u4E2D</strong>\uFF0C\u518D\u5728\u9700\u8981\u4F9D\u8D56\u53E6\u4E00\u4E2A\u5BB9\u5668\u7684\u5BB9\u5668\u542F\u52A8\u4FE1\u606F\u4E2D\u52A0\u5165 depends_on\u3001links \u53C2\u6570\uFF0C\u8FD9\u6837\u5F97\u5230\u7684\u7ED3\u679C\u548C\u4E0A\u9762\u4F7F\u7528 docker run \u7684\u65B9\u5F0F\u5F97\u5230\u7684\u7ED3\u679C\u662F\u4E00\u6837\u7684</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220519214933.png" alt=""></p><h3 id="docker-compose-\u8FDE\u63A5\u540C\u4E00\u4E2A\u7F51\u7EDC" tabindex="-1"><a class="header-anchor" href="#docker-compose-\u8FDE\u63A5\u540C\u4E00\u4E2A\u7F51\u7EDC" aria-hidden="true">#</a> docker compose \u8FDE\u63A5\u540C\u4E00\u4E2A\u7F51\u7EDC</h3><p>\u4E0A\u8FF0\u540C\u4E00\u4EFD docker-compose.yaml \u6587\u4EF6\u7684\u65B9\u6CD5\u867D\u7136\u53EF\u884C\uFF0C\u4F46\u662F\u5B58\u5728\u4E00\u5B9A\u7684\u5C40\u9650\u6027\uFF0C\u5047\u5982\u9700\u8981\u94FE\u63A5\u4E00\u4E2A\u4F7F\u7528 docker run \u8FD0\u884C\u7684\u5BB9\u5668\uFF0C\u53C8\u600E\u4E48\u6837\u5B9E\u73B0\u4E92\u76F8\u8BBF\u95EE\u5462\uFF1F</p><p>\u8FD9\u65F6\uFF0C\u6211\u4EEC\u53EF\u4EE5\u8BA9\u4E24\u4E2A\u5BB9\u5668\u90FD\u8FDE\u63A5\u7740\u540C\u4E00\u4E2A\u7F51\u7EDC\uFF0C\u90A3\u4E48\u8FD9\u4E24\u4E2A\u5BB9\u5668\u5C31\u76F8\u5F53\u4E8E\u662F\u8FD9\u4E2A\u7F51\u7EDC\u4E0B\u7684\u4E24\u4E2A\u4E0A\u7F51\u8BBE\u5907\uFF0C\u4E5F\u5C31\u53EF\u4EE5\u5B9E\u73B0\u4E92\u901A\u4E86</p><blockquote><p>\u5148\u56DE\u987E\u4E00\u4E0B Docker \u7684\u7F51\u5361</p></blockquote><h4 id="docker-\u7F51\u5361\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#docker-\u7F51\u5361\u4ECB\u7ECD" aria-hidden="true">#</a> Docker \u7F51\u5361\u4ECB\u7ECD</h4><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220517230048.png" alt=""></p><ul><li>bridge\uFF1A\u9ED8\u8BA4\u7F51\u5361\uFF0C\u7C7B\u4F3C\u4E8E VMware \u7684 NAT \u6A21\u5F0F\uFF0C\u5982\u679C\u9700\u8981\u8BBF\u95EE\u5BB9\u5668\u5185\u90E8\u7684\u7AEF\u53E3\u9700\u8981\u8FDB\u884C\u7AEF\u53E3\u6620\u5C04</li><li>host\uFF1A\u76F4\u63A5\u4F7F\u7528\u4E3B\u673A\u7F51\u7EDC\uFF0C\u7C7B\u4F3C\u4E8E VMware \u7684\u6865\u63A5\u6A21\u5F0F\uFF0C\u8BBF\u95EE\u5BB9\u5668\u5185\u90E8\u7684\u7AEF\u53E3\u65F6\u4E0D\u9700\u8981\u8FDB\u884C\u7AEF\u53E3\u6620\u5C04\uFF0C\u76F4\u63A5\u8BBF\u95EE\u5373\u53EF\uFF0C\u4F46\u662F\u53EF\u80FD\u4F1A\u4E0E\u4E3B\u673A\u7684\u7AEF\u53E3\u53F7\u51B2\u7A81</li><li>none\uFF1A\u7981\u6B62\u6240\u6709\u8054\u7F51\uFF0C\u6CA1\u6709\u7F51\u7EDC\u9A71\u52A8</li></ul><h4 id="\u81EA\u5B9A\u4E49\u7F51\u7EDC" tabindex="-1"><a class="header-anchor" href="#\u81EA\u5B9A\u4E49\u7F51\u7EDC" aria-hidden="true">#</a> \u81EA\u5B9A\u4E49\u7F51\u7EDC</h4><p>\u4F7F\u7528 <code>docker network create custom-local-net</code> \u521B\u5EFA\u4E00\u4E2A\u540D\u4E3A <code>custom-local-net</code> \u7684 Docker \u7F51\u5361\uFF0C<strong>\u9ED8\u8BA4\u662F bridge \u6A21\u5F0F\u7684</strong>\uFF0C\u4F46\u662F\u548C bridge \u6A21\u5F0F\u53C8\u6709\u4E00\u5B9A\u7684\u533A\u522B</p><p>\u8FD9\u4E2A\u95EE\u9898\u5B98\u65B9\u7ED9\u51FA\u4E86\u89E3\u91CA\uFF1A</p><blockquote><p><strong>User-defined bridges provide automatic DNS resolution between containers</strong>. Containers on the default bridge network can only access each other by IP addresses, unless you use the --link option, which is considered legacy. On a user-defined bridge network, containers can resolve each other by name or alias.</p></blockquote><p>\u8FD9\u4E00\u6BB5\u8BDD\u5B98\u65B9\u7ED9\u51FA\u4E86\u4E0D\u5C11\u7684\u4FE1\u606F\u91CF\uFF1A</p><ol><li>\u7528\u6237\u81EA\u5B9A\u4E49\u7684\u7F51\u7EDC\u662F\u57FA\u4E8E bridge \u7684\uFF0C\u5E76\u4E14<strong>\u5BB9\u5668\u95F4\u53EF\u4EE5\u901A\u8FC7\u5BB9\u5668\u540D\u6216\u522B\u540D\u8FDB\u884C\u81EA\u52A8 DNS \u76F8\u4E92\u89E3\u6790\u7684\u529F\u80FD</strong>\uFF01</li><li>\u4F7F\u7528\u9ED8\u8BA4\u7684 bridge \u7F51\u7EDC\u4EC5\u4EC5\u80FD\u901A\u8FC7\u5404\u81EA\u7684 IP \u5730\u5740\u6765\u8FDB\u884C\u901A\u4FE1\uFF0C<strong>\u9664\u975E\u4F7F\u7528 <code>--link</code> \u9009\u9879</strong></li><li><strong><code>--link</code> \u9009\u9879</strong>\u5B9E\u73B0\u7684\u5BB9\u5668\u76F8\u4E92\u8BBF\u95EE\u529F\u80FD\u5DF2\u7ECF\u88AB\u5B98\u65B9\u8BA4\u5B9A<strong>\u662F\u8FC7\u65F6\u7684</strong></li></ol><p>\u7531 1. \u53EF\u4EE5\u5F97\u77E5\uFF0C\u4F7F\u7528\u81EA\u5B9A\u4E49\u7F51\u7EDC\u5C31\u80FD\u5B9E\u73B0\u5BB9\u5668\u95F4\u76F8\u4E92\u901A\u4FE1\u7684\u529F\u80FD\uFF01</p><h4 id="\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u73B0" aria-hidden="true">#</a> \u5B9E\u73B0</h4><p>\u94FA\u57AB\u4E86\u8FD9\u4E48\u591A\uFF0C\u8BE5\u5230\u5B9E\u8DF5\u9636\u6BB5\u4E86</p><p><code>custom-local-net</code> \u5DF2\u7ECF\u88AB\u521B\u5EFA\u4E86\uFF0C\u6240\u4EE5\u5728 docker-compose.yaml \u6587\u4EF6\u4E2D\u76F4\u63A5\u6307\u5B9A\u5373\u53EF</p><p>\u4E3A\u4E86\u533A\u522B\u4E8E\u4E0A\u9762\u7684\u73B0\u8C61\uFF0C\u5BF9\u670D\u52A1\u540D\u8FDB\u884C\u4E00\u5B9A\u7684\u4FEE\u6539</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220519222223.png" alt=""></p><p>\u5176\u4E2D\u5728 docker-compose.yaml \u6587\u4EF6\u4E2D\u4F7F\u7528\u5916\u90E8\u7F51\u7EDC\u9700\u8981\u58F0\u660E/\u521B\u5EFA</p><ul><li><p>\u521B\u5EFA\u5E76\u4F7F\u7528\uFF0C\u5982\u679C\u6CA1\u6709\u624B\u52A8\u4F7F\u7528 <code>docker network create</code> \u547D\u4EE4\uFF0C\u9700\u8981\u5728\u4F7F\u7528\u524D\u521B\u5EFA</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">services</span><span class="token punctuation">:</span>
	<span class="token key atrule">xxx</span><span class="token punctuation">:</span>
		<span class="token key atrule">networks</span><span class="token punctuation">:</span>
			<span class="token punctuation">-</span> new_net
<span class="token key atrule">networks</span><span class="token punctuation">:</span>
	<span class="token key atrule">new_net</span><span class="token punctuation">:</span>
		<span class="token comment"># \u58F0\u660E\u4F7F\u7528\u7684\u7F51\u7EDC\u662F\u4F7F\u7528 bridge \u9A71\u52A8\u6765\u521B\u5EFA\u7684</span>
		<span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u58F0\u660E\u5E76\u4F7F\u7528\uFF0C\u5982\u679C\u5728\u5916\u9762\u5DF2\u7ECF\u624B\u52A8\u521B\u5EFA\u4E86\u7F51\u7EDC\uFF0C\u5728 docker-compose.yaml \u6587\u4EF6\u4E2D\u53EA\u9700\u58F0\u660E\u4E00\u4E0B\u5373\u53EF</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">services</span><span class="token punctuation">:</span>
	<span class="token key atrule">xxx</span><span class="token punctuation">:</span>
		<span class="token key atrule">networks</span><span class="token punctuation">:</span>
			<span class="token punctuation">-</span> created_net
<span class="token key atrule">networks</span><span class="token punctuation">:</span>
	<span class="token key atrule">created_net</span><span class="token punctuation">:</span>
		<span class="token comment"># \u58F0\u660E\u4F7F\u7528\u7684\u7F51\u7EDC\u662F\u5916\u90E8\u521B\u5EFA\u7684</span>
		<span class="token key atrule">external</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220519223001.png" alt=""></p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220519223021.png" alt=""></p><p>\u6700\u7EC8\u4E5F\u662F\u5B9E\u73B0\u4E86\u8BBF\u95EE redismod \u7684\u7F51\u7EDC</p>`,45),c=[i];function t(r,d){return n(),s("div",null,c)}var u=e(o,[["render",t],["__file","Docker\u5BB9\u5668\u4E4B\u95F4\u901A\u4FE1.html.vue"]]);export{u as default};
