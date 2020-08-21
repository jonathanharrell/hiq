<template>
    <header class="navbar">
        <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />
        <router-link :to="$localePath" class="home-link">
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
    import AlgoliaSearchBox from './AlgoliaSearchBox.vue'
    import SearchBox from './SearchBox.vue'
    import NavLinks from './NavLinks.vue'

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

<style>
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

    .home-link {
        margin-right: 0.5rem;
    }

    .navbar .logo {
        width: 2.5rem;
        height: 2.5rem;
    }

    .links {
        display: flex;
        flex: 1;
        height: 100%;
    }

    .navbar .nav-links {
        display: flex;
        flex: 1;
    }

    .navbar .primary-links {
        display: flex;
        flex: 1;
    }

    .navbar .secondary-links {
        display: flex;
    }

    .navbar .nav-item {
        margin-left: 0.5rem;
    }

    .navbar a {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 0.5rem;
        font-weight: 500;
        color: var(--hiq-color-gray-5);
        transition: color var(--hiq-speed) var(--hiq-easing), border-color var(--hiq-speed) var(--hiq-easing);
    }

    .navbar a:visited {
        color: var(--hiq-color-gray-5);
    }

    .navbar a:hover,
    .navbar a:focus,
    .navbar a:active {
        color: var(--hiq-text-color);
    }

    .navbar a:visited:hover,
    .navbar a:visited:focus,
    .navbar a:visited:active {
        color: var(--hiq-text-color);
    }

    .navbar .nav-links a.router-link-active {
        color: var(--hiq-text-color);
    }

    .navbar .primary-links a {
        border-bottom: 2px solid transparent;
    }

    .navbar .primary-links a:hover,
    .navbar .primary-links a:focus,
    .navbar .primary-links a:active {
        border-bottom-color: var(--hiq-color-gray-6);
    }

    .navbar .primary-links a.router-link-active {
        border-bottom-color: var(--hiq-color-primary);
    }

    @media (max-width: 719px) {
        .navbar .can-hide {
            display: none;
        }
    }
</style>
