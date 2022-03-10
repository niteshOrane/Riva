import * as DATA_TYPES from '../../types';

export const addToRecentlyViewed = (data) => ({
  type: DATA_TYPES.ADD_TO_RECENTLY_VIEWED,
  payload: data,
});

export const addToReturn = (data) => ({
  type: DATA_TYPES.ADD_RETURN_LIST,
  payload: data,
});
