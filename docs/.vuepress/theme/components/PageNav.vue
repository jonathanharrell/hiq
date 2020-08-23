<template>
    <div class="wrapper page-nav" v-if="prev || next">
        <p class="inner">
            <span
                v-if="prev"
                class="prev"
            >
                ←
                <a
                    v-if="prev.type === 'external'"
                    class="prev"
                    :href="prev.path"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  {{ prev.title || prev.path }}
            </a>
            <RouterLink
                v-else
                class="prev"
                :to="prev.path"
            >
              {{ prev.title || prev.path }}
            </RouterLink>
          </span>
            <span
                v-if="next"
                class="next"
            >
                <a
                    v-if="next.type === 'external'"
                    :href="next.path"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  {{ next.title || next.path }}
                </a>
                <RouterLink
                    v-else
                    :to="next.path"
                >
                  {{ next.title || next.path }}
                </RouterLink>
                →
          </span>
        </p>
    </div>
</template>

<script>
    import { resolvePage } from '../util'
    import isString from 'lodash/isString'
    import isNil from 'lodash/isNil'

    export default {
        name: 'PageNav',

        props: ['sidebarItems'],

        computed: {
            prev () {
                return resolvePageLink(LINK_TYPES.PREV, this)
            },

            next () {
                return resolvePageLink(LINK_TYPES.NEXT, this)
            }
        }
    }

    function resolvePrev (page, items) {
        return find(page, items, -1)
    }

    function resolveNext (page, items) {
        return find(page, items, 1)
    }

    const LINK_TYPES = {
        NEXT: {
            resolveLink: resolveNext,
            getThemeLinkConfig: ({ nextLinks }) => nextLinks,
            getPageLinkConfig: ({ frontmatter }) => frontmatter.next
        },
        PREV: {
            resolveLink: resolvePrev,
            getThemeLinkConfig: ({ prevLinks }) => prevLinks,
            getPageLinkConfig: ({ frontmatter }) => frontmatter.prev
        }
    }

    function resolvePageLink (
        linkType,
        { $themeConfig, $page, $route, $site, sidebarItems }
    ) {
        const { resolveLink, getThemeLinkConfig, getPageLinkConfig } = linkType
        // Get link config from theme
        const themeLinkConfig = getThemeLinkConfig($themeConfig)
        // Get link config from current page
        const pageLinkConfig = getPageLinkConfig($page)
        // Page link config will overwrite global theme link config if defined
        const link = isNil(pageLinkConfig) ? themeLinkConfig : pageLinkConfig

        if (link === false) {
            return
        } else if (isString(link)) {
            return resolvePage($site.pages, link, $route.path)
        } else {
            return resolveLink($page, sidebarItems)
        }
    }

    function find (page, items, offset) {
        const res = []
        flatten(items, res)

        for (let i = 0; i < res.length; i++) {
            const cur = res[i]
            if (cur.type === 'page' && cur.path === decodeURIComponent(page.path)) {
                return res[i + offset]
            }
        }
    }

    function flatten (items, res) {
        for (let i = 0, l = items.length; i < l; i++) {
            if (items[i].type === 'group') {
                flatten(items[i].children || [], res)
            } else {
                res.push(items[i])
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page-nav {
        padding-top: 1rem;
        padding-bottom: 0;
    }

    .inner {
        min-height: 2rem;
        overflow: auto;
        margin-top: 0;
        padding-top: 1rem;
        border-top: 1px solid var(--hiq-color-gray-6);
    }

    .next {
        float: right;
    }
</style>