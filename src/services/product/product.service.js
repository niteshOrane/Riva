import axios from "axios";
import API_URL from "../../enviroments/index";
import { getStoreId } from "../../util";

const urlPath = "http://65.0.141.49/shop/index.php";

export const getProduct = (sku) => {
  const config = {
    method: "get",
    url: `${API_URL}/products/${sku}`,
    silent: true,
  };
  return axios(config);
};

export const getColor = (id) => {
  const colorAttr = new FormData();
  colorAttr.append("productId", id);
  return axios.post(`${process.env.REACT_APP_DEV}/colorproduct`, colorAttr);
};

export const getAttributes = (id) => {
  const config = {
    method: "get",
    url: `${urlPath}/rest/all/V1/products/attributes/${id}/options`,
    silent: true,
  };
  return axios(config);
};

export const getCompositioncare = (id) => {
  const config = {
    method: "post",
    url: `${urlPath}/rest/V1/compositioncare`,
    data: { productid: id },
    silent: true,
  };
  return axios(config);
};

export const getHowToWear = (id) => {
  const config = {
    method: "get",
    url: `${API_URL}/webapi/howtowear?productId=${id}&storeId=${getStoreId()}`,
    silent: true,
  };
  return axios(config);
};
