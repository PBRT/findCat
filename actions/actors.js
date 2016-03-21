const INIT_ACTORS = 'INIT_ACTORS';
const MOVE_ACTORS = 'MOVE_ACTORS';
const MATCH_ACTORS = 'MATCH_ACTORS';

module.exports = {
  INIT_ACTORS: INIT_ACTORS,
  MATCH_ACTORS: MATCH_ACTORS,
  MOVE_ACTORS: MOVE_ACTORS,
  initActors: (length) => Object.assign({}, {
    type: INIT_ACTORS,
    length: length,
  }),
  moveActors: (connections, stations) => Object.assign({}, {
    type: MOVE_ACTORS,
    connections: connections,
    stations: stations,
  }),
  matchActors: (matchNumber) => Object.assign({}, {
    type: MATCH_ACTORS,
    matchNumber: matchNumber,
  }),
};
