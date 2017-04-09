var fs = require('fs');
var path = require('path');
var node_modules = path.resolve(__dirname, '../node_modules');
// 需要源码打包的模块，正则，相对 node_modules 的位置
var source_position = [
    /^\.\.\/src\//, // src 目录 ../src
    /^test/, // test 开头的包默认源码打包 test
];

function source_modules(pather){
    var position = path.relative(node_modules, pather);
    var result = false; // 默认都跳过
    source_position.forEach(function (item) {
        // 返回 false 需要源码打包
        if (item.test(position)) {
            result = true;
        }
    });
    return result;
}

module.exports = source_modules;