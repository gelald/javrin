import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o as p,c as o,a as c,b as n,d as l,w as i,e as s}from"./app-859571d0.js";const u={},r=s('<h1 id="数据与运算" tabindex="-1"><a class="header-anchor" href="#数据与运算" aria-hidden="true">#</a> 数据与运算</h1><blockquote><p>本节介绍 Java 中的数据与运算模块，包括基本数据类型、包装类型以及运算的部分。</p></blockquote><h2 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h2><p>Java 中有八大基本数据类型</p><table><thead><tr><th>数据类型</th><th>关键字</th><th>内存占用</th></tr></thead><tbody><tr><td>字节型</td><td>byte</td><td>1个字节</td></tr><tr><td>短整型</td><td>short</td><td>2个字节</td></tr><tr><td>整型</td><td>int</td><td>4个字节</td></tr><tr><td>长整型</td><td>long</td><td>8个字节</td></tr><tr><td>单精度浮点数</td><td>float</td><td>4个字节</td></tr><tr><td>双精度浮点数</td><td>double</td><td>8个字节</td></tr><tr><td>字符型</td><td>char</td><td>2个字节</td></tr><tr><td>布尔类型</td><td>boolean</td><td>1个字节</td></tr></tbody></table><p>**其中字面量的整数默认是 <code>int</code> 类型，字面量的浮点数默认是 <code>double</code> 类型。**运算的时候需要极其注意，避免因为隐式类型转换带来其他问题。</p><p>其中八大基本数据类型它们还有对应的包装类型</p><table><thead><tr><th>基本类型</th><th>包装类（java.lang）</th></tr></thead><tbody><tr><td>byte</td><td>Byte</td></tr><tr><td>short</td><td>Short</td></tr><tr><td>int</td><td>Integer</td></tr><tr><td>long</td><td>Long</td></tr><tr><td>float</td><td>Float</td></tr><tr><td>double</td><td>Double</td></tr><tr><td>char</td><td>Character</td></tr><tr><td>boolean</td><td>Boolean</td></tr></tbody></table>',8),d=s(`<p>其中 <code>switch</code> 支持的数据类型有：<code>char</code> 、<code>byte</code> 、<code>short</code> 、<code>int</code> 、<code>Character</code> 、<code>Byte</code> 、<code>Short</code> 、<code>Integer</code> 、<code>String</code> 、<code>enum</code></p><h3 id="自动装箱与自动拆箱" tabindex="-1"><a class="header-anchor" href="#自动装箱与自动拆箱" aria-hidden="true">#</a> 自动装箱与自动拆箱</h3><p>包装类型和基本数据类型之间的互相赋值由自动装箱、自动拆箱完成。</p><p>用一个最简单的例子阐述自动装箱与自动拆箱</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Integer</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>	<span class="token comment">// 自动装箱 基本数据类型-&gt;包装类型</span>
<span class="token keyword">int</span> b <span class="token operator">=</span> a<span class="token punctuation">;</span>		 <span class="token comment">// 自动拆箱 包装类型-&gt;基本数据类型</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="包装类型与基本类型的区别" tabindex="-1"><a class="header-anchor" href="#包装类型与基本类型的区别" aria-hidden="true">#</a> 包装类型与基本类型的区别</h3><ol><li><p>从类型上来看：<strong>包装类型可用于泛型，而基本类型不可以</strong>。因为泛型在编译时会进行<strong>类型擦除</strong>，最后只保留<strong>原始类型</strong>，而原始类型只能是 <strong>Object 类及其子类</strong>。包装类型的都是Object的子类，而基本类型没有所谓的原始类型。</p></li><li><p>从值来看：<strong>包装类型可以为 null，基本类型不可以</strong>。包装类型可以应用于 POJO 的属性类型，基本一般来说不太推荐。因为数据库的查询结果可能是 null，如果使用基本类型的话，就可能会抛出 <code>NullPointerException</code> 的异常。</p></li><li><p>从比较环节来看：<strong>基本类型使用 == 进行比较；包装类型需要使用 equals 方法进行比较，用 == 比较的是地址值</strong>。此外，<strong>包装类型和基本类型进行 == 比较的时候会自动拆箱。</strong></p></li><li><p>总体上来说：<strong>基本类型比包装类型更高效</strong>。基本类型在栈中直接存储的具体数值，而包装类型在栈中存储的是堆中的引用。很显然，相比较于基本类型而言，<strong>包装类型需要占用更多的内存空间</strong>。</p></li></ol><h3 id="包装类的缓存机制" tabindex="-1"><a class="header-anchor" href="#包装类的缓存机制" aria-hidden="true">#</a> 包装类的缓存机制</h3><blockquote><p>这是一个非常 nice 的设计，有点字符串常量池的意思~</p></blockquote><p>我们不妨从一个经典的例子引入这个话题</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Integer</span> x <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Integer</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Integer</span> y <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Integer</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>x <span class="token operator">==</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>    	<span class="token comment">// false</span>
<span class="token class-name">Integer</span> z <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Integer</span> k <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>z <span class="token operator">==</span> k<span class="token punctuation">)</span><span class="token punctuation">;</span>   	 <span class="token comment">// true</span>

<span class="token comment">// 简单分析</span>
<span class="token comment">// new Integer(123) 每次都会在堆中创建一个数值为123的对象</span>
<span class="token comment">// Integer.valueOf(123) 使用缓存池中的对象，多次调用会取到同一个对象的引用</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>valueOf</code> 这个方法每次执行的时候都会检查 <code>IntegerCache.cache</code> 这个数组中查询是否有这个对象，有的话就使用；没有的话才创建新的对象。如果直接使用 <code>Integer x = 10;</code> 的话会触发自动装箱，自动装箱最终其实还是调用 <code>valueOf</code> 方法。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Integer</span> <span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;=</span> <span class="token class-name">IntegerCache</span><span class="token punctuation">.</span>low <span class="token operator">&amp;&amp;</span> i <span class="token operator">&lt;=</span> <span class="token class-name">IntegerCache</span><span class="token punctuation">.</span>high<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token class-name">IntegerCache</span><span class="token punctuation">.</span>cache<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token operator">-</span><span class="token class-name">IntegerCache</span><span class="token punctuation">.</span>low<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Integer</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Integer 默认的缓存池数据范围是-128~127，可以通过调整虚拟机参数 <code>-XX:AutoBoxCacheMax=&lt;size&gt;</code> 来设置缓存的最大值</p><p>其他包装类也有类似的缓存池</p><ul><li>Boolean：TRUE、FALSE</li><li>Byte：-128~127</li><li>Short：-128~127</li><li>Long：-128~127</li><li>Character：\\u0000~\\u007F</li></ul><p>可能是考虑到开发人员使用包装类的习惯、频率，Java针对数据自动装箱时设计了一个对象缓存池。对象缓存池简单来说就是一个数组，当符合一定规则的时候，不去创建对象，而是从数组中拿对象出来使用，提高对象的复用率和性能。</p><h3 id="bigdecimal" tabindex="-1"><a class="header-anchor" href="#bigdecimal" aria-hidden="true">#</a> BigDecimal</h3><blockquote><p>由于浮点型数据无论基本数据类型还是包装类是都可能会是一个近似值，不是精确值。所以在一些数据敏感的计算场景下（如：金额计算），就需要使用保证数据精确的 <code>BigDecimal</code> 来完成运算</p></blockquote><p>常用方法</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 定义数据</span>
<span class="token keyword">public</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token class-name">String</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 比较两个数值之间的大小关系</span>
<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compareTo</span><span class="token punctuation">(</span><span class="token class-name">BigDecimal</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到构造方法我们推荐使用字符串来构造一个 <code>BigDecimal</code> 数据，使用 <code>Double</code> 类型来构造会造成精度丢失</p><h2 id="运算" tabindex="-1"><a class="header-anchor" href="#运算" aria-hidden="true">#</a> 运算</h2><h3 id="除法运算、模运算" tabindex="-1"><a class="header-anchor" href="#除法运算、模运算" aria-hidden="true">#</a> 除法运算、模运算</h3><blockquote><p>关于这两个运算不提太多，只提一下一些比较容易掉进坑里的场景。</p></blockquote><p>浮点数参与除法运算，无论除法是浮点数或被除数是浮点数或者两者皆是浮点数，运算的结果类型都是浮点数。</p><p>除不尽的情况会得到一个不太精准的结果。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token number">10.0</span> <span class="token operator">/</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>		<span class="token comment">// 3.3333333333333335</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>模运算实际上就是取除法运算中的余数</p><p>浮点数参与模运算，无论除法是否能除尽，运算的结果类型都是浮点数。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token number">10.0</span> <span class="token operator">%</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>		<span class="token comment">// 1.0</span>

<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token number">10.0</span> <span class="token operator">%</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>		<span class="token comment">// 0.0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>负数参与模运算，最好列一下式子，运算符合和被除数符号相同</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">9.0</span> <span class="token operator">%</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>		<span class="token comment">// -9.0/5=-1...(-4.0)</span>

<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token number">9.0</span> <span class="token operator">%</span> <span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>		<span class="token comment">// 9.0/(-5)=-1...4.0</span>

<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">9.0</span> <span class="token operator">%</span> <span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>		<span class="token comment">// -9.0/(-5)=1...(-4.0)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="位运算" tabindex="-1"><a class="header-anchor" href="#位运算" aria-hidden="true">#</a> 位运算</h3><blockquote><p>Java 中数据的展示用原码，运算用补码。</p></blockquote><p>用一个小例子展示位运算的功能</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">byte</span> a <span class="token operator">=</span> <span class="token number">15</span><span class="token punctuation">;</span>
    <span class="token keyword">byte</span> b <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">15</span><span class="token punctuation">;</span>
  
    <span class="token comment">// 把a、b换成补码形式</span>
    a <span class="token operator">=</span> <span class="token number">0000</span> <span class="token number">1111</span>
    b <span class="token operator">=</span> <span class="token number">1111</span> <span class="token number">0001</span>

    <span class="token comment">// &amp;按位与运算</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a <span class="token operator">&amp;</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">//0000 0001(补) = 0000 0001(原) = 1</span>
    <span class="token comment">// |按位或运算</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a <span class="token operator">|</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">//1111 1111(补) = 1000 0001(原) = -1</span>
    <span class="token comment">// ^按位异或运算</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a <span class="token operator">^</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">//1111 1110(补) = 1000 0010(原) = -2</span>
    <span class="token comment">// ~按位取反运算</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token operator">~</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">//1111 0000(补) = 1001 0000(原) = -16</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token operator">~</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">//0000 1110(补) = 0000 1110(原) = 14</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="移位运算" tabindex="-1"><a class="header-anchor" href="#移位运算" aria-hidden="true">#</a> 移位运算</h3><p>同样地，使用一个小例子来阐述移位运算的功能</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> test<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//左移运算符用“&lt;&lt;”表示，是将运算符左边的对象，向左移动运算符右边指定的位数，并且在低位补零。</span>
        <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span> c<span class="token punctuation">;</span>
        c <span class="token operator">=</span> a<span class="token operator">&lt;&lt;</span>b<span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;a 移位的结果是&quot;</span><span class="token operator">+</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span> 	<span class="token comment">//2&lt;&lt;2 = 0000 0010(原、补)&lt;&lt;2 = 0000 1000(原、补)=8</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> test<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//无符号右移运算符无符号用“&gt;&gt;&gt;”表示，是将运算符左边的对象向右移动运算符右边指定的位数，并且在高位补0，其实右移n位，就相当于除上2的n次方</span>
        <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">16</span><span class="token punctuation">,</span> b<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;a 移位的结果是&quot;</span><span class="token operator">+</span><span class="token punctuation">(</span>a<span class="token operator">&gt;&gt;&gt;</span>b<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//16&gt;&gt;&gt;2 = 0001 0000(原、补)&gt;&gt;&gt;2 = 0000 0100(原、补)=4</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> test<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//带符号右移运算符用“&gt;&gt;”表示，是将运算符左边的运算对象，向右移动运算符右边指定的位数。如果是正数，在高位补零，如果是负数，则在高位补1</span>
        <span class="token keyword">int</span> a<span class="token operator">=</span><span class="token number">16</span><span class="token punctuation">,</span> c<span class="token operator">=</span><span class="token operator">-</span><span class="token number">16</span><span class="token punctuation">,</span> b<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> d<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;a 的移位结果：&quot;</span><span class="token operator">+</span><span class="token punctuation">(</span>a<span class="token operator">&gt;&gt;</span>b<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//16&gt;&gt;2 = 0001 0000(原、补)&gt;&gt;2 = 0000 0100(原、补)=4</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;c 的移位结果：&quot;</span><span class="token operator">+</span><span class="token punctuation">(</span>c<span class="token operator">&gt;&gt;</span>d<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//-16&gt;&gt;2 = 1001 0000(原) 1111 0000(补)&gt;&gt;2 = 1111 1100(补) = 1000 0100(原)=-4</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外需要注意几个小细节：</p><ul><li><p>对于 <code>byte</code> 和 <code>short</code> 类型数值进行移位运算时会先升级为 <code>int</code> 类型再进行操作。</p></li><li><p>当进行乘法/除法运算时，如果乘数/除数是2的n次幂，可以使用移位操作完成，效率更高。</p></li></ul>`,42);function k(m,v){const a=e("RouterLink");return p(),o("div",null,[r,c("p",null,[n("此外还有一个很重要的引用数据类型：String，关于它放在这一篇里面说："),l(a,{to:"/writings/Java-base/String.html"},{default:i(()=>[n("揭开String的神秘面纱")]),_:1})]),d])}const h=t(u,[["render",k],["__file","data-and-operation.html.vue"]]);export{h as default};
