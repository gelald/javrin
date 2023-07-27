const e=JSON.parse('{"key":"v-6e4141da","path":"/writings/RocketMQ/RocketMQ-theory-1.html","title":"RocketMQ \u539F\u7406\u5206\u6790-1","lang":"zh-CN","frontmatter":{"title":"RocketMQ \u539F\u7406\u5206\u6790-1","icon":"article","category":["\u5E72\u8D27","\u6D88\u606F\u961F\u5217"],"tag":["\u539F\u7406","RocketMQ"],"summary":"RocketMQ \u539F\u7406\u5206\u6790-1 \\"\u672C\u7BC7\u539F\u7406\u5206\u6790\u4E3B\u8981\u8BB2\u89E3\u6D88\u606F\u539F\u7406\u65B9\u9762\\" RocketMQ \u5982\u4F55\u4FDD\u8BC1\u6D88\u606F\u4E0D\u4E22\u5931/\u4FDD\u8BC1\u53EF\u9760\u6027 \u6D88\u606F\u5728 RocketMQ \u6D41\u8F6C\u5927\u6982\u53EF\u4EE5\u5206\u4E3A\u4E09\u4E2A\u9636\u6BB5\uFF1A\u53D1\u9001\u9636\u6BB5\u3001\u5B58\u50A8\u9636\u6BB5\u3001\u6D88\u8D39\u9636\u6BB5\uFF0C\u90A3\u4E48\u53EF\u9760\u6027\u5C31\u8981\u4ECE\u8FD9\u4E09\u4E2A\u9636\u6BB5\u8003\u8651\u3002 \u751F\u4EA7\u8005\u53D1\u9001\u6D88\u606F\u65F6\u4E3B\u8981\u4F9D\u9760\u53D1\u9001\u786E\u8BA4\u6765\u786E\u4FDD\u6D88\u606F\u53EF\u9760\u6027\u7684\u3002\u540C\u6B65\u5F02\u6B65\u53D1\u9001\u90FD\u53EF\u4EE5\u83B7\u53D6\u5230\u53D1\u9001\u72B6\u6001\uFF0C\u901A\u8FC7\u8FD9\u4E2A\u53D1\u9001\u72B6\u6001\u6765\u5224\u65AD\u672C\u6B21\u6D88\u606F\u662F\u5426\u6210\u529F","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/RocketMQ/RocketMQ-theory-1.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"RocketMQ \u539F\u7406\u5206\u6790-1"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-03-04T10:49:34.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"\u539F\u7406"}],["meta",{"property":"article:tag","content":"RocketMQ"}],["meta",{"property":"article:modified_time","content":"2023-03-04T10:49:34.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"RocketMQ \u5982\u4F55\u4FDD\u8BC1\u6D88\u606F\u4E0D\u4E22\u5931/\u4FDD\u8BC1\u53EF\u9760\u6027","slug":"rocketmq-\u5982\u4F55\u4FDD\u8BC1\u6D88\u606F\u4E0D\u4E22\u5931-\u4FDD\u8BC1\u53EF\u9760\u6027","children":[]},{"level":2,"title":"RocketMQ \u4E2D\u6D88\u606F\u91CD\u590D\u7684\u95EE\u9898","slug":"rocketmq-\u4E2D\u6D88\u606F\u91CD\u590D\u7684\u95EE\u9898","children":[]},{"level":2,"title":"RocketMQ \u6D88\u606F\u5806\u79EF\u95EE\u9898","slug":"rocketmq-\u6D88\u606F\u5806\u79EF\u95EE\u9898","children":[]},{"level":2,"title":"RocketMQ \u4E2D\u987A\u5E8F\u6D88\u606F\u7684\u95EE\u9898","slug":"rocketmq-\u4E2D\u987A\u5E8F\u6D88\u606F\u7684\u95EE\u9898","children":[]},{"level":2,"title":"RocketMQ \u5EF6\u65F6\u6D88\u606F\u539F\u7406","slug":"rocketmq-\u5EF6\u65F6\u6D88\u606F\u539F\u7406","children":[{"level":3,"title":"SCHEDULE_TOPIC_XXXX \u4ECB\u7ECD","slug":"schedule-topic-xxxx-\u4ECB\u7ECD","children":[]},{"level":3,"title":"ScheduleMessageService \u4ECB\u7ECD","slug":"schedulemessageservice-\u4ECB\u7ECD","children":[]},{"level":3,"title":"\u5EF6\u65F6\u6D88\u606F\u5728 Broker \u7684\u6D41\u8F6C\u8FC7\u7A0B","slug":"\u5EF6\u65F6\u6D88\u606F\u5728-broker-\u7684\u6D41\u8F6C\u8FC7\u7A0B","children":[]}]},{"level":2,"title":"RocketMQ \u4E8B\u52A1\u6D88\u606F\u539F\u7406","slug":"rocketmq-\u4E8B\u52A1\u6D88\u606F\u539F\u7406","children":[{"level":3,"title":"\u5B9E\u73B0\u4E8B\u52A1\u6D88\u606F\u6838\u5FC3","slug":"\u5B9E\u73B0\u4E8B\u52A1\u6D88\u606F\u6838\u5FC3","children":[]},{"level":3,"title":"\u4E8B\u52A1\u6D88\u606F\u7684\u6D41\u7A0B","slug":"\u4E8B\u52A1\u6D88\u606F\u7684\u6D41\u7A0B","children":[]},{"level":3,"title":"\u4E8B\u52A1\u6D88\u606F\u5E94\u7528\u573A\u666F","slug":"\u4E8B\u52A1\u6D88\u606F\u5E94\u7528\u573A\u666F","children":[]}]},{"level":2,"title":"\u6B7B\u4FE1\u961F\u5217\u539F\u7406","slug":"\u6B7B\u4FE1\u961F\u5217\u539F\u7406","children":[{"level":3,"title":"\u6B7B\u4FE1\u6D88\u606F\u7684\u4EA7\u751F","slug":"\u6B7B\u4FE1\u6D88\u606F\u7684\u4EA7\u751F","children":[]},{"level":3,"title":"\u6B7B\u4FE1\u961F\u5217\u7684\u7279\u70B9","slug":"\u6B7B\u4FE1\u961F\u5217\u7684\u7279\u70B9","children":[]}]}],"git":{"createdTime":1677926974000,"updatedTime":1677926974000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":10.38,"words":3115},"filePathRelative":"writings/RocketMQ/RocketMQ-theory-1.md","localizedDate":"2023\u5E743\u67084\u65E5"}');export{e as data};