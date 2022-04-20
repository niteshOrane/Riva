import axios from "axios";
import { getCustId, getStoreData } from "../../util";
import API_URL from "../../enviroments/index";

export const orderConfirmed = (id) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${
      getStoreData()?.store_code
    }/V1/webapi/orderInfo?orderId=${id}&customerId=${getCustId()}`,
    silent: true,
  };
  return axios(config);
};

export const getOrderList = (id, page) => {
  const config = {
    method: "get",
    url: `${API_URL}/rest/${
      getStoreData()?.store_code
    }/V1/orders/?searchCriteria[filter_groups][4][filters][0][field]=customer_id&searchCriteria[filter_groups][4][filters][0][value]=${id}&searchCriteria[pageSize]=8&searchCriteria[currentPage]=${page}&searchCriteria[sortOrders][0][field]=entity_id&searchCriteria[sortOrders][0][direction]=desc`,
    silent: true,
  };
  return axios(config);
};

export const getReturnedList = (page) => {
  const config = {
    method: "get",
    url: `${API_URL}/rest/${
      getStoreData()?.store_code
    }/V1/webapi/getrma?rmaInfo[customer_id]=${getCustId()}&rmaInfo[pageSize]=2&rmaInfo[page]=${page}`,
    silent: true,
  };
  return axios(config);
};

export const cancelOrder = (id) => {
  const orderData = new FormData();
  orderData.append("orderId", id);
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/orderCancel`,
    silent: true,
    data: orderData,
  };
  return axios(config);
};

export const buyAgainOrder = (id) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${
      getStoreData()?.store_code
    }/V1/webapi/reorder/${id}`,
    silent: true,
  };
  return axios(config);
};
export const deleteNotification = (id) => {
  const customer = new FormData();
  customer.append("customerId", getCustId());
  customer.append("productId", id);
  const config = {
    method: "post",
    url: `${API_URL}/rest/${
      getStoreData()?.store_code
    }/V1/productalertstock/delete`,
    silent: true,
    data: customer,
  };
  return axios(config);
};
export const getNotification = () => {
  const customer = new FormData();
  customer.append("customerId", getCustId());
  const config = {
    method: "post",
    url: `${API_URL}/rest/${
      getStoreData()?.store_code
    }/V1/productalertstock/customeralertlist`,
    silent: true,
    data: customer,
  };
  return axios(config);
};

export const addAlertstock = (subscribe) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${
      getStoreData()?.store_code
    }/V1/productalertstock/add`,
    silent: true,
    data: subscribe,
  };
  return axios(config);
};

//track order
export const getTrackYourOrder = (id) => {
  const config = {
    method: "get",
    url: `${API_URL}/rest/${
      getStoreData()?.store_code
    }/V1/webapi/trackorder/?orderId=${id}`,
    silent: true,
  };
  return axios(config);
};

// get order details

export const getYourOrderDetails = (id) => {
  const config = {
    method: "get",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/orders/${id}`,
    silent: true,
  };
  return axios(config);
};

// Returned list
