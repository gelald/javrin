---
title: 策略模式
icon: article
category:

- 设计模式

---

# 策略模式

定义：将定义的算法家族分别封装起来，让它们之间可以互相替换，从而让算法的变化不会影响到使用算法的用户。可以避免多重分支的 `if else` 和 `switch` 语句

理解：策略模式使用的就是面向对象的继承和多态机制，从而实现同一行为在不同场景下具体不同的实现

适用场景：

1. 系统中有很多类，但他们的区别仅仅在于他们的行为不同
2. 一个系统需要动态地在几种算法中选择一种

优点：

1. 符合开闭原则
2. 避免使用多重提交转换语句
3. 提高算法的保密性和安全性，因为客户端无序依赖这些具体算法

缺点：

1. 客户端可以不用具体依赖算法，但是必须知道所有的策略，并且自行决定使用哪一个
2. 策略模式会来带更多的策略类，增加维护的难度



## 示例

策略模式在支付场景中尤为常见，现在就用促销优惠活动为例，优惠策略可能是：优惠券折扣、返现、拼团优惠

促销的抽象策略

```java
public interface IPromotionStrategy {
    void doPromotion();
}
```



默认没有优惠的策略

```java
public class EmptyStrategy implements IPromotionStrategy {
    public void doPromotion() {
        System.out.println("无优惠");
    }
}
```



优惠券折扣策略

```java
public class CouponStrategy implements IPromotionStrategy {
    public void doPromotion() {
        System.out.println("使用优惠券抵扣");
    }
}
```



返现策略

```java
public class CashbackStrategy implements IPromotionStrategy {
    public void doPromotion() {
        System.out.println("返现，直接打款到支付宝账号");
    }
}
```



拼团优惠策略

```java
public class GroupbuyStrategy implements IPromotionStrategy {
    public void doPromotion() {
        System.out.println("5人成团，可以优惠");
    }
}
```



结合工厂模式来做一个选择策略的工厂，这个工厂缓存了所有的策略，提供两个方法，第一个是返回所有的策略名称以供客户端选择；第二个根据策略名来返回具体策略

```java
public class PromotionStrategyFactory {

    private static final Map<String, IPromotionStrategy> PROMOTIONS = new HashMap<String, IPromotionStrategy>();
    private static final IPromotionStrategy DEFAULT = new EmptyStrategy();

    static {
        PROMOTIONS.put(PromotionKey.EMPTY, new EmptyStrategy());
        PROMOTIONS.put(PromotionKey.COUPON, new CouponStrategy());
        PROMOTIONS.put(PromotionKey.CASHBACK, new CashbackStrategy());
        PROMOTIONS.put(PromotionKey.GROUPBUY, new GroupbuyStrategy());
    }

    private PromotionStrategyFactory() {
    }

    public static IPromotionStrategy getPromotionStrategy(String promotionKey) {
        IPromotionStrategy strategy = PROMOTIONS.get(promotionKey);
        return strategy == null ? DEFAULT : strategy;
    }

    private interface PromotionKey {
        String EMPTY = "EMPTY";
        String COUPON = "COUPON";
        String CASHBACK = "CASHBACK";
        String GROUPBUY = "GROUPBUY";
    }

    public static Set<String> getPromotionKeys() {
        return PROMOTIONS.keySet();
    }
}
```



客户端调用

```java
public class Test {
    public static void main(String[] args) {
        // 1.获取所有的策略
        Set<String> promotionKeys = PromotionStrategyFactory.getPromotionKeys();
        // 2.从中选择一种策略
        String promotionKey = "COUPON";
        // 3.从工厂中拿到具体策略
        IPromotionStrategy promotionStrategy = PromotionStrategyFactory.getPromotionStrategy(promotionKey);
        // 4.执行策略
        promotionStrategy.doPromotion();
    }
}
```



## 策略模式在源码中的体现

### JDK

JDK 中有一个比较常见的比较器 `Comparator` 接口，其中用得最多的是 `compare()` 方法，就是一个策略抽象实现

```java
public interface Comparator<T> {
    int compare(T o1, T o2);
}
```

`Comparator` 有非常多的实现类，在具体使用的过程中经常会把它作为参数传入作为排序的策略

如 `Arrays` 的 `parallelSort()` 方法

```java
public class Arrays {
    public static <T> void parallelSort(T[] a, Comparator<? super T> cmp) {
    	// ...
	}
}

```

如 `TreeMap` 的构造方法

```java
public class TreeMap extends AbstractMap<K,V> implements NavigableMap<K,V>, Cloneable, java.io.Serializable {
    private final Comparator<? super K> comparator;
    
    public TreeMap(Comparator<? super K> comparator) {
        this.comparator = comparator;
    }
}
```



### Spring

Spring 中的初始化也采用了策略模式，`InstantiationStrategy` 定义了 bean 初始化的抽象策略

```java
public interface InstantiationStrategy {
    Object instantiate(RootBeanDefinition var1, String var2, BeanFactory var3) throws BeansException;

    Object instantiate(RootBeanDefinition var1, String var2, BeanFactory var3, Constructor<?> var4, Object... var5) throws BeansException;

    Object instantiate(RootBeanDefinition var1, String var2, BeanFactory var3, Object var4, Method var5, Object... var6) throws BeansException;
}
```

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20211130223124.png)

有两个子类：`SimpleInstantiationStrategy` 和 `CglibSubclassingInstantiationStrategy` ，会根据用户的配置来选择这个策略，如果配置了 cglib ，那么优先选择 `CglibSubclassingInstantiationStrategy` 



## 策略模式和委派模式的区别

最大的区别就是：策略模式一定是委派模式，委派模式不一定是策略模式。因为策略模式是通过上下文这个角色来让具体策略执行逻辑的；而委派模式可以使用策略模式，也可以手动写很多 `if...else...` 代码块
