const { mode }  = require('webpack-nano/argv'),
      { merge } = require('webpack-merge'),
      parts     = require('./webpack.parts'),
      glob      = require('glob');

const cssLoaders = [parts.tailwind()];

const commonConfig      = merge([
	{
		entry: { style: glob.sync('./src/**/*.css') },
	},
	parts.page({ title: 'Demo' }),
	parts.extractCSS({ loaders: cssLoaders }),
]);
const developmentConfig = merge([
	{ entry: ['webpack-plugin-serve/client'] },
	parts.devServer(),
]);
const productionConfig  = merge([parts.eliminateUnusedCSS()]);

const getConfig = (mode) => {
	switch (mode) {
		case 'production':
			return merge(commonConfig, productionConfig, { mode });
		case 'development':
			return merge(commonConfig, developmentConfig, { mode });
		default:
			throw new Error(`Trying to use unknown ${ mode }`);
	}
};
module.exports  = getConfig(mode);