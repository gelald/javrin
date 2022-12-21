import{_ as h}from"./plugin-vue_export-helper.21dcd24c.js";import{r as i,o as l,c as s,a as t,b as d,d as r,e as a}from"./app.c1c649a7.js";const n={},o=r('<h1 id="mysql-\u6570\u636E\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#mysql-\u6570\u636E\u7C7B\u578B" aria-hidden="true">#</a> MySQL \u6570\u636E\u7C7B\u578B</h1><p>MySQL \u4E2D\u4E3B\u8981\u5305\u542B 5 \u5927\u7C7B\u7684\u6570\u636E\u7C7B\u578B\uFF0C\u5206\u522B\u662F\u6574\u6570\u578B\u3001\u5C0F\u6570\u578B\u3001\u5B57\u7B26\u4E32\u578B\u3001\u65E5\u671F\u578B\u3001\u5176\u4ED6\u7C7B\u578B\u3002</p><h2 id="\u6574\u6570\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u6574\u6570\u7C7B\u578B" aria-hidden="true">#</a> \u6574\u6570\u7C7B\u578B</h2><h3 id="\u6570\u636E\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u7C7B\u578B" aria-hidden="true">#</a> \u6570\u636E\u7C7B\u578B</h3>',4),c=a("\u53C2\u8003\uFF1A"),u={href:"https://dev.mysql.com/doc/refman/8.0/en/integer-types.html",target:"_blank",rel:"noopener noreferrer"},T=a("MySQL :: MySQL 8.0 Reference Manual :: 11.1.2 Integer Types (Exact Value) - INTEGER, INT, SMALLINT, TINYINT, MEDIUMINT, BIGINT"),p=r('<table><thead><tr><th>\u6570\u636E\u7C7B\u578B</th><th>\u5B57\u8282\u6570</th><th>\u8303\u56F4</th></tr></thead><tbody><tr><td>TINYINT</td><td>1\u4E2A\u5B57\u8282</td><td>\u6709\u7B26\u53F7\uFF1A0~2<sup>8</sup>-1<br>\u65E0\u7B26\u53F7\uFF1A-2<sup>7</sup>~2<sup>7</sup>-1</td></tr><tr><td>SMALLINT</td><td>2\u4E2A\u5B57\u8282</td><td>\u6709\u7B26\u53F7\uFF1A0~2<sup>16</sup>-1<br>\u65E0\u7B26\u53F7\uFF1A-2<sup>15</sup>~2<sup>15</sup>-1</td></tr><tr><td>MEDIUMINT</td><td>3\u4E2A\u5B57\u8282</td><td>\u6709\u7B26\u53F7\uFF1A0~2<sup>24</sup><br>\u65E0\u7B26\u53F7\uFF1A-2<sup>23</sup>~2<sup>23</sup>-1</td></tr><tr><td>INT</td><td>4\u4E2A\u5B57\u8282</td><td>\u6709\u7B26\u53F7\uFF1A0~2<sup>32</sup><br>\u65E0\u7B26\u53F7\uFF1A-2<sup>31</sup>~2<sup>31</sup>-1</td></tr><tr><td>BIGINT</td><td>8\u4E2A\u5B57\u8282</td><td>\u6709\u7B26\u53F7\uFF1A0~2<sup>64</sup><br>\u65E0\u7B26\u53F7\uFF1A-2<sup>63</sup>~2<sup>63</sup>-1</td></tr></tbody></table><h3 id="\u663E\u793A\u5BBD\u5EA6" tabindex="-1"><a class="header-anchor" href="#\u663E\u793A\u5BBD\u5EA6" aria-hidden="true">#</a> \u663E\u793A\u5BBD\u5EA6</h3><p>\u6211\u4EEC\u7ECF\u5E38\u80FD\u770B\u89C1 INT(11) \u7684\u5199\u6CD5\uFF0C\u5176\u4E2D\u62EC\u53F7\u5185\u7684\u6570\u503C\u662F\u8FD9\u4E2A\u5B57\u6BB5\u6700\u5927\u53EF\u80FD\u663E\u793A\u7684\u6570\u5B57\u4E2A\u6570\uFF0C\u663E\u793A\u5BBD\u5EA6\u53EA\u548C\u5C55\u793A\u6709\u5173\uFF0C\u548C\u6570\u503C\u8303\u56F4\u65E0\u5173\u3002\u5F53\u6253\u5F00 zerofill \u9009\u9879\u65F6\uFF0C\u5F53\u6570\u503C\u7684\u4F4D\u6570\u5C0F\u4E8E\u6307\u5B9A\u7684\u5BBD\u5EA6\u65F6\u4F1A\u7531 0 \u586B\u5145\u5B58\u5165\u3002\u6BD4\u5982\u5B9A\u4E49\u4E86 INT(3) \u5B57\u6BB5\u5E76\u6253\u5F00\u4EE5\u96F6\u586B\u5145\uFF0C\u5B58\u5165\u4E86\u4E00\u4E2A6\uFF0C\u6700\u7EC8\u663E\u793A 006\u3002\u8FD9\u4E2A\u529F\u80FD\u5728\u5F00\u53D1\u8FC7\u7A0B\u4E2D\uFF0C\u610F\u4E49\u4E0D\u5927\u3002</p><h3 id="\u548C-java-\u7C7B\u578B\u5BF9\u5E94" tabindex="-1"><a class="header-anchor" href="#\u548C-java-\u7C7B\u578B\u5BF9\u5E94" aria-hidden="true">#</a> \u548C Java \u7C7B\u578B\u5BF9\u5E94</h3><p><strong>\u8FD9\u91CC\u53EA\u8BA8\u8BBA\u65E0\u7B26\u53F7\u7684\u60C5\u51B5\uFF0C\u6709\u7B26\u53F7\u9700\u8981\u6309\u6570\u503C\u8303\u56F4\u6765\u8C03\u6574</strong></p><ul><li>\u4E00\u822C\u6765\u8BF4TINYINT\u3001SMALLINT\u3001MEDIUMINT\u3001INT \u90FD\u53EF\u4EE5\u7528 <code>java.lang.Integer</code> \u6765\u5BF9\u5E94\uFF0C\u56E0\u4E3A <code>Integer</code> \u7528 4 \u4E2A\u5B57\u8282\u5B58\u50A8\u6570\u636E</li><li>BINGINT \u7531\u4E8E\u8D85\u51FA 4 \u4E2A\u5B57\u8282\uFF0C\u6240\u4EE5\u9700\u8981\u7528 <code>java.lang.Long</code> \u6765\u5BF9\u5E94</li><li><strong><code>java.lang.Boolean</code> \u7C7B\u578B\u53D8\u91CF\u53EF\u4EE5\u7528 TINYINT \u7C7B\u578B\u7684\u5B57\u6BB5</strong>\uFF0CMySQL \u91CC\u6709\u56DB\u4E2A\u5E38\u91CF\uFF1Atrue\u3001false\u3001TRUE\u3001FALSE \u5206\u522B\u4EE3\u8868 1\u30010\u30011\u30010\u3002MySQL \u4FDD\u5B58 boolean \u503C\u65F6\u7528 1 \u4EE3\u8868 TRUE\uFF0C0 \u4EE3\u8868 FALSE</li></ul><h2 id="\u5C0F\u6570\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u5C0F\u6570\u7C7B\u578B" aria-hidden="true">#</a> \u5C0F\u6570\u7C7B\u578B</h2><h3 id="\u6570\u636E\u7C7B\u578B-1" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u7C7B\u578B-1" aria-hidden="true">#</a> \u6570\u636E\u7C7B\u578B</h3><p>\u5176\u4E2D\u5C0F\u6570\u7C7B\u578B\u53EF\u4EE5\u7EC6\u5206\u4E3A\u6D6E\u70B9\u7C7B\u578B\u548C\u5B9A\u70B9\u7C7B\u578B</p><ul><li><p>\u6D6E\u70B9\u7C7B\u578B</p><ul><li>FLOAT\uFF1A\u5355\u7CBE\u5EA6\uFF0C4 \u4E2A\u5B57\u8282</li><li>DOUBLE\uFF1A\u53CC\u7CBE\u5EA6\uFF0C8 \u4E2A\u5B57\u8282</li></ul></li><li><p>\u5B9A\u70B9\u7C7B\u578B</p><ul><li><p>DECIMAL(M, D)\uFF1AM \u7CBE\u5EA6\u4EE3\u8868\u6700\u5927\u4F4D\u6570\uFF0CD \u6807\u5EA6\u4EE3\u8868\u5C0F\u6570\u70B9\u540E\u7684\u4F4D\u6570\u3002DECIMAL(M, D) \u4F1A\u5360\u7528 M + 2 \u4E2A\u5B57\u8282\uFF0C\u56E0\u4E3A\u5B83\u662F\u4EE5\u5B57\u7B26\u4E32\u5F62\u5F0F\u8FDB\u884C\u5B58\u50A8\u7684\uFF0C\u5F53\u5B58\u5165\u4E00\u4E2A\u6570\u65F6\uFF0C\u4F1A\u5B58\u50A8\u6570\u5B57\u4EE3\u8868\u7684\u5B57\u7B26\uFF0C\u4E00\u4E2A\u6570\u5B57\u5B57\u7B26\u4F7F\u7528\u4E00\u4E2A\u5B57\u8282\u7A7A\u95F4\uFF0C\u53E6\u5916\u8981\u5B58\u5165\u63CF\u8FF0\u8FD9\u4E2A\u6570\u636E\u7684\u5143\u6570\u636E\uFF0C\u5143\u6570\u636E\u56FA\u5B9A\u5360\u7528 2 \u4E2A\u5B57\u8282\uFF0C\u6240\u4EE5\u662F M + 2\u3002\u9ED8\u8BA4 M \u662F 10\uFF0CD \u662F 0.</p><blockquote><p>\u5728 MySQL \u4E2D\uFF0C\u5B9A\u70B9\u6570\u4EE5\u5B57\u7B26\u4E32\u5F62\u5F0F\u5B58\u50A8\uFF0C\u5728\u5BF9\u7CBE\u5EA6\u8981\u6C42\u6BD4\u8F83\u9AD8\u7684\u65F6\u5019\uFF08\u5982\u8D27\u5E01\u3001\u79D1\u5B66\u6570\u636E\uFF09\uFF0C\u4F7F\u7528 DECIMAL \u7684\u7C7B\u578B\u6BD4\u8F83\u597D\uFF0C\u53E6\u5916\u4E24\u4E2A\u6D6E\u70B9\u6570\u8FDB\u884C\u51CF\u6CD5\u548C\u6BD4\u8F83\u8FD0\u7B97\u65F6\u4E5F\u5BB9\u6613\u51FA\u95EE\u9898\uFF0C\u6240\u4EE5\u5728\u4F7F\u7528\u6D6E\u70B9\u6570\u65F6\u9700\u8981\u6CE8\u610F\uFF0C\u5E76\u5C3D\u91CF<strong>\u907F\u514D\u505A\u6D6E\u70B9\u6570\u6BD4\u8F83</strong></p></blockquote></li></ul></li></ul><h3 id="\u548C-java-\u7C7B\u578B\u5BF9\u5E94-1" tabindex="-1"><a class="header-anchor" href="#\u548C-java-\u7C7B\u578B\u5BF9\u5E94-1" aria-hidden="true">#</a> \u548C Java \u7C7B\u578B\u5BF9\u5E94</h3><p>\u4F7F\u7528 BigDecimal \u6765\u5BF9\u5E94\uFF0C\u4F7F\u7528 Double\u3001Float \u5BB9\u6613\u53D1\u751F\u7CBE\u5EA6\u4E22\u5931</p><h3 id="\u5982\u4F55\u9009\u62E9" tabindex="-1"><a class="header-anchor" href="#\u5982\u4F55\u9009\u62E9" aria-hidden="true">#</a> \u5982\u4F55\u9009\u62E9</h3><p>\u5C0F\u6570\u7C7B\u578B\u5EFA\u8BAE\u7EDF\u4E00\u9009\u62E9\u4F7F\u7528 DECIMAL</p><h2 id="\u65E5\u671F\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u65E5\u671F\u7C7B\u578B" aria-hidden="true">#</a> \u65E5\u671F\u7C7B\u578B</h2><h3 id="\u6570\u636E\u7C7B\u578B-2" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u7C7B\u578B-2" aria-hidden="true">#</a> \u6570\u636E\u7C7B\u578B</h3><table><thead><tr><th>\u6570\u636E\u7C7B\u578B</th><th>\u683C\u5F0F</th><th>\u8303\u56F4</th><th>\u5B57\u8282\u6570</th></tr></thead><tbody><tr><td>YEAR</td><td>yyyy</td><td>1901 ~ 2155</td><td>1</td></tr><tr><td>DATE</td><td>yyyy-MM-dd</td><td>1000-01-01 ~ 9999-12-31</td><td>3</td></tr><tr><td>TIME</td><td>HH:mm:ss</td><td>-838:59:59 ~ 838:59:59</td><td>3</td></tr><tr><td>DATETIME</td><td>yyyy-MM-dd HH:mm:ss</td><td>1000-01-01 00:00:00 ~ 9999-12-31 23:59:59</td><td>8</td></tr><tr><td>TIMESTAMP</td><td>yyyyMMddHHmmss</td><td>1970-01-01 00:00:00 UTC ~ 2038-01-19 3:14:07 UTC</td><td>4</td></tr></tbody></table><h3 id="datetime-\u548C-timestamp-\u7684\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#datetime-\u548C-timestamp-\u7684\u533A\u522B" aria-hidden="true">#</a> DATETIME \u548C TIMESTAMP \u7684\u533A\u522B</h3><ul><li>\u65F6\u95F4\u8303\u56F4\uFF1ATIMESTAMP \u5B58\u50A8\u7684\u8303\u56F4\u4E3A1970-01-01\uFF5E 2038-01-19\uFF1BDATETIME \u5B58\u50A8\u7684\u8303\u56F4\u4E3A1000-01-01 \uFF5E 9999-12-31\u3002\u663E\u7136 DATETIME \u7684\u65F6\u95F4\u8303\u56F4\u66F4\u5E7F</li><li>\u81EA\u52A8\u8F6C\u6362\uFF1ATIMESTAMP \u5B58\u50A8\u65F6\u4ECE\u5BA2\u6237\u7AEF\u65F6\u533A\u8F6C\u6362\u6210 UTC \u8FDB\u884C\u5B58\u50A8\uFF0C\u67E5\u8BE2\u65F6\u4ECE UTC \u8F6C\u6362\u4E3A\u5BA2\u6237\u7AEF\u65F6\u533A\u8FD4\u56DE\uFF1BDATETIME \u4E0D\u505A\u8F6C\u6362\uFF0C\u539F\u5C01\u4E0D\u52A8\u5730\u5B58\u50A8\u548C\u8BFB\u53D6</li></ul><h3 id="\u548C-java-\u7C7B\u578B\u5BF9\u5E94-2" tabindex="-1"><a class="header-anchor" href="#\u548C-java-\u7C7B\u578B\u5BF9\u5E94-2" aria-hidden="true">#</a> \u548C Java \u7C7B\u578B\u5BF9\u5E94</h3><p>MySQL \u4E2D\u8FD9\u4E9B\u65E5\u671F\u7C7B\u578B\u53EF\u4EE5\u548C java.sql \u5305\u4E0B\u7684\u7C7B\u5BF9\u5E94</p><table><thead><tr><th>MySQL \u7C7B\u578B</th><th>Java \u7C7B\u578B</th></tr></thead><tbody><tr><td>YEAR</td><td>java.sql.Short/java.sql.Date\uFF08\u65E5\u671F\u9009\u62E9\u5F53\u5E74\u7B2C\u4E00\u5929\uFF09</td></tr><tr><td>DATE</td><td>java.sql.Date\uFF08\u53EA\u5305\u542B\u65E5\u671F\uFF09</td></tr><tr><td>TIME</td><td>java.sql.Time\uFF08\u53EA\u5305\u542B\u65F6\u95F4\uFF09</td></tr><tr><td>DATETIME</td><td>java.sql.Timestamp\uFF08\u5305\u542B\u65E5\u671F\u65F6\u95F4\uFF09</td></tr><tr><td>TIMESTAMP</td><td>java.sql.Timestamp</td></tr></tbody></table><p>\u5176\u4E2D DATETIME \u548C TIMESTAMP \u4E5F\u53EF\u4EE5\u4F7F\u7528 java.time.LocalDateTime \u6765\u5BF9\u5E94\uFF0C\u9700\u8981\u8BBE\u7F6E\u597D\u5E8F\u5217\u5316\u4E0E\u53CD\u5E8F\u5217\u5316</p><h3 id="\u5982\u4F55\u9009\u62E9-1" tabindex="-1"><a class="header-anchor" href="#\u5982\u4F55\u9009\u62E9-1" aria-hidden="true">#</a> \u5982\u4F55\u9009\u62E9</h3><ul><li>YEAR\u3001DATE\u3001TIME \u8FD9\u4E09\u79CD\u6709\u7279\u5B9A\u7684\u5B58\u50A8\u683C\u5F0F\uFF0C\u53EF\u4EE5\u6309\u9700\u6C42\u8FDB\u884C\u9009\u62E9\u3002</li><li>DATETIME\u3001TIMESTAMP \u7684\u9009\u62E9\u4E3B\u8981\u8003\u8651\u65E5\u671F\u4F7F\u7528\u8303\u56F4\uFF0CTIMESTAMP \u7684\u65F6\u95F4\u8303\u56F4\u53EA\u5230 2038 \u5E74\uFF0C\u5982\u679C\u9700\u8981\u4F7F\u7528\u7684\u65E5\u671F\u6BD4\u8F83\u5927\uFF0C\u90A3\u4E48\u5C31\u9700\u8981\u4F7F\u7528 DATETIME\uFF1B\u5982\u679C\u6D89\u53CA\u5230\u8DE8\u65F6\u533A\u3001\u65F6\u533A\u8F6C\u6362\u7684\u4E1A\u52A1\uFF0C\u653E\u5728\u7A0B\u5E8F\u4E2D\u5904\u7406\u4E5F\u53EF\u4EE5\uFF0C\u66F4\u5BB9\u6613\u628A\u63A7\u3002</li></ul><h2 id="\u5B57\u7B26\u4E32\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u5B57\u7B26\u4E32\u7C7B\u578B" aria-hidden="true">#</a> \u5B57\u7B26\u4E32\u7C7B\u578B</h2><h3 id="\u6570\u636E\u7C7B\u578B-3" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u7C7B\u578B-3" aria-hidden="true">#</a> \u6570\u636E\u7C7B\u578B</h3><p>\u8FD9\u91CC\u4E3B\u8981\u8BA8\u8BBA\u5E38\u89C1\u7684 CHAR\u3001VARCHAR\uFF0C\u5176\u4ED6\u7684\u8FD8\u6709 BINARY\u3001VARBINARY\u3001BLOB\u3001TEXT\u3001ENUM\u3001SET \u8FD9\u51E0\u79CD\u7C7B\u578B\u3002</p><p>\u5176\u4E2D\u5B9A\u4E49 CHAR\u3001VARCHAR \u65F6\u5FC5\u987B\u8DDF\u4E0A\u4E00\u4E2A\u6570\u503C N\uFF0C\u7528\u4E8E\u63CF\u8FF0\u8FD9\u4E2A\u5B57\u6BB5\u53EF\u5BB9\u7EB3\u7684<strong>\u6700\u5927\u5B57\u7B26\u6570</strong>\u3002</p><ul><li>CHAR(N) \uFF1A\u56FA\u5B9A\u957F\u5EA6\u5B57\u7B26\u4E32</li><li>VARCHAR(N) \uFF1A\u53EF\u53D8\u957F\u5EA6\u7684\u5B57\u7B26\u4E32</li></ul><p>\u7528\u4F8B\u5B50\u8BF4\u660E\u4E24\u8005\u533A\u522B\uFF1A</p>',31),b=a("\u53C2\u8003\uFF1A"),A={href:"https://dev.mysql.com/doc/refman/8.0/en/char.html",target:"_blank",rel:"noopener noreferrer"},M=a("MySQL :: MySQL 8.0 Reference Manual :: 11.3.2 The CHAR and VARCHAR Types"),E=r('<table><thead><tr><th>\u5B58\u5165\u7684\u503C</th><th>CHAR(4)</th><th>VARCHAR(4)</th></tr></thead><tbody><tr><td>&#39;&#39;</td><td>&#39;\xA0\xA0\xA0\xA0&#39;</td><td>&#39;&#39;</td></tr><tr><td>&#39;ab&#39;</td><td>&#39;ab\xA0\xA0&#39;</td><td>&#39;ab&#39;</td></tr><tr><td>&#39;abcd&#39;</td><td>&#39;abcd&#39;</td><td>&#39;abcd&#39;</td></tr><tr><td>&#39;abcdefgh&#39;</td><td>&#39;abcd&#39;</td><td>&#39;abcd&#39;</td></tr></tbody></table><ul><li>\u5F53\u5B58\u50A8\u7684\u5185\u5BB9\u6CA1\u6709\u8D85\u51FA\u5B57\u6BB5\u53EF\u5BB9\u7EB3\u7684\u6700\u5927\u5B57\u7B26\u6570\u65F6 <ul><li>CHAR(N) \uFF1A\u5B58\u50A8\u5185\u5BB9\u540E\u8FDB\u884C\u586B\u5145\uFF0C\u76F4\u5230\u8FBE\u5230 N \u4E2A\u5B57\u7B26</li><li>VARCHAR(N) \uFF1A\u5B58\u50A8\u5185\u5BB9</li></ul></li><li>\u5F53\u5B58\u50A8\u7684\u5185\u5BB9\u5927\u4E8E\u6216\u7B49\u4E8E\u5B57\u6BB5\u53EF\u5BB9\u7EB3\u7684\u6700\u5927\u5B57\u7B26\u6570\u65F6\uFF0C\u4E24\u8005\u90FD\u53EA\u5B58\u50A8\u6700\u5927\u5B57\u7B26\u6570\u7684\u5185\u5BB9\uFF0C\u540E\u9762\u7684\u5185\u5BB9\u88AB\u622A\u65AD\u3002\uFF08\u8D85\u51FA\u81EA\u52A8\u622A\u65AD\u7684\u529F\u80FD\u9700\u8981\u5173\u95ED <code>STRICT_TRANS_TABLES</code> \u529F\u80FD\uFF0C\u5426\u5219\u4E0D\u5B58\u50A8\uFF09</li></ul><h3 id="char\u3001varchar\u5B57\u6BB5\u5360\u7528\u5B57\u8282\u6570\u91CF" tabindex="-1"><a class="header-anchor" href="#char\u3001varchar\u5B57\u6BB5\u5360\u7528\u5B57\u8282\u6570\u91CF" aria-hidden="true">#</a> CHAR\u3001VARCHAR\u5B57\u6BB5\u5360\u7528\u5B57\u8282\u6570\u91CF</h3><p>CHAR \u548C VARCHAR \u5360\u7528\u7684\u5B57\u8282\u6570\u91CF\u548C\u5B57\u7B26\u5360\u7528\u5B57\u8282\u6570\u3001\u5B57\u6BB5\u957F\u5EA6\u606F\u606F\u76F8\u5173</p><ul><li><strong>CHAR \u7C7B\u578B\u5B57\u6BB5\u6700\u591A\u5B58\u653E 255 \u4E2A\u5B57\u7B26\uFF0C\u548C\u7F16\u7801\u65E0\u5173</strong></li><li>\u5B57\u7B26\u5360\u7528\u5B57\u8282\u6570\uFF1A<strong>\u4E0D\u540C\u5B57\u7B26\u5360\u636E\u7684\u5B57\u8282\u6570\u4E0D\u540C</strong>\uFF0C\u5047\u8BBE\u4F7F\u7528 utf8mb4 \u5B57\u7B26\u96C6\uFF0C\u6570\u5B57\u3001\u82F1\u6587\u3001\u7B26\u53F7\u5360\u7528 1 \u4E2A\u5B57\u8282\uFF0C\u4E2D\u6587\u5360\u7528 3 \u4E2A\u5B57\u8282\uFF0C\u5176\u4ED6\u4E00\u4E9B emoji \u7B26\u53F7\u3001\u7E41\u4F53\u5B57\u7B49\u9700\u8981\u4F7F\u7528 4 \u4E2A\u5B57\u8282\u3002</li><li>VARCHAR \u6700\u591A\u53EF\u4EE5\u8868\u793A 65535 \u4E2A\u5B57\u8282\uFF0C\u7531\u4E8E VARCHAR \u662F\u4E00\u4E2A\u957F\u5EA6\u53EF\u53D8\u7684\u5B57\u7B26\u4E32\uFF0C\u9700\u8981\u4F7F\u7528\u989D\u5916\u7684\u7A7A\u95F4\u6765<strong>\u5B58\u50A8\u5B57\u6BB5\u957F\u5EA6</strong>\uFF0C\u5F53\u5B57\u6BB5\u957F\u5EA6\u5C0F\u4E8E\u7B49\u4E8E 255 \u5B57\u8282\u65F6\uFF0C\u9700\u8981\u4F7F\u7528 1 \u4E2A\u5B57\u8282\uFF0C\u5F53\u5B57\u6BB5\u957F\u5EA6\u5927\u4E8E 255 \u5B57\u8282\u65F6\uFF0C\u9700\u8981\u4F7F\u7528 2 \u4E2A\u5B57\u8282\u3002</li></ul><h3 id="\u5982\u4F55\u9009\u62E9-2" tabindex="-1"><a class="header-anchor" href="#\u5982\u4F55\u9009\u62E9-2" aria-hidden="true">#</a> \u5982\u4F55\u9009\u62E9</h3><ul><li>\u5C3D\u53EF\u80FD\u4E0D\u9009\u7528 TEXT \u7C7B\u578B\u5B58\u50A8\u5B57\u7B26\u4E32\u3002MySQL \u5185\u5B58\u4E34\u65F6\u8868\u4E0D\u652F\u6301 TEXT \u6570\u636E\u7C7B\u578B\uFF0C\u5982\u679C\u67E5\u8BE2\u4E2D\u5305\u542B\u8FD9\u4E9B\u5217\u5C31\u4E0D\u80FD\u4F7F\u7528\u5185\u5B58\u4E34\u65F6\u8868\uFF0C\u5FC5\u987B\u4F7F\u7528\u78C1\u76D8\u4E34\u65F6\u8868\uFF1B\u5B58\u50A8 TEXT \u7C7B\u578B\u6570\u636E\u65F6\uFF0C\u4E0D\u548C\u884C\u8BB0\u5F55\u5B58\u50A8\u5728\u4E00\u8D77\uFF0C\u800C\u662F\u5728\u78C1\u76D8\u4E2D\u5F00\u8F9F\u53E6\u5916\u7684\u7A7A\u95F4\u5B58\u50A8\uFF0C\u884C\u8BB0\u5F55\u4E2D\u53EA\u5B58\u50A8\u5730\u5740\uFF0C\u6240\u4EE5 TEXT \u7C7B\u578B\u6570\u636E\u8FD8\u8981\u7ECF\u5386\u4E8C\u6B21\u67E5\u8BE2\u3002</li><li>\u5B58\u50A8\u5B9A\u957F\u7684\u5B57\u7B26\u4E32\u65F6\uFF0C\u5C3D\u91CF\u4F7F\u7528 CHAR\uFF0C\u56E0\u4E3A CHAR \u7D22\u5F15\u901F\u5EA6\u975E\u5E38\u5FEB\u3002VARCHAR \u7C7B\u578B\u7684\u6570\u636E\u5728\u67E5\u627E\u65F6\u9700\u8981\u5148\u83B7\u53D6\u6570\u636E\u6BB5\u957F\u5EA6\uFF0C\u7136\u540E\u6309\u957F\u5EA6\u68C0\u7D22\u5185\u5BB9\uFF1BCHAR \u7C7B\u578B\u7684\u6570\u636E\u65E0\u9700\u8BA1\u7B97\u5B57\u6BB5\u957F\u5EA6\uFF0C\u53EA\u9700\u8981\u6309\u90E8\u5C31\u73ED\u5730\u68C0\u7D22</li></ul><h2 id="\u5176\u4ED6\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u5176\u4ED6\u7C7B\u578B" aria-hidden="true">#</a> \u5176\u4ED6\u7C7B\u578B</h2><p>\u5176\u4ED6\u7C7B\u578B\u4E2D\u5305\u542B\u4E8C\u8FDB\u5236\u7C7B\u578B\uFF0C\u5176\u4ED6\u7C7B\u578B\u4E0D\u8BE6\u7EC6\u5C55\u5F00</p><ul><li>tinyblob\uFF0C255\u4E2A\u5B57\u8282</li><li>blob\uFF0C65535\u4E2A\u5B57\u8282</li><li>mediumblob\uFF0C16777215\u4E2A\u5B57\u8282</li><li>longblob\uFF0C4294967295\u4E2A\u5B57\u8282</li></ul><h2 id="\u4E00\u4E9B\u66F4\u666E\u904D\u7684\u89C4\u5219" tabindex="-1"><a class="header-anchor" href="#\u4E00\u4E9B\u66F4\u666E\u904D\u7684\u89C4\u5219" aria-hidden="true">#</a> \u4E00\u4E9B\u66F4\u666E\u904D\u7684\u89C4\u5219</h2><ul><li>\u5728\u6EE1\u8DB3\u9700\u6C42\u7684\u60C5\u51B5\u4E0B\uFF0C\u53EF\u4EE5\u9009\u62E9\u5360\u7528\u7A7A\u95F4\u66F4\u5C0F\u7684\u6570\u636E\u7C7B\u578B\u5C31\u9009\u62E9\u66F4\u5C0F\u7684\uFF0C\u6570\u636E\u7C7B\u578B\u8D8A\u5C0F\uFF0C\u67E5\u8BE2\u3001\u63D2\u5165\u65F6\u5360\u7528\u7684\u8BA1\u7B97\u673A\u8D44\u6E90\u5C31\u8D8A\u5C11</li><li>\u80FD\u4F7F\u7528\u6574\u578B\u5C31\u4E0D\u4F7F\u7528\u5B57\u7B26\u4E32\u7C7B\u578B\uFF0C\u56E0\u4E3A\u6709\u5B57\u7B26\u96C6\u548C\u6392\u5E8F\u89C4\u5219\uFF0C\u4F7F\u5F97\u5B57\u7B26\u4E32\u7C7B\u578B\u6BD4\u6574\u578B\u66F4\u590D\u6742</li></ul><h2 id="\u53C2\u8003\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u94FE\u63A5" aria-hidden="true">#</a> \u53C2\u8003\u94FE\u63A5</h2>',13),I={href:"https://blog.csdn.net/qq_45333238/article/details/125092611",target:"_blank",rel:"noopener noreferrer"},y=a("\u5173\u4E8EMySQL\u4E2D\u7684\u5B57\u6BB5\u957F\u5EA6\u4EE5\u53CA\u5360\u7528\u7A7A\u95F4\u603B\u7ED3"),m={href:"https://joyohub.com/mysql/mysql-string/",target:"_blank",rel:"noopener noreferrer"},R=a("\u3010Mysql\u3011\uFF1A\u641E\u6E05\u695A\u5B57\u7B26\u4E32\u7C7B\u578Bchar\u3001varchar\u3001text - JoyoHub");function _(f,N){const e=i("ExternalLinkIcon");return l(),s("div",null,[o,t("p",null,[c,t("a",u,[T,d(e)])]),p,t("p",null,[b,t("a",A,[M,d(e)])]),E,t("p",null,[t("a",I,[y,d(e)])]),t("p",null,[t("a",m,[R,d(e)])])])}var C=h(n,[["render",_],["__file","MySQL-data-type.html.vue"]]);export{C as default};
