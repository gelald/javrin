const e=JSON.parse('{"key":"v-8dfc9514","path":"/writings/message-queue/RocketMQ-operation-client.html","title":"RocketMQ \u64CD\u4F5C\u843D\u5730(rocketmq-client\u65B9\u5F0F)","lang":"zh-CN","frontmatter":{"title":"RocketMQ \u64CD\u4F5C\u843D\u5730(rocketmq-client\u65B9\u5F0F)","icon":"article","category":["\u5E72\u8D27","\u6D88\u606F\u961F\u5217"],"tag":["\u57FA\u7840","RocketMQ"],"summary":"RocketMQ \u64CD\u4F5C\u843D\u5730(rocketmq-client\u65B9\u5F0F) \\"\u672C\u6587\u4F7F\u7528rocketmq-client\u7684\u96C6\u6210\u65B9\u5F0F\u5C55\u793ARocketMQ\u7684\u5E38\u89C1\u7528\u6CD5\\" RocketMQ \u666E\u901A\u6D88\u606F\u53D1\u9001 \u666E\u901A\u6D88\u606F\u540C\u6B65\u53D1\u9001 \u751F\u4EA7\u8005\u5411 RocketMQ \u53D1\u9001\u4E00\u6761\u6D88\u606F\uFF0CRocketMQ \u8FD4\u56DE\u751F\u4EA7\u8005\u5176\u53D1\u9001\u7ED3\u679C\uFF0C\u53EF\u7528\u4E8E\u5224\u65AD\u662F\u5426\u53D1\u9001\u6210\u529F\u3002 \u666E\u901A\u6D88\u606F\u5F02\u6B65\u53D1\u9001 \u5982\u679C\u53D1\u9001\u7684\u6D88\u606F\u592A\u5927\u6216\u8005\u4E1A\u52A1\u5BF9\u7B49\u5F85\u53D1","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/message-queue/RocketMQ-operation-client.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"RocketMQ \u64CD\u4F5C\u843D\u5730(rocketmq-client\u65B9\u5F0F)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-08-23T23:57:17.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"\u57FA\u7840"}],["meta",{"property":"article:tag","content":"RocketMQ"}],["meta",{"property":"article:modified_time","content":"2022-08-23T23:57:17.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"RocketMQ \u666E\u901A\u6D88\u606F\u53D1\u9001","slug":"rocketmq-\u666E\u901A\u6D88\u606F\u53D1\u9001","children":[{"level":3,"title":"\u666E\u901A\u6D88\u606F\u540C\u6B65\u53D1\u9001","slug":"\u666E\u901A\u6D88\u606F\u540C\u6B65\u53D1\u9001","children":[]},{"level":3,"title":"\u666E\u901A\u6D88\u606F\u5F02\u6B65\u53D1\u9001","slug":"\u666E\u901A\u6D88\u606F\u5F02\u6B65\u53D1\u9001","children":[]},{"level":3,"title":"\u666E\u901A\u6D88\u606F\u5355\u5411\u53D1\u9001","slug":"\u666E\u901A\u6D88\u606F\u5355\u5411\u53D1\u9001","children":[]}]},{"level":2,"title":"RocketMQ \u6D88\u606F\u6D88\u8D39\u6A21\u5F0F","slug":"rocketmq-\u6D88\u606F\u6D88\u8D39\u6A21\u5F0F","children":[{"level":3,"title":"\u96C6\u7FA4\u6D88\u8D39\u6A21\u5F0F","slug":"\u96C6\u7FA4\u6D88\u8D39\u6A21\u5F0F","children":[]},{"level":3,"title":"\u5E7F\u64AD\u6D88\u8D39\u6A21\u5F0F","slug":"\u5E7F\u64AD\u6D88\u8D39\u6A21\u5F0F","children":[]}]},{"level":2,"title":"RocketMQ \u987A\u5E8F\u6D88\u606F","slug":"rocketmq-\u987A\u5E8F\u6D88\u606F","children":[{"level":3,"title":"\u751F\u4EA7\u5168\u5C40\u987A\u5E8F\u6D88\u606F","slug":"\u751F\u4EA7\u5168\u5C40\u987A\u5E8F\u6D88\u606F","children":[]},{"level":3,"title":"\u751F\u4EA7\u5C40\u90E8\u987A\u5E8F\u6D88\u606F","slug":"\u751F\u4EA7\u5C40\u90E8\u987A\u5E8F\u6D88\u606F","children":[]},{"level":3,"title":"\u987A\u5E8F\u6D88\u8D39\u6D88\u606F","slug":"\u987A\u5E8F\u6D88\u8D39\u6D88\u606F","children":[]}]},{"level":2,"title":"RocketMQ \u5EF6\u65F6\u6D88\u606F","slug":"rocketmq-\u5EF6\u65F6\u6D88\u606F","children":[{"level":3,"title":"\u4F7F\u7528\u573A\u666F","slug":"\u4F7F\u7528\u573A\u666F","children":[]}]},{"level":2,"title":"RocketMQ \u6279\u91CF\u6D88\u606F","slug":"rocketmq-\u6279\u91CF\u6D88\u606F","children":[]},{"level":2,"title":"RocketMQ \u8FC7\u6EE4\u6D88\u606F","slug":"rocketmq-\u8FC7\u6EE4\u6D88\u606F","children":[{"level":3,"title":"Tag \u8FC7\u6EE4","slug":"tag-\u8FC7\u6EE4","children":[]},{"level":3,"title":"SQL \u8FC7\u6EE4","slug":"sql-\u8FC7\u6EE4","children":[]}]},{"level":2,"title":"RocketMQ \u4E8B\u52A1\u6D88\u606F","slug":"rocketmq-\u4E8B\u52A1\u6D88\u606F","children":[{"level":3,"title":"\u4E24\u9636\u6BB5\u63D0\u4EA4","slug":"\u4E24\u9636\u6BB5\u63D0\u4EA4","children":[]},{"level":3,"title":"\u4E8B\u52A1\u8865\u507F\u673A\u5236","slug":"\u4E8B\u52A1\u8865\u507F\u673A\u5236","children":[]}]}],"git":{"createdTime":1661299037000,"updatedTime":1661299037000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":5.32,"words":1597},"filePathRelative":"writings/message-queue/RocketMQ-operation-client.md","localizedDate":"2022\u5E748\u670823\u65E5"}');export{e as data};
