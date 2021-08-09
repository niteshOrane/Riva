import axios from "axios";

export const orderConfirmed = (id) => {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_DEV}/webapi/orderInfo?orderId=${id}`,
    silent: true,
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
