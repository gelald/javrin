版本依赖关系

| Spring Cloud Version        | Spring Cloud Alibaba Version      | Spring Boot Version |
| --------------------------- | --------------------------------- | ------------------- |
| Spring Cloud Hoxton.SR8     | 2.2.5.RELEASE                     | 2.3.2.RELEASE       |
| Spring Cloud Greenwich.SR6  | 2.1.3.RELEASE                     | 2.1.13.RELEASE      |
| Spring Cloud Hoxton.SR3     | 2.2.1.RELEASE                     | 2.2.5.RELEASE       |
| Spring Cloud Hoxton.RELEASE | 2.2.0.RELEASE                     | 2.2.X.RELEASE       |
| Spring Cloud Greenwich      | 2.1.2.RELEASE                     | 2.1.X.RELEASE       |
| Spring Cloud Finchley       | 2.0.3.RELEASE                     | 2.0.X.RELEASE       |
| Spring Cloud Edgware        | 1.5.1.RELEASE(停止维护，建议升级) | 1.5.X.RELEASE       |

# Nacos

## 开发时遇见的问题

### Ignore The Empty Nacos Configuration And Get It Based On DataId警告



以order-server应用为例，当前`spring.profiles.active`属性为`dev`，nacos配置文件后缀为`yaml`，在nacos上新建了DataId为`order-server.yaml`的配置文件，在启动时控制台会输出以下警告日志

> Ignore the empty nacos configuration and get it based on dataId[order-server] & group[business-app]
>
> Ignore the empty nacos configuration and get it based on dataId[order-server-dev.yaml] & group[business-app]



当应用使用nacos作为配置中心时，应用启动时nacos配置文件客户端会轮询三个DataId

- ${spring.application.name}：order-server
- ${spring.application.name}.${spring.cloud.nacos.config.file-extension}：order-server.yaml
- ${spring.application.name}-${spring.profiles.active}.${spring.cloud.nacos.config.file-extension}：order-server-dev.yaml



所以说，这些警告日志都是正常的，因为只有一个配置文件的DataID符合上面轮询的条件，其他的不符合，单纯打印出来警告日志
