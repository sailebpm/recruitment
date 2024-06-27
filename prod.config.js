require('dotenv').config()
import { resolve, join } from 'path'
const { copySync, removeSync } = require("fs-extra");
import { scrollBehavior } from './utils';
import fs from 'fs'

export default {
  server: {
    hostname : process.env.HOSTNAME || 'localhost',
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
    adg_site: process.env.ADG_SITE,
    hr_site: process.env.HR_SITE,
    fdg_site: process.env.FDG_SITE,
    pdg_site: process.env.PDG_SITE,
    dms_site: process.env.DMS_SITE,
    jp_site: process.env.JP_SITE,
    crr_name: process.env.CRR_NAME,
    login_page: process.env.LOGIN_PAGE,
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
    base: "/jp/",
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
  ], hooks: {
        generate: {
            done(generator) {
                if (generator.nuxt.options.dev === false && generator.nuxt.options.mode === "spa") {
                    const publicDir = join(generator.nuxt.options.rootDir, "jp", "/");
                    removeSync(publicDir);
                    copySync(join(generator.nuxt.options.generate.dir, "/"), publicDir);
                    copySync(join(generator.nuxt.options.generate.dir, "200.html"), join(publicDir, "index.html"));
                    removeSync(generator.nuxt.options.generate.dir);
                }
            },
        },
        build: {
            done(builder) {
                setTimeout(function () {
                    try {
                        console.log("generated htaccess");
                        const extraFilePath = join(builder.nuxt.options.rootDir + "//jp//", ".htaccess");
                        fs.writeFileSync(
                            extraFilePath,
                            `RewriteEngine On\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule ^(.*)$ $1 [L,QSA]\n\nRewriteEngine On\nRewriteBase /\nRewriteRule ^index.html$ - [L]\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteCond %{REQUEST_FILENAME} !-l\nRewriteRule . /index.html [L]\n\n# php -- BEGIN cPanel-generated handler, do not edit\n# Set the “ea-php74” package as the default “PHP” programming language.\n<IfModule mime_module>\nAddHandler application/x-httpd-ea-php74 .php .php7 .phtml\n</IfModule>\n# php -- END cPanel-generated handler, do not edit`
                        );
                    } catch (err) {
                        console.error(err);
                    }
                }, 3000);
            },
        },
    },
}
