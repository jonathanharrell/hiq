<template>
    <div class="sidebar-group" :class="{ first, collapsable }">
        <p class="sidebar-heading" :class="{ open }" @click="$emit('toggle')">
            <span>{{ item.title }}</span>
            <span class="arrow" v-if="collapsable" :class="open ? 'down' : 'right'"></span>
        </p>
        <DropdownTransition>
            <ul class="sidebar-group-items" ref="items" v-if="open || !collapsable">
                <li v-for="child in item.children">
                    <SidebarLink :item="child" />
                </li>
            </ul>
        </DropdownTransition>
    </div>
</template>

<script>
    import SidebarLink from './SidebarLink.vue'
    import DropdownTransition from './DropdownTransition.vue'

    export default {
        name: 'SidebarGroup',

        props: ['item', 'first', 'open', 'collapsable'],

        components: {
            SidebarLink,
            DropdownTransition
        }
    }
</script>

<style>
    .sidebar-group:not(.first) {
        margin-top: 1rem;
    }

    .sidebar-group:not(.collapsable) .sidebar-heading {
        color: inherit;
        cursor: auto;
    }

    .sidebar-group .sidebar-group {
        padding-left: 0.5rem;
    }

    .sidebar-heading {
        margin-top: 0;
        margin-bottom: 0.5rem;
        padding: 0 1.5rem;
        font-weight: var(--hiq-font-weight-bold);
        color: var(--hiq-text-color);
        transition: color 0.15s ease;
        cursor: pointer;
    }

    .sidebar-heading.open,
    .sidebar-heading:hover {
        color: inherit;
    }

    .sidebar-heading .arrow {
        position: relative;
        top: -0.12rem;
        left: 0.5rem;
    }

    .sidebar-heading .open .arrow {
        top: -0.18rem;
    }

    .sidebar-group-items {
        overflow: hidden;
        transition: height 0.1s ease-out;
    }
</style>
