import { colors } from '@material-ui/core';
import { createBrowserHistory } from 'history';

import store from '../store/index';

export const ALERT = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARN: 'warning',
  INFO: 'info',
};

export const URL = {
  baseUrl: process.env.REACT_APP_IMAGE_URL,
  baseUrlColorSwitcher: process.env.REACT_APP_MEDIA,
  baseUrlProduct: process.env.REACT_APP_MEDIA, //https://www.rivafashion.com/media/catalog/product
};

export const defaultStore = {
  city: null,
  country_id: 'KW',
  currency: 'USD',
  currency_symbol: "$",
  hours: null,
  language: 'English',
  merchant_vat_number: null,
  name: 'Riva Fashion',
  phone: '+971 800 7482',
  postcode: null,
  region_id: null,
  store_code: 'en',
  store_id: '1',
  store_name: 'International',
  street_line1: null,
  street_line2: null,
  website_id: '1',
};

export const getStoreId = () =>
  store?.getState()?.common?.store?.store_id || '1';

export const getCurrencyCode = () =>
  store?.getState()?.common?.store?.currency || 'USD';

export const getStoreData = () =>
  store?.getState()?.common?.store || defaultStore;

export const getCustId = () => store?.getState()?.auth?.customer?.customerID;
export const getCustInfo = () => store?.getState()?.auth;

export const getCartId = () => store?.getState()?.cart?.cart_id;



export const getLanguageName = () => store?.getState()?.common?.store.language === "English" ? 'en' : 'ar';


export const getSelectedCategoryId = () => store?.getState().common?.selectedCategoryItem?.id;

export const deepEqual = (x, y) => {
  // eslint-disable-next-line one-var
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y;
  return x && y && tx === 'object' && tx === ty
    ? ok(x).length === ok(y).length &&
    ok(x).every((key) => deepEqual(x[key], y[key]))
    : x === y;
};

export const history = createBrowserHistory({ queryKey: false });

export const hardReload = () =>
  setTimeout(() => {
    history.go();
  }, 0);

export const extractColorSize = (attributes = []) => {
  const { size = [], color = [] } = store.getState()?.common?.attributes || {};

  const color_attr = attributes?.find((e) => e?.attribute_id === '92')?.values || [];
  const size_attr = attributes?.find((e) => e?.attribute_id === '213')?.values || [];
  let colorData = [];
  if (color_attr?.filter((c) => c.value_index === null).length) {
    colorData.push({ label: false, value: null })
  }
  colorData = [
    ...colorData, ...color?.filter(
      (c) => color_attr?.find((cr) => cr.value_index ? cr.value_index == c.value : cr.value_index)
    )
  ];
  return {
    colors:
      colorData,
    size:
      size?.filter(
        (s) => size_attr?.find((sr) => sr.value_index == s.value)
      ) || [],
  };
};



export const getSKuId = (sku) => {
  if (sku) {
    const skuArray = sku?.split('-');
    const skuFinal = [];
    for (let i = 0; i <= skuArray.length - 1; i++) {
      if (!isNaN(parseFloat(skuArray[i])) && isFinite(skuArray[i])) {
        skuFinal.push(skuArray[i])
      }
    }
    return skuFinal.join('-');
  }
};


export const getColorsForHomePage = (options) => {
  const { size = [], color = [] } = store.getState()?.common?.attributes || {};
  let colorLabel = options["92"]?.values?.map(li => (
    {label : color?.find(c => c.value===li?.value_index)?.label,value:li?.value_index}
  ))
  return colorLabel
}