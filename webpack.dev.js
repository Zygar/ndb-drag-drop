const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), 
    host: '0.0.0.0', // makes available over lan
    open: true,
    // lan: true,
    useLocalIp: true // makes it easier to use handoff to open on mobile
  },
  module: {
    rules: [
      { 
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          publicPath: "../",
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders:1,
                import: false, // PostCSS-import is handling our imports.
                sourceMap: true
              }
            }, 
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            }
            ]
        })
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({filename: "css/bundle.css"}),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "js/bundle.js",
    // publicPath: "/"
  }

})
