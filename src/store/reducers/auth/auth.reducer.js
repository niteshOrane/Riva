import { logoutUser } from "../../../services/auth/auth.service";
import * as DATA_TYPES from "../../types";

const INITIAL_STATE = {
  isAuthenticated: false,
  loading: false,
  customer: null,
  token: null,
  socialDetails: {
    isSocial: false,
    data: null,
  },
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATA_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        customer: action.payload.customer,
        token: action.payload.token,
        loading: false,
      };
    case DATA_TYPES.LOGIN_FAILURE:
    case DATA_TYPES.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        customer: null,
        token: null,
        loading: false,
        socialDetails:{
          isSocial:false,
          data:null
        }
      };

    case DATA_TYPES.SET_CUSTOMER:
      return {
        ...state,
        customer: {
          ...state.customer,
          ...action.payload,
        },
      };
    case DATA_TYPES.LOGIN_WITH_SOCIAL:
      return {
        ...state,
        socialDetails: {
          isSocial: true,
          data: action.payload,
        },
      };
    default:
      return state;
  }
};
export default auth;
