# RocketMQ 原理分析

## RocketMQ 高可用机制

### 集群部署模式
- 多master模式：可以创建跨越多个broker的Topic，如果一个Topic有8个队列

### 刷盘与主从同步