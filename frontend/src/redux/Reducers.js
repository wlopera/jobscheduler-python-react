import { combineReducers } from "redux";
import settings from "./settings/Reducer";
import historyReducer from "./history/Reducer";
import processReducer from './process/Reducer'

const Reducers = combineReducers({
  settings,
  historyReducer,
  processReducer
});

export default Reducers;
