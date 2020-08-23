<template>
    <div class="theme-container">
        <div class="content">
            <h1>404</h1>
            <blockquote>{{ getMsg() }}</blockquote>
            <router-link to="/">Take me home.</router-link>
        </div>
    </div>
</template>

<script>
    const msgs = [
        `There's nothing here.`,
        `How did we get here?`,
        `That's a Four-Oh-Four.`,
        `Looks like we've got some broken links.`
    ]

    export default {
        methods: {
            getMsg () {
                return msgs[Math.floor(Math.random() * msgs.length)]
            }
        }
    }
</script>

<style src="../../../../dist/hiq.css"></style>
<style src="../styles/variables.scss" lang="scss"></style>
<style src="../styles/global.scss" lang="scss"></style>

<style scoped>
    .content {
        max-width: var(--hiq-max-container-width);
        margin: 0 auto;
        padding: 2rem 2.5rem 2rem;
        text-align: center;
    }
</style>
