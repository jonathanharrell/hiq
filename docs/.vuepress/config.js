module.exports = {
    title: 'HiQ',
    description: 'HiQ. A high-IQ CSS framework.',
    head: [
        ['link', { rel: 'icon', href: `/logo.png` }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: 'hsl(210, 100%, 50%)' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
        ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
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
                link: '/theme-builder/'
            }
        ],
        sidebar: {
            '/guide/': genGuideSidebarConfig('Guide'),
            '/reference/': genReferenceSidebarConfig('Reference')
        }
    }
}

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
                'utilities',
                'browser-bugs'
            ]
        }
    ]
}
