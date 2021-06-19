import axios from 'axios';
import mockdata from '../../mockdata.json';

export const getTopBrands = async () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockdata['topBrands']);
    }, 1000);
  });
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
export const getCurrentLocation =  async () => fetch("https://ipapi.co/json/", 
  requestOptions).then(response => response.json());

export const getHeader = async () => {
  const config = {
    method: 'get',
    url: 'http://65.0.141.49/shop/index.php/rest/V1/webapi/getheader',
    silent: true,
  };
  const response = await axios(config);
  return response;
};
export const getHeaderCategory = async () => {
  const config = {
    method: 'get',
    url: 'http://65.0.141.49/shop/index.php/rest/V1/webapi/getnavigation',
    silent: true,
  };
  const response = await axios(config);
  return response;
};

export const getFooter = async () => {
  const config = {
    method: 'get',
    url: 'http://65.0.141.49/shop/index.php/rest/V1/webapi/footercms?storeId=24',
  };
  const response = await axios(config);
  return response;
};

export const getBanners = (sliderId) => {
  const config = {
    method: 'get',
    url: `http://65.0.141.49/shop/index.php/rest/V1/webapi/getbanners?sliderId=${sliderId}&storeId=1`,
    silent: true,
  };
  return axios(config);
};

export const getProducts = (categoryId, limit) => {
  const config = {
    method: 'get',
    url: `http://65.0.141.49/shop/index.php/rest/V1/webapi/categoryproducts?categoryId=${categoryId}&storeId=1&start=0&limit=${limit}`,
    silent: true,
  };
  return axios(config);
};

export const getPromoCategories = () => {
  const config = {
    method: 'get',
    url: `http://65.0.141.49/shop/index.php/rest/V1/webapi/getpromotionalcategories/`,
    silent: true,
  };
  return axios(config);
};

export const searchProducts = (categoryId, limit) => {
  const config = {
    method: 'get',
    url: `http://65.0.141.49/shop/index.php/rest/V1/products?searchCriteria[page_size]=20&searchCriteria[current_page]=1&searchCriteria[sort_orders]=DESC&searchCriteria[page_size]=10&category_id=1241&store_id=1`,
    silent: true,
  };
  return axios(config);
};
