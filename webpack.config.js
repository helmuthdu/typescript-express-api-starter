const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const NodemonPlugin = require( 'nodemon-webpack-plugin' );
const merge = require('webpack-merge');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const fs = require('fs');

const externals = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    externals[mod] = `commonjs ${mod}`;
  });

const baseConfig = {
  externals,
  context: path.resolve('./src'),
  target: 'node',
  mode: env,
  entry: {
    index: './index.ts',
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve('./src'), 'node_modules'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
};

const developmentConfig = {
  devtool: 'cheap-eval-source-map',
  plugins: [
    new NodemonPlugin(),
  ],
};

const productionConfig = {
  devtool: 'hidden-source-map',
  plugins: [],
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true,
        },
        sourceMap: true,
      }),
    ],
  },
};

module.exports = merge(baseConfig, env === 'development' ? developmentConfig : productionConfig);
