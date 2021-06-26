import axios from 'axios';

export const getWishlistItems = (customerid = 30) => {
  const config = {
    method: 'post',
    url: `http://65.0.141.49/shop/index.php/rest/V1/wishlistDetail`,
    silent: true,
    data: { customerid },
  };
  return axios(config);
};

export const addWishListItem = (productid, customerid = 30) => {
  const config = {
    method: 'post',
    url: `http://65.0.141.49/shop/index.php/rest/V1/addwishlist`,
    silent: true,
    data: { customerid, productid },
  };
  return axios(config);
};

export const removeWishlistItem = (productid, customerid = 30) => {
  const config = {
    method: 'post',
    url: `http://65.0.141.49/shop/index.php/rest/V1/wishlistRemove`,
    silent: true,
    data: { customerid, productid },
  };
  return axios(config);
};
