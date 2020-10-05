const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackBundleAnalyzer = require('webpack-bundle-analyzer');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

process.env.NODE_ENV = 'production';

module.exports = {
  mode: 'production',
  target: 'web',
  devtool: 'source-map',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: './',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      // variables that I define here which can provide default values to the plugins
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),

    // Display bundle stats after build
    new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: 'static' }),

    new MiniCssExtractPlugin({
      // Webpack picks the name for me and calculates new hash only if contents have changed
      filename: '[name].[contenthash].css',
    }),

    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/spas-logo.svg',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],

  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       include: /\.min\.js$/,
  //     }),
  //   ],
  // },

  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        // use: ['babel-loader', 'esling-loader'],
        // use: 'ts-loader'
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(png|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader?limit=100000',
          },
        ],
      },
      //postcss-loader sendsto cssnano which uglifies the css
      //css-loader extracts css to another file
      //REMEMBER: loaders run from bottom up so postcss-loader is 1st and css-loader is 2nd
      {
        test: /(\.css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('cssnano')],
              sourceMap: false,
            },
          },
        ],
      },
    ],
  },
};
