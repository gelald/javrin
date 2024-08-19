import {hopeTheme} from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default hopeTheme({
    hostname: "https://gelald.github.io/javrin/",

    author: {
        name: "gelald",
        url: "https://github.com/gelald"
    },

    iconAssets: "fontawesome-with-brands",

    logo: "/logo.svg",

    repo: "gelald/javrin",

    docsDir: "docs",

    // navbar
    navbar: navbar,

    // sidebar
    sidebar: sidebar,

    displayFooter: true,

    pageInfo: ["Author", "Original", "Date", "Category", "Tag", "Word", "ReadingTime"],

    plugins: {

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
            katex: true
        }
    }
});
