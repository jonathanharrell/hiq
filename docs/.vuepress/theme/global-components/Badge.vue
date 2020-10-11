<script>
    export default {
        functional: true,

        props: {
            type: {
                type: String,
                default: 'tip'
            },

            text: {
                type: String,
                default: ''
            },

            vertical: {
                type: String,
                default: 'top'
            }
        },

        render(createElement, { props, slots }) {
            return createElement(
                'span',
                {
                    class: ['badge', props.type, props.vertical]
                },
                props.text || slots().default
            );
        }
    };
</script>

<style lang="scss" scoped>
    .badge {
        display: inline-block;
        height: 18px;
        margin-right: 5px;
        padding: 0 6px;
        border-radius: 3px;
        background-color: #42b983;
        font-size: 14px;
        line-height: 18px;
        color: white;

        &.middle {
            vertical-align: middle;
        }

        &.top {
            vertical-align: top;
        }

        &.tip,
        &.green {
            background-color: #42b983;
        }

        &.error {
            background-color: #da5961;
        }

        &.warning,
        &.warn,
        &.yellow {
            background-color: #e7c000;
        }
    }
</style>
