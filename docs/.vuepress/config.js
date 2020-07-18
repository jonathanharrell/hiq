module.exports = {
    title: 'HiQ',
    description: 'Jump-start your styling with a lightweight, easily customizable framework that is built with CSS custom properties and modern best practices.',
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],
        ['link', { rel: 'shortcut icon', href: '/icons/favicon.ico' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#ffffff' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' }],
        ['link', { rel: 'icon', type: 'image/png', size: '32x32', href: '/icons/favicon-32x32.png' }],
        ['link', { rel: 'icon', type: 'image/png', size: '16x16', href: '/icons/favicon-16x16.png' }],
        ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/mstile-150x150.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#ffffff' }]
    ],
    base: '/hiq/',
    ga: 'UA-106163304-3',
    serviceWorker: true,
    themeConfig: {
        repo: 'jonathanharrell/hiq',
        editLinks: true,
        docsDir: 'docs',
        logo: '/hiq-logo.svg',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: [
            {
                text: 'Guide',
                link: '/guide/',
            },
            {
                text: 'Reference',
                link: '/reference/'
            },
            {
                text: 'Theme Builder',
                link: 'https://hiq-theme-builder.netlify.com/'
            }
        ],
        sidebar: {
            '/guide/': genGuideSidebarConfig('Guide'),
            '/reference/': genReferenceSidebarConfig('Reference')
        }
    },
    plugins: [
        [
            'vuepress-plugin-container',
            {
                type: 'tip',
                defaultTitle: {
                    '/': 'TIP'
                },
            },
        ],
        [
            'vuepress-plugin-container',
            {
                type: 'warning',
                defaultTitle: {
                    '/': 'WARNING'
                },
            },
        ],
        [
            'vuepress-plugin-container',
            {
                type: 'danger',
                defaultTitle: {
                    '/': 'WARNING'
                },
            },
        ]
    ]
};

function genGuideSidebarConfig (title) {
    return [
        {
            title,
            collapsable: false,
            children: [
                '',
                'theming',
                'layout',
                'typography',
                'buttons',
                'code',
                'media',
                'tables',
                'forms-inputs',
                'meters-progress'
            ]
        }
    ]
}

function genReferenceSidebarConfig (title) {
    return [
        {
            title,
            collapsable: false,
            children: [
                '',
                'utilities'
            ]
        }
    ]
}
