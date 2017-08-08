const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const helpers = require('./helpers');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const ENV = process.env.NODE_ENV || 'production';
const ANALYZE = process.env.ANALYZE || false;

module.exports = () => {

	const plugins = [
		new CompressionPlugin(),
		new DefinePlugin({
			'ENV': JSON.stringify(ENV),
			'process.env': {
				'ENV': JSON.stringify(ENV),
				'NODE_ENV': JSON.stringify(ENV),
			},
		}),
		new HashedModuleIdsPlugin(),
		new LoaderOptionsPlugin({
			debug: false,
			minimize: true,
		}),
		new OptimizeJsPlugin({
			sourceMap: false
		}),
		new UglifyJsPlugin({
			beautify: false,
			output: {
				comments: false
			},
			mangle: {
				screw_ie8: true
			},
			compress: {
				screw_ie8: true,
				warnings: false,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true,
				negate_iife: false // we need this for lazy v8
			},
		}),
	];

	if (ANALYZE) {
		plugins.unshift(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
	}

	return webpackMerge(commonConfig(), {

		devtool: 'cheap-source-map',

		output: {
			path: helpers.root('dist'),
			filename: '[name]-[chunkhash].bundle.js',
			chunkFilename: '[name]-[chunkhash].chunk.js',
		},

		plugins: plugins,
	});
};
