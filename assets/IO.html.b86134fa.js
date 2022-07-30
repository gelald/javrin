const e=JSON.parse('{"key":"v-c19a37b2","path":"/writings/archive/IO.html","title":"\u7CFB\u7EDF\u8C03\u7528\u51FD\u6570","lang":"zh-CN","frontmatter":{"summary":"\u7CFB\u7EDF\u8C03\u7528\u51FD\u6570 recvfrom Linux\u7CFB\u7EDF\u63D0\u4F9B\u7ED9\u7528\u6237\u7528\u4E8E\u63A5\u6536\u7F51\u7EDCIO\u7684\u7CFB\u7EDF\u63A5\u53E3\u3002\u4ECE\u5957\u63A5\u5B57\u4E0A\u63A5\u6536\u4E00\u4E2A\u6D88\u606F \u5982\u679C\u6B64\u7CFB\u7EDF\u8C03\u7528\u8FD4\u56DE\u503C<0\uFF0C\u5E76\u4E14 errno\u4E3AEWOULDBLOCK\u6216EAGAIN\uFF08\u5957\u63A5\u5B57\u5DF2\u6807\u8BB0\u4E3A\u975E\u963B\u585E\uFF0C\u800C\u63A5\u6536\u64CD\u4F5C\u88AB\u963B\u585E\u6216\u8005\u63A5\u6536\u8D85\u65F6 \uFF09\u65F6\uFF0C\u8FDE\u63A5\u6B63\u5E38\uFF0C\u963B\u585E\u63A5\u6536\u6570\u636E\uFF08\u8FD9\u5F88\u5173\u952E\uFF0C\u524D4\u79CDIO\u6A21\u578B\u90FD\u8BBE\u8BA1\u6B64\u7CFB\u7EDF\u8C03\u7528\uFF09 select \u7CFB\u7EDF\u8C03\u7528\u5141\u8BB8\u7A0B\u5E8F\u540C\u65F6\u5728\u591A\u4E2A\u5E95\u5C42","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/archive/IO.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"\u7CFB\u7EDF\u8C03\u7528\u51FD\u6570"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-07-30T16:21:52.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:modified_time","content":"2022-07-30T16:21:52.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"recvfrom","slug":"recvfrom","children":[]},{"level":2,"title":"select","slug":"select","children":[{"level":3,"title":"select\u51FD\u6570\u7684\u7F3A\u9677","slug":"select\u51FD\u6570\u7684\u7F3A\u9677","children":[]}]},{"level":2,"title":"poll","slug":"poll","children":[]},{"level":2,"title":"epoll","slug":"epoll","children":[{"level":3,"title":"epoll\u89E3\u51B3select\u51FD\u6570\u7F3A\u9677\u7684\u65B9\u5F0F","slug":"epoll\u89E3\u51B3select\u51FD\u6570\u7F3A\u9677\u7684\u65B9\u5F0F","children":[]}]},{"level":2,"title":"sigaction","slug":"sigaction","children":[]},{"level":2,"title":"\u963B\u585EIO\u6A21\u578B","slug":"\u963B\u585Eio\u6A21\u578B","children":[]},{"level":2,"title":"\u975E\u963B\u585EIO\u6A21\u578B","slug":"\u975E\u963B\u585Eio\u6A21\u578B","children":[]},{"level":2,"title":"IO\u591A\u8DEF\u590D\u7528\u6A21\u578B","slug":"io\u591A\u8DEF\u590D\u7528\u6A21\u578B","children":[{"level":3,"title":"\u670D\u52A1\u7AEF\u4EE3\u7801","slug":"\u670D\u52A1\u7AEF\u4EE3\u7801","children":[]}]},{"level":2,"title":"\u4FE1\u53F7\u9A71\u52A8IO\u6A21\u578B","slug":"\u4FE1\u53F7\u9A71\u52A8io\u6A21\u578B","children":[]},{"level":2,"title":"\u5F02\u6B65IO\u6A21\u578B","slug":"\u5F02\u6B65io\u6A21\u578B","children":[]},{"level":2,"title":"\u603B\u7ED3","slug":"\u603B\u7ED3","children":[{"level":3,"title":"IO\u6A21\u578B\u7684\u53D1\u5C55\u7ECF\u5386","slug":"io\u6A21\u578B\u7684\u53D1\u5C55\u7ECF\u5386","children":[]}]},{"level":2,"title":"\u5B9E\u73B0\u8FC7\u7A0B","slug":"\u5B9E\u73B0\u8FC7\u7A0B","children":[]},{"level":2,"title":"\u5B9E\u73B0\u539F\u7406","slug":"\u5B9E\u73B0\u539F\u7406","children":[]},{"level":2,"title":"\u9002\u7528\u573A\u666F","slug":"\u9002\u7528\u573A\u666F","children":[]},{"level":2,"title":"\u5B9E\u73B0\u539F\u7406","slug":"\u5B9E\u73B0\u539F\u7406-1","children":[]},{"level":2,"title":"\u9002\u7528\u573A\u666F","slug":"\u9002\u7528\u573A\u666F-1","children":[]},{"level":2,"title":"\u91CD\u8981\u89D2\u8272","slug":"\u91CD\u8981\u89D2\u8272","children":[{"level":3,"title":"\u7F13\u51B2\u533ABuffer","slug":"\u7F13\u51B2\u533Abuffer","children":[]},{"level":3,"title":"\u901A\u9053Channel","slug":"\u901A\u9053channel","children":[]},{"level":3,"title":"\u591A\u8DEF\u590D\u7528\u5668Selector","slug":"\u591A\u8DEF\u590D\u7528\u5668selector","children":[]}]},{"level":2,"title":"\u5B9E\u73B0\u539F\u7406","slug":"\u5B9E\u73B0\u539F\u7406-2","children":[]},{"level":2,"title":"\u9002\u7528\u573A\u666F","slug":"\u9002\u7528\u573A\u666F-2","children":[]}],"git":{"createdTime":1659198112000,"updatedTime":1659198112000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":12.64,"words":3793},"filePathRelative":"writings/archive/IO.md","localizedDate":"2022\u5E747\u670830\u65E5"}');export{e as data};
