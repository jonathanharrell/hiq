module.exports = {
    plugins: [
        require('postcss-easy-import'),
        require('postcss-mixins'),
        require('postcss-custom-selectors'),
        require('postcss-nested'),
        require('autoprefixer'),
        require('postcss-custom-media'),
        require('postcss-discard-comments')
    ]
}
