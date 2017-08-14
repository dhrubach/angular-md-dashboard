/**
 * karma configuration - http://karma-runner.github.io/1.0/config/configuration-file.html
 */
module.exports = function (config) {

	var testWebpackConfig = require('../config/webpack.test.js')();

	var configuration = {

		/**
		 * Enable / disable watching files and executing the tests whenever one of these
		 * file changes.
		 */
		autoWatch: true,

		/**
		 * Base path that will be used to resolve all patterns (e.g. files, exclude).
		*/
		basePath: '',

		/**
		 * A list of browsers to launch and capture. On startup, Karma will start
		 * each configured browser placed within this setting. Each configured browser
		 * has a corresponding launcher plugin.
		 * 		Chrome ---> karma-chrome-launcher-plugin
		 *
		 * Tests can be executed within any browser by directly navigating to
		 * http://localhost:9876 on that browser.
		 */
		browsers: [
			'Chrome'
		],

		/**
		 * Enable colors in the output (reporters and logs).
		 */
		colors: true,

		/**
		 * karma-coverage reporter configuration.
		 * https://www.npmjs.com/package/karma-coverage
		 * https://github.com/karma-runner/karma-coverage/blob/master/docs/configuration.md
		 *
		 * Since we are using karma-remap-coverage, save interim raw coverage
		 * report in memory.
		 */
		coverageReporter: {
			type: 'in-memory'
		},

		/**
		 * List of files to exclude.
		 */
		exclude: [],

		/**
		 * List of files/patterns to load in the browser.
		 *
		 * More details : http://karma-runner.github.io/1.0/config/files.html
		 *
		 * Since we are using karma-webpack, only load single entry point.
		 */
		files: [
			{ pattern: './test/spec-bundle.js', watched: false },
			{ pattern: './src/assets/**/*', watched: false, included: false, served: true, nocache: false }
		],

		/**
		 * List of test frameworks, each needs a separate plugin.
		 * Typical values - jasmine / mocha
		 */
		frameworks: ['jasmine'],

		/**
		 * Level of logging - LOG_DEBUG, LOG_WARN, LOG_ERROR, LOG_DISABLE
		 */
		logLevel: config.LOG_ERROR,

		/**
		 * Port where web server will be listening.
		 */
		port: 9876,

		/**
		 * A map of preprocessors to use.
		 * http://karma-runner.github.io/1.0/config/preprocessors.html
		 */
		preprocessors: {
			'./test/spec-bundle.js': ['webpack', 'sourcemap'],
		},

		/**
		 * By default all assets are served at http://localhost:[port]/base/
		 * Example : http://localhost:[port]/base/src/assets/logo/logo-1.jpg
		 *
		 * With this setting, images will be fetched from http://localhost:[port]/assets/logo/logo-1.jpg
		 */
		proxies: {
			"/assets/": "/base/src/assets/"
		},

		/**
		 * karma-remap-coverage reporter configuration.
		 * https://www.npmjs.com/package/karma-remap-coverage
		 */
		remapCoverageReporter: {
			'text-summary': null,	// to show summary in console
			json: './test/coverage/coverage.json',
			html: './test/coverage/html'
		},

		/**
		 * A list of reporters to use.
		 *
		 * karma-mocha-reporter : https://www.npmjs.com/package/karma-mocha-reporter
		 * karma-coverage : https://www.npmjs.com/package/karma-coverage
		 * karma-remap-coverage : https://www.npmjs.com/package/karma-remap-coverage
		 */
		reporters: ['mocha', 'coverage', 'remap-coverage'],

		/**
		 * If true, Karma will start and capture all configured browsers, run tests and
		 * then exit with an exit code of 0 or 1 depending on whether all tests
		 * passed or any tests failed.
		 */
		singleRun: false,

		/**
		 * Use webpack to preprocess files in karma.
		 * https://www.npmjs.com/package/karma-webpack
		 *
		 * karma watches the test entry points configured with 'files'.
		 * No separate entry points should be configured in webpack configuration.
		 */
		webpack: testWebpackConfig,

		/**
		 * webpack-dev-middleware configuration.
		 * https://www.npmjs.com/package/webpack-dev-middleware
		 */
		webpackMiddleware: {
			noInfo: false,
			stats: {
				chunks: false,
				colors: true,
			}
		},
	};

	config.set(configuration);
};
