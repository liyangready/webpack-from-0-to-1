const env = process.env.NODE_ENV;

if (env === 'development') {
    module.exports = require('./compile/webpack.dev');
} else {
    module.exports = require('./compile/webpack.prod');
}
