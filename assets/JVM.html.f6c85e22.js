const e=JSON.parse('{"key":"v-5305fac4","path":"/writings/archive/JVM.html","title":"\u5806","lang":"zh-CN","frontmatter":{"summary":"\u65B9\u6CD5\u533A\u5728JVM\u4E2D\u4E5F\u662F\u4E00\u4E2A\u975E\u5E38\u91CD\u8981\u7684\u533A\u57DF\uFF0C\u5B83\u4E0E\u5806\u4E00\u6837\uFF0C\u662F\u88AB \u7EBF\u7A0B\u5171\u4EAB \u7684\u533A\u57DF\u3002 \u5728\u65B9\u6CD5\u533A\u4E2D\uFF0C\u5B58\u50A8\u4E86\u6BCF\u4E2A\u7C7B\u7684\u4FE1\u606F\uFF08\u5305\u62EC\u7C7B\u7684\u540D\u79F0\u3001\u65B9\u6CD5\u4FE1\u606F\u3001\u5B57\u6BB5\u4FE1\u606F\uFF09\u3001\u9759\u6001\u53D8\u91CF\u3001\u5E38\u91CF\u4EE5\u53CA\u7F16\u8BD1\u5668\u7F16\u8BD1\u540E\u7684\u4EE3\u7801\u7B49\u3002 \u65B9\u6CD5\u533A\u57DF\u5B58\u653E\u4E86\u6240\u52A0\u8F7D\u7684\u7C7B\u7684\u4FE1\u606F\uFF08\u540D\u79F0\u3001\u4FEE\u9970\u7B26\u7B49\uFF09\u3001\u7C7B\u4E2D\u7684\u9759\u6001\u53D8\u91CF\u3001\u7C7B\u4E2D\u5B9A\u4E49\u4E3Afinal\u7C7B\u578B\u7684\u5E38\u91CF\u3001\u7C7B\u4E2D\u7684Field\u4FE1\u606F\u3001\u7C7B\u4E2D\u7684\u65B9\u6CD5\u4FE1\u606F\uFF0C\u5F53\u5F00\u53D1\u4EBA\u5458\u5728\u7A0B\u5E8F\u4E2D\u901A\u8FC7Class\u5BF9\u8C61","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/archive/JVM.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"\u5806"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-07-30T16:21:52.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:modified_time","content":"2022-07-30T16:21:52.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"JVM\u521B\u5EFA\u4E00\u4E2A\u65B0\u5BF9\u8C61\u7684\u5185\u5B58\u5206\u914D\u6D41\u7A0B","slug":"jvm\u521B\u5EFA\u4E00\u4E2A\u65B0\u5BF9\u8C61\u7684\u5185\u5B58\u5206\u914D\u6D41\u7A0B","children":[]},{"level":2,"title":"\u5C40\u90E8\u53D8\u91CF\u8868","slug":"\u5C40\u90E8\u53D8\u91CF\u8868","children":[]},{"level":2,"title":"\u64CD\u4F5C\u6808","slug":"\u64CD\u4F5C\u6808","children":[]},{"level":2,"title":"\u52A8\u6001\u8FDE\u63A5","slug":"\u52A8\u6001\u8FDE\u63A5","children":[]},{"level":2,"title":"\u65B9\u6CD5\u8FD4\u56DE\u5730\u5740","slug":"\u65B9\u6CD5\u8FD4\u56DE\u5730\u5740","children":[{"level":3,"title":"\u54EA\u4E9B\u5185\u5B58\u9700\u8981\u56DE\u6536\uFF0CGC\u53D1\u751F\u7684\u5185\u5B58\u533A\u57DF","slug":"\u54EA\u4E9B\u5185\u5B58\u9700\u8981\u56DE\u6536-gc\u53D1\u751F\u7684\u5185\u5B58\u533A\u57DF","children":[]},{"level":3,"title":"\u4EC0\u4E48\u65F6\u5019\u56DE\u6536","slug":"\u4EC0\u4E48\u65F6\u5019\u56DE\u6536","children":[]},{"level":3,"title":"\u5982\u4F55\u56DE\u6536","slug":"\u5982\u4F55\u56DE\u6536","children":[]},{"level":3,"title":"\u5982\u4F55\u5224\u65AD\u8FD9\u4E2A\u5BF9\u8C61\u9700\u8981\u56DE\u6536\uFF0CGC\u7684\u5B58\u6D3B\u6807\u51C6","slug":"\u5982\u4F55\u5224\u65AD\u8FD9\u4E2A\u5BF9\u8C61\u9700\u8981\u56DE\u6536-gc\u7684\u5B58\u6D3B\u6807\u51C6","children":[]}]},{"level":2,"title":"\u5783\u573E\u6536\u96C6\u5668","slug":"\u5783\u573E\u6536\u96C6\u5668","children":[]},{"level":2,"title":"GC\u7684\u76EE\u6807\u533A\u57DF","slug":"gc\u7684\u76EE\u6807\u533A\u57DF","children":[]},{"level":2,"title":"GC\u7684\u5B58\u6D3B\u6807\u51C6","slug":"gc\u7684\u5B58\u6D3B\u6807\u51C6","children":[]},{"level":2,"title":"GC\u7B97\u6CD5","slug":"gc\u7B97\u6CD5","children":[]},{"level":2,"title":"GC\u672F\u8BED","slug":"gc\u672F\u8BED","children":[]},{"level":2,"title":"\u5783\u573E\u6536\u96C6\u5668","slug":"\u5783\u573E\u6536\u96C6\u5668-1","children":[]}],"git":{"createdTime":1659198112000,"updatedTime":1659198112000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":13.26,"words":3979},"filePathRelative":"writings/archive/JVM.md","localizedDate":"2022\u5E747\u670830\u65E5"}');export{e as data};