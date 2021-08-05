import {
  fetchHeaderSuccess,
  fetchFooterSuccess,
  fetchTopBrands,
  fetchHeaderCategory,
  fetchCurrentLocation,
  setAttributes,
} from '.';
import {
  getHeader,
  getFooter,
  getTopBrands,
  getCurrentLocation,
  getHeaderCategory,
} from '../../../services/layout/Layout.service';
import { getAttributes } from '../../../services/product/product.service';

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
  Promise.all([getAttributes('92'), getAttributes('213')]).then((attributes) =>
    dispatch(
      setAttributes({
        color: attributes?.[0]?.data || [],
        size: attributes?.[1]?.data || [],
      })
    )
  );
};
