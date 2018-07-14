<template>
    <table class="utilities-table">
        <thead>
            <tr>
                <th>@mixin/.class</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr :id="mixin.name" v-for="mixin in mixins">
                <td class="mixin-class">
                    <code class="mixin">{{ mixin.name }}</code>
                    <br/><code class="class" v-if="mixin.class">.{{ mixin.class }}</code>
                </td>
                <td class="description">{{ mixin.description }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import mixins from '../data/mixins'

    export default {
        data () {
            return {
                mixins
            }
        }
    }
</script>

<style>
    .class {
        opacity: 0.5;
    }
</style>
