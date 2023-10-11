import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as d,e as n}from"./app-859571d0.js";const l={},r=n('<h1 id="设计模式" tabindex="-1"><a class="header-anchor" href="#设计模式" aria-hidden="true">#</a> 设计模式</h1><p><strong>最重要的目的：解耦</strong></p><p>开发时区分开，运行时合并用</p><h2 id="创建型" tabindex="-1"><a class="header-anchor" href="#创建型" aria-hidden="true">#</a> 创建型</h2><p>简单来说目的就是new对象的</p><p>对类的实例化进行了抽象，能够使软件模块做到与对象的创建和代码组织无关</p><h2 id="结构型" tabindex="-1"><a class="header-anchor" href="#结构型" aria-hidden="true">#</a> 结构型</h2><p>简单来说是用于控制代码组成结构的、代码的表现形式</p><p>描述类和对象之间如何进行有效的组织，以形成良好的软件体系结构，主要的方式是使用继承方式来组织各个类</p><h2 id="行为型" tabindex="-1"><a class="header-anchor" href="#行为型" aria-hidden="true">#</a> 行为型</h2><p>简单来说是用于控制逻辑的</p><p>描述类和对象之间如何交互以及如何分配职责</p><h2 id="各设计模式间对比" tabindex="-1"><a class="header-anchor" href="#各设计模式间对比" aria-hidden="true">#</a> 各设计模式间对比</h2><h3 id="策略模式-vs-委派模式" tabindex="-1"><a class="header-anchor" href="#策略模式-vs-委派模式" aria-hidden="true">#</a> 策略模式 vs 委派模式</h3><p>共同点：行为型模式</p><p>不同点：策略模式关注的是能否相互替换；委派模式关注的是分发和调度的过程</p><h3 id="工厂方法模式-vs-抽象工厂模式" tabindex="-1"><a class="header-anchor" href="#工厂方法模式-vs-抽象工厂模式" aria-hidden="true">#</a> 工厂方法模式 vs 抽象工厂模式</h3><p>共同点：创建型模式</p><p>不同点：工厂方法模式单维度扩展；抽象工厂可以实现产品等级、产品族多维度扩展</p><h3 id="中介者模式-vs-桥接模式" tabindex="-1"><a class="header-anchor" href="#中介者模式-vs-桥接模式" aria-hidden="true">#</a> 中介者模式 vs 桥接模式</h3><p>共同点：具备将两个对象建立联系的动作</p><p>不同点：</p><ol><li>中介者是行为型模式；桥接模式结构型模式</li><li>中介者模式将多维度网状结构的对象建立联系；桥接模式将抽象、具象两个维度对象建立联系</li></ol><h3 id="委派模式-vs-代理模式" tabindex="-1"><a class="header-anchor" href="#委派模式-vs-代理模式" aria-hidden="true">#</a> 委派模式 vs 代理模式</h3><p>共同点：都能保护目标对象</p><p>不同点：</p><ol><li>委派模式是行为型模式；代理模式结构型模式</li><li>委派模式是一种全权静态代理，不对目标类的功能增强；代理模式会对目标类进行功能增强</li></ol><h3 id="代理模式-vs-中介者模式" tabindex="-1"><a class="header-anchor" href="#代理模式-vs-中介者模式" aria-hidden="true">#</a> 代理模式 vs 中介者模式</h3><p>共同点：都能保护目标对象</p><p>不同点：</p><ol><li>代理模式时结构型模式；中介者模式是行为型模式</li><li>代理模式建立目标对象和代理对象的联系还要做功能增强；中介者模式只做建立联系的牵线搭桥工作，不参与具体过程</li></ol><h3 id="桥接模式-vs-适配器模式" tabindex="-1"><a class="header-anchor" href="#桥接模式-vs-适配器模式" aria-hidden="true">#</a> 桥接模式 vs 适配器模式</h3><p>共同点：结构型模式</p><p>不同点：</p><ol><li>适配器模式希望已有代码是稳定的；桥接模式希望已有代码是可扩展的</li><li>桥接模式不推荐使用继承，适配器模式会采用继承</li></ol><h3 id="建造者模式-vs-工厂模式" tabindex="-1"><a class="header-anchor" href="#建造者模式-vs-工厂模式" aria-hidden="true">#</a> 建造者模式 vs 工厂模式</h3><p>共同点：创建型模式，封装创建产品的细节</p><p>不同点：</p><ol><li>工厂模式希望封装细节创建标准产品，建造者模式希望创建定制化产品</li><li>工厂模式产品复杂程度比建造者模式的要复杂，建造者模式产品颗粒度更细</li><li>工厂模式一般是单例的，建造者模式一般是多例的</li></ol><h3 id="代理模式-vs-适配器模式" tabindex="-1"><a class="header-anchor" href="#代理模式-vs-适配器模式" aria-hidden="true">#</a> 代理模式 vs 适配器模式</h3><p>共同点：</p><ol><li>结构型模式</li><li>都有保护目标对象的作用</li></ol><p>不同点：代理模式为了功能增强；适配器模式为了解决兼容问题</p><h3 id="适配器模式-vs-装饰器模式" tabindex="-1"><a class="header-anchor" href="#适配器模式-vs-装饰器模式" aria-hidden="true">#</a> 适配器模式 vs 装饰器模式</h3><p>共同点：结构型模式</p><p>不同点：</p><ol><li>代码结构不同，装饰器同宗同源，适配器不需要同宗同源</li><li>适配器模式模式为了解决兼容问题，装饰器模式为了不改变原有功能的基础上增强</li></ol><h3 id="桥接模式-vs-组合模式" tabindex="-1"><a class="header-anchor" href="#桥接模式-vs-组合模式" aria-hidden="true">#</a> 桥接模式 vs 组合模式</h3><p>共同点：行为型模式</p><p>不同点：桥接模式目的是将具象和抽象两个维度的继承体系建立联系；组合模式的目的是为了统一的API</p><h3 id="策略模式-vs-模板方法模式" tabindex="-1"><a class="header-anchor" href="#策略模式-vs-模板方法模式" aria-hidden="true">#</a> 策略模式 vs 模板方法模式</h3><p>共同点：</p><ol><li>行为型模式</li><li>可以将底层和应用层代码的某些细节分离</li></ol><p>不同点：策略模式可以提供策略给用户选择；模板方法模式是在一个标准化的流程中开放某些微调的操作给用户</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><table><thead><tr><th style="text-align:center;">设计模式</th><th style="text-align:center;">目的</th><th style="text-align:center;">案例</th><th style="text-align:center;">框架源码</th><th style="text-align:center;">一句话归纳</th></tr></thead><tbody><tr><td style="text-align:center;">工厂模式</td><td style="text-align:center;">封装创建细节</td><td style="text-align:center;">实体工厂</td><td style="text-align:center;">LoggerFactory<br>BeanFactory</td><td style="text-align:center;">产品标准化，生产更高效</td></tr><tr><td style="text-align:center;">单例模式</td><td style="text-align:center;">保证实例唯一性</td><td style="text-align:center;">CEO、太阳</td><td style="text-align:center;">Calendar<br>ApplicationContext</td><td style="text-align:center;">保证实例唯一性</td></tr><tr><td style="text-align:center;">原型模式</td><td style="text-align:center;">高效创建对象</td><td style="text-align:center;">克隆</td><td style="text-align:center;">ArrayList<br>PrototypeBean</td><td style="text-align:center;">避免用构造方法创建对象</td></tr><tr><td style="text-align:center;">建造者模式</td><td style="text-align:center;">开放个性配置步骤</td><td style="text-align:center;">选配</td><td style="text-align:center;">StringBuilder<br>BeanDefinitionBuilder</td><td style="text-align:center;">个性化配置</td></tr><tr><td style="text-align:center;">代理模式</td><td style="text-align:center;">增强职责</td><td style="text-align:center;">媒婆</td><td style="text-align:center;">CglibAopProxy<br>ProxyFactoryBean</td><td style="text-align:center;">-</td></tr><tr><td style="text-align:center;">门面模式</td><td style="text-align:center;">统一访问入口</td><td style="text-align:center;">前台</td><td style="text-align:center;">JdbcUtils<br>RequestFacade</td><td style="text-align:center;">打开一扇门，走向全世界</td></tr><tr><td style="text-align:center;">装饰器模式</td><td style="text-align:center;">灵活扩展，同宗同源</td><td style="text-align:center;">奶茶</td><td style="text-align:center;">BufferReader<br>InputStream</td><td style="text-align:center;">-</td></tr><tr><td style="text-align:center;">享元模式</td><td style="text-align:center;">共享资源池</td><td style="text-align:center;">线程池</td><td style="text-align:center;">String、Integer<br>ObjectPool</td><td style="text-align:center;">优化资源配置，减少重复浪费</td></tr><tr><td style="text-align:center;">组合模式</td><td style="text-align:center;">统一整体和个体</td><td style="text-align:center;">组织架构树</td><td style="text-align:center;">HashMap<br>SqlNode</td><td style="text-align:center;">-</td></tr><tr><td style="text-align:center;">适配器模式</td><td style="text-align:center;">兼容互换，求同存异</td><td style="text-align:center;">电源适配器</td><td style="text-align:center;">AdvisorAdapter<br>HandlerAdapter</td><td style="text-align:center;">亡羊补牢的手段</td></tr><tr><td style="text-align:center;">桥接模式</td><td style="text-align:center;">不允许使用继承</td><td style="text-align:center;">桥</td><td style="text-align:center;">DriverManager</td><td style="text-align:center;">约定优于配置</td></tr><tr><td style="text-align:center;">委派模式</td><td style="text-align:center;">只对结果负责</td><td style="text-align:center;">项目经理</td><td style="text-align:center;">ClassLoader<br>BeanDefinitionParserDelegate</td><td style="text-align:center;">这个需求很简单，怎么实现我不管</td></tr><tr><td style="text-align:center;">模板方法模式</td><td style="text-align:center;">逻辑复用</td><td style="text-align:center;">-</td><td style="text-align:center;">JdbcTemplate<br>HttpServlet</td><td style="text-align:center;">流程全部标准化，需要微调请覆盖</td></tr><tr><td style="text-align:center;">策略模式</td><td style="text-align:center;">把选择权交给用户</td><td style="text-align:center;">选择支付方式</td><td style="text-align:center;">Comparator<br>InstantiationStrategy</td><td style="text-align:center;">条条大路通罗马，具体哪条你决定</td></tr><tr><td style="text-align:center;">责任链模式</td><td style="text-align:center;">解耦处理逻辑</td><td style="text-align:center;">踢皮球</td><td style="text-align:center;">FilterChain</td><td style="text-align:center;">各人自扫门前雪，不管他人瓦上霜</td></tr><tr><td style="text-align:center;">迭代器模式</td><td style="text-align:center;">统一对集合的访问方式</td><td style="text-align:center;">-</td><td style="text-align:center;">Iterator</td><td style="text-align:center;">-</td></tr><tr><td style="text-align:center;">命令模式</td><td style="text-align:center;">解耦请求和处理</td><td style="text-align:center;">遥控器</td><td style="text-align:center;">Runnable</td><td style="text-align:center;">-</td></tr><tr><td style="text-align:center;">状态模式</td><td style="text-align:center;">绑定状态与行为</td><td style="text-align:center;">订单状态跟踪</td><td style="text-align:center;">Lifecycle</td><td style="text-align:center;">状态驱动行为，行为决定状态</td></tr><tr><td style="text-align:center;">备忘录模式</td><td style="text-align:center;">备份</td><td style="text-align:center;">草稿箱</td><td style="text-align:center;">-</td><td style="text-align:center;">后悔药、快照</td></tr><tr><td style="text-align:center;">中介者模式</td><td style="text-align:center;">统一管理网状资源</td><td style="text-align:center;">朋友圈</td><td style="text-align:center;">Timer</td><td style="text-align:center;">由一个对象统一维护所有关系</td></tr><tr><td style="text-align:center;">解释器模式</td><td style="text-align:center;">实现特定语法解析</td><td style="text-align:center;">摩斯密码</td><td style="text-align:center;">Pattern</td><td style="text-align:center;">一切解释权归我所有</td></tr><tr><td style="text-align:center;">观察者模式</td><td style="text-align:center;">解耦观察者与被观察者</td><td style="text-align:center;">闹钟</td><td style="text-align:center;">ContextLoaderListener</td><td style="text-align:center;">到点就通知我</td></tr><tr><td style="text-align:center;">访问者模式</td><td style="text-align:center;">解耦数据结构与操作</td><td style="text-align:center;">KPI考核</td><td style="text-align:center;">BeanDefinitionVisitor</td><td style="text-align:center;">-</td></tr></tbody></table>',56),a=[r];function i(s,c){return e(),d("div",null,a)}const y=t(l,[["render",i],["__file","design-pattern-summary.html.vue"]]);export{y as default};
