import axios from 'axios';
import API_URL from '../../enviroments/index';
import { getStoreData } from "../../util/index";

export const profileUpdate = (formData) => {
  const config = {
    method: 'post',
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/customerProfileupdate`,
    silent: true,
    data: formData,
  };
  return axios(config);
};

export const getProfileUpdate = (formData) => {
  const config = {
    method: 'post',
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/getProfiledetails`,
    silent: true,
    data: formData,
  };
  return axios(config);
};
