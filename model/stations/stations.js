const initialState = [];

// Actions
const stationsActions = require('../../actions/stations.js');
const INIT_STATIONS = stationsActions.INIT_STATIONS;
const CLOSE_STATIONS = stationsActions.CLOSE_STATIONS;
const UPDATE_STATIONS = stationsActions.UPDATE_STATIONS;

module.exports = (action, state) => {
  if (!state) {
    state = initialState;
  }

  switch(action.type) {
    case(INIT_STATIONS): return action.list ? action.list.map(item => Object.assign({}, {
      id: parseInt(item[0]),
      name: item[1],
      isClosed: false,
      visited: 0,
    })) : [];
    case(CLOSE_STATIONS): return action.stationsToClose ? state.map(station => {
      if (action.stationsToClose.indexOf(station.id) > -1) {
        console.log(' -  ' + station.name + ' is now closed.');
        return Object.assign({}, station, {isClosed: true});
      } else {
        return station;
      }
    }) : state;
    case(UPDATE_STATIONS): return action.listOfStations ? state.map(station => {
      const numberOfVisits = action.listOfStations.filter(item => item === station.id);
      return Object.assign({}, station, {visited: station.visited + numberOfVisits.length});
    }) : state;
    default: return state;
  }
};
