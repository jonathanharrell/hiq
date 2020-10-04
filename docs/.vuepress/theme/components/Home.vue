<template>
    <div class="home">
        <div class="warning custom-block browser-not-supported">
            <p class="custom-block-title">WARNING</p>
            <p>
                Your browser does not support custom properties, which are
                required for this page to display correctly.
            </p>
        </div>
        <div class="hero">
            <img
                v-if="data.heroImage"
                :src="$withBase(data.heroImage)"
                alt="hero"
            />
            <h1>{{ data.heroText || $title || 'Hello' }}</h1>
            <p class="description">
                {{
                    data.tagline ||
                        $description ||
                        'Welcome to your VuePress site'
                }}
            </p>
            <p v-if="data.actionText && data.actionLink" class="action">
                <NavLink
                    role="button"
                    class="action-button"
                    :item="actionLink"
                />
            </p>
        </div>
        <div v-if="data.features && data.features.length" class="features">
            <div
                v-for="feature in data.features"
                :key="feature.title"
                class="feature"
            >
                <h2>{{ feature.title }}</h2>
                <p>{{ feature.details }}</p>
            </div>
        </div>
        <Content custom />
        <div class="footer">
            MIT Licensed | Copyright © 2017-present
            <a href="https://www.jonathan-harrell.com" target="_blank"
                >Jonathan Harrell</a
            >
        </div>
    </div>
</template>

<script>
    import NavLink from './NavLink.vue';

    export default {
        components: { NavLink },

        computed: {
            data() {
                return this.$page.frontmatter;
            },

            actionLink() {
                return {
                    link: this.data.actionLink,
                    text: this.data.actionText
                };
            }
        }
    };
</script>

<style>
    .home {
        max-width: 960px;
        margin: 0 auto;
        padding: var(--navbar-height) 2rem 0;
    }

    .home .hero {
        text-align: center;
    }

    .home .hero img {
        display: block;
        max-height: 280px;
        margin: 3rem auto 1.5rem;
    }

    .home .hero h1,
    .home .hero .description,
    .home .hero .action {
        margin: 1.8rem auto;
    }

    .home .hero h1 {
        font-weight: var(--hiq-font-weight-medium);
    }

    .home .hero .description {
        max-width: 30rem;
        font-size: var(--hiq-font-size-large);
        line-height: 1.3;
        color: var(--hiq-color-gray-5);
    }

    .home .hero .action-button {
        display: inline-block;
        height: auto;
        padding: 0.75rem 1.5rem;
        font-size: var(--hiq-font-size-large);
    }

    .home .features {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        align-content: stretch;
        justify-content: space-between;
        margin-top: 2.5rem;
        padding: 2.5rem 0 1rem;
        border-top: 1px solid var(--hiq-color-gray-6);
    }

    .home .feature {
        flex-grow: 1;
        flex-basis: 30%;
        max-width: 30%;
        margin-bottom: 0.5rem;
    }

    .home .feature h2 {
        margin-bottom: 0.5rem;
        border-bottom: 0;
        font-size: var(--hiq-font-size-4);
        font-weight: var(--hiq-font-weight-medium);
    }

    .home .feature p {
        color: var(--hiq-color-gray-4);
    }

    .home .footer {
        padding: 2.5rem;
        border-top: 1px solid var(--hiq-color-gray-6);
        text-align: center;
        color: var(--hiq-color-gray-5);
    }

    .home .footer a {
        color: var(--hiq-color-gray-5);
    }

    .home .footer a:hover {
        color: var(--hiq-color-gray-4);
    }

    @media (max-width: $mobile) {
        .home .features {
            flex-direction: column;
        }

        .home .feature {
            max-width: 100%;
            padding: 0 2.5rem;
        }
    }

    @media (max-width: $mobileNarrow) {
        .home {
            padding-right: 1.5rem;
            padding-left: 1.5rem;
        }

        .home .hero img {
            max-height: 210px;
            margin: 2rem auto 1.2rem;
        }

        .home .hero h1,
        .home .hero .description,
        .home .hero .action {
            margin: 1.2rem auto;
        }

        .home .hero .action-button {
            padding: 0.6rem 1.2rem;
        }
    }
</style>
