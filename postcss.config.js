module.exports = {
    plugins: [
        require('postcss-import')(),
        require('postcss-mixins')(),
        require('postcss-nesting')(),
        require('postcss-custom-media')()
    ]
}
