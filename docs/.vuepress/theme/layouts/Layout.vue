<template>
    <div
        class="theme-container"
        :class="pageClasses"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
    >
        <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />
        <div class="sidebar-mask" @click="toggleSidebar(false)"></div>
        <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
            <slot slot="top" name="sidebar-top" />
            <slot slot="bottom" name="sidebar-bottom" />
        </Sidebar>
        <div v-if="$page.frontmatter.layout" class="custom-layout">
            <Component :is="$page.frontmatter.layout" />
        </div>
        <Home v-else-if="$page.frontmatter.home" />
        <Page v-else :sidebar-items="sidebarItems">
            <slot slot="top" name="page-top" />
            <slot slot="bottom" name="page-bottom" />
        </Page>
    </div>
</template>

<script>
    import Vue from 'vue';
    import nprogress from 'nprogress';
    import 'focus-visible';
    import Home from '../components/Home.vue';
    import Navbar from '../components/Navbar.vue';
    import Page from '../components/Page.vue';
    import Sidebar from '../components/Sidebar.vue';
    import { resolveSidebarItems } from '../util';

    export default {
        components: {
            Home,
            Page,
            Sidebar,
            Navbar
        },

        data() {
            return {
                isSidebarOpen: false
            };
        },

        computed: {
            shouldShowNavbar() {
                const { themeConfig } = this.$site;
                const { frontmatter } = this.$page;

                if (
                    frontmatter.navbar === false ||
                    themeConfig.navbar === false
                ) {
                    return false;
                }

                return (
                    this.$title ||
                    themeConfig.logo ||
                    themeConfig.repo ||
                    themeConfig.nav ||
                    this.$themeLocaleConfig.nav
                );
            },

            shouldShowSidebar() {
                const { frontmatter } = this.$page;

                return (
                    !frontmatter.layout &&
                    !frontmatter.home &&
                    frontmatter.sidebar !== false &&
                    this.sidebarItems.length
                );
            },

            sidebarItems() {
                return resolveSidebarItems(
                    this.$page,
                    this.$route,
                    this.$site,
                    this.$localePath
                );
            },

            pageClasses() {
                const userPageClass = this.$page.frontmatter.pageClass;

                return [
                    {
                        'no-navbar': !this.shouldShowNavbar,
                        'sidebar-open': this.isSidebarOpen,
                        'no-sidebar': !this.shouldShowSidebar
                    },
                    userPageClass
                ];
            }
        },

        mounted() {
            window.addEventListener('scroll', this.onScroll);

            // configure progress bar
            nprogress.configure({ showSpinner: false });

            this.$router.beforeEach((to, from, next) => {
                if (to.path !== from.path && !Vue.component(to.name)) {
                    nprogress.start();
                }
                next();
            });

            this.$router.afterEach(() => {
                nprogress.done();
                this.isSidebarOpen = false;
            });
        },

        methods: {
            toggleSidebar(to) {
                this.isSidebarOpen =
                    typeof to === 'boolean' ? to : !this.isSidebarOpen;
            },

            // side swipe
            onTouchStart(event) {
                this.touchStart = {
                    x: event.changedTouches[0].clientX,
                    y: event.changedTouches[0].clientY
                };
            },

            onTouchEnd(event) {
                const dx = event.changedTouches[0].clientX - this.touchStart.x;
                const dy = event.changedTouches[0].clientY - this.touchStart.y;

                if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
                    if (dx > 0 && this.touchStart.x <= 80) {
                        this.toggleSidebar(true);
                    } else {
                        this.toggleSidebar(false);
                    }
                }
            }
        }
    };
</script>

<style src="../../../../dist/hiq.css"></style>
<style src="../styles/variables.scss" lang="scss"></style>
<style src="../styles/global.scss" lang="scss"></style>
<style src="../styles/content.scss" lang="scss"></style>
<style src="../styles/code.scss" lang="scss"></style>
<style src="../styles/custom-blocks.scss" lang="scss"></style>
<style src="../styles/arrows.scss" lang="scss"></style>
<style src="../styles/nprogress.scss" lang="scss"></style>
<style src="../styles/syntax.scss" lang="scss"></style>
