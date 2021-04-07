import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_PRE_ADD_ITEM,
  ITEM_ALREADY_IN_CART
} from '../constants/cartConstants';

export const addToCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_PRE_ADD_ITEM
  });

  const { data } = await axios.get(`/api/packets/${id}`);

  const itemExists = getState().cart.cartItems.find(
    (cartItem) => cartItem.packet === data._id
  );

  if (!itemExists) {
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        packet: data._id,
        name: data.name,
        image: data.image,
        price: data.price
      }
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } else {
    dispatch({
      type: ITEM_ALREADY_IN_CART
    });
  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
