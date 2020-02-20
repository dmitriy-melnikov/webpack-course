const path = require("path");

module.exports = {
	entry: {
    main: "./src/main.js"
  },
	mode: 'development',
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  devServer: {
    contentBase: "dist",
		overlay: true
  },
	devtool: 'inline-source-map',
  module: {
		rules: [
      {
        test: /\.css$/,
				exclude: /node_modules/,
        use: ["style-loader", "css-loader"
				]
      },
			{
				test: /\.(jpg|png|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]'
						}
					},
					{
						loader: 'extract-loader',
						options: {
							//publicPath: '../'
						}
					},
					{
						loader: 'html-loader'
						/*options: {
							attrs: ['img:src']
						}*/
					}
				]
			}
    ]
	}
};
//webpack-dev-server --config=config/webpack.dev.js
