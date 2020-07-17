<template>
    <nav class="nav-links" v-if="userLinks.length || repoLink">
        <div
            class="nav-item"
            v-for="item in userLinks"
            :key="item.link"
        >
            <DropdownLink v-if="item.type === 'links'" :item="item" />
            <NavLink v-else :item="item" />
        </div>
        <a v-if="repoLink"
           :href="repoLink"
           class="repo-link"
           target="_blank"
           rel="noopener noreferrer"
        >
            {{ repoLabel }}
            <OutboundLink />
        </a>
        <span class="version-number">
            {{ version }}
        </span>
    </nav>
</template>

<script>
    import DropdownLink from './DropdownLink.vue'
    import { resolveNavLinkItem } from './util'
    import NavLink from './NavLink.vue'

    export default {
        components: {
            NavLink,
            DropdownLink
        },

        data() {
            return {
                version: 'v0.0.0'
            }
        },

        computed: {
            userNav () {
                return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || []
            },

            nav () {
                return this.userNav
            },

            userLinks () {
                return (this.nav || []).map(link => {
                    return Object.assign(resolveNavLinkItem(link), {
                        items: (link.items || []).map(resolveNavLinkItem)
                    })
                })
            },

            repoLink () {
                const {repo} = this.$site.themeConfig
                if (repo) {
                    return /^https?:/.test(repo)
                        ? repo
                        : `https://github.com/${repo}`
                }
            },

            repoLabel () {
                if (!this.repoLink) return
                if (this.$site.themeConfig.repoLabel) {
                    return this.$site.themeConfig.repoLabel
                }

                const repoHost = this.repoLink.match(/^https?:\/\/[^/]+/)[0]
                const platforms = ['GitHub', 'GitLab', 'Bitbucket']

                for (let i = 0; i < platforms.length; i++) {
                    const platform = platforms[i]
                    if (new RegExp(platform, 'i').test(repoHost)) {
                        return platform
                    }
                }

                return 'Source'
            }
        },

        mounted() {
            this.getLatestVersion();
        },

        methods: {
            async getLatestVersion() {
                try {
                    const data = await fetch(`https://api.github.com/repos/jonathanharrell/hiq/releases/latest`)
                    const { tag_name } = await data.json()
                    this.version = tag_name
                } catch(error) {
                    this.version = 'v3.0.0'
                }
            }
        }
    }
</script>

<style>
    .nav-links {
        display: inline-block;
    }

    .nav-links a {
        font-weight: var(--hiq-font-weight-medium);
        line-height: 1.4rem;
        color: inherit;
    }

    .nav-links a:hover,
    .nav-links a.router-link-active {
        color: var(--hiq-color-primary);
    }

    .nav-links .nav-item {
        display: inline-block;
        position: relative;
        margin-left: 1.125rem;
        line-height: 2rem;
    }

    .nav-links .repo-link {
        margin-left: 1.125rem;
    }

    .version-number {
        margin-left: 1rem;
        font-weight: var(--hiq-font-weight-medium);
    }

    @media (min-width: 719px) {
        .nav-links a:hover,
        .nav-links a.router-link-active {
            color: var(--hiq-text-color);
        }

        .nav-item > a:not(.external):hover,
        .nav-item > a:not(.external).router-link-active {
            margin-bottom: -2px;
            border-bottom: 2px solid var(--hiq-color-primary);
        }
    }

    @media (max-width: 719px) {
        .version-number {
            display: none;
        }
    }
</style>
