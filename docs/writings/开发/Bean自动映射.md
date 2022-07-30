# Bean 自动映射

## 前言

在 Java 工程开发过程中，经常会伴随着各个层的对象转换的工作，比如 `VO` 、`DTO` 、`BO` 等等，如果全都使用手动的 `get` 、`set` 方法，可以是可以，但是会浪费时间，而且实体属性有变动的话也是牵一发而动全身，还有可能出错，所以选择一个**自动化转换工具**显得尤为重要

常用的对象转换手段

- 手动 `get` 、`set` 方法：直接，但是比较麻烦
- `json2Json`
- `Apache BeanUtils` ：反射
- `Spring BeanUtils` ：反射，但是效率比 `Apache` 的高
- `bean-mapping` ：属性拷贝
- `bean-mapping-asm` ：字节码增强
- `BeanCopier` ：通过 `Cglib` 生成 `get`、`set`
- `Orika` ：字节码增强
- `Dozer` ：属性映射
- `ModelMapper` ：基于字节码框架 ASM 实现
- `JMapper` ：映射
- `MapStruct` ：直接在编译期生成对应的 `get`、`set` 方法

## 实现

定义两个实体

```java
public class UserVO {

    /**
     * 自增ID
     */
    private Long id;

    /**
     * 用户ID
     */
    private String userId;

    /**
     * 用户昵称
     */
    private String userNickName;

    /**
     * 注册时间
     */
    private Date createTime;

    // 省略get set方法和构造方法

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("");
        sb.append("").append(userId);
        sb.append("|").append(userNickName);
        sb.append("|").append(createTime);
        return sb.toString();
    }

}
```

```java
public class UserDTO {

    /**
     * 用户ID
     */
    private String userId;

    /**
     * 用户昵称
     */
    private String userNickName;

    /**
     * 注册时间
     */
    private Date createTime;

    // 省略get set方法和构造方法

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("");
        sb.append("").append(userId);
        sb.append("|").append(userNickName);
        sb.append("|").append(createTime);
        return sb.toString();
    }
    
}
```



定义一个对象转换的接口

```java
public interface IAssembler<SOURCE, TARGET> {

    TARGET sourceToTarget(SOURCE var);

}
```



### get/set

```java
@Component
public class GetSetAssembler implements IAssembler<UserVO, UserDTO> {

    @Override
    public UserDTO sourceToTarget(UserVO var) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(var.getUserId());
        userDTO.setUserNickName(var.getUserNickName());
        userDTO.setCreateTime(var.getCreateTime());
        return userDTO;
    }

}
```

推荐：★★★☆☆

性能：★★★★★

手段：手写

总结：这种方式在日常开发中使用得最多，性能自然是最好的，就是操作起来会比较麻烦，尤其在有大量对象转换的时候



### json2Json

```java
import com.alibaba.fastjson.JSON;

@Component
public class Json2JsonAssembler implements IAssembler<UserVO, UserDTO> {

    @Override
    public UserDTO sourceToTarget(UserVO var) {
        String strJson = JSON.toJSONString(var);
        return JSON.parseObject(strJson, UserDTO.class);
    }

}
```

推荐：☆☆☆☆☆

性能：★☆☆☆☆

手段：把对象序列化成 JSON 字符串，再把 JSON 字符串反序列化为对象

总结：使用 JSON 的形式会导致性能低下



### Apache BeanUtils

```java
import org.apache.commons.beanutils.BeanUtils;

@Component
public class ApacheCopyPropertiesAssembler implements IAssembler<UserVO, UserDTO> {

    @Override
    public UserDTO sourceToTarget(UserVO var) {
        UserDTO userDTO = new UserDTO();
        try {
            BeanUtils.copyProperties(userDTO, var);
        } catch (IllegalAccessException | InvocationTargetException e) {
            e.printStackTrace();
        }
        return userDTO;
    }

}
```

推荐：☆☆☆☆☆

性能：★☆☆☆☆

手段：使用 Java 的 Introspector 机制获取类的属性进行赋值

总结：虽然使用的是比反射性能要好的 Introspect 机制，但是这个库兼容性较差，不建议使用



### Spring BeanUtils

```java
import org.springframework.beans.BeanUtils;

@Component
public class SpringCopyPropertiesAssembler implements IAssembler<UserVO, UserDTO> {

    @Override
    public UserDTO sourceToTarget(UserVO var) {
        UserDTO userDTO = new UserDTO();
        BeanUtils.copyProperties(var, userDTO);
        return userDTO;
    }

}
```

推荐：★★★☆☆

性能：★★★★☆

手段：使用 Java 的 Introspector 机制获取类的属性进行赋值

总结：同样是属性拷贝，Spring 提供要比 Apache 好用的多，只要你不用错，基本不会有啥问题



### Bean Mapping

```java
import com.github.houbb.bean.mapping.core.util.BeanUtil;

@Component
public class BeanMappingAssembler implements IAssembler<UserVO, UserDTO> {

    @Override
    public UserDTO sourceToTarget(UserVO var) {
        UserDTO userDTO = new UserDTO();
        BeanUtil.copyProperties(var, userDTO);
        return userDTO;
    }

}
```

推荐：★★☆☆☆

性能：★★★☆☆

手段：属性拷贝

总结：性能一般



### Bean Mapping ASM

```java
import com.github.houbb.bean.mapping.asm.util.AsmBeanUtil;

@Component
public class BeanMappingASMAssembler implements IAssembler<UserVO, UserDTO> {

    @Override
    public UserDTO sourceToTarget(UserVO var) {
        UserDTO userDTO = new UserDTO();
        AsmBeanUtil.copyProperties(var, userDTO);
        return userDTO;
    }

}
```

推荐：★★★☆☆

性能：★★★★☆

手段：基于 ASM 字节码实现

总结：与普通的 Bean Mapping 框架相比，性能有所提升



### BeanCopier

```java
import org.springframework.cglib.beans.BeanCopier;

@Component
public class BeanCopierAssembler implements IAssembler<UserVO, UserDTO> {

    @Override
    public UserDTO sourceToTarget(UserVO var) {
        UserDTO userDTO = new UserDTO();
        BeanCopier beanCopier = BeanCopier.create(var.getClass(), userDTO.getClass(), false);
        beanCopier.copy(var, userDTO, null);
        return userDTO;
    }

}
```

推荐：★★★☆☆

性能：★★★★☆

手段：基于 CGlib 字节码操作生成get、set方法

总结：整体性能不错，使用起来也不复杂



### Orika

```java
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.DefaultMapperFactory;

@Component
public class OrikaAssembler implements IAssembler<UserVO, UserDTO> {

    /**
     * 构造一个MapperFactory
     */
    private static final MapperFactory mapperFactory = new DefaultMapperFactory.Builder().build();

    static {
        mapperFactory.classMap(UserDTO.class, UserVO.class)
                .field("userId", "userId")  // 字段不一致时可以指定
                .byDefault()
                .register();
    }

    @Override
    public UserDTO sourceToTarget(UserVO var) {
        return mapperFactory.getMapperFacade().map(var, UserDTO.class);
    }

}
```

推荐：★★☆☆☆

性能：★★★☆☆

手段：基于字节码生成映射对象

总结：性能一般，可以把 MapperFactory 优化成Bean对象



### Dozer

```java
import org.dozer.DozerBeanMapper;

@Component
public class DozerAssembler implements IAssembler<UserVO, UserDTO> {

    private static final DozerBeanMapper mapper = new DozerBeanMapper();

    @Override
    public UserDTO sourceToTarget(UserVO var) {
        return mapper.map(var, UserDTO.class);
    }

}
```

推荐：★☆☆☆☆

性能：★★☆☆☆

手段：属性映射框架，递归的方式复制对象

总结：性能较差，不建议使用



### ModelMapper

```java
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;

@Component
public class ModelMapperAssembler implements IAssembler<UserVO, UserDTO> {

    private static final ModelMapper modelMapper = new ModelMapper();

    static {
        modelMapper.addMappings(new PropertyMap<UserVO, UserDTO>() {
            @Override
            protected void configure() {
                // 属性值不一样可以自己操作
                map().setUserId(source.getUserId());
            }
        });
    }

    @Override
    public UserDTO sourceToTarget(UserVO var) {
        return modelMapper.map(var, UserDTO.class);
    }

}
```

推荐：★★★☆☆

性能：★★★☆☆

手段：基于 ASM 字节码实现

总结：转换对象数量较少时性能不错，如果同时转换大批对象性能有所下降



### JMapper

```java
import com.googlecode.jmapper.JMapper;
import com.googlecode.jmapper.api.JMapperAPI;

@Component
public class JMapperAssembler implements IAssembler<UserVO, UserDTO> {

    @Override
    public UserDTO sourceToTarget(UserVO var) {
        JMapper<UserDTO, UserVO> jMapper = new JMapper<>(UserDTO.class, UserVO.class, new JMapperAPI()
                .add(JMapperAPI.mappedClass(UserDTO.class)
                        .add(JMapperAPI.attribute("userId")
                                .value("userId"))
                        .add(JMapperAPI.attribute("userNickName")
                                .value("userNickName"))
                        .add(JMapperAPI.attribute("createTime")
                                .value("createTime"))
                ));
        return jMapper.getDestination(var);
    }

}
```

推荐：★★★★☆

性能：★★★★★

手段：Elegance, high performance and robustness all in one java bean mapper. (一个优雅、高性能和健壮的 java bean 映射器)

总结：性能不错，但是与 SpringBoot 的结合有点麻烦



### MapStruct

对象映射接口

```java
import org.mapstruct.InheritConfiguration;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.MapperConfig;
import org.mapstruct.Mapping;

@MapperConfig
public interface IMapping<SOURCE, TARGET>{

    /**
     * 映射同名属性
     */
    @Mapping(target = "createTime", dateFormat = "yyyy-MM-dd HH:mm:ss")
    TARGET sourceToTarget(SOURCE var1);

    /**
     * 反向，映射同名属性
     */
    @InheritInverseConfiguration(name = "sourceToTarget")
    SOURCE targetToSource(TARGET var1);

    /**
     * 映射同名属性，集合形式
     */
    @InheritConfiguration(name = "sourceToTarget")
    List<TARGET> sourceToTarget(List<SOURCE> var1);

    /**
     * 反向，映射同名属性，集合形式
     */
    @InheritConfiguration(name = "targetToSource")
    List<SOURCE> targetToSource(List<TARGET> var1);

    /**
     * 映射同名属性，集合流形式
     */
    List<TARGET> sourceToTarget(Stream<SOURCE> stream);

    /**
     * 反向，映射同名属性，集合流形式
     */
    List<SOURCE> targetToSource(Stream<TARGET> stream);

}
```

UserDTO 和 UserVO 的转换接口

```java
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Component
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface UserDTOMapping extends IMapping<UserVO, UserDTO> {

    @Mapping(target = "userId", source = "userId")
    @Mapping(target = "createTime", dateFormat = "yyyy-MM-dd HH:mm:ss")
    @Override
    UserDTO sourceToTarget(UserVO var1);

    @Mapping(target = "userId", source = "userId")
    @Mapping(target = "createTime", dateFormat = "yyyy-MM-dd HH:mm:ss")
    @Override
    UserVO targetToSource(UserDTO var1);

}
```

应用层面

```java
@Component
public class MapStructAssembler implements IAssembler<UserVO, UserDTO> {

    private final IMapping<UserVO, UserDTO> userDTOMapping;

    public MapStructAssembler(IMapping<UserVO, UserDTO> userDTOMapping) {
        this.userDTOMapping = userDTOMapping;
    }

    @Override
    public UserDTO sourceToTarget(UserVO var) {
        return userDTOMapping.sourceToTarget(var);
    }

}
```

推荐：★★★★★

性能：★★★★★

手段：在编译期生成对应的 get 、set，和手写的方式一样，只不过是由组件生成

总结：性能非常高，与 SpringBoot 的结合也很方便



## 总结

对象转换的操作无非是基于反射、AOP、CGlib、ASM在编译器和运行期进行处理，更好的思路是在编译期生成 get 、set 方法

推荐使用 MapStruct 具有无可比拟的易用性和兼容性

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220114105422.png)

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220114105208.png)
