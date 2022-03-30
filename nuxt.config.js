const path = require('path')

export default {
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Unfold Quiz | Novu',
    htmlAttrs: {
      lang: 'de',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/novu.png' },
      { rel: 'preconnect', href: 'https://use.typekit.net/', crossorigin: '' },
      { rel: 'dns-prefetch', href: 'https://use.typekit.net/' },
      { rel: 'stylesheet', href: 'https://use.typekit.net/kjp6bci.css' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/app.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vee-validate.js',
    { src: '~/plugins/vue-confetti.js', mode: 'client' },
    '~/plugins/vue-cloudinary-image-statamic.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components',
    '~/components/general',
    '~/components/icons',
    '~/components/pages',
    '~/components/questions',
  ],
  // Ignore file 'nuxt.config.js' from being watched for changes in development
  watchers: {
    webpack: {
      ignored: [path.posix.resolve(__dirname, './.eslintcache')],
    },
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxt/postcss8',
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@teamnovu/nuxt-cloudinary-image',
  ],

  cloudinaryImage: {
    cloudinaryBaseUrl: 'https://res.cloudinary.com/unfold-quiz/image/upload/',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_URL,
  },
  // pwa https://pwa.nuxtjs.org/setup
  pwa: {
    manifest: {
      name: 'novu Quiz',
      short_name: 'novu unfold Quiz',
      lang: 'de',
      description: `Das Quiz für den unfold Event!`,
      useWebmanifestExtension: true,
    },
    icon: false,
    meta: {
      theme_color: '#000000',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    transpile: ['vee-validate/dist/rules'],
  },
  env: {
    appUrl: process.env.APP_URL || 'http://localhost:3000',
  },
}
