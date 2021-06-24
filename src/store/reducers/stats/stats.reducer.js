import * as DATA_TYPES from '../../types';

const initialState = {
  data: [],
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

    default:
      return state;
  }
}
