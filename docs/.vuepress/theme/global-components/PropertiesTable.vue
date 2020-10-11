<template>
    <table class="properties-table">
        <thead>
            <tr>
                <th v-if="colors"></th>
                <th>Property Name (global/local)</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="property in properties" :key="property.name">
                <td v-if="colors">
                    <span
                        class="color-swatch"
                        :style="{ backgroundColor: property.default }"
                    />
                </td>
                <td class="name">
                    <code>{{ property.name }}</code>
                    <br />
                    <code
                        v-if="property.local"
                        style="--code-background-color: var(--hiq-selection-color);"
                        >{{ property.local }}</code
                    >
                </td>
                <td class="description">{{ property.description }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import propertiesConfig from '../data/custom-properties';

    export default {
        props: {
            category: {
                type: String,
                default: ''
            }
        },

        computed: {
            properties() {
                return propertiesConfig.filter(
                    property => property.category === this.category
                );
            },

            colors() {
                return this.properties.every(
                    property => property.type === 'color'
                );
            }
        }
    };
</script>
