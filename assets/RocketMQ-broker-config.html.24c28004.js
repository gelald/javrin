import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";import{o as i,c as n,d as s}from"./app.e035fa12.js";const l={},d=s(`<h1 id="rocketmq-broker-\u914D\u7F6E\u8BE6\u89E3" tabindex="-1"><a class="header-anchor" href="#rocketmq-broker-\u914D\u7F6E\u8BE6\u89E3" aria-hidden="true">#</a> RocketMQ Broker \u914D\u7F6E\u8BE6\u89E3</h1><p>\u8FD9\u91CC\u8BB0\u5F55\u4E86Broker\u914D\u7F6E\u6587\u4EF6\u5404\u79CD\u914D\u7F6E\u53CA\u5176\u6CE8\u91CA\uFF0C\u8BB0\u5F55\u8D77\u6765\u65B9\u4FBF\u4F7F\u7528\u65F6\u53C2\u8003\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code># Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the &quot;License&quot;); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.
\u200B
\u200B
# \u6240\u5C5E\u96C6\u7FA4\u540D\u5B57
brokerClusterName=DefaultCluster
\u200B
# broker \u540D\u5B57\uFF0C\u6CE8\u610F\u6B64\u5904\u4E0D\u540C\u7684\u914D\u7F6E\u6587\u4EF6\u586B\u5199\u7684\u4E0D\u4E00\u6837\uFF0C\u5982\u679C\u5728 broker-a.properties \u4F7F\u7528: broker-a,
# \u5728 broker-b.properties \u4F7F\u7528: broker-b
brokerName=broker-a
\u200B
# 0 \u8868\u793A Master\uFF0C&gt; 0 \u8868\u793A Slave
brokerId=0
\u200B
# nameServer\u5730\u5740\uFF0C\u5206\u53F7\u5206\u5272
# namesrvAddr=rocketmq-nameserver1:9876;rocketmq-nameserver2:9876
\u200B
# \u542F\u52A8IP,\u5982\u679C docker \u62A5 com.alibaba.rocketmq.remoting.exception.RemotingConnectException: connect to &lt;192.168.0.120:10909&gt; failed
# \u89E3\u51B3\u65B9\u5F0F1 \u52A0\u4E0A\u4E00\u53E5 producer.setVipChannelEnabled(false);\uFF0C\u89E3\u51B3\u65B9\u5F0F2 brokerIP1 \u8BBE\u7F6E\u5BBF\u4E3B\u673AIP\uFF0C\u4E0D\u8981\u4F7F\u7528docker \u5185\u90E8IP
brokerIP1=192.168.200.129
\u200B
# \u5728\u53D1\u9001\u6D88\u606F\u65F6\uFF0C\u81EA\u52A8\u521B\u5EFA\u670D\u52A1\u5668\u4E0D\u5B58\u5728\u7684topic\uFF0C\u9ED8\u8BA4\u521B\u5EFA\u7684\u961F\u5217\u6570
defaultTopicQueueNums=4
\u200B
# \u662F\u5426\u5141\u8BB8 Broker \u81EA\u52A8\u521B\u5EFA Topic\uFF0C\u5EFA\u8BAE\u7EBF\u4E0B\u5F00\u542F\uFF0C\u7EBF\u4E0A\u5173\u95ED 
autoCreateTopicEnable=true
\u200B
# \u662F\u5426\u5141\u8BB8 Broker \u81EA\u52A8\u521B\u5EFA\u8BA2\u9605\u7EC4\uFF0C\u5EFA\u8BAE\u7EBF\u4E0B\u5F00\u542F\uFF0C\u7EBF\u4E0A\u5173\u95ED
autoCreateSubscriptionGroup=true
\u200B
# Broker \u5BF9\u5916\u670D\u52A1\u7684\u76D1\u542C\u7AEF\u53E3
listenPort=10911
\u200B
# \u5220\u9664\u6587\u4EF6\u65F6\u95F4\u70B9\uFF0C\u9ED8\u8BA4\u51CC\u66684\u70B9
deleteWhen=04
\u200B
# \u6587\u4EF6\u4FDD\u7559\u65F6\u95F4\uFF0C\u9ED8\u8BA448\u5C0F\u65F6
fileReservedTime=120
\u200B
# commitLog \u6BCF\u4E2A\u6587\u4EF6\u7684\u5927\u5C0F\u9ED8\u8BA41G
mapedFileSizeCommitLog=1073741824
\u200B
# ConsumeQueue \u6BCF\u4E2A\u6587\u4EF6\u9ED8\u8BA4\u5B58 30W \u6761\uFF0C\u6839\u636E\u4E1A\u52A1\u60C5\u51B5\u8C03\u6574
mapedFileSizeConsumeQueue=300000
\u200B
# destroyMapedFileIntervalForcibly=120000
# redeleteHangedFileInterval=120000
# \u68C0\u6D4B\u7269\u7406\u6587\u4EF6\u78C1\u76D8\u7A7A\u95F4
diskMaxUsedSpaceRatio=88
# \u5B58\u50A8\u8DEF\u5F84
# storePathRootDir=/home/ztztdata/rocketmq-all-4.1.0-incubating/store
# commitLog \u5B58\u50A8\u8DEF\u5F84
# storePathCommitLog=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/commitlog
# \u6D88\u8D39\u961F\u5217\u5B58\u50A8
# storePathConsumeQueue=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/consumequeue
# \u6D88\u606F\u7D22\u5F15\u5B58\u50A8\u8DEF\u5F84
# storePathIndex=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/index
# checkpoint \u6587\u4EF6\u5B58\u50A8\u8DEF\u5F84
# storeCheckpoint=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/checkpoint
# abort \u6587\u4EF6\u5B58\u50A8\u8DEF\u5F84
# abortFile=/home/ztztdata/rocketmq-all-4.1.0-incubating/store/abort
# \u9650\u5236\u7684\u6D88\u606F\u5927\u5C0F
maxMessageSize=65536
\u200B
# flushCommitLogLeastPages=4
# flushConsumeQueueLeastPages=2
# flushCommitLogThoroughInterval=10000
# flushConsumeQueueThoroughInterval=60000
\u200B
# Broker \u7684\u89D2\u8272
# - ASYNC_MASTER \u5F02\u6B65\u590D\u5236Master
# - SYNC_MASTER \u540C\u6B65\u53CC\u5199Master
# - SLAVE
brokerRole=ASYNC_MASTER
\u200B
# \u5237\u76D8\u65B9\u5F0F
# - ASYNC_FLUSH \u5F02\u6B65\u5237\u76D8
# - SYNC_FLUSH \u540C\u6B65\u5237\u76D8
flushDiskType=ASYNC_FLUSH
\u200B
# \u53D1\u6D88\u606F\u7EBF\u7A0B\u6C60\u6570\u91CF
# sendMessageThreadPoolNums=128
# \u62C9\u6D88\u606F\u7EBF\u7A0B\u6C60\u6570\u91CF
# pullMessageThreadPoolNums=128

# \u6D88\u606F\u91CD\u8BD516\u6B21\u5206\u522B\u95F4\u9694
messageDelayLevel =1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h

# \u6D88\u606F\u8F68\u8FF9
traceTopicEnable=true
msgTraceTopicName=RMQ_SYS_TRACE_TOPIC

# \u6700\u5927\u78C1\u76D8\u6BD4\u7387
diskMaxUsedSpaceRatio=99
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u95EE\u9898" aria-hidden="true">#</a> \u95EE\u9898</h2><p><code>com.alibaba.rocketmq.client.exception.MQBrokerException: CODE: 14 DESC: service not available now, maybe disk full, CL: 0.87 CQ: 0.87 INDEX: 0.87, maybe your broker machine memory too small.</code></p><p>\u670D\u52A1\u5668\u78C1\u76D8\u7A7A\u95F4\u4E0D\u8DB3\uFF0C\u9ED8\u8BA4\u4F7F\u7528\u8D85\u8FC7 75% \u7684\u78C1\u76D8\u7A7A\u95F4\u4F1A\u62A5\u6B64\u9519\u8BEF\uFF0C\u9700\u8981\u8C03\u6574\u6BCF\u4E00\u4E2A broker \u7684\u914D\u7F6E\u53C2\u6570</p><p>\u52A0\u4E0A\u8FD9\u4E00\u884C\uFF1A<code>diskMaxUsedSpaceRatio=99</code> \u53EA\u6709\u4F7F\u7528\u8D85\u8FC7 99% \u7684\u78C1\u76D8\u7A7A\u95F4\u624D\u62A5\u9519</p><p>\u4FDD\u5B58\u540E\u91CD\u542F\u5404\u4E2A broker</p>`,8),r=[d];function a(v,c){return i(),n("div",null,r)}var t=e(l,[["render",a],["__file","RocketMQ-broker-config.html.vue"]]);export{t as default};
