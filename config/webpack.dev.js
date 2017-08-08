const webpackMerge = require('webpack-merge');
const helpers = require('./helpers');
const commonConfig = require('./webpack.common');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');

const ENV = process.env.NODE_ENV || 'development';

module.exports = function () {
	return webpackMerge(commonConfig(), {

		devtool: 'cheap-module-source-map',

		output: {
			path: helpers.root('dist'),
			filename: '[name].bundle.js',
			chunkFilename: '[id].chunk.js',
		},

		plugins: [
			new DefinePlugin({
				'ENV': JSON.stringify(ENV),
				'process.env': {
					'ENV': JSON.stringify(ENV),
					'NODE_ENV': JSON.stringify(ENV),
				},
			}),
			new FriendlyErrorsPlugin(),
			new NamedModulesPlugin(),
		],
	});
};
