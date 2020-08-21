<template>
    <div class="sidebar">
        <NavLinks />
        <slot name="top" />
        <ul class="sidebar-links" v-if="items.length">
            <li v-for="(item, i) in items" :key="i">
                <SidebarGroup
                    v-if="item.type === 'group'"
                    :item="item"
                    :first="i === 0"
                    :open="i === openGroupIndex"
                    :collapsable="item.collapsable"
                    @toggle="toggleGroup(i)"
                />
                <SidebarLink v-else :item="item" />
            </li>
        </ul>
        <slot name="bottom" />
    </div>
</template>

<script>
    import SidebarGroup from './SidebarGroup.vue'
    import SidebarLink from './SidebarLink.vue'
    import NavLinks from './NavLinks.vue'
    import { isActive } from './util'

    export default {
        components: {SidebarGroup, SidebarLink, NavLinks},
        props: ['items'],
        data () {
            return {
                openGroupIndex: 0
            }
        },
        created () {
            this.refreshIndex()
        },
        watch: {
            '$route' () {
                this.refreshIndex()
            }
        },
        methods: {
            refreshIndex () {
                const index = resolveOpenGroupIndex(
                    this.$route,
                    this.items
                )
                if (index > -1) {
                    this.openGroupIndex = index
                }
            },
            toggleGroup (index) {
                this.openGroupIndex = index === this.openGroupIndex ? -1 : index
            },
            isActive (page) {
                return isActive(this.$route, page.path)
            }
        }
    }

    function resolveOpenGroupIndex (route, items) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i]
            if (item.type === 'group' && item.children.some(c => isActive(route, c.path))) {
                return i
            }
        }
        return -1
    }
</script>

<style>
    .sidebar-mask {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9;
        width: 100vw;
        height: 100vh;
    }

    .theme-container.sidebar-open .sidebar-mask {
        display: block;
    }

    .sidebar {
        position: fixed;
        top: var(--navbar-height);
        bottom: 0;
        left: 0;
        z-index: 10;
        width: var(--sidebar-width);
        overflow-y: auto;
        margin: 0;
        border-right: 1px solid var(--hiq-color-gray-6);
        background-color: white;
    }

    .theme-container.sidebar-open .sidebar {
        top: 0;
    }

    .sidebar ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    .sidebar a {
        display: inline-block;
    }

    .sidebar .nav-links {
        display: none;
        padding: 0.5rem 0 0.75rem 0;
        border-bottom: 1px solid var(--hiq-color-gray-6);
    }

    .sidebar .nav-links a {
        font-weight: var(--hiq-font-weight-semibold);
        color: var(--hiq-text-color);
    }

    .sidebar .nav-links a:hover,
    .sidebar .nav-links a:focus,
    .sidebar .nav-links a:active {
        color: var(--hiq-link-color);
    }

    .sidebar .nav-links .nav-item,
    .sidebar .nav-links .repo-link {
        display: block;
        padding: 0.5rem 0 0.5rem 1.5rem;
        line-height: 1.25rem;
    }

    .sidebar .version-number {
        display: none;
    }

    .sidebar .sidebar-links {
        padding: 1.5rem 0;
    }

    @media (max-width: 959px) {
        .sidebar {
            width: var(--mobile-sidebar-width);
        }
    }

    @media (min-width: 720px) {
        .theme-container.no-sidebar .sidebar {
            display: none;
        }
    }

    @media (max-width: 719px) {
        .sidebar {
            top: 0;
            padding-top: var(--navbar-height);
            transform: translateX(-100%);
            transition: transform 0.2s ease;
        }

        .theme-container.sidebar-open .sidebar {
            transform: translateX(0);
        }

        .theme-container.no-navbar .sidebar {
            padding-top: 0;
        }

        .sidebar .nav-links {
            display: block;
        }

        .sidebar .nav-links .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after {
            top: calc(1rem - 2px);
        }

        .sidebar .sidebar-links {
            padding: 1rem 0;
        }
    }
</style>
