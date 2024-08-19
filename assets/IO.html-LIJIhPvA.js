import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as n,a}from"./app-D62f3oGG.js";const e={},l=a(`<h1 id="系统调用函数" tabindex="-1"><a class="header-anchor" href="#系统调用函数"><span>系统调用函数</span></a></h1><h2 id="recvfrom" tabindex="-1"><a class="header-anchor" href="#recvfrom"><span>recvfrom</span></a></h2><p>Linux系统提供给用户用于接收网络IO的系统接口。从套接字上接收一个消息</p><p>如果此系统调用返回值&lt;0，并且 errno为EWOULDBLOCK或EAGAIN（套接字已标记为非阻塞，而接收操作被阻塞或者接收超时 ）时，连接正常，<strong>阻塞</strong>接收数据（这很关键，前4种IO模型都设计此系统调用）</p><h2 id="select" tabindex="-1"><a class="header-anchor" href="#select"><span>select</span></a></h2><p>系统调用允许程序同时在多个底层文件描述符上，等待输入的到达或输出的完成。以<strong>数组</strong>形式存储文件描述符，64位机器默认<strong>2048</strong>个。当有数据准备好时，无法感知具体是哪个流OK了，所以需要一个一个的遍历，函数的时间复杂度为<strong>O(n)</strong></p><h3 id="select函数的缺陷" tabindex="-1"><a class="header-anchor" href="#select函数的缺陷"><span>select函数的缺陷</span></a></h3><ol><li>select调用需要传入文件描述符数组，也就是说需要拷贝这份数组到内核缓冲区，在高并发的场景下这种拷贝操作会消耗大量资源</li><li>select调用在内核层仍然是通过遍历的方式检查文件描述符的就绪状态的这个过程是同步的，只不过没有系统调用切换上下文的开销</li><li>select调用仅仅返回的是可读文件描述符的个数，具体哪个可读还需要用户线程进行遍历</li></ol><h2 id="poll" tabindex="-1"><a class="header-anchor" href="#poll"><span>poll</span></a></h2><p>以<strong>链表</strong>形式存储文件描述符，与select函数主要的区别为取消了1024个文件描述符的限制，函数的时间复杂度也为<strong>O(n)</strong></p><h2 id="epoll" tabindex="-1"><a class="header-anchor" href="#epoll"><span>epoll</span></a></h2><p>基于事件驱动的，如果某个流准备好了，会以事件通知，知道具体是哪个流，因此不需要遍历，函数的时间复杂度为<strong>O(1)</strong></p><h3 id="epoll解决select函数缺陷的方式" tabindex="-1"><a class="header-anchor" href="#epoll解决select函数缺陷的方式"><span>epoll解决select函数缺陷的方式</span></a></h3><ol><li>内核中保存一份文件描述符集合，无需用户层每次都重新传入，只需告诉内核修改的部分即可</li><li>内核不再通过轮询的方式找到就绪的文件描述符，而是通过异步IO事件通知</li><li>内核仅会将有IO事件的文件描述符返回给用户层，用户层拿到后无需做额外的遍历</li></ol><h2 id="sigaction" tabindex="-1"><a class="header-anchor" href="#sigaction"><span>sigaction</span></a></h2><p>用于设置对信号的处理方式，也可检验对某信号的预设处理方式。Linux使用<strong>SIGIO信号</strong>来实现IO异步通知机制</p><h1 id="io模型" tabindex="-1"><a class="header-anchor" href="#io模型"><span>IO模型</span></a></h1><p>不管是网络IO还是磁盘IO，对于读操作，都需要等待网络的某个数据分组到达后/准备好，<strong>将数据拷贝到内核空间的缓冲区中，再从内核空间拷贝到用户空间的缓冲区</strong></p><h2 id="阻塞io模型" tabindex="-1"><a class="header-anchor" href="#阻塞io模型"><span>阻塞IO模型</span></a></h2><blockquote><p>此时我已饥渴难耐，全程<strong>盯着</strong>后厨，等待着一分一秒，终于quan jia tong做好了，在此期间虽然什么事也没干，但是最后能吃到quan jia tong，我很幸福。此处需要一个清新的脑回路，我就是程序，我想要quan jia tong，于是<strong>发起了系统调用</strong>，而后厨加工的过程就是在做<strong>数据准备和拷贝</strong>工作。quan jia tong最终到手，数据终于从内核空间拷贝到了用户空间。</p></blockquote><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">listenfd </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> socket</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">   			// 打开一个网络通信端口</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">bind</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(listenfd)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">        			// 绑定</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">listen</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(listenfd)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">      			// 监听</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">while</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">) {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">  connfd </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> accept</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(listenfd)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">  	// 阻塞建立连接</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  int</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> n </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> read</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(connfd</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> buf)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">  	// 阻塞读数据</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">  doSomeThing</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(buf)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">  			// 利用读到的数据完成业务操作</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">  close</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(connfd)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">     			// 关闭连接，循环等待下一个连接</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://mmbiz.qpic.cn/mmbiz_gif/GLeh42uInXTyY80RSpUTLjIMiaGGicv9zArJDictJLnnRWwXriaXkgJFXnUsibFTlxjqSaBicqpeH4NhXBCqWuFgc7VQ/640?wx_fmt=gif&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1" alt=""></p><p>总体来看，会有两个地方发生阻塞</p><ol><li>accept方法，这里需要完成Http三次握手操作，属于网络层，无法从代码层面优化</li><li>read方法，把read方法细节展开看，会有两个阶段发生阻塞 <ol><li>数据从网卡拷贝到内核缓冲区，完成后文件描述符的状态被修改为读已就绪</li><li>数据从内核拷贝到用户缓冲区，完成后返回到达的字节数</li></ol></li></ol><p><img src="https://mmbiz.qpic.cn/mmbiz_gif/GLeh42uInXTyY80RSpUTLjIMiaGGicv9zADM8nrhNkEtFpSpLjGicOemZ5mt7orYF8vFC7g83lPVDeSbnlgKl7XaA/640?wx_fmt=gif&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1" alt="图片"></p><p>整体流程如下：</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210817095814.png" alt=""></p><p>阻塞IO的执行过程是进程进行系统调用，<strong>等待内核</strong>将数据准备好并复制到用户态缓冲区后，进程<strong>放弃使用CPU</strong>并<strong>一直阻塞</strong>在此，直到数据准备好</p><p>如果这个连接的客户端一直不发数据，那么服务端线程将会<strong>一直阻塞在 read 函数上不返回，也无法接受其他客户端连接</strong></p><h2 id="非阻塞io模型" tabindex="-1"><a class="header-anchor" href="#非阻塞io模型"><span>非阻塞IO模型</span></a></h2><blockquote><p>此时我<strong>每隔5分钟</strong>询问quan jia tong好了没，在数次盘问后，终于出炉了。在每一次盘问之前，对于程序来说是<strong>非阻塞的</strong>，<strong>占用CPU资源</strong>，可以做其他事情。</p></blockquote><p>操作系统提供的recvfrom函数可以实现非阻塞的效果。调用recvfrom前，把文件描述符设置为非阻塞（errno设置为EWOULDBLOCK），每次应用程序需要<strong>询问内核</strong>是否有数据准备好。当数据还没拷贝到用户缓冲区前都返回-1，用户线程需要进入下一轮的轮询；当数据在内核缓冲区准备好拷贝到用户缓冲区时，recvfrom函数会进入阻塞阶段，然后开始拷贝数据到用户缓冲区，完成后函数会返回到达的字节数，并开始处理业务</p><p><img src="https://mmbiz.qpic.cn/mmbiz_gif/GLeh42uInXTyY80RSpUTLjIMiaGGicv9zAT6rHhibbzK5rXiarLuJU0P4MGrHNl35vVCV4JdS4FeejOkl8bBGz9nVQ/640?wx_fmt=gif&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1" alt="图片"></p><p>整体流程图如下：</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210817154602.png" alt=""></p><p>非阻塞IO的执行过程经历两个阶段</p><ul><li><strong>等待数据阶段是非阻塞的</strong>，当数据还未到网卡，或者数据到达网卡了但是还没拷贝到内核缓冲区之前，用户线程需要不停地去<strong>轮询内核</strong>数据的就绪状态</li><li><strong>数据复制阶段是阻塞的</strong>，需要等待数据从内核缓冲区拷贝到用户缓冲区，才能返回</li></ul><h2 id="io多路复用模型" tabindex="-1"><a class="header-anchor" href="#io多路复用模型"><span>IO多路复用模型</span></a></h2><blockquote><p>排了很长的队，终于轮到我支付后，拿到了一张小票，上面有<strong>号次</strong>。当quan jia tong出炉后，会喊相应的号次来取。KFC营业员打小票出号次的动作相当于操作系统<strong>多开了个线程</strong>，专门接收客户端的连接。我只关注叫到的是不是我的号，因此程序还需在服务端<strong>注册我想监听的事件</strong>类型。</p></blockquote><p>当服务端和多个客户端建立连接时，如果为每一个客户端创建一个线程，那么服务端的线程资源很容易就被消耗完</p><p>我们可以把建立连接的客户端的文件描述符都存放到一个数组里面，通过系统调用函数select，把一个文件描述符的数组发给操作系统，让操作系统去完成遍历并确定哪个文件描述符是可以进行读写的，然后用户线程根据结果进行处理</p><h3 id="服务端代码" tabindex="-1"><a class="header-anchor" href="#服务端代码"><span>服务端代码</span></a></h3><p>线程A</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>while(1) {</span></span>
<span class="line"><span>  // 不断接受客户端连接，并把 socket 文件描述符放到一个 list 里</span></span>
<span class="line"><span>  connfd = accept(listenfd);</span></span>
<span class="line"><span>  fcntl(connfd, F_SETFL, O_NONBLOCK);</span></span>
<span class="line"><span>  fdlist.add(connfd);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>线程B</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>while(1) {</span></span>
<span class="line"><span>  // 把一堆文件描述符 list 传给 select 函数</span></span>
<span class="line"><span>  // 有已就绪的文件描述符就返回，nready 表示有多少个就绪的</span></span>
<span class="line"><span>  nready = select(fdlist);</span></span>
<span class="line"><span>  // 用户层依然要遍历，只不过少了很多无效的系统调用</span></span>
<span class="line"><span>  for(fd &lt;-- fdlist) {</span></span>
<span class="line"><span>    if(fd != -1) {</span></span>
<span class="line"><span>      // 只读已就绪的文件描述符</span></span>
<span class="line"><span>      read(fd, buf);</span></span>
<span class="line"><span>      // 总共只有 nready 个已就绪描述符，不用过多遍历</span></span>
<span class="line"><span>      if(--nready == 0) break;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://mmbiz.qpic.cn/mmbiz_gif/GLeh42uInXTyY80RSpUTLjIMiaGGicv9zAicgy5qFYcyoWPAV31k82icRe6I4Lya2F9qWcBlhHv3kzpgt9yjD7Hnpw/640?wx_fmt=gif&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1" alt="图片"></p><p>整体流程如下：</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210817160011.png" alt=""></p><ul><li><p>对于用户层来说，一般<strong>感受不到阻塞</strong>，因为请求来了，可以用放到线程池里执行</p></li><li><p>但对于执行select的内核层而言，是<strong>阻塞</strong>的，需要阻塞地<strong>等待某个套接字变为可读</strong>。</p></li><li><p>做到了一个线程处理多个客户端连接（文件描述符），又减少了系统调用的开销（多个文件描述符只有一次 select 的系统调用 + n 次就绪状态的文件描述符的 recvfrom 系统调用）</p></li><li><p>IO多路复用其实是阻塞在select，poll，epoll这类系统调用上的，<strong>复用的是执行select，poll，epoll的线程</strong></p></li></ul><h2 id="信号驱动io模型" tabindex="-1"><a class="header-anchor" href="#信号驱动io模型"><span>信号驱动IO模型</span></a></h2><blockquote><p>跑KFC嫌麻烦，刚好有个会员，直接点份wai mai，美滋滋。当wai mai送达时，会收到取餐电话（信号）。在收到取餐电话之前，我可以愉快地吃或者学习。</p></blockquote><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/信号驱动IO模型.png" alt=""></p><p>信号驱动IO模型执行分为两个阶段：</p><ul><li><strong>数据准备阶段是不阻塞的</strong>，当数据准备完成之后，会主动地通知用户进程数据已经准备完成，对用户线程做一个回调</li><li><strong>数据拷贝阶段是阻塞的</strong>，等待数据拷贝</li></ul><p>与非阻塞IO模型的区别在于第一阶段，非阻塞IO模型是轮询结果，信号驱动IO模型是等待信号</p><h2 id="异步io模型" tabindex="-1"><a class="header-anchor" href="#异步io模型"><span>异步IO模型</span></a></h2><blockquote><p>此时科技的发展已经超乎想象了，wai mai机器人将quan jia tong自动送达并<strong>转换成营养</strong>快速注入我的体内，同时还能得到口感的满足。注入结束后，机器人会提醒我注入完毕。在这个期间我可以放心大胆的玩，甚至注射的时候也<strong>不需要停下来</strong>！</p></blockquote><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/异步IO模型.png" alt=""></p><p>用户进程发起系统调用后，立刻就可以开始去做其他的事情，然后直到I/O<strong>数据准备好并复制完成后</strong>，内核会给用户进程<strong>发送通知</strong>，告诉用户进程操作<strong>已经完成</strong>了。</p><p>特点：</p><ul><li>异步IO执行的<strong>两个阶段都不会阻塞</strong>读写操作，由内核完成</li><li>完成后内核将数据放到指定的缓冲区，<strong>通知</strong>应用程序来取</li></ul><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><ul><li>从效率上看：阻塞IO&lt;非阻塞IO&lt;多路复用IO&lt;信号驱动IO&lt;异步IO</li><li>从同步/异步看：只有异步IO模型是异步的，其他均为同步</li></ul><h3 id="io模型的发展经历" tabindex="-1"><a class="header-anchor" href="#io模型的发展经历"><span>IO模型的发展经历</span></a></h3><ol><li>一切的开始都是源于操作系统给我们提供的recvfrom这个阻塞的函数，我们称之为<strong>阻塞IO</strong></li><li>为了减少阻塞带来的等待时间，程序员在用户态通过多线程来防止主线程卡死 <ul><li>主线程接收客户端</li><li>新建子线程完成阻塞的recvfrom函数调用</li></ul></li><li>后来操作系统发现这个需求比较大，于是在操作系统层面提供了非阻塞的recvfrom函数，通过修改文件描述符的errorno，这样就可以在一个线程内完成多个文件描述符的读取，我们称之为<strong>非阻塞IO</strong></li><li>但是多个文件描述符的读取就需要遍历，当高并发场景下，用户态需要遍历的文件描述符变得多起来了，相当于在一个while循环内进行了更多的系统调用，此时性能大打折扣</li><li>后来操作系统又发现这个场景需求量较大，于是又在操作系统层面提供了遍历文件描述符的函数，用户态可以直接从内核态拿到可读写的文件描述符，我们称之为<strong>IO多路复用</strong></li><li>IO多路复用有三个函数，最开始是select，然后又发明了poll解决了select对文件描述符的限制，接着又发明了epoll解决了select三个不足</li></ol><p><strong>所以，IO 模型的演进，其实就是时代的变化，倒逼着操作系统将更多的功能加到自己的内核而已</strong></p><p>在内核态完成操作肯定比在用户态完成操作效率高</p><h1 id="bio-同步阻塞" tabindex="-1"><a class="header-anchor" href="#bio-同步阻塞"><span>BIO - 同步阻塞</span></a></h1><h2 id="实现过程" tabindex="-1"><a class="header-anchor" href="#实现过程"><span>实现过程</span></a></h2><ol><li>在服务端启动一个ServerSocket来<strong>监听网络请求</strong></li><li>客户端启动Socket发起网络请求</li><li>默认情况下ServerSocket会<strong>建立一个线程</strong>来处理此请求，如果服务端没有线程可用，客户端则会<strong>阻塞等待</strong>或遭到<strong>拒绝</strong>，<strong>并发效率比较低</strong></li></ol><h2 id="实现原理" tabindex="-1"><a class="header-anchor" href="#实现原理"><span>实现原理</span></a></h2><p><strong>一个连接一个线程</strong>，若有客户端有连接请求服务端就需要启动一个线程进行处理，如果这个连接不做任何事情会造成不必要的<strong>线程开销</strong>。可以通过线程池机制改善</p><h2 id="适用场景" tabindex="-1"><a class="header-anchor" href="#适用场景"><span>适用场景</span></a></h2><p>连接数目比较小且固定的架构，对服务器资源要求高，并发局限于应用中</p><h1 id="nio-同步非阻塞" tabindex="-1"><a class="header-anchor" href="#nio-同步非阻塞"><span>NIO - 同步非阻塞</span></a></h1><h2 id="实现原理-1" tabindex="-1"><a class="header-anchor" href="#实现原理-1"><span>实现原理</span></a></h2><p><strong>一个请求一个通道</strong>，即客户端发送的连接请求都会<strong>注册到多路复用器</strong>上，多路复用器轮询到连接<strong>有 I/O 请求时才启动</strong>一个线程进行处</p><h2 id="适用场景-1" tabindex="-1"><a class="header-anchor" href="#适用场景-1"><span>适用场景</span></a></h2><p>连接数目多且连接比较短（轻操作）的架构，比如聊天服务器，并发局限于应用中</p><h2 id="重要角色" tabindex="-1"><a class="header-anchor" href="#重要角色"><span>重要角色</span></a></h2><h3 id="缓冲区buffer" tabindex="-1"><a class="header-anchor" href="#缓冲区buffer"><span>缓冲区Buffer</span></a></h3><p>所有数据都是用<strong>缓冲区（用户空间缓冲区）处理的。在读取数据时，它是直接读到缓冲区中的；在写入数据时，也是写入到缓冲区中。任何时候访问NIO中的数据，都是通过缓冲区进行操作。缓冲区实际上是一个数组，并提供了对数据的结构化访问</strong>以及<strong>维护读写位置</strong>等信息</p><h4 id="写操作" tabindex="-1"><a class="header-anchor" href="#写操作"><span>写操作</span></a></h4><ol><li>clear()</li><li>put() -&gt; 写操作</li><li>flip() -&gt; 重置游标</li><li>SocketChannel.write(buffer) -&gt; 将缓存数据发送到网络的另一端</li><li>clear()</li></ol><p>读操作</p><ol><li>clear()</li><li>SocketChannel.read(buffer) -&gt; 从网络中读取数据</li><li>buffer.flip()</li><li>buffer.get() -&gt; 读取数据</li><li>buffer.clear()</li></ol><h3 id="通道channel" tabindex="-1"><a class="header-anchor" href="#通道channel"><span>通道Channel</span></a></h3><p>nio中对数据的读取和写入要通过Channel，它就像<strong>水管一样</strong>，是一个通道。通道不同于流的地方就是通道是<strong>双向</strong>的，可以用于读、写和同时读写操作。</p><h3 id="多路复用器selector" tabindex="-1"><a class="header-anchor" href="#多路复用器selector"><span>多路复用器Selector</span></a></h3><p>用于注册通道。客户端发送的连接请求都会注册到多路复用器上，<strong>多路复用器轮询到连接有I/O请求时才启动一个线程进行处理</strong></p><h1 id="aio-异步非阻塞" tabindex="-1"><a class="header-anchor" href="#aio-异步非阻塞"><span>AIO - 异步非阻塞</span></a></h1><h2 id="实现原理-2" tabindex="-1"><a class="header-anchor" href="#实现原理-2"><span>实现原理</span></a></h2><p>进行读写操作时，只需直接调用api的read或write方法即可。<strong>一个有效请求对应一个线程</strong>，客户端的IO请求都是<strong>操作系统先完成了再通知服务器</strong>应用去启动线程进行处理</p><h2 id="适用场景-2" tabindex="-1"><a class="header-anchor" href="#适用场景-2"><span>适用场景</span></a></h2><p>连接数目多且连接比较长（重操作）的架构，比如相册服务器，充分调用 OS 参与并发操作</p>`,96),t=[l];function r(p,h){return n(),s("div",null,t)}const g=i(e,[["render",r],["__file","IO.html.vue"]]),d=JSON.parse('{"path":"/writings/archive/IO.html","title":"系统调用函数","lang":"zh-CN","frontmatter":{"description":"系统调用函数 recvfrom Linux系统提供给用户用于接收网络IO的系统接口。从套接字上接收一个消息 如果此系统调用返回值<0，并且 errno为EWOULDBLOCK或EAGAIN（套接字已标记为非阻塞，而接收操作被阻塞或者接收超时 ）时，连接正常，阻塞接收数据（这很关键，前4种IO模型都设计此系统调用） select 系统调用允许程序同时在多...","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/archive/IO.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"系统调用函数"}],["meta",{"property":"og:description","content":"系统调用函数 recvfrom Linux系统提供给用户用于接收网络IO的系统接口。从套接字上接收一个消息 如果此系统调用返回值<0，并且 errno为EWOULDBLOCK或EAGAIN（套接字已标记为非阻塞，而接收操作被阻塞或者接收超时 ）时，连接正常，阻塞接收数据（这很关键，前4种IO模型都设计此系统调用） select 系统调用允许程序同时在多..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://mmbiz.qpic.cn/mmbiz_gif/GLeh42uInXTyY80RSpUTLjIMiaGGicv9zArJDictJLnnRWwXriaXkgJFXnUsibFTlxjqSaBicqpeH4NhXBCqWuFgc7VQ/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-30T16:21:52.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:modified_time","content":"2022-07-30T16:21:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"系统调用函数\\",\\"image\\":[\\"https://mmbiz.qpic.cn/mmbiz_gif/GLeh42uInXTyY80RSpUTLjIMiaGGicv9zArJDictJLnnRWwXriaXkgJFXnUsibFTlxjqSaBicqpeH4NhXBCqWuFgc7VQ/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1\\",\\"https://mmbiz.qpic.cn/mmbiz_gif/GLeh42uInXTyY80RSpUTLjIMiaGGicv9zADM8nrhNkEtFpSpLjGicOemZ5mt7orYF8vFC7g83lPVDeSbnlgKl7XaA/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210817095814.png\\",\\"https://mmbiz.qpic.cn/mmbiz_gif/GLeh42uInXTyY80RSpUTLjIMiaGGicv9zAT6rHhibbzK5rXiarLuJU0P4MGrHNl35vVCV4JdS4FeejOkl8bBGz9nVQ/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210817154602.png\\",\\"https://mmbiz.qpic.cn/mmbiz_gif/GLeh42uInXTyY80RSpUTLjIMiaGGicv9zAicgy5qFYcyoWPAV31k82icRe6I4Lya2F9qWcBlhHv3kzpgt9yjD7Hnpw/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210817160011.png\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/%E4%BF%A1%E5%8F%B7%E9%A9%B1%E5%8A%A8IO%E6%A8%A1%E5%9E%8B.png\\",\\"https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/%E5%BC%82%E6%AD%A5IO%E6%A8%A1%E5%9E%8B.png\\"],\\"dateModified\\":\\"2022-07-30T16:21:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"recvfrom","slug":"recvfrom","link":"#recvfrom","children":[]},{"level":2,"title":"select","slug":"select","link":"#select","children":[{"level":3,"title":"select函数的缺陷","slug":"select函数的缺陷","link":"#select函数的缺陷","children":[]}]},{"level":2,"title":"poll","slug":"poll","link":"#poll","children":[]},{"level":2,"title":"epoll","slug":"epoll","link":"#epoll","children":[{"level":3,"title":"epoll解决select函数缺陷的方式","slug":"epoll解决select函数缺陷的方式","link":"#epoll解决select函数缺陷的方式","children":[]}]},{"level":2,"title":"sigaction","slug":"sigaction","link":"#sigaction","children":[]},{"level":2,"title":"阻塞IO模型","slug":"阻塞io模型","link":"#阻塞io模型","children":[]},{"level":2,"title":"非阻塞IO模型","slug":"非阻塞io模型","link":"#非阻塞io模型","children":[]},{"level":2,"title":"IO多路复用模型","slug":"io多路复用模型","link":"#io多路复用模型","children":[{"level":3,"title":"服务端代码","slug":"服务端代码","link":"#服务端代码","children":[]}]},{"level":2,"title":"信号驱动IO模型","slug":"信号驱动io模型","link":"#信号驱动io模型","children":[]},{"level":2,"title":"异步IO模型","slug":"异步io模型","link":"#异步io模型","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[{"level":3,"title":"IO模型的发展经历","slug":"io模型的发展经历","link":"#io模型的发展经历","children":[]}]},{"level":2,"title":"实现过程","slug":"实现过程","link":"#实现过程","children":[]},{"level":2,"title":"实现原理","slug":"实现原理","link":"#实现原理","children":[]},{"level":2,"title":"适用场景","slug":"适用场景","link":"#适用场景","children":[]},{"level":2,"title":"实现原理","slug":"实现原理-1","link":"#实现原理-1","children":[]},{"level":2,"title":"适用场景","slug":"适用场景-1","link":"#适用场景-1","children":[]},{"level":2,"title":"重要角色","slug":"重要角色","link":"#重要角色","children":[{"level":3,"title":"缓冲区Buffer","slug":"缓冲区buffer","link":"#缓冲区buffer","children":[]},{"level":3,"title":"通道Channel","slug":"通道channel","link":"#通道channel","children":[]},{"level":3,"title":"多路复用器Selector","slug":"多路复用器selector","link":"#多路复用器selector","children":[]}]},{"level":2,"title":"实现原理","slug":"实现原理-2","link":"#实现原理-2","children":[]},{"level":2,"title":"适用场景","slug":"适用场景-2","link":"#适用场景-2","children":[]}],"git":{"createdTime":null,"updatedTime":1659198112000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":12.62,"words":3785},"filePathRelative":"writings/archive/IO.md","autoDesc":true}');export{g as comp,d as data};
