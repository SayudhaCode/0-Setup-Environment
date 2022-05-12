const { WebpackPluginServe }    = require('webpack-plugin-serve'),
      { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin'),
      MiniCSSExtractPlugin      = require('mini-css-extract-plugin');

exports.devServer =
	() => (
		{
			watch  : true,
			plugins: [
				new WebpackPluginServe({
					port        : process.env.PORT || 8080,
					static      : './dist',
					liveReload  : true,
					waitForBuild: true,
				}),
			],
		} );

exports.page = ({ title }) => ( {
	plugins: [
		new MiniHtmlWebpackPlugin({ context: title }),
	],
} );

exports.tailwind = () => ( {
	loader : 'postcss-loader',
	options: {
		postcssOptions: { plugins: [require('tailwindcss')()] },
	},
} );

exports.extractCSS = ({ options = {}, loaders = [] } = {}) => {
	return {
		module : {
			rules: [
				{
					test       : /\.css$/,
					use        : [
						{ loader: MiniCSSExtractPlugin.loader, options },
						'css-loader',
					].concat(loaders),
					sideEffects: true,
				},
			],
		},
		plugins: [
			new MiniCSSExtractPlugin({
				filename: 'main.css',
			}),
		],
	};
};

