var assert = require('assert');
var assert = require('chai').assert;

// Function
var actors = require('./actors.js');
const actorsActions = require('../../actions/actors.js');
const INIT_ACTORS = actorsActions.INIT_ACTORS;
const MOVE_ACTORS = actorsActions.MOVE_ACTORS;

const initActorsArray = actors({type: INIT_ACTORS, length: 2});
const mockedConnections = [
  [1,2],
  [1,3],
  [2,3],
];

const mockedStations = [
  {id: 1, name: 'Aldgate', isClosed: false},
  {id: 2, name: 'Old Street', isClosed: false},
  {id: 3, name: 'Liverpool Street', isClosed: false},
];

describe('Actors store functions', function() {
  describe('Default action', function () {
    it('should empty array if action type not found', function () {
      assert.equal(actors({type: ''}).list.length, 0);
    });
  });
  describe('Init action', function () {
    it('should generate an object with a list of 10 actors', function () {
      const actorsArray = actors({type: INIT_ACTORS, length: 10});
      assert.equal(actorsArray.catFound, 0);
      assert.equal(actorsArray.list.length, 10);
    });
    it('should generate array with the correct actor structure', function () {
      const actorsItem = actors({type: INIT_ACTORS, length: 1}).list[0];
      assert.equal(actorsItem.cat > 0 && actorsItem.cat < 300, true);
      assert.equal(actorsItem.owner.position > 0 && actorsItem.owner.position < 300, true);
      assert.equal(actorsItem.owner.previousPositions.length, 0);
      assert.equal(actorsItem.isCatFound, false);
      assert.equal(actorsItem.cat !== actorsItem.owner.position, true);
    });
    it('should generate an empty array', function () {
      const actorsArray = actors({type: INIT_ACTORS});
      assert.equal(actorsArray.list.length, 0);
    });
  });
  describe('Move actors', function() {
    it('should generate new random positions if the cat is not found', function() {
      const movedActorsArray = actors(
        {type: MOVE_ACTORS, connections: mockedConnections, stations: mockedStations},
        Object.assign({}, initActorsArray, {list: initActorsArray.list.map((item, index) => index === 0 ?
          Object.assign({}, item, {isCatFound: true}) : item)}));

      movedActorsArray.list.map((item,index) => {
        if (index === 0) {
          assert(item.cat === initActorsArray.list[0].cat, true);
          assert(item.owner.position === initActorsArray.list[0].owner.position, true);
        } else if (index === 1) {
          assert(item.owner.position === initActorsArray.list[1].owner.position, false);
        }
      });
    });
  });
});
