const webpack = require('webpack');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';
const fs = require('fs');

const externals = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    externals[mod] = `commonjs ${mod}`;
  });

const config = {
  externals,
  devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
  context: path.resolve('./src'),
  target: 'node',
  entry: {
    index: './index.ts',
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map'
  },
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'ts-loader'
    }]
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: [path.resolve('./src'), 'node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { // eslint-disable-line quote-props
        NODE_ENV: JSON.stringify(env)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: true,
          failOnHint: true
        }
      }
    })
  ]
};

module.exports = config;
