var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); // html inject
var webpack = require('webpack');
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
        filename: "[name].js"
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
            use: [{
                loader: "style-loader" // 将 css 打入 html 内联
            }, {
                loader: "css-loader" // 可用在 js 中引入 css
            }, {
                loader: "less-loader" // 编译less
            }, {
                loader: "postcss-loader",
                options: {
                  plugins: function () {
                    return [
                        require('autoprefixer') // 自动补全样式
                    ];
                  }
                }
            }],
            exclude: /node_modules/
        }, {
            test: /\.png|jpg$/,
            use: [{
                loader: 'url-loader',
                options:  {
                    limit: 10000,
                    name: '[name].[ext]'
                }
            }]
        }],
    },
    plugins: [
        /*
        * 注入资源产物到html
        */
	    new HtmlWebpackPlugin({
	      	template: path.resolve(__dirname, '../index.html')
	    }),
        /*
        * 注入环境变量，可直接在js中使用
        * */
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
            }
        })
  	],
    resolve: {
        extensions: ['.js', '.jsx', '.json'], // 配置可忽略后缀
        alias: {
            src: path.resolve(__dirname, '../src') // 配置简写路径
        }
    },
    devtool: "#inline-source-map"
}