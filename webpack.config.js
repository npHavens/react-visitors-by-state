const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  entry: "./src/index.js",
  output: { // NEW
    path: path.join(__dirname, 'dist'),
    filename: "[name].js"
  }, // NEW Ends
  plugins: [htmlPlugin],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.(less|css)$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          }, {
          loader: 'less-loader', // compiles Less to CSS
        //   options: {
        //     importLoaders: 1,
        //     modules: true,
        //   }
        }]
      }
    ]
  }
};
