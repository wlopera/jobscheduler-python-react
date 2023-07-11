import { UPDATE_HISTORY_TABLE } from "../constants";

export const updateHistoryTable = (update) => {
  console.log(1111, history)
  return {
    type: UPDATE_HISTORY_TABLE,
    update,
  };
};