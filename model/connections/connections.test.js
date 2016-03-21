var assert = require('assert');
var assert = require('chai').assert;

// Function
var connections = require('./connections.js');
const connectionsActions = require('../../actions/connections.js');
const INIT_CONNECTIONS = connectionsActions.INIT_CONNECTIONS;

// Constants
const mockConnectionsImport = [['1', '2']];

describe('Connections store functions', function() {
  describe('Default action', function () {
    it('should empty array if action type not found', function () {
      assert.equal(connections({type: ''}).length, 0);
    });
  });
  describe('Init action', function () {
    it('should be an array of integer', function () {
      const importedArray = connections({type: INIT_CONNECTIONS, list: mockConnectionsImport});
      importedArray.map(item => {
        assert.typeOf(item[0], 'number');
        assert.typeOf(item[1], 'number');
      });
    });
    it('should be an array of the same size', function () {
      const importedArray = connections({type: INIT_CONNECTIONS, list: mockConnectionsImport});
      assert.equal(importedArray.length, mockConnectionsImport.length);
    });
    it('should be an empty array if no list provided', function () {
      const importedArray = connections({type: INIT_CONNECTIONS});
      assert.equal(importedArray.length, 0);
    });
  });
});
