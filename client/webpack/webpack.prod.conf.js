import { cpus } from 'os';
import { resolve } from 'path';
import { DllReferencePlugin } from 'webpack';
import { dist, lib, src } from './base/dirs';
import { extractCSS, extractSass } from './base/css';
import { htmls } from './base/pages';
import base from './webpack.base.conf';
import HappyPack, { ThreadPool } from 'happypack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import ParallelUglifyPlugin from 'webpack-parallel-uglify-plugin';
import AddAssetHtmlWebpackPlugin from 'add-asset-html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import dllManifestOfVendorFrame from '../lib/frame.manifest.json';

const plugins = [];
htmls.forEach(html => {
  const config = {
    chunks: [html.name],
    chunksSortMode: 'manual',
    template: html.template,
    filename: `${html.name}.html`,
    hash: false,
    env: 'prod',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
    },
  };
  plugins.push(new HtmlWebpackPlugin(config));
});

const happyPackThreadPool = ThreadPool({ size: cpus().length });

const config = {
  ...base,

  mode: 'production',

  output: {
    path: dist,
    publicPath: '/',
    filename: 'js/bundle_[name].[chunkhash].min.js',
  },

  devtool: false,

  plugins: plugins.concat([
    new HappyPack({
      id: 'babel',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            cacheDirectory: true,
          },
        },
      ],
      threadPool: happyPackThreadPool,
      verbose: true,
    }),
    new DllReferencePlugin({
      context: __dirname,
      manifest: dllManifestOfVendorFrame,
    }),
    new AddAssetHtmlWebpackPlugin([{
      typeOfAsset: 'js',
      includeSourcemap: false,
      filepath: resolve(lib, '**/*.dll.js'),
      publicPath: '/js', // 绝对路径：'/js',
      outputPath: './js',
    }]),
    extractCSS,
    extractSass,
    new ParallelUglifyPlugin({
      uglifyJs: {
        cacgeDir: '.cache/',
        output: {
          beautify: false,
          commons: false,
        },
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true,
        },
        sourceMap: false,
      },
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CopyPlugin([
      {
        from: resolve(src, '.public/'),
        to: 'static/',
      }
    ])
  ])
};

export default config;