import { ADD_PROCESS_ORDER, REMOVE_PROCESS_ORDER } from "../constants";

const INIT_STATE = {
  chains: [],
};

export default (state = INIT_STATE, action) => {
  console.log("Orden:", state, action);
  switch (action.type) {
    case ADD_PROCESS_ORDER:
      return { chains: [...state.chains, action.chain] };
    case REMOVE_PROCESS_ORDER:
      const filter = state.chains.map((chain) => {
        chain.order !== action.chain.order;
      });
      console.log("filter", filter);
      return { chains: filter };
    default:
      return state;
  }
};
