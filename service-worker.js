if(!self.define){let e,a={};const s=(s,f)=>(s=new URL(s+".js",f).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(f,i)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(a[d])return;let r={};const c=e=>s(e,d),t={module:{uri:d},exports:r,require:c};a[d]=Promise.all(f.map((e=>t[e]||c(e)))).then((e=>(i(...e),r)))}}define(["./workbox-fa99c014"],(function(e){"use strict";e.setCacheNameDetails({prefix:"Javrin"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"assets/404.edee94b3.js",revision:"e4142bfd1634f2b1e6ada598d3d5aa65"},{url:"assets/404.html.08ec0f00.js",revision:"9d56abb429f71896faf4637c4efa51a1"},{url:"assets/404.html.82bd4b1a.js",revision:"1909068877f44a321d0fdb4f10ad3f43"},{url:"assets/app.93163cad.js",revision:"410399d9182a468f16860775c1b0409a"},{url:"assets/article1.html.66a3e48c.js",revision:"9c993ba08285eb48cf1c266b2933d068"},{url:"assets/article1.html.e698da29.js",revision:"fe89431e93bf8dc5339d81a4ef2e93cc"},{url:"assets/article10.html.2a255e80.js",revision:"cec4f7abe0a5c78b21fa699140ad8e2e"},{url:"assets/article10.html.3ae2787d.js",revision:"3cdd5146c2ef558a6d69a81988ae2519"},{url:"assets/article11.html.880fbc66.js",revision:"b039dee7e3bfad10f1f079729e0182f1"},{url:"assets/article11.html.d40d16f6.js",revision:"fedd78b569f7cc1a582cf0f71e03df5a"},{url:"assets/article12.html.3d02c65f.js",revision:"c3db77e5c859db438f57b5506590b12f"},{url:"assets/article12.html.6731d6ed.js",revision:"aeea04daff1e81a48f9ae6026926961d"},{url:"assets/article2.html.15e93d6c.js",revision:"b41dae91844f71b3b22f5b40e4f22f01"},{url:"assets/article2.html.8a6b1d52.js",revision:"5e8800b9471800f087809d185e88ed23"},{url:"assets/article3.html.0839e6a4.js",revision:"02e707ec3793e34509506c38f79d5cae"},{url:"assets/article3.html.1ebf6760.js",revision:"2a61041c5468f684eb1cc1010a38fac7"},{url:"assets/article4.html.3becb4aa.js",revision:"6d267efb75feffaab05eb7079a4b02de"},{url:"assets/article4.html.a193bc88.js",revision:"aebb5cc361fe1227d532375dee4d1dcf"},{url:"assets/article5.html.411129cc.js",revision:"d1dd7d2b6ff7c95307178160fd52472b"},{url:"assets/article5.html.f69d6194.js",revision:"08a3972a63ee230deab88698cda59f93"},{url:"assets/article6.html.65774f11.js",revision:"8d30e14b5fcf3d5e86947f4bb8aa2a20"},{url:"assets/article6.html.e0265a61.js",revision:"99b7f65ce472ed605ad2367300ab2b5d"},{url:"assets/article7.html.21e35e2f.js",revision:"c1b588c36cce9c2928244e577cad6a2c"},{url:"assets/article7.html.2b7c77a9.js",revision:"add3afcf1c30b267363ab6aa06f59a5c"},{url:"assets/article8.html.076cc183.js",revision:"471ea7a3615e9d31d0b4150dd1d36789"},{url:"assets/article8.html.7d080ad9.js",revision:"7ea6e017e17c6f768ade4a6e8eed066a"},{url:"assets/article9.html.88aaf486.js",revision:"6ae2bdfb8eea4ddbf9a44836f26629cf"},{url:"assets/article9.html.f15efd28.js",revision:"0ea99228957402285ddaa59f3a0ac052"},{url:"assets/Blog.65eaf75c.js",revision:"84b38853ba56b296dc24975da37a1bb1"},{url:"assets/disable.html.1f511b70.js",revision:"b7bcc258c9e4a95d22bd0e56a8b903f0"},{url:"assets/disable.html.a24700e0.js",revision:"de7dd359eb29ba66294977a5bd0e462e"},{url:"assets/encrypt.html.6cd3ede2.js",revision:"7f2b7da3a322cf3a70b834b95eef7a4f"},{url:"assets/encrypt.html.f97380ed.js",revision:"bc5d0af585c569edf3a53f2715deff42"},{url:"assets/giscus.es.b79aa1b4.js",revision:"4e00632894e0113cb12fa9036e17921d"},{url:"assets/home.html.813fbae7.js",revision:"b0d1d3bd25efb20aec7b50ca8801e258"},{url:"assets/home.html.a3463d94.js",revision:"35f4834950ab763b6ee0f46120868f6c"},{url:"assets/index.html.0127a8d1.js",revision:"aa5ea499bab473ef3e576847f1653879"},{url:"assets/index.html.149d33dc.js",revision:"55c95ee5c50da94da541f72792aa654f"},{url:"assets/index.html.1a811f74.js",revision:"c1963b5e311df85683a3faf4469372b3"},{url:"assets/index.html.2718ce39.js",revision:"b7f6e03016a861a502f76a7de07d88a8"},{url:"assets/index.html.2f713335.js",revision:"434aee6e46a143cc40f36b838b267a75"},{url:"assets/index.html.3386ece2.js",revision:"737e0db91a606c58cef1e5b3b748927d"},{url:"assets/index.html.3babb5a0.js",revision:"325fa3235fce123f30df2dd636e4614f"},{url:"assets/index.html.3e84ddcc.js",revision:"b7f6e03016a861a502f76a7de07d88a8"},{url:"assets/index.html.438b3c27.js",revision:"b7f6e03016a861a502f76a7de07d88a8"},{url:"assets/index.html.43dda8c0.js",revision:"95f09e7f0301ce3e66b3d5ca8d662c17"},{url:"assets/index.html.483f95c6.js",revision:"916015d0133f7c2fc7d6c5baeb6a08b4"},{url:"assets/index.html.4b6c2663.js",revision:"b7f6e03016a861a502f76a7de07d88a8"},{url:"assets/index.html.5ad7ff00.js",revision:"9035c0659598d3e67a13812cb2b35086"},{url:"assets/index.html.612f7a7a.js",revision:"3f75049fdf79ae89f67d79e63e3c41d0"},{url:"assets/index.html.63862f8c.js",revision:"b7f6e03016a861a502f76a7de07d88a8"},{url:"assets/index.html.6481cbc9.js",revision:"45fd9b2abf595ac7542894b5ef1f5a8d"},{url:"assets/index.html.652399b3.js",revision:"b7f6e03016a861a502f76a7de07d88a8"},{url:"assets/index.html.773f8323.js",revision:"b7f6e03016a861a502f76a7de07d88a8"},{url:"assets/index.html.79fe6d6e.js",revision:"6c6543ab46ada666dc12c8dd75299dfa"},{url:"assets/index.html.7a2995c4.js",revision:"0e85513ddb5eb860ed2712d2532d96f5"},{url:"assets/index.html.7b31bcea.js",revision:"b7f6e03016a861a502f76a7de07d88a8"},{url:"assets/index.html.806bc409.js",revision:"b7f6e03016a861a502f76a7de07d88a8"},{url:"assets/index.html.83ad6bbd.js",revision:"b7f6e03016a861a502f76a7de07d88a8"},{url:"assets/index.html.92637d35.js",revision:"22264524c60a894ebea4e4d1280fba65"},{url:"assets/index.html.927e30c9.js",revision:"6c99dc57381787577c77885ce105e6dd"},{url:"assets/index.html.9c12383c.js",revision:"b7f6e03016a861a502f76a7de07d88a8"},{url:"assets/index.html.9d199887.js",revision:"b7f6e03016a861a502f76a7de07d88a8"},{url:"assets/index.html.aeb83b9a.js",revision:"b7f6e03016a861a502f76a7de07d88a8"},{url:"assets/index.html.b494ebf7.js",revision:"b7f6e03016a861a502f76a7de07d88a8"},{url:"assets/index.html.b74bbbf6.js",revision:"b7f6e03016a861a502f76a7de07d88a8"},{url:"assets/index.html.b884600c.js",revision:"57b84dda645fa74e0e5a8bdd7fc95ad0"},{url:"assets/index.html.baab3eec.js",revision:"b7f6e03016a861a502f76a7de07d88a8"},{url:"assets/index.html.cf0b512f.js",revision:"0f7edf2dbdab0026edab58d98f8ee7d1"},{url:"assets/index.html.db329f44.js",revision:"ce06edafbbb11623bfdf281d4c28eba3"},{url:"assets/index.html.dcd15e89.js",revision:"119c261cf8eb4bde0f6fa67fae3f8207"},{url:"assets/index.html.dff81633.js",revision:"b7f6e03016a861a502f76a7de07d88a8"},{url:"assets/index.html.e8523cca.js",revision:"7ef42508cebdbed42ce508bf9126ec49"},{url:"assets/index.html.e8952663.js",revision:"a27dfe923ecf755744a801cd44134aaf"},{url:"assets/index.html.f51d3431.js",revision:"b7f6e03016a861a502f76a7de07d88a8"},{url:"assets/index.html.fdf1d341.js",revision:"0a27571797324b504b05e9c96bbc9e70"},{url:"assets/KaTeX_AMS-Regular.0cdd387c.woff2",revision:"66c678209ce93b6e2b583f02ce41529e"},{url:"assets/KaTeX_AMS-Regular.30da91e8.woff",revision:"10824af77e9961cfd548c8a458f10851"},{url:"assets/KaTeX_AMS-Regular.68534840.ttf",revision:"56573229753fad48910bda2ea1a6dd54"},{url:"assets/KaTeX_Caligraphic-Bold.07d8e303.ttf",revision:"497bf407c4c609c6cf1f1ad38f437f7f"},{url:"assets/KaTeX_Caligraphic-Bold.1ae6bd74.woff",revision:"de2ba279933d60f7819ff61f71c17bed"},{url:"assets/KaTeX_Caligraphic-Bold.de7701e4.woff2",revision:"a9e9b0953b078cd40f5e19ef4face6fc"},{url:"assets/KaTeX_Caligraphic-Regular.3398dd02.woff",revision:"a25140fbe6692bffe71a2ab861572eb3"},{url:"assets/KaTeX_Caligraphic-Regular.5d53e70a.woff2",revision:"08d95d99bf4a2b2dc7a876653857f154"},{url:"assets/KaTeX_Caligraphic-Regular.ed0b7437.ttf",revision:"e6fb499fc8f9925eea3138cccba17fff"},{url:"assets/KaTeX_Fraktur-Bold.74444efd.woff2",revision:"796f3797cdf36fcaea18c3070a608378"},{url:"assets/KaTeX_Fraktur-Bold.9163df9c.ttf",revision:"b9d7c4497cab3702487214651ab03744"},{url:"assets/KaTeX_Fraktur-Bold.9be7ceb8.woff",revision:"40934fc076960bb989d590db044fef62"},{url:"assets/KaTeX_Fraktur-Regular.1e6f9579.ttf",revision:"97a699d83318e9334a0deaea6ae5eda2"},{url:"assets/KaTeX_Fraktur-Regular.51814d27.woff2",revision:"f9e6a99f4a543b7d6cad1efb6cf1e4b1"},{url:"assets/KaTeX_Fraktur-Regular.5e28753b.woff",revision:"e435cda5784e21b26ab2d03fbcb56a99"},{url:"assets/KaTeX_Main-Bold.0f60d1b8.woff2",revision:"a9382e25bcf75d856718fcef54d7acdb"},{url:"assets/KaTeX_Main-Bold.138ac28d.ttf",revision:"8e431f7ece346b6282dae3d9d0e7a970"},{url:"assets/KaTeX_Main-Bold.c76c5d69.woff",revision:"4cdba6465ab9fac5d3833c6cdba7a8c3"},{url:"assets/KaTeX_Main-BoldItalic.70ee1f64.ttf",revision:"52fb39b0434c463d5df32419608ab08a"},{url:"assets/KaTeX_Main-BoldItalic.99cd42a3.woff2",revision:"d873734390c716d6e18ff3f71ac6eb8b"},{url:"assets/KaTeX_Main-BoldItalic.a6f7ec0d.woff",revision:"5f875f986a9bce1264e8c42417b56f74"},{url:"assets/KaTeX_Main-Italic.0d85ae7c.ttf",revision:"39349e0a2b366f38e2672b45aded2030"},{url:"assets/KaTeX_Main-Italic.97479ca6.woff2",revision:"652970624cde999882102fa2b6a8871f"},{url:"assets/KaTeX_Main-Italic.f1d6ef86.woff",revision:"8ffd28f6390231548ead99d7835887fa"},{url:"assets/KaTeX_Main-Regular.c2342cd8.woff2",revision:"f8a7f19f45060f7a177314855b8c7aa3"},{url:"assets/KaTeX_Main-Regular.c6368d87.woff",revision:"f1cdb692ee31c10b37262caffced5271"},{url:"assets/KaTeX_Main-Regular.d0332f52.ttf",revision:"818582dae57e6fac46202cfd844afabb"},{url:"assets/KaTeX_Math-BoldItalic.850c0af5.woff",revision:"48155e43d9a284b54753e50e4ba586dc"},{url:"assets/KaTeX_Math-BoldItalic.dc47344d.woff2",revision:"1320454d951ec809a7dbccb4f23fccf0"},{url:"assets/KaTeX_Math-BoldItalic.f9377ab0.ttf",revision:"6589c4f1f587f73f0ad0af8ae35ccb53"},{url:"assets/KaTeX_Math-Italic.08ce98e5.ttf",revision:"fe5ed5875d95b18c98546cb4f47304ff"},{url:"assets/KaTeX_Math-Italic.7af58c5e.woff2",revision:"d8b7a801bd87b324efcbae7394119c24"},{url:"assets/KaTeX_Math-Italic.8a8d2445.woff",revision:"ed7aea12d765f9e2d0f9bc7fa2be626c"},{url:"assets/KaTeX_SansSerif-Bold.1ece03f7.ttf",revision:"f2ac73121357210d91e5c3eaa42f72ea"},{url:"assets/KaTeX_SansSerif-Bold.e99ae511.woff2",revision:"ad546b4719bcf690a3604944b90b7e42"},{url:"assets/KaTeX_SansSerif-Bold.ece03cfd.woff",revision:"0e897d27f063facef504667290e408bd"},{url:"assets/KaTeX_SansSerif-Italic.00b26ac8.woff2",revision:"e934cbc86e2d59ceaf04102c43dc0b50"},{url:"assets/KaTeX_SansSerif-Italic.3931dd81.ttf",revision:"f60b4a34842bb524b562df092917a542"},{url:"assets/KaTeX_SansSerif-Italic.91ee6750.woff",revision:"ef725de572b71381dccf53918e300744"},{url:"assets/KaTeX_SansSerif-Regular.11e4dc8a.woff",revision:"5f8637ee731482c44a37789723f5e499"},{url:"assets/KaTeX_SansSerif-Regular.68e8c73e.woff2",revision:"1ac3ed6ebe34e473519ca1da86f7a384"},{url:"assets/KaTeX_SansSerif-Regular.f36ea897.ttf",revision:"3243452ee6817acd761c9757aef93c29"},{url:"assets/KaTeX_Script-Regular.036d4e95.woff2",revision:"1b3161eb8cc67462d6e8c2fb96c68507"},{url:"assets/KaTeX_Script-Regular.1c67f068.ttf",revision:"a189c37d73ffce63464635dc12cbbc96"},{url:"assets/KaTeX_Script-Regular.d96cdf2b.woff",revision:"a82fa2a7e18b8c7a1a9f6069844ebfb9"},{url:"assets/KaTeX_Size1-Regular.6b47c401.woff2",revision:"82ef26dc680ba60d884e051c73d9a42d"},{url:"assets/KaTeX_Size1-Regular.95b6d2f1.ttf",revision:"0d8d9204004bdf126342605f7bbdffe6"},{url:"assets/KaTeX_Size1-Regular.c943cc98.woff",revision:"4788ba5b6247e336f734b742fe9900d5"},{url:"assets/KaTeX_Size2-Regular.2014c523.woff",revision:"b0628bfd27c979a09f702a2277979888"},{url:"assets/KaTeX_Size2-Regular.a6b2099f.ttf",revision:"1fdda0e59ed35495ebac28badf210574"},{url:"assets/KaTeX_Size2-Regular.d04c5421.woff2",revision:"95a1da914c20455a07b7c9e2dcf2836d"},{url:"assets/KaTeX_Size3-Regular.500e04d5.ttf",revision:"963af864cbb10611ba33267ba7953777"},{url:"assets/KaTeX_Size3-Regular.6ab6b62e.woff",revision:"4de844d4552e941f6b9c38837a8d487b"},{url:"assets/KaTeX_Size4-Regular.99f9c675.woff",revision:"3045a61f722bc4b198450ce69b3e3824"},{url:"assets/KaTeX_Size4-Regular.a4af7d41.woff2",revision:"61522cd3d9043622e235ab57762754f2"},{url:"assets/KaTeX_Size4-Regular.c647367d.ttf",revision:"27a23ee69999affa55491c7dab8e53bf"},{url:"assets/KaTeX_Typewriter-Regular.71d517d6.woff2",revision:"b8b8393d2e65fcebda5fa99fa3264f41"},{url:"assets/KaTeX_Typewriter-Regular.e14fed02.woff",revision:"0e0460587676d22eae09accd6dcfebc6"},{url:"assets/KaTeX_Typewriter-Regular.f01f3e87.ttf",revision:"6bf4287568e1d3004b54d5d60f9f08f9"},{url:"assets/Layout.a4ccf6dc.js",revision:"235eff69564a60eaa46d4f3209f68d97"},{url:"assets/markdown.html.4ea66ce7.js",revision:"7eac48ff40cfebdae2d870dfe7031212"},{url:"assets/markdown.html.6846a12d.js",revision:"c0fcad71906b49b0703812265caca4f5"},{url:"assets/page.html.5ab8c0fb.js",revision:"a94cd9fe4c5236e3ce4a1ba8324f8c0b"},{url:"assets/page.html.dbd332d1.js",revision:"05385ed14b1211861ab21a29e26fc587"},{url:"assets/photoswipe.esm.351abe37.js",revision:"061d11f047773ba6b19d1c9acb8c37b9"},{url:"assets/plugin-vue_export-helper.21dcd24c.js",revision:"b29b145139fc88e89a46af507277557d"},{url:"assets/SkipLink.2865f6b7.js",revision:"4888a1d8ebe00f13a37a324321782b23"},{url:"assets/style.3717b34c.css",revision:"48903165f8aa6788a2dacc903d0b27f4"},{url:"avataaars.svg",revision:"be53aa16e0e34e69157ff417838b8dd7"},{url:"logo.svg",revision:"fa3b50704a05df044847f9ea2e521dfc"},{url:"index.html",revision:"6212cdc1b5ebb5441a86b823bbe395e9"},{url:"404.html",revision:"e08876ef64774fd2222abb4db3e15cee"}],{}),e.cleanupOutdatedCaches()}));
//# sourceMappingURL=service-worker.js.map