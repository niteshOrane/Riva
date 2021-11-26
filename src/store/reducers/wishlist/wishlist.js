import * as DATA_TYPES from "../../types";

const INITIAL_STATE = {
  modalData: {},
  data: [],
  isOpen: false,
  loading: false,
};

const wishlist = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATA_TYPES.TOGGLE_WISHLIST:
      return {
        ...state,
        isOpen: !state.isOpen,
        modalData: action.payload.data,
      };
    case DATA_TYPES.GET_WISHLIST:
      return {
        ...state,
        data: [...action.payload.data],
      };
    case DATA_TYPES.ADD_WISHLIST:
      return {
        ...state,
        data: [...state.data, action.payload.data],
      };
    case DATA_TYPES.REMOVE_WISHLIST:
      return {
        ...state,
        data:
          state?.data?.filter((d) => d.id !== action.payload?.data?.id) || [],
      };
    case DATA_TYPES.LOADING_WISHLIST:
      return {
        ...state,
        loading: action.payload,
      };
    case DATA_TYPES.CLEAR_WISHLIST:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
export default wishlist;
