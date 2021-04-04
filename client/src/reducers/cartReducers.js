import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const itemExistsInCart = state.cartItems.find(
        (cartItem) => cartItem.packet === item.packet
      );
      if (!itemExistsInCart) {
        return { ...state, cartItems: [...state.cartItems, item] };
      } else {
        //TODO
        //return a message that it is already in
      }
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
