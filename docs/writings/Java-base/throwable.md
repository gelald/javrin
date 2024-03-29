---
title: 异常机制
icon: article
category:

- Java基础

---

# 异常机制

> 所有在程序运行期间干扰正常流程的时事件都可以称为异常
>
> Java 为异常提供的一种识别与响应错误的机制，Java 的异常机制可以把业务逻辑与异常处理逻辑分离，提高程序的健壮性

## 异常的结构体系

Java 是一门面向对象的设计语言，因此异常也是以对象的形式呈现

Java 异常结构体系大概可以划分为以下结构

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20220309163400.png)



其中有几个地方值得注意

- Error 程序是不能处理的，只能在开发的时候尽量避免。如 OutOfMemoryError：内存不足错误；StackOverflowError：栈溢出错误，发生这类错误时，JVM 将终止线程。
- Exception 是使用不当的情况下抛出的，开发人员在开发的时候应当注意避免。Exception 下可以分成两类，一类是运行时异常，另一类是编译异常
  - 运行时异常可以不必抛出、处理，程序应该从逻辑角度尽可能避免这类异常的发生。
  - 编译异常需要显式地处理或者抛出，否则无法通过编译。



## 发生异常大致流程

1. JVM 创建一个异常对象，包含了其线程创建时线程执行堆栈的快照（包含了异常产生的内容、原因、位置），它提供了 printStackTrace() 等接口用于获取堆栈跟踪数据等信息。
2. 若方法中没有异常处理逻辑（try...catch），则把对象抛给方法调用者来处理
3. 若最终到main方法都没有异常处理逻辑，那么这个异常最终会落到 JVM 上，JVM 会做两件事
   1. 把异常对象（内容、原因、位置）输出到控制台上
   2. JVM 会终止当前执行的程序，也叫中断处理



## 异常处理

> 从上文可以得知，Error 不处理，我们一般处理的还是 Exception 及其子类

异常处理有两种方式：声明、`try-catch-finally`

### 声明

可以利用关键字 `throws` 在方法上声明，声明这个方法会抛出某个异常，希望调用者调用的时候进行处理

```java
public void getValue() throws IOExcetion {}
```

### try-catch-finally

这个方式是手动捕获运行中可能抛出的异常并进行处理

其中 `try-catch-finally` 有多种形式，逐一来看



`try-catch`

在一个 `try-catch` 语句块中可以捕获多个异常类型，并对不同类型的异常做出不同的处理

```java
try {
    // 执行程序代码，可能会出现异常  
} catch (FileNotFoundException e) {
    // 捕获 FileNotFoundException 并处理
} catch (IOException e){
    // 捕获 handle IOException 并处理
}
```



`try-finally`

try 块中无论是否引起异常，都直接执行finally语句。一般用于释放资源的场景中，因为比起处理异常，保护资源显然更为重要

```java
// 以Lock加锁为例，演示try-finally
ReentrantLock lock = new ReentrantLock();
try {
    // 需要加锁的代码
} finally {
	//保证锁一定被释放
    lock.unlock();
}
```



`try-catch-finally`

这是最正规，用得最多的形式

```java
try {                        
    // 执行程序代码，可能会出现异常                 
} catch(Exception e) {   
    // 捕获异常并处理   
} finally {
    // 必执行的代码
}
```



`try-with-resource`

这是 Java 7后引入的针对释放资源而引入的更优雅的释放资源的方式

Java 7之前的读取文件，可以看到 finally 块中也包了一个 try catch 代码块，看上去有点繁琐

```java
private static void readFile(String filePath) {
    File file = new File(filePath);
    String result;
    BufferedReader reader = null;
    try {
        reader = new BufferedReader(new FileReader(file));
        while ((result = reader.readLine()) != null) {
            System.out.println(result);
        }
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        if (null != reader) {
            try {
                reader.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

Java 7之后的释放资源，可以看到，代码精简了不少，也变得更加优雅

```java
private static void readFile(String filePath) {
    File file = new File(filePath);
    String result;
    try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
        while ((result = reader.readLine()) != null) {
            System.out.println(result);
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```



通过查看源码发现是因为这个资源在释放的时候会自动执行它的 close 方法。自动释放资源需要实现一个 `AutoCloseable` 接口

```java
// 父类 Reader 实现了 AutoCloseable接口
public class BufferedReader extends Reader {
    // ...
	public void close() throws IOException {
        synchronized (lock) {
            if (in == null)
                return;
            try {
                in.close();
            } finally {
                in = null;
                cb = null;
            }
        }
    }
    // ...
}
```



