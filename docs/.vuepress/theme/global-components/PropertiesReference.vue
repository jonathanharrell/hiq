<template>
    <div class="properties-reference">
        <p>
            <label for="search" class="is-visually-hidden">
                Search properties...
            </label>
            <input
                id="search"
                v-model="query"
                type="search"
                placeholder="Search properties..."
                autocomplete="off"
            />
        </p>
        <table v-if="properties.length" class="properties-table">
            <thead>
                <tr>
                    <th>Property Name (global/local)</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="property in properties"
                    :id="property.name.replace('--', '')"
                    :key="property.name"
                >
                    <td class="name">
                        <code v-html="renderName(property.name)"></code><br />
                        <code
                            v-if="property.local"
                            style="--code-background-color: var(--hiq-selection-color);"
                            v-html="renderLocalName(property.local)"
                        ></code>
                    </td>
                    <td class="description">{{ property.description }}</td>
                </tr>
            </tbody>
        </table>
        <p v-else>
            There are no properties matching your query
        </p>
    </div>
</template>

<script>
    import propertiesConfig from '../data/custom-properties.json';

    export default {
        data() {
            return {
                query: ''
            };
        },

        computed: {
            properties() {
                return propertiesConfig.filter(property => {
                    return (
                        property.name
                            .toLowerCase()
                            .includes(this.query.toLowerCase()) ||
                        (property.local &&
                            property.local
                                .toLowerCase()
                                .includes(this.query.toLowerCase()))
                    );
                });
            }
        },

        methods: {
            renderName(name) {
                if (this.query) {
                    return name.replace(
                        this.query,
                        `<strong>${this.query}</strong>`
                    );
                }

                return name;
            },

            renderLocalName(local) {
                if (this.query) {
                    return local.replace(
                        this.query,
                        `<strong>${this.query}</strong>`
                    );
                }

                return local;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .properties-reference {
        margin-top: 2rem;

        p {
            margin-bottom: 1.5rem;
        }
    }
</style>
