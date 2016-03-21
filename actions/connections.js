const INIT_CONNECTIONS = 'INIT_CONNECTIONS';

module.exports = {
  INIT_CONNECTIONS: INIT_CONNECTIONS,
  initConnections: (list) => Object.assign({}, {
    type: INIT_CONNECTIONS,
    list: list,
  }),
};
