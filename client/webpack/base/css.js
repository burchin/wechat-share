const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HASH = `[chunkhash]`;

// 创建多个实例
const extractSass = new ExtractTextPlugin(
  `css/bundle_sass.${HASH}.min.css`
);
const extractCSS = new ExtractTextPlugin(
  `css/bundle_css.${HASH}.min.css`
);

module.exports = {
  extractCSS,
  extractSass
};