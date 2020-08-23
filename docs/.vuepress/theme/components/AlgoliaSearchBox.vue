<template>
    <form id="search-form" class="algolia-search-wrapper search-box">
        <input id="algolia-search-input" class="search-query">
    </form>
</template>

<script>
    export default {
        props: ['options'],
        mounted () {
            this.initialize()
        },
        methods: {
            initialize () {
                Promise.all([
                    import(/* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.js'),
                    import(/* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.css')
                ]).then(([docsearch]) => {
                    docsearch = docsearch.default
                    docsearch(Object.assign(this.options, {
                        debug: true,
                        inputSelector: '#algolia-search-input'
                    }))
                })
            }
        },
        watch: {
            options (newValue) {
                this.$el.innerHTML = '<input id="algolia-search-input" class="search-query">'
                this.initialize(newValue)
            }
        }
    }
</script>

<style>
    .algolia-search-wrapper & > span {
        vertical-align: middle;
    }

    .algolia-search-wrapper .algolia-autocomplete {
        line-height: normal;
    }

    .algolia-search-wrapper .algolia-autocomplete .ds-dropdown-menu {
        margin: 6px 0 0;
        padding: 4px;
        border: 1px solid var(--hiq-color-gray-6);
        border-radius: 4px;
        background-color: white;
        text-align: left;
    }

    .algolia-search-wrapper .algolia-autocomplete .ds-dropdown-menu:before {
        border-color: var(--hiq-color-gray-6);
    }

    .algolia-search-wrapper .algolia-autocomplete .ds-dropdown-menu [class*=ds-dataset-] {
        padding: 0;
        border: none;
    }

    .algolia-search-wrapper .algolia-autocomplete .ds-dropdown-menu .ds-suggestions {
        margin-top: 0;
    }

    .algolia-search-wrapper .algolia-autocomplete .ds-dropdown-menu .ds-suggestion {
        border-bottom: 1px solid var(--hiq-color-gray-6);
    }

    .algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion--highlight {
        color: var(--hiq-selection-color);
    }

    .algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion {
        padding: 0;
        border-color: var(--hiq-color-gray-6);
    }

    .algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion .algolia-docsearch-suggestion--category-header {
        margin-top: 0;
        padding: 5px 10px;
        background-color: var(--hiq-color-primary);
        font-weight: var(--hiq-font-weight-semibold);
        color:white;
    }

    .algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion .algolia-docsearch-suggestion--category-header .algolia-docsearch-suggestion--highlight {
        background-color: var(--hiq-color-gray-6);
    }

    .algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion .algolia-docsearch-suggestion--wrapper {
        padding: 0;
    }

    .algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion .algolia-docsearch-suggestion--title {
        margin-bottom: 0;
        font-weight: var(--hiq-font-weight-semibold);
        color: var(--hiq-text-color);
    }

    .algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion .algolia-docsearch-suggestion--subcategory-column {
        padding: 5px 7px 5px 5px;
        vertical-align: top;
        border-color: var(--hiq-color-gray-6);
        background-color: var(--hiq-color-gray-6);
    }

    .algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion .algolia-docsearch-suggestion--subcategory-column::after {
        display: none;
    }

    .algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion .algolia-docsearch-suggestion--subcategory-column-text {
        color: var(--hiq-color-gray-4);
    }

    .algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-footer {
        border-color: var(--hiq-color-gray-6);
    }

    .algolia-search-wrapper .algolia-autocomplete .ds-cursor .algolia-docsearch-suggestion--content {
        background-color: var(--hiq-selection-color) !important;
        color: var(--hiq-text-color);
    }

    @media (min-width: 719px) {
        .algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion .algolia-docsearch-suggestion--subcategory-column {
            display: table-cell;
            float: none;
            width: 150px;
            min-width: 150px;
        }

        .algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion .algolia-docsearch-suggestion--content {
            display: table-cell;
            float: none;
            width: 100%;
            vertical-align: top;
        }

        .algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion .ds-dropdown-menu {
            min-width: 515px !important;
        }
    }

    @media (max-width: 719px) {
        .algolia-search-wrapper .ds-dropdown-menu {
            min-width: calc(100vw - 4rem) !important;
            max-width: calc(100vw - 4rem) !important;
        }

        .algolia-search-wrapper .algolia-docsearch-suggestion--wrapper {
            padding: 5px 7px 5px 5px !important;
        }

        .algolia-search-wrapper .algolia-docsearch-suggestion--subcategory-column {
            padding: 0 !important;
            background-color: white !important;
        }

        .algolia-search-wrapper .algolia-docsearch-suggestion--subcategory-column-text::after {
            display: inline-block;
            width: 5px;
            margin: -3px 3px 0;
            vertical-align: middle;
            font-size: 10px;
            line-height: 14px;
            content: ' > ';
        }
    }
</style>
