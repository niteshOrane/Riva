import axios from "axios";
import { getCustId,getStoreData } from "../../util";
import API_URL from "../../enviroments/index";

// get reasons for return
export const getReasonForReturn = () => {
  const config = {
    method: "get",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/riva-rma/rmareasonlist?reasonId=-1`,
    silent: true,
  };
  return axios(config);
};

// create rma return 
export const createRmaRequest = (data) => {
    const config = {
      method: "post",
      url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/riva-rma/createrma`,
      silent: true,
      data
    };
    return axios(config);
  };