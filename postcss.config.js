module.exports = {
    plugins: [
        require('postcss-import')(),
        require('postcss-mixins')(),
        require('postcss-custom-selectors')(),
        require('postcss-nesting')(),
        require('autoprefixer')(),
        require('postcss-custom-media')()
    ]
}
