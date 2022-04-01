const OG_TITLE = 'Dofus exo | Stockez la liste de vos exos'
const OG_DESCRIPTION = "Historiser l'ensemble de vos exos Dofus en y sauvegardant leurs coûts ainsi que leurs prix de vente afin de calculer le benefice total de vos items."
const OG_IMAGE = 'https://dofus-exo.fr/opengraph.jpg'

export default {
    target: 'static',
    components: true,
    css: ['~/assets/css/main.scss'],
    buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/style-resources'],
    modules: ['@nuxt/http', ['nuxt-tailvue', {
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
        meta: [{
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: OG_DESCRIPTION
            },
            {
                hid: 'twitter:title',
                name: 'twitter:title',
                content: OG_TITLE
            },
            {
                hid: 'twitter:description',
                name: 'twitter:description',
                content: OG_DESCRIPTION
            },
            {
                hid: 'twitter:image',
                name: 'twitter:image',
                content: OG_IMAGE
            },
            {
                hid: 'twitter:card',
                name: 'twitter:card',
                content: "summary_large_image"
            },
            {
                hid: 'twitter:image:alt',
                name: 'twitter:image:alt',
                content: OG_TITLE
            },
            {
                hid: 'og:title',
                property: 'og:title',
                content: OG_TITLE
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content: OG_DESCRIPTION
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content: OG_IMAGE
            },
            {
                hid: 'og:image:secure_url',
                property: 'og:image:secure_url',
                content: OG_IMAGE
            },
            {
                hid: 'og:image:alt',
                property: 'og:image:alt',
                content: OG_TITLE
            },
        ],
        htmlAttrs: {
            lang: 'fr',
        },
        title: OG_TITLE,
        link: [{
                rel: 'preconnect',
                href: 'https://fonts.gstatic.com'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
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