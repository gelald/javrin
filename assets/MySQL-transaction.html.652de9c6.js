const e=JSON.parse('{"key":"v-30420bb2","path":"/writings/MySQL/MySQL-transaction.html","title":"MySQL \u4E8B\u52A1\u89E3\u6790","lang":"zh-CN","frontmatter":{"title":"MySQL \u4E8B\u52A1\u89E3\u6790","icon":"article","category":["\u6570\u636E\u5E93","\u6587\u7AE0"],"tag":["MySQL","\u4E8B\u52A1","\u9501"],"summary":"MySQL \u4E8B\u52A1\u89E3\u6790 \\" \u4E8B\u52A1\uFF1A\u4E00\u4E2A\u5305\u542B\u591A\u4E2A\u64CD\u4F5C\u7684\u6700\u5C0F\u5DE5\u4F5C\u5355\u5143\uFF0C\u8FD9\u4E9B\u64CD\u4F5C\u8981\u4E48\u540C\u65F6\u6210\u529F\uFF0C\u8981\u4E48\u540C\u65F6\u5931\u8D25\u3002\u672C\u7BC7\u4ECB\u7ECD\u4E8B\u52A1\uFF0C\u7531\u4E8E MyISAM \u5B58\u50A8\u5F15\u64CE\u4E0D\u652F\u6301\u4E8B\u52A1\uFF0C\u6240\u4EE5\u672C\u7BC7\u9ED8\u8BA4\u5B58\u50A8\u5F15\u64CE\u4E3A InnoDB\u3002\\" \u4E8B\u52A1 ACID \u7279\u6027 Atomicity\uFF1A\u539F\u5B50\u6027\uFF0C\u4E00\u4E2A\u4E8B\u52A1\u5185\u7684\u591A\u4E2A\u64CD\u4F5C\u8981\u4E48\u5168\u90E8\u6210\u529F\uFF0C\u8981\u4E48\u5168\u90E8\u5931\u8D25; Isolation\uFF1A\u9694\u79BB\u6027\uFF0C\u6570\u636E\u5E93\u7CFB\u7EDF\u63D0\u4F9B\u7684\u9694\u79BB\u673A\u5236\u4FDD\u8BC1\u4E8B\u52A1\u5728\u4E0D","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/MySQL/MySQL-transaction.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"MySQL \u4E8B\u52A1\u89E3\u6790"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-03-01T07:27:35.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"MySQL"}],["meta",{"property":"article:tag","content":"\u4E8B\u52A1"}],["meta",{"property":"article:tag","content":"\u9501"}],["meta",{"property":"article:modified_time","content":"2023-03-01T07:27:35.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"\u4E8B\u52A1 ACID \u7279\u6027","slug":"\u4E8B\u52A1-acid-\u7279\u6027","children":[]},{"level":2,"title":"MySQL \u5982\u4F55\u4FDD\u8BC1\u539F\u5B50\u6027","slug":"mysql-\u5982\u4F55\u4FDD\u8BC1\u539F\u5B50\u6027","children":[]},{"level":2,"title":"undo log","slug":"undo-log","children":[{"level":3,"title":"\u8BB0\u5F55\u7684\u9690\u85CF\u5B57\u6BB5","slug":"\u8BB0\u5F55\u7684\u9690\u85CF\u5B57\u6BB5","children":[]},{"level":3,"title":"\u8BB0\u5F55\u7684\u5934\u4FE1\u606F","slug":"\u8BB0\u5F55\u7684\u5934\u4FE1\u606F","children":[]},{"level":3,"title":"insert undo log","slug":"insert-undo-log","children":[]},{"level":3,"title":"update undo log","slug":"update-undo-log","children":[]}]},{"level":2,"title":"MySQL \u5982\u4F55\u4FDD\u8BC1\u6301\u4E45\u6027","slug":"mysql-\u5982\u4F55\u4FDD\u8BC1\u6301\u4E45\u6027","children":[]},{"level":2,"title":"MySQL \u5982\u4F55\u4FDD\u8BC1\u9694\u79BB\u6027","slug":"mysql-\u5982\u4F55\u4FDD\u8BC1\u9694\u79BB\u6027","children":[{"level":3,"title":"\u4E8B\u52A1\u9694\u79BB\u6027\u95EE\u9898","slug":"\u4E8B\u52A1\u9694\u79BB\u6027\u95EE\u9898","children":[]},{"level":3,"title":"\u4E8B\u52A1\u9694\u79BB\u7EA7\u522B","slug":"\u4E8B\u52A1\u9694\u79BB\u7EA7\u522B","children":[]},{"level":3,"title":"MySQL \u4E0D\u540C\u7684\u4E8B\u52A1\u9694\u79BB\u7EA7\u522B\u5B9E\u73B0\u65B9\u5F0F","slug":"mysql-\u4E0D\u540C\u7684\u4E8B\u52A1\u9694\u79BB\u7EA7\u522B\u5B9E\u73B0\u65B9\u5F0F","children":[]},{"level":3,"title":"MVCC","slug":"mvcc","children":[]},{"level":3,"title":"LBCC","slug":"lbcc","children":[]},{"level":3,"title":"\u5FEB\u7167\u8BFB\u4E0E\u5F53\u524D\u8BFB","slug":"\u5FEB\u7167\u8BFB\u4E0E\u5F53\u524D\u8BFB","children":[]},{"level":3,"title":"InnoDB RR \u9694\u79BB\u7EA7\u522B\u4E0B\u5982\u4F55\u89E3\u51B3\u5E7B\u8BFB\u95EE\u9898","slug":"innodb-rr-\u9694\u79BB\u7EA7\u522B\u4E0B\u5982\u4F55\u89E3\u51B3\u5E7B\u8BFB\u95EE\u9898","children":[]}]},{"level":2,"title":"MySQL \u5982\u4F55\u4FDD\u8BC1\u4E00\u81F4\u6027","slug":"mysql-\u5982\u4F55\u4FDD\u8BC1\u4E00\u81F4\u6027","children":[]},{"level":2,"title":"\u603B\u7ED3","slug":"\u603B\u7ED3","children":[]}],"git":{"createdTime":1676904395000,"updatedTime":1677655655000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1},{"name":"wuyingbin","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":17.57,"words":5270},"filePathRelative":"writings/MySQL/MySQL-transaction.md","localizedDate":"2023\u5E742\u670820\u65E5"}');export{e as data};