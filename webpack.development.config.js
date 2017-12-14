const path = require('path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  context: __dirname + '/src',
  entry: {
    bundle: './index.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:{
          presets: ['react', 'es2015', 'stage-2']
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: 'file-loader?name=images/[name].[ext]',
            options: {
              limit: 8192,
              mimetype: 'image/png'
            }
          }
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('main.css'),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: __dirname + '/src/images/icon.png',
    })
  ],
  resolve: {
    extensions: ['.js', '.css', '.html']
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: 'dist',
    port: process.env.PORT || 4000,
    inline: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    hot: true
  },
}
