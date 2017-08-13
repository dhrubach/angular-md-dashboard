const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const helpers = require('./helpers');
const commonConfig = require('./webpack.common');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';

module.exports = function () {
	return webpackMerge(commonConfig(), {

		entry: './src/main.ts',

		devtool: 'cheap-module-source-map',

		output: {
			path: helpers.root('dist'),
			filename: '[name].bundle.js',
			chunkFilename: '[id].chunk.js',
		},

		plugins: [
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor',
				minChunks: function (module) {
					return module && module.context && module.context.indexOf('node_modules') > -1;
				}
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'angular',
				minChunks: function (module) {
					return module && module.context && /node_modules(\\|\/)@angular/g.test(module.context);
				}
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'manifest',
			}),
			new DefinePlugin({
				'ENV': JSON.stringify(ENV),
				'process.env': {
					'ENV': JSON.stringify(ENV),
					'NODE_ENV': JSON.stringify(ENV),
				},
			}),
			new FriendlyErrorsPlugin(),
			new NamedModulesPlugin(),
			new StylelintPlugin(),
		],
	});
};
