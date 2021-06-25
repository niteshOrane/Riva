import axios from 'axios';

export const getWishlist = (customerid = 30) => {
  const config = {
    method: 'post',
    url: `http://65.0.141.49/shop/index.php/rest/V1/wishlistDetail`,
    silent: true,
    data: { customerid },
  };
  return axios(config);
};

export const addWishListItem = (customerid = 30, productid) => {
  const config = {
    method: 'post',
    url: `http://65.0.141.49/shop/index.php/rest/V1/addwishlist`,
    silent: true,
    data: { customerid, productid },
  };
  return axios(config);
};

export const removeWishlistItem = (customerid = 30, productid) => {
  const config = {
    method: 'post',
    url: `http://65.0.141.49/shop/index.php/rest/V1/wishlistRemove`,
    silent: true,
    data: { customerid, productid },
  };
  return axios(config);
};
