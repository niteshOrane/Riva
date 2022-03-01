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
    url: `${API_URL}/addCustomerAddressBook`,
    silent: true,
    data: formData,
  };
  return axios(config);
};

export const updateCustomerAddress = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/updateCustomerAddressBook`,
    silent: true,
    data: formData,
  };
  return axios(config);
};

export const setDefaultAddressCustomer = (formData, isBilling = false) => {
  const config = {
    method: "post",
    url: `${API_URL}/${isBilling ? "setDefaultBillingAddress" : "setDefaultShippingAddress"
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

export const deliveryCheck = (
  id,
  method,
  price,
  firstName,
  lastName,
  street,
  city,
  postcode,
  phone,
  country,
  region
) => {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_DEV}/webapi/setshippinginfo?quoteId=${id}&shippingInfo[method]=${method}&shippingInfo[amount]=${price}&shippingInfo[shipping_address][firstname]=${firstName}&shippingInfo[shipping_address][lastname]=${lastName}&shippingInfo[shipping_address][street]=${street}&shippingInfo[shipping_address][city]=${city}&shippingInfo[shipping_address][country_id]=${country || 'KW'}&shippingInfo[shipping_address][region]=${region || 'Kuwait'}&shippingInfo[shipping_address][postcode]=${postcode}&shippingInfo[shipping_address][telephone]=${phone}&shippingInfo[shipping_address][region_id]=`,
    silent: true,
  };
  return axios(config);
};

// get country list
export const getCountryList = () => {
  const config = {
    method: "get",
    url: `${process.env.REACT_APP_DEV}/directory/countries`,
    silent: true,
  };
  return axios(config);
};


// get address by geo location

export const getAddressByLocation = (lat,lng) => {
  const config = {
    method: "get",
    url: `http://api.positionstack.com/v1/reverse?access_key=f4fd5ebcef86fc323dee81a32d9501a9&query=${lat},${lng}`,
    silent: true,
  };
  return axios(config);
};