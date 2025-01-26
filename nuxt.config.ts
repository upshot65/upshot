// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
  ],
  supabase: {
    redirect: false,
  },
  css: ["@fortawesome/fontawesome-free/css/all.min.css"],
  runtimeConfig: {
    // Server-side only
    user: process.env.EMAIL_USER, // Email is now taken from environment variables
    pass: process.env.EMAIL_PASS, // Password is now taken from environment variables
    // Exposed to client and server
    public: {
      publicApiKey: process.env.PUBLIC_API_FOR_EMAIL,
    },
  },
});
