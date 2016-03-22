var assert = require('assert');
var assert = require('chai').assert;

var randomizeHelper = require('./randomize.js');

describe('Randomize helpers functions', function() {
  describe('randomize function', function() {
    it('should be a value between 1 and 2', function() {
      const rdmVal = randomizeHelper.randomize(0,2);
      assert.equal((rdmVal === 1 || rdmVal === 2 || rdmVal === 0), true);
    });
    it('should return 0', function() {
      assert.equal(randomizeHelper.randomize(0,0) === 0, true);
    });
  });
  describe('randomize couple', function() {
    it('shoud return two numbers between 1 and 3 differents', function() {
      const rdmCouple = randomizeHelper.generateRandomCouple(1,3);
      assert.equal((rdmCouple[0] === 1 || rdmCouple[0] === 2 || rdmCouple[0] === 3), true);
      assert.equal((rdmCouple[1] === 1 || rdmCouple[1] === 2 || rdmCouple[1] === 3), true);
      assert.equal(rdmCouple[0] !== rdmCouple[1], true);
    });
  });
});
