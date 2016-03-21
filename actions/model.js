const INIT_MODEL = 'INIT_MODEL';
const MOVE_MODEL = 'MOVE_MODEL';
const UPDATE_MODEL = 'UPDATE_MODEL';

module.exports = {
  INIT_MODEL: INIT_MODEL,
  MOVE_MODEL: MOVE_MODEL,
  UPDATE_MODEL: UPDATE_MODEL,
  initModel: (actorNumber) => Object.assign({}, {
    type: INIT_MODEL,
    actorNumber: actorNumber,
  }),
  moveModel: () => Object.assign({}, {
    type: MOVE_MODEL,
  }),
  updateModel: () => Object.assign({}, {
    type: UPDATE_MODEL,
  }),
};
