<template>
    <div class="browser-bugs">
        <div
            v-for="(bug, index) in bugs"
            :key="index"
            class="warning custom-block"
        >
            <p class="custom-block-title">WARNING</p>
            <p>NOTE: {{ bug.description }}</p>
        </div>
    </div>
</template>

<script>
    import browserBugs from '../data/browser-bugs.json';

    export default {
        props: {
            category: {
                type: String,
                default: ''
            }
        },

        computed: {
            bugs() {
                return browserBugs.filter(
                    bug => bug.category === this.category
                );
            }
        }
    };
</script>
