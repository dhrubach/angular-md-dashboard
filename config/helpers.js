const path = require('path');

const ROOT = path.resolve(__dirname, '..');

exports.root = path.join.bind(path, ROOT);
