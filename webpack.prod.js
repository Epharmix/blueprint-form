const path = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DTSBundleWebpack = require('dts-bundle-webpack');
const TerserPlugin = require('terser-webpack-plugin');

const base = require('./webpack.config.js');

module.exports = merge.smartStrategy({
  entry: 'replace'
})(base, {
  mode: 'production',
  watch: false,
  devtool: 'source-map',
  entry: './src/index.ts',
  externals: {
    '@blueprintjs/core': {
      commonjs: '@blueprintjs/core',
      commonjs2: '@blueprintjs/core',
      amd: ['Blueprint', 'Core'],
      root: ['Blueprint', 'Core']
    },
    '@blueprintjs/datetime': {
      commonjs: '@blueprintjs/datetime',
      commonjs2: '@blueprintjs/datetime',
      amd: ['Blueprint', 'Datetime'],
      root: ['Blueprint', 'Datetime']
    },
    moment: {
      root: 'moment',
      commonjs2: 'moment',
      commonjs: 'moment',
      amd: 'moment'
    },
    'moment-timezone': {
      root: 'moment',
      commonjs2: 'moment',
      commonjs: 'moment',
      amd: 'moment'
    },
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM'
    }
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false
    })],
  },
  module: {
    rules: [{
      test: /\.(ts|tsx)$/,
      use: [{
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.prod.json'
        }
      }],
      exclude: path.resolve(__dirname, 'node_modules')
    }]
  },
  plugins: [
    new DTSBundleWebpack({
      name: 'weaver',
      baseDir: 'dist',
      main: 'dist/index.d.ts',
      out: 'index.d.ts',
      removeSource: true
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['components']
    })
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
});
