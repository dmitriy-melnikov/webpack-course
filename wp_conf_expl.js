const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');

module.exports = {
  entry: {
    // 'ics.deps': ['@babel/polyfill', './static/js/Blob.js', './static/js/FileSaver.min.js', './static/js/ics.min.js'],
    // polyfills: './src/core/common/polyfills/index.js',
    bundle: ['@babel/polyfill', './unifiedAPI/adapter.js'],
  },
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'webpackdist'),
    publicPath: '/'
  },
  optimization: {
    nodeEnv: false,
    splitChunks: {
      cacheGroups: {
        commons: {
          //test: /[\\/]node_modules[\\/]/,
          test: /(node_modules)/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  devtool: 'inline-source-map',
  //devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'webpackdist'),
    port: 3000,
    host: 'tixx.axs.com',
    historyApiFallback: true,
    publicPath: 'https://tixx.axs.com:3000',
    https: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new ProgressBarPlugin({
      format: '  build [:bar] ' + ':percent' + ' (:elapsed seconds)',
      clear: false,
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'static/index.html'
    }),
    new CopyPlugin([
      { from: 'static/img', to: 'img' },
      { from: 'static/resources/sources', to: 'source' },
      { from: 'static/resources/mockdata', to: 'resources/mockdata' },
      { from: 'static/index_japan.html', to: './' },
      { from: 'static/index_oauth.html', to: './' },
    ]),
    new MergeJsonWebpackPlugin({
      debug: true,
      output: {
        groupBy: [
          {
            pattern: '{./static/resources/locales/en-GB.json,./static/resources/locales/en-GB.formats.json}',
            fileName: 'resources/locales/en-GB.json'
          },
          {
            pattern: '{./static/resources/locales/en-SE.json,./static/resources/locales/en-SE.formats.json}',
            fileName: 'resources/locales/en-SE.json'
          },
          {
            pattern: '{./static/resources/locales/en-US.json,./static/resources/locales/en-US.formats.json}',
            fileName: 'resources/locales/en-US.json'
          },
          {
            pattern: '{./static/resources/locales/ja-JP.json,./static/resources/locales/ja-JP.formats.json}',
            fileName: 'resources/locales/ja-JP.json'
          },
          {
            pattern: '{./static/resources/locales/sv-SE.json,./static/resources/locales/sv-SE.formats.json}',
            fileName: 'resources/locales/sv-SE.json'
          },
        ]
      },
      globOptions: {
        nosort: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
  ],
  module: {
    rules: [
      {
        parser: {
          commonjs: true,
        },
      },
      {
        test: /\.(js|jsx)$/,
        //exclude: /(node_modules)/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        //options: { presets: ['@babel/env'] }
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[local]',
              },
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer'),
              ],
            },
          },
          'resolve-url-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /(node_modules)/,
        loader: 'file-loader',
        options: {
          outputPath: 'img',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /(node_modules)/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
        },
      },
      {
        test: /\.(csv|tsv)$/,
        exclude: /(node_modules)/,
        use: [
          'csv-loader',
        ],
      },
    ],
  },
};
