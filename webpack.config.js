require('dotenv').config();

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;

module.exports = {
  entry: ['./src/assets/js/app.js', './src/assets/sass/app.sass'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
            presets: ['env']
        }
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader', options: { minimize: true } },
            { loader: 'sass-loader' }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'assets/bundle.css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new RobotstxtPlugin({
      policy: [
        {
          userAgent: "*",
          disallow: "/"
        }
      ]
    }),
    new webpack.DefinePlugin({
      'API_KEY': JSON.stringify(process.env.API_KEY)
    })
  ]
};