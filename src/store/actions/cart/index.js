import * as DATA_TYPES from '../../types';
import {
  addToCartService,
  deleteCartItem,
  getCartService,
  getProductIdBySku,
} from '../../../services/cart/cart.service';
import { getCartId } from '../../../util';
import { showSnackbar } from '../common';

export const getCart = () => async (dispatch) => {
  if (getCartId() && getCartId() !== '0') {
    const res = await getCartService();

    const productIdPromises = res.data.map((r) => getProductIdBySku(r.sku));

    const productIds = await Promise.allSettled(productIdPromises);

    const products = res.data.map((r, i) => ({
      ...r,
      id: productIds?.[i]?.value?.data?.data?.product_id
        ? parseInt(productIds?.[i]?.value?.data?.data?.product_id)
        : '',
    }));

    if (res.data)
      dispatch({
        type: DATA_TYPES.SET_BULK_CART,
        payload: products,
      });
  }
};

export const addToCart = (data) => async (dispatch) => {
  const res = await addToCartService(
    data.id,
    data?.color?.value,
    data?.size?.value,
    data.qty
  );

  const response =  {...res?.data?.[0]};

  if (res.status === 200 && !response?.error) {
    dispatch({
      type: DATA_TYPES.ADD_TO_CART,
      payload: { ...data },
    });
    dispatch({
      type: DATA_TYPES.SET_CART_ID,
      payload: { cart_id: response.cart_id },
    });
    dispatch(showSnackbar('Added to cart', 'success'));
  } 
  else dispatch(showSnackbar(response?.message || '', 'error'));

  dispatch(getCart());
};

export const removeFromCart = (data) => async (dispatch) => {
  const res = await deleteCartItem(data.item_id);

  if (res.status === 200 && res.data)
    dispatch({ type: DATA_TYPES.REMOVE_FROM_CART, payload: { ...data } });
  else dispatch(showSnackbar('something went wrong', 'error'));
};

export const incrementItemqty = (data) => ({
  type: DATA_TYPES.INCREMENT_ITEM,
  payload: { ...data },
});

export const decrementItemqty = (data) => ({
  type: DATA_TYPES.DECREMENT_ITEM,
  payload: { ...data },
});

export const resetCart = (data) => ({
  type: DATA_TYPES.RESET_CART,
});

export const toggleCart = (data = true) => ({
  type: DATA_TYPES.TOGGLE_CART,
  payload: { data },
});
