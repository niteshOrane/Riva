import axios from "axios";
import API_URL from "../../enviroments/index";
import { getCartId } from "../../util";

export const getPaymentMode = () => {

  const config = {
    method: "get",
    url: `${API_URL}/carts/${getCartId()}/payment-methods`,
    silent: true
  };
  return axios(config);
};
export const getShippingMethod = (addressId) => {
  try {
    const config = {
      method: "post",
      url: `${API_URL}/carts/${getCartId()}/estimate-shipping-methods-by-address-id`,
      silent: true,
      data: {
        "addressId": addressId
      }
    };
    return axios(config);
  }
  catch {
    return { data: [], success: false };
  }
};


