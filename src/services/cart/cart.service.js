import axios from 'axios';
import API_URL from '../../enviroments/index';
import { getCustId, getCartId, getStoreId } from '../../util';

export const addToCartService = (id, color, size, qty) => {
  const config = {
    method: 'post',
    url: `${API_URL}/webapi/addproduct?productInfo[product_id]=${id}&productInfo[options][92]=${color}&productInfo[options][213]=${size}&productInfo[qty]=${qty}&productInfo[cart_id]=${
      getCartId() || 0
    }&productInfo[customer_id]=${
      getCustId() || 0
    }&productInfo[store_id]=${getStoreId()}`,
    silent: true,
  };
  return axios(config);
};

export const getCartService = () => {
  const config = {
    method: 'get',
    url: `${API_URL}/carts/${getCartId()}/items`,
    silent: true,
  };
  return axios(config);
};

export const deleteCartItem = (id) => {
  const config = {
    method: 'delete',
    url: `${API_URL}/carts/${getCartId()}/items/${id}`,
    silent: true,
  };
  return axios(config);
};

export const getProductIdBySku = (sku) => {
  const config = {
    method: 'post',
    url: `${API_URL}/productIdBySku`,
    data: { sku },
    silent: true,
  };
  return axios(config);
};
