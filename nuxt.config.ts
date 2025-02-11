import { fetchArticles } from "./utils/fetchArticles";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/sitemap",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
  ],

  router: {
    options: {
      middleware: ["loadStoreData.global"],
    },
  },
  nitro: {
    prerender: {
      ignore: ["/admin/category"], // Ignore this route from prerendering
    },
  },
  site: {
    url: "https://upshotbrandmedia.com", // Replace with your actual domain
  },
  sitemap: {
    siteUrl: "https://www.upshotbrandmedia.com", // Replace with your actual domain
    debug: true,
    autoLastmod: true,
    exclude: ["/admin/**", "/admin"],
   /* urls: async () => {
      const articles = await fetchArticles();
      return articles.map((article) => ({
        loc: `/articles/${article.id}-${generateSlug(article.title)}`,
        lastmod: article.updated_at,
      }));
    },*/
  },
  supabase: {
    redirect: false,
  },
  vite: {
    build: {
      rollupOptions: {
        external: [
          "@vueup/vue-quill",
          "@vueup/vue-quill/dist/vue-quill.snow.css",
        ],
      },
    },
  },

  css: ["@fortawesome/fontawesome-free/css/all.min.css"],
  runtimeConfig: {
    // Server-side only
    user: process.env.EMAIL_USER, // Email is now taken from environment variables
    pass: process.env.EMAIL_PASS, // Password is now taken from environment variables
    // Exposed to client and server
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_KEY,
    },
  },
});
function generateSlug(title: string) {
  if (!title) {
    return "";
  }
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace spaces and special characters with dashes
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing dashes
}
