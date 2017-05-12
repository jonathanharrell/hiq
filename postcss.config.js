module.exports = {
    plugins: [
        require('postcss-import')(),
        require('postcss-cssnext')({features: {rem: {html: false}}}),
        require('postcss-responsive-type')()
    ]
}
