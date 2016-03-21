// Initial State
const initialState = [];

// Actions
const connectionsActions = require('../actions/connections.js');
const INIT_CONNECTIONS = connectionsActions.INIT_CONNECTIONS;

module.exports = (action, state) => {
  if (!state) {
    state = initialState;
  }

  switch(action.type) {
    case (INIT_CONNECTIONS): return action.list.map(item => [parseInt(item[0]), parseInt(item[1])]);
    default: return state;
  };
};
