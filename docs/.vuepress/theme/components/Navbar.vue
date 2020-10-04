<template>
    <header class="navbar">
        <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />
        <RouterLink :to="$localePath" class="home-link">
            <img
                class="logo"
                :src="$withBase($site.themeConfig.logo)"
                :alt="$siteTitle"
            />
        </RouterLink>
        <div class="links">
            <NavLinks />
            <SearchBox />
        </div>
    </header>
</template>

<script>
    import SidebarButton from './SidebarButton.vue';
    import SearchBox from './SearchBox.vue';
    import NavLinks from './NavLinks.vue';

    export default {
        components: {
            SidebarButton,
            NavLinks,
            SearchBox
        }
    };
</script>

<style lang="scss" scoped>
    @import '../styles/sass-variables';

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
        background-color: var(--navbar-background-color);
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    }

    .logo {
        width: 2rem;
        height: 2rem;

        @media (min-width: $mobileUp) {
            width: 2.5rem;
            height: 2.5rem;
        }
    }

    .home-link {
        margin-left: 1.5rem;

        @media (min-width: $mobileUp) {
            margin-left: 0;
            margin-right: 0.5rem;
        }
    }

    .links {
        display: flex;
        flex: 1;
        height: 100%;
    }

    /deep/ .nav-links {
        display: none;
        flex: 1;

        @media (min-width: $mobileUp) {
            display: flex;
        }
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
        transition: color var(--hiq-speed) var(--hiq-easing),
            border-color var(--hiq-speed) var(--hiq-easing);

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
</style>
