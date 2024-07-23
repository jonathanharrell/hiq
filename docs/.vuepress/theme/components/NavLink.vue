<template>
    <RouterLink
        v-if="!isExternal(link)"
        class="nav-link"
        :to="link"
        :exact="exact"
    >
        {{ item.text }}
    </RouterLink>
    <a
        v-else
        :href="link"
        class="nav-link external"
        target="_blank"
        rel="noopener noreferrer"
    >
        {{ item.text }}
    </a>
</template>

<script>
    import { isExternal, ensureExt } from '../util';

    export default {
        props: {
            item: {
                type: Object,
                required: true,
            },
        },

        computed: {
            link() {
                return ensureExt(this.item.link);
            },

            exact() {
                if (this.$site.locales) {
                    return Object.keys(this.$site.locales).some(
                        (rootLink) => rootLink === this.link
                    );
                }

                return this.link === '/';
            },
        },

        methods: {
            isExternal,
        },
    };
</script>
