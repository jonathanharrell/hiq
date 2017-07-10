module.exports = {
    plugins: [
        require('postcss-import')({
            plugins: [
                require('stylelint')
            ]
        }),
        require('postcss-mixins'),
        require('postcss-cssnext')({
            features: {
                rem: false,
                customProperties: { preserve: true }
            }
        }),
        require('postcss-discard-duplicates')
    ]
}
