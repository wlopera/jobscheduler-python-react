import { UPDATE_HISTORY_TABLE } from "../constants";

const INIT_STATE = {
  updateHistory: true,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_HISTORY_TABLE:
      return {
        ...state,
        updateHistory: action.update,
      };
    default:
      return state;
  }
};
