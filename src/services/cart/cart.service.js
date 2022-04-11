import axios from "axios";
import API_URL from "../../enviroments/index";
import { getCustId, getCartId, getStoreId, getStoreData } from "../../util";

export const addToCartService = (id, color, size, qty) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${
      getStoreData()?.store_code
    }/V1/webapi/addproduct?productInfo[product_id]=${id}&productInfo[options][92]=${color}&productInfo[options][213]=${size}&productInfo[qty]=${qty}&productInfo[cart_id]=${
      getCartId() || 0
    }&productInfo[customer_id]=${
      getCustId() || 0
    }&productInfo[store_id]=${getStoreId()}`,
    silent: true,
  };
  return axios(config);
};

export const getCartPaymentInfo = () => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${
      getStoreData()?.store_code
    }/V1/webapi/quoteInfo?quoteId=${getCartId()}`,
    silent: true,
  };
  return axios(config);
};

export const getCartService = () => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/cartlisting`,
    silent: true,
    data: {
      storeId: getStoreId(),
      customerId: getCustId(),
      quoteId: getCartId() || 0,
    },
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
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/updateCart`,
    silent: true,
    data: formData,
  };
  return axios(config);
};

export const deleteCartItem = (id) => {
  if (getCartId() !== 0) {
    const config = {
      method: "delete",
      url: `${API_URL}/rest/${
        getStoreData()?.store_code
      }/V1/carts/${getCartId()}/items/${id}`,
      silent: true,
    };
    return axios(config);
  }
};

export const getProductIdBySku = (sku) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/productIdBySku`,
    data: { sku },
    silent: true,
  };
  return axios(config);
};

export const cartPaymentAction = (token, type) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/webapi/placeorder?quoteId=${getCartId()}&paymentInfo[method]=${type}&paymentInfo[transactionDetails]=${JSON.stringify(
      token
    )}`,
    silent: true,
  };
  return axios(config);
};
export const Hypy_PaymentCart = (data, cardType) => {
  const config = {
    method: "get",
    url: `${API_URL}/rest/${
      getStoreData()?.store_code
    }/V1/webapi/processhyperpay${data}&method=${cardType}`,
    silent: true,
  };
  return axios(config);
};

export const cartPaymentTapAction = (submethod) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${
      getStoreData()?.store_code
    }/V1/webapi/placeorder?quoteId=${getCartId()}&paymentInfo[method]=tap&paymentInfo[submethod]=${submethod}`,
    silent: true,
  };
  return axios(config);
};

export const finalCallTapAction = (id) => {
  const config = {
    method: "get",
    url: `${API_URL}/rest/${
      getStoreData()?.store_code
    }/V1/webapi/processtap?paymentData[tap_id]=${id}`,
    silent: true,
  };
  return axios(config);
};
export const getFreeShippingInfo = (cartId) => {
  const config = {
    method: "get",
    url: `${API_URL}/rest/${
      getStoreData()?.store_code
    }/V1/webapi/getfreeshipping?quoteId=${cartId}`,
    silent: true,
  };
  return axios(config);
};

// Cod
export const placeCodOrder = (type) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${
      getStoreData()?.store_code
    }/V1/webapi/placeorder?quoteId=${getCartId()}&shippingInfo[method]=flatrate_flatrate&paymentInfo[method]=${type}`,
    silent: true,
  };
  return axios(config);
};
