import * as DATA_TYPES from '../../types';

const INITIAL_STATE = {
  modalData: {},
  data: [],
  deliverySpeed: []
};

const payment = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATA_TYPES.PAYMENT_MODE:
      return {
        ...state,
        data: action.payload.data,
      };
    case DATA_TYPES.SHIPPING_METHOD:
      return {
        ...state,
        deliverySpeed: action.payload.data,
      };
    default:
      return state;
  }
};
export default payment;
