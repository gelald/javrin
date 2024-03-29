---
title: 单例模式
icon: article
category:

- 设计模式

---

# 单例模式

定义：确保一个类在任何情况下都绝对只有一个实例，并提供一个全局访问点`getInstance()`，隐藏（私有）其所有的构造方法

适用场景：

1. 需要频繁实例化然后销毁的对象，特别是设计IO操作的对象
2. 创建的对象消耗的资源或时间过多，但是又经常使用的对象
3. 有状态的对象
4. 资源共享的情况下，避免由于资源操作时导致的性能或损耗等。如日志文件，应用配置。 
5. 控制资源的情况下，方便资源之间的互相通信。如线程池等。 

例子：`ServletContext`、`ServletConfig`、`ApplicationContext`、电脑回收站、数据库连接池



**单例模式重点**

- 私有化构造方法
- 保证线程安全
- 延迟加载避免内存浪费
- 防御反射破坏单例
- 防御反序列化破坏单例



## 饿汉式单例

在类初次加载的时候就立即初始化

```java
public class HungrySingleton {
    private static final HungrySingleton hungrySingleton = new HungrySingleton();
    
    private HungrySingleton() {}
    
    public static HungrySingleton getInstance() {
        return hungrySingleton;
    }
}
```

优点：没有锁，执行效率高

缺点：当系统中存在大量的饿汉式单例时，在类加载的时候就初始化了，会造成内存浪费



## 懒汉式单例

为了解决饿汉式单例可能造成内存浪费的缺点，懒汉式单例的特点是被外部类调用时才创建实例

### 懒汉式简单写法

```java
public class LazySimpleSingleton {
    private static LazySimpleSingleton instance;
    
    private LazySimpleSingleton() {}
    
    public static LazySimpleSingleton getInstance() {
        if (instance == null) {
            instance = new LazySimpleSingleton();
        }
        return instance;
    }
}
```

优点：不需要在类加载的时候就初始化，节省了内存消耗

缺点：线程不安全

- 两个线程执行后得到同一个实例
  - 正常顺序执行
  - 两个线程都进入了条件，但是线程1创建实例后还没返回之前就被线程2创建的实例覆盖
- 两个线程执行后的到不同的实例
  - 同时进入条件，线程1创建实例返回后线程2再创建实例返回



### 加锁写法

为了解决简单写法中线程不安全的缺点，可以采取加锁写法，把锁加在方法上，当一个线程进入方法后，会阻塞其他线程进入

```java
public class LazySimpleSingleton {
    private static LazySimpleSingleton instance;
    
    private LazySimpleSingleton() {}
    
    public synchronized static LazySimpleSingleton getInstance() {
        if (instance == null) {
            instance = new LazySimpleSingleton();
        }
        return instance;
    }
}
```

优点：节省了内存消耗，线程安全

缺点：锁加在方法上，性能降低



### 双重检查锁写法

为了解决加锁在方法上带来性能降低的缺点，可以采用双重检查锁的形式

```java
public class DoubleCheckSingleton {
    //解决指令重排序带来的问题
    private volatile static DoubleCheckSingleton instance;
    
    private DoubleCheckSingleton() {}
    
    public static DoubleCheckSingleton getInstance() {
        //检查是否要阻塞；如果实例不为空，那么就不用进入阻塞了，提高效率
        if (instance == null) {
            synchronized(DoubleCheckSingleton.class) {
                //检查是否要重新创建实例；防止进入了第一层条件后进来覆盖实例或者创建更多实例
            	if (instance == null) {
            		instance = new LazySimpleSingleton();
        		}
        		return instance;
        	}
        }
    }
}
```

优点：节省了内存消耗，性能高，线程安全

缺点：加入双重检查锁后代码可读性降低



### 静态内部类写法

为了解决双重检查锁写法上带来可读性降低的缺点，可以采用静态内部类的方式

**静态成员变量在类加载的时候就会被分配空间，静态内部类在使用的时候才会分配内存空间**

```java
public class LazyStaticInnerClassSingleton {
    private LazyStaticInnerClassSingleton() {}
    
    public static LazyStaticInnerClassSingleton getInstance() {
        return LazyHolder.INSTANCE;
    }
    
    private static class LazyHolder {
        private static final LazyStaticInnerClassSingleton INSTANCE = new LazyStaticInnerClassSingleton();
    }
}
```

优点：节省了内存消耗，利用Java语法特点实现延时加载性能高，线程安全

缺点：能够被反射破坏



## 注册式单例

将每一个实例都缓存到统一的容器中，使用唯一标识获取实例

### 枚举式写法

```java
public enum EnumSingleton {
    INSTANCE;
    
    private Object data;
    
    public Object getData() {return data;}
    
    public void setData(Object data) {this.data = data;}
    
    public static EnumSingleton getInstance() {
        return INSTANCE;
    }
}
```

优点：线程安全，无法使用反射进行破坏单例，因为`jdk`规定了无法使用反射来创建枚举对象

缺点：在类加载的时候就把实例创建出来了，有可能造成内存浪费



### 容器式写法

```java
public class ContainerSingleton {
    private ContainerSingleton() {}
    
    private static Map<String, Object> map = new ConcurrentHashMap<>();
    
    public static Object getInstance(String className) {
        if(!map.containsKey(className)) {
            try {
                Object instance = Class.forName(className).newInstance();
            	map.put(className, instance);
                return instance;
            } catch(Exception e) {
                e.printStackTrace();
            }
        } else {
            return map.get(className);
        }
    }
}
```

缺点：线程不安全



## ThreadLocal单例

ThreadLocal保证**线程内部**的全局唯一，并且是线程安全的

```java
public class ThreadLocalSingleton {
    private static final ThreadLocal<ThreadLocalSingleton> threadLocalSingleton = new ThreadLocal<ThreadLocalSingleton>() {
        @Override
        protected ThreadLocalSingleton initialValue() {
            return new ThreadLocalSingleton();
        }
    }
    
    private ThreadLocalSingleton() {}
    
    public static ThreadLocalSingleton getInstance() {
        return threadLocalSingleton.get();
    }
}
```



## 反射被破坏的场景

### 反射破坏单例

在饿汉式、懒汉式写法中即便是把构造方法私有化，但是在反射面前都是浮云

先获取构造方法，再设置强制访问 `c.setAccessible(true)` 就能实现通过构造方法创建实例

#### 懒汉式单例静态内部类写法规避反射破坏的手段

```java
public class LazyStaticInnerClassSingleton {
    private LazyStaticInnerClassSingleton() {
        if (LazyHolder.INSTANCE != null) {
//通过判断INSTANCE是否为null来检查是否使用反射来破坏单例了，如果不为null，那么证明非法访问。因为如果用反射来获取这个类的构造方法时，也会加载LazyHolder从而INSTANCE得到初始化，那么这时判断INSTANCE是否为null即可判断是否非法访问。因为正常访问是不能够也不会去访问构造方法，只会去访问getInstance方法
            throw new RuntimeException("不允许非法访问");
        }
    }
    
    public static LazyStaticInnerClassSingleton getInstance() {
        return LazyHolder.INSTANCE;
    }
    
    private static class LazyHolder {
        private static final LazyStaticInnerClassSingleton INSTANCE = new LazyStaticInnerClassSingleton();
    }
}
```



#### 注册式单例枚举式写法不受反射破坏的原因

JDK 从底层就规定了无法使用反射来新建一个枚举对象

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210916150154.png)



### 反序列化破坏单例

把A对象序列化到磁盘中，然后把磁盘中的内容反序列化到B对象，反序列化时会重新分配一个地址

#### 饿汉式单例规避反射破坏的手段

```java
public class HungrySingleton {
    private static final HungrySingleton hungrySingleton = new HungrySingleton();
    
    private HungrySingleton() {}
    
    public static HungrySingleton getInstance() {
        return hungrySingleton;
    }
    
    private Object readResolve() {
        //把单例返回
        return hungrySingleton;
    }
}
```

`ObjectOutputStream` 在反序列化时，会先检查对象有没有 `readResolve` 方法，如果有就调用

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20210916160056.png)



### clone 破坏单例

```java
@Data
public class ConcretePrototype implements Cloneable {
    private static  ConcretePrototype instance = new ConcretePrototype();
    private ConcretePrototype(){}
    public static ConcretePrototype getInstance(){
        return instance;    
    }    
    @Override    
    public ConcretePrototype clone() {        
        try {
            return (ConcretePrototype)super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
            return null;
        }    
    }
}
```

```java
ConcretePrototype concretePrototype = ConcretePrototype.getInstance();
ConcretePrototype clone = concretePrototype.clone();
System.out.println(concretePrototype == clone);
// false
```

解决方式：

1. 单例类不允许实现 `Cloneable` 接口

2. 重写 `clone()` 方法，让这个方法返回单例

   ```java
   @Override
   public ConcretePrototype clone() {
       return instance;
   }
   ```

   

### 多线程破坏单例

懒汉式单例简单写法在多线程的环境下单例会被破坏，有可能新建出两个不同的对象

#### 懒汉式单例双重检查锁写法规避多线程破坏单例的手段

```java
public class DoubleCheckSingleton {
    //解决指令重排序带来的问题
    private volatile static DoubleCheckSingleton instance;
    
    private DoubleCheckSingleton() {}
    
    public static DoubleCheckSingleton getInstance() {
        //检查是否要阻塞；如果实例不为空，那么就不用进入阻塞了，提高效率
        if (instance == null) {
            synchronized(DoubleCheckSingleton.class) {
                //检查是否要重新创建实例；防止进入了第一层条件后进来覆盖实例或者创建更多实例
            	if (instance == null) {
            		instance = new LazySimpleSingleton();
        		}
        		return instance;
        	}
        }
    }
}
```

第一重检查：为了后续不用每次都阻塞程序，所以检查单例是否为空来判断需要阻塞

第二重检查：为了防止首次创建单例时有多个线程同时通过了第一重检查，然后等待锁释放后创建实例而覆盖已创建实例的情况

`volatile` 关键字的作用：为了解决指令重排序的问题

```java
instance = new LazySimpleSingleton();
// JVM 转换成多条指令
memory = allocate(); 	//1：分配对象的内存空间
ctorInstance(memory); 	//2：初始化对象
instance = memory; 		//3：设置instance指向刚分配的内存地址
// 多线程环境下 JVM 为了提高执行效率会进行指令重排序，重排序后的结果可能如下
memory = allocate(); 	//1：分配对象的内存空间
instance = memory; 		//3：设置instance指向刚分配的内存地址，此时对象还没被初始化
ctorInstance(memory); 	//2：初始化对象

// 可以看到指令重排之后，instance指向分配好的内存放在了前面，而这段内存的初始化被排在了后面，在线程A初始化完成这段内存之前，线程B虽然进不去同步代码块，但是在同步代码块之前的判断就会发现instance不为空，此时线程B获得instance对象进行使用就会发生空指针异常
```



