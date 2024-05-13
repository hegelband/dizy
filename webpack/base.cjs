const path = require('path');
const webpack = require("webpack");

module.exports = {
	//...
	module: {
		rules: [
			{
				test: /\.(js)$/,
				include: path.resolve(__dirname, 'src'),
				exclude: [/node_modules/, /ReflectionJs/, /test/, /dist/],
				use: [{
					loader: 'babel-loader',
					// options: {
					//     presets: ['@babel/preset-env']
					// },
				}],
			}
		],
	}
};
