import axios from 'axios';
import API_URL from '../../enviroments/index';

export const getProduct = (sku) => {
  const config = {
    method: 'get',
    url: `${API_URL}/products/${sku}`,
    silent: true,
  };
  return axios(config);
};

export const getAttributes = (id) => {
  const config = {
    method: 'get',
    url: `${process.env.REACT_APP_BASE_URL}/rest/all/V1/products/attributes/${id}/options`,
    silent: true,
  };
  return axios(config);
};

export const getCompositioncare = (id) => {
  const config = {
    method: 'post',
    url: `${process.env.REACT_APP_BASE_URL}/rest/V1/compositioncare`,
    data:{productid:id},
    silent: true,
  };
  return axios(config);
};
