# UUID

**UUID** (Universally Unique Identifier)，通用唯一识别码

## 组成部分

1. 当前日期和时间，UUID的第一个部分与时间有关，如果你在生成一个UUID之后，过几秒又生成一个UUID，则第一个部分不同，其余相同。
2. 计数器，时钟序列
3. 全局唯一的IEEE机器识别号，如果有网卡，从网卡**MAC地址**获得，没有网卡以其他方式获得。

## 格式

UUID 是由一组**32位**数的**16进制数字**所构成，以连字号分隔的五组来显示，形式为 8-4-4-4-12，总共有 36个字符（即三十二个英数字母和四个连字号）

```
aefbbd3a-9cc5-4655-8363-a2a43e6e6c80
xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
```

## 版本

数字`M`表示UUID版本，当前规范有5个版本，可选值为：`1，2，3，4，5`，不同版本使用不同算法，适用不同场景

### Version1 

通过计算当前时间戳、随机数和MAC地址得到。由于在算法中使用了MAC地址，这个版本的UUID**可以保证在全球范围的唯一性**。但是使用MAC地址会带来安全性问题。同时，这个版本的UUID**没考虑过一台机器上起了两个进程这类的问题**，也没考虑相同时间戳的并发问题，所以严格的Version1没人实现，Version1的变种有Hibernate的CustomVersionOneStrategy.java、MongoDB的ObjectId.java、Twitter的snowflake等。

### Version2

DCE（Distributed Computing Environment）安全的UUID和Version1算法相同，但会把时间戳的前4位置换为POSIX的UID或GID。这个版本的UUID在**实际中较少用到**。

### Version3 

通过计算名字和名字空间的MD5散列值得到。这个版本的UUID保证了**相同名字空间中不同名字生成的UUID的唯一性**；**不同名字空间中的UUID的唯一性**；**相同名字空间中相同名字的UUID重复生成是相同的**。

### Version4

根据随机数，或者伪**随机数生成**UUID，128bit中，除去版本确定的4bit和variant确定的2bit，其它122bit全部由(伪)随机数信息确定

### Version5

和Version3的UUID算法类似，只是散列值计算使用**SHA1**（Secure Hash Algorithm 1，安全Hash算法）算法

## 优点

- 代码简单，使用方便
- 本地生成，没有网络消耗，基本没有性能问题
- 全球唯一，**在遇见数据迁移，系统数据合并，或者数据库变更等情况下，可以从容应对**

## 缺点

- 采用无意义字符串，没有排序，无法保证趋势递增
- UUID使用字符串形式存储，数据量大时查询效率比较低（和数字相比）
- 存储空间比较大，如果是海量数据库，就需要考虑存储量的问题\

## UUID Java实现

```java
/**
 * Static factory to retrieve a type 4 (pseudo randomly generated) UUID.
 * 使用静态工厂来获取版本4（伪随机数生成器）的 UUID
 * The {@code UUID} is generated using a cryptographically strong pseudo random number generator.
 * 这个UUID生成使用了强加密的伪随机数生成器(PRNG)
 *
 * @return  A randomly generated {@code UUID}
 */
public static UUID randomUUID() {
    SecureRandom ng = Holder.numberGenerator;

    byte[] randomBytes = new byte[16];
    ng.nextBytes(randomBytes);
    randomBytes[6]  &= 0x0f;  /* clear version        */
    randomBytes[6]  |= 0x40;  /* set to version 4     */
    randomBytes[8]  &= 0x3f;  /* clear variant        */
    randomBytes[8]  |= 0x80;  /* set to IETF variant  */
    return new UUID(randomBytes);
}

/**
 * Static factory to retrieve a type 3 (name based) {@code UUID} based on
 * the specified byte array.
 * 静态工厂对版本3的实现，对于给定的字符串（name）总能生成相同的UUID
 * @param  name
 *         A byte array to be used to construct a {@code UUID}
 *
 * @return  A {@code UUID} generated from the specified array
 */
public static UUID nameUUIDFromBytes(byte[] name) {
    MessageDigest md;
    try {
        md = MessageDigest.getInstance("MD5");
    } catch (NoSuchAlgorithmException nsae) {
        throw new InternalError("MD5 not supported", nsae);
    }
    byte[] md5Bytes = md.digest(name);
    md5Bytes[6]  &= 0x0f;  /* clear version        */
    md5Bytes[6]  |= 0x30;  /* set to version 3     */
    md5Bytes[8]  &= 0x3f;  /* clear variant        */
    md5Bytes[8]  |= 0x80;  /* set to IETF variant  */
    return new UUID(md5Bytes);
}
```



# Snowflake

SnowFlake 算法，是 Twitter 开源的分布式 id 生成算法。其核心思想就是：使用一个 64位的 long 型的**数字**作为全局唯一id。在分布式系统中的应用十分广泛，且id引入了时间戳，**基本上保持自增的**。

## 格式

![](https://gitee.com/ngyb/pic/raw/master/813155-20200511162334239-459232117.png)

- 1bit 首位无效符
- 41bit 时间戳（毫秒级），41位可以表示2^41 -1个数字，2^41-1毫秒，换算后是69年
- 10 bit 工作机器id
  - 5bit datacenterId机房id
  - 5bit workerId机器id
- 12bit 序列号，用来记录同一个datacenterId中某一个机器上同毫秒内产生的不同id

## 特点

- 时间位：可以根据时间进行排序，有助于提高查询速度
- 机器id位：适用于分布式环境下对多节点的各个节点进行标识，可以具体根据节点数和部署情况设计划分机器位10位长度，如划分5位表示进程位等
- 序列号位：是一系列的自增id，可以支持同一节点同一毫秒生成多个ID序号，12位的计数序列号支持每个节点每毫秒产生4096个ID序号
- 可以**根据项目情况以及自身需要进行一定的修改**

## 优点

- 毫秒数在高位，自增位在地位，**整个ID都是递增趋势**的
- 不依赖数据库等第三方系统，以服务的方式部署，稳定性更高，生成ID的性能也是非常高的
- 可以**根据自身业务特性分配bit位**，非常灵活

## 缺点

- 雪花算法在单机系统上id是递增的，但是在分布式系统多节点的情况下，所有节点的时钟并不能保证完全同步，所以有可能会出现不是全局递增的情况。如果系统时间被回调，或者改变，可能会造成id冲突或者重复。

# auto_increment

利用给字段设置auto_increment_increment和auto_increment_offset来保证ID自增

## 优点

- 利用现有数据库系统的功能实现，实现成本小
- id保证单调递增

## 缺点

- 强依赖数据库，当数据库异常时，整个系统不可用
- id发号性能瓶颈限制在单台MySQL的读写性能
- 分表分库，数据迁移合并等比较麻烦（id重复）

