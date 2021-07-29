import axios from "axios";

export const orderConfirmed = (id) => {
  const config = {
    method: "get",
    url: `${process.env.REACT_APP_DEV}/orders/${id}`,
    silent: true,
  };
  return axios(config);
};
