import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_PRE_ADD_ITEM
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_PRE_ADD_ITEM:
      return {
        ...state,
        cartLoading: true
      };
    case CART_ADD_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        cartLoading: false
      };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.packet !== action.payload
        )
      };
    default:
      return state;
  }
};
