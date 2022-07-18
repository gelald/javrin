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

    // footer: "默认页脚",

    copyright: "Copyright © 2022 gelald",

    displayFooter: true,

    pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

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

        comment: {
            /**
             * Using Giscus
             */
            provider: "Giscus",
            repo: "gelald/javrin",
            repoId: "R_kgDOHlwzOg",
            category: "General",
            categoryId: "DIC_kwDOHlwzOs4CP-xX",
            mapping: "url",
            reactionsEnabled: true
        },

        mdEnhance: {
            // 启用下角标功能
            sub: true,
            // 启用上角标
            sup: true,
            // 启用txt语法
            tex: true
        }
    }
});
