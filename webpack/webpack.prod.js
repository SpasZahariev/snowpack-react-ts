  
const webpack = require('webpack');
const webpackBundleAnalyzer = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  // it is recomended not to have a source map for prod
//   devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Codevolution'),
    }),

    // Display bundle stats after build
    new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: 'static' }),
  ],
}