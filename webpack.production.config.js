const path                   = require('path');
const MiniCssExtractPlugin   = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin      = require('html-webpack-plugin');

module.exports = {
	entry  : {
		'hello-world': './src/index.js',
		'kiwi'       : './src/kiwi.js',
	},
	output : {
		filename  : '[name].[contenthash].js',
		path      : path.resolve(__dirname, './dist'),
		publicPath: '',
	},
	mode   : 'production',
	module : {
		rules: [
			{
				test  : /\.(png|jpg)$/,
				type  : 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 3 * 1024, // 3 kilobytes
					},
				},
			},
			{
				test: /\.txt/,
				type: 'asset/source',
			},
			{
				test: /\.css$/,
				use : [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.scss$/,
				use : [MiniCssExtractPlugin.loader, 'css-loader', 'fast-sass-loader'],
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
				test: /\.hbs$/,
				use : [
					'handlebars-loader',
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [
				'**/*',
				path.join(process.cwd(), 'build/**/*'),
			],
		}),
		new HtmlWebpackPlugin({
			filename   : 'hello-world.html',
			chunks     : ['hello-world'],
			title      : 'Hello world',
			template   : 'src/page-template.hbs',
			description: 'Some description',
		}),
		new HtmlWebpackPlugin({
			filename   : 'kiwi.html',
			chunks     : ['kiwi'],
			title      : 'Kiwi',
			template   : 'src/page-template.hbs',
			description: 'Kiwi',
		}),
	],
};