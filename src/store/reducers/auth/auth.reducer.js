import * as DATA_TYPES from '../../types';

const INITIAL_STATE = {
  isAuthenticated: false,
  loading: true,
  customer: null,
  token: null,
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATA_TYPES.LOGIN_SUCCESS:
      return {
        ...state.customer,
        isAuthenticated: true,
        customer: action.payload.customer,
        token: action.payload.user,
        loading: false,
      };
    case DATA_TYPES.LOGIN_FAILURE:
    case DATA_TYPES.LOGOUT:
      return {
        ...state.customer,
        isAuthenticated: false,
        customer: null,
        token: null,
        loading: false,
      };
    default:
      return state;
  }
};
export default auth;
