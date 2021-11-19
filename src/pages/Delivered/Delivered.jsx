import React, { useState } from "react";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import DeliveredOrders from "../../components/pages/Dashboard/MyOrders/DeliveredOrders/DeliveredOrders";
import { useSelector } from "react-redux";
import { getOrderList } from "../../services/order/order.services";
import styles from "./Delivered.module.scss";

import CircularProgress from "@material-ui/core/CircularProgress";
import Pagination from "./Pagination";

function Delivered({ title = "Delivered" }) {
  const { customer } = useSelector((state) => state.auth);

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
        status: li.status,
        list: li?.items?.filter((a) => a.product_type === "simple"),
      }));
      setOrderList(temp);
    }
    setStatus(res?.status);
  };
  React.useEffect(() => {
    getOrders(customer?.customerID);
  }, []);
  React.useEffect(() => {
    let data = orderList?.reduce((acc, pro) => {
      if (pro.status !== "canceled") {
        let data2 = pro?.list?.map((a) => ({
          ...a,
          status: pro?.status,
          increment_id: pro?.increment_id,
          currency_code: pro?.currency_code,
        }));
        return [...acc, ...data2];
      }
    }, []);
    if (data) {
      setFinalList(data);
    }
  }, [orderList]);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = finalList?.slice(indexOfFirstPost, indexOfLastPost);

 const paginate = (pageNumber) => setCurrentPage(pageNumber)
  return (
    <div className="d-flex py-20px">
      <div className="container-with-circles">
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <h2 className="font-weight-normal">{title}</h2>

            {/* {orderList.length>0  &&  <DeliveredOrders products = {orderList}  />} */}
            {currentPosts.length > 0 ? (
              currentPosts?.map((li) => (
                <DeliveredOrders product={li} language={language} />
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
              currentPage = {currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delivered;
