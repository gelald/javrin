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
- 存储空间比较大，如果是海量数据库，就需要考虑存储量的问题

## 应用场景

- 类似生成token令牌的场景
- 对Id没有趋势递增要求的场景

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

SnowFlake 算法，是 Twitter 开源的分布式 id 生成算法，能保证不同表的主键不重复，也能保证同一张表中的主键的有序性。其核心思想就是：使用一个 64位的 long 型的**数字**作为全局唯一id。在分布式系统中的应用十分广泛，且id引入了时间戳，**基本上保持自增的**。

## 格式

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/813155-20200511162334239-459232117.png)

- 1bit 首位为符号位，标识这个数是一个正数
- 41bit 时间戳（毫秒级），41位可以表示2^41 -1个数字，2^41-1毫秒，换算后是69年。一般不是存时间戳，而是存当前时间戳和设定的初始时间戳(一般是id生成器开始使用的时间)的差值，且一般不会完全用完41位，没用到的补0
- 10 bit 工作机器id
  - 5bit datacenterId机房id
  - 5bit workerId机器id
- 12bit 序列号，用来记录同一个datacenterId中某一个机器上同毫秒内产生的不同id，12位序列在**1毫秒内可以产生4096个Id序号**

## 特点

- 时间位：可以根据时间进行排序，有助于提高查询速度
- 机器id位：适用于分布式环境下对多节点的各个节点进行标识，可以具体根据节点数和部署情况设计划分机器位10位长度，如划分5位表示进程位等
- 序列号位：是一系列的自增id，可以支持同一节点同一毫秒生成多个ID序号，12位的计数序列号支持每个节点每毫秒产生4096个ID序号
- 可以**根据项目情况以及自身需要进行一定的修改**

## 优点

- 毫秒数在高位，自增位在低位，**整个ID都是递增趋势**的，在整个分布式系统中不会发生ID碰撞
- 不依赖数据库等第三方系统，可以以服务的方式部署，稳定性更高
- 生成ID的性能也是非常高的，每秒生成的ID数是百万级别的(409.6万个id)
- 可以**根据自身业务特性分配bit位**，非常灵活

## 缺点

- 雪花算法在单机系统上id是递增的，但是在分布式系统多节点的情况下，所有节点的时钟并不能保证完全同步，所以有可能会出现不是全局递增的情况。**如果系统时间被回调，或者改变，可能会造成id冲突或者重复**。

## Java实现Snowflake

```java
/**
 * Author: wuyb<br>
 * Date: 2021/3/30<br>
 * Twitter_Snowflake<br>
 * SnowFlake的结构如下(每部分用-分开):<br>
 * 0 - 0000000000 0000000000 0000000000 0000000000 0 - 00000 - 00000 - 000000000000 <br>
 * 1位标识，由于long基本类型在Java中是带符号的，最高位是符号位，正数是0，负数是1，所以id一般是正数，最高位是0<br>
 * 41位时间截(毫秒级)，注意，41位时间截不是存储当前时间的时间截，而是存储时间截的差值（当前时间截 - 开始时间截)
 * 得到的值），这里的的开始时间截，一般是我们的id生成器开始使用的时间，由我们程序来指定的（如下下面程序IdWorker类的startTime属性）。41位的时间截，可以使用69年，年T = (1L << 41) / (1000L * 60 * 60 * 24 * 365) = 69<br>
 * 10位的数据机器位，可以部署在1024个节点，包括5位datacenterId和5位workerId<br>
 * 12位序列，毫秒内的计数，12位的计数顺序号支持每个节点每毫秒(同一机器，同一时间截)产生4096个ID序号<br>
 * 加起来刚好64位，为一个Long型。<br>
 * SnowFlake的优点是，整体上按照时间自增排序，并且整个分布式系统内不会产生ID碰撞(由数据中心ID和机器ID作区分)，并且效率较高，经测试，SnowFlake每秒能够产生26万ID左右。
 */
public class SnowflakeIdWorker {


    // ==============================Fields===========================================
    /**
     * 开始时间截 (2015-01-01)
     */
    private final long twepoch = 1420041600000L;

    /**
     * 机器id所占的位数
     */
    private final long workerIdBits = 5L;

    /**
     * 数据标识id所占的位数
     */
    private final long datacenterIdBits = 5L;

    /**
     * 支持的最大机器id，结果是31 (这个移位算法可以很快的计算出几位二进制数所能表示的最大十进制数)
     */
    private final long maxWorkerId = -1L ^ (-1L << workerIdBits);

    /**
     * 支持的最大数据标识id，结果是31
     */
    private final long maxDatacenterId = -1L ^ (-1L << datacenterIdBits);

    /**
     * 序列在id中占的位数
     */
    private final long sequenceBits = 12L;

    /**
     * 机器ID向左移12位
     */
    private final long workerIdShift = sequenceBits;

    /**
     * 数据标识id向左移17位(12+5)
     */
    private final long datacenterIdShift = sequenceBits + workerIdBits;

    /**
     * 时间截向左移22位(5+5+12)
     */
    private final long timestampLeftShift = sequenceBits + workerIdBits + datacenterIdBits;

    /**
     * 生成序列的掩码，这里为4095 (0b111111111111=0xfff=4095)
     */
    private final long sequenceMask = -1L ^ (-1L << sequenceBits);

    /**
     * 工作机器ID(0~31)
     */
    private long workerId;

    /**
     * 数据中心ID(0~31)
     */
    private long datacenterId;

    /**
     * 毫秒内序列(0~4095)
     */
    private long sequence = 0L;

    /**
     * 上次生成ID的时间截
     */
    private long lastTimestamp = -1L;


    //==============================Constructors=====================================

    /**
     * 构造函数
     *
     * @param workerId     工作ID (0~31)
     * @param datacenterId 数据中心ID (0~31)
     */
    public SnowflakeIdWorker(long workerId, long datacenterId) {
        if (workerId > maxWorkerId || workerId < 0) {
            throw new IllegalArgumentException(String.format("worker Id can't be greater than %d or less than 0", maxWorkerId));
        }
        if (datacenterId > maxDatacenterId || datacenterId < 0) {
            throw new IllegalArgumentException(String.format("datacenter Id can't be greater than %d or less than 0", maxDatacenterId));
        }
        this.workerId = workerId;
        this.datacenterId = datacenterId;
    }


    // ==============================Methods==========================================

    /**
     * 获得下一个ID (该方法是线程安全的)
     *
     * @return SnowflakeId
     */
    public synchronized long nextId() {
        long timestamp = timeGen();

        //如果当前时间小于上一次ID生成的时间戳，说明系统时钟回退过这个时候应当抛出异常
        if (timestamp < lastTimestamp) {
            throw new RuntimeException(
                    String.format("Clock moved backwards.  Refusing to generate id for %d milliseconds", lastTimestamp - timestamp));
        }

        //如果是同一时间生成的，则进行毫秒内序列
        if (lastTimestamp == timestamp) {
            sequence = (sequence + 1) & sequenceMask;
            //毫秒内序列溢出
            if (sequence == 0) {
                //阻塞到下一个毫秒,获得新的时间戳
                timestamp = tilNextMillis(lastTimestamp);
            }
        }
        //时间戳改变，毫秒内序列重置
        else {
            sequence = 0L;
        }

        //上次生成ID的时间截
        lastTimestamp = timestamp;

        //移位并通过或运算拼到一起组成64位的ID
        return ((timestamp - twepoch) << timestampLeftShift) //
                | (datacenterId << datacenterIdShift) //
                | (workerId << workerIdShift) //
                | sequence;
    }

    /**
     * 阻塞到下一个毫秒，直到获得新的时间戳
     *
     * @param lastTimestamp 上次生成ID的时间截
     * @return 当前时间戳
     */
    protected long tilNextMillis(long lastTimestamp) {
        long timestamp = timeGen();
        while (timestamp <= lastTimestamp) {
            timestamp = timeGen();
        }
        return timestamp;
    }

    /**
     * 返回以毫秒为单位的当前时间
     *
     * @return 当前时间(毫秒)
     */
    protected long timeGen() {
        return System.currentTimeMillis();
    }


    //==============================Test=============================================
    /** 测试 */
    /*public static void main(String[] args) {
        SnowflakeIdWorker idWorker = new SnowflakeIdWorker(5, 19);
        for (int i = 0; i < 1000; i++) {
            long id = idWorker.nextId();
            System.out.println(Long.toBinaryString(id));
            System.out.println(id);
        }
    }*/


}
```



# 数据库自增ID

利用给字段设置auto_increment_increment和auto_increment_offset来保证ID自增

## 优点

- 利用现有数据库系统的功能实现，实现成本小
- id保证单调递增
- 查询速度快

## 缺点

- 强依赖数据库，当数据库异常时，整个系统不可用
- id发号性能瓶颈限制在单台MySQL的读写性能
- 分表分库，数据迁移合并等比较麻烦（id重复）

# 数据库集群模式

对单点数据库进行优化，改造成主从模式集群，两个MySQL实例都单独生产自增id、

```mysql
-- MySQL Master
set @@auto_increment_offset = 1;		-- 起始值
set @@auto_increment_increment = 2;		-- 步长

-- MySQL Slave
set @@auto_increment_offset = 2;		-- 起始值
set @@auto_increment_increment = 2;		-- 步长
```

这样两个实例产生的id就可以交替地自增了

## 优点

解决数据库单点问题

## 缺点

不利于后续扩容（如再加一个从数据库，id无法保证不重复），并且每个数据库自身压力还是非常大，依旧无法满足高并发场景

## 应用场景

- 数据库不需要扩容的场景

# 数据库号段模式

**号段模式可以理解成从数据库批量地获取自增**，每次从数据库取出一个号段范围，例如 (1,1000] 代表1000个ID，具体的业务服务将本号段，生成1~1000的自增ID并加载到内存

```mysql
CREATE TABLE id_generator (
  `id` int(10) NOT NULL,
  `max_id` bigint(20) NOT NULL COMMENT '当前最大的可用id',
  `step` int(20) NOT NULL COMMENT '号段的步长',
  `biz_type`    int(20) NOT NULL COMMENT '业务类型',
  `version` int(20) NOT NULL COMMENT '版本号，是一个乐观锁，每次都更新version，保证并发时数据的正确性',
  PRIMARY KEY (`id`)
)
```

- 每一类业务单独使用一批id
- 当使用完一批id后，再次向数据库申请新号段，对max_id字段做一次update操作，新的号段范围是(max_id, max_id+step]

```mysql
update id_generator set max_id = (max_id+step), version = (version+1) where version =  {version} and biz_type = XX
```

- 由于多业务端可能同时操作，所以采用版本号 version 乐观锁方式更新，这种分布式ID生成方式**不强依赖于数据库**，不会频繁的访问数据库，对数据库的压力小很多。但是如果遇到了双十一或者秒杀类似的活动还是会对数据库有比较高的访问。

## 双buffer方案

双buffer方案达到了Id都是从内存中获取，性能更好，允许数据库宕机的时间更长了，因为会有一个线程观察什么时候去自动获取Id，在两个buffer之间自行切换

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/640.png)

1. 从buffer1中获取Id
2. 当buffer1中的Id已经使用了10%后，先判断buffer2中有没有去获取过Id，如果没有就立即发起请求获取Id线程，此线程把获取到的Id存放到buffer2中
3. 如果buffer1的Id用完了，会自动切换buffer2中
4. 如果buffer2的Id用到10%了，也会像第2步中，获取Id，存放到buffer1中

# Redis生成方案

利用redis的**incr**原子性自增

## 优点

- 有序递增，可读性强

## 缺点

- 占用带宽，每次要向redis进行请求