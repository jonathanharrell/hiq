<template>
    <header class="navbar">
        <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />
        <router-link
            :to="$localePath"
            class="home-link"
        >
            <img
                class="logo can-hide"
                v-if="$site.themeConfig.logo"
                :src="$withBase($site.themeConfig.logo)"
                :alt="$siteTitle"
            >
        </router-link>
        <div class="links">
            <NavLinks class="can-hide" />
            <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia" />
            <SearchBox v-else-if="$site.themeConfig.search !== false" />
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
            SearchBox,
            AlgoliaSearchBox
        },

        computed: {
            algolia () {
                return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
            },

            isAlgoliaSearch () {
                return this.algolia && this.algolia.apiKey && this.algolia.indexName
            }
        }
    }
</script>

<style lang="scss" scoped>
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

    /deep/ .logo {
        width: 2.5rem;
        height: 2.5rem;
    }

    .home-link {
        margin-right: 0.5rem;
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
        @media (max-width: 719px) {
            display: none !important;
        }
    }
</style>
