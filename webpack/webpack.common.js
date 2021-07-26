const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// for copying my images directory to dist 
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'myMegaBundle.js',
    // filename: 'myMegaBundle.js',
  },
  // this HTMLWebpackPlugin will inject myMegaBundle.js into the index.html with wrapped in the <script> tag. I assume it is going to do the same for the stylesheet
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './public/index.html'),
      favicon: path.resolve(__dirname, '..', './public/spas-logo.svg'),
    }),
    new CopyPlugin({
      patterns: [
        {
             from: path.resolve(__dirname, '..', './optimised-images/lossful/images'),
              to: path.resolve(__dirname, '..', './build/images') 
        },
        // { from: "other", to: "public" },
      ],
    }),
  ],
  stats: 'errors-only',
}