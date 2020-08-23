<template>
    <div class="page">
        <slot name="top" />
        <Content />
        <PageEdit />
        <PageNav v-bind="{ sidebarItems }"/>
        <slot name="bottom" />
    </div>
</template>

<script>
    import { resolvePage, normalize, outboundRE, endingSlashRE } from '../util'
    import PageEdit from './PageEdit'
    import PageNav from './PageNav'

    export default {
        components: {
            PageEdit,
            PageNav
        },

        props: ['sidebarItems'],

        computed: {
            lastUpdated () {
                if (this.$page.lastUpdated) {
                    return new Date(this.$page.lastUpdated).toLocaleString(this.$lang)
                }
            },

            lastUpdatedText () {
                if (typeof this.$themeLocaleConfig.lastUpdated === 'string') {
                    return this.$themeLocaleConfig.lastUpdated
                }
                if (typeof this.$site.themeConfig.lastUpdated === 'string') {
                    return this.$site.themeConfig.lastUpdated
                }
                return 'Last Updated'
            },

            editLink () {
                if (this.$page.frontmatter.editLink === false) {
                    return
                }
                const {
                    repo,
                    editLinks,
                    docsDir = '',
                    docsBranch = 'master',
                    docsRepo = repo
                } = this.$site.themeConfig

                let path = normalize(this.$page.path)
                if (endingSlashRE.test(path)) {
                    path += 'README.md'
                } else {
                    path += '.md'
                }
                if (docsRepo && editLinks) {
                    return this.createEditLink(repo, docsRepo, docsDir, docsBranch, path)
                }
            },

            editLinkText () {
                return (
                    this.$themeLocaleConfig.editLinkText ||
                    this.$site.themeConfig.editLinkText ||
                    `Edit this page`
                )
            }
        },

        methods: {
            createEditLink (repo, docsRepo, docsDir, docsBranch, path) {
                const bitbucket = /bitbucket.org/
                if (bitbucket.test(repo)) {
                    const base = outboundRE.test(docsRepo)
                        ? docsRepo
                        : repo
                    return (
                        base.replace(endingSlashRE, '') +
                        `/${docsBranch}` +
                        (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '') +
                        path +
                        `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
                    )
                }

                const base = outboundRE.test(docsRepo)
                    ? docsRepo
                    : `https://github.com/${docsRepo}`

                return (
                    base.replace(endingSlashRE, '') +
                    `/edit/${docsBranch}` +
                    (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '') +
                    path
                )
            }
        }
    }

    function resolvePrev (page, items) {
        return find(page, items, -1)
    }

    function resolveNext (page, items) {
        return find(page, items, 1)
    }

    function find (page, items, offset) {
        const res = []
        items.forEach(item => {
            if (item.type === 'group') {
                res.push(...item.children || [])
            } else {
                res.push(item)
            }
        })
        for (let i = 0; i < res.length; i++) {
            const cur = res[i]
            if (cur.type === 'page' && cur.path === page.path) {
                return res[i + offset]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page {
        margin-top: var(--navbar-height);
        padding-bottom: 2rem;
        padding-left: var(--sidebar-width);

        @media (max-width: 959px) {
            padding-left: var(--mobile-sidebar-width);
        }

        @media (max-width: 719px) {
            padding-left: 0;
        }
    }
</style>

<style>
    @media (min-width: 720px) {
        .theme-container.no-sidebar .page {
            padding-left: 0;
        }
    }
</style>
