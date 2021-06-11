import * as DATA_TYPES from '../../types';

const initialState = {
  data: [],
  isOpen: false,
};

export default function cart(state = initialState, action) {
  switch (action.type) {
    case DATA_TYPES.ADD_TO_CART:
      return { ...state, data: [...state.data, action.payload], isOpen: true };

    case DATA_TYPES.REMOVE_FROM_CART:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload.id),
      };

    case DATA_TYPES.INCREMENT_ITEM_QUANTITY:
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case DATA_TYPES.DECREMENT_ITEM_QUANTITY:
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity < 2 ? 1 : item.quantity - 1 }
            : item
        ),
      };

    case DATA_TYPES.RESET_CART:
      return { ...state, data: [] };

    case DATA_TYPES.TOGGLE_CART:
      return { ...state, isOpen: action.payload.data && !state.isOpen };

    default:
      return state;
  }
}
