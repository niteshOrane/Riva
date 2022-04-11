import { useEffect, useState } from 'react';
import { getNotification } from "../../services/order/order.services";

const useNotifyMeList = () => {
  const [notifyList, setNotifyList] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    getNotification().then((response) => {
      setNotifyList(response.data)
    })
  }, []);
  return {
    notifyList,
  };
};

export default useNotifyMeList;
