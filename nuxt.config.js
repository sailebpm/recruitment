require('dotenv').config()
import { resolve } from 'path'
import { scrollBehavior } from './utils';
import fs from 'fs'

export default {
  server: {
    hostname : process.env.HOSTNAME || 'localhost',
    port: process.env.APP_PORT,
    https: {
      key: fs.readFileSync(resolve(process.env.KEY_PATH, process.env.HOSTNAME + '.key')),
      cert: fs.readFileSync(resolve(process.env.CERT_PATH, process.env.HOSTNAME + '.crt'))
    }
  },
  env: {
    apiUrl: process.env.API_URL || process.env.APP_URL + '/api',
    appName: process.env.APP_NAME || 'STI - Project Frontend Template',
    appLocale: process.env.APP_LOCALE || 'en',
    githubAuth: !!process.env.GITHUB_CLIENT_ID
  },
  publicRuntimeConfig: {
    adg : process.env.ADG_URL || 'https://nkti.test:3001',
    hr : process.env.HR_URL || 'https://hr.nkti.test:3002',
    fdg : process.env.FDG_URL || 'https://fdg.nkti.test:3003',
    pdg : process.env.PDG_URL || 'https://pdg.nkti.test:3004',
    dms : process.env.DMS_URL || 'https://dms.nkti.test:3005',
    jp : process.env.JP_URL || 'https://jp.nkti.test:3006',
    axios: {
      baseURL: 'https://api.nuxtjs.dev'
    }
  },
  head: {
      title: process.env.APP_NAME,
      titleTemplate: '%s | ' + process.env.APP_NAME,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Nuxt Starter Pack exclusive only for Suiterus Technologies Inc.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
      ]
  },
  loading: {
    color: '#fff'
  },
  ssr: false,
  srcDir: __dirname,
  css: [
    { src: '~assets/sass/app.scss', lang: 'scss' },
    { src: '~assets/toast/theme-sugar.css', lang: 'css' }
  ],
  router: {
    mode: 'hash',
    middleware: ['locale', 'check-auth'],
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'index',
        path: '/',
        redirect: '/job-posting'
      })
    },
    scrollBehavior
  },
  plugins: [
    '~plugins/i18n',
    '~plugins/vform',
    '~plugins/axios',
    '~plugins/nuxt-client-init',
    '~utils/navigations',
    '~plugins/main.js'
  ],
  build: {
    extractCSS: true
  },
  modules: [
      '@nuxtjs/router',
      '@nuxtjs/vuetify',
      '~/modules/job-posting/router.js',
      '~/modules/application/router.js',
  ],
}