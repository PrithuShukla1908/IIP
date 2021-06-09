'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chai = require('chai');

var _createFile = require('../../lib/create-file');

var _example = require('../../models/example.json');

var _example2 = _interopRequireDefault(_example);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Create File', function () {
  var fileName = 'example-test.json';
  var outputPath = 'output/' + fileName;

  before('given a name \'example-test\' and a data object creates a json file with a model\'s data', function () {
    (0, _createFile.createFile)(outputPath, _example2.default);
  });

  it('createFile - a json file with name \'example-test.json\' must exist', function () {
    var filePath = outputPath;
    _fs2.default.exists(process.cwd() + '/' + filePath, function (exists) {
      (0, _chai.expect)(exists).to.eql(true);
    });
  });

  after(function () {
    var filePath = outputPath;
    _fs2.default.unlink(filePath, function (error) {
      (0, _chai.expect)(error).to.eql(null);
    });
  });
});