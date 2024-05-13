const path = require('path');
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { merge } = require("webpack-merge");
const base = require("./base.cjs");

module.exports = merge(base, {
	entry: './src/index-esm.js',
	experiments: {
		outputModule: true,
	},
	mode: "production",
	devtool: "source-map",
	output: {
		filename: "dizy-esm.js",
		path: path.resolve(__dirname, '../dist'),
		library: {
			type: "module"
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
