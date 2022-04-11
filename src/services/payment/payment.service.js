import axios from "axios";
import API_URL from "../../enviroments/index";
import { getCartId, getCustId, getStoreData } from "../../util";


export const getPaymentMode = () => {
  const config = {
    method: "get",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/carts/${getCartId()}/payment-methods`,
    silent: true,
  };
  return axios(config);
};
export const getShippingMethod = (addressId) => {
  try {
    const config = {
      method: "post",
      url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/carts/${getCartId()}/estimate-shipping-methods-by-address-id`,
      silent: true,
      data: {
        addressId: addressId,
      },
    };
    return axios(config);
  } catch {
    return { data: [], success: false };
  }
};

// COD

export const processCodPayment = () => {
  const config = {
    method: "get",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/webapi/getcodfee?quoteId=${getCartId()}&paymentMethod=cashondelivery`,
    silent: true,
  };
  return axios(config);
};
export const processCodPaymentFurther = () => {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_BASE_URL}/rest/en/V1/webapi/quoteInfo?quoteId=${getCartId()}`,
    silent: true,
  };
  return axios(config);
};


export const processGpayPaymentFurther = () => {
  const config = {
    method: "get",
    url: `https://m2dev.rivafashion.com/shop/index.php/rest/kuwait_en/V1/webapi/gettapinfo?method=checkoutcom_google_pay`,
    silent: true,
  };
  return axios(config);
};
