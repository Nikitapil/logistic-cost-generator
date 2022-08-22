const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
console.log(isProd);
module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    main: "./ts/index.ts",
  },
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    port: 3000,
    hot: true
  },
  devtool: 'inline-source-map',
  plugins: [
    new HTMLWebpackPlugin({
      template: "./index.html",
      scriptLoading: "blocking | defer",
      inject: "body",
      favicon: "./favicon.png",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "style/[name].css"
    }),
    new CopyWebpackPlugin ({
      patterns: [
        { from: path.resolve(__dirname, 'src/img'), 
          to: path.resolve(__dirname, 'dist/img')
        },
        { from: path.resolve(__dirname, 'src/fonts'), 
          to: path.resolve(__dirname, 'dist/fonts')
        },
        { from: path.resolve(__dirname, 'src/json'), 
          to: path.resolve(__dirname, 'dist/json')
        },
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
          },
        }, {
          loader: "css-loader",
          options: {
            url: false,
          },
        },],
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
            use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath:'img/'
                    }  
                  }]
      },
      {
          test: /\.(ttf|woff|woff2|eot)$/,
          use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
                publicPath:'fonts/'
            }  
          }]
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
