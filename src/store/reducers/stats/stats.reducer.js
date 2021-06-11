import * as DATA_TYPES from '../../types';

const initialState = {
  data: []
};

export default function stats(state = initialState, action) {
  switch (action.type) {
    case DATA_TYPES.ADD_TO_RECENTLY_VIEWED:
      return { ...state, data: [...new Set([action.payload, ...state.data])].slice(0, 4) };

    default:
      return state;
  }
}
