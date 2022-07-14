import{_ as a}from"./plugin-vue_export-helper.21dcd24c.js";import{o as n,c as s,e}from"./app.0f4f56d8.js";const t={},o=e(`<h1 id="arraylist" tabindex="-1"><a class="header-anchor" href="#arraylist" aria-hidden="true">#</a> ArrayList</h1><p><strong>\u5E95\u5C42\u662F\u5BF9\u8C61\u6570\u7EC4</strong>\uFF0C\u548C\u666E\u901A\u6570\u7EC4\u76F8\u6BD4\uFF0C\u5B83\u7684\u5BB9\u91CF\u80FD\u52A8\u6001\u5730\u589E\u957F\u3002</p><p>\u5C5E\u4E8E\u7EBF\u6027\u8868\u7684\u5B58\u50A8\u7ED3\u6784\uFF0C<strong>\u63D2\u5165</strong>\u3001<strong>\u5220\u9664</strong>\u7684\u65F6\u95F4\u590D\u6742\u5EA6\u4E3AO(n)\uFF0C\u6C42<strong>\u8868\u957F\u5EA6</strong>\u3001<strong>\u589E\u52A0\u5143\u7D20(\u589E\u52A0\u5230\u5C3E\u90E8)</strong>\u3001<strong>\u67E5\u8BE2\u7B2Ci\u4E2A\u5143\u7D20</strong>\u65F6\u95F4\u590D\u6742\u5EA6\u4E3AO(1)</p><p>ArrayList <strong>\u7EE7\u627F\u4E86AbstractList\uFF0C\u5B9E\u73B0\u4E86List</strong>\u3002\u63D0\u4F9B\u4E86\u76F8\u5173\u7684<strong>\u6DFB\u52A0\u3001\u5220\u9664\u3001\u4FEE\u6539\u3001\u904D\u5386</strong>\u7B49\u529F\u80FD\u3002</p><p>ArrayList \u5B9E\u73B0\u4E86<strong>RandomAccess \u63A5\u53E3</strong>\uFF0C RandomAccess \u662F\u4E00\u4E2A\u6807\u5FD7\u63A5\u53E3\uFF0C\u8868\u660E\u5B9E\u73B0\u8FD9\u4E2A\u8FD9\u4E2A\u63A5\u53E3\u7684 List \u96C6\u5408\u662F\u652F\u6301<strong>\u5FEB\u901F\u968F\u673A\u8BBF\u95EE</strong>\u7684\u3002\u5728 ArrayList \u4E2D\uFF0C\u6211\u4EEC\u5373\u53EF\u4EE5\u901A\u8FC7\u5143\u7D20\u7684\u5E8F\u53F7\u5FEB\u901F\u83B7\u53D6\u5143\u7D20\u5BF9\u8C61\uFF0C\u8FD9\u5C31\u662F\u5FEB\u901F\u968F\u673A\u8BBF\u95EE\u3002</p><p>ArrayList \u5B9E\u73B0\u4E86<strong>Cloneable \u63A5\u53E3</strong>\uFF0C\u5373\u8986\u76D6\u4E86\u51FD\u6570 clone()\uFF0C<strong>\u80FD\u88AB\u514B\u9686</strong>\u3002</p><p>ArrayList \u5B9E\u73B0\u4E86<strong>Serializable \u63A5\u53E3</strong>\uFF0C\u8FD9\u610F\u5473\u7740ArrayList<strong>\u652F\u6301\u5E8F\u5217\u5316</strong>\uFF0C<strong>\u80FD\u901A\u8FC7\u5E8F\u5217\u5316\u53BB\u4F20\u8F93</strong>\u3002</p><p>\u548C Vector \u4E0D\u540C\uFF0C<strong>ArrayList \u4E2D\u7684\u64CD\u4F5C\u4E0D\u662F\u7EBF\u7A0B\u5B89\u5168\u7684</strong>\uFF01\u6240\u4EE5\uFF0C\u5EFA\u8BAE\u5728<strong>\u5355\u7EBF\u7A0B\u4E2D\u624D\u4F7F\u7528</strong> ArrayList\uFF0C\u800C\u5728\u591A\u7EBF\u7A0B\u4E2D\u53EF\u4EE5\u9009\u62E9 Vector \u6216\u8005 CopyOnWriteArrayList\u3002</p><p>length\uFF1A\u6570\u7EC4\u957F\u5EA6\uFF0C\u521D\u59CB\u9ED8\u8BA4\u5927\u5C0F\u4E3A<strong>10</strong>\uFF1Bsize\uFF1A\u5143\u7D20\u4E2A\u6570</p><h3 id="\u6784\u9020\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u6784\u9020\u65B9\u6CD5" aria-hidden="true">#</a> \u6784\u9020\u65B9\u6CD5</h3><ul><li>ArrayList(int initialCapacity) <ul><li>\u521B\u5EFA\u4E00\u4E2A\u6307\u5B9A\u5BB9\u91CF\u7684ArrayList\uFF0C\u5982\u679C\u5BB9\u91CF\u4E3A0\uFF0C<code>this.elementData = EMPTY_ELEMENTDATA</code></li></ul></li><li>ArrayList() <ul><li>\u9ED8\u8BA4\u6784\u9020\u65B9\u6CD5\uFF0C\u521D\u59CB\u5316\u4E00\u4E2A\u7A7A\u6570\u7EC4<code>this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA</code>\uFF0C\u5F53\u63D2\u5165\u7B2C\u4E00\u4E2A\u5143\u7D20\u7684\u65F6\u5019\u5BB9\u91CF\u624D\u53D8\u621010</li></ul></li><li>ArrayList(Collection&lt;? extends E&gt; c) <ul><li>\u6784\u9020\u4E00\u4E2A\u5305\u542B\u6307\u5B9A\u96C6\u5408\u7684\u5143\u7D20\u7684\u5217\u8868\uFF0C\u6309\u7167\u5B83\u4EEC\u7531\u96C6\u5408\u7684\u8FED\u4EE3\u5668\u8FD4\u56DE\u7684\u987A\u5E8F\uFF0C\u4F20\u5165\u96C6\u5408\u5143\u7D20\u4E2A\u6570\u5927\u4E8E0\uFF0C\u5426\u5219\u7528\u7A7A\u6570\u7EC4\u4EE3\u66FF<code>this.elementData = EMPTY_ELEMENTDATA</code></li></ul></li></ul><h3 id="\u6269\u5BB9\u673A\u5236" tabindex="-1"><a class="header-anchor" href="#\u6269\u5BB9\u673A\u5236" aria-hidden="true">#</a> \u6269\u5BB9\u673A\u5236</h3><p>\u4E3A\u907F\u514D\u9891\u7E41\u63D2\u5165\u5BFC\u81F4\u9891\u7E41\u7684\u62F7\u8D1D\u3001\u5BFC\u81F4\u6027\u80FD\u964D\u4F4E\uFF0C\u6240\u4EE5\u4E0D\u80FD\u6BCF\u6B21\u6269\u5BB9\u4E00\u4E2A</p><p><strong>ensureCapacityInternal(int) \u6BCF\u6B21\u63D2\u5165\u524D\u90FD\u6267\u884C \uFF08\u81EA\u52A8\u6269\u5BB9\uFF09</strong></p><ol><li>\u8BA1\u7B97\u6700\u5C0F\u6269\u5BB9\u91CF <ol><li>\u5982\u679C\u662F\u7A7A\u6570\u7EC4\uFF0C\u6BD4\u8F83\u9ED8\u8BA4\u6700\u5C0F\u957F\u5EA6\u548C\u9700\u8981\u7684\u6700\u5C0F\u5BB9\u91CF\uFF0C\u53D6\u8F83\u5927\u503C</li><li>\u5982\u679C\u4E0D\u662F\uFF0C\u6700\u5C0F\u6269\u5BB9\u91CF\u5C31\u662F\u6240\u9700\u6700\u5C0F\u5BB9\u91CF</li></ol></li><li>\u5224\u65AD\u662F\u5426\u9700\u8981\u6269\u5BB9 <ol><li>\u5982\u679C\u6700\u5C0F\u6269\u5BB9\u91CF\u6BD4\u539F\u6570\u7EC4\u5BB9\u91CF\u8981\u5927\uFF0C\u5219\u6269\u5BB9</li></ol></li><li><strong>\u6269\u5BB9\u6838\u5FC3\u65B9\u6CD5</strong><ol><li>\u65E7\u5BB9\u91CF\uFF1A\u539F\u6570\u7EC4\u5BB9\u91CF</li><li>\u65B0\u5BB9\u91CF\uFF1A\u65E7\u5BB9\u91CF*1.5</li><li>\u68C0\u67E5\u4E0B\u9650\u3002\u5982\u679C\u65B0\u5BB9\u91CF\u6BD4\u6700\u5C0F\u6269\u5BB9\u91CF\u5C0F\uFF0C\u90A3\u4E48\u65B0\u5BB9\u91CF\u7B49\u4E8E\u6700\u5C0F\u6269\u5BB9\u91CF</li><li>\u68C0\u67E5\u4E0A\u9650\u3002\u5982\u679C\u65B0\u5BB9\u91CF\u6BD4ArrayList\u6240\u5B9A\u4E49\u7684\u6700\u5927\u5BB9\u91CF\u5927\uFF0C\u90A3\u4E48\u5224\u65AD\u6700\u5C0F\u6269\u5BB9\u91CF\u548C\u6700\u5927\u5BB9\u91CF\u7684\u5173\u7CFB <ol><li>\u5982\u679C\u6700\u5C0F\u6269\u5BB9\u91CF\u6BD4\u6700\u5927\u5BB9\u91CF\u5927\uFF0C\u90A3\u4E48\u65B0\u5BB9\u91CF\u7B49\u4E8EInteger.MAX_VALUE</li><li>\u5982\u679C\u6700\u5C0F\u6269\u5BB9\u91CF\u6BD4\u6700\u5927\u5BB9\u91CF\u5C0F\uFF0C\u90A3\u4E48\u65B0\u5BB9\u91CF\u7B49\u4E8E\u6700\u5927\u5BB9\u91CF</li></ol></li><li>\u8C03\u7528Arrays.copyOf(elementData, \u65B0\u5BB9\u91CF)\uFF0C\u5C06\u539F\u6709\u6570\u636E\u590D\u5236\u5230\u4E00\u4E2A\u5177\u6709\u65B0\u5BB9\u91CF\u8FD9\u4E48\u5927\u7684\u6570\u7EC4\u4E2D</li></ol></li></ol><p><strong>ensureCapacity(int) \u624B\u52A8\u6269\u5BB9 \uFF08\u63D2\u5165\u6570\u636E\u65F6\u4E00\u6B21\u6027\u6269\u5BB9\uFF09</strong></p><ol><li>\u901A\u8FC7\u9ED8\u8BA4\u6700\u5C0F\u5BB9\u91CF\u548C\u6700\u5C0F\u9700\u6C42\u5BB9\u91CF\u6765\u5224\u65AD\u662F\u5426\u6709\u5FC5\u8981\u6269\u5BB9\u3002 <ol><li>\u7A7A\u6570\u7EC4\uFF0C\u6BD4\u8F83\u6700\u5C0F\u9700\u6C42\u5BB9\u91CF\u548C10\uFF0C\u9700\u6C42\u5BB9\u91CF\u5927\u4E8E10\uFF0C\u4E0B\u4E00\u6B65\uFF1B\u5C0F\u96E810\uFF0C\u4E0D\u9700\u6269\u5BB9</li><li>\u6709\u5185\u5BB9\uFF0C\u76F4\u63A5\u4E0B\u4E00\u6B65</li></ol></li><li>\u5224\u65AD\u662F\u5426\u9700\u8981\u6269\u5BB9 <ol><li>\u5982\u679C\u6700\u5C0F\u6269\u5BB9\u91CF\u6BD4\u539F\u6570\u7EC4\u5BB9\u91CF\u5927\uFF0C\u5219\u6269\u5BB9</li></ol></li><li>\u6269\u5BB9</li></ol><h3 id="\u5176\u4ED6\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u5176\u4ED6\u65B9\u6CD5" aria-hidden="true">#</a> \u5176\u4ED6\u65B9\u6CD5</h3><p>IndexOf(Object) \u548C lastIndexOf(Object)</p><ul><li>\u76F8\u540C\uFF1A <ol><li>\u5982\u679C\u627E\u5230\u5143\u7D20\uFF0C\u8FD4\u56DE\u5BF9\u5E94\u7D22\u5F15\uFF1B\u5982\u679C\u6CA1\u6709\u627E\u5230\uFF0C\u8FD4\u56DE-1</li><li>\u80FD\u63A5\u53D7\u4F20\u5165\u7684\u53C2\u6570\u4E3Anull\uFF0C\u90A3\u5C31\u53BB\u5BFB\u627Enull\u503C\u51FA\u73B0\u7684<strong>\u4F4D\u7F6E</strong></li><li>\u540C\u6837\u662F\u8FD4\u56DE\u7B2C\u4E00\u6B21\u51FA\u73B0\u7684\u4F4D\u7F6E</li></ol></li><li>\u5DEE\u5F02\uFF1A <ol><li>indexOf\u662F\u4ECE\u524D\u5F80\u540E\u5BFB\u627E\uFF1BlastIndexOf\u662F\u4ECE\u540E\u5F80\u524D\u5BFB\u627E\uFF1B</li></ol></li></ul><p>trimToSize \u4FEE\u526A\u65B9\u6CD5</p><p>\u4FEE\u6539\u8FD9\u4E2AArrayList\u5B9E\u4F8B\u7684\u5BB9\u91CF\u4E3A\u5217\u8868\u7684\u5F53\u524D\u5927\u5C0F\u3002 \u7528\u6B64\u64CD\u4F5C\u6765\u6700\u5C0F\u5316ArrayList\u5B9E\u4F8B\u7684\u5B58\u50A8\u3002\u5982\u679C\u5217\u8868\u957F\u5EA6\u4E3A0\uFF0C\u4FEE\u6539\u4E3A\u7A7A\u6570\u7EC4EMPTY_ELEMENTDATA\uFF0C\u5426\u5219\u4F7F\u7528Arrays.copyOf(elementData, size)\uFF0C\u521B\u5EFA\u4E00\u4E2A\u957F\u5EA6\u4E3Asize\uFF0C\u5143\u7D20\u548CelementData\u4E00\u6837\u957F\u7684\u6570\u7EC4</p><p>toArray() \u548C toArray(T[] a)</p><p>toArray() \u4EE5\u6B63\u786E\u7684\u987A\u5E8F\u8FD4\u56DE\u4E00\u4E2A\u5B89\u5168\u7684\uFF08\u5217\u8868\u4E0D\u4FDD\u7559\u5BF9\u5176\u5143\u7D20\u7684\u5F15\u7528\uFF0C\u5206\u914D\u7684\u662F\u4E00\u4E2A\u65B0\u7684\u6570\u7EC4\uFF09\u548CArrayList\u5177\u6709\u76F8\u540C\u5143\u7D20\u7684\u5BF9\u8C61\u6570\u7EC4\uFF0C\u6570\u7EC4\u957F\u5EA6\u4E3A\u5143\u7D20\u4E2A\u6570</p><p>Arrays.copyOf() \u548C Systems.arrayCopy()</p><p>\u8054\u7CFB\uFF1A</p><p>copyOf\u5185\u90E8\u8C03\u7528\u4E86arrayCopy</p><p>\u533A\u522B\uFF1A</p><ol><li>arraycopy()<strong>\u9700\u8981\u76EE\u6807\u6570\u7EC4</strong>\uFF0C\u5C06\u539F\u6570\u7EC4\u62F7\u8D1D\u5230\u4F60\u81EA\u5DF1\u5B9A\u4E49\u7684\u6570\u7EC4\u91CC\uFF0C\u800C\u4E14\u53EF\u4EE5\u9009\u62E9<strong>\u62F7\u8D1D\u7684\u8D77\u70B9</strong>\u548C<strong>\u957F\u5EA6</strong>\u4EE5\u53CA\u653E\u5165\u65B0\u6570\u7EC4\u4E2D\u7684<strong>\u4F4D\u7F6E</strong></li><li>copyOf()\u662F\u7CFB\u7EDF\u81EA\u52A8\u5728\u5185\u90E8<strong>\u65B0\u5EFA\u4E00\u4E2A\u6570\u7EC4</strong>\uFF0C\u5E76\u8FD4\u56DE\u8BE5\u6570\u7EC4\u3002</li></ol><p><em>Arrays.toList</em></p><h3 id="\u5185\u90E8\u7C7B" tabindex="-1"><a class="header-anchor" href="#\u5185\u90E8\u7C7B" aria-hidden="true">#</a> \u5185\u90E8\u7C7B</h3><ul><li><strong>Itr\u662F\u5B9E\u73B0\u4E86Iterator\u63A5\u53E3</strong>\uFF0C\u540C\u65F6\u91CD\u5199\u4E86\u91CC\u9762\u7684<strong>hasNext()</strong>\uFF0C <strong>next()</strong>\uFF0C <strong>remove()</strong> \u7B49\u65B9\u6CD5</li><li><strong>ListItr</strong> \u7EE7\u627F <strong>Itr</strong>\uFF0C\u5B9E\u73B0\u4E86<strong>ListIterator\u63A5\u53E3</strong>\uFF0C\u5728Iterator\u7684\u57FA\u7840\u4E0A\u589E\u52A0\u4E86\u6DFB\u52A0\u5BF9\u8C61\uFF0C\u4FEE\u6539\u5BF9\u8C61\uFF0C\u9006\u5411\u904D\u5386\u7B49\u65B9\u6CD5</li></ul><h1 id="stream" tabindex="-1"><a class="header-anchor" href="#stream" aria-hidden="true">#</a> Stream</h1><h3 id="\u5173\u5FC3\u4E24\u4E2A\u95EE\u9898-\u6D41\u6C34\u7EBF\u3001\u81EA\u52A8\u5E76\u884C" tabindex="-1"><a class="header-anchor" href="#\u5173\u5FC3\u4E24\u4E2A\u95EE\u9898-\u6D41\u6C34\u7EBF\u3001\u81EA\u52A8\u5E76\u884C" aria-hidden="true">#</a> \u5173\u5FC3\u4E24\u4E2A\u95EE\u9898\uFF1A\u6D41\u6C34\u7EBF\u3001\u81EA\u52A8\u5E76\u884C</h3><h2 id="\u64CD\u4F5C\u5206\u7C7B" tabindex="-1"><a class="header-anchor" href="#\u64CD\u4F5C\u5206\u7C7B" aria-hidden="true">#</a> \u64CD\u4F5C\u5206\u7C7B</h2><h3 id="\u4E2D\u95F4\u64CD\u4F5C-\u4E2D\u95F4\u64CD\u4F5C\u53EA\u662F\u4E00\u79CD\u6807\u8BB0" tabindex="-1"><a class="header-anchor" href="#\u4E2D\u95F4\u64CD\u4F5C-\u4E2D\u95F4\u64CD\u4F5C\u53EA\u662F\u4E00\u79CD\u6807\u8BB0" aria-hidden="true">#</a> \u4E2D\u95F4\u64CD\u4F5C:\u4E2D\u95F4\u64CD\u4F5C\u53EA\u662F\u4E00\u79CD\u6807\u8BB0</h3><h4 id="\u65E0\u72B6\u6001-\u5143\u7D20\u7684\u5904\u7406\u4E0D\u53D7\u524D\u9762\u5143\u7D20\u7684\u5F71\u54CD-\u64CD\u4F5C\u7684\u6B21\u5E8F\u53EF\u4EE5\u4EA4\u6362" tabindex="-1"><a class="header-anchor" href="#\u65E0\u72B6\u6001-\u5143\u7D20\u7684\u5904\u7406\u4E0D\u53D7\u524D\u9762\u5143\u7D20\u7684\u5F71\u54CD-\u64CD\u4F5C\u7684\u6B21\u5E8F\u53EF\u4EE5\u4EA4\u6362" aria-hidden="true">#</a> \u65E0\u72B6\u6001:\u5143\u7D20\u7684\u5904\u7406\u4E0D\u53D7\u524D\u9762\u5143\u7D20\u7684\u5F71\u54CD(\u64CD\u4F5C\u7684\u6B21\u5E8F\u53EF\u4EE5\u4EA4\u6362)</h4><p><code>unordered()</code><code>filter()</code><code>peek()</code><code>map()</code><code>mapToInt()</code><code>mapToLong()</code><code>mapToDouble()</code><code>flatMap()</code><code>flatMapToInt()</code><code>flatMapToLong()</code><code>flatMapToDouble()</code></p><h4 id="\u6709\u72B6\u6001-\u5FC5\u987B\u7B49\u5230\u6240\u6709\u5143\u7D20\u5904\u7406\u4E4B\u540E\u624D\u77E5\u9053\u6700\u7EC8\u7ED3\u679C-\u64CD\u4F5C\u7684\u6B21\u6570\u4E0D\u53EF\u4EE5\u4EA4\u6362-\u4E00\u65E6\u4EA4\u6362\u5219\u4EA7\u751F\u5F71\u54CD" tabindex="-1"><a class="header-anchor" href="#\u6709\u72B6\u6001-\u5FC5\u987B\u7B49\u5230\u6240\u6709\u5143\u7D20\u5904\u7406\u4E4B\u540E\u624D\u77E5\u9053\u6700\u7EC8\u7ED3\u679C-\u64CD\u4F5C\u7684\u6B21\u6570\u4E0D\u53EF\u4EE5\u4EA4\u6362-\u4E00\u65E6\u4EA4\u6362\u5219\u4EA7\u751F\u5F71\u54CD" aria-hidden="true">#</a> \u6709\u72B6\u6001:\u5FC5\u987B\u7B49\u5230\u6240\u6709\u5143\u7D20\u5904\u7406\u4E4B\u540E\u624D\u77E5\u9053\u6700\u7EC8\u7ED3\u679C(\u64CD\u4F5C\u7684\u6B21\u6570\u4E0D\u53EF\u4EE5\u4EA4\u6362\uFF0C\u4E00\u65E6\u4EA4\u6362\u5219\u4EA7\u751F\u5F71\u54CD)</h4><p><code>sorted()</code><code>district()</code><code>limit()</code><code>skip()</code></p><h3 id="\u7ED3\u675F\u64CD\u4F5C-\u7ED3\u675F\u64CD\u4F5C\u624D\u4F1A\u89E6\u53D1\u5B9E\u9645\u8BA1\u7B97" tabindex="-1"><a class="header-anchor" href="#\u7ED3\u675F\u64CD\u4F5C-\u7ED3\u675F\u64CD\u4F5C\u624D\u4F1A\u89E6\u53D1\u5B9E\u9645\u8BA1\u7B97" aria-hidden="true">#</a> \u7ED3\u675F\u64CD\u4F5C:\u7ED3\u675F\u64CD\u4F5C\u624D\u4F1A\u89E6\u53D1\u5B9E\u9645\u8BA1\u7B97</h3><h4 id="\u975E\u77ED\u8DEF\u64CD\u4F5C-\u5904\u7406\u5168\u90E8\u5143\u7D20\u624D\u53EF\u4EE5\u8FD4\u56DE\u7ED3\u679C" tabindex="-1"><a class="header-anchor" href="#\u975E\u77ED\u8DEF\u64CD\u4F5C-\u5904\u7406\u5168\u90E8\u5143\u7D20\u624D\u53EF\u4EE5\u8FD4\u56DE\u7ED3\u679C" aria-hidden="true">#</a> \u975E\u77ED\u8DEF\u64CD\u4F5C:\u5904\u7406\u5168\u90E8\u5143\u7D20\u624D\u53EF\u4EE5\u8FD4\u56DE\u7ED3\u679C</h4><p><code>forEach()</code><code>forEachOrdered()</code><code>toArray()</code><code>reduce()</code><code>collect()</code><code>max()</code><code>min()</code><code>count()</code></p><h4 id="\u77ED\u8DEF\u64CD\u4F5C-\u4E0D\u7528\u5904\u7406\u5168\u90E8\u5143\u7D20\u5C31\u53EF\u4EE5\u8FD4\u56DE\u7ED3\u679C" tabindex="-1"><a class="header-anchor" href="#\u77ED\u8DEF\u64CD\u4F5C-\u4E0D\u7528\u5904\u7406\u5168\u90E8\u5143\u7D20\u5C31\u53EF\u4EE5\u8FD4\u56DE\u7ED3\u679C" aria-hidden="true">#</a> \u77ED\u8DEF\u64CD\u4F5C:\u4E0D\u7528\u5904\u7406\u5168\u90E8\u5143\u7D20\u5C31\u53EF\u4EE5\u8FD4\u56DE\u7ED3\u679C</h4><p><code>anyMatch()</code><code>allMatch()</code><code>noneMatch()</code><code>findFirst()</code><code>findAny()</code></p><h2 id="\u4F8B\u5B50\u7406\u89E3" tabindex="-1"><a class="header-anchor" href="#\u4F8B\u5B50\u7406\u89E3" aria-hidden="true">#</a> \u4F8B\u5B50\u7406\u89E3</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">IntStream</span><span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
   <span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span>x <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\nA&quot;</span> <span class="token operator">+</span> x<span class="token punctuation">)</span><span class="token punctuation">)</span>
   <span class="token punctuation">.</span><span class="token function">limit</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
   <span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span>x <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;B&quot;</span> <span class="token operator">+</span> x<span class="token punctuation">)</span><span class="token punctuation">)</span>
   <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>x <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;C&quot;</span> <span class="token operator">+</span> x<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8F93\u51FA\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>A1B1C1
A2B2C2
A3B3C3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u89E3\u6790\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>1\u3001peek\u3001limit\u65B9\u6CD5\u90FD\u662F\u61D2\u60F0\u7684\u4E2D\u95F4\u64CD\u4F5C\uFF0C\u4E0D\u4F1A\u7ACB\u9A6C\u6267\u884C\uFF0C\u53EA\u6709\u6267\u884C\u5230\u70ED\u60C5\u7684\u7ED3\u675F\u64CD\u4F5C\uFF0C\u624D\u4F1A\u6267\u884C\u3002
2\u3001\u6267\u884C\u7ED3\u675F\u64CD\u4F5C\u65F6\u4F1A\u56DE\u6EAF\u4E0A\u9762\u6240\u6709\u7684\u4E2D\u95F4\u64CD\u4F5C
3\u3001peek\u76F8\u5F53\u4E8E\u4E3A\u8FD9\u4E2Astream\u63D0\u4F9B\u4E00\u4E2A\u6D88\u8D39\u8005
4\u3001limit\u89C4\u5B9A\u4E86forEach\u904D\u5386\u7684\u6B21\u6570(forEach\u6267\u884C\u9700\u8981\u56DE\u6EAF\uFF0C\u6B63\u5E38\u6267\u884C\u662F\u6267\u884C10\u6B21)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stream\u6D41\u6C34\u7EBF\u5E94\u907F\u514D\u8FC7\u591A\u7684\u8FED\u4EE3-\u7ED3\u675F\u64CD\u4F5C-\u4EA7\u751F\u5927\u91CF\u7684\u4E2D\u95F4\u7ED3\u679C-\u5426\u5219\u7A7A\u95F4\u65F6\u95F4\u7684\u5F00\u9500\u90FD\u5F88\u5927" tabindex="-1"><a class="header-anchor" href="#stream\u6D41\u6C34\u7EBF\u5E94\u907F\u514D\u8FC7\u591A\u7684\u8FED\u4EE3-\u7ED3\u675F\u64CD\u4F5C-\u4EA7\u751F\u5927\u91CF\u7684\u4E2D\u95F4\u7ED3\u679C-\u5426\u5219\u7A7A\u95F4\u65F6\u95F4\u7684\u5F00\u9500\u90FD\u5F88\u5927" aria-hidden="true">#</a> Stream\u6D41\u6C34\u7EBF\u5E94\u907F\u514D\u8FC7\u591A\u7684\u8FED\u4EE3(\u7ED3\u675F\u64CD\u4F5C)\u4EA7\u751F\u5927\u91CF\u7684\u4E2D\u95F4\u7ED3\u679C\uFF0C\u5426\u5219\u7A7A\u95F4\u65F6\u95F4\u7684\u5F00\u9500\u90FD\u5F88\u5927</h3>`,52),r=[o];function i(l,c){return n(),s("div",null,r)}var u=a(t,[["render",i],["__file","\u96C6\u5408.html.vue"]]);export{u as default};
