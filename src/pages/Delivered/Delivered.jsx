import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import TagManager from "react-gtm-module";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import DeliveredOrders from "../../components/pages/Dashboard/MyOrders/DeliveredOrders/DeliveredOrders";

import { cancelOrder, getOrderList } from "../../services/order/order.services";
import styles from "./Delivered.module.scss";

import Pagination from "./Pagination";
import { showSnackbar } from "../../store/actions/common";
import useAnalytics from "../../components/common/GoogleAnalytics/useAnalytics";

function Delivered() {
  const { customer } = useSelector((state) => state.auth);
  const { orderType } = useParams();
  const dispatch = useDispatch();
  useAnalytics();
  const { language } = useSelector((state) => state?.common?.store);

  const [orderList, setOrderList] = React.useState([]);
  const [status, setStatus] = React.useState(null);
  const [finalList, setFinalList] = React.useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const getOrders = async (id) => {
    const res = await getOrderList(id);
    if (res?.status === 200 && res?.data) {
      const temp = res?.data?.items?.map((li) => ({
        increment_id: li?.increment_id,
        currency_code: li?.base_currency_code,
        order_currency_code: li?.order_currency_code,
        status: li.status,
        list: li?.items?.filter((a) => a.product_type === "simple"),
      }));
      setOrderList(temp);
    }
    setStatus(res?.status);
  };
  const cancelOrderOnTap = async (id) => {
    const res = await cancelOrder(id);
    if (res?.status === 200) {
      dispatch(showSnackbar("Order Cancelled successfully", "success"));
    }
  };
  useEffect(() => {
    const tagManagerArgs = {
      gtmId: process.env.REACT_APP_GTM,
    };
    TagManager.initialize(tagManagerArgs);
  }, []);
  React.useEffect(() => {
    getOrders(customer?.customerID);
  }, [orderType]);
  React.useEffect(() => {
    if (orderType === "orders") {
      const data = orderList?.reduce((acc, pro) => {
        if (pro.status !== "canceled") {
          const data2 = pro?.list?.map((a) => ({
            ...a,
            status: pro?.status,
            increment_id: pro?.increment_id,
            currency_code: pro?.currency_code,
            order_currency_code: pro?.order_currency_code,
          }));
          return [...acc, ...data2];
        } else {
          return acc;
        }
      }, []);
      if (data) {
        setFinalList(data);
      }
    } else if (orderType === "delivered") {
      const data = orderList?.reduce((acc, pro) => {
        if (pro.status === "delivered") {
          const data2 = pro?.list?.map((a) => ({
            ...a,
            status: pro?.status,
            order_currency_code: pro?.order_currency_code,
            increment_id: pro?.increment_id,
            currency_code: pro?.currency_code,
          }));
          return [...acc, ...data2];
        } else {
          return acc;
        }
      }, []);
      if (data) {
        setFinalList(data);
      }
    }
  }, [orderType, orderList]);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = finalList
    ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    ?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <h2 className="font-weight-normal">
              {orderType?.[0]?.toUpperCase() + orderType.slice(1)}
            </h2>
            {currentPosts.length > 0 ? (
              currentPosts?.map((li) => (
                <DeliveredOrders
                  product={li}
                  language={language}
                  cancelOrderOnTap={cancelOrderOnTap}
                />
              ))
            ) : !status ? (
              <div className={styles.progress}>
                <CircularProgress size={50} />
              </div>
            ) : (
              <div className={styles.progress}>No record</div>
            )}
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={finalList?.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delivered;
