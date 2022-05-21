const path                 = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry : './src/index.js',
	output: {
		filename: 'bundle.[contenthash].js',
		path    : path.resolve(__dirname, '/build'),
	},
	mode  : 'production',
	module: {
		rules: [
			{
				test: /\.css$/,
				use : [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
};