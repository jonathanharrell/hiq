<template>
    <div class="page">
        <slot name="top" />
        <Content />
        <PageEdit />
        <PageNav v-bind="{ sidebarItems }" />
        <slot name="bottom" />
    </div>
</template>

<script>
    import { normalize, endingSlashRE } from '../util';
    import PageEdit from './PageEdit';
    import PageNav from './PageNav';

    export default {
        components: {
            PageEdit,
            PageNav
        },

        props: {
            sidebarItems: {
                type: Array,
                default: () => []
            }
        },

        computed: {
            lastUpdated() {
                if (this.$page.lastUpdated) {
                    return new Date(this.$page.lastUpdated).toLocaleString(
                        this.$lang
                    );
                }

                return undefined;
            },

            lastUpdatedText() {
                if (typeof this.$themeLocaleConfig.lastUpdated === 'string') {
                    return this.$themeLocaleConfig.lastUpdated;
                }

                if (typeof this.$site.themeConfig.lastUpdated === 'string') {
                    return this.$site.themeConfig.lastUpdated;
                }

                return 'Last Updated';
            },

            editLink() {
                if (this.$page.frontmatter.editLink === false) {
                    return;
                }

                const {
                    repo,
                    editLinks,
                    docsDir = '',
                    docsBranch = 'master',
                    docsRepo = repo
                } = this.$site.themeConfig;

                let path = normalize(this.$page.path);
                path += endingSlashRE.test(path) ? 'README.md' : '.md';

                if (docsRepo && editLinks) {
                    return this.createEditLink(
                        repo,
                        docsRepo,
                        docsDir,
                        docsBranch,
                        path
                    );
                }

                return undefined;
            },

            editLinkText() {
                return (
                    this.$themeLocaleConfig.editLinkText ||
                    this.$site.themeConfig.editLinkText ||
                    `Edit this page`
                );
            }
        },

        methods: {
            createEditLink(repo, docsRepo, docsDir, docsBranch, path) {
                const base = `https://github.com/${docsRepo}`;

                return (
                    base.replace(endingSlashRE, '') +
                    `/edit/${docsBranch}` +
                    (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '') +
                    path
                );
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '../styles/sass-variables';

    .page {
        padding-bottom: 2rem;
        padding-left: 0;

        @media (min-width: $mobileUp) {
            padding-left: var(--mobile-sidebar-width);
        }

        @media (min-width: $narrowUp) {
            padding-left: var(--sidebar-width);
        }

        .theme-container.no-sidebar & {
            padding-left: 0;
        }
    }
</style>
