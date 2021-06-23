import {
  fetchHeaderSuccess,
  fetchFooterSuccess,
  fetchTopBrands,
  fetchHeaderCategory,
  fetchCurrentLocation,
} from '.';
import {
  getHeader,
  getFooter,
  getTopBrands,
  getCurrentLocation,
  getHeaderCategory,
} from '../../../services/layout/Layout.service';

export const fetchCommonData = () => async (dispatch) => {
  getHeader().then((header) => dispatch(fetchHeaderSuccess(header.data)));
  getFooter().then((footer) => dispatch(fetchFooterSuccess(footer.data)));
  getTopBrands().then((topBrands) => dispatch(fetchTopBrands(topBrands.data)));
  getCurrentLocation().then((location) =>
    dispatch(fetchCurrentLocation(location))
  );
  getHeaderCategory().then((category) =>
    dispatch(fetchHeaderCategory(category.data))
  );
};
