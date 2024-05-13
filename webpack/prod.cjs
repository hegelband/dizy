const path = require('path');
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const base = require("./base.cjs");
const { merge } = require("webpack-merge");

module.exports = merge(base, {
	//...
	entry: './src/index.js',
	mode: "production",
	devtool: "source-map",
	output: {
		filename: "dizy.js",
		path: path.resolve(__dirname, '../dist'),
		library: {
			name: "dizy",
			type: "umd"
		},
	},
	optimization: {
		minimize: true,
		minimizer: [
			(compiler) => {
				const TerserPlugin = require('terser-webpack-plugin');
				new TerserPlugin({
					terserOptions: {
						compress: {},
					}
				}).apply(compiler);
			},
		],
		// usedExports: true,
		splitChunks: {
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					priority: 1,
				},
			},
		},
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
	plugins: [
		process.env.ANALYZE && new BundleAnalyzerPlugin(),
	].filter((x) => x),
});
