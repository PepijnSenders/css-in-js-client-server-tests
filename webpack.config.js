const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const context = path.join(__dirname, 'src');

var babelRc = JSON.parse(
    fs.readFileSync(
        path.join(process.cwd(), '.babelrc')
    ).toString()
);

module.exports = {
    name: 'account-area.dev.universal',
    devtool: 'eval',
    context: context,
    entry: [
        'babel-polyfill',
        './client.js',
    ],
    output: {
        path: path.join(context, '..', 'public', 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    resolve: {
        root: [
            context
        ],
        extensions: [ '', '.js', '.jsx' ]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: babelRc,
                include: context,
                exclude: path.join(context, '..', 'node_modules'),
            }
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
    ]
};
