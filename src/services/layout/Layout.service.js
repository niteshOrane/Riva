import axios from 'axios';
import mockdata from '../../mockdata.json';
import { getStoreId, getSelectedCategoryId, getLanguageName } from '../../util';
import API_URL from '../../enviroments/index';

export const getTopBrands = async () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockdata['topBrands']);
    }, 1000);
  });

export const getCurrentLocation = async () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  return fetch('https://ipapi.co/json/', requestOptions).then((response) =>
    response.json()
  );
};

export const getHeader = async () => {
  const config = {
    method: 'get',
    url: `${API_URL}/webapi/getheader`,
    silent: true,
  };
  const response = await axios(config);
  return response;
};
export const getHeaderCategory = async () => {
  const config = {
    method: 'get',
    url: `${API_URL}/webapi/getnavigation?storeId=${getStoreId()}`,
    silent: true,
  };
  const response = await axios(config);
  return response;
};

export const getFooter = async () => {
  const config = {
    method: 'get',
    url: `${API_URL}/webapi/footercms?storeId=${getStoreId()}`,
  };
  const response = await axios(config);
  return response;
};

export const getBanners = (typeName) => {
  const config = {
    method: 'get',
    url: `${API_URL}/webapi/getbanners?type=${typeName}&storeId=${getStoreId()}&language=${getLanguageName()}`,
    silent: true,
  };
  return axios(config);
};

export const getProducts = (categoryId, limit) => {
  const config = {
    method: 'get',
    url: `${API_URL}/webapi/categoryproducts?categoryId=${categoryId}_${getSelectedCategoryId()}&storeId=${getStoreId()}&start=0&limit=${limit}`,
    silent: true,
  };
  return axios(config);
};

export const getPromoCategories = (categoryId) => {
  const config = {
    method: 'get',
    url: `${API_URL}/webapi/getpromotionalcategories/?categoryId=${categoryId}`,
    silent: true,
  };
  return axios(config);
};

export const searchProducts = (categoryId, limit) => {
  const config = {
    method: 'get',
    url: `${API_URL}/products?searchCriteria[page_size]=20&searchCriteria[current_page]=1&searchCriteria[sort_orders]=DESC&searchCriteria[page_size]=10&category_id=${categoryId}&store_id=1`,
    silent: true,
  };
  return axios(config);
};
