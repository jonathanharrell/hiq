module.exports = {
    plugins: [
        require('postcss-easy-import')({ extensions: '.pcss' }),
        require('postcss-mixins'),
        require('postcss-custom-selectors'),
        require('postcss-nesting'),
        require('autoprefixer'),
        require('postcss-custom-media'),
        require('postcss-discard-comments')
    ]
}
