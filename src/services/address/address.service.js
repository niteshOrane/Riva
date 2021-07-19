import axios from "axios";
import API_URL from "../../enviroments/index";
import { getCustId, getCartId, getStoreId  } from "../../util";

const urlPath = "http://65.0.141.49/shop/index.php";


export const getCustomerAddress = (sku) => {
  const config = {
    method: "get",
    url: `${API_URL}/products/${sku}`,
    silent: true,
  };
  return axios(config);
};

export const addCustomerAddress = (formData) => {
  
  const config = {
    method: "post",
    url: `${API_URL}/addNewAddress`,
    silent: true,
    data: formData
  };
  return axios(config);
};
