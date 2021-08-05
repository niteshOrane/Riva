import axios from 'axios';
import API_URL from '../../enviroments/index';

export const addSubscribe = (store_id, email) => {
  const config = {
    method: 'post',
    url: `${API_URL}/newsletter/subscribe`,
    silent: true,
    data: { store_id, email },
  };
  return axios(config);
};

export const unSubscribe = (productid, customerid = 30) => {
  const config = {
    method: 'post',
    url: `${API_URL}/wishlistRemove`,
    silent: true,
    data: { customerid, productid },
  };
  return axios(config);
};
