import * as DATA_TYPES from '../../types';

const initialState = {
  data: [],
  isOpen: false,
};

const handleAddToCart = (state, itemToBeAdded) => {
  let cart = [...state.data];
  const exists = cart.find((c) => c.id === itemToBeAdded.id);

  if (exists) {
    cart = cart.map((c) =>
      c.id === itemToBeAdded.id
        ? { ...c, quantity: c.quantity + itemToBeAdded.quantity }
        : c
    );
    return { ...state, data: cart };
  }

  return { ...state, data: [...cart, itemToBeAdded] };
};

export default function Cart(state = initialState, action) {
  switch (action.type) {
    case DATA_TYPES.ADD_TO_CART:
      return { ...handleAddToCart(state, action.payload), isOpen: true };

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
