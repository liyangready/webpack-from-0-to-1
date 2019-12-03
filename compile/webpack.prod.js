const base = require('./base');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(base, {
    output: {
        // publicPath: '', // cdn address
        filename: '[name].[contenthash:8].js',
        chunkFilename: '[name].[contenthash:8].js',
    },
    optimization: {
        runtimeChunk: 'single',
        moduleIds: 'hashed', // for chunk hash stable when import list change.
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ScriptExtHtmlWebpackPlugin({ // inject manifest to html inline script.
            inline: /runtime/,
        }),
        // new BundleAnalyzerPlugin(),
    ],
    mode: 'production',
});
