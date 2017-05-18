const webpack = require('webpack')
const path = require('path')
const glob = require('glob')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const inProduction = (process.env.NODE_ENV === 'production')

module.exports = {
    entry: {
        hiq: [
            './css/hiq.css'
        ]
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?importLoaders=1,url=false!postcss-loader'
                })
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin((inProduction ? '[name].min.css' : '[name].css')),

        new StyleLintPlugin({
            files: ['**/*.css']
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: inProduction
        }),

        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            files: [
                path.join(__dirname, '**/*.html'),
                path.join(__dirname, 'dist/*')
            ],
            open: false,
            notify: false
        })
    ]
}
