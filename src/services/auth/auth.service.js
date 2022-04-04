import axios from "axios";
import API_URL from "../../enviroments/index";
import { getStoreData } from "../../util/index";

export const createCustomer = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/customerRegister`,
    silent: true,
    data: formData,
  };
  return axios(config);
};

export const createCustomerSocial = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/socialLogin`,
    silent: true,
    data: formData,
  };
  return axios(config)
};

export const loginCustomer = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/customerLogin`,
    silent: true,
    data: formData,
  };
  return axios(config);
};

export const loginCustomerOTP = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/sendOtp`,
    silent: true,
    data: formData,
  };
  return axios(config);
};

export const verifyUpdateProfileMobileOtp = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/verifyUpdateProfileMobileOtp`,
    silent: true,
    data: formData,
  };
  return axios(config);
};
export const customerVerifyOtp = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/otpVerify`,
    silent: true,
    data: formData,
  };
  return axios(config);
};

export const customerResendOtp = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/resendOtp`,
    silent: true,
    data: formData,
  };
  return axios(config);
};

export const mergeGuestCart = async (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/mergeGuestCart`,
    silent: true,
    data: formData,
  };
  return axios(config);
};


export const forgotPassword = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/forgotPassword`,
    silent: true,
    data: formData,
  };
  return axios(config);
};
export const changePassword = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/changePassword`,
    silent: true,
    data: formData,
  };
  return axios(config);
};

export const resetForgotPassword = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/rest/${getStoreData()?.store_code}/V1/resetForgotPassword`,
    silent: true,
    data: formData,
  };
  return axios(config);
};

export const logoutUser = () => {
  function setlocation() {
    window.location.href = "/";
  }
  setTimeout(() => setlocation(), 100);
};
