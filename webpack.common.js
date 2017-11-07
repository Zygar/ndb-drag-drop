const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // Set context to source directory
  context: path.resolve(__dirname, 'src'),
  entry: ['babel-polyfill', './app.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(webpack-dev-server)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.modernizrrc(\.json)?$/,
        use: [ 'modernizr-loader', 'json-loader' ]
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "public/fonts/"
          }
        }]
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "public/images/"
          }
        }]
      }
    ]
  },
  resolve: {
      alias: {
        modernizr$: path.resolve(__dirname, ".modernizrrc.json"), 
        Fonts: path.resolve(__dirname, "src/fonts/")
      }
    },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new webpack.ProvidePlugin({
        // $: "jquery",
        // jQuery: "jquery",
        // "window.jQuery": "jquery",
        Modernizr: "modernizr",
        "window.Modernizr": "modernizr"
    })
    ]
};
