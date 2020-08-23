<template>
    <table class="browser-bugs-table">
        <thead>
            <tr>
                <th>Bug</th>
                <th>Browsers</th>
            </tr>
        </thead>
        <tbody>
            <tr :id="bug.description" v-for="bug in browserBugs">
                <td>{{ bug.description }}</td>
                <td>{{ bug.browsers }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import browserBugs from '../data/browser-bugs'

    export default {
        data () {
            return {
                browserBugs
            }
        }
    }
</script>
