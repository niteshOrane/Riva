import * as DATA_TYPES from '../../types';
import { defaultStore } from '../../../util/index';

const initialState = {
  header: [],
  footer: [],
  topBrands: [],
  loading: false,
  error: null,
  footerCMS: [],
  currentLocation: null,
  store: defaultStore,
  category: [],
  selectedCategoryItem: {},
  quickView: {
    isOpen: false,
    data: null,
  },
};

export default function common(state = initialState, action) {
  switch (action.type) {
    case DATA_TYPES.LOADER:
      return {
        ...state,
        loading: action.payload,
      };

    case DATA_TYPES.ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case DATA_TYPES.FETCH_HEADER_SUCCESS:
      return {
        ...state,
        loading: false,
        header: action.payload.data,
      };

    case DATA_TYPES.FETCH_FOOTER_SUCCESS:
      return {
        ...state,
        loading: false,
        footer: action.payload.data,
      };

    case DATA_TYPES.FETCH_TOPBRANDS_SUCCESS:
      return {
        ...state,
        loading: false,
        topBrands: action.payload.data,
      };

    case DATA_TYPES.CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload.data,
      };

    case DATA_TYPES.STORE:
      return {
        ...state,
        store: action.payload.data,
      };
    case DATA_TYPES.CATEGORY:
      return {
        ...state,
        category: action.payload.data,
      };
    case DATA_TYPES.SELECTED_CATEGORY:
      return {
        ...state,
        loading: false,
        selectedCategoryItem: action.payload,
      };
    case DATA_TYPES.TOGGLE_QUICKVIEW:
      return {
        ...state,
        quickView: {
          isOpen: !state.quickView.isOpen,
          data: action.payload.data,
        },
      };
    default:
      return state;
  }
}
