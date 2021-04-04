# Centos

## 目录结构

```
/: 根目录
/bin: 存放普通用户可以使用的指令
/usr: 包含了命令库文件和在通常操作中不会修改的文件。安装的程序默认放在/usr下面的子目录
/etc: 全局的配置文件存放目录
/boot: 引导程序，内核等存放的目录
```

## 命令

```
cd: 切换目录
```

```
ls: 列出文件列表
	-a: 所有文件(包括隐藏文件/文件夹)
	-l: 显示详细信息(操作权限、用户、修改时间) `ls -l 等价于 ll`
```

```
mkdir: 创建目录
	-p: 递归创建目录
rmdir: 移除目录
```

### 文件打包/压缩

```
tar: 压缩/解压
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
```

```
zip: 压缩/解压

压缩: zip a.zip a --把a目录压缩成a.zip
解压: unzip a.zip --把a.zip解压到当前文件夹内
```

```
ifconfig: 查看网络配置
其中192.168.84.130就是本机ip地址

centos7 查看ip地址推荐使用ip addr
```

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfsqzd3mu6j311f0u04qp.jpg)

### 浏览文件

```
cat: 把文件的所有内容都打印到控制台上
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
```

### 复制/剪切文件

```
cp: 复制
	第一个参数是需要复制的文件 第二个参数是文件名或目录
	cp a.txt b.txt 	将a.txt复制为b.txt
	cp a.txt ../ 		将a.txt复制到上一层目录中

mv: 移动或重命名
```

```
rm: 删除文件
	-r: 删除文件夹 递归删除
	-f: 不询问直接删除
```

### 查找

```
find: 查找文件
	-name: 按名称查找
	-user: 按用户查找
	-type: 按类型查找 d: 目录类型
	-perm: 按权限查找
	
	find / -name "ins*" 在根目录下查找ins开头的文件
	
grep: 查找文件中的字符串
	grep string file
	-color: 高亮显示
	-A[number]: 查找到字符串之后再往后显示number行
	-B[number]: 查找到字符串之后再往前显示number行
	
	grep debug yum.conf -color 从yum.conf中查找debug字符串并高亮显示
```

### vi

1. 命令行模式。刚用vi进入文件就是命令行模式，可以进入底行模式、插入模式
   1. i：当前位置前插入
   2. I：当前行首插入
   3. a：当前位置后插入
   4. A：当前行尾插入
   5. o：当前行之后插入一行
   6. O：当前行之前插入一行
   7. :(冒号)：切换到底行模式
2. 底行模式
   1. :w：保存
   2. :q：退出
   3. :q!：如果不想保存修改，需要强制退出
   4. :wq：保存并退出
   5. /string：在文件中搜寻string
3. 插入模式，需要保存的话只能先切换到命令行模式再切换到底行模式来保存
   1. Esc：切换到命令行模式

### 重定向

```
>: 	重定向输出，覆盖原有内容

>>: 重定向输出，但是是追加形式

命令左边可以是任意的命令，只要输入之后控制台有输出即可；命令右边一般是文件
```

### 系统管理

```
ps: 查看正在运行的命令
ps -ef: 查看所有进程
ps -ef | grep name: 查看某一进程

kill: 杀死进程
	-9: 强制杀死
kill 1234: 杀死1234编号的进程
kill -9 1234: 强制杀死1234编号的进程
```

### 管道

```
|: 将管道左边的输出作为管道右边的输入

ls --help | more: 分页查询帮助信息
ps -ef | grep java: 查询包含名称java的进程
ifconfig | more: 分页查询网络配置
cat index.html | more: 分页查询index.html的内容
```

```
chmod: 修改权限

chmod u=rwx,g=rx,o=rx a.txt 给a.txt赋予权限
```

### 服务管理

```
service name status: 	查看服务的状态
service --status-all:	查看所有服务的状态
service name stop: 		停止服务
service name start: 	启动服务
service name restart: 重启服务

网络服务: network
防火墙服务: iptables
```

### 查看文件

- cat: 一次性把文件内容输出到终端
- more: 分页加载文件内容
  - 空格: 查看下一页
  - b: 查看上一页
  - 回车: 往下滚动一行
  - q: 退出
  - more +xx 文件: 从xx行开始查看文件内容
- less: 分页加载文件内容
  - b: 查看上一页
  - 空格: 查看下一页
  - u: 向前翻半页
  - d: 向后翻半页
  - y: 查看上一行
  - 回车: 查看下一行

## 权限系统

```
形式: - --- --- --- 10位

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

```

## 网络配置

```
hostname: 查看主机名
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
```

## 防火墙

- 查看防火墙服务状态

  ```
  systemctl status firewalld
  ```

- 查看防火墙状态

  ```
  firewall-cmd --state
  ```

  firewall-cmd是Linux提供的一个操作firewall的工具

- 开启、重启、停止防火墙服务

  ```
  service firewalld start
  service firewalld restart
  service firewalld stop
  ```

- 重启防火墙

  ```
  firewall-cmd --reload
  ```

- 查看防火墙规则

  ```
  firewall-cmd --list-all
  ```

- 查询端口

  ```
  firewall-cmd --query-port=80/tcp
  ```

- 增加、移除端口

  ```
  firewall-cmd -permanent --add-port=80/tcp
  firewall-cmd -permanent --remove-port=80/tcp
  ```

  

## 软件安装

### JDK

```
1.下载并上传jre的压缩包
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
```

### Mysql

```
1.下载并上传mysql的压缩包
2.检查系统中是否有mysql
	rpm -qa | grep mysql

```

### Tomcat

```
1.下载并上传tomcat的压缩包
2.检查系统中是否有tomcat
	rpm -qa | grep tomcat
3.解压压缩包
```

### redis

```

```

### nginx

```

```

## 查看日志

### cat

一般用`cat`来查看这个小文件的文本内容是什么，如果查看大文件会卡，而且`Ctrl+C`退出也需要很久的时间

### vim

`vim`和`cat`同理，适合查看小文件

使用`vim`一般步骤：

1. `vim service.log`
2. 按`G`跳转到文件结尾
3. 按`? 关键字`搜索对应记录
4. 按`n`往上查询，按`N`往下查询

### head

一般用于查看服务的启动情况，启动报错

`head -n100 service.log` 查看日志文件头100行记录

### tail -f

一般用于查看流量是否进来了，程序是否启动了，因为滚动得太快

`tail -fn100 service.log` 查询日志最后100行记录，并且随文件的内容追加而加载出来

### 按关键字查找

1. 找到发生异常的行数，假设"error"代表异常，可以使用`cat -n service.log | grep error`
2. 通过行号查询对应行前后的内容，得到该行，需要通过上下文来分析错误产生的原因，假设错误行数在102，可以使用`sed -n "92,112p" service.log`来看92-112行之间的内容

### 日志结果太多的做法

- 使用`more`来分页
- 使用`>search.txt`来重定向保存到文件中，到时候再另外分析这份文件

### 清空日志

- `> service.log`

## Centos8

### 最小安装后设置网络

1. 列出网卡信息:`ip link show`

2. 前往修改网卡信息:`cd /etc/sysconfig/network-scripts/`,在该目录下找到配置文件,备份一下

3. 编辑网卡配置信息

   ```
   TYPE=Ethernet
   PROXY_METHOD=none
   BROWSER_ONLY=no
   BOOTPROTO=static		#static:静态IP;dncp:自动获取IP
   DEFROUTE=yes
   IPADDR=192.168.1.180	#IP地址
   NETMAST=255.255.255.0	#子网掩码,C类网络一般写法
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
   ```

4. 重启网卡:`nmcli c reload`

5. 启用网卡,默认是不启用的:`nmcli c up ens192`

6. 查看网卡是否启用了:`nmcli device show`或`nmcli`

7. 常用命令:开启网络:`nmcli networking on`;关闭网络:`nmcli networking off`

# Tomcat

## 项目部署方式

- 把项目放到webapps目录下。这种方式项目的访问名称和项目的名称是一致的。最好使用简化部署方式：将项目打包成war包形式，放到webapps下，自动解压、自动删除
- 修改`server.xml`配置文件
  - 在localhost的server中加入`<Context docBase="项目路径" path="项目访问路径" />`，风险：有可能把tomcat原有的东西弄坏
  - 加入新的server
- 在conf\Catalina\localhost创建项目

## 项目目录结构

### 动态项目

```
-- 项目的根目录
	-- WEB-INF目录
			-- web.xml:web项目的核心配置文件
			-- classes目录:放置字节码文件的目录
			-- lib目录:放置项目依赖的jar包
```



# Nginx

### 命令

- 启动：`nginx`
- 安全重启：`nginx -s reload` 重新加载配置文件
- 重启：`nginx -s reopen`
- 安全停止：`nginx -s quit` 处理完所有请求再停止服务
- 强制停止：`nginx -s stop`
- 杀死进程方式停止：`kill -9 nginx进程的id`
- 杀死所有进程：`killall nginx`
- 查看nginx的版本信息：`nginx -v`
- 检测配置文件是否有语法错误：`nginx -t`

### 特点

- Nginx 使用基于事件驱动架构，使得其可以支持数以百万级别的 TCP 连接
- 高度的模块化和自由软件许可证使得第三方模块层出不穷
- Nginx 是一个跨平台服务器
- 稳定
- Nginx 可以作为一个 HTTP 服务器进行网站的发布处理
- 可以作为反向代理进行负载均衡的实现

### 代理

- 正向代理
  - 正向代理最大的特点是**客户端非常明确要访问的服务器地址**；服务器只清楚请求来自哪个代理服务器，而**不清楚来自哪个具体的客户端**；正向代理模式屏蔽或者**隐藏了真实客户端信息**。客户端必须设置正向代理服务器，当然前提是要知道正向代理服务器的 IP 地址，还有代理程序的端口
  - 访问原来无法访问的资源，如 Google
  - 可以做缓存，加速访问资源
  - 对客户端访问授权，上网进行认证
  - 代理可以记录用户访问记录（上网行为管理），对外隐藏用户信息
- 反向代理
  - 客户端是无感知代理的存在的，反向代理对外都是透明的，访问者并不知道自己访问的是一个代理。因为客户端不需要任何配置就可以访问。反向代理，"它代理的是服务端"，主要用于服务器集群分布式部署的情况下，**反向代理隐藏了服务器的信息**。
  - 保证内网的安全，通常将反向代理作为公网访问地址，Web 服务器是内网
  - 负载均衡，通过反向代理服务器来优化网站的负载

### 负载均衡

1. **weight 轮询（默认）**：接收到的请求按照顺序逐一分配到不同的后端服务器。如果在使用过程中，某一台后端服务器宕机，Nginx 会自动将该服务器剔除出队列，请求受理情况不会受到任何影响。

   可以给不同的后端服务器设置一个权重值（weight），用于调整不同的服务器上请求的分配率。权重数据越大，被分配到请求的几率越大；该权重值主要是针对实际工作环境中不同的后端服务器硬件配置进行调整的。

2. ip_hash：每个请求按照发起客户端的 ip 的 hash 结果进行匹配，这样的算法下一个固定 ip 地址的客户端总会访问到同一个后端服务器，这也在一定程度上解决了集群部署环境下 **Session 共享的问题**。

3. url_hash：按照访问的 URL 的 hash 结果分配请求，每个请求的 URL 会指向后端固定的某个服务器，可以在 Nginx 作为静态服务器的情况下提高缓存效率。**默认不支持**

4. fair：动态的根据后端服务器的请求处理到响应的时间进行均衡分配。响应时间短处理效率高的服务器分配到请求的概率高，响应时间长处理效率低的服务器分配到的请求少。**默认不支持**

### 几款服务器对比

![](https://gitee.com/ngyb/pic/raw/master/007S8ZIlgy1gfsr3uk2s6j30mm0k411e.jpg)

# Vagrant

- 创建虚拟环境

  ```bash
  vagrant init
  # 此时在当前目录会生成Vagrantfile文件
  ```

  ```ruby 
  config.vm.box = "centos/7" # 指定操作系统镜像
  # 如果本地没有该镜像，那么会从远端拉取
  
  config.vm.network "public_network" # 设置网络方式为共享
  
  # 指定内存、cpu等信息
  config.vm.provider "virtualbox" do |vb|
        vb.memory = "4096"
        vb.name = "first-docker-centos7"
        vb.cpus = 2
    end
  ```

- 查看当前系统中本地的vagrant镜像

  ```bash
  vagrant box list
  ```

- 添加镜像到本地仓库

  ```bash
  vagrant box add 镜像名 # 从云端拉取的方式 这个镜像名需要和云端https://app.vagrantup.com/boxes/search中镜像名一致
  
  vagrant box add 镜像名 本地镜像文件 # 从本地添加到仓库的方式
  ```

- 启动虚拟环境

  ```bash
  vagrant up
  # 此时会进行操作系统的安装
  ```

- 进入虚拟机

  ```bash
  vagrant ssh
  # 进入当前VagrantFile对应的虚拟机
  ```

  

# 包管理工具

snap

apt-get

yum



# 下载工具

## curl

**长处在于模拟提交web数据，POST/GET请求，调试网页，等等**

- cURL是一个多功能工具。当然，它可以下载网络内容，但同时它也能做更多别的事情
- cURL 技术支持库是：libcurl。这就意味着你可以基于 cURL 编写整个程序，允许你基于 libcurl 库中编写图形环境的下载程序，访问它所有的功能
- cURL 支持宽泛的网络协议。cURL 支持访问 HTTP 和 HTTPS 协议、能够处理 FTP 传输、支持 LDAP 协议、甚至支持 Samba 分享、还可以用 cURL 收发邮件
- cURL 也有一些简洁的安全特性。cURL 支持安装许多 SSL/TLS 库，也支持通过网络代理访问，包括 SOCKS。这意味着，你可以越过 Tor 来使用cURL

### 获取页面内容

默认会发送 GET 请求来获取链接内容到标准输出

```shell
curl http://www.codebelief.com 
```

### 获取请求头

只想要显示 HTTP 头，而不显示文件内容

```shell
curl -I http://www.codebelief.com 
```

同时显示 HTTP 头和文件内容

```shell
curl -i http://www.codebelief.com 
```

### 保存文件

- -o：命令行中提供文件名，保存内容到文件中
- -O：url中的文件名会作为保存的文件名

```shell
curl -o index.html http://www.codebelief.com
curl -O http://www.codebelief.com/page/2/
```

### 下载多个文件

```shell
curl -O http://www.codebelief.com/page/2/ -O http://www.codebelief.com/page/3/ 
curl -o page1.html http://www.codebelief.com/page/1/ -o page2.html http://www.codebelief.com/page/2/ 
```

### 跟随链接重定向

某些链接点击后会重定向其他链接，这种情况下无法获取想要的内容，返回301，需要跟随链接重定向

```shell
curl -L http://codebelief.com 
```

### 加入请求头

```shell
curl -H "Referer: www.example.com" -H "User-Agent: Custom-User-Agent" http://www.baidu.com 
```

#### 加入User-Agent

```shell
curl -A "Mozilla/5.0 (Android; Mobile; rv:35.0) Gecko/35.0 Firefox/35.0" http://www.baidu.com 
```

### 操作Cookie

#### 保存Cookie

指定文件保存网页的cookie

```shell
curl -c "cookie-example" http://www.example.com 
```

#### 读取Cookie

读取cookie并一同提交到网页

```shell
curl -b "cookie-example" http://www.example.com 
```

### 发送Post请求

向网页提交数据

```shell
curl -d "userName=tom&passwd=123456" -X POST http://www.example.com/login 
```

当使用`-d`时，默认使用post请求，所以可以省略`-x`，所以等同于以下命令

```shell
curl -d "userName=tom&passwd=123456" http://www.example.com/login 
```

### 带Cookie登录

第一次访问时，提交账号密码，但第二次访问时同样是没有登录的状态，可以通过cookie来完成保持登录状态

```shell
curl -c "cookie-login" -d "userName=tom&passwd=123456" http://www.example.com/login 
```

第二次访问直接使用

```shell
curl -b "cookie-login" http://www.example.com/login 
```

### 强制使用Get请求

```shell
curl -d "somedata" -X GET http://www.example.com/api 
```

或者可以使用`-G`

```shell
curl -d "somedata" -G http://www.example.com/api
```

## wget

**专职的下载利器，简单，专一，极致**

- wget 简单直接。这意味着你能享受它超凡的下载速度。wget 是一个独立的程序，无需额外的资源库，更不会做其范畴之外的事情。

- wget 是专业的直接下载程序，支持递归下载。同时，它也允许你下载网页中或是 FTP 目录中的任何内容。

- wget 拥有智能的默认设置。它规定了很多在常规浏览器里的事物处理方式，比如 cookies 和重定向，这都不需要额外的配置。可以说，wget 简直就是无需说明，开箱即用

### 下载单个文件

```shell
wget http://cn.wordpress.org/wordpress-3.1-zh_CN.zip
```

在下载的过程中会显示进度条，包含（下载完成百分比，已经下载的字节，当前下载速度，剩余下载时间）

### 下载文件时另存为

```shell
wget -O wordpress.zip http://www.centos.bz/download.php?id=1080
```

wget默认会以最后一个符合”/”的后面的字符来命令，对于动态链接的下载通常文件名会不正确。如上面这个链接，虽然下载的文件是zip格式，但是最终还是会以download.php?id=1080作为名称保存，可以使用`-O`来重命名来解决

### 断点续传

```shell
wget -c http://cn.wordpress.org/wordpress-3.1-zh_CN.zip
```

对于下载大文件时突然由于网络等原因中断非常有帮助，使用`-c`这个选项可以继续接着下载而不是重新下载一个文件

### 后台下载

下载大文件时，可以使用后台下载而不需要占用着命令行界面

```shell
wget -b http://cn.wordpress.org/wordpress-3.1-zh_CN.zip
```

输入后，命令行会有以下输出

```shell
Continuing in background, pid 1840.
Output will be written to `wget-log’.
```

可以通过wget-log来查看下载进度

```shell
tail -f wget-log
```

### 加入User-Agent

```shell
wget –user-agent=”Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.16 (KHTML, like Gecko) Chrome/10.0.648.204 Safari/534.16″ http://cn.wordpress.org/wordpress-3.1-zh_CN.zip
```

因为有些网站可能会对不是浏览器的请求进行拦截

### 下载多个文件

```shell
#首先，保存一份下载链接文件
cat > filelist.txt
url1
url2
url3
url4
#接着使用这个文件和参数-i下载
wget -i filelist.txt
```

### 下载重试

如果网络有问题或下载一个大文件也有可能失败。wget默认重试20次连接下载文件。

```shell
wget –tries=40 url
```

### FTP下载

```shell
wget url
```

用户名密码下载

```shell
wget –ftp-user=USERNAME –ftp-password=PASSWORD url
```



## 二者相似之处

- wget 和 cURL 都可以下载内容。它们的核心就是这么设计的。它们都可以向互联网发送请求并返回请求项。这可以是文件、图片或者是其他诸如网站的原始 HTML 之类。

- 这两个程序都可以进行 HTTP POST 请求。这意味着它们都可以向网站发送数据，比如说填充表单什么的。

- 由于这两者都是命令行工具，它们都被设计成可脚本化。wget 和 cURL 都可以写进你的 [Bash 脚本](https://www.maketecheasier.com/beginners-guide-scripting-linux/) ，自动与新内容交互，下载所需内容。

## 一句话总结

- 想快速下载并且没有担心参数标识的需求-wget

- 想做一些更复杂的使用-curl