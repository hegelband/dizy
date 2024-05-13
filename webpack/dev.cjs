const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");
const base = require("./base.cjs");
const { merge } = require("webpack-merge");

module.exports = merge(base, {
	//...
	entry: './src/index-dev.js',
	output: {
		path: path.resolve(__dirname, '../dist'),
	},
	mode: "development",
	devServer: {
		historyApiFallback: true,
		port: 8080,
		hot: true,
		open: true,
	},
	plugins: [
		new ESLintPlugin({
			extensions: ["js", "mjs", "cjs"],
			cache: true,
			fix: true,
		}),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "index.html",
		}),
	]
});
