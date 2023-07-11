import { LOADING_JOB_ORDER, CLEAN_LOADING_JOB_ORDER } from "../constants";

const INIT_STATE = {
  loading: false,
  order: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOADING_JOB_ORDER:
      return { loading: true, order: action.order };
    case CLEAN_LOADING_JOB_ORDER:
      return { loading: false, order: null };
    default:
      return state;
  }
};
