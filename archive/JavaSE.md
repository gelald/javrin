# JavaSE

## JVM、JRE、JDK

**JVM**：Java Virtual Machine（java虚拟机），让java语言达到**跨平台**的原因
**JRE**：Java Runtime Environment（java运行环境） 包含jvm和核心类库   **用于运行**
**JDK**：Java Development Kit（ java开发工具包） 包含jre和开发工具   **用于开发**

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrpkg8zlj30nk0c6wfq.jpg)

## Java关键字特性：

1. 完全小写的字母：public(√) Public(×) public123(×)
2. 在IDE中有特殊颜色标注

## Java标识符(自定义名称 变量名、方法名、类名):

* 要求：
    * 英文26个字母(区分大小写)、0-9 10个数字、$、_
    * 不能用数字开头
    * 不能用关键字
* 建议
    * 类名：每个单词首字母大写（大驼峰）
    * 变量名、方法名：首单词首字母小写，后面每个单词首字母大写（小驼峰）
    * 包名：一组文件夹，公司域名颠倒过来，com.开始，且全都小写英文字母和(.)

## Java数据运算

/、%、位运算

```java
/*
除法运算
1.整数间的除法运算，得到的结果是整数
2.浮点数参与除法运算，无论是除数或被除数或两者皆为浮点数，得到的结果是运算得到的浮点数（除到尽）
	*除不尽的数会得到一个不太精准的结果 10.0/3=3.3333333333333335
3.负数参与除法运算，按照符号来运算
*/
System.out.println(9/5);				//1
System.out.println(9.0/5);			//1.8
System.out.println(9/5.0);			//1.8
System.out.println(9.0/5.0);		//1.8
//负数情况
System.out.println(10/-4);			//-1
System.out.println(-10/4);			//-1
System.out.println(-10/-4);			//1
System.out.println(-10.0/4);		//-1.8
System.out.println(10.0/-4);		//-1.8
System.out.println(-10.0/-4);		//1.8

/*
模运算
1.模运算实际上是取除法运算中的余数
2.浮点数参与模运算，不会像除法运算那样除到尽，结果依然是整数模运算，不过结果是浮点数
3.负数参与模运算，最好把算式列出来，否则容易乱(小规律：结果符号与被除数符号相同)
*/
System.out.println(9%5);				//4
System.out.println(9.0%5);			//4.0
System.out.println(9%5.0);			//4.0
System.out.println(9.0%5.0);		//4.0
//负数情况
System.out.println(9%-5);				// 9/(-5)=-1...4
System.out.println(-9%5);				// -9/5=-1...(-4)
System.out.println(-9%-5);			// -9/(-5)=1...(-4)
System.out.println(-9.0%5);			// -9.0/5=-1...(-4.0)
System.out.println(9.0%-5);			// 9.0/(-5)=-1...4.0
System.out.println(-9.0%-5);		// -9.0/(-5)=1...(-4.0)
```

**位运算**：&、|、^、~。**这些运算符是在二进制补码上进行操作**

**java中的整数类型都是有符号数，即其最高位为符号位**

展示：原码；运算：补码

```java
public static void main(String[] args) {
    byte a = 15;
    byte b = -15;
  
  	//a、b换成补码形式
    a = 0000 1111
    b = 1111 0001

    //&按位与运算
    System.out.println(a & b);	//0000 0001(补) = 0000 0001(原) = 1
  	//|按位或运算
    System.out.println(a | b);	//1111 1111(补) = 1000 0001(原) = -1
  	//^按位异或运算
    System.out.println(a ^ b);	//1111 1110(补) = 1000 0010(原) = -2
  	//~按位取反运算
    System.out.println(~a);			//1111 0000(补) = 1001 0000(原) = -16
    System.out.println(~b);			//0000 1110(补) = 0000 1110(原) = 14
}
```

1. `byte`和`short`类型数值进行位运算后，返回的是`int`类型
2. **符号位参与位运算**

**移位运算**：<<、>>、>>>     运算符左侧是需要移动的二进制数，右侧是要移动的位数

```java
public class test{
    public static void main(String[] args) {
        //左移运算符用“<<”表示，是将运算符左边的对象，向左移动运算符右边指定的位数，并且在低位补零。
        int a=2,b=2,c;
        c=a<<b;
        System.out.print("a 移位的结果是"+c);
      	//2<<2 = 0000 0010(原、补)<<2 = 0000 1000(原、补)=8
    }
}

public class test{
    public static void main(String[] args) {
      	//无符号右移运算符无符号用“>>>”表示，是将运算符左边的对象向右移动运算符右边指定的位数，并且在高位补0，其实右移n位，就相当于除上2的n次方
        int a=16;
        int b=2;
        System.out.println("a 移位的结果是"+(a>>>b));
      	//16>>>2 = 0001 0000(原、补)>>>2 = 0000 0100(原、补)=4
    }
}

public class test{
    public static void main(String[] args) {
      	//带符号右移运算符用“>>”表示，是将运算符左边的运算对象，向右移动运算符右边指定的位数。如果是正数，在高位补零，如果是负数，则在高位补1
        int a=16;
        int c=-16;
        int b=2;
        int d=2;
        System.out.println("a 的移位结果："+(a>>b));
      	//16>>2 = 0001 0000(原、补)>>2 = 0000 0100(原、补)=4
        System.out.println("c 的移位结果："+(c>>d));
      	//-16>>2 = 1001 0000(原) 1111 0000(补)>>2 = 1111 1100(补) = 1000 0100(原)=-4
    }
}

```

- 对于 `byte` 或者 `short` 类型数值，进行移位操作时，会先转换为 `int` 类型，然后进行移位（*如果是 `long` 类型，则不变*）
-  **移位运算时，从符号位开始操作**
- **左移一位相当于乘以2，右移一位相当于除以 2**

### 移位运算常见问题

1. 移动位数超过其精度如何解决

   ```
   解答：在进行移位操作之前，先将右侧数值转换成二进制（其实在计算机内部就是以二进制补码保存的）。如果左侧操作数为 int 类型数值，那么取右侧操作数的最右端 5 位进行移位；或者左侧操作数是 long 类型数值，取右侧操作数的最右端 6 位进行移位
   ```

2. 移动位数为负如何解决

   ```
   解答：和问题一的解答一样，取右侧操作数的最右端 5/6 位进行移位
   ```

3. 如何解决符号位的问题

   ```
   解答：计算机以二进制补码形式保存整型数值，补码就是为了解决运算中符号问题。无论是加减 / 位运算 / 移位运算，符号位均参与其中
   ```

## Java数据类型

* 基本数据类型
    * 整数型：byte、short、int、long
    * 浮点型：float、double
    * 字符型：char
    * 布尔型：boolean
* 引用数据类型
    * 字符串String、数组List、类Class、接口Interface、枚举enum、Lambdaλ等
* 注意事项
    * 字符串不是基本类型，是引用类型
    * 浮点型可能是个近似值，不是精确值
    * 数据范围与字节数不一定相关，float数据范围比long更加广泛，但float是4字节，long是8字节
    * 浮点数默认是double，一定要用float要加上后缀F。整数默认是int，一定要用long要加上后缀L

| 数据类型     | 关键字  | 内存占用 |
| ------------ | ------- | -------- |
| 字节型       | byte    | 1个字节  |
| 短整型       | short   | 2个字节  |
| 整型         | int     | 4个字节  |
| 长整型       | long    | 8个字节  |
| 单精度浮点数 | float   | 4个字节  |
| 双精度浮点数 | double  | 8个字节  |
| 字符型       | char    | 2个字节  |
| 布尔类型     | boolean | 1个字节  |

## 包装类

基本数据类型虽然使用非常方便，但是没有对应的方法操作这些基本数据类型，可以使用包装类来操作这些数据

| 基本类型 | 包装类（java.lang） |
| -------- | ------------------- |
| byte     | Byte                |
| short    | Short               |
| int      | **Integer**         |
| long     | Long                |
| float    | Float               |
| double   | Double              |
| char     | **Character**       |
| boolean  | Boolean             |

- 装箱与拆箱

  - 装箱：基本数据类型->包装类

  - 拆箱：包装类->基本数据类型

  - 以Integer为例：

    1. 装箱：

       ```java
       //构造方法（过时）
       Integer(int value);
       Integer(String s);
       
       //静态方法
       static Integer valueOf(int i);
       static Integer valueOf(String s);
       ```

    2. 拆箱

       ```java
       //成员方法
       int intValue(); //以int类型返回该Integer的值
       ```
       
    3. 装箱拆箱例子(int为例)
    
    4. ```java
       //装箱
       Integer result = Integer.valueOf(x);
       
       //拆箱
       int x = result.intValue();
       ```
    
       

- 自动装箱、自动拆箱：基本数据类型<->包装类，可以自动相互转换

  ```java
  // 自动装箱
  Integer in = 1; //相当于Integer in = new Integer(1);
  // 自动拆箱
  in = in + 2;
  // in + 2 相当于in.valueOf() + 2
  // in = in + 2又是一个自动装箱
  ```

- 基本数据类型->String

  ```java
  // 1.最常用的方式
  // "" + 基本数据类型
  // 2.自身包装类的静态方法toStirng(param); 注意区分Object类中的toString();
  static String toString(int i);
  // 3.String类的valueOf方法
  static String valueOf(int i);
  // int数据为例
  // 1. "" + x;
  // 2. Integer.toString(x);
  // 3. String.valueOf(x);
  ```

- String->基本数据类型

  ```java
  // 使用自身包装类中的parseXXX(String str);
  static int parseInt(String str);
  static double parseDouble(String str);
  // 例子
  // int x = Integer.parseInt(str);
  // double y = Double.parseDouble(str);
  // long z = Long.parseLong(str);
  ```

### BigDecimal

- 作用：浮点数之间的等值判断，**基本数据类型不能用==来比较，包装数据类型不能用 equals 来判断**。原因：精度丢失。解决方法：**使用使用 BigDecimal 来定义浮点数的值，再进行浮点数的运算操作**

- 方法

  ```java
  int compareTo(BigDecimal val); //返回 -1 表示小于，0 表示 等于， 1表示 大于
  BigDecimal setScale(int scale); //保留scale位小数
  ```

- 为防止精度丢失，推荐使用`BigDecimal(String)`构造方法或`BigDecimal.valueOf(String)`，精度不会丢失，不推荐使用`BigDecimal(Double)`

### 包装类型与基本类型的区别

2. 从类型上来看：**包装类型可用于泛型，而基本类型不可以**。因为泛型在编译时会进行***类型擦除***，最后只保留**原始类型**，而原始类型只能是 **Object 类及其子类**。包装类型的都是Object的子类，而基本类型没有所谓的原始类型。
3. 从值来看：**包装类型可以为null，基本类型不可以**。包装类型可以应用于POJO，基本类型不可以，数据库的查询结果可能是 null，如果使用基本类型的话，因为要自动拆箱（将包装类型转为基本类型，比如说把 Integer 对象转换成 int 值），就会抛出 `NullPointerException` 的异常。
4. 从比较环节来看：**基本类型使用==，包装类型需要使用equals，用 ==比较的是地址值**。**包装类型和基本类型进行==比较的时候会自动拆箱。**
5. 总体上来说：**基本类型比包装类型更高效**。基本类型在栈中直接存储的具体数值，而包装类型在栈中存储的是堆中的引用。很显然，相比较于基本类型而言，**包装类型需要占用更多的内存空间**。假如没有基本类型的话，对于**数值**这类经常使用到的数据来说，每次都要通过 new 一个包装类型就显得**非常笨重**。

### 包装类和基本类型使用场景

1. POJO类属性使用包装类型
2. 局部变量使用基本数据类型

### 包装类的缓存机制

1. JVM中一个字节以下的整型数据会在JVM启动的时候加载进内存，除非用new Integer()显式的创建对象，否则都是同一个对象
2. **当Integer需要进行自动装箱时，如果数字在 -128 至 127 之间时，会直接使用缓存中的对象，而不是重新创建一个对象**。尽量不要把有自动装箱拆箱的代码写到循环中去。
3. 以Integer为例，当使用**自动装箱的方式**去创建一个Integer实例时，当数值在[-128,127]之间，会使用缓存中的实例，IntegerCache静态成员内部类，其中一段静态代码是缓存[-128,127]之间的Integer实例。这个范围其实可以调整，通过调整虚拟机参数`-XX:AutoBoxCacheMax=<size>`来设置缓存的最大值，所以在IntegerCache里面已经预设好了low为-128，但是high是没有显式写出来的，默认是127。
4. 其他类型也有缓存机制，**Byte，Short，Integer，Long为 -128 到 127，Character范围为 0 到 127。除了 Integer 可以通过参数改变范围外，其它的都不行**

## 编译器两点优化

1. 对于btye/short/char三种类型来说，如果右侧赋值得数值没有超过范围，那么javac编译器会自动隐含地为我们补上一个(byte)/(short)/(char)
   1. 如果没有超过左侧的范围，编译器补上强转
   2. 如果右侧超过了左侧范围，那么直接报错
   
2. 在给变量进行赋值的时候，如果右侧的表达式中全都是常量，没有任何变量，那么编译器javac会直接将若干个常量表达式计算得到结果。编译时赋值，不用等到运行时再去耗费cpu计算，这称为编译器的常量优化，但是一旦表达式中有其他变量参与，那么就不能进行这种优化了

   ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrpkykeej30fl04xjtn.jpg)

## switch语句注意

1. switch小括号当中只能填写以下数据类型：基本数据类型（byte/short/char/int）、引用数据类型（**String(JDK7开始支持**)、enum）

2. 顺序可以颠倒、break语句可以省略：default不一定放最后，可以在中间、可以在前面。假如不写break，若其中一个值匹配到了，则会继续匹配default对应的情况。

3. **匹配条件**：找到匹配的那个case；否则如果没有一个case满足则找到default。**执行结束条件**：一直执行到break语句或switch语句块结束

4. 格式：

   ```java
   //最舒服的形式
   //但其中的break可以省略（后果自负）、default的位置可以任意写
   switch(变量) {
     case 1:
       //xxx
       break;
     case 2:
       //yyy
       break;
     case 3:
       //zzz
       break;
     default:
       break;
   }
   ```

   

## 三种循环结构的区别

1. 如果条件判断从来没有满足过，那么for循环和while循环将循环0次，do-while循环至少循环一次
2. for循环的变量在小括号内定义，只有循环内部才可以使用

## 方法三种调用格式

1. 单独调用：方法名称(parameters);
2. 打印调用：System.out.println(方法名称(parameters));
3. 赋值调用：数据类型 变量名称 = 方法名称(parameters);

## 方法重载

- 相关
  - 参数个数不同
  - 参数类型不同
  - 参数的多类型顺序不同
- 无关
  - 参数的名称不同
  - 与方法的返回值无关

## 数组

### 数组初始化

1. 动态初始化：指定长度
   1. 格式：数据类型[] 数组名称 = new 数据类型[数组长度];  
2. 静态初始化：指定内容
   1. 标准格式：数据类型[] 数组名称 = new 数据类型[] {元素1，元素2，...};
   2. 省略格式：数据类型[] 数组名称 =  {元素1，元素2，...};
   3. 可以自动根据大括号内元素个数来计算数组长度
3. 不管是基本数据类型还是引用类型都能作为数组中的数据类型
4. 动态初始化可以拆分成两个步骤；静态初始化的标准格式可以拆分成两个步骤；静态初始化的省略格式不能拆分成两个步骤，省略格式必须一开始指定好内容
5. 使用建议：如果不确定数组中的具体内容则用动态初始化，否则用静态

### 数组引用

1. 用新定义的数组指向原有数组 int[] arrayB = arrayA; //两个数组指向相同的内存块，所以两个数组内容相同
2. 无论是作为参数还是返回值，传递的都是数组的地址值

## 面向对象

### 初始化

堆中的对象方法只是记录地址值，要入栈运行时需要从方法区中找到具体方法

### 对象初始化顺序

1. 父类静态**代码块**，父类静态成员变量（同级的，按代码顺序执行）
2. 子类静态**代码块**，子类静态成员变量（同级的，按代码顺序执行）
3. 父类普通**代码块**，父类普通成员变量（同级的，按代码顺序执行）
4. 父类构造方法
5. 子类普通**代码块**，子类普通成员变量（同级的，按代码顺序执行）
6. 子类构造方法

> 静态内容只在类加载时执行一次，之后不再执行；默认调用父类的无参构造方法，可以在子类构造方法中利用super指定调用父类的哪个构造方法

### 一个标准的类（Java Bean）由4部分组成

1. 所有成员变量都由private关键字修饰
2. 为每一个成员变量编写公共的setter、getter方法
3. 编写一个无参构造方法
4. 编写一个全参构造方法
5. 类被public修饰

### 成员变量与局部变量

- **定义位置、作用域、默认值**
- 局部变量
  1. 在方法内部定义
  2. 只能在方法内使用
  3. 没有默认值，使用前必须要赋值
- 成员变量
  1. 在方法外部，类中定义
  2. 整个类都可以使用
  3. 有默认值
  4. 无论成员变量放在哪个位置，都会先于任意一个方法执行， 包括构造方法

### super

- 在子类的成员方法中
  1. 访问父类的成员变量
  2. 访问父类的成员方法
- 在子类的构造方法中
  1. 访问父类的构造方法 super(parameter);

### this

- 在本类的成员方法中

  1. 访问本类的成员变量
  2. 访问本类另外的成员方法

- 在本类的构造方法中

  1. 访问本类另外的构造方法 this(parameter)

     this(parameter)这句也必须是构造方法中第一句并且也是唯一一句；super和this两种构造不能同时使用

### static

- 静态变量。如果一个成员变量使用了static关键字，那么这个变量不再属于对象自己，而是属于类，所有这个类实例化的对象都共享这一份数据

- 静态方法。一旦使用static修饰成员方法，那么就成为了静态方法，静态方法不属于对象，而是属于类

  1. 可以用类.静态方法来调用
  2. 也可以用对象名.静态方法来调用，不过不推荐这种做法，在编译之后会被javac翻译成类名称.静态方法
  3. 对于本类中的静态方法，可以忽略类名来直接调用

- 静态代码块。

  1. 格式：

     ```java
     public class 类名称 {
         static {
             // 静态代码块的内容
         }
     }
     ```

  2. 特点：当第一次使用到本类时，静态代码块执行唯一的一次，第二次开始就不再使用

  3. 典型用途：用于一次性地对静态成员变量进行赋值

- 注意事项

  - 静态不能直接访问非静态。原因：在内存中是【先】有的静态内容，【后】有的非静态内容。
  - 静态方法中不能用this关键字。原因：this代表当前对象，通过谁调用的方法，谁就是当前对象。

### final

- 修饰类：
  1. 格式：`public final class 类名称 {}`
  2. 含义：当前这个类，不能有任何的子类。不能使用一个final类来作为父类
  3. 一个类如果是final的，那么其中所有成员方法都无法重写
- 修饰方法
  1. 格式：`public final 返回值 方法名{}`
  2. 当final关键字修饰一个方法时，这个方法不允许被重写
  3. 对于类与方法来说 abstract和final方法不能同时使用，因为会矛盾。abstract：一定要覆盖重写；final：一定不能被覆盖重写
- 修饰局部变量
  1. 格式：`final 数据类型 变量名 = 值;`
  2. 一旦使用final来修饰局部变量，那么这个变量就不能进行更改
  3. 对于基本类型来说，不可变说的是变量中的数据不可改变
  4. 对于引用类型来说，不可变说的是变量中的地址值不可改变(引用不能改变)
- 修饰成员变量
  1. 如果成员变量使用final关键字修饰后，这个变量也是不可变的
  2. **不允许有setter方法**
  3. 由于成员变量具有默认值，所以用了final之后必须手动赋值，**不会再给默认值**了
  4. 对于final修饰的成员变量，要么直接赋值，要么通过构造方法赋值
  5. 如果选择构造方法赋值，必须保证每个重载形式的构造方法都能对final修饰的成员变量进行赋值
- 提高效率
  - **使用final方法的原因有两个。第一个原因是把方法锁定，以防任何继承类修改它的含义；第二个原因是效率。在早期的Java实现版本中，会将final方法转为内嵌调用。但是如果方法过于庞大，可能看不到内嵌调用带来的任何性能提升。在最近的Java版本中，不需要使用final方法进行这些优化了。**
  - **final关键字提高了性能。JVM和Java应用都会缓存final变量，优化字符串拼接，当字符串变量是final的，那么在拼接的时候会认为这是一个常量**
  - **final变量可以安全的在多线程环境下进行共享，而不需要额外的同步开销**
  - 提升幅度几乎没有，不应该为了这么丝许的性能而绞尽脑汁。《Effective Java》中的第55条：**谨慎地进行优化中所指出的核心：优化的格言就是：不要进行优化**) 
  - 更多的提升都在编译阶段。方法参数与局部变量用final修饰是纯编译时信息，到Class文件里就已经没有踪迹了，JVM根本不会知道方法参数或者局部变量有没有被final修饰。这个是完全不可能影响性能的
  - `final`基于清晰的设计和可读性而不是出于性能原因而使用

### abstract

- 修饰类，该类为抽象类
- 修饰方法，该方法为抽象方法，但抽象方法必须在抽象类或接口中
  1. 没有方法体
  2. 交由子类来实现该方法

### native

- 修饰方法
  1. 没有方法体
  2. 交由操作系统来实现该方法

### 权限修饰符对应的访问范围

|              | public | protected | (默认) | private |
| :----------: | :----: | :-------: | :----: | :-----: |
|   同一个类   |   √    |     √     |   √    |    √    |
|   同一个包   |   √    |     √     |   √    |    ×    |
|  不同包子类  |   √    |     √     |   ×    |    ×    |
| 不同包非子类 |   √    |     ×     |   ×    |    ×    |

定义类时，权限修饰符规则：

1. 外部类：public / (default)
2. 成员内部类：public/ protected / () / private
3. 局部内部类：什么都不能写

### 类、方法、变量可用的修饰符

|        修饰符        |  类  | 成员方法 | 构造方法 | 成员变量 | 局部变量 |
| :------------------: | :--: | :------: | :------: | :------: | :------: |
|       abstract       |  √   |    √     |    一    |    -     |    一    |
|        static        |      |          |          |          |          |
|        final         |      |          |          |          |          |
|    native(本地的)    |      |          |          |          |          |
|  transient(瞬时的)   |      |          |          |          |          |
| synchronized(同步的) |      |          |          |          |          |
|   volatile(易失的)   |      |          |          |          |          |
|        public        |      |          |          |          |          |
|      protected       |      |          |          |          |          |
|       private        |      |          |          |          |          |



### 封装

两个手段

1. 方法。用方法把一些逻辑封装起来
2. private。把一些不想暴露出去的属性或方法用private关键字修饰

### 继承

1. 继承是多态的前提，没有继承就没有多态
2. 解决的主要问题：共性抽取
5. 成员变量
   1. 直接写变量名：访问方法内局部变量
   2. this.变量名：访问本类中的成员变量
   3. super.变量名：访问父类中的成员变量
   4. 访问成员变量（遵循就近原则）：
      1. 直接访问：直接通过子类访问，谁调用就优先用谁，没有则向上查找父类的
      2. 间接访问：通过子类的成员方法访问，该方法属于谁就优先用谁，没有则向上找
6. 成员方法
   1. 与成员变量前三条规则相同
   2. 重写与重载：
      1. 重写（Override）：方法名称一样，参数列表一样
      
      2. 重载（Overload）：方法名称一样，参数列表不一样
      
      3. 参数列表包括：参数类型、顺序、数量
      
      4. 注意：两个方法名称一样，不管参数列表是否一样，返回值不允许相同
      
      5. `@Override`起到安全检测的作用，是否达到了重写的目的，不写也没问题
      
      6. 子类方法的访问权限必须大于等于父类方法访问权限
      
         > public > protected > 什么都不写 > private
      
      7. 子类方法的返回值必须小于等于父类方法的返回值范围(换言之就是返回值类型要相同或者是其子类)
      
      8. 子类方法不能抛出新的异常或者比父类方法声明的异常更广的检查异常。但是可以抛出更少，更有限或者不抛出异常。
8. 构造方法：
   1. 子类构造方法中有一个默认隐藏的 super() 调用，即无论如何都会先调用父类无参构造，再执行子类的构造方法
   2. 子类构造可以通过super关键字来调用父类重载构造
   3. super的父类构造必须是子类构造方法中的第一句，不能一个子类构造调用多次super构造
   4. 子类必须调用父类构造方法，不写则赠送super()；写了则用写了的super调用，super只能有一个，而且必须是第一句
9. 继承特点
   1. Java是单继承的。一个类的直接父类只有一个，但接口可以多继承
   2. Java可以多级继承。一个类的直接父类也可以有父类
   3. 一个子类的直接父类是唯一的，但是一个父类可以拥有多个子类

### 多态

多种形态，一个对象拥有子类形态，也拥有父类形态

1. 格式：父类名称 对象名 = new 子类名称();  接口名称 对象名 = new 实现类名称();   父类引用指向子类对象
2. 使用：
   1. 使用成员方法成员对象，看的是右边，new的谁就用谁
   2. 编译看左，运行看右
   3. 成员变量访问特点：使用多态之后访问成员变量和平常没有任何变化
   4. 成员方法访问特点：使用多态之后访问成员方法和平常没有任何变化
3. 使用好处：无论右边new的时候换成哪个子类对象，等号左边调用方法都不会发生改变。左边代码不变，只需关心等号右边的子类，方法调用也不用变，使得代码更加灵活
4. 转型
   1. 向上转型：其实就是多态写法
      1. 格式：父类名称 对象名 = new 子类名称();
      2. 含义：创建一个子类对象，把他当作父类来看待使用
      3. 向上转型一定是安全的。小范围->大范围
      4. 弊端：由于编译看左，运行看右；对象一旦向上转型为父类那么就无法调用子类特有的内容。
   2. 向下转型：向上转型的【还原】的动作，本来是什么才能还原成什么
      1. 格式：子类名称 对象名 = (子类名称) 父类对象;
      2. 含义：将父类对象【还原】成本来的子类对象
      3. 本来是什么才能还原成什么，否则会抛出ClassCastException
5. 类型判断：如何知道一个父类引用的对象，本来属于什么子类？  instanceof
   1. 格式：对象 instanceof 类名称
   2. 返回值：boolean，判断类型判断是否正确，正确为true，错误为false
   3. 向下转型前一定要先用instanceof判断类型，否则发生异常

### 抽象类

1. 抽象方法格式：`public abstract void method();` 

2. 抽象类格式：`public abstract class Demo{...}`

3. 抽象方法必须要在抽象类中，但是抽象类中可以用普通的方法
4. 使用
   1. 不能直接创建抽象类对象，必须用一个子类来继承抽象父类
   2. 子类格式：`public class 子类名称 extends 父类`
   3. 子类必须重写父类中所有的抽象方法
   4. 如果子类没有重写抽象类中所有抽象方法，那么这个子类必须是抽象类
5. 抽象方法(被`abstract`修饰)不能用`private`、`static`、`synchronized`、`native`修饰
   1. 抽象方法没有方法体，是用来被继承的，所以不能用`private`修饰
   2. `static`修饰的方法可以通过类名来访问该方法，抽象方法没有方法体，这么访问是没有意义的
   3. `abstract`是把这个方法的实现交给子类，`native`是把这个方法的实现交给操作系统，两者互斥
6. 抽象类中的抽象方法默认访问权限是`default`

### 接口

1. 接口是一种**特殊的抽象类**，接口中的抽象方法的abstract可以省略
2. 接口是一种引用类型，最重要的内容就是其中的抽象方法
3. 接口格式：`public interface Name {...}`
4. 接口内容：
   1. 接口**没有静态代码块**和**构造方法**
      - 因为构造方法必须要有方法体，但是不属于默认、静态、私有方法，而又不允许有方法体
   2. java7
      1. 常量 
      2. 抽象方法
   3. java8
      1. 常量
      2. 抽象方法
      3. 默认方法
      4. 静态方法
   4. java9
      1. 常量
      2. 抽象方法
      3. 默认方法
      4. 静态方法
      5. 私有方法
   5. 除了**抽象方法**其他默认方法、静态方法、私有方法都有方法体
5. 使用
   1. 接口不能直接使用，必须要有一个实现类
      1. 具体的实现类，格式：`public class 实现类名称 implements 接口 `
      2. 匿名内部类，格式：`new 接口 {...实现接口中每一个方法}`
   2. 实现类**必须重写（实现）**接口中所有的**抽象方法**
   3. 如果实现类并没有重写接口中所有的抽象方法，那么这个实现类自己必须是抽象类
   4. 接口的成员变量
      1. 格式： `public static final 数据类型 名称 = 值`，从效果上看其实就是常量，一旦赋值不可修改
      2. 接口中的常量初始化时必须赋值，**因为没有构造方法**
   5. 接口的抽象方法
      1. 格式：`public abstract 返回值 方法名 (参数);`
      2. 修饰的关键字必须是这两个，`public`和`abstract`可以省略
      3. 抽象方法不能用`private`和`protected`修饰
         1. 抽象方法就是用来被实现的，所以不能用`private`
         2. 接口可以让所有的类去**实现(非继承)**，所以不能用`protected`
   6. Java8默认方法
      1. 格式：`public default 返回值 方法名（参数）{}`
      2. 用处：接口中的默认方法可以**解决接口升级的问题**。例如：接口A新加了一个方法，实现类B、实现类C本来已经实现了接口A中所有的方法，由于接口A新加了方法，导致实现类B、实现类C都报错，而且贸然改会产生影响，所以需要有默认方法的存在
      3. 默认方法会被实现类继承下去。即实现类可以使用那些默认方法
      5. 接口的默认方法，可以被接口实现类重写
      5. 一个类实现了多个接口，而且这些接口中有重名的默认方法，则这个类**必须重写**这个默认方法
      6. 如果一个类已经继承了某个父类的同时实现了多个接口，父类中含有与接口中默认方法同名的方法，那么此时接口引用会**调用父类的**这个同名方法。
   7. Java8静态方法
      1. 格式：`public static 返回值 方法名（参数）{}`
      2. 只能通过接口来直接调用静态方法，不能通过接口实现类对象来调用接口中的静态方法。原因：一个类可以实现多个接口，如果**每个实现的接口都有同名静态方法**，可能**产生冲突**
   8. Java9私有方法
      1. 两种私有方法：
         1. 普通私有方法，解决多个默认方法之间的重复代码：`private 返回值 方法名（参数）{}`
         2. 静态私有方法 ，解决多个静态方法之间的重复代码：`private static 返回值 方法名（参数）{}`
      2. 出现背景：需要抽取一个共有方法，用来解决两个默认方法之间重复代码的问题，但是这个方法不应该让实现类使用，应该是私有的
   9. 类与接口的关系
      1. 类与类之间是单继承的，直接父类只有一个
      2. 类与接口之间是多实现的，一个类可以实现多个接口
         1. 格式：public class MyInterfaceImpl implements MyInterfaceA, MyInterfaceB {重写所有方法}
         2. 如果实现类没有重写所有接口中的所有抽象方法，那么实现类必须是一个抽象类
         3. 如果实现类所实现的多个接口中，存在重复的抽象方法，那么只需重写一次即可
         4. 如果实现类所实现的多个接口中，存在重复的默认方法，那么一定要对冲突的默认方法进行重写
         5. 如果实现类中的直接父类和接口中的默认方法重复，那么优先使用直接父类的方法
      3. 接口与接口之间是多继承的，一个接口可以继承多个接口
         1. 格式：public interface MyInterface extends MyInterfaceA, MyInterfaceB { }
         2. 如果父接口中存在重复的抽象方法，那么它的实现类只需实现一次即可，因为只是重名，没有方法体
         3. 如果父接口中存在重复的默认方法，那么子接口必须进行默认方法的重写，而且也必须是一个默认方法，即带上default关键字

### 内部类

分成两类：

1. 成员内部类：

   1. 定义格式：

      ```java
      public class outerClassName {
          修饰符 class innerClassName {
              //...
          }
          //...
      }
      ```

   2. 访问：内部用外部，随意访问；外部用内部，一定需要借助内部类对象

   3. 间接使用：在外部类的方法中，使用内部类，然后main方法只是调用外部类的方法

   4. 直接使用：公式：外部类名称.内部类名称 对象名 = new 外部类名称().new 内部类名称();

2. 局部内部类（包含匿名内部类）：定义在方法内部，只有当前所属的方法才能使用他，外面无法调用

   1. 定义格式：

      ```java
      public class outerClassName {
          修饰符 返回值 methodName(parameter) {
              class innerClassName {
                  //...
              }
          }
      }
      ```

   2. 区别：成员在方法外面，局部在方法里面

   3. 只能在方法内部使用内部类

   4. 局部内部类如果希望访问所在方法的局部变量，那么这个局部变量必须是**有效final的**，即**显示声明fina**l或**只赋值一次**。从jdk8开始，只要局部变量事实不变，那么final关键字可以省略。

3. 如果内部类变量出现同名：

   1. 局部变量，直接引用
   
   2. 内部类成员变量，this.变量
   
   3. 外部类成员变量，外部类.this.变量
   
      ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrplbpz3j30eu0att92.jpg)
   
4. **匿名内部类**：

   1. 如果接口的实现类（或者是父类的子类）只需要使用唯一的一次，那么这种情况下就可以省略掉该类的定义，而改为使用【匿名内部类】。

   2. 定义格式：

      ```java
      MyInterface mi = new MyInterface() {
          @Override
          public void method1() {
              System.out.println("匿名内部类实现了方法 111");
          }
   
          @Override
       		public void method2() {
              System.out.println("匿名内部类实现了方法 222");
          }
      };
      mi.method1();
      mi.method2();
      //{}内是匿名内部类的内容
      ```
   
   3. 匿名内部类使用场景：如果接口使用唯一一次，那么可以，如果需要使用多次，那么需要单独定义实现类
   
   4. 使用匿名对象，定义完直接是一个对象，直接调用方法
   
      ```java
      new MyInterface() {
          @Override
          public void method1() {
              System.out.println("匿名内部类实现了方法 111");
          }
      
          @Override
          public void method2() {
              System.out.println("匿名内部类实现了方法 222");
          }
      }.method1();
      ```
   
   5. 如果希望同一个对象，调用多次方法，那么必须给这个匿名对象起个名字
   
   6. 匿名内部类是省略了【实现类/子类】，匿名对象是省略了【对象名称】。注意区分

### 匿名对象

- 初始化：new 类名(); 没有左边的名字和赋值语句
- 匿名对象只能使用唯一的一次，下次再使用就必须再创建一个新的对象

### 泛型

- 好处

  1. 避免了类型转换的麻烦
  2. 把运行期的异常提升到编译器
  3. 当具体的类型确定后，泛型又提供了一种类型检测的机制，只有相匹配的数据才能正常的赋值，否则编译器就不通过。它是一种类型安全检测机制，一定程度上提高了软件的安全性防止出现低级的失误。
  4. 泛型提高了程序代码的可读性，不必要等到运行的时候才去强制转换

- 弊端：泛型什么类型，只能存储什么类型

- 泛型类

  ```java
  修饰符 class<泛型> {
    ...
  }
  ```

- 定义含有泛型的方法

  - 格式：

    ```java
    public <泛型> 返回值类型 方法名 (参数列表(使用泛型)) {
    	// 方法体
    }
    ```

  - 调用的时候确定泛型的类型，参数是什么类型，泛型就是什么类型

- 泛型类和泛型方法共存的情况

  ```java
  public class Test1<T>{
   
     public  void testMethod1(T t){
         System.out.println(t.getClass().getName());
     }
     public  <E> E testMethod2(E e){
         return e;
     }
  }
  
  
  //虽然<E>可以写成<T>，即使这样泛型方法的泛型和本类中的泛型也是不相关的，一般写成<E>以免混淆
  ```

  

- 含有泛型的接口的使用方式

  1. 定义接口实现类，实现接口并指定接口的泛型

     ```java
     public interface Iterator<E> {
       E next();
     }
     
     //Scanner类实现了Iterator接口，并指定泛型为String
     public final class Scanner implements Iterator<String> {
       public String next();
     }
     ```

  2. 定义接口实现类，实现接口并沿用接口的泛型，在创建对象的时候指定类型

     ```java
     public interface List<E> {
       boolean add(E e);
       E get(int index);
     }
     
     //ArrayList实现了List接口但并未指定泛型的类型
     public class ArrayList<E> implements List<E> {
       //...
     }
     ```

- 泛型通配符

  - ?:代表任意的数据类型
  
  - 不能创建对象时使用，定义时不能使用，只能作为方法参数使用
  
  - 泛型上限
    - 格式：类型名称 <? extends 类> 对象名称
    - 只能接受该类型及其子类
    
  - 泛型下限
    - 格式：类型名称 <? super 类> 对象名称
    - 只能接受该类型及其父类
    
  - ```java
    public void printArray(ArrayList<?> list) {
      Iterator<?> it = list.iterator();
    }
    ```
    
  - 一般而言，通配符能干的事情都可以用类型参数替换
  
- 类型参数

  - T：代表一般类型
  - E：代表Element的意思，或者Exception异常的意思
  - K：代表Key的意思
  - V：代表Value的意思
  - *S：代表SubType的意思

- **泛型擦除**，泛型信息只存在于代码编译阶段，在进入 JVM 之前，与泛型相关的信息会被擦除掉。在泛型类被类型擦除的时候，之前泛型类中的类型参数部分如果没有指定上限，如`<T>`则会被转译成普通的 Object 类型，如果指定了上限如`<T extends String>`则类型参数就被替换成类型上限。

  ```java
  public class Erasure <T>{
     T object;
   
     public Erasure(T object) {
         this.object = object;
     }
   
     public void add(T object){
   
     }
  }
  ```

  ```java
  Erasure<String> erasure = new Erasure<String>("hello");
  Class eclz = erasure.getClass();
  Method[] methods = eclz.getDeclaredMethods();
  for ( Method m:methods ){
     System.out.println("method:" + m.toString());
  }
  //method:public void com.frank.test.Erasure.add(java.lang.Object)
  
  //所以调用add方法应该调用 getDeclaredMethod("add",Object.class) 否则程序会报错，提示没有这么一个方法，原因就是类型擦除的时候，T 被替换成 Object 类型了，这时可以通过反射的方法来add不同类型的数据进去
  ```

## String

- 任意“**”都算是new了一个String对象

- 字符串是常量，创建后就不能更改。字符串可以共享，只要内容相同，那就是同一个

- String底层是一个`char[]`，实现是用`byte[]`

- **String为什么是不可变的？因为String底层是一个私有的`char[]`类型的value，并且没有提供set方法去改变这个value，所以外部无法改变；另外这个value也用了final关键字修饰，一旦赋值就无法改变，所以String内部无法修改这个value**

- 创建字符串常见四种方式： 三种构造方法，一种直接构建
  1. `String(); `//创建一个空白字符串
  2. `String(char[] array);` //根据一个字符数组来创建字符串
  3. `String(byte[] array); `//根据一个字节数组来创建字符串
  4. 直接双引号创建
  
- 字符串常量池：当程序中**直接写上的双引号**字符串，才在字符串常量池中。
  - 对于基本类型来说，==是进行数值的比较
  - 对于引用类型来说，==是进行地址值的比较
  
- 常用方法
  
  ```java
  boolean equals(Object object);
  //如果两个字符串的内容完全一样，返回true
  //1.equals具有对称性，a.equals(b)的效果与b.equals(a)的效果一样
  //2.比较时推荐常量写在equals前面，变量写在后面。原因：假如变量被赋予一个null值，调用此方法就会引发空指针异常
  
  boolean equalsIgnoreCase(String str);
  //忽略大小写的比较
  //参数必须是字符串
  
  int length();
  //获取字符串长度
  
  String concat(String str);
  //字符串拼接，返回新的字符串
  
  char charAt(int index);
  //获取指定索引位置的单个字符(索引从0开始)
  
  int indexOf(String str);
  //查找字符串首次出现的索引位置，如果没有，返回-1
  
  String substring(int begin);
  //从索引到末尾截取字符串
  
  String substring(int begin, int end);
  //截取字符串，左闭右开
  
  char[] toCharArray();
  //把当前字符串拆分成字符数组
  
  byte[] getBytes();
  //获取当前字符串的底层字节数组
  
  String replace(CharSequence oldString, CharSequence newString);
  //字符串的替换
  
  String[] split(String regex);
  //切割字符串
  //注意 regex是正则表达式，切割英文句点时要注意：\\.
  //如果没有找到切割的字符串返回一个长度为1的原字符串
  
  int compareTo(Stirng str);
  //比较两个字符串的大小
  String s = "hallo";
  String s2 = "ha";
  String s3 = "haeeo";
  int a = s.compareTo(s2);
  System.out.println("a:"+a);
  int b = s.compareTo(s3);
  System.out.println("b:"+b);
  int c = s2.compareTo(s3);
  System.out.println("c:"+c);
  
  //a：3。因为在[0,1]区间上，大家内容都相同，而s2长度只有2，即s2仅有的前两位和s的前两位恰恰完全相同，所以直接用s的长度-s2的长度，因为是s.compareTo(s2)，5-2=3
  //b：7。大家在第3个位置发生差异，所以直接用s的第3位字符与s3的第3位字符的ASCII相减，结果为：l-e=7
  //c：-3。原理和a相似
  ```
  
- 小问题

  - String s = "123" + "456"内存中产生几个字符串对象？

    - 编译器在编译的时候会进行优化，把"123" "456"拼接成"123456"，如果此时常量池中没有"123456"，则产生1个，如果有，则产生0个

  - 如果spilt()函数的参数在要分割的字符串中没有怎么办？如String s = "helloworld" ,我现在调用String[] s2 = s.spilt("abc")，返回什么？

    - 返回整个源字符串，说明当遇到源字符串中没有的字符时，会把它整个串放入到数组中。

  - 字符串自动转换分析

    ```java
    int i = 2;
    int j = 3;
    String s = "9";
    System.out.println(i+j+s);		//59
    System.out.println("-----------------------");
    System.out.println(i+s+j);		//293
    
    //如果数字和字符串连接，只在字符串前的位置发生连接，一旦发生与字符串连接，后续所有运算都不生效了，直接连接；前面的按正常情况运算
    ```


## StringBuilder

- 字符串缓冲区，可以提高字符串的操作效率（可以看成是一个长度可以变化的字符串）

- 底层数组没有被final修饰，初始长度16；如果超出容量，会自动扩容

- 在内存中始终是一个数组，占用空间少，效率更高

- **线程不安全**，效率更高

- 构造方法
  ```java
  public StringBuilder();	//默认开辟16个字符长度的空间
  public StringBuilder(int capacity);	//开辟capacity个字符长度的空间
  public StringBuilder(String str);	//开辟str.length+16个字符长度的空间
  public StringBuilder(CharSequence seq);	//开辟seq.length+16个字符长度的空间
  ```
  
- 常用成员方法
  - StringBuilder append(....); // 添加字符串数据，可以添加任意类型数据，返回StringBuilder本身，无需接收返回值
  - String toString();  //  转换成String对象
  
- 与String相互转换
  - String->StringBuilder：StringBuilder stringBuilder = new StringBuilder(str);
  - StringBuilder->String：String str = stringBuilder.toString();
  
- **String、StringBuilder、StringBuffer三者区别**

  - 可变性：StringBuilder和StringBuffer是可变的，String是不可变的。原因：final修饰，一旦赋值不可以修改。目的：为了安全性考虑；String作为HashMap的key时；路径；反射的全类名，如果String是可变的，那么会有问题
  - 线程安全性：StringBuffer的方法中加了同步锁，所以是线程安全的；StringBuilder没有加锁，是线程不安全的
  - 性能方面：StringBuffer加了锁，导致性能变差；StringBuilder没有加锁，性能较于StringBuffer来说性能比较好；String每次都会生成新的对象，性能更差一点。Buffer和Builder都不会生成新的对象，比String来说效率更高
  - 于我来说：操作少量数据：String；单线程操作大量数据：StringBuilder；多线程操作大量数据：StringBuffer

## StringBuffer

- 构造方法

  ```java
  public StringBuffer();	//默认开辟16个字符长度的空间
  public StringBuffer(int capacity);	//开辟capacity个字符长度的空间
  public StringBuffer(String str);	//开辟str.length+16个字符长度的空间
  public StringBuffer(CharSequence seq);	//开辟seq.length+16个字符长度的空间
  ```

- 成员方法

  ```java
  public synchronized int length();	//获取当前字符串长度（内容长度）
  public synchronized int capacity();	//获取当前缓冲区长度（数组长度）
  public boolean equals(Object object);	//比较两者是否相等，注意，StringBuffer没有重写equals方法，所以调用的还是Object中的equals方法，只有两者地址值和内容相等才返回true
  public synchronized void trimToSize();	//将多余的缓冲区空间释放出来,比如缓冲区现在大小是28，但是字符串长度只有16，执行此方法，可以把缓冲区大小减少到16
  ```

- **线程安全**

## Object

- 每个类都使用Object作为父类，所有对象（包括数组）都实现了这个类的方法

- 

  ```java
  //特点：没有方法体
  //native：调用本地操作系统的方法
  //哈希值由操作系统给出一个整数值
  public native int hashCode();
  
  //拼接类名+@+hasCode的16进制值；直接打印对象的名字，就是调用对象的toString()方法
  public String toString() {
    return getClass().getName() + '@' + Integer.toHexString(hashCode());
  }
  
  //比较两个对象之间地址值是否相等
  public boolean equals(Object var1) {
    return this == var1;
  }
  ```

- equals和hashCode

  - 两个obj，如果`equals()`相等，则`hashCode()`一定相等。（因为不重写equals的话，默认比较两者地址值；hashCode就是获取对象的地址值）
  - 两个obj，如果`hashCode()`相等，但`equals()`不一定相等。（String重写了equals方法，如果两个对象的内容相同，那么equals返回true；但是是两个对象，地址值一定不同）
  - 两个obj，如果`equals()`不相等，但`hashCode()`可能相等。（哈希冲突）


## 常用类、API

1. 导包：import
2. 创建：看构造方法
3. 使用：看成员方法

### Scanner

- 导包：位于java.util包内，使用时需要导包，只有位于java.lang包下的类不用导入
- 创建：Scanner sc = new Scanner(System.in);    System.in表示从键盘输入
- 使用：sc.nextInt();//获取数字，sc.next();//获取字符串 **遇到空格、tab、回车结束**

### Random

- 导包：java.util.Random;
- 创建：Random random = new Random();
- 使用：random.nextInt(); //获取随机数 random.nextInt(bound); //获取数值范围：[0,bound)

### Arrays

- 导包：java.util.Arrays

- 常用方法：
  
  ```java
  static String toString(数组);  //将数组变成字符串 格式：[元素1，元素2，元素3]
  
  static void sort(数组);  //按照默认升序排序。 如果是数值，sort默认按照从小到大排序；如果是字符串，sort默认按字母升序；如果是自定义类型，那么这个自定义类型需要有Comparable或者Comparator接口支持。
  
  static List<T> asList(T... a); // 返回由指定数组支持的固定大小的列表。此方法作为基于数组和基于集合的API之间的桥梁，与Collection.toArray()结合使用。返回的List是可序列化并实现RandomAccess接口。
  
  ```
  
  
  - static String toString(数组);  //将数组变成字符串 格式：[元素1，元素2，元素3]
  - static void sort(数组);  //按照默认升序排序。 如果是数值，sort默认按照从小到大排序；如果是字符串，sort默认按字母升序；如果是自定义类型，那么这个自定义类型需要有Comparable或者Comparator接口支持。
  - `static List<T> toList(T... a)`：将数组转为集合，注意：传入的必须是对象数组，因为这个是泛型方法，

### Math

- 导包：java.util.Math
- 常用方法：
  - static double abs(double num)：获取绝对值
  - static double ceil(double num)：向上取整
  - static double floor(double num)：向下取整
  - static long round(double num)：四舍五入
  - 注意区分：float强转int，自动舍弃小数位，无论正数负数。
- 常量：
  - static final double PI：近似圆周率Π

### Objects

其中的静态方法都是**空指针安全的**

- equals方法(防止空指针异常的做法：传需要比较的两个参数，在方法体里面判定)。推荐用这个方法或`常量.equals(变量)`，以避免空指针异常

  ```java
  public static boolean equals(Object a, Object b) {
      return (a == b) || (a != null && a.equals(b));
  }
  ```
  
- 非空判断，查看指定引用对象是否是null

  ```java
  public static <T> T requireNonNull(T obj) {
    if (obj == null) {
      throw new NullPointerException();
    }
    return obj;
  }
  ```


### System

- 导包：java.lang.System（无需导包）

- 常用方法

  - static long currentTimeMillis();  // 返回以毫秒为单位的当前时间

  - static void arraycopy(Object src, int srcPos, Object dest, int destPos, int length); // 数组复制 

    参数：源数组；源数组起始位置；目标数组；目标数组起始位置；复制元素的长度

## 日期时间API

### JDK8前

#### Date

日期时间类

- 构造方法
  1. Date();  //获取当前系统的**日期和时间**
  2. Date(long date);  //传递毫秒值（从1970年开始计算的），把毫秒值转化为**日期和时间**
- 常用成员方法
  - long getTime();  //返回1970年到现在的**毫秒值**

#### Calendar

日历类

- **抽象类**。提供了许多操作日历字段的方法。用于方便获取各个时间属性。

- 新建：无法直接创建对象使用，但是可以通过一个静态方法getInstance()，返回一个Calendar子类GregorianCalendar对象

  ```java
  Calendar instance = Calendar.getInstance();
  ```

- 注意：其中日历字段的月（0-11）与现实的月（1-12）不一样

- 常用成员方法 field:日历类字段（YEAR、MONTH等）

  - int get(int field);  //返回给定日历字段的值
  - void set(int field, int value); // 设置给定日历字段的值 (有多种重载形式，可以一次性设置年月日等)
  - abstract void add(int field, int amout); //根据日历字段添加或减去特定的时间量
  - Date getTime();  // 日历对象转时间对象

#### DateFormat

- 导包：java.text.DateFormat(**抽象类**，不能直接new)

- 两个功能：

  1. 格式化（日期->文本）（Date->String）
  2. 解析（文本->日期）（String->Date）

- 成员方法

  1. String format(Date date);    //按照指定的模式，把日期格式化为符合模式的字符串

     ```java
     SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
     Date date = new Date();
     String format = simpleDateFormat.format(date);
     ```

  2. Date parse(String source);    //把符合模式的字符串，解析为日期。注意：如果字符串和构造方法中模式不一样，那么程序就会抛出异常（ParseException）。

     ```java
     SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
     String source = "2019-10-21 17:54:02";
     Date date = simpleDateFormat.parse(source);
     ```


##### SimpleDateFormat

- 用于创建DateFormat对象

- 构造方法：

  - SimpleDateFormat(String pattern);    //用给定的模式和默认的语言环境的日期格式符号构造

  - 模式

    | 标识（区分大小写） | 含义           |
    | ------------------ | -------------- |
    | y                  | 年             |
    | Y                  | Week year      |
    | M                  | 月             |
    | d                  | 日             |
    | H                  | 24小时制的小时 |
    | h                  | 12小时制的小时 |
    | m                  | 分             |
    | s                  | 秒             |

  - 常用：yyyy-MM-dd HH:mm:ss

  - **注意区分yyyy与YYYY**：y：正经的年；Y：当天所在的周属于的年份，一周从周日开始，周六结束，只要本周有跨年（无论是仅仅周六跨年），那么这周都算入下一年

### JDK8后

#### 旧的日期API存在的问题

因为Date、Calendar易用性差

SimpleDateFormat也是线程不安全，format方法使用了全局成员变量calendar，parse方法调用了 alb.establish(calendar)，其中完成了1.重置日期对象calendar的属性值2.使用calb中属性设置cal3.返回设置好的cal对象，这三步不是原子性操作，会有线程问题

```java
private StringBuffer format(Date date, StringBuffer toAppendTo, FieldDelegate delegate) {
  // Convert input date to time field list
  calendar.setTime(date);
  // ...
}

///////////////

@Override
public Date parse(String text, ParsePosition pos) {
  // ...
  Date parsedDate;
  try {
    parsedDate = calb.establish(calendar).getTime();
    // If the year value is ambiguous,
    // then the two-digit year == the default start year
    if (ambiguousYear[0]) {
      if (parsedDate.before(defaultCenturyStart)) {
        parsedDate = calb.addYear(100).establish(calendar).getTime();
      }
    }
  }
  // ...

  return parsedDate;
}
```



#### LocalData

LocalData只会获取年月日

```java
// 创建 LocalDate
// 获取当前年月日
LocalDate localDate = LocalDate.now();
// 构造指定的年月日
LocalDate localDate = LocalDate.of(2019, 9, 12);
// 获取年
int year = localDate.getYear();
int year = localDate.get(ChronoField.YEAR);
// 获取月
Month month = localDate.getMonth();
int month = localData.getMonthValue();
int month = localDate.get(ChronoField.MONTH_OF_YEAR);
// 获取日
int day = localDate.getDayOfMonth();
int day = localDate.get(ChronoField.DAY_OF_MONTH);
```

#### LocalTime

LocalTime只会获取时分秒

```java
// 创建 LocalTime
// 获取当前时分秒
LocalTime localTime = LocalTime.now();
// 构造制定时分秒
LocalTime localTime = LocalTime.of(14, 14, 14);
// 获取小时
int hour = localTime.getHour();
int hour = localTime.get(ChronoField.HOUR_OF_DAY);
// 获取分
int minute = localTime.getMinute();
int minute = localTime.get(ChronoField.MINUTE_OF_HOUR);
// 获取秒
int second = localTime.getSecond();
int second = localTime.get(ChronoField.SECOND_OF_MINUTE);
```

#### LocalDateTime

LocalDateTime获取年月日时分秒

```java
// 创建 LocalDateTime
LocalDateTime localDateTime = LocalDateTime.now();
LocalDateTime localDateTime = LocalDateTime.of(2019, Month.SEPTEMBER, 10, 14, 46, 56);
// 使用LocalDate和LocalTime来生成LocalDateTime
LocalDateTime localDateTime = LocalDateTime.of(localDate, localTime);
LocalDateTime localDateTime = localDate.atTime(localTime);
LocalDateTime localDateTime = localTime.atDate(localDate);
// 获取LocalDate
LocalDate localDate = localDateTime.toLocalDate();
// 获取LocalTime
LocalTime localTime = localDateTime.toLocalTime();
```

#### Duration

Duration表示一个时间段，可以用来计算这段时间的天数、小时数等

```java
// Duration.between()方法创建 Duration 对象
LocalDateTime from = LocalDateTime.of(2017, Month.JANUARY, 1, 00, 0, 0);    // 2017-01-01 00:00:00
LocalDateTime to = LocalDateTime.of(2019, Month.SEPTEMBER, 12, 14, 28, 0);     // 2019-09-15 14:28:00
Duration duration = Duration.between(from, to);     // 表示从 from 到 to 这段时间
long days = duration.toDays();              // 这段时间的总天数
long hours = duration.toHours();            // 这段时间的小时数
long minutes = duration.toMinutes();        // 这段时间的分钟数
long seconds = duration.getSeconds();       // 这段时间的秒数
long milliSeconds = duration.toMillis();    // 这段时间的毫秒数
long nanoSeconds = duration.toNanos();      // 这段时间的纳秒数
```

#### 对日期时间操作

LocalDate、LocalTime、LocalDateTime 为不可变对象，修改这些对象对象会返回一个副本

```java
LocalDateTime localDateTime = LocalDateTime.of(2019, Month.SEPTEMBER, 12, 14, 32, 0);
// 增加一年
localDateTime = localDateTime.plusYears(1);
localDateTime = localDateTime.plus(1, ChronoUnit.YEARS);
// 减少一个月
localDateTime = localDateTime.minusMonths(1);
localDateTime = localDateTime.minus(1, ChronoUnit.MONTHS);  
// 通过with修改某些值
// 修改年为2020
localDateTime = localDateTime.withYear(2020);
localDateTime = localDateTime.with(ChronoField.YEAR, 2020);
// 时间计算
// 获取该年的第一天
LocalDate localDate = LocalDate.now();
LocalDate localDate1 = localDate.with(firstDayOfYear());
```

#### TemporalAdjusters

工具类，包含一些直接获取特定日期时间的方法

| 方法名              | 描述                       |
| ------------------- | -------------------------- |
| dayOfWeekInMonth    | 返回同一个月中每周的第几天 |
| firstDayOfMonth     | 返回当月的第一天           |
| firstDayOfNextMonth | 返回下月的第一天           |
| firstDayOfNextYear  | 返回下一年的第一天         |
| firstDayOfYear      | 返回本年的第一天           |
| firstInMonth        | 返回同一个月中第一个星期几 |

#### DateTimeFormatter

用于格式化日期和，和 SimpleDateFormat 相比，DateTimeFormatter 是线程安全的

```java
LocalDate localDate = LocalDate.of(2019, 9, 12);
// 格式化成yyyyMMdd格式
String s1 = localDate.format(DateTimeFormatter.BASIC_ISO_DATE);
// 格式化成yyyy-MM-dd格式
String s2 = localDate.format(DateTimeFormatter.ISO_LOCAL_DATE);
// 自定义格式化
DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy_MM-dd");
String s3 = localDate.format(dateTimeFormatter);

// 用特定的格式把字符串转换成日期
LocalDate localDate = LocalDate.parse("20190912", DateTimeFormatter.BASIC_ISO_DATE);
LocalDate localDate = LocalDate.parse("2019-09-12", DateTimeFormatter.ISO_LOCAL_DATE);
```

## 数据结构

### Stack：栈

- 特点：先进后出
- 栈的入口出口都是栈顶，仅允许在一端进行插入和删除

```java
//定义
Stack<E> stack = new Stack<>();
//API
E push(E item); //入栈
E pop(); //栈顶元素出栈
E peek(); //拿到栈顶元素，但无须出栈
boolean empty(); //判断栈是否为空
```

### queue：队列

- 特点：先进先出
- 队列的入口出口各占一侧，仅允许在队列的一端进行插入，在另一端进行删除

### Array:数组

- 特点：查询快，增删慢
- 增删慢原因：数组长度是固定的，想要增删元素必须要创建一个新数组，把源数组的数据复制过来。源数组变量指向的地址值更新，改为指向新数组，源数组被垃圾回收。在堆内存中，频繁地创建数组，复制数组中的元素，销毁数组，效率低下。

### LinkedList：链表

- 结构：每个结点包括两部分：存储数据元素的数据域，存储下一个结点地址的指针域。多个结点之间通过地址进行连接。 
- 特点：查询慢，增删快
- 查询慢原因：链表中的地址不是连续的，每次查询元素，都必须从头开始查询
- 增删快原因：链表增加删除元素，对链表元素没有影响，所以速度快

### 树

- 二叉树：每个结点的子节点不超过两个的树

- 排序树/查找树：在二叉树的基础上，左子树小，右子树大

  - 采用二分法查询，查询速度非常快

  - 若它的左子树不空，则左子树上所有节点的值均小于它的根节点的值；

    若它的右子树不空，则右子树上所有节点的值均大于它的根节点的值；

    它的左右子树也分别为二叉排序树。

- 平衡树：左子树上所有节点的数目与右子树上所有节点的数目相等

- AVL树：能自动平衡的二叉查找树，平衡条件：每个结点的左右子树的高度之差的绝对值最多为1。

- *红黑树：趋近于平衡的二叉查找树，查询速度非常快，查询叶子节点最大次数和最小次数不能超过2倍

  - 节点可以是红/黑
  - 根节点黑色
  - 叶子节点黑色
  - 每个红色的节点的子节点都是黑色的(换言之：不允许出现两个连续的红色节点)
  - 任何一个节点到每一个**叶子节点**(不允许跨越根节点)的路径上黑色节点数目相同

#### 红黑树

##### 黑色完美平衡

左子树和右子树的黑结点的层数是相等![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrpne78rj30vg0lux1r.jpg)

##### 搜索

1. 从根节点开始查询，并把根节点作为当前节点
2. 若当前节点为空，返回null
3. 若当前节点不为空，用key和当前节点的key对比
4. 若当前结点key等于查找key，那么该key就是查找目标，返回当前结点
5. 若当前节点key大于查找key，那么把当前结点的左子结点设置为当前结点，重复步骤2
6. 若当前节点key小于查找key，那么把当前节点的右子节点设置为当前节点，重复步骤2

##### 插入

- **用红色节点插入，违规修复的代价更小**。理由很简单，红色在父结点（如果存在）为黑色结点时，红黑树的黑色平衡没被破坏，不需要做自平衡操作。但如果插入结点是黑色，那么插入位置所在的子树黑色结点总是多1，必须做自平衡。
- 步骤
  1. 从根节点开始查询
  2. 若根节点为空，那么插入节点为根节点，结束。
  3. 若根节点不为空，那么把根节点作为当前节点
  4. 若当前结点为null，返回当前结点的父结点，结束
  5. 若当前结点key等于查找key，那么该key所在结点就是插入结点，更新结点的值(value)，结束
  6. 若当前结点key大于查找key，把当前结点的左子结点设置为当前结点，重复步骤4
  7. 若当前结点key小于查找key，把当前结点的右子结点设置为当前结点，重复步骤4

##### 自平衡(旋转、变色)

- 红黑树为空树

  - 把插入节点作为根节点，把节点颜色设置为黑色(红黑色的根节点必须为黑色)

- 插入节点的key已存在

  - 保留原节点的颜色，更新当前节点的value为插入节点的value，实际上就是做了节点值的替换

- 插入节点的父节点为黑色

  - 直接插入

- 插入节点的父节点为红色

  **那么父节点不可能是根节点，肯定存在祖父节点**

  - 叔叔节点存在并且为红色
  - 叔叔节点不存在或为黑色节点，并且插入节点的父节点是祖父节点的左子节点
  - 叔叔节点不存在或为黑色节点，并且插入节点的父节点是祖父节点的右子节点

#### 树的遍历

##### 广度优先(Breath First Search)

- **Level-Order **层次遍历：先访问离根节点最近的节点

##### 深度优先(Deep First Search)

- **Pre-Order** 前序遍历 先访问根再访问子树
- **In-Order** 中序遍历 先访问左子树，再访问根，最后访问右子树
- **Post-Order** 后续遍历 先访问右子树，再访问根，最后访问左子树

#### 二叉查找树的旋转

**设x代表刚插入AVL树中的结点，设A为离x最近且平衡因子更改为2的绝对值的祖先**

- LL旋转：**当x位于A的左子树的左子树上时，执行LL旋转**

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrpoaj9gj314a0tm7wh.jpg)

- RR旋转：**当x位于A的右子树的右子树上时，执行RR旋转**

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrppb6goj31ek0u0e81.jpg)

- LR旋转：当x位于A的左子树的右子树上时，执行LR旋转。设A的左子结点为left，left的右子结点为grandchild。**将left的右子结点指向grandchild的左子结点x，grandchild的左子结点指向left，A的左子结点指向grandchild的右子结点(将grandchild的右子节点指向A)，再将grandchild的右子结点指向A，最后将原来指向A的指针指向grandchild。**

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrpq7kqlj31h80u0qv5.jpg)

- RL旋转：当x位于A的右子树的左子树上时，执行RL旋转。设A的右子结点为right，right的左子结点为grandchild。**将right结点的左子结点指向grandchild的右子结点x，将grandchild的右子结点指向right，将A的右子结点指向grandchild的左子结点(将grandchild左子节点指向A)，将grandchild的左子结点指向A，最后将原来指向A的指针指向grandchild。**

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrpr3hmaj31g40u0npd.jpg)



## Collection单列集合

与数组的区别是：

- 数组的长度是不可变的，集合的长度是可变的
- 数组中存储的是同一类元素，可以存储基本数据类型、引用数据类型。集合存储的都是对象，要存基本数据类型只能用其包装类

单列集合结构图：![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrpreee3j31ni0nstqc-20210912121238781.jpg)



### 通用方法(不带索引)

```java
public boolean add(E e);	//插入元素到集合中
public boolean remove(E e);	//移除元素
public void clear();	//清空集合
public boolean contains(E e);	//判断是否包含特定元素
public boolean isEmpty();	//判断集合是否为空
public int size();		//集合中元素个数
public Object[] toArray();	//把集合的元素存到数组中
//集合重写了toString()方法，直接打印是打印其内容
```

### Iterator：迭代器

好处：屏蔽了集合之间的区别，可以使用相同的方法取出

- 两个常用方法

  1. boolean hasNext();  //判断是否仍有元素可以迭代
  2. E next();  //获取下一个元素

- 注意：Iterator是一个接口，无法正常使用，Collection接口中有iterator()方法，返回在该集合上进行迭代的迭代器。集合是什么泛型，Iterator就是什么泛型。

- 使用步骤

  1. 使用集合中的方法iterator()获取迭代器的实现类对象
  2. 使用Iterator接口中的hasNext()判断有没有下一个元素
  3. 使用Iterator接口中的next()取出集合中下一个元素

- 指针的移动

  - ```java
    Iterator<E> iterator = collection.iterator();
    // 指针指向集合的 -1 索引
    iterator.next();
    // 1.取出下一元素 2.指针向后移动1位
    ```

### for in：增强for循环

- 专门用于数组、集合
- 内部原理依然是Iterator
- 只能遍历，不能增删

### List接口

- 特点

  1. 有序的集合，存储和取出的元素顺序相同
  2. 有索引，包含了带索引的方法
  3. 允许存储重复元素

- 特有方法(带索引)

  ```java
  public void add(int index, E e);	//将元素添加到指定位置
  public E get(int index);	//返回指定索引的元素
  public E remove(int index);		//移除指定索引的元素
  public E set(int index, E e);	//用指定元素替换指定索引的元素
  ```

- 注意事项：操作索引时，一定要防止索引越界异常

#### ArrayList

- 数组一旦创建，那么长度不可以改变，但是ArrayList的长度是可以随意改变的。
- 对于ArrayList来说，有一对尖括号`<E>`代表泛型，泛型只能是引用类型，不能是基本数据类型
- ArrayList查询快，增删慢
- ArrayList底层是Object[] 所以每次插入元素都要新增一个新数组，并复制数据到新数组中
- 对于ArrayList来说add动作一定成功，对于其他集合来说不一定
- ArrayList的实现是不同步 不同步 意味着 多线程 意味着速度快

#### LinkedList

- LinkedList是一个双向链表

  ![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrps8713j31c60lqale-20210912121332088.jpg)

- LinkedList的实现是不同步的

- LinkedList查询慢，增删快

- 含有大量操作首尾元素的方法（特有）

  ```java
  public void addFirst(E e);	//将元素插入到链表开头
  public void push(E e);	//将元素推入链表所示堆栈 作用与addFirst相同
  public void addLast(E e);	//将元素插入到链表尾部
  
  //使用这两个方法前最好先用isEmpty()来判断是否为空，否则报错
  public E getFirst();	//返回链表第一个元素
  public E getLast();		//返回链表最后一个元素
  
  public E removeFirst(E e);	//移除并返回链表第一个元素
  public E pop(E e);	//从链表所示堆栈弹出第一个元素 作用与removeFirst相同
  public E removeLast(E e);	//移除并返回链表最后一个元素
  ```

#### Vector

- 底层是数组
- Vector的实现是同步的，单线程，速度慢
- 早期用Enumeration来充当迭代器遍历这个集合
- jdk1.2后被ArrayList取代

### Set接口

- 特点
  1. 不允许存储重复元素
  2. 没有索引，没有带索引的方法，不能使用普通for循环遍历
- 注意：因为Collection同时是Set（没有索引）、List（有索引）的父类，所以Collection的方法是**没有索引**的，Set接口的方法也没有索引，**因此它的方法就是Collection的方法**，着重学习其子类
- Set集合不允许存储重复元素的原理：set集合在调用add方法时，会调用元素的hashCode方法和equals方法，判断元素是否重复![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrpt18lfj321k0u0u0x.jpg)

#### *HashMap：哈希表

- 哈希值：一个十进制的整数，由系统随机给出（对象的逻辑地址）

- Object类中：

  ```java
  public native int hashCode();
  //特点：没有方法体
  //native：调用本地操作系统的方法
  //哈希值由操作系统给出一个整数值
  ```

  ```java
  public String toString() {
    return getClass().getName() + '@' + Integer.toHexString(hashCode());
  }
  //拼接类名+@+hasCode的16进制值
  ```

  ```java
  //尽管可以重写hashCode
  //但是对象比较的时候是比较物理地址
  //所以不能通过重写hashCode，因为hashCode返回的只是逻辑地址
  ```

- 结构：jdk8:数组+链表、数组+红黑树

  - 数组结构：把元素分组（相同哈希值的元素分为一组）
  - 链表/红黑树结构：把相同哈希值的元素连接到一起
  - 数组-链表结构：![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrptq93tj310y0laak0.jpg)
  - 数组-红黑树结构：如果链表所挂元素超过8个，自动把链表转红黑树，提高查询速度

- 两个元素不同，但哈希值相同，哈希冲突

#### HashSet

- 特点
  1. 底层是哈希表结构，速度很快
  2. 无序集合，不能保证每次遍历元素的顺序
  3. HashSet的实现是不同步的
- HashSet存储自定义类型元素，必须重写hashCode方法和equals方法，否则无法保证唯一性

#### LinkedHashSet

- HashSet子类
- 在HashSet基础上，确保了元素的顺序
- 结构：链表(记录元素存储顺序，保证元素有序)+哈希表



## Collections工具类

### 可变参数

- 格式

  ```java
  public void method(int... params){}
  //完全等价于
  public void method(int[] params){}
  
  //第一种做法传参数可以任意多个，不传递也可以
  //第二种只能传入数组，传参角度看，第一种更灵活
  //可变参数的底层其实就是一个数组，根据传餐数目来创建不同长度的数组
  //编译成.class文件时，自动完成将参数整合成数组再传入
  ```
  
- 注意：

  - 一个方法只能有一个可变参数
  - 如果参数列表有多个参数，那么可变参数要放到末尾

### 常用方法

```java
public static <T> boolean addAll(Collection<T> c, T...elements);//添加多个元素
public static void shuffle(List<?> list);//打乱集合的顺序
public static <T> void sort(List<?> list);//按默认规则排序（升序）
public static <T> void sort(List<?> list, Comparator<? super T>);//按指定规则排序
```

Comparable和Comparator的区别：

- 二者都是接口
- Comparable：自己和传入的对象比较，需要实现比较的规则compareTo方法才能比较
- Comparator：相当于找一个第三方裁判比较两个对象，需要实现compare方法
- 如果自定义类中没有实现Comparable接口，可以在调用排序时传入一个匿名Comparator对象并重写compare
- 比较的方法：最终结果 小于0：第一个小于第二个；大于0: 第一个大于第二个

排序的规则：

- 自己-传入的对象=升序排序
- 传入的对象-自己=降序排序
- 组合排序

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrpuavrfj30p008ijx0.jpg)



## Map双列集合

### 特点

- 双列集合，一个元素包含两个值（key、value）
- key、value的类型可以相同可以不同
- key不允许重复，value可以重复
- key和value是一一对应的

### 常用方法

```java
public V put(K key, V value);	//添加元素
//返回值：key不存在，返回null；key已存在，返回被替换的
public V remove(Object key);	//删除指定元素 返回被删除的元素值
public V get(Object key);			//获取指定元素
public boolean containsKey(Object key);	//判断是否包含指定键
public Set<K> keySet();	//获取Map集合的所有键，存在Set集合中
public Set<Map.Entry<K,V>> entrySet();	//获取Map集合所有键值对，存在Set集合中
```

### 遍历键找值方式

1. keySet()
   1. 使用Set\<K>\ keySet()方法，把集合中的key取出来存到一个Set中
   2. 遍历Set集合，获取Map中每一个key
   3. 使用V get(Object key)找到值
2. entrySet()
   1. 使用Set<Map.Entry<K,V>> entrySet()方法，把集合中所有的Entry对象取出来存到一个Set中
   2. 遍历Set集合，获取每一个Entry对象
   3. 使用Entry对象中的getKey()、getValue()获取键值

### HashMap

- 特点

  - 底层哈希表结构
  - 可以存储null键、null值
  - 不允许key重复，重复会替换对应的value
  - 无序集合
  - 不同步的实现，多线程，线程不安全，速度快

- 由于HashMap中null可以作为键，因此，在HashMap中不能由get()方法来判断HashMap中是否存在某个键， 而应该用**containsKey()**方法来判断。

- 存储自定义类型键值

  保证key唯一：必须重写hasCode方法和equals方法，当然不写的话不报错，只是不唯一而已

### LinkedHashMap

- HashMap的子类
- 特点
  - 底层链表（保证元素顺序）+哈希表机构
  - 不允许key重复
  - 有序

### HashTable

- 特点
  - 底层哈希表机构
  - 键值都不允许为null
  - 同步的实现，单线程，线程安全的，速度慢
- jdk1.2后被HashMap取代

### Properties

- HashTable子类，还活跃在历史舞台
- 唯一一个与IO流相结合的集合

概述：Properties继承于Hashtable，表示一个持久的数据集，用键值结构存储数据，每个键及其值默认都是一个String（不用再指明泛型）。可以保存到流中，或者从流中加载。唯一一个和IO相结合的集合

#### 常用方法

```java
Object setProperty(String key, String value);//添加元素，调用Hashtable的put方法
String getProperty(String key);//取出元素，相当于Map的get方法
Set<String> stringPropertyNames();	//返回该属性列表中的键集，相当于Map的keySet方法
void store(OutputStream out, String comments);	//把集合中的数据存储到硬盘中
void store(Writer writer, String comments);	//同上
//String commments:注释，用于说明保存的文件是做什么的，不能用中文，默认是Unicode编码，推荐""
void load(InputStream in);//把硬盘中的数据读取到集合中
void load(Reader reader);//同上
```

#### 写入数据步骤：

1. 创建字符输出流或字节输出流，指明数据的目的地
2. 创建Properties对象，添加数据（字符流可以写中文，字节流不可以写中文）
3. 使用store方法，把集合中的临时数据持久化存储到硬盘中
4. 释放资源

#### 读取数据步骤：

1. 创建Properties对象
2. 创建字符输入流或字节输入流，绑定数据源（字符流可以读中文，字节流不可以读中文）
3. 使用load方法，读取保存键值对的文件
4. 释放资源

注意：

1. 存储键值对的文件，键与值的默认连接符可以使用=，空格
2. 可以使用#来添加注释，注释不读取




## 异常

### 异常体系

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrpuqyd3j312i0fygrs.jpg)

### Throwable

- 所有异常错误的根类

- 常用方法

  ```java
  String getMessage();	//返回throwable简短信息
  String toString();	//返回throwable详细信息
  void printStackTrace();	//jvm打印异常对象默认调用此方法，此方法的异常信息最全面
  ```

  

### Error

- 错误，不能处理，只能尽量避免，必须修改源代码，才能继续运行

### Exception

- 异常，可以通过调整代码避免

- 编译异常，写代码时出现的异常

- 发生异常时的大致流程：

  1. JVM根据异常产生的原因创建一个异常对象，这个异常对象包含了异常产生的内容、原因、位置
  2. 若方法中没有异常处理逻辑（try...catch），则把对象抛给方法调用者来处理
  3. 若最终到main方法都没有异常处理逻辑，那么这个异常最终会落到JVM上，JVM会做两件事
  4. 把异常对象（内容、原因、位置）以红色的字体打印到控制台上
  5. JVM会终止当前执行的程序，也叫中断处理

- 异常处理

  - 五个关键字：try、catch、finally、throw、throws

  - throw

    - 抛出异常

    - 格式：

      ```java
      throw new XXXException("异常原因")
      ```

    - 注意事项

      1. throw必须写在方法内部
      2. throw后面的对象必须是Exception或Exception的子类对象
      3. throw抛出指定的异常对象，那么就必须处理这个异常对象
      4. 如果是RunTImeException或其子类对象，可以不处理，默认交给JVM处理（打印、中断处理）
      5. 如果是编译异常，必须处理，要么throws，要么try...catch
    
  - throws
  
    - 声明异常
  
    - 当方法内部抛出异常对象，声明了编译期异常就必须要处理，可以把异常对象声明抛出给方法的调用者处理，自己不处理
  
    - 格式
  
      ```java
      public void method() throws XXXException {}
      ```
  
    - 注意
  
      - throws必须写在方法声明处
      - throws后面的对象必须是Exception或Exception的子类对象
      - 方法内部抛出了多个异常，那么就必须throws多个异常，如果抛出异常有父子类关系，则只需声明父类异常（是指编译期异常，运行期异常可以不声明）
      - 调用了一个声明了异常的方法，也必须接着声明交给该方法调用者处理或内部处理掉
  
  - try...catch...finally
  
    - 捕获异常
  
    - 格式
  
      ```java
      try {
        //可能产生异常的代码
      } catch (异常变量) {
        //异常的处理逻辑
        //一般将其记录到日志中去
      } catch (异常变量) {
        //catch语句块至少要有一个
      }
      ```
  
    - 注意
  
      - try中可能产生多个异常，那么可以使用多个catch来处理，一般抛出什么异常就catch处就定义什么异常变量来接收异常
      - 无论是否产生异常，都会继续执行try...catch后面的代码
  
    - finally代码块
  
      - 不能单独使用
      - 常用于资源释放（资源回收），无论是否出现异常都要释放

### RunTimeException

- Exception的子类
- 运行期异常，程序运行时出现的异常，不用处理，默认交给JVM处理
- 例子：
  - NullPointerException
  - ArrayIndexOutOfBoundsException
- 非运行期异常例子：
  - FIleNotFoundException
  - IOException

### 异常注意事项

- 多个异常处理方式

  - 多个异常分别处理
    - 一个异常代码一个try...catch
    - 能运行到后续代码

  - 多个异常，一次捕获，多次处理
    - 多个异常代码一个try多个catch，分别处理不同异常
    - 注意：如果catch里面写的异常变量有父子类关系，子类必须写在父类上面，否则报错
  - 多个异常，一次捕获，一次处理
    - 只用一个try...catch
    - 要求：catch里面定义的异常变量能接受多个异常（Exception）
- **运行异常被抛出可以不处理，即不会捕获也不声明抛出**
- 如果父类抛出了多个异常，子类重写父类方法时，可以抛出和父类相同的异常 或者 可以抛出父类异常的子类 或者 可以不抛出任何异常
- 如果父类没有抛出异常，子类重写父类方法时，不允许抛出异常，只能内部捕获处理

### try...catch..finally代码块

- 无论是否有异常；抑或当try、catch中有return时，**finally都会执行**

- **如果finally前面有return**，执行到return时，先把结果保存起来，不管finally中怎么改变值，不会影响结果，**所以返回值会在finally前确定好**，引用类型也如此

- **如果finally中有return语句，*永远*返回finally中的结果，要避免。（会覆盖前面的return结果）**

- 情况一

  ```java
  try{}catch{}finally{} return value; //显然按照正常顺序执行
  ```

- 情况二

  ```java
  try{return value1;}catch{}finally{} return2; 
  /*
  	程序执行流程
  	1.try块中return前的代码（如果return中有表达式运算，也会执行）
  	2.finally块
  	3.try块中return语句
  	注意：finally后的return，因为程序在try中已经return了，所以不执行
  */
  ```

- 情况三

  ```java
  try{}catch{return value1;}finally{} return value2;
  /*
  	程序执行流程
  	1.try块
  	2.1.1 有异常：执行catch块中return前的代码（如果return中有表达式运算，也会执行）
  	2.1.2 finally块
  	2.1.3 catch块中return语句，注意finally后的return不执行
  	
  	2.2.1 无异常：finally块
  	2.2.2 finally块后的return，没有异常catch不执行，其中的return自然不执行
  */
  ```

- 情况四

  ```java
  try{return value1;}catch{}finally{return2;}
  /*
  	程序执行流程
  	1.try块return之前的代码
  	2.finally块，因为有return，提前返回，覆盖前面的结果
  */
  ```

- 情况五

  ```java
  try{}catch{return value1;}finally{return2;}
  /*
  	程序执行流程
  	1.catch块return之前的代码
  	2.finally块，因为有return，提前返回
  */
  ```

- 情况六

  ```java
  try{return value3;}catch{return value1;}finally{return2;}
  /*
  	程序执行流程
  	有异常：
  	1.try块中return前的代码
  	2.catch块中return前的代码
  	3.finally块，并执行finally块中的return语句
  	
  	无异常：
  	1.try块return之前的代码
  	2.finally块，因为有return，提前返回
  */
  ```




### try-with-resource 处理机制

JAVA 的一大特性就是 JVM 会对内部资源实现自动回收，即自动 GC，给开发者带来了极大的便利。但是 JVM 对外部资源的引用却无法自动回收，例如数据库连接，网络连接以及输入输出 IO 流等，这些连接就需要我们手动去关闭，不然会导致外部资源泄露，连接池溢出以及文件被异常占用等。

传统的手动释放外部资源一般放在一般放在 try{}catch(){}finally{} 机制的 finally 代码块中，因为 finally 代码块中语句是肯定会被执行的，即保证了外部资源最后一定会被释放。同时考虑到 finally 代码块中也有可能出现异常， finally 代码块中也有一个 try{}catch(){} ，这种写法是经典的传统释放外部资源方法，显然是非常繁琐的。

```java
FileInputStream fileInputStream = null;
try {
    fileInputStream = new FileInputStream(new File("test"));
   	fileInputStream.read();
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (fileInputStream != null) {
        try {
            fileInputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

在 JDK 1.7 之后有了这种 try-with-resource 处理机制。但是有一个条件就是，自动关闭的资源需要实现 Closeable 接口或者 AutoCloseable 接口，因为只有实现了这两个接口才能自动调用 `close()` 方法，这种机制的写法相对比较简洁

```java
try (FileInputStream fileInputStream = new FileInputStream(new File("test"))) {
    fileInputStream.read();
} catch (IOException e) {
    e.printStackTrace();
}
```

其实这种写法的底层实现原理仍是上面的形式，不过在编译后的 catch{} 代码块中有一个 `addSuppressed()` 方法，即异常抑制方法，如果业务处理和关闭连接都出现了异常，业务处理的异常会抑制关闭连接的异常，只抛出业务处理中的异常，仍然可以通过 `getSuppressed()` 方法获得关闭连接的异常。



### 自定义异常类

- 一般格式

  ```java
  public class XXXException extends Exception/RunTimeException {
    //添加一个空参构造方法
    //添加一个带异常信息的构造方法
    //查看源码发现，所有的异常类都有一个带异常信息的构造方法，都会调用父类带异常信息的构造方法，让父类来处理这个异常信息
  }
  ```

- 注意事项

  - 自定义的异常类一般用Exception来结尾，说明是一个异常类
  - 自定义的异常类必须继承Exception或RunTimeException
    - 编译异常：Exception
    - 运行异常：RunTimeException



## 枚举

### 概念

- 定义：被enum关键字修饰的类就是枚举类型，枚举值默认是从0开始的数值

- 格式，三种格式都是合法、等价

  ```java
  enum Color {RED, BLUE, GREEN}
  enum Color {RED, GREEN, BLUE,}
  enum Color {RED, GREEN, BLUE;}
  ```

- 优点：将常量组织起来统一管理

- 场景：状态码、错误码等

- 本质：是java.lang.Enum的子类

### 方法

```java
public <T extends Enum<T>> T valueOf();	//返回 enum 实例的数组，而且该数组中的元素严格保持在 enum 中声明时的顺序
public String name();	//返回实例名(枚举中的值叫什么名字就打印什么名字)
public int ordinal();	//返回实例声明时的次序，从0开始(枚举中的值对应的次序)
public Class<E> getDeclaringClass();	//返回实例所属的 enum 类型
public boolean equals(Object other);	//判断是否为同一个对象
```

### 特性

- 除了不能继承，基本上和一个普通的类一样
- 枚举不可以继承，因为enum实际上就是继承了java.lang.Enum类，不允许多继承
- 枚举可以添加普通方法、静态方法、抽象方法、构造方法
- 不允许用=为枚举常量赋值，可以通过方法来显式赋值
- 枚举可以实现接口

### 应用场景

- 组织常量：jdk1.5之前，常量的定义都是`public static final Type a`的形式，有了枚举，可以将有关联关系的常量组织起来，使代码更加易读、安全，并且还可以使用枚举提供的方法。
- switch状态机：jdk1.7之后，switch允许使用enum类型
- 组织枚举：可以将类型相近的枚举通过接口或类组织起来。但是一般用**接口方式**进行组织。因为Java接口在编译时会**自动**为enum类型加上 **public static** 修饰符；Java类在编译时会自动为enum类型加上**static**修饰符，导致只能本包使用，所以常用接口方式进行组织，当然用类也可以，手动加上public就可以。
- 策略枚举：这种枚举通过**枚举嵌套枚举**的方式，将枚举常量分类处理。这种做法虽然没有switch语句简洁，但是更加安全、灵活

### 工具类

- EnumSet：`EnumSet`是枚举类型的高性能 `Set`实现。它要求放入它的枚举常量必须属于同一枚举类型。
- EnumMap：`EnumMap`是专门为枚举类型量身定做的 `Map`实现。虽然使用其它的 Map 实现（如HashMap）也能完成枚举类型实例到值得映射，但是使用 EnumMap 会更加高效：它只能接收同一枚举类型的实例作为键值，并且由于枚举类型实例的数量相对固定并且有限，所以 EnumMap 使用数组来存放与枚举类型对应的值。这使得 EnumMap 的效率非常高。



## 线程

### 并发与并行

- 并发：两个或两个以上的事情在同一时间段内发生。在一段时间内，cpu在多个任务之间进行**交替执行**。比喻：一个人吃两个馒头。
- 并行：两个或两个以上的事情在同一刻发生（同时发生）。cpu多个任务**同时进行**。比喻：两个人吃两个馒头。

### 进程与线程

- 进程：指的是一个内存中运行的一个应用程序。进入到内存中的程序叫进程。

- 线程：进程中的一个执行单元，一个进程至少有一个线程，可以有多个线程。一条应用程序到cpu的执行路径

- 线程调度

  - 分时调度：所有线程轮流使用cpu的使用权，平均分配每个线程占用cpu的时间
  - 抢占式调度：优先让优先级高的线程使用cpu，如果线程的优先级相同，那么随机选择一个线程运行，java使用的是抢占式调度

- 主线程

  执行主方法（main方法）的线程

  1. JVM执行main方法，main方法进入栈内存
  2. JVM找操作系统开辟一条main方法通向cpu的路径
  3. cpu通过这个路径执行main方法
  4. 这个路径的名字就叫主线程

### 创建线程类

1. 创建Thread类的子类

   - Thread是描述线程的类，要实现多线程就要继承此类

   - 步骤

     1. 创建Thread类的子类

     2. 在子类中**重写**Thread类的**run**方法，设置线程任务（开启线程要做什么）

     3. 创建子类对象

     4. **调用**Thread类的**start**方法，开启新的线程，执行run方法

        ```java
        void start();	//使线程开始执行，JVM调用该线程的run方法
        ```

     5. 结果：两个线程并发地执行，main线程和创建的新线程（执行run方法）

     6. 只能执行一次start方法，不能结束后再启动

2. 实现Runnable接口

   - 步骤
     1. 创建一个Runnable接口的实现类
     2. 在实现类中重写RUnnable接口的run方法，设置线程任务
     3. 创建Runnable接口的实现类对象
     4. 创建Thread类对象，构造方法中传递3中对象
     5. 调用Thread类中的start方法，开启新的线程，执行run方法
   
3. *匿名内部类方式实现线程的创建，好处：简化代码

   1. Thread子类方式

      ```java
      new Thread() {
        @Override
        public void run() {
          for (int i = 0; i < 20; i++) {
            System.out.println("print sth" + i);
          }
        }
      }.start();
      ```

   2. 实现Runnable方法

      ```java
      new Thread(new Runnable() {
        @Override
        public void run() {
          for (int i = 0; i < 20; i++) {
            System.out.println("2print sth" + i);
          }
        }
      }).start();
      ```

      

### Thread和Runnable的区别

**实现Runnable接口创建多线程程序的好处**

1. 避免了单继承的局限性
   - 一个类继承了Thread类就不能继承其他类了
   - 一个类实现了Runnable接口后还可以实现其他接口、继承其他类
2. 增强了程序的扩展性，降低程序耦合性
   - 实现Runnable接口的方式，把设置线程任务和开启线程进行了分离
   - 实现类中重写了run方法，用于设置线程任务
   - 创建Thread类，调用start方法，用于开启线程

### 多线程原理

如果直接调用run方法相当于单线程，main线程去调用run方法，所以要去调用start方法，让操作系统开辟一条线程给线程子类，开辟新的栈内存去调用run方法。多线程的好处：线程间互不影响，因为在各自的栈空间中

### Thread类

- 构造方法

  ```java
  public Thread();	//分配一个新的线程对象
  public Thread(String name);	//分配一个指定名字的新的线程对象
  public Thread(Runnable target);	//分配一个指定目标新的线程对象
  public Thread(Runnable target, String name);	//组合
  ```

- 常用方法

  ```java
  public String getName();	//获取线程的名称
  public static Thread currentThread();	//获取当前正在执行的线程
  public void start();	//线程开始执行，JVM调用该线程的run方法
  public void run();	//此线程要执行的任务
  public static void sleep(long millis);	//使当前运行的线程暂时指定毫秒数
  ```


## 线程安全

#### 问题描述

​	多线程访问了共享的数据会产生线程安全问题

#### 产生原因

​	![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrpw073pj31nm0u0u0y.jpg)

#### 解决方案

**同步技术**

1. 同步代码块
2. 同步方法
3. 锁机制

#### 同步技术的原理

一句话：同步（代码块）中的线程，没有执行完毕不会释放锁；同步（代码块）外的线程，没有锁进不去同步。同步保证了只能有一个线程在同步中使用共享数据，保证了线程安全。程序频繁地判断锁，释放锁，获取锁，程序的效率有所降低

`abc三个线程一起抢夺cpu的执行权。哪个线程抢到了执行权哪个线程就执行run方法。假设a线程抢到了执行权，执行run方法，遇到同步代码，这时a线程会检查同步代码块synchronized代码块是否有锁对象，发现有，就会获取锁对象，并进入同步代码块执行，执行完同步代码块就归还锁对象。b线程抢到了cpu的执行权，执行run方法，遇到synchronized代码块，这时b线程检查synchronized代码块是否有锁对象，发现没有，b线程就会进入到阻塞状态，会一直等待a线程执行完毕归还锁对象，等到a线程释放锁对象，b线程才能获取到锁对象，进入到同步代码块中执行 `

#### 同步代码块

格式

```java
synchronized(同步锁对象) {
  //需要同步操作的代码，可能会出现线程安全问题的代码，访问了共享数据的代码
}
```

注意

1. 同步代码块中的锁对象，可以是**任意的对象**，要创建在run方法外面，不然n个线程就有n个锁对象
2. 但是必须保证多个线程使用的**锁对象是同一个**
3. 同步锁对象作用：把同步代码块锁住，只让一个线程在同步代码块中执行

#### 同步方法

格式

```java
public synchronized void method() {
  //可能会产生线程安全问题的代码
}
```

**同步方法的锁对象就是**类对象也就是**this**

对其他synchronized同步方法或其他普通方法中的synchronized(this)同步代码块呈阻塞状态

#### 静态同步方法

格式

```java
public static synchronized void method() {
  //可能会产生线程安全问题的代码
}
```

静态同步方法的锁对象是本类的class属性(class文件对象)

#### 锁机制

比synchronized更先进、广泛

Lock接口常用方法

```java
void lock();	//获取锁
void unlock();	//释放锁
```

ReentrantLock Lock接口的实现类

使用步骤

1. 在成员位置创建一个ReentrantLock对象，可以用多态
2. 在可能出现线程安全问题的代码前调用Lock接口中的lock方法，获取锁
3. 在可能出现线程安全问题的代码后调用Lock接口中的unlock方法，释放锁

注意

- 一般把lock.lock()写到finally代码块中，无论程序是否异常，都能使锁对象释放

## 线程状态

### 线程状态概述

- NEW：新建状态；`new Thread();`或者`new Thread子类()`
- RUNNABLE：运行状态；抢到cpu执行权的线程处于的状态
- BLOCKED：阻塞状态；没有抢到cpu执行权的线程处于的状态，抢到执行权又变成了RUNNABLE状态
- THERMINATED：死亡状态；执行完`run()`方法或调用完`stop()`方法或者运行状态中抛出异常
- TIMED_WAITNG：休眠状态、休眠等待；运行过程中调用`sleep(long)`或`wait(long)`进入该状态；睡眠完成或等待完成后，检查CPU是否空闲，空闲，进入运行状态；不空闲，进入阻塞状态
- WATTING：无限等待状态：运行过程中调用`wait()`注意与上面的`wait(long)`区分，它没有指明等待时间；唤醒这个状态的线程需要使用`notify()`，注意与上面的区分，这个状态的唤醒需要调用方法，上面的醒来只需要经过指定的时间就可以自动醒来
- 后面两种状态称为冻结状态
- 阻塞状态是有CPU的执行资格的，但是需要和其他线程抢夺CPU的执行权；而冻结状态是主动地放弃CPU的执行资格的。

### Timed Waiting：计时等待

<img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrst0kjkj30zw0mggv8.jpg"/>

两种方式进入：

1. 使用`sleep(long m)`方法，在毫秒值结束之后，线程睡醒后进入Runnable/Blocked状态
2. 使用`wait(long m)`方法，在毫秒值结束之后，如果没有被提前`notify`唤醒，也会自动醒来，线程进入Runnable/Blocked状态

唤醒的方法：

```java
void notify()	//随机唤醒在此对象监视器上等待的单个线程，唤醒后的线程继续和其他阻塞中的线程抢夺CPU执行权
void notifyAll()	//唤醒在此对象监视器上等待的所有线程
```



### Blocked：锁阻塞

<img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrswpywlj30zs0mgdpe.jpg"/>

### Waiting：无限等待



## 等待唤醒机制

### 线程间通信

- 概念：多个线程在处理统一资源，但是处理的动作（线程的任务）却不相同
- 为什么要使用：多个线程并发执行时，在默认情况下CPU是随机切换线程的，当我们需要多个线程来共同完成一个任务，并且我们希望他们有规律地执行，那么多个线程之间就需要一些协调通信，以此来帮我们达到多线程共同操作一份数据。
- 如何保证线程间通信有效利用资源：多个线程在处理同一个资源，并且任务不同时，需要线程通信来帮助线程之间对同一个变量的操作，避免对同一共享变量的争夺。**通过等待与唤醒机制**来使各个线程能有效地利用资源
- 生产者-消费者模型
- 模型分析![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrpx213aj32490u0hdt.jpg)



## 线程池

### 线程池概念

一个容纳多个线程的容器（LinkedList、ArrayList、HashSet、HashMap），其中的线程可以反复利用，省去了频繁创建线程对象的操作，无序重复创建线程而消耗过多资源![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrpxget1j30ke0csgmp.jpg)

### 使用线程池原因

如果并发的线程很多，并且每一个线程都是执行一个时间很短的任务就结束了，这样频繁创建线程就会大大降低系统的效率，因为频繁创建线程和销毁线程需要时间。

### 线程池使用

Executors：生产线程池的工厂类

```java
static ExecutorService newFixedThreadPool(int nThreads);	//创建一个指定线程数目的线程池
//参数：线程池中包含的线程数目
//返回值：ExecutorService接口的实现类对象，
```

ExecutorService：线程池接口

```java
submit(Runnable task);	//从线程池中取出线程，调用线程start方法，执行线程任务
//线程池会一直开启，使用完了线程，自动归还线程给线程池，线程可以继续使用
void shutdown();	//关闭线程池
```

## Lambda表达式

### 函数式编程

面向对象过份地强调做事情需要通过对象的形式来做，而函数式编程思想则**强调做什么而不是以什么形式去做**。重视结果，不重视过程

### 标准格式

- (方法参数)
- ->
- 方法体

`(参数列表) -> {方法体}`

### 优化Runnable代码

**run方法的方法体才是核心**，其他的类、方法名、方法参数、方法返回值不重要

```java
new Thread(() -> {
  //线程具体任务
});
```

### 省略规则

- 参数列表的参数类型
- 参数列表有且只有一个参数，可以省略小括号
- 方法体有且只有一条语句，无论是否返回，都可以省略**{}、return、分号，要省略的话要一起省略**

### 闭包问题

lambda表达式中使用的变量应为 `final` ，即使没有显式地标识，虚拟机编译期也会帮我们加上

## File

基本概念：java把电脑中的目录和文件封装成的File类，可以用于文件/文件夹的增加、删除、查找、判断是否存在、遍历、获取大小等。

### 静态变量

```java
static String pathSeparator;	//系统的路径分隔符 Windows：分号 Linux：冒号
static String separator;	//系统的名称分隔符 Windows：\ Linux：/
```

**绝对路径**：完整路径，从根目录到具体文件完整的路径

**相对路径**：简化路径，相对于当前项目的根目录

**路径不区分大小写**

### 构造方法

```java
//通过将给定路径名字字符串转换为抽象路径名来创建一个File实例
//路径可以以文件结尾，也可以以文件夹结尾
//可以相对，可以绝对
//可以是存在的，也可以是不存在，创建时只是封装路径，不考虑真实性
File(String filename);

//把路径分成两部分，父路径+子路径
//分开来比较灵活
//可以父路径写目录、子路径写文件名
File(String parent, String child);

//把路径分成两部分，父路径+子路径
File(File parent, String child);
```

### 常用方法

#### 获取功能的方法

```java
public String getAbsolutePath();	//返回File的绝对路径，构造方法中传入路径的绝对路径
public String getPath();		//将File转换为路径名字字符串，就是构造方法中传入的路径
public String getName(); //返回File表示的文件或目录的名字，就是构造方法中传入路径的结尾（文件/文件夹）
public long length();	//返回File表示的文件的长度，构造方法指向的文件的大小，单位：字节
//文件夹没有大小、如果路径不存在，也返回0
```

#### 判断功能的方法

```java
public boolean exists();	//判断File表示的文件/文件夹是否实际存在
public boolean isDirectory();	//判断File表示的是否为目录
public boolean isFile();	//判断File表示的是否为文件
```

#### 创建删除功能的方法

```java
//文件不存在，创建，返回true；文件不存在，不创建，返回false
//只能创建文件，不能创建文件夹
//创建的文件的路径必须存在，否则报错
public boolean createNewFile();		//如果当前File表示的文件不存在，则新建一个空文件

//文件/文件夹删除成功，返回true；文件夹中有内容，删除失败，返回false；构造方法中路径不存在，返回false
public boolean delete();	//删除File表示的文件或目录

//文件夹不存在，创建，返回true；文件夹不存在，不创建，返回false；构造方法中的路径不存在，返回false
//只能创建文件夹，不能创建文件
public boolean mkdir();	//创建File表示的文件夹
public boolean mkdirs();	//创建File表示的文件夹，包括必须但不存在的父目录（创建多级目录）
```

### 遍历目录

```java
public String[] list();		//遍历构造方法中给出的目录，获取目录中所有的文件文件夹的名称
public File[] listFiles();	//获取目录中所有的文件和文件夹
```

注意

1. list、listFiles方法遍历的是构造方法给出的目录
2. 如果目录路径不存在，抛出空指针异常
3. 如果路径是一个文件，也会抛出空指针异常

### FileFilter：文件过滤器

### FilenameFilter：文件名称过滤器

## 递归

概念：方法自己调用自己

分类：

- 直接递归：方法自身调用自己
- 简介递归：a调用b，b调用c，c调用a，形成一个环状调用链

注意事项：

- 递归一定要有限制条件，保证递归能停下来，否则发生栈内存溢出
- 虽然有限制条件，但是递归的次数不能太多，否则也会发生栈内存溢出
- 构造方法禁止递归

使用场景：每次执行方法的方法体不变，传入的参数不同

## IO

概念：输入输出数据流。输入：从硬盘中读入内存；输出：从内存中写入硬盘

分类

1. 字节流
2. 字符流

### 字节流

#### OutputStream字节输出流

所有字节输出流的父类

常用方法

```java
public void close();	//关闭输出流并释放与该流有关的所有资源
public void flush();	//刷新输出流并强制任何缓冲的输出字节被写出
public void write(byte[] b);	//将b.length字节从指定的字节数组中写入此输出流
//如果第一个字节是正数（0-127），那么显示的时候会查询ascii表
//如果第一个字节是负数，那么第一个字节和第二个字节，两个字节组成一个中文显示，查询默认码表（GBK）
public void write(byte[] b, int offset, int len);	//写入len字节，从offset开始输出到输出流
public abstract void write(int b);	//将指定的字节输出流
```

#### FIleOutputStream文件字节输出流

作用：把内存中的数据写入到硬盘的文件中

构造方法（目的地）

```java
public FileOutputStream(File file);//创建一个向具有指定名称的文件中写入数据的输出流
public FileOutputStream(String filename);//创建一个向指定File对象表示的文件中写入数据的输出流
```

构造方法的作用：

1. 创建一个FileOutputStream对象
2. 根据file或filename创建一个空的文件
3. 把创建好的FileOutputStream对象指向创建好的文件

**使用步骤**：

1. 创建一个FileOutputStream对象，构造方法中传入写入数据的目的地
2. 调用FileOutputStream对象中的方法write，把数据写入文件
3. 释放资源（流的使用会占用一定的内存，使用完毕要把内存清空，提升程序效率）

**数据追加写入、换行写入**

使用两个参数的构造方法实现追加

#### 写入数据的原理

大致路线：内存->硬盘

具体路线：Java程序->JVM->操作系统->操作系统调用写数据的方法->把数据写入文件中

#### InputStream字节输入流

所有字节输入流的父类

常用方法

```java
public void close();	//关闭输入流并释放与之关联的资源
public abstract int read();	//从输入流中读取下一个字节
//读取成功，返回读取的数据；读取失败（末尾），返回-1
public int read(byte[] b);	//从输入流中读取一定数量的字节，存储到字节数组b中，返回读取的有效字节个数
//一次能读几位，由数组长度决定，一般定义长度为1024或它的整数倍
```

#### FileInputStream文件字节输入流

把硬盘中的文件读取到内存中去

构造方法（数据源）

```java
public FileInputStream(File file);
public FileInputStream(String filename);
```

构造方法作用：

1. 创建一个FileInputStream对象
2. 把FileInputStream对象指向构造方法中要读取的文件

**使用步骤**：

1. 创建FileInputStream对象，绑定要读取的数据源
2. 使用FileInputStream对象中的read方法，读取文件
3. 释放资源

#### 读取数据的原理

大致路线：硬盘->内存

具体录像：Java程序->JVM->操作系统->操作系统调用读取数据的方法->读取文件

### 字符流

使用字符流的原因：中文字符占用多个字节（GBK：2，UTF8：3）。

#### Reader字符输入流

所有字符输入流的父类

常用方法

```java
public void close();	//关闭此流并释放与之相关的资源
public int read();	//读取一个字符
public int read(char[] cbuf);	//读取一些字符并存储到cbuf中
```

#### FileReader文件字符输入流

构造方法（数据源）

```java
public FileReader(File file);
public FileReader(String filename);
```

作用相似

步骤相似

**读取出来的中文是几个字节一起的** **不分开**

#### Writer字符输出流

所有字符输出流的父类

常用方法

```java
public void write(int c);	//写入单个字符
public void write(char[] cbuf);	//写入字符数组
public abstract void write(char[] cbuf, int offset, int len);
public void write(String s);	//写入字符串
public void write(String s, int offset, int len);
public void flush();
public void close();
```

#### FileWriter文件字符输出流

构造方法（目的地）

```java
public FileWriter(File file);
public FileWriter(String filename);
```

作用相似

步骤：

1. 创建FileWriter对象，构造方法中绑定数据的目的地
2. 使用write方法，把数据写入内存缓冲区中（字符转换为字节的过程）
3. 使用flush方法，把内存缓冲区的数据刷新到文件中
4. 使用close方法，释放资源（会先把把内存缓冲区的数据刷新到文件中）

**close方法与flush方法的区别**：

- flush方法刷新缓冲区，流对象还可以继续使用
- close方法先刷新缓冲区，再通知系统释放资源，流对象不可以再使用了

**字符流只能操作文本文件，不能操作图片、视频等非文本文件**

### IO异常处理

```java
FileWriter fileWriter = null;
try {
  fileWriter = new FileWriter("a.txt");
  fileWriter.write("something");
  fileWriter.flush();
} catch (IOException ioe) {
  ioe.printStackTrace();
} finally {
  if (fileWriter != null) {
    try {
      fileWriter.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```

jdk7新特性：try(...) 在括号中定义流对象，自动释放资源，可以不用谢finally

jdk9新特性：流对象可以在try前定义，try(...)中填入流对象，也能实现上面的效果

### 缓冲流

概念：缓冲流也叫高效流，是对4个基本流的增强

字节/字符输入输出流：Java程序->JVM->os->file

字节/字符缓冲输入输出流：增加一个缓冲区，一次返回一个数组，减少IO次数提高读写速率

#### BufferedInputStream字节缓冲输入流

构造方法（默认缓冲区大小或指定缓冲区大小）

```java
public BufferedInputStream(InputStream in);	//创建缓冲输入流
public BufferedInputStream(InputStream in, int size);	//创建具有指定缓冲区大小的缓冲输入流
```

使用步骤：

1. 创建FileInputStream对象，构造方法中绑定要读取的数据源
2. 创建BufferedInputStream对象，构造方法绑定底层输入流
3. 使用BufferedInputStream的read方法，读取文件
4. 释放资源

#### BufferedOutputStream字节缓冲输出流

构造方法

```java
public BufferedOutputStream(OutputStream out);	//创建缓冲输出流，将数据写入指定的底层输出流
public BufferedOutputStream(OutputStream out, int size);	//将具有指定缓冲区大小的数据写入...
```

使用步骤：

1. 创建FileOutputStream对象，构造方法绑定数据的目的地
2. 创建BufferedOutputStream，构造方法绑定底层输出流
3. 使用BufferedOutputStream的write方法，把数据写入到内部缓冲区中
4. 使用BufferedOutputStream的flush方法，把缓冲区的数据刷新到文件中
5. 释放资源（会自动调用flush方法）

#### BufferedReader字符缓冲输入流

构造方法

```java
public BufferedReader(Reader reader);	//创建一个默认大小输出缓冲区的字符缓冲输入流
public BufferedReader(Reader reader, int size);	//创建一个指定大小输出缓冲区的字符缓冲输入流
```

特有的成员方法

```java
public String readLine();	//读一个文本行，读取一行数据（通过行分隔符可认定行已结束）
//如果不包含任何分隔符或到达流末尾，返回null
```

使用步骤：

1. 创建Reader对象，构造方法绑定数据源
2. 创建BufferedReader对象，构造方法绑定字符输入流
3. 使用BufferedReader对象的read/readLine方法，读取文本
4. 释放资源

#### BufferedWriter字符缓冲输出流

构造方法

```java
public BufferedWriter(Writer writer);	//创建一个默认大小输出缓冲区的字符缓冲输出流
public BufferedWriter(Writer writer, int size);	//创建一个指定大小输出缓冲区的字符缓冲输出流
```

特有的成员方法

```java
public void newLine();	//写入一个行分隔符，会根据os获取不同的行分隔符 w:\r\n l:/n m:/r
```

使用步骤：

1. 创建Writer对象，构造方法绑定数据目的地
2. 创建BufferedWriter对象，构造方法绑定字符输出流
3. 使用BufferedWriter对象的write方法，把数据写入到内存缓冲区中
4. 使用BufferedWriter对象的flush方法，把缓冲区中的数据刷新到文件中去
5. 释放资源

### 转换流

编码：字符->字节

解码：字节->字符

#### 字符集

- ascii：用于显示现代英语，还包括控制字符（回车、空格），数字。用7位表示一个字符，共128个
- GBxx：
  - GB2312：简体中文
  - GBK：最常用的中文码表，双字节编码，兼容2312，支持繁体
  - GB18030：最新的中文码表
- Unicode：万国码，三种编码方案：
  - UTF-8：最常用，电子邮件、网页、其他存储传输文字应用优先采用的编码。
    - 128个ascii字符，用一个字节编码
    - 拉丁文，两个字节
    - 中文，三个字节
    - 其他少数，四个字节

#### InputStreamReader

字节转向字符的桥梁；可使用指定charset读取字节并将其解码成字符

构造方法

```java
public InputStreamReader(InputStream in);//创建使用默认字符编码(UTF-8)的InputStreamReader
public InputStreamReader(InputStream in, String charset);//创建使用指定字符编码的...
```

使用步骤：

1. 创建InputStream对象，构造方法绑定数据源
2. 创建InputStreamReader对象，绑定字节输入流和字符编码
3. 使用InputStreamReader对象的read方法读取文件
4. 释放资源

注意事项：

构造方法中的指定编码要和文件的编码一样，否则发生乱码

#### OutputStreamWriter

字符转向字节的桥梁；可使用指定charset将要写入流中的字符编码成字节

构造方法

```java
public OutputStreamWriter(OutputStream out);//创建使用默认字符编码(UTF-8)的OutputStreamWriter
public OutputStreamWriter(OutputStream out, String charset);//创建使用指定字符编码的...
```

使用步骤：

1. 创建OutputStream对象，构造方法绑定数据目的地
2. 创建OutputStreamWriter对象，构造方法绑定字节输出流和字符编码
3. 使用OutputStreamWriter对象的write方法，把字符转成字节，存储到缓冲区中（编码）
4. 使用OutputStreamWriter对象的flush方法，把缓冲区中的数据刷新到文件中
5. 释放资源

### 序列化流/反序列化流

序列化：对象->字节

反序列化：字节->对象

#### ObjectOutputStream对象序列化流

把对象以流的方式，写入到文件中保存

构造方法

```java
public ObjectOutputStream(OutputStream out);	//创建写入指定OutputStream的对象
```

特有的成员方法

```java
public void writeObject(Object obj);	//将指定对象写入ObjectOutputStream中
```

使用步骤：

1. 创建OutputStream对象，绑定数据的目的地
2. 创建ObjectOutputStream对象，绑定字节输出流
3. 使用ObjectOutputStream对象的writeObject，把对象写入文件中
4. 释放资源

#### ObjectInputStream对象反序列化流

把文件中保存的对象，以流的方式读取出来

构造方法

```java
public ObjectInputStream(InputStream in);	//创建写入指定ObjectInputStream的对象
```

特有的成员方法

```java
public Object readObject();	//从ObjectInputStream中读取对象
```

使用步骤：

1. 创建InputStream对象，绑定数据源
2. 创建ObjectInputStream对象，绑定字节输入流
3. 使用ObjectInputStream对象的readObject
4. 释放资源
5. 使用读取出来的对象

注意：当不存在对象的.class文件时，抛出ClassNotFoundException

反序列化的前提：

1. 类必须实现serializable接口
2. 类必须存在对应的.class文件

#### InvalidClassException

当JVM反序列化对象时，能找到class文件，但是class文件在序列化对象时发生了修改，那么反序列化也会失败，抛出InvalidClassException异常



类实现了Serializable接口后，java编译器会根据类的定义，给类文件，添加一个序列号**serialVersionUID**，用于安全检查；在反序列化时会使用类.class文件中的序列号和文件中的序列号比较，如果一致，则反序列化成功，如果不一致，则反序列化失败，并抛出InvalidClassException。

如果修改了类，会重新编译生成class文件，重新生成一个序列号。serialVersionUID如果不显示指明，那么每次修改类，编译器都会帮我们自动生成不一样的序列号；如果显式指明，要求：`static`、`final`、`long`，数值不做要求。那么无论这个类怎么修改，这个序列号就保持不变

#### static静态关键字

被static关键字修饰的成员变量属于类，优先于对象进入内存中，不能被序列化

#### transient瞬态关键字

被transient关键字修饰的成员变量不能被序列化，当我们希望一个属性不被序列化又不想让他成为静态变量时，可以采用transient关键字

### 打印流

#### PrintStream

打印各种数据值表示形式

特点：

1. 只负责数据的输出，不负责数据的读取
2. **永远不会抛出IOException**
3. 丰富的打印方法（print、println）

构造方法

```java
public PrintStream(File file);	//输出的目的地是一个文件
public PrintStream(OutputStream out);	//输出的目的地是一个字节输出流
public PrintStream(String fileName);	//输出的目的地是一个文件路径
```

如果使用父类OutputStream的write方法写数据，那么会查询编码表：97->a

如果使用自己特有的print方法写数据，那么数据会原样输出：97->97

#### 改变输出语句的目的地

使用System类中的一个方法`static void setOut(PrintStream out)`重新分配输出流，改变输出语句的目的地为传入参数输出的目的地

## 网络编程

### 基本知识

#### 软件结构

- C/S结构：Client/Server结构，客户端和服务器结构，**软件**
- B/S结构：Browser/Server结构，浏览器和服务器结构，**浏览器**

#### 网络通信协议

- 网络通信协议：在互联网中的计算机，在连接和传输消息时遵循一定的规则，这个规则就叫网络通信协议，双方必须同时遵守才能完成数据交换
- TCP/IP协议：传输控制协议/因特网互联协议。定义了**计算机如何接入因特网**、**数据如何在它们之间进行传输**。采用**四层分层模型**，每一层都呼叫下一层提供的协议来完成自己的需求

#### 协议分类

- UDP协议：用户数据报协议。无连接的通信协议，发送端和接受端不用建立连接，发送端不会确认接受端是否存在；接受端也不会反馈给发送端是否确认收到数据。特点：消耗资源小，通信效率高，但是会偶尔丢失数据包，数据限制在64kb以内
- TCP协议：传输控制协议。面向连接的通信协议，发送数据前必须先建立连接，再通信。每次连接的创建都需要经过三次握手
  - 三次握手
    - 第一次，客户端向服务器发送一个连接请求，等待服务器确认
    - 第二次，服务器向客户端回送一个相应，通知客户端已经收到了连接请求
    - 第三次，客户端再次向服务器发送确认信息，确认连接

#### 网络编程三要素

- 协议：计算机网络通信必须遵守的规则
- IP地址：
  - IPv4：32位，4个字节，总数为 2^32个
  - IPv6：128位，16个字节一组 2^128个
- 端口号：
  - 系统自动分配
  - 软件自行指定
  - 由两个字节组成0-65535之间，1024之前的端口不能使用，已被分配，端口号不允许重复
  - IP找到对方计算机，端口号找到计算机上的具体软件
  - 常用端口
    - 80：http
    - 3306：mysql
    - 1521：oracle
    - 8080：tomcat

### TCP通信程序

客户端与服务器通信步骤：

1. 服务器先启动，等待客户端的连接
2. 客户端主动连接服务器，连接成功才能通信，服务器不能主动连接客户端

**TCP通信**：面向连接的通信，客户端和服务器必须经过3次握手，建立逻辑连接，才能通信（安全）

Java程序中的TCP通信对象就是**IO**（字节流）对象，用OutputStream发送信息，用InputStream读取信息，客户端和服务器进行一次通信需要4个IO对象，各自都有Out、In



**服务器是没有IO流的，但是可以获取到请求的客户端对象Socket，使用Socket中提供的IO流和客户端进行交互。简而言之：服务器使用客户端的流与客户端进行通信**

客户端使用Socket、服务器使用ServerSocket

#### Socket

此类实现客户端套接字，套接字是两台机器之间通信的端点，套接字：包含了IP地址和端口号的网络单位

构造方法

```java
public Socket(String host, int port); //创建一个流套接字并将其连接到指定主机的指定端口号上
//host:服务器IP地址
//port:端口号
```

成员方法

```java
public OutputStream getOutputStream();	//返回此套接字的字节输出流
public InputStream getInputStream();	//返回此套接字的字节输入流
public void close();//关闭此套接字
```

使用步骤：

1. 创建客户端对象Socket，构造方法中绑定IP地址和端口号
2. 使用Socket对象中的getOutputStream()方法，获取网络字节输出流对象
3. 使用此输出流对象的write方法，给服务器发送数据
4. 使用Socket对象中的getInputStream()方法，获取网络字节输入流对象
5. 使用此输入流对象的read方法，读取服务器返回的数据
6. 释放资源（Socket）

注意事项：

1. 客户端和服务器进行交互必须使用Socket中提供的网络流，不能使用自己创建的流对象
2. 当创建客户端对象时，Socket就会去请求服务器，和服务器经过三次握手建立连接通路；这时如果服务器没有启动，就会抛出异常，如果服务器已经启动，那么可以进行交互

#### ServerSocket

此类实现服务器套接字。服务器端必须明确一件事，必须知道是哪个客户端请求的服务器，所以可以使用accept方法，获取到请求的客户端对象Socket

构造方法

```java
public ServerSocket(int port);
```

成员方法

```java
public Socket accept();	//侦听并接受此套接字的连接
```

使用步骤：

1. 创建服务器队形ServerSocket，构造方法中绑定端口号
2. 使用ServerSocket中的accept方法，获取到请求的客户端对象Socket
3. 使用Socket对象中的getInputStream()方法，获取网络字节输入流对象
4. 使用此输入流对象的read方法，读取客户端发送的数据
5. 使用Socket对象中的getOutputStream()方法，获取网络字节输出流对象
6. 使用此输出流对象的write方法，给客户端返回数据
7. 释放资源

### 综合案例

#### 文件上传

原理：客户端读取本地文件，把文件通过IO对象发送给服务器，服务器再把上传的文件保存到服务器的硬盘中

注意：客户端和服务器跟本地硬盘进行读写需要自己创建的字节流对象，客户端和服务器的通信必须使用socket中的字节流对象

实现：

- 客户端：![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrpyksc2j30ys09iaq4.jpg)

- 服务器：![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrpzj2uuj31460bwqmg.jpg)

- 阻塞问题：

  上传完文件，给服务器一个标记

  ```java
  public void shutdownOutput();//禁用此套接字的输出流
  //对于TCP套接字，任何以前写的数据都将被发送，并且后面跟TCP的正常连接终止序列
  ```

#### 文件上传优化

- 文件名：使用系统毫秒值+随机数，基本保证不重复

- 循环接受

  ```java
  //每次接受新的连接
  while(true) {
    Socket socket = ServerSocket.accept();
    ...
  }
  ```

- 提高效率：使用多线程技术

## 函数式接口

概念：**有且只有一个抽象方法的接口**

格式

```java
public interface 接口名称 {
  public abstract 返回值类型 方法名(参数列表);
  //其他非抽象方法内容
  //默认、静态、私有方法
}
```

注解：`@FunctionalInterface`：检测一个接口是否为函数式接口，是：编译成功；否：报错（接口中没有抽象方法、抽象方法的个数大于一个）

用法：

- 作为方法参数：可以使用lambda表达式：`(参数)->{方法体}`，也可以新建一个匿名内部类实现方法。因为使用匿名内部类的话要加载对应内部类的class文件，使用lambda表达式则不需要，推荐使用lambda表达式
- 作为方法返回值：返回一个匿名内部类，也可以使用lambda表达式。

## 函数式编程

### Lambda延迟执行

有些时候程序运行得到的结果不一定被使用上，造成性能浪费，lambda延迟执行的特点可以节省性能损耗

## 常用函数式接口

### Supplier

`java.util.function.Supplier<T>`，被称之为**生产型接口**

**抽象方法**：`T get()`，作用：指定泛型是什么类型，get方法就会生产什么类型的数据 ，具体返回什么数据，需要自行定义

### Consumer

`java.util.function.Consumer<T>`，和Supplier相反，消费一个数据，被称之为**消费型接口**

**抽象方法**：`void accept(T t)`，作用：指定泛型是什么类型，accept方法就会消费什么类型的数据，具体怎么消费使用，需要自行定义

**默认方法**：`default Consumer<T> andThen(Comsumer<? super T> after)`，作用：组合两个Consumer接口，再对数据进行消费 

```java
Consumer<String> con1;
Consumer<String> con2;
String s = "hello";
con1.accept(s);
con2.accept(s);
//等价于
con1.andThen(con2).accept(s);
//谁在前谁先消费
```

### Predicate

`java.util.function.Predicate<T>`，这个接口主要用于判断，被称为**判断型接口**

**抽象方法**：`boolean test(T t)`，作用：指定泛型是什么类型，test方法就对什么类型数据进行判断，从而返回一个bool值

**默认方法**：

1. `default Predicate<T> and(Predicate<? super T> other)`，作用：**逻辑与**，把两个Predicate条件连接起来实现**并且**的效果
2. `default Predicate<T> or(Predicate<? super T> other)`，作用：**逻辑或**
3. `default Predicate<T> negate(){return (t) -> !test(t)}`，作用：**逻辑非**

### Function

`java.util.function.Function<T,R>`，**转换型接口，**T：前置条件；R：后置条件

**抽象方法**：`R apply(T t)`，作用：根据T类型的参数获取R类型的结果

**默认方法**：`default <V> Function<T,V> andThen(Function<? super R, ? extends V> after) `，作用，组合两个Function接口组合在一起，再转换

## 流

`java.util.stream.Stream<T>`，但不是函数式接口

Stream流与IO流是两种不同的东西，IO流用于读写；Stream流用于简化集合、数组的操作

流式思想：集合元素的处理方案，方案就是一种函数模型。其中集合元素都没有被处理，只有当最终方法执行完了整个模型才会按照指定策略进行操作，得益于Lambda表达式的延迟性

数据源：集合、数组等

和Collection不同的两个基础特征：

- Pipelining：中间操作都会返回流对象本身
- 内部迭代：以前集合迭代元素都是用Iterator和for，在集合外部显式迭代，流提供了内部迭代方法

使用流的三个步骤

1. 获取数据源
2. 数据转换，**每次操作都不会改变原有流，而是形成新的流**
3. 执行操作获取需要的结果

**流只能使用一遍**：第一个流使用完毕后，流中的数据就会流转到下一个流中，第一个流就会关闭，不能再调用方法，否则抛出异常

### 获取流

- 所有的**Collection**集合都可以通过stream默认方法来获取流

  ```java
  default Stream<E> stream();
  ```

- Stream接口中的of静态方法获取**数组**的流

  ```java
  static <T> Stream<T> of(T... values);
  ```

### 常用方法

- 延迟方法：返回值仍然是`Stream`接口自身类型的方法，支持链式调用
- 终结方法：返回值不再是`Stream`接口自身类型的方法，执行之后就不能继续使用Stream中的方法

#### 延迟方法

```java
Stream<T> filter(Predicate<? super T> predicate); //根据筛选条件筛选元素，形成新的流
//如果方法返回的结果为true，那么将留用；如果返回结果为false，那么将舍弃

<R> Stream<R> map(Function<? super T, ? extends R> mapper);	//映射，将流中T类型数据转成R类型

Stream<T> limit(long maxSize);//取用前几个元素形成新的流

Stream<T> skip(long n);//跳过前几个元素形成新的流

static <T> Stream<T> concat(Stream<? extends T> a, Stream<? extends T> b);
//两个流合并成一个流
```

#### 终结方法

```java
void forEach(Consumer<? super T> action); //遍历流中的数据

long count();//统计流中的元素个数
```

## 方法引用

**目的**：优化Lambda表达式；如果Lambda要表达的函数方法已经存在于某个类中的某个方法的实现中（即Lambda表达式的方法体是直接引用别的类中的方法）的话，可以使用方法引用

**使用前提**：需要使用的对象已存在，需要使用的对象的方法已存在

**格式**：`对象::方法`  **::是方法引用的运算符** 参数直接省略

例子：

```java
//Lambda表达式写法
s -> System.out.println(s);

//方法引用写法
System.out::println;
```

**语义**：

- 拿到参数后，经Lambda之手，继而传递给`System.out.println`方法去处理
- 直接让`System.out`中的`println`方法来取代Lambda

**注意**：Lambda中传递的参数一定要是方法引用中能接收的，否则抛出异常

### 方式

- 通过对象名引用成员方法
- 通过类名称引用静态方法
- 通过`super`引用父类成员方法  `super::方法`
- 通过`this`引用本类成员方法  `this::方法`
- 类的构造方法的引用  `类名称::new`

## Junit

单元测试

- 黑盒测试：只关注输入输出，不关注具体的内部实现
- 白盒测试：除了关注输入输出，还要关注程序执行的具体流程。Junit

方法测试写在main方法中的不足：一个main方法只能测试一个方法，其他方法要注释掉

**使用步骤**：

1. 定义一个测试类。建议：类名：`被测试类名Test`；包名：`xxx.xx.test`
2. 定义测试方法，可以独立执行的。建议：方法名：`test被测试的方法名`；返回值：void；参数列表：空参
3. 给方法加`@Test`
4. 导入Junit依赖

**判定结果**：

- 红色：失败
- 绿色：成功
- 一般不会在测试方法中写输出语句，无法判断是否正确，一般使用断言。
  - `Assert.assertEquals(期待值，真实值)`

补充

- `@Before`，在所有测试方法执行之前都会去执行的方法，常用于资源申请
- `@After`，在所有测试方法执行之后执行的方法（无论测试方法有没有异常抛出都执行），常用于释放资源

## 反射

**抽象概念**：将类的各个组成部分封装成为其他对象，这就是反射机制

![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrq0dx9yj31yx0u0tre.jpg)

### 好处

- 可以在程序运行过程中，操作成员变量、成员方法、构造方法等对象
- 可以解耦，提高程序的可扩展性、灵活性

### 坏处

- JVM无法对这些代码进行优化，性能会有一定的损耗
- 破坏类的封装性

### 获取功能

- 获取Class对象

  ```java
  //源码阶段
  Class.forName("全类名")； //将字节码文件加载进内存，返回Class对象
  //常用于配置文件，将全类名定义在配置文件中
    
  //Class对象阶段
  类名.class; //通过类名的属性class来获取Class对象
  //多用于参数的传递
  
  //RunTime阶段
  对象.getClass(); //通过父类Object中的getClass方法获取Class对象
  ```

  - **注意**：同一个字节码文件(.class)在一次程序中只会被加载一次，不论通过哪一种方式获取的Class对象都是同一个

- 获取成员变量

  ```java
  Field[] getFields();//获取所有由public修饰的成员变量
  Field getField(String name);//获取指定的由public修饰的成员变量
  
  Field[] getDeclaredFields();//获取所有成员变量，不考虑修饰符
  Field getDeclaredField(String name);//获取指定的成员变量
  ```

  - 设置值：`void set(Object obj, Object value)` 不能设置私有属性的值，否则报错，除非忽略
  - 获取值：`Object get(Object object)` 传入的参数是一个特定的对象，因为是成员变量
  - 暴力反射：`void setAccessible(true)` 忽略访问权限修饰符，不只是在属性中有这个方法

- 获取构造方法

  ```java
  //获取所有public构造方法
  Constructor<?>[] getConstructors();
  //根据构造方法的参数类型所对应的类去获取特定的public构造方法
  Constructor<T> getConstructor(类<?>... parameterTypes);
  
  //获取所有构造方法
  Constructor<?>[] getDeclaredConstructors();
  //根据构造方法的参数类型所对应的类去获取特定的构造方法
  Constructor<T> getDeclaredConstructor(类<?>... parameterTypes);
  ```

  - 创建对象：`T newInstance(Object... initargs)` 根据构造方法的参数列表传入指定参数，来新建一个对象。如果想使用空参构造方法创建一个对象，可以使用`Class`对象中的`newInstance`方法，简化操作

- 获取成员方法

  ```java
  //获取所有public成员方法(除了自己的publib方法，还包含父类/Object类中的public方法)
  Method[] getMethods();
  //根据方法名和成员方法的参数类型所对应的类去获取特定的public成员方法
  Method getMethod(String name, 类<?>... parameterTypes);
  
  //获取所有成员方法
  Method[] getDeclaredMethods();
  //根据方法名和成员方法的参数类型所对应的类去获取特定的成员方法
  Method getDeclaredMethod(String name, 类<?>... parameterTypes);
  ```

  - 执行方法：`Object invoke(Object obj, Object... args)`  根据Method对象中的参数列表的类型，传入指定类型的参数，同时传入对象，需要确定执行哪个对象的方法
  - 获取方法名称：`String getName()`  

- 获取类名

  ```java
  String getName();//获取全类名：包名+类名
  ```


### 案例

编写一个“小框架”

**前提**：不修改框架中任何的代码，可以帮我们创建任意类，并执行其中的任意方法

**实现**：

- 配置文件
- 反射

**步骤**：

1. 将需要创建的对象的全类名和需要执行的方法的名字定义在配置文件中
2. 在程序中加载读取配置文件（**以后改只需改配置文件，不需要改代码**）
3. 使用反射技术加载类文件进入内存
4. 创建对象
5. 执行方法

## 注解

抽象概念：JDK1.5之后的新特性。用于说明程序。格式：`@注解名称`

### 作用分类

- 编译检查；如：用@Override检查是否正确重写父类方法
- 编写文档；如：@param 描述方法参数；@return 描述方法返回值；@since 描述该方法从java多少版本开始
- 代码分析；

### JDK预定义的注解

```java
@Override //检测被该注解标注的方法是否是继承自父类（接口）的
@Deprecated //该注解标注的内容已过时
@SuppressWarnings //压制警告 ，一般传入all @SuppressWarnings("all")
```

### 自定义注解

格式

```java
元注解
public @interface 注解名 {}
```

本质：注解本质上就是一个接口，改接口默认继承`java.lang.annotation.Annotation`接口

```java
public interface 注解名 extends java.lang.annotation.Annotation {}
```

**属性**：抽象方法。

要求：

	1. 返回值类型：基本数据类型、String、Enum、注解、以上类型的数组
	2. 定义了属性，在使用时需要给属性赋值。就是在使用时，给接口中每一个抽象方法赋值；或者在抽象方法后加上default，给属性一个默认值 。如果只有一个属性并且属性名就叫value，那么可以省略，直接赋值

<img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrt3p1w6j30l80bydgt.jpg"/>



**元注解**：用于描述注解的注解

```java
@Target //描述注解能够作用的位置 
//ElementType:TYPE:类；METHOD:方法；FIELD:成员变量
@Retention //描述注解被保留的阶段 三个阶段
//RetentionPolicy.RUNTIME 会保留到Class文件中，并被JVM读取到。一般用RUNTIME
@Documented //描述注解是否被抽取到api文档中
@Inherited //描述注解是否被子类继承
```

### 使用注解

获取注解中定义的属性值

1. 获取注解使用位置的对象（Class、Method、Field）
2. 获取指定的注解 `getAnnotation(Class)  //其实就是在内存中生成了一个该类注解接口的子类实现对象`
3. 调用注解的抽象方法获取配置的属性值

## Java内存划分

1. 栈（Stack）：存放的都是方法中的局部变量 **方法真正运行在栈内存**
   1. 局部变量：方法的参数或方法内部的变量
   2. 作用域：一旦超出了作用域，立即从栈内存消失
2. 堆（Heap）：凡是new出来的东西，都在堆当中
   1. 堆内存里面的东西都有一个地址值：16进制
   2. 堆内存里面的东西都有一个默认值
      1. 整数类型：0
      2. 浮点数类型：0.0
      3. 字符类型：'\u0000'
      4. 布尔类型：false
      5. 引用类型：null
3. 方法区（Method Area）：存储.class相关信息，包含方法的**信息**，**方法真正运行在栈内存**
4. 静态区：在方法区中，专门存储静态数据
5. 本地方法栈（Native Method Stack）：与操作系统相关
6. 寄存器（Register）：与CPU相关
7. 例子
   1. 数组内存图：<https://www.bilibili.com/video/av59825712/?p=85>
   2. 一个对象内存图：https://www.bilibili.com/video/av58933852/?p=102
   3. 字符串常量池内存图：<https://www.bilibili.com/video/av58933852/?p=135>
   4. 静态static的内存图： <https://www.bilibili.com/video/av59825712/?p=146>
   5. this、super内存图：155
   6. 多线程内存图：297



## 补充内容

### jdk9新特性：对集合添加的优化

- 集合增加静态方法：of()，可以给集合一次性添加多个元素

- ```java
  static <E> List<E> of(E... elements);
  ```

- 使用前提：确定当前集合的元素个数，不再改变集合长度了

- 注意事项：

  1. of方法只适用于List接口、Set接口、Map接口，不适用于接口实现类
  2. of方法返回的是一个不能改变的集合，不能再使用add、put添加元素，否则抛出异常UnSupportedOperationException
  3. Set接口和Map接口使用of方法时不能有重复元素，否则抛出异常illegalArgumentException

### 序列化与反序列化

#### 序列化

将对象转变成一串由二进制字节组成的数组，可以通过将二进制数据保存到磁盘或者传输网络，磁盘或者网络接收者可以在对象的属类的模板上来反序列化类的对象，达到对象持久化的目的。**将对象的状态信息转换为可以存储或传输的形式**，因为计算机保存的数据是二进制数据

#### 如何序列化

前提：实现Java序列化的接口：java.io.Serializable

#### 注意事项

- 序列化对象里面的属性是对象的话也要实现序列化接口
- 类的对象序列化后，类的序列化ID不能轻易修改，不然反序列化会失败
- 类的对象序列化后，类的属性有增加或者删除不会影响序列化，只是值会丢失
- 如果父类序列化了，子类会继承父类的序列化，子类无需添加序列化接口
- 如果父类没有序列化，子类序列化了，子类中的属性能正常序列化，但父类的属性会丢失，不能序列化
- 用Java序列化的二进制字节数据只能由Java反序列化，不能被其他语言反序列化。如果要进行前后端或者不同语言之间的交互一般需要将对象转变成Json/Xml通用格式的数据，再恢复原来的对象
- 如果某个字段不想序列化，在该字段前加上transient关键字即可
- static属性也不参与序列化
- JAVA序列化的机制是通过判断类的**serialVersionUID**来验证的版本一致的。在进行反序列化时，JVM会把传来的字节流中的serialVersionUID于本地相应实体类的serialVersionUID进行比较。如果相同说明是一致的，可以进行反序列化，否则会出现反序列化版本一致的异常
- 数组类不能声明一个明确的 serialVersionUID，因此它们总是具有默认的计算值，但是数组类没有匹配 serialVersionUID 值的要求。

#### serialVersionUID

**作用**：

​	序列化操作时会把当前类的serialVersionUID写入到序列化文件中；在进行反序列化时，JVM会把传来的字节流中的serialVersionUID和相应实体类的serialVersionUID进行比较。如果相同说明是一致的，可以进行反序列化，否则会出现反序列化版本一致的异常

**生成方式**：

- 我们查看 `java.io.ObjectStreamClass#writeNonProxy` ，如果当前类(`User`)没有定义 `serialVersionUID`，就会调用`java.io.ObjectStreamClass#computeDefaultSUID`生成默认的序列化唯一标示。
- 可以手动指定为1L，就避免序列化后修改类结构而导致反序列化失败，因为`serialVersionUID`不手动指定会用`ObjectStreamClass`中的方法来生成，会导致两个ID不一致

**使用场景**：

​	当实现Serializable接口中没有显示的定义serialVersionUID变量的时候，JAVA序列化机制会根据Class自动生成一个serialVersionUID作序列化版本比较用，这种情况下，如果Class文件(类名，方法名等)没有发生变化，就算再编译多次，serialVersionUID也不会变化的。

​	如果我们不希望通过编译来强制划分软件版本，即实现序列化接口的实体能够兼容先前版本，就需要显示的定义一个serialVersionUID，类型为long的变量。不修改这个变量值的序列化实体，都可以相互进行序列化和反序列化。

**使用中的四个情况**：

1. Persion类序列化之后，从A端传到B端，然后在B端进行反序列化，在序列化Persion和反序列化Persion的时候A和B端都需要一个相同的类。如果两处的serialVersionUID不一致，会产生什么样的效果呢

   答案：报错，序列化失败

2. 假设两处serialVersionUID一致，如果A端增加一个字段，B端不变，会是什么情况呢

   答案：序列化，反序列化都正常；但是A端增加的字段丢失(被B端忽略)

3. 假设两处serialVersionUID一致，如果B端减少一个字段，A端不变，会是什么情况呢

   答案：序列化，反序列化都正常，B端字段少于A端，A端多的字段值丢失(被B端忽略)，和情况2相似

4. 假设两处serialVersionUID一致，如果B端增加一个字段，A端不变，会是什么情况呢

   答案：序列化，反序列化都正常，B端新增加的int字段被赋予了**默认值**0。

5. 总结：只要serialVersionUID不一致，序列化一定失败，反之则一定成功。![](https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrq0qkztj30e407qdfz.jpg)

**序列化保存的是对象的状态，静态变量属于类的状态，因此 序列化并不保存静态变量。**

### 重写eauals方法一般步骤与注意事项

1. 使用`==`来检查实参是否为对象的一个引用，如果是，返回`false`
2. 使用`isinstanceof`来检查实参是否为正确的类型（和我同一个类型），如果不是，返回`false`
3. 把实参转换到正确的类型
4. 检查实参中的域与当前对象中对应的域值是否匹配
   1. 不是float、double的基本类型，可以使用`==`进行比较
   2. float类型，用`Float.floatToIntBits`转换成int类型的值，然后使用==操作符比较int类型的值
   3. double类型，用`Double.doubleToLongBits`转换成long类型的值，然后使用==操作符比较long类型的值
   4. 引用类型，可以递归地调用所引用的对象的equals方法
5. 写完后考虑三个问题
   1. 是否对称？a.equals(b)的效果与b.equals(a)的效果是否一样
   2. 是否传递？a.equals(b)、b.equals(c)能否得出a.equals(c)
   3. 是否一致

### 实体分类

- POJO：`Plain Ordinary Java Object` 简单无规则的 Java 对象，只有属性字段以及 setter 和 getter 方法
- DTO：`Data Transfer Object` 数据传输对象，用于展示层与服务层之间的数据传输对象
- VO：`View Object` 视图对象，把某个页面的数据封装起来
- PO：`Persistant Object` 持久化对象，可以看成与数据库中的表映射的 Java 对象

### 优化

- 尽量指定类、方法的final修饰符

  ```
  带有final修饰符的类是不可派生的。在Java核心API中，有许多应用final的例子，例如java.lang.String，整个类都是final的。为类指定final修饰符可以让类不可以被继承，为方法指定final修饰符可以让方法不可以被重写。如果指定了一个类为final，则该类所有的方法都是final的。Java编译器会寻找机会内联所有的final方法，内联对于提升Java运行效率作用重大，具体参见Java运行期优化。此举能够使性能平均提高50%
  ```

- 尽量减少对变量的重复计算

  ```java
  for (int i = 0; i < list.size(); i++)
  {...}
  //改成
  for (int i = 0, length = list.size(); i < length; i++)
  {...}
  ```

- 如果能估计到待添加的内容长度，为**底层以数组方式实现的集合**、工具类指定初始长度

  ```
  ArrayList、LinkedLlist、StringBuilder、StringBuffer、HashMap、HashSet
  ```

- 复制大量数据，使用`System.arraycopy()`

- 乘除2的倍数最好使用移位算法，速度快

- 循环中不要创建对象的引用

- **尽量使用HashMap、ArrayList、StringBuilder，除非线程安全需要，否则不推荐使用Hashtable、Vector、StringBuffer，后三者由于使用同步机制而导致了性能开销**

- 谨慎使用静态变量，gc通常是不会回收静态变量引用的对象所占有的堆内存的，如果A类不被回收，意味着被指向的B对象也会一直常驻内存

- 实现RandomAccess接口的集合比如ArrayList，应当使用最普通的for循环而不是foreach循环来遍历。假如是随机访问的，使用普通for循环效率将高于使用foreach循环；反过来，如果是顺序访问的，则使用Iterator会效率更高

- 使用数据库连接池和线程池

- 使用带缓冲的输入输出流进行IO操作

  ```
  BufferedReader、BufferedWriter、BufferedInputStream、BufferedOutputStream
  ```

- 字符串变量和字符串常量**equals**的时候将**字符串常量写在前面**，有效避免空指针异常

- 把一个基本数据类型转为字符串，基本数据类型.toString()是最快的方式、String.valueOf(数据)次之、数据+""最慢

  ```
  Integer为例
  Integer.toString() 直接调用
  String.valueOf() 底层调用了toString方法，但是会在调用前进行空指针判断
  i+"" 使用了StringBuilder实现，先用append方法拼接，再用toString()方法获取字符串
  ```

- 循环内不要使用"+"进行字符串拼接，应该使用StringBuilder变量不断append。因为使用一次+就会new一个StringBuilder来执行一次append方法之后toString再返回，效率很低

- 使用entrySet来遍历Map

- 静态类、单例类、工厂类将它们的构造函数置为private

- **使用同步代码块替代同步方法**

  ```
  除非能确定一整个方法都是需要进行同步的，否则尽量使用同步代码块，避免对那些不需要进行同步的代码也进行了同步，影响了代码执行效率
  
  从执行效率的角度考虑，有时候我们未必要把整个方法都加上synchronized，而是可以采取synchronized块的方式，对会引起线程安全问题的那一部分代码进行synchronized就可以了
  ```

- 程序运行过程中避免使用反射

  ```
  效率低，一种建议性的做法是将那些需要通过反射加载的类在项目启动的时候通过反射实例化出一个对象并放入内存
  ```

- **对于ThreadLocal使用前或者使用后一定要先remove**

- 避免Random实例被多线程使用，虽然共享该实例是线程安全的，但会因竞争同一seed 导致的性能下降。JDK7之后，可以使用ThreadLocalRandom来获取随机数

  ```
  多个线程竞争同一个seed导致性能下降
  seed是一个全局变量，多个线程同时获取随机数的时候，会竞争同一个seed
  ```

### Lombok

#### 优点

自动生成代码，大大减少了代码量，使代码非常简洁

#### 缺点

1. 对队友来说：团队中一个人用了Lombok，那么整个团队都要装
2. 对代码来说：可能破坏封装性，某些属性可能就是只允许自身使用，不给公用的get/set方法，如果用了Lombok，那么这个属性就无法达到私有，因为会生成公用的get/set方法
3. 对调试来说：如果想看一个属性的get/set方法被哪些类引用到，就不太方便看
4. 对升级来说：按照如今JDK的升级频率，每半年都会推出一个新的版本，但是Lombok作为一个第三方工具，并且是由开源团队维护的，那么他的迭代速度是无法保证的。如果某个新版本的JDK不支持Lombok就会受到影响。
5. 对应用来说：因为一个应用可能依赖了多个jar包，而每个jar包可能又要依赖不同版本的Lombok，这就导致在应用中需要做版本仲裁，而我们知道，jar包版本仲裁是没那么容易的，而且发生问题的概率也很高。

### 生成随机数

**可用于生成短信验证码**

#### Math.random() 静态方法

> 当第一次调用 `Math.random()` 方法时，自动创建了一个**伪随机数生成器**，实际上用的是 `new java.util.Random()`。当接下来继续调用 `Math.random()` 方法时，就会使用这个新的**伪随机数生成器**。

```java
//关键源码


public static double random() {
    Random rnd = randomNumberGenerator;
    if (rnd == null) rnd = initRNG(); // 第一次调用，创建一个伪随机数生成器
    return rnd.nextDouble();
}

private static synchronized Random initRNG() {
    Random rnd = randomNumberGenerator;
    return (rnd == null) ? (randomNumberGenerator = new Random()) : rnd; // 实际上用的是new java.util.Random()
}
```

> `initRNG()` 方法是 `synchronized` 的，因此在多线程情况下，只有一个线程会负责创建**伪随机数生成器**（使用当前时间作为种子），其他线程则利用该**伪随机数生成器**产生随机数。

**因此 `Math.random()` 方法是线程安全的**

```java
//使用方式


public class JavaRandom {
    public static void main(String args[]) {
        new MyThread().start();
        new MyThread().start();
    }
}
class MyThread extends Thread {
    public void run() {
        for (int i = 0; i < 2; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + Math.random());
        }
    }
}
```

#### java.util.Random

基本算法：**线性同余法(LCG)伪随机数生成器**

缺点：可预测，只要初始化Random对象时指定的种子相等，那么产生的随机数也就相等，**在注重信息安全的应用中，不要使用 LCG 算法生成随机数，请使用 SecureRandom**

```java
//源码


public Random() {
    this(seedUniquifier() ^ System.nanoTime());
}

public Random(long seed) {
    if (getClass() == Random.class)
        this.seed = new AtomicLong(initialScramble(seed));
    else {
        // subclass might have overriden setSeed
        this.seed = new AtomicLong();
        setSeed(seed);
    }
}
```

默认使用**当前系统时钟**作为种子

```java
//使用方式


Random random = new Random();

for (int i = 0; i < 5; i++) {
    System.out.println(random.nextInt());
}
```

- `nextBoolean()` 返回均匀分布的`true`或`false`
- `nextDouble()` 返回0.0～1.0之间的均匀分布的`double`
- `nextDouble()` 返回0.0～1.0之间的均匀分布的`float`
- `nextInt()` 返回均匀分布的`int`
- `nextInt(int n)` 返回[0, n)之间均匀分布的`int`
- `nextLong()` 返回均匀分布的`long`

**只要种子一样，产生的随机数也一样：** 因为种子确定，随机数算法也确定，因此输出是确定的！

#### java.security.SecureRandom

`SecureRandom` 提供加密的强随机数生成器 (RNG)，要求种子必须是**不可预知**的，产生**非确定性**输出。`SecureRandom` 也提供了与实现无关的算法，因此，调用方（应用程序代码）会请求特定的 RNG 算法并将它传回到该算法的 `SecureRandom` 对象中

```java
//使用方式


SecureRandom random1 = SecureRandom.getInstance("SHA1PRNG");	//指定算法名称
SecureRandom random2 = SecureRandom.getInstance("SHA1PRNG");

for (int i = 0; i < 5; i++) {
    System.out.println(random1.nextInt() + " != " + random2.nextInt());
}
```



#### java.util.concurrent.ThreadLocalRandom

继承自`java.util.Random`

```java
//关键源码


private static final ThreadLocal<ThreadLocalRandom> localRandom =
    new ThreadLocal<ThreadLocalRandom>() {
        protected ThreadLocalRandom initialValue() {
            return new ThreadLocalRandom();
        }
};
```

每一个线程有一个独立的**随机数生成器**，用于并发产生随机数，能够解决多个线程发生的竞争争夺。**效率更高！**`ThreadLocalRandom` 不是直接用 `new` 实例化，而是第一次使用其静态方法 `current()` 得到 `ThreadLocal<ThreadLocalRandom>` 实例，然后调用 `java.util.Random` 类提供的方法获得各种随机数

```java
//使用方式


public class JavaRandom {
    public static void main(String args[]) {
        new MyThread().start();
        new MyThread().start();
    }
}
class MyThread extends Thread {
    public void run() {
        for (int i = 0; i < 2; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + ThreadLocalRandom.current().nextDouble());
        }
    }
}
```

#### 随机字符串RandomStringUtils

```xml
<!-- Maven依赖 -->
<dependency>
    <groupId>commons-lang</groupId>
    <artifactId>commons-lang</artifactId>
    <version>2.6</version>
</dependency>
```

- `String random(int count, boolean letters, boolean numbers)`
  - `count`：生成随机字符串的长度
  - `letters`：是否包含字母
  - `numbers`：是否包含数字
- `String random(int count)` 从所有字符集中选择字符创建指定长度的字符串
- `String random(int count, String chars)`
  - `count`：生成随机字符串的长度
  - `chars`：指定的字符集
