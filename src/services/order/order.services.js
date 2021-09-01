import axios from "axios";
import { getCustId } from '../../util';

export const orderConfirmed = (id) => {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_DEV}/webapi/orderInfo?orderId=${id}&customerId=${getCustId()}`,
    silent: true
  };
  return axios(config);
};

export const getOrderList = (id) => {
  const config = {
    method: "get",
    url: `${process.env.REACT_APP_DEV}/orders/?searchCriteria[filter_groups][4][filters][0][field]=customer_id&searchCriteria[filter_groups][4][filters][0][value]=${id}`,
    silent: true,
  };
  return axios(config);
};
export const cancelOrder = (id) => {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_DEV}/orders/${id}/cancel`,
    silent: true,
  };
  return axios(config);
};


export const deleteNotification = (id) => {
  const customer = new FormData();
  customer.append('customerId', getCustId());
  customer.append('productId', id);
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_DEV}/productalertstock/delete`,
    silent: true,
    data: customer
  };
  return axios(config);
};
export const getNotification = () => {
  const customer = new FormData();
  customer.append('customerId', getCustId());
  const config = {
    method: 'post',
    url: `${process.env.REACT_APP_DEV}/productalertstock/customeralertlist`,
    silent: true,
    data: customer
  };
  return axios(config);
};

export const addAlertstock = (subscribe) => {
  const config = {
    method: 'post',
    url: `${process.env.REACT_APP_DEV}/productalertstock/add`,
    silent: true,
    data: subscribe
  };
  return axios(config);
};
