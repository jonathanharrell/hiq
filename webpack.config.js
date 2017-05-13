const webpack = require('webpack')
const path = require('path')
const glob = require('glob')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
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
            },

            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            },

            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[ext]'
                        }
                    },

                    'img-loader'
                ]
            },

            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                exclude: /node_modules/
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),

        new ExtractTextPlugin('[name].css'),

        new StyleLintPlugin({
            files: ['**/*.css']
        }),

        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, '**/*.html')),
            minimize: inProduction
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

if (inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    )
}
