import {
  addWishListItem,
  getWishlistItems,
  removeWishlistItem,
} from '../../../services/wishlist/wishlist.service';
import * as DATA_TYPES from '../../types';
import { showSnackbar } from '../common';

export const toggleWishlist = (data) => ({
  type: DATA_TYPES.TOGGLE_WISHLIST,
  payload: { data },
});

export const getWishlist_action = (data) => ({
  type: DATA_TYPES.GET_WISHLIST,
  payload: { data },
});
export const addWishlist_action = (data) => ({
  type: DATA_TYPES.ADD_WISHLIST,
  payload: { data },
});

export const removeWishlist_action = (data) => ({
  type: DATA_TYPES.REMOVE_WISHLIST,
  payload: { data },
});

export const getWishlist = () => async (dispatch) => {
  const res = await getWishlistItems();

  if (res.data.success === 1) {
    dispatch(getWishlist_action(res.data.data));
  } else dispatch(getWishlist_action([]));
};

export const addWishlist = (item) => async (dispatch) => {
  const res = await addWishListItem(item.id);

  if (res.data.success === 1) {
    dispatch(addWishlist_action(item));
    dispatch(showSnackbar('Item add to wishlist', 'success'));
  } else
    dispatch(
      showSnackbar(
        res.data.data || res.data.message || 'failed to add item to wishlist',
        'error'
      )
    );
};

export const removeWishlist = (item) => async (dispatch) => {
  const res = await removeWishlistItem(item.id);

  if (res.data.success === 1) {
    dispatch(removeWishlist_action(item));
    dispatch(showSnackbar('Item removed from wishlist', 'success'));
  } else
    dispatch(
      showSnackbar(
        res.data.data || res.data.message || 'failed to add item to wishlist',
        'error'
      )
    );
};
