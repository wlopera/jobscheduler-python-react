import { UPDATE_HISTORY_TABLE } from "../constants";

export const updateHistoryTable = (update) => {
  return {
    type: UPDATE_HISTORY_TABLE,
    update,
  };
};