<template>
    <div class="sidebar-group" :class="{ first, collapsable }">
        <p class="sidebar-heading" :class="{ open }" @click="$emit('toggle')">
            <span>{{ item.title }}</span>
            <span
                v-if="collapsable"
                class="arrow"
                :class="open ? 'down' : 'right'"
            ></span>
        </p>
        <DropdownTransition>
            <ul
                v-if="open || !collapsable"
                ref="items"
                class="sidebar-group-items"
            >
                <li v-for="(child, index) in item.children" :key="index">
                    <SidebarLink :item="child" />
                </li>
            </ul>
        </DropdownTransition>
    </div>
</template>

<script>
    import SidebarLink from './SidebarLink.vue';
    import DropdownTransition from './DropdownTransition.vue';

    export default {
        name: 'SidebarGroup',

        components: {
            SidebarLink,
            DropdownTransition
        },

        props: {
            item: {
                type: Object,
                default: () => {}
            },

            first: {
                type: Boolean
            },

            open: {
                type: Boolean
            },

            collapsable: {
                type: Boolean
            }
        }
    };
</script>

<style lang="scss">
    @import '../styles/sass-variables';

    .sidebar-group {
        &:not(.first) {
            margin-top: 1rem;
        }

        &:not(.collapsable) .sidebar-heading {
            color: inherit;
            cursor: auto;
        }

        .sidebar-group {
            padding-left: 0.5rem;
        }
    }

    .sidebar-heading {
        margin-top: 0;
        margin-bottom: 0.5rem;
        padding: 0 1.5rem;
        font-weight: var(--hiq-font-weight-semibold);
        color: var(--hiq-text-color);
        transition: color 0.15s ease;
        cursor: pointer;

        @media (min-width: $mobileUp) {
            display: none;
        }

        &.open,
        &:hover {
            color: inherit;
        }

        .arrow {
            position: relative;
            top: -0.12rem;
            left: 0.5rem;
        }

        .open .arrow {
            top: -0.18rem;
        }
    }
</style>
