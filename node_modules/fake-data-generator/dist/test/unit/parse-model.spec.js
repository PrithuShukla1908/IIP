'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _parseModel = require('../../lib/parse-model');

var _parseModel2 = _interopRequireDefault(_parseModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(require('chai-string')); // import 'babel-polyfill'


describe('ParseModel', function () {

  it('parseModelData - returns parsed Object after configuring faker', function () {
    var model = { "config": { "locale": "en" }, "model": { "company": { "type": "Object", "value": { "name": { "type": "faker", "value": "company.companyName" } } } } };
    var result = (0, _parseModel2.default)(model);
    (0, _chai.expect)(result).to.be.a('object');
    (0, _chai.expect)(result).to.have.property('company');
    (0, _chai.expect)(result.company).to.have.property('name');
  });

  it('Object - returns Object', function () {
    var model = { "company": { "type": "Object", "value": { "name": { "type": "faker", "value": "company.companyName" } } } };
    var result = (0, _parseModel.parseModel)(model);
    (0, _chai.expect)(result).to.be.a('object');
    (0, _chai.expect)(result).to.have.property('company');
    (0, _chai.expect)(result.company).to.have.property('name');
  });

  it('Array - returns an Array with exactly 3 entries', function () {
    var model = { value: { name: { type: 'faker', value: 'internet.domainWord' } } };
    var options = { size: 3 };
    var result = (0, _parseModel.parseArray)(model, options);
    (0, _chai.expect)(result).to.have.lengthOf(options.size);
  });

  it('Array - returns an Array whose length is between 4 and 10', function () {
    var model = { value: { name: { type: 'faker', value: 'internet.domainWord' } } };
    var options = { size: [4, 15] };
    var result = (0, _parseModel.parseArray)(model, options);
    (0, _chai.expect)(result).to.have.lengthOf.within(options.size[0], options.size[1]);
  });

  it('appends - adds "pdf" to the end of a string', function () {
    var model = { type: 'faker', value: 'random.words' };
    var options = { text: '.pdf' };
    var result = (0, _parseModel.append)(model, options);
    (0, _chai.expect)(result).to.endsWith(options.text);
  });

  it('appends - adds "#" to the start of a random number', function () {
    var model = { type: 'randomNumberBetween', value: [1, 2500] };
    var options = { text: '#' };
    var result = (0, _parseModel.prepend)(model, options);
    (0, _chai.expect)(result).to.startsWith(options.text);
  });

  it('String - acts as a simple passthrough and returns what was passed in', function () {
    var model = "Banana";
    var result = (0, _parseModel.parseString)(model);
    (0, _chai.expect)(result).to.eql(model);
  });

  it('Literal - acts as a simple passthrough and returns what was passed in', function () {
    var model = "Banana";
    var result = (0, _parseModel.parseLiteral)(model);
    (0, _chai.expect)(result).to.eql(model);
  });

  it('Literal with complex model - should return with unstringified object reference', function () {
    var model = { type: 'Literal', value: 'catacombs' };
    var str = '[object Object]';
    var result = String(model);
    (0, _chai.expect)(result).to.not.be.a('object');
    (0, _chai.expect)(result).to.be.a('string');
    (0, _chai.expect)(result).to.have.string(str);
    (0, _chai.expect)(result === JSON.stringify(model)).to.be.false;
  });

  it('incrementNumber - returns an incremented Number', function () {
    var model = {
      model: {
        brownies: {
          type: 'incrementNumber',
          options: {
            from: 200
          }
        }
      }
    };
    var result = (0, _parseModel2.default)(model, { index: 220, amount: 1 });
    (0, _chai.expect)(result).to.deep.include({ brownies: 420 });
  });

  // Mix-n-Match
  describe('Ensuring everything plays nice together', function () {
    it('prepend with Literal - should return "Grapefruit".', function () {
      var model = { type: 'Literal', value: 'fruit' };
      var options = { text: 'Grape' };
      var result = (0, _parseModel.prepend)(model, options);
      (0, _chai.expect)(result).to.eql('Grapefruit');
      (0, _chai.expect)(result).to.startsWith(options.text);
    });

    it('append with Literal - should return "Grapefruit.txt".', function () {
      var model = { type: 'Literal', value: 'Grapefruit' };
      var options = { text: '.txt' };
      var result = (0, _parseModel.append)(model, options);
      (0, _chai.expect)(result).to.eql('Grapefruit.txt');
      (0, _chai.expect)(result).to.endsWith(options.text);
    });
  });
});