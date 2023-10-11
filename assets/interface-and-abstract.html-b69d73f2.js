import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as t,e as r}from"./app-859571d0.js";const o={},c=r('<h1 id="接口和抽象类区别" tabindex="-1"><a class="header-anchor" href="#接口和抽象类区别" aria-hidden="true">#</a> 接口和抽象类区别</h1><h2 id="语法层面" tabindex="-1"><a class="header-anchor" href="#语法层面" aria-hidden="true">#</a> 语法层面</h2><blockquote><p>针对 jdk8 讨论</p></blockquote><p>接口中只能定义抽象方法，也可以定义默认方法及其实现。一个类要实现接口必须实现这个接口中所有的抽象方法。</p><p>抽象类没有太多的限制，甚至一个普通类也可以直接加上 <code>abstract</code> 关键字称为抽象类，抽象类可以定义属性、方法，更多的限制在于抽象方法，抽象方法只能存在于接口和抽象类中。</p><h2 id="思想层面" tabindex="-1"><a class="header-anchor" href="#思想层面" aria-hidden="true">#</a> 思想层面</h2><p>这一部分才是我想单独使用一篇笔记记录下来的原因，语法层面网上有太多太多的资料，我更想和大家聊一聊<strong>思想层面</strong>。先说结论再说原因：<strong>接口是自上向下的思想，抽象类是自下向上的思想</strong>。</p><p>我们在定义接口时，<strong>只需要定义约束和规范，定义时不需要考虑有什么实现类</strong>或者说其实也无法遇见所有的实现类的，如果需要实现接口，那么就需要实现其定义的所有方法，所以接口的设计是从上往下的。</p><blockquote><p>比如说：插头，为了各种插头在这个地区可以拥有普适性，当地会制定插头标准，每一个厂商生产这些插头的时候，虽然形式可以多样，但必须实现插头的标准，这个插头才能在这个地区适用。制定插头标准的时候，更多的考虑其规范、约束，子类的实现可能会针对基本的可行性，其他不会做太多考虑。</p></blockquote><p>抽象类一般会后于实现类出现的，抽象类更多的是用来描述一组事物而产生的概念，<strong>抽象类的作用就是进行共性的提取</strong>，所以抽象类的设计是从下往上的。</p><blockquote><p>比如说：动物，动物是一个抽象概念，界、门、纲、目、科、属，这些都属于不同级别的抽象类，是针对最底层的物种进行共性抽取，而一级一级产生的抽象概念，比如我们常常听到的猫科动物，就有老虎、猎豹等等。</p></blockquote><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>做设计的时候，抽象类和接口的选择，不应该简单地从语法层面出发，而更应该从设计思想出发，接口自上向下，抽象类自下向上。</p>',13),n=[c];function s(d,h){return a(),t("div",null,n)}const l=e(o,[["render",s],["__file","interface-and-abstract.html.vue"]]);export{l as default};
