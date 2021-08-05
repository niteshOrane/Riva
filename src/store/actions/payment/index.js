import {
  getPaymentMode,
  getShippingMethod
} from '../../../services/payment/payment.service';
import { getCustId } from '../../../util';
import * as DATA_TYPES from '../../types';
export const getPaymentMethod_action = (data) => ({
  type: DATA_TYPES.PAYMENT_MODE,
  payload: { data },
});
export const getdeliveryMethod_action = (data) => ({
  type: DATA_TYPES.SHIPPING_METHOD,
  payload: { data },
});
export const getPaymentMethodlist = () => async (dispatch) => {
  const id = getCustId();
  if (!id) return;

  const res = await getPaymentMode();
  if (res && res?.data) {
    dispatch(getPaymentMethod_action(res.data));
  } else dispatch(getPaymentMethod_action([]));
};
export const getShippingMethodlist = (addressId) => async (dispatch) => {
  const id = getCustId();
  if (!id) return;

  const res = await getShippingMethod(addressId);
  if (res && res?.data) {
    dispatch(getdeliveryMethod_action(res.data));
  } else dispatch(getdeliveryMethod_action([]));
};