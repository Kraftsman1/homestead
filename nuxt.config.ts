// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'DC Engine',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'DC Engine' },
      ],
      noscript: [
        // <noscript>JavaScript is required</noscript>
        { children: 'JavaScript is required' }
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.7.3/dist/alpine.min.js' }
      ],
    },
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.BASE_API_URL
    },
  },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/image', '@pinia-plugin-persistedstate/nuxt', 'nuxt-icon'],

  

  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  }
})