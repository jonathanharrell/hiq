<template>
    <div class="code-example">
        <slot />
    </div>
</template>

<style lang="scss">
    @import '../styles/sass-variables';

    .code-example {
        padding: var(--hiq-pre-padding-vertical)
            var(--hiq-pre-padding-horizontal);
        margin-right: -1.5rem;
        margin-left: -1.5rem;
        border-right: 0;
        border-left: 0;
        border-radius: 0;

        @media (min-width: $mobileNarrowUp) {
            margin: 1.5rem 0 0;
            border: 1px solid var(--hiq-color-gray-7);
            border-radius: var(--hiq-border-radius);
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
        }

        + div[class*='language-'] {
            margin-top: 0;

            pre {
                border-top: 0;
                border-top-right-radius: 0;
                border-top-left-radius: 0;
            }
        }

        button:not(:last-child),
        .button:not(:last-child),
        [role='button']:not(:last-child) {
            margin: 0 0.25rem 0.5rem 0;
        }

        p:last-of-type,
        ul:last-of-type,
        ol:last-of-type,
        dl:last-of-type {
            margin-bottom: 0;
        }

        blockquote,
        details,
        fieldset,
        figure,
        pre,
        table {
            margin: 0;
        }
    }
</style>
