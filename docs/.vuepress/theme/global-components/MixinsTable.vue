<template>
    <table class="utilities-table">
        <thead>
            <tr>
                <th>@mixin/.class</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="mixin in mixins"
                :id="`${mixin.name}-mixin`"
                :key="mixin.name"
            >
                <td class="mixin-class">
                    <code class="mixin">{{ mixin.name }}</code>
                    <br />
                    <code v-if="mixin.class" class="class"
                        >.{{ mixin.class }}</code
                    >
                </td>
                <td class="description">{{ mixin.description }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import mixins from '../data/mixins.json';

    export default {
        data() {
            return {
                mixins
            };
        }
    };
</script>

<style scoped>
    .class {
        opacity: 0.5;
    }
</style>
