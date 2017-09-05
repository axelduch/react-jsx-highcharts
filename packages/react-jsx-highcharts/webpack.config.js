const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const isProd = (process.env.NODE_ENV === 'production');
const styledMode = (process.env.MODE === 'CSS');

const babelSettings = JSON.parse(fs.readFileSync('.babelrc'));


if (babelSettings.plugins && styledMode) {
    console.log('Using highcharts/js/highcharts.js instead of highcharts.js - styled mode');
    babelSettings.plugins.push([
      "module-resolver", {
      "root": ["."],
      "alias": {
        "highcharts": "highcharts/js/highcharts"
      }
    }]
    );
}

const webpackConfig = {
  entry: path.resolve(__dirname, 'src'),

  output: {
    filename: isProd ? 'react-jsx-highcharts.min.js' : 'react-jsx-highcharts.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ReactHighcharts',
    libraryTarget: 'umd'
  },

  externals: {
    'react': {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM'
    },
    'highcharts': {
      commonjs: 'highcharts',
      commonjs2: 'highcharts',
      amd: 'highcharts',
      root: 'Highcharts'
    },
    'immutable': {
      commonjs: 'immutable',
      commonjs2: 'immutable',
      amd: 'immutable',
      root: 'Immutable'
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: babelSettings
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new LodashModuleReplacementPlugin({
      collections: true
    })
  ]
};

if (isProd) {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = webpackConfig;
