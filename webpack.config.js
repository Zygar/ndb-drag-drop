const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const webpack = require('webpack');

module.exports = {
  // Set context to source directory
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './app.js', // resolves to src/app.js
  },
  module: {
    rules: [
      { 
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: "css-loader"
        })
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: "file-loader"
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),    // New
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new ExtractTextPlugin("styles.css")
    ]
};
