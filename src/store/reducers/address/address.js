import * as DATA_TYPES from '../../types';

const INITIAL_STATE = {
  modalData: {},
  data: [],
  defaultAddressIds: {},
  isOpen: false
};

const address = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATA_TYPES.TOGGLE_ADDRESS:
      return {
        ...state,
        isOpen: !state.isOpen,
        modalData: action.payload.data,
      };
    case DATA_TYPES.GET_ADDRESS:
      return {
        ...state,
        data: [...action.payload.data.data],
        defaultAddressIds: action.payload.data.dataind,
      };
    case DATA_TYPES.ADD_ADDRESS:
      return {
        ...state,
        data: [...state.data, action.payload.data],
      };
    case DATA_TYPES.REMOVE_ADDRESS:
      return {
        ...state,
        data:
          state?.data?.filter((d) => d.id !== action.payload?.data?.id) || [],
      };
    default:
      return state;
  }
};
export default address;
