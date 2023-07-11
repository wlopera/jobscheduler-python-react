import { LOADING_JOB_ORDER, CLEAN_LOADING_JOB_ORDER } from "../constants";

export const setLoadingJobOrder = (order) => {
  return {
    type: LOADING_JOB_ORDER,
    order,
  };
};

export const cleanLoadingJobOrder = () => {
  return {
    type: CLEAN_LOADING_JOB_ORDER,
  };
};
