import { defineConfig } from "vitepress";
import { autoSidebar } from "./sidebars/auto.mjs";
import { roadmapSidebars } from "./sidebars/roadmapSidebars.mts";
import { githubSidebars } from "./sidebars/github.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/acs-docs/",
  title: "ACS Document",
  description: "document for acs student",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "GitHub", link: "/service/github" },
      {
        text: "RoadMap",
        items: [
          { text: "Business Analytics", link: "/service/business" },
          { text: "Developer", link: "/service/developer" },
          { text: "UX/UI", link: "/service/designer" },
          { text: "Data Science / AI", link: "/service/datasci" },
          { text: "Server", link: "/service/server" },
        ],
      },
      {
        text: "POSN",
        link: "/service/posn",
      },
    ],

    sidebar: {
      "/service/github": githubSidebars["/service/github"],
      "/service/roadmap": roadmapSidebars["/service/roadmap"],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
