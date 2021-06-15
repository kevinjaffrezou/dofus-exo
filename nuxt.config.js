export default {
    target: 'static',
    components: true,
    css: ['~/assets/css/main.scss'],
    buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/style-resources'],
    modules: ['@nuxt/content', ['nuxt-tailvue', {
        toast: true
    }]],
    plugins: [
        '~/plugins/numberWithSpaces.js',
        {
            src: '~/plugins/dexie.js',
            mode: 'client'
        },
        '~/plugins/download.js'
    ],
    styleResources: {
        scss: '~/assets/css/base/variables.scss'
    },
    head: {
        title: 'Dofus exo',
        link: [{
                rel: 'preconnect',
                href: 'https://fonts.gstatic.com'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Roboto@400;600;700&display=swap'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '96x96',
                href: '/favicon-96x96.png'
            }
        ]
    },
    build: {
        module: {
            exprContextCritical: false // FIX: Critical dependency: the request of a dependency is an expression
        },
        cache: true
    },
    loading: {
        color: '#3f87f3',
        height: '3px'
    }
}