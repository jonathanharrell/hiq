<template>
    <div class="browser-bugs">
        <div class="warning custom-block" v-for="(bug, index) in bugs" :key="index">
            <p class="custom-block-title">WARNING</p>
            <p>NOTE: {{ bug.description }}</p>
        </div>
    </div>
</template>

<script>
    import browserBugs from '../data/browser-bugs'

    export default {
        props: ['category'],

        computed: {
            bugs () {
                return browserBugs.filter(bug => bug.category === this.category)
            }
        }
    }
</script>
