const path = require('path');

//import path from 'path';
module.exports = {
	entry: {
		main: ['./src/main.js']
	},
	//mode: 'development',
	output: {
		filename: '[name]-bundle.js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/'
	},
	devServer: {
		contentBase: 'dist'
	}
};

//webpack --config=config/webpack.dev.js
//webpack-dev-server --config=config/webpack.dev.js