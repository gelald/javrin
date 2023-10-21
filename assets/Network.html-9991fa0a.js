import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as t,e}from"./app-859571d0.js";const i={},o=e('<h1 id="网络设备" tabindex="-1"><a class="header-anchor" href="#网络设备" aria-hidden="true">#</a> 网络设备</h1><h2 id="网线" tabindex="-1"><a class="header-anchor" href="#网线" aria-hidden="true">#</a> 网线</h2><p>大刘的电脑 A 和小美电脑 B 可以通过<strong>网线</strong>连接起来，组成一个网络，于是这两台电脑可以互相传输接收数据</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211228142159.png" alt=""></p><h2 id="交换机" tabindex="-1"><a class="header-anchor" href="#交换机" aria-hidden="true">#</a> 交换机</h2><p>没过多久，隔壁老王的电脑 C 、阿丽的电脑 D 和 敏敏的电脑 E 也要加入到上面的网络中，参与数据传输接收的过程，显然只使用网线是不现实的，因为如果要实现5个电脑两两之间可以传输数据，需要 5 * 5 = 25 条网线，且电脑不一定有这么多网线接口。那么搞不定的问题就用分层的办法处理</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211228142653.png" alt=""></p><p>于是出现了二层网络设备——<strong>交换机</strong>，交换机提供了网络互联的功能</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211228142849.png" alt=""></p><blockquote><p>既然交换机可以接入多台电脑，那么它是怎么识别不同的电脑的呢？又是如何进行数据转发的呢？</p></blockquote><p>每个电脑的网卡的 <strong>MAC 地址</strong>都是不一样的，MAC 地址是烧录到电脑的网卡上的，也叫硬件地址，可以标识某一台设备。电脑在发送数据时，数据头部携带了网卡的 MAC 地址，交换机就可以识别数据的 MAC 地址来区分不同的电脑</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211228143922.png" alt=""></p><p>但是交换机除了能识别不同的电脑外，还需要找到电脑连接的<strong>交换机端口</strong>，才能顺利地把数据从相应端口发送出去。交换机通过<strong>自学机制</strong>，把学习到的 MAC 地址和交换机端口号维护成一份 <strong>MAC 地址表</strong>，数据传输时就根据 MAC 地址表进行转发</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211228144424.png" alt=""></p><h2 id="路由器" tabindex="-1"><a class="header-anchor" href="#路由器" aria-hidden="true">#</a> 路由器</h2><p>随着韩国棒棒的电脑 F 、美国山姆的电脑 G 和印度三三的电脑 H 等陆续加入这个网络，网络中的上网设备变得越来越多，交换机需要记录的 MAC 地址也变得越来越多。但是交换机的容量和性能有限，一方面，MAC 地址表无法记录全世界电脑的 MAC 地址和对应的端口号（一台交换机上的端口也是有限的）；另一方面，MAC 地址表中的数据量过多也容易导致无法快速查找到对应的 MAC 地址表项</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211228145549.png" alt=""></p><p>交换机搞不定的问题，就继续用分层的办法处理。</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211228145715.png" alt=""></p><p>于是出现了第三层的网络设备——<strong>路由器</strong>，路由器可以把全世界的网络连接起来。局域网内的网络可以通过交换机进行数据交换，例如一个公司内部的网络通过交换机相互连接。不同区域的局域网互联使用路由器来完成</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211228151935.png" alt=""></p><blockquote><p>那么如何区分不同的网络区域呢？又是如何跨网络区域进行数据转发的呢？</p></blockquote><p>MAC 地址可以标识某一台设备，但无法用来标识某一个网络区域，为了区分不同的网络区域，IP 地址出现了。IP 地址由网络号和主机号组成，网络号用于标识网络区域，网络号相同的主机位于同一个网络中；主机号用于标识同一个网段中的不同主机，不允许同网段中出现重复的主机号。在整个网络中通过设置网络号和主机号，来保证每台主机 IP 地址的唯一性</p><p>路由器有多个端口，分别连接不同的网络地址，不同的网络区域 IP 地址网络号不同，它通过识别目的 IP 地址的网络号，再根据<strong>路由表</strong>进行数据转发</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211228160156.png" alt=""></p><h2 id="dns-服务器" tabindex="-1"><a class="header-anchor" href="#dns-服务器" aria-hidden="true">#</a> DNS 服务器</h2><p>域名服务器（Domain Name Server）。在 Internet 上域名与 IP 地址之间是一一对应的，域名虽然便于人们记忆，但机器之间只能互相认识 IP 地址，它们之间的转换工作称为域名解析，域名解析需要由专门的域名解析服务器来完成，DNS 就是进行域名解析的服务器 。</p><h2 id="dhcp-服务器" tabindex="-1"><a class="header-anchor" href="#dhcp-服务器" aria-hidden="true">#</a> DHCP 服务器</h2><p>DHCP 指的是由服务器控制一段 IP 地址范围，客户机登录服务器时就可以自动获得服务器分配的 IP 地址和子网掩码。提升地址的使用率。</p><h1 id="tcp" tabindex="-1"><a class="header-anchor" href="#tcp" aria-hidden="true">#</a> TCP</h1><p>TCP 协议是一种面向连接的单播协议，因此在发送数据时通信双方必须先建立连接。连接可以简单理解为双方在记事本【内存】中记录下对方的信息【IP地址、端口】。TCP协议采用【三次握手】建立一个连接，采用【四次挥手】关闭一个连接</p><table><thead><tr><th>字段</th><th>含义</th></tr></thead><tbody><tr><td>同步SYN</td><td>建立连接时用于同步序号<br>当SYN=1，ACK=0时，表示这是一个连接请求报文段<br>若同意连接，则在响应报文段中令SYN=1，ACK=1<br>因此SYN在建立连接时才会被设为1，握手完成后被设为0</td></tr><tr><td>确认ACK</td><td>仅当ACK=1时，确认号字段才有效</td></tr><tr><td>终止FIN</td><td>用于释放连接<br>当FIN=1时，此报文段的发送方的数据已经发送完毕，并要求释放连接</td></tr><tr><td>序列号seq</td><td>用来标记数据段的顺序<br>TCP把连接中发送的所有数据字节都编上一个序号，第一个由本地随机生成<br>因此序列号就是当前报文段的第一个字节数据编号</td></tr><tr><td>确认号ack</td><td>期待收到对方下一个报文段的第一个数据字节的序号<br>因此当前报文段最后一个字节数据的编号+1即为确认号</td></tr></tbody></table><h2 id="三次握手" tabindex="-1"><a class="header-anchor" href="#三次握手" aria-hidden="true">#</a> 三次握手</h2><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220124153452.png" alt=""></p><ul><li>第一次握手：客户端向服务端发送连接请求报文，并进入 <code>SYN-SENT</code> 状态，等待服务器确认。报文段 SYN = 1，初始序号 seq = x，SYN = 1 的报文段不能携带数据，但是要消耗掉一个序号。<strong>本阶段服务端可以确认：客户端的发送能力是正常的；服务端的接收能力是正常的</strong></li><li>第二次握手：服务端收到客户端的连接请求报文，同意建立连接，向客户端发送确认报文，并进入 <code>SYN-RCVD</code> 状态。报文段 SYN = 1，ACK = 1，确认号 ack = x + 1，初始序号 seq = y。<strong>本阶段客户端可以确认：服务端的接收、发送能力是正常的；客户端的接收、发送能力是正常的</strong></li><li>第三次握手：客户端收到服务端的确认报文，向服务端发送确认报文，此报文发送完毕后，客户端和服务端都进入 <code>ESTABLISED</code> 状态，完成三次握手。报文段 ACK = 1，确认号 ack = y + 1，序列号 seq = x + 1。<strong>本阶段服务端可以确认：客户端的接收、发送能力是正常的；服务端的接收、发送能力是正常的</strong></li></ul><h2 id="四次挥手" tabindex="-1"><a class="header-anchor" href="#四次挥手" aria-hidden="true">#</a> 四次挥手</h2><p>关闭连接可以是客户端也可以是服务端</p><p>现假设是客户端关闭连接</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220124153525.png" alt=""></p><ul><li>第一次挥手：客户端向服务端发送连接释放报文，并停止发送数据，进入 <code>FIN-WAIT-1</code> 状态。释放报文 FIN = 1，seq = u (前面已发送数据最后一个字节的序号+1)</li><li>第二次挥手： <ul><li>服务端收到客户端的连接释放报文，发送确认报文，进入 <code>CLOSE-WAIT</code> 状态。此时服务端知道客户端停止向服务端发送数据了，但若然服务端需发送数据，客户端依然要接收。报文 ACK = 1，ack = u+1，seq = v</li><li>客户端收到服务端的确认报文后，客户端就进入 <code>FIN-WAIT-2</code> 状态，等待服务端发送连接释放报文，在这之前还是要接收来自服务端的数据</li></ul></li><li>第三次挥手：服务端将最后的数据发送完毕后，向客户端发送连接释放报文，进入 <code>LAST-ACK</code> 状态。报文 FIN = 1，ACK = 1，seq = w，ack = u+1</li><li>第四次挥手： <ul><li>客户端收到服务端的连接释放报文后，发送确认报文，进入 <code>TIME-WAIT</code> 状态。此时连接还没释放，必须等待2MSL(最长报文段寿命)的时间后，客户端才会进入 <code>CLOSED</code> 状态，释放连接</li><li>服务端收到客户端的确认后，立即进入 <code>CLOSED</code> 状态，释放了连接。服务端结束TCP连接的时间要比客户端要更早一些</li></ul></li></ul><h2 id="面试题" tabindex="-1"><a class="header-anchor" href="#面试题" aria-hidden="true">#</a> 面试题</h2><p>为什么在建立连接的阶段中客户端需要发送一次确认，可以二次握手吗？</p><blockquote><p>三次握手完成了两个重要功能</p><p>（1）双方做好发送和接收数据的准备工作</p><p>（2）双方在握手阶段就初始序列号进行确定</p><p>为了防止已失效的连接请求报文突然又传到了服务端，因而产生错误。</p><p>例子：如果客户端向服务端发送连接请求时由于网络问题导致报文丢失，客户端收不到确认，于是再发送一次连接请求，后面的这一个连接成功建立，与服务端完成数据传输并释放了连接。此时第一个连接请求<strong>可能只是在某些网络节点中长时间滞留了，延误到第二个连接释放后的某个时间才到达服务端</strong>，此时服务端<strong>误认为客户端又发送了一个请求连接</strong>，于是向客户端发送确认报文。如果采用二次握手，那么只要服务端发出了确认报文后就建立新连接，此时可能客户端既不理会服务端的确认报文又不发送数据，<strong>导致服务端一直在等待客户端的数据</strong>，浪费资源</p><p>防止出现死锁的情况</p><p>例子：如果只需要两次握手，那么只要服务端发出确认+连接请求报文后连接就建立并开始发送数据了，实际上这个报文有可能在网络中丢失了，但是客户端无法知晓这个情况，导致客户端一直在等待服务端的确认报文，忽略数据报文；而服务端的数据报文发出后导致超时，将一直重复发送同样的数据报文，这样就形成了死锁</p></blockquote><p>服务端如何防范SYN攻击？</p><blockquote><p>SYN攻击：客户端在短时间内伪造大量不存在的IP地址，向服务端不断发送SYN包（连接请求报文），服务端如果同意建立连接需要作出确认，并等待客户端的连接请求确认报文。但是由于这些地址是不存在的，服务器需要不断重发到超时，这些伪造的SYN包将长时间占用未连接队列，导致正常的SYN请求因为队列满了而被丢弃，<strong>从而引起网络拥塞甚至系统瘫痪</strong>。</p><p>防范措施：降低主机的等待时间使主机尽快的释放半连接的占用，短时间收到某IP地址的重复SYN包则丢弃后续请求</p></blockquote><p>为什么建立连接的时候是三次握手，关闭连接的时候是四次挥手？</p><blockquote><p>因为在建立连接时，当服务端收到客户端的连接请求报文时，可以直接发送SYN+ACK报文，其中ACK是用来应答的，SYN是用来同步的（请求建立连接）。但是关闭连接时，当服务端收到客户端的连接释放报文时，<strong>很可能还没完成数据的发送</strong>，只能先进行回复ACK报文，告诉客户端：你的连接释放请求我收到了，但是等到我这边的数据都发送完了，我才能发送连接释放报文。所以不能同时发送，需要四次挥手。</p></blockquote><p>为什么客户端在 <code>TIME-WAIT</code> 状态必须等待2MSL的时间</p><blockquote><p>MSL : Maximum Segment Lifetime 最长报文段生命周期</p><p>等待2MSL的时间有两个理由，需要假设网络是不可靠的</p><p>（1）保证客户端发送的最后一个ACK报文能够到达服务端，因为这个ACK报文有可能丢失，使得处于 <code>LAST-ACK</code> 状态的服务端收不到客户端最后一个ACK报文，等待到超时后，服务端会重新向客户端发送一个新的FIN+ACK报文，而客户端可以在2MSL的时间内接收到这个重传的报文，接着客户端再一次发送最后一个ACK报文并重新启动2MSL的计时器，直到客户端和服务端都进入 <code>CLOSED</code> 状态</p><p>（2）客户端在发送完最后一个ACK报文后，再经过2MSL就可以使得本连接持续的时间内所产生的报文都从网络中消失，使下一个新的连接中不会出现旧连接中的连接请求报文</p><p>第一个MSL是用来确保服务端接收客户端的最后一个ACK报文，<strong>这个时间可以被重置</strong></p><p>第二个MSL是用来确保所有旧连接的报文都消失</p></blockquote><p>如果已经建立了连接，但是客户端突然出现了故障怎么办？</p><blockquote><p>如果客户端突然出现故障，服务端不能无休止地等待下去，会导致浪费资源。TCP设有一个保活计时器，服务端每收到一次客户端的请求都会复位这个计时器，这个时间一般会设置为2小时，如果服务端2小时内都没有收到客户端的任何数据，那么会尝试发送一个嗅探报文，以后每隔75秒发送一次，如果连续10次都没有反应，那么服务端会认为客户端已下线，随即断开连接</p></blockquote><h1 id="ip地址" tabindex="-1"><a class="header-anchor" href="#ip地址" aria-hidden="true">#</a> IP地址</h1><h2 id="形式" tabindex="-1"><a class="header-anchor" href="#形式" aria-hidden="true">#</a> 形式</h2><p>IP地址是<strong>一个32位的二进制数</strong>，通常被<strong>分割成4个8位二进制数</strong>（4个字节）；同时通常用<strong>点分十进制的表示形式</strong>（a.b.c.d）其中abcd都是0~255的十进制数</p><h2 id="分类" tabindex="-1"><a class="header-anchor" href="#分类" aria-hidden="true">#</a> 分类</h2><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20201223232827.png" alt=""></p><p><img src="https://gitee.com/ngwingbun/pic/raw/master/20210321210746.png" alt=""></p><h3 id="a类地址" tabindex="-1"><a class="header-anchor" href="#a类地址" aria-hidden="true">#</a> A类地址</h3><p>A 类地址第一位以 0 开头，可变化的网络位有 7 位，即 128 个 A 类地址。其中 0 和 127 属于<strong>特殊地址</strong>，可用的 A 类地址就是 128 - 2 = <code>126</code> 个。</p><p>可变化的主机位有 24 位，即 16777216 个主机地址。其中主机位全为 0 和主机位全为 1 分别为<strong>网段地址</strong>和<strong>广播地址</strong>，不能分配给主机使用，每个 A 类地址可用的主机地址就是 16777216 - 2 = <code>16777214</code> 个。</p><p>A 类地址的范围是 <code>1.0.0.0 ~ 126.255.255.255</code> 。</p><p>A 类地址子网掩码是 <code>255.0.0.0</code> ，也可写作 <code>/8</code> 。</p><p>A 类地址的私有地址区域：<code>10.0.0.0 ~ 10.255.255.255</code></p><p>一般用于大型网络</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211228165630.png" alt=""></p><h3 id="b类地址" tabindex="-1"><a class="header-anchor" href="#b类地址" aria-hidden="true">#</a> B类地址</h3><p>B 类地址前两位以 10 开头，可变化的网络位有 14 位，即 16384 个 B 类地址。其中 128.0 和 191.255 属于<strong>特殊地址</strong>，可用的 B 类地址就是 16384 - 2 = <code>16382</code> 个。</p><p>可变化的主机位有 16 位，即 65536 个主机地址。其中主机位全为 0 和主机位全为 1 分别为<strong>网段地址</strong>和<strong>广播地址</strong>，不能分配给主机使用，每个 B 类地址可用的主机地址就是 65536 - 2 = <code>65534</code> 个。</p><p>B 类地址的范围是 <code>128.0.0.0 ~ 191.255.255.255</code> 。</p><p>B 类地址子网掩码是 <code>255.255.0.0</code> ，也可写作 <code>/16</code> 。</p><p>B 类地址私有地址区域：<code>172.16.0.0 ~ 172.31.255.255</code></p><p>一般用于中等规模网络</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211228171822.png" alt=""></p><h3 id="c类地址" tabindex="-1"><a class="header-anchor" href="#c类地址" aria-hidden="true">#</a> C类地址</h3><p>C 类地址前三位以 110 开头，可变化的网络位有 21 位，即 2097152 个 C 类地址。其中 192.0.0 和 223.255.255 属于<strong>特殊地址</strong>，可用的 C 类地址就是 2097152 - 2 = <code>2097150</code> 个。</p><p>可变化的主机位有 8 位，即 256 个主机地址。其中主机位全为 0 和主机位全为 1 分别为<strong>网段地址</strong>和<strong>广播地址</strong>，不能分配给主机使用，每个 C 类地址可用的主机地址就是 256 - 2 = <code>254</code> 个。</p><p>每一个网段可用主机地址：假定这个网段的主机部分位数为n，那么可用的主机地址个数为2^n - 2个 IP 地址可用（除去网关地址、广播地址）</p><p>C 类地址的范围是 <code>192.0.0.0 ~ 223.255.255.255</code> 。</p><p>C 类地址子网掩码是 <code>255.255.255.0</code> ，也可写作 <code>/24</code> 。</p><p>C 类地址私有地址区域：<code>192.168.0.0 ~ 192.168.255.255</code></p><p>一般用于小型网络</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211228173140.png" alt=""></p><h3 id="d类地址" tabindex="-1"><a class="header-anchor" href="#d类地址" aria-hidden="true">#</a> D类地址</h3><ul><li>多播地址</li><li><strong>该类IP地址的最前面为“1110”，所以地址的网络号取值于224~239之间</strong></li><li>一般用于多路广播用户</li></ul><h3 id="e类地址" tabindex="-1"><a class="header-anchor" href="#e类地址" aria-hidden="true">#</a> E类地址</h3><ul><li>保留地址</li><li><strong>该类IP地址的最前面为“1111”，所以地址的网络号取值于240~255之间</strong></li></ul><h3 id="无类地址" tabindex="-1"><a class="header-anchor" href="#无类地址" aria-hidden="true">#</a> 无类地址</h3><p>经过子网划分或超网合并的网段地址，不再是固定的网络位数，这种网络位数可变的网段地址就叫无类地址</p><p>无类地址只能通过子网掩码来计算出网络号</p><h3 id="特殊ip地址" tabindex="-1"><a class="header-anchor" href="#特殊ip地址" aria-hidden="true">#</a> 特殊IP地址</h3><table><thead><tr><th>网络部分</th><th>主机部分</th><th>地址类型</th><th>用途</th></tr></thead><tbody><tr><td>Any</td><td>全0</td><td>网络地址</td><td>代表一个网段<br>网段地址 192.168.10.0/24 表示的是网络号为 192.168.10 的所有地址</td></tr><tr><td>Any</td><td>全1</td><td>广播地址</td><td>特定网段的所有节点<br>网段地址 192.168.10.0/24 的广播地址是 192.168.10.255 。</td></tr><tr><td>127</td><td>0.1</td><td>环回地址</td><td>环回测试</td></tr><tr><td>全0</td><td>全0</td><td>所有网络</td><td>默认路由</td></tr><tr><td>全1</td><td>全1</td><td>广播地址</td><td>本网段所有节点</td></tr></tbody></table><h3 id="公有地址和私有地址" tabindex="-1"><a class="header-anchor" href="#公有地址和私有地址" aria-hidden="true">#</a> 公有地址和私有地址</h3><p>在A、B、C类地址中，划分了一部分作为私有IP地址，另一部分为公有IP地址。<strong>公有IP它是由NIC（网络信息中心）或者ISP（网络服务提供商）分配的地址作为公网IP，私有IP地址是预留给各企业内部网自由支配的IP地址</strong>。</p><h4 id="私有地址不能直接访问互联网" tabindex="-1"><a class="header-anchor" href="#私有地址不能直接访问互联网" aria-hidden="true">#</a> 私有地址不能直接访问互联网</h4><p>公网上没有针对私有地址的路由，会产生地址冲突问题，当访问互联网时，需要利用网络地址转换（NAT，Network Address Translation）技术，把私有IP地址转换为互联网可识别的公共IP地址</p><h2 id="子网掩码" tabindex="-1"><a class="header-anchor" href="#子网掩码" aria-hidden="true">#</a> 子网掩码</h2><p>子网掩码也是由32位二进制数组成，网络位为1，主机位为0。子网掩码和 IP 地址进行 <code>&amp;</code> 运算，来决定 IP 地址中网络号部分和主机号部分</p><p>缺省状态下，如果没有进行子网划分，各类网络有默认的子网掩码</p><ul><li>A类网络：255.0.0.0，前8位为网络部分，后24位为主机部分</li><li>B类网络：255.255.0.0，前16位为网络部分，后16位为主机部分</li><li>C类网络：255.255.255.0，前24位为网络部分，后8位为主机部分</li></ul><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210329214138.png" alt=""></p><h3 id="子网掩码另一种表示方式" tabindex="-1"><a class="header-anchor" href="#子网掩码另一种表示方式" aria-hidden="true">#</a> 子网掩码另一种表示方式</h3><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210329214523.png" alt=""></p><h3 id="无子网编址" tabindex="-1"><a class="header-anchor" href="#无子网编址" aria-hidden="true">#</a> 无子网编址</h3><p>不对网段进行细分，使用默认的子网掩码。但是在实际使用网络时，需要的 IP 地址数量却是各不相同</p><blockquote><p>例子一：一个公司有 500 台电脑，需要分配 500 个 IP 地址。如果分配一个 C 类地址，一个 C 类地址的可用 IP 地址数量是 254 个，可用地址不够使用。如果分配一个 B 类地址，一个 B 类地址的可用 IP 地址数量是 65534 个，会造成大量的 IP 地址浪费。</p></blockquote><blockquote><p>例子二：一个家庭有 2 台电脑需要上网，如果分配一个 C 类地址也很浪费，但是没有比 C 类范围更小的地址。</p></blockquote><p>为了解决 IP 地址浪费的问题，可以结合使用 CIDR （无类域间路由）和 VLSM （可变长子网掩码）技术</p><h3 id="vlsm" tabindex="-1"><a class="header-anchor" href="#vlsm" aria-hidden="true">#</a> VLSM</h3><p>VLSM 可以对 A 、 B 、 C 类地址进行划分，划分成各种类型大小的网络，可用主机地址数量可以灵活地缩放，划分地址的过程也叫<strong>子网划分</strong></p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211228193252.png" alt=""></p><h3 id="cidr" tabindex="-1"><a class="header-anchor" href="#cidr" aria-hidden="true">#</a> CIDR</h3><p>CIDR 可以把多个分类地址汇聚到一起，生成一个更大的网段，以减少路由器中路由条目的数量，减轻路由器的负担。分类地址合并的过程也叫<strong>超网合并</strong></p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211228194044.png" alt=""></p><h3 id="带子网编址" tabindex="-1"><a class="header-anchor" href="#带子网编址" aria-hidden="true">#</a> 带子网编址</h3><p>从地址分配的角度看，子网是对网段地址的扩充。网络管理员根据组织的扩张来决定每一个子网的大小</p><p>利用子网，网络地址的使用会更为有效。对外，仍然是一个网络，对内，则分为不同子网</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210329220722.png" alt=""></p><h2 id="子网划分" tabindex="-1"><a class="header-anchor" href="#子网划分" aria-hidden="true">#</a> 子网划分</h2><p>子网划分是从 IP 地址的主机位的最左边开始，把主机位划入网络位，得到多个子网地址。主机位变成网络位的部分叫做子网号，划分后的子网数量等于 2 的 N 次方，N 等于子网号的位数。每把一位主机位变成网络位，一个网段地址就变成两个子网地址，子网地址的地址数量只有原来网段地址的一半。</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211229093457.png" alt=""></p><blockquote><p>举个例子</p></blockquote><p>一个学校有 150 台电脑，有 3 个电脑室，每个电脑室 50 台电脑。使用私有地址 192.168.0.0/24 给每个电脑室都分配一个网段地址。</p><ol><li><p>每个电脑室 50 台电脑，计算出子网地址的主机位是6位</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211229100600.png" alt=""></p></li><li><p>计算子网地址的网络位，32 - 主机位 = 26 位</p></li><li><p>使用私有地址 192.168.0.0/24 分配 3 个主机位同为26位的子网地址。子网号有 2 位，因此可以划分出 4 个大小相同的子网地址</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211229102449.png" alt=""></p></li><li><p>按照子网号从小到大的排序，分配 3 个子网地址给电脑室使用</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211229102824.png" alt=""></p><blockquote><p>子网掩码应该改为 255.255.255.192</p></blockquote></li></ol><blockquote><p>再举个例子</p></blockquote><p>一个公司有 157 人，市场部 100 人，技术部 50 人，行政部 4 人，财务部 3 人，每人一台办公电脑。使用私有地址 192.168.100.0/24 分别为每个部门划分网络地址。</p><ol><li><p>按照需要的 IP 地址数量，从大到小依次进行子网划分，先计算市场部（100人）所需子网的主机位是 7 位</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211229103318.png" alt=""></p></li><li><p>得出市场部所需子网地址的网络位，32 - 主机位 = 25 位</p></li><li><p>使用私有地址 192.168.100.0/24 分配第一个主机位为 25 位的子网地址：192.168.100.0/25</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211229103913.png" alt=""></p></li><li><p>保证与第一个子网地址不重复的前提下，使用未分配的子网值最小的子网地址，来计算第二个需要分配的子网地址：使用 192.168.100.128/25 分配第二个子网地址给技术部（50人），通过计算得出主机位是 6 位，网络位是 26 位，子网地址为 192.168.100.128/26</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211229104716.png" alt=""></p></li><li><p>保证与前两个子网地址不重复的前提下，使用未分配的子网值最小的子网地址，来计算第三个需要分配的子网地址：使用 192.168.100.192/26 分配第三个子网地址给行政部（4人），通过计算得出主机位是3位，网络位是29位，子网地址为 192.168.100.192/29</p></li><li><p>依次类推，分配给财务部（3人）使用得子网地址为 192.168.100.200/29</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211229105252.png" alt=""></p></li></ol><h2 id="超网合并" tabindex="-1"><a class="header-anchor" href="#超网合并" aria-hidden="true">#</a> 超网合并</h2><p>与子网划分相反，把一些小网络合并组成一个大网络就是超网合并</p><p>通过左移子网掩码合并多个网段，右移子网掩码将一个网段划分成多个子网，使得IP地址打破了传统的A类、B类、C类的界限。</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211229110450.png" alt=""></p><blockquote><p>图中的 192.168.3.64/26 和 192.168.3.128/26 地址可以合并吗？</p></blockquote><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211229150351.png" alt=""></p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211229150401.png" alt=""></p><p>不能合并，因为当子网掩码向左移动一位时，网络号不相同，无法合并</p><p>结论：子网掩码左移一位，且网络号相同，能够合并两个网段；左移两位，且网络号相同，能够合并四个网段；左移三位，能够合并八个网段。依次类推。</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211229150155.png" alt=""></p><blockquote><p>如何判断一个网段是超网还是子网</p></blockquote><p>如果该网段的子网掩码比默认子网掩码长，就是子网，如果该网段的子网掩码比默认子网掩码短，则是超网。</p><h1 id="路由" tabindex="-1"><a class="header-anchor" href="#路由" aria-hidden="true">#</a> 路由</h1><h2 id="路由表" tabindex="-1"><a class="header-anchor" href="#路由表" aria-hidden="true">#</a> 路由表</h2><p>路由器在收到数据包时，会识别目的 IP 地址的<strong>网络号</strong>，来查询路由表的路由条目，根据<strong>最长匹配</strong>的路由条目，来判断应该从哪个接口转发数据包。路由表中有匹配的路由条目才会发送数据，无匹配的路由条目则直接丢弃。</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211229151932.png" alt=""></p><p>路由表中的路由条目包含目的地址、下一条、出接口等信息</p><ul><li><p>目的地址（ Destination / Mask ）：表示目的网段地址或者 IP 地址。这个目的地址既可以是直连在路由器接口上的网段地址，也可以是其他路由器上的网段地址或 IP 地址</p></li><li><p>下一条/出接口（ NextHop / Interface ）：表示转发数据包时，下一跳设备的接口 IP 地址或将数据包从哪个接口转发出去</p></li><li><p>协议类型（ Proto / Protocol 简写 ）：表示路由条目的获取方式</p><ul><li>直连路由：路由器直接连接的路由条目，只要接口配置了 IP 地址，接口状态正常，就会自动生成对应的直连路由。</li><li>静态路由：通过命令手动添加的路由条目</li><li>动态路由：通过路由协议从相邻路由器动态学习到的路由条目</li></ul></li><li><p>优先级（ Pre / Preference 简写 ）：表示有多条去往同一个目的地址的路由条目，根据路由条目的类型，选择优先级最高的路由条目添加到路由表中。路由优先级的值越小，代表优先级越高</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211229170006.png" alt=""></p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211229172754.png" alt=""></p></li><li><p>路径开销（Cost）：表示通过同一种路由类型学习到多条去往同一个目的地址的路由条目，选择路径开销最小的路由条目添加到路由表里面。</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211229172811.png" alt=""></p></li></ul><h2 id="直连路由" tabindex="-1"><a class="header-anchor" href="#直连路由" aria-hidden="true">#</a> 直连路由</h2><p>直连路由是唯一一种自动向路由表中添加路由条目。这种路由条目指向的目的网络是路由器接口直连的网络，直连路由的路由优先级和路径开销值都是 0 。</p><p>为了保障直连路由的可用性，路由器只会把<strong>状态正常的接口</strong>所连接的网络，作为直连路由放入自己的路由表中。</p><h2 id="静态路由" tabindex="-1"><a class="header-anchor" href="#静态路由" aria-hidden="true">#</a> 静态路由</h2><p>默认情况下，路由器只会自动生成直连路由。对于非直连网络，路由器并不知道要如何转发才能到达非直连网络。这时，我们就可以<strong>手动添加</strong>静态路由，告诉路由器如何转发去往某个网络的数据包。</p><p>静态路由的默认路由优先级为 60 ，还可以手动调整静态路由的优先值。静态路由的路径开销值是 0。</p><h3 id="负载分担" tabindex="-1"><a class="header-anchor" href="#负载分担" aria-hidden="true">#</a> 负载分担</h3><p>通过目的地址相同、下一跳或出接口不同的两条静态路由实现数据流量的<strong>负载分担</strong>，也叫等价静态路由。路由器会同时使用这两条静态路由条目转发数据包。但是在实际网络环境中，不推荐使用，因为数据报文往返路径不对称，会导致上层应用受影响。</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211229195346.png" alt=""></p><h3 id="路由备份" tabindex="-1"><a class="header-anchor" href="#路由备份" aria-hidden="true">#</a> 路由备份</h3><p>通过目的地址相同、路由优先级不同的两条静态路由实现<strong>路由备份</strong>，也叫浮动静态路由。当优先级高的路由条目出现问题时，路由器就会使用另一条优先级低的路由条目来转发数据包。</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211229195508.png" alt=""></p><h3 id="优点" tabindex="-1"><a class="header-anchor" href="#优点" aria-hidden="true">#</a> 优点</h3><ul><li>静态路由不会被删除，路由条目更稳定</li><li>手动添加静态路由后，路由器会使用这条静态路由进行数据包转发，路由条目更可控</li></ul><h3 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点" aria-hidden="true">#</a> 缺点</h3><ul><li>在越大型网络中，配置和维护路由协议的工作量越大，出差的概率就越大。在大型网络中，静态路由只能作为动态路由的补充，因为静态路由的<strong>扩展性差</strong>。</li><li>动态路由可以自动删除失效的动态路由条目。而静态路由<strong>无法反映拓扑变化</strong>，必须进行手动干预删除失效静态路由，否则路由器仍会按照配置的静态路由进行数据包转发。</li></ul><h2 id="默认路由" tabindex="-1"><a class="header-anchor" href="#默认路由" aria-hidden="true">#</a> 默认路由</h2><p>路由器只能转发有路由条目的数据包，对于网络未知的数据包，会选择丢弃。实际上不可能知道网络上所有资源的 IP 地址，需要选择一种特殊的方式解决这个问题。</p><p>路由转发会遵循<strong>最长匹配原则</strong>：当匹配的目的 IP 地址的路由条目有多条时，路由器会选择子网掩码最长的路由条目，也就是选择最精准的路由条目来转发数据包。</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211229201501.png" alt=""></p><p>所以通常会配置一个 <code>0.0.0.0/0</code> 的静态路由，这个路由可以匹配任何目的 IP 地址的数据包；同时，只要路由器上有任何一条可以匹配目的 IP 地址的路由条目，这条一定会比 <code>0.0.0.0/0</code> 更精准，路由器会选择更精准匹配的路由条目进行数据包转发。已知的目的 IP 地址进行精准匹配，未知的目的 IP 地址就使用 <code>0.0.0.0/0</code> ，这样就保证了所有数据包都能成功发送出去</p><h2 id="网关" tabindex="-1"><a class="header-anchor" href="#网关" aria-hidden="true">#</a> 网关</h2><p>两个网络之间要实现通信，必须要通过<strong>网关</strong>。网关的 IP 地址可以是路由器的某个接口的 IP 地址，也可以是三层交换机 VLAN 端口的 IP 地址。</p><p>一台主机可以有多个网关，当一台主机找不到可用的网关时，数据包会发送给<strong>默认网关</strong>。其实主机上配置的默认网关就是默认路由。</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211229202712.png" alt=""></p><h2 id="实战" tabindex="-1"><a class="header-anchor" href="#实战" aria-hidden="true">#</a> 实战</h2><h3 id="静态路由实战" tabindex="-1"><a class="header-anchor" href="#静态路由实战" aria-hidden="true">#</a> 静态路由实战</h3><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211230102353.png" alt=""></p><p>要求</p><ul><li>使用 ENSP 模拟器</li><li>PC 1 能 ping 通 PC 2</li><li>PC 1 和 RT 1 使用网段 <code>192.168.1.0/24</code> 互联</li><li>PC 2 和 RT 2 使用网段 <code>192.168.2.0/24</code> 互联</li><li>RT 1 和 RT 2 使用网段 <code>192.168.3.0/24</code> 互联</li></ul><p>步骤</p><ol><li><p>分配 IP 地址</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211230103402.png" alt=""></p><p>PC 1 的 <code>E0/0/1</code> 口配置 <code>192.168.1.1/24</code></p><p>PC 2 的 <code>E0/0/1</code> 口配置 <code>192.168.2.2/24</code></p><p>RT 1 的 <code>G0/0/1</code> 口配置 <code>192.168.1.10/24</code> ，<code>G0/0/0</code> 口配置 <code>192.168.3.10/24</code></p><p>RT 2 的 <code>G0/0/1</code> 口配置 <code>192.168.2.20/24</code> ，<code>G0/0/0</code> 口配置 <code>192.168.3.20/24</code></p></li><li><p>PC 1 分别 ping 网段1 、网段2 、网段3 的 IP 地址，结果<strong>只能 ping 通同网段</strong>的 <code>192.168.1.10</code> ，其余不同网段的 IP 地址都无法 ping 通。其它主机和路由器也是只能 ping 通同网段的 IP 地址。</p></li><li><p>打通 PC 1 到 PC 2 的路由，配置 PC 1 的默认网关 <code>192.168.1.10/24</code> ，RT 1 配置到达 <code>192.168.2.0/24</code> 的静态路由</p></li><li><p>配置 PC 2 到 PC 1 的回程路由，配置 PC 2 的默认网关 <code>192.168.2.20/24</code>，RT 2 配置到达 <code>192.168.1.0/24</code> 的静态路由</p></li><li><p>PC 1 ping PC 2 成功</p></li></ol><h3 id="浮动-等价路由实战" tabindex="-1"><a class="header-anchor" href="#浮动-等价路由实战" aria-hidden="true">#</a> 浮动/等价路由实战</h3><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211230112404.png" alt=""></p><p>要求</p><ul><li>使用 ENSP 模拟器</li><li>在上述基础上，新增一条网线连接 RT 1 和 RT 2，使用网段：<code>192.168.4.0/24</code></li><li>配置浮动静态路由</li><li>配置等价静态路由</li></ul><p>步骤</p><ol><li><p>分配 IP 地址</p><p>RT 1 的 <code>G0/0/2</code> 口配置 <code>192.168.4.10/24</code></p><p>RT 2 的 <code>G0/0/2</code> 口配置 <code>192.168.4.20/24</code></p></li><li><p>配置浮动静态路由：通过新增静态路由并配置不同的优先级，使一条路由条目成为备份路由。</p><p>RT 1 路由表中到 <code>192.168.2.0/24</code> 的路由条目，原本下一跳是 <code>192.168.3.20/24</code> ，优先级是 <code>60</code></p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211230121305.png" alt=""></p><p>再加一条路由条目，目的地址是 <code>192.168.2.0/24</code>，下一条是 <code>192.168.4.20/24</code>，优先级是 <code>50</code>，这样新增的优先级为 <code>50</code> 的静态路由作为主路由条目，原本优先级为 <code>60</code> 的静态路由作为备份路由条目</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211230121316.png" alt=""></p></li><li><p>配置等价静态路由：通过新增同优先级的静态路由，路由器会同时使用这两条路由条目在数据转发时进行负载分担。</p><p>在RT 1 路由表中新增一条路由条目，目的地址是 <code>192.168.2.0/24</code>，下一条是 <code>192.168.4.20/24</code>，优先级是 <code>60</code></p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211230121330.png" alt=""></p></li></ol><h1 id="http" tabindex="-1"><a class="header-anchor" href="#http" aria-hidden="true">#</a> HTTP</h1><h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h2><p>HTTP：超文本 传输 协议</p><ul><li>协议 <ul><li>协：两个以上的参与者</li><li>议：行为约定和规范</li></ul></li><li>传输：两点之间双向传输</li><li>超文本：不仅包括文本，还包括图片、视频、压缩包等</li></ul><h2 id="状态码" tabindex="-1"><a class="header-anchor" href="#状态码" aria-hidden="true">#</a> 状态码</h2><ul><li>1xx，1xx类状态码属于<strong>提示信息</strong>，是一种中间状态，还需要后续的操作</li><li>2xx，2xx类状态码表示服务器<strong>成功处理</strong>了客户端的请求 <ul><li>200 - OK：成功状态码，只要不是HEAD请求，服务器返回的响应头都会<strong>有body数据</strong></li><li>204 - No Content：成功状态码，与200基本相同，但是响应头<strong>没有body数据</strong></li><li>206 - Partial Content：表示响应返回的<strong>body数据只是资源的一部分</strong>，应用于<strong>分块下载</strong>或<strong>断点续传</strong></li></ul></li><li>3xx，3xx类状态码表示客户端请求的资源<strong>发生了变动</strong>，需要客户端用新的URL重新发送请求获取资源，也就是<strong>重定向</strong><ul><li>301 - Moved Permanently：<strong>永久重定向</strong>，说明请求的资源已经不存在，需要用新的URL再次访问</li><li>302 - Moved Temporarily：<strong>临时重定向</strong>，请求的资源还在，但暂时需要用另一个URL来访问</li><li>304 - Not Modified：<strong>资源未修改</strong>，重定向已存在的缓存文件</li><li>301、302都会在响应头里使用字段<code>Location</code>，指明后续要跳转的URL，浏览器会自动重定向新的URL</li></ul></li><li>4xx，4xx类状态码表示客户端发送的请求报文有误，服务器无法处理 <ul><li>400 - Bad Request：客户端请求的报文有错误，但只是个<strong>笼统的错误</strong>，可能是请求的参数类型不对等</li><li>401 - Unauthorized：客户端<strong>没有访问权限</strong>，需要进行身份认证</li><li>403 - Forbidden：服务器<strong>禁止访问资源</strong>，并不是客户端的请求出错</li><li>404 - Not Found：请求的<strong>资源在服务器上不存在或未找到</strong></li></ul></li><li>5xx，5xx类状态码表示客户端请求的报文正确，但是服务器处理时内部发生了错误，属于服务器端的错误码 <ul><li>500 - Internal Server Error：服务端发生了错误，与400类似，是一个<strong>笼统的错误</strong></li><li>502 - Bad Gateway：通常是服务器<strong>作为网关或代理时</strong>返回的错误码，表示服务器自身工作正常，访问下游服务器发生了错误</li><li>503 - Service Unavailable：表示服务器当前很忙，<strong>暂时无法响应</strong>服务器</li></ul></li></ul><h2 id="请求安全、幂等" tabindex="-1"><a class="header-anchor" href="#请求安全、幂等" aria-hidden="true">#</a> 请求安全、幂等</h2><p>在 HTTP 协议里，所谓的「安全」是指请求方法**不会「破坏」**服务器上的资源</p><p>所谓的「幂等」，意思是多次执行相同的操作，<strong>结果</strong>都是**「相同」**的</p><p>Get方法就是安全且幂等的，因为它是<strong>只读</strong>操作</p><p>Post方法是不安全而且不幂等的，因为是新增或提交数据，会修改服务器上的资源</p><h2 id="http无状态特性" tabindex="-1"><a class="header-anchor" href="#http无状态特性" aria-hidden="true">#</a> HTTP无状态特性</h2><h3 id="优点-1" tabindex="-1"><a class="header-anchor" href="#优点-1" aria-hidden="true">#</a> 优点</h3><p>因为服务器不去记忆HTTP的状态，所以不需要额外的资源来记录状态信息，能有效减轻服务器的负担，能把更多CPU和内存来对外提供服务</p><h3 id="缺点-1" tabindex="-1"><a class="header-anchor" href="#缺点-1" aria-hidden="true">#</a> 缺点</h3><p>没有记忆能力，所以在完成有关联性的操作时会非常麻烦</p><blockquote><p>例如登录-&gt;添加购物车-&gt;下单-&gt;结算-&gt;支付，这系列操作都要知道用户的身份才行。但服务器不知道这些请求是有关联的，每次都要问一遍身份信息。</p></blockquote><h2 id="http不安全性" tabindex="-1"><a class="header-anchor" href="#http不安全性" aria-hidden="true">#</a> HTTP不安全性</h2><h3 id="窃听风险" tabindex="-1"><a class="header-anchor" href="#窃听风险" aria-hidden="true">#</a> 窃听风险</h3><p><strong>明文传输</strong>的优点：方便阅读，为调试工作提供极大的便利性；缺点：在信息传输的过程中，内容毫无隐私可言，容易被窃取</p><h3 id="冒充风险" tabindex="-1"><a class="header-anchor" href="#冒充风险" aria-hidden="true">#</a> 冒充风险</h3><p>有可能遭遇伪装，如：伪装的淘宝等软件</p><h3 id="篡改风险" tabindex="-1"><a class="header-anchor" href="#篡改风险" aria-hidden="true">#</a> 篡改风险</h3><p>无法证明报文的完整性，所以有可能已遭篡改，如：网页被恶意植入广告</p><h2 id="http1-1-http2-http3演变" tabindex="-1"><a class="header-anchor" href="#http1-1-http2-http3演变" aria-hidden="true">#</a> HTTP1.1 HTTP2 HTTP3演变</h2><p><strong>HTTP1.1和HTTP1.0相比，性能上的改进</strong></p><ul><li>使用TCP长连接的方式改善了HTTP1.0短链接造成的性能开销</li><li>支持管道网络传输，只要第一个请求发出去了，不必等其回来，就可以发第二个请求出去，可以减少整体的响应时间</li></ul><p><strong>HTTP1.1的性能瓶颈</strong></p><ul><li>请求和响应的头部未经压缩就发送，头部信息越多，延迟越大。<strong>只支持压缩Body部分</strong></li><li>发送冗长的头部，每次互相发送相同的头部造成的浪费较多</li><li>服务器是<strong>按请求顺序响应</strong>的，如果服务器响应慢，会导致客户端一直请求不到数据，也就是<strong>队头阻塞</strong></li><li>请求只能从客户端开始，服务器只能被动响应</li></ul><hr><p><strong>HTTP2针对HTTP1.1性能瓶颈做的优化</strong></p><ul><li><p>头部压缩</p><p>如果同时发送多个请求，相似或相同的头部，协议会消除重复的部分。使用的是<strong>HPack</strong>算法，在客户端和服务器同时维护一张头信息表，所有字段都会存入这个表，生成索引号，在发送消息的时候就不发送同样的字段，只发送索引号，这样可以提高速度</p></li><li><p>二进制格式</p><p>HTTP2报文全面采用二进制格式，统称为帧。计算机无需再将明文转成二进制，增加了数据传输的效率</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210429160627.png" alt=""></p></li><li><p>数据流</p><p>HTTP2的数据包不是按顺序发送的，同一个连接里面连续的数据包，可能属于不同的回应，因此必须要进行标记，指出他属于哪个回应。每个请求或回应的所有数据包，称为一个<strong>数据流(Stream)</strong></p><p>客户端还可以指定数据流的优先级，优先级高的请求，服务器应该优先处理</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210429162743.png" alt=""></p></li><li><p>多路复用</p><p>HTTP2可以在一个连接中并发多个请求或响应，而不用按照顺序一一对应。<strong>降低了延迟，大幅度提高了连接的利用率</strong></p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210429162951.png" alt=""></p></li><li><p>服务器推送</p><p>HTTP2中服务器不再被动地响应，还可以主动向客户端发送消息</p><p>举例：在浏览器刚请求HTML的时候，服务器可以提前把用到的CSS、JS等静态文件主动发送给客户端，<strong>减少延迟等待</strong></p></li></ul><p><strong>HTTP2的缺陷</strong></p><ul><li><p>基于TCP协议的错误触发的重传机制</p><p><strong>多个HTTP请求在复用一个TCP连接，下层的TCP协议不知道有多少个HTTP请求</strong>，一旦发生丢包，就会触发TCP重传机制，这样在一个TCP连接中所有的HTTP请求都必须等待这个丢了的包重新传回去</p></li></ul><hr><p><strong>HTTP3针对HTTP2的缺陷做的优化</strong></p><ul><li><p>QUIC协议</p><p>HTTP1.1和HTTP2的传输层都是使用TCP协议的，一旦发生丢包，会触发TCP重传机制</p><ul><li>HTTP1.1中的管道传输中如果有一个请求阻塞了，那么队列后请求也统统被阻塞住了</li><li>HTTP2多个HTTP请求复用一个TCP连接，一旦发生丢包，就会阻塞住所有的HTTP请求</li></ul><p>所以HTTP3把HTTP下层的TCP协议改成了UDP，UDP协议不管顺序，不管丢包问题</p><p><strong>HTTP3使用的是基于UDP的QUIC协议，可以实现类似TCP的可靠性传输</strong></p><ul><li>当某个流发生丢包，<strong>只会阻塞这个流，其他流不会收到影响</strong></li><li>TLS升级成TLS1.3版本，头部压缩算法升级成了<strong>QPack</strong></li><li>以往HTTPS要建立连接的话，需要TCP的3次握手+TLS的3次握手，<strong>HTTP3把6次握手合并成了3次握手</strong></li></ul><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210429165128.png" alt=""></p><p><img src="https://gitee.com/ngwingbun/pic/raw/master/20210429165415.png" alt=""></p><p><strong>总结：QUIC是一个在UDP上的伪TCP+TLS+HTTP2的多路复用协议</strong></p></li></ul><h1 id="https" tabindex="-1"><a class="header-anchor" href="#https" aria-hidden="true">#</a> HTTPS</h1><h2 id="http与https区别" tabindex="-1"><a class="header-anchor" href="#http与https区别" aria-hidden="true">#</a> HTTP与HTTPS区别</h2><ol><li>HTTP的信息是明文传输，存在安全性问题；HTTPS则在TCP和HTTP之间加入SSL/TLS安全协议，使得报文能加密传输</li><li>HTTP连接建立相对简单，TCP三次握手后就可以进行HTTP报文传输，而HTTPS则需要在TCP三次握手后，还需要进行SSL/TLS的握手过程，才可以进行密文传输</li><li>HTTP协议端口是80，HTTPS协议端口是443</li><li>HTTPS需要向CA(证书权威机构)申请数字证书，来保证服务器的身份是可信的</li></ol><h2 id="https解决的问题" tabindex="-1"><a class="header-anchor" href="#https解决的问题" aria-hidden="true">#</a> HTTPS解决的问题</h2><h3 id="信息加密" tabindex="-1"><a class="header-anchor" href="#信息加密" aria-hidden="true">#</a> 信息加密</h3><p>传输过程经过加密，交互信息无法被窃取。<strong>混合加密</strong>的方式，解决了窃听风险。</p><p><strong>混合加密</strong></p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210428174959.png" alt=""></p><ul><li>在通信建立前使用<strong>非对称加密</strong>的方式交换<strong>会话密钥</strong>，后续就不再使用非对称加密</li><li>在通信过程中使用<strong>会话密钥</strong>使用<strong>对称加密</strong>的方式加密明文数据</li></ul><p><strong>使用混合加密的原因</strong></p><ul><li>对称加密只使用一个密钥，运算速度快，<strong>但是密钥必须保密</strong></li><li>非对称加密使用两个密钥：公钥和私钥，公钥可以任意分发而私钥保密，解决了密钥交换问题，但是速度较慢</li></ul><h3 id="身份证书" tabindex="-1"><a class="header-anchor" href="#身份证书" aria-hidden="true">#</a> 身份证书</h3><p>证明淘宝是真的淘宝网。将服务器公钥放入到<strong>数字证书</strong>中，解决了冒充风险。</p><p><strong>数字证书</strong></p><p><strong>解决客户端向服务器索要公钥时的安全问题</strong>，保证公钥不被篡改，这样客户端使用服务器的公钥加密数据，服务器使用自己的私钥进行数据解密</p><p><strong>数字证书认证机构(CA)</strong></p><p>只要证书是可信的，那么公钥就是可信的</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/640" alt=""></p><h3 id="校验机制" tabindex="-1"><a class="header-anchor" href="#校验机制" aria-hidden="true">#</a> 校验机制</h3><p>无法篡改通信内容，篡改了就不能正常显示。<strong>摘要算法</strong>的方式来实现<strong>完整性</strong>，它<strong>能够为数据生成独一无二的「指纹」</strong>，指纹用于校验数据的完整性，解决了篡改风险。</p><p><strong>摘要算法</strong></p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210428175609.png" alt=""></p><ul><li><p>客户端在发送明文之前通过摘要算法计算出明文的「指纹」</p></li><li><p>发送时把「指纹 + 明文」一同加密成密文后，发送给服务器</p></li><li><p>服务器解密后，用相同的摘要算法算出接受到的明文的「指纹」</p></li><li><p>然后把计算出来的「指纹」和接受到的「指纹」进行比对，如果「指纹」相同，那么说明数据是完整的</p></li></ul><h2 id="tls-ssl" tabindex="-1"><a class="header-anchor" href="#tls-ssl" aria-hidden="true">#</a> TLS/SSL</h2><h3 id="ssl" tabindex="-1"><a class="header-anchor" href="#ssl" aria-hidden="true">#</a> SSL</h3><p>Secure Socket Layer，安全套接字层，位于可靠的面向连接的网络层协议和应用层协议之间的一种协议层。SSL通过互相认证、使用数字签名确保完整性、使用加密确保私密性，以实现客户端和服务器之间的安全通讯。该协议由两层组成：SSL记录协议和SSL握手协议。</p><h3 id="tls" tabindex="-1"><a class="header-anchor" href="#tls" aria-hidden="true">#</a> TLS</h3><p>Transport Layer Security，传输层安全协议，用于两个应用程序之间提供保密性和数据完整性。该协议由两层组成：TLS记录协议和TLS握手协议。</p><h2 id="https建立连接" tabindex="-1"><a class="header-anchor" href="#https建立连接" aria-hidden="true">#</a> HTTPS建立连接</h2><p><strong>SSL/TLS 协议基本流程</strong></p><ul><li>客户端向服务器索要并验证服务器的公钥</li><li>双方协商生成<strong>会话密钥</strong>，用公钥加密会话密钥</li><li>双方采用会话密钥进行加密通信</li></ul><p><strong>流程图</strong></p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210429100559.png" alt=""></p><p><strong>具体握手流程</strong></p><ol><li><p><strong>ClientHello</strong></p><p>客户端向服务器发起加密通信请求，请求的内容包含：</p><ol><li>客户端支持的SSL/TLS协议版本，如TLS1.2版本</li><li>客户端生成随机数(Client Random)，后面用于生成<strong>会话密钥</strong></li><li>客户端支持的密码套件列表，如RSA加密算法</li></ol></li><li><p><strong>ServerHello</strong></p><p>服务器回应客户端的加密通信请求，响应的内容包含：</p><ol><li>确认使用的SSL/TLS协议版本，<strong>如果浏览器不支持的话，则关闭这个加密通信</strong></li><li>服务器生成随机数(Server Random)，后面用于生成<strong>会话密钥</strong></li><li>确认使用的密码套件列表</li><li>服务器的数字证书</li></ol></li><li><p><strong>客户端回应</strong></p><p>CA的公钥会内置在浏览器或操作系统中，所以客户端收到服务器发过来的数字证书后，使用CA的公钥进行确认其有效性并解密，解密后就得到服务器的公钥，然后用它加密报文，向服务器发送以下内容：</p><ol><li>随机数(pre-master key)，该随机数会被服务器的公钥进行加密。此时双方都有<strong>Client Random</strong>、<strong>Server Random</strong>、<strong>pre-master key</strong>三个随机数，可以各自生成本次通信的<strong>会话密钥</strong></li><li>加密通信算法改变通知，表示随后的信息都将使用<strong>会话密钥加密通信</strong></li><li>客户端握手结束通知，这一项同时把之前所有内容产生的数据做摘要，用来供服务器校验</li></ol></li><li><p><strong>服务器的最后回应</strong></p><p>服务器收到客户端的第三个随机数(pre-master key)后，通过前面协商好的加密算法，用Client Random、Server Random、pre-master key生成本次通信的<strong>会话密钥</strong></p><ol><li>加密通信算法改变通知，表示随后的信息都将使用<strong>会话密钥加密通信</strong></li><li>服务器握手结束通知，这一项同时把之前所有内容产生的数据做摘要，用来供客户端校验</li></ol></li><li><p><strong>加密通信，使用的是双方约定生成的会话密钥来加密</strong></p></li></ol>',254),s=[o];function r(p,g){return a(),t("div",null,s)}const c=n(i,[["render",r],["__file","Network.html.vue"]]);export{c as default};