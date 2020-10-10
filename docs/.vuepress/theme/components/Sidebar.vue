<template>
    <div class="sidebar">
        <NavLinks />
        <slot name="top" />
        <nav aria-labelledby="sidebar-link-label">
            <h2 id="sidebar-links-label" class="is-visually-hidden">
                Sidebar Links
            </h2>
            <ul v-if="items.length" class="sidebar-links">
                <li v-for="(item, index) in items" :key="index">
                    <SidebarGroup
                        v-if="item.type === 'group'"
                        :item="item"
                        :first="index === 0"
                        :open="index === openGroupIndex"
                        :collapsable="item.collapsable"
                        @toggle="toggleGroup(index)"
                    />
                    <SidebarLink v-else :item="item" />
                </li>
            </ul>
        </nav>
        <slot name="bottom" />
    </div>
</template>

<script>
    import SidebarGroup from './SidebarGroup.vue';
    import SidebarLink from './SidebarLink.vue';
    import NavLinks from './NavLinks.vue';
    import { isActive } from '../util';

    export default {
        components: {
            SidebarGroup,
            SidebarLink,
            NavLinks
        },

        props: {
            items: {
                type: Array,
                default: () => []
            }
        },

        data() {
            return {
                openGroupIndex: 0
            };
        },

        watch: {
            $route() {
                this.refreshIndex();
            }
        },

        created() {
            this.refreshIndex();
        },

        methods: {
            refreshIndex() {
                const index = resolveOpenGroupIndex(this.$route, this.items);
                if (index > -1) this.openGroupIndex = index;
            },

            toggleGroup(index) {
                this.openGroupIndex =
                    index === this.openGroupIndex ? -1 : index;
            },

            isActive(page) {
                return isActive(this.$route, page.path);
            }
        }
    };

    function resolveOpenGroupIndex(route, items) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (
                item.type === 'group' &&
                item.children.some(child => isActive(route, child.path))
            ) {
                return i;
            }
        }

        return -1;
    }
</script>

<style lang="scss" scoped>
    @import '../styles/sass-variables';

    .sidebar {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 10;
        width: var(--mobile-sidebar-width);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        margin: 0;
        padding-top: var(--navbar-height);
        border-right: 1px solid var(--hiq-color-gray-6);
        background-color: var(--hiq-body-background-color);
        transform: translateX(-100%);
        transition: transform 0.2s ease;

        @media (min-width: $mobileUp) {
            top: var(--navbar-height);
            padding: 2rem;
            border: 0;
            background-color: var(--hiq-color-gray-8);
            transform: none;
            transition: none;
        }

        @media (min-width: $narrowUp) {
            width: var(--sidebar-width);
        }

        .theme-container.sidebar-open & {
            display: block;
            transform: translateX(0);

            @media (min-width: $mobileUp) {
                transform: none;
            }
        }

        .theme-container.no-sidebar & {
            @media (min-width: $mobileUp) {
                display: none;
            }
        }

        .theme-container.no-navbar & {
            padding-top: 0;

            @media (min-width: $mobileUp) {
                padding-top: 2rem;
            }
        }
    }

    /deep/ ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    /deep/ .nav-links {
        display: block;
        padding: 0.5rem 0 0.75rem 0;
        border-bottom: 1px solid var(--hiq-color-gray-6);

        @media (min-width: $mobileUp) {
            display: none;
        }

        a {
            font-weight: var(--hiq-font-weight-semibold);
            color: var(--hiq-text-color);

            &:hover,
            &:focus,
            &:active {
                color: var(--hiq-link-color);
            }
        }

        .nav-item,
        .repo-link {
            display: block;
            padding: 0.5rem 0 0.5rem 1.5rem;
            line-height: 1.25rem;
        }
    }

    /deep/ .version-number {
        display: none;
    }

    .sidebar-links {
        padding: 1rem 0;

        @media (min-width: $mobileUp) {
            padding: 0;
        }
    }
</style>

<style lang="scss">
    @import '../styles/sass-variables';

    .sidebar-mask {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9;
        width: 100vw;
        height: 100vh;

        .theme-container.sidebar-open & {
            display: block;
        }
    }
</style>
