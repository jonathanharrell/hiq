<template>
    <header class="navbar">
        <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />
        <RouterLink
            :to="$localePath"
            class="home-link"
        >
            <img
                class="logo"
                :src="$withBase($site.themeConfig.logo)"
                :alt="$siteTitle"
            >
        </RouterLink>

        <div
            class="links"
            :style="linksWrapMaxWidth ? {
                'max-width': linksWrapMaxWidth + 'px'
            } : {}"
        >
            <NavLinks class="can-hide" />
            <AlgoliaSearchBox
                v-if="isAlgoliaSearch"
                :options="algolia"
            />
            <SearchBox v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false" />
        </div>
    </header>
</template>

<script>
    import SidebarButton from './SidebarButton.vue'
    import SearchBox from './SearchBox.vue'
    import NavLinks from './NavLinks.vue'
    import AlgoliaSearchBox from './AlgoliaSearchBox.vue'

    export default {
        components: {
            SidebarButton,
            NavLinks,
            AlgoliaSearchBox,
            SearchBox
        },

        data () {
            return {
                linksWrapMaxWidth: null
            }
        },

        computed: {
            algolia () {
                return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
            },

            isAlgoliaSearch () {
                return this.algolia && this.algolia.apiKey && this.algolia.indexName
            }
        },

        mounted () {
            const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
            const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))

            const handleLinksWrapWidth = () => {
                if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
                    this.linksWrapMaxWidth = null
                } else {
                    this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING
                        - (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
                }
            }

            handleLinksWrapWidth()

            window.addEventListener('resize', handleLinksWrapWidth, false)
        }
    }

    function css (el, property) {
        // NOTE: Known bug, will return 'auto' if style value is 'auto'
        const win = el.ownerDocument.defaultView
        // null means not to return pseudo styles
        return win.getComputedStyle(el, null)[property]
    }
</script>

<style lang="scss" scoped>
    @import "../styles/sass-variables";

    .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 20;
        height: var(--navbar-height);
        padding: 0 1.5rem;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
        background-color: white;
    }

    .logo {
        width: 2rem;
        height: 2rem;

        @media (min-width: 720px) {
            width: 2.5rem;
            height: 2.5rem;
        }
    }

    .home-link {
        margin-right: 0.5rem;

        @media (max-width: $mobile) {
            margin-left: 1.5rem;
        }
    }

    .links {
        display: flex;
        flex: 1;
        height: 100%;
    }

    /deep/ .nav-links {
        display: flex;
        flex: 1;
    }

    /deep/ .primary-links {
        display: flex;
        flex: 1;

        a {
            border-bottom: 2px solid transparent;

            &:hover,
            &:focus,
            &:active {
                border-bottom-color: var(--hiq-color-gray-6);
            }

            &.router-link-active {
                border-bottom-color: var(--hiq-color-primary);
            }
        }
    }

    /deep/ .secondary-links {
        display: flex;
    }

    /deep/ .nav-item {
        margin-left: 0.5rem;
    }

    /deep/ a {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 0.5rem;
        font-weight: var(--hiq-font-weight-medium);
        color: var(--hiq-color-gray-5);
        transition: color var(--hiq-speed) var(--hiq-easing), border-color var(--hiq-speed) var(--hiq-easing);

        &:hover,
        &:focus,
        &:active {
            color: var(--hiq-text-color);
        }

        &:visited {
            color: var(--hiq-color-gray-5);

            &:hover,
            &:focus,
            &:active {
                color: var(--hiq-text-color);
            }
        }

        &.router-link-active {
            color: var(--hiq-text-color);
        }
    }

    .can-hide {
        @media (max-width: $mobile) {
            display: none !important;
        }
    }
</style>
