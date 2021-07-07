import { combineReducers } from 'redux';
import common from './common/common';
import cart from './cart/cart.reducer';
import stats from './stats/stats.reducer';
import wishlist from './wishlist/wishlist';
import auth from './auth/auth.reducer';

export default combineReducers({
  common,
  cart,
  stats,
  wishlist,
  auth
});
