const { WebpackPluginServe }    = require('webpack-plugin-serve'),
      { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin'),
      MiniCSSExtractPlugin      = require('mini-css-extract-plugin'),
      path                      = require('path'),
      glob                      = require('glob'),
      PurgeCSSPlugin            = require('purgecss-webpack-plugin');

exports.autoPrefix = () => ( {
	loader : 'postcss-loader',
	options: {
		postcssOptions: {
			plugins: [require('autoprefixer')()],
		},
	},
} );

const ALL_FILES            = glob.sync(path.join(__dirname, 'src/*.js'));
exports.eliminateUnusedCSS = () => ( {
	plugins: [
		new PurgeCSSPlugin({
			paths     : ALL_FILES,
			extractors: [
				{
					extractor : (content) =>
						content.match(/[^<>"'1\s]*[^<>"'1\s:]/g) || [],
					extensions: ['html'],
				},
			],
		}),
	],
} );

exports.extractCSS = ({ options = {}, loaders = [] } = {}) => {
	return {
		module : {
			rules: [
				{
					test       : /\.css$/,
					use        : [
						{
							loader: MiniCSSExtractPlugin.loader,
							options,
						},
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

exports.tailwind = () => ( {
	loader : 'postcss-loader',
	options: {
		postcssOptions: { plugins: [require('tailwindcss')()] },
	},
} );

exports.page = ({ title }) => ( {
	plugins: [
		new MiniHtmlWebpackPlugin({ context: title }),
	],
} );

exports.devServer = () => ( {
	watch  : true,
	plugins: [
		new WebpackPluginServe({
			port        : parseInt(process.env.PORT, 10) || 8080,
			static      : './dist',
			liveReload  : true,
			waitForBuild: true,
		}),
	],
} );

