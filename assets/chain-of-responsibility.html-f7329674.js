import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as p}from"./app-85442c0b.js";const t={},e=p(`<h1 id="责任链模式" tabindex="-1"><a class="header-anchor" href="#责任链模式" aria-hidden="true">#</a> 责任链模式</h1><p>定义：将链中每一个结点看作一个对象，每个节点处理的请求均不相同，且内部自动维护一个下一结点的对象。每一个请求从链式的首端发出时，会沿着链的路径依次传递给每一个结点对象，直到有对象处理这个请求为止</p><p>本质：把请求和处理解耦，可以让请求在处理链中传递，最后被处理</p><p>适用场景：</p><ol><li>多个对象可以处理同一请求，但具体由哪个对象处理则要在运行时动态决定</li><li>在不明确指定接受者的情况下，向多个对象中的一个提交一次请求</li><li>可动态指定一组对象处理请求</li></ol><p>优点：</p><ol><li>将请求和处理解耦，请求发送者不需要关心链路结构，只需等待结果</li><li>节点对象只需关注自己感兴趣的请求进行处理即可，对于不感兴趣的、无法处理的，直接转发到下一个节点对象</li><li>易于扩展新的或移除旧的节点对象，动态调整链路结构</li></ol><p>缺点：</p><ol><li>责任链太长或者处理时间太长，会影响整体性能</li><li>如果链路中节点对象存在循环引用的情况，会造成系统崩溃</li></ol><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2><p>以登录认证的流程为例，假设登录时需要完成三个操作</p><ol><li>判断用户名和密码是否为空</li><li>进行登录</li><li>权限校验</li></ol><p>这些操作都是必须要做的，而且都是有严格的先后顺序，使用 <code>if...else...</code> 代码块不美观，使用责任链模式可以把这些步骤都串联起来</p><p>用户类</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Member</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> loginName<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> loginPass<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> roleName<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Member</span><span class="token punctuation">(</span><span class="token class-name">String</span> loginName<span class="token punctuation">,</span> <span class="token class-name">String</span> loginPass<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>loginName <span class="token operator">=</span> loginName<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>loginPass <span class="token operator">=</span> loginPass<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// get、set 方法省略</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>处理业务逻辑的抽象 Handler，定义了一个抽象方法 <code>doHandler</code> ，具体处理的逻辑需要子类自行实现，同时维护了下一个处理对象节点。使用建造者模式来完成责任链的构建，更优雅</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Handler</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token class-name">Handler</span> next<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token class-name">Handler</span> next<span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>next <span class="token operator">=</span> next<span class="token punctuation">;</span><span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">doHandler</span><span class="token punctuation">(</span><span class="token class-name">Member</span> member<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Builder</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">Handler</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> head<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">Handler</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> tail<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Builder</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">addHandler</span><span class="token punctuation">(</span><span class="token class-name">Handler</span> handler<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>tail <span class="token operator">=</span> handler<span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 头指针不移动，始终指向第一个，每次都把尾指针往后挪</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>tail<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>tail <span class="token operator">=</span> handler<span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token class-name">Handler</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>判断用户名密码是否为空的节点</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ValidateHandler</span> <span class="token keyword">extends</span> <span class="token class-name">Handler</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doHandler</span><span class="token punctuation">(</span><span class="token class-name">Member</span> member<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>member<span class="token punctuation">.</span><span class="token function">getLoginName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">||</span>
                <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>member<span class="token punctuation">.</span><span class="token function">getLoginPass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;用户名和密码为空&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;用户名和密码不为空，可以往下执行&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">!=</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            next<span class="token punctuation">.</span><span class="token function">doHandler</span><span class="token punctuation">(</span>member<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成登录动作的节点</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LoginHandler</span> <span class="token keyword">extends</span> <span class="token class-name">Handler</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doHandler</span><span class="token punctuation">(</span><span class="token class-name">Member</span> member<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;登录成功！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        member<span class="token punctuation">.</span><span class="token function">setRoleName</span><span class="token punctuation">(</span><span class="token string">&quot;管理员&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">!=</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            next<span class="token punctuation">.</span><span class="token function">doHandler</span><span class="token punctuation">(</span>member<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>校验权限的节点</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AuthHandler</span> <span class="token keyword">extends</span> <span class="token class-name">Handler</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doHandler</span><span class="token punctuation">(</span><span class="token class-name">Member</span> member<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token string">&quot;管理员&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>member<span class="token punctuation">.</span><span class="token function">getRoleName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;您不是管理员，没有操作权限&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;允许操作&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用门面模式封装所有细节，提供一个对外使用的方法</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MemberService</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token class-name">String</span> loginName<span class="token punctuation">,</span><span class="token class-name">String</span> loginPass<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">Handler<span class="token punctuation">.</span>Builder</span> builder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Handler<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        builder<span class="token punctuation">.</span><span class="token function">addHandler</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ValidateHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
               <span class="token punctuation">.</span><span class="token function">addHandler</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">LoginHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
               <span class="token punctuation">.</span><span class="token function">addHandler</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">AuthHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        builder<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">doHandler</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Member</span><span class="token punctuation">(</span>loginName<span class="token punctuation">,</span>loginPass<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>客户端调用</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MemberService</span> memberService <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MemberService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        memberService<span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token string">&quot;tom&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;666&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="责任链模式在源码中的体现" tabindex="-1"><a class="header-anchor" href="#责任链模式在源码中的体现" aria-hidden="true">#</a> 责任链模式在源码中的体现</h2><h3 id="spring" tabindex="-1"><a class="header-anchor" href="#spring" aria-hidden="true">#</a> Spring</h3><p>Servlet 中定义了一个过滤器的接口，里面有一个抽象方法 <code>doFilter()</code> 负责执行具体的过滤工作，相当于责任链模式中的抽象节点的角色</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Filter</span> <span class="token punctuation">{</span>
    <span class="token keyword">default</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token class-name">FilterConfig</span> filterConfig<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">doFilter</span><span class="token punctuation">(</span><span class="token class-name">ServletRequest</span> var1<span class="token punctuation">,</span> <span class="token class-name">ServletResponse</span> var2<span class="token punctuation">,</span> <span class="token class-name">FilterChain</span> var3<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">ServletException</span><span class="token punctuation">;</span>

    <span class="token keyword">default</span> <span class="token keyword">void</span> <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中最后一个参数 <code>FilterChain</code> 也是Servlet 中定义的一个过滤器链的接口</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">FilterChain</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">doFilter</span><span class="token punctuation">(</span><span class="token class-name">ServletRequest</span> var1<span class="token punctuation">,</span> <span class="token class-name">ServletResponse</span> var2<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">ServletException</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体的串联可以看到 Spring 中的 <code>MockFilterChain</code> 类，把过滤器链中的所有 <code>Filter</code> 放到集合中，然后在调用 <code>doFilter()</code> 方法中迭代这个集合，使得集合中的所有 <code>Filter</code> 可以按顺序执行，因为 <code>Filter</code> 中的 <code>doFilter()</code> 方法最后会调用传入的 <code>FilterChain</code> 的 <code>doFilter()</code> 方法</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MockFilterChain</span> <span class="token keyword">implements</span> <span class="token class-name">FilterChain</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Nullable</span>
    <span class="token keyword">private</span> <span class="token class-name">ServletRequest</span> request<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Nullable</span>
    <span class="token keyword">private</span> <span class="token class-name">ServletResponse</span> response<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Filter</span><span class="token punctuation">&gt;</span></span> filters<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Nullable</span>
    <span class="token keyword">private</span> <span class="token class-name">Iterator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Filter</span><span class="token punctuation">&gt;</span></span> iterator<span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doFilter</span><span class="token punctuation">(</span><span class="token class-name">ServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">ServletResponse</span> response<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">notNull</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> <span class="token string">&quot;Request must not be null&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">notNull</span><span class="token punctuation">(</span>response<span class="token punctuation">,</span> <span class="token string">&quot;Response must not be null&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">state</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>request <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">&quot;This FilterChain has already been called!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>iterator <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>iterator <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>filters<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>iterator<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Filter</span> nextFilter <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Filter</span><span class="token punctuation">)</span><span class="token keyword">this</span><span class="token punctuation">.</span>iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            nextFilter<span class="token punctuation">.</span><span class="token function">doFilter</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>request <span class="token operator">=</span> request<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>response <span class="token operator">=</span> response<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,35),c=[e];function o(l,i){return s(),a("div",null,c)}const d=n(t,[["render",o],["__file","chain-of-responsibility.html.vue"]]);export{d as default};