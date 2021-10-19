import axios from "axios";
import API_URL from "../../enviroments/index";

export const addContactEnquiery = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/contactus`,
    silent: true,
    data: formData,
  };
  return axios(config);
};