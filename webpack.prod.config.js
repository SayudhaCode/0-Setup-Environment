const path                 = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');

module.exports = {
	entry       : './src/index.js',
	output      : {
		filename: 'bundle.[contenthash].js',
		path    : path.resolve(__dirname, '/build'),
	},
	mode        : 'production',
	optimization: {
		splitChunks: {
			chunks                : 'all',
			minSize               : 2000,
			automaticNameDelimiter: '_',
		},
	},
	module      : {
		rules: [
			{
				test: /\.(png|jpg)$/,
				use : ['file-loader'],
			},
			{
				test: /\.scss$/,
				use : [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'style-loader'
				],
			},
			{
				test: /\.pug$/,
				use : {
					loader : 'pug-loader',
					options: {
						pretty: true,
					},
				},
			},
		],
	},
	plugins     : [
		new MiniCssExtractPlugin({
			filename: 'style.[contenthash].css',
		}),
		new HtmlWebpackPlugin({
			title      : 'Sayudha Project',
			description: 'Sayudha Templating Single Page Environment Using Webpack',
			template   : 'src/components/Templates/index.pug',
			minify     : {
				collapseWhitespace: false,
			},
		}),
	],
};