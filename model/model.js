// Stores
var stations = require('./stations.js');
var connections = require('./connections.js');
var actors = require('./actors.js');

// Actions
var connectionsActions = require('../actions/connections.js');
var stationsActions = require('../actions/stations.js');
var actorsActions = require('../actions/actors.js');
var modelActions = require('../actions/model.js');

// Model actions constants
const INIT_MODEL = modelActions.INIT_MODEL;
const MOVE_MODEL = modelActions.MOVE_MODEL;
const UPDATE_MODEL = modelActions.UPDATE_MODEL;

module.exports = (action, state) => {
  switch(action.type) {
    case (INIT_MODEL): return Object.assign({}, {
      stations: stations(stationsActions.initStations(require('../constants/stations.json'))),
      connections: connections(connectionsActions.initConnections(require('../constants/connections.json'))),
      actors: actors(actorsActions.initActors(action.actorNumber)),
    });
    case (MOVE_MODEL): {

      const currentPositions = state.actors.list
        .reduce((prev, item) => prev.concat(item.cat, item.owner.position), []);

      return Object.assign({}, state, {
        actors: actors(actorsActions.moveActors(state.connections, state.stations), state.actors),
        stations: stations(stationsActions.updateStations(currentPositions), state.stations),
      });
    };
    case (UPDATE_MODEL): {

      // Get the list of stations to close
      const stationsToClose = state.actors.list
        .filter(item => ((item.cat === item.owner.position) && !item.isCatFound))
        .reduce((prev, item) => prev.concat(item.cat), []);

      // Close the stations and find the matchs
      return Object.assign({}, state, {
        actors: actors(actorsActions.matchActors(stationsToClose.length), state.actors),
        stations: stations(stationsActions.closeStations(stationsToClose), state.stations),
      });
    };
    default: return state;
  }
};
