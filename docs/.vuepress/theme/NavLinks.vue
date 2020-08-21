<template>
    <div class="nav-links">
        <nav class="primary-links" v-if="userLinks.length || repoLink">
            <div
                class="nav-item"
                v-for="item in userLinks"
                :key="item.link"
            >
                <DropdownLink v-if="item.type === 'links'" :item="item" />
                <NavLink v-else :item="item" />
            </div>
        </nav>
        <nav class="secondary-links">
            <a v-if="repoLink"
               :href="repoLink"
               class="repo-link"
               target="_blank"
               rel="noopener noreferrer"
            >
                {{ repoLabel }}
            </a>
            <span class="version-number">
                {{ version }}
            </span>
        </nav>
    </div>
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
    .version-number {
        align-self: center;
        margin-left: 1rem;
        padding: 0 0.35rem;
        border-radius: 3px;
        background-color: var(--hiq-color-primary);
        font-weight: var(--hiq-font-weight-medium);
        color: white;
    }
</style>
