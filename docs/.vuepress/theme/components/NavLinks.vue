<template>
    <div class="nav-links">
        <nav v-if="userLinks.length" class="primary-links">
            <div v-for="item in userLinks" :key="item.link" class="nav-item">
                <NavLink :item="item" />
            </div>
        </nav>
        <nav class="secondary-links">
            <a
                v-if="repoLink"
                :href="repoLink"
                class="repo-link"
                target="_blank"
                rel="noopener noreferrer"
            >
                {{ repoLabel }}
            </a>
            <a
                v-if="version"
                :href="`${repoLink}/releases`"
                target="_blank"
                rel="noopener noreferrer"
                title="View releases"
                class="version-number"
            >
                {{ version }}
            </a>
            <button
                v-if="theme"
                class="theme-toggle"
                :title="
                    `Change theme to ${theme === 'light' ? 'dark' : 'light'}`
                "
                @click="toggleTheme"
            >
                <SunIcon v-if="theme === 'light'" />
                <MoonIcon v-if="theme === 'dark'" />
                <span>Toggle theme</span>
            </button>
        </nav>
    </div>
</template>

<script>
    import { SunIcon, MoonIcon } from 'vue-feather-icons';
    import NavLink from './NavLink.vue';
    import { resolveNavLinkItem } from '../util';

    export default {
        components: {
            SunIcon,
            MoonIcon,
            NavLink
        },

        data() {
            return {
                version: '...',
                theme: undefined
            };
        },

        computed: {
            nav() {
                return this.$site.themeConfig.nav;
            },

            userLinks() {
                return (this.nav || []).map(link => {
                    return Object.assign(resolveNavLinkItem(link), {
                        items: (link.items || []).map(resolveNavLinkItem)
                    });
                });
            },

            repoLink() {
                const { repo } = this.$site.themeConfig;
                return repo ? `https://github.com/${repo}` : '';
            },

            repoLabel() {
                return 'Github';
            }
        },

        mounted() {
            this.detectTheme();
            this.getLatestVersion();

            document.addEventListener('themeChange', this.handleThemeChange);
        },

        beforeDestroy() {
            document.removeEventListener('themeChange', this.handleThemeChange);
        },

        methods: {
            detectTheme() {
                this.theme = document.documentElement.dataset.theme;
            },

            async getLatestVersion() {
                try {
                    const data = await fetch(
                        `https://api.github.com/repos/jonathanharrell/hiq/releases/latest`
                    );
                    const { tag_name: tagName } = await data.json();
                    this.version = tagName;
                } catch (error) {
                    console.error(error);
                }
            },

            handleThemeChange(event) {
                this.theme = event.detail;
            },

            toggleTheme() {
                const newTheme = this.theme === 'light' ? 'dark' : 'light';
                this.theme = newTheme;

                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '../styles/sass-variables';

    a.version-number {
        align-self: center;
        height: auto;
        margin-left: 1rem;
        padding: 0 0.35rem;
        border-radius: 3px;
        background-color: var(--hiq-color-primary);
        font-size: var(--hiq-font-size-small);
        font-weight: var(--hiq-font-weight-medium);
        color: white !important;
    }

    .theme-toggle {
        align-self: center;
        height: auto;
        padding: 0;
        border: 0;
        background-color: transparent;
        font-size: var(--hiq-font-size-small);
        font-weight: var(--hiq-font-weight-medium);
        color: var(--hiq-color-gray-5);

        @media (min-width: $mobileUp) {
            margin-left: 1rem;
            padding: 0 0.35rem;
        }

        &:hover,
        &:focus,
        &:active {
            color: var(--hiq-text-color);
        }

        svg {
            margin-left: 1.25rem;
            width: 1.5rem;

            @media (min-width: $mobileUp) {
                width: unset;
            }
        }

        span {
            padding: 0.5rem 0 0.5rem 0.5rem;
            font-size: var(--hiq-font-size-base);
            line-height: 1.25rem;
            font-weight: var(--hiq-font-weight-semibold);
            color: var(--hiq-text-color);

            @media (min-width: $mobileUp) {
                display: none;
            }
        }
    }
</style>
