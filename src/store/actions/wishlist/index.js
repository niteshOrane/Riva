import {
  addWishListItem,
  getWishlistItems,
  removeWishlistItem,
} from "../../../services/wishlist/wishlist.service";
import { getCustId } from "../../../util";
import * as DATA_TYPES from "../../types";
import { showSnackbar } from "../common";

export const toggleWishlist = (data,isCart=false,cartData={}) => ({
  type: DATA_TYPES.TOGGLE_WISHLIST,
  payload: { data,isCart,cartData },
});

export const getWishlist_action = (data) => ({
  type: DATA_TYPES.GET_WISHLIST,
  payload: { data },
});
export const addWishlist_action = (data) => ({
  type: DATA_TYPES.ADD_WISHLIST,
  payload: { data },
});

export const wishlistLoader = (state) => ({
  type: DATA_TYPES.LOADING_WISHLIST,
  payload: state,
});

export const removeWishlist_action = (data) => ({
  type: DATA_TYPES.REMOVE_WISHLIST,
  payload: { data },
});
export const clearwishlist_action = (data) => ({
  type: DATA_TYPES.CLEAR_WISHLIST,
  payload: data,
});

export const getWishlist = () => async (dispatch) => {
  const id = getCustId();
  if (!id) return;

  const res = await getWishlistItems(id);

  if (res.data.success === 1) {
    dispatch(getWishlist_action(res.data.data));
  } else dispatch(getWishlist_action([]));
};

export const addWishlist = (item, isAddtoCard = false) => async (dispatch) => {
  const res = await addWishListItem(isAddtoCard ? item.parent_product_id : item.id, getCustId());

  if (res.data.success === 1) {
    dispatch(getWishlist());
    dispatch(addWishlist_action(item));
    dispatch(
      showSnackbar(res.data?.data || "Item added to wishlist", "success")
    );
  } else
    dispatch(
      showSnackbar(
        res.data.data || res.data.message || "failed to add item to wishlist",
        "error"
      )
    );
};

export const removeWishlist =
  (item, isFromWishlist = false, isAddtoCard = false) =>
    async (dispatch) => {
      dispatch(wishlistLoader(true));
      const res = await removeWishlistItem(isAddtoCard ? item.parent_product_id : item.id, getCustId());

      if (res.data.success === 1) {
        dispatch(getWishlist());
        dispatch(removeWishlist_action(item));
        if (!isFromWishlist) {
          dispatch(
            showSnackbar(
              res.data?.data || "Item removed from wishlist",
              "success"
            )
          );
          dispatch(wishlistLoader(false));
        }
      } else
        dispatch(
          showSnackbar(
            res.data.data || res.data.message || "failed to add item to wishlist",
            "error"
          )
        );
      dispatch(wishlistLoader(false));
    };
