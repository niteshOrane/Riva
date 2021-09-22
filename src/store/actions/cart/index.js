import * as DATA_TYPES from '../../types';
import {
  addToCartService,
  deleteCartItem,
  getCartService,
  editCartService,
  getProductIdBySku,
  getCartPaymentInfo
} from '../../../services/cart/cart.service';

import { getCartId, getCustId } from '../../../util';
import { showSnackbar } from '../common';

export const getCartPaymentInfo_action = (data) => ({
  type: DATA_TYPES.CART_INFO,
  payload: { ...data },
});

export const getCustomerCartPayments = () => async (dispatch) => {
  const id = getCustId();
  if (!id) return;

  const res = await getCartPaymentInfo(id);

  if (res.data && res.statusText == "OK") {
    dispatch(getCartPaymentInfo_action(res.data));
  } else dispatch(getCartPaymentInfo_action([]));
};


export const getCart = () => async (dispatch) => {
  if (getCartId() && getCartId() !== '0') {

    const res = await getCartService();
    
    if (res && res.data && res.data.length) {
      const productIdPromises = res.data?.map((r) => getProductIdBySku(r.sku));
      const productIds = await Promise.allSettled(productIdPromises);
      const products = res.data.map((r, i) => ({
        ...r,
        id: productIds?.[i]?.value?.data?.data?.product_id ?
          parseInt(productIds?.[i]?.value?.data?.data?.product_id || 0)
          : 0,
        src: r?.extension_attributes?.image
      }));

      if (res.data)
        dispatch({
          type: DATA_TYPES.SET_BULK_CART,
          payload: products,
        });
    }
    else {
      dispatch({
        type: DATA_TYPES.SET_BULK_CART,
        payload: [],
      });
    }
  }
  else {
    dispatch({
      type: DATA_TYPES.SET_BULK_CART,
      payload: [],
    });
  }
};

export const addToCart = (data) => async (dispatch) => {
  if (!data?.color?.value || !data?.size?.value) {
    dispatch(showSnackbar('please select one color and size', 'error'));
    return true;
  }
  else {
    const res = await addToCartService(
      data.id,
      data?.color?.value,
      data?.size?.value,
      data.qty
    );

    const response = { ...res?.data?.[0] };

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
      dispatch(getCart());
    }
    else dispatch(showSnackbar(response?.message || '', 'error'));
  }
};

export const removeFromCart = (data) => async (dispatch) => {
  const res = await deleteCartItem(data.item_id);

  if (res && res.status === 200 && res.data) {
    dispatch({ type: DATA_TYPES.REMOVE_FROM_CART, payload: { ...data } });
    dispatch(showSnackbar('item removed from cart successfully', 'success'));
  } else dispatch(showSnackbar('something went wrong', 'error'));
};
export const editItemQntCart = (data) => async (dispatch) => {
  const res = await editCartService(data.item_id, data.qty);

  if (res.status === 200 && res.data)
    dispatch(getCart());
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
