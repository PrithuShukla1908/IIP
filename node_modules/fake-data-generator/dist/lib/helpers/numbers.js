'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var randomBetween = function randomBetween(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      min = _ref2[0],
      max = _ref2[1];

  return Math.floor(Math.random() * (max - min + 1) + min);
};

var randomElementInArray = function randomElementInArray(value) {
  var ele = Math.floor(Math.random() * (value.length - 1));
  return value[ele];
};

var randomElementsInArray = function randomElementsInArray(value) {
  var subArray = [].concat(_toConsumableArray(value));
  for (var i = subArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref3 = [subArray[j], subArray[i]];
    subArray[i] = _ref3[0];
    subArray[j] = _ref3[1];
  }
  return subArray.slice(0, Math.floor(Math.random() * subArray.length) || 1);
};

var randomBetweenWithString = function randomBetweenWithString(value) {
  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref4$prefix = _ref4.prefix,
      prefix = _ref4$prefix === undefined ? '' : _ref4$prefix,
      _ref4$suffix = _ref4.suffix,
      suffix = _ref4$suffix === undefined ? '' : _ref4$suffix;

  var randomNumber = randomBetween(value);
  if (!prefix && !suffix) {
    return '' + randomNumber;
  }
  return '' + prefix + randomNumber + suffix;
};

var incrementNumber = function incrementNumber(value, _ref5) {
  var index = _ref5.index,
      _ref5$from = _ref5.from,
      from = _ref5$from === undefined ? 0 : _ref5$from;

  return from + index;
};

exports.incrementNumber = incrementNumber;
exports.randomBetween = randomBetween;
exports.randomBetweenWithString = randomBetweenWithString;
exports.randomElementInArray = randomElementInArray;
exports.randomElementsInArray = randomElementsInArray;