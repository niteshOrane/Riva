import * as DATA_TYPES from '../../types';

export const loader = (state) => ({
  type: DATA_TYPES.LOADER,
  payload: state,
});

export const errorHandler = (error) => ({
  type: DATA_TYPES.ERROR,
  payload: error,
});

export const fetchHeaderSuccess = (data) => ({
  type: DATA_TYPES.FETCH_HEADER_SUCCESS,
  payload: { data },
});

export const fetchFooterSuccess = (data) => ({
  type: DATA_TYPES.FETCH_FOOTER_SUCCESS,
  payload: { data },
});

export const fetchTopBrands = (data) => ({
  type: DATA_TYPES.FETCH_TOPBRANDS_SUCCESS,
  payload: { data },
});

export const fetchCurrentLocation = (data) => ({
  type: DATA_TYPES.CURRENT_LOCATION,
  payload: { data },
});

export const setStore = (data) => ({
  type: DATA_TYPES.STORE,
  payload: { data },
});

export const fetchHeaderCategory = (data) => ({
  type: DATA_TYPES.CATEGORY,
  payload: { data },
});

export const selectedCategory = (data) => ({
  type: DATA_TYPES.SELECTED_CATEGORY,
  payload: { data },
});

export const toggleQuickView = (data) => ({
  type: DATA_TYPES.TOGGLE_QUICKVIEW,
  payload: { data },
});

export const setAttributes = (data) => ({
  type: DATA_TYPES.SET_ATTRIBUTES,
  payload: { data },
});

export const showSnackbar = (message = null, severity = '', open = true) => ({
  type: DATA_TYPES.SNACKBAR,
  payload: { message, severity, open },
});

export const toggleSignUpCard = ({
  isOpen = true,
  isLogin = true,
  isOtp = false,
  ...rest
}) => ({
  type: DATA_TYPES.TOGGLE_SIGNUP_CARD,
  payload: { isOpen, isLogin, isOtp, ...rest },
});
