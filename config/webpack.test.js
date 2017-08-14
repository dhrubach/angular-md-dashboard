const webpackMerge = require('webpack-merge');
const helpers = require('./helpers');
const commonConfig = require('./webpack.common');

const DefinePlugin = require('webpack/lib/DefinePlugin');

const ENV = process.env.ENV || 'test';

module.exports = function () {
	return webpackMerge(commonConfig(), {

		devtool: 'inline-source-map',

		output: {
			path: helpers.root('dist'),
			filename: '[name].bundle.js',
		},

		module: {
			rules: [
				{
					test: /\.(js|ts)$/,
					enforce: 'post',
					loader: 'istanbul-instrumenter-loader',
					options: {
						esModules: true,
					},
					include: helpers.root('src'),
					exclude: [
						/\.(e2e|spec)\.ts$/,
						/node_modules/
					]
				},
			],
		},

		plugins: [
			new DefinePlugin({
				'ENV': JSON.stringify(ENV),
				'HMR': false,
				'process.env': {
					'ENV': JSON.stringify(ENV),
					'NODE_ENV': JSON.stringify(ENV),
					'HMR': false,
				}
			}),
		],
	});
};
