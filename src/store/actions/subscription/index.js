import {
  addSubscribe,
  unSubscribe,
} from '../../../services/subscribe/subscribe.service';
import { showSnackbar } from '../common';

export const addSubscribeList = (item) => async (dispatch) => {
  const res = await addSubscribe(item.store_id, item.email);
  if (res.data.success === 200) {
    dispatch(showSnackbar(res.data?.message, 'success'));
  } else
    dispatch(
      showSnackbar(
        res.data.data || res.data.message || 'failed to add email to Subscribe',
        'error'
      )
    );
};
