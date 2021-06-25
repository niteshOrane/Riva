import * as DATA_TYPES from '../../types';

const INITIAL_STATE = {
  modalData: {},
  data: [],
  isOpen: false,
};

const wishlist = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATA_TYPES.TOGGLE_WISHLIST:
      return {
        ...state,
        isOpen: !state.isOpen,
        modalData: action.payload.data,
      };
    default:
      return state;
  }
};
export default wishlist;
