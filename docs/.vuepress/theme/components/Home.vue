<template>
    <div class="home">
        <div class="warning custom-block browser-not-supported">
            <p class="custom-block-title">Warning</p>
            <p>
                Your browser does not support custom properties, which are
                required for this page to display correctly.
            </p>
        </div>
        <main id="main" tabindex="-1" aria-label="Main Content">
            <section class="hero">
                <HomeBackground />
                <div class="content__hero">
                    <h1 class="title">
                        <span>HiQ.</span>
                        A high-IQ CSS framework.
                    </h1>
                    <p class="description">
                        {{ $description }}
                    </p>
                    <div class="actions">
                        <NavLink
                            class="button action-button"
                            :item="{ link: '/guide/', text: 'Get started' }"
                        />
                        <a
                            href="https://hiq-theme-builder.netlify.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="button button-secondary action-button"
                        >
                            Build theme
                        </a>
                    </div>
                </div>
            </section>
            <Content custom />
        </main>
        <footer role="contentinfo" class="footer">
            <span>
                Copyright © 2017-present by
                <a href="https://www.jonathan-harrell.com" target="_blank">
                    Jonathan Harrell
                </a>
            </span>
            <a
                class="license"
                href="https://github.com/jonathanharrell/hiq/blob/master/license.md"
                target="_blank"
                rel="noopener noreferrer"
            >
                MIT Licensed
            </a>
        </footer>
    </div>
</template>

<script>
    import NavLink from './NavLink.vue';
    import HomeBackground from './HomeBackground.vue';

    export default {
        components: { NavLink, HomeBackground },

        computed: {
            data() {
                return this.$page.frontmatter;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '../styles/sass-variables';

    .home {
        --hiq-max-container-width: 60rem;

        display: flex;
        flex-direction: column;

        @media (min-width: $narrowUp) {
            height: calc(100vh - var(--navbar-height));
        }
    }

    main {
        display: flex;
        flex: 1;
        flex-direction: column;
        margin-top: calc(var(--navbar-height) * -1);
        padding-top: var(--navbar-height);
    }

    .hero {
        display: flex;
        flex: 0 0 auto;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        padding: 3rem 1.5rem;
        background-color: var(--hiq-color-gray-8);
        box-shadow: inset 0 2px 8px 0 rgba(0, 0, 0, 0.1);
        text-align: center;

        @media (min-width: $mobileNarrowUp) {
            padding-top: 5rem;
            padding-bottom: 5rem;
        }

        @media (min-width: $mobileUp) {
            min-height: 40vh;
            padding-top: 6rem;
            padding-bottom: 6rem;
        }

        @media (min-width: $narrowUp) {
            padding-top: 7rem;
            padding-bottom: 7rem;
        }

        svg {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100vw;
            min-width: 55rem;
            max-width: 75rem;
            height: auto;
            transform: translate(-50%, -50%);
        }
    }

    .content__hero {
        position: relative;
        max-width: var(--hiq-max-container-width);
        margin: 0 auto;

        @media (min-width: $mobileUp) {
            padding: 0 2.5rem;
        }
    }

    .title {
        font-size: 2.5rem;
        font-weight: var(--hiq-font-weight-bold);

        @media (min-width: $mobileUp) {
            font-size: 3.375rem;
        }

        span {
            color: var(--hiq-color-primary);
        }
    }

    .description {
        margin-top: 0.75rem;
        font-size: var(--hiq-font-size-large);
        line-height: 1.5;
        color: var(--hiq-color-gray-4);
    }

    .actions {
        margin-top: 1.5rem;
    }

    .action-button {
        height: auto;
        margin: 0.5rem;
        padding: 0.75rem 1.5rem;
        font-size: var(--hiq-font-size-large);
        box-shadow: hsla(0, 0, 0, 0.25) 0 1px 3px, hsla(0, 0, 0, 0.06) 0 1px 2px;
    }

    .button-secondary {
        border-color: var(--hiq-body-background-color);
        background-color: var(--hiq-body-background-color);
        color: var(--hiq-color-primary) !important;

        &:hover,
        &:focus,
        &:active {
            border-color: var(--hiq-color-gray-7) !important;
            background-color: var(--hiq-color-gray-7) !important;
        }
    }

    .content__default {
        flex: 1;
    }

    /deep/ .features {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
        grid-gap: 1.5rem 2rem;
        justify-content: space-between;
        padding: 1rem 0;

        @media (min-width: $mobileUp) {
            padding: 2rem 0;
        }

        @media (min-width: $narrowUp) {
            padding: 4rem 0;
        }
    }

    /deep/ .feature {
        img {
            width: 2.25rem;
            height: 2.25rem;
            margin: 0 0 1.25rem 0;
        }

        h2 {
            margin-bottom: 0.75rem;
            font-size: var(--hiq-font-size-4);
            font-weight: var(--hiq-font-weight-medium);
        }

        p {
            color: var(--hiq-color-gray-4);
        }
    }

    .footer {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        padding: 1.75rem 1.5rem;
        border-top: 1px solid var(--hiq-color-gray-6);
        color: var(--hiq-color-gray-5);

        a {
            color: var(--hiq-color-gray-5);

            &:hover {
                color: var(--hiq-color-gray-4);
            }
        }
    }
</style>
