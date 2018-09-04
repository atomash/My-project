const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  mode: NODE_ENV,
  entry: './server/index.js',
  output: {
    path: path.resolve(__dirname, '..', 'build'),
    filename: 'server.js'
  },
  target: 'node',
  externals: [nodeExternals()],
//   optimization: {
//     splitChunks: {
//       cacheGroups: {
//         default: false,//disable default 'commons' chunk behavior
//         vendors: false, 
        
//       }
//     },
    
// },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: '/static/media/[name].[hash:8].[ext]',
        }
      },
      {
        test: /\.js$/,
        exclude: [/[/\\\\]node_modules[/\\\\]/],
        use: [
          require.resolve('thread-loader'),
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              compact: false,
              presets: ['babel-preset-react-app', '@babel/preset-env'],
              plugins: ['@babel/plugin-syntax-dynamic-import'],
              cacheDirectory: true,
              highlightCode: true,
            },
          },
        ],
      },
      { test: /\.scss$/, loader: 'ignore-loader' }
    ]
  },
  plugins: [
    new UglifyJSPlugin({
      cache: true,
      parallel: true,
      sourceMap: false // set to true if you want JS source maps
  }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  resolve: {
    modules: ['src', 'node_modules']
  }
};

