<template>
    <div class="sidebar-button" @click="$emit('toggle-sidebar')">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 448 512">
            <path fill="currentColor" d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"></path>
        </svg>
    </div>
</template>

<style>
    .sidebar-button {
        display: none;
        position: absolute;
        top: 0.75rem;
        left: 1rem;
        width: 2.25rem;
        height: 2.25rem;
        padding: 0.5rem;
    }

    .sidebar-button .icon {
        display: block;
        width: 1.25rem;
        height: 1.25rem;
    }

    @media (max-width: $mobile) {
        .sidebar-button {
            display: block;
        }
    }
</style>
