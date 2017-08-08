const webpack = require('webpack');
const path = require('path');

const config = {
	entry: {
		helpers: ['core-js', 'hammerjs', 'rxjs', 'zone.js'],
		angular: [
			'@angular/animations',
			'@angular/common',
			'@angular/compiler',
			'@angular/core',
			'@angular/forms',
			'@angular/http',
			'@angular/material',
			'@angular/platform-browser',
			'@angular/platform-browser-dynamic',
			'@angular/platform-browser/animations',
			'@angular/router',
		],
		utility: [
			'chartist',
			'lodash',
			'lodash-es',
			'moment',
			'ag-grid-angular',
			'ng-chartist',
			'ng-pick-datetime',
			'ng2-simple-timer',
		],
	},
	output: {
		path: path.join(...[__dirname, 'dist', 'dll']),
		filename: '[name].bundle.js',
		library: '[name]__lib',
	},
	plugins: [
		new webpack.DllPlugin({
			context: '.',
			name: '[name]__lib',
			path: path.join(__dirname, 'dist', 'dll/[name]-manifest.json'),
		}),
	],
};

module.exports = config;
