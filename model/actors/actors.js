// Initial State
const initialState = {
  catFound: 0,
  list: [],
};

// Helpers
const randomizeHelper = require('../../helpers/randomize/randomize.js');
const connectionsHelper = require('../../helpers/connections-helpers.js');

// Actions
const actorsActions = require('../../actions/actors.js');
const INIT_ACTORS = actorsActions.INIT_ACTORS;
const MOVE_ACTORS = actorsActions.MOVE_ACTORS;
const MATCH_ACTORS = actorsActions.MATCH_ACTORS;

module.exports = (action, state) => {
  if (!state) {
    state = initialState;
  }

  switch(action.type) {
    case (INIT_ACTORS): return Object.assign({}, {
      catFound: 0,
      list: Array.apply(null, {length: action.length ? action.length : 0})
        .map(() => {
          const randomPositions = randomizeHelper.generateRandomCouple(1,300);

          return Object.assign({}, {
            cat: randomPositions[0],
            owner: {
              position: randomPositions[1],
              previousPositions: [],
            },
            isCatFound: false,
          });
        }),
    });
    case (MOVE_ACTORS): return Object.assign({}, state, {
      list: state.list.map(item => item.isCatFound ? item : Object.assign({}, {
        cat: connectionsHelper.getNextPossibleStations(item.cat, action.connections, action.stations),
        owner: Object.assign({}, {
          position: connectionsHelper.getNextPossibleStationWithHistory(
            item.owner.position,
            action.connections,
            action.stations,
            item.owner.previousPositions),
          previousPositions: item.owner.previousPositions.concat(item.owner.position),
        }),
        isCatFound: false,
      }))
    });
    case (MATCH_ACTORS): return Object.assign({}, {
      list: state.list.map((item, index) => {
        if ((item.cat === item.owner.position) && !item.isCatFound) {
          process.stdout.write('Owner '+ (index + 1) + ' found cat ' + (index + 1) );
          return Object.assign({}, item, {isCatFound: true});
        } else {
          return item;
        }
      }),
      catFound: state.catFound + action.matchNumber,
    });
    default: return state;
  }
};
