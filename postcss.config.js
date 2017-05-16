module.exports = {
    plugins: [
        require('postcss-import')(),
        require('postcss-strip-units'),
        require('postcss-cssnext')({
            features: {
                rem: {html: false},
                customProperties: {
                    preserve: true,
                    appendVariables: true
                }
            }
        })
    ]
}
