import * as DATA_TYPES from "../../types";

export const toggleWishlist = (data) => ({
  type: DATA_TYPES.TOGGLE_WISHLIST,
  payload: { data },
});
