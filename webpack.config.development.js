const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const doiuse = require('doiuse');

const baseConfig = require('./webpack.config.base.js');

const config = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    // serverのルートパスを設定する
    publicPath: '/'
  },
  devServer: {
    contentBase: 'dist',
    host: '0.0.0.0',
    disableHostCheck: true,
    hot: true,
    inline: true,
    overlay: true,
    port: 5000
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});

const browsers = [
  'ie >= 11',
  'last 2 edge version',
  'last 2 ff version',
  'last 2 chrome version',
  'safari >= 10',
  'ios >= 9',
  'last 2 ChromeAndroid version'
];
config.module.rules.push({
  test: /\.(sass|scss)$/,
  use: [
    'css-hot-loader',
    // hot-reloadできるようにCSSはextractせずにstyle-loaderを使ってinjectする
    {
      loader: 'vue-style-loader',
      options: {
        sourceMap: true
      }
    },
    {
      loader: 'css-loader',
      options: {
        url: false,
        sourceMap: true,
        // 0 => no loaders (default);
        // 1 => postcss-loader;
        // 2 => postcss-loader, sass-loader
        importLoaders: 2
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        plugins: [
          autoprefixer({
            browsers
          }),
          doiuse({
            browsers,
            ignore: ['flexbox']
          })
        ]
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
        includePaths: [path.resolve('./node_modules/')]
      }
    }
  ]
});

const ip = require('ip');
console.log(`External: http://${ip.address()}:${config.devServer.port}`);

module.exports = config;
