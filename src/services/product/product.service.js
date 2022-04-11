import axios from "axios";
import { object } from "prop-types";
import API_URL from "../../enviroments/index";
import { getStoreId, getStoreData, getCustId } from "../../util";

const urlPath = process.env.REACT_APP_BASE_URL;

export const getProductColor = (id) => {
  const colorAttr = new FormData();
  colorAttr.append("productId", id);
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/colorproduct`,
    data: colorAttr,
    silent: true,
  };
  return axios(config);
};

export const getProductMedia = (sku) => {
  const config = {
    method: "get",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/products/${sku}/media`,
    silent: true,
  };
  return axios(config);
};

export const getFiltersList = ({ catId, qTerm = "", filterAttr = {} }) => {
  const keyValue = Object.keys(filterAttr).filter((e) => e !== "status");
  const filterValue = [];
  let filterData = "";
  keyValue.forEach((element) => {
    if (filterAttr[element]?.length) {
      filterValue.push(
        `&categoryData[${element}]=${filterAttr[element].join(",")}`
      );
    }
  });
  // if (filterValue.length) {
  //   filterData = `&${filterValue.join('&')}`
  // }
  const querySearch = qTerm ? `&categoryData[q] = ${qTerm}` : "";
  const config = {
    method: "get",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/webapi/getlayernavigation?categoryData[categoryId]=${catId}${filterValue}${querySearch}`,
    silent: true,
  };
  return axios(config);
};

export const getProduct = (sku) => {
  const config = {
    method: "get",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/products/${sku}`,
    silent: true,
  };
  return axios(config);
};

export const getColor = (id) => {
  const colorAttr = new FormData();
  colorAttr.append("productId", id);
  return axios.post(`${API_URL}/rest/${getStoreData()?.store_code}/V1/colorproduct`, colorAttr);
};

export const getAttributes = (id) => {
  const config = {
    method: "get",
    url: `${API_URL}/rest/all/V1/products/attributes/${id}/options`,
    silent: true,
  };
  return axios(config);
};

export const getCompositioncare = (id) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/compositioncare`,
    data: { productid: id },
    silent: true,
  };
  return axios(config);
};

export const getHowToWear = (id) => {
  const config = {
    method: "get",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/webapi/howtowear?productId=${id}&storeId=${getStoreId()}`,
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
      url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/productalertstock/productStock?productId=${productId}${sizeStock}${colorStock}`,
      silent: true,
    };
    return axios(config);
  }
};

// add review
export const createReview = (
  title,
  description,
  review,
  id,
  firstname,
  customerId
) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/reviews?review[title]=${title}&review[detail]=${description}&review[nickname]=${firstname}&review[entity_pk_value]=${id}&review[review_status]=1&review[review_entity]=product&review[review_type]=2&review[ratings][0][value]=${review}&review[ratings][0][rating_name]=Quality&review[store_id]=${getStoreId()}&review[customer_id] = ${customerId}`,
    silent: true,
  };
  return axios(config);
};

// get reviews
export const getReviewList = (fnValue) => {
  const config = {
    method: "get",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/products/${fnValue}/reviews`,
    silent: true,
  };
  return axios(config);
};

// delete review
export const deleteReviewFromList = (fnValue) => {
  const config = {
    method: "delete",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/reviews/${fnValue}`,
    silent: true,
  };
  return axios(config);
};

// update review
export const updateReviewFromList = (
  title,
  description,
  review,
  id,
  firstname,
  store_id,
  review_status,
  review_type,
  customerId
) => {
  const config = {
    method: "put",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/reviews/20?review[title]=${title}&review[detail]=${description}&review[nickname]=${firstname}&review[entity_pk_value]=${id}&review[review_status]=${review_status}&review[review_entity]=product&review[review_type]=${review_type}&review[ratings][0][value]=${review}&review[ratings][0][rating_name]=Quality&review[store_id]=${store_id}&review[customer_id] = ${customerId}`,
    silent: true,
  };
  return axios(config);
};

// my review
export const getMyReviewList = () => {
  const config = {
    method: "get",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/reviews/?searchCriteria[filterGroups][0][filters][0][field]=customer_id&searchCriteria[filterGroups][0][filters][0][value] = ${parseInt(
      getCustId(),
      10
    )}`,
    silent: true,
  };
  return axios(config);
};

// search in store
export const searchInStore = (itemCode, country) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/storeStock`,
    silent: true,
    data: {
      itemCode,
      country,
    },
  };
  return axios(config);
};

// delivery and return

export const deliveryAndReturnService = () => {
  const config = {
    method: "get",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/webapi/delivery-returns?storeId=${getStoreId()}`,
    silent: true,
  };
  return axios(config);
};

export const getSizeGuide = (type) => {
  const config = {
    method: "get",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/webapi/size-guide?storeId=27&type=${type}`,
    silent: true,
  };
  return axios(config);
};

export const getProductDetailsById = (id) => {
  const config = {
    method: "get",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/webapi/getproductdetailsbyid?productId=${id}`,
    silent: true,
  };
  return axios(config);
};
