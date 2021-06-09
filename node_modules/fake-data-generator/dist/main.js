'use strict';

var _package = require('./package.json');

var _lib = require('./lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  description: _package.description,
  name: _package.name,
  version: _package.version,
  doc: 'Visit ' + _package.homepage + ' for more information.',
  generateModel: _lib2.default
};