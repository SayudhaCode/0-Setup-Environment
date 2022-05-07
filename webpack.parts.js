const { WebpackPluginServe }	= require('webpack-plugin-serve');
const { MiniHtmlWebpackPlugin }	= require('mini-html-webpack-plugin');

exports.devserver = () => ({
	watch	: true,
	plugins	: [
		new WebpackPluginServe({
			port        : process.env.PORT || 8080,
			static      : './dist',
			liveReload  : true,
			waitForBuild: true
		})
	],
})

exports.page = ({ title }) => ({
	plugins	: [ new MiniHtmlWebpackPlugin({ context: title })],
})