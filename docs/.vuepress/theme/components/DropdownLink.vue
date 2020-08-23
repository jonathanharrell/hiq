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

<style lang="scss">
    .dropdown-wrapper {
        cursor: pointer;

        @media (min-width: 719px) {
            height: 1.8rem;
        }

        @media (min-width: 719px) {
            &:hover .nav-dropdown {
                /* override the inline style */
                display: block !important;
            }
        }

        .dropdown-title {
            display: block;

            @media (max-width: 719px) {
                margin-bottom: 0.5rem;
            }

            &:hover {
                border-color: transparent;
            }

            .arrow {
                margin-top: -1px;
                margin-left: 0.4rem;
                vertical-align: middle;

                @media (min-width: 719px) {
                    /* make the arrow always down at desktop */
                    border-top: 6px solid var(--hiq-color-gray-6);
                    border-right: 4px solid transparent;
                    border-bottom: 0;
                    border-left: 4px solid transparent;
                }
            }
        }

        .nav-dropdown {
            @media (max-width: 719px) {
                overflow: hidden;
                transition: height 0.1s ease-out;

                h4,
                > a {
                    line-height: 2rem;
                }
            }

            @media (min-width: 719px) {
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
                border: 1px solid var(--hiq-color-gray-6);
                border-bottom-color: var(--hiq-color-gray-6);
                border-radius: 0.2rem;
                text-align: left;
                white-space: nowrap;
            }

            .dropdown-item {
                line-height: 1.7rem;
                color: inherit;

                h4 {
                    margin: 0.45rem 0 0;
                    padding: 0.45rem 1.5rem 0 1.25rem;
                    border-top: 1px solid var(--hiq-color-gray-6);

                    @media (max-width: 719px) {
                        margin-top: 0;
                        padding-top: 0;
                        border-top: 0;
                    }
                }

                &:first-child h4 {
                    margin-top: 0;
                    padding-top: 0;
                    border-top: 0;
                }

                .dropdown-subitem-wrapper {
                    padding: 0;
                    list-style: none;
                }

                a {
                    display: block;
                    position: relative;
                    margin-bottom: 0;
                    padding: 0 1.5rem 0 1.25rem;
                    border-bottom: none;
                    line-height: 1.7rem;
                    font-weight: var(--hiq-font-weight-normal);

                    &:hover {
                        color: var(--hiq-color-primary);
                    }

                    &.router-link-active {
                        color: var(--hiq-color-primary);

                        &::after {
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
                    }
                }

                .dropdown-subitem {
                    @media (max-width: 719px) {
                        padding-left: 1rem;
                    }
                }
            }
        }
    }
</style>
