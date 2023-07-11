import { ADD_PROCESS_ORDER, REMOVE_PROCESS_ORDER } from "../constants";

export const addProcessOrder = (chain) => {
  return {
    type: ADD_PROCESS_ORDER,
    chain,
  };
};

export const removeProcessOrder = (chain) => {
  return {
    type: REMOVE_PROCESS_ORDER,
    chain,
  };
};