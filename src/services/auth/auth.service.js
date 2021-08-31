import axios from "axios";
import API_URL from "../../enviroments/index";

export const createCustomer = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/customerRegister`,
    silent: true,
    data: formData,
  };
  return axios(config);
};

export const createCustomerSocial = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/socialLogin`,
    silent: true,
    data: formData,
  };
  return axios(config)
};

export const loginCustomer = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/customerLogin`,
    silent: true,
    data: formData,
  };
  return axios(config);
};

export const loginCustomerOTP = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/sendOtp`,
    silent: true,
    data: formData,
  };
  return axios(config);
};

export const customerVerifyOtp = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/verifyOtp`,
    silent: true,
    data: formData,
  };
  return axios(config);
};

export const customerResendOtp = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/resendOtp`,
    silent: true,
    data: formData,
  };
  return axios(config);
};

export const mergeGuestCart = async (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/mergeGuestCart`,
    silent: true,
    data: formData,
  };
  return axios(config);
};


export const forgotPassword = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/forgotPassword`,
    silent: true,
    data: formData,
  };
  return axios(config);
};
export const changePassword = (formData) => {
  const config = {
    method: "post",
    url: `${API_URL}/changePassword`,
    silent: true,
    data: formData,
  };
  return axios(config);
};

export const otpVerify = (formData) => {
  // api not found
};

export const logoutUser = () => {
  function setlocation() {
    window.location.href = "/";
  }
  setTimeout(() => setlocation(), 100);
};
