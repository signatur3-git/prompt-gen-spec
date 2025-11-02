import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Composite Random Prompt Generator",
  description:
    "RFC and specification for a deterministic composite prompt generation ecosystem.",
  srcDir: ".",
  cleanUrls: true,
  markdown: {
    theme: "material-theme-palenight",
    lineNumbers: true,
  },
  themeConfig: {
    nav: [
      { text: "Overview", link: "/" },
      { text: "Architecture", link: "/architecture/components" },
      { text: "Sanity Checks", link: "/sanity-checks/" },
      { text: "Operations", link: "/operations/" },
      { text: "RFC", link: "/rfc/0001-composite-random-prompt-generator" },
    ],
    sidebar: {
      "/architecture/": [
        {
          text: "Architecture",
          items: [{ text: "Components", link: "/architecture/components" }],
        },
      ],
      "/sanity-checks/": [
        {
          text: "Sanity Checks",
          items: [{ text: "Scenarios", link: "/sanity-checks/" }],
        },
      ],
      "/operations/": [
        {
          text: "Operations",
          items: [{ text: "Guide", link: "/operations/" }],
        },
      ],
      "/rfc/": [
        {
          text: "RFCs",
          items: [
            {
              text: "RFC 0001: Composite Random Prompt Generator",
              link: "/rfc/0001-composite-random-prompt-generator",
            },
          ],
        },
      ],
      "/": [
        {
          text: "Guide",
          items: [
            { text: "Introduction", link: "/" },
            { text: "Glossary", link: "/glossary" },
          ],
        },
      ],
    },
  },
});
