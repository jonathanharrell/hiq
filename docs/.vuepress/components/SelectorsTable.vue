<template>
    <table class="utilities-table">
        <thead>
            <tr>
                <th>Selector</th>
                <th>Selected Elements</th>
            </tr>
        </thead>
        <tbody>
            <tr :id="selector.name" v-for="selector in selectors">
                <td class="name"><code>{{ selector.name }}</code></td>
                <td class="description">{{ selector.description }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import selectors from '../data/custom-selectors'

    export default {
        data () {
            return {
                selectors
            }
        }
    }
</script>
