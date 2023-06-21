# Redis 分布式锁

概念

jvm 同步锁

使用场景

与 zookeeper 分布式锁的对比



## 一步步分析如何在 Java 中使用 Redis 分布式锁



### 做法一

我们看网上的资料都说最基础的实现是使用 `setnx` 命令（set if not exist）

```java
@Slf4j
@Component
public class RedisLock {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    //锁的前缀名称
    private static final String LOCK_PREFIX = "GET_LOCK";
    //锁的过期时间，尽可能避免业务没有执行完锁就自动释放
    private static final long EXPIRE_TIME = 300L;

    public void lock(String lockName) {
        String key = LOCK_PREFIX + lockName;
      	//加锁
        Boolean lockSuccessfully = redisTemplate.opsForValue().setIfAbsent(key, value);
        if (Boolean.TRUE.equals(lockSuccessfully)) {
            try {
                log.info(" ************ Redis加锁成功：{} ************ ", key);
                //设置过期时间，防止出现死锁，程序崩溃、服务器宕机都是不会释放锁的
                redisTemplate.expire(key, EXPIRE_TIME, TimeUnit.SECONDS);
                //处理业务逻辑
                log.info("处理业务中");
                TimeUnit.SECONDS.sleep(5);
                // *******业务逻辑处理结束****** //
            } catch (Exception e) {
                log.info("业务处理过程中出现异常：{}", e.getMessage());
            } finally {
                //加锁处理的逻辑完成，手动释放锁
                redisTemplate.delete(key);
                log.info(" ************ Redis释放锁成功：{} ************ ", key);
            }
        } else {
            log.info("获取锁失败");
        }
    }
}
```

这种做法看似可以实现，但是会存在两个问题

- **如果执行完 `setIfAbsent` 后，执行 `expire` 前服务器宕机了，这个锁就一直锁住，无法释放了**
- **因为加入了锁过期时间，那么在 finally 块中直接这样释放锁是可能会释放掉其他线程加的锁的**



### 做法二

吸取上一个做法的不足，让加锁和设置过期时间这两个操作成为一个**原子操作**，另外在 finally 中增加了释放锁前线判断当前锁是否是自己的一个判断，避免释放掉不属于自己线程的锁

```java
@Slf4j
@Component
public class RedisLock {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    //锁的前缀名称
    private static final String LOCK_PREFIX = "GET_LOCK";
    //锁的过期时间，尽可能避免业务没有执行完锁就自动释放
    private static final long EXPIRE_TIME = 300L;

    public void lock(String lockName) {
        String key = LOCK_PREFIX + lockName;
        String value = UUID.randomUUID().toString(true);
        try {
            //加锁
            Boolean lockSuccessfully = redisTemplate.opsForValue().setIfAbsent(key, value, EXPIRE_TIME, TimeUnit.SECONDS);
            if (Boolean.TRUE.equals(lockSuccessfully)) {
                log.info(" ************ Redis加锁成功：{} ************ ", key);
                //设置过期时间，防止出现死锁，程序崩溃、服务器宕机都是不会释放锁的
                redisTemplate.expire(key, EXPIRE_TIME, TimeUnit.SECONDS);
                //处理业务逻辑
                log.info("处理业务中");
                TimeUnit.SECONDS.sleep(5);
            } else {
                log.info("获取锁失败");
            }
        } catch (Exception e) {
            log.info("业务处理过程中出现异常：{}", e.getMessage());
        } finally {
            //为了防止在释放锁时，原有锁已经过期自动释放，而释放的是其他的锁
            if (Objects.equals(redisTemplate.opsForValue().get(key), value)) {
                redisTemplate.delete(key);
            }
        }
    }
}
```

这种做法解决了做法一的两个问题，看似能投入使用了，但是同样存在问题：

- **finally 代码块中的获取判断和删除操作不是原子操作，在并发的环境下也是存在问题的**
- **锁的过期时间及其重要，只要业务没有执行完成，但是锁过期了，那么问题就大了**



## Redission 分布式锁的引入

