import {
  addCustomerAddress, getCustomerAddress, setDefaultAddress, getCartPaymentInfo
} from '../../../services/address/address.service';
import { getCustId } from '../../../util';
import * as DATA_TYPES from '../../types';
import { showSnackbar } from '../common';

export const toggleAddresslist = (data) => ({
  type: DATA_TYPES.TOGGLE_ADDRESS,
  payload: { data },
});

export const getAddress_action = (data) => ({
  type: DATA_TYPES.GET_ADDRESS,
  payload: { data },
});
export const addAddress_action = (data) => ({
  type: DATA_TYPES.ADD_ADDRESS,
  payload: { data },
});

export const removeAddress_action = (data) => ({
  type: DATA_TYPES.REMOVE_ADDRESS,
  payload: { data },
});

export const getCustomerAddressList = () => async (dispatch) => {
  const id = getCustId();
  if (!id) return;

  const res = await getCustomerAddress(id);

  if (res.data.success) {
    dispatch(getAddress_action(res.data));
  } else dispatch(getAddress_action([]));
};

export const addNewAddress = (res, item) => async (dispatch) => {
  
  if (res.data.success) {
    dispatch(addAddress_action(item));
    dispatch(
      showSnackbar(res.data?.message || 'Item added to Address', 'success')
    );
  } else
    dispatch(
      showSnackbar(
        res.data.message || 'failed to add item to Address',
        'error'
      )
    );
};

export const setCustomerAddresDefault = (res) => async (dispatch) => {
  const id = getCustId();
  if (!id) return;

 
  if (res.data.success) {
    dispatch(
      showSnackbar(res.data?.message || 'Item added to Address', 'success')
    );
  } else dispatch(getAddress_action([]));
};