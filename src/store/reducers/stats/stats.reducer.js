import * as DATA_TYPES from "../../types";

const initialState = {
  data: [],
  list: [],
};

const handleAddRecentlyView = (data, payload) => {
  data = data.filter((d) => d.id !== payload.id);

  return { data: [...data, payload] };
};

export default function stats(state = initialState, action) {
  switch (action.type) {
    case DATA_TYPES.ADD_TO_RECENTLY_VIEWED:
      return {
        ...state,
        data: handleAddRecentlyView(state.data, action.payload).data.slice(
          0,
          8
        ),
      };
    case DATA_TYPES.ADD_RETURN_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case DATA_TYPES.CLEAR_RETURN_LIST:
      return {
        ...state,
        list: action.payload,
      };

    default:
      return state;
  }
}
