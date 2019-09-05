const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HASH = '[chunkhash:8]';

// 创建多个实例
const extractSass = new MiniCssExtractPlugin(`css/bundle_sass.${HASH}.min.css`);
const extractCSS = new MiniCssExtractPlugin(`css/bundle_css.${HASH}.min.css`);

module.exports = {
  extractCSS,
  extractSass
};
