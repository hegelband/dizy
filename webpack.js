const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    //...
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    mode: "development",
    devtool: "source-map",
    devServer: {
        historyApiFallback: true,
        port: 8080,
        hot: true,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                }]
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "index.html",
        }),
    ]
};