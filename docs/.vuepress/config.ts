import { defineUserConfig } from "vuepress";
import theme from "./theme";

export default defineUserConfig({
  lang: "zh-CN",
  title: "Javrin",
  description: "Javrin 知识库",
  base: "/javrin/",
  theme: theme,
  head: [
    ['link', {rel: 'icon', href: '/javrin/avataaars.ico'}]
  ]
});
