import { createBrowserHistory } from 'history';

import store from '../store/index';

export const URL = {
  baseUrl: `http://65.0.141.49/shop/media/mageplaza/bannerslider/banner/image`,
  baseUrlProduct: `https://www.rivafashion.com/media/catalog/product/`,
};

export const defaultStore = {
  city: null,
  country_id: 'KW',
  currency: 'USD',
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

export const history = createBrowserHistory();

export const hardReload = () =>
  setTimeout(() => {
    history.go();
  }, 0);
