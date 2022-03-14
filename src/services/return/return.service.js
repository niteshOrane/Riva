import axios from "axios";
import { getCustId } from "../../util";

// get reasons for return
export const getReasonForReturn = () => {
  const config = {
    method: "get",
    url: `${process.env.REACT_APP_DEV}/riva-rma/rmareasonlist?reasonId=-1`,
    silent: true,
  };
  return axios(config);
};

// create rma return 
export const createRmaRequest = (data) => {
    const config = {
      method: "post",
      url: `${process.env.REACT_APP_DEV}/riva-rma/createrma`,
      silent: true,
      data
    };
    return axios(config);
  };