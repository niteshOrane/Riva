import * as DATA_TYPES from "../../types";
const initialState = {
  info: {},
  data: [],
  faaa: [],
  isOpen: false,
  cart_id: 0,
  cartPaymentInfo: {},
  isSingle: null,
  freeShipping: {},
};

const handleAddToCart = (state, itemToBeAdded) => {
  let cart = [...state.data];
  const exists = cart.find((c) => c.id === itemToBeAdded.id);

  if (exists) {
    cart = cart.map((c) =>
      c.id === itemToBeAdded.id ? { ...c, qty: c.qty + itemToBeAdded.qty } : c
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

    case DATA_TYPES.INCREMENT_ITEM:
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
        ),
      };

    case DATA_TYPES.DECREMENT_ITEM:
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: item.qty < 2 ? 1 : item.qty - 1 }
            : item
        ),
      };

    case DATA_TYPES.RESET_CART:
      return { ...state, data: [] };

    case DATA_TYPES.SET_CART_ID:
      return { ...state, ...action.payload };

    case DATA_TYPES.TOGGLE_CART:
      return { ...state, isOpen: action.payload.data && !state.isOpen };

    case DATA_TYPES.SET_BULK_CART:
      return { ...state, data: action.payload };
    case DATA_TYPES.CART_INFO:
      return {
        ...state,
        cartPaymentInfo: action.payload || {},
      };
    case DATA_TYPES.CART_EXTRA_INFO:
      return {
        ...state,
        info: action.payload,
      };
    case DATA_TYPES.SINGLE_CART:
      return {
        ...state,
        isSingle: action.payload,
      };
    case DATA_TYPES.GET_FREE_SHIPPING:
      return {
        ...state,
        freeShipping: action.payload,
      };
    default:
      return state;
  }
}
