const { merge } = require('webpack-merge');
const { resolve } = require('path');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    mode: 'production',
    entry: './index.tsx',
    output: {
        filename: 'js/bundle.[contenthash].min.js',
        path: resolve(__dirname, '../../build'),
        publicPath: '/',
    },
    optimization: {
        minimize: true,
        removeAvailableModules: true,
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        }},
    devtool: 'source-map',
});
