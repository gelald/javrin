const e=JSON.parse('{"key":"v-6490c59e","path":"/writings/container/modify-docker-default-storage.html","title":"修改Docker默认存储路径","lang":"zh-CN","frontmatter":{"title":"修改Docker默认存储路径","icon":"article","category":["问题解决","容器技术"],"tag":["Docker","Linux"],"description":"修改 Docker 默认存储路径 问题引入 今天在服务器(操作系统: CentOS)上创建新容器的时候看到容器创建失败，并提示磁盘空间不足。 输入查询磁盘空间命令后发现，/ 目录只分配了50G空间，而 /home 目录却分配了198G空间。 而 Docker 默认的存储路径是 /var/lib/docker ，是在 / 目录下的，在不修改操作系统磁盘挂载的前提下，想要 Docker 能正常使用、创建容器，我们需要把 Docker 默认存储路径修改到 /home 目录下。","head":[["meta",{"property":"og:url","content":"https://gelald.github.io/javrin/javrin/writings/container/modify-docker-default-storage.html"}],["meta",{"property":"og:site_name","content":"Javrin"}],["meta",{"property":"og:title","content":"修改Docker默认存储路径"}],["meta",{"property":"og:description","content":"修改 Docker 默认存储路径 问题引入 今天在服务器(操作系统: CentOS)上创建新容器的时候看到容器创建失败，并提示磁盘空间不足。 输入查询磁盘空间命令后发现，/ 目录只分配了50G空间，而 /home 目录却分配了198G空间。 而 Docker 默认的存储路径是 /var/lib/docker ，是在 / 目录下的，在不修改操作系统磁盘挂载的前提下，想要 Docker 能正常使用、创建容器，我们需要把 Docker 默认存储路径修改到 /home 目录下。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-15T13:45:44.000Z"}],["meta",{"property":"article:author","content":"gelald"}],["meta",{"property":"article:tag","content":"Docker"}],["meta",{"property":"article:tag","content":"Linux"}],["meta",{"property":"article:modified_time","content":"2023-03-15T13:45:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"修改Docker默认存储路径\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-03-15T13:45:44.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gelald\\",\\"url\\":\\"https://github.com/gelald\\"}]}"]]},"headers":[{"level":2,"title":"问题引入","slug":"问题引入","link":"#问题引入","children":[]},{"level":2,"title":"修改方法一","slug":"修改方法一","link":"#修改方法一","children":[]},{"level":2,"title":"修改方法二","slug":"修改方法二","link":"#修改方法二","children":[]}],"git":{"createdTime":1659199509000,"updatedTime":1678887944000,"contributors":[{"name":"gelald","email":"yb.ng@foxmail.com","commits":2}]},"readingTime":{"minutes":2.29,"words":687},"filePathRelative":"writings/container/modify-docker-default-storage.md","localizedDate":"2022年7月30日","excerpt":"<h1> 修改 Docker 默认存储路径</h1>\\n<h2> 问题引入</h2>\\n<p>今天在服务器(操作系统: CentOS)上创建新容器的时候看到容器创建失败，并提示磁盘空间不足。</p>\\n<p>输入查询磁盘空间命令后发现，<code>/</code> 目录只分配了50G空间，而 <code>/home</code> 目录却分配了198G空间。</p>\\n<p>而 Docker 默认的存储路径是 <code>/var/lib/docker</code> ，是在 <code>/</code> 目录下的，在不修改操作系统磁盘挂载的前提下，想要 Docker\\n能正常使用、创建容器，我们需要把 Docker 默认存储路径修改到 <code>/home</code> 目录下。</p>","autoDesc":true}');export{e as data};
