const path = require('path');

module.exports = {
  mode: "development",
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
              {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react']
                }
              }
          ]
      },
      {
          test: /\.css$/,
          use:  [
           'style-loader',
           'css-loader',
          ]
      }
    ]
  },
  devServer: {
    proxy: [{
      context: ['/api', '/token'],
      target: 'http://localhost:8080',
    }]
  }
}