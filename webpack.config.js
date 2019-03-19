const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
     entry: './app.js',
     output: {
         path: __dirname,
         filename: 'bundle.js'
     },
     module: {
         rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader'
                }
            }
        ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
};