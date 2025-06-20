import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-BLfEJaid.js";const i={},l=e(`<h1 id="rocketmq-broker-配置详解" tabindex="-1"><a class="header-anchor" href="#rocketmq-broker-配置详解"><span>RocketMQ Broker 配置详解</span></a></h1><p>这里记录了Broker配置文件各种配置及其注释，记录起来方便使用时参考。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># Licensed to the Apache Software Foundation (ASF) under one or more</span></span>
<span class="line"><span># contributor license agreements.  See the NOTICE file distributed with</span></span>
<span class="line"><span># this work for additional information regarding copyright ownership.</span></span>
<span class="line"><span># The ASF licenses this file to You under the Apache License, Version 2.0</span></span>
<span class="line"><span># (the &quot;License&quot;); you may not use this file except in compliance with</span></span>
<span class="line"><span># the License.  You may obtain a copy of the License at</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span>#     http://www.apache.org/licenses/LICENSE-2.0</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span>#  Unless required by applicable law or agreed to in writing, software</span></span>
<span class="line"><span>#  distributed under the License is distributed on an &quot;AS IS&quot; BASIS,</span></span>
<span class="line"><span>#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.</span></span>
<span class="line"><span>#  See the License for the specific language governing permissions and</span></span>
<span class="line"><span>#  limitations under the License.</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span># 所属集群名字</span></span>
<span class="line"><span>brokerClusterName=DefaultCluster</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span># broker 名字，注意此处不同的配置文件填写的不一样，如果在 broker-a.properties 使用: broker-a,</span></span>
<span class="line"><span># 在 broker-b.properties 使用: broker-b</span></span>
<span class="line"><span>brokerName=broker-a</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span># 0 表示 Master，&gt; 0 表示 Slave</span></span>
<span class="line"><span>brokerId=0</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span># nameServer地址，分号分割</span></span>
<span class="line"><span># namesrvAddr=rocketmq-nameserver1:9876;rocketmq-nameserver2:9876</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span># 启动IP,如果 docker 报 com.alibaba.rocketmq.remoting.exception.RemotingConnectException: connect to &lt;192.168.0.120:10909&gt; failed</span></span>
<span class="line"><span># 解决方式1 加上一句 producer.setVipChannelEnabled(false);，解决方式2 brokerIP1 设置宿主机IP，不要使用docker 内部IP</span></span>
<span class="line"><span>brokerIP1=192.168.200.129</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span># 在发送消息时，自动创建服务器不存在的topic，默认创建的队列数</span></span>
<span class="line"><span>defaultTopicQueueNums=4</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span># 是否允许 Broker 自动创建 Topic，建议线下开启，线上关闭 </span></span>
<span class="line"><span>autoCreateTopicEnable=true</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span># 是否允许 Broker 自动创建订阅组，建议线下开启，线上关闭</span></span>
<span class="line"><span>autoCreateSubscriptionGroup=true</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span># Broker 对外服务的监听端口</span></span>
<span class="line"><span>listenPort=10911</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span># 删除文件时间点，默认凌晨4点</span></span>
<span class="line"><span>deleteWhen=04</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span># 文件保留时间，默认48小时</span></span>
<span class="line"><span>fileReservedTime=120</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span># commitLog 每个文件的大小默认1G</span></span>
<span class="line"><span>mapedFileSizeCommitLog=1073741824</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span># ConsumeQueue 每个文件默认存 30W 条，根据业务情况调整</span></span>
<span class="line"><span>mapedFileSizeConsumeQueue=300000</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span># destroyMapedFileIntervalForcibly=120000</span></span>
<span class="line"><span># redeleteHangedFileInterval=120000</span></span>
<span class="line"><span># 检测物理文件磁盘空间</span></span>
<span class="line"><span>diskMaxUsedSpaceRatio=88</span></span>
<span class="line"><span># 存储路径</span></span>
<span class="line"><span># storePathRootDir=/home/ztztdata/rocketmq-all-4.1.0-incubating/store</span></span>
<span class="line"><span># commitLog 存储路径</span></span>
<span class="line"><span># storePathCommitLog=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/commitlog</span></span>
<span class="line"><span># 消费队列存储</span></span>
<span class="line"><span># storePathConsumeQueue=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/consumequeue</span></span>
<span class="line"><span># 消息索引存储路径</span></span>
<span class="line"><span># storePathIndex=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/index</span></span>
<span class="line"><span># checkpoint 文件存储路径</span></span>
<span class="line"><span># storeCheckpoint=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/checkpoint</span></span>
<span class="line"><span># abort 文件存储路径</span></span>
<span class="line"><span># abortFile=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/abort</span></span>
<span class="line"><span># 限制的消息大小</span></span>
<span class="line"><span>maxMessageSize=65536</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span># flushCommitLogLeastPages=4</span></span>
<span class="line"><span># flushConsumeQueueLeastPages=2</span></span>
<span class="line"><span># flushCommitLogThoroughInterval=10000</span></span>
<span class="line"><span># flushConsumeQueueThoroughInterval=60000</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span># Broker 的角色</span></span>
<span class="line"><span># - ASYNC_MASTER 异步复制Master</span></span>
<span class="line"><span># - SYNC_MASTER 同步双写Master</span></span>
<span class="line"><span># - SLAVE</span></span>
<span class="line"><span>brokerRole=ASYNC_MASTER</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span># 刷盘方式</span></span>
<span class="line"><span># - ASYNC_FLUSH 异步刷盘</span></span>
<span class="line"><span># - SYNC_FLUSH 同步刷盘</span></span>
<span class="line"><span>flushDiskType=ASYNC_FLUSH</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span># 发消息线程池数量</span></span>
<span class="line"><span># sendMessageThreadPoolNums=128</span></span>
<span class="line"><span># 拉消息线程池数量</span></span>
<span class="line"><span># pullMessageThreadPoolNums=128</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 消息重试16次分别间隔</span></span>
<span class="line"><span>messageDelayLevel =1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 消息轨迹</span></span>
<span class="line"><span>traceTopicEnable=true</span></span>
<span class="line"><span>msgTraceTopicName=RMQ_SYS_TRACE_TOPIC</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 最大磁盘比率</span></span>
<span class="line"><span>diskMaxUsedSpaceRatio=99</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题"><span>问题</span></a></h2><p><code>com.alibaba.rocketmq.client.exception.MQBrokerException: CODE: 14 DESC: service not available now, maybe disk full, CL: 0.87 CQ: 0.87 INDEX: 0.87, maybe your broker machine memory too small.</code></p><p>服务器磁盘空间不足，默认使用超过 75% 的磁盘空间会报此错误，需要调整每一个 broker 的配置参数</p><p>加上这一行：<code>diskMaxUsedSpaceRatio=99</code> 只有使用超过 99% 的磁盘空间才报错</p><p>保存后重启各个 broker</p>`,8),p=[l];function c(r,t){return a(),s("div",null,p)}const m=n(i,[["render",c],["__file","RocketMQ-broker-config.html.vue"]]),v=JSON.parse('{"path":"/writings/RocketMQ/RocketMQ-broker-config.html","title":"RocketMQ Broker 配置详解","lang":"zh-CN","frontmatter":{"title":"RocketMQ Broker 配置详解","icon":"article","category":["干货","消息队列","RocketMQ"],"tag":["Broker"],"description":"RocketMQ Broker 配置详解 这里记录了Broker配置文件各种配置及其注释，记录起来方便使用时参考。 问题 com.alibaba.rocketmq.client.exception.MQBrokerException: CODE: 14 DESC: service not available now, maybe disk full, ...","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/RocketMQ/RocketMQ-broker-config.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"RocketMQ Broker 配置详解"}],["meta",{"property":"og:description","content":"RocketMQ Broker 配置详解 这里记录了Broker配置文件各种配置及其注释，记录起来方便使用时参考。 问题 com.alibaba.rocketmq.client.exception.MQBrokerException: CODE: 14 DESC: service not available now, maybe disk full, ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-11T06:12:31.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:tag","content":"Broker"}],["meta",{"property":"article:modified_time","content":"2023-05-11T06:12:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"RocketMQ Broker 配置详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-11T06:12:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"问题","slug":"问题","link":"#问题","children":[]}],"git":{"createdTime":1662281558000,"updatedTime":1683785551000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1},{"name":"wuyingbin","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":2.42,"words":727},"filePathRelative":"writings/RocketMQ/RocketMQ-broker-config.md","localizedDate":"2022年9月4日","autoDesc":true}');export{m as comp,v as data};
