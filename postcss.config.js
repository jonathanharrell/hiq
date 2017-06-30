module.exports = (ctx) => ({
    plugins: [
        require('postcss-import')(),
        require('postcss-mixins')(),
        require('postcss-cssnext')({
            features: {
                rem: {html: false},
                customProperties: {
                    preserve: ctx.env === 'production' ? false : true
                }
            }
        }),
        require('postcss-discard-duplicates')()
    ]
})
