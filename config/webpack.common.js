const webpack = require('webpack');
const helpers = require('./helpers');

const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const ForkTSCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');

const rules = [
	{
		test: /\.ts$/,
		exclude: /node_modules/,
		use: [
			{ loader: 'babel-loader' },
			{
				loader: 'ng-router-loader',
				options: {
					debug: false,
				},
			},
			{
				loader: 'ts-loader',
				options: {
					transpileOnly: true,
				}
			},
		]
	},
	{
		test: /\.ts$/,
		exclude: /node_modules/,
		enforce: 'pre',
		loader: 'tslint-loader',
		options: {
			formattersDirectory: 'node_modules/custom-tslint-formatters/formatters',
			formatter: 'grouped'
		}
	},
	{
		test: /\.js$/,
		exclude: /node_modules/,
		use: 'babel-loader'
	},
	{
		test: /\.css$/,
		exclude: /src\\app/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: [
				{ loader: 'css-loader' },
				{ loader: 'postcss-loader' },
			]
		})
	},
	{
		test: /\.css$/,
		include: /src\\app/,
		use: [
			{ loader: 'to-string-loader' },
			{ loader: 'css-loader' },
			{ loader: 'postcss-loader' },
		]
	},
	{
		test: /\.scss$/,
		include: /src\\app/,
		use: [
			{ loader: 'to-string-loader' },
			{
				loader: 'css-loader',
				options: { importLoaders: 1 },
			},
			{
				loader: 'sass-loader',
				options: { importLoaders: 1 },
			},
			{ loader: 'postcss-loader' },
		]
	},
	{
		test: /\.scss$/,
		exclude: /src(\\app|\\assets\\custom-themes)/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: [
				{ loader: 'css-loader' },
				{ loader: 'resolve-url-loader' },
				{
					loader: 'sass-loader',
					options: { sourceMap: true },
				},
				{ loader: 'postcss-loader' },
			]
		})
	},
	{
		test: /\.scss$/,
		include: /src\\assets\\custom-themes/,
		use: [
			{
				loader: 'file-loader',
				options: {
					name: '[name].css',
					context: './src/assets/custom-themes/',
				},
			},
			{ loader: 'extract-loader' },
			{ loader: 'css-loader' },
			{
				loader: 'sass-loader',
				options: { sourceMap: true },
			},
			{ loader: 'postcss-loader' },
		],
	},
	{
		test: /\.html$/,
		exclude: /node_modules/,
		use: 'raw-loader'
	},
	{
		test: /\.(ttf|eof|svg|eot|jpg|png)(\?[\s\S]+)?$/,
		use: 'file-loader'
	},
	{
		test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
		loader: 'url-loader',
		options: {
			limit: 10000
		}
	},
];

const plugins = [
	new ExtractTextPlugin({
		filename: 'style.css',
		allChunks: true,
	}),
	new HtmlPlugin({
		template: './src/index.ejs',
		title: 'Angular Material Dashboard',
		filename: 'index.html'
	}),
	new ContextReplacementPlugin(
		/angular(\\|\/)core(\\|\/)@angular/,
		helpers.root('src'),
	),
	new ProvidePlugin({
		$: 'jquery',
		jQuery: 'jquery',
		'window.jQuery': 'jquery',
		tether: 'tether',
		Tether: 'tether',
		'window.Tether': 'tether',
		Chartist: 'chartist',
	}),
	new ForkTSCheckerPlugin({
		tslint: false,
		watch: ['./src'],
	}),
	new IgnorePlugin(/^\.(\\|\/)locale$/, /moment$/),
];

const config = () => {
	return {
		module: { rules: rules },
		plugins: plugins,
		resolve: {
			extensions: ['.ts', '.js', '.css', '.scss'],
			modules: [helpers.root('src'), helpers.root('node_modules')],
		},
	};
};

module.exports = config;
