---
title: 适配器模式
icon: article
category:

- 设计模式

---

# 适配器模式

定义：将一个类的接口变成客户端所期望的另一种接口，从而使原本因接口不匹配而导致无法在一起工作的两个类能够一起工作

理解：已有220V的电源，想给5V额定电压的电池充电，需要一个电源适配器来完成兼容

适用场景

1. 已经存在的类，它的方法和需求不匹配但方法结果相同或相似的情况
2. 不是设计阶段需要考虑的设计模式，而是一种类似亡羊补牢的手段

优点：

1. 提高类的复用程度
2. 目标类和适配器类解耦，提高系统的扩展性
3. 在很多场景中适配器模式符合开闭原则

缺点：

1. 编写过程中需要全面考虑，可能会增加系统的复杂度
2. 增加系统理解难度，过多使用适配器会使系统代码变得凌乱



## 类适配器

Adaptee 被适配者

```java
public class AC220 {
    public int output220V() {
        return 220;
    }
}
```



Target 目标接口

```java
public class DC5 {
    int output5V();
}
```



Adapter 适配器

```java
public class PowerAdapter extends AC220 implements DC5 {
    public int output5V() {
        int adapterInput = super.output220V();
        int adapterOutput = adapterInput / 44;
        return adapterOutput;
    }
}
```



Client 客户端

```java
public class Client {
    public static void main(String[] args) {
        DC5 powerAdapter = new PowerAdapter();
        int output = powerAdapter.output5V();
    }
}
```



## 对象适配器

与类适配器相比，对象适配器不采用继承的方式，而是采用组合的形式

Adaptee 被适配者

```java
public class AC220 {
    public int output220V() {
        return 220;
    }
}
```



Target 目标接口

```java
public class DC5 {
    int output5V();
}
```



Adapter 适配器

```java
public class PowerAdapter implements DC5 {
    private AC220 ac220;
    public PowerAdapter(Ac220 ac220) {
        this.ac220 = ac220;
    }
    
    public int output5V() {
        int adapterInput = super.output220V();
        int adapterOutput = adapterInput / 44;
        return adapterOutput;
    }
}
```



Client 客户端

```java
public class Client {
    public static void main(String[] args) {
        PowerAdapter powerAdapter = new PowerAdapter(new AC220());
        int output = powerAdapter.output5V();
    }
}
```



## 接口适配器

解决接口方法过多的情况，一个适配器适配接口中的多个方法

Adaptee 被适配者

```java
public class AC220 {
    public int output220V() {
        return 220;
    }
}
```



Target 目标接口

```java
public class DC {
    int output5V();
    int output12V();
    int output24V();
}
```



Adapter 适配器

```java
public class PowerAdapter implements DC5 {
    private AC220 ac220;
    public PowerAdapter(Ac220 ac220) {
        this.ac220 = ac220;
    }
    
    public int output5V() {
        int adapterInput = super.output220V();
        int adapterOutput = adapterInput / 44;
        return adapterOutput;
    }
    
    public int output12V() {
        return 0;
    }
    
    public int output24V() {
        return 0;
    }
}
```



Client 客户端

```java
public class Client {
    public static void main(String[] args) {
        PowerAdapter powerAdapter = new PowerAdapter(new AC220());
        int output = powerAdapter.output5V();
    }
}
```



## 适配器模式在源码中的体现

### DispatcherServlet

在 `doDispatch()` 方法中调用了 `getHandlerAdapter()` 方法，在方法体中循环地调用了 `supports()` 方法来判断是否兼容

```java
protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {
  // ...
  // 根据mapperHandler的handler来寻找合适的适配器
	HandlerAdapter ha = this.getHandlerAdapter(mappedHandler.getHandler());
  // ...
}
```



```java
protected HandlerAdapter getHandlerAdapter(Object handler) throws ServletException {
  if (this.handlerAdapters != null) {
    Iterator var2 = this.handlerAdapters.iterator();

    while(var2.hasNext()) {
      HandlerAdapter adapter = (HandlerAdapter)var2.next();
      if (adapter.supports(handler)) {
        return adapter;
      }
    }
  }

  throw new ServletException("No adapter for handler [" + handler + "]: The DispatcherServlet configuration needs to include a HandlerAdapter that supports this handler");
}
```


