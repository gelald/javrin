### 核心组件

- nameserver：无状态的注册中心，功能用来保存broker的相关的元信息并提供给producer在发送消息过程中和提供给consumer消费消息过程中查找broker信息
- broker：消息存储中心，用来存储消息并通过nameserver对外提供服务
- producer：消息生产者，通过nameserver获取broker的地址并发送消息
- customer：消息消费者，通过nameserver获取broker的地址并消费消息