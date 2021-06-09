'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _chai = require('chai');

var _helpers = require('../../../lib/helpers');

describe('Numbers', function () {

  var from = 1;
  var to = 2500000;
  var options = { prefix: '#', suffix: '*' };

  it('randomBetween - returns a number between 1 and 2500000', function () {
    var randomBetween = _helpers.numbers.randomBetween;

    var from = 1;
    var to = 2500000;
    var randomNumber = randomBetween([from, to]);

    (0, _chai.expect)(randomNumber).to.be.a('number');
    (0, _chai.expect)(randomNumber).to.be.within(from, to);
  });

  it('randomElementInArray - returns a random value from an array', function () {
    var randomElementInArray = _helpers.numbers.randomElementInArray;

    var arr = ['One', 'Two', 'Three', 'Four]'];
    var element = randomElementInArray(arr);

    (0, _chai.expect)(arr).to.include(element);
  });

  it('randomElementsInArray - returns a random subgroup from an array', function () {
    var randomElementsInArray = _helpers.numbers.randomElementsInArray;

    var arr = ['One', 'Two', 'Three', 'Four]'];
    var elements = randomElementsInArray(arr);

    (0, _chai.expect)(elements).to.be.an('array').that.is.not.empty;
    // expect(arr).to.include(element);
  });

  it('randomBetweenWithString - returns a number between 1 and 2500000 with prefix \'#\' and suffix \'*\'', function () {
    var randomBetweenWithString = _helpers.numbers.randomBetweenWithString;

    var randomNumberWithString = randomBetweenWithString([from, to], options);

    var _splitValues = splitValues(options.prefix, options.suffix, randomNumberWithString),
        prefix = _splitValues.prefix,
        suffix = _splitValues.suffix,
        value = _splitValues.value;

    (0, _chai.expect)(randomNumberWithString).to.be.a('string');
    (0, _chai.expect)(value).to.be.a('string');
    (0, _chai.expect)(parseInt(value)).to.be.within(from, to);
    (0, _chai.expect)(prefix).to.eql(options.prefix);
    (0, _chai.expect)(suffix).to.eql(options.suffix);
  });

  it('randomBetweenWithString - returns a number between 1 and 2500000 with prefix \'#\' and no suffix', function () {
    var randomBetweenWithString = _helpers.numbers.randomBetweenWithString;

    var randomNumberWithString = randomBetweenWithString([from, to], { prefix: options.prefix });

    var _splitValues2 = splitValues(options.prefix, undefined, randomNumberWithString),
        prefix = _splitValues2.prefix,
        suffix = _splitValues2.suffix,
        value = _splitValues2.value;

    (0, _chai.expect)(randomNumberWithString).to.be.a('string');
    (0, _chai.expect)(value).to.be.a('string');
    (0, _chai.expect)(parseInt(value)).to.be.within(from, to);
    (0, _chai.expect)(prefix).to.eql(options.prefix);
    (0, _chai.expect)(suffix).to.eql('');
  });

  it('randomBetweenWithString - returns a number between 1 and 2500000 with no prefix and suffix \'*\'', function () {
    var randomBetweenWithString = _helpers.numbers.randomBetweenWithString;

    var randomNumberWithString = randomBetweenWithString([from, to], { suffix: options.suffix });

    var _splitValues3 = splitValues(undefined, options.suffix, randomNumberWithString),
        prefix = _splitValues3.prefix,
        suffix = _splitValues3.suffix,
        value = _splitValues3.value;

    (0, _chai.expect)(randomNumberWithString).to.be.a('string');
    (0, _chai.expect)(value).to.be.a('string');
    (0, _chai.expect)(parseInt(value)).to.be.within(from, to);
    (0, _chai.expect)(prefix).to.eql('');
    (0, _chai.expect)(suffix).to.eql(options.suffix);
  });

  it('randomBetweenWithString - returns a number between 1 and 2500000 with no prefix and no suffix', function () {
    var randomBetweenWithString = _helpers.numbers.randomBetweenWithString;

    var randomNumberWithString = randomBetweenWithString([from, to]);

    var _splitValues4 = splitValues(undefined, undefined, randomNumberWithString),
        prefix = _splitValues4.prefix,
        suffix = _splitValues4.suffix,
        value = _splitValues4.value;

    (0, _chai.expect)(randomNumberWithString).to.be.a('string');
    (0, _chai.expect)(value).to.be.a('string');
    (0, _chai.expect)(parseInt(value)).to.be.within(from, to);
    (0, _chai.expect)(prefix).to.eql('');
    (0, _chai.expect)(suffix).to.eql('');
  });
});

function splitValues() {
  var _prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var _suffix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var string = arguments[2];

  if (!_prefix && !_suffix) {
    return { value: string, prefix: _prefix, suffix: _suffix };
  }
  if (!_prefix && _suffix) {
    var _value = string.split(_suffix)[0];

    var _string$split = string.split(_value),
        _string$split2 = _slicedToArray(_string$split, 2),
        _prefix2 = _string$split2[0],
        _suffix2 = _string$split2[1];

    return { prefix: _prefix2, suffix: _suffix2, value: _value };
  }
  if (_prefix && !_suffix) {
    var _value2 = string.split(_prefix)[1];

    var _string$split3 = string.split(_value2),
        _string$split4 = _slicedToArray(_string$split3, 2),
        _prefix3 = _string$split4[0],
        _suffix3 = _string$split4[1];

    return { prefix: _prefix3, suffix: _suffix3, value: _value2 };
  }
  var value = string.split(_suffix)[0].split(_prefix)[1];

  var _string$split5 = string.split(value),
      _string$split6 = _slicedToArray(_string$split5, 2),
      prefix = _string$split6[0],
      suffix = _string$split6[1];

  return {
    prefix: prefix,
    suffix: suffix,
    value: value
  };
}