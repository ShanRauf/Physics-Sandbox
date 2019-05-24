const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
     entry: './app.js',
     
     output: {
         path: path.resolve(__dirname, 'dist'),
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
  //    plugins: [
  //   new HtmlWebpackPlugin({
  //     title: 'Project Demo',
  //     hash: true,
  //     alwaysWriteToDisk: true,
  //     template: './src/index.pug'
  //   }),
  //   new HtmlWebpackHarddiskPlugin(),
  //   new ExtractTextPlugin({
  //     filename: 'app.css',
  //     disable: !isProd,
  //     allChunks: true
  //   }),
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.NamedModulesPlugin()
  // ]
};