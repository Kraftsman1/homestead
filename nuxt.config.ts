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
      ]
    },
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.BASE_API_URL
    },
  },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],

  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  }
})