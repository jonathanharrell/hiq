<template>
    <div class="page">
        <slot name="top" />
        <Content :custom="false" />
        <div class="wrapper page-edit">
            <div class="last-updated" v-if="lastUpdated">
                <span class="prefix">{{ lastUpdatedText }}: </span> <span class="time">{{ lastUpdated }}</span>
            </div>
        </div>
        <div class="wrapper page-nav" v-if="prev || next">
            <p class="inner">
                <span v-if="prev" class="prev">
                    ← <router-link v-if="prev" class="prev" :to="prev.path">
                        {{ prev.title || prev.path }}
                    </router-link>
                </span>
                <span v-if="next" class="next">
                    <router-link v-if="next" :to="next.path">
                        {{ next.title || next.path }}
                    </router-link> →
                </span>
            </p>
        </div>
        <slot name="bottom" />
    </div>
</template>

<script>
    import { resolvePage, normalize, outboundRE, endingSlashRE } from './util'

    export default {
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

            prev () {
                const prev = this.$page.frontmatter.prev
                if (prev === false) {
                    return
                } else if (prev) {
                    return resolvePage(this.$site.pages, prev, this.$route.path)
                } else {
                    return resolvePrev(this.$page, this.sidebarItems)
                }
            },

            next () {
                const next = this.$page.frontmatter.next
                if (next === false) {
                    return
                } else if (next) {
                    return resolvePage(this.$site.pages, next, this.$route.path)
                } else {
                    return resolveNext(this.$page, this.sidebarItems)
                }
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

<style>
    .page {
        padding-bottom: 2rem;
        padding-left: var(--sidebar-width);
    }

    .page-edit {
        padding-top: 1rem;
        padding-bottom: 1rem;
        overflow: auto;
    }

    .page-edit .last-updated {
        float: right;
        font-size: var(--hiq-font-size-small);
    }

    .page-edit .last-updated .prefix {
        font-weight: var(--hiq-font-weight-medium);
        color: var(--hiq-gray);
    }

    .page-edit .last-updated .time {
        font-weight: var(--hiq-font-weight-normal);
        color: var(--hiq-gray-light);
    }

    .page-nav {
        padding-top: 1rem;
        padding-bottom: 0;
    }

    .page-nav .inner {
        min-height: 2rem;
        overflow: auto;
        margin-top: 0;
        padding-top: 1rem;
        border-top: 1px solid var(--hiq-gray-lighter);
    }

    .page-nav .next {
        float: right;
    }

    @media (max-width: 959px) {
        .page {
            padding-left: var(--mobile-sidebar-width);
        }
    }

    @media (min-width: 720px) {
        .theme-container.no-sidebar .page {
            padding-left: 0;
        }
    }

    @media (max-width: 719px) {
        .page {
            padding-left: 0;
        }

        .page-edit .last-updated {
            float: none;
            font-size: var(--hiq-font-size-small);
            text-align: left;
        }
    }
</style>
