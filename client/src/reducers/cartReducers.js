import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_PRE_ADD_ITEM,
  ITEM_ALREADY_IN_CART
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_PRE_ADD_ITEM:
      return {
        ...state,
        loading: true
      };
    case ITEM_ALREADY_IN_CART:
      return {
        ...state,
        loading: false
      };
    case CART_ADD_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        loading: false
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
