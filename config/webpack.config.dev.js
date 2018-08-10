'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const getClientEnvironment = require('./env');
const paths = require('./paths');
const ManifestPlugin = require('webpack-manifest-plugin');

const publicPath = '/';

const publicUrl = '';

const env = getClientEnvironment(publicUrl);


const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;


const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
    
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            flexbox: 'no-2009',
          }),
        ],
      },
    },
  ];
  if (preProcessor) {
    loaders.push(require.resolve(preProcessor));
  }
  return loaders;
};


module.exports = {
  mode: 'development',

  devtool: 'cheap-module-source-map',

  entry: [
    require.resolve('./polyfills'),
    require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appIndexJs,
   
  ],
  output: {
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].js',

    publicPath: publicPath,
 
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  optimization: {

    splitChunks: {
      chunks: 'all',
      name: 'vendors',
    },

    runtimeChunk: true,
  },
  resolve: {

    modules: ['node_modules'].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),

    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      'react-native': 'react-native-web',
    },
    plugins: [
   
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
              baseConfig: {
                extends: [require.resolve('eslint-config-react-app')],
              },
              
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.srcPaths,
        exclude: [/[/\\\\]node_modules[/\\\\]/],
      },
      {
        oneOf: [
     
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.srcPaths,
            exclude: [/[/\\\\]node_modules[/\\\\]/],
            use: [
           
              {
                loader: require.resolve('thread-loader'),
                options: {
                  poolTimeout: Infinity 
                },
              },
              {
                loader: require.resolve('babel-loader'),
                options: {
                  
                  presets: [require.resolve('babel-preset-react-app')],
                  plugins: [
                    [
                      "import", 
                      { 
                        libraryName: "antd",
                        libraryDirectory: "es", 
                        style: "css" 
                      }
                    ],
                    [
                      require.resolve('babel-plugin-named-asset-import'),
                      {
                        loaderMap: {
                          svg: {
                            ReactComponent: 'svgr/webpack![path]',
                          },
                        },
                      },
                    ],
                  ],
              
                  cacheDirectory: true,
                  highlightCode: true,
                },
              },
            ],
          },
         
          {
            test: /\.js$/,
            use: [
         
              {
                loader: require.resolve('thread-loader'),
                options: {
                  poolTimeout: Infinity 
                },
              },
              {
                loader: require.resolve('babel-loader'),
                options: {
                  babelrc: false,
                  compact: false,
                  presets: [
                    require.resolve('babel-preset-react-app/dependencies'),
                  ],
                  cacheDirectory: true,
                  highlightCode: true,
                },
              },
            ],
          },
        
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
            }),
          },
      
          {
            test: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              modules: true,
              getLocalIdent: getCSSModuleLocalIdent,
            }),
          },
   
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: getStyleLoaders({ importLoaders: 2 }, 'sass-loader'),
          },
         
          {
            test: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent,
              },
              'sass-loader'
            ),
          },
          {
          
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
     
    ],
  },
  plugins: [
    new ReactLoadablePlugin({
      filename: 'build/react-loadable.json'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
   
    new InterpolateHtmlPlugin(env.raw),
    
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin(),
    
    new CaseSensitivePathsPlugin(),

    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
   
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
   
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: publicPath,
    }),
  ],

 
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },

  performance: false,
};
