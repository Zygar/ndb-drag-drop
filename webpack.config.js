const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // Set context to source directory
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './app.js', // resolves to src/app.js
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "js/bundle.js",
    // publicPath: "/"
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.modernizrrc.js$/,
        use: [ 'modernizr-loader' ]
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
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          publicPath: "/",
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
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), 
  },
  resolve: {
      alias: {
        modernizr$: path.resolve(__dirname, ".modernizrrc.json")
      }
    },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new ExtractTextPlugin({filename: "css/bundle.css"}),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Modernizr: "modernizr",
        "window.Modernizr": "modernizr"
    })
    ]
};
