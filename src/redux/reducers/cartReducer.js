import ACTIONS from "../actions/";

const total = 0;

const cartReducer = (state = total, action) => {
  switch (action.type) {
    case ACTIONS.GET_TOTAL_CART:
      return action.payload;
    default:
      return state;
  }
};

export default cartReducer;
