const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDev = process.env.NODE_ENV === 'development';
module.exports = {
  entry: {
    index: "./src/index.ts"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname, "../dist")
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.[j|t]sx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      // { test: /\.tsx?$/, loader: "babel-loader" },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev
            }
          },
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: '[contenthash:8].[ext]',
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isDev ? '[name].css' : '[name].[contenthash:8].css',
      chunkFilename: isDev ? '[id].css' : '[name].[contenthash:8].css',
    }),
  ]
};
