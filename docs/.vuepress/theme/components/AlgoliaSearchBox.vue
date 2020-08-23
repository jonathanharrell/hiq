<template>
    <form
        id="search-form"
        class="algolia-search-wrapper search-box"
        role="search"
    >
        <input
            id="algolia-search-input"
            class="search-query"
            :placeholder="placeholder"
        >
    </form>
</template>

<script>
    export default {
        name: 'AlgoliaSearchBox',

        props: ['options'],

        data () {
            return {
                placeholder: undefined
            }
        },

        watch: {
            $lang (newValue) {
                this.update(this.options, newValue)
            },

            options (newValue) {
                this.update(newValue, this.$lang)
            }
        },

        mounted () {
            this.initialize(this.options, this.$lang)
            this.placeholder = this.$site.themeConfig.searchPlaceholder || ''
        },

        methods: {
            initialize (userOptions, lang) {
                Promise.all([
                    import(/* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.js'),
                    import(/* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.css')
                ]).then(([docsearch]) => {
                    docsearch = docsearch.default

                    const { algoliaOptions = {}} = userOptions

                    docsearch(Object.assign(
                        {},
                        userOptions,
                        {
                            inputSelector: '#algolia-search-input',
                            // #697 Make docsearch work well at i18n mode.
                            algoliaOptions: Object.assign({
                                'facetFilters': [`lang:${lang}`].concat(algoliaOptions.facetFilters || [])
                            }, algoliaOptions),
                            handleSelected: (input, event, suggestion) => {
                                const { pathname, hash } = new URL(suggestion.url)
                                const routepath = pathname.replace(this.$site.base, '/')
                                const _hash = decodeURIComponent(hash)
                                this.$router.push(`${routepath}${_hash}`)
                            }
                        }
                    ))
                })
            },

            update (options, lang) {
                this.$el.innerHTML = '<input id="algolia-search-input" class="search-query">'
                this.initialize(options, lang)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/sass-variables";

    .algolia-search-wrapper {
        & > span {
            vertical-align: middle;
        }
    }

    .algolia-autocomplete {
        line-height: normal;
    }

    .algolia-docsearch-suggestion--wrapper {
        padding: 0;

        @media (max-width: $mobile) {
            padding: 5px 7px 5px 5px !important;
        }
    }

    .algolia-docsearch-suggestion--content {
        @media (min-width: 720px) {
            display: table-cell;
            float: none;
            width: 100%;
            vertical-align: top;
        }
    }

    .algolia-docsearch-suggestion {
        padding: 0;
        border-color: var(--hiq-color-gray-6);
    }

    .algolia-docsearch-suggestion--category-header {
        margin-top: 0;
        padding: 5px 10px;
        background-color: var(--hiq-color-primary);
        font-weight: var(--hiq-font-weight-semibold);
        color:white;

        .algolia-docsearch-suggestion--highlight {
            background-color: var(--hiq-color-gray-6);
        }
    }

    .algolia-docsearch-suggestion--subcategory-column {
        padding: 5px 7px 5px 5px;
        vertical-align: top;
        border-color: var(--hiq-color-gray-6);
        background-color: var(--hiq-color-gray-6);

        @media (max-width: $mobile) {
            padding: 0 !important;
            background-color: white !important;
        }

        @media (min-width: 720px) {
            display: table-cell;
            float: none;
            width: 150px;
            min-width: 150px;
        }

        &::after {
            display: none;
        }
    }

    .algolia-docsearch-suggestion--subcategory-column-text {
        color: var(--hiq-color-gray-4);

        @media (max-width: $mobile) {
            display: inline-block;
            width: 5px;
            margin: -3px 3px 0;
            vertical-align: middle;
            font-size: 10px;
            line-height: 14px;
            content: ' > ';
        }
    }

    .algolia-docsearch-suggestion--title {
        margin-bottom: 0;
        font-weight: var(--hiq-font-weight-semibold);
        color: var(--hiq-text-color);
    }

    .algolia-docsearch-suggestion--highlight {
        color: var(--hiq-selection-color);
    }

    .algolia-docsearch-footer {
        border-color: var(--hiq-color-gray-6);
    }

    .ds-dropdown-menu {
        margin: 6px 0 0;
        padding: 4px;
        border: 1px solid var(--hiq-color-gray-6);
        border-radius: 4px;
        background-color: white;
        text-align: left;

        @media (max-width: $mobile) {
            min-width: calc(100vw - 4rem) !important;
            max-width: calc(100vw - 4rem) !important;
        }

        @media (min-width: 720px) {
            min-width: 515px !important;
        }

        &::before {
            border-color: var(--hiq-color-gray-6);
        }

        [class*=ds-dataset-] {
            padding: 0;
            border: none;
        }

        .ds-suggestions {
            margin-top: 0;
        }

        .ds-suggestion {
            border-bottom: 1px solid var(--hiq-color-gray-6);
        }
    }

    .ds-cursor .algolia-docsearch-suggestion--content {
        background-color: var(--hiq-selection-color) !important;
        color: var(--hiq-text-color);
    }
</style>
