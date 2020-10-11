<template>
    <button
        class="sidebar-button"
        aria-hidden="true"
        @click="$emit('toggle-sidebar')"
    >
        <span class="is-visually-hidden">
            Site menu
        </span>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            class="icon"
            role="img"
        >
            <path
                fill="currentColor"
                d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
            ></path>
        </svg>
    </button>
</template>

<style lang="scss" scoped>
    @import '../styles/sass-variables';

    .sidebar-button {
        display: block;
        position: absolute;
        top: 0.75rem;
        left: 1rem;
        width: 2.25rem;
        height: 2.25rem;
        padding: 0.5rem;
        border: 0;
        background: transparent;
        color: var(--hiq-color-text-color);

        @media (min-width: $mobileUp) {
            display: none;
        }

        .icon {
            display: block;
            width: 1.25rem;
            height: 1.25rem;
        }
    }
</style>
