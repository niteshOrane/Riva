import React, { useEffect, useState } from "react";
import useDocumentTitle from "../../components/common/PageTitle/useDocumentTitle";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import ListCard from "../../components/pages/returned/ListCard";
import { getReturnedList } from "../../services/order/order.services";

function ReturnedList() {
  const [returnedOrderList, setReturnedOrderList] = useState([]);
  useDocumentTitle("Returned");
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
              returnedOrderList?.map((list) => {
               return list?.items?.map((order) => (
                  <ListCard product={order} id={list?.order_increment_id} status={list?.status} />
                ));
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReturnedList;
