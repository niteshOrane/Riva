import axios from 'axios';
import API_URL from '../../enviroments/index';

export const profileUpdate = (formData) => {
  const config = {
    method: 'post',
    url: `${API_URL}/customerProfileupdate`,
    silent: true,
    data: formData,
  };
  return axios(config);
};

export const getProfileUpdate = (formData) => {
  const config = {
    method: 'post',
    url: `${API_URL}/getProfiledetails`,
    silent: true,
    data: formData,
  };
  return axios(config);
};
