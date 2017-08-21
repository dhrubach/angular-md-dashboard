module.exports = {
	"collectCoverage": true,
	"collectCoverageFrom": ["**/*.ts", "!**/test/**", '!**/*.spec.ts'],
	"coverageDirectory": "<rootDir>/test/coverage/jest",
	"globals": {
		"Chartist": {},
		"ts-jest": {
			"tsConfigFile": "tsconfig.spec.json",
			"useBabelrc": true
		},
		"__TRANSFORM_HTML__": true,
	},
	"mapCoverage": true,
	"moduleDirectories": [
		"node_modules",
		"src"
	],
	"moduleFileExtensions": [
		"ts",
		"js",
		"html",
		"json"
	],
	"moduleNameMapper": {
		"^.+\\.*(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/assetsTransformer.js"
	},
	"rootDir": "../",
	"setupTestFrameworkScriptFile": "<rootDir>/test/setup-jest.js",
	"testRegex": "(/__tests__/.*|\\.test)\\.(ts|js)$",
	"transform": {
		"^.+\\.(ts|js|html)$": "<rootDir>/test/preprocessor.js"
	},
	"transformIgnorePatterns": [
		"node_modules/(?!@ngrx)"
	],
	"verbose": true,
	"watchman": false,
};
