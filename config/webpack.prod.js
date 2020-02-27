const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssWebpackPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

console.log('****************', process.env.NODE_ENV);

module.exports = env => {
	return {
		entry: {
			main: ["./src/main.js"]
		},
		mode: "production",
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
					test: /\.css$/,
					exclude: /node_modules/,
					use: [
						//MiniCssWebpackPlugin.loader,
						{
							loader: MiniCssWebpackPlugin.loader
						},
						{
							loader: "css-loader",
							options: {
								minimize: true
							}
						}
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
					test: /\.html$/,
					use: [
						{
							loader: "html-loader"
						}
					]
				}
			]
		},
		plugins: [
			//new CleanWebpackPlugin(),
			new OptimizeCssAssetsWebpackPlugin(),
			new MiniCssWebpackPlugin({
				filename: "[name]-[contenthash].css",
				chunkFilename: "[id].css"
			}),
			new HTMLWebpackPlugin({
				template: "./src/index.ejs",
				//inject: true,
				title: "Link's Journal"
			}),
			new webpack.DefinePlugin({
				"process.env": {
					"NODE_ENV": JSON.stringify(env.NODE_ENV)
				}
			}),
			new MinifyPlugin(),
			new CompressionPlugin(
				{
					algorithm: 'gzip'
				}
			),
			new BrotliPlugin()
		]
	}

};
