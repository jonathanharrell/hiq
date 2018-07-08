<template>
    <div class="dropdown-wrapper" :class="{ open }">
        <a class="dropdown-title" @click="toggle">
            <span class="title">{{ item.text }}</span>
            <span class="arrow" :class="open ? 'down' : 'right'"></span>
        </a>
        <DropdownTransition>
            <ul class="nav-dropdown" v-show="open">
                <li
                    class="dropdown-item"
                    v-for="(subItem, index) in item.items"
                    :key="subItem.link || index"
                >
                    <h4 v-if="subItem.type === 'links'">{{ subItem.text }}</h4>
                    <ul class="dropdown-subitem-wrapper" v-if="subItem.type === 'links'">
                        <li
                            class="dropdown-subitem"
                            v-for="childSubItem in subItem.items"
                            :key="childSubItem.link"
                        >
                            <NavLink :item="childSubItem" />
                        </li>
                    </ul>
                    <NavLink v-else :item="subItem" />
                </li>
            </ul>
        </DropdownTransition>
    </div>
</template>

<script>
    import NavLink from './NavLink.vue'
    import DropdownTransition from './DropdownTransition.vue'

    export default {
        components: {
            NavLink,
            DropdownTransition
        },

        data () {
            return {
                open: false
            }
        },
        props: {
            item: {
                required: true
            }
        },
        methods: {
            toggle () {
                this.open = !this.open
            }
        }
    }
</script>

<style>
    .dropdown-wrapper {
        cursor: pointer;
    }

    .dropdown-wrapper .dropdown-title {
        display: block;
    }

    .dropdown-wrapper .dropdown-title:hover {
        border-color: transparent;
    }

    .dropdown-wrapper .dropdown-title .arrow {
        margin-top: -1px;
        margin-left: 0.4rem;
        vertical-align: middle;
    }

    .dropdown-wrapper .nav-dropdown .dropdown-item {
        line-height: 1.7rem;
        color: inherit;
    }

    .dropdown-wrapper .nav-dropdown .dropdown-item h4 {
        margin: 0.45rem 0 0;
        padding: 0.45rem 1.5rem 0 1.25rem;
        border-top: 1px solid var(--hiq-gray-lighter);
    }

    .dropdown-wrapper .nav-dropdown .dropdown-item:first-child h4 {
        margin-top: 0;
        padding-top: 0;
        border-top: 0;
    }

    .dropdown-wrapper .nav-dropdown .dropdown-item .dropdown-subitem-wrapper {
        padding: 0;
        list-style: none;
    }

    .dropdown-wrapper .nav-dropdown .dropdown-item a {
        display: block;
        position: relative;
        margin-bottom: 0;
        padding: 0 1.5rem 0 1.25rem;
        border-bottom: none;
        line-height: 1.7rem;
        font-weight: 400;
    }

    .dropdown-wrapper .nav-dropdown .dropdown-item a:hover {
        color: var(--hiq-color-primary);
    }

    .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active {
        color: var(--hiq-color-primary);
    }

    .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after {
        position: absolute;
        top: calc(50% - 2px);
        left: 9px;
        width: 0;
        height: 0;
        border-top: 3px solid transparent;
        border-bottom: 3px solid transparent;
        border-left: 5px solid var(--hiq-color-primary);
        content: '';
    }

    @media (max-width: 719px) {
        .dropdown-wrapper.open .dropdown-title {
            margin-bottom: 0.5rem;
        }

        .dropdown-wrapper .nav-dropdown {
            overflow: hidden;
            transition: height 0.1s ease-out;
        }

        .dropdown-wrapper .nav-dropdown .dropdown-item h4 {
            margin-top: 0;
            padding-top: 0;
            border-top: 0;
        }

        .dropdown-wrapper .nav-dropdown .dropdown-item h4,
        .dropdown-wrapper .nav-dropdown .dropdown-item > a {
            line-height: 2rem;
        }

        .dropdown-wrapper .nav-dropdown .dropdown-item .dropdown-subitem {
            padding-left: 1rem;
        }
    }

    @media (min-width: 719px) {
        .dropdown-wrapper {
            height: 1.8rem;
        }

        .dropdown-wrapper:hover .nav-dropdown {
            /* override the inline style */
            display: block !important;
        }

        .dropdown-wrapper .dropdown-title .arrow {
            /* make the arrow always down at desktop */
            border-top: 6px solid var(--hiq-gray-lighter);
            border-right: 4px solid transparent;
            border-bottom: 0;
            border-left: 4px solid transparent;
        }

        .dropdown-wrapper .nav-dropdown {
            display: none;
            position: absolute;
            top: 100%;
            right: 0;
            /* avoid height shaked by clicking */
            height: auto !important;
            max-height: calc(100vh - 2.7rem);
            overflow-y: auto;
            margin: 0;
            padding: 0.6rem 0;
            background-color: white;
            border: 1px solid var(--hiq-gray-lighter);
            border-bottom-color: var(--hiq-gray-lighter);
            border-radius: 0.25rem;
            text-align: left;
            white-space: nowrap;
        }
    }
</style>
