<template>
    <header class="navbar">
        <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />
        <router-link :to="$localePath" class="home-link">
            <img
                class="logo"
                v-if="$site.themeConfig.logo"
                :src="$withBase($site.themeConfig.logo)"
            >
            <span
                class="site-name"
                v-if="$siteTitle"
                :class="{ 'can-hide': $site.themeConfig.logo }"
            >
                {{ $siteTitle }}
            </span>
        </router-link>
        <div class="links">
            <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia" />
            <SearchBox v-else-if="$site.themeConfig.search !== false" />
            <NavLinks class="can-hide" />
        </div>
    </header>
</template>

<script>
    import SidebarButton from './SidebarButton.vue'
    import AlgoliaSearchBox from '@AlgoliaSearchBox'
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
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 20;
        height: var(--navbar-height);
        padding: 0.5rem 1.5rem;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
        background-color: white;
        line-height: calc(var(--navbar-height) - 1rem);
    }

    .navbar a,
    .navbar span,
    .navbar img {
        display: inline-block;
    }

    .navbar a {
        box-shadow: none !important;
    }

    .navbar .logo {
        min-width: calc(var(--navbar-height) - 1rem);
        height: calc(var(--navbar-height) - 1rem);
        margin-right: 0.8rem;
        vertical-align: top;
    }

    .navbar .site-name {
        position: relative;
        font-size: 1.3rem;
        font-weight: 600;
        color: var(--hiq-text-color);
    }

    .links {
        position: absolute;
        font-size: 0.9rem;
        top: 0.5rem;
        right: 1.5rem;
    }

    @media (max-width: 719px) {
        .navbar {
            padding-left: 4rem;
        }

        .navbar .can-hide {
            display: none;
        }
    }
</style>
