const path = require('path')

const webpack = require('webpack')

// plugin HTML for webpack
const HTMLWebpackPlugin = require('html-webpack-plugin')

// Плагин для отчистки папки dist
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

// Плагин копирования
const CopyWebpackPlugin = require('copy-webpack-plugin')

// MiniCSSExtractPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Плагины оптимизации css файлов
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

// Определили переменную, которая хранит в себе значение системной переменно NODE_ENV
const isDev = process.env.NODE_ENV === 'development'

// webpack analyzer
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

// Плагины
const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'public/dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ]

    if (!isDev) {
        base.push(new BundleAnalyzerPlugin())
    }

    return base
}

// loaders
const cssLoaders = extra => {
    const loaders = [MiniCssExtractPlugin.loader, 'css-loader']

    if (extra) {
        extra.forEach(item => loaders.push(item))
    }

    return loaders
}

// Функция оптимизации
const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: 'single',
    }

    if (!isDev) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config
}

// babel
const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}

// jsLoaders
const jsLoaders = () => {
    const loaders = [{
            loader: 'babel-loader',
            options: babelOptions()
        }]

    if (isDev) {
        loaders.push({loader: 'eslint-loader'})
    }

    return loaders
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './js/index.jsx'],
        analytics: './js/analytics.ts'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'public/dist')
    },
    resolve: {
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': 'src'
        }
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev,
    },
    devtool: isDev ? 'source-map' : 'eval',
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.m?ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript')
                }
            },
            {
                test: /\.m?jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react')
                }
            }
        ]
    }
}
