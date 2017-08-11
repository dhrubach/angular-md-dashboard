module.exports = {
	"globals": {
		"ts-jest": {
			"tsConfigFile": "tsconfig.spec.json",
			"useBabelrc": true
		},
		"__TRANSFORM_HTML__": true
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
		"^.+\\.*(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/tests/assetsTransformer.js"
	},
	"verbose": true,
	"rootDir": "../../",
	"setupTestFrameworkScriptFile": "<rootDir>/src/tests/setup-jest.js",
	"testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|js)$",
	"transform": {
		"^.+\\.(ts|js|html)$": "<rootDir>/src/tests/preprocessor.js"
	},
	"transformIgnorePatterns": [
		"node_modules/(?!@ngrx)"
	],
};
