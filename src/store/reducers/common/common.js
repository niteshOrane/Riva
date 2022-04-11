import * as DATA_TYPES from "../../types";
import { defaultStore } from "../../../util/index";
import { act } from "react-test-renderer";

const initialState = {
  filtersParams: {
    status: false,
  },
  forgetPasswordEmail: "",
  header: [],
  footer: [],
  topBrands: [],
  loading: false,
  error: null,
  footerCMS: [],
  currentLocation: null,
  store: defaultStore,
  category: [],
  selectedCategoryItem: { data: [], id: "1241" },
  quickView: {
    isOpen: false,
    data: null,
  },
  attributes: { color: [], size: [] },
  signUpCard: { isOpen: false, isLogin: false, isOtp: false },
  newUser: "",

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
          isOpen: !state.quickView?.isOpen,
          data: action.payload.data,
        },
      };
    case DATA_TYPES.SET_ATTRIBUTES:
      return {
        ...state,
        attributes: {
          ...action.payload.data,
        },
      };

    case DATA_TYPES.SNACKBAR:
      return {
        ...state,
        snackbar: {
          error: action.payload?.message ?? null,
          severity: action.payload?.severity ?? "",
          open: action.payload?.open,
        },
      };
    case DATA_TYPES.TOGGLE_SIGNUP_CARD:
      return {
        ...state,
        signUpCard: {
          ...action.payload,
        },
      };
    case DATA_TYPES.FILTER_PARAMS:

      if(!state.filtersParams?.[action.payload.name]){
         state.filtersParams[action.payload.name] = []        
      }
      return {
        ...state,
        filtersParams: {
          ...state.filtersParams,
          status: true,
          [action?.payload?.name]: [
            // ...state.filtersParams[action.payload.name],
            action.payload.param,
          ],
        },
      };
    case DATA_TYPES.CLEAR_SINGLE_VALUE:
      return {
        ...state,
        filtersParams: {
          ...state.filtersParams,
          [action?.payload?.name]: [
            ...state.filtersParams[action.payload.name]?.filter(
              (li) => li !== action.payload.value
            ),
          ],
        },
      };
    case DATA_TYPES.CLEAR_FILTER_PARAMS:
      return {
        ...state,
        filtersParams: {
          status: false,
        },
      };

    case DATA_TYPES.NEW_USER_EMAIL:
      return {
        ...state,
        newUser: action.payload,
      };
    case DATA_TYPES.FORGET_PASSOWORD_EMAIL:
      return {
        ...state,
        forgetPasswordEmail: action.payload,
      };
    default:
      return state;
  }
}
