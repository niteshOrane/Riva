import { useEffect, useState } from 'react';
import { getCustId } from '../../util';
import { getNotification } from "../../services/order/order.services";

const useNotifyMeList = () => {
  const [notifyList, setNotifyList] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    getNotification().then((response) => {
      setNotifyList(response.data)
    }).catch((error) => console.log(error));
  }, []);
  return {
    notifyList,
  };
};

export default useNotifyMeList;
