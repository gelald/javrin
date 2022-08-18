import{_ as a}from"./plugin-vue_export-helper.21dcd24c.js";import{o as s,c as n,d as e}from"./app.1efb5e95.js";const t={},o=e(`<p>\u65B9\u6CD5\u533A\u5728JVM\u4E2D\u4E5F\u662F\u4E00\u4E2A\u975E\u5E38\u91CD\u8981\u7684\u533A\u57DF\uFF0C\u5B83\u4E0E\u5806\u4E00\u6837\uFF0C\u662F\u88AB <strong>\u7EBF\u7A0B\u5171\u4EAB</strong> \u7684\u533A\u57DF\u3002</p><p>\u5728\u65B9\u6CD5\u533A\u4E2D\uFF0C\u5B58\u50A8\u4E86\u6BCF\u4E2A\u7C7B\u7684\u4FE1\u606F\uFF08\u5305\u62EC\u7C7B\u7684\u540D\u79F0\u3001\u65B9\u6CD5\u4FE1\u606F\u3001\u5B57\u6BB5\u4FE1\u606F\uFF09\u3001\u9759\u6001\u53D8\u91CF\u3001\u5E38\u91CF\u4EE5\u53CA\u7F16\u8BD1\u5668\u7F16\u8BD1\u540E\u7684\u4EE3\u7801\u7B49\u3002</p><p>\u65B9\u6CD5\u533A\u57DF\u5B58\u653E\u4E86\u6240\u52A0\u8F7D\u7684\u7C7B\u7684\u4FE1\u606F\uFF08\u540D\u79F0\u3001\u4FEE\u9970\u7B26\u7B49\uFF09\u3001\u7C7B\u4E2D\u7684\u9759\u6001\u53D8\u91CF\u3001\u7C7B\u4E2D\u5B9A\u4E49\u4E3Afinal\u7C7B\u578B\u7684\u5E38\u91CF\u3001\u7C7B\u4E2D\u7684Field\u4FE1\u606F\u3001\u7C7B\u4E2D\u7684\u65B9\u6CD5\u4FE1\u606F\uFF0C\u5F53\u5F00\u53D1\u4EBA\u5458\u5728\u7A0B\u5E8F\u4E2D\u901A\u8FC7Class\u5BF9\u8C61\u4E2D\u7684getName\u3001isInterface\u7B49\u65B9\u6CD5\u6765\u83B7\u53D6\u4FE1\u606F\u65F6\uFF0C\u8FD9\u4E9B\u6570\u636E\u90FD\u6765\u6E90\u4E8E\u65B9\u6CD5\u533A\u57DF\uFF0C\u540C\u65F6\u65B9\u6CD5\u533A\u57DF\u4E5F\u662F\u5168\u5C40\u5171\u4EAB\u7684</p><p>\u5728\u4E00\u5B9A\u7684\u6761\u4EF6\u4E0B\u5B83\u4E5F\u4F1A\u88ABGC\uFF0C\u5F53\u65B9\u6CD5\u533A\u57DF\u9700\u8981\u4F7F\u7528\u7684\u5185\u5B58\u8D85\u8FC7\u5176\u5141\u8BB8\u7684\u5927\u5C0F\u65F6\uFF0C\u4F1A\u629B\u51FAOutOfMemory\u7684\u9519\u8BEF\u4FE1\u606F</p><p>\u5927\u591A\u6570 JVM \u5C06\u5185\u5B58\u533A\u57DF\u5212\u5206\u4E3A <strong>Method Area\uFF08Non-Heap\uFF09\uFF08\u65B9\u6CD5\u533A\uFF09</strong> ,<strong>Heap\uFF08\u5806\uFF09</strong> , <strong>Program Counter Register\uFF08\u7A0B\u5E8F\u8BA1\u6570\u5668\uFF09</strong> , <strong>VM Stack\uFF08\u865A\u62DF\u673A\u6808\uFF0C\u4E5F\u6709\u7FFB\u8BD1\u6210JAVA \u65B9\u6CD5\u6808\u7684\uFF09,Native Method Stack</strong> \uFF08 <strong>\u672C\u5730\u65B9\u6CD5\u6808</strong> \uFF09\uFF0C\u5176\u4E2D<strong>Method Area</strong> \u548C <strong>Heap</strong> \u662F\u7EBF\u7A0B\u5171\u4EAB\u7684 \uFF0CVM Stack\uFF0CNative Method Stack \u548CProgram Counter Register\u662F\u975E\u7EBF\u7A0B\u5171\u4EAB\u7684\u3002\u4E3A\u4EC0\u4E48\u5206\u4E3A \u7EBF\u7A0B\u5171\u4EAB\u548C\u975E\u7EBF\u7A0B\u5171\u4EAB\u7684\u5462?\u8BF7\u7EE7\u7EED\u5F80\u4E0B\u770B\u3002</p><p>\u9996\u5148\u6211\u4EEC\u719F\u6089\u4E00\u4E0B\u4E00\u4E2A\u4E00\u822C\u6027\u7684 Java \u7A0B\u5E8F\u7684\u5DE5\u4F5C\u8FC7\u7A0B\u3002\u4E00\u4E2A Java \u6E90\u7A0B\u5E8F\u6587\u4EF6\uFF0C\u4F1A\u88AB\u7F16\u8BD1\u4E3A\u5B57\u8282\u7801\u6587\u4EF6\uFF08\u4EE5 class \u4E3A\u6269\u5C55\u540D\uFF09\uFF0C\u6BCF\u4E2Ajava\u7A0B\u5E8F\u90FD\u9700\u8981\u8FD0\u884C\u5728\u81EA\u5DF1\u7684JVM\u4E0A\uFF0C\u7136\u540E\u544A\u77E5 JVM \u7A0B\u5E8F\u7684\u8FD0\u884C\u5165\u53E3\uFF0C\u518D\u88AB JVM \u901A\u8FC7\u5B57\u8282\u7801\u89E3\u91CA\u5668\u52A0\u8F7D\u8FD0\u884C\u3002\u90A3\u4E48\u7A0B\u5E8F\u5F00\u59CB\u8FD0\u884C\u540E\uFF0C\u90FD\u662F\u5982\u4F55\u6D89\u53CA\u5230\u5404\u5185\u5B58\u533A\u57DF\u7684\u5462\uFF1F</p><p>\u6982\u62EC\u5730\u8BF4\u6765\uFF0CJVM\u521D\u59CB\u8FD0\u884C\u7684\u65F6\u5019\u90FD\u4F1A\u5206\u914D\u597D <strong>Method Area\uFF08\u65B9\u6CD5\u533A\uFF09</strong> \u548C<strong>Heap\uFF08\u5806\uFF09</strong> \uFF0C\u800CJVM \u6BCF\u9047\u5230\u4E00\u4E2A\u7EBF\u7A0B\uFF0C\u5C31\u4E3A\u5176\u5206\u914D\u4E00\u4E2A <strong>Program Counter Register\uFF08\u7A0B\u5E8F\u8BA1\u6570\u5668\uFF09</strong> , <strong>VM Stack\uFF08\u865A\u62DF\u673A\u6808\uFF09\u548CNative Method Stack \uFF08\u672C\u5730\u65B9\u6CD5\u6808\uFF09\uFF0C</strong> \u5F53\u7EBF\u7A0B\u7EC8\u6B62\u65F6\uFF0C\u4E09\u8005\uFF08\u865A\u62DF\u673A\u6808\uFF0C\u672C\u5730\u65B9\u6CD5\u6808\u548C\u7A0B\u5E8F\u8BA1\u6570\u5668\uFF09\u6240\u5360\u7528\u7684\u5185\u5B58\u7A7A\u95F4\u4E5F\u4F1A\u88AB\u91CA\u653E\u6389\u3002\u8FD9\u4E5F\u662F\u4E3A\u4EC0\u4E48\u6211\u628A\u5185\u5B58\u533A\u57DF\u5206\u4E3A\u7EBF\u7A0B\u5171\u4EAB\u548C\u975E\u7EBF\u7A0B\u5171\u4EAB\u7684\u539F\u56E0\uFF0C\u975E\u7EBF\u7A0B\u5171\u4EAB\u7684\u90A3\u4E09\u4E2A\u533A\u57DF\u7684\u751F\u547D\u5468\u671F\u4E0E\u6240\u5C5E\u7EBF\u7A0B\u76F8\u540C\uFF0C\u800C\u7EBF\u7A0B\u5171\u4EAB\u7684\u533A\u57DF\u4E0EJAVA\u7A0B\u5E8F\u8FD0\u884C\u7684\u751F\u547D\u5468\u671F\u76F8\u540C\uFF0C\u6240\u4EE5\u8FD9\u4E5F\u662F\u7CFB\u7EDF\u5783\u573E\u56DE\u6536\u7684\u573A\u6240\u53EA\u53D1\u751F\u5728\u7EBF\u7A0B\u5171\u4EAB\u7684\u533A\u57DF\uFF08\u5B9E\u9645\u4E0A\u5BF9\u5927\u90E8\u5206\u865A\u62DF\u673A\u6765\u8BF4\u77E5\u53D1\u751F\u5728Heap\u4E0A\uFF09\u7684\u539F\u56E0\u3002</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrkraosbj30x10k874x.jpg" alt=""></p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrks46l1j30hu0gbt92.jpg" alt="JVM\u5185\u5B58\u56FE2"></p><p>-Xmx: \u6700\u5927\u5806\u5927\u5C0F</p><p>-Xms: \u521D\u59CB\u5806\u5927\u5C0F</p><p>-Xmn: \u5E74\u8F7B\u4EE3\u5927\u5C0F</p><p>-XXSurvivorRatio: \u5E74\u8F7B\u4EE3\u4E2DEden\u533A\u4E0ESurvivor\u533A\u7684\u5927\u5C0F\u6BD4\u503C</p><p>\u4E00\u4E2A\u5E74\u8F7B\u4EE3\u75311\u4E2AEden\u533A\u52A02\u4E2ASurvivor\u533A\u7EC4\u6210</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/\u8FD0\u884C\u65F6\u6570\u636E\u533A.png" alt=""></p><h1 id="\u5806" tabindex="-1"><a class="header-anchor" href="#\u5806" aria-hidden="true">#</a> \u5806</h1><ul><li>\u5185\u5B58\u533A\u57DF\u4E2D\u6700\u5927\u7684\u4E00\u5757\uFF0C<strong>\u88AB\u6240\u6709\u7EBF\u7A0B\u5171\u4EAB</strong>\uFF0C\u6240\u6709\u7684<strong>\u5BF9\u8C61\u5B9E\u4F8B\u4EE5\u53CA\u6570\u7EC4</strong>\u90FD\u8981\u5728\u5806\u4E0A\u5206\u914D\u3002</li><li>\u5806\u662F\u5783\u573E\u6536\u96C6\u5668\u7BA1\u7406\u7684\u4E3B\u8981\u533A\u57DF\u3002</li><li>\u4ECE\u5185\u5B58\u56DE\u6536\u7684\u89D2\u5EA6\u6765\u770B\uFF1A\u5806\u533A\u53EF\u4EE5\u7EC6\u5206\u4E3A<strong>\u65B0\u751F\u4EE3</strong>\u548C<strong>\u8001\u5E74\u4EE3</strong>\uFF1B\u5BF9\u65B0\u751F\u4EE3\u518D\u7EC6\u81F4\u4E00\u70B9\u7684\u6709<strong>Eden</strong>\u7A7A\u95F4\u3001<strong>From Surviror</strong>\u7A7A\u95F4\u3001<strong>To Survivor</strong>\u7A7A\u95F4\u7B49\u3002</li><li>\u4ECE\u5185\u5B58\u5206\u914D\u7684\u89D2\u5EA6\u6765\u770B\uFF1A\u5806\u53EF\u4EE5\u5212\u5206\u51FA\u591A\u4E2A\u7EBF\u7A0B\u79C1\u6709\u7684\u5206\u914D\u7F13\u51B2\u533A(TLAB)</li><li>\u5806\u5185\u5B58\u903B\u8F91\u4E0A\u8FDE\u7EED\u3001\u7269\u7406\u4E0A\u4E0D\u8FDE\u7EED\uFF1B\u65E2\u53EF\u4EE5\u5B9E\u73B0\u6210\u56FA\u5B9A\u5927\u5C0F\uFF0C\u4E5F\u53EF\u4EE5\u5728\u8FD0\u884C\u65F6\u52A8\u6001\u8C03\u6574\uFF1A<code>Xms 256M</code> <code>Xmx 1024M</code>\uFF0C\u5176\u4E2D<code>-X</code>\u4EE3\u8868\u5B83\u662FJVM\u8FD0\u884C\u53C2\u6570\uFF0C<code>ms</code>\u662Fmemory start\uFF0C\u5185\u5B58\u521D\u59CB\u503C\uFF0C<code>mx</code>\u662Fmemory max\uFF0C\u5185\u5B58\u6700\u5927\u503C</li><li>\u5806\u5185\u5B58\u7684\u7A7A\u95F4\u5206\u914D<img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrksxin4j313c0m2e81.jpg" alt=""><ul><li>\u8001\u5E74\u4EE3\u5360 2/3</li><li>\u65B0\u751F\u4EE3\u5360 1/3 <ul><li>Eden\u5360 8/10</li><li>From Survivor\u5360 1/10</li><li>To Survivor \u5360 1/10</li></ul></li><li><code>-XX:IntialSurvivorRatio</code> \u65B0\u751F\u4EE3\u4E2DEden/Survivor\u7A7A\u95F4\u7684\u521D\u59CB\u6BD4\u4F8B\uFF0C\u9ED8\u8BA4\u662F8</li><li><code>-XX:NewRatio</code> \u8001\u5E74\u4EE3/\u65B0\u751F\u4EE3\u7684\u5185\u5B58\u6BD4\u4F8B\uFF0C\u9ED8\u8BA4\u662F2</li></ul></li><li>\u5806\u5185\u5B58\u6EA2\u51FA\uFF1A<code>OutOfMemoryError: Java heap space</code></li><li><code>-XX:+HeapDumpOnOutOfMemoryError</code>\uFF1A\u8BA9JVM\u9047\u5230OOM\u5F02\u5E38\u65F6\uFF0C\u8F93\u51FA\u5806\u5185\u4FE1\u606F</li></ul><h2 id="jvm\u521B\u5EFA\u4E00\u4E2A\u65B0\u5BF9\u8C61\u7684\u5185\u5B58\u5206\u914D\u6D41\u7A0B" tabindex="-1"><a class="header-anchor" href="#jvm\u521B\u5EFA\u4E00\u4E2A\u65B0\u5BF9\u8C61\u7684\u5185\u5B58\u5206\u914D\u6D41\u7A0B" aria-hidden="true">#</a> JVM\u521B\u5EFA\u4E00\u4E2A\u65B0\u5BF9\u8C61\u7684\u5185\u5B58\u5206\u914D\u6D41\u7A0B</h2><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrktwl9jj30y50u0x6q.jpg" alt=""></p><ol><li><strong>\u7EDD\u5927\u90E8\u5206\u5BF9\u8C61\u5728Eden\u533A\u751F\u6210</strong></li><li>\u5F53Eden\u533A\u586B\u6EE1\u65F6\uFF0C\u4F1A\u89E6\u53D1<code>Young Garbage Collection</code>\u5373<code>YGC</code></li><li>\u5728Eden\u533A\u5B9E\u73B0\u56DE\u6536\u7684\u7B56\u7565 <ol><li>\u6CA1\u6709\u88AB\u5F15\u7528\u7684\u5BF9\u8C61\u76F4\u63A5\u56DE\u6536\uFF0C\u5982\u679C\u8FD8\u5B58\u6D3B\u5219\u79FB\u9001\u5230<code>Survivor</code>\u533A</li><li>Survivor\u533A\u5206\u4E3As0/s1\u4E24\u5757\u5185\u5B58\u7A7A\u95F4\uFF0C\u6BCF\u6B21\u8FDB\u884CYGC\u7684\u65F6\u5019\uFF0C\u5C06\u5B58\u6D3B\u5BF9\u8C61\u590D\u5236\u5230\u672A\u4F7F\u7528\u7684\u90A3\u5757\u7A7A\u95F4\uFF0C\u7136\u540E\u5C06\u5F53\u524D\u6B63\u5728\u4F7F\u7528\u7684\u7A7A\u95F4\u5B8C\u5168\u6E05\u9664\uFF0C<strong>\u4EA4\u6362\u4E24\u5757\u7A7A\u95F4\u7684\u4F7F\u7528\u72B6\u6001</strong></li><li>\u5982\u679CYGC\u8981\u79FB\u9001\u7684\u5BF9\u8C61\u5927\u4E8ESurvivor\u533A\u5BB9\u91CF\u7684\u4E0A\u9650\uFF0C\u5219\u76F4\u63A5\u79FB\u4EA4\u7ED9\u8001\u5E74\u4EE3</li><li>\u4EA4\u6362\u6B21\u6570\u5230\u9608\u503C\u7684\u65F6\u5019\u664B\u5347\u5230\u8001\u5E74\u4EE3\u3002<code>-XX:MaxTenuringThreshold</code>\u914D\u7F6E\u65B0\u751F\u4EE3\u664B\u5347\u5230\u8001\u5E74\u4EE3\u7684\u9608\u503C\uFF0C\u9ED8\u8BA4\u662F15\uFF0C\u4EA4\u6362\u6B21\u6570\u5230\u8FBE\u7B2C15\u6B21\uFF0C\u664B\u5347\u8001\u5E74\u4EE3\u3002</li></ol></li></ol><h1 id="metaspace\u5143\u7A7A\u95F4" tabindex="-1"><a class="header-anchor" href="#metaspace\u5143\u7A7A\u95F4" aria-hidden="true">#</a> Metaspace\u5143\u7A7A\u95F4</h1><ul><li><p><strong>\u5728HotSpot JVM\u4E2D</strong>\uFF0C<strong>\u65B9\u6CD5\u533A</strong>\u7528\u4E8E\u5B58\u653E<strong>\u7C7B(Class)<strong>\u548C</strong>\u65B9\u6CD5\u7684\u5143\u6570\u636E(Method)<strong>\u4EE5\u53CA</strong>\u5E38\u91CF\u6C60</strong>\uFF0C\u6BCF\u5F53\u4E00\u4E2A\u7C7B\u521D\u6B21\u88AB\u52A0\u8F7D\u65F6\uFF0C\u5B83\u7684\u5143\u6570\u636E\u90FD\u4F1A\u653E\u5230\u65B9\u6CD5\u533A\u4E2D\uFF0C\u8BE5\u533A\u57DF\u88AB<strong>\u6240\u6709\u7EBF\u7A0B\u5171\u4EAB</strong></p></li><li><p>\u6C38\u4E45\u4EE3\u662FHotSpot\u865A\u62DF\u673A\u5BF9\u865A\u62DF\u673A\u89C4\u8303\u4E2D\u65B9\u6CD5\u533A\u7684\u4E00\u79CD\u5B9E\u73B0\u65B9\u5F0F\uFF0C\u6C38\u4E45\u4EE3\u4E2D\u52A0\u8F7D\u7684\u7C7B\u592A\u591A\u4F1A\u5BFC\u81F4\u6C38\u4E45\u4EE3\u5185\u5B58\u6EA2\u51FA\uFF0C<code>OutOfMemoryError:PermGen</code>\u3002\u56E0\u4E3A\u8981\u4FC3\u8FDBHotSpot\u548CJRockit\u878D\u5408\uFF0C\u800CJRockit\u6CA1\u6709\u6C38\u4E45\u4EE3\uFF0C\u518D\u52A0\u4E0AJVM\u5F00\u53D1\u8005\u5E0C\u671B\u8FD9\u4E00\u5757\u5185\u5B58\u53EF\u4EE5\u66F4\u7075\u6D3B\u7BA1\u7406\uFF0C<strong>\u6700\u7EC8<code>PermGen</code>\u6700\u7EC8\u88AB\u79FB\u9664\uFF0C\u65B9\u6CD5\u533A\u79FB\u52A8\u81F3<code>Metaspace</code>\uFF0C\u5B57\u7B26\u4E32\u5E38\u91CF\u6C60\u79FB\u81F3\u5806\u533A</strong></p></li><li><p>Jdk8\u4E2D\uFF0C\u7C7B\u7684\u5143\u4FE1\u606F(Object)\u3001\u5B57\u6BB5\u3001\u9759\u6001\u5C5E\u6027(System.in)\u3001\u65B9\u6CD5\u3001\u5E38\u91CF(100000)\u7B49\u90FD\u79FB\u52A8\u5230\u5143\u7A7A\u95F4\u533A</p></li><li><p>\u5143\u7A7A\u95F4\u7684\u672C\u8D28\u548C\u6C38\u4E45\u4EE3\u7C7B\u4F3C\uFF0C\u90FD\u662F\u5BF9 JVM \u89C4\u8303\u4E2D\u65B9\u6CD5\u533A\u7684\u5B9E\u73B0\u3002\u4E0D\u8FC7\u5143\u7A7A\u95F4\u4E0E\u6C38\u4E45\u4EE3\u4E4B\u95F4\u6700\u5927\u7684\u533A\u522B\u5728\u4E8E\uFF1A<strong>\u5143\u7A7A\u95F4\u5E76\u4E0D\u5728\u865A\u62DF\u673A\u4E2D\uFF0C\u800C\u662F\u4F7F\u7528\u672C\u5730\u5185\u5B58</strong>\u3002\u56E0\u6B64\uFF0C\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u5143\u7A7A\u95F4\u7684\u5927\u5C0F\u4EC5\u53D7\u672C\u5730\u5185\u5B58\u9650\u5236\u3002**\u800C\u6C38\u4E45\u4EE3\u867D\u7136\u53EF\u4EE5\u8BBE\u7F6E\u5185\u5B58\u7684\u5927\u5C0F\uFF0C\u4F46\u662F\u5F88\u96BE\u786E\u5B9A\u4E00\u4E2A\u5408\u9002\u7684\u5927\u5C0F\u3002**\u56E0\u4E3A\u5176\u4E2D\u7684\u5F71\u54CD\u56E0\u7D20\u5F88\u591A\uFF0C\u6BD4\u5982\u7C7B\u6570\u91CF\u7684\u591A\u5C11\u3001\u5E38\u91CF\u6570\u91CF\u7684\u591A\u5C11\u7B49\u3002<strong>\u6C38\u4E45\u4EE3\u4E2D\u7684\u5143\u6570\u636E\u7684\u4F4D\u7F6E\u4E5F\u4F1A\u968F\u7740\u4E00\u6B21full GC\u53D1\u751F\u79FB\u52A8</strong>\uFF0C\u6BD4\u8F83\u6D88\u8017\u865A\u62DF\u673A\u6027\u80FD\u3002</p></li><li><p>\u8C03\u53C2</p><table><thead><tr><th>\u53C2\u6570</th><th>\u4F5C\u7528</th></tr></thead><tbody><tr><td>-XX:MetaspaceSize</td><td>\u5206\u914D\u7ED9Metaspace\u7684\u521D\u59CB\u5927\u5C0F\uFF08\u5B57\u8282\u5355\u4F4D\uFF09</td></tr><tr><td>-XX:MaxMetaspaceSize</td><td>\u5206\u914D\u7ED9Metaspace\u7684\u6700\u5927\u503C\uFF0C\u8D85\u8FC7\u6B64\u503C\u4F1A\u89E6\u53D1<strong>Full GC</strong>\uFF0C\u9ED8\u8BA4\u6CA1\u6709\u9650\u5236\uFF0C\u4F46\u5E94\u8BE5\u53D6\u51B3\u4E8E\u7CFB\u7EDF\u5185\u5B58\u7684\u5927\u5C0F\u3002<strong>JVM\u4F1A\u52A8\u6001\u6539\u53D8\u6B64\u503C</strong></td></tr><tr><td>-XX:MinMetaspaceFreeRatio</td><td>\u5728GC\u540E\uFF0C\u6700\u5C0F\u7684Metaspace\u5269\u4F59\u7A7A\u95F4\u5BB9\u91CF\u7684\u767E\u5206\u6BD4\uFF0C\u51CF\u5C11\u4E3A\u5206\u914D\u7A7A\u95F4\u6240\u5BFC\u81F4\u7684\u5783\u573E\u6536\u96C6</td></tr><tr><td>-XX:MaxMetaspaceFreeRatio</td><td>\u5728GC\u540E\uFF0C\u6700\u5927\u7684Metaspace\u5269\u4F59\u7A7A\u95F4\u5BB9\u91CF\u7684\u767E\u5206\u6BD4\uFF0C\u51CF\u5C11\u4E3A\u91CA\u653E\u7A7A\u95F4\u6240\u5BFC\u81F4\u7684\u5783\u573E\u6536\u96C6</td></tr></tbody></table></li></ul><h1 id="java\u865A\u62DF\u673A\u6808" tabindex="-1"><a class="header-anchor" href="#java\u865A\u62DF\u673A\u6808" aria-hidden="true">#</a> Java\u865A\u62DF\u673A\u6808</h1><ul><li>JVM\u4F1A\u4E3A<strong>\u6BCF\u4E00\u4E2A\u7EBF\u7A0B</strong>\u88AB<strong>\u521B\u5EFA</strong>\u65F6\uFF0C\u521B\u5EFA\u4E00\u4E2A<strong>\u5355\u72EC\u7684\u6808</strong>\uFF0C\u6362\u8A00\u4E4B\u8BE5\u533A\u57DF\u662F<strong>\u7EBF\u7A0B\u79C1\u6709</strong>\u7684\uFF0C\u6808\u7684\u751F\u547D\u5468\u671F\u548C\u7EBF\u7A0B\u4E00\u6837</li><li>\u6240\u6709\u7684Java\u65B9\u6CD5(\u975Enative\u65B9\u6CD5)\u90FD\u662F\u901A\u8FC7Java\u865A\u62DF\u673A\u6808\u6765\u5B9E\u73B0\u8C03\u7528\u548C\u6267\u884C\u7684\uFF0C\u5F53\u7136\u8FD9\u4E2A\u8FC7\u7A0B\u9700\u8981\u5806\u3001\u5143\u7A7A\u95F4\u6570\u636E\u7684\u914D\u5408</li><li>\u65B9\u6CD5\u9700\u8981\u6267\u884C\u5219\u9700\u8981\u5165\u6808\uFF0C\u6267\u884C\u5B8C\u6BD5\u4E4B\u540E\u65B9\u6CD5\u9700\u8981\u51FA\u6808\uFF0C\u51FA\u5165\u6808\u7684\u5143\u7D20\u79F0\u4E3A\u6808\u5E27\u3002<strong>\u6808\u5BF9\u5E94\u7EBF\u7A0B\uFF0C\u6808\u5E27\u5BF9\u5E94\u65B9\u6CD5</strong>\u3002\u6BCF\u4E00\u4E2A\u6808\u5E27\u4E2D\u5206\u914D\u591A\u5C11\u5185\u5B58\u57FA\u672C\u4E0A\u662F\u5728\u7C7B\u7ED3\u6784\u786E\u5B9A\u4E0B\u6765\u65F6\u5C31\u5DF2\u77E5\u7684</li><li>\u5728\u6D3B\u52A8\u7EBF\u7A0B\u4E2D\uFF0C\u53EA\u6709\u4F4D\u4E8E\u6808\u9876\u7684\u6808\u5E27\u624D\u662F\u6709\u6548\u3002<code>StackOverflowError</code>\u6807\u8BC6<strong>\u8BF7\u6C42\u7684\u6808\u6EA2\u51FA\uFF0C\u5185\u5B58\u8017\u5C3D</strong></li><li>\u5728\u6267\u884C\u65B9\u6CD5\u7684\u8FC7\u7A0B\u4E2D\uFF0C\u5982\u679C\u51FA\u73B0\u4E86\u5F02\u5E38\uFF0C\u4F1A\u8FDB\u884C<strong>\u5F02\u5E38\u56DE\u6EAF</strong>\uFF0C\u8FD4\u56DE\u5730\u5740\u901A\u8FC7\u5F02\u5E38\u5904\u7406\u8868\u786E\u5B9A\u3002</li></ul><h2 id="\u5C40\u90E8\u53D8\u91CF\u8868" tabindex="-1"><a class="header-anchor" href="#\u5C40\u90E8\u53D8\u91CF\u8868" aria-hidden="true">#</a> \u5C40\u90E8\u53D8\u91CF\u8868</h2><ul><li>\u5B58\u653E<strong>\u65B9\u6CD5\u53C2\u6570</strong>\u3001<strong>\u65B9\u6CD5\u5185\u90E8\u5B9A\u4E49\u7684\u5C40\u90E8\u53D8\u91CF</strong>\u7684\u533A\u57DF\uFF08\u5B58\u653E8\u79CD\u57FA\u672C\u6570\u636E\u7C7B\u578B\u548C\u5F15\u7528\u7C7B\u578B\u7684\u5F15\u7528\uFF0C\u5B9E\u4F8B\u5B58\u5728\u5806\u4E2D\uFF09</li><li>\u5C40\u90E8\u53D8\u91CF\u8868\u6240\u9700\u7684\u5185\u5B58\u7A7A\u95F4<strong>\u5728\u7F16\u8BD1\u671F\u95F4\u5B8C\u6210\u5206\u914D</strong>\uFF0C\u5F53\u8FDB\u5165\u4E00\u4E2A\u65B9\u6CD5\u65F6\uFF0C\u8FD9\u4E2A\u65B9\u6CD5\u9700\u8981\u5728\u5E27\u4E2D<strong>\u5206\u914D\u591A\u5927\u7684\u5C40\u90E8\u53D8\u91CF\u7A7A\u95F4\u662F\u5B8C\u5168\u786E\u5B9A\u7684</strong>\uFF0C\u5728\u65B9\u6CD5\u8FD0\u884C\u671F\u95F4<strong>\u4E0D\u4F1A\u6539\u53D8\u5C40\u90E8\u53D8\u91CF\u8868\u7684\u5927\u5C0F</strong>\u3002</li></ul><h2 id="\u64CD\u4F5C\u6808" tabindex="-1"><a class="header-anchor" href="#\u64CD\u4F5C\u6808" aria-hidden="true">#</a> \u64CD\u4F5C\u6808</h2><ul><li>\u5F53JVM\u4E3A\u65B9\u6CD5\u521B\u5EFA\u6808\u5E27\u7684\u65F6\u5019\uFF0C<strong>\u5728\u6808\u5E27\u4E2D\u4E3A\u65B9\u6CD5\u521B\u5EFA\u4E00\u4E2A\u64CD\u4F5C\u6570\u6808</strong>\uFF0C\u4FDD\u8BC1\u65B9\u6CD5\u5185\u6307\u4EE4\u53EF\u4EE5\u5B8C\u6210\u5DE5\u4F5C</li><li>\u91CD\u8981</li></ul><h2 id="\u52A8\u6001\u8FDE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u52A8\u6001\u8FDE\u63A5" aria-hidden="true">#</a> \u52A8\u6001\u8FDE\u63A5</h2><ul><li><strong>\u6BCF\u4E2A\u6808\u5E27\u4E2D\u5305\u542B\u4E00\u4E2A\u5728\u5E38\u91CF\u6C60\u4E2D\u5BF9\u5F53\u524D\u65B9\u6CD5\u7684\u5F15\u7528</strong>\uFF0C\u76EE\u7684\u662F\u652F\u6301\u65B9\u6CD5\u8C03\u7528\u8FC7\u7A0B\u7684\u52A8\u6001\u8FDE\u63A5</li></ul><h2 id="\u65B9\u6CD5\u8FD4\u56DE\u5730\u5740" tabindex="-1"><a class="header-anchor" href="#\u65B9\u6CD5\u8FD4\u56DE\u5730\u5740" aria-hidden="true">#</a> \u65B9\u6CD5\u8FD4\u56DE\u5730\u5740</h2><ul><li>\u9047\u5230<code>RETURN</code>\u3001<code>IRETURN</code>\u3001<code>ARETURN</code>\u7B49\u8FD4\u56DE\u5B57\u8282\u7801\u6307\u4EE4\uFF0C\u6B63\u5E38\u9000\u51FA</li><li>\u5F02\u5E38\u9000\u51FA</li></ul><h1 id="\u672C\u5730\u65B9\u6CD5\u6808" tabindex="-1"><a class="header-anchor" href="#\u672C\u5730\u65B9\u6CD5\u6808" aria-hidden="true">#</a> \u672C\u5730\u65B9\u6CD5\u6808</h1><ul><li>Java\u865A\u62DF\u673A\u6808\u4E3A\u865A\u62DF\u673A\u6267\u884CJava\u65B9\u6CD5\u670D\u52A1\uFF0C\u672C\u5730\u65B9\u6CD5\u6808\u4E3A\u865A\u62DF\u673A\u6267\u884CNative\u65B9\u6CD5\u670D\u52A1</li><li>\u672C\u5730\u65B9\u6CD5\u6808\u540C\u6837\u4F1A\u629B\u51FA<code>StackOverflowError</code></li><li><strong>\u8BE5\u533A\u57DF\u4E5F\u662F\u7EBF\u7A0B\u79C1\u6709\u7684</strong></li></ul><h1 id="\u7A0B\u5E8F\u8BA1\u6570\u5668" tabindex="-1"><a class="header-anchor" href="#\u7A0B\u5E8F\u8BA1\u6570\u5668" aria-hidden="true">#</a> \u7A0B\u5E8F\u8BA1\u6570\u5668</h1><ul><li><strong>\u7EBF\u7A0B\u79C1\u6709</strong>\uFF0C\u53EF\u4EE5\u770B\u4F5C\u662F\u5F53\u524D\u7EBF\u7A0B\u6240\u6267\u884C\u7684\u5B57\u8282\u7801\u7684\u884C\u53F7\u6307\u793A\u5668\uFF1ACPU\u53EF\u80FD\u4EA4\u66FF\u6267\u884CA\u3001B\u7EBF\u7A0B\uFF0CCPU\u9700\u8981\u77E5\u9053\u6267\u884C\u7EBF\u7A0BA\u7684\u54EA\u4E00\u90E8\u5206\u6307\u4EE4\uFF0C\u7A0B\u5E8F\u8BA1\u6570\u5668\u4F1A\u544A\u8BC9CPU</li></ul><h1 id="\u76F4\u63A5\u5185\u5B58" tabindex="-1"><a class="header-anchor" href="#\u76F4\u63A5\u5185\u5B58" aria-hidden="true">#</a> \u76F4\u63A5\u5185\u5B58</h1><ul><li>\u4E0D\u662F\u865A\u62DF\u673A\u8FD0\u884C\u65F6\u6570\u636E\u533A\u7684\u4E00\u90E8\u5206\uFF0C\u4E5F\u4E0D\u662F\u865A\u62DF\u673A\u89C4\u8303\u4E2D\u5B9A\u4E49\u7684\u5185\u5B58\u533A\u57DF\uFF0C\u4F46\u662F\u8FD9\u90E8\u5206\u4E5F\u4F1A\u88AB\u9891\u7E41\u4F7F\u7528\uFF0C\u4E5F\u4F1A\u5BFC\u81F4<code>OutOfMemoryError</code></li><li>NIO\u5F15\u7528\u4E86\u4E00\u79CD\u57FA\u4E8E\u901A\u9053\u548C\u7F13\u51B2\u533A\u7684IO\u65B9\u5F0F\uFF0C\u53EF\u4EE5\u4F7F\u7528 Native \u51FD\u6570\u5E93\u76F4\u63A5\u5206\u914D\u5806\u5916\u5185\u5B58\uFF0C\u7136\u540E\u901A\u8FC7\u4E00\u4E2A\u5B58\u50A8\u5728 Java \u5806\u4E2D\u7684 DirectByteBuffer \u5BF9\u8C61\u4F5C\u4E3A\u8FD9\u5757\u5185\u5B58\u7684\u5F15\u7528\u8FDB\u884C\u64CD\u4F5C\u3002\u8FD9\u6837\u80FD\u5728\u4E00\u4E9B\u573A\u666F\u4E2D\u663E\u8457\u63D0\u9AD8\u6027\u80FD\uFF0C\u56E0\u4E3A<strong>\u907F\u514D\u4E86\u5728 Java \u5806\u548C Native \u5806\u4E2D\u6765\u56DE\u590D\u5236\u6570\u636E</strong></li></ul><h1 id="code-cache" tabindex="-1"><a class="header-anchor" href="#code-cache" aria-hidden="true">#</a> Code Cache</h1><ul><li><p>JVM<strong>\u5C06\u5176\u5B57\u8282\u7801\u5B58\u50A8\u4E3A\u672C\u673A\u4EE3\u7801\u7684\u533A\u57DF</strong></p></li><li><p>JIT\u662F\u4EE3\u7801\u7F13\u5B58\u533A\u57DF\u7684\u6700\u5927\u6D88\u8D39\u8005</p></li><li><p>\u5982\u679C\u8FD9\u4E00\u5757OOM\u4E86\uFF0C\u5728\u65E5\u5FD7\u4E2D\u53EF\u4EE5\u770B\u5230<code>OutOfMemoryError code cache</code></p></li><li></li></ul><table><thead><tr><th>\u9009\u9879</th><th>\u9ED8\u8BA4\u503C</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td>PrintCodeCache</td><td>false</td><td>\u662F\u5426\u5728JVM\u9000\u51FA\u524D\u6253\u5370CodeCache\u4F7F\u7528\u60C5\u51B5</td></tr><tr><td>PrintCodeCacheOnCompilation</td><td>false</td><td>\u662F\u5426\u5728\u6BCF\u4E2A\u65B9\u6CD5\u88ABJIT\u7F16\u8BD1\u540E\u6253\u5370\u4F7F\u7528\u60C5\u51B5</td></tr></tbody></table><h1 id="\u5783\u573E\u56DE\u6536" tabindex="-1"><a class="header-anchor" href="#\u5783\u573E\u56DE\u6536" aria-hidden="true">#</a> \u5783\u573E\u56DE\u6536</h1><h3 id="\u54EA\u4E9B\u5185\u5B58\u9700\u8981\u56DE\u6536-gc\u53D1\u751F\u7684\u5185\u5B58\u533A\u57DF" tabindex="-1"><a class="header-anchor" href="#\u54EA\u4E9B\u5185\u5B58\u9700\u8981\u56DE\u6536-gc\u53D1\u751F\u7684\u5185\u5B58\u533A\u57DF" aria-hidden="true">#</a> \u54EA\u4E9B\u5185\u5B58\u9700\u8981\u56DE\u6536\uFF0CGC\u53D1\u751F\u7684\u5185\u5B58\u533A\u57DF</h3><h3 id="\u4EC0\u4E48\u65F6\u5019\u56DE\u6536" tabindex="-1"><a class="header-anchor" href="#\u4EC0\u4E48\u65F6\u5019\u56DE\u6536" aria-hidden="true">#</a> \u4EC0\u4E48\u65F6\u5019\u56DE\u6536</h3><h3 id="\u5982\u4F55\u56DE\u6536" tabindex="-1"><a class="header-anchor" href="#\u5982\u4F55\u56DE\u6536" aria-hidden="true">#</a> \u5982\u4F55\u56DE\u6536</h3><h3 id="\u5982\u4F55\u5224\u65AD\u8FD9\u4E2A\u5BF9\u8C61\u9700\u8981\u56DE\u6536-gc\u7684\u5B58\u6D3B\u6807\u51C6" tabindex="-1"><a class="header-anchor" href="#\u5982\u4F55\u5224\u65AD\u8FD9\u4E2A\u5BF9\u8C61\u9700\u8981\u56DE\u6536-gc\u7684\u5B58\u6D3B\u6807\u51C6" aria-hidden="true">#</a> \u5982\u4F55\u5224\u65AD\u8FD9\u4E2A\u5BF9\u8C61\u9700\u8981\u56DE\u6536\uFF0CGC\u7684\u5B58\u6D3B\u6807\u51C6</h3><h2 id="\u5783\u573E\u6536\u96C6\u5668" tabindex="-1"><a class="header-anchor" href="#\u5783\u573E\u6536\u96C6\u5668" aria-hidden="true">#</a> \u5783\u573E\u6536\u96C6\u5668</h2><ul><li>\u4E32\u884C\u6536\u96C6\u5668</li><li>\u5E76\u884C\u6536\u96C6\u5668</li><li>CMS\u6536\u96C6\u5668</li><li>G1\u6536\u96C6\u5668</li></ul><h2 id="gc\u7684\u76EE\u6807\u533A\u57DF" tabindex="-1"><a class="header-anchor" href="#gc\u7684\u76EE\u6807\u533A\u57DF" aria-hidden="true">#</a> GC\u7684\u76EE\u6807\u533A\u57DF</h2><ul><li><strong>\u5806 \u548C \u65B9\u6CD5\u533A</strong>\uFF0C\u56E0\u4E3A\u8FD0\u884C\u671F\u95F4\u624D\u80FD\u77E5\u9053\u4F1A\u521B\u5EFA\u54EA\u4E9B\u5BF9\u8C61\uFF0C\u6240\u4EE5<strong>\u5185\u5B58\u7684\u5206\u914D\u548C\u56DE\u6536\u90FD\u662F\u52A8\u6001\u7684</strong>\u3002\u7A0B\u5E8F\u8BA1\u6570\u5668\u3001\u865A\u62DF\u673A\u6808\u3001\u672C\u5730\u65B9\u6CD5\u6808\u90FD\u662F\u7EBF\u7A0B\u79C1\u6709\u7684\uFF0C\u751F\u547D\u5468\u671F\u548C\u7EBF\u7A0B\u4E00\u81F4\u3002\u6BCF\u4E00\u4E2A\u6808\u5E27\u5206\u914D\u591A\u5C11\u5185\u5B58\u57FA\u672C\u4E0A\u5728\u7C7B\u7ED3\u6784\u786E\u5B9A\u4E0B\u6765\u5C31\u662F\u5DF2\u77E5\u7684\uFF1B\u65B9\u6CD5\u7ED3\u675F\u6216\u7EBF\u7A0B\u7ED3\u675F\uFF0C\u5185\u5B58\u81EA\u7136\u5C31\u968F\u7740\u56DE\u6536\u4E86\u3002\u6240\u4EE5<strong>\u8FD9\u51E0\u4E2A\u533A\u57DF\u7684\u5185\u5B58\u5206\u914D\u548C\u56DE\u6536\u90FD\u662F\u786E\u5B9A\u7684</strong>\u3002</li></ul><h2 id="gc\u7684\u5B58\u6D3B\u6807\u51C6" tabindex="-1"><a class="header-anchor" href="#gc\u7684\u5B58\u6D3B\u6807\u51C6" aria-hidden="true">#</a> GC\u7684\u5B58\u6D3B\u6807\u51C6</h2><ul><li><p>\u5F15\u7528\u8BA1\u6570\u7B97\u6CD5</p><ul><li>\u5728\u5BF9\u8C61\u5934\u7EF4\u62A4\u7740\u4E00\u4E2A<code>counter</code>\u8BA1\u6570\u5668\uFF0C\u5BF9\u8C61\u88AB\u5F15\u7528\u4E00\u6B21\u5219\u8BA1\u6570\u5668+1\uFF1B\u82E5\u5F15\u7528\u65E0\u6548\u5219\u8BA1\u6570\u5668-1\uFF0C\u5F53\u8BA1\u6570\u5668\u4E3A0\u65F6\uFF0C\u5C31\u8BA4\u4E3A\u8BE5\u5BF9\u8C61\u65E0\u6548\u4E86\u3002</li><li>\u7F3A\u9677\uFF1A\u65E0\u6CD5\u89E3\u51B3\u5FAA\u73AF\u5F15\u7528\u7684\u95EE\u9898\uFF0C\u5F53\u5FAA\u73AF\u5F15\u7528\u7684\u5BF9\u8C61\u7684\u8BA1\u6570\u5668\u6C38\u8FDC\u4E0D\u4E3A0\uFF0C\u5BFC\u81F4\u8FD9\u4E9B\u5BF9\u8C61\u6C38\u8FDC\u4E0D\u4F1A\u88AB\u91CA\u653E</li></ul></li><li><p>\u53EF\u8FBE\u6027\u5206\u6790\u7B97\u6CD5</p><ul><li>\u4ECE<code>GC Roots</code>\u4E3A\u8D77\u70B9\u5F00\u59CB\u5411\u4E0B\u641C\u7D22\uFF0C<strong>\u5F53\u4E00\u4E2A\u5BF9\u8C61\u7684GC Roots\u6CA1\u6709\u4E0E\u4EFB\u4F55<code>\u5F15\u7528\u94FE</code>\u76F8\u8FDE\u65F6</strong>\uFF0C\u8BC1\u660E\u8BE5\u5BF9\u8C61\u662F<code>\u4E0D\u53EF\u8FBE\u5BF9\u8C61</code>\u3002</li><li><strong>GC Roots</strong>\uFF1AJava\u865A\u62DF\u673A\u6808\u4E2D\u7684\u5C40\u90E8\u53D8\u91CF\u8868\u4E2D\u5F15\u7528\u7684\u5BF9\u8C61\u3001\u672C\u5730\u65B9\u6CD5\u6808\u4E2D\u5F15\u7528\u7684\u5BF9\u8C61\u3001\u5143\u7A7A\u95F4\u4E2D\u5E38\u91CF\u5F15\u7528\u7684\u5BF9\u8C61\u3001\u5143\u7A7A\u95F4\u4E2D\u9759\u6001\u5C5E\u6027\u5F15\u7528\u7684\u5BF9\u8C61</li><li><strong>\u5F15\u7528\u94FE</strong>\uFF1AGC Roots\u5411\u4E0B\u641C\u7D22\u6240\u7ECF\u8FC7\u7684\u8DEF\u5F84</li></ul></li><li><p>\u5F15\u7528\u5206\u7C7B\uFF0CJVM\u5728\u8FDB\u884CGC\u7684\u65F6\u5019\u5BF9\u4E0D\u540C\u7684\u5F15\u7528\u7C7B\u578B\u6709\u7740\u4E0D\u540C\u7684\u7B56\u7565</p><ul><li><p>\u5F3A\u5F15\u7528\uFF1A<strong>\u53EA\u6709\u5F53\u5F3A\u5F15\u7528\u88AB\u8BBE\u4E3Anull\u7684\u65F6\u5019\uFF0C\u5BF9\u8C61\u624D\u4F1A\u88AB\u56DE\u6536</strong>\u3002\u5982\u679C\u88AB\u9519\u8BEF\u5730\u4FDD\u6301\u4E86\u5F3A\u5F15\u7528\uFF0C\u5982\u8D4B\u503C\u7ED9\u4E86static\u53D8\u91CF\uFF0C\u5219\u5F88\u957F\u65F6\u95F4\u4E0D\u4F1A\u88AB\u56DE\u6536</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">MyClass</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u8F6F\u5F15\u7528\uFF1A<strong>\u53EA\u6709\u5F53JVM\u8BA4\u4E3A\u5185\u5B58\u4E0D\u8DB3\u65F6\uFF0C\u624D\u4F1A\u53BB\u8BD5\u56FE\u56DE\u6536\u8F6F\u5F15\u7528\u6307\u5411\u7684\u5BF9\u8C61\uFF1BJVM\u4F1A\u786E\u4FDD\u5728\u629B\u51FA<code>OutOfMemoryError</code>\u4E4B\u524D\uFF0C\u6E05\u7406\u8F6F\u5F15\u7528\u6307\u5411\u7684\u5BF9\u8C61</strong>\u3002\u8F6F\u5F15\u7528\u901A\u5E38\u7528\u6765\u5B9E\u73B0\u5185\u5B58\u654F\u611F\u7684\u7F13\u5B58\uFF1A\u6709\u7A7A\u95F2\u5219\u4FDD\u7559\uFF0C\u5185\u5B58\u4E0D\u8DB3\u5219\u6E05\u7406\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">SoftReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MyClass</span><span class="token punctuation">&gt;</span></span> weakReference <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u5F31\u5F15\u7528\uFF1A<strong>\u5F53JVM\u8FDB\u884C\u5783\u573E\u56DE\u6536\u65F6\uFF0C\u65E0\u8BBA\u5185\u5B58\u662F\u5426\u5145\u8DB3\uFF0C\u90FD\u4F1A\u56DE\u6536\u53EA\u88AB\u5F31\u5F15\u7528\u6307\u5411\u7684\u5BF9\u8C61</strong></p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">WeakReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MyClass</span><span class="token punctuation">&gt;</span></span> weakReference <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u865A\u5F15\u7528\uFF1A\u4E00\u4E2A\u5BF9\u8C61\u662F\u5426\u6709\u865A\u5F15\u7528\u7684\u5B58\u5728\uFF0C<strong>\u5B8C\u5168\u4E0D\u4F1A\u5BF9\u5176\u751F\u5B58\u65F6\u95F4\u6784\u6210\u5F71\u54CD</strong>\uFF0C\u4E5F\u65E0\u6CD5\u901A\u8FC7\u865A\u5F15\u7528\u6765\u53D6\u5F97\u4E00\u4E2A\u5BF9\u8C61\u5B9E\u4F8B\u3002<strong>\u88AB\u865A\u5F15\u7528\u6307\u5411\u552F\u4E00\u76EE\u7684\u5C31\u662F\u80FD\u5728\u8FD9\u4E2A\u5BF9\u8C61\u88AB\u6536\u96C6\u5668\u56DE\u6536\u65F6\u6536\u5230\u4E00\u4E2A\u7CFB\u7EDF\u901A\u77E5</strong></p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">PhantomReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MyClass</span><span class="token punctuation">&gt;</span></span> phantomReference <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PhantomReference</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">ReferenceQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul></li></ul><h2 id="gc\u7B97\u6CD5" tabindex="-1"><a class="header-anchor" href="#gc\u7B97\u6CD5" aria-hidden="true">#</a> GC\u7B97\u6CD5</h2><ul><li>\u6807\u8BB0-\u6E05\u9664\u7B97\u6CD5\uFF08Mark-Sweep\uFF09 <ul><li>\u4F18\u70B9\uFF1A\u5FEB\u901F</li><li>\u7F3A\u70B9\uFF1A1.\u6807\u8BB0\u548C\u6E05\u9664\u8FD9\u4E24\u4E2A\u8FC7\u7A0B\u7684<strong>\u6548\u7387\u90FD\u4E0D\u9AD8</strong>\uFF1B2.<strong>\u7A7A\u95F4\u95EE\u9898</strong>\uFF0C\u6807\u8BB0\u6E05\u9664\u4E4B\u540E\u4F1A\u4EA7\u751F\u5927\u91CF\u4E0D\u8FDE\u7EED\u7684\u5185\u5B58\u788E\u7247\u3002<strong>\u5BFC\u81F4\u540E\u9762\u5728\u5206\u914D\u5927\u5BF9\u8C61\u7684\u65F6\u5019\u65E0\u6CD5\u627E\u5230\u8DB3\u591F\u5927\u4E14\u8FDE\u7EED\u7684\u5185\u5B58\u800C\u4E0D\u5F97\u4E0D\u63D0\u524D\u89E6\u53D1\u53E6\u4E00\u6B21\u5783\u573E\u56DE\u6536</strong></li><li><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrkux7i8j30m807y74o.jpg" alt=""></li></ul></li><li>\u590D\u5236\u7B97\u6CD5\uFF08Copying\uFF09 <ul><li>\u5C06\u53EF\u7528\u5185\u5B58\u6309\u5BB9\u91CF\u5212\u5206\u4E3A<strong>\u5927\u5C0F\u76F8\u7B49\u7684\u4E24\u5757</strong>\uFF0C\u6BCF\u6B21\u53EA\u4F7F\u7528\u5176\u4E2D\u4E00\u5757\u3002\u5F53\u8FD9\u4E00\u5757\u7684\u5185\u5B58\u7528\u5B8C\u4E86\uFF0C\u5C31\u5C06\u8FD8<strong>\u5B58\u6D3B\u7684\u5BF9\u8C61\u590D\u5236\u5230\u53E6\u4E00\u5757\u4E0A\u9762</strong>\uFF0C\u5E76\u5BF9\u524D\u4E00\u5757\u7A7A\u95F4\u8FDB\u884C\u6E05\u7406</li><li><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrkvvgwfj30m809x3z0.jpg" alt=""></li><li>\u4F18\u70B9\uFF1A\u6BCF\u6B21\u90FD\u662F\u5BF9\u534A\u533A\u5185\u5B58\u8FDB\u884C\u56DE\u6536\uFF0C\u5206\u914D\u5927\u5BF9\u8C61\u7684\u65F6\u5019\u4E5F\u5C31\u4E0D\u7528\u8003\u8651\u5185\u5B58\u788E\u7247\u7684\u95EE\u9898</li><li>\u7F3A\u70B9\uFF1A<strong>\u53EF\u7528\u5185\u5B58\u7F29\u5C0F\u4E86\u4E00\u534A</strong></li><li>\u8FD9\u79CD\u7B97\u6CD5\u4E00\u822C\u7528\u5728<strong>\u65B0\u751F\u4EE3</strong></li></ul></li><li>\u6807\u8BB0-\u6574\u7406\u7B97\u6CD5\uFF08Mark-Compact\uFF09 <ul><li><strong>\u6807\u8BB0\u8FC7\u7A0B\u548C\u6807\u8BB0-\u6E05\u9664\u7B97\u6CD5\u4E00\u6837</strong>\uFF0C\u4F46\u662F\u540E\u7EED\u662F\u8BA9\u6240\u6709\u5B58\u6D3B\u5BF9\u8C61\u90FD\u5411\u4E00\u7AEF\u79FB\u52A8\uFF0C\u7136\u540E<strong>\u6E05\u7406\u6389\u7AEF\u8FB9\u754C\u4EE5\u5916\u7684\u53EF\u56DE\u6536\u5BF9\u8C61</strong></li><li><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/007S8ZIlgy1gfsrkwtbdpj30m80bpjs2.jpg" alt=""></li><li>\u4E3B\u8981\u7528\u4E8E\u8001\u5E74\u4EE3</li></ul></li><li>\u5206\u4EE3\u6536\u96C6\u7B97\u6CD5 <ul><li>\u65B0\u751F\u4EE3\uFF1A\u590D\u5236\u7B97\u6CD5</li><li>\u8001\u5E74\u4EE3\uFF1A\u6807\u8BB0-\u6E05\u9664\u7B97\u6CD5\u3001\u6807\u8BB0-\u6574\u7406\u7B97\u6CD5</li><li><strong>\u5148\u6709\u5206\u4EE3\u6536\u96C6\u7B97\u6CD5\uFF0C\u624D\u4F1A\u5C06\u5806\u5206\u6210\u65B0\u751F\u4EE3\u548C\u8001\u5E74\u4EE3</strong></li></ul></li></ul><h2 id="gc\u672F\u8BED" tabindex="-1"><a class="header-anchor" href="#gc\u672F\u8BED" aria-hidden="true">#</a> GC\u672F\u8BED</h2><ul><li><strong>\u90E8\u5206\u6536\u96C6(Partial GC)</strong>\uFF1A\u76EE\u6807\u4E0D\u662F\u5B8C\u6574\u6536\u96C6\u6574\u4E2AJava\u5806\u7684\u5783\u573E\u6536\u96C6 <ul><li><strong>\u65B0\u751F\u4EE3\u6536\u96C6(Minor GC/Young GC/YGC)</strong>\uFF1A\u65B0\u751F\u4EE3\u7684\u5783\u573E\u6536\u96C6</li><li><strong>\u8001\u5E74\u4EE3\u6536\u96C6(Major GC/Old GC/OGC)</strong>\uFF1A\u8001\u5E74\u4EE3\u7684\u5783\u573E\u6536\u96C6\uFF0C<strong>\u76EE\u524D\u53EA\u6709GMS\u6536\u96C6\u5668\u4F1A\u6709\u5355\u72EC\u6536\u96C6\u8001\u5E74\u4EE3\u7684\u884C\u4E3A</strong></li><li><strong>\u6DF7\u5408\u6536\u96C6(Mixed GC)</strong>\uFF1A\u6536\u96C6\u6574\u4E2A\u65B0\u751F\u4EE3\u4EE5\u53CA\u90E8\u5206\u8001\u5E74\u4EE3\u7684\u5783\u573E\u6536\u96C6\uFF0C<strong>\u76EE\u524D\u53EA\u6709G1\u6536\u96C6\u5668\u4F1A\u6709\u8FD9\u79CD\u884C\u4E3A</strong></li></ul></li><li><strong>\u6574\u5806\u6536\u96C6(Full GC)</strong>\uFF1A\u6536\u96C6\u6574\u4E2AJava\u5806\u548C\u65B9\u6CD5\u533A\u7684\u5783\u573E\u6536\u96C6</li><li><strong>\u5E76\u884C(Parallel)</strong>\uFF1A\u5E76\u884C\u9636\u6BB5\u662F\u7531\u591A\u4E2AGC \u7EBF\u7A0B\u6267\u884C</li><li><strong>\u4E32\u884C(Serial)</strong>\uFF1A\u4E32\u884C\u9636\u6BB5\u5728\u5355\u4E2AGC\u7EBF\u7A0B\u4E0A\u6267\u884C</li><li><strong>STW(Stop The World)</strong>\uFF1A\u5728Stop The World\u9636\u6BB5\uFF0C\u5E94\u7528\u7A0B\u5E8F\u88AB\u6682\u505C\uFF0C\u4EE5\u4FBFGC\u7EBF\u7A0B\u6267\u884C\u5176\u5DE5\u4F5C\u3002\u5F53\u5E94\u7528\u7A0B\u5E8F\u56E0\u4E3AGC\u6682\u505C\u65F6\uFF0C\u901A\u5E38\u662F\u7531\u4E8EStop The World\u9636\u6BB5</li><li><strong>\u5E76\u53D1(Concurrent)</strong>\uFF1A\u5E94\u7528\u7A0B\u5E8F\u7EBF\u7A0B\u548C\u5783\u573E\u6536\u96C6\u5668\u7EBF\u7A0B\u4EA4\u66FF\u6267\u884C</li><li><strong>\u589E\u91CF</strong>\uFF1A</li></ul><h2 id="\u5783\u573E\u6536\u96C6\u5668-1" tabindex="-1"><a class="header-anchor" href="#\u5783\u573E\u6536\u96C6\u5668-1" aria-hidden="true">#</a> \u5783\u573E\u6536\u96C6\u5668</h2>`,57),r=[o];function l(i,c){return s(),n("div",null,r)}var p=a(t,[["render",l],["__file","JVM.html.vue"]]);export{p as default};