const e=JSON.parse('{"key":"v-195f5a40","path":"/writings/RocketMQ/RocketMQ-broker-config.html","title":"RocketMQ Broker 配置详解","lang":"zh-CN","frontmatter":{"title":"RocketMQ Broker 配置详解","icon":"article","category":["干货","消息队列","RocketMQ"],"tag":["Broker"],"description":"RocketMQ Broker 配置详解 这里记录了Broker配置文件各种配置及其注释，记录起来方便使用时参考。 # Licensed to the Apache Software Foundation (ASF) under one or more # contributor license agreements. See the NOTICE file distributed with # this work for additional information regarding copyright ownership. # The ASF licenses this file to You under the Apache License, Version 2.0 # (the \\"License\\"); you may not use this file except in compliance with # the License. You may obtain a copy of the License at # # http://www.apache.org/licenses/LICENSE-2.0 # # Unless required by applicable law or agreed to in writing, software # distributed under the License is distributed on an \\"AS IS\\" BASIS, # WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. # See the License for the specific language governing permissions and # limitations under the License. ​ ​ # 所属集群名字 brokerClusterName=DefaultCluster ​ # broker 名字，注意此处不同的配置文件填写的不一样，如果在 broker-a.properties 使用: broker-a, # 在 broker-b.properties 使用: broker-b brokerName=broker-a ​ # 0 表示 Master，&gt; 0 表示 Slave brokerId=0 ​ # nameServer地址，分号分割 # namesrvAddr=rocketmq-nameserver1:9876;rocketmq-nameserver2:9876 ​ # 启动IP,如果 docker 报 com.alibaba.rocketmq.remoting.exception.RemotingConnectException: connect to &lt;192.168.0.120:10909&gt; failed # 解决方式1 加上一句 producer.setVipChannelEnabled(false);，解决方式2 brokerIP1 设置宿主机IP，不要使用docker 内部IP brokerIP1=192.168.200.129 ​ # 在发送消息时，自动创建服务器不存在的topic，默认创建的队列数 defaultTopicQueueNums=4 ​ # 是否允许 Broker 自动创建 Topic，建议线下开启，线上关闭 autoCreateTopicEnable=true ​ # 是否允许 Broker 自动创建订阅组，建议线下开启，线上关闭 autoCreateSubscriptionGroup=true ​ # Broker 对外服务的监听端口 listenPort=10911 ​ # 删除文件时间点，默认凌晨4点 deleteWhen=04 ​ # 文件保留时间，默认48小时 fileReservedTime=120 ​ # commitLog 每个文件的大小默认1G mapedFileSizeCommitLog=1073741824 ​ # ConsumeQueue 每个文件默认存 30W 条，根据业务情况调整 mapedFileSizeConsumeQueue=300000 ​ # destroyMapedFileIntervalForcibly=120000 # redeleteHangedFileInterval=120000 # 检测物理文件磁盘空间 diskMaxUsedSpaceRatio=88 # 存储路径 # storePathRootDir=/home/ztztdata/rocketmq-all-4.1.0-incubating/store # commitLog 存储路径 # storePathCommitLog=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/commitlog # 消费队列存储 # storePathConsumeQueue=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/consumequeue # 消息索引存储路径 # storePathIndex=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/index # checkpoint 文件存储路径 # storeCheckpoint=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/checkpoint # abort 文件存储路径 # abortFile=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/abort # 限制的消息大小 maxMessageSize=65536 ​ # flushCommitLogLeastPages=4 # flushConsumeQueueLeastPages=2 # flushCommitLogThoroughInterval=10000 # flushConsumeQueueThoroughInterval=60000 ​ # Broker 的角色 # - ASYNC_MASTER 异步复制Master # - SYNC_MASTER 同步双写Master # - SLAVE brokerRole=ASYNC_MASTER ​ # 刷盘方式 # - ASYNC_FLUSH 异步刷盘 # - SYNC_FLUSH 同步刷盘 flushDiskType=ASYNC_FLUSH ​ # 发消息线程池数量 # sendMessageThreadPoolNums=128 # 拉消息线程池数量 # pullMessageThreadPoolNums=128 # 消息重试16次分别间隔 messageDelayLevel =1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h # 消息轨迹 traceTopicEnable=true msgTraceTopicName=RMQ_SYS_TRACE_TOPIC # 最大磁盘比率 diskMaxUsedSpaceRatio=99","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/RocketMQ/RocketMQ-broker-config.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"RocketMQ Broker 配置详解"}],["meta",{"property":"og:description","content":"RocketMQ Broker 配置详解 这里记录了Broker配置文件各种配置及其注释，记录起来方便使用时参考。 # Licensed to the Apache Software Foundation (ASF) under one or more # contributor license agreements. See the NOTICE file distributed with # this work for additional information regarding copyright ownership. # The ASF licenses this file to You under the Apache License, Version 2.0 # (the \\"License\\"); you may not use this file except in compliance with # the License. You may obtain a copy of the License at # # http://www.apache.org/licenses/LICENSE-2.0 # # Unless required by applicable law or agreed to in writing, software # distributed under the License is distributed on an \\"AS IS\\" BASIS, # WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. # See the License for the specific language governing permissions and # limitations under the License. ​ ​ # 所属集群名字 brokerClusterName=DefaultCluster ​ # broker 名字，注意此处不同的配置文件填写的不一样，如果在 broker-a.properties 使用: broker-a, # 在 broker-b.properties 使用: broker-b brokerName=broker-a ​ # 0 表示 Master，&gt; 0 表示 Slave brokerId=0 ​ # nameServer地址，分号分割 # namesrvAddr=rocketmq-nameserver1:9876;rocketmq-nameserver2:9876 ​ # 启动IP,如果 docker 报 com.alibaba.rocketmq.remoting.exception.RemotingConnectException: connect to &lt;192.168.0.120:10909&gt; failed # 解决方式1 加上一句 producer.setVipChannelEnabled(false);，解决方式2 brokerIP1 设置宿主机IP，不要使用docker 内部IP brokerIP1=192.168.200.129 ​ # 在发送消息时，自动创建服务器不存在的topic，默认创建的队列数 defaultTopicQueueNums=4 ​ # 是否允许 Broker 自动创建 Topic，建议线下开启，线上关闭 autoCreateTopicEnable=true ​ # 是否允许 Broker 自动创建订阅组，建议线下开启，线上关闭 autoCreateSubscriptionGroup=true ​ # Broker 对外服务的监听端口 listenPort=10911 ​ # 删除文件时间点，默认凌晨4点 deleteWhen=04 ​ # 文件保留时间，默认48小时 fileReservedTime=120 ​ # commitLog 每个文件的大小默认1G mapedFileSizeCommitLog=1073741824 ​ # ConsumeQueue 每个文件默认存 30W 条，根据业务情况调整 mapedFileSizeConsumeQueue=300000 ​ # destroyMapedFileIntervalForcibly=120000 # redeleteHangedFileInterval=120000 # 检测物理文件磁盘空间 diskMaxUsedSpaceRatio=88 # 存储路径 # storePathRootDir=/home/ztztdata/rocketmq-all-4.1.0-incubating/store # commitLog 存储路径 # storePathCommitLog=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/commitlog # 消费队列存储 # storePathConsumeQueue=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/consumequeue # 消息索引存储路径 # storePathIndex=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/index # checkpoint 文件存储路径 # storeCheckpoint=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/checkpoint # abort 文件存储路径 # abortFile=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/abort # 限制的消息大小 maxMessageSize=65536 ​ # flushCommitLogLeastPages=4 # flushConsumeQueueLeastPages=2 # flushCommitLogThoroughInterval=10000 # flushConsumeQueueThoroughInterval=60000 ​ # Broker 的角色 # - ASYNC_MASTER 异步复制Master # - SYNC_MASTER 同步双写Master # - SLAVE brokerRole=ASYNC_MASTER ​ # 刷盘方式 # - ASYNC_FLUSH 异步刷盘 # - SYNC_FLUSH 同步刷盘 flushDiskType=ASYNC_FLUSH ​ # 发消息线程池数量 # sendMessageThreadPoolNums=128 # 拉消息线程池数量 # pullMessageThreadPoolNums=128 # 消息重试16次分别间隔 messageDelayLevel =1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h # 消息轨迹 traceTopicEnable=true msgTraceTopicName=RMQ_SYS_TRACE_TOPIC # 最大磁盘比率 diskMaxUsedSpaceRatio=99"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-11T06:12:31.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:tag","content":"Broker"}],["meta",{"property":"article:modified_time","content":"2023-05-11T06:12:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"RocketMQ Broker 配置详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-11T06:12:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"问题","slug":"问题","link":"#问题","children":[]}],"git":{"createdTime":1677926974000,"updatedTime":1683785551000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1},{"name":"wuyingbin","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":2.42,"words":727},"filePathRelative":"writings/RocketMQ/RocketMQ-broker-config.md","localizedDate":"2023年3月4日","excerpt":"<h1> RocketMQ Broker 配置详解</h1>\\n<p>这里记录了Broker配置文件各种配置及其注释，记录起来方便使用时参考。</p>\\n<div class=\\"language-text line-numbers-mode\\" data-ext=\\"text\\"><pre class=\\"language-text\\"><code># Licensed to the Apache Software Foundation (ASF) under one or more\\n# contributor license agreements.  See the NOTICE file distributed with\\n# this work for additional information regarding copyright ownership.\\n# The ASF licenses this file to You under the Apache License, Version 2.0\\n# (the \\"License\\"); you may not use this file except in compliance with\\n# the License.  You may obtain a copy of the License at\\n#\\n#     http://www.apache.org/licenses/LICENSE-2.0\\n#\\n#  Unless required by applicable law or agreed to in writing, software\\n#  distributed under the License is distributed on an \\"AS IS\\" BASIS,\\n#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\\n#  See the License for the specific language governing permissions and\\n#  limitations under the License.\\n​\\n​\\n# 所属集群名字\\nbrokerClusterName=DefaultCluster\\n​\\n# broker 名字，注意此处不同的配置文件填写的不一样，如果在 broker-a.properties 使用: broker-a,\\n# 在 broker-b.properties 使用: broker-b\\nbrokerName=broker-a\\n​\\n# 0 表示 Master，&gt; 0 表示 Slave\\nbrokerId=0\\n​\\n# nameServer地址，分号分割\\n# namesrvAddr=rocketmq-nameserver1:9876;rocketmq-nameserver2:9876\\n​\\n# 启动IP,如果 docker 报 com.alibaba.rocketmq.remoting.exception.RemotingConnectException: connect to &lt;192.168.0.120:10909&gt; failed\\n# 解决方式1 加上一句 producer.setVipChannelEnabled(false);，解决方式2 brokerIP1 设置宿主机IP，不要使用docker 内部IP\\nbrokerIP1=192.168.200.129\\n​\\n# 在发送消息时，自动创建服务器不存在的topic，默认创建的队列数\\ndefaultTopicQueueNums=4\\n​\\n# 是否允许 Broker 自动创建 Topic，建议线下开启，线上关闭 \\nautoCreateTopicEnable=true\\n​\\n# 是否允许 Broker 自动创建订阅组，建议线下开启，线上关闭\\nautoCreateSubscriptionGroup=true\\n​\\n# Broker 对外服务的监听端口\\nlistenPort=10911\\n​\\n# 删除文件时间点，默认凌晨4点\\ndeleteWhen=04\\n​\\n# 文件保留时间，默认48小时\\nfileReservedTime=120\\n​\\n# commitLog 每个文件的大小默认1G\\nmapedFileSizeCommitLog=1073741824\\n​\\n# ConsumeQueue 每个文件默认存 30W 条，根据业务情况调整\\nmapedFileSizeConsumeQueue=300000\\n​\\n# destroyMapedFileIntervalForcibly=120000\\n# redeleteHangedFileInterval=120000\\n# 检测物理文件磁盘空间\\ndiskMaxUsedSpaceRatio=88\\n# 存储路径\\n# storePathRootDir=/home/ztztdata/rocketmq-all-4.1.0-incubating/store\\n# commitLog 存储路径\\n# storePathCommitLog=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/commitlog\\n# 消费队列存储\\n# storePathConsumeQueue=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/consumequeue\\n# 消息索引存储路径\\n# storePathIndex=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/index\\n# checkpoint 文件存储路径\\n# storeCheckpoint=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/checkpoint\\n# abort 文件存储路径\\n# abortFile=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/abort\\n# 限制的消息大小\\nmaxMessageSize=65536\\n​\\n# flushCommitLogLeastPages=4\\n# flushConsumeQueueLeastPages=2\\n# flushCommitLogThoroughInterval=10000\\n# flushConsumeQueueThoroughInterval=60000\\n​\\n# Broker 的角色\\n# - ASYNC_MASTER 异步复制Master\\n# - SYNC_MASTER 同步双写Master\\n# - SLAVE\\nbrokerRole=ASYNC_MASTER\\n​\\n# 刷盘方式\\n# - ASYNC_FLUSH 异步刷盘\\n# - SYNC_FLUSH 同步刷盘\\nflushDiskType=ASYNC_FLUSH\\n​\\n# 发消息线程池数量\\n# sendMessageThreadPoolNums=128\\n# 拉消息线程池数量\\n# pullMessageThreadPoolNums=128\\n\\n# 消息重试16次分别间隔\\nmessageDelayLevel =1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h\\n\\n# 消息轨迹\\ntraceTopicEnable=true\\nmsgTraceTopicName=RMQ_SYS_TRACE_TOPIC\\n\\n# 最大磁盘比率\\ndiskMaxUsedSpaceRatio=99\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{"author":"gelald","license":"MIT Licensed"},"autoDesc":true}');export{e as data};