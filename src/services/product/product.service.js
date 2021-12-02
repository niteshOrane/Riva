import axios from "axios";
import { object } from "prop-types";
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

export const getFiltersList = ({ catId, qTerm = '', filterAttr = {} }) => {
  const keyValue = Object.keys(filterAttr).filter(e => e !== "status");
  const filterValue = [];
  let filterData = '';
  keyValue.forEach(element => {
    if (filterAttr[element]?.length) {
      filterValue.push(`categoryData[${element}]=${filterAttr[element].join(',')}`)
    }
  });
  // if (filterValue.length) {
  //   filterData = `&${filterValue.join('&')}`
  // }
  const querySearch = qTerm ? `&categoryData[q] = ${qTerm}` : "";
  const config = {
    method: "get",
    url: `${urlPath}/rest/V1/webapi/getlayernavigation?categoryData[categoryId]=${catId}${filterData}${querySearch}`,
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
    const colorStock = color
      ? `&productinfo[1][Name]=Color&productinfo[1][Value]=${color}`
      : "";
    const sizeStock = size
      ? `&productinfo[0][Name]=Size&productinfo[0][Value]=${size}`
      : "";
    const config = {
      method: "post",
      url: `${urlPath}/rest/V1/productalertstock/productStock?productId=${productId}${sizeStock}${colorStock}`,
      silent: true,
    };
    return axios(config);
  }
};

// add review
export const createReview = (title, description, review, id, firstname) => {
  const config = {
    method: "post",
    url: `${API_URL}/reviews?review[title]=${title}&review[detail]=${description}&review[nickname]=${firstname}&review[entity_pk_value]=${id}&review[review_status]=1&review[review_entity]=product&review[review_type]=2&review[ratings][0][value]=${review}&review[ratings][0][rating_name]=Quality&review[store_id]=${getStoreId()}`,
    silent: true,
  };
  return axios(config);
};

// get reviews
export const getReviewList = (fnValue) => {
  const config = {
    method: "get",
    url: `${API_URL}/products/${fnValue}/reviews`,
    silent: true,
  };
  return axios(config);
};


// delete review
export const deleteReviewFromList = (fnValue) => {
  const config = {
    method: "delete",
    url: `${API_URL}/reviews/${fnValue}`,
    silent: true,
  };
  return axios(config);
};