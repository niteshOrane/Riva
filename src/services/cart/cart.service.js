import axios from "axios";
import API_URL from "../../enviroments/index";
import { getCustId, getCartId, getStoreId } from "../../util";

export const addToCartService = (id, color, size, qty) => {
  const config = {
    method: "post",
    url: `${API_URL}/webapi/addproduct?productInfo[product_id]=${id}&productInfo[options][92]=${color}&productInfo[options][213]=${size}&productInfo[qty]=${qty}&productInfo[cart_id]=${getCartId() || 0
      }&productInfo[customer_id]=${getCustId() || 0
      }&productInfo[store_id]=${getStoreId()}`,
    silent: true,
  };
  return axios(config);
};

export const getCartPaymentInfo = () => {
  const config = {
    method: "post",
    url: `${API_URL}/webapi/quoteInfo?quoteId=${getCartId()}`,
    silent: true,
  };
  return axios(config);
};

export const getCartService = () => {
  const config = {
    method: "get",
    url: `${API_URL}/carts/${getCartId()}/items`,
    silent: true,
  };
  return axios(config);
};

export const editCartService = (id, qty) => {
  const formData = new FormData();
  formData.append("itemValue[item_id]", id);
  formData.append("customerid", getCustId());
  formData.append("itemValue[qty]", qty);
  formData.append("itemValue[cart_id]", getCartId());
  const config = {
    method: "post",
    url: `${API_URL}/updateCart`,
    silent: true,
    data: formData,
  };
  return axios(config);
};

export const deleteCartItem = (id) => {
  if (getCartId() != 0) {
    const config = {
      method: "delete",
      url: `${API_URL}/carts/${getCartId()}/items/${id}`,
      silent: true,
    };
    return axios(config);
  }
};

export const getProductIdBySku = (sku) => {
  const config = {
    method: "post",
    url: `${API_URL}/productIdBySku`,
    data: { sku },
    silent: true,
  };
  return axios(config);
};

export const cartPaymentAction = (token) => {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_DEV}/webapi/placeorder?quoteId=${getCartId()}&paymentInfo[method]=checkoutcom_card_payment&paymentInfo[transactionDetails]=${JSON.stringify(token)}`,
    silent: true,
  };
  return axios(config);
};
export const Hypy_PaymentCart = () => {
  const config = {
    method: "post",
    url: `${API_URL}/webapi/processhyperpay?method=Hyperpay_Mada`,
    silent: true,
  };
  return axios(config);
};