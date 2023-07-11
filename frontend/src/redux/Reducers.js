import { combineReducers } from "redux";
import settings from "./settings/Reducer";
import historyReducer from "./history/Reducer";

const Reducers = combineReducers({
  settings,
  historyReducer
});

export default Reducers;
