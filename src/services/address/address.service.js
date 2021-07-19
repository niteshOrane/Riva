import axios from "axios";
import API_URL from "../../enviroments/index";
import { getCustId, getCartId, getStoreId } from "../../util";

const urlPath = "http://65.0.141.49/shop/index.php";


export const getCustomerAddress = (customerid) => {
  const customerData = new FormData();
  customerData.append("customerid", customerid);
  const config = {
    method: "post",
    url: `${API_URL}/customerAddressBook`,
    silent: true,
    data: customerData
  };
  return axios(config);
};

export const addCustomerAddress = (formData) => {

  const config = {
    method: "post",
    url: `${API_URL}/addAddressBook`,
    silent: true,
    data: formData
  };
  return axios(config);
};
