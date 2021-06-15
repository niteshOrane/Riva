import axios from 'axios';
import baseUrl from '../../enviroments';
import mockdata from '../../mockdata.json';

export const getTopBrands = async () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockdata['topBrands']);
    }, 1000);
  });

export const getCurrentLocation = async () => {
  const config = {
    method: 'get',
    url: 'https://ipapi.co/json/',
  };
  const response = await axios(config);
  return response.data.country;
}

export const getHeader = async () => {
  const config = {
    method: 'get',
    url: 'http://65.0.141.49/shop/index.php/rest/V1/webapi/getheader',
    silent: true
  };
  const response = await axios(config);
  return response;
}
export const getHeaderCategory = async () => {
  const config = {
    method: 'get',
    url: 'http://65.0.141.49/shop/index.php/rest/V1/webapi/getnavigation',
    silent: true
  };
  const response = await axios(config);
  return response;
}

export const getFooter = async () => {
  const config = {
    method: 'get',
    url: 'http://65.0.141.49/shop/index.php/rest/V1/webapi/footercms?storeId=24',
  };
  const response = await axios(config);
  return response;
}