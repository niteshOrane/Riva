import * as DATA_TYPES from '../../types';

export const addToCart = (data) => ({
  type: DATA_TYPES.ADD_TO_CART,
  payload: { ...data },
});

export const removeFromCart = (data) => ({
  type: DATA_TYPES.REMOVE_FROM_CART,
  payload: { data },
});

export const incrementItemQuantity = (data) => ({
  type: DATA_TYPES.INCREMENT_ITEM_QUANTITY,
  payload: { data },
});

export const decrementItemQuantity = (data) => ({
  type: DATA_TYPES.DECREMENT_ITEM_QUANTITY,
  payload: { data },
});

export const resetCart = (data) => ({
  type: DATA_TYPES.RESET_CART,
});

export const toggleCart = (data = true) => ({
  type: DATA_TYPES.TOGGLE_CART,
  payload: { data }
});
