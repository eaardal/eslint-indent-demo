/* eslint max-len: 0 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const buildPath = path.resolve(__dirname, 'public', 'build');
const srcPath = path.resolve(__dirname, 'src');
const appPath = path.resolve(srcPath, 'app');
const mainPath = path.resolve(appPath, 'Index.jsx');

const indexPath = path.resolve(buildPath, 'index.html');
const indexTemplatePath = path.resolve(
  __dirname,
  'src',
  'app',
  'index_template.html'
);

const config = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3333',
    mainPath,
  ],
  output: {
    path: buildPath,
    filename: '[name].js',
    publicPath: '/build/',
    chunkFilename: '[name].js',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.RUNTIME_ENVIRONMENT': JSON.stringify(process.env.NODE_ENV),
      'process.env.BUNDLE_CONFIG': JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: indexPath,
      template: indexTemplatePath,
      baseHref: '/build/',
      title: 'demo',
      excludeChunks: ['tests'],
      vendorScripts: [],
      vendorStyles: [
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
      ],
    }),
    // Strip unnecessary moment locale language packs for saving bundle size
    new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(en-gb)$/),
    new ExtractTextPlugin({
      filename: '[name].bundle.[chunkhash].css',
      allChunks: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: srcPath,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        include: srcPath,
        exclude: /\.spec\.js?$/,
        use: ['babel-loader'],
      },
      {
        test: /\.jsx?$/,
        include: /\.spec\.js?$/,
        use: ['ignore-loader'],
      },
      {
        test: /\.yml$/,
        use: ['json-loader', 'yaml-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          require.resolve('sass-loader'),
        ],
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
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      app: path.resolve(srcPath, 'app'),
      common: path.resolve(srcPath, 'common'),
      components: path.resolve(srcPath, 'components'),
      features: path.resolve(srcPath, 'features'),
      helpers: path.resolve(srcPath, 'helpers'),
      i18n: path.resolve(srcPath, 'i18n'),
      infrastructure: path.resolve(srcPath, 'infrastructure'),
      pages: path.resolve(srcPath, 'pages'),
      services: path.resolve(srcPath, 'services'),
      utils: path.resolve(srcPath, 'utils'),
    },
    modules: ['node_modules', srcPath],
  },
};

module.exports = config;
