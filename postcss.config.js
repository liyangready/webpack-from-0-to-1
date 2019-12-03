module.exports = {
    plugins: [
        require('autoprefixer'), // use browserslist from package.json
        // for mobile can use px2rem
        // require('postcss-px2rem')({
        //     baseDpr: 1,
        //     remUnit: 37.5,
        //     forcePxComment: '!px',
        //     keepComment: '!no',
        // }),
    ],
};
