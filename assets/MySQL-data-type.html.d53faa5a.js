import{_ as t}from"./plugin-vue_export-helper.21dcd24c.js";import{o as e,c as l,d as i}from"./app.d314e544.js";const o={},d=i('<h1 id="mysql-\u6570\u636E\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#mysql-\u6570\u636E\u7C7B\u578B" aria-hidden="true">#</a> MySQL \u6570\u636E\u7C7B\u578B</h1><p>MySQL \u4E2D\u4E3B\u8981\u5305\u542B 5 \u5927\u7C7B\u7684\u6570\u636E\u7C7B\u578B\uFF0C\u5206\u522B\u662F\u6574\u6570\u578B\u3001\u5C0F\u6570\u578B\u3001\u5B57\u7B26\u4E32\u578B\u3001\u65E5\u671F\u578B\u3001\u5176\u4ED6</p><h2 id="\u6574\u6570\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u6574\u6570\u7C7B\u578B" aria-hidden="true">#</a> \u6574\u6570\u7C7B\u578B</h2><blockquote><p>\u663E\u793A\u5BBD\u5EA6\u548C\u6570\u636E\u7C7B\u578B\u7684\u53D6\u503C\u8303\u56F4\u662F\u65E0\u5173\u7684\u3002\u663E\u793A\u5BBD\u5EA6\u53EA\u662F\u6307\u660E MySQL \u6700\u5927\u53EF\u80FD\u663E\u793A\u7684\u6570\u5B57\u4E2A\u6570\uFF0C\u5E76\u4E14\u9700\u8981\u542F\u7528\u586B\u5145\u96F6\u7684\u9009\u9879\u624D\u6709\u6548\uFF0C\u6570\u503C\u7684\u4F4D\u6570\u5C0F\u4E8E\u6307\u5B9A\u7684\u5BBD\u5EA6\u65F6\u4F1A\u75310\u586B\u5145\u3002\u5982\u679C\u63D2\u5165\u4E86\u5927\u4E8E\u663E\u793A\u5BBD\u5EA6\u7684\u503C\uFF0C\u53EA\u8981\u8BE5\u503C\u4E0D\u8D85\u8FC7\u8BE5\u7C7B\u578B\u6574\u6570\u7684\u53D6\u503C\u8303\u56F4\uFF0C\u6570\u503C\u4F9D\u7136\u53EF\u4EE5\u63D2\u5165\uFF0C\u800C\u4E14\u80FD\u591F\u663E\u793A\u51FA\u6765\u3002\u4F8B\u5982\uFF0Cyear \u5B57\u6BB5\u63D2\u5165 19999\uFF0C\u5F53\u4F7F\u7528 SELECT \u67E5\u8BE2\u8BE5\u5217\u503C\u7684\u65F6\u5019\uFF0CMySQL \u663E\u793A\u7684\u5C06\u662F\u5B8C\u6574\u7684\u5E26\u6709 5 \u4F4D\u6570\u5B57\u7684 19999\uFF0C\u800C\u4E0D\u662F 4 \u4F4D\u6570\u5B57\u7684\u503C</p></blockquote><ul><li><p>tinyint\uFF0C1\u4E2A\u5B57\u8282\uFF0C-128<sub>127(\u6709\u7B26\u53F7)\u30010</sub>255(\u65E0\u7B26\u53F7)</p><blockquote><p><strong>Java\u4E2DBoolean\u7C7B\u578B\u53D8\u91CF\u53EF\u4EE5\u7528tinyint\u7C7B\u578B\u7684\u5B57\u6BB5</strong>\uFF0CMySQL\u91CC\u6709\u56DB\u4E2A\u5E38\u91CF\uFF1Atrue\u3001false\u3001TRUE\u3001FALSE\u5206\u522B\u4EE3\u88681\u30010\u30011\u30010\u3002MySQL\u4FDD\u5B58boolean\u503C\u65F6\u75281\u4EE3\u8868TRUE\uFF0C0\u4EE3\u8868FALSE</p></blockquote></li><li><p>smallint\uFF0C2\u4E2A\u5B57\u8282</p></li><li><p>mediumint\uFF0C3\u4E2A\u5B57\u8282</p></li><li><p>int\uFF0C4\u4E2A\u5B57\u8282</p></li><li><p>bigint\uFF0C8\u4E2A\u5B57\u8282</p></li></ul><h2 id="\u5C0F\u6570\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u5C0F\u6570\u7C7B\u578B" aria-hidden="true">#</a> \u5C0F\u6570\u7C7B\u578B</h2><blockquote><p>\u6D6E\u70B9\u7C7B\u578B\u548C\u5B9A\u70B9\u7C7B\u578B\u90FD\u53EF\u4EE5\u7528<code>(M, D)</code>\u6765\u8868\u793A\uFF0C\u5176\u4E2D<code>M</code>\u79F0\u4E3A\u7CBE\u5EA6\uFF0C\u8868\u793A\u603B\u5171\u7684\u4F4D\u6570\uFF1B<code>D</code>\u79F0\u4E3A\u6807\u5EA6\uFF0C\u8868\u793A\u5C0F\u6570\u7684\u4F4D\u6570\u3002</p><p>\u6D6E\u70B9\u6570\u7C7B\u578B\u7684\u53D6\u503C\u8303\u56F4\u4E3A M\uFF081\uFF5E255\uFF09\u548C D\uFF081\uFF5E30\uFF0C\u4E14\u4E0D\u80FD\u5927\u4E8E M-2\uFF09\uFF0C\u5206\u522B\u8868\u793A\u663E\u793A\u5BBD\u5EA6\u548C\u5C0F\u6570\u4F4D\u6570\u3002M \u548C D \u5728 FLOAT \u548CDOUBLE \u4E2D\u662F\u53EF\u9009\u7684\uFF0CFLOAT \u548C DOUBLE \u7C7B\u578B\u5C06\u9ED8\u8BA4\u4F1A\u6309\u7167\u5B9E\u9645\u7684\u7CBE\u5EA6\uFF08\u7531\u8BA1\u7B97\u673A\u786C\u4EF6\u548C\u64CD\u4F5C\u7CFB\u7EDF\u51B3\u5B9A\uFF09\u3002<strong>DECIMAL \u7684\u9ED8\u8BA4 D \u503C\u4E3A 0\u3001M \u503C\u4E3A 10</strong>\u3002</p><p>\u4E0D\u8BBA\u662F\u5B9A\u70B9\u8FD8\u662F\u6D6E\u70B9\u7C7B\u578B\uFF0C\u5982\u679C\u7528\u6237\u6307\u5B9A\u7684\u7CBE\u5EA6<strong>\u8D85\u51FA\u7CBE\u5EA6\u8303\u56F4\uFF0C\u5219\u4F1A\u56DB\u820D\u4E94\u5165\u8FDB\u884C\u5904\u7406</strong>\u3002</p></blockquote><ul><li><p>\u6D6E\u70B9\u7C7B\u578B</p><ul><li>float\uFF0C\u5355\u7CBE\u5EA6\uFF0C4\u4E2A\u5B57\u8282</li><li>double\uFF0C\u53CC\u7CBE\u5EA6\uFF0C8\u4E2A\u5B57\u8282</li></ul></li><li><p>\u5B9A\u70B9\u7C7B\u578B</p><ul><li><p>decimal\uFF0CM+2\u4E2A\u5B57\u8282</p><blockquote><p>\u5728 MySQL \u4E2D\uFF0C\u5B9A\u70B9\u6570\u4EE5\u5B57\u7B26\u4E32\u5F62\u5F0F\u5B58\u50A8\uFF0C\u5728\u5BF9\u7CBE\u5EA6\u8981\u6C42\u6BD4\u8F83\u9AD8\u7684\u65F6\u5019\uFF08\u5982\u8D27\u5E01\u3001\u79D1\u5B66\u6570\u636E\uFF09\uFF0C\u4F7F\u7528 DECIMAL \u7684\u7C7B\u578B\u6BD4\u8F83\u597D\uFF0C\u53E6\u5916\u4E24\u4E2A\u6D6E\u70B9\u6570\u8FDB\u884C\u51CF\u6CD5\u548C\u6BD4\u8F83\u8FD0\u7B97\u65F6\u4E5F\u5BB9\u6613\u51FA\u95EE\u9898\uFF0C\u6240\u4EE5\u5728\u4F7F\u7528\u6D6E\u70B9\u6570\u65F6\u9700\u8981\u6CE8\u610F\uFF0C\u5E76\u5C3D\u91CF<strong>\u907F\u514D\u505A\u6D6E\u70B9\u6570\u6BD4\u8F83</strong></p></blockquote></li></ul></li></ul><h2 id="\u65E5\u671F\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u65E5\u671F\u7C7B\u578B" aria-hidden="true">#</a> \u65E5\u671F\u7C7B\u578B</h2><ul><li>year\uFF0C\u683C\u5F0F<code>yyyy</code>\uFF0C\u8303\u56F4<code>1901~2155</code>\uFF0C1\u4E2A\u5B57\u8282\u3002\u53EF\u4EE5\u63A5\u53D7\u6574\u578B\u548C\u5B57\u7B26\u4E32\uFF0C\u6240\u4EE5\u7A0B\u5E8F\u4E2D\u8BB0\u5F55\u5E74\u4EFD\u65F6\u53EF\u4EE5\u4F7F\u7528\u5B57\u7B26\u4E32</li><li>time\uFF0C\u683C\u5F0F<code>HH:mm:ss</code>\uFF0C\u8303\u56F4<code>-838:59:59 ~ 838:59:59</code>\uFF0C3\u4E2A\u5B57\u8282</li><li>date\uFF0C\u683C\u5F0F<code>yyyy-MM-dd</code>\uFF0C\u8303\u56F4<code>1000-01-01 ~ 9999-12-3</code>\uFF0C3\u4E2A\u5B57\u8282</li><li>datetime\uFF0C\u683C\u5F0F<code>yyyy-MM-dd HH:mm:ss</code>\uFF0C\u8303\u56F4<code>1000-01-01 00:00:00 ~ 9999-12-31 23:59:59</code>\uFF0C8\u4E2A\u5B57\u8282</li><li>timestamp\uFF0C\u683C\u5F0F<code>yyyy-MM-dd HH:mm:ss</code>\uFF0C\u8303\u56F4<code>1980-01-01 00:00:01 UTC ~ 2040-01-19 03:14:07 UTC</code>\uFF0C4\u4E2A\u5B57\u8282\u3002\u5982\u679C\u4E0D\u7ED9\u8FD9\u4E2A\u5B57\u6BB5\u8D4B\u503C\uFF0C\u6216\u8005\u8D4B\u503C\u4E3Anull\uFF0C\u90A3\u4E48\u9ED8\u8BA4\u4F7F\u7528\u7CFB\u7EDF\u5F53\u524D\u65F6\u95F4\u6765\u81EA\u52A8\u8D4B\u503C</li><li>datetime\u548Ctimestamp\u7684\u533A\u522B <ul><li><strong>\u5B58\u50A8\u65B9\u5F0F\u4E0D\u4E00\u6837</strong>\uFF0Ctimestamp\u5B58\u50A8\u65F6\u4ECE\u5BA2\u6237\u7AEF\u65F6\u533A\u8F6C\u6362\u6210UTC\u8FDB\u884C\u5B58\u50A8\uFF0C\u67E5\u8BE2\u65F6\u4ECEUTC\u8F6C\u6362\u5230\u5BA2\u6237\u7AEF\u65F6\u533A\u8FD4\u56DE\uFF1Bdatetime\u4E0D\u8F6C\u6362\uFF0C\u539F\u6837\u5B58\u50A8\u548C\u8BFB\u53D6</li><li><strong>\u65F6\u95F4\u8303\u56F4\u4E0D\u4E00\u6837</strong>\uFF0Ctimestamp\u5B58\u50A8\u7684\u8303\u56F4\u4E3A1970-01-01\uFF5E 2038-01-19\uFF1Bdatetime\u5B58\u50A8\u7684\u8303\u56F4\u4E3A1000-01-01 \uFF5E 9999-12-31</li></ul></li></ul><h2 id="\u5B57\u7B26\u4E32\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u5B57\u7B26\u4E32\u7C7B\u578B" aria-hidden="true">#</a> \u5B57\u7B26\u4E32\u7C7B\u578B</h2><blockquote><p>\u5B57\u7B26\u4E32\u7C7B\u578B\u53EF\u4EE5\u5728\u5B9A\u4E49\u65F6\u4F7F\u7528M\u6765\u6307\u5B9A\u957F\u5EA6</p></blockquote><ul><li><p>char(M)\uFF0C\u56FA\u5B9A\u957F\u5EA6\u5B57\u7B26\u4E32\uFF0CM\u4E2A\u5B57\u8282</p></li><li><p>varchar(M)\uFF0C\u53EF\u53D8\u957F\u5EA6\u5B57\u7B26\u4E32\uFF0C\u5F53\u5B9E\u9645\u5B58\u50A8\u7684\u957F\u5EA6L\u5C0F\u4E8EM\uFF0C\u5219\u9700\u8981L+1\u4E2A\u5B57\u8282\uFF1B\u5F53\u5B9E\u9645\u5B58\u50A8\u7684\u957F\u5EA6\u7B49\u4E8EM\uFF0C\u5219\u9700\u8981M+1\u4E2A\u5B57\u8282</p></li><li><p>enum\uFF0C\u4E00\u4E2A\u5B57\u7B26\u4E32\u5BF9\u8C61\uFF0C\u503C\u4E3A\u8868\u521B\u5EFA\u65F6\u5217\u89C4\u5B9A\u4E2D\u679A\u4E3E\u7684\u4E00\u5217\u503C\uFF0C\u8BED\u6CD5<code>&lt;\u5B57\u6BB5\u540D&gt; ENUM( &#39;\u503C1&#39;, &#39;\u503C1&#39;, \u2026, &#39;\u503Cn&#39; )</code>\uFF0C\u4ECE 1 \u5F00\u59CB\u7F16\u53F7\u3002\u4F9D\u7167\u5217\u7D22\u5F15\u987A\u5E8F\u6392\u5217\uFF0C\u5E76\u4E14\u7A7A\u5B57\u7B26\u4E32\u6392\u5728\u975E\u7A7A\u5B57\u7B26\u4E32\u524D\uFF0CNULL \u503C\u6392\u5728\u5176\u4ED6\u6240\u6709\u679A\u4E3E\u503C\u524D\u3002ENUM \u5217\u603B\u6709\u4E00\u4E2A\u9ED8\u8BA4\u503C\u3002\u5982\u679C\u5C06 ENUM \u5217\u58F0\u660E\u4E3A NULL\uFF0CNULL \u503C\u5219\u4E3A\u8BE5\u5217\u7684\u4E00\u4E2A\u6709\u6548\u503C\uFF0C\u5E76\u4E14\u9ED8\u8BA4\u503C\u4E3A NULL\u3002\u5982\u679C ENUM \u5217\u88AB\u58F0\u660E\u4E3A NOT NULL\uFF0C\u5176\u9ED8\u8BA4\u503C\u4E3A\u5141\u8BB8\u7684\u503C\u5217\u8868\u7684\u7B2C 1 \u4E2A\u5143\u7D20</p><p>\u4F8B\u5B50\uFF1A\u5B9A\u4E49enum\u7C7B\u578B\u7684\u5217(&#39;first&#39;, &#39;second&#39;, &#39;third&#39;)\uFF0C\u503C\u4E0E\u7D22\u5F15\u7684\u5BF9\u5E94\u5173\u7CFB\u5982\u4E0B\uFF1A</p><table><thead><tr><th style="text-align:center;">\u7D22\u5F15</th><th style="text-align:center;">\u503C</th></tr></thead><tbody><tr><td style="text-align:center;">null</td><td style="text-align:center;">null</td></tr><tr><td style="text-align:center;">0</td><td style="text-align:center;">&quot;&quot;</td></tr><tr><td style="text-align:center;">1</td><td style="text-align:center;">&quot;first&quot;</td></tr><tr><td style="text-align:center;">2</td><td style="text-align:center;">&quot;second&quot;</td></tr><tr><td style="text-align:center;">3</td><td style="text-align:center;">&quot;third&quot;</td></tr></tbody></table></li><li><p>set\uFF0C\u4E00\u4E2A\u5B57\u7B26\u4E32\u7684\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u6709\u96F6\u6216\u591A\u4E2A\u503C\uFF0C\u503C\u4E3A\u8868\u521B\u5EFA\u65F6\u89C4\u5B9A\u7684\u4E00\u5217\u503C\uFF0C\u8BED\u6CD5<code>SET( &#39;\u503C1&#39;, &#39;\u503C2&#39;, \u2026, &#39;\u503Cn&#39; )</code>\uFF0CMySQL\u4F1A\u81EA\u52A8\u5220\u9664\u91CD\u590D\u503C</p></li><li><p>\u5927\u6587\u672C\uFF0C\u9002\u5408\u4FDD\u5B58\u6587\u7AE0\u3001\u8BC4\u8BBA\u7B49</p><ul><li>tinytext\uFF0C\u957F\u5EA6\u4E3A255\uFF0CL+1\u4E2A\u5B57\u8282</li><li>text\uFF0C\u957F\u5EA6\u4E3A65535\uFF0CL+2\u4E2A\u5B57\u8282</li><li>mediumtext\uFF0C\u957F\u5EA6\u4E3A16777215\uFF0CL+3\u4E2A\u5B57\u8282</li><li>longtext\uFF0C\u957F\u5EA6\u4E3A4294967295\uFF0CL+4\u4E2A\u5B57\u8282</li></ul></li></ul><h2 id="\u5176\u4ED6\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u5176\u4ED6\u7C7B\u578B" aria-hidden="true">#</a> \u5176\u4ED6\u7C7B\u578B</h2><blockquote><p>\u4E8C\u8FDB\u5236\u7C7B\u578B\u53EF\u4EE5\u5728\u5B9A\u4E49\u65F6\u4F7F\u7528M\u6765\u6307\u5B9A\u957F\u5EA6</p></blockquote><ul><li>text\uFF0C\u6587\u672C\u7C7B\u578B\uFF0C\u4E00\u822C\u7528\u6765\u5B58\u50A8\u6587\u672C\uFF0C\u6700\u5927\u957F\u5EA665535\u5B57\u8282</li><li>bit(M)\uFF0C\u4EE5<strong>\u4E8C\u8FDB\u5236\u7684\u5F62\u5F0F</strong>\u4FDD\u5B58\uFF0CM \u8868\u793A\u6BCF\u4E2A\u503C\u7684\u4F4D\u6570\uFF0C\u8303\u56F4\u4E3A 1\uFF5E64\u3002\u5982\u679C M \u88AB\u7701\u7565\uFF0C\u9ED8\u8BA4\u503C\u4E3A 1\uFF0C\u5927\u7EA6(M+7)/8\u4E2A\u5B57\u8282</li><li>binary(M)\uFF0C\u56FA\u5B9A\u957F\u5EA6\u7684\u4E8C\u8FDB\u5236\u5B57\u7B26\u4E32\uFF0CM\u4E2A\u5B57\u8282</li><li>varbinary(M)\uFF0C\u53EF\u53D8\u957F\u5EA6\u7684\u4E8C\u8FDB\u5236\u5B57\u7B26\u4E32\uFF0CM+1\u4E2A\u5B57\u8282</li><li>\u4E8C\u8FDB\u5236\u5BF9\u8C61 <ul><li>tinyblob\uFF0C255\u4E2A\u5B57\u8282</li><li>blob\uFF0C65535\u4E2A\u5B57\u8282</li><li>mediumblob\uFF0C16777215\u4E2A\u5B57\u8282</li><li>longblob\uFF0C4294967295\u4E2A\u5B57\u8282</li></ul></li></ul>',16),a=[d];function r(n,c){return e(),l("div",null,a)}var p=t(o,[["render",r],["__file","MySQL-data-type.html.vue"]]);export{p as default};
