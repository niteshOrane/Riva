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
  //http://65.0.141.49/shop/index.php/rest/V1/carts/860901/estimate-shipping-methods-by-address-id
  const config = {
    method: "post",
    url: `${API_URL}/carts/${getCartId()}/estimate-shipping-methods-by-address-id`,
    silent: true,
    data: {
      "addressId": addressId
    }
  };
  return axios(config);
};