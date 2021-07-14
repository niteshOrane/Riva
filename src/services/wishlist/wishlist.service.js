import axios from 'axios';
import API_URL from '../../enviroments/index';

export const getWishlistItems = (customerid) => {
  const config = {
    method: 'post',
    url: `${API_URL}/wishlistDetail`,
    silent: true,
    data: { customerid },
  };
  return axios(config);
};

export const addWishListItem = (productid, customerid) => {
  const config = {
    method: 'post',
    url: `${API_URL}/addwishlist`,
    silent: true,
    data: { customerid, productid },
  };
  return axios(config);
};

export const removeWishlistItem = (productid, customerid) => {
  const config = {
    method: 'post',
    url: `${API_URL}/wishlistRemove`,
    silent: true,
    data: { customerid, productid },
  };
  return axios(config);
};
