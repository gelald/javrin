import{_ as o}from"./plugin-vue_export-helper.21dcd24c.js";import{r as s,o as n,c as l,a as e,b as a,d as t,e as r}from"./app.5c75ae67.js";const h={},c=t('<h1 id="sso" tabindex="-1"><a class="header-anchor" href="#sso" aria-hidden="true">#</a> SSO</h1><h2 id="\u6982\u5FF5" tabindex="-1"><a class="header-anchor" href="#\u6982\u5FF5" aria-hidden="true">#</a> \u6982\u5FF5</h2><p>SSO \u662F Single Sign On \u7684\u7F29\u5199\uFF0C\u610F\u4E3A\u5355\u70B9\u767B\u5F55\uFF0C\u662F\u4E00\u79CD\u601D\u60F3\u3001\u89C4\u8303\uFF0C\u5355\u70B9\u767B\u5F55\u7684\u610F\u601D\u5C31\u662F\u5728\u4E00\u4E2A\u591A\u5E94\u7528\u7684\u7CFB\u7EDF\u4E2D\uFF0C\u7528\u6237\u53EA\u9700\u8981\u767B\u9646\u4E00\u6B21\u5C31\u53EF\u4EE5\u8BBF\u95EE\u4ED6\u6743\u9650\u8303\u56F4\u5185\u7684\u5E94\u7528\uFF0C\u6CE8\u9500\u4E5F\u540C\u6837\u53EA\u9700\u8981\u6CE8\u9500\u4E00\u6B21\uFF0C\u6BD4\u5982\u6DD8\u5B9D\u3001\u5929\u732B\u7B49\u3002</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20221106162900.png" alt=""></p><h2 id="\u5B9E\u73B0\u65B9\u5F0F" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u73B0\u65B9\u5F0F" aria-hidden="true">#</a> \u5B9E\u73B0\u65B9\u5F0F</h2><p>\u65E2\u7136 SSO \u662F\u4E00\u79CD\u62BD\u8C61\u7684\u601D\u60F3\uFF0C\u6211\u4EEC\u5C31\u9700\u8981\u6309\u7167\u5B83\u7684\u601D\u60F3\u6765\u5B9E\u73B0\u5B83\uFF0C\u5728 Java \u4E2D\u53EF\u4EE5\u7406\u89E3\u6210\u662F\u4E00\u4E2A\u63A5\u53E3\uFF0C\u90A3\u4E48 SSO \u5E38\u89C1\u7684\u89E3\u51B3\u65B9\u6848\u6709 OAuth2\u3001CAS\uFF1A</p><ul><li>CAS\uFF1ACAS \u662F Central Authentication Service \u7684\u7F29\u5199\uFF08\u4E2D\u592E\u5F0F\u8BA4\u8BC1\u670D\u52A1\uFF09\uFF0C\u8BE5\u670D\u52A1\u662F<strong>\u4E3A\u5E94\u7528\u63D0\u4F9B\u53EF\u4FE1\u8EAB\u4EFD\u8BA4\u8BC1\u7684\u5355\u70B9\u767B\u5F55\u7CFB\u7EDF</strong>\u3002CAS \u5305\u542B\u4E24\u4E2A\u90E8\u5206\uFF1A CAS Server \u548C CAS Client\u3002CAS Server \u9700\u8981\u72EC\u7ACB\u90E8\u7F72\uFF0C\u4E3B\u8981\u8D1F\u8D23\u5BF9\u7528\u6237\u7684\u8BA4\u8BC1\u5DE5\u4F5C\uFF1BCAS Client \u8D1F\u8D23\u5904\u7406\u5BF9\u5BA2\u6237\u7AEF\u53D7\u4FDD\u62A4\u8D44\u6E90\u7684\u8BBF\u95EE\u8BF7\u6C42\uFF0C\u9700\u8981\u767B\u5F55\u65F6\uFF0C\u91CD\u5B9A\u5411\u5230 CAS Server\u3002</li><li>OAuth2\uFF1AOAuth2 \u662F Open Authority \u7684\u7F29\u5199\uFF0C\u662F\u4E00\u79CD\u6388\u6743\u673A\u5236\u3002\u6570\u636E\u7684\u6240\u6709\u8005\u544A\u8BC9\u7CFB\u7EDF\uFF0C\u540C\u610F\u6388\u6743\u7B2C\u4E09\u65B9\u5E94\u7528\u8FDB\u5165\u7CFB\u7EDF\uFF0C\u83B7\u53D6\u8FD9\u4E9B\u6570\u636E\u3002\u7CFB\u7EDF\u4ECE\u800C\u4EA7\u751F\u4E00\u4E2A\u77ED\u671F\u7684\u8FDB\u5165\u4EE4\u724C\uFF08\u4E00\u822C\u4F1A\u4F7F\u7528 JWT \u7684\u65B9\u5F0F\u6765\u627F\u8F7D\u7528\u6237\u7684 Access_Token\uFF09\uFF0C\u7528\u6765\u4EE3\u66FF\u5BC6\u7801\uFF0C\u4F9B\u7B2C\u4E09\u65B9\u5E94\u7528\u4F7F\u7528\u3002\u5177\u4F53\u4F8B\u5B50\u662F\uFF1A\u53EF\u4EE5\u4F7F\u7528\u5FAE\u4FE1\u8D26\u53F7\u6765\u767B\u9646\u4EAC\u4E1C\u5E94\u7528\u3002</li></ul><h2 id="cas-\u8BA4\u8BC1\u6D41\u7A0B" tabindex="-1"><a class="header-anchor" href="#cas-\u8BA4\u8BC1\u6D41\u7A0B" aria-hidden="true">#</a> CAS \u8BA4\u8BC1\u6D41\u7A0B</h2><p>\u4EE5\u4E0B\u662F CAS \u5B98\u7F51\u7684\u6D41\u7A0B\u56FE</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20221107145356.png" alt=""></p><h3 id="\u540D\u8BCD\u89E3\u91CA" tabindex="-1"><a class="header-anchor" href="#\u540D\u8BCD\u89E3\u91CA" aria-hidden="true">#</a> \u540D\u8BCD\u89E3\u91CA</h3><ul><li>TGT\uFF1A\u5168\u540D\u662F Ticket Granted Ticket\uFF0C\u610F\u4E3A\u7968\u6839\uFF0C\u5F53\u7528\u6237\u767B\u5F55\u6210\u529F CAS Server \u521B\u5EFA\uFF0C\u53EF\u4EE5\u53EF\u4EE5\u7B7E\u53D1 ST</li><li>TGC\uFF1A\u5168\u540D\u662F Ticket Granted Cookie\uFF0C\u6D4F\u89C8\u5668 cookie \u4E2D CASTGC\u7684\u503C\uFF0CCAS Server \u521B\u5EFA TGT \u540E\uFF0C\u4F1A\u5728cookie\u4E2D\u653E\u5165 TGC\uFF0C\u53EF\u4EE5\u901A\u8FC7 TGC \u6765\u627E\u5230 TGT</li><li>ST\uFF1A\u5168\u540D\u662F Service Ticket\uFF0C\u610F\u4E3A\u7968\u636E\uFF0C\u7531 TGT \u751F\u6210\uFF0C\u662F\u5177\u4F53\u4E1A\u52A1\u670D\u52A1\u7684\u7968\u636E</li></ul><h3 id="\u5355\u70B9\u767B\u5F55\u7684\u6838\u5FC3\u6D41\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u5355\u70B9\u767B\u5F55\u7684\u6838\u5FC3\u6D41\u7A0B" aria-hidden="true">#</a> \u5355\u70B9\u767B\u5F55\u7684\u6838\u5FC3\u6D41\u7A0B</h3><ol><li>\u7528\u6237\u7B2C\u4E00\u6B21\u8BBF\u95EE\u4E1A\u52A1\u7CFB\u7EDF\uFF0C\u4E1A\u52A1\u7CFB\u7EDF\u53D1\u73B0\u672C\u6B21\u8BF7\u6C42\u7684 cookie \u4E2D\u6CA1\u6709 sessionid\uFF0C\u4E5F\u6CA1\u6709 ST\uFF0C\u91CD\u5B9A\u5411\u5230 CAS \u8BA4\u8BC1\u4E2D\u5FC3</li><li>CAS \u8BA4\u8BC1\u4E2D\u5FC3\u53D1\u73B0\u672C\u6B21\u8BF7\u6C42\u7684 cookie \u4E2D\u6CA1\u6709 TGC\uFF0C\u4E8E\u662F\u5C55\u793A\u767B\u5F55\u9875\u9762</li><li>\u7528\u6237\u5728\u6D4F\u89C8\u5668\u5B8C\u6210\u767B\u5F55\u64CD\u4F5C\uFF0C\u63D0\u4EA4\u7ED9 CAS Server \u5B8C\u6210\u5BC6\u7801\u6821\u9A8C\u5DE5\u4F5C</li><li>CAS Server \u9A8C\u8BC1\u7528\u6237\u4FE1\u606F\u540E\uFF0C\u521B\u5EFA TGT\uFF0C\u5E76\u5C06 TGT \u7684 id \u5199\u5165\u5230 cookie \u4E2D\u7684 CASTGC \u5C5E\u6027\u4E2D\uFF0C\u540C\u65F6\u751F\u6210\u4E00\u4E2A ST \u8BA9\u7528\u6237\u91CD\u5B9A\u5411\u5230\u4E1A\u52A1\u7CFB\u7EDF</li><li>\u4E1A\u52A1\u7CFB\u7EDF\u6536\u5230\u8BF7\u6C42\u540E\uFF0C\u53D1\u73B0\u672C\u6B21\u8BF7\u6C42\u7684 cookid \u6CA1\u6709 sessionid\uFF0C\u4F46\u662F\u6709 ST\uFF0C\u53BB CAS \u8BA4\u8BC1\u4E2D\u5FC3\u9A8C\u8BC1 ST \u7684\u6709\u6548\u6027\uFF0C\u5982\u679C\u6709\u6548\u5C31\u521B\u5EFA session\uFF0C\u5E76\u628A sessionid \u653E\u5230cookie \u4E2D</li><li>\u6B64\u540E\u6D4F\u89C8\u5668\u6BCF\u4E00\u4E2A\u8BF7\u6C42\u90FD\u4F1A\u5E26\u4E0A\u8FD9\u4E2A cookie \u6765\u8BF7\u6C42\uFF0C\u4E1A\u52A1\u670D\u52A1\u4F1A\u6839\u636E cookie \u4E2D\u7684 sessionid \u6765\u83B7\u53D6\u5BF9\u5E94\u7684 session\uFF0C\u5224\u5B9A\u7528\u6237\u5DF2\u767B\u5F55\uFF0C\u5C31\u628A\u8D44\u6E90\u8FD4\u56DE\u7ED9\u6D4F\u89C8\u5668</li></ol><h3 id="\u8BBF\u95EE\u53E6\u4E00\u4E2A\u7CFB\u7EDF\u6D41\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u8BBF\u95EE\u53E6\u4E00\u4E2A\u7CFB\u7EDF\u6D41\u7A0B" aria-hidden="true">#</a> \u8BBF\u95EE\u53E6\u4E00\u4E2A\u7CFB\u7EDF\u6D41\u7A0B</h3><ol><li>\u4E1A\u52A1\u7CFB\u7EDFB\u53D1\u73B0\u672C\u6B21\u8BF7\u6C42\u4E2D\u7684 cookie \u91CC\u7684 sessionid \u627E\u4E0D\u5230 session\uFF0C\u4F46\u662F\u770B\u5230 cookie \u4E2D\u6709 TGC\uFF0C\u90A3\u4E48\u4F1A\u53BB CAS \u8BA4\u8BC1\u4E2D\u5FC3\u9A8C\u8BC1 TGC \u7684\u6709\u6548\u6027</li><li>CAS \u8BA4\u8BC1\u4E2D\u5FC3\u53D1\u73B0\u672C\u6B21\u8BF7\u6C42\u4E2D\u7684 cookie \u91CC\u6709CASTGC\uFF0C\u5176\u4E2D\u8BB0\u5F55\u4E86 TGT \u7684 id\uFF0C\u6240\u4EE5\u4F1A\u751F\u6210\u4E00\u4E2A ST \u8BA9\u7528\u6237\u91CD\u5B9A\u5411\u5230\u4E1A\u52A1\u7CFB\u7EDFB</li><li>\u4E1A\u52A1\u7CFB\u7EDFB\u6536\u5230\u8BF7\u6C42\u540E\uFF0C\u53D1\u73B0\u6709 ST\uFF0C\u53BB CAS \u8BA4\u8BC1\u4E2D\u5FC3\u9A8C\u8BC1 ST \u7684\u6709\u6548\u6027\uFF0C\u53D1\u73B0\u6709\u6548\uFF0C\u521B\u5EFA session\uFF0C\u5E76\u628A sessionid \u653E\u5230 cookie \u4E2D</li><li>\u6B64\u540E\u7528\u6237\u5C31\u7528\u8FD9\u4E2A sessionid \u548C\u4E1A\u52A1\u7CFB\u7EDFB\u8FDB\u884C\u901A\u4FE1</li></ol><h3 id="\u5355\u70B9\u767B\u51FA\u6838\u5FC3\u6D41\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u5355\u70B9\u767B\u51FA\u6838\u5FC3\u6D41\u7A0B" aria-hidden="true">#</a> \u5355\u70B9\u767B\u51FA\u6838\u5FC3\u6D41\u7A0B</h3><ol><li>\u7528\u6237\u5728\u4E1A\u52A1\u7CFB\u7EDFA\u4E2D\u9000\u51FA\u767B\u5F55\uFF0C\u4E1A\u52A1\u7CFB\u7EDFA\u5220\u9664 session\uFF0C\u5E76\u628A cookie \u4E2D\u7684 sessionid \u5220\u6389</li><li>\u4E1A\u52A1\u7CFB\u7EDFA\u901A\u77E5 CAS \u8BA4\u8BC1\u4E2D\u5FC3\u7528\u6237\u9000\u51FA\u767B\u5F55\u4E86</li><li>CAS \u8BA4\u8BC1\u4E2D\u5FC3\u5220\u9664 TGT\uFF0C\u5E76\u628A cookie \u4E2D\u7684 CASTGC \u5220\u6389</li><li>CAS \u8BA4\u8BC1\u4E2D\u5FC3\u901A\u77E5\u5176\u4ED6\u8FD9\u4E2A\u7528\u6237\u8BBF\u95EE\u8FC7\u7684\u5E94\u7528</li><li>\u5176\u4ED6\u5E94\u7528\u5220\u9664 session\uFF0C\u5E76\u6E05\u9664\u7528\u6237 cookie \u4E2D\u7684 sessionid</li></ol><h2 id="oauth2-\u8BA4\u8BC1\u6D41\u7A0B" tabindex="-1"><a class="header-anchor" href="#oauth2-\u8BA4\u8BC1\u6D41\u7A0B" aria-hidden="true">#</a> OAuth2 \u8BA4\u8BC1\u6D41\u7A0B</h2><p>\u4EE5\u4E0B\u662F OAuth2 \u7684\u6D41\u7A0B\u56FE</p><p><img src="https://wingbun-notes-image.oss-cn-guangzhou.aliyuncs.com/images/20221108130302.png" alt=""></p><h3 id="\u89D2\u8272\u89E3\u91CA" tabindex="-1"><a class="header-anchor" href="#\u89D2\u8272\u89E3\u91CA" aria-hidden="true">#</a> \u89D2\u8272\u89E3\u91CA</h3><ul><li>Client\uFF1A\u8C03\u7528\u8D44\u6E90\u670D\u52A1\u5668API\u7684\u5BA2\u6237\u7AEF</li><li>User\uFF1A\u8D44\u6E90\u62E5\u6709\u8005\uFF0C\u4E5F\u5C31\u662F\u7528\u6237</li><li>Authorization Server\uFF1A\u8BA4\u8BC1\u670D\u52A1\u5668\uFF0C\u8FDB\u884C\u8BA4\u8BC1\u548C\u6388\u6743</li><li>Resource Server\uFF1A\u8D44\u6E90\u670D\u52A1\u5668\uFF0C\u4FDD\u62A4\u53D7\u4FDD\u62A4\u7684\u8D44\u6E90</li></ul><p>\u4E3E\u4F8B\u9610\u8FF0\u8FD9\u4E2A\u51E0\u4E2A\u89D2\u8272\uFF0C\u6BD4\u5982\u73B0\u5728\u4EAC\u4E1C\u53EF\u4EE5\u4F7F\u7528\u5FAE\u4FE1\u8FDB\u884C\u767B\u5F55\uFF08\u4EAC\u4E1C\u53EF\u4EE5\u4F7F\u7528\u5FAE\u4FE1\u63D0\u4F9B\u7684\u4E00\u4E2A\u5FAE\u4FE1\u7528\u6237\u552F\u4E00\u6807\u8BC6\u7B26openId\u4F5C\u4E3A\u81EA\u5DF1\u7528\u6237\u7684\u5176\u4E2D\u4E00\u4E2A\u6807\u8BC6\uFF09\uFF0C\u4EAC\u4E1C\u8981\u83B7\u53D6\u8FD9\u4E2A\u6807\u8BC6\u7B26\uFF0C\u9700\u8981\u5FAE\u4FE1\u540C\u610F\uFF0C\u5FAE\u4FE1\u540C\u610F\u7684\u524D\u63D0\u662F\u83B7\u5F97\u7528\u6237\u7684\u6388\u6743\uFF0C\u7528\u6237\u6388\u6743\u540E\uFF0C\u4EAC\u4E1C\u5C31\u80FD\u5B8C\u6210\u901A\u8FC7\u5FAE\u4FE1\u767B\u5F55\u4E86\u3002\u5982\u679C\u6B64\u65F6\u4EAC\u4E1C\u8FD8\u9700\u8981\u83B7\u53D6\u5FAE\u4FE1\u597D\u53CB\u5173\u7CFB\u7B49\u4FE1\u606F\uFF0C\u9700\u8981\u62FF\u7740\u767B\u5F55\u540E\u5FAE\u4FE1\u6388\u4E88\u7684\u4EE4\u724C\u53BB\u8BF7\u6C42\uFF0C\u5426\u5219\u65E0\u6CD5\u901A\u8FC7\u5FAE\u4FE1\u7684\u6743\u9650\u6821\u9A8C\u3002</p><p>\u8FD9\u5176\u4E2D Client \u662F\u4EAC\u4E1CApp\uFF0CUser \u662F\u4F7F\u7528\u5FAE\u4FE1\u767B\u5F55\u4EAC\u4E1C\u7684\u7528\u6237\uFF0CAuthorization Server \u662F\u5FAE\u4FE1\u7684\u8BA4\u8BC1\u670D\u52A1\u5668\uFF0CResource Server \u662F\u5FAE\u4FE1\u7684\u8D44\u6E90\u670D\u52A1\u5668\u3002</p><h3 id="\u5355\u70B9\u767B\u5F55\u7684\u6838\u5FC3\u6D41\u7A0B-1" tabindex="-1"><a class="header-anchor" href="#\u5355\u70B9\u767B\u5F55\u7684\u6838\u5FC3\u6D41\u7A0B-1" aria-hidden="true">#</a> \u5355\u70B9\u767B\u5F55\u7684\u6838\u5FC3\u6D41\u7A0B</h3><ol><li>\u7528\u6237\u6253\u5F00\u4EAC\u4E1C\u5BA2\u6237\u7AEF\u540E\uFF0C\u5BA2\u6237\u7AEF\u5411\u7528\u6237\u7533\u8BF7\u6388\u6743</li><li>\u7528\u6237\u5728\u5FAE\u4FE1\u7AEF\u540C\u610F\u7ED9\u4E88\u4EAC\u4E1C\u5BA2\u6237\u7AEF\u6388\u6743</li><li>\u4EAC\u4E1C\u5BA2\u6237\u7AEF\u62FF\u7740\u7528\u6237\u7ED9\u4E88\u7684\u6388\u6743\u5411\u5FAE\u4FE1\u8BA4\u8BC1\u670D\u52A1\u5668\u8FDB\u884C\u8BA4\u8BC1</li><li>\u8BA4\u8BC1\u670D\u52A1\u5668\u5B8C\u6210\u8BA4\u8BC1\uFF0C\u7ED9\u4E88\u4EAC\u4E1C\u5BA2\u6237\u7AEF\u4EE4\u724C\uFF08Access Token\uFF09</li><li>\u6B64\u540E\u4EAC\u4E1C\u9700\u8981\u518D\u5411\u5FAE\u4FE1\u7AEF\u83B7\u53D6\u5176\u4ED6\u4FE1\u606F\u5C31\u9700\u8981\u4F7F\u7528\u8FD9\u4E2A\u4EE4\u724C</li><li>\u5FAE\u4FE1\u8D44\u6E90\u670D\u52A1\u5668\u6821\u9A8C\u4EE4\u724C\u5408\u6CD5\u6027\uFF0C\u5982\u679C\u5408\u6CD5\u5219\u653E\u884C</li></ol><h2 id="\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a> \u603B\u7ED3</h2><p>\u5728\u4EE5\u524D\uFF0C\u6211\u7ECF\u5E38\u4F1A\u628A SSO \u548C OAuth2 \u6DF7\u4E3A\u4E00\u8C08\uFF0C\u5728\u4E86\u89E3\u8FC7\u540E\u624D\u53D1\u73B0 SSO \u5176\u5B9E\u662F\u4E00\u79CD\u8BA4\u8BC1\u601D\u60F3\uFF0C\u800C OAuth2 \u662F\u5176\u4E00\u79CD\u5E38\u89C1\u7684\u89E3\u51B3\u65B9\u6848\uFF0C\u800CSpring Security OAuth2 \u662F Spring Security \u548C OAuth2 \u6574\u5408\u8D77\u6765\u7684\u843D\u5730\u4EA7\u54C1\uFF1B\u53E6\u5916\u8FD8\u6709 CAS \u8FD9\u79CD\u5B9E\u73B0\u65B9\u5F0F\uFF0C\u4E86\u89E3\u8FC7 CAS \u6846\u67B6\u89C9\u5F97\u670D\u52A1\u90E8\u7F72\u548C\u914D\u7F6E\u66F4\u52A0\u590D\u6742\uFF0C\u4E0D\u592A\u6613\u4E8E\u4E0A\u624B\uFF0C\u5F53\u7136\u76EE\u524D\u4E5F\u6709\u5F88\u591A\u7684\u7CFB\u7EDF\u5728\u4F7F\u7528CAS\uFF0C\u5728\u9009\u62E9\u7684\u65F6\u5019\u5F00\u53D1\u8005\u6839\u636E\u8FD9\u4E9B\u533A\u522B\u548C\u590D\u6742\u7A0B\u5EA6\u53BB\u51B3\u7B56\u3002\u6211\u4E2A\u4EBA\u504F\u5411\u4E8E\u4F7F\u7528 OAuth2\uFF0C\u56E0\u4E3A\u4ED6\u8FD8\u53EF\u4EE5\u6388\u6743\u4E00\u4E2A\u7B2C\u4E09\u65B9\u5E94\u7528\u8BBF\u95EE\u4E00\u4E9B\u53D7\u4FDD\u62A4\u7684\u8D44\u6E90\uFF0C\u6388\u6743\u65B9\u5F0F\u66F4\u591A\u6837\uFF0C\u80FD\u6EE1\u8DB3\u66F4\u591A\u7684\u5E94\u7528\u573A\u666F\u3002</p><p>\u53C2\u8003\u8D44\u6E90\uFF1A</p>',30),d={href:"https://ximeneschen.blog.csdn.net/article/details/115182080",target:"_blank",rel:"noopener noreferrer"},S=r("SSO\u5355\u70B9\u767B\u5F55\u548COAuth2.0\u7684\u533A\u522B\u548C\u7406\u89E3"),u={href:"https://blog.csdn.net/qq_32650789/article/details/124879861",target:"_blank",rel:"noopener noreferrer"},A=r("CAS\u5B9E\u73B0SSO\u5168\u6D41\u7A0B\u6559\u7A0B--\u57FA\u672C\u539F\u7406\u548C\u670D\u52A1\u7AEF\u914D\u7F6E\uFF08CAS\u96C6\u6210JDBC,LDAP\uFF09");function C(p,T){const i=s("ExternalLinkIcon");return n(),l("div",null,[c,e("p",null,[e("a",d,[S,a(i)])]),e("p",null,[e("a",u,[A,a(i)])])])}var _=o(h,[["render",C],["__file","SSO.html.vue"]]);export{_ as default};
