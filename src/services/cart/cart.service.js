import axios from 'axios';
import API_URL from '../../enviroments/index';

export const addToCart = (id, color, size, qty) => {
  const config = {
    method: 'get',
    url: `${API_URL}/webapi/addproduct?productInfo[product_id]=${id}&productInfo[options][92]=${color}&productInfo[options][213]=${size}&productInfo[qty]=${qty}`,
    silent: true,
  };
  return axios(config);
};
