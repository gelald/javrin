import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as r,c as t,a as e,b as a,d as i,e as n}from"./app-f9042815.js";const c={},o=n(`<h1 id="centos" tabindex="-1"><a class="header-anchor" href="#centos" aria-hidden="true">#</a> Centos</h1><h2 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/: 根目录
/bin: 存放普通用户可以使用的指令
/usr: 包含了命令库文件和在通常操作中不会修改的文件。安装的程序默认放在/usr下面的子目录
/etc: 全局的配置文件存放目录
/boot: 引导程序，内核等存放的目录
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="命令" tabindex="-1"><a class="header-anchor" href="#命令" aria-hidden="true">#</a> 命令</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd: 切换目录
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ls: 列出文件列表
	-a: 所有文件(包括隐藏文件/文件夹)
	-l: 显示详细信息(操作权限、用户、修改时间) \`ls -l 等价于 ll\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mkdir: 创建目录
	-p: 递归创建目录
rmdir: 移除目录
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件打包-压缩" tabindex="-1"><a class="header-anchor" href="#文件打包-压缩" aria-hidden="true">#</a> 文件打包/压缩</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tar: 压缩/解压
	-z: 通过gzip指令处理备份文件,处理.zip文件/.gz文件，zip文件可以用zip命令
	-c: 建立新的打包文件
	-x: 解压
	-f: 要操作的文件名 
	-v: 显示压缩/解压的过程

.tar 打包
.tar.gz 压缩

打包:     tar -cf a.tar a --把a目录打包成a.tar
打包压缩:  tar -zcf a.tar.gz a --把a目录打包成a.tar.gz
解压:     tar -xf a.tar --把a.tar的内容解压到当前文件夹内
解压缩:	 	tar -zxf a.tar.gz a --把a.tar.gz解压到当前文件夹内
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>zip: 压缩/解压

压缩: zip a.zip a --把a目录压缩成a.zip
解压: unzip a.zip --把a.zip解压到当前文件夹内
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ifconfig: 查看网络配置
其中192.168.84.130就是本机ip地址

centos7 查看ip地址推荐使用ip addr
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsqzd3mu6j311f0u04qp.jpg" alt=""></p><h3 id="浏览文件" tabindex="-1"><a class="header-anchor" href="#浏览文件" aria-hidden="true">#</a> 浏览文件</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat: 把文件的所有内容都打印到控制台上
more: 把文件内容一次显示控制台的一屏，最后一行显示当前浏览的进度
	回车: 下一行
	空格: 下一屏
	q或Ctrl+c: 退出
less: 功能与more类似，最后一行显示当前浏览文件
	回车: 下一行
	空格: 下一屏
	q或Ctrl+c: 退出
	还可以使用PgUp和PgDn来控制上下翻页
tail: 查看文件内容
	-[number]: number代表一个普通的数字，显示最后number行
	-f: 动态查看文件，当文件内容发生变化，控制台中会有所体现
	一般用于查看日志文件，因为日志总是追加的形式的，而错误往往在后面几行
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="复制-剪切文件" tabindex="-1"><a class="header-anchor" href="#复制-剪切文件" aria-hidden="true">#</a> 复制/剪切文件</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cp: 复制
	第一个参数是需要复制的文件 第二个参数是文件名或目录
	cp a.txt b.txt 	将a.txt复制为b.txt
	cp a.txt ../ 		将a.txt复制到上一层目录中

mv: 移动或重命名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rm: 删除文件
	-r: 删除文件夹 递归删除
	-f: 不询问直接删除
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查找" tabindex="-1"><a class="header-anchor" href="#查找" aria-hidden="true">#</a> 查找</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>find: 查找文件
	-name: 按名称查找
	-user: 按用户查找
	-type: 按类型查找 d: 目录类型
	-perm: 按权限查找
	
	find / -name &quot;ins*&quot; 在根目录下查找ins开头的文件
	
grep: 查找文件中的字符串
	grep string file
	-color: 高亮显示
	-A[number]: 查找到字符串之后再往后显示number行
	-B[number]: 查找到字符串之后再往前显示number行
	
	grep debug yum.conf -color 从yum.conf中查找debug字符串并高亮显示
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vi" tabindex="-1"><a class="header-anchor" href="#vi" aria-hidden="true">#</a> vi</h3><ol><li>命令行模式。刚用vi进入文件就是命令行模式，可以进入底行模式、插入模式 <ol><li>i：当前位置前插入</li><li>I：当前行首插入</li><li>a：当前位置后插入</li><li>A：当前行尾插入</li><li>o：当前行之后插入一行</li><li>O：当前行之前插入一行</li><li>:(冒号)：切换到底行模式</li></ol></li><li>底行模式 <ol><li>:w：保存</li><li>:q：退出</li><li>:q!：如果不想保存修改，需要强制退出</li><li>:wq：保存并退出</li><li>/string：在文件中搜寻string</li></ol></li><li>插入模式，需要保存的话只能先切换到命令行模式再切换到底行模式来保存 <ol><li>Esc：切换到命令行模式</li></ol></li></ol><h3 id="重定向" tabindex="-1"><a class="header-anchor" href="#重定向" aria-hidden="true">#</a> 重定向</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt;: 	重定向输出，覆盖原有内容

&gt;&gt;: 重定向输出，但是是追加形式

命令左边可以是任意的命令，只要输入之后控制台有输出即可；命令右边一般是文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="系统管理" tabindex="-1"><a class="header-anchor" href="#系统管理" aria-hidden="true">#</a> 系统管理</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ps: 查看正在运行的命令
ps -ef: 查看所有进程
ps -ef | grep name: 查看某一进程

kill: 杀死进程
	-9: 强制杀死
kill 1234: 杀死1234编号的进程
kill -9 1234: 强制杀死1234编号的进程
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="管道" tabindex="-1"><a class="header-anchor" href="#管道" aria-hidden="true">#</a> 管道</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>|: 将管道左边的输出作为管道右边的输入

ls --help | more: 分页查询帮助信息
ps -ef | grep java: 查询包含名称java的进程
ifconfig | more: 分页查询网络配置
cat index.html | more: 分页查询index.html的内容
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>chmod: 修改权限

chmod u=rwx,g=rx,o=rx a.txt 给a.txt赋予权限
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="服务管理" tabindex="-1"><a class="header-anchor" href="#服务管理" aria-hidden="true">#</a> 服务管理</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>service name status: 	查看服务的状态
service --status-all:	查看所有服务的状态
service name stop: 		停止服务
service name start: 	启动服务
service name restart: 重启服务

网络服务: network
防火墙服务: iptables
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看文件" tabindex="-1"><a class="header-anchor" href="#查看文件" aria-hidden="true">#</a> 查看文件</h3><ul><li>cat: 一次性把文件内容输出到终端</li><li>more: 分页加载文件内容 <ul><li>空格: 查看下一页</li><li>b: 查看上一页</li><li>回车: 往下滚动一行</li><li>q: 退出</li><li>more +xx 文件: 从xx行开始查看文件内容</li></ul></li><li>less: 分页加载文件内容 <ul><li>b: 查看上一页</li><li>空格: 查看下一页</li><li>u: 向前翻半页</li><li>d: 向后翻半页</li><li>y: 查看上一行</li><li>回车: 查看下一行</li></ul></li></ul><h2 id="权限系统" tabindex="-1"><a class="header-anchor" href="#权限系统" aria-hidden="true">#</a> 权限系统</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>形式: - --- --- --- 10位

第一位:
	-: 文件
	d: 文件夹
	l: 连接(快捷方式)
	
第一组: 当前用户具有该文件/文件夹的权限
	r: read 	读取权限: 4
	w: write 	写权限: 2
	x: excute 执行权限: 1

第二组: 当前组内其他用户具有该文件/文件夹的权限
	r: read 	读取权限
	w: write 	写权限
	x: excute 执行权限

第三组: 其他组的用户具有的该文件/文件夹的权限
	r: read 	读取权限
	w: write 	写权限
	x: excute 执行权限

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="网络配置" tabindex="-1"><a class="header-anchor" href="#网络配置" aria-hidden="true">#</a> 网络配置</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>hostname: 查看主机名
hostname name: 修改主机名为name 但是这种做法重启就失效
永久生效需要修改: /etc/sysconfig/network


修改网络配置
/etc/sysconfig/network-scripts/ifcofig-ens* ens*为网卡名称
ONBOOT: 		true/false 	开机是否启动该网卡 开启/不开启
BOOTPROTO: 	dhcp/static ip地址分配方式  	自动分配/静态
IPADDR:		IP地址
GATEWAY: 	网关地址
NETMASK:	子网掩码
DNS1:			DNS服务器
设置好之后执行service network restart


修改防火墙配置
/etc/sysconfig/iptables


域名映射
/etc/hosts 通过主机名进行访问时做ip地址解析之用
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="防火墙" tabindex="-1"><a class="header-anchor" href="#防火墙" aria-hidden="true">#</a> 防火墙</h2><ul><li><p>查看防火墙服务状态</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl status firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>查看防火墙状态</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>firewall-cmd --state
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>firewall-cmd是Linux提供的一个操作firewall的工具</p></li><li><p>开启、重启、停止防火墙服务</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>service firewalld start
service firewalld restart
service firewalld stop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>重启防火墙</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>firewall-cmd --reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>查看防火墙规则</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>firewall-cmd --list-all
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>查询端口</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>firewall-cmd --query-port=80/tcp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>增加、移除端口</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>firewall-cmd -permanent --add-port=80/tcp
firewall-cmd -permanent --remove-port=80/tcp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="软件安装" tabindex="-1"><a class="header-anchor" href="#软件安装" aria-hidden="true">#</a> 软件安装</h2><h3 id="jdk" tabindex="-1"><a class="header-anchor" href="#jdk" aria-hidden="true">#</a> JDK</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1.下载并上传jre的压缩包
2.检查系统中是否有jdk
	rpm -qa | grep java 查看安装jdk版本
	如果有，则显示包名
	rpm -e --nodeps 包名 卸载对应的包
3.解压压缩包
4.配置环境变量
	1.vi /etc/profile
	2.在末行添加
		#set java enviroment
		JAVA_HOME=/usr/loacl/jdk/jdk1.8.0_231(jdk路径)
		CLASSPATH=.:$JAVA_HOME/lib.tools.jar
		PATH=$JAVA_HOME/bin:$PATH
		export JAVA_HOME CLASSPATH PATH
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> Mysql</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1.下载并上传mysql的压缩包
2.检查系统中是否有mysql
	rpm -qa | grep mysql

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="tomcat" tabindex="-1"><a class="header-anchor" href="#tomcat" aria-hidden="true">#</a> Tomcat</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1.下载并上传tomcat的压缩包
2.检查系统中是否有tomcat
	rpm -qa | grep tomcat
3.解压压缩包
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="redis" tabindex="-1"><a class="header-anchor" href="#redis" aria-hidden="true">#</a> redis</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> nginx</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="查看日志" tabindex="-1"><a class="header-anchor" href="#查看日志" aria-hidden="true">#</a> 查看日志</h2><h3 id="cat" tabindex="-1"><a class="header-anchor" href="#cat" aria-hidden="true">#</a> cat</h3><p>一般用<code>cat</code>来查看这个小文件的文本内容是什么，如果查看大文件会卡，而且<code>Ctrl+C</code>退出也需要很久的时间</p><h3 id="vim" tabindex="-1"><a class="header-anchor" href="#vim" aria-hidden="true">#</a> vim</h3><p><code>vim</code>和<code>cat</code>同理，适合查看小文件</p><p>使用<code>vim</code>一般步骤：</p><ol><li><code>vim service.log</code></li><li>按<code>G</code>跳转到文件结尾</li><li>按<code>? 关键字</code>搜索对应记录</li><li>按<code>n</code>往上查询，按<code>N</code>往下查询</li></ol><h3 id="head" tabindex="-1"><a class="header-anchor" href="#head" aria-hidden="true">#</a> head</h3><p>一般用于查看服务的启动情况，启动报错</p><p><code>head -n100 service.log</code> 查看日志文件头100行记录</p><h3 id="tail-f" tabindex="-1"><a class="header-anchor" href="#tail-f" aria-hidden="true">#</a> tail -f</h3><p>一般用于查看流量是否进来了，程序是否启动了，因为滚动得太快</p><p><code>tail -fn100 service.log</code> 查询日志最后100行记录，并且随文件的内容追加而加载出来</p><h3 id="按关键字查找" tabindex="-1"><a class="header-anchor" href="#按关键字查找" aria-hidden="true">#</a> 按关键字查找</h3><ol><li>找到发生异常的行数，假设&quot;error&quot;代表异常，可以使用<code>cat -n service.log | grep error</code></li><li>通过行号查询对应行前后的内容，得到该行，需要通过上下文来分析错误产生的原因，假设错误行数在102，可以使用<code>sed -n &quot;92,112p&quot; service.log</code>来看92-112行之间的内容</li></ol><h3 id="日志结果太多的做法" tabindex="-1"><a class="header-anchor" href="#日志结果太多的做法" aria-hidden="true">#</a> 日志结果太多的做法</h3><ul><li>使用<code>more</code>来分页</li><li>使用<code>&gt;search.txt</code>来重定向保存到文件中，到时候再另外分析这份文件</li></ul><h3 id="清空日志" tabindex="-1"><a class="header-anchor" href="#清空日志" aria-hidden="true">#</a> 清空日志</h3><ul><li><code>&gt; service.log</code></li></ul><h2 id="centos8" tabindex="-1"><a class="header-anchor" href="#centos8" aria-hidden="true">#</a> Centos8</h2><h3 id="最小安装后设置网络" tabindex="-1"><a class="header-anchor" href="#最小安装后设置网络" aria-hidden="true">#</a> 最小安装后设置网络</h3><ol><li><p>列出网卡信息:<code>ip link show</code></p></li><li><p>前往修改网卡信息:<code>cd /etc/sysconfig/network-scripts/</code>,在该目录下找到配置文件,备份一下</p></li><li><p>编辑网卡配置信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static		#static:静态IP;dhcp:自动获取IP
DEFROUTE=yes
IPADDR=192.168.1.180	#IP地址
NETMASK=255.255.255.0	#子网掩码,C类网络一般写法
GATEWAY=192.168.1.1		#网关地址
DNS1=114.114.114.114	#DNS地址
DNS2=223.5.5.5			#DNS地址
IPV4_FAILURE_FATAL=no
#IPV6INIT=yes
#IPV6_AUTOCONF=yes
#IPV6_DEFROUTE=yes
#IPV6_FAILURE_FATAL=no
#IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens192
UUID=38aa3bf9-7943-474f-a04d-9b5d9392d569
DEVICE=ens192
ONBOOT=yes				#开机自动激活网卡配置
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>重启网卡:<code>nmcli c reload</code></p></li><li><p>启用网卡,默认是不启用的:<code>nmcli c up ens192</code></p></li><li><p>查看网卡是否启用了:<code>nmcli device show</code>或<code>nmcli</code></p></li><li><p>常用命令:开启网络:<code>nmcli networking on</code>;关闭网络:<code>nmcli networking off</code></p></li></ol><h1 id="tomcat-1" tabindex="-1"><a class="header-anchor" href="#tomcat-1" aria-hidden="true">#</a> Tomcat</h1><h2 id="项目部署方式" tabindex="-1"><a class="header-anchor" href="#项目部署方式" aria-hidden="true">#</a> 项目部署方式</h2><ul><li>把项目放到webapps目录下。这种方式项目的访问名称和项目的名称是一致的。最好使用简化部署方式：将项目打包成war包形式，放到webapps下，自动解压、自动删除</li><li>修改<code>server.xml</code>配置文件 <ul><li>在localhost的server中加入<code>&lt;Context docBase=&quot;项目路径&quot; path=&quot;项目访问路径&quot; /&gt;</code>，风险：有可能把tomcat原有的东西弄坏</li><li>加入新的server</li></ul></li><li>在 <code>conf/Catalina/localhost</code> 创建项目</li></ul><h2 id="项目目录结构" tabindex="-1"><a class="header-anchor" href="#项目目录结构" aria-hidden="true">#</a> 项目目录结构</h2><h3 id="动态项目" tabindex="-1"><a class="header-anchor" href="#动态项目" aria-hidden="true">#</a> 动态项目</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-- 项目的根目录
	-- WEB-INF目录
			-- web.xml:web项目的核心配置文件
			-- classes目录:放置字节码文件的目录
			-- lib目录:放置项目依赖的jar包
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="nginx-1" tabindex="-1"><a class="header-anchor" href="#nginx-1" aria-hidden="true">#</a> Nginx</h1><h3 id="命令-1" tabindex="-1"><a class="header-anchor" href="#命令-1" aria-hidden="true">#</a> 命令</h3><ul><li>启动：<code>nginx</code></li><li>安全重启：<code>nginx -s reload</code> 重新加载配置文件</li><li>重启：<code>nginx -s reopen</code></li><li>安全停止：<code>nginx -s quit</code> 处理完所有请求再停止服务</li><li>强制停止：<code>nginx -s stop</code></li><li>杀死进程方式停止：<code>kill -9 nginx进程的id</code></li><li>杀死所有进程：<code>killall nginx</code></li><li>查看nginx的版本信息：<code>nginx -v</code></li><li>检测配置文件是否有语法错误：<code>nginx -t</code></li></ul><h3 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h3><ul><li>Nginx 使用基于事件驱动架构，使得其可以支持数以百万级别的 TCP 连接</li><li>高度的模块化和自由软件许可证使得第三方模块层出不穷</li><li>Nginx 是一个跨平台服务器</li><li>稳定</li><li>Nginx 可以作为一个 HTTP 服务器进行网站的发布处理</li><li>可以作为反向代理进行负载均衡的实现</li></ul><h3 id="代理" tabindex="-1"><a class="header-anchor" href="#代理" aria-hidden="true">#</a> 代理</h3><ul><li>正向代理 <ul><li>正向代理最大的特点是<strong>客户端非常明确要访问的服务器地址</strong>；服务器只清楚请求来自哪个代理服务器，而<strong>不清楚来自哪个具体的客户端</strong>；正向代理模式屏蔽或者<strong>隐藏了真实客户端信息</strong>。客户端必须设置正向代理服务器，当然前提是要知道正向代理服务器的 IP 地址，还有代理程序的端口</li><li>访问原来无法访问的资源，如 Google</li><li>可以做缓存，加速访问资源</li><li>对客户端访问授权，上网进行认证</li><li>代理可以记录用户访问记录（上网行为管理），对外隐藏用户信息</li></ul></li><li>反向代理 <ul><li>客户端是无感知代理的存在的，反向代理对外都是透明的，访问者并不知道自己访问的是一个代理。因为客户端不需要任何配置就可以访问。反向代理，&quot;它代理的是服务端&quot;，主要用于服务器集群分布式部署的情况下，<strong>反向代理隐藏了服务器的信息</strong>。</li><li>保证内网的安全，通常将反向代理作为公网访问地址，Web 服务器是内网</li><li>负载均衡，通过反向代理服务器来优化网站的负载</li></ul></li></ul><h3 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡" aria-hidden="true">#</a> 负载均衡</h3><ol><li><p><strong>weight 轮询（默认）</strong>：接收到的请求按照顺序逐一分配到不同的后端服务器。如果在使用过程中，某一台后端服务器宕机，Nginx 会自动将该服务器剔除出队列，请求受理情况不会受到任何影响。</p><p>可以给不同的后端服务器设置一个权重值（weight），用于调整不同的服务器上请求的分配率。权重数据越大，被分配到请求的几率越大；该权重值主要是针对实际工作环境中不同的后端服务器硬件配置进行调整的。</p></li><li><p>ip_hash：每个请求按照发起客户端的 ip 的 hash 结果进行匹配，这样的算法下一个固定 ip 地址的客户端总会访问到同一个后端服务器，这也在一定程度上解决了集群部署环境下 <strong>Session 共享的问题</strong>。</p></li><li><p>url_hash：按照访问的 URL 的 hash 结果分配请求，每个请求的 URL 会指向后端固定的某个服务器，可以在 Nginx 作为静态服务器的情况下提高缓存效率。<strong>默认不支持</strong></p></li><li><p>fair：动态的根据后端服务器的请求处理到响应的时间进行均衡分配。响应时间短处理效率高的服务器分配到请求的概率高，响应时间长处理效率低的服务器分配到的请求少。<strong>默认不支持</strong></p></li></ol><h3 id="几款服务器对比" tabindex="-1"><a class="header-anchor" href="#几款服务器对比" aria-hidden="true">#</a> 几款服务器对比</h3><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsr3uk2s6j30mm0k411e.jpg" alt=""></p><h1 id="vagrant" tabindex="-1"><a class="header-anchor" href="#vagrant" aria-hidden="true">#</a> Vagrant</h1><ul><li><p>创建虚拟环境</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>vagrant init
<span class="token comment"># 此时在当前目录会生成Vagrantfile文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-ruby line-numbers-mode" data-ext="rb"><pre class="language-ruby"><code>config<span class="token punctuation">.</span>vm<span class="token punctuation">.</span>box <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;centos/7&quot;</span></span> <span class="token comment"># 指定操作系统镜像</span>
<span class="token comment"># 如果本地没有该镜像，那么会从远端拉取</span>

config<span class="token punctuation">.</span>vm<span class="token punctuation">.</span>network <span class="token string-literal"><span class="token string">&quot;public_network&quot;</span></span> <span class="token comment"># 设置网络方式为共享</span>

<span class="token comment"># 指定内存、cpu等信息</span>
config<span class="token punctuation">.</span>vm<span class="token punctuation">.</span>provider <span class="token string-literal"><span class="token string">&quot;virtualbox&quot;</span></span> <span class="token keyword">do</span> <span class="token operator">|</span>vb<span class="token operator">|</span>
      vb<span class="token punctuation">.</span>memory <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;4096&quot;</span></span>
      vb<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;first-docker-centos7&quot;</span></span>
      vb<span class="token punctuation">.</span>cpus <span class="token operator">=</span> <span class="token number">2</span>
  <span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>查看当前系统中本地的vagrant镜像</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>vagrant box list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>添加镜像到本地仓库</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>vagrant box <span class="token function">add</span> 镜像名 <span class="token comment"># 从云端拉取的方式 这个镜像名需要和云端https://app.vagrantup.com/boxes/search中镜像名一致</span>

vagrant box <span class="token function">add</span> 镜像名 本地镜像文件 <span class="token comment"># 从本地添加到仓库的方式</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>启动虚拟环境</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>vagrant up
<span class="token comment"># 此时会进行操作系统的安装</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>进入虚拟机</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>vagrant <span class="token function">ssh</span>
<span class="token comment"># 进入当前VagrantFile对应的虚拟机</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h1 id="包管理工具" tabindex="-1"><a class="header-anchor" href="#包管理工具" aria-hidden="true">#</a> 包管理工具</h1><h2 id="rpm" tabindex="-1"><a class="header-anchor" href="#rpm" aria-hidden="true">#</a> rpm</h2><ul><li><p><strong>rpm</strong>（Red-Hat Package Manager）基于互联网下载软件包的打包安装工具</p></li><li><p>一个rpm文件由包名、版本信息、发布版本号、运行平台组成</p><p>如：xv－3.10a－13.i386.rpm，“xv”为软件名称，3.10a即发行版本号，i386是这个软件运行的平台</p></li></ul><h3 id="安装软件" tabindex="-1"><a class="header-anchor" href="#安装软件" aria-hidden="true">#</a> 安装软件</h3><p><code>rpm -i xxx.rpm</code></p><h3 id="卸载软件" tabindex="-1"><a class="header-anchor" href="#卸载软件" aria-hidden="true">#</a> 卸载软件</h3><p><code>rpm -e xxx</code></p><h2 id="yum" tabindex="-1"><a class="header-anchor" href="#yum" aria-hidden="true">#</a> yum</h2><ul><li><p><strong>yum</strong>（Yellow dog Updater, Modified）是一个庞大的liunx系统软件库，它<strong>基于rpm文件</strong></p></li><li><p>yum这个软件管理容器源于rpm包，可以自动从服务器下载rpm软件包并处理软件的依赖关系，一次安装所有的依赖包，每个rpm包都有独立的签名来保证操作系统的安全</p></li></ul><h3 id="安装软件-1" tabindex="-1"><a class="header-anchor" href="#安装软件-1" aria-hidden="true">#</a> 安装软件</h3><p><code>yum install xxx.rpm</code></p><h3 id="删除软件" tabindex="-1"><a class="header-anchor" href="#删除软件" aria-hidden="true">#</a> 删除软件</h3><p><code>yum remove xxx.rpm</code></p><h3 id="升级软件" tabindex="-1"><a class="header-anchor" href="#升级软件" aria-hidden="true">#</a> 升级软件</h3><p><code>yum update xxx</code></p><p><code>yum upgrade xxx</code></p><h3 id="查询软件信息" tabindex="-1"><a class="header-anchor" href="#查询软件信息" aria-hidden="true">#</a> 查询软件信息</h3><p><code>yum info xxx</code></p><h3 id="搜索软件" tabindex="-1"><a class="header-anchor" href="#搜索软件" aria-hidden="true">#</a> 搜索软件</h3><p><code>yum search xxx</code></p><h3 id="显示包依赖关系" tabindex="-1"><a class="header-anchor" href="#显示包依赖关系" aria-hidden="true">#</a> 显示包依赖关系</h3><p><code>yum deplist xxx</code></p><h2 id="dpkg" tabindex="-1"><a class="header-anchor" href="#dpkg" aria-hidden="true">#</a> dpkg</h2><p>dpkg是Debian（linux衍生系统）软件包管理器的基础，<strong>基于deb文件</strong></p><h3 id="安装软件-2" tabindex="-1"><a class="header-anchor" href="#安装软件-2" aria-hidden="true">#</a> 安装软件</h3><p><code>dpkg -i xxx.deb</code></p><h3 id="卸载软件-1" tabindex="-1"><a class="header-anchor" href="#卸载软件-1" aria-hidden="true">#</a> 卸载软件</h3><p><code>dpkg -r xxx</code></p><h2 id="apt-get" tabindex="-1"><a class="header-anchor" href="#apt-get" aria-hidden="true">#</a> apt-get</h2><ul><li><p>apt-get是一条liunx命令，<strong>用来管理rpm和deb包</strong></p></li><li><p>可以从互联网的软件库中搜索、安装、升级、卸载软件或者<strong>操作系统</strong></p></li><li><p>与rpm、dpkg相比，<strong>apt（Advanced Package Tool）为前端的管理器</strong>，rpm、dpkg是后端的底层工具</p></li></ul><h3 id="安装软件-3" tabindex="-1"><a class="header-anchor" href="#安装软件-3" aria-hidden="true">#</a> 安装软件</h3><p><code>apt-get install xxx</code></p><h3 id="卸载软件-2" tabindex="-1"><a class="header-anchor" href="#卸载软件-2" aria-hidden="true">#</a> 卸载软件</h3><p><code>apt-get remove xxx</code></p><h3 id="更新软件" tabindex="-1"><a class="header-anchor" href="#更新软件" aria-hidden="true">#</a> 更新软件</h3><p><code>apt-get upgrade</code></p><h2 id="apt" tabindex="-1"><a class="header-anchor" href="#apt" aria-hidden="true">#</a> apt</h2><ul><li><p>apt 命令的引入就是为了解决命令过于分散的问题，它包括了 apt-get 命令出现以来使用最广泛的功能选项，以及 apt-cache 和 apt-config 命令中很少用到的功能。</p></li><li><p>在使用 apt 命令时，用户不必再由 apt-get 转到 apt-cache 或 apt-config，而且 apt 更加结构化，并为用户提供了管理软件包所需的必要选项。</p></li><li><p>简单来说就是：apt = apt-get、apt-cache 和 apt-config 中最常用命令选项的集合</p></li></ul><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210404113432.png" alt=""></p><h2 id="snap" tabindex="-1"><a class="header-anchor" href="#snap" aria-hidden="true">#</a> snap</h2><p>snap为一种全新的软件包管理方式，安装包扩展名为*.snap</p><p>snap也是一个linux软件库容器，包含一个应用程序所需的所有文件和库</p><p>snap软件包<strong>一般安装在/snap目录下</strong></p><p>snap最大的特点就是使用了容器来管理软件</p><h3 id="安装snap包" tabindex="-1"><a class="header-anchor" href="#安装snap包" aria-hidden="true">#</a> 安装snap包</h3><p><code>snap install snap包</code></p><h3 id="删除snap包" tabindex="-1"><a class="header-anchor" href="#删除snap包" aria-hidden="true">#</a> 删除snap包</h3><p><code>snap remove snap包</code></p><h1 id="下载工具" tabindex="-1"><a class="header-anchor" href="#下载工具" aria-hidden="true">#</a> 下载工具</h1><h2 id="curl" tabindex="-1"><a class="header-anchor" href="#curl" aria-hidden="true">#</a> curl</h2><p><strong>长处在于模拟提交web数据，POST/GET请求，调试网页，等等</strong></p><ul><li>cURL是一个多功能工具。当然，它可以下载网络内容，但同时它也能做更多别的事情</li><li>cURL 技术支持库是：libcurl。这就意味着你可以基于 cURL 编写整个程序，允许你基于 libcurl 库中编写图形环境的下载程序，访问它所有的功能</li><li>cURL 支持宽泛的网络协议。cURL 支持访问 HTTP 和 HTTPS 协议、能够处理 FTP 传输、支持 LDAP 协议、甚至支持 Samba 分享、还可以用 cURL 收发邮件</li><li>cURL 也有一些简洁的安全特性。cURL 支持安装许多 SSL/TLS 库，也支持通过网络代理访问，包括 SOCKS。这意味着，你可以越过 Tor 来使用cURL</li></ul><h3 id="获取页面内容" tabindex="-1"><a class="header-anchor" href="#获取页面内容" aria-hidden="true">#</a> 获取页面内容</h3><p>默认会发送 GET 请求来获取链接内容到标准输出</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> http://www.codebelief.com 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="获取请求头" tabindex="-1"><a class="header-anchor" href="#获取请求头" aria-hidden="true">#</a> 获取请求头</h3><p>只想要显示 HTTP 头，而不显示文件内容</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-I</span> http://www.codebelief.com 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同时显示 HTTP 头和文件内容</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-i</span> http://www.codebelief.com 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="保存文件" tabindex="-1"><a class="header-anchor" href="#保存文件" aria-hidden="true">#</a> 保存文件</h3><ul><li>-o：命令行中提供文件名，保存内容到文件中</li><li>-O：url中的文件名会作为保存的文件名</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-o</span> index.html http://www.codebelief.com
<span class="token function">curl</span> <span class="token parameter variable">-O</span> http://www.codebelief.com/page/2/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="下载多个文件" tabindex="-1"><a class="header-anchor" href="#下载多个文件" aria-hidden="true">#</a> 下载多个文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-O</span> http://www.codebelief.com/page/2/ <span class="token parameter variable">-O</span> http://www.codebelief.com/page/3/ 
<span class="token function">curl</span> <span class="token parameter variable">-o</span> page1.html http://www.codebelief.com/page/1/ <span class="token parameter variable">-o</span> page2.html http://www.codebelief.com/page/2/ 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="跟随链接重定向" tabindex="-1"><a class="header-anchor" href="#跟随链接重定向" aria-hidden="true">#</a> 跟随链接重定向</h3><p>某些链接点击后会重定向其他链接，这种情况下无法获取想要的内容，返回301，需要跟随链接重定向</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-L</span> http://codebelief.com 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="加入请求头" tabindex="-1"><a class="header-anchor" href="#加入请求头" aria-hidden="true">#</a> 加入请求头</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-H</span> <span class="token string">&quot;Referer: www.example.com&quot;</span> <span class="token parameter variable">-H</span> <span class="token string">&quot;User-Agent: Custom-User-Agent&quot;</span> http://www.baidu.com 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="加入user-agent" tabindex="-1"><a class="header-anchor" href="#加入user-agent" aria-hidden="true">#</a> 加入User-Agent</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-A</span> <span class="token string">&quot;Mozilla/5.0 (Android; Mobile; rv:35.0) Gecko/35.0 Firefox/35.0&quot;</span> http://www.baidu.com 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="操作cookie" tabindex="-1"><a class="header-anchor" href="#操作cookie" aria-hidden="true">#</a> 操作Cookie</h3><h4 id="保存cookie" tabindex="-1"><a class="header-anchor" href="#保存cookie" aria-hidden="true">#</a> 保存Cookie</h4><p>指定文件保存网页的cookie</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-c</span> <span class="token string">&quot;cookie-example&quot;</span> http://www.example.com 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="读取cookie" tabindex="-1"><a class="header-anchor" href="#读取cookie" aria-hidden="true">#</a> 读取Cookie</h4><p>读取cookie并一同提交到网页</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-b</span> <span class="token string">&quot;cookie-example&quot;</span> http://www.example.com 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="发送post请求" tabindex="-1"><a class="header-anchor" href="#发送post请求" aria-hidden="true">#</a> 发送Post请求</h3><p>向网页提交数据</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;userName=tom&amp;passwd=123456&quot;</span> <span class="token parameter variable">-X</span> POST http://www.example.com/login 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当使用<code>-d</code>时，默认使用post请求，所以可以省略<code>-x</code>，所以等同于以下命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;userName=tom&amp;passwd=123456&quot;</span> http://www.example.com/login 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="带cookie登录" tabindex="-1"><a class="header-anchor" href="#带cookie登录" aria-hidden="true">#</a> 带Cookie登录</h3><p>第一次访问时，提交账号密码，但第二次访问时同样是没有登录的状态，可以通过cookie来完成保持登录状态</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-c</span> <span class="token string">&quot;cookie-login&quot;</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;userName=tom&amp;passwd=123456&quot;</span> http://www.example.com/login 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第二次访问直接使用</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-b</span> <span class="token string">&quot;cookie-login&quot;</span> http://www.example.com/login 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="强制使用get请求" tabindex="-1"><a class="header-anchor" href="#强制使用get请求" aria-hidden="true">#</a> 强制使用Get请求</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;somedata&quot;</span> <span class="token parameter variable">-X</span> GET http://www.example.com/api 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者可以使用<code>-G</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;somedata&quot;</span> <span class="token parameter variable">-G</span> http://www.example.com/api
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="wget" tabindex="-1"><a class="header-anchor" href="#wget" aria-hidden="true">#</a> wget</h2><p><strong>专职的下载利器，简单，专一，极致</strong></p><ul><li><p>wget 简单直接。这意味着你能享受它超凡的下载速度。wget 是一个独立的程序，无需额外的资源库，更不会做其范畴之外的事情。</p></li><li><p>wget 是专业的直接下载程序，支持递归下载。同时，它也允许你下载网页中或是 FTP 目录中的任何内容。</p></li><li><p>wget 拥有智能的默认设置。它规定了很多在常规浏览器里的事物处理方式，比如 cookies 和重定向，这都不需要额外的配置。可以说，wget 简直就是无需说明，开箱即用</p></li></ul><h3 id="下载单个文件" tabindex="-1"><a class="header-anchor" href="#下载单个文件" aria-hidden="true">#</a> 下载单个文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> http://cn.wordpress.org/wordpress-3.1-zh_CN.zip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在下载的过程中会显示进度条，包含（下载完成百分比，已经下载的字节，当前下载速度，剩余下载时间）</p><h3 id="下载文件时另存为" tabindex="-1"><a class="header-anchor" href="#下载文件时另存为" aria-hidden="true">#</a> 下载文件时另存为</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> <span class="token parameter variable">-O</span> wordpress.zip http://www.centos.bz/download.php?id<span class="token operator">=</span><span class="token number">1080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>wget默认会以最后一个符合”/”的后面的字符来命令，对于动态链接的下载通常文件名会不正确。如上面这个链接，虽然下载的文件是zip格式，但是最终还是会以download.php?id=1080作为名称保存，可以使用<code>-O</code>来重命名来解决</p><h3 id="断点续传" tabindex="-1"><a class="header-anchor" href="#断点续传" aria-hidden="true">#</a> 断点续传</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> <span class="token parameter variable">-c</span> http://cn.wordpress.org/wordpress-3.1-zh_CN.zip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对于下载大文件时突然由于网络等原因中断非常有帮助，使用<code>-c</code>这个选项可以继续接着下载而不是重新下载一个文件</p><h3 id="后台下载" tabindex="-1"><a class="header-anchor" href="#后台下载" aria-hidden="true">#</a> 后台下载</h3><p>下载大文件时，可以使用后台下载而不需要占用着命令行界面</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> <span class="token parameter variable">-b</span> http://cn.wordpress.org/wordpress-3.1-zh_CN.zip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输入后，命令行会有以下输出</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Continuing <span class="token keyword">in</span> background, pid <span class="token number">1840</span>.
Output will be written to \`wget-log’.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以通过wget-log来查看下载进度</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">tail</span> <span class="token parameter variable">-f</span> wget-log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="加入user-agent-1" tabindex="-1"><a class="header-anchor" href="#加入user-agent-1" aria-hidden="true">#</a> 加入User-Agent</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> –user-agent<span class="token operator">=</span>”Mozilla/5.0 <span class="token punctuation">(</span>Windows<span class="token punctuation">;</span> U<span class="token punctuation">;</span> Windows NT <span class="token number">6.1</span><span class="token punctuation">;</span> en-US<span class="token punctuation">)</span> AppleWebKit/534.16 <span class="token punctuation">(</span>KHTML, like Gecko<span class="token punctuation">)</span> Chrome/10.0.648.204 Safari/534.16″ http://cn.wordpress.org/wordpress-3.1-zh_CN.zip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因为有些网站可能会对不是浏览器的请求进行拦截</p><h3 id="下载多个文件-1" tabindex="-1"><a class="header-anchor" href="#下载多个文件-1" aria-hidden="true">#</a> 下载多个文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#首先，保存一份下载链接文件</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> filelist.txt
url1
url2
url3
url4
<span class="token comment">#接着使用这个文件和参数-i下载</span>
<span class="token function">wget</span> <span class="token parameter variable">-i</span> filelist.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="下载重试" tabindex="-1"><a class="header-anchor" href="#下载重试" aria-hidden="true">#</a> 下载重试</h3><p>如果网络有问题或下载一个大文件也有可能失败。wget默认重试20次连接下载文件。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> –tries<span class="token operator">=</span><span class="token number">40</span> url
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="ftp下载" tabindex="-1"><a class="header-anchor" href="#ftp下载" aria-hidden="true">#</a> FTP下载</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> url
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>用户名密码下载</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> –ftp-user<span class="token operator">=</span>USERNAME –ftp-password<span class="token operator">=</span>PASSWORD url
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="二者相似之处" tabindex="-1"><a class="header-anchor" href="#二者相似之处" aria-hidden="true">#</a> 二者相似之处</h2>`,215),u=e("li",null,[e("p",null,"wget 和 cURL 都可以下载内容。它们的核心就是这么设计的。它们都可以向互联网发送请求并返回请求项。这可以是文件、图片或者是其他诸如网站的原始 HTML 之类。")],-1),p=e("li",null,[e("p",null,"这两个程序都可以进行 HTTP POST 请求。这意味着它们都可以向网站发送数据，比如说填充表单什么的。")],-1),h={href:"https://www.maketecheasier.com/beginners-guide-scripting-linux/",target:"_blank",rel:"noopener noreferrer"},v=n(`<h2 id="一句话总结" tabindex="-1"><a class="header-anchor" href="#一句话总结" aria-hidden="true">#</a> 一句话总结</h2><ul><li><p>想快速下载并且没有担心参数标识的需求-wget</p></li><li><p>想做一些更复杂的使用-curl</p></li></ul><h1 id="terminal" tabindex="-1"><a class="header-anchor" href="#terminal" aria-hidden="true">#</a> Terminal</h1><h2 id="oh-my-zsh" tabindex="-1"><a class="header-anchor" href="#oh-my-zsh" aria-hidden="true">#</a> oh-my-zsh</h2><h3 id="安装oh-my-zsh" tabindex="-1"><a class="header-anchor" href="#安装oh-my-zsh" aria-hidden="true">#</a> 安装oh-my-zsh</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 第一步 （确保你的系统中有 zsh、git、wget、curl）</span>
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token function">zsh</span>
<span class="token comment"># 第二步 （使用脚本进行安装，这里安装完成后会询问是否把oh-my-zsh修改默认shell）</span>
<span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">wget</span> https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh <span class="token parameter variable">-O</span> -<span class="token variable">)</span></span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装oh-my-zsh插件" tabindex="-1"><a class="header-anchor" href="#安装oh-my-zsh插件" aria-hidden="true">#</a> 安装oh-my-zsh插件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># zsh-autosuggestions插件 （类似代码提示）</span>
<span class="token function">git</span> clone https://github.com/zsh-users/zsh-autosuggestions.git <span class="token variable">$ZSH_CUSTOM</span>/plugins/zsh-autosuggestions
<span class="token comment"># zsh-syntax-highlighting插件 （语法检测，输入的命令是否存在等）</span>
<span class="token function">git</span> clone https://github.com/zsh-users/zsh-syntax-highlighting.git <span class="token variable">$ZSH_CUSTOM</span>/plugins/zsh-syntax-highlighting
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改配置文件使插件生效</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> ~/.zshrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>找到插件那一部分</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Example format: plugins=(rails git textmate ruby lighthouse)</span>
<span class="token comment"># Add wisely, as too many plugins slow down shell startup.</span>
<span class="token assign-left variable">plugins</span><span class="token operator">=</span><span class="token punctuation">(</span>git zsh-autosuggestions zsh-syntax-highlighting<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>保存后执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">source</span> ~/.zshrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="安装oh-my-zsh主题" tabindex="-1"><a class="header-anchor" href="#安装oh-my-zsh主题" aria-hidden="true">#</a> 安装oh-my-zsh主题</h3>`,15),m={href:"https://github.com/ohmyzsh/ohmyzsh/wiki/Themes",target:"_blank",rel:"noopener noreferrer"},b=n(`<p>修改配置文件使主题生效</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> ~/.zshrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>找到主题那一部分，使用系统自带的<code>ys</code>主题</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Set name of the theme to load --- if set to &quot;random&quot;, it will</span>
<span class="token comment"># load a random theme each time oh-my-zsh is loaded, in which case,</span>
<span class="token comment"># to know which specific one was loaded, run: echo $RANDOM_THEME</span>
<span class="token comment"># See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes</span>
<span class="token comment">#ZSH_THEME=&quot;robbyrussell&quot;</span>
<span class="token assign-left variable">ZSH_THEME</span><span class="token operator">=</span><span class="token string">&quot;ys&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>保存后执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">source</span> ~/.zshrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="场景" tabindex="-1"><a class="header-anchor" href="#场景" aria-hidden="true">#</a> 场景</h1><h2 id="cpu狂飙" tabindex="-1"><a class="header-anchor" href="#cpu狂飙" aria-hidden="true">#</a> CPU狂飙</h2><ul><li><code>top</code> 命令看看哪个进程在占用 CPU （占用 CPU 的百分比），拿到进程号后使用 <code>kill</code> 命令停止</li><li><code>ps</code> 命令可以看到所有的进程，可以看看有没有什么可疑的进程，拿到进程号 <ul><li><code>top</code> 命令和 <code>ps</code> 命令都是使用 <code>opendir</code> 、<code>readdir</code> 这些系统调用函数来遍历 <code>/proc/</code> 目录下的内容，如果还是没能定位到占用 CPU 的进程，那么有可能是这个进程<strong>潜入了 Linux 内核、篡改了这些系统调用函数</strong></li></ul></li><li><code>netstat</code> 命令可以看下有没有什么对外可疑的连接（考虑挖矿病毒程序）</li></ul>`,9);function g(x,k){const s=l("ExternalLinkIcon");return r(),t("div",null,[o,e("ul",null,[u,p,e("li",null,[e("p",null,[a("由于这两者都是命令行工具，它们都被设计成可脚本化。wget 和 cURL 都可以写进你的 "),e("a",h,[a("Bash 脚本"),i(s)]),a(" ，自动与新内容交互，下载所需内容。")])])]),v,e("p",null,[e("a",m,[a("oh-my-zsh主题库"),i(s)]),a(" 需要的可以从上面下载")]),b])}const y=d(c,[["render",g],["__file","Linux.html.vue"]]);export{y as default};
