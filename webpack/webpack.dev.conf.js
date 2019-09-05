const { cpus} = require('os');
const { dist } = require('./base/dirs');
const { htmls } = require('./base/pages');
let base = require('./webpack.base.conf');
const { extractCSS, extractSass } = require('./base/css');
const { HotModuleReplacementPlugin } = require('webpack');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const happyPackThreadPool = HappyPack.ThreadPool({ size: cpus().length });
  const plugins = [];
  htmls.forEach(html => {
    const config = {
      chunks: [html.name],
      chunksSortMode: 'manual',
      template: html.template,
      filename: `${html.name}.html`,
      hash: false,
      env: 'dev',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    };
    plugins.push(new HtmlWebpackPlugin(config));
  });

  return {
    ...base(env, argv),

    mode: 'development',

    output: {
      path: dist,
      publicPath: '/',
      filename: 'js/bundle_[name].js'
    },

    devtool: '#cheap-module-eval-source-map',

    plugins: plugins.concat([
      new HotModuleReplacementPlugin(),
      new HappyPack({
        id: 'babel',
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              cacheDirectory: true
            }
          }
        ],
        threadPool: happyPackThreadPool,
        verbose: true
      }),
      extractCSS,
      extractSass
    ]),

    devServer: {
      hot: true,
      inline: true,
      overlay: {
        warnings: true,
        errors: true
      },
      // https: true,
      historyApiFallback: true,
      // historyApiFallback: {}, // 对于多个单页应用需要专门配置
      // contentBase: path.resolve(dirs.src, 'hotDist')
      contentBase: dist
    }
  };
};
