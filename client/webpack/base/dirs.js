const { resolve } = require('path');
const root = resolve(__dirname, '../../');

module.exports = {
  // 根目录
  root: root,
  // 配置目录
  config: resolve(root, './webpack'),
  // 源码目录
  src: resolve(root, './src'),
  // 多页面目录
  pages: resolve(root, './src/app'),
  // vendor
  lib: resolve(root, './lib'),
  // 生成目录
  dist: resolve(root, './dist'),
  // modules
  modules: resolve(root, './node_modules')
};
