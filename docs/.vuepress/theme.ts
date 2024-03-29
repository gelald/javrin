// @ts-ignore
import {hopeTheme} from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default hopeTheme({
    hostname: "https://gelald.github.io/javrin/",

    author: {
        name: "gelald",
        url: "https://github.com/gelald"
    },

    iconAssets: "iconfont",

    logo: "/logo.svg",

    repo: "gelald/javrin",

    docsDir: "demo/src",

    // navbar
    navbar: navbar,

    // sidebar
    sidebar: sidebar,

    displayFooter: true,

    pageInfo: ["Author", "Original", "Date", "Category", "Tag", "Word", "ReadingTime"],

    blog: {
        description: "一个Java后台开发者",
        // intro: "/intro.html",
        medias: {
            GitHub: "https://github.com/gelald"
        }
    },

    plugins: {
        blog: {
            autoExcerpt: true,
        },

        copyright: {
            author: "gelald",
            license: "MIT Licensed"
        },

        // autoCatalog: false,

        comment: {
            /**
             * Using Giscus
             */
            provider: "Giscus",
            repo: "gelald/javrin",
            repoId: "R_kgDOHlwzOg",
            category: "Announcements",
            categoryId: "DIC_kwDOHlwzOs4CP-xW",
            mapping: "url",
            reactionsEnabled: true
        },

        mdEnhance: {
            // 启用下角标功能
            sub: true,
            // 启用上角标
            sup: true,
            // 启用txt语法
            katex: true,
            // 使用相对路径时不检查
            checkLinks: {
                status: "never"
            }
        }
    }
});
