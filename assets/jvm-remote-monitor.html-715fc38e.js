import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as l,c as r,a as n,b as a,d as s,e as o}from"./app-859571d0.js";const c={},p=n("h1",{id:"jvm-远程监控",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#jvm-远程监控","aria-hidden":"true"},"#"),a(" JVM 远程监控")],-1),d=n("h2",{id:"jvm-可视化监控工具",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#jvm-可视化监控工具","aria-hidden":"true"},"#"),a(" JVM 可视化监控工具")],-1),u=n("p",null,"JDK 中提供了两款可视化监控工具：",-1),m=n("li",null,"jconsole，可以查看当前 cpu、内存、类、线程的使用情况。",-1),v={href:"https://mp.weixin.qq.com/s/tR6MzCg8lCC0vD6UtFu8LQ",target:"_blank",rel:"noopener noreferrer"},k=o(`<h2 id="远程监控方式" tabindex="-1"><a class="header-anchor" href="#远程监控方式" aria-hidden="true">#</a> 远程监控方式</h2><ul><li>jmx</li><li>jstatd</li></ul><h2 id="jmx" tabindex="-1"><a class="header-anchor" href="#jmx" aria-hidden="true">#</a> jmx</h2><p>如果需要使用 jmx 的远程监控的功能，那在程序启动的时候就需要加入必要的 vm 参数：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 开启 jmx 远程监控功能
-Dcom.sun.management.jmxremote
# 配置提供远程服务的端口
-Dcom.sun.management.jmxremote.port=8777
# 本地 jmx client 提供服务的端口
-Dcom.sun.management.jmxremote.rmi.port=8777
# 关闭 jmx 远程服务 ssl 和认证功能
-Dcom.sun.management.jmxremote.authenticate=false
-Dcom.sun.management.jmxremote.ssl=false
# jmx 默认是通过 localhost 的 ip 地址提供 RMI 服务的，需要明确指定 RMI 服务的地址
-Djava.rmi.server.hostname=192.168.1.90
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 java 程序启动命令中加入以上 vm 参数后，远程监控工具就可以通过 <code>&lt;远程主机名或 IP 地址&gt;:8777</code>+用户名密码或者<code>service:jmx:rmi:///jndi/rmi://&lt;远程主机名或 ip 地址&gt;:8777/jmxrmi</code> 远程连接 Java 应用进行监控了</p><h2 id="jstatd" tabindex="-1"><a class="header-anchor" href="#jstatd" aria-hidden="true">#</a> jstatd</h2><p>jstatd 是 jdk 中一个独立的工具，jvisualvm 只有使用 jstatd 连接才能使用 Visual GC 功能</p><p>使用 jstatd 连接需要指定一个策略文件<code>.policy</code></p><p><code>vi allpermission.policy</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>grant  codebase <span class="token string">&quot;file:<span class="token variable">\${java.home}</span>/lib/tools.jar&quot;</span> <span class="token punctuation">{</span>
	<span class="token comment"># 表示开放所有权限</span>
	permission java.security.AllPermission<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后使用这个策略文件来启动 jstatd</p><p><code>jstatd -J-Djava.security.policy=allpermission.policy -J-Djava.rmi.server.hostname=192.168.1.90</code></p><p>jstatd 默认用一个 1099 端口，可以使用 <code>-nr -p 端口</code> 的方式修改 jstatd 尝试去连接的 rmi register 端口，另外还会使用一个随机的端口</p><h2 id="jmx-和-jstatd-区别" tabindex="-1"><a class="header-anchor" href="#jmx-和-jstatd-区别" aria-hidden="true">#</a> jmx 和 jstatd 区别</h2><ul><li>生命周期 <ul><li>jmx 的生命周期严格和 Java 程序的生命周期绑定，只要启动时没有加上 jmx 的配置项，那么就需要停止运行、加入 jmx 选项，重新启动，才能通过 jmx 的方式连接</li><li>jstatd 是 jdk 中一个独立的工具，所以他的生命周期也是相对独立的，当需要进行远程监控时，可以随时打开</li></ul></li><li>功能方面：只有通过 jstatd 连接才能使用 jvisualvm 中 visual gc 的功能</li><li>jstatd 端口：jstatd server 的端口是随机选择的，不能指定，只能指定尝试去连接的 rmi register 端口</li></ul><h2 id="docker-容器无法使用-jdk-命令的问题" tabindex="-1"><a class="header-anchor" href="#docker-容器无法使用-jdk-命令的问题" aria-hidden="true">#</a> docker 容器无法使用 JDK 命令的问题</h2><p>在容器中使用 jps 命令是可以正常返回的，看到各个 java 程序的进程 id。然而需要使用 jmap 命令打印堆栈信息时，提示了以下这个错误：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Error attaching to process: sun.jvm.hotspot.debugger.DebuggerException: Can&#39;t attach to the process: ptrace(PTRACE_ATTACH, ..) failed for 1: Operation not permitted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个问题其实不是什么 bug，是 docker 的一个安全特性，类似于 jmap 这些 JDK 工具依赖于 Linux 的 PTRACE_ATTACH，而是 docker 自 1.10 版本后在默认的 seccomp 配置文件中禁用了 ptrace，所以 PTRACE 功能默认是关闭的。</p><h3 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案" aria-hidden="true">#</a> 解决方案</h3><p>主要的解决方向是把 SYS_PTRACE 功能打开，或者获取主机访问权限</p><ul><li><p>docker 命令行启动，根据上面的意思能得到两个启动语句，二选一执行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run --cap-add<span class="token operator">=</span>SYS_PTRACE <span class="token punctuation">..</span>.

<span class="token function">docker</span> run <span class="token parameter variable">--privileged</span> <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>docker compose 启动，也可以根据解决方向得到两份 compose 文件：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">tomcat</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">:</span>latest
    <span class="token key atrule">cap_add</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> SYS_PTRACE

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">tomcat</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">:</span>latest
    <span class="token comment"># 获取主机访问权限</span>
    <span class="token key atrule">privileged</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>rancher 管理容器方式启动，获取主机访问权限，其实类似于 <code>-privileged</code> 选项：</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20221212163918.png" alt=""></p></li><li><p>K8S 启动方式：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span><span class="token number">2</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">-</span><span class="token number">2</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">:</span>latest
    <span class="token key atrule">securityContext</span><span class="token punctuation">:</span>
      <span class="token key atrule">capabilities</span><span class="token punctuation">:</span>
        <span class="token key atrule">add</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;SYS_PTRACE&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h2>`,24),h={href:"https://www.jianshu.com/p/5a5972d821e1",target:"_blank",rel:"noopener noreferrer"},b={href:"https://my.oschina.net/lik/blog/5583380",target:"_blank",rel:"noopener noreferrer"},g={href:"https://blog.51cto.com/u_12393361/5021517",target:"_blank",rel:"noopener noreferrer"},j={href:"https://www.jb51.net/article/201427.htm",target:"_blank",rel:"noopener noreferrer"},_={href:"https://jarekprzygodzki.wordpress.com/2016/12/19/jvm-in-docker-and-ptrace_attach/",target:"_blank",rel:"noopener noreferrer"},x={href:"https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities",target:"_blank",rel:"noopener noreferrer"},f={href:"https://kubernetes.io/docs/tasks/configure-pod-container/security-context/",target:"_blank",rel:"noopener noreferrer"};function y(C,D){const e=i("ExternalLinkIcon");return l(),r("div",null,[p,d,u,n("ul",null,[m,n("li",null,[a("jvisualvm，与 jconsole 的功能差别不大，但是 jvisualvm 可以安装 Visual GC 插件，Visual GC 是常常使用的一个功能，可以明显的看到年轻代、老年代的内存变化，以及 gc 频率、gc 的时间等。关于 jvisualvm 的使用这一篇文章有简单介绍："),n("a",v,[a("这款 Java 性能调优的可视化工具，你真的会用吗"),s(e)])])]),k,n("p",null,[n("a",h,[a("jvisualvm 监控远程 jvm 的两种连接方式对比"),s(e)])]),n("p",null,[n("a",b,[a("JVisualVM 远程连接 JVM 的两种方式---jstatd 方式含泪踩坑"),s(e)])]),n("p",null,[n("a",g,[a("Can‘t attach the process:ptrace(PTRACE_ATTACH)"),s(e)])]),n("p",null,[n("a",j,[a("Docker 解决 openjdk 容器里无法使用 JDK 的 jmap 等命令问题"),s(e)])]),n("p",null,[n("a",_,[a("JVM in Docker and PTRACE_ATTACH"),s(e)])]),n("p",null,[n("a",x,[a("Docker run reference | Docker Documentation"),s(e)])]),n("p",null,[n("a",f,[a("Configure a Security Context for a Pod or Container | Kubernetes"),s(e)])])])}const E=t(c,[["render",y],["__file","jvm-remote-monitor.html.vue"]]);export{E as default};
