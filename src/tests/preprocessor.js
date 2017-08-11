const process = require('jest-preset-angular/preprocessor.js').process;
const STYLE_REGEX = /styles:\s*\[\s*(require\((?:'|").*(?:'|")\))\]/g;

module.exports.process = (src, path, config, transformOptions) => {
	src = src.replace(STYLE_REGEX, 'styles: []');
	return process(src, path, config, transformOptions);
};
