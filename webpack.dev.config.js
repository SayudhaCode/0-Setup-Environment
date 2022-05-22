const path                   = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin      = require('html-webpack-plugin');

module.exports = {
	entry    : './src/index.js',
	output   : {
		filename: '[name].bundle.js',
		path    : path.resolve(__dirname, '/build'),
	},
	mode     : 'development',
	devServer: {
		contentBase: path.resolve(__dirname, '/dist'),
		index      : 'index.html',
		port       : 3000,
	},
	module   : {
		rules: [
			{
				test: /\.(png|jpg)$/,
				use : ['file-loader'],
			},
			{
				test: /\.css$/,
				use : ['style-loader', 'css-loader'],
			},
			{
				test: /\.(scss|sass)/,
				use : ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test   : /\.js$/,
				exclude: /node_modules/,
				use    : {
					loader : 'babel-loader',
					options: {
						presets: ['@babel/env'],
						plugins: ['@babel/plugin-proposal-class-properties'],
					},
				},
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
	plugins  : [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title      : 'Sayudha Project',
			description: 'Sayudha Templating Single Page Environment Using Webpack',
			template   : 'src/components/Templates/index.pug',
			minify     : {
				collapseWhitespace: false,
			},
		})
	],
};