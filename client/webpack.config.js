const { DefinePlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env, argv) => {
  let config =
    argv && argv.env == 'dev'
      ? require('./webpack/webpack.dev.conf')
      : require('./webpack/webpack.dev.conf');
  config = config(env, argv);

  if (config && config.plugins && Array.isArray(config.plugins)) {
    const API_ENV = env || (argv && argv.env == 'dev' ? 'dev' : 'prod');

    config.plugins.push(
      new DefinePlugin({
        'process.env.API_ENV': JSON.stringify(API_ENV) // 这里不需要去定义 process.env.NODE_ENV，交给 CLI -p 和 webpack mode 去自动设置
      })
    );

    if (argv && argv.anal) {
      // --anal=1 输出包的体积分析
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerPort: 8088,
          openAnalyzer: false
        })
      );
    }
  }

  return config;
};