/* eslint max-len: 0 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const buildPath = path.resolve(__dirname, 'public', 'build');
const srcPath = path.resolve(__dirname, 'src');

const indexTemplatePath = path.resolve(
  __dirname,
  'src',
  'app',
  'index_template.html'
);

const environment = process.env.NODE_ENV;
const environmentBuildPath = path.resolve(buildPath, environment);

const config = {
  entry: ['babel-polyfill', { app: './src/app/Index.jsx' }],
  output: {
    path: environmentBuildPath,
    filename: 'app/[name].bundle.[chunkhash].js',
    publicPath: './',
    chunkFilename: 'async/[name].bundle.[chunkhash].js',
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style/[name].bundle.[contenthash].css',
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env.RUNTIME_ENVIRONMENT': JSON.stringify(process.env.NODE_ENV),
      'process.env.BUNDLE_CONFIG': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'index.html',
      template: indexTemplatePath,
      baseHref: '/',
      title: 'Diet Maestro',
      vendorScripts: [],
      vendorStyles: [
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
      ],
    }),
    // Strip unnecessary moment locale language packs for saving bundle size
    new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(en-gb)$/),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: ['babel-loader'],
      },
      {
        test: /\.yml$/,
        use: ['json-loader', 'yaml-loader'],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?[\s\S]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'dist/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpg|jpeg)(\?[\s\S]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]',
            },
          },
        ],
      },
      // {
      //   test: /\.(ttf|eot|svg|woff|woff2|png)(\?[\s\S]+)?$/,
      //   use: [{
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[hash].[ext]',
      //     },
      //   }, ],
      // },
      // {
      //   test: /\.(gif|png|jpg|jpeg)(\?[\s\S]+)?$/,
      //   use: [{
      //     loader: 'file-loader',
      //     options: {
      //       name: 'assets/images/[name].[ext]',
      //     },
      //   },
      // ]},
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      app: path.resolve(srcPath, 'app'),
      common: path.resolve(srcPath, 'common'),
      components: path.resolve(srcPath, 'components'),
      features: path.resolve(srcPath, 'features'),
      i18n: path.resolve(srcPath, 'i18n'),
      infrastructure: path.resolve(srcPath, 'infrastructure'),
      services: path.resolve(srcPath, 'services'),
      utils: path.resolve(srcPath, 'utils'),
    },
    modules: ['node_modules', srcPath],
  },
};

module.exports = config;
