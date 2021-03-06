import * as DATA_TYPES from '../../types';
import { getCart } from '../cart';
import { getWishlist } from '../wishlist';

export const loginSuccess = (data) => (dispatch) => {
  dispatch({
    type: DATA_TYPES.LOGIN_SUCCESS,
    payload: { customer: data, token: 'temp_jwt_token' },
  });
  dispatch(getWishlist());
  dispatch({
    type: DATA_TYPES.SET_CART_ID, payload: { cart_id: data.quoteid },
  })
  if (data.quoteid && data.quoteid !== '0') dispatch(getCart());
};

export const loginFailure = () => ({
  type: DATA_TYPES.LOGIN_FAILURE,
});

export const logout = () => ({
  type: DATA_TYPES.LOGOUT,
});
export const emptyCart = () => ({
  type: DATA_TYPES.SET_CART_ID,
  payload: { cart_id: 0 }
});
export const addCartId = (quoteid) => ({
  type: DATA_TYPES.SET_CART_ID,
  payload: { cart_id:  quoteid }
});
export const emptyCartItem = () => ({
  type: DATA_TYPES.SET_BULK_CART,
  payload: [],
})
export const setCustomer = (data) => ({
  type: DATA_TYPES.SET_CUSTOMER,
  payload: data,
});

export const setSocialLogin = (data) => ({
  type:DATA_TYPES.LOGIN_WITH_SOCIAL,
  payload:data
})
