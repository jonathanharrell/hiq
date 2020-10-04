<template>
    <footer class="wrapper page-edit">
        <div v-if="editLink" class="edit-link">
            <a :href="editLink" target="_blank" rel="noopener noreferrer">
                {{ editLinkText }}
            </a>
            <OutboundLink />
        </div>
        <div v-if="lastUpdated" class="last-updated">
            <span class="prefix">{{ lastUpdatedText }}:</span>
            <span class="time">{{ lastUpdated }}</span>
        </div>
    </footer>
</template>

<script>
    import isNil from 'lodash/isNil';
    import { endingSlashRE } from '../util';

    export default {
        name: 'PageEdit',

        computed: {
            lastUpdated() {
                return this.$page.lastUpdated;
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
                const showEditLink = isNil(this.$page.frontmatter.editLink)
                    ? this.$site.themeConfig.editLinks
                    : this.$page.frontmatter.editLink;

                const {
                    repo,
                    docsDir = '',
                    docsBranch = 'master',
                    docsRepo = repo
                } = this.$site.themeConfig;

                if (showEditLink && docsRepo && this.$page.relativePath) {
                    return this.createEditLink(
                        repo,
                        docsRepo,
                        docsDir,
                        docsBranch,
                        this.$page.relativePath
                    );
                }

                return null;
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
                    '/edit' +
                    `/${docsBranch}/` +
                    (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '') +
                    path
                );
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '../styles/sass-variables';

    .page-edit {
        overflow: auto;
        padding-top: 1rem;
        padding-bottom: 1rem;

        @media (min-width: $narrowUp) {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }

    .last-updated {
        text-align: left;

        @media (min-width: $narrowUp) {
            font-size: var(--hiq-font-size-small);
            text-align: right;
        }
    }

    .prefix {
        font-weight: var(--hiq-font-weight-medium);
        color: var(--hiq-color-gray-4);
    }

    .time {
        font-weight: var(--hiq-font-weight-normal);
        color: var(--hiq-color-gray-5);
    }
</style>
