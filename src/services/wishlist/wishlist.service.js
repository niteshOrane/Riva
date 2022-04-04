import axios from "axios";
import API_URL from "../../enviroments/index";
import { getStoreId,getStoreData } from "../../util";

export const getWishlistItems = (customerid) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/wishlistDetail`,
    silent: true,
    data: { customerid, storeId: getStoreId() },
  };
  return axios(config);
};

export const addWishListItem = (productid, customerid) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/addwishlist`,
    silent: true,
    data: { customerid, productid },
  };
  return axios(config);
};

export const removeWishlistItem = (productid, customerid) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/wishlistRemove`,
    silent: true,
    data: { customerid, productid },
  };
  return axios(config);
};
