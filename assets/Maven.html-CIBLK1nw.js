import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as a,a as n}from"./app-D62f3oGG.js";const l={},e=n(`<h1 id="maven" tabindex="-1"><a class="header-anchor" href="#maven"><span>Maven</span></a></h1><h3 id="依赖管理" tabindex="-1"><a class="header-anchor" href="#依赖管理"><span><strong>依赖管理</strong></span></a></h3><p>maven工程对jar包的管理过程。jar包放在系统的jar包仓库中，当maven工程使用到对应的jar包时，根据既定的jar包坐标去寻找</p><h3 id="一键构建" tabindex="-1"><a class="header-anchor" href="#一键构建"><span><strong>一键构建</strong></span></a></h3><p>maven使用一个命令完成对项目的编译、测试、打包、安装、发布、部署的一系列工作</p><h3 id="仓库种类" tabindex="-1"><a class="header-anchor" href="#仓库种类"><span><strong>仓库种类</strong></span></a></h3><ol><li>本地仓库</li><li>中央仓库。maven中央仓库，放置了几乎所有开源的jar包</li><li>远程仓库（私服）。如果私服没有找到，则去中央仓库寻找</li><li>启动maven工程，先去本地仓库寻找jar包，如果没有找到并且是联网状态下，会去maven的中央仓库寻找所需jar包。</li></ol><h3 id="标准目录结构" tabindex="-1"><a class="header-anchor" href="#标准目录结构"><span><strong>标准目录结构</strong></span></a></h3><ul><li><code>src/main/java</code>：核心代码部分</li><li><code>src/main/resources</code>：配置文件部分</li><li><code>src/test/java</code>：测试代码部分</li><li><code>src/test/resources</code>：测试配置文件</li><li><code>src/main/webapp</code>：页面资源，包括js、css、图片等</li><li><code>pom.xml</code></li></ul><h3 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span><strong>常用命令</strong></span></a></h3><ul><li><code>clean</code>：把target目录删除，清除项目的编译信息</li><li><code>compile</code>：把/src/main/java下的核心代码编译放置在classes目录下</li><li><code>test</code>：<strong>除了执行<code>compile</code>命令外</strong>，还把/src/test/java下的测试代码编译放置在test-classes目录下</li><li><code>package</code>：<strong>除了执行<code>test</code>命令外</strong>，还把项目打成包放置在target目录下</li><li><code>install</code>：<strong>除了执行<code>package</code>命令外</strong>，还把包安装到本地仓库下</li></ul><h3 id="生命周期" tabindex="-1"><a class="header-anchor" href="#生命周期"><span><strong>生命周期</strong></span></a></h3><ul><li>清理生命周期 <ul><li>clean</li></ul></li><li>默认生命周期 <ul><li>compile</li><li>test</li><li>package</li><li>install</li></ul></li><li>站点生命周期</li></ul><h3 id="maven概念模型" tabindex="-1"><a class="header-anchor" href="#maven概念模型"><span><strong>Maven概念模型</strong></span></a></h3><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrj94k24j30ya0l2b29.jpg" alt=""></p><h4 id="项目对象模型" tabindex="-1"><a class="header-anchor" href="#项目对象模型"><span>项目对象模型</span></a></h4><p><code>pom.xml</code></p><ol><li>项目自身信息，包括项目自身的坐标</li><li>项目运行所依赖的jar包</li><li>项目运行环境信息（tomcat等）</li></ol><h4 id="依赖管理模型" tabindex="-1"><a class="header-anchor" href="#依赖管理模型"><span>依赖管理模型</span></a></h4><p><code>&lt;dependency&gt;</code></p><ol><li>公司组织的名称<code>&lt;groupId&gt;</code></li><li>项目名<code>&lt;artifactId&gt;</code></li><li>版本号<code>&lt;version&gt;</code></li></ol><h4 id="relativepath" tabindex="-1"><a class="header-anchor" href="#relativepath"><span>relativePath</span></a></h4><ul><li><p>在 <code>&lt;parent&gt;</code> 标签下指定 <code>&lt;relativePath/&gt;</code>，说明这个依赖不从本地路径获取，始终从Maven仓库中获取</p></li><li><p>默认是../pom.xml，即父依赖所在目录下的pom文件</p></li><li><p>查找顺序：relativePath元素中的地址–本地仓库–远程仓库</p></li></ul><h3 id="scope" tabindex="-1"><a class="header-anchor" href="#scope"><span><strong>Scope</strong></span></a></h3><ul><li><p>compile：<strong>默认</strong>，参与编译、运行、测试。参与打包</p></li><li><p>provided：只参与编译、测试（servlet、jsp）。不参与打包</p></li><li><p>test：只参与测试（junit）</p></li><li><p>runtime：只参与运行、测试（JDBC驱动）</p></li><li><p>system：参与编译、运行、测试，但依赖项不会从maven仓库获取，而是从本地文件系统拿，一定要配合systemPath属性使用</p></li><li><p>import</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Maven和Java一样是单继承</span></span>
<span class="line"><span>但是在开发SpringCloud应用时，由于SpringCloud是基于SpringBoot的，所以生成的pom文件已经有spring-boot-starter-parent这个父类，来管理SpringBoot里面组件的版本，但是SpringCloud同样需要管理自己组件的版本，所以用import解决单继承的问题</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- SpringBoot管理组件版本 --&gt;</span></span>
<span class="line"><span>&lt;parent&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;2.4.3&lt;/version&gt;</span></span>
<span class="line"><span>    &lt;relativePath/&gt; &lt;!-- lookup parent from repository --&gt;</span></span>
<span class="line"><span>&lt;/parent&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- SpringCloud管理组件版本 --&gt;</span></span>
<span class="line"><span>&lt;dependencyManagement&gt;</span></span>
<span class="line"><span>    &lt;dependencies&gt;</span></span>
<span class="line"><span>        &lt;!-- &lt;scope&gt;import&lt;/scope&gt;解决单继承问题，类似parent标签， --&gt;</span></span>
<span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;spring-cloud-dependencies&lt;/artifactId&gt;</span></span>
<span class="line"><span>            &lt;version&gt;2020.0.1&lt;/version&gt;</span></span>
<span class="line"><span>            &lt;type&gt;pom&lt;/type&gt;</span></span>
<span class="line"><span>            &lt;scope&gt;import&lt;/scope&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span>
<span class="line"><span>    &lt;/dependencies&gt;</span></span>
<span class="line"><span>&lt;/dependencyManagement&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="systempath" tabindex="-1"><a class="header-anchor" href="#systempath"><span>systemPath</span></a></h4><p>用于指向一个jar包的磁盘路径</p><h4 id="scope依赖传递" tabindex="-1"><a class="header-anchor" href="#scope依赖传递"><span>Scope依赖传递</span></a></h4><h3 id="依赖排除" tabindex="-1"><a class="header-anchor" href="#依赖排除"><span>依赖排除</span></a></h3><h4 id="排除依赖" tabindex="-1"><a class="header-anchor" href="#排除依赖"><span>排除依赖</span></a></h4><h5 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景"><span>应用场景</span></a></h5><p>如果A依赖B，B依赖C，但是由于jar包冲突等问题A不能依赖C，这时候需要在依赖B的时候把依赖C排除</p><h5 id="具体做法" tabindex="-1"><a class="header-anchor" href="#具体做法"><span>具体做法</span></a></h5><p>使用exlusions标签，可以同时排除多个</p><div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">project</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  ...</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">dependencies</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">dependency</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">groupId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;sample.ProjectB&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">groupId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">artifactId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;Project-B&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">artifactId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;1.0&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">scope</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;compile&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">scope</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">exclusions</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">exclusion</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;  </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">&lt;!-- declare the exclusion here --&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">          &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">groupId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;sample.ProjectC&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">groupId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">          &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">artifactId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;Project-C&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">artifactId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">exclusion</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">exclusions</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">dependency</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">dependencies</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">project</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="可选依赖" tabindex="-1"><a class="header-anchor" href="#可选依赖"><span>可选依赖</span></a></h4><p>optional是maven依赖jar时的一个选项，表示该依赖是可选的，不会被依赖传递。<strong>Maven默认会做排除操作</strong></p><p><strong>只在传递上起效，继承依赖时optional不起作用</strong></p><h5 id="应用场景-1" tabindex="-1"><a class="header-anchor" href="#应用场景-1"><span>应用场景</span></a></h5><ul><li>B项目依赖了logback、log4j、commons log三种不同的日志框架</li><li>A项目依赖了B项目</li></ul><p>在开发中一个项目一般只使用一种日志框架，那么我们项目中就会有多余的依赖，多余依赖越来越多的时候，最终会导致项目很臃肿</p><h5 id="具体做法-1" tabindex="-1"><a class="header-anchor" href="#具体做法-1"><span>具体做法</span></a></h5><p>需要在B项目中把其他的日志依赖设置成可选依赖</p><div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">dependencies</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">dependency</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">groupId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;org.apache.logging.log4j&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">groupId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">artifactId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;log4j-api&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">artifactId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">optional</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;true&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">optional</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">dependency</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">dependency</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">groupId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;org.apache.logging.log4j&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">groupId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">artifactId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;log4j-core&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">artifactId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">optional</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;true&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">optional</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">dependency</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">dependencies</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="依赖排除的意义" tabindex="-1"><a class="header-anchor" href="#依赖排除的意义"><span>依赖排除的意义</span></a></h4><ul><li>节约磁盘、内存等空间</li><li>避免许可协议问题</li><li>减少不必要的依赖传递</li><li><strong>减少jar包冲突</strong></li></ul><h4 id="第一声明优先原则" tabindex="-1"><a class="header-anchor" href="#第一声明优先原则"><span>第一声明优先原则</span></a></h4><p>在pom.xml配置文件中，如果有两个名称相同版本不同的依赖声明，那么<strong>先写的会生效</strong>。</p><h4 id="最短路径优先原则" tabindex="-1"><a class="header-anchor" href="#最短路径优先原则"><span>最短路径优先原则</span></a></h4><p><strong>直接依赖优先于传递依赖</strong>，如果传递依赖的jar包版本冲突了，那么可以直接声明一个指定版本的依赖jar，即可解决冲突。</p><h3 id="一二三方库" tabindex="-1"><a class="header-anchor" href="#一二三方库"><span>一二三方库</span></a></h3><ul><li>一方库：本工程中的各模块的相互依赖</li><li>二方库：公司内部其他项目提供的依赖</li><li>三方库：其他组织、公司等来自第三方的依赖</li></ul>`,52),t=[e];function p(h,r){return a(),i("div",null,t)}const k=s(l,[["render",p],["__file","Maven.html.vue"]]),g=JSON.parse('{"path":"/writings/project-tools/Maven.html","title":"Maven基础知识","lang":"zh-CN","frontmatter":{"title":"Maven基础知识","icon":"article","category":["干货","项目工具"],"tag":["Maven","基础"],"description":"Maven 依赖管理 maven工程对jar包的管理过程。jar包放在系统的jar包仓库中，当maven工程使用到对应的jar包时，根据既定的jar包坐标去寻找 一键构建 maven使用一个命令完成对项目的编译、测试、打包、安装、发布、部署的一系列工作 仓库种类 本地仓库 中央仓库。maven中央仓库，放置了几乎所有开源的jar包 远程仓库（私服）。如...","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/project-tools/Maven.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"Maven基础知识"}],["meta",{"property":"og:description","content":"Maven 依赖管理 maven工程对jar包的管理过程。jar包放在系统的jar包仓库中，当maven工程使用到对应的jar包时，根据既定的jar包坐标去寻找 一键构建 maven使用一个命令完成对项目的编译、测试、打包、安装、发布、部署的一系列工作 仓库种类 本地仓库 中央仓库。maven中央仓库，放置了几乎所有开源的jar包 远程仓库（私服）。如..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrj94k24j30ya0l2b29.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-30T16:45:09.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:tag","content":"Maven"}],["meta",{"property":"article:tag","content":"基础"}],["meta",{"property":"article:modified_time","content":"2022-07-30T16:45:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Maven基础知识\\",\\"image\\":[\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrj94k24j30ya0l2b29.jpg\\"],\\"dateModified\\":\\"2022-07-30T16:45:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":3,"title":"依赖管理","slug":"依赖管理","link":"#依赖管理","children":[]},{"level":3,"title":"一键构建","slug":"一键构建","link":"#一键构建","children":[]},{"level":3,"title":"仓库种类","slug":"仓库种类","link":"#仓库种类","children":[]},{"level":3,"title":"标准目录结构","slug":"标准目录结构","link":"#标准目录结构","children":[]},{"level":3,"title":"常用命令","slug":"常用命令","link":"#常用命令","children":[]},{"level":3,"title":"生命周期","slug":"生命周期","link":"#生命周期","children":[]},{"level":3,"title":"Maven概念模型","slug":"maven概念模型","link":"#maven概念模型","children":[]},{"level":3,"title":"Scope","slug":"scope","link":"#scope","children":[]},{"level":3,"title":"依赖排除","slug":"依赖排除","link":"#依赖排除","children":[]},{"level":3,"title":"一二三方库","slug":"一二三方库","link":"#一二三方库","children":[]}],"git":{"createdTime":null,"updatedTime":1659199509000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":4.35,"words":1304},"filePathRelative":"writings/project-tools/Maven.md","autoDesc":true}');export{k as comp,g as data};