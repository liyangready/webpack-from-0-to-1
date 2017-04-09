var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); // html inject
var webpack = require('webpack');
var chunkSorts = ["manifest", "vendor", "app"]; // js顺序
var InlineManifestWebpackPlugin = require('inline-manifest2-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractLESS = new ExtractTextPlugin('[name].[chunkhash].css');
var cdn = {
    static: '//static.xxx.com',
    img: '//img.xxx.com'
}

module.exports = {
    /*
    * 入口文件
    * vendor 为公用文件，更新频率较低
    * app 为业务文件，频繁更新
    * */
    entry: {
        vendor: ['jquery'],
        app: path.resolve(__dirname, '../src/index')
    },
    /*
    * 打包产物输出目录
    * */
    output: {
        path: path.resolve(__dirname, '../build/'),
        filename: "[name].[chunkhash].js",
        publicPath: cdn.static
    },
    module: {
        rules: [{
            test: /\.js|\.jsx$/, 
            use: [{
                loader: "babel-loader"
            }],
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            use: extractLESS.extract([ 'css-loader', 'less-loader', {
                loader: "postcss-loader",
                options: {
                    plugins: function () {
                        return [
                            require('autoprefixer') // 自动补全样式
                        ];
                    }  
                }
            }]),   
            exclude: /node_modules/
        }, {
            test: /\.png|jpg$/,
            use: [{
                loader: 'url-loader',
                options:  {
                    limit: 1,
                    name: '[name].[ext]',
                    publicPath: cdn.img + '/'
                }
            }]
        }],
    },
    plugins: [
        /*
        * 注入资源产物到html
        */
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            filename: './index.html',
            excludeChunks: ['manifest'],
            chunksSortMode: function (a, b) {
                return chunkSorts.indexOf(a.names[0]) - chunkSorts.indexOf(b.names[0]);
            }
        }),
        /*
        * 注入环境变量，可直接在js中使用
        * */
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            }
        }), 
        /*
        * 抽出公共文件
        * */
        new webpack.optimize.CommonsChunkPlugin({
            names: [ "vendor", "manifest"]
        }),
        /*
        * manifest inline
        * */
        new InlineManifestWebpackPlugin({
            name: 'webpackManifest',
            deleteFile: true
        }),
        extractLESS
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json'], // 配置可忽略后缀
        alias: {
            src: path.resolve(__dirname, '../src') // 配置简写路径
        }
    }
}