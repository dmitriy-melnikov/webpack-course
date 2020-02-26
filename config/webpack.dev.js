const path = require("path")
const webpack = require("webpack")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: ["./src/main.js"]
  },
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  devServer: {
    contentBase: "dist",
    overlay: true,
    stats: {
      colors: true
    }
  },
	mode: 'development',
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
			{
				test: /\.sass$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								mode: 'local',
								localIdentName: '[local]',
							}
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								require('autoprefixer'),
							],
						},
					},
					'resolve-url-loader',
					'sass-loader',
				]
			},
      {
        test: /\.jpg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: "pug-loader"
          }
        ]
      },
      {
        test: /\.ejs$/,
        use: [
          {
            loader: "ejs-loader"
          }
        ]
      },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: "handlebars-loader",
            query: {
              inlineRequires: `\/images\/`
            }
          }
        ]
      }
    ]
  },
  plugins: [
		new ProgressBarPlugin({
			format: '  build [:bar] ' + ':percent' + ' (:elapsed seconds)',
			clear: false,
		}),
		//new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({
			template: "./src/index.ejs",
			inject: true,
			title: "Link's Journal"
		}),
    new webpack.HotModuleReplacementPlugin(), // Enable HMR
    new webpack.NamedModulesPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
  ]
};
