<template>
    <table class="properties-table">
        <thead>
            <tr>
                <th v-if="colors"></th>
                <th>Property Name</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="property in properties">
                <td v-if="colors">
                    <span class="color-swatch" :style="{ backgroundColor: property.default }"></span>
                </td>
                <td class="name"><code>{{ property.name }}</code></td>
                <td>{{ property.description }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import propertiesConfig from '../data/custom-properties'

    export default {
        props: ['category'],

        computed: {
            properties () {
                return propertiesConfig.filter(property => property.category === this.category)
            },

            colors () {
                return this.properties.every(property => property.type === 'color')
            }
        }
    }
</script>

<style>
    .color-swatch {
        display: block;
        width: 1.5rem;
        height: 1.5rem;
        border: 1px solid var(--hiq-gray-lighter);
    }
</style>
