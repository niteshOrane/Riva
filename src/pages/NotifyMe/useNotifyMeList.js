import { useEffect, useState } from 'react';
import axios from 'axios';
import { getStoreId, getCustId } from '../../util';
import API_URL from '../../enviroments';

const useNotifyMeList = () => {
  const [notifyList, setNotifyList] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    const customer = new FormData();
    customer.append('customerId', getCustId());
    const config = {
      method: 'post',
      url: `${API_URL}/productalertstock/customeralertlist`,
      silent: true,
      data: customer
    };
    axios(config)
      .then((response) => setNotifyList(response.data))
      .catch((error) => console.log(error));
  }, []);
  return {
    notifyList,
  };
};

export default useNotifyMeList;
