const INIT_STATIONS = 'INIT_STATIONS';
const CLOSE_STATIONS = 'CLOSE_STATIONS';
const UPDATE_STATIONS = 'UPDATE_STATIONS';

module.exports = {
  INIT_STATIONS: INIT_STATIONS,
  CLOSE_STATIONS: CLOSE_STATIONS,
  UPDATE_STATIONS: UPDATE_STATIONS,
  initStations: (list) => Object.assign({}, {
    type: INIT_STATIONS,
    list: list,
  }),
  updateStations: (listOfStations) => {
    return Object.assign({}, {
      type: UPDATE_STATIONS,
      listOfStations: listOfStations,
    });
  },
  closeStations: (stationsToClose) => Object.assign({}, {
    type: CLOSE_STATIONS,
    stationsToClose: stationsToClose,
  }),
};
