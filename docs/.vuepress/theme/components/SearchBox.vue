<template>
    <div class="search-box">
        <input
            @input="query = $event.target.value"
            aria-label="Search"
            :value="query"
            autocomplete="off"
            spellcheck="false"
            @focus="focused = true"
            @blur="focused = false"
            @keyup.enter="go(focusIndex)"
            @keyup.up="onUp"
            @keyup.down="onDown"
            @keydown.esc="query = ''"
        >
        <ul class="suggestions"
            v-if="showSuggestions"
            :class="{ 'align-right': alignRight }"
            @mouseleave="unfocus"
        >
            <li
                class="suggestion" v-for="(s, i) in suggestions"
                :class="{ focused: i === focusIndex }"
                @mousedown="go(i)"
                @mouseenter="focus(i)"
            >
                <a :href="s.path" @click.prevent> <span class="page-title">{{ s.title || s.path }}</span>
                    <span v-if="s.header" class="header">&gt; {{ s.header.title }}</span> </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                query: '',
                focused: false,
                focusIndex: 0
            }
        },

        computed: {
            showSuggestions () {
                return (
                    this.focused &&
                    this.suggestions &&
                    this.suggestions.length
                )
            },

            suggestions () {
                const query = this.query.trim().toLowerCase()
                if (!query) {
                    return
                }

                const {pages, themeConfig} = this.$site
                const max = themeConfig.searchMaxSuggestions || 5
                const localePath = this.$localePath
                const matches = item => (
                    item.title &&
                    item.title.toLowerCase().indexOf(query) > -1
                )
                const res = []
                for (let i = 0; i < pages.length; i++) {
                    if (res.length >= max) break
                    const p = pages[i]
                    // filter out results that do not match current locale
                    if (this.getPageLocalePath(p) !== localePath) {
                        continue
                    }
                    if (matches(p)) {
                        res.push(p)
                    } else if (p.headers) {
                        for (let j = 0; j < p.headers.length; j++) {
                            if (res.length >= max) break
                            const h = p.headers[j]
                            if (matches(h)) {
                                res.push(Object.assign({}, p, {
                                    path: p.path + '#' + h.slug,
                                    header: h
                                }))
                            }
                        }
                    }
                }
                return res
            },

            // make suggestions align right when there are not enough items
            alignRight () {
                const navCount = (this.$site.themeConfig.nav || []).length
                const repo = this.$site.repo ? 1 : 0
                return navCount + repo <= 2
            }
        },

        methods: {
            getPageLocalePath (page) {
                for (const localePath in this.$site.locales || {}) {
                    if (localePath !== '/' && page.path.indexOf(localePath) === 0) {
                        return localePath
                    }
                }
                return '/'
            },

            onUp () {
                if (this.showSuggestions) {
                    if (this.focusIndex > 0) {
                        this.focusIndex--
                    } else {
                        this.focusIndex = this.suggestions.length - 1
                    }
                }
            },

            onDown () {
                if (this.showSuggestions) {
                    if (this.focusIndex < this.suggestions.length - 1) {
                        this.focusIndex++
                    } else {
                        this.focusIndex = 0
                    }
                }
            },

            go (i) {
                if (!this.showSuggestions) {
                    return
                }
                this.$router.push(this.suggestions[i].path)
                this.query = ''
                this.focusIndex = 0
            },

            focus (i) {
                this.focusIndex = i
            },

            unfocus () {
                this.focusIndex = -1
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/sass-variables";

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
        padding: 0 0.5rem 0 2rem;
        border: 1px solid var(--hiq-color-gray-6);
        border-radius: 2rem;
        background: white url(../search.svg) 0.6rem 0.5rem no-repeat;
        background-size: 1rem;
        outline: none;
        font-size: 16px;
        line-height: 2rem;
        color: var(--hiq-color-gray-5);
        transition: all 0.2s ease;
        cursor: text;

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
                width: 10rem;
                left: 0;
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
        background-color: white;
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
        cursor: pointer;

        a {
            color: var(--hiq-color-gray-4);

            .page-title {
                font-weight: var(--hiq-font-weight-semibold);

                + .header {
                    margin-left: 0.25rem;
                    font-size: var(--hiq-font-size-small);
                }
            }
        }

        &.focused {
            background-color: var(--hiq-color-gray-7);

            a {
                color: var(--hiq-color-primary);
            }
        }
    }
</style>
