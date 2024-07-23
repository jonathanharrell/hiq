<template>
    <div class="search-box">
        <AisInstantSearch
            :search-client="searchClient"
            :index-name="algolia.indexName"
        >
            <AisConfigure :hits-per-page.camel="5" :distinct="true" />
            <AisSearchBox>
                <div
                    slot-scope="{ refine }"
                    :aria-expanded="query ? 'true' : 'false'"
                    role="combobox"
                    aria-owns="search-listbox"
                    aria-haspopup="listbox"
                >
                    <label
                        id="search-label"
                        for="search-input"
                        class="is-visually-hidden"
                    >
                        Search documentation
                    </label>
                    <input
                        id="search-input"
                        ref="input"
                        v-model="query"
                        :aria-activedescendant="
                            focusIndex > -1
                                ? `suggestion-${focusIndex}`
                                : undefined
                        "
                        autocomplete="off"
                        aria-label="Search"
                        aria-autocomplete="list"
                        aria-controls="search-listbox"
                        spellcheck="false"
                        @input="refine($event.currentTarget.value)"
                        @focus="focused = true"
                        @blur="focused = false"
                        @keyup.enter="go(focusIndex)"
                        @keyup.up="onUp"
                        @keyup.down="onDown"
                        @keyup.left="unfocus"
                        @keyup.right="unfocus"
                        @keydown.esc="query = ''"
                        @keydown.tab="query = ''"
                    />
                </div>
            </AisSearchBox>
            <AisHits v-if="query">
                <ul
                    id="search-listbox"
                    slot-scope="{ items }"
                    :class="{ 'align-right': alignRight }"
                    role="listbox"
                    class="suggestions"
                    aria-labelledby="search-label"
                    @mouseleave="unfocus"
                >
                    <li v-if="!items.length" class="suggestion">
                        <p class="no-results">No results found for query:</p>
                        <p class="result-text">
                            <q>{{ query }}</q>
                        </p>
                    </li>
                    <li
                        v-for="(item, index) in items"
                        :id="`suggestion-${index}`"
                        :key="item.objectID"
                        ref="suggestions"
                        :class="{ focused: index === focusIndex }"
                        :aria-selected="index === focusIndex"
                        role="option"
                        class="suggestion"
                        @mousedown="go(index)"
                        @mouseenter="focus(index)"
                    >
                        <a :href="item.url" @click.prevent>
                            <template v-if="item.type === 'page'">
                                <p class="result-text">{{ item.pageTitle }}</p>
                            </template>
                            <template v-if="item.type === 'heading'">
                                <p class="result-text">
                                    <AisSnippet :hit="item" attribute="text" />
                                </p>
                                <p class="result-sub-text">
                                    {{ item.pageTitle }}
                                </p>
                            </template>
                            <template v-if="item.type === 'paragraph'">
                                <AisSnippet :hit="item" attribute="text" />
                                <p class="result-sub-text">
                                    <AisHighlight
                                        :hit="item"
                                        attribute="pageTitle"
                                    />
                                    >
                                    <AisHighlight
                                        :hit="item"
                                        attribute="heading"
                                    />
                                </p>
                            </template>
                            <!--                            <template v-if="item.type === 'customProperty'">-->
                            <!--                                <AisHighlight :hit="item" attribute="heading" />-->
                            <!--                                <p class="result-sub-text">-->
                            <!--                                    {{ item.text }}-->
                            <!--                                </p>-->
                            <!--                                <p class="result-sub-text">-->
                            <!--                                    Custom Property ({{ item.propertyType }})-->
                            <!--                                </p>-->
                            <!--                            </template>-->
                            <!--                            <template v-if="item.type === 'customSelector'">-->
                            <!--                                <AisHighlight :hit="item" attribute="heading" />-->
                            <!--                                <p class="result-sub-text">-->
                            <!--                                    {{ item.text }}-->
                            <!--                                </p>-->
                            <!--                                <p class="result-sub-text">-->
                            <!--                                    Custom Selector-->
                            <!--                                </p>-->
                            <!--                            </template>-->
                            <!--                            <template v-if="item.type === 'mixin'">-->
                            <!--                                <AisHighlight :hit="item" attribute="heading" />-->
                            <!--                                <p class="result-sub-text">-->
                            <!--                                    {{ item.text }}-->
                            <!--                                </p>-->
                            <!--                                <p class="result-sub-text">-->
                            <!--                                    Mixin-->
                            <!--                                </p>-->
                            <!--                            </template>-->
                        </a>
                    </li>
                </ul>
            </AisHits>
        </AisInstantSearch>
    </div>
</template>

<script>
    import algoliasearch from 'algoliasearch/lite';
    import {
        AisConfigure,
        AisHighlight,
        AisHits,
        AisInstantSearch,
        AisSearchBox,
        AisSnippet,
    } from 'vue-instantsearch';

    export default {
        components: {
            AisConfigure,
            AisHighlight,
            AisHits,
            AisInstantSearch,
            AisSearchBox,
            AisSnippet,
        },

        data() {
            return {
                query: '',
                focused: false,
                focusIndex: -1,
            };
        },

        computed: {
            algolia() {
                return (
                    this.$themeLocaleConfig.algolia ||
                    this.$site.themeConfig.algolia ||
                    {}
                );
            },

            searchClient() {
                return algoliasearch(this.algolia.appId, this.algolia.apiKey);
            },

            // make suggestions align right when there are not enough items
            alignRight() {
                const navCount = (this.$site.themeConfig.nav || []).length;
                const repo = this.$site.repo ? 1 : 0;
                return navCount + repo <= 2;
            },
        },

        watch: {
            query(value) {
                this.focusIndex = -1;
                this.$emit('alert', `Searched for query ${value}`);
            },
        },

        mounted() {
            document.addEventListener('click', this.handleClick);
            document.addEventListener('keydown', (event) => {
                if (event.key === '/') {
                    if (document.activeElement === this.$refs.input) return;
                    this.$refs.input.focus();
                    event.preventDefault();
                }
            });
        },

        beforeDestroy() {
            document.removeEventListener('click', this.handleClick);
        },

        methods: {
            handleClick(event) {
                if (
                    !this.$el.contains(event.target) &&
                    this.$el !== event.target
                ) {
                    this.query = '';
                }
            },

            onUp() {
                if (!this.$refs.suggestions) return;

                if (this.focusIndex > 0) {
                    this.focusIndex--;
                } else {
                    this.focusIndex = this.$refs.suggestions.length - 1;
                }
            },

            onDown() {
                if (!this.$refs.suggestions) return;

                if (this.focusIndex < this.$refs.suggestions.length - 1) {
                    this.focusIndex++;
                } else {
                    this.focusIndex = 0;
                }
            },

            go(index) {
                const suggestion = this.$refs.suggestions[index];
                const link = suggestion.querySelector('a').href;
                const url = new URL(link);
                const path = url.pathname + url.hash;

                this.$router.push(path).catch(() => {});

                this.query = '';
                this.unfocus();
            },

            focus(index) {
                this.focusIndex = index;
            },

            unfocus() {
                this.focusIndex = -1;
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import '../styles/sass-variables';

    .search-box {
        display: flex;
        align-items: center;
        position: relative;
        margin-left: 1.5rem;

        @media (max-width: $mobile) {
            margin-left: auto;
        }
    }

    input {
        width: 10rem;
        padding: 0 0.5rem 0 2.25rem;
        border: 1px solid var(--hiq-color-gray-6);
        border-radius: 2rem;
        background-color: transparent;
        background-image: url("data:image/svg+xml,%3Csvg data-v-2d16cd4a='' xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24' fill='none' stroke='%238f96a3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-search'%3E%3Ccircle data-v-2d16cd4a='' cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cline data-v-2d16cd4a='' x1='21' y1='21' x2='16.65' y2='16.65'%3E%3C/line%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: 0.5rem 0.35rem;
        background-size: 1.25rem;
        outline: none;
        font-size: 16px;
        line-height: 2rem;
        color: var(--hiq-input-text-color);
        transition: all 0.2s ease;
        cursor: text;

        [data-theme='dark'] & {
            background-image: url("data:image/svg+xml,%3Csvg data-v-2d16cd4a='' xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24' fill='none' stroke='%235c6370' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-search'%3E%3Ccircle data-v-2d16cd4a='' cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cline data-v-2d16cd4a='' x1='21' y1='21' x2='16.65' y2='16.65'%3E%3C/line%3E%3C/svg%3E");
        }

        @media (max-width: $narrow) {
            position: relative;
            width: 0;
            border-color: transparent;
            cursor: pointer;
        }

        &:focus {
            border-color: var(--hiq-color-primary);
            cursor: auto;

            @media (max-width: $narrow) {
                left: 0;
                width: 10rem;
                cursor: text;
            }

            @media (max-width: $mobileNarrow) {
                width: 10rem;
            }
        }
    }

    .suggestions {
        position: absolute;
        top: 3.5rem;
        right: 0;
        width: 20rem;
        padding: 0.4rem;
        border: 1px solid var(--hiq-color-gray-6);
        border-radius: 6px;
        background-color: var(--hiq-body-background-color);
        color: var(--hiq-color-gray-3);
        list-style-type: none;

        @media (max-width: $mobileNarrow) {
            width: calc(100vw - 3rem);
        }

        &.align-right {
            right: 0;
        }
    }

    .suggestion {
        padding: 0.4rem 0.6rem;
        border-radius: 4px;
        line-height: 1.4;

        a {
            display: block;
            color: var(--hiq-color-gray-3) !important;
            cursor: pointer;
        }

        &.focused {
            background-color: var(--hiq-color-gray-7);
        }
    }

    /deep/ p {
        margin-bottom: 0;
    }

    .result-text {
        font-size: var(--hiq-font-size-5);
        font-weight: var(--hiq-font-weight-semibold);
    }

    .result-sub-text {
        margin-top: 0.25rem;
        font-size: var(--hiq-font-size-6);
        color: var(--hiq-color-gray-5);
    }
</style>
