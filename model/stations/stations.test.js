var assert = require('assert');
var assert = require('chai').assert;
var _ = require('underscore');

// Function
var stations = require('./stations.js');
const stationsActions = require('../../actions/stations.js');
const INIT_STATIONS = stationsActions.INIT_STATIONS;
const CLOSE_STATIONS = stationsActions.CLOSE_STATIONS;
const UPDATE_STATIONS = stationsActions.UPDATE_STATIONS;

// Constants
const mockStationsImport = [
  ["1","Acton Town"],
  ["2","Aldgate"],
  ["3","Aldgate East"],
];
const initStationArray = stations({type: INIT_STATIONS, list: mockStationsImport});

describe('Stations store functions', function() {
  describe('Default action', function () {
    it('should empty array if action type not found', function () {
      assert.equal(stations({type: ''}).length, 0);
    });
  });
  describe('Init action', function () {
    it('should be an array of objects', function () {
      const importedArray = stations({type: INIT_STATIONS, list: mockStationsImport});
      importedArray
        .filter((item, index) => index < 1)
        .map(item => {
          assert.typeOf(item.id, 'number');
          assert.equal(item.id, 1);
          assert.typeOf(item.name, 'string');
          assert.equal(item.name, 'Acton Town');
          assert.typeOf(item.isClosed, 'boolean');
          assert.equal(item.isClosed, false);
          assert.typeOf(item.visited, 'number');
          assert.equal(item.visited, 0);
        });
    });
    it('should be an empty array if no list provided', function () {
      const importedArray = stations({type: INIT_STATIONS});
      assert.equal(importedArray.length, 0);
    });
    it('should be an array of the same size', function () {
      const importedArray = stations({type: INIT_STATIONS, list: mockStationsImport});
      assert.equal(importedArray.length, mockStationsImport.length);
    });
  });
  describe('Close Stations action', function () {
    it('should be an empty array if action type not found', function () {
      const stationsObject = stations({type: CLOSE_STATIONS, stationsToClose: [3]}, initStationArray);

      stationsObject.map((item, index) => {
        if (index === 2) {
          assert.equal(item.isClosed, true);
        }
      });
    });
    it('should return the previous state', function () {
      const stationsObject = stations({type: CLOSE_STATIONS}, initStationArray);
      assert.equal(_.isEqual(stationsObject, initStationArray), true);
    });
  });
  describe('Update Stations', function() {
    it('should return the list of station updated in terms of visits', function() {
      const stationsObject = stations({type: UPDATE_STATIONS, listOfStations: [1,1,3]}, initStationArray);

      stationsObject.map((item, index) => {
        if (index === 0) {
          assert.equal(item.visited, initStationArray[0].visited + 2);
        } else if (index === 1) {
          assert.equal(item.visited, initStationArray[1].visited);
        } else if (index === 2) {
          assert.equal(item.visited, initStationArray[2].visited + 1);
        }
      });
    });
    it('should return the same state if ommiting the list', function() {
      const stationsObject = stations({type: UPDATE_STATIONS}, initStationArray);
      assert.equal(_.isEqual(stationsObject, initStationArray), true);
    });
    it('should return the same state if empty list', function() {
      const stationsObject = stations({type: UPDATE_STATIONS, listOfStations: []}, initStationArray);
      assert.equal(_.isEqual(stationsObject, initStationArray), true);
    });
  });
});
