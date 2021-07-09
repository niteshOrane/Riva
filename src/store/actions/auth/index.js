import * as DATA_TYPES from '../../types';

export const loginSuccess = (data) => ({
  type: DATA_TYPES.LOGIN_SUCCESS,
  payload: { customer: data, token: 'temp_jwt_token' },
});

export const loginFailure = () => ({
  type: DATA_TYPES.LOGIN_FAILURE,
});

export const logout = () => ({
  type: DATA_TYPES.LOGOUT,
});
