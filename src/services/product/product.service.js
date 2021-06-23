import axios from 'axios';

export const getProduct = (sku) => {
  const config = {
    method: 'get',
    url: `http://65.0.141.49/shop/index.php/rest/V1/products/${sku}`,
    silent: true,
  };
  return axios(config);
};
