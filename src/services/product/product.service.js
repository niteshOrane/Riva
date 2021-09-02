import axios from "axios";
import API_URL from "../../enviroments/index";
import { getStoreId, getStoreData } from "../../util";

const urlPath = "http://65.0.141.49/shop/index.php";

export const getProductColor = (id) => {
  const colorAttr = new FormData();
  colorAttr.append("productId", id);
  const config = {
    method: "post",
    url: `${urlPath}/rest/V1/colorproduct`,
    data: colorAttr,
    silent: true,
  };
  return axios(config);
};

export const getProductMedia = (sku) => {
  const config = {
    method: "get",
    url: `${urlPath}/rest/V1/products/${sku}/media`,
    silent: true,
  };
  return axios(config);
};

export const getFiltersList = (catId, color = "", size = "", price = "") => {

  const filterData = color ? `&categoryData[color]=${color?.value}` : "";
  const sizeData = size ? `&categoryData[size] = ${size?.value}` : "";
  const priceData = price ? `&categoryData[price] = ${price?.value}` : "";
  const config = {
    method: "get",
    url: `${urlPath}/rest/V1/webapi/getlayernavigation?categoryData[categoryId]=${catId}${filterData}${sizeData}${priceData}`,
    silent: true,
  };
  return axios(config);
};

export const getProduct = (sku) => {
  const config = {
    method: "get",
    url: `${urlPath}/rest/${getStoreData().store_code}/V1/products/${sku}`,
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

export const outOfStockCheck = (productId = 0, color = "", size = "") => {
  if (productId && color && size) {
    const colorStock = color ? `&productinfo[1][Name]=Color&productinfo[1][Value]=${color}` : ""
    const sizeStock = size ? `&productinfo[0][Name]=Size&productinfo[0][Value]=${size}` : ""
    const config = {
      method: "post",
      url: `${urlPath}/rest/V1/productalertstock/productStock?productId=${productId}${sizeStock}${colorStock}`,
      silent: true,
    };
    return axios(config);
  }
};
