import axios from "axios";
import API_URL from "../../enviroments/index";
export const getCustomerAddress = (customerid) => {
  const customerData = new FormData();
  customerData.append("customerid", customerid);
  const config = {
    method: "post",
    url: `${API_URL}/customerAddressBook`,
    silent: true,
    data: customerData,
  };
  return axios(config);
};
export const addCustomerAddress = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/addAddressBook`,
    silent: true,
    data: formData,
  };
  return axios(config);
};

export const updateCustomerAddress = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/updateAddressBook`,
    silent: true,
    data: formData,
  };
  return axios(config);
};

export const setDefaultAddressCustomer = (formData, isBilling = false) => {
  const config = {
    method: "post",
    url: `${API_URL}/${
      isBilling ? "setDefaultBillingAddress" : "setDefaultShippingAddress"
    }`,
    silent: true,
    data: formData,
  };
  return axios(config);
};

export const deleteAddress = (formData) => {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_DEV}/deleteAddressBook`,
    silent: true,
    data: formData,
  };
  return axios(config);
};
