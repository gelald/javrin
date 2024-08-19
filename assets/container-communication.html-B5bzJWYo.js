import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as a,a as n}from"./app-D62f3oGG.js";const e={},l=n(`<h1 id="如何让docker容器之间进行相互访问" tabindex="-1"><a class="header-anchor" href="#如何让docker容器之间进行相互访问"><span>如何让Docker容器之间进行相互访问</span></a></h1><h2 id="问题引入" tabindex="-1"><a class="header-anchor" href="#问题引入"><span>问题引入</span></a></h2><p>之前在找 Redis 好看的 GUI ，发现了 Redis 自家的 WebGUI「RedisInsight」还支持 Docker 部署 (1.11.1版本)，打算使用 Docker Compose 来启动 Redis 和 RedisInsight</p><blockquote><p>最近「RedisInsight」2.x版本的桌面客户端已经推出了，可以看这篇文章了解 👉<a href="https://juejin.cn/post/7072537112834211847" target="_blank" rel="noopener noreferrer">颜值爆表！Redis官方可视化工具来啦，功能真心强大！</a></p></blockquote><p>我们进入正题</p><p>因为我喜欢用 docker compose 来运行容器，所以这次问题也由我的两份 docker-compose.yaml 文件开始</p><blockquote><p>左边是 RedisInsight，右边是 Redis 的完全体—— RedisMod</p></blockquote><table><thead><tr><th>redismod容器</th><th>redisinsight容器</th></tr></thead><tbody><tr><td><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220916153156.png" alt=""></td><td><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220916153251.png" alt=""></td></tr></tbody></table><p>启动后，进入 RedisInsight 打算连接本地的 Redis，发现无法使用 127.0.0.1:6379 连接 Redis。</p><p>因为虽然宿主机可以通过 127.0.0.1:6379 连接 Redis，因为 Redis 容器通过端口映射的方式把 6379 端口映射到宿主机上；但是对于 RedisInsight 容器来说，是无法通过 127.0.0.1 这个网络连接的，因为 Redis 不是在 RedisInsight 容器内启动，而且端口也不是向它映射，需要拿到 Redis 容器的 IP 地址才能正确连接。通过 docker inspect 容器id 可以看到两个容器的 IP地址：</p><table><thead><tr><th>redismod容器IP地址</th><th>redisinsight容器IP地址</th></tr></thead><tbody><tr><td><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220915174403.png" alt=""></td><td><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220915174151.png" alt=""></td></tr></tbody></table><p>虽然可以使用宿主机的 IP 地址进行连接，但是 IP 地址不能保证不变，写一个固定的值也不灵活。那有没有什么办法可以让两个容器互相连通互相访问的同时还保持一定的灵活性呢？答案自然是有的。</p><h2 id="前置知识" tabindex="-1"><a class="header-anchor" href="#前置知识"><span>前置知识</span></a></h2><blockquote><p>先回顾一下 Docker 的网卡</p></blockquote><h3 id="docker-网卡介绍" tabindex="-1"><a class="header-anchor" href="#docker-网卡介绍"><span>Docker 网卡介绍</span></a></h3><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220517230048.png" alt=""></p><ul><li>bridge：默认网卡，类似于 VMware 的 NAT 模式，如果需要访问容器内部的端口需要进行端口映射。</li><li>host：直接使用主机网络，类似于 VMware 的桥接模式，访问容器内部的端口时不需要进行端口映射，直接访问即可，但是可能会与主机的端口号冲突。</li><li>none：禁止所有联网，没有网络驱动。</li></ul><h3 id="自定义网络" tabindex="-1"><a class="header-anchor" href="#自定义网络"><span>自定义网络</span></a></h3><p>使用 <code>docker network create custom-local-net</code> 创建一个名为 custom-local-net 的 Docker 网卡，<strong>这个网卡是基于 bridge 模式的</strong>，但是和 bridge 模式又有一定的区别。</p><p>这个问题官方给出了解释：</p><blockquote><p><strong>User-defined bridges provide automatic DNS resolution between containers</strong>. Containers on the default bridge network can only access each other by IP addresses, unless you use the --link option, which is considered legacy. On a user-defined bridge network, containers can resolve each other by name or alias.</p></blockquote><p>这一段话官方给出了不少的信息量：</p><ol><li>用户自定义的网络是基于 bridge 的，并且<strong>容器间可以通过容器名或别名进行自动 DNS 相互解析的功能</strong>！</li><li>使用默认的 bridge 网络仅仅能通过各自的 IP 地址来进行通信，<strong>除非使用 <code>--link</code> 选项</strong></li><li><strong><code>--link</code> 选项</strong>实现的容器相互访问功能已经被官方认定<strong>是过时的</strong></li></ol><p>由第 1 点可以得知，使用自定义网络就能实现容器间相互通信的功能！</p><h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案"><span>解决方案</span></a></h2><h3 id="docker-run-使用-link-参数" tabindex="-1"><a class="header-anchor" href="#docker-run-使用-link-参数"><span>docker run 使用 link 参数</span></a></h3><p>在不使用 Docker Compose 的时候，在启动命令中加入 <code>--link</code> 参数，就可以实现容器之间的访问</p><ul><li><p>启动 redismod 容器</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> run</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --rm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --name</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> redismod</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -p</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 6379:6379</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -v</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /data/:/data</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -d</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> redislabs/redismod:latest</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li><p>启动 redisinsight容器</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> run</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --rm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --name</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> redisinsight</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -p</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 8001:8001</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -v</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /db:/db</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --link</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> redismod</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -d</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> redislabs/redisinsight:latest</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li></ul><p>使用 <code>--link</code> 中指定的 <code>redismod</code> 即可映射到 redismod 的容器网络中。</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220915175803.png" alt=""></p><p>然后在 Host 处填写 [redismod] 就可以自动解析为 redismod 容器的 IP 地址。</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220517233054.png" alt=""></p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/image-20220517233113573.png" alt="image-20220517233113573"></p><p>可以看到是连接成功的</p><h3 id="使用同一份-docker-compose-yaml-文件" tabindex="-1"><a class="header-anchor" href="#使用同一份-docker-compose-yaml-文件"><span>使用同一份 docker-compose.yaml 文件</span></a></h3><p>相比使用 docker run 命令启动容器，显然 docker compose 才是<strong>更为推荐</strong>的那一个方式，把启动所需的镜像、环境等全都写到一份 docker-compose.yaml 文件中，方便使用。</p><p>如果使用 docker compose 的方式，就是把两个容器的启动信息都<strong>写到同一份文件中</strong>，再在需要依赖另一个容器的容器启动信息中加入 depends_on、links 参数，这样 redisinsight 也可以使用 redismod 解析到其容器的 IP地址，得到的结果和上面使用 docker run 的方式得到的结果是一样的。</p><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;3&#39;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">services</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  redismod</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    image</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">redislabs/redismod:latest</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    ports</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">6379:6379</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    volumes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">/redismod/data:/data</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  redisinsight</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    image</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">redislabs/redisinsight:latest</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    ports</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">8001:8001</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    volumes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">/redisinsight/db:/db</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-run-使用自定义网络" tabindex="-1"><a class="header-anchor" href="#docker-run-使用自定义网络"><span>docker run 使用自定义网络</span></a></h3><p>在上面我们简单地介绍了一下如何自定义网络，并且知道使用 <code>link</code> 参数的方式已经是过时的，那通过自定义网络，让 Redis 容器和 RedisInsight 容器处于同一个网络，并且他们可以互相进行 DNS 解析，就可以让 RedisInsight 访问到 Redis 容器了。</p><p>另外，docker run 命令也可以手动指定容器连接的网络，使用 <code>network</code> 参数。</p><ul><li><p>自定义网络 custom-local-net</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> network</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> custom-local-net</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li><p>启动 redismod 容器</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> run</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --rm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --name</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> redismod</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -p</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 6379:6379</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -v</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /redismod/data:/data</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --network</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> custom-local-net</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -d</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> redislabs/redismod:latest</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li><p>启动 redisinsight 容器</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> run</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --rm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --name</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> redisinsight</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -p</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 8001:8001</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -v</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /redisinsight/db:/db</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --network</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> custom-local-net</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -d</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> redislabs/redisinsight:latest</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li></ul><p>进入 redisinsight 容器中 ping redismod 发现是能 ping 通的，在控制台中自然也能通过 redismod 作为 host 来连接 redis 数据库。</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220916145505.png" alt=""></p><h3 id="docker-compose-使用自定义网络" tabindex="-1"><a class="header-anchor" href="#docker-compose-使用自定义网络"><span>docker compose 使用自定义网络</span></a></h3><p>使用同一份 docker-compose.yaml 文件的方法虽然可行，但是还存在一定的局限性，假如需要链接一个使用 docker run 运行的容器，又怎么样实现互相访问呢？或者如果是这个需要容器本就处于一个已创建的自定义网络呢？</p><p>另外使用 docker run 能指定自定义网络，docker compose 自然也是可以的，通过 <code>networks</code> 指令。custom-local-net 网络已经被创建了，所以在 docker-compose.yaml 文件中直接指定即可。</p><p>其中在 docker-compose.yaml 文件中有两种使用自定义网络的方式：</p><ul><li>创建并使用，如果没有手动使用 <code>docker network create</code> 命令，需要在使用前创建</li></ul><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;3&#39;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">services</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  redisinsight-local-net</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    image</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">redislabs/redisinsight:latest</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    ports</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">8001:8001</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    volumes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">/redisinsight/db:/db</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    networks</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">custom-local-net-2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  redismod-local-net</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    image</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">redislabs/redismod:latest</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    ports</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">6379:6379</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    volumes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">/redismod/data:/data</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    networks</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">custom-local-net-2</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">networks</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  custom-local-net-2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">    # claim that this network in base on bridge driver</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    driver</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">bridge</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    ipam</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      config</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">subnet</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">172.25.64.0/18</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">gateway</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">172.25.64.1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>声明并使用，如果已经手动创建了网络，在 docker-compose.yaml 文件中只需声明一下即可</li></ul><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;3&#39;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">services</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  redisinsight-local-net</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    image</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">redislabs/redisinsight:latest</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    ports</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">8001:8001</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    volumes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">/redisinsight/db:/db</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    networks</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">custom-local-net</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  redismod-local-net</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    image</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">redislabs/redismod:latest</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    ports</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">6379:6379</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    volumes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">/redismod/data:/data</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    networks</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">custom-local-net</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">networks</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  custom-local-net</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">    # claim that this network is defined outside</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    external</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">true</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220519223001.png" alt=""></p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220519223021.png" alt=""></p><p>最终也是实现了访问 redismod 的网络</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>Docker 容器之间相互访问是实际生产中难以绕开的一道坎，诚然可以使用桥接模式，但是桥接模式不太利于环境的迁移。显然使用能自动完成 DNS 解析的网络模式会更为灵活，也更为优雅。</p><p>参考资料</p><p><a href="https://blog.csdn.net/weixin_48447848/article/details/122631699" target="_blank" rel="noopener noreferrer">【Docker系列】Docker Compose 网络_小叶柏杉的博客-CSDN博客_docker-compose 网络模式</a></p>`,59),t=[l];function h(p,d){return a(),i("div",null,t)}const c=s(e,[["render",h],["__file","container-communication.html.vue"]]),o=JSON.parse('{"path":"/writings/container/container-communication.html","title":"Docker容器通信","lang":"zh-CN","frontmatter":{"title":"Docker容器通信","icon":"article","category":["问题解决","容器技术"],"tag":["Docker","网络"],"description":"如何让Docker容器之间进行相互访问 问题引入 之前在找 Redis 好看的 GUI ，发现了 Redis 自家的 WebGUI「RedisInsight」还支持 Docker 部署 (1.11.1版本)，打算使用 Docker Compose 来启动 Redis 和 RedisInsight 最近「RedisInsight」2.x版本的桌面客户端已...","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/container/container-communication.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"Docker容器通信"}],["meta",{"property":"og:description","content":"如何让Docker容器之间进行相互访问 问题引入 之前在找 Redis 好看的 GUI ，发现了 Redis 自家的 WebGUI「RedisInsight」还支持 Docker 部署 (1.11.1版本)，打算使用 Docker Compose 来启动 Redis 和 RedisInsight 最近「RedisInsight」2.x版本的桌面客户端已..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220916153156.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-06T11:27:34.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:tag","content":"Docker"}],["meta",{"property":"article:tag","content":"网络"}],["meta",{"property":"article:modified_time","content":"2024-01-06T11:27:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Docker容器通信\\",\\"image\\":[\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220916153156.png\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220916153251.png\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220915174403.png\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220915174151.png\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220517230048.png\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220915175803.png\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220517233054.png\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/image-20220517233113573.png\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220916145505.png\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220519223001.png\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220519223021.png\\"],\\"dateModified\\":\\"2024-01-06T11:27:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"问题引入","slug":"问题引入","link":"#问题引入","children":[]},{"level":2,"title":"前置知识","slug":"前置知识","link":"#前置知识","children":[{"level":3,"title":"Docker 网卡介绍","slug":"docker-网卡介绍","link":"#docker-网卡介绍","children":[]},{"level":3,"title":"自定义网络","slug":"自定义网络","link":"#自定义网络","children":[]}]},{"level":2,"title":"解决方案","slug":"解决方案","link":"#解决方案","children":[{"level":3,"title":"docker run 使用 link 参数","slug":"docker-run-使用-link-参数","link":"#docker-run-使用-link-参数","children":[]},{"level":3,"title":"使用同一份 docker-compose.yaml 文件","slug":"使用同一份-docker-compose-yaml-文件","link":"#使用同一份-docker-compose-yaml-文件","children":[]},{"level":3,"title":"docker run 使用自定义网络","slug":"docker-run-使用自定义网络","link":"#docker-run-使用自定义网络","children":[]},{"level":3,"title":"docker compose 使用自定义网络","slug":"docker-compose-使用自定义网络","link":"#docker-compose-使用自定义网络","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":null,"updatedTime":1704540454000,"contributors":[{"name":"wuyingbin","email":"yb.ng@foxmail.com","commits":2},{"name":"gelald","email":"37375083+gelald@users.noreply.github.com","commits":1},{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":6.2,"words":1860},"filePathRelative":"writings/container/container-communication.md","autoDesc":true}');export{c as comp,o as data};
