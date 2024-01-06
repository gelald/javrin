import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e}from"./app-f9042815.js";const t={},p=e(`<h1 id="uuid" tabindex="-1"><a class="header-anchor" href="#uuid" aria-hidden="true">#</a> UUID</h1><p><strong>UUID</strong> (Universally Unique Identifier)，通用唯一识别码</p><h2 id="组成部分" tabindex="-1"><a class="header-anchor" href="#组成部分" aria-hidden="true">#</a> 组成部分</h2><ol><li>当前日期和时间，UUID的第一个部分与时间有关，如果你在生成一个UUID之后，过几秒又生成一个UUID，则第一个部分不同，其余相同。</li><li>计数器，时钟序列</li><li>全局唯一的IEEE机器识别号，如果有网卡，从网卡<strong>MAC地址</strong>获得，没有网卡以其他方式获得。</li></ol><h2 id="格式" tabindex="-1"><a class="header-anchor" href="#格式" aria-hidden="true">#</a> 格式</h2><p>UUID 是由一组<strong>32位</strong>数的<strong>16进制数字</strong>所构成，以连字号分隔的五组来显示，形式为 8-4-4-4-12，总共有 36个字符（即三十二个英数字母和四个连字号）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>aefbbd3a-9cc5-4655-8363-a2a43e6e6c80
xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="版本" tabindex="-1"><a class="header-anchor" href="#版本" aria-hidden="true">#</a> 版本</h2><p>数字<code>M</code>表示UUID版本，当前规范有5个版本，可选值为：<code>1，2，3，4，5</code>，不同版本使用不同算法，适用不同场景</p><h3 id="version1" tabindex="-1"><a class="header-anchor" href="#version1" aria-hidden="true">#</a> Version1</h3><p>通过计算当前时间戳、随机数和MAC地址得到。由于在算法中使用了MAC地址，这个版本的UUID<strong>可以保证在全球范围的唯一性</strong>。但是使用MAC地址会带来安全性问题。同时，这个版本的UUID<strong>没考虑过一台机器上起了两个进程这类的问题</strong>，也没考虑相同时间戳的并发问题，所以严格的Version1没人实现，Version1的变种有Hibernate的CustomVersionOneStrategy.java、MongoDB的ObjectId.java、Twitter的snowflake等。</p><h3 id="version2" tabindex="-1"><a class="header-anchor" href="#version2" aria-hidden="true">#</a> Version2</h3><p>DCE（Distributed Computing Environment）安全的UUID和Version1算法相同，但会把时间戳的前4位置换为POSIX的UID或GID。这个版本的UUID在<strong>实际中较少用到</strong>。</p><h3 id="version3" tabindex="-1"><a class="header-anchor" href="#version3" aria-hidden="true">#</a> Version3</h3><p>通过计算名字和名字空间的MD5散列值得到。这个版本的UUID保证了<strong>相同名字空间中不同名字生成的UUID的唯一性</strong>；<strong>不同名字空间中的UUID的唯一性</strong>；<strong>相同名字空间中相同名字的UUID重复生成是相同的</strong>。</p><h3 id="version4" tabindex="-1"><a class="header-anchor" href="#version4" aria-hidden="true">#</a> Version4</h3><p>根据随机数，或者伪<strong>随机数生成</strong>UUID，128bit中，除去版本确定的4bit和variant确定的2bit，其它122bit全部由(伪)随机数信息确定</p><h3 id="version5" tabindex="-1"><a class="header-anchor" href="#version5" aria-hidden="true">#</a> Version5</h3><p>和Version3的UUID算法类似，只是散列值计算使用<strong>SHA1</strong>（Secure Hash Algorithm 1，安全Hash算法）算法</p><h2 id="优点" tabindex="-1"><a class="header-anchor" href="#优点" aria-hidden="true">#</a> 优点</h2><ul><li>代码简单，使用方便</li><li>本地生成，没有网络消耗，基本没有性能问题</li><li>全球唯一，<strong>在遇见数据迁移，系统数据合并，或者数据库变更等情况下，可以从容应对</strong></li></ul><h2 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点" aria-hidden="true">#</a> 缺点</h2><ul><li>采用无意义字符串，没有排序，无法保证趋势递增</li><li>UUID使用字符串形式存储，数据量大时查询效率比较低（和数字相比）</li><li>存储空间比较大，如果是海量数据库，就需要考虑存储量的问题</li></ul><h2 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h2><ul><li>类似生成token令牌的场景</li><li>对Id没有趋势递增要求的场景</li></ul><h2 id="uuid-java实现" tabindex="-1"><a class="header-anchor" href="#uuid-java实现" aria-hidden="true">#</a> UUID Java实现</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Static factory to retrieve a type 4 (pseudo randomly generated) UUID.
 * 使用静态工厂来获取版本4（伪随机数生成器）的 UUID
 * The <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token constant">UUID</span></span></span><span class="token punctuation">}</span> is generated using a cryptographically strong pseudo random number generator.
 * 这个UUID生成使用了强加密的伪随机数生成器(PRNG)
 *
 * <span class="token keyword">@return</span>  A randomly generated <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token constant">UUID</span></span></span><span class="token punctuation">}</span>
 */</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">UUID</span> <span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">SecureRandom</span> ng <span class="token operator">=</span> <span class="token class-name">Holder</span><span class="token punctuation">.</span>numberGenerator<span class="token punctuation">;</span>

    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> randomBytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">16</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    ng<span class="token punctuation">.</span><span class="token function">nextBytes</span><span class="token punctuation">(</span>randomBytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
    randomBytes<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span>  <span class="token operator">&amp;=</span> <span class="token number">0x0f</span><span class="token punctuation">;</span>  <span class="token comment">/* clear version        */</span>
    randomBytes<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span>  <span class="token operator">|=</span> <span class="token number">0x40</span><span class="token punctuation">;</span>  <span class="token comment">/* set to version 4     */</span>
    randomBytes<span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span>  <span class="token operator">&amp;=</span> <span class="token number">0x3f</span><span class="token punctuation">;</span>  <span class="token comment">/* clear variant        */</span>
    randomBytes<span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span>  <span class="token operator">|=</span> <span class="token number">0x80</span><span class="token punctuation">;</span>  <span class="token comment">/* set to IETF variant  */</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">UUID</span><span class="token punctuation">(</span>randomBytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * Static factory to retrieve a type 3 (name based) <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token constant">UUID</span></span></span><span class="token punctuation">}</span> based on
 * the specified byte array.
 * 静态工厂对版本3的实现，对于给定的字符串（name）总能生成相同的UUID
 * <span class="token keyword">@param</span>  <span class="token parameter">name</span>
 *         A byte array to be used to construct a <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token constant">UUID</span></span></span><span class="token punctuation">}</span>
 *
 * <span class="token keyword">@return</span>  A <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token constant">UUID</span></span></span><span class="token punctuation">}</span> generated from the specified array
 */</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">UUID</span> <span class="token function">nameUUIDFromBytes</span><span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">MessageDigest</span> md<span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        md <span class="token operator">=</span> <span class="token class-name">MessageDigest</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token string">&quot;MD5&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">NoSuchAlgorithmException</span> nsae<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">InternalError</span><span class="token punctuation">(</span><span class="token string">&quot;MD5 not supported&quot;</span><span class="token punctuation">,</span> nsae<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> md5Bytes <span class="token operator">=</span> md<span class="token punctuation">.</span><span class="token function">digest</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    md5Bytes<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span>  <span class="token operator">&amp;=</span> <span class="token number">0x0f</span><span class="token punctuation">;</span>  <span class="token comment">/* clear version        */</span>
    md5Bytes<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span>  <span class="token operator">|=</span> <span class="token number">0x30</span><span class="token punctuation">;</span>  <span class="token comment">/* set to version 3     */</span>
    md5Bytes<span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span>  <span class="token operator">&amp;=</span> <span class="token number">0x3f</span><span class="token punctuation">;</span>  <span class="token comment">/* clear variant        */</span>
    md5Bytes<span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span>  <span class="token operator">|=</span> <span class="token number">0x80</span><span class="token punctuation">;</span>  <span class="token comment">/* set to IETF variant  */</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">UUID</span><span class="token punctuation">(</span>md5Bytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="snowflake" tabindex="-1"><a class="header-anchor" href="#snowflake" aria-hidden="true">#</a> Snowflake</h1><p>SnowFlake 算法，是 Twitter 开源的分布式 id 生成算法，能保证不同表的主键不重复，也能保证同一张表中的主键的有序性。其核心思想就是：使用一个 64位的 long 型的<strong>数字</strong>作为全局唯一id。在分布式系统中的应用十分广泛，且id引入了时间戳，<strong>基本上保持自增的</strong>。</p><h2 id="格式-1" tabindex="-1"><a class="header-anchor" href="#格式-1" aria-hidden="true">#</a> 格式</h2><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/813155-20200511162334239-459232117.png" alt=""></p><ul><li>1bit 首位为符号位，标识这个数是一个正数</li><li>41bit 时间戳（毫秒级），41位可以表示2^41 -1个数字，2^41-1毫秒，换算后是69年。一般不是存时间戳，而是存当前时间戳和设定的初始时间戳(一般是id生成器开始使用的时间)的差值，且一般不会完全用完41位，没用到的补0</li><li>10 bit 工作机器id <ul><li>5bit datacenterId机房id</li><li>5bit workerId机器id</li></ul></li><li>12bit 序列号，用来记录同一个datacenterId中某一个机器上同毫秒内产生的不同id，12位序列在<strong>1毫秒内可以产生4096个Id序号</strong></li></ul><h2 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h2><ul><li>时间位：可以根据时间进行排序，有助于提高查询速度</li><li>机器id位：适用于分布式环境下对多节点的各个节点进行标识，可以具体根据节点数和部署情况设计划分机器位10位长度，如划分5位表示进程位等</li><li>序列号位：是一系列的自增id，可以支持同一节点同一毫秒生成多个ID序号，12位的计数序列号支持每个节点每毫秒产生4096个ID序号</li><li>可以<strong>根据项目情况以及自身需要进行一定的修改</strong></li></ul><h2 id="优点-1" tabindex="-1"><a class="header-anchor" href="#优点-1" aria-hidden="true">#</a> 优点</h2><ul><li>毫秒数在高位，自增位在低位，<strong>整个ID都是递增趋势</strong>的，在整个分布式系统中不会发生ID碰撞</li><li>不依赖数据库等第三方系统，可以以服务的方式部署，稳定性更高</li><li>生成ID的性能也是非常高的，每秒生成的ID数是百万级别的(409.6万个id)</li><li>可以<strong>根据自身业务特性分配bit位</strong>，非常灵活</li></ul><h2 id="缺点-1" tabindex="-1"><a class="header-anchor" href="#缺点-1" aria-hidden="true">#</a> 缺点</h2><ul><li>雪花算法在单机系统上id是递增的，但是在分布式系统多节点的情况下，所有节点的时钟并不能保证完全同步，所以有可能会出现不是全局递增的情况。<strong>如果系统时间被回调，或者改变，可能会造成id冲突或者重复</strong>。</li></ul><h2 id="java实现snowflake" tabindex="-1"><a class="header-anchor" href="#java实现snowflake" aria-hidden="true">#</a> Java实现Snowflake</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Author: wuyb<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">&gt;</span></span>
 * Date: 2021/3/30<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">&gt;</span></span>
 * Twitter_Snowflake<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">&gt;</span></span>
 * SnowFlake的结构如下(每部分用-分开):<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">&gt;</span></span>
 * 0 - 0000000000 0000000000 0000000000 0000000000 0 - 00000 - 00000 - 000000000000 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">&gt;</span></span>
 * 1位标识，由于long基本类型在Java中是带符号的，最高位是符号位，正数是0，负数是1，所以id一般是正数，最高位是0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">&gt;</span></span>
 * 41位时间截(毫秒级)，注意，41位时间截不是存储当前时间的时间截，而是存储时间截的差值（当前时间截 - 开始时间截)
 * 得到的值），这里的的开始时间截，一般是我们的id生成器开始使用的时间，由我们程序来指定的（如下下面程序IdWorker类的startTime属性）。41位的时间截，可以使用69年，年T = (1L &lt;&lt; 41) / (1000L * 60 * 60 * 24 * 365) = 69<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">&gt;</span></span>
 * 10位的数据机器位，可以部署在1024个节点，包括5位datacenterId和5位workerId<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">&gt;</span></span>
 * 12位序列，毫秒内的计数，12位的计数顺序号支持每个节点每毫秒(同一机器，同一时间截)产生4096个ID序号<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">&gt;</span></span>
 * 加起来刚好64位，为一个Long型。<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">&gt;</span></span>
 * SnowFlake的优点是，整体上按照时间自增排序，并且整个分布式系统内不会产生ID碰撞(由数据中心ID和机器ID作区分)，并且效率较高，经测试，SnowFlake每秒能够产生26万ID左右。
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SnowflakeIdWorker</span> <span class="token punctuation">{</span>


    <span class="token comment">// ==============================Fields===========================================</span>
    <span class="token doc-comment comment">/**
     * 开始时间截 (2015-01-01)
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">long</span> twepoch <span class="token operator">=</span> <span class="token number">1420041600000L</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 机器id所占的位数
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">long</span> workerIdBits <span class="token operator">=</span> <span class="token number">5L</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 数据标识id所占的位数
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">long</span> datacenterIdBits <span class="token operator">=</span> <span class="token number">5L</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 支持的最大机器id，结果是31 (这个移位算法可以很快的计算出几位二进制数所能表示的最大十进制数)
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">long</span> maxWorkerId <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1L</span> <span class="token operator">^</span> <span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1L</span> <span class="token operator">&lt;&lt;</span> workerIdBits<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 支持的最大数据标识id，结果是31
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">long</span> maxDatacenterId <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1L</span> <span class="token operator">^</span> <span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1L</span> <span class="token operator">&lt;&lt;</span> datacenterIdBits<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 序列在id中占的位数
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">long</span> sequenceBits <span class="token operator">=</span> <span class="token number">12L</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 机器ID向左移12位
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">long</span> workerIdShift <span class="token operator">=</span> sequenceBits<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 数据标识id向左移17位(12+5)
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">long</span> datacenterIdShift <span class="token operator">=</span> sequenceBits <span class="token operator">+</span> workerIdBits<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 时间截向左移22位(5+5+12)
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">long</span> timestampLeftShift <span class="token operator">=</span> sequenceBits <span class="token operator">+</span> workerIdBits <span class="token operator">+</span> datacenterIdBits<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 生成序列的掩码，这里为4095 (0b111111111111=0xfff=4095)
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">long</span> sequenceMask <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1L</span> <span class="token operator">^</span> <span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1L</span> <span class="token operator">&lt;&lt;</span> sequenceBits<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 工作机器ID(0~31)
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> workerId<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 数据中心ID(0~31)
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> datacenterId<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 毫秒内序列(0~4095)
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> sequence <span class="token operator">=</span> <span class="token number">0L</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 上次生成ID的时间截
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> lastTimestamp <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1L</span><span class="token punctuation">;</span>


    <span class="token comment">//==============================Constructors=====================================</span>

    <span class="token doc-comment comment">/**
     * 构造函数
     *
     * <span class="token keyword">@param</span> <span class="token parameter">workerId</span>     工作ID (0~31)
     * <span class="token keyword">@param</span> <span class="token parameter">datacenterId</span> 数据中心ID (0~31)
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">SnowflakeIdWorker</span><span class="token punctuation">(</span><span class="token keyword">long</span> workerId<span class="token punctuation">,</span> <span class="token keyword">long</span> datacenterId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>workerId <span class="token operator">&gt;</span> maxWorkerId <span class="token operator">||</span> workerId <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;worker Id can&#39;t be greater than %d or less than 0&quot;</span><span class="token punctuation">,</span> maxWorkerId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>datacenterId <span class="token operator">&gt;</span> maxDatacenterId <span class="token operator">||</span> datacenterId <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;datacenter Id can&#39;t be greater than %d or less than 0&quot;</span><span class="token punctuation">,</span> maxDatacenterId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>workerId <span class="token operator">=</span> workerId<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>datacenterId <span class="token operator">=</span> datacenterId<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token comment">// ==============================Methods==========================================</span>

    <span class="token doc-comment comment">/**
     * 获得下一个ID (该方法是线程安全的)
     *
     * <span class="token keyword">@return</span> SnowflakeId
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">long</span> <span class="token function">nextId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">long</span> timestamp <span class="token operator">=</span> <span class="token function">timeGen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//如果当前时间小于上一次ID生成的时间戳，说明系统时钟回退过这个时候应当抛出异常</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>timestamp <span class="token operator">&lt;</span> lastTimestamp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>
                    <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;Clock moved backwards.  Refusing to generate id for %d milliseconds&quot;</span><span class="token punctuation">,</span> lastTimestamp <span class="token operator">-</span> timestamp<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//如果是同一时间生成的，则进行毫秒内序列</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>lastTimestamp <span class="token operator">==</span> timestamp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            sequence <span class="token operator">=</span> <span class="token punctuation">(</span>sequence <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> sequenceMask<span class="token punctuation">;</span>
            <span class="token comment">//毫秒内序列溢出</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>sequence <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//阻塞到下一个毫秒,获得新的时间戳</span>
                timestamp <span class="token operator">=</span> <span class="token function">tilNextMillis</span><span class="token punctuation">(</span>lastTimestamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//时间戳改变，毫秒内序列重置</span>
        <span class="token keyword">else</span> <span class="token punctuation">{</span>
            sequence <span class="token operator">=</span> <span class="token number">0L</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//上次生成ID的时间截</span>
        lastTimestamp <span class="token operator">=</span> timestamp<span class="token punctuation">;</span>

        <span class="token comment">//移位并通过或运算拼到一起组成64位的ID</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>timestamp <span class="token operator">-</span> twepoch<span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> timestampLeftShift<span class="token punctuation">)</span> <span class="token comment">//</span>
                <span class="token operator">|</span> <span class="token punctuation">(</span>datacenterId <span class="token operator">&lt;&lt;</span> datacenterIdShift<span class="token punctuation">)</span> <span class="token comment">//</span>
                <span class="token operator">|</span> <span class="token punctuation">(</span>workerId <span class="token operator">&lt;&lt;</span> workerIdShift<span class="token punctuation">)</span> <span class="token comment">//</span>
                <span class="token operator">|</span> sequence<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 阻塞到下一个毫秒，直到获得新的时间戳
     *
     * <span class="token keyword">@param</span> <span class="token parameter">lastTimestamp</span> 上次生成ID的时间截
     * <span class="token keyword">@return</span> 当前时间戳
     */</span>
    <span class="token keyword">protected</span> <span class="token keyword">long</span> <span class="token function">tilNextMillis</span><span class="token punctuation">(</span><span class="token keyword">long</span> lastTimestamp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">long</span> timestamp <span class="token operator">=</span> <span class="token function">timeGen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>timestamp <span class="token operator">&lt;=</span> lastTimestamp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            timestamp <span class="token operator">=</span> <span class="token function">timeGen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> timestamp<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 返回以毫秒为单位的当前时间
     *
     * <span class="token keyword">@return</span> 当前时间(毫秒)
     */</span>
    <span class="token keyword">protected</span> <span class="token keyword">long</span> <span class="token function">timeGen</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token comment">//==============================Test=============================================</span>
    <span class="token doc-comment comment">/** 测试 */</span>
    <span class="token comment">/*public static void main(String[] args) {
        SnowflakeIdWorker idWorker = new SnowflakeIdWorker(5, 19);
        for (int i = 0; i &lt; 1000; i++) {
            long id = idWorker.nextId();
            System.out.println(Long.toBinaryString(id));
            System.out.println(id);
        }
    }*/</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="数据库自增id" tabindex="-1"><a class="header-anchor" href="#数据库自增id" aria-hidden="true">#</a> 数据库自增ID</h1><p>利用给字段设置auto_increment_increment和auto_increment_offset来保证ID自增</p><h2 id="优点-2" tabindex="-1"><a class="header-anchor" href="#优点-2" aria-hidden="true">#</a> 优点</h2><ul><li>利用现有数据库系统的功能实现，实现成本小</li><li>id保证单调递增</li><li>查询速度快</li></ul><h2 id="缺点-2" tabindex="-1"><a class="header-anchor" href="#缺点-2" aria-hidden="true">#</a> 缺点</h2><ul><li>强依赖数据库，当数据库异常时，整个系统不可用</li><li>id发号性能瓶颈限制在单台MySQL的读写性能</li><li>分表分库，数据迁移合并等比较麻烦（id重复）</li></ul><h1 id="数据库集群模式" tabindex="-1"><a class="header-anchor" href="#数据库集群模式" aria-hidden="true">#</a> 数据库集群模式</h1><p>对单点数据库进行优化，改造成主从模式集群，两个MySQL实例都单独生产自增id、</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- MySQL Master
set @@auto_increment_offset = 1;		-- 起始值
set @@auto_increment_increment = 2;		-- 步长

-- MySQL Slave
set @@auto_increment_offset = 2;		-- 起始值
set @@auto_increment_increment = 2;		-- 步长
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样两个实例产生的id就可以交替地自增了</p><h2 id="优点-3" tabindex="-1"><a class="header-anchor" href="#优点-3" aria-hidden="true">#</a> 优点</h2><p>解决数据库单点问题</p><h2 id="缺点-3" tabindex="-1"><a class="header-anchor" href="#缺点-3" aria-hidden="true">#</a> 缺点</h2><p>不利于后续扩容（如再加一个从数据库，id无法保证不重复），并且每个数据库自身压力还是非常大，依旧无法满足高并发场景</p><h2 id="应用场景-1" tabindex="-1"><a class="header-anchor" href="#应用场景-1" aria-hidden="true">#</a> 应用场景</h2><ul><li>数据库不需要扩容的场景</li></ul><h1 id="数据库号段模式" tabindex="-1"><a class="header-anchor" href="#数据库号段模式" aria-hidden="true">#</a> 数据库号段模式</h1><p><strong>号段模式可以理解成从数据库批量地获取自增</strong>，每次从数据库取出一个号段范围，例如 (1,1000] 代表1000个ID，具体的业务服务将本号段，生成1~1000的自增ID并加载到内存</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE id_generator (
  \`id\` int(10) NOT NULL,
  \`max_id\` bigint(20) NOT NULL COMMENT &#39;当前最大的可用id&#39;,
  \`step\` int(20) NOT NULL COMMENT &#39;号段的步长&#39;,
  \`biz_type\`    int(20) NOT NULL COMMENT &#39;业务类型&#39;,
  \`version\` int(20) NOT NULL COMMENT &#39;版本号，是一个乐观锁，每次都更新version，保证并发时数据的正确性&#39;,
  PRIMARY KEY (\`id\`)
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>每一类业务单独使用一批id</li><li>当使用完一批id后，再次向数据库申请新号段，对max_id字段做一次update操作，新的号段范围是(max_id, max_id+step]</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>update id_generator set max_id = (max_id+step), version = (version+1) where version =  {version} and biz_type = XX
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>由于多业务端可能同时操作，所以采用版本号 version 乐观锁方式更新，这种分布式ID生成方式<strong>不强依赖于数据库</strong>，不会频繁的访问数据库，对数据库的压力小很多。但是如果遇到了双十一或者秒杀类似的活动还是会对数据库有比较高的访问。</li></ul><h2 id="双buffer方案" tabindex="-1"><a class="header-anchor" href="#双buffer方案" aria-hidden="true">#</a> 双buffer方案</h2><p>双buffer方案达到了Id都是从内存中获取，性能更好，允许数据库宕机的时间更长了，因为会有一个线程观察什么时候去自动获取Id，在两个buffer之间自行切换</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/640.png" alt=""></p><ol><li>从buffer1中获取Id</li><li>当buffer1中的Id已经使用了10%后，先判断buffer2中有没有去获取过Id，如果没有就立即发起请求获取Id线程，此线程把获取到的Id存放到buffer2中</li><li>如果buffer1的Id用完了，会自动切换buffer2中</li><li>如果buffer2的Id用到10%了，也会像第2步中，获取Id，存放到buffer1中</li></ol><h1 id="redis生成方案" tabindex="-1"><a class="header-anchor" href="#redis生成方案" aria-hidden="true">#</a> Redis生成方案</h1><p>利用redis的<strong>incr</strong>原子性自增</p><h2 id="优点-4" tabindex="-1"><a class="header-anchor" href="#优点-4" aria-hidden="true">#</a> 优点</h2><ul><li>有序递增，可读性强</li></ul><h2 id="缺点-4" tabindex="-1"><a class="header-anchor" href="#缺点-4" aria-hidden="true">#</a> 缺点</h2><ul><li>占用带宽，每次要向redis进行请求</li></ul>`,72),i=[p];function o(l,c){return s(),a("div",null,i)}const u=n(t,[["render",o],["__file","PrimaryKey.html.vue"]]);export{u as default};
