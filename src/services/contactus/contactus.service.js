import axios from "axios";
import API_URL from "../../enviroments/index";
import { getStoreData } from "../../util/index";


export const addContactEnquiery = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/contactus`,
    silent: true,
    data: formData,
  };
  return axios(config);
};