import{_ as i}from"./plugin-vue_export-helper.21dcd24c.js";import{o as e,c as t,d as l}from"./app.d53644a8.js";const o={},d=l('<h1 id="git" tabindex="-1"><a class="header-anchor" href="#git" aria-hidden="true">#</a> Git</h1><h2 id="\u6982\u5FF5" tabindex="-1"><a class="header-anchor" href="#\u6982\u5FF5" aria-hidden="true">#</a> \u6982\u5FF5</h2><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/image-20201124094223951.png" alt="image-20201124094223951"></p><ul><li><p>\u5DE5\u4F5C\u533A \uFF1A\u5C31\u662F\u4F60\u5728\u7535\u8111\u4E0A\u770B\u5230\u7684\u76EE\u5F55</p></li><li><p>\u6682\u5B58\u533A \uFF1A\u80FD\u591F\u63D0\u4EA4\u5230\u7248\u672C\u5E93\u7684\u6587\u4EF6\u3001\u76EE\u5F55\u5185\u5BB9\uFF0C\u6240\u6709\u8981\u63D0\u4EA4\u5230\u7248\u672C\u5E93\u7684\u5185\u5BB9\u90FD\u5FC5\u987B\u5148\u4ECE\u5DE5\u4F5C\u533A\u6DFB\u52A0\u5230\u6682\u5B58\u533A</p></li><li><p>\u7248\u672C\u5E93 \uFF1A\u5C31\u662F <code>.git</code> \u76EE\u5F55\u3002\u5DE5\u4F5C\u533A\u6709\u4E00\u4E2A\u9690\u85CF\u76EE\u5F55 <code>.git</code>\uFF0C\u8FD9\u4E0D\u5C5E\u4E8E\u5DE5\u4F5C\u533A\uFF0C\u8FD9\u662F\u7248\u672C\u5E93\u3002\u5176\u4E2D\u7248\u672C\u5E93\u91CC\u9762\u5B58\u653E\u4E86\u5F88\u591A\u4E1C\u897F\uFF0C\u5176\u4E2D\u6700\u91CD\u8981\u7684\u5C31\u662F <code>stage(\u6682\u5B58\u533A)</code>\uFF0C\u8FD8\u6709 Git \u4E3A\u6211\u4EEC\u81EA\u52A8\u521B\u5EFA\u4E86\u7B2C\u4E00\u4E2A\u5206\u652F master \uFF0C\u4EE5\u53CA\u6307\u5411 master \u7684\u4E00\u4E2A\u6307\u9488 HEAD(\u73B0\u5728\u53EF\u4EE5\u4FEE\u6539\u9ED8\u8BA4\u7B2C\u4E00\u4E2A\u5206\u652F\u540D\u5B57\u53EB main \u5206\u652F)</p></li></ul><h2 id="git-\u5DE5\u4F5C\u76EE\u5F55\u7684\u72B6\u6001" tabindex="-1"><a class="header-anchor" href="#git-\u5DE5\u4F5C\u76EE\u5F55\u7684\u72B6\u6001" aria-hidden="true">#</a> Git \u5DE5\u4F5C\u76EE\u5F55\u7684\u72B6\u6001</h2><ul><li><p>untracked\uFF1A\u672A\u8DDF\u8E2A\uFF08\u672A\u88AB\u7EB3\u5165\u7248\u672C\u63A7\u5236\uFF09</p></li><li><p>tracked\uFF1A\u5DF2\u8DDF\u8E2A\uFF08\u88AB\u7EB3\u5165\u7248\u672C\u63A7\u5236\uFF09</p><ul><li><p>Unmodified\uFF1A\u672A\u4FEE\u6539\u72B6\u6001</p></li><li><p>Modified\uFF1A\u5DF2\u4FEE\u6539\u72B6\u6001</p></li><li><p>Staged\uFF1A\u5DF2\u6682\u5B58\u72B6\u6001</p></li></ul></li></ul><h3 id="\u4FEE\u6539\u72B6\u6001" tabindex="-1"><a class="header-anchor" href="#\u4FEE\u6539\u72B6\u6001" aria-hidden="true">#</a> \u4FEE\u6539\u72B6\u6001</h3><ul><li><p>\u4F7F\u7528 <code>git add &lt;file&gt;</code> \u5C06\u672A\u8DDF\u8E2A\u72B6\u6001\u7684\u6587\u4EF6\u53D8\u6210\u5DF2\u6682\u5B58\u72B6\u6001(\u52A0\u5165\u6682\u5B58\u533A)</p></li><li><p>\u4F7F\u7528 <code>git reset HEAD &lt;file&gt;</code> \u5C06\u5DF2\u6682\u5B58\u72B6\u6001\u7684\u6587\u4EF6(\u6682\u5B58\u533A\u7684\u6587\u4EF6)\uFF0C\u56DE\u5230\u539F\u59CB\u72B6\u6001(\u53D6\u6D88\u6682\u5B58)</p></li></ul><h2 id="\u672C\u5730\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u672C\u5730\u64CD\u4F5C" aria-hidden="true">#</a> \u672C\u5730\u64CD\u4F5C</h2><ul><li><p>\u5220\u9664\u6587\u4EF6\uFF1A<code>git rm &lt;file&gt;</code>\uFF0C<strong>\u76F8\u5F53\u4E8E\u5220\u9664\u6587\u4EF6+\u628A\u4FEE\u6539\u6DFB\u52A0\u5230\u6682\u5B58\u533A</strong></p></li><li><p>HEAD\uFF1A\u8FD9\u662F\u5F53\u524D\u5206\u652F\u7248\u672C\u9876\u7AEF\u7684\u522B\u540D\uFF0C\u4E5F\u5C31\u662F\u5728\u5F53\u524D\u5206\u652F\u4F60\u6700\u8FD1\u7684\u4E00\u4E2A\u63D0\u4EA4</p></li><li><p>\u5EFA\u7ACB\u672C\u5730\u4ED3\u5E93</p><ul><li><code>git init</code> \u4F1A\u5728\u5F53\u524D\u76EE\u5F55\u65B0\u5EFA\u4E00\u4E2A<code>.git</code>\u7684\u9690\u85CF\u6587\u4EF6\u5939</li></ul></li><li><p>\u67E5\u770B\u662F\u5426\u6709\u4FEE\u6539</p><ul><li><code>git status</code></li></ul></li><li><p>\u67E5\u770B\u4FEE\u6539\u5185\u5BB9</p><ul><li><code>git diff \u6587\u4EF6\u540D</code></li></ul></li><li><p>\u628A\u6587\u4EF6\u6DFB\u52A0\u5230\u6682\u5B58\u533A</p><ul><li><code>git add \u6587\u4EF6\u540D</code></li></ul></li><li><p>\u628A\u6682\u5B58\u533A\u4E2D\u4FEE\u6539\u7684\u6587\u4EF6\u63D0\u4EA4\u5230\u7248\u672C\u5E93\u4E2D</p><ul><li><code>git commit -m \u672C\u6B21\u63D0\u4EA4\u7684\u4FE1\u606F</code></li></ul></li><li><p>\u67E5\u770B\u63D0\u4EA4\u7684\u5386\u53F2\u8BB0\u5F55</p><ul><li><code>git log</code></li></ul></li><li><p>\u64A4\u9500\u4FEE\u6539</p><ul><li><code>git checkout -- file</code><ul><li>\u8FD8\u6CA1\u653E\u5230\u6682\u5B58\u533A\uFF0C\u56DE\u5230\u548C\u7248\u672C\u5E93\u4E00\u6478\u4E00\u6837\u7684\u72B6\u6001</li><li>\u5DF2\u7ECF\u653E\u5165\u6682\u5B58\u533A\u518D\u8FDB\u884C\u4FEE\u6539\uFF0C\u56DE\u5230\u6682\u5B58\u533A\u7684\u72B6\u6001</li></ul></li></ul></li><li><p>\u56DE\u9000\u7248\u672C</p><ul><li><code>git reset -hard HEAD^</code> \u56DE\u9000\u4E0A\u4E00\u4E2A\u7248\u672C</li><li><code>git reset -hard HEAD^^</code> \u56DE\u9000\u5230\u4E0A\u4E0A\u4E2A\u7248\u672C \u56DE\u9000\u7684\u7248\u672C\u6570\u7531<code>^</code>\u7684\u6570\u76EE\u51B3\u5B9A</li><li><code>git reset -hard HEAD~100</code> \u56DE\u9000\u524D100\u4E2A\u7248\u672C</li><li><code>git reset -hard \u7248\u672C\u53F7</code> \u56DE\u9000\u5230\u7279\u5B9A\u7248\u672C</li><li><code>git relog</code> \u67E5\u770B\u6BCF\u4E00\u4E2A\u7248\u672C\u7684\u7248\u672C\u53F7</li></ul></li><li><p>\u5173\u4E8E\u64A4\u9500\u7684\u64CD\u4F5C</p><ul><li>\u64A4\u9500<strong>\u4E0A\u4E00\u4E2A</strong>\u63D0\u4EA4\u5230\u7248\u672C\u5E93\u7684\u7248\u672C\uFF1A<code>git reset --head HEAD^</code></li><li>\u64A4\u9500\u5F53\u524D<strong>\u8FD8\u6CA1\u63D0\u4EA4</strong>\u7684\u6587\u4EF6\uFF1A<code>git checkout --file</code></li><li>\u64A4\u9500<strong>\u5DF2\u63D0\u4EA4</strong>\u7684\u6587\u4EF6\uFF1A<code>git reset HEAD file</code></li></ul></li><li><p>\u521B\u5EFA\u5206\u652F</p><ul><li><code>git branch \u5206\u652F\u540D</code></li><li><code>git branch</code> \u67E5\u770B\u5F53\u524D\u5206\u652F</li><li><code>git branch \u2013d name</code> \u5220\u9664\u5206\u652F</li></ul></li><li><p>\u5207\u6362\u5206\u652F</p><ul><li><code>git checkout \u5206\u652F\u540D</code></li></ul></li><li><p>\u5408\u5E76\u5206\u652F</p><ul><li><code>git merge \u5206\u652F\u540D</code> \u5408\u5E76\u5206\u652F<strong>\u5230\u5F53\u524D\u5206\u652F</strong>\u4E0A</li></ul></li><li><p>\u5F00\u53D1\u65F6\u4E00\u822C\u6D41\u7A0B</p><ul><li>\u521B\u5EFAdev\u5206\u652F\uFF1A<code>git branch dev</code></li><li>\u5207\u6362dev\u5206\u652F\uFF1A<code>git checkout dev</code></li><li>\u628A\u6539\u52A8\u4ECE\u5DE5\u4F5C\u533A\u653E\u5165\u6682\u5B58\u533A\uFF1A<code>git add .</code></li><li>\u628A\u6682\u5B58\u533A\u7684\u6539\u52A8\u63D0\u4EA4\u5230\u7248\u672C\u5E93\uFF1A<code>git commit -m &quot;commit message&quot;</code></li><li>\u5207\u6362master\u5206\u652F\uFF1A<code>git checkout master</code> \u6B64\u65F6master\u7684\u5206\u652F\u662F\u6CA1\u6539\u52A8\u8FC7\u7684</li><li>\u628Adev\u7684\u6539\u52A8\u5408\u5E76\u5230master\u5206\u652F\uFF1A<code>git merge dev</code></li><li>\u63A5\u4E0B\u6765\u8981\u4E48\u5220\u9664dev\u5206\u652F\uFF1A<code>git branch -d dev</code></li><li>\u8981\u4E48\u5207\u6362\u5230dev\u5206\u652F\u7EE7\u7EED\u5F00\u53D1\uFF1A<code>git checkout dev</code></li></ul></li></ul><h3 id="git-reset" tabindex="-1"><a class="header-anchor" href="#git-reset" aria-hidden="true">#</a> git reset</h3><ul><li><code>git reset --soft commit_id</code>\uFF1Acommit_id\u4E4B\u540E\u7684<strong>commit\u4FEE\u6539\u5168\u90E8\u5728\u6682\u5B58\u533A\u4E2D</strong>\uFF0C<strong>\u672C\u5730\u5F53\u524D\u7684\u4FEE\u6539\u4FDD\u7559\u5728\u5DE5\u4F5C\u533A</strong></li><li><code>git reset --mixed commit_id</code>(\u9ED8\u8BA4)\uFF1Acommit_id\u4E4B\u540E\u7684<strong>commit\u548C\u672C\u5730\u4FEE\u6539\u5168\u90FD\u653E\u5728\u5DE5\u4F5C\u533A\u4E2D</strong></li><li><code>git reset --hard commit_id</code>\uFF1Acommit_id\u4E4B\u540E\u7684<strong>commit\u548C\u672C\u5730\u4FEE\u6539\u5168\u90E8\u79FB\u9664</strong>\uFF0C\u5C06\u9879\u76EE\u7684\u72B6\u6001\u6062\u590D\u5230commit_id\u7684\u72B6\u6001\u3002\u5BF9\u4E8E\u672A\u8FFD\u8E2A\u7684\u6587\u4EF6\u6CA1\u6709\u5F71\u54CD(\u7531\u59CB\u81F3\u7EC8\u6CA1\u6709add\u8FC7\u7684\u6587\u4EF6)</li></ul><h3 id="git-revert" tabindex="-1"><a class="header-anchor" href="#git-revert" aria-hidden="true">#</a> git revert</h3><ul><li><code>git revert -e &lt;commit_id&gt;</code>\uFF1A\u91CD\u505A\u6307\u5B9Acommit\u7684<strong>\u63D0\u4EA4\u4FE1\u606F</strong>\uFF0C\u751F\u6210\u4E00\u4E2A\u65B0\u7684commit_id</li><li><code>git revert -n &lt;commit_id&gt;</code>\uFF1A\u91CD\u505A\u6267\u884Ccommit\u7684<strong>\u4EE3\u7801\u4FEE\u6539</strong>\uFF0C\u5C06commit_id\u4E2D\u7684\u4FEE\u6539\uFF0C\u4ECE\u672C\u5730\u4ED3\u5E93\u653E\u56DE\u5230index\u533A\uFF0C\u6211\u4EEC\u53EF\u4EE5\u91CD\u65B0\u505A\u4FEE\u6539\u5E76\u91CD\u65B0\u63D0\u4EA4</li></ul><h3 id="reset\u548Crevert\u5BF9\u6BD4" tabindex="-1"><a class="header-anchor" href="#reset\u548Crevert\u5BF9\u6BD4" aria-hidden="true">#</a> reset\u548Crevert\u5BF9\u6BD4</h3><ul><li><code>git revert</code>\u662F\u7528\u4E00\u6B21\u65B0\u7684commit\u6765\u56DE\u6EDA\u4E4B\u524D\u7684commit\uFF0C\u6B64\u6B21\u63D0\u4EA4\u4E4B\u524D\u7684<strong>commit\u90FD\u4F1A\u88AB\u4FDD\u7559\u4E0D\u52A8</strong></li><li><code>git reset</code>\u662F\u56DE\u5230\u67D0\u6B21\u63D0\u4EA4\uFF0C\u63D0\u4EA4\u53CA\u4E4B\u524D\u7684commit\u90FD\u4F1A\u88AB\u4FDD\u7559\uFF0C\u4F46\u662F\u6B64commit_id\u4E4B\u540E\u7684<strong>\u4FEE\u6539\u90FD\u4F1A\u88AB\u5220\u9664\u6216\u653E\u56DE\u5DE5\u4F5C\u533A\u7B49\u5F85\u4E0B\u4E00\u6B21\u63D0\u4EA4</strong></li></ul><h2 id="\u8FDC\u7A0B\u4ED3\u5E93" tabindex="-1"><a class="header-anchor" href="#\u8FDC\u7A0B\u4ED3\u5E93" aria-hidden="true">#</a> \u8FDC\u7A0B\u4ED3\u5E93</h2><ul><li><p>\u67E5\u770B\u8FDC\u7A0B\u4ED3\u5E93\uFF1A<code>git remote -v</code></p></li><li><p>\u5173\u8054\u5DF2\u77E5\u672C\u5730\u5E93\u548C\u8FDC\u7A0B\u5E93</p><ul><li><code> git remote add origin \u8FDC\u7A0B\u5E93\u5730\u5740</code></li></ul></li><li><p>\u628A\u5F53\u524D\u5206\u652F\u63A8\u9001\u5230\u8FDC\u7A0B\u4ED3\u5E93</p><ul><li><code>git push</code></li><li><code>git push -u </code> \u4E0D\u4F46\u4F1A\u628A\u672C\u5730\u7684master\u5206\u652F\u5185\u5BB9\u63A8\u9001\u7684\u8FDC\u7A0B\u65B0\u7684master\u5206\u652F\uFF0C\u8FD8\u4F1A\u628A\u672C\u5730\u7684master\u5206\u652F\u548C\u8FDC\u7A0B\u7684master\u5206\u652F\u5173\u8054\u8D77\u6765\uFF0C\u5728\u4EE5\u540E\u7684\u63A8\u9001\u6216\u8005\u62C9\u53D6\u65F6\u5C31\u53EF\u4EE5\u7B80\u5316\u547D\u4EE4</li></ul></li><li><p>\u4ECE\u8FDC\u7A0B\u4ED3\u5E93\u62C9\u53D6\u3001\u6293\u53D6</p><ul><li><code>git fetch</code>\uFF1A\u6293\u53D6\uFF0C\u4ECE\u8FDC\u7A0B\u4ED3\u5E93\u83B7\u53D6\u6700\u65B0\u7248\u672C\u5230\u672C\u5730\uFF0C\u4E0D\u4F1A\u81EA\u52A8merge</li><li><code>git pull</code>\uFF1A\u62C9\u53D6\uFF0C\u4ECE\u8FDC\u7A0B\u4ED3\u5E93\u83B7\u53D6\u6700\u65B0\u7248\u672C\u5E76merge\u5230\u672C\u5730</li></ul></li><li><p>\u4ECE\u8FDC\u7A0B\u4ED3\u5E93\u514B\u9686</p><ul><li><code>git clone &lt;url&gt;</code></li></ul></li><li><p>\u5220\u9664\u672C\u5730\u8FDC\u7A0B\u4ED3\u5E93\u7684\u8BB0\u5F55(\u4E0D\u4F1A\u771F\u6B63\u5220\u9664\u8FDC\u7A0B\u4ED3\u5E93)</p><ul><li><code>git remote rm origin</code></li></ul></li></ul><h2 id="\u628A\u9519\u8BEF\u7684\u4EE3\u7801\u63D0\u4EA4\u5230\u4EE3\u7801\u5E93\u4E2D" tabindex="-1"><a class="header-anchor" href="#\u628A\u9519\u8BEF\u7684\u4EE3\u7801\u63D0\u4EA4\u5230\u4EE3\u7801\u5E93\u4E2D" aria-hidden="true">#</a> \u628A\u9519\u8BEF\u7684\u4EE3\u7801\u63D0\u4EA4\u5230\u4EE3\u7801\u5E93\u4E2D</h2><h3 id="\u79FB\u9664commit-\u4FDD\u7559commit\u7684\u4FEE\u6539" tabindex="-1"><a class="header-anchor" href="#\u79FB\u9664commit-\u4FDD\u7559commit\u7684\u4FEE\u6539" aria-hidden="true">#</a> \u79FB\u9664commit\uFF0C\u4FDD\u7559commit\u7684\u4FEE\u6539</h3><ol><li>\u4F7F\u7528<code>git log</code>\u547D\u4EE4\u83B7\u53D6\u5F53\u524D\u5206\u652F\u4E0B\u63D0\u4EA4\u7684commit_id\u3002\u5047\u8BBE\u9519\u8BEF\u63D0\u4EA4\u7684commit_id\u4E3Acommit_id4\uFF0C\u4E5F\u5C31\u662F\u8BF4\u8981\u5C06\u4FEE\u6539\u56DE\u6EDA\u5230commit_id3</li><li>\u4F7F\u7528<code>git reset &lt;commit_id&gt;</code>\u547D\u4EE4\u5C06\u67D0\u4E2Acommit_id(commit_id3)\u540E\u9762\u7684commit\u6E05\u9664\uFF0C\u5E76\u4FDD\u7559\u4FEE\u6539\u7684\u4EE3\u7801\u5728\u5DE5\u4F5C\u533A<code>WorkSpace</code></li><li>\u4FEE\u6539\u4EE3\u7801</li><li>\u63D0\u4EA4\u4EE3\u7801</li></ol><h3 id="\u4FEE\u6539\u4E2D\u95F4\u7684commit-\u5BF9\u5176\u4ED6commit\u6CA1\u6709\u5F71\u54CD" tabindex="-1"><a class="header-anchor" href="#\u4FEE\u6539\u4E2D\u95F4\u7684commit-\u5BF9\u5176\u4ED6commit\u6CA1\u6709\u5F71\u54CD" aria-hidden="true">#</a> \u4FEE\u6539\u4E2D\u95F4\u7684commit\uFF0C\u5BF9\u5176\u4ED6commit\u6CA1\u6709\u5F71\u54CD</h3><blockquote><p>\u5728\u9879\u76EE\u5F00\u53D1\u4E2D\uFF0C\u7A81\u7136\u53D1\u73B0\u5728\u524D\u51E0\u6B21\u7684\u63D0\u4EA4\u4E2D\uFF0C\u6709\u4E00\u6B21\u63D0\u4EA4\u4E2D\u5305\u542B\u4E00\u4E2Abug\uFF1B\u5F53\u7136\u6211\u4EEC\u53EF\u4EE5\u8FDB\u884C\u4E00\u4E2A\u65B0\u7684\u4FEE\u6539\uFF0C\u7136\u540E\u518D\u63D0\u4EA4\u4E00\u6B21\uFF1B \u4F46\u662F\u4E0D\u4F18\u96C5\u3002</p><p>\u6211\u4EEC\u53EF\u4EE5\u76F4\u63A5<strong>\u91CD\u505A</strong>\u6709bug\u7684commit\uFF0Cgit revert\u662F\u7528\u4E8E\u201C\u53CD\u505A\u201D\u67D0\u4E00\u4E2A\u7248\u672C\uFF0C\u4EE5\u8FBE\u5230\u64A4\u9500\u8BE5\u7248\u672C\u7684\u4FEE\u6539\u7684\u76EE\u7684\u3002</p></blockquote><ol><li>\u4F7F\u7528<code>git log</code>\u547D\u4EE4\u83B7\u53D6\u5F53\u524D\u5206\u652F\u4E0B\u63D0\u4EA4\u7684commit_id</li><li>\u4F7F\u7528<code>git revert -n &lt;commit_id&gt;</code>\u547D\u4EE4\u5C06\u6539\u52A8\u653E\u56DE\u6682\u5B58\u533A<code>index</code></li><li>\u4FEE\u6539\u4EE3\u7801</li><li>\u63D0\u4EA4\u4EE3\u7801</li></ol><h3 id="\u53D1\u73B0\u67D0\u4E2A\u6587\u4EF6\u4FEE\u6539\u9519\u8BEF\u4E86-\u60F3\u8981\u5C06\u6587\u4EF6\u6062\u590D\u5230\u521Apull\u4EE3\u7801\u65F6\u7684\u72B6\u6001" tabindex="-1"><a class="header-anchor" href="#\u53D1\u73B0\u67D0\u4E2A\u6587\u4EF6\u4FEE\u6539\u9519\u8BEF\u4E86-\u60F3\u8981\u5C06\u6587\u4EF6\u6062\u590D\u5230\u521Apull\u4EE3\u7801\u65F6\u7684\u72B6\u6001" aria-hidden="true">#</a> \u53D1\u73B0\u67D0\u4E2A\u6587\u4EF6\u4FEE\u6539\u9519\u8BEF\u4E86\uFF0C\u60F3\u8981\u5C06\u6587\u4EF6\u6062\u590D\u5230\u521Apull\u4EE3\u7801\u65F6\u7684\u72B6\u6001</h3><p>\u4F7F\u7528<code>git checkout -- &lt;file_name&gt;</code>\u547D\u4EE4\uFF0C\u56DE\u6EDA\u5230\u672C\u5730\u4ED3\u5E93\u4E2D\u7684\u72B6\u6001</p><h2 id="\u5206\u652F" tabindex="-1"><a class="header-anchor" href="#\u5206\u652F" aria-hidden="true">#</a> \u5206\u652F</h2><p><strong>\u67E5\u770B\u5206\u652F</strong></p><ul><li>\u5217\u51FA\u6240\u6709<strong>\u672C\u5730\u5206\u652F</strong>\uFF1A<code>git branch</code></li><li>\u5217\u51FA\u6240\u6709<strong>\u8FDC\u7A0B\u5206\u652F</strong>\uFF1A<code>git branch -r</code></li><li>\u5217\u51FA\u6240\u6709\u672C\u5730\u5206\u652F\u4E0E\u8FDC\u7A0B\u5206\u652F\uFF1A<code>git branch -a</code></li></ul><p><strong>\u521B\u5EFA\u5206\u652F</strong>\uFF1A<code>git branch &lt;\u5206\u652F\u540D&gt;</code></p><p><strong>\u5207\u6362\u5206\u652F</strong>\uFF1A<code>git checkout &lt;\u5206\u652F\u540D&gt;</code></p><p><strong>\u5220\u9664\u5206\u652F</strong></p><ul><li><p><strong>\u5220\u9664\u672C\u5730\u5206\u652F</strong>\uFF1A<code>git branch -d &lt;\u5206\u652F\u540D&gt;</code></p></li><li><p><strong>\u5220\u9664\u8FDC\u7A0B\u5206\u652F</strong>\uFF1A<code>git push origin -d &lt;\u5206\u652F\u540D&gt;</code></p></li></ul><h2 id="\u6807\u7B7E" tabindex="-1"><a class="header-anchor" href="#\u6807\u7B7E" aria-hidden="true">#</a> \u6807\u7B7E</h2><p>\u6807\u7B7E\u6307\u7684\u662F\u67D0\u4E2A\u5206\u652F\u7279\u5B9A\u65F6\u95F4\u70B9\u7684\u72B6\u6001\uFF0C\u901A\u5E38\u4F1A\u4F7F\u7528\u6807\u7B7E\u6765\u6807\u8BB0\u53D1\u5E03\u8282\u70B9\uFF081.0\u30011.2\u7B49\uFF09\u901A\u8FC7\u6807\u7B7E\uFF0C\u53EF\u4EE5\u5F88\u65B9\u4FBF\u7684\u5207\u6362\u5230\u6807\u8BB0\u65F6\u7684\u72B6\u6001</p><ul><li><p>\u5217\u51FA\u5DF2\u6709\u6807\u7B7E \uFF1A<code>git tag</code></p></li><li><p>\u67E5\u770B\u6807\u7B7E\u4FE1\u606F \uFF1A<code>git show &lt;\u6807\u7B7E\u540D&gt;</code></p></li><li><p>\u521B\u5EFA\u6807\u7B7E \uFF1A<code>git tag &lt;\u6807\u7B7E\u540D&gt;</code></p></li><li><p>\u63A8\u9001\u6807\u7B7E \uFF1A<code>git push origin &lt;\u6807\u7B7E\u540D&gt;</code></p></li><li><p>\u5220\u9664\u6807\u7B7E \uFF1A</p><ul><li><p>\u5220\u9664\u672C\u5730\u6807\u7B7E \uFF1A<code>git tag -d &lt;\u6807\u7B7E\u540D&gt;</code></p></li><li><p>\u5220\u9664\u8FDC\u7A0B\u6807\u7B7E \uFF1A<code>git push origin :refs/tags/&lt;\u6807\u7B7E\u540D&gt;</code></p></li></ul></li></ul>',36),c=[d];function r(a,g){return e(),t("div",null,c)}var n=i(o,[["render",r],["__file","Git.html.vue"]]);export{n as default};
