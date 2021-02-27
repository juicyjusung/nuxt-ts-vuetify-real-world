import colors from 'vuetify/es5/util/colors';

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - nuxt-vuetify-real-world-app',
    title: 'nuxt-vuetify-real-world-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],
  styleResources: {
    scss: [
      './assets/styles/global.scss', // use underscore "_" & also file extension ".scss"
    ],
  },

  target: 'static',
  ssr: false,
  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/axios-accessor.ts',
    '@/plugins/vee-validate.ts',
    '@/plugins/reflect-metadata.ts',
    '@/plugins/filters.ts',
    { src: '@/plugins/vue-notification.ts', ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    'nuxt-typed-vuex',
    '@nuxtjs/dotenv',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next', '@nuxtjs/style-resources'],

  router: {
    middleware: ['auth'],
  },

  dotenv: {
    systemvars: true,
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'https://conduit.productionready.io/api',
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  server: {
    port: 8000,
  },
  auth: {
    strategies: {
      jwtStrategy: {
        token: {
          property: 'token',
          type: 'Token',
        },
        scheme: '~/utils/AuthJWTScheme.ts',
        endpoints: {
          login: { url: '/users/login', method: 'post' },
          user: { url: '/user', method: 'get' },
          logout: { url: '/logout', method: 'get' },
        },
      },
    },
    redirect: {
      logout: '/',
      home: '/',
      signup: '/',
      login: '/',
    },
    watchLoggedIn: true,
    vuex: false,
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/typed-vuex/, 'vee-validate/dist/rules'],
    extend(config, ctx) {
      config.devtool = ctx.isClient ? 'eval-source-map' : 'inline-source-map';
    },
  },
};
