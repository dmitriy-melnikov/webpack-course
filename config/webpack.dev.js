const path = require("path");

module.exports = {
  entry: {
    main: "./src/main.js"
  },
  mode: "development",
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist/js"),
    publicPath: "/"
  },
  devServer: {
    contentBase: "dist"
  },
  module: {
		rules: [
      {
        test: /\.css$/,
				exclude: /node_modules/,
        use: ["style-loader", "css-loader"
					/*{loader: "style-loader"},
          {loader: "css-loader"}*/
				]
      }
    ]
	}
};
