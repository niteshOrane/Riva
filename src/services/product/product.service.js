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
    url: `http://65.0.141.49/shop/index.php/rest/all/V1/products/attributes/${id}/options`,
    silent: true,
  };
  return axios(config);
};
