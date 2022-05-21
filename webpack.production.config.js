const path                 = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');

module.exports = {
	entry  : './src/index.js',
	output : {
		filename: 'bundle.[contenthash].js',
		path    : path.resolve(__dirname, '/build'),
	},
	mode   : 'production',
	module : {
		rules: [
			{
				test: /\.css$/,
				use : [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.scss$/,
				use : [MiniCssExtractPlugin.loader, 'css-loader', 'style-loader'],
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
	plugins: [
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