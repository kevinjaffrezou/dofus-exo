export default {
    target: 'static',
    components: true,
    css: ['~/assets/css/main.scss'],
    buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/style-resources'],
    modules: ['@nuxt/content'],
    styleResources: {
        scss: '~/assets/css/variables.scss'
    },
    head: {
        title: 'Dofus exo',
        link: [{
                rel: 'preconnect',
                href: 'https://fonts.gstatic.com'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap'
            }
        ]
    },
    build: {
        module: {
            exprContextCritical: false // FIX: Critical dependency: the request of a dependency is an expression
        },
        cache: true
    }
}