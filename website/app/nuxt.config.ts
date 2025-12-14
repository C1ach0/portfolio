// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/",
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Maxence Bessi - FullStack Developer",
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg"
        },
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png"
        }
      ],
      meta: [
        { name: "description", content: "Maxence Bessi, développeur passionné, spécialisé dans la création d'applications et l'exploration de technologies variées pour proposer des solutions performantes et innovantes." },
        { name: "theme-color", content: "#f43f5e" }
      ],
    }
  },
  devtools: { enabled: true },
  devServer: {
    port: 5173
  },
  srcDir: "src/",
  css: [
    "./assets/main.css",
    "intro.js/introjs.css"
  ],
  modules: ["@nuxt/ui", "nuxt-og-image"],
  ui: {
    colorMode: true,
  }
  // ogImage: {
  //   defaults: {
  //     cacheMaxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
  //   }
  // }
})
