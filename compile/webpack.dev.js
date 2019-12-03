const base = require('./base');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(base, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
    }
});
