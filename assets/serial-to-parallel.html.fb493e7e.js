const e=JSON.parse('{"key":"v-6d174bc4","path":"/writings/concurrency/serial-to-parallel.html","title":"\u7531\u4E32\u884C\u5230\u5E76\u884C\u7684\u6545\u4E8B","lang":"zh-CN","frontmatter":{"title":"\u7531\u4E32\u884C\u5230\u5E76\u884C\u7684\u6545\u4E8B","icon":"article","isOriginal":true,"category":["\u5E76\u53D1","\u6587\u7AE0"],"tag":["\u5F02\u6B65","\u7EBF\u7A0B\u6C60","\u95EE\u9898\u89E3\u51B3","\u4F18\u5316"],"summary":"\u7531\u4E32\u884C\u5230\u5E76\u884C\u7684\u6545\u4E8B \u9700\u6C42\u5F15\u5165 \u73B0\u5728\u9700\u8981\u8BBE\u8BA1\u4E00\u4E2A\u590D\u5408\u4E86\u591A\u4E2A\u67E5\u8BE2\u7684\u63A5\u53E3 1. \u67E5\u8BE2\u8BA2\u5355\u4FE1\u606F 2. \u67E5\u8BE2\u53F8\u673A\u4FE1\u606F 3. \u67E5\u8BE2\u8F66\u8F86\u4FE1\u606F \u8FD9\u4E09\u4E2A\u4FE1\u606F\u9700\u8981\u5728\u4E00\u4E2A\u67E5\u8BE2\u63A5\u53E3\u4E2D\u540C\u65F6\u8FD4\u56DE \u4E32\u884C\u5B9E\u73B0 \u5728\u8BBE\u8BA1\u4E00\u4E2A\u590D\u5408\u4E86\u591A\u4E2A\u67E5\u8BE2\u4FE1\u606F\u7684\u63A5\u53E3\u65F6\uFF0C\u4E00\u822C\u60C5\u51B5\u4E0B\u5F88\u5BB9\u6613\u60F3\u5230\u4E32\u884C\u7684\u5B9E\u73B0\u65B9\u5F0F \u5047\u8BBE\u67E5\u8BE2\u8BA2\u5355\u4FE1\u606F\u3001\u53F8\u673A\u4FE1\u606F\u3001\u8F66\u8F86\u4FE1\u606F\u5206\u522B\u9700\u8981 200ms\u3001100ms\u3001200ms\uFF0C\u90A3\u4E48\u4E32\u884C\u5B9E\u73B0\u65B9\u5F0F\u603B\u4F53\u9700\u8981\u6D88","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/concurrency/serial-to-parallel.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"\u7531\u4E32\u884C\u5230\u5E76\u884C\u7684\u6545\u4E8B"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-02-28T15:46:06.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"\u5F02\u6B65"}],["meta",{"property":"article:tag","content":"\u7EBF\u7A0B\u6C60"}],["meta",{"property":"article:tag","content":"\u95EE\u9898\u89E3\u51B3"}],["meta",{"property":"article:tag","content":"\u4F18\u5316"}],["meta",{"property":"article:modified_time","content":"2023-02-28T15:46:06.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"\u9700\u6C42\u5F15\u5165","slug":"\u9700\u6C42\u5F15\u5165","children":[]},{"level":2,"title":"\u4E32\u884C\u5B9E\u73B0","slug":"\u4E32\u884C\u5B9E\u73B0","children":[]},{"level":2,"title":"Runnable/Callable + Future \u5B9E\u73B0\u5E76\u884C\u8C03\u7528","slug":"runnable-callable-future-\u5B9E\u73B0\u5E76\u884C\u8C03\u7528","children":[{"level":3,"title":"\u5F00\u542F\u5B50\u7EBF\u7A0B\u7684\u65B9\u5F0F\u6709\u4E09\u79CD","slug":"\u5F00\u542F\u5B50\u7EBF\u7A0B\u7684\u65B9\u5F0F\u6709\u4E09\u79CD","children":[]},{"level":3,"title":"Future \u548C FutureTask","slug":"future-\u548C-futuretask","children":[]},{"level":3,"title":"\u5B9E\u73B0","slug":"\u5B9E\u73B0","children":[]}]},{"level":2,"title":"ExecutorService \u5B9E\u73B0\u5E76\u884C\u8C03\u7528","slug":"executorservice-\u5B9E\u73B0\u5E76\u884C\u8C03\u7528","children":[{"level":3,"title":"Executor","slug":"executor","children":[]},{"level":3,"title":"ExecutorService","slug":"executorservice","children":[]},{"level":3,"title":"ThreadPoolExecutor","slug":"threadpoolexecutor","children":[]},{"level":3,"title":"ThreadPoolTaskExecutor","slug":"threadpooltaskexecutor","children":[]},{"level":3,"title":"Executors","slug":"executors","children":[]},{"level":3,"title":"\u5B9E\u73B0","slug":"\u5B9E\u73B0-1","children":[]}]},{"level":2,"title":"ThreadPoolTaskExecutor \u5B9E\u73B0\u5E76\u884C\u8C03\u7528","slug":"threadpooltaskexecutor-\u5B9E\u73B0\u5E76\u884C\u8C03\u7528","children":[]},{"level":2,"title":"CompletionService \u5B9E\u73B0\u5E76\u884C\u8C03\u7528","slug":"completionservice-\u5B9E\u73B0\u5E76\u884C\u8C03\u7528","children":[{"level":3,"title":"CompletionService","slug":"completionservice","children":[]},{"level":3,"title":"ExecutorCompletionService","slug":"executorcompletionservice","children":[]},{"level":3,"title":"\u5B9E\u73B0","slug":"\u5B9E\u73B0-2","children":[]},{"level":3,"title":"\u5E94\u7528\u573A\u666F","slug":"\u5E94\u7528\u573A\u666F","children":[]}]},{"level":2,"title":"CompletableFuture \u5B9E\u73B0\u5E76\u884C\u8C03\u7528","slug":"completablefuture-\u5B9E\u73B0\u5E76\u884C\u8C03\u7528","children":[{"level":3,"title":"CompletableFuture","slug":"completablefuture","children":[]},{"level":3,"title":"CompletionStage","slug":"completionstage","children":[]},{"level":3,"title":"CompletableFuture \u65B9\u6CD5\u7B80\u4ECB","slug":"completablefuture-\u65B9\u6CD5\u7B80\u4ECB","children":[]},{"level":3,"title":"\u5B9E\u73B0","slug":"\u5B9E\u73B0-3","children":[]},{"level":3,"title":"\u5E94\u7528\u573A\u666F","slug":"\u5E94\u7528\u573A\u666F-1","children":[]}]},{"level":2,"title":"\u603B\u7ED3","slug":"\u603B\u7ED3","children":[]}],"git":{"createdTime":1659199509000,"updatedTime":1677599166000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":2},{"name":"wuyingbin","email":"yb.ng@foxmail.com","commits":2}]},"readingTime":{"minutes":12.74,"words":3822},"filePathRelative":"writings/concurrency/serial-to-parallel.md","localizedDate":"2022\u5E747\u670830\u65E5"}');export{e as data};
