#!/usr/bin/env node
'use strict';

var _lib = require('./lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: Evaluate modelArg is not undefined and exists in the available
// resources.

// TODO: Evaluate amount exists and is not 0

var _process = process,
    argv = _process.argv;

var modelArg = argv[2];
var amountArg = argv[3];
var fileName = argv[4];

function printUsage() {
  console.log('\nusage:\n  fake-data-generator <model_name> <amount> <output_name>\n\nexample:\n  fake-data-generator example 10 example.json\n');
}

if (argv.length === 5) {
  (0, _lib2.default)({
    amountArg: amountArg,
    fileName: fileName,
    modelArg: modelArg,
    inputType: 'json',
    outputType: 'json'
  });
} else {
  printUsage();
}