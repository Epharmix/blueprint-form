const merge = requre('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

const base = require('./webpack.config.js');

module.exports = merge(base, {
  mode: 'production',
  devtools: 'none',
  optimization: {
    minimizer: [new TerserPlugin()],
  }
});
