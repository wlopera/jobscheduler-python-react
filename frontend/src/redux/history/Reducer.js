import { UPDATE_HISTORY_TABLE } from "../constants";

const INIT_STATE = {
  updateHistory: true,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_HISTORY_TABLE:
      console.log(2222, action)
      return {
        ...state,
        updateHistory: action.update,
      };
    default:
      return state;
  }
};
