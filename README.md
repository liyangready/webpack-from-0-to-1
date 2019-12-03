## What
project template based on the lasted webpack.

## Include

+ [x]  es2015
+ [x]  eslint/tslint
+ [x]  typescript
+ [x]  react jsx
+ [x]  dev server
+ [x]  hot reload
+ [x]  postcss
+ [x]  less
+ [x]  generate html
+ [x]  file hash
+ [x]  code split
+ [x]  import img module
+ [x]  bundle analyze
+ [x]  time analyze
+ [x]  test
+ [x]  commit spec

## Notes

### es5 runtime polyfill

if you want some runtime polyfill like Promise/Set...：
 + switch the `awesome-typescript-loader` to `babel-loader` in `compile/base.js`
 + use `@babel/plugin-transform-runtime` in `babel.config.js`.

### when production assets is big.

open BundleAnalyzerPlugin in `compile/webpack.prod.js`

### change chunks list

config optimization in `compile/webpack.prod.js`

### CDN address

config output.publicPath in `compile/webpack.prod.js`. config `url-loader` if assets is `png/jpg...`.


