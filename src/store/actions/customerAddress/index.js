import {
  addCustomerAddress, getCustomerAddress
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

  if (res.data.success === 1) {
    dispatch(getAddress_action(res.data.data));
  } else dispatch(getAddress_action([]));
};

export const addNewAddress = (item) => async (dispatch) => {
  const res = await addCustomerAddress(item);

  if (res.data.success === 1) {
    dispatch(addAddress_action(item));
    dispatch(
      showSnackbar(res.data?.data || 'Item added to Address', 'success')
    );
  } else
    dispatch(
      showSnackbar(
        res.data.data || res.data.message || 'failed to add item to Address',
        'error'
      )
    );
};

export const removeAddress = (item) => async (dispatch) => {
 
};
