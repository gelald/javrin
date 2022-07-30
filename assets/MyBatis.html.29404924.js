const e=JSON.parse('{"key":"v-32c492f2","path":"/writings/archive/MyBatis.html","title":"MyBatis\u7B80\u4ECB","lang":"zh-CN","frontmatter":{"summary":"MyBatis\u7B80\u4ECB \u539F\u59CBjdbc\u64CD\u4F5C 1. \u6CE8\u518C\u9A71\u52A8Class.forName(\\"com.mysql.cj.jdbc.Driver\\"); 2. \u83B7\u53D6\u8FDE\u63A5DriverManager.getConnection(url, user, password); 3. \u4ECE\u8FDE\u63A5\u4E2D\u83B7\u53D6Statement 4. \u6267\u884C\u67E5\u8BE2statement.excuteQuery() 5. \u904D","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/archive/MyBatis.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"MyBatis\u7B80\u4ECB"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-07-30T16:21:52.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:modified_time","content":"2022-07-30T16:21:52.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"\u539F\u59CBjdbc\u64CD\u4F5C","slug":"\u539F\u59CBjdbc\u64CD\u4F5C","children":[]},{"level":2,"title":"\u67E5\u8BE2\u64CD\u4F5C","slug":"\u67E5\u8BE2\u64CD\u4F5C","children":[]},{"level":2,"title":"\u63D2\u5165\u64CD\u4F5C","slug":"\u63D2\u5165\u64CD\u4F5C","children":[]},{"level":2,"title":"\u66F4\u65B0\u64CD\u4F5C","slug":"\u66F4\u65B0\u64CD\u4F5C","children":[]},{"level":2,"title":"\u5220\u9664\u64CD\u4F5C","slug":"\u5220\u9664\u64CD\u4F5C","children":[]},{"level":2,"title":"\u57FA\u672Csql\u8BED\u53E5","slug":"\u57FA\u672Csql\u8BED\u53E5","children":[{"level":3,"title":"select\u6807\u7B7E","slug":"select\u6807\u7B7E","children":[]},{"level":3,"title":"insert\u6807\u7B7E","slug":"insert\u6807\u7B7E","children":[]},{"level":3,"title":"update\u6807\u7B7E","slug":"update\u6807\u7B7E","children":[]},{"level":3,"title":"delete\u6807\u7B7E","slug":"delete\u6807\u7B7E","children":[]},{"level":3,"title":"resultType\u5C5E\u6027","slug":"resulttype\u5C5E\u6027","children":[]},{"level":3,"title":"parameterType\u5C5E\u6027","slug":"parametertype\u5C5E\u6027","children":[]}]},{"level":2,"title":"\u52A8\u6001sql\u8BED\u53E5","slug":"\u52A8\u6001sql\u8BED\u53E5","children":[{"level":3,"title":"where\u6807\u7B7E","slug":"where\u6807\u7B7E","children":[]},{"level":3,"title":"if\u6807\u7B7E","slug":"if\u6807\u7B7E","children":[]},{"level":3,"title":"foreach\u6807\u7B7E","slug":"foreach\u6807\u7B7E","children":[]},{"level":3,"title":"sql/include\u6807\u7B7E","slug":"sql-include\u6807\u7B7E","children":[]}]},{"level":2,"title":"\u5C42\u7EA7\u5173\u7CFB","slug":"\u5C42\u7EA7\u5173\u7CFB","children":[]},{"level":2,"title":"environments\u6807\u7B7E","slug":"environments\u6807\u7B7E","children":[]},{"level":2,"title":"mappers\u6807\u7B7E","slug":"mappers\u6807\u7B7E","children":[{"level":3,"title":"mapper\u6807\u7B7E","slug":"mapper\u6807\u7B7E","children":[]}]},{"level":2,"title":"properties\u6807\u7B7E","slug":"properties\u6807\u7B7E","children":[]},{"level":2,"title":"typeAliases\u6807\u7B7E","slug":"typealiases\u6807\u7B7E","children":[{"level":3,"title":"typeAlias\u6807\u7B7E","slug":"typealias\u6807\u7B7E","children":[]}]},{"level":2,"title":"typeHandlers\u6807\u7B7E","slug":"typehandlers\u6807\u7B7E","children":[{"level":3,"title":"typeHandler\u6807\u7B7E","slug":"typehandler\u6807\u7B7E","children":[]}]},{"level":2,"title":"plugins\u6807\u7B7E","slug":"plugins\u6807\u7B7E","children":[]},{"level":2,"title":"SqlSessionFactoryBuilder","slug":"sqlsessionfactorybuilder","children":[]},{"level":2,"title":"SqlSessionFactory","slug":"sqlsessionfactory","children":[]},{"level":2,"title":"SqlSession","slug":"sqlsession","children":[]},{"level":2,"title":"\u4F20\u7EDF\u5B9E\u73B0\u65B9\u5F0F","slug":"\u4F20\u7EDF\u5B9E\u73B0\u65B9\u5F0F","children":[]},{"level":2,"title":"\u4EE3\u7406\u5B9E\u73B0\u65B9\u5F0F","slug":"\u4EE3\u7406\u5B9E\u73B0\u65B9\u5F0F","children":[]},{"level":2,"title":"\u4E00\u5BF9\u4E00\u67E5\u8BE2\u914D\u7F6E","slug":"\u4E00\u5BF9\u4E00\u67E5\u8BE2\u914D\u7F6E","children":[]},{"level":2,"title":"\u591A\u5BF9\u4E00\u67E5\u8BE2\u914D\u7F6E","slug":"\u591A\u5BF9\u4E00\u67E5\u8BE2\u914D\u7F6E","children":[]},{"level":2,"title":"\u591A\u5BF9\u591A\u67E5\u8BE2\u914D\u7F6E","slug":"\u591A\u5BF9\u591A\u67E5\u8BE2\u914D\u7F6E","children":[]},{"level":2,"title":"\u4E00\u5BF9\u4E00\u5173\u7CFB\u67E5\u8BE2","slug":"\u4E00\u5BF9\u4E00\u5173\u7CFB\u67E5\u8BE2","children":[]},{"level":2,"title":"\u4E00\u5BF9\u591A\u5173\u7CFB\u67E5\u8BE2","slug":"\u4E00\u5BF9\u591A\u5173\u7CFB\u67E5\u8BE2","children":[]},{"level":2,"title":"\u591A\u5BF9\u591A\u5173\u7CFB\u67E5\u8BE2","slug":"\u591A\u5BF9\u591A\u5173\u7CFB\u67E5\u8BE2","children":[]}],"git":{"createdTime":1659198112000,"updatedTime":1659198112000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":1}]},"readingTime":{"minutes":12.13,"words":3640},"filePathRelative":"writings/archive/MyBatis.md","localizedDate":"2022\u5E747\u670830\u65E5"}');export{e as data};
