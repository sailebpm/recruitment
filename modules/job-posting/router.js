const path = require('path')

module.exports = function registerModule(moduleOptions) {

    this.nuxt.hook('components:dirs', (dirs) => {
        dirs.push({
            path: path.resolve(__dirname, 'components')
        })
    })

    this.extendRoutes((routes) => {
        routes.unshift(
            {
                name: 'job-posting',
                path: '/job-posting',
                component: path.resolve(__dirname, 'pages/index.vue')
            }
        )
    })
}