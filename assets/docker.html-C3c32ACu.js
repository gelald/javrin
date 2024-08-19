import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as s,a as i}from"./app-D62f3oGG.js";const n={},a=i(`<h1 id="docker基础知识" tabindex="-1"><a class="header-anchor" href="#docker基础知识"><span>Docker基础知识</span></a></h1><h2 id="docker容器与虚拟机对比" tabindex="-1"><a class="header-anchor" href="#docker容器与虚拟机对比"><span>Docker容器与虚拟机对比</span></a></h2><h3 id="容器化技术" tabindex="-1"><a class="header-anchor" href="#容器化技术"><span>容器化技术</span></a></h3><p>运行的应用及其包含的所有资源，都可以称之为一个<strong>Container</strong></p><p><strong>Docker部署方式</strong></p><p>在不同的操作系统中，<strong>Docker Engine</strong>实现了Docker跨平台的特性</p><p>每一个APP就是一个根据Image创建出来的Container，都是运行在Docker Engine之上</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1ggcrlngnsij30xa0ql3z4.jpg" alt=""></p><p><strong>虚拟机部署方式</strong></p><p><strong>Hypervisor</strong>虚拟化技术，通常可以使用VMware来作为实现。</p><p>在VMware中安装各自的操作系统，然后运行应用</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1ggcrm3v2mdj30xa0qldiv.jpg" alt=""></p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210519143418.png" alt=""></p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210519143736.png" alt=""></p><p><strong>容器虚拟化的是操作系统，和宿主机共享内核；虚拟机虚拟化的是硬件（网卡等），安装时需要把完整的操作系统安装上</strong></p><h3 id="docker关键概念" tabindex="-1"><a class="header-anchor" href="#docker关键概念"><span>Docker关键概念</span></a></h3><p><strong>镜像</strong>：镜像相当于<strong>一个root文件系统</strong></p><p><strong>容器</strong>：镜像和容器的关系，就像面向对象中的类和对象的关系，<strong>镜像是静态的定义，容器是镜像运行时的实体</strong>。容器可以被创建、启动、停止、删除等</p><p><strong>仓库</strong>：仓库是一个保存镜像的地方</p><table><thead><tr><th></th><th>Write Once Run Anywhere</th><th>模板</th><th>对象</th></tr></thead><tbody><tr><td>Java</td><td>JVM</td><td>Class</td><td>Object</td></tr><tr><td>Docker</td><td>Docker Engine</td><td>Image(镜像)</td><td>Container(容器)</td></tr></tbody></table><h2 id="docker命令" tabindex="-1"><a class="header-anchor" href="#docker命令"><span>Docker命令</span></a></h2><h3 id="服务相关命令-daemon" tabindex="-1"><a class="header-anchor" href="#服务相关命令-daemon"><span>服务相关命令（daemon）</span></a></h3><p><strong>查看docker服务状态</strong>：<code>systemctl status docker</code></p><p><strong>启动docker服务</strong>：<code>systemctl start docker</code></p><p><strong>停止docker服务</strong>：<code>systemctl stop docker</code></p><p><strong>重启docker服务</strong>：<code>systemctl restart docker</code></p><p><strong>开机启动docker</strong>：<code>systemctl enable docker</code></p><h3 id="镜像相关命令-image" tabindex="-1"><a class="header-anchor" href="#镜像相关命令-image"><span>镜像相关命令（image）</span></a></h3><p><strong>查看镜像</strong>：<code>docker images</code></p><p><strong>搜索镜像</strong>：<code>docker search &lt;镜像名称&gt;</code></p><p><strong>拉取镜像</strong>：<code>docker pull &lt;镜像名称&gt;:&lt;版本号&gt;</code>，版本号不填默认是latest</p><p><strong>删除镜像</strong>：<code>docker rmi &lt;镜像id&gt;</code></p><h3 id="容器相关命令-container" tabindex="-1"><a class="header-anchor" href="#容器相关命令-container"><span>容器相关命令（container）</span></a></h3><p><strong>创建容器</strong>：<code>docker run</code></p><ul><li>-i：保持容器运行</li><li>-t：为容器分配一个伪输入终端，创建完成后自动进入容器，执行退出后会关闭容器</li><li>-d：以守护模式（后台）运行、创建容器，创建完后不会自动进入容器，且进入后执行退出不会关闭容器</li><li>-it创建的容器一般称为交互式容器，-id创建的容器一般称为守护式容器</li><li>--name：为容器起名字</li></ul><hr><p><code>docker run -it --name=c1 centos:7 /bin/bash</code></p><p><code>centos:7</code>代表镜像</p><p><code>/bin/bash</code>代表进入容器初始化指令</p><hr><p><strong>查看正在运行的容器</strong>：<code>docker ps</code></p><p><strong>查看所有容器</strong>：<code>docker ps -a</code></p><p><strong>进入容器</strong>：<code>docker exec</code></p><p>如果创建容器时使用后台创建的方式，需要使用这种方式进入容器</p><hr><p><code>docker exec -it c2 /bin/bash</code></p><p><code>c2</code>代表需要进入的容器</p><p><code>/bin/bahs</code>代表进入容器初始化指令</p><hr><p><strong>停止容器</strong>：<code>docker stop &lt;容器名称&gt;</code></p><p><strong>删除容器</strong>：<code>docker rm &lt;容器id&gt;或&lt;容器名称&gt;</code></p><p><strong>查看容器信息</strong>：<code>docker inspect &lt;容器名称&gt;</code></p><h2 id="docker数据卷" tabindex="-1"><a class="header-anchor" href="#docker数据卷"><span>Docker数据卷</span></a></h2><p><strong>数据卷</strong>是<strong>宿主机</strong>中的一个目录或文件</p><p>当容器目录和数据卷目录绑定后，对方的<strong>修改会立即同步</strong></p><p>一个数据卷可以<strong>被多个容器同时挂载</strong></p><p>一个容器可以<strong>挂载多个数据卷</strong></p><h3 id="数据卷作用" tabindex="-1"><a class="header-anchor" href="#数据卷作用"><span>数据卷作用</span></a></h3><ul><li>容器数据<strong>持久化</strong></li><li>外部机器和容器<strong>间接通信</strong></li><li>容器之间<strong>数据交换</strong></li></ul><h3 id="配置数据卷" tabindex="-1"><a class="header-anchor" href="#配置数据卷"><span>配置数据卷</span></a></h3><p><code>docker run ... -v 宿主机目录:容器内目录</code></p><ul><li>两个目录都必须是<strong>绝对路径</strong></li><li>如果目录不存在，都<strong>会自动创建</strong></li><li>可以挂载多个数据卷，写多个-v即可</li></ul><h3 id="数据卷容器" tabindex="-1"><a class="header-anchor" href="#数据卷容器"><span>数据卷容器</span></a></h3><p>多容器进行数据交换的手段</p><ul><li>多个容器挂载同一个数据卷</li><li>数据卷容器</li></ul><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210518162256.png" alt=""></p><p>c3容器挂载一个数据卷，c1、c2分别挂载到c3容器上</p><ol><li><p>创建启动c3数据卷容器，使用-v参数 设置数据卷</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> run</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -it</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --name=c3</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -v</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /volume</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> centos:7</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /bin/bash</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><code>/volume</code>是容器目录，docker会默认在宿主机上分配一个目录，可以通过<code>docker inspect</code>来查看</p></li><li><p>创建启动c1、c2容器，使用--volumes-from参数 设置数据卷</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> run</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -it</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --name=c1</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --volumes-from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> c3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> centos:7</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /bin/bash</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> run</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -it</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --name=c2</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --volumes-from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> c3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> centos:7</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /bin/bash</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>创建后，c1、c2容器中都有一个名叫<code>/volume</code>的目录</p><p>通过<code>docker inspect</code>命令可以看到<strong>c1、c2宿主机的数据卷和c3默认分配的目录是同一个目录</strong>，所以<strong>即使c3容器挂了，也不会影响c1、c2容器的正常使用</strong>的，因为最终是指向了同一个宿主机的目录</p></li></ol><h2 id="dockerfile" tabindex="-1"><a class="header-anchor" href="#dockerfile"><span>Dockerfile</span></a></h2><p><strong>用于打包docker镜像</strong></p><h3 id="linux文件系统组成" tabindex="-1"><a class="header-anchor" href="#linux文件系统组成"><span>Linux文件系统组成</span></a></h3><p>由<strong>bootfs</strong>和<strong>rootfs</strong>组成</p><p>bootfs：包含bootloader（引导加载程序）和kernel（内核）</p><p>rootfs：root文件系统，包含的是典型的Linux系统中的/dev、/bin、/etc等目录和文件</p><p><strong>不同的Linux发行版如CentOS、Ubuntu等，它们的bootfs大致相同，不同的地方主要在于rootfs</strong></p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210518211856.png" alt=""></p><h3 id="docker镜像组成" tabindex="-1"><a class="header-anchor" href="#docker镜像组成"><span>Docker镜像组成</span></a></h3><p>Docker镜像由<strong>特殊的</strong>文件系统<strong>叠加</strong>而成，本质是一个分层的文件系统</p><ul><li>最底端的是bootfs，但是是<strong>使用宿主机的bootfs</strong>，所以docker安装时需要选择操作系统，因为不同的操作系统，bootfs不同</li><li>第二层是root文件系统，称为<strong>base image</strong>基础镜像（CentOS、Ubuntu）</li><li>然后再往上可以叠加自身镜像需要的镜像文件</li></ul><p><strong>Tomcat镜像为例</strong>：</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210518212742.png" alt=""></p><p><strong>其中jdk镜像、rootfs基础镜像是可以复用的，当其他镜像同样需要这些镜像时无需重复下载，可以复用</strong></p><ul><li>统一文件系统技术能够将不同的层整合成一个文件系统，为这些层提供了一个统一的视角，这样就隐藏了多层的存在，在用户看来，只存在一个文件系统</li><li>镜像都是<strong>只读</strong>的，因为要<strong>达到复用镜像的目的</strong>。当从一个镜像启动时，Docker会在最顶层加载一个<strong>可读写的文件系统</strong>作为容器，用户可以在容器里面进行需要的修改</li></ul><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210518213610.png" alt=""></p><h3 id="镜像制作" tabindex="-1"><a class="header-anchor" href="#镜像制作"><span>镜像制作</span></a></h3><ul><li><p>容器转为镜像</p><p>如：tomcat容器进行<strong>定制修改后</strong>，重新转换成新的镜像。但是挂载目录这个修改不能转移到新的镜像中去，因为挂载目录是启动容器时指定的</p><p><code>docker commit &lt;容器id&gt; &lt;新镜像的名称&gt;:&lt;版本号&gt;</code></p><p>docker镜像转换成压缩文件</p><p><code>docker save -o &lt;压缩文件名称&gt; &lt;镜像名称&gt;:&lt;版本号&gt; </code></p><p>压缩文件还原成docker镜像</p><p><code>docker load -i &lt;压缩文件名称&gt;</code></p></li><li><p>Dockerfile</p><p>Dockerfile包含了许多指令，每一条指令构建一层镜像，基于基础镜像，最终构建出一个新的镜像</p><p><strong>可以为团队提供一个完全一致的开发环境</strong></p></li></ul><h3 id="dockerfile关键字" tabindex="-1"><a class="header-anchor" href="#dockerfile关键字"><span>Dockerfile关键字</span></a></h3><table><thead><tr><th>关键字</th><th>作用</th><th>备注</th></tr></thead><tbody><tr><td>FROM</td><td>指定父镜像</td><td>指定Dockerfile基于哪个镜像进行构建</td></tr><tr><td>MAINTAINER</td><td>作者信息</td><td>用于标明这个Dockerfile是谁来维护的</td></tr><tr><td>LABEL</td><td>标签</td><td>一般比较少用</td></tr><tr><td>RUN</td><td>执行命令</td><td>执行一段Linux命令，默认是/bin/sh，格式为 RUN command<br>或者RUN [&quot;command&quot;, &quot;param1&quot;, &quot;param2&quot;]</td></tr><tr><td>CMD</td><td>容器启动时执行的命令</td><td>格式为CMD command或者CMD [&quot;command&quot;, &quot;param1&quot;, &quot;param2&quot;]</td></tr><tr><td>ENTRYPOINT</td><td>入口</td><td>一般在制作一些<strong>执行就关闭</strong>的容器中会使用</td></tr><tr><td>ADD</td><td>添加文件</td><td>构建镜像时把文件添加到镜像中，不仅是当前上下文，还可以来自远程服务</td></tr><tr><td>ENV</td><td>设置环境变量</td><td>指定构建镜像时的环境变量，也可以在启动容器时进行覆盖，<br>格式 EVN name=value</td></tr><tr><td>ARG</td><td>构建参数</td><td>只在构建时使用的参数，如果和ENV同名，那么ENV会始终覆盖</td></tr><tr><td>VOLUME</td><td>定义外部可以挂载的数据卷</td><td>格式 VOLUME [&quot;目录&quot;]</td></tr><tr><td>EXPOSE</td><td>暴露端口</td><td>格式 EXPOSE 端口号</td></tr><tr><td>WORKDIR</td><td>工作目录</td><td>进入容器内部时，当前所在的位置</td></tr></tbody></table><h4 id="自定义centos" tabindex="-1"><a class="header-anchor" href="#自定义centos"><span>自定义CentOS</span></a></h4><ol><li>登陆后的目录为<code>/usr</code></li><li>能使用<code>vim</code></li></ol><p>实现：</p><div class="language-dockerfile line-numbers-mode" data-highlighter="shiki" data-ext="dockerfile" data-title="dockerfile" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#定义父镜像</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">FROM</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> centos:7</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#定义作者信息</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">MAINTAINER</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> wuyb &lt;wuyb13411012303@yeah.net&gt;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#安装vim</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">RUN</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> yum install -y vim</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#定义默认的工作目录</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">WORKDIR</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> /usr</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#定义容器启动执行命令</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">CMD</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> /bin/bash</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker服务编排" tabindex="-1"><a class="header-anchor" href="#docker服务编排"><span>Docker服务编排</span></a></h2><h3 id="服务编排" tabindex="-1"><a class="header-anchor" href="#服务编排"><span>服务编排</span></a></h3><p>按照一定的业务规则批量管理容器</p><h3 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose"><span>Docker Compose</span></a></h3><p>Docker Compose是一个编排多容器分布式部署的工具，提供命令集管理容器化应用的完整开发周期，包括服务构建，启动和停止</p><ol><li>使用Dockerfile定义运行环境镜像</li><li>使用docker-compose.yml定义组成应用的各个服务</li><li>运行docker-compose up启动应用</li></ol>`,98),o=[a];function r(l,c){return s(),t("div",null,o)}const h=e(n,[["render",r],["__file","docker.html.vue"]]),g=JSON.parse('{"path":"/writings/container/docker.html","title":"Docker基础知识","lang":"zh-CN","frontmatter":{"title":"Docker基础知识","icon":"article","category":["干货","容器技术"],"tag":["Docker","基础"],"description":"Docker基础知识 Docker容器与虚拟机对比 容器化技术 运行的应用及其包含的所有资源，都可以称之为一个Container Docker部署方式 在不同的操作系统中，Docker Engine实现了Docker跨平台的特性 每一个APP就是一个根据Image创建出来的Container，都是运行在Docker Engine之上 虚拟机部署方式 H...","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/container/docker.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"Docker基础知识"}],["meta",{"property":"og:description","content":"Docker基础知识 Docker容器与虚拟机对比 容器化技术 运行的应用及其包含的所有资源，都可以称之为一个Container Docker部署方式 在不同的操作系统中，Docker Engine实现了Docker跨平台的特性 每一个APP就是一个根据Image创建出来的Container，都是运行在Docker Engine之上 虚拟机部署方式 H..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1ggcrlngnsij30xa0ql3z4.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-30T16:45:09.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:tag","content":"Docker"}],["meta",{"property":"article:tag","content":"基础"}],["meta",{"property":"article:modified_time","content":"2022-07-30T16:45:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Docker基础知识\\",\\"image\\":[\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1ggcrlngnsij30xa0ql3z4.jpg\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1ggcrm3v2mdj30xa0qldiv.jpg\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210519143418.png\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210519143736.png\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210518162256.png\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210518211856.png\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210518212742.png\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210518213610.png\\"],\\"dateModified\\":\\"2022-07-30T16:45:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"Docker容器与虚拟机对比","slug":"docker容器与虚拟机对比","link":"#docker容器与虚拟机对比","children":[{"level":3,"title":"容器化技术","slug":"容器化技术","link":"#容器化技术","children":[]},{"level":3,"title":"Docker关键概念","slug":"docker关键概念","link":"#docker关键概念","children":[]}]},{"level":2,"title":"Docker命令","slug":"docker命令","link":"#docker命令","children":[{"level":3,"title":"服务相关命令（daemon）","slug":"服务相关命令-daemon","link":"#服务相关命令-daemon","children":[]},{"level":3,"title":"镜像相关命令（image）","slug":"镜像相关命令-image","link":"#镜像相关命令-image","children":[]},{"level":3,"title":"容器相关命令（container）","slug":"容器相关命令-container","link":"#容器相关命令-container","children":[]}]},{"level":2,"title":"Docker数据卷","slug":"docker数据卷","link":"#docker数据卷","children":[{"level":3,"title":"数据卷作用","slug":"数据卷作用","link":"#数据卷作用","children":[]},{"level":3,"title":"配置数据卷","slug":"配置数据卷","link":"#配置数据卷","children":[]},{"level":3,"title":"数据卷容器","slug":"数据卷容器","link":"#数据卷容器","children":[]}]},{"level":2,"title":"Dockerfile","slug":"dockerfile","link":"#dockerfile","children":[{"level":3,"title":"Linux文件系统组成","slug":"linux文件系统组成","link":"#linux文件系统组成","children":[]},{"level":3,"title":"Docker镜像组成","slug":"docker镜像组成","link":"#docker镜像组成","children":[]},{"level":3,"title":"镜像制作","slug":"镜像制作","link":"#镜像制作","children":[]},{"level":3,"title":"Dockerfile关键字","slug":"dockerfile关键字","link":"#dockerfile关键字","children":[]}]},{"level":2,"title":"Docker服务编排","slug":"docker服务编排","link":"#docker服务编排","children":[{"level":3,"title":"服务编排","slug":"服务编排","link":"#服务编排","children":[]},{"level":3,"title":"Docker Compose","slug":"docker-compose","link":"#docker-compose","children":[]}]}],"git":{"createdTime":null,"updatedTime":1659199509000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":7.27,"words":2181},"filePathRelative":"writings/container/docker.md","autoDesc":true}');export{h as comp,g as data};