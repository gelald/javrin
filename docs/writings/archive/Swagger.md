# Swagger常用注解

- @Api: 用在控制器类上，表示对类的说明
    - tags: 说明该类的作用，可以在UI界面上看到的说明信息的一个注解

- @ApiOperation: 用在请求的方法上，说明方法的用途、作用
    - value: 说明方法的用途、作用
    - note: 辅助说明，更详细的描述

- @ApiImplicitParams: 用在请求的方法上，表示一组参数说明
    - @ApiImplicityParam: 详细概括参数的各个方面
        - name: 方法参数名
        - value: 参数意义
        - required: 是否必须传
        - paramType: 参数放在的地方
            - header: 从@RequestHeader获取
            - query: 从@RequestParam获取
            - path: 从@PathVariable获取
        - dataType: 参数类型，默认String
        - defaultValue: 默认值

- @ApiResponses: 用在请求的方法商，表示一组响应说明
    - @ApiResponse: 表达一个错误的响应信息
        - code: 错误状态码
        - message: 错误消息
        - reponse: 抛出的异常类

- @ApiModel: 用在响应类(POJO实体类)上，描述POJO类请求或响应的实体说明，这种一般用在post接口的时候，使用@RequestBody接收JSON格式的数据的场景，请求参数无法使用@ApiImplicitParam注解进行描述的时候
    - @ApiModelProperty: 描述类的属性
        - value: 属性的描述
        - dataType: 属性类型
        - name: 属性名
        - example: 示例

- @ApiIgnore: 生成文档时忽略这个接口