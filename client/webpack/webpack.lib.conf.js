const path = require('path');
const webpack = require('webpack');
let dirs = require('./base/dirs');

module.exports = {
  context: dirs.src,

  mode: 'production',

  entry: {
    frame: ['react', 'react-dom', 'react-router', 'react-router-dom']
  },

  // devtool: '#source-map',

  output: {
    library: '[name]_[chunkhash:8]',
    path: dirs.lib,
    publicPath: '/',
    filename: '[name].[chunkhash:8].dll.js'
  },

  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[chunkhash:8]',
      // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
      path: path.resolve(dirs.lib, './[name].manifest.json')
    }),
    new webpack.BannerPlugin(
      `This file is created by Super Browser, Last update: ${new Date().toString()}`
    )
  ]
};
