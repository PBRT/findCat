// Helpers
const randomizeHelper = require('./randomize/randomize.js');

// Return if a station is closed
const isStationClosed = (stations, currentStation) => stations
    .filter(item => item.id === currentStation)
    .reduce((prev, item) => item.isClosed, false);

// Return an array of possible next stations excluding the closed ones
const getNextPossibleStations = (currentStation, connections, stations) => connections
  .filter(conection => (conection[0] === currentStation) || (conection[1] === currentStation))
  .reduce((prev, item) => prev.concat((item[0] !== currentStation) ? item[0] : item[1]), [])
  .filter(station => !isStationClosed(stations, station));

module.exports = {
  getNextPossibleStations: (currentStation, connections, stations) => {
    const potentialStations = getNextPossibleStations(currentStation, connections, stations);

    // If the actor is not blocked, return a random station in the available ones
    if (potentialStations.length > 0) {
      return potentialStations[randomizeHelper.randomize(0, potentialStations.length)];
    } else {
      return currentStation;
    }
  },
  // Return list of possible stations taking the previous stations in consideration
  getNextPossibleStationWithHistory: (currentStation, connections, stations, history) => {
    const potentialStations = getNextPossibleStations(currentStation, connections, stations);
    const potentialUnvisitedStations = potentialStations
      .filter(station => history.indexOf(station) === -1);

    if (potentialStations.length > 0) {
      if (potentialUnvisitedStations.length > 0) {
        return potentialUnvisitedStations[randomizeHelper.randomize(0, potentialUnvisitedStations.length)];
      } else {
        return potentialStations[randomizeHelper.randomize(0, potentialStations.length)];
      }
    } else {
      // Blocked
      return currentStation;
    }
  },
};
