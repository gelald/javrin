import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";import{o as t,c as o,e as n}from"./app.0f4f56d8.js";const r={},s=n(`<h2 id="docker\u5BB9\u5668\u4E0E\u865A\u62DF\u673A\u5BF9\u6BD4" tabindex="-1"><a class="header-anchor" href="#docker\u5BB9\u5668\u4E0E\u865A\u62DF\u673A\u5BF9\u6BD4" aria-hidden="true">#</a> Docker\u5BB9\u5668\u4E0E\u865A\u62DF\u673A\u5BF9\u6BD4</h2><h3 id="\u5BB9\u5668\u5316\u6280\u672F" tabindex="-1"><a class="header-anchor" href="#\u5BB9\u5668\u5316\u6280\u672F" aria-hidden="true">#</a> \u5BB9\u5668\u5316\u6280\u672F</h3><p>\u8FD0\u884C\u7684\u5E94\u7528\u53CA\u5176\u5305\u542B\u7684\u6240\u6709\u8D44\u6E90\uFF0C\u90FD\u53EF\u4EE5\u79F0\u4E4B\u4E3A\u4E00\u4E2A<strong>Container</strong></p><p><strong>Docker\u90E8\u7F72\u65B9\u5F0F</strong></p><p>\u5728\u4E0D\u540C\u7684\u64CD\u4F5C\u7CFB\u7EDF\u4E2D\uFF0C<strong>Docker Engine</strong>\u5B9E\u73B0\u4E86Docker\u8DE8\u5E73\u53F0\u7684\u7279\u6027</p><p>\u6BCF\u4E00\u4E2AAPP\u5C31\u662F\u4E00\u4E2A\u6839\u636EImage\u521B\u5EFA\u51FA\u6765\u7684Container\uFF0C\u90FD\u662F\u8FD0\u884C\u5728Docker Engine\u4E4B\u4E0A</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1ggcrlngnsij30xa0ql3z4.jpg" alt=""></p><p><strong>\u865A\u62DF\u673A\u90E8\u7F72\u65B9\u5F0F</strong></p><p><strong>Hypervisor</strong>\u865A\u62DF\u5316\u6280\u672F\uFF0C\u901A\u5E38\u53EF\u4EE5\u4F7F\u7528VMware\u6765\u4F5C\u4E3A\u5B9E\u73B0\u3002</p><p>\u5728VMware\u4E2D\u5B89\u88C5\u5404\u81EA\u7684\u64CD\u4F5C\u7CFB\u7EDF\uFF0C\u7136\u540E\u8FD0\u884C\u5E94\u7528</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1ggcrm3v2mdj30xa0qldiv.jpg" alt=""></p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210519143418.png" alt=""></p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210519143736.png" alt=""></p><p><strong>\u5BB9\u5668\u865A\u62DF\u5316\u7684\u662F\u64CD\u4F5C\u7CFB\u7EDF\uFF0C\u548C\u5BBF\u4E3B\u673A\u5171\u4EAB\u5185\u6838\uFF1B\u865A\u62DF\u673A\u865A\u62DF\u5316\u7684\u662F\u786C\u4EF6\uFF08\u7F51\u5361\u7B49\uFF09\uFF0C\u5B89\u88C5\u65F6\u9700\u8981\u628A\u5B8C\u6574\u7684\u64CD\u4F5C\u7CFB\u7EDF\u5B89\u88C5\u4E0A</strong></p><h3 id="docker\u5173\u952E\u6982\u5FF5" tabindex="-1"><a class="header-anchor" href="#docker\u5173\u952E\u6982\u5FF5" aria-hidden="true">#</a> Docker\u5173\u952E\u6982\u5FF5</h3><p><strong>\u955C\u50CF</strong>\uFF1A\u955C\u50CF\u76F8\u5F53\u4E8E<strong>\u4E00\u4E2Aroot\u6587\u4EF6\u7CFB\u7EDF</strong></p><p><strong>\u5BB9\u5668</strong>\uFF1A\u955C\u50CF\u548C\u5BB9\u5668\u7684\u5173\u7CFB\uFF0C\u5C31\u50CF\u9762\u5411\u5BF9\u8C61\u4E2D\u7684\u7C7B\u548C\u5BF9\u8C61\u7684\u5173\u7CFB\uFF0C<strong>\u955C\u50CF\u662F\u9759\u6001\u7684\u5B9A\u4E49\uFF0C\u5BB9\u5668\u662F\u955C\u50CF\u8FD0\u884C\u65F6\u7684\u5B9E\u4F53</strong>\u3002\u5BB9\u5668\u53EF\u4EE5\u88AB\u521B\u5EFA\u3001\u542F\u52A8\u3001\u505C\u6B62\u3001\u5220\u9664\u7B49</p><p><strong>\u4ED3\u5E93</strong>\uFF1A\u4ED3\u5E93\u662F\u4E00\u4E2A\u4FDD\u5B58\u955C\u50CF\u7684\u5730\u65B9</p><table><thead><tr><th></th><th>Write Once Run Anywhere</th><th>\u6A21\u677F</th><th>\u5BF9\u8C61</th></tr></thead><tbody><tr><td>Java</td><td>JVM</td><td>Class</td><td>Object</td></tr><tr><td>Docker</td><td>Docker Engine</td><td>Image(\u955C\u50CF)</td><td>Container(\u5BB9\u5668)</td></tr></tbody></table><h2 id="docker\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#docker\u547D\u4EE4" aria-hidden="true">#</a> Docker\u547D\u4EE4</h2><h3 id="\u670D\u52A1\u76F8\u5173\u547D\u4EE4-daemon" tabindex="-1"><a class="header-anchor" href="#\u670D\u52A1\u76F8\u5173\u547D\u4EE4-daemon" aria-hidden="true">#</a> \u670D\u52A1\u76F8\u5173\u547D\u4EE4\uFF08daemon\uFF09</h3><p><strong>\u67E5\u770Bdocker\u670D\u52A1\u72B6\u6001</strong>\uFF1A<code>systemctl status docker</code></p><p><strong>\u542F\u52A8docker\u670D\u52A1</strong>\uFF1A<code>systemctl start docker</code></p><p><strong>\u505C\u6B62docker\u670D\u52A1</strong>\uFF1A<code>systemctl stop docker</code></p><p><strong>\u91CD\u542Fdocker\u670D\u52A1</strong>\uFF1A<code>systemctl restart docker</code></p><p><strong>\u5F00\u673A\u542F\u52A8docker</strong>\uFF1A<code>systemctl enable docker</code></p><h3 id="\u955C\u50CF\u76F8\u5173\u547D\u4EE4-image" tabindex="-1"><a class="header-anchor" href="#\u955C\u50CF\u76F8\u5173\u547D\u4EE4-image" aria-hidden="true">#</a> \u955C\u50CF\u76F8\u5173\u547D\u4EE4\uFF08image\uFF09</h3><p><strong>\u67E5\u770B\u955C\u50CF</strong>\uFF1A<code>docker images</code></p><p><strong>\u641C\u7D22\u955C\u50CF</strong>\uFF1A<code>docker search &lt;\u955C\u50CF\u540D\u79F0&gt;</code></p><p><strong>\u62C9\u53D6\u955C\u50CF</strong>\uFF1A<code>docker pull &lt;\u955C\u50CF\u540D\u79F0&gt;:&lt;\u7248\u672C\u53F7&gt;</code>\uFF0C\u7248\u672C\u53F7\u4E0D\u586B\u9ED8\u8BA4\u662Flatest</p><p><strong>\u5220\u9664\u955C\u50CF</strong>\uFF1A<code>docker rmi &lt;\u955C\u50CFid&gt;</code></p><h3 id="\u5BB9\u5668\u76F8\u5173\u547D\u4EE4-container" tabindex="-1"><a class="header-anchor" href="#\u5BB9\u5668\u76F8\u5173\u547D\u4EE4-container" aria-hidden="true">#</a> \u5BB9\u5668\u76F8\u5173\u547D\u4EE4\uFF08container\uFF09</h3><p><strong>\u521B\u5EFA\u5BB9\u5668</strong>\uFF1A<code>docker run</code></p><ul><li>-i\uFF1A\u4FDD\u6301\u5BB9\u5668\u8FD0\u884C</li><li>-t\uFF1A\u4E3A\u5BB9\u5668\u5206\u914D\u4E00\u4E2A\u4F2A\u8F93\u5165\u7EC8\u7AEF\uFF0C\u521B\u5EFA\u5B8C\u6210\u540E\u81EA\u52A8\u8FDB\u5165\u5BB9\u5668\uFF0C\u6267\u884C\u9000\u51FA\u540E\u4F1A\u5173\u95ED\u5BB9\u5668</li><li>-d\uFF1A\u4EE5\u5B88\u62A4\u6A21\u5F0F\uFF08\u540E\u53F0\uFF09\u8FD0\u884C\u3001\u521B\u5EFA\u5BB9\u5668\uFF0C\u521B\u5EFA\u5B8C\u540E\u4E0D\u4F1A\u81EA\u52A8\u8FDB\u5165\u5BB9\u5668\uFF0C\u4E14\u8FDB\u5165\u540E\u6267\u884C\u9000\u51FA\u4E0D\u4F1A\u5173\u95ED\u5BB9\u5668</li><li>-it\u521B\u5EFA\u7684\u5BB9\u5668\u4E00\u822C\u79F0\u4E3A\u4EA4\u4E92\u5F0F\u5BB9\u5668\uFF0C-id\u521B\u5EFA\u7684\u5BB9\u5668\u4E00\u822C\u79F0\u4E3A\u5B88\u62A4\u5F0F\u5BB9\u5668</li><li>--name\uFF1A\u4E3A\u5BB9\u5668\u8D77\u540D\u5B57</li></ul><hr><p><code>docker run -it --name=c1 centos:7 /bin/bash</code></p><p><code>centos:7</code>\u4EE3\u8868\u955C\u50CF</p><p><code>/bin/bash</code>\u4EE3\u8868\u8FDB\u5165\u5BB9\u5668\u521D\u59CB\u5316\u6307\u4EE4</p><hr><p><strong>\u67E5\u770B\u6B63\u5728\u8FD0\u884C\u7684\u5BB9\u5668</strong>\uFF1A<code>docker ps</code></p><p><strong>\u67E5\u770B\u6240\u6709\u5BB9\u5668</strong>\uFF1A<code>docker ps -a</code></p><p><strong>\u8FDB\u5165\u5BB9\u5668</strong>\uFF1A<code>docker exec</code></p><p>\u5982\u679C\u521B\u5EFA\u5BB9\u5668\u65F6\u4F7F\u7528\u540E\u53F0\u521B\u5EFA\u7684\u65B9\u5F0F\uFF0C\u9700\u8981\u4F7F\u7528\u8FD9\u79CD\u65B9\u5F0F\u8FDB\u5165\u5BB9\u5668</p><hr><p><code>docker exec -it c2 /bin/bash</code></p><p><code>c2</code>\u4EE3\u8868\u9700\u8981\u8FDB\u5165\u7684\u5BB9\u5668</p><p><code>/bin/bahs</code>\u4EE3\u8868\u8FDB\u5165\u5BB9\u5668\u521D\u59CB\u5316\u6307\u4EE4</p><hr><p><strong>\u505C\u6B62\u5BB9\u5668</strong>\uFF1A<code>docker stop &lt;\u5BB9\u5668\u540D\u79F0&gt;</code></p><p><strong>\u5220\u9664\u5BB9\u5668</strong>\uFF1A<code>docker rm &lt;\u5BB9\u5668id&gt;\u6216&lt;\u5BB9\u5668\u540D\u79F0&gt;</code></p><p><strong>\u67E5\u770B\u5BB9\u5668\u4FE1\u606F</strong>\uFF1A<code>docker inspect &lt;\u5BB9\u5668\u540D\u79F0&gt;</code></p><h2 id="docker\u6570\u636E\u5377" tabindex="-1"><a class="header-anchor" href="#docker\u6570\u636E\u5377" aria-hidden="true">#</a> Docker\u6570\u636E\u5377</h2><p><strong>\u6570\u636E\u5377</strong>\u662F<strong>\u5BBF\u4E3B\u673A</strong>\u4E2D\u7684\u4E00\u4E2A\u76EE\u5F55\u6216\u6587\u4EF6</p><p>\u5F53\u5BB9\u5668\u76EE\u5F55\u548C\u6570\u636E\u5377\u76EE\u5F55\u7ED1\u5B9A\u540E\uFF0C\u5BF9\u65B9\u7684<strong>\u4FEE\u6539\u4F1A\u7ACB\u5373\u540C\u6B65</strong></p><p>\u4E00\u4E2A\u6570\u636E\u5377\u53EF\u4EE5<strong>\u88AB\u591A\u4E2A\u5BB9\u5668\u540C\u65F6\u6302\u8F7D</strong></p><p>\u4E00\u4E2A\u5BB9\u5668\u53EF\u4EE5<strong>\u6302\u8F7D\u591A\u4E2A\u6570\u636E\u5377</strong></p><h3 id="\u6570\u636E\u5377\u4F5C\u7528" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u5377\u4F5C\u7528" aria-hidden="true">#</a> \u6570\u636E\u5377\u4F5C\u7528</h3><ul><li>\u5BB9\u5668\u6570\u636E<strong>\u6301\u4E45\u5316</strong></li><li>\u5916\u90E8\u673A\u5668\u548C\u5BB9\u5668<strong>\u95F4\u63A5\u901A\u4FE1</strong></li><li>\u5BB9\u5668\u4E4B\u95F4<strong>\u6570\u636E\u4EA4\u6362</strong></li></ul><h3 id="\u914D\u7F6E\u6570\u636E\u5377" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u6570\u636E\u5377" aria-hidden="true">#</a> \u914D\u7F6E\u6570\u636E\u5377</h3><p><code>docker run ... -v \u5BBF\u4E3B\u673A\u76EE\u5F55:\u5BB9\u5668\u5185\u76EE\u5F55</code></p><ul><li>\u4E24\u4E2A\u76EE\u5F55\u90FD\u5FC5\u987B\u662F<strong>\u7EDD\u5BF9\u8DEF\u5F84</strong></li><li>\u5982\u679C\u76EE\u5F55\u4E0D\u5B58\u5728\uFF0C\u90FD<strong>\u4F1A\u81EA\u52A8\u521B\u5EFA</strong></li><li>\u53EF\u4EE5\u6302\u8F7D\u591A\u4E2A\u6570\u636E\u5377\uFF0C\u5199\u591A\u4E2A-v\u5373\u53EF</li></ul><h3 id="\u6570\u636E\u5377\u5BB9\u5668" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u5377\u5BB9\u5668" aria-hidden="true">#</a> \u6570\u636E\u5377\u5BB9\u5668</h3><p>\u591A\u5BB9\u5668\u8FDB\u884C\u6570\u636E\u4EA4\u6362\u7684\u624B\u6BB5</p><ul><li>\u591A\u4E2A\u5BB9\u5668\u6302\u8F7D\u540C\u4E00\u4E2A\u6570\u636E\u5377</li><li>\u6570\u636E\u5377\u5BB9\u5668</li></ul><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210518162256.png" alt=""></p><p>c3\u5BB9\u5668\u6302\u8F7D\u4E00\u4E2A\u6570\u636E\u5377\uFF0Cc1\u3001c2\u5206\u522B\u6302\u8F7D\u5230c3\u5BB9\u5668\u4E0A</p><ol><li><p>\u521B\u5EFA\u542F\u52A8c3\u6570\u636E\u5377\u5BB9\u5668\uFF0C\u4F7F\u7528-v\u53C2\u6570 \u8BBE\u7F6E\u6570\u636E\u5377</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run -it --name<span class="token operator">=</span>c3 -v /volume centos:7 /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>/volume</code>\u662F\u5BB9\u5668\u76EE\u5F55\uFF0Cdocker\u4F1A\u9ED8\u8BA4\u5728\u5BBF\u4E3B\u673A\u4E0A\u5206\u914D\u4E00\u4E2A\u76EE\u5F55\uFF0C\u53EF\u4EE5\u901A\u8FC7<code>docker inspect</code>\u6765\u67E5\u770B</p></li><li><p>\u521B\u5EFA\u542F\u52A8c1\u3001c2\u5BB9\u5668\uFF0C\u4F7F\u7528--volumes-from\u53C2\u6570 \u8BBE\u7F6E\u6570\u636E\u5377</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run -it --name<span class="token operator">=</span>c1 --volumes-from c3 centos:7 /bin/bash
<span class="token function">docker</span> run -it --name<span class="token operator">=</span>c2 --volumes-from c3 centos:7 /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u521B\u5EFA\u540E\uFF0Cc1\u3001c2\u5BB9\u5668\u4E2D\u90FD\u6709\u4E00\u4E2A\u540D\u53EB<code>/volume</code>\u7684\u76EE\u5F55</p><p>\u901A\u8FC7<code>docker inspect</code>\u547D\u4EE4\u53EF\u4EE5\u770B\u5230<strong>c1\u3001c2\u5BBF\u4E3B\u673A\u7684\u6570\u636E\u5377\u548Cc3\u9ED8\u8BA4\u5206\u914D\u7684\u76EE\u5F55\u662F\u540C\u4E00\u4E2A\u76EE\u5F55</strong>\uFF0C\u6240\u4EE5<strong>\u5373\u4F7Fc3\u5BB9\u5668\u6302\u4E86\uFF0C\u4E5F\u4E0D\u4F1A\u5F71\u54CDc1\u3001c2\u5BB9\u5668\u7684\u6B63\u5E38\u4F7F\u7528</strong>\u7684\uFF0C\u56E0\u4E3A\u6700\u7EC8\u662F\u6307\u5411\u4E86\u540C\u4E00\u4E2A\u5BBF\u4E3B\u673A\u7684\u76EE\u5F55</p></li></ol><h2 id="dockerfile" tabindex="-1"><a class="header-anchor" href="#dockerfile" aria-hidden="true">#</a> Dockerfile</h2><p><strong>\u7528\u4E8E\u6253\u5305docker\u955C\u50CF</strong></p><h3 id="linux\u6587\u4EF6\u7CFB\u7EDF\u7EC4\u6210" tabindex="-1"><a class="header-anchor" href="#linux\u6587\u4EF6\u7CFB\u7EDF\u7EC4\u6210" aria-hidden="true">#</a> Linux\u6587\u4EF6\u7CFB\u7EDF\u7EC4\u6210</h3><p>\u7531<strong>bootfs</strong>\u548C<strong>rootfs</strong>\u7EC4\u6210</p><p>bootfs\uFF1A\u5305\u542Bbootloader\uFF08\u5F15\u5BFC\u52A0\u8F7D\u7A0B\u5E8F\uFF09\u548Ckernel\uFF08\u5185\u6838\uFF09</p><p>rootfs\uFF1Aroot\u6587\u4EF6\u7CFB\u7EDF\uFF0C\u5305\u542B\u7684\u662F\u5178\u578B\u7684Linux\u7CFB\u7EDF\u4E2D\u7684/dev\u3001/bin\u3001/etc\u7B49\u76EE\u5F55\u548C\u6587\u4EF6</p><p><strong>\u4E0D\u540C\u7684Linux\u53D1\u884C\u7248\u5982CentOS\u3001Ubuntu\u7B49\uFF0C\u5B83\u4EEC\u7684bootfs\u5927\u81F4\u76F8\u540C\uFF0C\u4E0D\u540C\u7684\u5730\u65B9\u4E3B\u8981\u5728\u4E8Erootfs</strong></p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210518211856.png" alt=""></p><h3 id="docker\u955C\u50CF\u7EC4\u6210" tabindex="-1"><a class="header-anchor" href="#docker\u955C\u50CF\u7EC4\u6210" aria-hidden="true">#</a> Docker\u955C\u50CF\u7EC4\u6210</h3><p>Docker\u955C\u50CF\u7531<strong>\u7279\u6B8A\u7684</strong>\u6587\u4EF6\u7CFB\u7EDF<strong>\u53E0\u52A0</strong>\u800C\u6210\uFF0C\u672C\u8D28\u662F\u4E00\u4E2A\u5206\u5C42\u7684\u6587\u4EF6\u7CFB\u7EDF</p><ul><li>\u6700\u5E95\u7AEF\u7684\u662Fbootfs\uFF0C\u4F46\u662F\u662F<strong>\u4F7F\u7528\u5BBF\u4E3B\u673A\u7684bootfs</strong>\uFF0C\u6240\u4EE5docker\u5B89\u88C5\u65F6\u9700\u8981\u9009\u62E9\u64CD\u4F5C\u7CFB\u7EDF\uFF0C\u56E0\u4E3A\u4E0D\u540C\u7684\u64CD\u4F5C\u7CFB\u7EDF\uFF0Cbootfs\u4E0D\u540C</li><li>\u7B2C\u4E8C\u5C42\u662Froot\u6587\u4EF6\u7CFB\u7EDF\uFF0C\u79F0\u4E3A<strong>base image</strong>\u57FA\u7840\u955C\u50CF\uFF08CentOS\u3001Ubuntu\uFF09</li><li>\u7136\u540E\u518D\u5F80\u4E0A\u53EF\u4EE5\u53E0\u52A0\u81EA\u8EAB\u955C\u50CF\u9700\u8981\u7684\u955C\u50CF\u6587\u4EF6</li></ul><p><strong>Tomcat\u955C\u50CF\u4E3A\u4F8B</strong>\uFF1A</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210518212742.png" alt=""></p><p><strong>\u5176\u4E2Djdk\u955C\u50CF\u3001rootfs\u57FA\u7840\u955C\u50CF\u662F\u53EF\u4EE5\u590D\u7528\u7684\uFF0C\u5F53\u5176\u4ED6\u955C\u50CF\u540C\u6837\u9700\u8981\u8FD9\u4E9B\u955C\u50CF\u65F6\u65E0\u9700\u91CD\u590D\u4E0B\u8F7D\uFF0C\u53EF\u4EE5\u590D\u7528</strong></p><ul><li>\u7EDF\u4E00\u6587\u4EF6\u7CFB\u7EDF\u6280\u672F\u80FD\u591F\u5C06\u4E0D\u540C\u7684\u5C42\u6574\u5408\u6210\u4E00\u4E2A\u6587\u4EF6\u7CFB\u7EDF\uFF0C\u4E3A\u8FD9\u4E9B\u5C42\u63D0\u4F9B\u4E86\u4E00\u4E2A\u7EDF\u4E00\u7684\u89C6\u89D2\uFF0C\u8FD9\u6837\u5C31\u9690\u85CF\u4E86\u591A\u5C42\u7684\u5B58\u5728\uFF0C\u5728\u7528\u6237\u770B\u6765\uFF0C\u53EA\u5B58\u5728\u4E00\u4E2A\u6587\u4EF6\u7CFB\u7EDF</li><li>\u955C\u50CF\u90FD\u662F<strong>\u53EA\u8BFB</strong>\u7684\uFF0C\u56E0\u4E3A\u8981<strong>\u8FBE\u5230\u590D\u7528\u955C\u50CF\u7684\u76EE\u7684</strong>\u3002\u5F53\u4ECE\u4E00\u4E2A\u955C\u50CF\u542F\u52A8\u65F6\uFF0CDocker\u4F1A\u5728\u6700\u9876\u5C42\u52A0\u8F7D\u4E00\u4E2A<strong>\u53EF\u8BFB\u5199\u7684\u6587\u4EF6\u7CFB\u7EDF</strong>\u4F5C\u4E3A\u5BB9\u5668\uFF0C\u7528\u6237\u53EF\u4EE5\u5728\u5BB9\u5668\u91CC\u9762\u8FDB\u884C\u9700\u8981\u7684\u4FEE\u6539</li></ul><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210518213610.png" alt=""></p><h3 id="\u955C\u50CF\u5236\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u955C\u50CF\u5236\u4F5C" aria-hidden="true">#</a> \u955C\u50CF\u5236\u4F5C</h3><ul><li><p>\u5BB9\u5668\u8F6C\u4E3A\u955C\u50CF</p><p>\u5982\uFF1Atomcat\u5BB9\u5668\u8FDB\u884C<strong>\u5B9A\u5236\u4FEE\u6539\u540E</strong>\uFF0C\u91CD\u65B0\u8F6C\u6362\u6210\u65B0\u7684\u955C\u50CF\u3002\u4F46\u662F\u6302\u8F7D\u76EE\u5F55\u8FD9\u4E2A\u4FEE\u6539\u4E0D\u80FD\u8F6C\u79FB\u5230\u65B0\u7684\u955C\u50CF\u4E2D\u53BB\uFF0C\u56E0\u4E3A\u6302\u8F7D\u76EE\u5F55\u662F\u542F\u52A8\u5BB9\u5668\u65F6\u6307\u5B9A\u7684</p><p><code>docker commit &lt;\u5BB9\u5668id&gt; &lt;\u65B0\u955C\u50CF\u7684\u540D\u79F0&gt;:&lt;\u7248\u672C\u53F7&gt;</code></p><p>docker\u955C\u50CF\u8F6C\u6362\u6210\u538B\u7F29\u6587\u4EF6</p><p><code>docker save -o &lt;\u538B\u7F29\u6587\u4EF6\u540D\u79F0&gt; &lt;\u955C\u50CF\u540D\u79F0&gt;:&lt;\u7248\u672C\u53F7&gt; </code></p><p>\u538B\u7F29\u6587\u4EF6\u8FD8\u539F\u6210docker\u955C\u50CF</p><p><code>docker load -i &lt;\u538B\u7F29\u6587\u4EF6\u540D\u79F0&gt;</code></p></li><li><p>Dockerfile</p><p>Dockerfile\u5305\u542B\u4E86\u8BB8\u591A\u6307\u4EE4\uFF0C\u6BCF\u4E00\u6761\u6307\u4EE4\u6784\u5EFA\u4E00\u5C42\u955C\u50CF\uFF0C\u57FA\u4E8E\u57FA\u7840\u955C\u50CF\uFF0C\u6700\u7EC8\u6784\u5EFA\u51FA\u4E00\u4E2A\u65B0\u7684\u955C\u50CF</p><p><strong>\u53EF\u4EE5\u4E3A\u56E2\u961F\u63D0\u4F9B\u4E00\u4E2A\u5B8C\u5168\u4E00\u81F4\u7684\u5F00\u53D1\u73AF\u5883</strong></p></li></ul><h3 id="dockerfile\u5173\u952E\u5B57" tabindex="-1"><a class="header-anchor" href="#dockerfile\u5173\u952E\u5B57" aria-hidden="true">#</a> Dockerfile\u5173\u952E\u5B57</h3><table><thead><tr><th>\u5173\u952E\u5B57</th><th>\u4F5C\u7528</th><th>\u5907\u6CE8</th></tr></thead><tbody><tr><td>FROM</td><td>\u6307\u5B9A\u7236\u955C\u50CF</td><td>\u6307\u5B9ADockerfile\u57FA\u4E8E\u54EA\u4E2A\u955C\u50CF\u8FDB\u884C\u6784\u5EFA</td></tr><tr><td>MAINTAINER</td><td>\u4F5C\u8005\u4FE1\u606F</td><td>\u7528\u4E8E\u6807\u660E\u8FD9\u4E2ADockerfile\u662F\u8C01\u6765\u7EF4\u62A4\u7684</td></tr><tr><td>LABEL</td><td>\u6807\u7B7E</td><td>\u4E00\u822C\u6BD4\u8F83\u5C11\u7528</td></tr><tr><td>RUN</td><td>\u6267\u884C\u547D\u4EE4</td><td>\u6267\u884C\u4E00\u6BB5Linux\u547D\u4EE4\uFF0C\u9ED8\u8BA4\u662F/bin/sh\uFF0C\u683C\u5F0F\u4E3A RUN command<br>\u6216\u8005RUN [&quot;command&quot;, &quot;param1&quot;, &quot;param2&quot;]</td></tr><tr><td>CMD</td><td>\u5BB9\u5668\u542F\u52A8\u65F6\u6267\u884C\u7684\u547D\u4EE4</td><td>\u683C\u5F0F\u4E3ACMD command\u6216\u8005CMD [&quot;command&quot;, &quot;param1&quot;, &quot;param2&quot;]</td></tr><tr><td>ENTRYPOINT</td><td>\u5165\u53E3</td><td>\u4E00\u822C\u5728\u5236\u4F5C\u4E00\u4E9B<strong>\u6267\u884C\u5C31\u5173\u95ED</strong>\u7684\u5BB9\u5668\u4E2D\u4F1A\u4F7F\u7528</td></tr><tr><td>ADD</td><td>\u6DFB\u52A0\u6587\u4EF6</td><td>\u6784\u5EFA\u955C\u50CF\u65F6\u628A\u6587\u4EF6\u6DFB\u52A0\u5230\u955C\u50CF\u4E2D\uFF0C\u4E0D\u4EC5\u662F\u5F53\u524D\u4E0A\u4E0B\u6587\uFF0C\u8FD8\u53EF\u4EE5\u6765\u81EA\u8FDC\u7A0B\u670D\u52A1</td></tr><tr><td>ENV</td><td>\u8BBE\u7F6E\u73AF\u5883\u53D8\u91CF</td><td>\u6307\u5B9A\u6784\u5EFA\u955C\u50CF\u65F6\u7684\u73AF\u5883\u53D8\u91CF\uFF0C\u4E5F\u53EF\u4EE5\u5728\u542F\u52A8\u5BB9\u5668\u65F6\u8FDB\u884C\u8986\u76D6\uFF0C<br>\u683C\u5F0F EVN name=value</td></tr><tr><td>ARG</td><td>\u6784\u5EFA\u53C2\u6570</td><td>\u53EA\u5728\u6784\u5EFA\u65F6\u4F7F\u7528\u7684\u53C2\u6570\uFF0C\u5982\u679C\u548CENV\u540C\u540D\uFF0C\u90A3\u4E48ENV\u4F1A\u59CB\u7EC8\u8986\u76D6</td></tr><tr><td>VOLUME</td><td>\u5B9A\u4E49\u5916\u90E8\u53EF\u4EE5\u6302\u8F7D\u7684\u6570\u636E\u5377</td><td>\u683C\u5F0F VOLUME [&quot;\u76EE\u5F55&quot;]</td></tr><tr><td>EXPOSE</td><td>\u66B4\u9732\u7AEF\u53E3</td><td>\u683C\u5F0F EXPOSE \u7AEF\u53E3\u53F7</td></tr><tr><td>WORKDIR</td><td>\u5DE5\u4F5C\u76EE\u5F55</td><td>\u8FDB\u5165\u5BB9\u5668\u5185\u90E8\u65F6\uFF0C\u5F53\u524D\u6240\u5728\u7684\u4F4D\u7F6E</td></tr></tbody></table><h4 id="\u81EA\u5B9A\u4E49centos" tabindex="-1"><a class="header-anchor" href="#\u81EA\u5B9A\u4E49centos" aria-hidden="true">#</a> \u81EA\u5B9A\u4E49CentOS</h4><ol><li>\u767B\u9646\u540E\u7684\u76EE\u5F55\u4E3A<code>/usr</code></li><li>\u80FD\u4F7F\u7528<code>vim</code></li></ol><p>\u5B9E\u73B0\uFF1A</p><div class="language-docker ext-docker line-numbers-mode"><pre class="language-docker"><code><span class="token comment">#\u5B9A\u4E49\u7236\u955C\u50CF</span>
<span class="token instruction"><span class="token keyword">FROM</span> centos:7</span>
<span class="token comment">#\u5B9A\u4E49\u4F5C\u8005\u4FE1\u606F</span>
<span class="token instruction"><span class="token keyword">MAINTAINER</span> wuyb &lt;wuyb13411012303@yeah.net&gt;</span>
<span class="token comment">#\u5B89\u88C5vim</span>
<span class="token instruction"><span class="token keyword">RUN</span> yum install -y vim</span>
<span class="token comment">#\u5B9A\u4E49\u9ED8\u8BA4\u7684\u5DE5\u4F5C\u76EE\u5F55</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /usr</span>
<span class="token comment">#\u5B9A\u4E49\u5BB9\u5668\u542F\u52A8\u6267\u884C\u547D\u4EE4</span>
<span class="token instruction"><span class="token keyword">CMD</span> /bin/bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker\u670D\u52A1\u7F16\u6392" tabindex="-1"><a class="header-anchor" href="#docker\u670D\u52A1\u7F16\u6392" aria-hidden="true">#</a> Docker\u670D\u52A1\u7F16\u6392</h2><h3 id="\u670D\u52A1\u7F16\u6392" tabindex="-1"><a class="header-anchor" href="#\u670D\u52A1\u7F16\u6392" aria-hidden="true">#</a> \u670D\u52A1\u7F16\u6392</h3><p>\u6309\u7167\u4E00\u5B9A\u7684\u4E1A\u52A1\u89C4\u5219\u6279\u91CF\u7BA1\u7406\u5BB9\u5668</p><h3 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose" aria-hidden="true">#</a> Docker Compose</h3><p>Docker Compose\u662F\u4E00\u4E2A\u7F16\u6392\u591A\u5BB9\u5668\u5206\u5E03\u5F0F\u90E8\u7F72\u7684\u5DE5\u5177\uFF0C\u63D0\u4F9B\u547D\u4EE4\u96C6\u7BA1\u7406\u5BB9\u5668\u5316\u5E94\u7528\u7684\u5B8C\u6574\u5F00\u53D1\u5468\u671F\uFF0C\u5305\u62EC\u670D\u52A1\u6784\u5EFA\uFF0C\u542F\u52A8\u548C\u505C\u6B62</p><ol><li>\u4F7F\u7528Dockerfile\u5B9A\u4E49\u8FD0\u884C\u73AF\u5883\u955C\u50CF</li><li>\u4F7F\u7528docker-compose.yml\u5B9A\u4E49\u7EC4\u6210\u5E94\u7528\u7684\u5404\u4E2A\u670D\u52A1</li><li>\u8FD0\u884Cdocker-compose up\u542F\u52A8\u5E94\u7528</li></ol>`,97),d=[s];function a(c,i){return t(),o("div",null,d)}var g=e(r,[["render",a],["__file","Docker.html.vue"]]);export{g as default};
