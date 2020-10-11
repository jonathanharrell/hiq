<template>
    <table class="utilities-table">
        <thead>
            <tr>
                <th>Selector</th>
                <th>Selected Elements</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="selector in selectors"
                :id="`${selector.name.replace(':--', '')}-selector`"
                :key="selector.name"
            >
                <td class="name">
                    <code>{{ selector.name }}</code>
                </td>
                <td class="description">{{ selector.description }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import selectors from '../data/custom-selectors';

    export default {
        data() {
            return {
                selectors
            };
        }
    };
</script>
