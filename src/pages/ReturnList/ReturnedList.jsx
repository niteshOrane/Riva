import React, { useEffect, useState } from "react";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import ListCard from "../../components/pages/returned/ListCard";
import { getReturnedList } from "../../services/order/order.services";

function ReturnedList() {
  const [returnedOrderList, setReturnedOrderList] = useState([]);
  const returnedList = async () => {
    const res = await getReturnedList();
    if (res?.status === 200 && res?.data?.items) {
      setReturnedOrderList(res?.data?.items);
    }
  };
  useEffect(() => {
    returnedList();
  }, []);
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            {returnedOrderList?.length > 0 &&
              returnedOrderList?.map((list) => <ListCard product={list} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReturnedList;
