<template>
    <div class="properties-reference">
        <p>
            <label for="search" class="is-visually-hidden">Search properties...</label>
            <input
                type="search"
                id="search"
                v-model="query"
                placeholder="Search properties..."
            >
        </p>
        <table class="properties-table">
            <thead>
                <tr>
                    <th>Property Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="property in properties">
                    <td class="name"><code v-html="renderName(property.name)"></code></td>
                    <td class="description">{{ property.description }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import propertiesConfig from '../data/custom-properties'

    export default {
        data () {
            return {
                query: ''
            }
        },

        computed: {
            properties () {
                return propertiesConfig.filter(property => property.name.toLowerCase().includes(this.query.toLowerCase()))
            }
        },

        methods: {
            renderName (name) {
                if (this.query) {
                    return name.replace(this.query, `<strong>${this.query}</strong>`)
                }

                return name
            }
        }
    }
</script>

<style>
    .properties-reference {
        margin-top: 3rem;
    }

    .properties-reference p {
        margin-bottom: 1.5rem;
    }
</style>
