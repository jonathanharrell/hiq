module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-mixins'),
        require('postcss-cssnext')({
            features: {
                rem: {html: false},
                customProperties: {preserve: true}
            }
        }),
        require('postcss-discard-duplicates')
    ]
}
