require('dotenv').config();

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;
const VueLoaderPlugin = require('vue-loader/lib/plugin');

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
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
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
    new HtmlWebpackPlugin({
      filename: 'plan.html',
      template: 'src/views/plan.html'
    }),
    new RobotstxtPlugin({
      policy: [
        {
          userAgent: "*",
          disallow: "/"
        }
      ]
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'API_KEY': JSON.stringify(process.env.API_KEY)
    })
  ],
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/plan/, to: '/plan.html' },
      ]
    }
  }
};