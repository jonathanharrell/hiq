<template>
    <table class="browser-bugs-table">
        <thead>
            <tr>
                <th>Bug</th>
                <th>Browsers</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="bug in browserBugs"
                :id="bug.description"
                :key="bug.description"
            >
                <td>{{ bug.description }}</td>
                <td>{{ bug.browsers }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import browserBugs from '../data/browser-bugs.json';

    export default {
        data() {
            return {
                browserBugs
            };
        }
    };
</script>
