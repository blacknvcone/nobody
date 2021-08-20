import colors from 'vuetify/es5/util/colors'
import path from 'path'

export default {
  server: {
    port: process.env.LISTEN_PORT || 27180,
    host: process.env.LISTEN_HOST || 'localhost',
  },
  env: {
    baseUrl:
      process.env.SITE_BASE_URL || 'http://local.dev.kano.app:27100/adalink/',
    browser: true,
    node: true,
  },
  router: {
    base: '/',
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Nobody',
    title: 'Portofolio',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/cookie.js',
    '~/plugins/axios.js',
    '~/plugins/tool.js',
    '~/plugins/directives',
    { src: '~/plugins/apex', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['cookie-universal-nuxt', { alias: 'cookie' }],
    '@nuxtjs/axios',
    '@nuxtjs/moment',
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#1976d2',
          accent: colors.grey.darken3,
          secondary: '#004ba0',
          info: '#3AABCE',
          warning: '#F0AD28',
          error: '#B52912',
          success: colors.green.accent3,
        },
      },
    },
  },

  // other configs
  axios: {
    baseURL: process.env.SITE_API_URL || 'https://local.dev.kano.app:27100/v1/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config.resolve.alias['@shared'] = path.resolve(__dirname, '../_shared')
    },
  },
}
