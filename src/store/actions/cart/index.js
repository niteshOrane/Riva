import * as DATA_TYPES from "../../types";
import {
  addToCartService,
  deleteCartItem,
  getCartService,
  editCartService,
  getProductIdBySku,
  getCartPaymentInfo,
  getFreeShippingInfo,
} from "../../../services/cart/cart.service";
import { emptyCartItem, emptyCart } from "../auth";

import { getCartId, getCustId } from "../../../util";
import { showSnackbar } from "../common";
import { getWishlist, removeWishlist } from "../wishlist";

export const getCartPaymentInfo_action = (data) => ({
  type: DATA_TYPES.CART_INFO,
  payload: { ...data },
});

export const getCustomerCartPayments = () => async (dispatch) => {
  const id = getCustId();
  if (!id) return;
  const res = await getCartPaymentInfo();

  if (res.data && res.status === 200) {
    dispatch(getCartPaymentInfo_action(res.data));
  } else dispatch(getCartPaymentInfo_action([]));
};

export const calculateFreeShipping = () => async (dispatch) => {
  const freeShippingInfo = await getFreeShippingInfo(getCartId());
  if (freeShippingInfo?.data) {
    dispatch({
      type: DATA_TYPES.GET_FREE_SHIPPING,
      payload: freeShippingInfo?.data,
    });
  }
};
export const getCart = () => async (dispatch) => {
  const res = await getCartService();
  if (Array.isArray(res?.data?.cart)) {
    if (res && res?.data && res?.data?.cart?.length > 0) {
      const productIdPromises = res.data?.cart?.map((r) =>
        getProductIdBySku(r.sku)
      );
      const productIds = await Promise.allSettled(productIdPromises);
      const products = res?.data?.cart?.map((r, i) => ({
        ...r,
        id: productIds?.[i]?.value?.data?.data?.product_id
          ? parseInt(productIds?.[i]?.value?.data?.data?.product_id || 0)
          : 0,
        src: r?.extension_attributes?.image.replace("index.php", ""),
      }));
      dispatch({
        type: DATA_TYPES.CART_EXTRA_INFO,
        payload: {
          secure: res?.data?.["100_secure"],
          hear: res?.data?.["letus-hear"],
          we_offer: res?.data?.["we_offer"],
        },
      });
      dispatch({
        type: DATA_TYPES.SET_CART_ID,
        payload: { cart_id: res?.data?.custom_data?.cart_id },
      });
      dispatch(calculateFreeShipping());
      dispatch({
        type: DATA_TYPES.SET_BULK_CART,
        payload: products,
      });
    } else if (res?.data?.custom_data) {
      if (res?.data?.custom_data?.cart_id === 0) {
        dispatch(emptyCartItem());
      } else {
        dispatch({
          type: DATA_TYPES.SET_CART_ID,
          payload: { cart_id: res?.data?.custom_data?.cart_id },
        });
      }
    } else {
      dispatch(emptyCartItem());
    }
  } else if (res?.data?.cart?.success === false) {
    dispatch(emptyCartItem());
  }
  // }
};

export const cartStatus = (data) => ({
  type: DATA_TYPES.CART_STATUS,
  payload: data,
});

export const addToCart = (data) => async (dispatch) => {
  if (!data?.color?.value || !data?.size?.value) {
    dispatch(showSnackbar("please select one color and size", "error"));
    return true;
  } else {
    const res = await addToCartService(
      data.id,
      data?.color?.value,
      data?.size?.value,
      data.qty
    );

    const response = { ...res?.data?.[0] };

    if (res.status === 200 && !response?.error) {
      dispatch({
        type: DATA_TYPES.SET_CART_ID,
        payload: { cart_id: response.cart_id },
      });
      dispatch(getCart());
      dispatch(showSnackbar("Added to cart", "success"));
      if (data?.isFromWishlist) {
        dispatch(removeWishlist(data, data?.isFromWishlist));
        setTimeout(() => {
          dispatch(getWishlist());
        }, 2000);
      }
      setTimeout(() => {
        dispatch(cartStatus(true));
      }, 1600);
    } else {
      dispatch(showSnackbar(response?.message || "", "error"));
    }
  }
};

export const removeFromCart = (data) => async (dispatch) => {
  const res = await deleteCartItem(data.item_id);

  if (res && res.status === 200 && res.data) {
    dispatch({ type: DATA_TYPES.REMOVE_FROM_CART, payload: { ...data } });
    dispatch(calculateFreeShipping());
    dispatch(showSnackbar("item removed from cart successfully", "success"));
  } else dispatch(showSnackbar("something went wrong", "error"));
};
export const editItemQntCart = (data) => async (dispatch) => {
  const res = await editCartService(data.item_id, data.qty);

  if (res.status === 200 && res.data && res?.data?.success) dispatch(getCart());
  else{
    dispatch(
      showSnackbar(
        `${res?.data?.message ? res?.data?.message : "something went wrong"}`,
        "error"
      )
    );
    dispatch(getCart())
  }
  
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
