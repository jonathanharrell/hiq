<script>
export default {
    functional: true,
    props: {
        type: {
            type: String,
            default: 'tip'
        },
        text: String,
        vertical: {
            type: String,
            default: 'top'
        }
    },
    render(h, { props, slots }) {
        return h('span', {
            class: ['badge', props.type, props.vertical]
        }, props.text || slots().default)
    }
}
</script>

<style lang="scss" scoped>
    .badge {
        display: inline-block;
        height: 18px;
        margin-right: 5px;
        padding: 0 6px;
        border-radius: 3px;
        font-size: 14px;
        line-height: 18px;
        background-color: #42b983;
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
            background-color: #DA5961;
        }

        &.warning,
        &.warn,
        &.yellow {
            background-color: #e7c000;
        }
    }
</style>
