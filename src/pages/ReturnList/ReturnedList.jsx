/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import useDocumentTitle from "../../components/common/PageTitle/useDocumentTitle";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import ListCard from "../../components/pages/returned/ListCard";
import { getReturnedList } from "../../services/order/order.services";
import styles from "./returnList.module.scss";
import CircularProgress from "@material-ui/core/CircularProgress";

function ReturnedList() {
  const [returnedOrderList, setReturnedOrderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(null);
  const [loading,setLoading] = useState(false);
  const [status, setStatus] = React.useState(null);
  
  
  useDocumentTitle("Returned");
  const returnedList = async (page) => {
    setLoading(true)
    const res = await getReturnedList(page);
    if (res?.status === 200 && res?.data) {
      const arr = Object.values(res?.data).slice(0, -3);
      setReturnedOrderList(arr);
      setTotalCount(res?.data?.total_counts);
      setLoading(false);
      setStatus(res?.status);
    }else{
      setLoading(false)
    }
  };
  useEffect(() => {
    returnedList(currentPage);
  }, []);
  React.useEffect(() => {
    returnedList(currentPage);
  }, [currentPage]);
  const changePageFor = () => {
    if (totalCount > returnedOrderList.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const changePageBack = () => {
    if (currentPage !== 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
          <h2 className="font-weight-normal">
              Your Returns
            </h2>
            {returnedOrderList?.length > 0 ?
              returnedOrderList?.map((list) => <ListCard product={list} />): !status ? (
                <div className={styles.progress}>
                  <CircularProgress size={50} />
                </div>
              ) : (
                <div className={styles.progress}>No record</div>
              )}
            <section className={styles.pageSec}>
              <div>
                <button
                  className={styles.prevNextBtn}
                  type="button"
                  onClick={changePageBack}
                  style={{
                    backgroundColor: currentPage === 1 ? "gray" : "black",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  }}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className={styles.prevNextBtn}
                  type="button"
                  onClick={changePageFor}
                  disabled={returnedOrderList.length === 0}
                  style={{
                    backgroundColor: returnedOrderList.length === 0 ? "gray" : "black",
                    cursor: returnedOrderList.length === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  Next
                </button>
              </div>

              <span>
                current page: <strong>{currentPage}</strong>
              </span>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReturnedList;
