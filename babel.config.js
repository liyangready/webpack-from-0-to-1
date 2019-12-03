module.exports = function (api) {
    api.cache(true);
    const presets = [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript"
    ];
    const plugins = [
        // for some runtime polyfill like promise...
        // ["@babel/plugin-transform-runtime", {
        //     "corejs": 2,
        // }]
    ];
    return {
        presets,
        plugins,
    };
};
